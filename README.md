# GitHub Treasure Repo

[![CI](https://github.com/allengaller/repo-hoarder/actions/workflows/ci.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/ci.yml)
[![Monthly Scrape](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-scrape.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-scrape.yml)
[![Monthly Update](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-update.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-update.yml)
[![Pages](https://github.com/allengaller/repo-hoarder/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/deploy-pages.yml)
[![Live](https://img.shields.io/badge/Live-GitHub_Pages-blue)](https://allengaller.github.io/repo-hoarder/)

[中文文档](README.zh-CN.md) · [Live Demo](https://allengaller.github.io/repo-hoarder/) · [Report an Issue](https://github.com/allengaller/repo-hoarder/issues)

An open-source, fully automated aggregator for high-quality GitHub projects. Combines multiple data sources — **Awesome Lists**, **GitHub Search API**, **Hacker News**, and **DEV.to** — into a single curated catalog with smart filtering, inspiration mode, and bookmark management.

---

## Features

### Discovery
- **Inspiration Mode** — full-screen swipe/keyboard-driven card browser
- **Smart Recommendations** — suggestions based on your bookmarked languages and keywords
- **Random Treasure** — shuffle through quality projects you'd otherwise miss
- **Surge Index** — sort by `today_stars / stars` to spot the fastest risers

### Filtering & Search
- Multi-dimensional filters: language, stars, forks, score
- Live search-as-you-type
- Shareable filter URLs (state synced via query params)
- Saved filter presets

### Collection Management
- `localStorage`-backed bookmarks
- Batch bookmark / batch export
- Side-by-side project comparison
- JSON export

### UX Polish
- Dark / light theme (persisted)
- Chinese / English i18n toggle
- PWA with offline support
- Full keyboard navigation

---

## Quick Start

### Online (recommended)

👉 **https://allengaller.github.io/repo-hoarder/** — data refreshed daily by GitHub Actions.

### Local

```bash
git clone https://github.com/allengaller/repo-hoarder.git
cd repo-hoarder

# Option A — use the bundled seed (28 curated repos, no network needed)
pip install -r requirements.txt
cd web && python3 -m http.server 8000
# open http://localhost:8000

# Option B — fetch the live dataset (~5 min, requires GITHUB_TOKEN for full coverage)
pip install -r requirements.txt
python3 scripts/scrape.py
cd web && python3 -m http.server 8000
# open http://localhost:8000
```

### Updating the dataset

```bash
# Full scrape (all sources)
python3 scripts/scrape.py

# Incremental update for a specific month
python3 scripts/update_monthly.py --year 2026 --month 6 --report
```

### Running tests

```bash
pip install pytest
pytest tests/ -v
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus search |
| `T` | Toggle theme |
| `B` | Toggle bookmarks view |
| `L` | Toggle language |
| `?` | Show help |
| `↑` / `↓` | Navigate list |
| `Enter` | Open details |
| `Space` | Bookmark |
| `C` | Compare mode |
| `←` / `→` | Prev/next in inspiration mode |
| `P` | Auto-play inspiration |
| `F` | Flip inspiration card |

---

## Data Sources

| Source | Description |
|---|---|
| **Awesome Lists** | vinta/awesome-python, avelino/awesome-go, and 6 more |
| **GitHub Search API** | Recent-activity queries across 5 dimensions |
| **Hacker News** | Top HN stories linking to GitHub repos |
| **DEV.to** | GitHub repos extracted from trending articles |

---

## Scoring Algorithm

```
score = stars
      + forks
      + (forks / stars) × 1000   # community engagement
      + today_stars × 10          # momentum
      + commit_activity × 2       # 4-week commit count (freshness)
```

`today_stars` is estimated from push/creation recency (the GitHub Search API does not expose per-day star counts). For the top-N trending repos we additionally query the free `stats/commit_activity` endpoint to ground the signal in real data.

---

## Project Structure

```
repo-hoarder/
├── scripts/
│   ├── scrape.py              # Multi-source aggregator
│   └── update_monthly.py      # Per-month incremental fetch
├── tests/
│   └── test_scripts.py        # pytest suite (24 cases)
├── data/
│   ├── repos.json             # Aggregated dataset
│   └── monthly_report_*.md    # Monthly reports
├── web/
│   ├── index.html             # UI entry
│   ├── styles.css
│   ├── app.js                 # Vanilla JS frontend
│   ├── sw.js                  # Service Worker (PWA)
│   └── manifest.json
├── docs/                      # Archived history docs
├── .github/workflows/
│   ├── ci.yml                 # PR/push tests
│   ├── deploy-pages.yml
│   ├── monthly-scrape.yml
│   └── monthly-update.yml
└── requirements.txt
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Scraper | Python 3 + requests + BeautifulSoup |
| Frontend | Vanilla HTML / CSS / JS (zero build step) |
| Offline | Service Worker + PWA |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## FAQ

**Q: "Failed to load data" on the page?**
Open via an HTTP server (`python3 -m http.server 8000`). Browsers block `fetch` under `file://`.

**Q: Hitting GitHub API rate limits?**
Set the `GITHUB_TOKEN` environment variable — raises the limit from 60 to 5,000 requests/hour.

**Q: Deploy to your own fork?**
1. Fork the repo
2. Settings → Pages → Source: **GitHub Actions**
3. Push; the deploy workflow runs automatically.

---

## License

MIT
