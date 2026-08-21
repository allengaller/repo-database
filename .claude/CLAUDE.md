# GitHub Treasure Repo (repo-database)

## 项目概述

持续收集和沉淀 AI 与开源领域优秀 GitHub 仓库的信息管理系统，数据分四层：

| 层 | 位置 | 说明 |
|----|------|------|
| 量化聚合层 | `data/repos.json` | 多源抓取的热门仓库指标（schema v2） |
| 发现收件箱 | `data/discoveries.jsonl` | 关键词搜索发现的候选仓库（JSONL） |
| 策展档案层 | `catalog/<domain>/<repo>.md` | 人工深度分析档案（frontmatter + 六段正文） |
| 专题调研层 | `research/` | 跨仓库综合研究报告（非单仓库档案） |

## 脚本（scripts/）

- `scrape.py` — 多源全量抓取（Awesome / GitHub API / HN / DEV.to）→ `data/repos.json`
- `update_monthly.py` — 按月增量抓取 + 月报（`--year --month --report`）
- `catalog.py` — 档案库管理：`new <url> --domain X` / `index` / `validate` / `refresh`
- `discover_repos.py` — gh CLI 关键词发现 → `data/discoveries.jsonl`（URL 去重追加）
- `common.py` — 共享工具：`get_headers` / `calculate_score` / `freshness_decay` / `merge_repo`

## 评分算法（common.calculate_score）

```
score = stars + forks + (forks/stars)×1000
      + today_stars×10×freshness + commits_4w×2×freshness
```

freshness 按 `fetched_at` 指数衰减，半衰期 120 天，下限 0.05。

## catalog/ 约定

- 一级目录 = 技术领域（`ai-agents` / `ai-engineering` / `ai-mental-health` / `creative-coding` / `culture-arts` / `fullstack-arch` / `maas-platform` / `mind-philosophy` / `mindfulness-apps`），注册于 `catalog.py` 的 `DOMAINS`
- 文件名 = 小写仓库名（`_` 转 `-`）+ `.md`
- frontmatter 为简易 YAML 子集（str / int / 行内 list），必填字段见 `catalog.py` 的 `REQUIRED_FIELDS`
- `catalog/INDEX.md` 由 `catalog.py index` 生成（幂等、无时间戳），勿手改
- 规范手册：`catalog/README.md`；模板：`catalog/_template.md`

## Web UI

- 零构建 Vanilla JS PWA（`web/`），读取 `data/repos.json` 展示
- 支持筛选/排序/搜索/收藏/灵感模式/中英切换

## GitHub Actions

- `ci.yml` — push/PR：pytest + 脚本语法检查 + `catalog.py validate`
- `monthly-scrape.yml` — 每月全量抓取
- `monthly-update.yml` — 每月增量抓取 + `catalog.py refresh/index/validate`，提交 `data/ catalog/`
- `deploy-pages.yml` — GitHub Pages 部署

## 测试

```bash
pytest tests/ -v    # test_scripts.py（爬虫）+ test_catalog.py（档案库）+ test_frontend.py
```
