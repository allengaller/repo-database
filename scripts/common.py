"""Shared utilities for repo-hoarder scripts."""

import os

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
DATA_FILE = "data/repos.json"

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


def calculate_score(repo):
    """Calculate treasure score.

    score = stars + forks + (forks/stars)*1000 + today_stars*10 + commits_4w*2
    """
    stars = repo.get("stars", 0)
    forks = repo.get("forks", 0)
    today = repo.get("today_stars", 0)
    commits = repo.get("commit_activity", 0)
    fork_ratio = forks / stars if stars > 0 else 0
    return round(stars + forks + fork_ratio * 1000 + today * 10 + commits * 2, 2)


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
