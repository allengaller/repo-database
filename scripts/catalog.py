#!/usr/bin/env python3
"""
Catalog manager for the curated repo archive under catalog/.

Usage:
    python scripts/catalog.py new <github-url> --domain <domain>   # draft a new profile
    python scripts/catalog.py index                                # rebuild catalog/INDEX.md
    python scripts/catalog.py validate                             # validate profiles + index freshness
    python scripts/catalog.py refresh                              # update stars/forks/etc. from GitHub API
    GITHUB_TOKEN=xxx python scripts/catalog.py refresh
"""

import argparse
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import get_headers

CATALOG_DIR = "catalog"
INDEX_FILE = os.path.join(CATALOG_DIR, "INDEX.md")
TEMPLATE_FILE = os.path.join(CATALOG_DIR, "_template.md")

DOMAINS = [
    "ai-agents",
    "ai-engineering",
    "ai-mental-health",
    "creative-coding",
    "culture-arts",
    "mind-philosophy",
    "mindfulness-apps",
]
TYPES = [
    "framework", "library", "application", "model", "dataset",
    "awesome-list", "tool", "course", "other",
]
STATUSES = ["active", "archived", "watch"]

REQUIRED_FIELDS = [
    "name", "url", "domain", "type", "discovered", "updated", "rating", "summary",
]
# Canonical frontmatter field order used when (re)writing profiles.
FIELD_ORDER = [
    "name", "url", "domain", "type", "languages", "stars", "forks",
    "license", "discovered", "updated", "rating", "status", "tags", "summary",
]
INT_FIELDS = {"stars", "forks", "rating"}
LIST_FIELDS = {"languages", "tags"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

DOMAIN_LABELS = {
    "ai-agents": "AI Agents",
    "ai-engineering": "AI 工程基础设施",
    "ai-mental-health": "AI × 心理健康",
    "creative-coding": "创意编程 × 生成艺术",
    "culture-arts": "文化 × 数字人文",
    "mind-philosophy": "心智哲学 × 计算",
    "mindfulness-apps": "冥想/正念应用",
}


# ---------------------------------------------------------------- frontmatter

def parse_frontmatter(text):
    """Parse the simple YAML subset used by catalog profiles.

    Supports `key: value` with str / int / inline list values only.
    Returns (meta_dict, body_str). Raises ValueError on malformed input.
    """
    if not text.startswith("---\n"):
        raise ValueError("missing frontmatter opening '---'")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("missing frontmatter closing '---'")
    meta = {}
    for line in text[4:end].splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"malformed frontmatter line: {line!r}")
        key, _, raw = line.partition(":")
        key = key.strip()
        raw = raw.strip()
        # strip trailing inline comment (only outside quotes/brackets)
        if " #" in raw and not raw.startswith("["):
            raw = raw.split(" #", 1)[0].strip()
        if key in LIST_FIELDS:
            if not (raw.startswith("[") and raw.endswith("]")):
                raise ValueError(f"field '{key}' must be an inline list, got: {raw!r}")
            inner = raw[1:-1].strip()
            meta[key] = [v.strip().strip("'\"") for v in inner.split(",") if v.strip()]
        elif key in INT_FIELDS:
            try:
                meta[key] = int(raw)
            except ValueError:
                raise ValueError(f"field '{key}' must be an integer, got: {raw!r}")
        else:
            meta[key] = raw.strip("'\"")
    body = text[end + 5:]
    return meta, body


def dump_frontmatter(meta):
    """Serialize a meta dict back to frontmatter text (canonical field order)."""
    lines = ["---"]
    keys = [k for k in FIELD_ORDER if k in meta]
    keys += [k for k in meta if k not in FIELD_ORDER]
    for key in keys:
        value = meta[key]
        if key in LIST_FIELDS:
            lines.append(f"{key}: [{', '.join(value)}]")
        else:
            lines.append(f"{key}: {value}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def iter_profiles():
    """Yield (path, meta, body) for every profile under catalog/<domain>/."""
    for domain in sorted(os.listdir(CATALOG_DIR)):
        domain_dir = os.path.join(CATALOG_DIR, domain)
        if not os.path.isdir(domain_dir) or domain.startswith((".", "_")):
            continue
        for fname in sorted(os.listdir(domain_dir)):
            if not fname.endswith(".md"):
                continue
            path = os.path.join(domain_dir, fname)
            with open(path, encoding="utf-8") as f:
                text = f.read()
            meta, body = parse_frontmatter(text)
            yield path, meta, body


# ---------------------------------------------------------------------- new

def parse_github_url(url):
    """Extract (owner, repo) from a GitHub URL or owner/repo shorthand."""
    m = re.match(r"^(?:https?://github\.com/)?([\w.-]+)/([\w.-]+?)(?:\.git)?/?$", url)
    if not m:
        raise ValueError(f"not a GitHub repo URL: {url!r}")
    return m.group(1), m.group(2)


def fetch_repo_info(owner, repo):
    """Fetch basic repo info from the GitHub API. Returns {} on failure."""
    import requests

    resp = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}",
        headers=get_headers(), timeout=30,
    )
    if resp.status_code != 200:
        print(f"  Warning: GitHub API returned {resp.status_code} for {owner}/{repo}")
        return {}
    return resp.json()


