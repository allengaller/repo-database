"""Unit tests for scripts/scrape.py and scripts/update_monthly.py.

Run with:  pytest tests/ -v
"""

import sys
from datetime import UTC, datetime, timedelta
from pathlib import Path

import pytest
import requests
import responses

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

import common
import scrape
import update_monthly

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


# ---------- freshness decay -------------------------------------------------

def test_calculate_score_fresh_fetch_is_full():
    """Right after fetch, freshness ≈ 1.0 → score equals the raw formula."""
    repo = {
        "stars": 1000,
        "forks": 100,
        "today_stars": 50,
        "commit_activity": 30,
        "fetched_at": "2026-07-26T00:00:00+00:00",
    }
    now = datetime(2026, 7, 26, 0, 0, tzinfo=UTC)
    # 1000 + 100 + 100 + 50*10 + 30*2 = 1760
    assert common.calculate_score(repo, now=now) == 1760.0


def test_calculate_score_at_half_life_decay():
    """After FRESHNESS_HALF_LIFE_DAYS, freshness ≈ 0.5."""
    repo = {
        "stars": 1000,
        "forks": 100,
        "today_stars": 50,
        "commit_activity": 30,
        "fetched_at": "2026-01-01T00:00:00+00:00",
    }
    # 120 days after fetch
    now = datetime(2026, 1, 1, tzinfo=UTC) + timedelta(days=120)
    decay = common.freshness_decay(repo, now=now)
    assert 0.49 < decay < 0.51
    # Effective score: 1200 base + 50*10*0.5 + 30*2*0.5 = 1200 + 250 + 30 = 1480
    assert common.calculate_score(repo, now=now) == 1480.0


def test_calculate_score_decay_floors_at_minimum():
    """Very stale repos never decay below the floor (~5%)."""
    repo = {
        "stars": 1000,
        "forks": 100,
        "today_stars": 50,
        "commit_activity": 30,
        "fetched_at": "2020-01-01T00:00:00+00:00",
    }
    now = datetime(2030, 1, 1, tzinfo=UTC)  # 10 years later
    decay = common.freshness_decay(repo, now=now)
    assert decay == common.FRESHNESS_FLOOR
    # Effective score: 1200 base + 50*10*0.05 + 30*2*0.05 = 1200 + 25 + 3 = 1228
    assert common.calculate_score(repo, now=now) == 1228.0


def test_calculate_score_missing_fetched_at_is_one():
    """Decay is 1.0 when fetched_at is missing — never penalise unknowns."""
    repo = {
        "stars": 1000, "forks": 100, "today_stars": 50, "commit_activity": 30,
    }
    far_future = datetime.now(UTC) + timedelta(days=10 * 365)
    assert common.freshness_decay(repo, now=far_future) == 1.0


def test_calculate_score_malformed_fetched_at_is_one():
    """Unparseable timestamps don't crash; freshness falls back to 1.0."""
    repo = {
        "stars": 1000, "forks": 100, "today_stars": 50, "commit_activity": 30,
        "fetched_at": "not-a-date",
    }
    assert common.freshness_decay(repo) == 1.0


def test_calculate_score_stars_and_forks_dont_decay():
    """Only the freshness signals decay — stars/forks accumulate permanently."""
    repo = {
        "stars": 50_000, "forks": 5_000, "today_stars": 0, "commit_activity": 0,
        "fetched_at": "2020-01-01T00:00:00+00:00",
    }
    now = datetime(2030, 1, 1, tzinfo=UTC)
    # 50000 + 5000 + (5000/50000)*1000 = 55000 + 100 = 55100 (no decay on base)
    assert common.calculate_score(repo, now=now) == 55100.0


# ---------- estimate_today_stars --------------------------------------------

def _iso(dt):
    return dt.astimezone(UTC).isoformat().replace("+00:00", "Z")


