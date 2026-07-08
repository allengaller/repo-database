---
kind: configuration_system
name: 配置系统 — 环境变量 + 硬编码常量 + JSON 数据契约
category: configuration_system
scope:
    - '**'
source_files:
    - scripts/scrape.py
    - scripts/update_monthly.py
    - web/app.js
    - .github/workflows/monthly-scrape.yml
    - .github/workflows/monthly-update.yml
    - data/repos.json
---

## 1. 采用的方式与工具
- **无集中式配置框架**：仓库未引入 `pydantic-settings`、`python-dotenv`、`configparser` 等第三方库，也不存在 `config.yaml` / `.env` / `application.properties` 等标准配置文件。
- **纯 Python 脚本 + GitHub Actions**：所有运行时配置通过 **环境变量** 注入（`os.environ.get`），其余参数以模块级 Python 常量硬编码在脚本中。
- **JSON 作为唯一数据契约**：`data/repos.json` 是抓取流水线与前端静态站点之间的唯一共享数据结构，由 `scripts/scrape.py` 和 `scripts/update_monthly.py` 共同读写。
- **前端内联常量**：Web 端的 UI 行为参数集中在 `web/app.js` 中的 `INSPIRATION_CONFIG` 对象里，随站点一起部署。

## 2. 关键文件与位置
- `scripts/scrape.py`：主抓取入口，定义 `MIN_STARS`、`MIN_FORKS`、`AWESOME_LISTS`、`LANGUAGES`、`GITHUB_NON_REPO_OWNERS` 等模块级常量，并通过 `os.environ.get("GITHUB_TOKEN")` 读取认证令牌。
- `scripts/update_monthly.py`：月度增量更新脚本，复用相同的环境变量模式，并新增 `--year` / `--month` / `--report` CLI 参数控制行为。
- `web/app.js`：前端应用，将动画时长、滑动阈值、历史长度上限等 UI 参数集中在 `INSPIRATION_CONFIG` 常量对象中。
- `.github/workflows/monthly-scrape.yml` 与 `.github/workflows/monthly-update.yml`：CI 工作流通过 `${{ secrets.GITHUB_TOKEN }}` 向运行环境注入 `GITHUB_TOKEN`，并以 cron 调度触发。
- `data/repos.json`：持久化的“数据库”，包含 `fetched_at`、`total`、`sources`、`criteria`、`repos[]` 字段，是所有下游消费方的单一事实来源。

## 3. 架构与设计约定
- **环境变量优先于配置文件**：敏感信息（GitHub Token）一律通过环境变量注入，不在代码或仓库中落盘；非敏感开关（如最小星标数）则直接写死为模块级常量，便于一次性全局调整。
- **多源聚合 → 单文件输出**：`scrape.py` 从 Awesome Lists、GitHub Search API、Hacker News、DEV.to 五个来源拉取数据，合并去重后统一写入 `data/repos.json`；`update_monthly.py` 按月份增量追加，保持同一 schema。
- **评分与筛选逻辑内嵌**：`calculate_score`、`estimate_today_stars`、`merge_and_sort` 等算法函数直接写在脚本内部，不通过外部配置表驱动，变更需修改源码。
- **前端零后端依赖**：静态站点仅加载 `data/repos.json`，所有交互状态（已浏览记录、最后位置）保存在浏览器 `localStorage`，无需服务端配置。
- **CI 即部署管道**：每月 1 日自动执行两个 workflow，分别负责全量抓取与月度增量补采，并将结果提交回仓库，形成“代码 + 数据”同仓的自描述结构。

## 4. 开发者应遵循的规则
- **新增运行时参数时**：
  - 敏感值一律通过 `os.environ.get("KEY")` 读取，并在 README 与 CI 中说明如何设置；
  - 非敏感开关以模块级常量形式放在脚本顶部，配合注释说明用途与默认值。
- **修改 `data/repos.json` 结构**：必须同步更新 `scrape.py` 与 `update_monthly.py` 中的 `format_api_repo`/`format_repo` 以及前端渲染逻辑，确保三方 schema 一致。
- **扩展数据来源**：在 `scrape.py` 中新增一个 `fetch_xxx()` 函数，返回与现有 repo 条目同构的字典列表，并在 `main()` 中合并到 `all_repos`；同时在 `save_results` 的 `sources` 列表中登记新来源名称。
- **前端行为调优**：将可配置的 UI 数值收拢到 `INSPIRATION_CONFIG` 对象，避免散落在事件处理函数中；如需新增用户偏好，使用 `localStorage` 键名前缀保持一致风格（如 `inspiration_*`）。
- **CI 安全**：永远不要将 `GITHUB_TOKEN` 硬编码进脚本或提交到仓库；仅在 workflow 的 `env:` 块中使用 `${{ secrets.GITHUB_TOKEN }}` 注入。
