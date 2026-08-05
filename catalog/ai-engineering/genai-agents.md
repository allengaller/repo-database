---
name: NirDiamant/GenAI_Agents
url: https://github.com/NirDiamant/GenAI_Agents
domain: ai-engineering
type: course
languages: [Python, Jupyter Notebook]
stars: 13000
forks: 1500
license: Other
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [tutorial, jupyter-notebook, langchain, langgraph, autogen, mcp, beginner-to-advanced, all-agents-tutorials, agent-architectures]
summary: Nir Diamant 出品的 GenAI Agents 综合教程库 — 50+ 可直接运行的 Jupyter Notebook，覆盖 Beginner→Advanced 12 类场景，~13k stars，"最丰富的 GenAI Agent 实现合集"
---

# GenAI_Agents · Nir Diamant 的 GenAI Agent 教程大全

> 收录日期：2026-08-04
> 仓库：https://github.com/NirDiamant/GenAI_Agents
> 来源：2026 多次 GitHub Trending 上榜（与 awesome-llm-apps 同期）

**一句话核心总结**：GenAI_Agents 是 Nir Diamant 主理的**英文 GenAI Agent 教程大全** — 50+ 个可直接运行的 Jupyter Notebook，从 Simple Conversational Agent 到 Multi-Agent 协作，从 LangChain/LangGraph/AutoGen 到 MCP，覆盖 12 大场景类别，**"实战为王"** 的代名词。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | GenAI_Agents |
| **仓库地址** | https://github.com/NirDiamant/GenAI_Agents |
| **所属组织/作者** | Nir Diamant（DiamantAI 系列） |
| **描述** | 50 tutorials and implementations for Generative AI Agent techniques |
| **开源许可** | Other（自定义非商业 license） |
| **Star 数** | ~13,000（截至 2026-08） |
| **Fork 数** | ~1,500 |
| **技术类型** | course（教程集合） |
| **教程数** | 52 个 + 持续增长 |

---

## 二、技术栈 / 架构

### 2.1 12 大场景分类

| 类别 | 示例 |
|------|------|
| 🌱 **Beginner** | Simple Conversational / QA / Data Analysis Agent |
| 🔧 **Framework** | LangGraph / MCP / LlamaIndex 教程 |
| 🎓 **Educational** | ATLAS / Scientific Paper / Feynman Learning |
| 💼 **Business** | Customer Support / Essay Grading / Travel / Career / Project Manager / Contract Analysis / E2E Testing |
| 🎨 **Creative** | GIF Animation / TTS Poem / Music Compositor / Content Intelligence / Meme / Murder Mystery |
| 📊 **Analysis** | Memory-Enhanced / Multi-Agent Collab / Self-Improving / Task-Oriented / Internet Search / Autogen Research / Sales Call Analyzer / Weather Emergency / Self-Healing / DataScribe / Memory Email |
| 📰 **News** | News TL;DR / AInsight / Journalism Assistant / Blog Writer / Podcast Generator |
| 🛍️ **Shopping** | ShopGenie / Car Buyer Agent |
| 🎯 **Task** | Taskifier / Grocery Management (CrewAI) |
| 🔍 **QA** | LangGraph Inspector / EU Green Deal Bot / Systematic Review |
| 🌟 **Advanced** | Controllable RAG Agent (custom) |
| 🎬 **Multi-modal** | TTS / Music / Image generation |

### 2.2 框架覆盖

| 框架 | 出现频次 |
|------|---------|
| **LangGraph** | 高（Production-Ready 应用层） |
| **LangChain** | 中（基础 + 中级） |
| **AutoGen** | 中（多 Agent 协作） |
| **CrewAI** | 中（Grocery Management） |
| **LlamaIndex** | 低 |
| **OpenAI Swarm** | 中（Blog Writer） |
| **PydanticAI** | 低（Beginner 类别） |
| **MCP** | 中（独立教程 + 集成） |

### 2.3 核心 Notebook 结构

```
all_agents_tutorials/
├── simple_conversational_agent.ipynb
├── memory_enhanced_conversational_agent.ipynb
├── multi_agent_collaboration_system.ipynb
├── self_improving_agent.ipynb
├── task_oriented_agent.ipynb
├── search_the_internet_and_summarize.ipynb
├── LangGraph 系列 (10+ Notebooks)
├── AutoGen 系列 (3+ Notebooks)
└── Controllable RAG Agent (Advanced)
```

每个 Notebook 固定结构：
- Title + Overview
- Motivation + Key Components
- Architecture Diagram（Mermaid）
- `!pip install` 依赖
- Step-by-step 实现
- Usage Example
- Comparison + Limitations
- References

---

## 三、核心功能特性

### 3.1 Beginner 友好（5 个）

- **Simple Conversational**：history manager + LLM
- **Simple QA**：LLMChain + prompt template
- **Simple Data Analysis**：LLM + Pandas + 自然语言查询
- **LangGraph 入门**：StateGraph 教程
- **MCP 入门**：server/client 实战

### 3.2 多 Agent 协作（4 大经典模式）

