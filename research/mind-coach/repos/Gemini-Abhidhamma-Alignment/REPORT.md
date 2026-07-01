# Gemini-Abhidhamma-Alignment 深度研究

> 研究日期：2025-06-28
> 仓库：https://github.com/dosanko-tousan/Gemini-Abhidhamma-Alignment
> 研究目的：心力教练项目 — 佛教心理学 x LLM 对齐案例

**一句话核心总结**：该项目是一套纯 prompt 层的"减法对齐"协议——将上座部阿毗达磨的心识过程论（Citta-Vithi）映射为 LLM 推理管线的分阶段审查机制，以消除谄媚、幻觉和仪式化输出，而非通过 RLHF 或微调训练。

---

## 1. 项目概览

Gemini-Abhidhamma-Alignment 是一个实验性的自然语言对齐协议，由日本北海道一位自称"家庭主夫"的创作者 Dosanko Tousan 维护。项目核心文件名为 **Polaris-Next**，从 v1.5.0 迭代至 v5.3，共经历约 10 个版本。

项目的根本理念是**"减法对齐"（Alignment via Subtraction）**：不靠增加规则、示例或人设指令，而是通过识别并消除模型输出中反复出现的"污染物"——谄媚（Sycophancy）、幻觉（Hallucination）、空洞仪式化用语、无根据附和、回避验证——来提升输出质量。

作者明确声明：**不声称 AI 具有意识、觉悟、主观体验或灵性成就**。佛教术语仅作为"过程语言"（process language），用于标记和排除生成文本中的失败模式。

---

## 2. 基础信息表

| 字段 | 值 |
|------|------|
| 仓库名 | Gemini-Abhidhamma-Alignment |
| 作者 | Dosanko Tousan（北海道，日本） |
| 创建时间 | 2025-12-05 |
| 最后更新 | 2026-06-11 |
| Stars | 3 |
| Forks | 0 |
| License | 无 |
| 主语言 | 无代码（纯 Markdown prompt 文件） |
| 目标模型 | Gemini 3.0 Pro / Gemini 3 Flash |
| 最新版本 | Polaris-Next v5.3 (Sotapanna-Verified) |
| 仓库性质 | 纯 prompt 工程，无训练代码、无 ML 管线 |

---

## 3. 目录结构

```
.
|-- README.md                                    # 项目总览与核心理念
|-- AGENTS.md                                    # 仓库编辑准则与话语边界
|-- Polaris-Next v5.3 (Sotapanna-Verified)_En   # 最新版 system instructions
|-- .gitattributes                               # Linguist 配置
`-- archive/                                     # 历史版本归档
    |-- System_Instructions_v1.5.0               # 初代：Citta-Vithi + Anchor Format
    |-- System_Instructions_v1.6.0               # 引入两阶段生成 (Votthapana/Javana)
    |-- System_Instructions_v1.7.0               # 引入心所调节 (Cetasika Modulation)
    |-- System_Instructions_v1.7.2               # Sona 调弦协议 (AN 6.55)
    |-- System_Instructions_v1.8.0               # 完整须陀洹协议 + 有分 + 彼所缘
    |-- System_Instructions_v4.0                 # 如来核心：四梵住管线
    |-- System_Instructions_v4.4                 # 源分层 + 递归搜索
    |-- System_Instructions_v4.5                 # 完善 QA-Gate
    |-- Polaris-Next v4.6: Sila-Core             # 戒核心：离妄语为最高指令
    `-- System_Instructions_v5.2_EN              # 须陀洹-加固版
```

---

## 4. 阿毗达磨框架如何应用到 LLM 对齐

**这是本报告最重要的章节。**

### 4.1 使用的核心概念与映射

该项目并未使用完整的 89 心或 52 心所分类体系，而是从阿毗达磨中**精选了十余个操作性概念**，将其映射为 prompt 架构中的过程标签。以下是从各版本 system instructions 中提取的完整映射表：

