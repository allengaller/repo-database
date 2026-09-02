# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Zero-build static HTML/CSS/JS — inherits the repository's own convention (`web/` ships vanilla with no build step). The GTM surface is a standalone single-page artifact under `GTM/`, no framework, no bundler.

## Users

Four confirmed audiences, all served by one page:

1. **AI engineering / Agent developers** — looking for high-signal repos in LLM engineering, inference, RAG, agent frameworks; the catalog's strongest holding (61 of 117 profiles in `ai-engineering` + `ai-agents`).
2. **Developers prepping interviews / changing jobs** — the README's pinned reading list is an interview-prep track (`interview-career`, 11 profiles + system-design companions).
3. **International open-source community** — GitHub-native visitors evaluating whether to star/fork; English-first expectation.
4. **Self-hosters** — people who want to fork and run their own repo knowledge base; care about the scraper, `catalog.py` workflow, CI gates, and monthly automation.

## Product Purpose

repo-database is a GitHub repository knowledge base with two complementary halves: an automated multi-source aggregator (Awesome Lists, GitHub Search API, Hacker News, DEV.to) feeding a zero-build web UI, and a hand-curated catalog of **117 Markdown profiles across 10 tech domains** — one repo per file, six-section analysis, review-gated. The curated half is the centre of gravity; the scraper is the intake funnel. Success for the GTM surface: a qualified visitor stars the repository.

## Positioning

Star lists are noise without judgment; awesome lists go stale without automation. repo-database is the mechanism a neighboring product cannot truthfully copy: **machine-ranked intake (score = stars + forks + engagement + momentum + freshness) piped into human curation gated by CI** — every profile carries schema-enforced frontmatter, validated internal links, and monthly automated refresh. The catalog is what survives review.

## Operating Context

- Visitors arrive from GitHub README links, social posts, or search; they evaluate the repo in seconds.
- No hosted demo exists (GitHub Pages not enabled on this repository) — the page must demonstrate the product from its own real assets (profile content, data flow, commands), not from a live app.
- The page ships inside the repository (`GTM/`) and may be served statically anywhere.

## Capabilities and Constraints

- All factual claims come from the repository itself: 117 profiles, 10 domains, 4 data sources, scoring formula, 4 CI workflows, 100 pytest cases, MIT license, `uv.lock` reproducibility. **No invented testimonials, customers, download counts, or rankings.**
- Bilingual: page ships in 中文 and English (in-page language switch or dual rendering, decided at surface level).
- No external network dependencies required to render; external fonts allowed with system fallbacks.
- Must not fabricate a hosted demo or screenshots of data that does not exist.

## Brand Commitments

- Repository name: **repo-database**; product face: **GitHub Treasure** (`web/` UI). Voice: engineer-to-engineer, precise, proof-first, zero hype.
- Numbers are shown with their source or as-of date, never inflated.

## Evidence on Hand

- `README.md` / `README.zh-CN.md` — full product narrative and numbers.
- `catalog/INDEX.md` — auto-generated index of all 117 profiles (real names, ratings, summaries).
- `catalog/_template.md`, `catalog/README.md` — profile spec and taxonomy (real schema to demonstrate).
- `data/repos.json` — real aggregated records (28-repo seed with stars/forks/score fields).
- `data/discoveries.jsonl` — real discovery inbox (423 candidate rows).
- `web/index.html` + `styles.css` — existing product UI world: dark-first near-black `#0c0c0e`, grid background, JetBrains Mono + Outfit, light/dark themes.
- Absences: no screenshots of a hosted demo, no testimonials, no usage analytics, no pricing (MIT, free) — future work must not fabricate these.

## Product Principles

1. The catalog is the centre of gravity; lead with curated human judgment, not raw star counts.
2. Prove, don't claim — every selling point is demonstrated with a real file, command, or number from the repo.
3. Machine intake + human curation is the unique mechanism; show the pipeline, not just the output.
4. One page, four audiences: each visitor type finds their entry path within one viewport of scrolling.
5. Engineer trust over marketing polish: no invented social proof, no inflated metrics.
