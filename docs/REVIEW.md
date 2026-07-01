# 项目检查报告：`repo-hoarder`

> 检查时间：2026-05-31  
> 检查范围：`scripts/scrape.py`、`web/` 前端、`.github/workflows/`、数据质量

---

## 项目概述

**GitHub Treasure Repo** 是一个全自动聚合 GitHub 优质项目的开源工具，通过多源数据（Awesome Lists、GitHub API、Trending）抓取热门仓库，并提供带有筛选/排序功能的前端展示页面。

**技术栈**：Python 3 (requests + BeautifulSoup) + 纯前端 HTML/CSS/JS + GitHub Actions

---

## 🔴 严重问题（功能缺陷）

### 1. `fetch_awesome_lists()` 逻辑完全错误

`scripts/scrape.py` 第 82–124 行的 `fetch_awesome_lists()` **没有真正解析 Awesome List 的内容**：

- `owner_repo = list_info["name"]` 只取了 `"awesome-python"`，但 GitHub API 需要完整路径如 `"vinta/awesome-python"`。实际请求的是 `https://api.github.com/repos/awesome-python`，返回 **404**。
- 该函数只是把 Awesome List **仓库本身**（如 `vinta/awesome-python` 这个仓库）的 stars 数抓下来，当成一个"项目"存入结果。它完全没有读取 `README.md` 里列出的推荐项目。
- `parse_awesome_list()` 函数（第 41–63 行）虽然存在，但**从未被调用**。

**后果**：README 中宣称的"Awesome Lists 数据源"实际上只贡献了 8 个仓库自身的元数据，而不是列表中的数百个项目。

### 2. GitHub Trending 抓取已失效

`fetch_trending_html()`（第 184–249 行）依赖 `https://github.com/trending`：

- GitHub 已于 2022–2023 年**下架了 Trending 页面**。
- 代码中的 CSS 选择器（如 `article.Box-row`、`span[itemprop='programmingLanguage']`）对应的是旧版 DOM 结构。
- `repos.json` 中所有项目的 `today_stars` 都是 **0**，印证了 trending 抓取没有生效。

### 3. 未使用 GitHub Token，极易触发 Rate Limit

整个 `scrape.py` 中没有任何 `GITHUB_TOKEN` 的使用：

- 未认证的 GitHub API 请求限制为 **60 requests/hour**。
- 脚本执行一次需要调用数十次 API（搜索 + awesome lists + 各类查询），几乎**必然触发 403 rate limit**。
- 虽然代码对 403 有简单的 `return None` 处理，但会导致大量数据缺失。

---

## 🟡 中等问题

### 4. 数据合并去重逻辑不合理

`merge_and_sort()`（第 292–308 行）：

```python
if name not in unique or repo["stars"] > unique[name]["stars"]:
    unique[name] = repo
```

- 去重时以 **stars 数量** 为保留标准，而非 `score`。一个从 Trending 来的高 `today_stars` 项目可能因为 `stars` 略低而被 API 数据覆盖。
- 覆盖时 `source` 等字段可能丢失（`repos.json` 中大量项目确实缺少 `source` 字段）。

### 5. `fetch_github_repo_details()` 为死代码

第 66–79 行定义了 `fetch_github_repo_details()`，但整个项目中**没有任何地方调用它**。

### 6. GitHub Actions `git push` 逻辑有隐患

`.github/workflows/monthly-scrape.yml` 第 30–31 行：

```bash
git diff --quiet && echo "No changes" || git commit -m "..."
git push
```

- 如果数据没有变化，`commit` 不会执行，但下一行的 `git push` 仍会执行。虽然此时没有新 commit 会导致 push "already up to date"，但逻辑上不够严谨。

### 7. 前端必须通过 HTTP 服务器访问

`web/app.js` 中 `const DATA_URL = '../data/repos.json'`，使用 `fetch()` 加载。如果用户直接双击 `index.html` 用 `file://` 协议打开，会因为 CORS 限制而加载失败。README 中已说明用 `python3 -m http.server`，但对普通用户不够友好。

---

## 🟢 优点

- **前端设计精良**：暗/亮主题切换、响应式布局、流畅动画、零依赖纯原生实现。
- **筛选功能完善**：支持搜索、语言筛选、Stars/Forks/Score 范围滑块、多维度排序。
- **代码结构清晰**：模块化函数设计，职责分离明确。
- **配置化管理**：Awesome Lists、语言列表等都以常量形式集中定义，易于扩展。
- **GitHub Actions 自动化**：支持定时任务和手动触发。

---

## 🛠 修复建议与执行方案

| 优先级 | 问题 | 修复方案 |
|--------|------|----------|
| **高** | Awesome Lists 抓取失效 | 1. 通过 raw URL 获取 README 内容<br>2. 调用 `parse_awesome_list()` 提取项目链接<br>3. 逐个查询 API 补全详情（限制数量避免 rate limit） |
| **高** | Trending HTML 抓取失效 | 移除对 `github.com/trending` 的 HTML 抓取，改用 Search API 搜索近期活跃项目（`pushed:>date`、`created:>date`） |
| **高** | Rate Limit 严重 | 支持读取 `GITHUB_TOKEN` 环境变量注入请求头，将限额提升至 5000 req/hour |
| **中** | 去重逻辑不合理 | 改为以 `score` 为保留标准，并合并多个来源的 `source` 字段 |
| **中** | 死代码 | 将 `fetch_github_repo_details()` 整合进 Awesome List 详情补全流程 |
| **低** | 前端 file 协议体验 | 改进加载失败时的错误提示，引导用户启动 HTTP 服务器 |
| **低** | Actions 脚本严谨性 | 使用 `if git diff --cached --quiet` 判断是否有变更再 commit + push |

---

## 数据质量快照

当前 `data/repos.json`：

- **总数**：249 个项目
- **更新日期**：2026-05-19
- **`today_stars`**：全部为 0（Trending 未生效）
- **`source` 缺失**：大量项目缺少 `source` 字段
- **语言分布**：Python、TypeScript、Rust、JavaScript 为主

---

## 总体评估

这是一个**设计优秀但爬虫核心逻辑有缺陷**的项目。前端体验出色，但后端数据抓取的三个来源中有两个（Awesome Lists、Trending）实际未按预期工作，数据主要靠 GitHub API 搜索支撑。修复后数据覆盖面和准确性将大幅提升。
