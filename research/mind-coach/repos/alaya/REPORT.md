# Alaya · SecurityRonin/alaya 深度研究

> 研究日期：2026-06-28
> 仓库：https://github.com/SecurityRonin/alaya
> 研究目的：心力教练项目 — 唯识 × AI 交叉案例

---

## 1. 项目概览

Alaya 是一个用 Rust 编写的嵌入式 AI agent 记忆引擎，以唯识宗"阿赖耶识"（alaya-vijnana）命名，将神经科学与瑜伽行派佛教心理学作为架构设计的核心灵感。它提供三个记忆存储层（情景/语义/内隐），辅以 Hebbian 图叠加层、Bjork 双强度遗忘模型和检索诱导抑制（RIF），全部存储在一个 SQLite 文件中，零外部依赖。项目通过 MCP（Model Context Protocol）服务器、Python binding 和 Rust 库三种方式集成，目前已有 442 个测试、基准评估框架，并附带一篇综述论文和一篇系统设计论文。这不是"用佛学术语做营销"的肤浅项目——代码中的每一个生命周期操作都与唯识论概念存在可验证的结构对应。

## 2. 基础信息

| 字段 | 值 |
|---|---|
| Stars / Forks | 13 / 2 |
| 主语言 | Rust（945 KB），Python（76 KB），TeX（393 KB，论文） |
| License | MIT |
| 创建时间 | 2026-02-25 |
| 最近推送 | 2026-04-20 |
| 最近 star 活动 | 2026-06-27 |
| Topics | `ai`, `memory`, `yogacara`, `ai-agent-tools`, `neurosciences` |
| 核心贡献者 | **h4x0r** (Albert Hui, albert@securityronin.com) — 336 commits，实质为个人项目；renovate[bot] 1 commit |
| 版本 | v0.4.8（workspace 级） |
| 发布渠道 | crates.io (`alaya`), PyPI (`alaya-memory`), npm (`alaya-mcp`) |
| 论文 DOI | Zenodo DOI 已注册 |

## 3. 目录结构（代码树）

