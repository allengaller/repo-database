# 02 · 唯识 × AI × 冥想 · 五大开源项目深度对比

> 研究日期：2026-06-28
> 研究目的：从 5 个代表性开源项目，提炼"心力教练"项目的理论、产品、技术启发
> 数据来源：5 份独立深度报告（见 `repos/` 子目录）

## 总览矩阵

| 项目 | ⭐ | 核心定位 | 佛教传统 | 技术栈 | 工程成熟度 | 教练可迁移度 |
|------|-----|---------|----------|--------|------------|--------------|
| **[alaya](alaya/REPORT.md)** | 13 | AI agent 记忆引擎 | **唯识**（种子-现行-熏习） | Rust | v0.4, 单人 | ⭐⭐⭐⭐ |
| **[vipassana-app](vipassana-app/REPORT.md)** | 9 | 游戏化内观 PWA | 上座部（Vipassana） | Vue 2 | 概念验证 | ⭐⭐⭐ |
| **[Gemini-Abhidhamma-Alignment](Gemini-Abhidhamma-Alignment/REPORT.md)** | 3 | LLM system prompt 框架 | **上座部阿毗达磨** | Markdown | v5.3 成熟 | ⭐⭐⭐⭐⭐ |
| **[Yogacara](Yogacara/REPORT.md)** | 1 | AI agent 框架 | **唯识**（八识全映射） | Python | v0.1.0 Alpha | ⭐⭐⭐ |
| **[buddhist-psychology-course](buddhist-psychology-course/REPORT.md)** | 1 | 佛教心理学 30 模块课程 | 上座部 + 大乘四无量 | HTML 销售页 | 商业课程 | ⭐⭐⭐⭐ |

---

## 一、五大核心发现

### 1. 唯识论在 AI 圈已形成小规模"复兴"

- **alaya** 用 Rust 实现了"种子生现行，现行熏种子"的完整闭环，`CRYSTALLIZATION_THRESHOLD = 5` 直接对应"数数熏习"
- **Yogacara** 用 Python 做了八识全映射：Seed dataclass → AlayaStore（SQLite+FTS5） → ManasModelV2（723 行的自我维持成本量化） → 涌现引擎 → 六级觉醒追踪
- **两者独立演化，但都走向"种子-现行"循环** —— 说明这是唯识论最核心、最可操作化的抓手

### 2. "减法对齐"是佛教 × LLM 对齐的真正创新

- Abhidhamma 项目不通过 RLHF/DPO 改权重，而是**在 prompt 层识别并消除谄媚/幻觉/仪式化用语**
- v5.3 的 **Reflexion Protocol** 即使未检测到偏差也必须标记"潜在风险"，防止反思循环本身沦为仪式化空转
- 这比主流对齐方案更轻量、更可控

### 3. "游戏化 × 内观"已有极简但精准的产品范式

- vipassana-app 用**八角形 SVG 界面**把内观"觉察-标记"操作转化为可视化点击体验
- 仅 ~500 行核心逻辑，就抓住了内观修习的核心操作范式
- 证明"极简概念验证"也能成立

### 4. 佛教心理学课程的商业化路径已被验证

- Frank Navratil 的 "Middle Way Mind Training" 体系：30 模块 × 三级递进 × IPHM 认证 × **$495 USD**
- 课程架构：**基础 → 苦的心理学 → 实修与整合**
- **但完全缺失唯识学派** —— 这是"心力教练"的差异化切入点

### 5. 三个项目都引用了"张力调弦"作为教练核心隐喻

- Abhidhamma 项目叫 **Sona Protocol**（Sona = 佛陀弟子，因练琴太紧/太松不得开悟）
- 检测用户状态 → 施加反向调节（紧→松、松→紧）
- 这是"心力教练"可直接产品化的核心交互模式

---

## 二、对"心力教练"项目的具体启发

### 🎯 理论层（唯识论操作化）

| 唯识概念 | 已见实现 | 教练应用 |
|---------|---------|---------|
| **种子 (bija)** | alaya / Yogacara | 用户的"认知种子库"——信念、模式、创伤印记 |
| **现行 (pravṛtti)** | alaya.activate_seeds | 当下情绪/念头的显现 |
| **熏习 (vāsanā)** | alaya.perfuming.rs | 每次教练对话都在"熏习"新种子 |
| **末那识 (manas)** | Yogacara.ManasModelV2 | 自我维持机制——为什么某些模式难以改变 |
| **三性 (trisvabhāva)** | — | 认知重构工具：遍计所执（妄想）→ 依他起（条件）→ 圆成实（本质） |
| **离言现量** | — | 直接认知冥想的核心操作 |

