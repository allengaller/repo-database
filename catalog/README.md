# Catalog · 仓库档案库

> 持续收集和沉淀 AI 与开源领域优秀 GitHub 仓库的人工策展档案层。
> 每个重要仓库一篇独立 Markdown 档案，含结构化 frontmatter 元数据 + 深度分析正文。

---

## 一、定位：项目数据的四层架构

| 层 | 位置 | 性质 | 更新方式 |
|----|------|------|---------|
| **量化聚合层** | [`data/repos.json`](../data/repos.json) | 自动抓取的热门仓库指标（stars/forks/score） | `scripts/scrape.py` + 月度 workflow 全自动 |
| **发现收件箱** | [`data/discoveries.jsonl`](../data/discoveries.jsonl) | 通过关键词搜索增量发现的候选仓库（一行一条 JSON） | `scripts/discover_repos.py` 半自动 |
| **策展档案层** | `catalog/`（本目录） | 人工筛选 + 深度分析的独立 Markdown 档案 | `scripts/catalog.py` 辅助 + 人工撰写 |
| **专题调研层** | [`research/`](../research/) | 跨仓库的综合研究报告（市场分析、对比矩阵、课程方案等） | 人工撰写 |

单仓库档案一律放本目录；`research/` 只存非单仓库维度的综合报告。

信息流向：`discoveries.jsonl`（发现）→ 人工筛选 → `catalog/`（建档）→ 定期 `refresh`（保鲜）。

---

## 二、目录结构与分类法

以**技术领域（domain）为主轴**分一级目录，其他维度（类型、时间、评分）放 frontmatter 由索引自动聚合：

```
catalog/
├── README.md            # 本规范手册
├── INDEX.md             # 自动生成的总索引（勿手改）
├── _template.md         # 新档案模板
├── ai-agents/           # AI Agent 框架、编排、Agent 应用与列表
├── ai-engineering/      # LLM 应用开发基础设施（RAG、MCP、编码助手、评估）
├── ai-mental-health/    # AI × 心理咨询/治疗/情感支持（LLM、数据集、论文列表）
├── creative-coding/     # 创意编程框架、生成艺术、AI × 艺术创作
├── culture-arts/        # 数字人文、文化遗产开放数据、古诗词等人文项目
├── fullstack-arch/      # 系统设计知识库、云原生参考架构/IaC、全栈脚手架、SRE 可观测
├── interview-career/    # 技术面试题库/八股、系统设计面试、简历与求职流程
├── maas-platform/       # 推理引擎、模型网关、K8s 算力调度、LLMOps 可观测
├── mind-philosophy/     # 心智哲学/唯识/佛教心理学 × 计算实现
└── mindfulness-apps/    # 冥想/正念应用（PWA、移动端）
```

### 领域（domain）注册表

| domain | 目录 | 收录范围 |
|--------|------|---------|
| `ai-agents` | `ai-agents/` | Agent 框架、多智能体编排、Agent 应用、Agent awesome-list |
| `ai-engineering` | `ai-engineering/` | RAG 框架、MCP 服务器/工具链、编码助手、LLM 评估与编排基础设施 |
| `ai-mental-health` | `ai-mental-health/` | 心理 LLM、咨询对话生成、认知干预、心理计算论文/数据集列表 |
| `creative-coding` | `creative-coding/` | 创意编程框架/工具、生成艺术、AI 音乐/图像创作等 AI × 艺术交叉项目 |
| `culture-arts` | `culture-arts/` | 数字人文工具与资源、文化遗产开放数据、古诗词等人文社科开源项目 |
| `fullstack-arch` | `fullstack-arch/` | 系统设计与架构知识库、云原生参考架构与 IaC、全栈应用脚手架、可观测性与 SRE 工程 |
| `interview-career` | `interview-career/` | 技术面试题库与八股文、系统设计面试课程、算法训练、简历模板与求职流程资源 |
| `maas-platform` | `maas-platform/` | LLM 推理引擎与部署、模型网关与多模型接入、K8s 算力调度与 AI Stack、LLMOps 与可观测 |
| `mind-philosophy` | `mind-philosophy/` | 唯识/阿毗达磨/佛教心理学的计算建模与工程实现 |
| `mindfulness-apps` | `mindfulness-apps/` | 冥想、内观、正念类终端应用 |

