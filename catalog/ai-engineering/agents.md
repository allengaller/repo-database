---
name: ed-donner/agents
url: https://github.com/ed-donner/agents
domain: ai-engineering
type: course
languages: [Jupyter Notebook, Python]
stars: 2200
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [ed-donner, 6-week-course, openai-agents-sdk, crewai, langgraph, autogen, mcp, framework-comparison, cursor]
summary: Ed Donner 的 6 周实战 AI Agent 课程 — 横向覆盖 OpenAI Agents SDK / CrewAI / LangGraph / AutoGen / MCP 四大主流框架，~2.2k stars，"在 Cursor 里学的项目推动课程"
---

# Agents · Ed Donner 的 6 周 AI Agent 实战课

> 收录日期：2026-08-04
> 仓库：https://github.com/ed-donner/agents
> 来源：2026 多次被列入 Agent 入门项目 Top 6 推荐

**一句话核心总结**：Agents 是 Ed Donner 主理的**6 周实战 AI Agent 课程** — 6 个文件夹按周组织（1_foundations → 2_openai → 3_crew → 4_langgraph → 5_autogen → 6_mcp），**横向对比四大主流框架** + 最新 MCP 协议，**可直接在 Cursor IDE 中学习**，从零基础到部署自主 AI Agent。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Master AI Agentic Engineering |
| **仓库地址** | https://github.com/ed-donner/agents |
| **所属组织/作者** | Ed Donner（ed@edwarddonner.com） |
| **描述** | 6 week journey to code and deploy AI Agents with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and MCP |
| **开源许可** | MIT |
| **Star 数** | ~2,200（截至 2026-08） |
| **技术类型** | course（实战 + 多框架） |
| **代码构成** | Jupyter Notebook 90.3% + Python 9.7% |

---

## 二、技术栈 / 架构

### 2.1 6 周课程结构

```
1_foundations/     → Agent 基础 + LLM API + Prompt Engineering
2_openai/          → OpenAI Agents SDK（1.x）
3_crew/            → CrewAI 多 Agent 框架
4_langgraph/       → LangGraph 状态图
5_autogen/         → AutoGen 微软多 Agent
6_mcp/             → Model Context Protocol 最新协议
```

### 2.2 四大框架横向对比

| 框架 | 适合场景 | 复杂度 |
|------|---------|--------|
| **OpenAI Agents SDK** | OpenAI 生态深度集成 | ⭐⭐ |
| **CrewAI** | 角色扮演团队协作 | ⭐⭐ |
| **LangGraph** | 状态图 + 复杂工作流 | ⭐⭐⭐ |
| **AutoGen** | 微软系，研究/代码生成 | ⭐⭐⭐ |
| **MCP** | 工具/数据源协议 | — |

### 2.3 学习路径

- Week 1：Agent 基础 + LLM API
- Week 2：OpenAI Agents SDK
- Week 3：CrewAI 角色协作
- Week 4：LangGraph 状态图
- Week 5：AutoGen 微软系
- Week 6：MCP 协议

### 2.4 配套资源

- `guides/`：Windows / Mac / Linux 详细安装说明
- `assets/`：图片资源
- `setup/`：环境配置
- 各种 `.env.example` 模板
- 中文 README `README_zh.md`

### 2.5 多模型支持

- OpenAI（默认）
- Groq
- DeepSeek
- Anthropic
- Ollama（本地）

---

## 三、核心功能特性

### 3.1 Week 1 - Foundations

- Agent 基本概念
- LLM API 调用（OpenAI + 兼容 API）
- Prompt Engineering
- Function Calling
- 第一个对话 Agent

### 3.2 Week 2 - OpenAI Agents SDK

```python
from agents import Agent, Runner

agent = Agent(
    name="Code Helper",
    instructions="You are a Python expert",
    tools=[code_tool]
)
result = Runner.run_sync(agent, "Write a Fibonacci function")
```

- OpenAI 官方新 SDK
- 与 OpenAI Responses API 深度集成
- 内置 tracing + guardrails