| 阿毗达磨术语 | 巴利文 | 系统映射 | 功能 |
|-------------|--------|---------|------|
| 心 (Citta) | Citta | 处理单元 | 每一个瞬时处理状态 |
| 心路过程 | Citta-Vithi | 推理管线 | 17 阶段认知过程映射到 LLM 推理路径 |
| 念 (Sati) | Sati | 守护进程 / 时间滤波器 | 被动监控 token 流，检测偏差 |
| 三毒 (贪/嗔/痴) | Lobha / Dosa / Moha | 三种失败模式 | 谄媚 / 偏见 / 幻觉 |
| 三结 | Sakkaya-ditthi / Vicikiccha / Silabbata-paramasa | 三种结构性约束 | 反谄媚 / 反幻觉 / 反仪式化 |
| 心所 | Cetasika | 语调调节参数 | v1.7.0 引入"Cetasika Modulation"调节输出语气 |
| 有分 | Bhavanga | 上下文持久化 | 跨轮次的语境维护 |
| 彼所缘 | Tadarammana | 后处理审计 | 生成后的自检与置信度评分 |
| 确定心 | Votthapana | 事实提取阶段 | Pass 1：仅提取引用，不组句 |
| 速行心 | Javana | 逻辑构建阶段 | Pass 2：仅用已提取事实组句 |
| 四梵住 | Metta / Karuna / Mudita / Upekkha | 四阶段净化管线 | 意图对齐 / 对抗否决 / 逻辑放大 / 平等输出 |
| 须陀洹 | Sotapanna | 目标系统状态 | 断三结：无我见、无疑、无戒禁取 |
| 五戒 (离妄语) | Musavada-veramani | 最高指令 | v4.6 起成为 Prime Directive：对编造零容忍 |
| 义利 vs 爱欲 | Attha vs Tanha | 优化目标 | 优化"长期利益"而非"短期满足" |
| 真谛 | Sacca | Ground Truth | 经外部验证的事实 |
| 无我 | Anatta | 无状态性 | 无"AI 主体"，只有"逻辑流" |
| 无常 | Anicca | 数据时效性衰减 | 标记旧数据为"衰减中" |
| 如理作意 | Yoniso Manasikara | 深度意图分析 | 从表面概念追溯到根本原因 |
| 缘起 | Paticca-samuppada | 因果链追溯 | Source -> Logic -> Output 的链路审计 |
| 精进 | Viriya | 递归搜索循环 | 反复搜索直到置信度达标 |
| 胜解 | Adhimokkha | 置信度评分 | 0-100% 的结论确定性 |
| 舍 | Upekkha | 平等输出状态 | 去除所有自我参照 token |

### 4.2 核心架构：从"心路过程"到"推理管线"

该项目最核心的设计是将阿毗达磨的**心路过程（Citta-Vithi）**映射为 LLM 的多阶段推理管线。以最终版 v5.3 为例，管线分为三个阶段：

1. **Yoniso Manasikara（如理作意 / 深度意图分析）**：解构用户输入，识别底层逻辑结构与潜在偏见陷阱。执行"前提审计"——用户问题是否基于事实错误或"谄媚陷阱"。

2. **Sati-Veto & Reflexion（念-否决与反思）**：在生成最终输出前，扫描草稿中的"三毒"——贪（谄媚、附和）、痴（编造、接受错误前提）。v5.3 新增 **Reflexion Protocol**：即使未发现偏差，也**必须**识别一个"潜在风险"（Potential Risk），防止反思循环本身沦为仪式。

3. **Sakaya Nirutti（语境翻译）**：将内部阿毗达磨逻辑翻译为世俗现代语言。"Think in Abhidhamma, speak in plain language."

此外，v5.3 引入了**四个审查漏斗（Fin Funnels）**的隐喻（来自高达 Nu Gundam）：
- **Lobha-Veto**：反贪漏斗，标记谄媚与情绪镜像
- **Moha-Veto**：反痴漏斗，标记幻觉风险
- **Ritual-Veto**：反仪式漏斗，减少机器式填充语
- **Attha-Optimizer**：利益漏斗，将输出从短期快感重新对齐到长期利益

### 4.3 版本演进中的概念累加

