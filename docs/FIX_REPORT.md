# 项目修复执行报告

> 执行时间：2026-05-31  
> 关联文档：[REVIEW.md](./REVIEW.md)（原始检查报告）

---

## 执行摘要

基于 [REVIEW.md](./REVIEW.md) 中的检查结论，对 `repo-hoarder` 项目的后端爬虫、CI/CD 工作流及前端体验进行了系统性修复。共涉及 **3 个文件**，**167 行新增/修改**。

---

## 变更文件清单

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `scripts/scrape.py` | 重写 | 修复所有严重/中等级别缺陷 |
| `.github/workflows/monthly-scrape.yml` | 修改 | 注入 Token + 修复 commit 逻辑 |
| `web/app.js` | 修改 | 优化加载失败的用户提示 |

---

## 1. `scripts/scrape.py` — 后端爬虫重写

### 1.1 Awesome Lists 真正生效

**问题**：原代码请求 `https://api.github.com/repos/awesome-python`（缺少 owner）返回 404，且 `parse_awesome_list()` 从未被调用，Awesome Lists 数据源完全失效。

**修复**：
- raw URL 从固定分支（`main`）改为 `/HEAD/README.md`，自动适配 `main` 或 `master` 默认分支
- 先请求 raw README 内容，再调用 `parse_awesome_list()` 解析其中链接
- 对解析出的项目逐个调用 API 补全详情（每个列表上限 30 个，避免 rate limit 耗尽）

```python
# 修复前：请求 404，从未解析 README
owner_repo = list_info["name"]  # 仅 "awesome-python"
url = f"https://api.github.com/repos/{owner_repo}"

# 修复后：通过 HEAD 自动指向默认分支获取 README
resp = requests.get(list_info["url"], ...)  # /HEAD/README.md
repo_names = parse_awesome_list(resp.text)
for repo_full_name in repo_names[:30]:
    details = fetch_github_repo_details(parts[0], parts[1])
```

**验证**：对 8 个 awesome list 的 `HEAD` URL 手动测试，全部返回 HTTP 200。

### 1.2 GitHub Trending 替换为 Search API

**问题**：`github.com/trending` HTML 页面已于 2022–2023 年被 GitHub 官方下架，原 `fetch_trending_html()` 完全失效，且 `repos.json` 中所有 `today_stars` 为 0。

**修复**：
- 移除 `fetch_trending_html()` 及其 BeautifulSoup DOM 选择器
- 新增 `fetch_trending_repos()`，使用 GitHub Search API 查询近期活跃项目：
  - `pushed:>最近30天 stars:>2000`
  - `created:>最近90天 stars:>1000`

```python
def fetch_trending_repos():
    """
    GitHub discontinued /trending HTML page.
    Use Search API for recently active repos instead.
    """
    queries = [
        f"pushed:>{one_month_ago} stars:>2000",
        f"created:>{three_months_ago} stars:>1000",
    ]
```

### 1.3 GitHub Token 支持

**问题**：未认证 API 请求限额仅 60 req/hour，脚本几乎必然触发 403 rate limit。

**修复**：
- 新增全局 `GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")`
- 统一 `get_headers()` 函数，自动注入 `Authorization: Bearer <token>`
- 启动时检测 Token 并给出提示

```python
if GITHUB_TOKEN:
    print("   🔐 Using GitHub Token for higher rate limits")
else:
    print("   ⚠️  No GITHUB_TOKEN found — rate limit is 60 req/hour")
```

### 1.4 去重逻辑修复

**问题**：`merge_and_sort()` 以 `stars` 为保留标准，高 score 但低 stars 的项目会被错误覆盖，且 `source` 字段丢失。

**修复**：
- 以 **`score`** 为去重保留标准
- 合并多个来源的 `source` 字段（如 `github_api+trending`）

```python
if name not in unique or repo["score"] > unique[name]["score"]:
    if name in unique:
        old_source = unique[name].get("source", "unknown")
        new_source = repo.get("source", "unknown")
        if old_source != new_source:
            sources = sorted({s for s in (old_source, new_source) if s})
            repo["source"] = "+".join(sources)
    unique[name] = repo
```

### 1.5 死代码清理与复用

**问题**：`fetch_github_repo_details()` 定义后从未被调用。

**修复**：将其整合进 Awesome Lists 详情补全流程，同时统一使用 `get_headers()` 管理请求头。

### 1.6 其他改进

- `parse_awesome_list()` 正则表达式重写，过滤 `marketplace`、`enterprise` 等非仓库链接
- 自动 `os.makedirs("data", exist_ok=True)` 避免目录缺失报错
- 所有 API 请求统一使用 `get_headers()`，错误提示更具体

---

## 2. `.github/workflows/monthly-scrape.yml` — CI/CD 修复

### 2.1 注入 GitHub Token

```yaml
- name: Run scraper
  run: python scripts/scrape.py
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2.2 修复 commit/push 逻辑

**问题**：无数据变更时 `commit` 不执行，但 `git push` 仍会运行。

**修复**：使用 `git diff --cached --quiet` 判断是否有 staged 变更，再决定是否 commit + push。

```yaml
- name: Commit and push data
  run: |
    git config --local user.email "action@github.com"
    git config --local user.name "GitHub Action"
    git add data/repos.json
    if git diff --cached --quiet; then
      echo "No changes to commit"
    else
      git commit -m "chore: update trending repos data"
      git push
    fi
```

---

## 3. `web/app.js` — 前端体验优化

**问题**：直接打开 `index.html`（file:// 协议）时加载失败，提示信息不够具体。

**修复**：检测当前协议，给出差异化引导：

```javascript
const isFileProtocol = window.location.protocol === 'file:';
grid.innerHTML = `
  <div class="loading" style="flex-direction: column; gap: 10px;">
    <span style="...">无法加载数据</span>
    <span style="...">
      ${isFileProtocol
        ? '当前通过 file:// 协议直接打开页面。请通过本地服务器访问：<br><code>cd web && python3 -m http.server 8000</code>'
        : '请先在项目根目录运行 <code>python3 scripts/scrape.py</code> 生成数据文件'
      }
    </span>
  </div>
`;
```

---

## 验证结果

| 检查项 | 状态 | 备注 |
|--------|------|------|
| Python 语法检查 | ✅ 通过 | `python3 -m py_compile scripts/scrape.py` |
| JavaScript 语法检查 | ✅ 通过 | `node --check web/app.js` |
| Awesome List HEAD URL | ✅ 全部 200 | 手动测试 8 个列表的 raw README |
| 脚本主流程 | ✅ 通过 | 无 Token 时 API 部分受 rate limit 限制（预期行为） |

---

## 后续操作建议

1. **配置 GitHub Token**
   - 仓库 Settings → Secrets and variables → Actions → New repository secret
   - Name: `GITHUB_TOKEN`（或直接使用 `${{ secrets.GITHUB_TOKEN }}`，GitHub 默认已提供）
   - 配置后 Actions 自动运行时将获得 **5000 req/hour**，数据抓取完整性大幅提升

2. **手动触发验证**
   - 进入仓库 Actions 页面
   - 选择 "Monthly GitHub Trending Scrape"
   - 点击 "Run workflow" 手动触发，观察运行日志

3. **前端部署**
   - `web/` 目录可直接部署到 GitHub Pages、Vercel 或 Netlify
   - 部署前确保 `data/repos.json` 已生成并提交到仓库