**新增领域**：新建目录（小写、连字符分隔），并在上表和 `scripts/catalog.py` 的 `DOMAINS` 中同步注册。领域应按"收录 3 篇以上才立目录"原则克制增设，宁可先挂靠相近领域。**孵化例外**：确有独立收录方向的新领域允许 2 篇起步（如 `mindfulness-apps/`），但需持续补齐——连续两次月度审视仍不足 3 篇时，应并入相近领域。

### 类型（type）取值

`framework` · `library` · `application` · `model` · `dataset` · `awesome-list` · `tool` · `course` · `other`

---

## 三、命名规范

- **档案文件名**：小写仓库名 + `.md`，如 `github.com/Emo-gml/PsyLLM` → `psyllm.md`
  - 仓库名中的 `_` 统一转为 `-`；若不同 owner 撞名，追加 `-{owner}`（如 `vipassana-app-giekaton.md`）
- **目录名**：小写、连字符分隔的领域名
- 一个仓库只在**一个** domain 目录下建档（主领域），跨领域用 `tags` 表达

---

## 四、档案格式（frontmatter 字段说明)

每篇档案以 YAML frontmatter 开头（仅使用字符串/整数/行内数组的简单子集，由 `catalog.py` 解析校验）：

```yaml
---
name: owner/repo            # 必填，GitHub 全名
url: https://github.com/owner/repo   # 必填
domain: ai-agents           # 必填，见领域注册表
type: framework             # 必填，见类型取值
languages: [Python, Rust]   # 主要语言
stars: 123                  # refresh 自动更新
forks: 45                   # refresh 自动更新
license: MIT                # 许可 SPDX 标识；未知填 unknown，非标准许可为 NOASSERTION
discovered: 2026-06-28      # 必填，发现日期 YYYY-MM-DD
updated: 2026-07-29         # 必填，档案/数据最后更新日期
rating: 4                   # 必填，个人评价 1-5
status: active              # active | archived | watch
tags: [llm, meditation]     # 跨维度标签（小写）
summary: 一句话中文简介       # 必填，用于索引表
---
```

注意：字段值中不要出现 ` #`（空格 + 井号）——解析器会将其视为行内注释并截断。

正文六段结构（见 [`_template.md`](_template.md)）：

1. **项目基本信息**（表格：名称/地址/描述/许可/star/fork）
2. **技术栈分析**
3. **核心功能特性**
4. **应用场景说明**
5. **个人评价**（优势/不足/评分理由）
6. **相关资源**（论文/文档/关联项目）

> 历史豁免：2026-06 迁移自 research/ 的早期深度研究型档案（`mind-philosophy/` 全部及 `ai-agents/yogacara-agent.md`）保留原报告结构，不强制改写；**新档案一律使用六段结构**。

---

## 五、日常流程

### 新增一篇档案

```bash
# 1. 自动生成草稿（从 GitHub API 拉基本信息 + 套模板）
python scripts/catalog.py new https://github.com/owner/repo --domain ai-agents

# 2. 人工补全正文分析、rating、tags、summary

# 3. 重建索引 + 校验
python scripts/catalog.py index
python scripts/catalog.py validate
python scripts/catalog.py lint       # 软告警：缺段 / summary 过短 / star 无时间戳 / 数据陈旧；不阻塞 CI
```

发现来源建议：`python scripts/discover_repos.py` 增量搜索 → 审阅 `data/discoveries.jsonl` → 值得深挖的建档。

### 定期维护（月度，已由 CI 自动执行）

```bash
python scripts/catalog.py refresh   # 从 GitHub API 更新全部档案的 stars/forks/language/license
python scripts/catalog.py index     # 重建 INDEX.md
```

`monthly-update.yml` workflow 每月自动执行以上两步并提交（`refresh` 会提示 GitHub 上已归档的项目，需人工确认后改 `status`）；`ci.yml` 在 push/PR 到 main 时执行 `validate` 保证档案格式与索引新鲜度。单元测试见 [`tests/test_catalog.py`](../tests/test_catalog.py)。

### 归档

项目长期停更或失去参考价值时，将 `status` 改为 `archived`（不删除档案，保留沉淀）；`watch` 表示暂未深挖、仅观察。

---

## 六、质量要求

- frontmatter 必填字段齐全，`validate` 必须通过
- `summary` 一句话说清"这个项目是什么 + 为什么值得收录"
- 个人评价必须给出 rating 理由，避免纯粹搬运官方 README
- 引用外部数据（star 数、论文结论）注明获取时间