- **ATLAS (Academic Task)**：4 Agent 协作（Coordinator/Planner/Notewriter/Advisor）
- **Multi-Agent Collab (History)**：5 步历史 + 数据分析协作
- **Autogen Research Team**：admin/developer/planner/executor/QA 角色
- **OpenAI Swarm (Blog)**：topic→outline→research→draft→edit

### 3.3 记忆 / RAG 进阶

- **Memory-Enhanced Conversational**：短期 + 长期记忆
- **Memory-Enhanced Email (LangMem)**：semantic + episodic + procedural
- **Self-Improving Agent**：reflection 机制
- **Controllable RAG (Advanced)**：question anonymization → planning → adaptive retrieval → verification

### 3.4 创意 / 内容生成（6 个）

- **GIF Animation Generator**：GPT-4 + DALL-E 3 + PIL
- **TTS Poem Generator**：文本分类 + OpenAI TTS
- **AI Music Compositor**：GPT-4 + music21 + pygame（输出 MIDI）
- **Content Intelligence**：多平台内容适配（Tavily + GPT-4）
- **Business Meme Generator**：Groq + Memegen.link
- **Murder Mystery Game**：UNBOUNDED 论文复现，文字侦探游戏

### 3.5 生产级应用

- **E2E Testing Agent**：自然语言 → Playwright 脚本
- **Contract Analysis Assistant**：LangGraph + Pinecone 多 Agent
- **DataScribe**：database 自然语言查询（vector graph + supervisor）
- **Systematic Review**：自动化学术综述生成

### 3.6 配套生态

- **Agents Towards Production**（姊妹项目）：生产级 Agent 教程
- **Agent Memory Techniques**：30 个记忆机制 notebook
- **Prompt Engineering Techniques**：22 个提示技术
- **RAG Made Simple**（作者出版书籍）：22 RAG 技术详解
- **Prompt Engineering**（作者出版书籍）：22 提示技术

---

## 四、应用场景与已落地案例

### 4.1 个人学习者

- 从零起步跑通第一个 Agent
- 横向对比 LangGraph vs AutoGen vs CrewAI
- 学习 Memory / RAG / Tool Use 完整设计模式

### 4.2 工程师

- 找具体业务场景参考（客服、合同、HR、新闻摘要）
- 学习 Production-Ready 多 Agent 协作模式
- 复制 Notebook 改造为自己的产品

### 4.3 研究者

- 50+ Notebooks = 大量 Agent 模式实验
- 包含 UNBOUNDED 等学术论文复现
- 涵盖 Memory / RAG / Self-Improving 前沿主题

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [Hello-Agents](../ai-agents/hello-agents.md) | 中文对应，Datawhale 出品 |
| [Awesome-LLM-Apps](../ai-agents/awesome-llm-apps.md) | 同样大量 LLM 应用集合（Shubhamsaboo 出品） |
| [Agents-Course](../ai-engineering/agents-course.md) | HuggingFace 官方课程，路线更结构化 |
| [DeerFlow](../ai-agents/deer-flow.md) | 字节 SuperAgent 真实生产 |
| [OpenClaw](../ai-agents/openclaw.md) | 本地个人 Agent 真实生产 |

---

## 五、个人评价

### 优势

1. **数量 + 广度无敌**：52 个 Notebook 覆盖 12 类场景，横向最广
2. **"实战为王"**：每个 Notebook 可直接运行，复制 → 改造 → 上线
3. **难度分级清晰**：Beginner → Advanced 自然过渡
4. **配套生态强**：4 个姊妹项目（记忆、提示、RAG、Production）+ 2 本书
5. **学术 + 工程结合**：UNBOUNDED 论文复现 + Customer Support 实战
6. **Discord 社区活跃**：贡献者生态健康

### 不足

1. **License 限制**：自定义非商业 license，企业商用需联系作者
2. **深度不均**：部分 Notebook 偏简略（仅演示），部分又过于复杂
3. **更新快但跟进难**：作者高产，新技术层出不穷，老 Notebook 可能过时
4. **依赖外部 API**：默认 OpenAI，自托管模型需改造
5. **缺少系统化课程结构**：更像 Notebooks 集合，缺少 Hello-Agents 那种章节化路径

### 评分理由：⭐⭐⭐⭐ (4/5)

- 数量 + 实战度 + 生态丰富度 → 必收录
- 不给 5 星：License 限制商用 + 缺乏系统化结构 + 深度不均

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/NirDiamant/GenAI_Agents |
| **作者主页** | https://www.diamantai.com/ |
| **姊妹项目** | https://github.com/NirDiamant/agents-towards-production |
| **记忆教程** | https://github.com/NirDiamant/Agent-Memory-Techniques |
| **RAG 书籍** | https://www.amazon.com/dp/B0D7V5ZH66 |
| **提示工程书** | https://www.amazon.com/dp/B0D7V5ZH66 |

### 关联项目

- [Hello-Agents](../ai-agents/hello-agents.md) — 中文版对应
- [Awesome-LLM-Apps](../ai-agents/awesome-llm-apps.md) — 类似定位英文项目
- [Agents-Course](../ai-engineering/agents-course.md) — HF 官方英文课程
- [DeerFlow](../ai-agents/deer-flow.md) — 字节 SuperAgent 生产实践
- [OpenClaw](../ai-agents/openclaw.md) — 本地个人 Agent