### 🎯 产品层（可借鉴的具体功能）

1. **张力调弦交互**（来自 Abhidhamma 的 Sona Protocol）
   - 每次对话先评估用户状态：太紧 / 太松 / 适中
   - 自动选择对应的引导策略

2. **种子可视化**（来自 alaya 的 vasana 机制）
   - 用户看到自己的"认知种子库"
   - 观察哪些种子在被反复"熏习"

3. **标记法游戏化**（来自 vipassana-app）
   - 把"觉察-标记"做成点击式交互
   - 可嵌入教练 App 的每日练习模块

4. **减法反思**（来自 Abhidhamma 的 Reflexion Protocol）
   - 每次教练对话后，AI 助手识别"教练的谄媚/空话/仪式化用语"
   - 强制标记潜在风险

5. **六级觉醒追踪**（来自 Yogacara）
   - 把用户的成长阶段显性化
   - 类似游戏里的"段位"，但有佛学内涵

### 🎯 技术层（可直接复用的代码/架构）

- **alaya 的 `perfuming.rs`**：熏习机制 Rust 实现，可作为后端记忆引擎
- **Yogacara 的 `Seed` dataclass**：种子的数据结构设计
- **Abhidhamma 的 v5.3 prompt 模板**：减法对齐的完整 prompt
- **vipassana-app 的八角形 SVG**：游戏化冥想的 UI 起点

### 🎯 商业层（参考定价与路径）

- Frank Navratil 的 **$495 / 30 模块 / IPHM 认证** 是成熟对标
- 心力教练认证课可定价在 **$500-1500** 区间（加上唯识差异化可溢价）
- **必须补充唯识模块**（Navratil 课程完全缺失） + **教练方法论**（倾听/提问/督导）

---

## 三、关键风险与对策

| 风险 | 来源 | 对策 |
|------|------|------|
| 唯识论术语门槛高 | 所有项目共同问题 | 参照 Frank Navratil 用"佛陀作为心理学家"的叙事方式 |
| 工程成熟度低 | alaya / Yogacara 都是 Alpha | 不 fork 底座，只借鉴数据结构与设计思想 |
| 单人维护脆弱 | alaya 单人、vipassana-app 单人 | 持续跟踪但不依赖 |
| Prompt 层约束无持久性 | Abhidhamma 项目 | 结合微调或 RAG 持久化 |
| 唯识在佛教心理学课程中缺失 | Navratil 课程 | 这是**心力教练的差异化机会** |

---

## 四、后续研究优先级

按 ROI 排序：

1. 🔴 **[yogacara-agent](https://github.com/Greatbeing/yogacara-agent)** — Yogacara 作者的姊妹项目（LangGraph + RL），未在本次研究范围，**强烈建议下一轮研究**
2. 🟡 **alaya 的 vasana 机制代码拆解** — 单独抽出熏习模块做 PoC
3. 🟡 **Abhidhamma v5.3 prompt 完整翻译** — 中文本地化，作为教练 AI 的 system prompt
4. 🟢 **Frank Navratil 30 模块课程大纲的唯识补充版** — 设计心力教练认证课原型
5. 🟢 **vipassana-app 的 SVG 交互扩展** — 做成更完整的冥想练习模块

---

## 五、文件索引

| 项目 | 报告 | 大小 |
|------|------|------|
| SecurityRonin/alaya | [REPORT.md](alaya/REPORT.md) | 21.5 KB / 348 行 |
| giekaton/vipassana-app | [REPORT.md](vipassana-app/REPORT.md) | 13.4 KB / 209 行 |
| dosanko-tousan/Gemini-Abhidhamma-Alignment | [REPORT.md](Gemini-Abhidhamma-Alignment/REPORT.md) | 14.6 KB / 251 行 |
| Greatbeing/Yogacara | [REPORT.md](Yogacara/REPORT.md) | 15.9 KB / 326 行 |
| FrankNavratil/buddhist-psychology-course | [REPORT.md](buddhist-psychology-course/REPORT.md) | 16.1 KB / 253 行 |
| **本综合报告** | 02-five-repos-synthesis.md | — |

**本次研究总产出：5 份独立报告 + 1 份综合对比，合计 ~100 KB / 1700+ 行。**
