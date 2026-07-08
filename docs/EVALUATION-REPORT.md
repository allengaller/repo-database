# 心灵教练（Mind Coach）研究项目全面评估报告

> 评估日期：2026-07-08
> 评估范围：repo-hoarder 仓库全貌 + research/mind-coach 研究模块
> 评估人：AI 代码助手

---

## 1. 项目架构与组织结构

### 整体架构：双项目共生体

本仓库实际包含两个相互独立但有所关联的子项目：

| 子项目 | 定位 | 核心目录 |
|--------|------|----------|
| **repo-hoarder** | GitHub 宝藏仓库聚合器（工具层） | `scripts/`, `web/`, `data/` |
| **mind-coach research** | 心力教练商业研究（知识层） | `research/mind-coach/` |

### 组织结构评价

- **优点**：目录分层清晰，`scripts/`（脚本）、`data/`（数据）、`web/`（前端）、`research/`（研究）、`tests/`（测试）、`docs/`（文档）各司其职。研究子项目有独立的 `INDEX.md` 和 `README.md`，自包含性好。
- **问题**：两个项目在同一个 Git 仓库中，但缺乏逻辑关联——`mind-coach` 研究并未直接使用 `repo-hoarder` 的数据管线（它有自己的 `discover-repos.py`），这导致 `repos.json`（26000+ 行 / ~960KB）与心灵教练研究完全无关，显得仓库定位模糊。
- **建议**：将研究项目拆分为独立仓库，或在主 README 中明确说明两个子项目的关系。

---

## 2. 核心功能模块分析

### 2.1 数据采集层（repo-hoarder）

`scripts/scrape.py`（719 行）实现了**五源聚合**：

| 数据源 | 方法 | 去重策略 |
|--------|------|----------|
| Awesome Lists（8 个） | 解析 README Markdown → GitHub API 验证 | URL 级去重 |
| GitHub Search API | 多维度查询（语言/AI话题/时间范围） | `seen` 集合 |
| Trending 替代 | 5 个时间窗口查询 + commit_activity 丰富 | field-wise max 合并 |
| Hacker News | Top 30 stories → 提取 GitHub URL | 同上 |
| DEV.to | 热门文章 → 标签/URL 提取 | 同上 |

评分算法设计合理：

```
score = stars + forks + (forks/stars)×1000 + today_stars×10 + commit_activity×2
```

其中 `today_stars` 是基于推送时间和创建时间的代理估算，对于 Top-40 候选还用真实的 commit_activity 数据补充。

`scripts/update_monthly.py`（351 行）实现了增量月度更新，支持按语言（14 种）、热门话题（9 个）、低星潜力股三个维度抓取，并可生成 Markdown 月度报告。

### 2.2 前端展示层

`web/index.html`（284 行）+ `app.js` + `styles.css` 构成了一个**零构建步骤**的纯静态 SPA，功能极为丰富：

- 多维度筛选（语言/Stars/Forks/评分/排序）
- 灵感模式（滑动卡片 + 自动播放）
- PWA 离线支持（Service Worker + manifest）
- 书签管理 + 批量操作 + JSON 导出
- 项目对比 + 飙升指数 + 智能推荐
- 完整键盘导航 + 中英文 i18n

### 2.3 心灵教练研究模块

三轮研究产出了 **~440KB / 6000+ 行 / 15 份报告 + 4 份可交付物**：

| 报告 | 核心内容 | 体量 |
|------|----------|------|
| 01-market-landscape.md | 全球市场 $177.8 亿 + 竞品谱系 | 12KB |
| 07-legal-compliance.md | 法律合规边界（中/美/国际）| 28KB |
| 09-curriculum-30-modules.md | 30 模块认证课大纲 | 56KB |
| 08-direct-cognition.md | 直接认知冥想五大传统 | 33KB |

`research/mind-coach/discover-repos.py`（114 行）是一个独立的仓库发现脚本，使用 `gh` CLI 按 13 个中英混合关键词搜索，自动去重并以 JSONL 格式追加到 `discoveries.jsonl`。

