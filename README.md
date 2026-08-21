# repo-database

[![CI](https://github.com/allengaller/repo-database/actions/workflows/ci.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/ci.yml)
[![Monthly Scrape](https://github.com/allengaller/repo-database/actions/workflows/monthly-scrape.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/monthly-scrape.yml)
[![Monthly Update](https://github.com/allengaller/repo-database/actions/workflows/monthly-update.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/monthly-update.yml)
[![Profiles](https://img.shields.io/badge/catalog-104_profiles-brightgreen)](catalog/INDEX.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

[中文文档](README.zh-CN.md) · [Catalog Index](catalog/INDEX.md) · [Report an Issue](https://github.com/allengaller/repo-database/issues)

A GitHub repository knowledge base with two complementary halves:

1. **Automated aggregation** — a multi-source scraper (Awesome Lists, GitHub Search API, Hacker News, DEV.to) feeding a zero-build web UI with filtering, inspiration mode, and bookmarks.
2. **Human curation** — [`catalog/`](catalog/README.md), currently **104 Markdown profiles** across 9 tech domains. One repo per file: frontmatter metadata + a six-section analysis (stack, features, use cases, personal assessment, resources), managed by `scripts/catalog.py` and gated in CI.

The curated half is the centre of gravity. The scraper is the intake funnel; the catalog is what survives review.

---

## Repository layout

```
repo-database/
├── scripts/
│   ├── scrape.py              # Multi-source aggregator -> data/repos.json
│   ├── update_monthly.py      # Per-month incremental fetch + report
│   ├── discover_repos.py      # Keyword discovery via gh CLI -> discoveries.jsonl
│   ├── catalog.py             # Catalog manager (new/index/validate/lint/refresh)
│   ├── backfill_lineage.py    # One-off: backfill `lineage` frontmatter
│   └── common.py              # Shared HTTP/session helpers
├── data/
│   ├── repos.json             # Aggregated dataset (ships as a 28-repo seed)
│   ├── discoveries.jsonl      # Discovery inbox — 423 candidate rows, append-only
│   └── monthly_report_*.md    # Generated monthly reports
├── catalog/                   # Curated profiles (the knowledge base)
│   ├── README.md              # Taxonomy, naming rules, workflow, profile spec
│   ├── INDEX.md               # Auto-generated (do not hand-edit)
│   ├── _template.md           # Profile template
│   ├── _lineage/              # Paradigm lineage dossiers (5 paradigms)
│   └── <domain>/<repo>.md     # 104 profiles across 9 domains
├── research/                  # Topic-level research (mind-coach, psychology-projects)
├── web/                       # Vanilla HTML/CSS/JS frontend + PWA service worker
├── tests/                     # 100 pytest cases (scripts / catalog / frontend)
├── docs/                      # Archived planning & review docs
├── .github/workflows/         # ci · deploy-pages · monthly-scrape · monthly-update
├── pyproject.toml             # Deps + ruff/pytest config
└── uv.lock                    # Pinned transitive deps for reproducible installs
```

### Data flow

```
discover_repos.py ──► data/discoveries.jsonl ──► manual triage ──► catalog/<domain>/*.md
                                                                        │
scrape.py ─────────► data/repos.json ─────────► web/ (browse & filter)  └──► catalog/INDEX.md
```

`data/repos.json` is the quantitative firehose (score-ranked, machine-generated). `catalog/` is the qualitative layer (hand-written, review-gated). They are independent — a repo appearing in one does not imply the other.

---

## The catalog

104 profiles, 9 domains:

| Domain | Profiles | Scope |
|---|---:|---|
| `ai-engineering` | 33 | LLM engineering, inference, RAG, coding agents/CLIs |
| `ai-agents` | 28 | Agent frameworks, harnesses, multi-agent orchestration |
| `fullstack-arch` | 10 | System design, cloud-native reference architecture & IaC, SRE/observability |
| `maas-platform` | 10 | Inference engines, model gateways, K8s GPU scheduling, LLMOps |
| `ai-mental-health` | 7 | AI × psychology/counselling research and datasets |
| `creative-coding` | 5 | Generative art, creative tooling |
| `culture-arts` | 5 | Digital humanities, cultural heritage open data |
| `mind-philosophy` | 4 | Philosophy of mind / Yogācāra × computation |
| `mindfulness-apps` | 2 | Meditation & mindfulness apps |

Every profile carries required frontmatter (`name, url, domain, type, discovered, updated, rating, summary`) plus optional `stars / forks / license / languages / status / tags / lineage`. `validate` enforces the schema, filename convention, and that every internal Markdown link resolves; `lint` raises soft quality warnings (missing sections, thin summaries, star figures without an as-of date).

`catalog/_lineage/` tracks **paradigm ancestry** — 5 paradigms (CLI streaming diff editors, multi-agent orchestration, agent harness config, oh-my-zsh family, prompt evolution) with their origin repo and derivatives, cross-referenced from each profile's `lineage` field.

See [`catalog/README.md`](catalog/README.md) for the full taxonomy, naming rules, and profile spec.

---

## Quick start

```bash
git clone https://github.com/allengaller/repo-database.git
cd repo-database

# Install (uv honours uv.lock for reproducible installs)
uv sync --extra dev
# or: pip install -r requirements.txt

# Browse the UI against the bundled seed — no network, no token needed
cd web && python3 -m http.server 8000
# open http://localhost:8000
```

> `data/repos.json` ships as a **28-repo curated seed** so `web/` works offline out of the box.
> Running `scripts/scrape.py` (or the monthly workflow) overwrites it with a live dataset of ~1,000+ repos.

---

## Usage

### Refresh the dataset

```bash
# Full scrape, all four sources (~5 min; set GITHUB_TOKEN for full coverage)
python3 scripts/scrape.py

# Incremental fetch for one month + Markdown report
python3 scripts/update_monthly.py --year 2026 --month 8 --report
```

### Curate the catalog

```bash
# 1. Discover candidates (requires gh CLI, authenticated) -> data/discoveries.jsonl
python3 scripts/discover_repos.py

# 2. Draft a profile for a repo worth keeping
python3 scripts/catalog.py new https://github.com/owner/repo --domain maas-platform

# 3. Fill in the six sections by hand, then rebuild + check
python3 scripts/catalog.py index      # regenerate catalog/INDEX.md
python3 scripts/catalog.py validate   # hard gate: schema, filenames, dead links
python3 scripts/catalog.py lint       # soft warnings: quality drift

# Refresh stars/forks/license from the GitHub API (also run monthly by CI)
python3 scripts/catalog.py refresh
```

`validate` exits non-zero on any violation and runs in CI; `lint` always exits 0 and is advisory.

### Run tests

```bash
uv run pytest tests/ -v          # 100 cases
# or: pytest tests/ -v
```

`tests/test_scripts.py` mocks HTTP with `responses`, so the suite is fully offline.

---

## Web UI

### Discovery
- **Inspiration Mode** — full-screen swipe/keyboard card browser with autoplay and undo/redo
- **Smart Recommendations** — driven by the languages and keywords of your bookmarks
- **Random Treasure** — shuffle into projects you'd otherwise never surface
- **Surge Index** — rank by `today_stars / stars` to spot the fastest risers

### Filtering & search
Multi-dimensional filters (language, stars, forks, score) · live search-as-you-type · shareable filter URLs via query params · saved presets

### Collections
`localStorage` bookmarks · batch bookmark/export · side-by-side comparison · JSON export

### Polish
Dark/light theme (persisted) · Chinese/English i18n · PWA with offline fallback · full keyboard navigation

### Keyboard shortcuts

| Key | Action |
|---|---|
| `/` | Focus search |
| `T` | Toggle theme (share to X in inspiration mode) |
| `B` | Toggle bookmarks view |
| `L` | Toggle language |
| `?` | Show help |
| `↑` / `↓` | Navigate list |
| `Enter` | Open details |
| `Space` | Bookmark |
| `C` | Compare mode |
| `←` / `→` | Prev/next in inspiration mode |
| `P` | Autoplay inspiration |
| `F` | Flip inspiration card |
| `U` / `R` | Undo / redo |
| `Home` / `End` | Jump to first/last |
| `Esc` | Close overlay |

---

## Data sources & scoring

| Source | What it contributes |
|---|---|
| **Awesome Lists** | vinta/awesome-python, avelino/awesome-go, and 6 more |
| **GitHub Search API** | Recent-activity queries across 5 dimensions |
| **Hacker News** | Top HN stories linking to GitHub repos |
| **DEV.to** | GitHub repos extracted from trending articles |

```
score = stars
      + forks
      + (forks / stars) × 1000   # community engagement
      + today_stars × 10          # momentum
      + commit_activity × 2       # 4-week commit count (freshness)
```

`today_stars` is *estimated* from push/creation recency — the GitHub Search API exposes no per-day star deltas. For top-N trending repos the scraper additionally queries `stats/commit_activity` to ground the momentum signal in real commit data.

---

## Automation

| Workflow | Trigger | Does |
|---|---|---|
| `ci.yml` | push / PR to `main` | pytest → syntax check → `catalog.py validate` → `catalog.py lint` (soft) |
| `monthly-scrape.yml` | 1st of month, 00:00 UTC | Full multi-source scrape, commits `data/repos.json` |
| `monthly-update.yml` | 1st of month, 06:00 UTC | Monthly incremental fetch + `catalog.py refresh` + `index`, commits results |
| `deploy-pages.yml` | push to `main` | Publishes `web/` to GitHub Pages |

Cadence is **monthly**, not daily. GitHub Pages is not enabled on this repository, so there is no hosted demo — run it locally, or enable Pages on your own fork (see FAQ).

---

## Tech stack

| Layer | Tech |
|---|---|
| Scraper | Python 3.11+ · requests · BeautifulSoup |
| Tooling | uv (locked deps) · pytest · ruff (line-length 120) |
| Frontend | Vanilla HTML/CSS/JS — zero build step |
| Offline | Service Worker + PWA manifest |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (opt-in) |

---

## FAQ

**"Failed to load data" in the browser?**
Serve over HTTP (`python3 -m http.server 8000`). Browsers block `fetch` under `file://`.

**Hitting GitHub API rate limits?**
Export `GITHUB_TOKEN` — lifts the limit from 60 to 5,000 requests/hour. `discover_repos.py` additionally requires an authenticated `gh` CLI.

**`catalog.py validate` fails on a new profile?**
Most often the filename: it must be the **repo** part only, lowercased with `_` → `-` (so `Project-HAMi/HAMi` → `hami.md`). Second most common: an internal Markdown link pointing at a profile that doesn't exist yet.

**Want a hosted copy?**
1. Fork the repo
2. Settings → Pages → Source: **GitHub Actions**
3. Push to `main`; `deploy-pages.yml` publishes `web/` to `https://<user>.github.io/repo-database/`

---

## License

MIT
