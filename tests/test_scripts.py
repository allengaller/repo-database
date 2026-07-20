"""Unit tests for scripts/scrape.py and scripts/update_monthly.py.

Run with:  pytest tests/ -v
"""

import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest
import requests

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

import scrape  # noqa: E402
import update_monthly  # noqa: E402
import common  # noqa: E402


# ---------- parse_num --------------------------------------------------------

@pytest.mark.parametrize(
    "text, expected",
    [
        ("123", 123),
        ("1,234", 1234),
        ("1.2k", 1200),
        ("3.4K", 3400),
        ("2.5m", 2_500_000),
        ("garbage", 0),
        ("", 0),
    ],
)
def test_parse_num(text, expected):
    assert scrape.parse_num(text) == expected


# ---------- calculate_score --------------------------------------------------

def test_calculate_score_basic():
    repo = {"stars": 1000, "forks": 100, "today_stars": 0, "commit_activity": 0}
    # 1000 + 100 + (100/1000)*1000 = 1200
    assert scrape.calculate_score(repo) == 1200.0


def test_calculate_score_with_today_and_commits():
    repo = {"stars": 1000, "forks": 100, "today_stars": 50, "commit_activity": 30}
    # 1000 + 100 + 100 + 500 + 60 = 1760
    assert scrape.calculate_score(repo) == 1760.0


def test_calculate_score_zero_stars():
    # fork_ratio must not divide by zero
    repo = {"stars": 0, "forks": 0, "today_stars": 10, "commit_activity": 0}
    assert scrape.calculate_score(repo) == 100.0


# ---------- estimate_today_stars --------------------------------------------