---

## 3. 技术选型与工具链评估

| 层次 | 选型 | 评价 |
|------|------|------|
| **爬虫** | Python 3 + requests | 轻量高效，`pip install` 自动安装降级策略好 |
| **前端** | Vanilla HTML/CSS/JS | 零构建步骤，GitHub Pages 直接部署，维护成本极低 |
| **CI/CD** | GitHub Actions（4 条工作流） | 完整覆盖：CI 测试 / 月度爬取 / 月度增量 / Pages 部署 |
| **测试** | pytest（45 个测试用例） | 覆盖了核心函数 + 数据完整性 + 前端资产存在性 |
| **托管** | GitHub Pages | 零成本，适合静态站点 |
| **研究数据** | Markdown + JSONL | 人类可读 + 机器可解析，适合知识管理 |

**亮点**：
- 前端零依赖、零构建的策略非常适合 GitHub Pages 部署场景
- `ci.yml` 中包含 AST 语法检查，是一个好的防御性措施
- `requirements.txt` 仅 1 个依赖（requests），极简主义

---

## 4. 数据管理与存储策略

| 数据类型 | 存储格式 | 体量 | 评价 |
|----------|----------|------|------|
| 聚合仓库数据 | `repos.json`（JSON） | 26534 行 / ~960KB / 1933 个仓库 | 已配置 .gitattributes 标记为二进制 |
| 月度报告 | `monthly_report_*.md` | 2 份（2026-05, 2026-06） | 可读性好 |
| 研究发现 | `discoveries.jsonl`（JSONL） | 20+ 条 | 追加友好 |
| 研究报告 | Markdown（15 份） | ~440KB | 纯文本知识管理 |
| PoC 产物 | HTML（vasana-poc） | 1 份交互式演示 | 可直接使用 |

---

## 5. 文档完整性与质量

**高度优秀的文档体系**：

| 文档 | 质量 | 说明 |
|------|------|------|
| README.md (英文) | 优 | 功能列表/快速开始/快捷键/FAQ 齐全 |
| README.zh-CN.md | 优 | 中文版本 |
| 00-EXECUTIVE-SUMMARY.md | 极优 | 三轮研究的终极总览，信息密度极高 |
| FEATURE_PLAN.md | 良 | 功能规划+执行记录完备 |
| INDEX.md | 优 | 研究索引+术语对照+行动路线图 |

00-EXECUTIVE-SUMMARY.md（293 行）浓缩了 10 条核心结论、MVP 方案、理论框架、30 模块课程摘要、差异化矩阵、风险矩阵、行动路线图、术语表，是一份极高信息密度的 executive brief。

---

## 6. 开发流程与自动化程度

### CI/CD 管线（4 条工作流）

```
push/PR → ci.yml (测试 + AST检查)
每月1日 00:00 → monthly-scrape.yml (全量爬取 + 提交)
每月1日 02:00 → monthly-update.yml (增量更新 + 报告 + 提交)
push main → deploy-pages.yml (部署到 GitHub Pages)
```

自动化程度**非常高**：数据爬取 → 测试 → 报告生成 → Git 提交 → Pages 部署全链路自动化。失败通知也通过 `$GITHUB_STEP_SUMMARY` 实现了。

### 测试覆盖（45 个用例，评估后新增 19 个）

| 测试文件 | 用例数 | 覆盖范围 |
|----------|--------|----------|
| `test_scripts.py` | 27 | 爬虫核心函数（评分/解析/合并/重试） |
| `test_discover_repos.py` | 6 | 研究脚本（JSONL加载/去重/关键词） |
| `test_frontend.py` | 12 | 前端资产 + 数据完整性 |

---

## 7. 优势、潜在问题与改进建议

### 优势

