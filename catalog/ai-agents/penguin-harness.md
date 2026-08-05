---
name: Prism-Shadow/penguin-harness
url: https://github.com/Prism-Shadow/penguin-harness
domain: ai-agents
type: framework
languages: [Python]
stars: 0
forks: 0
license: Apache-2.0
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [agent-harness, self-evolving, multi-agent, self-evolution, gdp-evo, llamafactory, deepseek, eval-driven]
summary: LlamaFactory 作者郑耀威新作 — 全球首个支持多 Agent 自进化的 Harness：0.2 元从零造 Agent、准确率 50%→90% 自动调优、成本仅 Codex 的 1/200
---

# PenguinHarness · 全球首个自进化 Agent Harness

> 收录日期：2026-08-04
> 来源：当日中文 AI 圈刷屏（LlamaFactory 7 万星作者郑耀威新作）+ 团队公众号深度长文
> 仓库：https://github.com/Prism-Shadow/penguin-harness
> 主页：https://penguin.ooo

**一句话核心总结**：PenguinHarness 是 LlamaFactory 团队（PrismShadow）开源的 **Agent 自进化 Harness**——以"文件系统作为唯一真相来源 + PenguinMessage 统一消息协议 + 评估闭环"为三大支柱，原生支持"Agent 自动构建 Agent"和"Agent 自己变强"，在 RAG 应用场景上对比 OpenAI Codex 实现 1/200 成本、2× 速度、更高交付质量；同时为 DeepSeek 装上"眼睛"（视觉副驾）、支持 1000+ 模型统一网关。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | PenguinHarness |
| **仓库地址** | https://github.com/Prism-Shadow/penguin-harness |
| **主页** | https://penguin.ooo |
| **所属组织/作者** | PrismShadow 团队（成立 2025），核心作者 **郑耀威**（LlamaFactory 开源作者，GitHub 7 万星） |
| **描述** | 全球首个支持多 Agent 自进化的 Harness —— 0.2 元从零构建 Agent，Agent 准确率从 50% 提升到 90% 自动完成 |
| **开源许可** | Apache 2.0 |
| **技术类型** | framework（Agent Harness / 自进化框架） |
| **首发日期** | 2026-08-04（公众号深度长文 + GitHub 开源同步发布） |

---

## 二、技术栈与架构分析

### 2.1 三大设计支柱

| 支柱 | 设计选择 | 价值 |
|------|---------|------|
| **文件系统 = 唯一真相来源** | Agent 是文件、提示词是文件、对话历史也是文件；构造新 Agent = 文件的复制粘贴 | 让人与 Agent 的协作像本地操作文件一样自然，最大化可解释性 |
| **PenguinMessage 统一消息协议** | 框架在模型/环境/用户之间交换消息的"网络报文" | 任意代码/任意 Agent 都能以统一接口接入，可插拔、可观测 |
| **评估闭环 (GDPevo + 契约)** | 自带评估基准 + 4 条自进化契约 | 自进化"可观测、可回滚、可审计"，避免 Reward Hacking |

### 2.2 关键数字（来自官方对比数据）

| 指标 | PenguinHarness | OpenAI Codex | 差距 |
|------|----------------|--------------|------|
| 造一个 RAG Agent 的成本 | **0.2 元** | 数十倍 | **1/200** |
| 造一个 RAG Agent 的耗时 | 1× | 2× | **2× 速度** |
| Agent 准确率自进化 | 50% → 90%+ | — | — |
| 单次自进化成本 | 0.5 元（DeepSeek V4 Flash） | — | — |
| 支持模型数量 | **1000+**（含 GPT-5.6 / DeepSeek V4 / Kimi K3 / Gemini 3.6 / Ling 3.0 Flash） | 闭源 | — |
| 系统提示词长度 | **1,300 token** | 15,000+ | 1/10 |

### 2.3 内置 Skills 生态

- **训练/部署类**：LlamaFactory、vLLM、Ollama（开箱即用，可 Vibe Coding 启动训练）
- **模型网关**：1000+ 在线 + 本地模型统一调度、成本对比、多用户并发
- **视觉副驾**：为 DeepSeek 装上"眼睛"——配置视觉代理模型，让 DeepSeek 主驾 + 视觉副驾，能"看到"自己生成的网页/PPT 并迭代
- **轨迹分析**：细粒度行为时间线，定位 Agent 性能卡点

---

## 三、核心功能特性

### 3.1 Agent 自动构建 Agent（"让 Agent 构建 Agent"）

经典 RAG 场景下：

- 输入：「让 AI 生成一个 RAG 应用，实现分块检索、流式返回、带引用」
- PenguinHarness 自动产出：脚手架 + Prompt + Skills 优化 + 前端 + 可运行 Agent
- 产出质量：左侧 PenguinHarness 输出语言通顺、流式输出、来源引用齐全；Codex 输出中英混杂、无流式、无引用

### 3.2 Agent 自进化闭环（从 1 到 100）

1. **Benchmark Builder**：先自动出题，围绕目标能力生成题库并校准难度
2. **Optimizer Agent × Evaluator Agent × 被测 Agent** 三 Agent 协作：
   - 评测组织：按题量/运行次数并行调起 Evaluator
   - 独立打分：Evaluator 启动被测 Agent 解题，用 Evaluator 独占的 Rubrics 打分（防止作弊）
   - 分析优化：Optimizer 汇总结果，分析轨迹定位失分原因，修改提示词/Skill/配置 → 候选版本
   - 验证迭代：分数严格更高才接受，否则回退到上一版
