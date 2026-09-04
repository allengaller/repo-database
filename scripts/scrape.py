#!/usr/bin/env python3
"""
GitHub Treasure Repo Scraper
Uses GitHub API + Curated Lists for comprehensive 2026 data
"""

import json
import os
import re
import sys
import time
from datetime import UTC, datetime, timedelta
from pathlib import Path

try:
    import requests
except ImportError:
    print("Error: 'requests' package is required. Install with: pip install -r requirements.txt")
    sys.exit(1)

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import calculate_score, get_headers, get_session, merge_repo

# Configuration
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
MIN_STARS = 500
MIN_FORKS = 5

AWESOME_LISTS = [
    {
        "name": "awesome-python",
        "url": "https://raw.githubusercontent.com/vinta/awesome-python/HEAD/README.md",
    },
    {
        "name": "awesome-go",
        "url": "https://raw.githubusercontent.com/avelino/awesome-go/HEAD/README.md",
    },
    {
        "name": "awesome-javascript",
        "url": "https://raw.githubusercontent.com/sorrycc/awesome-javascript/HEAD/README.md",
    },
    {
        "name": "awesome-rust",
        "url": "https://raw.githubusercontent.com/rust-unofficial/awesome-rust/HEAD/README.md",
    },
    {
        "name": "awesome-java",
        "url": "https://raw.githubusercontent.com/akullpp/awesome-java/HEAD/README.md",
    },
    {
        "name": "awesome-cpp",
        "url": "https://raw.githubusercontent.com/fffaraz/awesome-cpp/HEAD/README.md",
    },
    {
        "name": "awesome-typescript",
        "url": "https://raw.githubusercontent.com/semlinker/awesome-typescript/HEAD/README.md",
    },
    {
        "name": "awesome-swift",
        "url": "https://raw.githubusercontent.com/matteocrippa/awesome-swift/HEAD/README.md",
    },
]

LANGUAGES = [
    "python",
    "javascript",
    "typescript",
    "go",
    "rust",
    "java",
    "cpp",
    "c",
    "ruby",
    "swift",
    "kotlin",
    "dart",
    "csharp",
]

GITHUB_NON_REPO_OWNERS = {
    "features",
    "markets",
    "orgs",
    "settings",
    "explore",
    "topics",
    "trending",
    "blog",
    "marketplace",
    "enterprise",
    "collections",
    "sponsors",
    "mobile",
    "security",
    "customer-stories",
    "team",
    "pricing",
    "readme",
    "about",
    "login",
    "signup",
}


def fetch_commit_activity(owner, repo):
    """Return the number of commits in the last 4 weeks (free, no token).

    Used as a freshness/activity signal for trending estimation and scoring.
    Returns 0 on any failure or when GitHub returns 202 (cache miss).
    """
    url = f"https://api.github.com/repos/{owner}/{repo}/stats/commit_activity"
    try:
        resp = get_session().get(url, headers=get_headers(), timeout=10)
        if resp.status_code != 200 or not isinstance(resp.json(), list):
            return 0
        return sum(w.get("total", 0) for w in resp.json()[-4:])
    except (requests.RequestException, ValueError, TypeError, KeyError, AttributeError):
        return 0


def _collapse_badge_links(md):
    """Replace ``[![alt](image-url)](github-url)`` patterns with a plain
    markdown link ``[x](github-url)`` so the simple regex below can match
    them as ordinary GitHub URLs."""
    return re.sub(
        r"\[!\[[^\]]*\]\([^)]*\)\]\((https?://github\.com/[^)]+)\)",
        r"[x](\1)",
        md,
    )


