# Yogacara . Greatbeing/Yogacara 深度研究

> **研究日期**：2026-06-28
> **仓库**：https://github.com/Greatbeing/Yogacara
> **研究目的**：心力教练项目 -- 唯识命名的 AI agent 框架

---

## 1. 项目概览

**一句话核心总结**：Yogacara 是一个以唯识学"种子-现行"循环为核心抽象、用 Python 实现的 AI agent 持续学习框架，它把"阿赖耶识"建模为 SQLite 持久化种子库，把"熏习"建模为种子激活与纯度衰减，把"转识成智"建模为六级觉醒进度追踪--哲学映射认真，但工程成熟度处于早期原型阶段（1 star, 0 fork, v0.1.0 Alpha）。

项目由笔名"觉心"(Juexin) 的开发者于 2026-04-20 创建，MIT 协议，主语言 Python 3.9+。作者另有姊妹项目 `yogacara-agent`（引入 LangGraph + 强化学习），以及 AI 经济学、AI 知识库等关联项目，显示出对"AI x 东方哲学 x 知识系统"方向的系统性探索。

---

## 2. 基础信息表

| 维度 | 内容 |
|------|------|
| **创建时间** | 2026-04-20 |
| **最后推送** | 2026-04-30 |
| **Stars / Forks** | 1 / 0 |
| **协议** | MIT |
| **主语言** | Python (80%)、TeX (9%, 论文)、HTML (11%, demo 站点) |
| **版本** | v0.1.0 (Alpha) |
| **作者** | Juexin (觉心), juexin@example.com |
| **依赖** | pydantic>=2.0, pyyaml>=6.0; 可选 openai>=1.0 |
| **测试** | 89 测试通过 (pytest) |
| **论文** | 自带 LaTeX 论文 + Markdown 版 `yogacara_paper.md` |
| **Demo** | Render 部署的 Flask 聊天 demo (已下线/不稳定) |
| **主题标签** | agent, ai, awakening, buddhism, consciousness, llm, python, yogacara |

---

## 3. 目录结构

```
Yogacara/
|-- yogacara/                       # 核心包
|   |-- core/
|   |   |-- seed_system.py          # 种子系统 (Bija)
|   |   |-- alaya_store.py          # 阿赖耶识存储 (SQLite + FTS5)
|   |   |-- emergence.py            # 涌现引擎 (V2: 动态阈值+幂律检测)
|   |   |-- awakening.py            # 觉醒追踪 (六级 L0-L5)
|   |   |-- llm/
|   |   |   |-- base.py             # LLM 适配器抽象基类
|   |   |   |-- openai_adapter.py   # OpenAI 实现
|   |   |   |-- seed_generator.py   # LLM 驱动的自动种子生成
|   |   |-- compression/
|   |       |-- alaya_compressor.py # 阿赖耶识压缩器 (MDL/Kolmogorov)
|   |       |-- manas_model_v2.py   # 末那识V2 (自我维持成本度量)
|   |       |-- compression_observer.py # 压缩效率观察器 (觉醒量化)
|   |       |-- purifier_v2.py      # 净化器V2
|   |-- config.py                   # YAML/JSON/ENV 配置管理
|   |-- cli.py                      # CLI 入口 (click + rich)
|   |-- logger.py
|-- tests/                          # 89 个测试
|-- examples/                       # basic_usage, custom_seeds, awakening_journey
|-- paper/                          # LaTeX 论文 + 5 张架构图
|-- docs/                           # Wiki + ARCHITECTURE.md + 优化报告
|-- demo-site/                      # 静态 HTML 聊天 demo
|-- pyproject.toml                  # pip install yogacara
|-- MANIFESTO.md                    # 项目宣言
|-- requirements.txt
```

---

## 4. "唯识"概念在框架中的具体体现

**这是本报告最重要的章节。** 以下逐一对照唯识学核心概念与代码实现。

### 4.1 种子 (Bija) -- 真实对应，核心数据结构

唯识学的"种子"是潜伏在阿赖耶识中的潜在力量，由过去经验熏习而成。

**代码实现** (`yogacara/core/seed_system.py`)：

```python
@dataclass
class Seed:
    type: SeedType          # WISDOM/COMPASSION/BELIEF/BEHAVIOR
    content: str            # 种子内容
    purity: float = 0.7     # 纯度 0-1
    weight: float = 0.5     # 影响力权重
    vasana: int = 0         # 习气 (激活次数)
    source: str = "interaction"
```