1. **研究深度惊人**：心灵教练方向的三轮研究覆盖了市场/竞品/认证/法律/理论/课程/MVP，形成了完整的商业可行性论证
2. **零构建前端**：Vanilla JS 方案在 GitHub Pages 场景下是最优解，无 webpack/vite 复杂度
3. **高度自动化**：4 条 GitHub Actions 覆盖了数据生命周期的全部环节
4. **风险意识突出**：明确识别了"唯识"术语的高风险（邪教关联案例），并给出了重命名建议
5. **可交付物实用**：vasana PoC、Abhidhamma 中文 Prompt、30 模块课程大纲均可直接使用

### 已实施的修复（2026-07-08）

| 优先级 | 修复内容 | 文件 |
|--------|----------|------|
| P0 | 统一 `calculate_score` 实现（update_monthly 对齐 scrape） | `scripts/update_monthly.py` |
| P0 | 为 `repos.json` 添加 `.gitattributes` 二进制标记 | `.gitattributes` |
| P1 | 为 `discover-repos.py` 添加 6 个单元测试 | `tests/test_discover_repos.py` |
| P1 | 为前端添加 12 个冒烟测试 | `tests/test_frontend.py` |
| P2 | scrape.py 添加请求重试+指数退避机制 | `scripts/scrape.py` |

### 待改进

| 优先级 | 建议 | 预期收益 |
|--------|------|----------|
| P1 | 将 `research/mind-coach/` 拆分为独立仓库 | 项目定位清晰 |
| P2 | `repos.json` 定期归档压缩（如季度归档） | 仓库健康 |
| P2 | 添加前端 E2E 测试（Playwright/Puppeteer） | 功能保障 |

---

## 8. 心灵教练/佛教心理学数字化应用的创新性评价

**这是整个项目最有价值的部分。**

### 理论整合的独创性

"唯识 × 正念 × 教练 × AI" 的四维交叉定位在中文市场确实是**空白**。00-EXECUTIVE-SUMMARY.md 中提出的三层理论框架：

```
直接认知冥想（目标层）→ 止观冥想（方法层）→ 唯识论（理论层）
```

这种将古老冥想传统进行**分层工具化**的思路，既保留了佛学深度，又避免了宗教化风险（通过"深层认知"重命名），展现了成熟的商业思维。

### 技术产品的创新点

- **vasana 熏习机制 PoC**：将"种子-现行-熏习"循环可视化为交互式 HTML，这是一个将唯识论核心概念**产品化**的大胆尝试
- **Abhidhamma 中文 System Prompt**：602 行的教练 AI 提示词，包含 Reflexion/Sona 协议，是将佛学心理学转化为 AI 可用指令的前沿探索
- **30 模块认证课**：将 ICF 8 大能力与唯识/止观/直接认知系统映射，这在教练培训领域是**首创**

### 市场判断的准确性

- 全球冥想市场 2032 年 $177.8 亿的数据引用可信
- 对张德芬/武志红/古典/简单心理/KnowYourself 等中文品牌的差异化分析精准
- 法律合规风险识别（《精神卫生法》第 23/76 条 + AI 备案义务）务实且关键

### 总体评价

这个项目展示了一种**"研究型创业"**的独特路径：先进行系统性的市场/理论/竞品/法律研究，再基于研究结论设计 MVP。三轮研究产出的 6000+ 行知识资产，本身就是这个方向的核心竞争力。如果后续执行力跟上，"心力教练"有潜力成为中文市场中**唯识论工具化教练**这一细分赛道的先行者。

---

*报告生成于 2026-07-08，基于项目 commit 时的代码状态。*

---

## 迁移记录（2026-07-08）

心灵教练（Mind Coach）研究模块已迁移至 [peace-lab-global/hush.ai](https://github.com/peace-lab-global/hush.ai) 项目的 `knowledge/mind-coach/` 目录。

本仓库中的 `research/mind-coach/` 目录及相关测试文件已清理。`research/psychology-projects/` 中对心力教练的引用链接已更新为指向新仓库。