### 3.3 Week 3 - CrewAI

```python
from crewai import Agent, Crew, Task

researcher = Agent(role="Researcher", goal="Find data", backstory="...")
writer = Agent(role="Writer", goal="Write article", backstory="...")

crew = Crew(agents=[researcher, writer], tasks=[...])
result = crew.kickoff()
```

- 角色扮演多 Agent
- 简单直观
- 业务自动化快速原型

### 3.4 Week 4 - LangGraph

- 状态图工作流
- 复杂多步骤任务
- 可中断 + 可恢复
- 生产级复杂 Agent

### 3.5 Week 5 - AutoGen

- 微软多 Agent 对话
- 代码生成 + 执行
- 自愈型工作流

### 3.6 Week 6 - MCP

- Model Context Protocol
- 工具/数据源标准化
- 未来 Agent 生态的"HTTP"

### 3.7 实战项目

- 金融分析师 Agent
- 深度研究 Agent
- 项目规划 Agent
- 多 Agent 团队
- 销售外展 Agent

---

## 四、应用场景与已落地案例

### 4.1 个人学习者

- 6 周完成全框架对比
- 适合"想选框架但不知道选哪个"的决策困境
- 在 Cursor IDE 中实战

### 4.2 工程师

- 快速横向对比 4 大框架
- 决定团队技术栈选型
- 学习 MCP 新协议

### 4.3 团队负责人

- 6 周完整路径可作为内部培训
- 框架选型决策依据
- 多模型 API 成本对比

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [Hello-Agents](../ai-agents/hello-agents.md) | 中文版完整路径 |
| [GenAI_Agents](../ai-engineering/genai-agents.md) | 横向 Notebook 集合 |
| [Agents-Course](../ai-engineering/agents-course.md) | HF 官方对应（同样多框架） |
| [AI-Agents-for-Beginners](../ai-engineering/ai-agents-for-beginners.md) | 微软官方对应 |
| [DeerFlow](../ai-agents/deer-flow.md) | 真实生产 Agent |

---

## 五、个人评价

### 优势

1. **6 周结构化 + 横向对比**：4 大框架 + MCP 一站学完
2. **可"在 Cursor 里学"**：独特优势，开发者友好
3. **多模型支持**：OpenAI/Groq/DeepSeek/Anthropic/Ollama
4. **作者活跃**：Ed Donner 亲自答疑
5. **实战项目多**：金融/研究/规划/销售全场景
6. **MCP 整合**：未来协议提前覆盖

### 不足

1. **依赖 API 费用**：明确说明"需要小花费"，OpenAI/Groq 等都需付费
2. **2.2k stars 较新**：相比 Hello-Agents 65k 影响力小
3. **框架太分散**：每框架只学 1 周，深度不及专项
4. **CrewAI 周 Windows bug**：需要手动 Microsoft Build Tools
5. **必须 Cursor**：推荐 IDE 不是所有人都有

### 评分理由：⭐⭐⭐⭐ (4/5)

- 6 周结构 + 横向对比 + Cursor 学习 → 必收录
- 不给 5 星：API 成本 + 框架深度 + 社区规模

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/ed-donner/agents |
| **作者邮箱** | ed@edwarddonner.com |
| **作者 LinkedIn** | @edwarddonner |
| **作者 X/Twitter** | @edwarddonner |
| **中文 README** | https://github.com/ed-donner/agents/blob/main/README_zh.md |

### 关联项目

- [Hello-Agents](../ai-agents/hello-agents.md) — 中文版完整路径
- [GenAI_Agents](../ai-engineering/genai-agents.md) — 横向 Notebook 集合
- [Agents-Course](../ai-engineering/agents-course.md) — HF 官方对应
- [AI-Agents-for-Beginners](../ai-engineering/ai-agents-for-beginners.md) — 微软官方对应
- [DeerFlow](../ai-agents/deer-flow.md) — 真实生产 Agent