def profile_filename(repo):
    """Derive the profile filename from a repo name."""
    return repo.lower().replace("_", "-") + ".md"


def cmd_new(args):
    owner, repo = parse_github_url(args.url)
    if args.domain not in DOMAINS:
        print(f"Error: unknown domain '{args.domain}'. Choose from: {', '.join(DOMAINS)}")
        return 1
    path = os.path.join(CATALOG_DIR, args.domain, profile_filename(repo))
    if os.path.exists(path):
        print(f"Error: profile already exists: {path}")
        return 1

    info = fetch_repo_info(owner, repo)
    if not info:
        print("  Warning: repo metadata unavailable; stars/forks/license below are")
        print("  placeholders. Run `python scripts/catalog.py refresh` to backfill.")
    today = date.today().isoformat()
    meta = {
        "name": f"{owner}/{repo}",
        "url": f"https://github.com/{owner}/{repo}",
        "domain": args.domain,
        "type": "other",
        "languages": [info["language"]] if info.get("language") else [],
        "stars": info.get("stargazers_count", 0),
        "forks": info.get("forks_count", 0),
        "license": (info.get("license") or {}).get("spdx_id") or "unknown",
        "discovered": today,
        "updated": today,
        "rating": 3,
        "status": "watch",
        "tags": [],
        "summary": (info.get("description") or "TODO: 一句话简介").strip(),
    }

    with open(TEMPLATE_FILE, encoding="utf-8") as f:
        _, template_body = parse_frontmatter(f.read())
    body = template_body.replace("{项目名称}", repo).replace(
        "https://github.com/owner/repo", meta["url"]
    )

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(dump_frontmatter(meta) + body)
    print(f"Created draft: {path}")
    print("Next: fill in the analysis sections, adjust type/rating/tags/summary,")
    print("then run: python scripts/catalog.py index && python scripts/catalog.py validate")
    return 0


# -------------------------------------------------------------------- index

def md_cell(value):
    """Escape a value for use inside a Markdown table cell."""
    return str(value).replace("|", "\\|")


def build_index():
    """Build the INDEX.md content from all profiles (no timestamp: idempotent)."""
    profiles = [(path, meta) for path, meta, _ in iter_profiles()]
    total = len(profiles)

    lines = [
        "# Catalog 总索引",
        "",
        "> 本文件由 `python scripts/catalog.py index` 自动生成，请勿手动编辑。",
        f"> 收录档案：{total} 篇 · 分类规范见 [README.md](README.md)",
        "",
        "## 按领域",
        "",
    ]

    by_domain = {}
    for path, meta in profiles:
        by_domain.setdefault(meta.get("domain", "?"), []).append((path, meta))

    for domain in sorted(by_domain):
        label = DOMAIN_LABELS.get(domain, domain)
        lines.append(f"### {label} (`{domain}/`)")
        lines.append("")
        lines.append("| 项目 | ⭐ | 类型 | 评价 | 状态 | 简介 | 档案 |")
        lines.append("|------|-----|------|------|------|------|------|")
        entries = sorted(
            by_domain[domain],
            key=lambda e: (-e[1].get("rating", 0), -e[1].get("stars", 0)),
        )
        for path, meta in entries:
            rel = os.path.relpath(path, CATALOG_DIR)
            rating = "⭐" * meta.get("rating", 0)
            lines.append(
                f"| [{md_cell(meta['name'])}]({meta['url']}) | {meta.get('stars', 0)} "
                f"| {meta.get('type', '?')} | {rating} | {meta.get('status', '?')} "
                f"| {md_cell(meta.get('summary', ''))} | [{os.path.basename(path)}]({rel}) |"
            )
        lines.append("")

    lines.append("## 按类型")
    lines.append("")
    by_type = {}
    for path, meta in profiles:
        by_type.setdefault(meta.get("type", "?"), []).append(meta)
    lines.append("| 类型 | 数量 | 项目 |")
    lines.append("|------|------|------|")
    for tname in sorted(by_type):
        names = ", ".join(m["name"] for m in sorted(by_type[tname], key=lambda m: m["name"]))
        lines.append(f"| {tname} | {len(by_type[tname])} | {names} |")
    lines.append("")

    lines.append("## 按发现时间")
    lines.append("")
    by_month = {}
    for path, meta in profiles:
        month = str(meta.get("discovered", "?"))[:7]
        by_month.setdefault(month, []).append(meta)
    lines.append("| 月份 | 数量 | 项目 |")
    lines.append("|------|------|------|")
    for month in sorted(by_month, reverse=True):
        names = ", ".join(m["name"] for m in sorted(by_month[month], key=lambda m: m["name"]))
        lines.append(f"| {month} | {len(by_month[month])} | {names} |")
    lines.append("")

    return "\n".join(lines)