```
alaya/                              # 根仓库（Cargo workspace）
├── Cargo.toml                      # workspace 定义，version = "0.4.8"
├── README.md                       # 700 行，含完整架构图与 API 文档
├── CLAUDE.md                       # Claude Code 专用的项目指引文件
├── LICENSE                         # MIT
├── Dockerfile                      # 容器化 MCP 部署
│
├── alaya/                          # 核心 Rust 库
│   ├── Cargo.toml                  # 库 + MCP binary 的 feature flags
│   ├── src/
│   │   ├── lib.rs                  # Alaya coordinator，公开 API 入口
│   │   ├── types.rs                # 全部数据类型定义（Episode, SemanticNode,
│   │   │                           #   Impression, Preference, NodeStrength, Link 等）
│   │   ├── schema.rs               # SQLite schema 定义与 migration
│   │   ├── db.rs                   # 数据库连接工具
│   │   ├── error.rs                # 错误类型
│   │   ├── provider.rs             # ConsolidationProvider / ExtractionProvider trait
│   │   ├── extraction.rs           # LLM 提取逻辑
│   │   ├── decay.rs                # 通用衰减工具函数
│   │   ├── hooks.rs                # 生命周期钩子
│   │   ├── local_embeddings.rs     # 本地 ONNX 嵌入（fastembed）
│   │   ├── async_store.rs          # 异步存储支持
│   │   ├── store/                  # 三存储层实现
│   │   │   ├── episodic.rs         # 情景记忆（海马体）
│   │   │   ├── semantic.rs         # 语义记忆（新皮层）
│   │   │   ├── implicit.rs         # 内隐记忆 / vasana 熏习层（阿赖耶识）
│   │   │   ├── strengths.rs        # Bjork 双强度模型（storage + retrieval）
│   │   │   ├── embeddings.rs       # 向量嵌入存储
│   │   │   ├── categories.rs       # 涌现本体（emergent ontology）
│   │   │   ├── conflicts.rs        # 矛盾检测与解决
│   │   │   ├── vec_search.rs       # 向量搜索
│   │   │   └── export.rs           # 数据导出
│   │   ├── lifecycle/              # 生命周期操作（核心唯识映射）
│   │   │   ├── consolidation.rs    # 巩固：情景 → 语义（CLS 理论）
│   │   │   ├── perfuming.rs        # 熏习：印象累积 → 偏好结晶（vasana）
│   │   │   ├── transformation.rs   # 转依：去重、剪枝、衰减（asraya-paravrtti）
│   │   │   ├── forgetting.rs       # 遗忘：Bjork 双强度衰减
│   │   │   └── reconciliation.rs   # 矛盾调和
│   │   ├── graph/                  # Hebbian 图叠加层
│   │   │   ├── links.rs            # LTP/LTD 链接管理
│   │   │   └── activation.rs       # 扩散激活（spreading activation）
│   │   ├── retrieval/              # 检索管线
│   │   │   ├── pipeline.rs         # 编排：BM25 → Vector → Graph → RRF → Rerank
│   │   │   ├── bm25.rs             # 关键词检索（SQLite FTS5）
│   │   │   ├── vector.rs           # 余弦相似度向量检索
│   │   │   ├── fusion.rs           # Reciprocal Rank Fusion
│   │   │   └── rerank.rs           # 上下文加权重排（编码特异性）
│   │   ├── managers/               # 高层管理器（Episodes, Knowledge, Lifecycle, Admin, Graph）
│   │   ├── mcp/                    # MCP 服务器实现（13 个工具）
│   │   └── bin/alaya-mcp.rs        # MCP 二进制入口
│   ├── tests/                      # 集成测试
│   └── benches/                    # 性能基准
│
├── alaya-py/                       # Python binding（PyO3）
│   ├── src/lib.rs                  # Rust → Python FFI
│   ├── alaya.pyi                   # Python 类型存根
│   └── tests/                      # Python 测试
│
├── npm/                            # npm 分发（预编译二进制 + JS wrapper）
│   ├── alaya-mcp/                  # MCP server npm 包
│   └── cli-darwin-arm64/           # 平台特定预编译包
│
├── bench/                          # 基准评估框架（Python）
│   ├── adapters/                   # 适配器：alaya, fullcontext, naive_rag, zep, mem0
│   ├── runners/                    # 数据集 runner：LoCoMo, LongMemEval, MemoryAgentBench
│   └── judge/                      # LLM Judge
│
├── survey-paper/                   # 综述论文（LaTeX）
│   ├── sections/08-yogacara-framework.tex  # 唯识框架专章
│   └── references.bib
│
├── alaya-paper/                    # 系统设计论文（LaTeX）
│   └── sections/03-architecture.tex
│
├── docs/                           # 文档
│   ├── theoretical-foundations.md  # 理论基础（神经科学 + 唯识 + IR）
│   ├── related-work.md             # 90+ 系统比较
│   ├── benchmark-evaluation.md     # 基准评估详情
│   ├── design.md                   # 设计文档
│   └── mcp-quickstart.md           # MCP 快速入门
│
├── north-star-advisor/             # 北极星顾问（衍生项目骨架）
└── examples/                       # Rust demo
```

## 4. 唯识/佛教元素如何映射到技术设计

**这是本报告最重要的部分。** Alaya 项目与唯识论的关系远非表面命名——它实现了可验证的结构同构。以下逐条分析，附代码证据。

### 4.1 直接借用唯识术语的代码概念

| 唯识术语 | 代码位置 | 对应实现 |
|---|---|---|
| **Alaya-vijnana（阿赖耶识/藏识）** | 整个 `Alaya` coordinator / SQLite 数据库 | 持久化的种子存储基底，无主体性，仅存储潜能 |
| **Bija（种子）** | `Episode`, `SemanticNode`, `Preference`, `Link` | 所有节点都是种子，有强度（strength）、有成熟条件 |
| **Vasana（熏习/薰習）** | `lifecycle/perfuming.rs`，`store/implicit.rs` | 每次交互留下微妙痕迹（impression），累积到阈值则结晶为偏好 |
| **Asraya-paravrtti（转依）** | `lifecycle/transformation.rs` | 定期翻转/净化记忆库：去重、剪枝、衰减 |
| **Vipaka（异熟）** | `lifecycle/consolidation.rs` | 情景种子成熟为语义节点——性质不同于原因 |
| **Vijnaptimatrata（唯识/识所变）** | `EpisodeContext`, `retrieval/rerank.rs` | 记忆是视角相关的，非客观记录 |
| **Vikalpa（分别/概念构造）** | `store/categories.rs`, `lifecycle/transformation.rs` | 涌现本体——类别从聚类中浮现 |

### 4.2 "种子-现行-熏习"模型的架构体现

唯识论的核心动力学是：**种子（bija）→ 现行（manifest experience）→ 熏习（vasana）→ 新种子**。Alaya 实现了完整的闭环：