3. **效果**：从 53 分提升到 95 分（DeepSeek V4 Flash，全过程 0.5 元 Token）

### 3.3 自进化契约（CONTRACT.md）

| 条款 | 目的 |
|------|------|
| ① 修改范围限定为 Prompt + Skills，不碰 Harness 内核 | 防止 Agent 破坏权限审计/安全规则 |
| ② 快照 + 回滚 | 负面作用可立即回退 |
| ③ 被测 Agent 只能看题，不能看 Rubrics | 防止 Reward Hacking / 死记硬背 |
| ④ 优化流程全部形成文件记录 | 用户可审计，可解释 |

### 3.4 GDPevo 评估基准

团队耗时半年自研的 **Agent 自进化专用评测基准**：

- 覆盖 **医疗 / 金融 / 法律** 等六大真实场景
- 划分 **训练集 / 测试集**，防止 Agent "偷看答案"
- 解决现有评估"只有测试集、没有训练集"导致的自进化作弊问题

---

## 四、应用场景与已落地案例

### 4.1 已落地的两个生产场景

| 场景 | 效果 |
|------|------|
| **某体检机构** — 报告核查 Agent | 单份报告核查从 **30 分钟** 缩短到 **几十秒** |
| **某制造企业** — 流水线作业巡检多 Agent | 产线停机时间 **减少 65%**，产出 **提升近 2 倍** |

### 4.2 典型应用方向

- **企业私有 Agent 工厂**：用自然语言描述需求，自动产出可部署 Agent
- **领域 Agent 持续调优**：球赛预测、电商售后、金融投研等"准确率随时间上升"的场景
- **Codex 本地平替**：低成本 + 隐私 + 多用户隔离
- **AI 训练/部署自动化**：用 Vibe Coding 方式启动模型训练与部署
- **视觉 × 推理联合工作流**：让纯文本模型（如 DeepSeek）获得视觉能力

### 4.3 与本仓库其他收藏项目的关联

- 关联项目：[pydantic-ai.md](pydantic-ai.md)、[nanobot.md](nanobot.md)、[yogacara-agent.md](yogacara-agent.md) — 同属 Agent 框架层
- 同团队关联：**LlamaFactory**（7 万星，团队代表作）— 训练 → 部署 → Agent 的"训练-部署"链上互补
- 评估方向关联：可作为评估驱动 RL 的工程实现参考

---

## 五、个人评价

### 5.1 优势

1. **首个把"自进化"做成工程产物的 Agent Harness**——评估闭环 + 契约 + 回滚，把学术界讨论了半年的 Agent4AI / RSI 从 paper 变成了可一键安装的产品
2. **极致成本控制** — 0.2 元造 Agent、0.5 元自进化，比 Codex 便宜 200 倍，对中小团队极友好
3. **可解释 + 可审计** — 整个优化过程落盘 + CONTRACT.md 契约，避开"黑盒自进化"风险
4. **自研 GDPevo 评测** — 补上了"自进化评估基准"这个赛道的基础设施空白
5. **团队组合强** — LlamaFactory 作者 + IBM/复旦/北大/CMU/亚马逊学术产业背景，从模型训练到 Agent 落地的全栈能力
6. **极简系统提示词**（1,300 vs 15,000）— 减少 token 消耗，模型行为更稳定

### 5.2 不足 / 需观察

1. **项目刚发布**（2026-08-04 首发）— GitHub 真实 star/fork 数据、社区活跃度、生产案例数还需观察
2. **GDPevo 基准的开放程度** — 团队"耗时半年"自研，是否会开源、是否足够中立尚待确认
3. **1000+ 模型适配宣传** — 实际接入质量、长尾模型的稳定性需要开发者实测
4. **与 LangGraph / AutoGen / CrewAI 等成熟框架的差异化** — 自进化是核心差异点，但通用编排能力、生态完整度仍需时间
5. **CONTRACT.md 契约的强制力** — 契约是"框架规则"而非"法律约束"，对恶意用户的约束有限

### 5.3 评分理由

**4 星（active）** — 当日 AI 圈现象级新项目，方向（Agent 自进化）踩中 2026 年最热的 AI4AI / RSI 趋势；核心作者（LlamaFactory）有强信用背书；架构设计（文件系统 + 协议 + 评估闭环）工程味道浓；落地案例（体检、制造）证明生产可用；唯独"项目刚发布、社区未沉淀、生产案例样本量小"暂不给予 5 星，留 1 星观察位。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/Prism-Shadow/penguin-harness |
| **项目主页** | https://penguin.ooo |
| **开源协议** | Apache 2.0 |
| **安装支持** | Linux / macOS / Windows 一键安装；本地或服务器远程（浏览器访问、多用户隔离） |

### 关联项目

- [pydantic-ai.md](pydantic-ai.md) — 同属 Agent 框架（类型安全）
- [nanobot.md](nanobot.md) — 同属 Agent 框架（轻量自托管个人）
- [yogacara-agent.md](yogacara-agent.md) — 同属 Agent 框架（唯识 RL 增强）
- **LlamaFactory** — 同团队姊妹项目，模型训练基础设施（GitHub 7 万星）

### 时代背景

- 与 **2026 年 AI4AI / Recursive Self-Improvement (RSI)** 趋势同步：田渊栋 Recursive、MSRA 边江 XYZ AI Lab 等都在做同类方向
- 与 ReAct 作者姚顺雨"评估是大模型下半场"判断同向
- 与 **DeepSeek V4 Flash / Kimi K3 / Gemini 3.6** 等新一代低成本模型共生 — 正是这些模型让 0.2 元 / 0.5 元成为可能
