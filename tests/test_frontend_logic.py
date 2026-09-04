"""Frontend logic tests for web/app.js.

The app has no build step and no JS test framework, so instead of testing
DOM plumbing we load the full app source in a stubbed browser sandbox
(node:vm) via tests/js/logic_check.cjs and assert on the pure data-transform
helpers (license/tag classification, activity levels, sparkline geometry,
i18n lookup). Skips gracefully when node is not installed.

Run with:  pytest tests/test_frontend_logic.py -v
"""

import json
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
HARNESS = ROOT / "tests" / "js" / "logic_check.cjs"

pytestmark = pytest.mark.frontend_logic


@pytest.fixture(scope="module")
def probe():
    if shutil.which("node") is None:
        pytest.skip("node is not installed; frontend logic check skipped")
    result = subprocess.run(
        ["node", str(HARNESS)],
        capture_output=True,
        text=True,
        timeout=60,
        cwd=ROOT,
        check=False,
    )
    assert result.returncode == 0, (
        f"logic_check.cjs failed (rc={result.returncode}): {result.stderr.strip()}"
    )
    return json.loads(result.stdout)


def test_app_loads_in_sandbox(probe):
    assert probe["app_loaded"] is True


# ---------- getSparklinePath ---------------------------------------------------

def test_sparkline_draws_30_points(probe):
    assert probe["sparkline_is_polyline"] is True
    assert probe["sparkline_point_count"] == 30


def test_sparkline_suppressed_below_threshold(probe):
    # < 100 stars: the sparkline is noise, not signal — must render nothing
    assert probe["sparkline_below_threshold_empty"] is True


# ---------- getLicense ---------------------------------------------------------

def test_license_detected_mit(probe):
    assert probe["license_mit"] == "MIT"


def test_license_detected_apache_case_insensitive(probe):
    # Regression: the matcher used to uppercase the haystack but compare with
    # mixed-case keywords, so "Apache-2.0 licensed" never matched.
    assert probe["license_apache"] == "Apache"


def test_license_unknown_returns_none(probe):
    assert probe["license_none"] is None


# ---------- getActivityLevel ---------------------------------------------------

def test_activity_levels(probe):
    assert probe["activity_fresh"] == "veryActive"
    assert probe["activity_active"] == "active"
    assert probe["activity_stale"] == "stale"
    assert probe["activity_never"] == "never"


# ---------- getRepoTags --------------------------------------------------------

def test_tags_classified_from_name_and_description(probe):
    assert probe["tags"] == ["AI/ML", "DevOps"]


def test_tags_capped_at_two(probe):
    assert probe["tags_cap_two"] is True


# ---------- openModal href guard ----------------------------------------------

def test_modal_rejects_non_github_url_scheme(probe):
    # Regression: repo.url is scraped from third-party awesome lists; a planted
    # `javascript:` URL used to be assigned to the modal link verbatim.
    assert probe["modal_href_hostile"] == "https://github.com/evil/repo"


def test_modal_keeps_benign_github_url(probe):
    assert probe["modal_href_benign"] == "https://github.com/a/b"


# ---------- fmtNum ------------------------------------------------------------

def test_fmt_num_coerces_non_numeric_input(probe):
    assert probe["fmt_num_string_safe"] == "0"


# ---------- i18n ---------------------------------------------------------------

def test_i18n_lookup_and_fallback(probe):
    assert probe["i18n_zh_title"] == "GitHub"
    assert probe["i18n_fallback"] == "__missing_key__"