**种子 → 现行**：检索管线中，被查询激活的记忆从潜能态进入现行态。`store/strengths.rs` 中的 `on_access()` 在每次检索时重置 `retrieval_strength = 1.0`，并增加 `storage_strength`：

```rust
// store/strengths.rs:42-56
pub fn on_access(conn: &Connection, node: NodeRef) -> Result<()> {
    conn.execute(
        "INSERT INTO node_strengths (...) VALUES (?1, ?2, 0.6, 1.0, 1, ?3)
         ON CONFLICT(node_type, node_id) DO UPDATE SET
             storage_strength = MIN(1.0, storage_strength + 0.05 * (1.0 - storage_strength)),
             retrieval_strength = 1.0,
             access_count = access_count + 1, ...",
        params![node.type_str(), node.id(), now],
    )?;
}
```

**现行 → 熏习**：`perfume()` 函数在 `lifecycle/perfuming.rs` 中实现 vasana 机制。每次交互提取 impression（熏习痕迹），累积到 5 条以上则结晶为偏好：

```rust
// lifecycle/perfuming.rs:15-67
pub fn perfume(conn: &Connection, interaction: &Interaction,
               provider: &dyn ConsolidationProvider) -> Result<PerfumingReport> {
    let impressions = provider.extract_impressions(interaction)?;
    for imp in &impressions { implicit::store_impression(conn, imp)?; }
    for domain in domains {
        let count = implicit::count_impressions_by_domain(conn, domain)?;
        if count >= CRYSTALLIZATION_THRESHOLD {  // 阈值 = 5
            // 结晶偏好——如布帛吸足香气后自带气味
            implicit::store_preference(conn, domain, &pref_text, confidence)?;
        }
    }
}
```

**熏习 → 新种子**：结晶的偏好成为新的 `Preference` 节点，带有自己的 `NodeStrength`，可以被检索、衰减、强化。

### 4.3 转依（asraya-paravrtti）的实现

`lifecycle/transformation.rs` 的 `transform()` 函数注释直接引用了唯识概念：

```rust
// lifecycle/transformation.rs:46
/// Run a transformation cycle (asraya-paravrtti).
///
/// Periodic refinement toward clarity: dedup, contradiction resolution,
/// pruning, and decay. Each cycle moves the memory store closer to the
/// "Great Mirror" state — reflecting the user accurately with minimal distortion.
```

它执行的操作与"转识成智"对应：去重（趋向大圆镜智——无扭曲地反映用户）、链接衰减（清除未强化的关联）、偏好衰减（30 天半衰期，未强化的行为模式消退）、印象修剪（90 天过期）。

### 4.4 是命名借用还是结构同构？

**结论：存在真实的结构同构，而非纯粹命名借用。** 证据如下：

1. **理论基础文档** (`docs/theoretical-foundations.md`) 长达 500+ 行，将每个代码概念与唯识经典（《瑜伽师地论》《成唯识论》《解深密经》）做了逐条映射，引用了玄奘译本的具体章节。
2. **三存储模型与唯识八识的对应**：情景记忆 ≈ 前六识（感官记录）、语义记忆 ≈ 末那识的执取功能（提取模式）、内隐/偏好记忆 ≈ 阿赖耶识（种子库）。
3. **《解深密经》偈颂被直接引用**：`theoretical-foundations.md` 引用了"阿陀那识甚深细，一切种子如瀑流"这一核心偈颂，并以此解释为何 Alaya 不做主动干预——它只是存储潜能的基底。
4. **熏习阈值的工程实现**（`CRYSTALLIZATION_THRESHOLD = 5`）与唯识"数数熏习"的概念一致——单次经验不足以形成习气，需要反复熏习才能形成稳定的行为模式。
5. **项目附带的学术论文**（`survey-paper/sections/08-yogacara-framework.tex`）表明这是作为正式学术框架提出的，而非随意借用术语。

## 5. 技术架构

### 核心模块与数据流

```
用户 Agent
  │
  ├─ remember() ──▶ Episodic Store + 自动建图（Temporal/Topical/Entity 链接）
  ├─ recall()   ──▶ 检索管线：BM25 + Vector + Graph → RRF 融合 → 上下文重排 → RIF → Top 3-5
  ├─ learn()    ──▶ Semantic Store（agent 驱动的知识注入）
  ├─ perfume()  ──▶ Implicit Store（印象累积 → 偏好结晶）
  │
  └─ 生命周期调度：
       consolidate()  → 情景 → 语义（需 LLM 或 NoOpProvider）
       transform()    → 去重 + LTD + 剪枝 + 涌现分类
       forget()       → 双强度衰减 + 归档
       dream()        → 一次性执行全部生命周期
```

