"""Shared utilities for repo-hoarder scripts."""

import math
import os
from datetime import datetime, timezone

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
DATA_FILE = "data/repos.json"

# Freshness half-life in days. The decay factor multiplies the transient
# signals (`today_stars`, `commit_activity`) so repos that were hot a few
# months ago don't keep dominating the ranking forever.
FRESHNESS_HALF_LIFE_DAYS = 120.0
FRESHNESS_FLOOR = 0.05

LANGUAGES = [
    "python", "javascript", "typescript", "go", "rust", "java",
    "cpp", "c", "ruby", "swift", "kotlin", "dart", "csharp", "shell",
]


def get_headers():
    """Build request headers with optional GitHub token."""
    headers = {
        "User-Agent": "Mozilla/5.0 (repo-hoarder)",
        "Accept": "application/vnd.github.v3+json",
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return headers


def freshness_decay(repo, now=None):
    """Exponential freshness decay based on `fetched_at`.

    Returns 1.0 for a freshly-fetched repo, ~0.5 after FRESHNESS_HALF_LIFE_DAYS,
    and never below FRESHNESS_FLOOR even for very stale entries.
    Falls back to 1.0 when `fetched_at` is missing or unparseable.
    """
    fetched_at = repo.get("fetched_at")
    if not fetched_at:
        return 1.0
    try:
        ref = now or datetime.now(timezone.utc)
        fetched = datetime.fromisoformat(str(fetched_at).replace("Z", "+00:00"))
        if fetched.tzinfo is None:
            fetched = fetched.replace(tzinfo=timezone.utc)
        age_days = max((ref - fetched).total_seconds() / 86400.0, 0.0)
    except (ValueError, TypeError, AttributeError):
        return 1.0
    return max(0.5 ** (age_days / FRESHNESS_HALF_LIFE_DAYS), FRESHNESS_FLOOR)


def calculate_score(repo, now=None):
    """Calculate treasure score.

    score = stars + forks + (forks/stars)*1000
          + today_stars*10*freshness + commits_4w*2*freshness

    The freshness multiplier decays `today_stars` and `commit_activity`
    with a half-life of FRESHNESS_HALF_LIFE_DAYS, so a repo's ranking
    gradually drops between scrapes if its momentum fades.
    `now` is injectable for deterministic tests; defaults to system time.
    """
    stars = repo.get("stars", 0)
    forks = repo.get("forks", 0)
    today = repo.get("today_stars", 0)
    commits = repo.get("commit_activity", 0)
    fork_ratio = forks / stars if stars > 0 else 0
    decay = freshness_decay(repo, now=now)
    return round(
        stars + forks + fork_ratio * 1000
        + today * 10 * decay
        + commits * 2 * decay,
        2,
    )


def merge_repo(existing, new):
    """Field-wise max merge of two repo dicts. Mutates and returns existing."""
    existing["stars"] = max(existing.get("stars", 0), new.get("stars", 0))
    existing["forks"] = max(existing.get("forks", 0), new.get("forks", 0))
    existing["today_stars"] = max(existing.get("today_stars", 0), new.get("today_stars", 0))
    existing["commit_activity"] = max(existing.get("commit_activity", 0), new.get("commit_activity", 0))
    if existing.get("language") in (None, "Unknown") and new.get("language") not in (None, "Unknown"):
        existing["language"] = new["language"]
    if not existing.get("description") and new.get("description"):
        existing["description"] = new["description"]
    if new.get("month_tag") and not existing.get("month_tag"):
        existing["month_tag"] = new["month_tag"]
    old_src = existing.get("source", "") or ""
    new_src = new.get("source", "") or ""
    merged_sources = sorted({s for s in old_src.split("+") + new_src.split("+") if s})
    existing["source"] = "+".join(merged_sources)
    if new.get("fetched_at", "") > existing.get("fetched_at", ""):
        existing["fetched_at"] = new["fetched_at"]
    existing["score"] = calculate_score(existing)
    return existing
