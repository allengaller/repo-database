---
name: Forward-Future/loopy
url: https://github.com/Forward-Future/loopy
domain: ai-agents
type: library
languages: [Python, JavaScript]
stars: 2200
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [agent-loop, ai-loop, loop-library, installable-skill, agent-harness, reusable-patterns]
lineage: oh-my-codex
summary: 实用 AI-agent loops 库 + 可安装 skill —— 把"AI-agent loop"作为可复用代码模块提供给开发者，~2.2k stars，"AI agent loop"领域的入门到实战工具
---

# Loopy · 实用 AI-Agent Loop 库

> 收录日期：2026-08-13
> 仓库：https://github.com/Forward-Future/loopy
> 来源：best-of-Agent-Harnesses 在"On the radar"提到；社区称为"AI-agent loop 入门首选"

**一句话核心总结**：Loopy 是 Forward-Future 出品的 AI-agent loops 库 —— 把常用 agent loop（ReAct / Reflection / Plan-and-Execute / RAG / Multi-Agent）作为可复用代码模块 + 可安装 skill 提供，~2.2k stars，对 agent loop 开发者友好。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Loopy |
| **仓库地址** | https://github.com/Forward-Future/loopy |
| **所属组织** | Forward-Future |
| **描述** | A library of practical AI-agent loops and an installable skill for fine-tuned agent harness |
| **开源许可** | MIT |
| **Star 数** | ~2,200（截至 2026-08） |
| **技术类型** | library（可复用 loop 模块） |
| **底层栈** | Python + JavaScript |

---

## 二、技术栈与架构分析

### 2.1 库结构

```
loopy/
├── loops/
│   ├── react.py            # ReAct loop
│   ├── reflection.py       # Reflection loop
│   ├── plan_execute.py     # Plan-and-Execute loop
│   ├── rag.py              # RAG loop
│   ├── multi_agent.py      # Multi-agent loop
│   └── tool_use.py         # Tool-use loop
├── skills/
│   ├── loop_engineer.skill # Agent Skills 标准格式
│   └── ...
└── examples/
    ├── customer_support.py
    ├── code_review.py
    └── ...
```

### 2.2 可安装 Skill

`loopy.skill` 按 Anthropic Skills 标准打包，可直接被 Claude Code / 其他 harness 加载：
- agent 自动学会"何时用哪种 loop"
- 减少 prompt 工程负担

### 2.3 多语言

- Python（主语言）
- JavaScript（部分 loop 实现）
- TypeScript（声明）

### 2.4 与 LangChain / LlamaIndex 的差异

| 维度 | Loopy | LangChain / LlamaIndex |
|------|-------|------------------------|
| 焦点 | loop（循环骨架） | 链路 / 数据 |
| 学习曲线 | 极低 | 中等 |
| 抽象层次 | 循环级 | 组件级 |
| 适合 | "我要选哪种 loop" | "我要拼装哪些组件" |

---

## 三、核心功能特性

### 3.1 ReAct loop

经典 ReAct：reasoning + acting 交替；内置：
- 多步推理链
- 工具调用
- 失败重试

### 3.2 Reflection loop

agent 完成初步答案后自评 → 改进 → 再评；内置：
- self-critique prompt
- 多轮改进上限
- 评分函数

### 3.3 Plan-and-Execute loop

先规划再执行；内置：
- 任务分解
- 子任务并行（可选）
- 执行 + 验证循环

### 3.4 RAG loop

retrieval + generation + feedback；内置：
- 向量检索 / BM25
- 检索结果重排序
- 引用注入

### 3.5 Multi-Agent loop

多个 agent 协同；内置：
- 角色定义
- 通信协议
- 投票 / 共识机制

---

## 四、应用场景与本仓库关联

### 4.1 agent loop 入门

- 不知道该用哪种 loop 时，从 Loopy 选一个
- 学习每种 loop 的标准实现

### 4.2 团队 loop 标准化

- 多个项目复用同一套 loop 实现
- 跨项目代码 review 时 loop 风格一致

### 4.3 作为 skill 集成

- 让 agent 自动选 loop（而非开发者选）
- Claude Code 加载 loopy.skill 后获得"loop 选择能力"

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [loop-engineering.md](loop-engineering.md) | 同为 loop 领域；loop-engineering 偏概念，Loopy 偏代码 |
| [foreman.md](foreman.md) | foreman 是 Boris 风格具体实现，Loopy 提供通用 loop |
| [skills.md](../ai-engineering/skills.md) | Loopy 的 skill 格式完全遵循 Anthropic 标准 |
| [superpowers.md](../ai-engineering/superpowers.md) | Superpowers 中的 brainstorming 等方法论可与 Loopy loop 组合 |

---

## 五、个人评价

### 5.1 优势

1. **loop 选择字典** —— ReAct / Reflection / Plan-and-Execute / RAG / Multi-Agent 一站式选型
2. **可安装 skill** —— 让 agent 自动选 loop，而开发者专心业务
3. **代码即文档** —— 读 Python 源码就能学 loop，比纯概念项目实用
4. **MIT 许可** —— 商用友好
5. **轻量** —— 不绑死 LangChain / LlamaIndex，零依赖起步

### 5.2 不足

1. **2.2k stars 偏少** —— 对比 superpowers 28k / opencode 19.7k，社区认知度有限
2. **Forward-Future 团队规模小** —— 长期维护可持续性观察
3. **loop 实现深度有限** —— 不像 get-shit-done 那样有 wave-based 等创新模式
4. **多语言支持浅** —— Python 完整，JS/TS 仅部分
5. **缺乏与最新模型栈的深度集成** —— 对 Claude / GPT-5 / Gemini 等最新模型适配需用户自己加

### 5.3 评分理由

**3 星（active）** —— loop 选择字典 + 可安装 skill + 代码即文档是其核心优势；对入门和团队标准化有价值。扣分项是 star 数偏少、团队规模小、loop 深度有限；但作为"实用 AI-agent loops 库"的代表，已达 3 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/Forward-Future/loopy |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [loop-engineering.md](loop-engineering.md) — Loop 概念源头
- [foreman.md](foreman.md) — Boris 风格 agent 编排
- [skills.md](../ai-engineering/skills.md) — Anthropic Skill 标准
- [superpowers.md](../ai-engineering/superpowers.md) — 跨 harness 工程方法论