def test_estimate_today_stars_recent_push():
    now = datetime.now(UTC)
    repo = {
        "pushed_at": _iso(now - timedelta(hours=3)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    assert scrape.estimate_today_stars(repo) == 100


def test_estimate_today_stars_week_old_push():
    now = datetime.now(UTC)
    repo = {
        "pushed_at": _iso(now - timedelta(days=5)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    # 5 days = 120h, falls in the 72..168h bucket → push_score = 15
    assert scrape.estimate_today_stars(repo) == 15


def test_estimate_today_stars_stale_push():
    now = datetime.now(UTC)
    repo = {
        "pushed_at": _iso(now - timedelta(days=60)),
        "created_at": _iso(now - timedelta(days=365)),
        "stargazers_count": 5000,
    }
    assert scrape.estimate_today_stars(repo) == 0


def test_estimate_today_stars_new_viral_repo():
    now = datetime.now(UTC)
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
    # Returned list must be sorted for determinism
    assert repos == sorted(repos)


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


def test_parse_awesome_list_no_longer_capped_at_50():
    lines = [f"* [r{i}](https://github.com/owner/r{i})" for i in range(200)]
    repos = scrape.parse_awesome_list("\n".join(lines))
    # Cap removed so caller can decide; the full set should be returned.
    assert len(repos) == 200


def test_parse_awesome_list_strips_trailing_punctuation():
    md = """
* [Flask](https://github.com/pallets/flask).
* [Requests](https://github.com/psf/requests),
* [Django](https://github.com/django/django).
"""
    repos = scrape.parse_awesome_list(md)
    assert "pallets/flask" in repos
    assert "psf/requests" in repos
    assert "django/django" in repos


def test_parse_awesome_list_handles_subpaths():
    md = """
* [HTTPie CLI](https://github.com/httpie/cli/tree/main) — header here
* [Some docs](https://github.com/owner/docs/blob/main/README.md)
"""
    repos = scrape.parse_awesome_list(md)
    assert "httpie/cli" in repos
    assert "owner/docs" in repos


def test_parse_awesome_list_handles_nested_markdown_links():
    """A badge-wrapped link: ``[![X](inner)](github-url)`` should match
    the outer GitHub URL, not truncate at the inner ``)``."""
    md = (
        "* Star [![star](https://img.shields.io/github/stars/pallets/flask.svg)]"
        "(https://github.com/pallets/flask)\n"
    )
    repos = scrape.parse_awesome_list(md)
    assert "pallets/flask" in repos


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


# ---------- HTTP mocking (responses) -----------------------------------------
# All GitHub / HN / DEV.to calls go through these mocked routes so the test
# suite is hermetic — no token, no network, deterministic fixtures.


@responses.activate
def test_fetch_commit_activity_sums_last_four_weeks():
    # GitHub returns the array ordered chronologically (oldest first);
    # the implementation slices [-4:] to take the most recent 4 weeks.
    payload = [
        {"total": 5, "week": 1},
        {"total": 7, "week": 2},
        {"total": 2, "week": 3},
        {"total": 9, "week": 4},
        {"total": 11, "week": 5},
    ]
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar/stats/commit_activity",
        json=payload,
        status=200,
    )
    # Last four are: 7, 2, 9, 11 → 29
    assert scrape.fetch_commit_activity("foo", "bar") == 29


@responses.activate
def test_fetch_commit_activity_handles_cache_miss():
    # GitHub returns 202 + empty body when stats are still computing.
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar/stats/commit_activity",
        status=202,
        body="",
    )
    assert scrape.fetch_commit_activity("foo", "bar") == 0


@responses.activate
def test_fetch_commit_activity_handles_malformed_body():
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar/stats/commit_activity",
        json={"oops": "not a list"},
        status=200,
    )
    assert scrape.fetch_commit_activity("foo", "bar") == 0


@responses.activate
def test_fetch_github_repo_details_returns_payload():
    body = {
        "full_name": "foo/bar",
        "html_url": "https://github.com/foo/bar",
        "description": "test",
        "stargazers_count": 42,
        "forks_count": 7,
        "language": "Python",
    }
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar",
        json=body,
        status=200,
    )
    out = scrape.fetch_github_repo_details("foo", "bar")
    assert out["stargazers_count"] == 42
    assert out["language"] == "Python"