def _iso(dt):
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def test_estimate_today_stars_recent_push():
    now = datetime.now(timezone.utc)
    repo = {
        "pushed_at": _iso(now - timedelta(hours=3)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    assert scrape.estimate_today_stars(repo) == 100


def test_estimate_today_stars_week_old_push():
    now = datetime.now(timezone.utc)
    repo = {
        "pushed_at": _iso(now - timedelta(days=5)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    # 5 days = 120h, falls in the 72..168h bucket → push_score = 15
    assert scrape.estimate_today_stars(repo) == 15


def test_estimate_today_stars_stale_push():
    now = datetime.now(timezone.utc)
    repo = {
        "pushed_at": _iso(now - timedelta(days=60)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    assert scrape.estimate_today_stars(repo) == 0


def test_estimate_today_stars_new_viral_repo():
    now = datetime.now(timezone.utc)
    repo = {
        "pushed_at": _iso(now - timedelta(hours=6)),
        "created_at": _iso(now - timedelta(days=5)),
        "stargazers_count": 2000,
    }
    # base 100 (pushed today) + boost for viral new (min(2000/5/10,50)=40) = 140
    assert scrape.estimate_today_stars(repo) >= 100


def test_estimate_today_stars_missing_fields():
    assert scrape.estimate_today_stars({}) == 0
    assert scrape.estimate_today_stars({"pushed_at": "not-a-date"}) == 0


# ---------- parse_awesome_list ----------------------------------------------

def test_parse_awesome_list_extracts_repos():
    md = """
# Awesome Python

* [Flask](https://github.com/pallets/flask) - web framework
* [Requests](https://github.com/psf/requests) - HTTP for humans
* [Django](https://github.com/django/django)
"""
    repos = scrape.parse_awesome_list(md)
    assert "pallets/flask" in repos
    assert "psf/requests" in repos
    assert "django/django" in repos


def test_parse_awesome_list_skips_non_repos():
    md = """
* [Features](https://github.com/features)
* [Awesome-python itself](https://github.com/vinta/awesome-python)
* [Valid](https://github.com/foo/bar)
"""
    repos = scrape.parse_awesome_list(md)
    assert "features" not in [r.split("/")[0] for r in repos]
    assert "vinta/awesome-python" not in repos
    assert "foo/bar" in repos


def test_parse_awesome_list_caps_at_50():
    lines = [f"* [r{i}](https://github.com/owner/r{i})" for i in range(200)]
    repos = scrape.parse_awesome_list("\n".join(lines))
    assert len(repos) == 50


# ---------- merge_and_sort --------------------------------------------------

def test_merge_and_sort_dedup_field_wise():
    r1 = {
        "name": "a/b",
        "url": "u",
        "description": "d1",
        "stars": 1000,
        "forks": 100,
        "language": "Python",
        "today_stars": 0,
        "score": 0,
        "fetched_at": "2026-01-01",
        "source": "awesome_list",
    }
    r2 = {
        "name": "a/b",
        "url": "u",
        "description": "d2",
        "stars": 900,
        "forks": 200,
        "language": "Python",
        "today_stars": 80,
        "score": 0,
        "fetched_at": "2026-06-01",
        "source": "trending",
    }
    result = scrape.merge_and_sort({"x": r1, "y": r2})
    assert len(result) == 1
    merged = result[0]
    assert merged["stars"] == 1000         # max
    assert merged["forks"] == 200          # max
    assert merged["today_stars"] == 80     # max (was 0 in r1)
    assert merged["source"] == "awesome_list+trending"
    assert merged["fetched_at"] == "2026-06-01"


def test_merge_and_sort_sorts_descending_by_score():
    repos = {
        f"o/{i}": {
            "name": f"o/{i}",
            "url": "",
            "description": "",
            "stars": i * 100,
            "forks": 0,
            "language": "Python",
            "today_stars": 0,
            "score": 0,
            "fetched_at": "",
            "source": "github_api",
        }
        for i in range(1, 6)
    }
    result = scrape.merge_and_sort(repos)
    stars = [r["stars"] for r in result]
    assert stars == sorted(stars, reverse=True)


# ---------- format_api_repo -------------------------------------------------

def test_format_api_repo_schema():
    api_resp = {
        "full_name": "foo/bar",
        "html_url": "https://github.com/foo/bar",
        "description": "hi",
        "stargazers_count": 123,
        "forks_count": 12,
        "language": "Go",
    }
    out = scrape.format_api_repo(api_resp)
    for field in (
        "name",
        "url",
        "description",
        "stars",
        "forks",
        "language",
        "today_stars",
        "score",
        "fetched_at",
        "source",
    ):
        assert field in out
    assert out["name"] == "foo/bar"
    assert out["stars"] == 123


# ---------- update_monthly.calculate_score ----------------------------------

def test_update_monthly_calculate_score():
    repo = {"stars": 500, "forks": 50, "today_stars": 0, "commit_activity": 0}
    # 500 + 50 + (50/500)*1000 = 650
    assert update_monthly.calculate_score(repo) == 650.0


def test_update_monthly_calculate_score_with_momentum():
    """Ensure update_monthly.calculate_score matches scrape.py formula."""
    repo = {"stars": 1000, "forks": 100, "today_stars": 50, "commit_activity": 30}
    # 1000 + 100 + 100 + 500 + 60 = 1760 (same as scrape.calculate_score)
    assert update_monthly.calculate_score(repo) == 1760.0


# ---------- headers ---------------------------------------------------------

def test_get_headers_without_token(monkeypatch):
    monkeypatch.setattr(common, "GITHUB_TOKEN", None)
    headers = scrape.get_headers()
    assert "Authorization" not in headers
    assert headers["User-Agent"].startswith("Mozilla")


def test_get_headers_with_token(monkeypatch):
    monkeypatch.setattr(common, "GITHUB_TOKEN", "ghp_xxx")
    assert scrape.get_headers()["Authorization"] == "Bearer ghp_xxx"


# ---------- get_session -----------------------------------------------------

def test_get_session_returns_session():
    session = scrape.get_session()
    assert isinstance(session, requests.Session)
    # Verify retry adapter is mounted for https
    adapter = session.get_adapter("https://api.github.com")
    assert adapter.max_retries.total == 3
