"""Unit tests for scripts/catalog.py.

Run with:  pytest tests/test_catalog.py -v
"""

import os
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

import catalog  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent


# ---------- parse_frontmatter ------------------------------------------------

VALID_PROFILE = """---
name: owner/repo
url: https://github.com/owner/repo
domain: ai-agents
type: framework
languages: [Python, Rust]
stars: 42
forks: 7
license: MIT
discovered: 2026-06-28
updated: 2026-07-29
rating: 4
status: active
tags: [llm, agents]
summary: 一句话简介
---

# Body

content here
"""


def test_parse_frontmatter_valid():
    meta, body = catalog.parse_frontmatter(VALID_PROFILE)
    assert meta["name"] == "owner/repo"
    assert meta["stars"] == 42
    assert meta["rating"] == 4
    assert meta["languages"] == ["Python", "Rust"]
    assert meta["tags"] == ["llm", "agents"]
    assert meta["summary"] == "一句话简介"
    assert body.startswith("\n# Body")


def test_parse_frontmatter_empty_list():
    text = VALID_PROFILE.replace("tags: [llm, agents]", "tags: []")
    meta, _ = catalog.parse_frontmatter(text)
    assert meta["tags"] == []


def test_parse_frontmatter_missing_open():
    with pytest.raises(ValueError):
        catalog.parse_frontmatter("# just a doc\n")


def test_parse_frontmatter_missing_close():
    with pytest.raises(ValueError):
        catalog.parse_frontmatter("---\nname: x\n")


def test_parse_frontmatter_bad_int():
    text = VALID_PROFILE.replace("stars: 42", "stars: many")
    with pytest.raises(ValueError):
        catalog.parse_frontmatter(text)


def test_parse_frontmatter_bad_list():
    text = VALID_PROFILE.replace("tags: [llm, agents]", "tags: llm")
    with pytest.raises(ValueError):
        catalog.parse_frontmatter(text)


# ---------- dump_frontmatter roundtrip ---------------------------------------

def test_dump_frontmatter_roundtrip():
    meta, _ = catalog.parse_frontmatter(VALID_PROFILE)
    dumped = catalog.dump_frontmatter(meta)
    meta2, _ = catalog.parse_frontmatter(dumped + "\nbody\n")
    assert meta2 == meta


def test_dump_frontmatter_field_order():
    meta, _ = catalog.parse_frontmatter(VALID_PROFILE)
    lines = catalog.dump_frontmatter(meta).splitlines()
    keys = [ln.split(":")[0] for ln in lines[1:-1]]
    assert keys == catalog.FIELD_ORDER


# ---------- parse_github_url --------------------------------------------------

@pytest.mark.parametrize(
    "url, expected",
    [
        ("https://github.com/owner/repo", ("owner", "repo")),
        ("https://github.com/owner/repo/", ("owner", "repo")),
        ("https://github.com/owner/repo.git", ("owner", "repo")),
        ("owner/repo", ("owner", "repo")),
        ("http://github.com/a-b/c_d.e", ("a-b", "c_d.e")),
    ],
)
def test_parse_github_url(url, expected):
    assert catalog.parse_github_url(url) == expected


def test_parse_github_url_invalid():
    with pytest.raises(ValueError):
        catalog.parse_github_url("https://gitlab.com/owner/repo")


# ---------- profile_filename --------------------------------------------------

def test_profile_filename():
    assert catalog.profile_filename("PsyLLM") == "psyllm.md"
    assert catalog.profile_filename("vipassana_android") == "vipassana-android.md"


# ---------- validate_profile --------------------------------------------------

def make_meta(**overrides):
    meta, _ = catalog.parse_frontmatter(VALID_PROFILE)
    meta.update(overrides)
    return meta


def test_validate_profile_ok():
    meta = make_meta()
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert errors == []


def test_validate_profile_missing_field():
    meta = make_meta()
    del meta["summary"]
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("summary" in e for e in errors)


def test_validate_profile_bad_domain():
    meta = make_meta(domain="nonsense")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("domain" in e for e in errors)


def test_validate_profile_domain_dir_mismatch():
    meta = make_meta(domain="mindfulness-apps")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("does not match directory" in e for e in errors)


def test_validate_profile_bad_type():
    meta = make_meta(type="banana")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("type" in e for e in errors)


def test_validate_profile_bad_date():
    meta = make_meta(discovered="June 2026")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("YYYY-MM-DD" in e for e in errors)


def test_validate_profile_rating_out_of_range():
    meta = make_meta(rating=9)
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("rating" in e for e in errors)


def test_validate_profile_filename_mismatch():
    meta = make_meta()
    errors = catalog.validate_profile("catalog/ai-agents/wrong-name.md", meta)
    assert any("filename" in e for e in errors)


def test_validate_profile_url_name_mismatch():
    meta = make_meta(url="https://github.com/other/repo")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert any("does not match name" in e for e in errors)


def test_validate_profile_url_trailing_slash_ok():
    meta = make_meta(url="https://github.com/owner/repo/")
    errors = catalog.validate_profile("catalog/ai-agents/repo.md", meta)
    assert errors == []


# ---------- md_cell ------------------------------------------------------------

def test_md_cell_escapes_pipe():
    assert catalog.md_cell("a | b") == "a \\| b"
    assert catalog.md_cell("plain") == "plain"


# ---------- against the real catalog/ ----------------------------------------

@pytest.fixture()
def in_repo_root(monkeypatch):
    monkeypatch.chdir(ROOT)


def test_real_catalog_profiles_valid(in_repo_root):
    count = 0
    for path, meta, _ in catalog.iter_profiles():
        count += 1
        assert catalog.validate_profile(path, meta) == [], path
    assert count >= 14


def test_real_index_is_fresh(in_repo_root):
    with open(catalog.INDEX_FILE, encoding="utf-8") as f:
        current = f.read()
    assert current == catalog.build_index(), (
        "catalog/INDEX.md is stale; run: python scripts/catalog.py index"
    )


def test_build_index_is_deterministic(in_repo_root):
    assert catalog.build_index() == catalog.build_index()


def test_template_parses(in_repo_root):
    with open(catalog.TEMPLATE_FILE, encoding="utf-8") as f:
        meta, body = catalog.parse_frontmatter(f.read())
    assert meta["name"] == "owner/repo"
    assert "## 一、项目基本信息" in body