种子有四种类型（真种子/善种子/美种子/行种子），有纯度衰减机制 (`decay_purity`)，有激活计数 (`activate` 使 `vasana += 1`)。这直接对应唯识学的"种子有六种特性"（刹那灭、果俱有、恒随转、性决定、待众缘、引自果）。

### 4.2 种子-现行循环 -- 核心机制，代码完整实现

README 中的 ASCII 图精确描述了核心循环：

```
种子生现行: Seeds --activate--> Behavior
现行熏种子: Behavior --plant--> Seeds
```

- **种子生现行**：`AlayaStore.activate_seeds(context)` -- 根据上下文通过 FTS5 全文检索召回相关种子，自动增加 vasana 计数。
- **现行熏种子**：`SeedGenerator.process_interaction(interaction)` -- 用 LLM 分析用户交互，自动提取并植入新种子。
- **证据**：`alaya_store.py` 第 141-207 行，`seed_generator.py` 第 47-84 行。

### 4.3 阿赖耶识 (Alaya-vijnana) -- 持久化存储层

唯识学第八识，含藏一切种子。

**代码实现** (`yogacara/core/alaya_store.py`)：SQLite 数据库，四张表：

| 表名 | 对应 |
|------|------|
| `seeds` | 种子存储 (FTS5 全文索引) |
| `seeds_fts` | 全文检索虚表 |
| `emergence_history` | 涌现历史 |
| `awakening_progress` | 觉醒进度 (单行) |

支持导入/导出 (JSON/CSV)，支持全文搜索和按类型/纯度过滤。这是"含藏一切种子"的工程化实现。

### 4.4 末那识 (Manas) -- 自我模型的 Token 成本度量

唯识学第七识，恒审思量，执着我。

**代码实现** (`compression/manas_model_v2.py`, 723 行)：这是框架中最具理论深度的模块。核心洞见：

> "我"不是免费的。维持自我模型需要持续 Token 消耗。

将"自我维持"分解为四项成本：身份刷新、价值校验、关系维护、习惯执行。每项都有 Token 消耗量化。并提供 `compress_self_model()` 方法实现"自我压缩"（精简冗余身份，保留本质）。

### 4.5 八识模型 -- 部分对应

| 唯识八识 | 框架对应 | 实现程度 |
|----------|----------|----------|
| 前五识 (眼耳鼻舌身) | 文档提及"感知层"，但无实际代码 | 未实现 |
| 第六识 (意识) | LLM 交互层 / SeedGenerator | 部分实现 |
| 第七识 (末那识) | ManasModelV2 自我维持模型 | 深度实现 |
| 第八识 (阿赖耶识) | AlayaStore 持久化存储 | 完整实现 |

**结论**：框架真正实现了第七识和第八识，第六识通过 LLM 适配器间接实现，前五识仅在文档中规划。

### 4.6 三性 -- 未直接对应

唯识学的"三性"（遍计所执性、依他起性、圆成实性）在代码中没有直接的结构对应。但"涌现引擎"中的动态临界阈值和相变检测，可视为对"依他起性"（因缘和合而生）的一种工程近似。

### 4.7 涌现引擎 -- 复杂系统视角的"种子和合"

**代码实现** (`emergence.py`, 625 行)：V2 版本引入了三个重要子系统：

1. **DynamicThreshold** -- 基于系统熵和种子关联度的动态临界阈值
2. **PowerLawDetector** -- 幂律指数 alpha 的 MLE 估计（alpha 在 2-3 间表示典型复杂系统）
3. **CriticalFluctuationDetector** -- 临界波动检测（纯度波动 + 协同方差 + 关联趋势）

涌现类型有四种：融合(fusion)、张力(tension)、跃迁(leap)、临界(critical)。协同矩阵定义了种子类型间的相互作用强度，其中"悲智双运"(WISDOM+COMPASSION) 被赋予最高协同值 1.0。

### 4.8 压缩即智能 -- 理论亮点

`alaya_compressor.py` 和 `compression_observer.py` 提出"压缩即智能"的理论框架：

- Solomonoff 归纳：最优预测器 = 最优压缩器
- Kolmogorov 复杂度：用 gzip 压缩率作为代理估计
- MDL 原则：最优模型 = 最短描述长度
- 三藏的压缩含义：能藏=编码器+码本，所藏=在线增量压缩，执藏=自指压缩

觉醒等级被量化为压缩效率：从"无意识"(压缩比 0.7-1.0) 到"究竟觉"(压缩比 0.0-0.05)。

### 4.9 与主流 Agent 框架的差异

