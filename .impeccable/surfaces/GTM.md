# Surface Brief: GTM

## Scope & Visitor Mode

- Artifact: `GTM/index.html` — standalone go-to-market landing page for the repo-database repository.
- Mode: **Persuade** — a first-time visitor must understand what repo-database is, believe the curation is real, and star the repository.

## Audience, Job, Action, Proof

- Four audiences (confirmed): AI/agent engineers (primary), interview-prep developers, international open-source community, self-hosters.
- Job: cut through awesome-list noise; find what survived human review.
- Primary action: **Star on GitHub** (confirmed). Secondary: read catalog profiles; clone & run locally.
- Proof (all real, from repo): 117 profiles / 10 domains (INDEX.md ground truth), 4 data sources, score formula, 4 CI workflows, 100 pytest cases, 5 lineage paradigms, real profile content (frontmatter + six sections), MIT license. No hosted demo — never fabricate one, never fabricate testimonials/metrics.

## Constraints

- Bilingual in-page: 中文 default ↔ English toggle (localStorage persisted, pattern follows web/).
- Zero-build static HTML/CSS/JS in `GTM/`; no framework, no bundler.
- External Google Fonts allowed (Saira + Spline Sans Mono + Noto Sans SC) with system fallbacks.
- No light/dark theme toggle: the committed world is the station-board enamel scene (single dark-green material state) — deviation from the usual dual-theme delivery standard is intentional, direction-owned.
- prefers-reduced-motion must disable flap animation gracefully.

## Chosen Direction & Memorable Moment

**THE ROLL · 翻牌出发板** (user-locked 2026-08-30, seed key fe398aec, degraded roll — no challengers, no quality-bar boards).

World: station split-flap departure hall. Deep-green enamel board (#0d1a14), bone flap tiles (#f2eee2), amber "now boarding" (#f5a623), stamp-red human marks (#c8452c). Saira (DIN-lineage transit face) + Spline Sans Mono for flap characters. Riveted board frames; pinned paper notices carry real profile cards with ink-stamp ratings; lineage paradigms render as a metro-style line map (5 lines, origin → derivatives).

Memorable moment: the live departure board flipping real catalog repo names per domain line in the first viewport; primary CTA as a ticket-window Star stub.

## Unresolved Decisions

- None blocking. English copy is translation of real Chinese summaries (facts preserved, no invented claims).