def parse_awesome_list(content):
    """Parse awesome list markdown to extract GitHub repo full names.

    Improvements over a naive single-line regex:

    * Strips leading/trailing whitespace and trailing punctuation
      (``.,;:!?``) which frequently leaks into URLs.
    * Pre-collapses badge-style ``[![alt](...)](github-url)`` wrappers
      so nested image-link patterns still match the underlying repo.
    * Removes the historical 50-repo cap; the caller rate-limits itself
      and many awesome lists have far more than 50 quality entries.
    """
    # First collapse any badge-wrapped links to their outer URL only.
    content = _collapse_badge_links(content)
    repos = set()
    pattern = (
        r"\[([^\]]+)\]"
        r"\(\s*https?://github\.com/"
        r"([A-Za-z0-9_.-]+)/"
        r"([A-Za-z0-9_.-]+)"
        r"(?:/[^\s)]*)?"
        r"\)"
    )

    for line in content.splitlines():
        for match in re.finditer(pattern, line):
            owner, repo = match.group(2), match.group(3)
            # Skip common non-repo paths and self-references
            if owner.lower() in GITHUB_NON_REPO_OWNERS:
                continue
            if "awesome-" in repo.lower():
                continue
            # Strip trailing punctuation that may have leaked into the URL
            # e.g. ``[Flask](https://github.com/foo/bar).`` → "bar."
            repo = repo.rstrip(".,;:!?'\"")
            if not repo:
                continue
            # Clean common URL fragments
            repo = repo.split("#")[0].split("?")[0]
            if repo and owner:
                repos.add(f"{owner}/{repo}")

    return sorted(repos)


def fetch_github_repo_details(owner, repo):
    """Fetch repo details from GitHub API"""
    url = f"https://api.github.com/repos/{owner}/{repo}"

    try:
        resp = get_session().get(url, headers=get_headers(), timeout=10)
        if resp.status_code == 404:
            return None
        if resp.status_code == 403:
            msg = resp.json().get("message", "")
            print(f"    Rate limited ({msg})")
            return None
        if resp.status_code == 200:
            return resp.json()
        print(f"    Unexpected status {resp.status_code}")
        return None
    except (requests.RequestException, ValueError, AttributeError) as e:
        print(f"    Error: {e}")
        return None


def fetch_awesome_lists():
    """Fetch repos from curated awesome lists via raw README + GitHub API"""
    print("\n[1/6] Fetching from curated awesome lists...")

    awesome_repos = {}

    for list_info in AWESOME_LISTS:
        print(f"  📚 {list_info['name']}...", end=" ")

        try:
            # Fetch README raw content
            resp = get_session().get(
                list_info["url"], headers={"User-Agent": "Mozilla/5.0"}, timeout=15
            )

            if resp.status_code != 200:
                print(f"failed to fetch README ({resp.status_code})")
                continue

            repo_names = parse_awesome_list(resp.text)
            print(f"parsed {len(repo_names)} repos", end=" ")

            # Fetch details for top repos (limit to avoid rate limits)
            fetched = 0
            for repo_full_name in repo_names[:30]:
                if repo_full_name in awesome_repos:
                    continue

                parts = repo_full_name.split("/", 1)
                if len(parts) != 2:
                    continue

                details = fetch_github_repo_details(parts[0], parts[1])
                if details:
                    awesome_repos[repo_full_name] = format_api_repo(details)
                    awesome_repos[repo_full_name]["source"] = "awesome_list"
                    fetched += 1
                time.sleep(0.15)

            print(f"✅ {fetched} valid")

        except Exception as e:  # noqa: BLE001 — one bad source must not kill the whole run
            print(f"error: {e}")

        time.sleep(0.3)

    print(f"  ✅ Collected {len(awesome_repos)} repos from awesome lists")
    return awesome_repos


def search_github_repos(query, min_stars=1000, per_page=30):
    """Search GitHub repos using API"""
    url = "https://api.github.com/search/repositories"
    current_year = datetime.now(UTC).year
    params = {
        "q": f"{query} created:{current_year}-01-01..{current_year}-12-31 stars:>={min_stars}",
        "sort": "stars",
        "order": "desc",
        "per_page": per_page,
    }

    try:
        resp = get_session().get(url, params=params, headers=get_headers(), timeout=30)
        if resp.status_code == 403:
            msg = resp.json().get("message", "")
            print(f"    Rate limited: {msg}")
            time.sleep(5)
            return []
        resp.raise_for_status()
        return resp.json().get("items", [])
    except (requests.RequestException, ValueError, AttributeError) as e:
        print(f"    Error: {e}")
        return []


