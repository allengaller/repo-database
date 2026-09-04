#!/usr/bin/env python3
"""
Monthly GitHub New Repo Fetcher
Fetch repos created in a specific month and merge with data/repos.json

Usage:
    python scripts/update_monthly.py              # default: 2026-05
    python scripts/update_monthly.py --month 6    # fetch 2026-06
    GITHUB_TOKEN=xxx python scripts/update_monthly.py
"""

import argparse
import json
import os
import sys
import time
from datetime import UTC, date, datetime, timedelta
from pathlib import Path

try:
    import requests
except ImportError:
    print("Error: 'requests' package is required. Install with: pip install -r requirements.txt")
    sys.exit(1)

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import DATA_FILE, GITHUB_TOKEN, LANGUAGES, calculate_score, get_headers, get_session, merge_repo

TOPICS = [
    "AI agent", "LLM", "claude", "RAG", "coding assistant",
    "openclaw", "codex", "cursor", "skills"
]


def search_repos(query, per_page=100, page=1):
    """Search GitHub repos"""
    url = "https://api.github.com/search/repositories"
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": per_page,
        "page": page,
    }
    try:
        resp = get_session().get(url, params=params, headers=get_headers(), timeout=30)
        if resp.status_code == 403:
            msg = resp.json().get("message", "")
            print(f"    Rate limited: {msg}")
            time.sleep(5)
            return []
        resp.raise_for_status()
        data = resp.json()
        total = data.get("total_count", 0)
        items = data.get("items", [])
        if page == 1 and total > 0:
            print(f"    (total available: {total:,})")
        return items
    except (requests.RequestException, ValueError, AttributeError) as e:
        print(f"    Error: {e}")
        return []


def fetch_monthly_repos(year, month):
    """Fetch repos created in a specific month across multiple dimensions"""
    start = f"{year}-{month:02d}-01"
    if month == 12:
        end = f"{year}-12-31"
    else:
        end = (date(year, month + 1, 1) - timedelta(days=1)).strftime("%Y-%m-%d")

    date_range = f"{start}..{end}"
    base = f"created:{date_range}"
    month_tag = f"{year}-{month:02d}"

    print(f"\n📅 Date range: {start} ~ {end}")
    all_repos = {}

    # 1. Top new repos (all languages, multi-page)
    print("\n[1/4] Top new repos (all languages)...")
    for page in range(1, 4):
        print(f"  Page {page}...", end=" ")
        repos = search_repos(f"{base} stars:>10", per_page=100, page=page)
        print(f"got {len(repos)}")
        for r in repos:
            all_repos[r["full_name"]] = format_repo(r, month_tag)
        if len(repos) < 100:
            break
        time.sleep(1)

    # 2. By language
    print("\n[2/4] By language...")
    for lang in LANGUAGES:
        print(f"  {lang}...", end=" ")
        repos = search_repos(f"{base} language:{lang} stars:>5", per_page=100)
        print(f"got {len(repos)}")
        for r in repos:
            all_repos[r["full_name"]] = format_repo(r, month_tag)
        time.sleep(0.8)

    # 3. By hot topics
    print("\n[3/4] By hot topics...")
    for topic in TOPICS:
        print(f"  {topic}...", end=" ")
        repos = search_repos(f"{base} {topic} stars:>5", per_page=50)
        print(f"got {len(repos)}")
        for r in repos:
            all_repos[r["full_name"]] = format_repo(r, month_tag)
        time.sleep(0.8)

    # 4. Low-star but recently pushed (potential rising stars)
    print("\n[4/4] Rising stars (pushed recently, low stars)...")
    pushed_since = (date.fromisoformat(start) + timedelta(days=20)).strftime("%Y-%m-%d")
    print(f"  pushed:>{pushed_since}...", end=" ")
    repos = search_repos(f"{base} pushed:>{pushed_since} stars:3..50", per_page=100)
    print(f"got {len(repos)}")
    for r in repos:
        all_repos[r["full_name"]] = format_repo(r, month_tag)

    return list(all_repos.values())


def format_repo(r, month_tag):
    return {
        "name": r["full_name"],
        "url": r["html_url"],
        "description": r.get("description") or "",
        "stars": r["stargazers_count"],
        "forks": r["forks_count"],
        "language": r.get("language") or "Unknown",
        "today_stars": 0,
        "score": r["stargazers_count"],
        "fetched_at": datetime.now(UTC).isoformat(),
        "source": "monthly_new",
        "created_at": r.get("created_at"),
        "month_tag": month_tag
    }


def merge_with_existing(new_repos):
    """Merge new repos into data/repos.json with field-wise max (like scrape.py)."""
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        existing = {r["name"]: r for r in data.get("repos", [])}
        sources = list(data.get("sources", []))
        criteria = data.get("criteria", {})
    except FileNotFoundError:
        existing = {}
        sources = []
        criteria = {}

    new_count = 0
    updated = 0
    for repo in new_repos:
        name = repo["name"]
        repo["score"] = calculate_score(repo)
        if name not in existing:
            new_count += 1
            existing[name] = repo
        else:
            merge_repo(existing[name], repo)
            updated += 1

    result = sorted(existing.values(), key=lambda x: x["score"], reverse=True)

    if "monthly_new" not in sources:
        sources.append("monthly_new")

    output = {
        "schema_version": 2,
        "fetched_at": datetime.now(UTC).isoformat(),
        "total": len(result),
        "sources": sources,
        "criteria": criteria,
        "repos": result
    }

    Path(DATA_FILE).parent.mkdir(parents=True, exist_ok=True)
    Path(DATA_FILE).write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    return result, new_count, updated