@responses.activate
def test_fetch_github_repo_details_handles_404():
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar",
        json={"message": "Not Found"},
        status=404,
    )
    assert scrape.fetch_github_repo_details("foo", "bar") is None


@responses.activate
def test_fetch_github_repo_details_handles_403():
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar",
        json={"message": "API rate limit exceeded"},
        status=403,
    )
    assert scrape.fetch_github_repo_details("foo", "bar") is None


@responses.activate
def test_search_github_repos_returns_items():
    body = {
        "total_count": 2,
        "items": [
            {"full_name": "foo/bar", "stargazers_count": 1},
            {"full_name": "baz/qux", "stargazers_count": 2},
        ],
    }
    responses.add(
        responses.GET,
        "https://api.github.com/search/repositories",
        json=body,
        status=200,
    )
    out = scrape.search_github_repos("anything", min_stars=10)
    assert [r["full_name"] for r in out] == ["foo/bar", "baz/qux"]


@responses.activate
def test_search_github_repos_handles_403(monkeypatch):
    monkeypatch.setattr(scrape.time, "sleep", lambda *_a, **_k: None)
    responses.add(
        responses.GET,
        "https://api.github.com/search/repositories",
        json={"message": "rate limit"},
        status=403,
    )
    assert scrape.search_github_repos("anything") == []


@responses.activate
def test_update_monthly_search_repos_returns_items():
    body = {
        "total_count": 1,
        "items": [{"full_name": "owner/repo", "stargazers_count": 9}],
    }
    responses.add(
        responses.GET,
        "https://api.github.com/search/repositories",
        json=body,
        status=200,
    )
    out = update_monthly.search_repos("created:2026-05-01..2026-05-31 stars:>5")
    assert out[0]["full_name"] == "owner/repo"


@responses.activate
def test_update_monthly_search_repos_handles_403(monkeypatch):
    monkeypatch.setattr(update_monthly.time, "sleep", lambda *_a, **_k: None)
    responses.add(
        responses.GET,
        "https://api.github.com/search/repositories",
        json={"message": "rate limit"},
        status=403,
    )
    assert update_monthly.search_repos("anything") == []


@responses.activate
def test_estimate_today_stars_against_mocked_repo():
    """Smoke test ensuring formatter produces a dict with the fields
    fetch_commit_activity expects when round-tripped through the API."""
    api_payload = {
        "full_name": "foo/bar",
        "html_url": "https://github.com/foo/bar",
        "description": "x",
        "stargazers_count": 200,
        "forks_count": 10,
        "language": "Go",
        "pushed_at": "2026-07-26T00:00:00Z",
        "created_at": "2024-01-01T00:00:00Z",
    }
    responses.add(
        responses.GET,
        "https://api.github.com/repos/foo/bar",
        json=api_payload,
        status=200,
    )
    details = scrape.fetch_github_repo_details("foo", "bar")
    assert details is not None
    formatted = scrape.format_api_repo(details)
    assert formatted["name"] == "foo/bar"
    assert formatted["stars"] == 200
    assert scrape.estimate_today_stars(api_payload) >= 0


# ---------- stdout encoding defense -----------------------------------------

def test_configure_stdout_is_idempotent():
    """Calling reconfigure twice (or on a non-reconfigurable stream)
    must not raise — we want this to be safe to call unconditionally."""
    scrape._configure_stdout()
    scrape._configure_stdout()


def test_configure_stdout_swallows_unsupported_streams():
    """If ``sys.stdout`` is something exotic without ``reconfigure``
    (e.g. captured by pytest's capsys, or running on older interpreters),
    the helper must silently no-op rather than crash startup."""
    class _NoReconfigure:  # a stream that has no reconfigure attribute
        pass

    fake = _NoReconfigure()
    original = sys.stdout
    sys.stdout = fake  # type: ignore[assignment]
    try:
        scrape._configure_stdout()  # must not raise
    finally:
        sys.stdout = original  # type: ignore[assignment]
    assert sys.stdout is original