def fetch_from_api():
    """Fetch repos via GitHub API"""
    print("\n[2/6] Fetching 2026 repos via API...")
    api_repos = {}
    seen = set()

    # Agent/AI related queries
    queries = ["agent skills", "claude-code", "AI framework", "LLM inference", "RAG"]
    for q in queries:
        print(f"  Query: {q}...", end=" ")
        repos = search_github_repos(q, min_stars=500)
        print(f"found {len(repos)}")
        for r in repos:
            if r["full_name"] not in seen:
                seen.add(r["full_name"])
                api_repos[r["full_name"]] = format_api_repo(r)
        time.sleep(0.5)

    # By language
    for lang in LANGUAGES[:6]:
        print(f"  {lang}...", end=" ")
        repos = search_github_repos(f"language:{lang}", min_stars=2000)
        print(f"found {len(repos)}")
        for r in repos:
            if r["full_name"] not in seen:
                seen.add(r["full_name"])
                api_repos[r["full_name"]] = format_api_repo(r)
        time.sleep(1)

    print(f"  ✅ Collected {len(api_repos)} repos from API")
    return api_repos


def estimate_today_stars(repo_data):
    """Estimate daily star growth from push/recency signals.

    GitHub Search API does not return per-day star counts, so we derive a
    proxy from how recently the repo was pushed and how new it is. Actively
    pushed repos in the last 24h almost always coincide with a star surge.
    Scale: 0..~150, roughly matching real daily-star magnitudes.
    """
    try:
        pushed = datetime.fromisoformat(repo_data["pushed_at"])
        created = datetime.fromisoformat(repo_data["created_at"])
    except (KeyError, TypeError, ValueError):
        return 0

    now = datetime.now(pushed.tzinfo or UTC)
    hours_since_push = max((now - pushed).total_seconds() / 3600, 0)
    days_old = max((now - created).total_seconds() / 86400, 1)

    if hours_since_push <= 24:
        push_score = 100
    elif hours_since_push <= 72:
        push_score = 40
    elif hours_since_push <= 168:  # 1 week
        push_score = 15
    else:
        push_score = 0

    # New repos (<30 days) with high stars get a boost — they're genuinely viral
    stars = repo_data.get("stargazers_count", 0)
    if days_old < 30 and stars > 100:
        push_score += min(int(stars / days_old / 10), 50)

    return int(push_score)


def fetch_trending_repos():
    """Fetch trending-like repos via GitHub Search API.

    GitHub discontinued the /trending HTML page in 2022-2023. We substitute
    with three complementary queries (recently pushed / recently created /
    rising-star repos) and enrich each result with an estimated daily-star
    signal so the frontend's "Surge Index" (today_stars / stars) works.
    """
    print("\n[3/6] Fetching trending repos via API...")

    trending_repos = {}

    today = datetime.now(UTC)
    one_day_ago = (today - timedelta(days=1)).strftime("%Y-%m-%d")
    one_week_ago = (today - timedelta(days=7)).strftime("%Y-%m-%d")
    one_month_ago = (today - timedelta(days=30)).strftime("%Y-%m-%d")
    three_months_ago = (today - timedelta(days=90)).strftime("%Y-%m-%d")

    queries = [
        (f"pushed:>{one_day_ago} stars:>500", "hot-today"),
        (f"pushed:>{one_week_ago} stars:>2000", "hot-week"),
        (f"created:>{one_month_ago} stars:>500", "new-month"),
        (f"created:>{three_months_ago} stars:>1000", "new-quarter"),
        (f"pushed:>{one_week_ago} stars:100..2000", "rising"),
    ]

    for q, label in queries:
        print(f"  [{label}] {q}...", end=" ")
        repos = search_github_repos(q, min_stars=100, per_page=25)
        print(f"found {len(repos)}")
        for r in repos:
            name = r["full_name"]
            if name in trending_repos:
                # Keep the higher today_stars estimate
                est = estimate_today_stars(r)
                if est > trending_repos[name].get("today_stars", 0):
                    trending_repos[name]["today_stars"] = est
                continue
            formatted = format_api_repo(r)
            formatted["today_stars"] = estimate_today_stars(r)
            formatted["source"] = "trending"
            trending_repos[name] = formatted
        time.sleep(1)

    # Optional enrichment: real commit_activity for the top-N trending candidates.
    # This endpoint is free (no token) and returns weekly commit counts.
    candidates = sorted(
        trending_repos.values(),
        key=lambda r: r.get("stars", 0),
        reverse=True,
    )[:40]
    if candidates:
        print(f"  Enriching {len(candidates)} repos with commit_activity...", end=" ")
        enriched = 0
        for repo in candidates:
            parts = repo["name"].split("/", 1)
            if len(parts) != 2:
                continue
            commits = fetch_commit_activity(parts[0], parts[1])
            if commits:
                repo["commit_activity"] = commits
                enriched += 1
            time.sleep(0.1)
        print(f"{enriched} OK")

    print(f"  ✅ Collected {len(trending_repos)} repos from Trending")
    return trending_repos


