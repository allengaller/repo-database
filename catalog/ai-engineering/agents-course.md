---
name: huggingface/agents-course
url: https://github.com/huggingface/agents-course
domain: ai-engineering
type: course
languages: [MDX, Python]
stars: 22000
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [huggingface, agent-course, smolagents, langgraph, llamaindex, code-agents, certificate, mdx, unit-based]
summary: HuggingFace 官方 AI Agent 课程 — 4 单元 + Bonus，从基础到 smolagents/LangGraph/LlamaIndex 实战，完成 Final Project 拿官方证书，~22k stars，推广 smolagents "Code Agents" 哲学
---

# Agents-Course · HuggingFace 官方 AI Agent 课程

> 收录日期：2026-08-04
> 仓库：https://github.com/huggingface/agents-course
> 来源：HuggingFace 官方发布，2025 上线后持续 GitHub Trending

**一句话核心总结**：Agents-Course 是 HuggingFace 官方出品的**免费 AI Agent 课程** — 4 单元结构化教学（Welcome → Introduction → Frameworks → Use Case → Final Project），强推 smolagents 的"Code Agents"哲学（让 LLM 写 Python 而不是复杂 JSON），完成所有单元 + Final Project 即获 HF 官方证书。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | The Hugging Face Agents Course |
| **仓库地址** | https://github.com/huggingface/agents-course |
| **所属组织/作者** | HuggingFace（Burtenshaw / Thomas / Simonini / Paniego） |
| **描述** | The Hugging Face Agents Course - 从基础到 final assignment + benchmark |
| **开源许可** | MIT |
| **Star 数** | ~22,000（截至 2026-08，从 2.2k 增长 10x+） |
| **技术类型** | course（MDX 教程 + 单元测验） |
| **当前状态** | 4 单元 + 3 Bonus 单元 |

---

## 二、技术栈 / 架构

### 2.1 4 单元结构

| Unit | Topic | 描述 |
|------|-------|------|
| 0 | Welcome to the Course | 介绍、工具、环境 |
| 1 | Introduction to Agents | Agent 定义、LLM、模型族、特殊 token |
| 1 Bonus | Fine-tuning for Function-calling | LLM Function-Calling 微调 |
| 2 | Frameworks for AI Agents | smolagents + LangGraph + LlamaIndex |
| 2.1 | The Smolagents Framework | 核心框架 |
| 2.2 | The LlamaIndex Framework | 数据 Agent |
| 2.3 | The LangGraph Framework | 状态图编排 |
| 2 Bonus | Observability and Evaluation | 追踪 + 评估 |
| 3 | Use Case for Agentic RAG | Agentic RAG 实战 |
| 4 | Final Project | 自动评估 + 排行榜 |
| 3 Bonus | Agents in Games with Pokemon | 玩游戏（宝可梦） |

### 2.2 核心技术栈

- **smolagents**（HF 自家）：Code Agent 哲学，让 LLM 写 Python 解决问题
- **LangGraph**：状态图编排
- **LlamaIndex**：数据 Agent
- **HuggingFace Spaces / Inference API**：免环境运行
- **Pydantic / Transformers** 生态

### 2.3 关键设计：Code Agents

> "与其让模型输出复杂 JSON 去对工具下命令，不如让模型直接写 Python 代码把问题解决。"

优势：
- 更直观、更强大
- 代码量只有其他框架的几分之一
- 调试容易（代码可执行）

### 2.4 Final Project + 排行榜

- 自动化 Agent 评估
- 学生作业公开排名
- 完成获 HF 官方证书

---

## 三、核心功能特性

### 3.1 Unit 0 入门

- 课程目标、工具链、学习路径
- Hugging Face 账号注册、API Key 配置
- 配套 Discord 学习社区

### 3.2 Unit 1 Agent 基础

- Agent vs LLM 区别
- 模型族谱（OpenAI / Anthropic / Google / 开源）
- 特殊 Token / Function Calling 机制
- **Bonus**：用 TRL 微调 LLM 支持 Function Calling

### 3.3 Unit 2 三大框架

#### 3.3.1 smolagents

```python
from smolagents import CodeAgent, HfApiModel

agent = CodeAgent(tools=[], model=HfApiModel())
result = agent.run("Calculate the 5th Fibonacci number")
```

- Code Agent：让 LLM 写 Python 代码
- Tool Calling Agent：传统 JSON 调用
- 极轻量级（代码量是 LangChain 的几分之一）