### 存储层

| 存储 | 类比 | 实现 | 数据表 |
|---|---|---|---|
| 情景记忆 | 海马体 | `store/episodic.rs` | `episodes` + FTS5 虚拟表 |
| 语义记忆 | 新皮层 | `store/semantic.rs` | `semantic_nodes` |
| 内隐记忆 | 阿赖耶识 | `store/implicit.rs` | `impressions` + `preferences` |
| 图叠加层 | 突触网络 | `graph/links.rs` | `links` |
| 强度追踪 | Bjork 模型 | `store/strengths.rs` | `node_strengths` |
| 涌现本体 | vikalpa | `store/categories.rs` | `categories` |

### 与主流记忆方案的差异

| 维度 | Alaya | Mem0 | MemGPT/Letta | LangChain Memory |
|---|---|---|---|---|
| 语言 | Rust | Python | Python | Python |
| 存储 | 单 SQLite 文件 | 云端 API | 多层级（core/recall） | 依赖后端（Redis/Postgres 等） |
| 遗忘机制 | Bjork 双强度 + RIF | 无显式遗忘 | 手动管理上下文窗口 | 无 |
| 偏好学习 | Vasana 熏习（无需 LLM） | LLM 提取 | 无独立偏好层 | 无 |
| 图结构 | Hebbian LTP/LTD + 扩散激活 | 无图 | 无图 | 无图 |
| 离线能力 | 完全离线（BM25-only 降级） | 需 API | 需 LLM | 需 LLM |

### 依赖栈

核心运行时仅依赖 `rusqlite`（bundled SQLite）、`serde`/`serde_json`、`thiserror`。可选依赖：`rmcp`（MCP 服务器）、`ureq`（LLM API 调用）、`fastembed`（本地嵌入）、`sqlite-vec`（KNN 向量搜索）。

## 6. 对"心力教练"项目的启发

### 6.1 可直接借鉴的理念

1. **Vasana 熏习机制用于教练场景**：教练对话中，用户的行为模式（如"总是拖延"、"倾向于过度准备"）可以通过类似的印象累积→偏好结晶机制自动识别。不需要用户明确声明"我是一个完美主义者"——系统从多次交互中自然涌现。这对"心力教练"的核心价值在于：**让被教练者看到自己未曾觉察的模式**。

2. **双强度遗忘用于教练知识管理**：教练积累的客户笔记、干预策略、对话记录，可用 Bjork 模型管理——经常被调用的干预模式自然强化，从未使用的策略自然消退。这避免了知识库无限膨胀的问题。

3. **"记忆是过程而非数据库"的设计哲学**：与教练的理念高度一致——教练不是信息收集器，而是通过每次对话重塑理解的过程。Alaya 的每次检索都会改变图结构（Hebbian 强化），这个设计隐喻非常有力量。

4. **涌现本体（Emergent Ontology）**：不预设分类体系，让类别从数据中涌现——这对教练领域特别有价值，因为每个被教练者的心理地图都是独特的。

### 6.2 此项目能贡献什么

- **成熟的记忆引擎**可以直接作为"心力教练"AI agent 的记忆层
- **MCP 集成**意味着可以无缝对接 Claude Code、Cursor 等工具
- **理论框架文档**提供了唯识×认知科学×AI 的交叉参考，可直接用于心力教练的理论建设
- **基准评估框架**可复用于评估教练 AI 的记忆质量

### 6.3 潜在风险或局限

- **单人项目**：核心开发者仅 h4x0r 一人，bus factor = 1，长期维护风险高
- **Star 数低（13）**：社区验证不足，生产环境使用需慎重
- **v0.4 阶段**：API 可能不稳定（`#[non_exhaustive]` 标注表明类型仍可能变化）
- **缺乏真实教练场景验证**：当前评估仅限于标准 QA benchmark（LoCoMo、LongMemEval），未在对话教练场景测试
- **唯识映射的局限性**：阿赖耶识在唯识论中远比"种子库"复杂——它涉及种子与现行的同时因果、自证分等深层哲学问题，当前实现仅捕获了表层结构

## 7. 关键 README / 代码片段摘录

### 摘录 1：设计原则（README）

> 1. **Memory is a process, not a database.** Every retrieval changes what is remembered. The graph reshapes through use.
> 2. **Forgetting is a feature.** Bjork dual-strength decay separates storage strength from retrieval strength.
> 3. **Preferences emerge, they are not declared.** Behavioral patterns crystallize from accumulated impressions via vasana (perfuming), no LLM required.
> 4. **The agent owns identity.** Alaya stores seeds. The agent decides which seeds matter and how to present them.

