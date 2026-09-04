# repo-database

[![CI](https://github.com/allengaller/repo-database/actions/workflows/ci.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/ci.yml)
[![Monthly Scrape](https://github.com/allengaller/repo-database/actions/workflows/monthly-scrape.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/monthly-scrape.yml)
[![Monthly Update](https://github.com/allengaller/repo-database/actions/workflows/monthly-update.yml/badge.svg)](https://github.com/allengaller/repo-database/actions/workflows/monthly-update.yml)
[![Profiles](https://img.shields.io/badge/catalog-117_profiles-brightgreen)](catalog/INDEX.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](#许可协议)

[English](README.md) · [档案索引](catalog/INDEX.md) · [报告问题](https://github.com/allengaller/repo-database/issues)

一座 GitHub 仓库知识库，由两个互补的部分组成：

1. **自动化聚合** —— 多源爬虫（Awesome 榜单、GitHub Search API、Hacker News、DEV.to）产出数据集，配一个零构建的 Web UI，提供筛选、灵感探索与收藏管理。
2. **人工策展** —— [`catalog/`](catalog/README.md)，当前 **117 篇 Markdown 档案**，覆盖 10 个技术领域。一仓一档：frontmatter 元数据 + 六段式深度分析（技术栈、核心特性、应用场景、个人评价、相关资源），由 `scripts/catalog.py` 管理并在 CI 中强制校验。

策展部分是本仓库的重心。爬虫是入口漏斗，档案库是经过评审后真正留下来的东西。

---

## 📌 近期阅读清单（求职面试向）

> 个人阅读队列，2026-08 置顶。新建档的 11 个仓库位于 [`catalog/interview-career/`](catalog/interview-career/)，另搭配 [`fullstack-arch/`](catalog/fullstack-arch/) 中已有的系统设计档案。

| 档案 | 用途 | ⭐ |
|---|---|---|
| [coding-interview-university.md](catalog/interview-career/coding-interview-university.md) | 总路线图：数月期清单式自学计划 | 5 |
| [tech-interview-handbook.md](catalog/interview-career/tech-interview-handbook.md) | 简历 / 行为面 / 谈薪手册 | 5 |
| [javascript-algorithms.md](catalog/interview-career/javascript-algorithms.md) | 带单测的算法实现 + 复杂度表 | 5 |
| [javaguide.md](catalog/interview-career/javaguide.md) | 中文后端指南，持续活跃维护 | 5 |
| [system-design.md](catalog/interview-career/system-design.md) | 线性系统设计课程，4–6 周冲刺用 | 4 |
| [awesome-system-design-resources.md](catalog/interview-career/awesome-system-design-resources.md) | 免费资源路由（文章/视频/书） | 4 |
| [system-design-interview.md](catalog/interview-career/system-design-interview.md) | 经典真题集，最后一周刷题用 | 3 |
| [cs-notes.md](catalog/interview-career/cs-notes.md) | 中文计算机基础速查（已停更，注意时效） | 4 |
| [advanced-java.md](catalog/interview-career/advanced-java.md) | 追问式进阶问答 | 4 |
| [hiring-without-whiteboards.md](catalog/interview-career/hiring-without-whiteboards.md) | 不考白板的公司清单，附流程说明 | 4 |
| [remote-jobs.md](catalog/interview-career/remote-jobs.md) | 远程友好公司名录 | 4 |

已在库中的配套档案：[system-design-primer.md](catalog/fullstack-arch/system-design-primer.md) · [system-design-101.md](catalog/fullstack-arch/system-design-101.md) · [awesome-scalability.md](catalog/fullstack-arch/awesome-scalability.md) · [architecture-decision-record.md](catalog/fullstack-arch/architecture-decision-record.md)。

---

## 仓库结构

```
repo-database/
├── scripts/
│   ├── scrape.py              # 多源聚合爬虫 -> data/repos.json
│   ├── update_monthly.py      # 月度增量抓取 + 报告
│   ├── discover_repos.py      # 基于关键词的发现（gh CLI）-> discoveries.jsonl
│   ├── catalog.py             # 档案库管理器（new/index/validate/lint/refresh）
│   ├── backfill_lineage.py    # 一次性脚本：回填 lineage 字段
│   └── common.py              # 共享的 HTTP/session 辅助函数
├── data/
│   ├── repos.json             # 聚合数据集（随仓库分发的是 28 条种子数据）
│   ├── discoveries.jsonl      # 发现收件箱 —— 423 行候选，仅追加
│   └── monthly_report_*.md    # 自动生成的月度报告
├── catalog/                   # 策展档案（知识库主体）
│   ├── README.md              # 分类法、命名规范、工作流、档案规格
│   ├── INDEX.md               # 自动生成（请勿手工编辑）
│   ├── _template.md           # 档案模板
│   ├── _lineage/              # 范式谱系档案（5 个范式）
│   └── <domain>/<repo>.md     # 10 个领域下共 117 篇档案
├── research/                  # 专题调研（mind-coach、psychology-projects）
├── web/                       # 纯 HTML/CSS/JS 前端 + PWA Service Worker
├── tests/                     # 100 个 pytest 用例（scripts / catalog / frontend）
├── docs/                      # 归档的规划与评审文档
├── .github/workflows/         # ci · deploy-pages · monthly-scrape · monthly-update
├── pyproject.toml             # 依赖 + ruff/pytest 配置
└── uv.lock                    # 锁定全部传递依赖，保证可复现安装
```

### 数据流

```
discover_repos.py ──► data/discoveries.jsonl ──► 人工 triage ──► catalog/<domain>/*.md
                                                                      │
scrape.py ─────────► data/repos.json ─────────► web/（浏览与筛选）      └──► catalog/INDEX.md
```

`data/repos.json` 是量化的原始水流（按得分排序、机器生成）；`catalog/` 是质化沉淀层（手工撰写、评审准入）。两者相互独立 —— 出现在其中之一并不代表会进入另一个。

---

## 档案库

117 篇档案，10 个领域：

| 领域 | 篇数 | 范围 |
|---|---:|---|
| `ai-engineering` | 35 | LLM 工程、推理、RAG、编码 agent/CLI |
| `ai-agents` | 28 | Agent 框架、harness、多 agent 编排 |
| `interview-career` | 11 | 技术面试题库与八股、系统设计面试、简历与求职流程 |
| `fullstack-arch` | 10 | 系统设计、云原生参考架构与 IaC、SRE 与可观测 |
| `maas-platform` | 10 | 推理引擎、模型网关、K8s 算力调度、LLMOps |
| `ai-mental-health` | 7 | AI × 心理/咨询方向的研究与数据集 |
| `creative-coding` | 5 | 生成艺术、创意编程工具 |
| `culture-arts` | 5 | 数字人文、文化遗产开放数据 |
| `mind-philosophy` | 4 | 心智哲学 / 唯识学 × 计算实现 |
| `mindfulness-apps` | 2 | 冥想与正念应用 |

每篇档案都带必填 frontmatter（`name, url, domain, type, discovered, updated, rating, summary`），以及可选的 `stars / forks / license / languages / status / tags / lineage`。`validate` 强制校验字段规格、文件名规范，并检查正文内部 Markdown 链接是否全部可达；`lint` 输出软性质量告警（缺段落、summary 过短、Star 数缺少截止日期等）。

`catalog/_lineage/` 追踪**范式谱系** —— 已归档 5 个范式（CLI 流式 diff 编辑器、多 agent 编排、agent harness 配置、oh-my-zsh 家族、prompt 演化框架），记录其源头仓库与衍生品，并与各档案 frontmatter 的 `lineage` 字段互相索引。

完整分类法、命名规范与档案规格见 [`catalog/README.md`](catalog/README.md)。

---

## 快速开始

```bash
git clone https://github.com/allengaller/repo-database.git
cd repo-database

# 安装依赖（uv 会读取 uv.lock，保证可复现）
uv sync --extra dev
# 或：pip install -r requirements.txt

# 用内置种子数据直接浏览 UI —— 无需联网、无需 token
cd web && python3 -m http.server 8000
# 访问 http://localhost:8000
```

> `data/repos.json` 随仓库分发的是一份 **28 条精选种子数据**，让 `web/` 开箱即可离线运行。
> 执行 `scripts/scrape.py`（或月度工作流）会用真实抓取结果覆盖它，量级约 1000+ 仓库。

---

## 使用方式

### 更新数据集

```bash
# 全量抓取四个数据源（约 5 分钟；建议设置 GITHUB_TOKEN 以获得完整覆盖）
python3 scripts/scrape.py

# 单月增量抓取 + 生成 Markdown 报告
python3 scripts/update_monthly.py --year 2026 --month 8 --report
```

### 维护档案库

```bash
# 1. 发现候选仓库（需已登录的 gh CLI）-> data/discoveries.jsonl
python3 scripts/discover_repos.py

# 2. 为值得沉淀的仓库生成档案草稿
python3 scripts/catalog.py new https://github.com/owner/repo --domain maas-platform

# 3. 手工补全六段正文，然后重建与校验
python3 scripts/catalog.py index      # 重新生成 catalog/INDEX.md
python3 scripts/catalog.py validate   # 硬门禁：字段规格、文件名、断链
python3 scripts/catalog.py lint       # 软告警：质量漂移

# 从 GitHub API 刷新 stars/forks/许可（月度 CI 也会执行）
python3 scripts/catalog.py refresh
```

`validate` 违规即非零退出并在 CI 中拦截；`lint` 始终返回 0，仅作提示。

### 运行测试

```bash
uv run pytest tests/ -v          # 100 个用例
# 或：pytest tests/ -v
```

`tests/test_scripts.py` 用 `responses` 拦截 HTTP，整套测试可完全离线运行。

---

## Web 界面

### 智能发现
- **灵感模式** —— 全屏沉浸式卡片浏览，支持滑动/键盘导航、自动播放、撤销重做
- **智能推荐** —— 依据收藏项目的语言与关键词推荐相似仓库
- **随机宝藏** —— 随机翻出平时不会浮现的优质项目
- **飙升指数** —— 按 `today_stars / stars` 排序，识别增长最快的新星

### 筛选与搜索
多维筛选（语言 / Stars / Forks / 评分）· 输入即搜 · 筛选条件同步到 URL 可分享 · 自定义预设保存

### 收藏管理
`localStorage` 持久化 · 批量收藏与导出 · 双项目并排对比 · JSON 导出

### 体验细节
暗色/亮色主题（自动记忆）· 中英文切换 · PWA 离线兜底 · 全键盘操作

### 键盘快捷键

| 快捷键 | 功能 |
|---|---|
| `/` | 聚焦搜索框 |
| `T` | 切换主题（灵感模式下为分享到 X） |
| `B` | 切换收藏视图 |
| `L` | 切换语言 |
| `?` | 显示帮助 |
| `↑` / `↓` | 上/下选择项目 |
| `Enter` | 打开详情 |
| `Space` | 收藏 / 取消收藏 |
| `C` | 进入对比模式 |
| `←` / `→` | 灵感模式上/下一个 |
| `P` | 自动播放 |
| `F` | 翻转卡片 |
| `U` / `R` | 撤销 / 重做 |
| `Home` / `End` | 跳到首/末项 |
| `Esc` | 关闭浮层 |

---

## 数据来源与评分

| 来源 | 贡献内容 |
|---|---|
| **Awesome Lists** | vinta/awesome-python、avelino/awesome-go 等 8 个经典列表 |
| **GitHub Search API** | 覆盖 5 个维度的近期活跃度查询 |
| **Hacker News** | HN 热帖中指向 GitHub 的项目 |
| **DEV.to** | 从热门文章中提取的开源项目 |

```
综合得分 = stars
        + forks
        + (forks / stars) × 1000   # 社区参与度
        + today_stars × 10          # 增长势头
        + commit_activity × 2       # 近 4 周提交数（新鲜度）
```

`today_stars` 是**估算值** —— GitHub Search API 不提供每日 star 增量，脚本依据 push/创建时间的新近程度推算。对排名靠前的趋势仓库，爬虫会额外查询 `stats/commit_activity`，用真实提交数据校准势头信号。

---

## 自动化

| 工作流 | 触发时机 | 行为 |
|---|---|---|
| `ci.yml` | push / PR 到 `main` | pytest → 语法检查 → `catalog.py validate` → `catalog.py lint`（软） |
| `monthly-scrape.yml` | 每月 1 日 00:00 UTC | 全量多源抓取，提交 `data/repos.json` |
| `monthly-update.yml` | 每月 1 日 06:00 UTC | 月度增量抓取 + `catalog.py refresh` + `index`，提交结果 |
| `deploy-pages.yml` | push 到 `main` | 将 `web/` 发布到 GitHub Pages |

抓取周期是**每月**，不是每日。本仓库未启用 GitHub Pages，因此没有在线 Demo —— 请本地运行，或在自己的 fork 上开启 Pages（见常见问题）。

---

## 技术栈

| 层级 | 技术 |
|---|---|
| 爬虫 | Python 3.11+ · requests · BeautifulSoup |
| 工程工具 | uv（锁定依赖）· pytest · ruff（行宽 120） |
| 前端 | 纯 HTML/CSS/JS —— 零构建步骤 |
| 离线 | Service Worker + PWA manifest |
| CI/CD | GitHub Actions |
| 部署 | GitHub Pages（需自行开启） |

---

## 常见问题

**页面提示「无法加载数据」？**
请通过 HTTP 服务访问（`python3 -m http.server 8000`）。浏览器禁止 `file://` 协议下的 `fetch`。

**GitHub API 请求受限？**
设置 `GITHUB_TOKEN` 环境变量，限额从 60/小时提升到 5000/小时。`discover_repos.py` 另需已登录的 `gh` CLI。

**新档案跑 `catalog.py validate` 报错？**
最常见是文件名：只取 **repo** 部分，小写并把 `_` 换成 `-`（因此 `Project-HAMi/HAMi` → `hami.md`）。其次是正文里的内部 Markdown 链接指向了尚未创建的档案。

**想要一份在线版本？**
1. Fork 本仓库
2. Settings → Pages → Source 选择 **GitHub Actions**
3. 推送到 `main`，`deploy-pages.yml` 会把 `web/` 发布到 `https://<user>.github.io/repo-database/`

---

## 许可协议

MIT