def fetch_hackernews():
    """Fetch trending repos from Hacker News API"""
    print("\n[3.5/6] Fetching from Hacker News...")

    hn_repos = {}

    try:
        # Get top stories
        resp = get_session().get(
            "https://hacker-news.firebaseio.com/v0/topstories.json", timeout=10
        )
        if resp.status_code != 200:
            print(f"  Failed to fetch HN stories ({resp.status_code})")
            return hn_repos

        story_ids = resp.json()[:30]  # Top 30 stories

        for story_id in story_ids:
            try:
                story_resp = get_session().get(
                    f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json",
                    timeout=10,
                )
                if story_resp.status_code != 200:
                    continue

                story = story_resp.json()
                url = story.get("url", "")

                # Check if it's a GitHub repo
                if "github.com" in url:
                    match = re.search(
                        r"github\.com/([a-zA-Z0-9_.-]+)/([a-zA-Z0-9_.-]+)", url
                    )
                    if match:
                        owner, repo = match.group(1), match.group(2)
                        full_name = f"{owner}/{repo}"

                        if full_name not in hn_repos:
                            details = fetch_github_repo_details(owner, repo)
                            if details:
                                hn_repos[full_name] = format_api_repo(details)
                                hn_repos[full_name]["source"] = "hackernews"
                                hn_repos[full_name]["description"] = story.get(
                                    "title", details.get("description", "")
                                )

                time.sleep(0.2)
            except Exception:  # noqa: BLE001, S112 — skip stories that fail to parse
                continue

        print(f"  ✅ Collected {len(hn_repos)} repos from Hacker News")

    except Exception as e:  # noqa: BLE001 — per-source boundary, keep scraping other sources
        print(f"  Error: {e}")

    return hn_repos


def fetch_devto_articles():
    """Fetch trending articles from DEV.to and extract GitHub repos"""
    print("\n[4/6] Fetching from DEV.to...")

    devto_repos = {}

    try:
        # Get top articles
        resp = get_session().get(
            "https://dev.to/api/articles",
            params={"per_page": 50, "top": 7},
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=15,
        )

        if resp.status_code != 200:
            print(f"  Failed to fetch DEV.to articles ({resp.status_code})")
            return devto_repos

        articles = resp.json()

        seen = set()
        for article in articles:
            # Look for GitHub URLs in tags and body
            github_pattern = r"github\.com/([a-zA-Z0-9_.-]+)/([a-zA-Z0-9_.-]+)"

            for tag in article.get("tag_list", []):
                match = re.search(github_pattern, tag)
                if match:
                    owner, repo = match.group(1), match.group(2)
                    full_name = f"{owner}/{repo}"
                    if full_name not in seen and full_name not in devto_repos:
                        seen.add(full_name)
                        details = fetch_github_repo_details(owner, repo)
                        if details:
                            devto_repos[full_name] = format_api_repo(details)
                            devto_repos[full_name]["source"] = "devto"
                            devto_repos[full_name]["description"] = article.get(
                                "title", details.get("description", "")
                            )

            # Also check the article URL
            article_url = article.get("url", "")
            match = re.search(github_pattern, article_url)
            if match:
                owner, repo = match.group(1), match.group(2)
                full_name = f"{owner}/{repo}"
                if full_name not in seen and full_name not in devto_repos:
                    seen.add(full_name)
                    details = fetch_github_repo_details(owner, repo)
                    if details:
                        devto_repos[full_name] = format_api_repo(details)
                        devto_repos[full_name]["source"] = "devto"
                        devto_repos[full_name]["description"] = article.get(
                            "title", details.get("description", "")
                        )

            time.sleep(0.1)

        print(f"  ✅ Collected {len(devto_repos)} repos from DEV.to")

    except Exception as e:  # noqa: BLE001 — per-source boundary, keep scraping other sources
        print(f"  Error: {e}")

    return devto_repos


def parse_num(text):
    """Parse number like 1.2k, 3.4M"""
    text = text.replace(",", "").replace(" ", "")
    for suffix, mult in {"k": 1_000, "m": 1_000_000}.items():
        if suffix in text.lower():
            try:
                return int(float(text.lower().replace(suffix, "")) * mult)
            except ValueError:
                return 0
    try:
        return int(text)
    except ValueError:
        return 0