*出处：README.md, Design Principles 章节*

### 摘录 2：perfuming 函数注释（唯识核心）

```rust
/// Run a perfuming cycle: extract impressions and crystallize preferences.
///
/// Models vasana (perfuming) from Yogacara Buddhism: each interaction
/// leaves a subtle trace. When enough traces accumulate in one domain,
/// a preference crystallizes — like incense gradually permeating cloth.
```

*出处：`alaya/src/lifecycle/perfuming.rs:11-14`*

### 摘录 3：转依注释

```rust
/// Run a transformation cycle (asraya-paravrtti).
///
/// Periodic refinement toward clarity: dedup, contradiction resolution,
/// pruning, and decay. Each cycle moves the memory store closer to the
/// "Great Mirror" state — reflecting the user accurately with minimal distortion.
```

*出处：`alaya/src/lifecycle/transformation.rs:41-45`*

### 摘录 4：《解深密经》偈颂引用（理论文档）

> 阿陀那识甚深细，一切种子如瀑流，我于凡愚不开演，恐彼分别执为我
>
> *The adana consciousness is exceedingly deep and subtle; all its seeds are like a torrential flood. I do not reveal it to the foolish, for fear they would grasp it as a self.*

*出处：`docs/theoretical-foundations.md`，Alaya-vijnana 章节*

### 摘录 5：三存储架构表（README）

| Store | Analog | Purpose |
|-------|--------|---------|
| **Episodic** | Hippocampus | Raw conversation events with full context |
| **Semantic** | Neocortex | Distilled knowledge extracted through consolidation |
| **Implicit** | Alaya-vijnana | Preferences and habits that emerge through perfuming |

*出处：README.md, Three Stores 章节*

## 8. 后续研究问题

1. **`vasana` 的 valence 维度如何使用？** 代码中 `Impression` 类型包含 `valence: f32`（正负价），但 `perfuming.rs` 中 `avg_valence` 被标记为 `let _ = avg_valence; // Will be used in future`。未来是否会实现"正念/负念"的区分？这对教练场景（区分积极模式与消极模式）至关重要。

2. **`dream()` 函数的完整语义是什么？** `Lifecycle` 提供 `dream()` 方法，一次性执行 consolidate + perfume + transform + forget。这与"睡眠中的记忆整合"在认知科学中的角色是否有更深对应？

3. **涌现分类（vikalpa）与唯识"遍计所执性"的关系**：文档提到类别系统是 vikalpa（概念构造），但未讨论这是否对应"遍计所执"——即人类对概念的执着性建构。如果 Alaya 的分类可能产生错误执着，如何设计"圆成实性"的纠偏机制？

4. **`north-star-advisor/` 目录的用途**：这个衍生项目是否是将 Alaya 应用于教练/顾问场景的早期尝试？其 `docs/architecture/` 和 `docs/design/` 可能包含有价值的产品设计线索。

5. **基准评估在教练对话中的表现**：当前的 LoCoMo/LongMemEval 是通用对话记忆基准。在教练特有的场景（如追踪长期目标变化、识别行为模式循环）下，Alaya 的表现如何？需要设计专项评估。

## 9. 相关资源

- **仓库主页**：https://github.com/SecurityRonin/alaya
- **crates.io**：https://crates.io/crates/alaya
- **docs.rs API 文档**：https://docs.rs/alaya
- **PyPI（Python binding）**：https://pypi.org/project/alaya-memory/
- **npm（MCP server）**：https://www.npmjs.com/package/alaya-mcp
- **理论基础文档**：`docs/theoretical-foundations.md`（仓库内）
- **90+ 系统比较**：`docs/related-work.md`（仓库内，基于 CoALA 分类法）
- **交互记忆景观图**：https://SecurityRonin.github.io/alaya/docs/memory-landscape.html（D3.js 力导向图）
- **基准评估**：`docs/benchmark-evaluation.md`（仓库内）
- **Glama MCP 评分**：https://glama.ai/mcp/servers/SecurityRonin/alaya
- **作者 GitHub Sponsors**：https://github.com/sponsors/h4x0r
- **唯识经典参考**：《瑜伽师地论》[T30 No.1579](https://cbetaonline.dila.edu.tw/T30n1579)、《成唯识论》[T31 No.1585](https://cbetaonline.dila.edu.tw/T31n1585)、《解深密经》[T16 No.676](https://cbetaonline.dila.edu.tw/T16n0676)
