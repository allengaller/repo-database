---
name: JackChen-me/open-multi-agent
url: https://github.com/JackChen-me/open-multi-agent
domain: ai-agents
type: framework
languages: [Python]
stars: 6700
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [multi-agent, langgraph, role-based, orchestration, chinese-ecosystem, modular]
summary: 中文社区出品的开源多 agent 框架 — 基于 LangGraph 的角色化多 agent 编排，可拆装模块 + 中文文档友好，~6.7k stars，中文多 agent 入门首选之一
---

# Open-Multi-Agent · 中文社区的多 Agent 编排框架

> 收录日期：2026-08-13
> 仓库：https://github.com/JackChen-me/open-multi-agent
> 来源：JackChen 出品；2026 年中文社区多 agent 框架代表

**一句话核心总结**：Open-Multi-Agent 是 JackChen 出品的开源多 agent 框架 —— 基于 LangGraph 的角色化多 agent 编排，支持可拆装模块 + 中文文档友好，~6.7k stars，中文社区多 agent 入门首选之一。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | open-multi-agent |
| **仓库地址** | https://github.com/JackChen-me/open-multi-agent |
| **所属作者** | JackChen |
| **描述** | A modular multi-agent orchestration framework based on LangGraph |
| **开源许可** | MIT |
| **Star 数** | ~6,700（截至 2026-08） |
| **技术类型** | framework（多 agent 编排） |
| **底层栈** | Python + LangGraph |

---

## 二、技术栈与架构分析

### 2.1 角色化设计

每个 agent 有明确"角色"：
- 角色 = system prompt + 工具集 + 输入输出契约
- 例：`researcher` / `coder` / `reviewer` / `pm`

### 2.2 LangGraph 编排

底层基于 LangGraph：
- 状态机定义 agent 流
- 节点 = 单个 agent 执行
- 边 = 路由逻辑（条件 / 循环）

### 2.3 可拆装模块

```
agents/
  researcher.py
  coder.py
  reviewer.py
  pm.py
orchestrators/
  waterfall.py
  parallel.py
  reactive.py
tools/
  ...
```

模块可独立替换，便于实验。

### 2.4 中文文档

- README 中英双语
- 关键概念有中文解释
- 配套中文教程博客

### 2.5 实战模板

预置场景：
- 学术研究 agent 团队
- 软件开发 agent 团队
- 内容运营 agent 团队
- 数据分析 agent 团队

---

## 三、核心功能特性

### 3.1 角色模板库

内置常见角色：
- Researcher（资料收集）
- Coder（代码生成）
- Reviewer（代码评审）
- Writer（文档撰写）
- PM（任务拆解）
- Tester（测试用例生成）

### 3.2 编排策略

- Waterfall：串行
- Parallel：并行
- Reactive：响应式
- Hierarchical：分层（manager → worker）

### 3.3 中间件

- Memory：跨 agent 共享记忆
- Tool registry：工具统一管理
- Tracing：可视化每个 agent 的输入输出

### 3.4 CLI + Web UI

- CLI 启动多 agent 任务
- Web UI 可视化 agent 流

### 3.5 与 LangChain 生态兼容

- 复用 LangChain tools
- 复用 LangSmith tracing
- 复用 LangServe 部署

---

## 四、应用场景与本仓库关联

### 4.1 中文开发者的多 agent 入门

- 中文文档降低学习门槛
- 国内 LLM（Qwen / GLM / Kimi）兼容好

### 4.2 软件开发 agent 团队

- Researcher + Coder + Reviewer + Tester 经典组合
- 替代部分 Claude Code 多 agent 场景

### 4.3 内容 / 运营自动化

- 选题 + 写作 + 排版 + 发布的多 agent 流水线

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [openclaw.md](openclaw.md) | openclaw 是单 agent runtime，open-multi-agent 是多 agent 编排 |
| [openharness.md](openharness.md) | openharness 提供 harness，open-multi-agent 提供 agent 编排 |
| [swarm.md](swarm.md) | swarm 也是多 agent，但偏 OpenAI 风格；open-multi-agent 偏 LangGraph 风格 |
| [penguin-harness.md](penguin-harness.md) | 都是中文社区产物，penguin 偏 harness，open-multi-agent 偏 agent |

---

## 五、个人评价

### 5.1 优势

1. **中文社区原生** —— 文档 / 教程 / 讨论中文友好
2. **LangGraph 底座** —— 复用 LangChain 生态，工具丰富
3. **角色化设计** —— 清晰的 agent 抽象，比裸 LangGraph 简单
4. **可拆装模块** —— 适合实验不同编排策略
5. **MIT + 6.7k stars** —— 社区活跃度可

### 5.2 不足

1. **6.7k stars 不算高** —— 对比 LangGraph 本体 5k+ / pydantic-ai 12k+ 仍有差距
2. **JackChen 个人维护** —— 长期可持续性观察
3. **依赖 LangGraph** —— 受 LangChain 生态波动影响
4. **多 agent 调试仍难** —— 状态机调试本质问题，框架只能减轻
5. **国产 LLM 适配深度不一** —— Qwen / GLM 等的 function calling 兼容性需观察

### 5.3 评分理由

**3 星（active）** —— 中文社区原生 + LangGraph 底座 + 角色化设计 + 可拆装模块是其核心优势；对中文多 agent 入门有价值。扣分项是 star 数、个人维护、LangGraph 依赖；但作为"中文多 agent 入门首选"，已达 3 星水平。给 3 星而非 4 星是因为生态深度不及 LangGraph 本体。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/JackChen-me/open-multi-agent |
| **作者博客** | https://jackchen.me |
| **底层框架** | https://github.com/langchain-ai/langgraph |

### 关联项目

- [openclaw.md](openclaw.md) — 单 agent runtime
- [openharness.md](openharness.md) — Python Agent Harness
- [swarm.md](swarm.md) — OpenAI 风格多 agent
- [penguin-harness.md](penguin-harness.md) — 中文社区 Agent Harness