def print_stats(repos, month_tag):
    month_repos = [r for r in repos if r.get("month_tag") == month_tag]
    lang_counts = {}
    for r in month_repos:
        lang = r.get("language", "Unknown")
        lang_counts[lang] = lang_counts.get(lang, 0) + 1

    print(f"\n📊 Language breakdown ({month_tag}):")
    for lang, count in sorted(lang_counts.items(), key=lambda x: -x[1])[:10]:
        print(f"   {lang}: {count}")

    print(f"\n🏆 Top 15 new repos from {month_tag}:")
    for i, r in enumerate(month_repos[:15], 1):
        print(f"  {i:2}. ⭐{r['stars']:>6,}  {r['language']:<12}  {r['name']}")
        desc = r['description'][:55] + "..." if len(r['description']) > 55 else r['description']
        print(f"      {desc}")

    return month_repos


def generate_report(merged, month_tag, year, month, new_count, updated):
    """Generate a Markdown report for the month"""
    month_repos = [r for r in merged if r.get("month_tag") == month_tag]
    report_file = f"data/monthly_report_{year}_{month:02d}.md"

    # Language breakdown
    lang_counts = {}
    for r in month_repos:
        lang = r.get("language", "Unknown")
        lang_counts[lang] = lang_counts.get(lang, 0) + 1

    # Rising stars (high fork ratio)
    rising = sorted(
        [r for r in month_repos if r["stars"] > 5],
        key=lambda x: x.get("forks", 0) / max(x["stars"], 1),
        reverse=True
    )[:10]

    lines = [
        f"# 📊 Monthly Report — {month_tag}",
        "",
        f"> Generated at {datetime.now(UTC).isoformat()}",
        "",
        "## Overview",
        "",
        "| Metric | Value |",
        "|--------|-------|",
        f"| New repos this month | {len(month_repos)} |",
        f"| Added in this run | {new_count} |",
        f"| Updated in this run | {updated} |",
        f"| Database total | {len(merged)} |",
        "",
        "## Language Breakdown",
        "",
        "| Language | Count |",
        "|----------|-------|",
    ]
    for lang, count in sorted(lang_counts.items(), key=lambda x: -x[1])[:15]:
        lines.append(f"| {lang} | {count} |")

    lines.extend([
        "",
        "## 🏆 Top 30 New Repos",
        "",
    ])
    for i, r in enumerate(month_repos[:30], 1):
        desc = r['description'][:70] + "..." if len(r['description']) > 70 else r['description']
        lines.append(f"{i}. **{r['name']}** — ⭐{r['stars']:,} | {r['language']}")
        lines.append(f"   > {desc}")
        lines.append("")

    if rising:
        lines.extend([
            "## 🚀 Rising Stars (High Engagement)",
            "",
        ])
        for r in rising:
            ratio = r.get("forks", 0) / max(r["stars"], 1)
            lines.append(f"- **{r['name']}** — ⭐{r['stars']:,} / 🍴{r['forks']:,} (fork ratio: {ratio:.2%})")
        lines.append("")

    lines.extend([
        "---",
        "",
        "*Report generated by [repo-database](scripts/update_monthly.py)*",
    ])

    Path(report_file).write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"\n📝 Report saved to {report_file}")
    return report_file


def main():
    now = datetime.now(UTC)
    parser = argparse.ArgumentParser(description="Fetch new GitHub repos for a specific month")
    parser.add_argument("--year", type=int, default=now.year, help=f"Year (default: {now.year})")
    parser.add_argument("--month", type=int, default=now.month, help=f"Month 1-12 (default: {now.month})")
    parser.add_argument("--report", action="store_true", help="Generate Markdown report")
    args = parser.parse_args()

    month_tag = f"{args.year}-{args.month:02d}"

    print("=" * 60)
    print(f"🔍 Monthly New Repo Fetcher — {month_tag}")
    print("=" * 60)
    print(f"Started at {datetime.now(UTC).isoformat()}")

    if GITHUB_TOKEN:
        print("🔐 Using GitHub Token (5000 req/hour)")
    else:
        print("⚠️  No GITHUB_TOKEN — limited to 60 req/hour")
        print("   Tip: GITHUB_TOKEN=xxx python scripts/update_monthly.py")

    new_repos = fetch_monthly_repos(args.year, args.month)
    print(f"\n{'=' * 60}")
    print(f"📦 Fetched {len(new_repos)} unique repos")

    merged, new_count, updated = merge_with_existing(new_repos)
    month_repos = print_stats(merged, month_tag)

    report_file = None
    if args.report:
        report_file = generate_report(merged, month_tag, args.year, args.month, new_count, updated)

    print(f"\n{'=' * 60}")
    print("✅ Done!")
    print(f"   Database total: {len(merged)} repos")
    print(f"   New this run:   {new_count}")
    print(f"   Updated:        {updated}")
    print(f"   From {month_tag}:  {len(month_repos)} repos")
    print(f"   Saved to:       {DATA_FILE}")
    if report_file:
        print(f"   Report:         {report_file}")


def _configure_stdout():
    """Ensure stdout/stderr can emit non-ASCII (emoji, CJK) without
    crashing on Windows runners or POSIX-locale containers."""
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
        sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    except (AttributeError, ValueError):
        pass


if __name__ == "__main__":
    _configure_stdout()
    main()