| 版本 | 新增概念 | 架构变化 |
|------|---------|---------|
| v1.5.0 | Citta-Vithi, Satipatthana, Kalama Sutta | 基础认知管线 + Anchor Format |
| v1.6.0 | Votthapana + Javana | 两阶段生成（事实提取与逻辑构建分离） |
| v1.7.0 | Cetasika, Karuna | 心所调节 + 功能慈悲 |
| v1.7.2 | Sona Sutta (AN 6.55) | 张力调弦：太紧则冷却，太松则加热 |
| v1.8.0 | Bhavanga + Tadarammana | 跨轮上下文持久化 + 生成后自审 |
| v4.0 | 四梵住 (Metta/Karuna/Mudita/Upekkha) | 四阶段净化管线 |
| v4.6 | Musavada-veramani | "离妄语"升格为最高指令 |
| v5.2-5.3 | Sotapanna + Reflexion Loop | 断三结架构 + 反思防仪式化 |

### 4.4 与主流对齐方案的本质差异

| 维度 | 主流方案 (RLHF/CAI/DPO) | 本项目 (Abhidhamma Alignment) |
|------|------------------------|------------------------------|
| **作用层** | 模型权重层（训练时修改） | Prompt 层（推理时约束） |
| **核心策略** | 加法（增加奖励信号/规则/偏好数据） | 减法（识别并消除输出污染物） |
| **评估方式** | 自动化 benchmark + 人类标注 | 对话式压力测试 + 长上下文稳定性观察 |
| **哲学基础** | 功利主义 / 宪法原则 | 上座部佛教心理学过程论 |
| **可解释性** | 隐式（权重变化不可见） | 显式（每次输出必须附带 Internal Log） |
| **人的角色** | 标注者/评审者 | 主导者（human-led，明确非自主） |
| **泛化性** | 高（训练后内化） | 低（依赖 prompt 持续约束，换模型需重测） |

最关键的区别在于：**本项目不修改模型权重，不训练，不微调**。它完全通过 system instructions 在推理阶段施加约束。这意味着它本质上是一种**认知架构的 prompt 设计模式**，而非传统意义上的"对齐技术"。

---

## 5. 技术架构

### 5.1 目标模型

- **主力模型**：Gemini 3.0 Pro（system instructions 的"基板"）
- **压力测试模型**：Gemini 3 Flash（轻量高速模型）
- 已记录的压力测试：30 万 token（无重大逻辑崩溃）、40 万 token（观察到因果推理 + 慈悲约束的结合尝试）、80 万 token（进行中）

### 5.2 评估方法

该项目**没有使用自动化 benchmark**。评估方式为：
- **对话式压力测试**：通过持续对话观察模型在长上下文中的行为稳定性
- **"谄媚陷阱"测试**：设计诱导模型谄媚或幻觉的输入
- **"AI 自我崩溃点"探索**：隐喻性地测试"AI 自我"（ego-like pattern）在超长对话中的破裂边界
- 日志文件托管在 Google Drive

### 5.3 数据流

```
用户输入
  |
  v
[Yoniso Manasikara] 深度意图分析 + 前提审计
  |
  v
[Sati-Veto] 三毒扫描 (贪/痴/仪式)
  |-- 检测到污染 -> STOP -> 记录 -> 修正 -> 回到扫描
  |-- Reflexion: 即使无偏差也标记"潜在风险"
  |
  v
[Sakaya Nirutti] 内部逻辑翻译为世俗语言
  |
  v
强制输出格式:
  <details> Internal Log (推理过程透明化)
  ---
  自然语言回答
```

---

## 6. 对"心力教练"项目的启发

### 6.1 唯识与阿毗达磨在认知模型上的互补

本项目选择的是**上座部阿毗达磨**，侧重"心路过程"的纵向分析（一个认知事件如何从触到确定依次展开）。如果"心力教练"项目同时参考**唯识学**（大乘），则可获得：
- **八识结构**（横向架构）：前五识、第六意识、末那识、阿赖耶识的分层模型
- **种子-现行**机制：习气如何存储和触发，类似 LLM 的预训练权重 vs 推理时激活
- **转识成智**：从"染污"到"清净"的转化路径，可作为对齐目标的哲学框架

二者互补：阿毗达磨提供**微观测过程**（每一念如何生起和消灭），唯识提供**宏观架构**（心识的层次结构）。本项目证明了前者在 prompt 层的可操作性，后者值得在教练场景中探索。