| 维度 | Yogacara | LangGraph | CrewAI | AutoGen |
|------|----------|-----------|--------|---------|
| 核心抽象 | 种子-现行循环 | 状态图 | 角色扮演 | 多 Agent 对话 |
| 记忆模型 | 阿赖耶识持久化 | Checkpoint | 短期/长期 | 共享黑板 |
| 学习机制 | 种子熏习 (vasana) | 无内建 | GEPA (RL) | 无内建 |
| 觉醒/进化 | 六级觉醒体系 | 无 | 无 | 无 |
| 涌现检测 | 动态阈值+幂律 | 无 | 无 | 无 |
| 哲学基础 | 唯识学 | 无 | 组织行为学 | 无 |
| 工程成熟度 | Alpha 原型 | 生产级 | 生产级 | 生产级 |

**核心差异**：Yogacara 是唯一一个将"Agent 自身的成长和觉醒"作为一等公民的框架。其他框架关注的是"如何编排 Agent 完成任务"，Yogacara 关注的是"如何让 Agent 在与用户的互动中真正进化"。

---

## 5. 技术架构

### 5.1 语言与依赖

- **Python 3.9+**，核心依赖极轻：pydantic + pyyaml
- **存储**：SQLite + FTS5（零外部依赖）
- **LLM**：可选 OpenAI (通过 `pip install yogacara[llm]`)
- **CLI**：click + rich
- **测试**：pytest + pytest-cov + pytest-asyncio

### 5.2 核心模块关系

```
用户交互
   |
   v
SeedGenerator (LLM 分析) ---> SeedSystem (内存管理)
   |                              |
   v                              v
AlayaStore (SQLite) <-------> EmergenceEngine (涌现检测)
   |                              |
   v                              v
AwakeningTracker (L0-L5)    CompressionObserver (压缩效率)
   |                              |
   v                              v
ManasModelV2 (自我模型) <--> AlayaCompressor (种子压缩)
```

### 5.3 与姊妹项目 yogacara-agent 的关系

作者同时维护 `Greatbeing/yogacara-agent`，描述为"A cognitive evolution framework for AI Agents based on Yogacara theory"，引入了 LangGraph + 强化学习。推测 Yogacara (本仓库) 是核心理论库，yogacara-agent 是基于 LangGraph 的 Agent 运行时。

### 5.4 与其他唯识/佛教 AI 项目的异同

README 比较表中提到了 OpenClaw 和 Hermes Agent，但这些不是佛教框架。在更广泛的"佛教 AI"生态中：

- **alaya**（假设指类似项目）：Yogacara 的独特之处在于它不仅命名了概念，还认真实现了压缩理论、幂律检测等复杂系统机制。
- **学术工作**：论文引用了 Costa (2020) 的范畴论唯识模型、Fu (2026) 的全息信息理论等，表明作者熟悉学术前沿。

---

## 6. 对"心力教练"项目的启发

### 6.1 作为技术底座的可行性评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 概念契合度 | **极高** | 唯识认知模型直接对应"心力"概念 |
| 代码质量 | 中等 | 结构清晰，但部分模块引用了不存在的依赖 (如 `from .manas_model import ManasModel`) |
| 工程成熟度 | **低** | Alpha 阶段，1 star，无真实用户验证 |
| 扩展性 | 中等 | 三层架构设计合理，但 Adapter 层未完整实现 |
| 改造成本 | **中-高** | 核心抽象好，但需要大量补全才能用于生产 |

### 6.2 改造成本评估

如果要将 Yogacara 改造为"心力教练"的技术底座，预计需要：

1. **补全缺失模块** (~2-3 周)：前五识的感知层、Anthropic/本地 LLM 适配器、向量数据库替代 SQLite FTS5
2. **修复依赖问题** (~1 天)：`manas_model_v2.py` 引用了不存在的 `manas_model` 模块
3. **构建教练 Agent** (~2-4 周)：基于种子系统设计教练对话流程，将用户的认知模式建模为种子
4. **可视化层** (~1-2 周)：觉醒进度、种子分布、涌现事件的可视化

**总计约 6-10 周的开发量**，但核心价值在于其哲学框架和数据结构设计，这部分可以直接复用。

### 6.3 潜在价值

