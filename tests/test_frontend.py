"""Smoke tests for frontend assets and data integrity.

Run with:  pytest tests/test_frontend.py -v
"""

import json
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "repos.json"
WEB_DIR = ROOT / "web"

REQUIRED_REPO_FIELDS = [
    "name", "url", "description", "stars", "forks",
    "language", "today_stars", "score", "fetched_at", "source",
]


# ---------- data/repos.json -------------------------------------------------


@pytest.fixture(scope="module")
def repos_data():
    """Load repos.json once for all tests in this module."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def test_data_file_exists():
    assert DATA_FILE.exists(), f"Missing {DATA_FILE}"


def test_data_is_valid_json():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    assert isinstance(data, dict)
    assert "repos" in data
    assert "total" in data


def test_data_has_repos(repos_data):
    assert len(repos_data["repos"]) > 0, "repos array is empty"


def test_repo_schema(repos_data):
    """Every repo must have the required fields."""
    for repo in repos_data["repos"][:50]:  # check first 50 for speed
        for field in REQUIRED_REPO_FIELDS:
            assert field in repo, f"Missing field '{field}' in repo {repo.get('name', '?')}"


def test_repos_sorted_by_score_desc(repos_data):
    """Repos should be sorted by score in descending order."""
    scores = [r["score"] for r in repos_data["repos"]]
    assert scores == sorted(scores, reverse=True), "repos.json not sorted by score desc"


def test_stars_are_non_negative(repos_data):
    for repo in repos_data["repos"][:50]:
        assert repo["stars"] >= 0, f"{repo['name']} has negative stars"


# ---------- web/ static assets -----------------------------------------------


def test_index_html_exists():
    assert (WEB_DIR / "index.html").exists()


def test_app_js_exists():
    assert (WEB_DIR / "app.js").exists()


def test_styles_css_exists():
    assert (WEB_DIR / "styles.css").exists()


def test_manifest_json_exists():
    assert (WEB_DIR / "manifest.json").exists()


def test_sw_js_exists():
    assert (WEB_DIR / "sw.js").exists()


def test_index_html_has_chinese_lang():
    html = (WEB_DIR / "index.html").read_text(encoding="utf-8")
    assert 'lang="zh-CN"' in html


def test_index_html_references_assets():
    html = (WEB_DIR / "index.html").read_text(encoding="utf-8")
    assert 'src="app.js"' in html
    assert 'href="styles.css"' in html