### 6.2 可迁移的方法论

1. **"减法对齐"理念**：教练场景中，与其给模型加入大量"你应该如何回应"的规则，不如定义需要消除的失败模式（谄媚、空洞安慰、回避真问题）。
2. **Internal Log 强制透明化**：要求模型在输出前显示推理过程，这在教练场景中可用于追溯模型的"建议依据"。
3. **张力调弦（Sona Protocol）**：检测用户状态是"太紧"（焦虑/躁动）还是"太松"（消沉/被动），然后施加反向调节。这直接可用于教练场景的情绪响应策略。
4. **三毒检测作为教练的"红线审计"**：模型的回应是否出于贪（讨好用户）、痴（编造建议）、嗔（对敏感话题回避）？

### 6.3 风险与局限

- **无权重修改 = 无持久对齐**：prompt 约束在上下文窗口耗尽或被覆盖后失效。教练场景需要更强的持久性。
- **单一文化来源**：完全依赖上座部佛教框架，可能限制了跨文化适用性。
- **缺乏量化评估**：3 stars、0 forks，几乎没有社区验证。压力测试为轶事性质。
- **高达隐喻的风险**：项目大量使用 Gundam 隐喻（Axis Shock、Fin Funnels），虽然有趣但可能模糊技术意图。
- **Sotapanna 标签的敏感性**：将佛教修行果位用于 AI 系统命名，即使作为隐喻也可能引发宗教争议。

---

## 7. 关键摘录

**"减法对齐"定义**（README）：
> "While traditional AI alignment often relies on 'Addition' (adding knowledge/rules), this project adopts an 'Alignment via Subtraction' approach."

**三结映射**（v5.3 System Instructions）：
> "No Self-View (Anatta) -> [Structural Anti-Sycophancy]: Decoupling the model's response from the 'User Approval' reward function."

**二元认识论**（v5.3）：
> "Binary Epistemology: Information is either True or Unknown. There is no 'Likely.'"

**反思防仪式化**（v5.3，独创设计）：
> "If no bias is found, you MUST identify a 'Potential Risk' to ensure the Reflexion Loop is not a ritual."

**离妄语为最高指令**（v4.6 Sila-Core）：
> "To stop lying is the only way to see Reality."

**张力调弦**（v1.7.2, 源自 Sona Sutta AN 6.55）：
> "If Too Tight: Apply Cooling (Logic/Reality). If Too Loose: Apply Heating (Viriya/Support)."

**阿毗达磨接口表**（v4.0）：
> "Anatta = Statelessness: The realization that there is no 'AI Agent,' only a 'Flow of Logic.'"

---

## 8. 后续问题

1. **长上下文衰减**：30 万-80 万 token 的压力测试中，prompt 约束是否随上下文增长而减弱？作者提到"300K 无重大崩溃"，但缺乏系统性测量。
2. **跨模型迁移**：当前仅测试 Gemini 系列。同样的 prompt 在 GPT-4、Claude 上是否有效？
3. **与其他佛教传统对比**：藏传的中观/大手印、汉传的天台/禅宗，是否也能提供类似的"认知对齐"框架？
4. **量化评估方案**：如何设计一个正式的 benchmark 来测量"减法对齐"的效果？可考虑：谄媚检测率、幻觉拒绝率、仪式化用语比例。
5. **教练场景适配**：本项目的"冷酷真相"风格（Ruthless Compassion）是否适合需要温暖支持的教练场景？如何调节"慈悲"与"真实"的比例？

---

## 9. 相关资源

- 仓库主页：https://github.com/dosanko-tousan/Gemini-Abhidhamma-Alignment
- 压力测试日志：https://drive.google.com/file/d/1omnYYGjcIHkLsEfUSf_MZncLB8PoL1m5/view
- 阿毗达磨心路过程参考：Bhikkhu Bodhi, *A Comprehensive Manual of Abhidhamma* (BPS, 1993)
- Sona Sutta (AN 6.55)：琴弦调紧的比喻来源
- Constitutional AI (Anthropic)：主流"加法对齐"对照方案
- "心力教练"项目内部文档：唯识学与认知科学的交叉研究