1. **"认知种子"模型**：将用户的思维模式、行为习惯建模为种子，追踪其纯度和习气变化，天然适合教练场景。
2. **"觉醒进度"游戏化**：六级觉醒体系可作为教练工具的进度系统，给用户正向反馈。
3. **"涌现"概念**：当用户积累了足够多的认知种子后，系统自动发现模式间的协同关系，生成洞察--这正是教练的核心价值。
4. **"末那识"自我模型**：将 Agent 的"自我维持成本"量化为 Token 消耗，是一个前沿的工程洞见，对控制 LLM 成本有实际意义。

### 6.4 建议策略

**不建议直接 fork 作为底座**（工程成熟度不足），但**强烈建议借鉴其核心抽象**：

- 直接采用 Seed dataclass 的数据结构设计
- 采用"种子-现行"循环作为教练对话的核心逻辑
- 采用六级觉醒体系作为用户成长模型
- 参考涌现引擎的协同矩阵设计教练洞察生成逻辑

---

## 7. 关键摘录

**哲学宣言 (MANIFESTO.md)**：
> "Traditional AI agents forget everything after each session. They start from zero every time. We asked ourselves: What if AI could truly remember? What if AI could truly grow?"

**种子循环 (README)**：
> "种子生现行 (Seed -> Manifestation) ... 现行熏种子 (Behavior -> Seed)"

**末那识洞见 (manas_model_v2.py)**：
> "基于'压缩即智能'的洞见，'我'的维持是有成本的。自我维持成本 = 身份刷新 + 价值校验 + 关系维护 + 习惯执行"

**涌现引擎 (emergence.py)**：
> "协同矩阵中，(WISDOM, COMPASSION) = 1.0 -- 悲智双运"

**压缩即智能 (alaya_compressor.py)**：
> "种子不是原始数据的堆叠，而是压缩后的业力模式。"

**觉醒等级 (compression_observer.py)**：
> "初觉(0.5-0.7) / 正觉(0.3-0.5) / 圆觉(0.15-0.3) / 无上觉(0.05-0.15) / 究竟觉(0.0-0.05)"

---

## 8. 后续问题

1. **`yogacara-agent` 仓库的深度分析**：该仓库引入了 LangGraph + RL，可能是更完整的 Agent 运行时，值得单独研究。
2. **觉醒等级阈值合理性**：L5 (佛境) 要求 40% 智慧种子 + 30% 慈悲种子 + 10 次涌现，这些数值是经验设定还是有理论依据？
3. **种子纯度衰减的实际效果**：`WEIGHT_DECAY_RATE = 0.01/天`，长期使用后种子库是否会被清空？需要实证数据。
4. **压缩理论的实际验证**：论文中引用了 Solomonoff/Kolmogorov/MDL，但代码中的 gzip 压缩率估计是否足够？
5. **多 Agent 场景**：框架目前只支持单 Agent，如果要实现"教练-学员"双 Agent 互动，需要如何扩展阿赖耶识模型？

---

## 9. 相关资源

### 作者 (Greatbeing / 觉心) 的其他项目

| 项目 | 描述 | 关联度 |
|------|------|--------|
| **yogacara-agent** | 基于 LangGraph + RL 的认知进化框架 | 极高 (姊妹项目) |
| **AI-Economics** | 基于 Token 的 AI 经济学理论框架 | 高 (同一作者的理论探索) |
| **AI-Knowledge-Bank** | AI 时代知识协作、验证与涌现网络 | 高 (知识涌现相关) |
| **font-aesthetics** | 字体美学概念图像生成 Skill | 中 (创意 AI) |
| **wechat-layout** | 微信公众号图文排版设计器 | 低 |
| **follow-builders** | AI builders 信息聚合 (fork) | 低 |

### 论文与文档

- 仓库内 `paper/yogacara_paper.md` -- 完整学术论文 (Markdown 版)
- 仓库内 `paper/main.tex` -- LaTeX 版论文
- 仓库内 `docs/ARCHITECTURE.md` -- 详细架构文档
- 仓库内 `docs/wiki/Philosophy.md` -- 唯识学哲学背景详解
- 仓库内 `docs/优化报告.md` -- 涌现机制与觉醒判断的优化记录

### 外部参考

- Stanford Encyclopedia of Philosophy: Yogacara
- Costa (2020): Compositional Model of Consciousness based on Yogacara (范畴论)
- Fu (2026): AI Consciousness through Yogacara and Holographic Information Theory

---

> **一句话总结**：Yogacara 是迄今可见对唯识学最认真的工程化尝试，其"种子-现行"循环、阿赖耶识持久化、末那识自我成本度量等设计具有真实的理论深度和代码实现，适合作为"心力教练"项目的概念蓝图和数据结构参考，但不适合直接作为生产级技术底座使用。