def cmd_index(args):
    content = build_index()
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {INDEX_FILE}")
    return 0


# ----------------------------------------------------------------- validate

def validate_profile(path, meta):
    """Return a list of error strings for one profile."""
    errors = []
    for field in REQUIRED_FIELDS:
        if field not in meta or meta[field] in ("", None):
            errors.append(f"missing required field '{field}'")
    domain_dir = os.path.basename(os.path.dirname(path))
    if meta.get("domain") not in DOMAINS:
        errors.append(f"unknown domain '{meta.get('domain')}'")
    elif meta["domain"] != domain_dir:
        errors.append(f"domain '{meta['domain']}' does not match directory '{domain_dir}'")
    if meta.get("type") not in TYPES:
        errors.append(f"unknown type '{meta.get('type')}'")
    if meta.get("status", "active") not in STATUSES:
        errors.append(f"unknown status '{meta.get('status')}'")
    for field in ("discovered", "updated"):
        value = str(meta.get(field, ""))
        if value and not DATE_RE.match(value):
            errors.append(f"field '{field}' must be YYYY-MM-DD, got '{value}'")
    rating = meta.get("rating")
    if isinstance(rating, int) and not 1 <= rating <= 5:
        errors.append(f"rating must be 1-5, got {rating}")
    name = meta.get("name", "")
    if name and "/" in name:
        expected = profile_filename(name.split("/", 1)[1])
        actual = os.path.basename(path)
        if actual != expected and not actual.startswith(expected[:-3] + "-"):
            errors.append(f"filename '{actual}' does not match repo name (expected '{expected}')")
    url = str(meta.get("url", ""))
    if name and url and url.rstrip("/") != f"https://github.com/{name}":
        errors.append(f"url '{url}' does not match name '{name}'")
    return errors


def cmd_validate(args):
    failed = False
    count = 0
    for path, meta, _ in iter_profiles():
        count += 1
        for err in validate_profile(path, meta):
            print(f"{path}: {err}")
            failed = True

    if not os.path.exists(INDEX_FILE):
        print(f"{INDEX_FILE}: missing (run: python scripts/catalog.py index)")
        failed = True
    else:
        with open(INDEX_FILE, encoding="utf-8") as f:
            current = f.read()
        if current != build_index():
            print(f"{INDEX_FILE}: stale (run: python scripts/catalog.py index)")
            failed = True

    if failed:
        print("Validation FAILED")
        return 1
    print(f"Validation OK: {count} profiles")
    return 0


# ------------------------------------------------------------------ refresh

def cmd_refresh(args):
    updated_count = 0
    today = date.today().isoformat()
    for path, meta, body in iter_profiles():
        if meta.get("status") == "archived":
            continue
        owner, repo = parse_github_url(meta["url"])
        info = fetch_repo_info(owner, repo)
        if not info:
            continue
        if info.get("archived") and meta.get("status") != "archived":
            print(f"  Note: {meta['name']} is archived on GitHub; "
                  f"consider setting status: archived in {path}")
        changed = False
        new_values = {
            "stars": info.get("stargazers_count", meta.get("stars", 0)),
            "forks": info.get("forks_count", meta.get("forks", 0)),
            "license": (info.get("license") or {}).get("spdx_id") or meta.get("license", "unknown"),
        }
        if info.get("language") and not meta.get("languages"):
            new_values["languages"] = [info["language"]]
        for key, value in new_values.items():
            if meta.get(key) != value:
                meta[key] = value
                changed = True
        if changed:
            meta["updated"] = today
            with open(path, "w", encoding="utf-8") as f:
                f.write(dump_frontmatter(meta) + body)
            updated_count += 1
            print(f"Refreshed {path}: stars={meta['stars']} forks={meta['forks']}")
    print(f"Done: {updated_count} profiles updated")
    return 0


# --------------------------------------------------------------------- main

def main():
    parser = argparse.ArgumentParser(description="Manage the catalog/ repo archive")
    sub = parser.add_subparsers(dest="command", required=True)

    p_new = sub.add_parser("new", help="draft a new profile from a GitHub URL")
    p_new.add_argument("url", help="GitHub repo URL or owner/repo")
    p_new.add_argument("--domain", required=True, help=f"one of: {', '.join(DOMAINS)}")
    p_new.set_defaults(func=cmd_new)

    p_index = sub.add_parser("index", help="rebuild catalog/INDEX.md")
    p_index.set_defaults(func=cmd_index)

    p_validate = sub.add_parser("validate", help="validate profiles and index freshness")
    p_validate.set_defaults(func=cmd_validate)

    p_refresh = sub.add_parser("refresh", help="update stars/forks from GitHub API")
    p_refresh.set_defaults(func=cmd_refresh)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