def format_api_repo(r):
    """Format GitHub API repo to our schema"""
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
        "source": "github_api",
    }


def merge_and_sort(all_repos):
    """Merge all sources and sort by score.

    For duplicates, take the field-wise max of numeric signals and merge
    source tags, so a repo appearing in multiple sources is strictly better
    than any single-source view of it.
    """
    print(f"\n[5/6] Processing {len(all_repos)} total repos...")

    unique = {}
    for repo in all_repos.values():
        name = repo["name"]
        if name in unique:
            merge_repo(unique[name], repo)
        else:
            unique[name] = repo

    for repo in unique.values():
        repo["score"] = calculate_score(repo)

    result = list(unique.values())
    result.sort(key=lambda x: x["score"], reverse=True)

    print(f"  ✅ {len(result)} unique repos after deduplication")
    return result


def save_results(repos):
    """Save to JSON file"""
    print("\n[6/6] Saving results...")

    output = {
        "schema_version": 2,
        "fetched_at": datetime.now(UTC).isoformat(),
        "total": len(repos),
        "sources": ["awesome_lists", "github_api", "trending", "hackernews", "devto"],
        "criteria": {
            "min_stars": MIN_STARS,
            "min_forks": MIN_FORKS,
            "awesome_lists": [l["name"] for l in AWESOME_LISTS],
        },
        "repos": repos,
    }

    # Ensure data directory exists
    os.makedirs("data", exist_ok=True)

    Path("data/repos.json").write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print("  ✅ Saved to data/repos.json")
    return output


def print_top_repos(repos):
    """Print top 15 repos"""
    print("\n🏆 Top 15 Treasure Repos:")
    for i, repo in enumerate(repos[:15], 1):
        source = repo.get("source", "unknown")
        if source == "awesome_list":
            icon = "📚"
        elif source == "github_api":
            icon = "🔍"
        elif "trending" in source:
            icon = "📈"
        else:
            icon = "📦"
        print(
            f"  {i:2}. {icon} {repo['name']:<45} ⭐{repo['stars']:>7,}  评分:{repo['score']:>10,.0f}"
        )
        print(f"      {repo['language']:<12} | {repo['description'][:50]}...")


def main():
    print("=" * 60)
    print("🏆 GitHub Treasure Repo Scraper")
    print("   Sources: Awesome Lists + GitHub API + HN + DEV.to")
    print("=" * 60)
    print(f"\nStarted at {datetime.now(UTC).isoformat()}")

    if GITHUB_TOKEN:
        print("   🔐 Using GitHub Token for higher rate limits")
    else:
        print("   ⚠️  No GITHUB_TOKEN found — rate limit is 60 req/hour")
        print("      Set GITHUB_TOKEN env var for 5000 req/hour")

    # Fetch from all sources
    awesome_repos = fetch_awesome_lists()
    api_repos = fetch_from_api()
    trending_repos = fetch_trending_repos()
    hn_repos = fetch_hackernews()
    devto_repos = fetch_devto_articles()

    # Merge all repos
    all_repos = {}
    all_repos.update(awesome_repos)
    all_repos.update(api_repos)
    all_repos.update(trending_repos)
    all_repos.update(hn_repos)
    all_repos.update(devto_repos)

    # Process and save
    repos = merge_and_sort(all_repos)
    save_results(repos)

    # Print summary
    print_top_repos(repos)

    # Stats
    lang_count = len({r["language"] for r in repos})
    total_stars = sum(r["stars"] for r in repos)
    print("\n📊 Stats:")
    print(f"   Total repos: {len(repos)}")
    print(f"   Total stars: {total_stars:,}")
    print(f"   Languages: {lang_count}")


def _configure_stdout():
    """Ensure stdout can emit non-ASCII (emoji, Chinese) without crashing.

    On Windows runners or containers with a C/POSIX locale, the default
    UTF-8 encoding of stdout isn't applied — emoji in print() raise
    UnicodeEncodeError. ``reconfigure(encoding="utf-8")`` is a no-op
    when already configured but safely upgrades the stream otherwise.
    """
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
        sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    except (AttributeError, ValueError):
        # AttributeError: stream doesn't support reconfigure (older Python,
        # captured pipes, or already-closed handles).
        # ValueError: stream is read-only / non-text stream.
        pass


if __name__ == "__main__":
    _configure_stdout()
    main()