#### 3.3.2 LangGraph

```python
from langgraph.graph import StateGraph
workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", tool_node)
workflow.add_conditional_edges("agent", should_continue)
```

- 状态机 + 可中断 + 可恢复
- 适合生产级复杂工作流

#### 3.3.3 LlamaIndex

- 数据 Agent：RAG + Workflow
- LlamaIndex Workflows：事件驱动 Agent
- 企业文档场景首选

### 3.4 Unit 3 Agentic RAG

- 普通 RAG：问什么查什么
- **Agentic RAG**：Agent 自主决定检索、选择数据源、迭代查询
- 多框架实现：smolagents / LangGraph / LlamaIndex

### 3.5 Unit 4 Final Project

- 选定一个真实任务（如 GAIA benchmark）
- 实现 Agent
- 提交自动化测试 + 排行榜评分
- 通过获 HF 官方证书

### 3.6 Bonus

- **Observability**：trace + 评估
- **Pokemon Agent**：玩游戏（融合 LLM + 视觉 + 决策）
- **Fine-tuning**：TRL 框架微调支持 Function Calling

### 3.7 翻译与社区

- 已支持 50+ 语言（包括中文）
- Discord 活跃学习社区
- 持续更新

---

## 四、应用场景与已落地案例

### 4.1 个人学习者

- 0 基础 → 拿 HF 证书的全路径
- Hugging Face Spaces 免环境运行
- 4 单元 + Bonus 完整覆盖

### 4.2 工程师

- 横向对比 smolagents / LangGraph / LlamaIndex
- 学习 Code Agent 新范式
- Final Project 公开排行榜 = 简历亮点

### 4.3 团队培训

- 官方课程可作为内部培训材料
- 50+ 语言版本适配国际化
- 持续更新

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [Hello-Agents](../ai-agents/hello-agents.md) | 中文版对应教程，Datawhale 出品 |
| [GenAI_Agents](../ai-engineering/genai-agents.md) | 英文教程横向最广，52 个 Notebook |
| [AI-Agents-for-Beginners](../ai-engineering/ai-agents-for-beginners.md) | 微软官方对应课程 |
| [Smolagents (本仓库) ] | HF 自家，Code Agent 哲学源头 |
| [Pi-Mono](../ai-engineering/pi-mono.md) | 同样支持 20+ LLM 统一接口 |

---

## 五、个人评价

### 优势

1. **官方出品 + 完整证书**：HuggingFace 背书，完课发证，简历加分
2. **结构化最强**：4 单元 + Bonus 明确目标 + 测验 + Final Project
3. **零环境成本**：HF Spaces 直接运行，免去本地配置痛苦
4. **推广 smolagents 的"Code Agents"哲学**：让 LLM 写 Python 而非复杂 JSON，更直观
5. **三框架横向覆盖**：smolagents + LangGraph + LlamaIndex 对比实战
6. **50+ 语言翻译**：包括中文版（https://hf.co/learn/agents-course）

### 不足

1. **HF 自家生态偏重**：smolagents 是 HF 自家，与 LangChain/AutoGen 生态割裂
2. **Final Project 评估标准固定**：创造性受限
3. **API 依赖**：默认 HuggingFace Inference API，国内访问有限
4. **更新频次**：相比社区教程，官方课程迭代较慢
5. **深度有限**：每个框架只学 1 个单元，深度不及专项课程

### 评分理由：⭐⭐⭐⭐ (4/5)

- 官方背书 + 证书 + 结构化 + Code Agent 哲学 → 必收录
- 不给 5 星：HF 生态偏重 + 国内访问受限 + 深度有限

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/huggingface/agents-course |
| **在线课程** | https://hf.co/learn/agents-course |
| **中文版** | https://hf.co/learn/agents-course/translations/zh-CN |
| **Final Project** | https://huggingface.co/spaces/agents-course/leaderboard |

### 关联项目

- [Hello-Agents](../ai-agents/hello-agents.md) — 中文版对应
- [GenAI_Agents](../ai-engineering/genai-agents.md) — 横向最广英文教程
- [AI-Agents-for-Beginners](../ai-engineering/ai-agents-for-beginners.md) — 微软对应课程
- [Pi-Mono](../ai-engineering/pi-mono.md) — 同样多 LLM 统一接口
- [smolagents (HF 官方) ] — Code Agent 哲学源头
