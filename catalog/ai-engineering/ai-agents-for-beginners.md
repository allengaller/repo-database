---
name: microsoft/ai-agents-for-beginners
url: https://github.com/microsoft/ai-agents-for-beginners
domain: ai-engineering
type: course
languages: [Python, Jupyter Notebook]
stars: 58000
forks: 20000
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [microsoft, beginner-course, 10-lessons, semantic-kernel, autogen, mcp, a2a, multi-agent, azure, 50-languages]
summary: 微软官方 AI Agent 初学者课程 — 10 节循序渐进，覆盖 Agent 基础/工具使用/Agentic RAG/多 Agent 协作/MCP/A2A 协议，~58k stars，配套视频 + 50 种语言翻译 + Azure 集成
---

# AI-Agents-for-Beginners · 微软官方 AI Agent 入门课

> 收录日期：2026-08-04
> 仓库：https://github.com/microsoft/ai-agents-for-beginners
> 来源：2026-04 多次 GitHub Trending 上榜（5w+ stars → 5.8w+）

**一句话核心总结**：AI-Agents-for-Beginners 是微软开源的**企业级 AI Agent 入门课程** — 10 节循序渐进（基础 → 设计模式 → 工具 → RAG → 协作 → 协议 → 生产），以"设计模式"为主线而非"框架 API"，覆盖 Semantic Kernel + AutoGen + MCP + A2A 等企业级技术栈，**为中国开发者提供完整中文翻译**。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | AI Agents for Beginners |
| **仓库地址** | https://github.com/microsoft/ai-agents-for-beginners |
| **所属组织/作者** | Microsoft Cloud Advocates |
| **描述** | 10 Lessons to Get Started Building AI Agents |
| **开源许可** | MIT |
| **Star 数** | ~58,000（截至 2026-04 官方数据 58,303，8 月持续增长） |
| **Fork 数** | ~19,946 |
| **技术类型** | course（教程 + 代码 + 视频） |
| **语言支持** | 50+ 种翻译（含中文） |

---

## 二、技术栈 / 架构

### 2.1 10 节内容

```
01-intro-to-ai-agents          → Agent 基础概念 + 应用场景
02-explore-agentic-frameworks  → 主流 Agentic 框架对比
03-agentic-design-patterns     → Agentic 设计模式（核心）
04-tool-use                    → 工具调用设计模式
05-agentic-rag                 → Agentic RAG
06-building-trustworthy-agents → 可信 Agent 构建
07-planning-design             → 规划设计模式
08-multi-agent                 → 多 Agent 协作
09-metacognition               → 元认知设计模式
10-ai-agents-production        → 生产环境 Agent
11-agentic-protocols           → MCP / A2A / NLWeb 协议
12-context-engineering         → 上下文工程
13-agent-memory                → Agent 记忆管理
14-microsoft-agent-framework   → 微软 Agent Framework
15-browser-use                 → 浏览器操控 Agent
18-securing-ai-agents          → Agent 安全（Coming Soon）
```

### 2.2 核心技术栈

- **Semantic Kernel**（微软主推 SDK）：把 LLM 集成到现有代码
- **AutoGen**（微软多 Agent 框架）：协作式对话
- **Azure AI Foundry Agent Service V2**：企业级云服务
- **Azure AI Agent Service**：托管 Agent 云服务
- **MCP / A2A / NLWeb**：最新协议
- **Python + .NET (C#) 双语示例**

### 2.3 关键创新：以设计模式为主线

> **"讲可迁移的思维框架，不是某个框架的操作手册"**

6 大核心设计模式：
1. 工具调用模式（Tool Use）
2. Agentic RAG（Agent 自主检索）
3. 规划模式（Planning）
4. 多 Agent 模式（Multi-Agent）
5. 元认知模式（Metacognition）
6. 可信 Agent 模式（Trustworthy）

### 2.4 配套资源结构

- 书面 README（每节）
- YouTube 视频讲解（每节）
- 可运行的 Jupyter Notebook（每节）
- 50+ 语言翻译

---

## 三、核心功能特性

### 3.1 设计模式深度（核心价值）

#### Lesson 04 工具调用

- LLM 函数 Schema 怎么写才稳定？
- 错误信息如何结构化回传？
- 重试逻辑放哪一层？
- "Demo 能跑" → "生产可用" 的真正距离

#### Lesson 05 Agentic RAG

- 普通 RAG：固定管道
- **Agentic RAG**：Agent 自主决定检索、换源、迭代
- RAG 和 Agent 如何真正融合

#### Lesson 07 规划模式

- ReAct 循环 vs 规划模型 + 执行模型
- 何时切换架构的判断框架

#### Lesson 08 多 Agent 协作

- 谁做 Orchestrator？
- 任务如何分配 + 状态同步？
- 上下文传递的信息损失如何防止？
- 多种可参考架构模式

#### Lesson 09 元认知（同类教程稀缺）

- Agent 对自身推理的评估能力
- 识别猜测 vs 推理
- 置信度低时主动澄清
- 减少商业落地幻觉危害的关键机制

#### Lesson 06 可信 Agent

- 拥有外部 API 权限时的安全边界
- 责任追踪 + 行为可审计性
- 日志追溯

### 3.2 协议层（Lesson 11）

三个协议放在同一框架下讲：
- **MCP**（Anthropic）：Agent 访问外部工具/数据源
- **A2A**（Google）：Agent 之间互相发现 + 调用
- **NLWeb**（微软）：网站自然语言接口

> "理解三者的差异比熟练使用其中一个框架都更有价值"

### 3.3 .NET + Python 双语

- 微软 Azure 生态友好
- 企业开发者可选择 .NET 路径
- 学术/创业开发者可选 Python 路径

### 3.4 50+ 语言翻译

包括：中文（zh-CN）、英文、西班牙语、葡萄牙语、日语、韩语、阿拉伯语、印地语等

---

## 四、应用场景与已落地案例

### 4.1 .NET 开发者

- Semantic Kernel 主推 + Azure AI Foundry
- 企业级 C# 项目无缝集成
- 10 节课程 → 企业 AI Agent 工程师

### 4.2 Python 开发者

- AutoGen 多 Agent 协作
- MCP/A2A 协议实战
- 配套 Microsoft Foundry Discord 社区

### 4.3 中文开发者

- 完整中文翻译（zh-CN）
- 中文视频（中文字幕）
- Microsoft Foundry 中文 Discord 频道

### 4.4 企业培训

- 微软生态集成（Azure OpenAI / Foundry）
- 设计模式可迁移到任何技术栈
- 10 节系统化路径

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [Hello-Agents](../ai-agents/hello-agents.md) | 中文教程对应，Datawhale 出品 |
| [GenAI_Agents](../ai-engineering/genai-agents.md) | 英文教程横向最广 |
| [Agents-Course](../ai-engineering/agents-course.md) | HF 官方对应课程 |
| [DeerFlow](../ai-agents/deer-flow.md) | 字节 SuperAgent 生产实践 |
| [Semantic Kernel / AutoGen] | 本课重点技术栈 |

---

## 五、个人评价

### 优势

1. **微软官方背书**：课程质量、企业级视角、Azure 集成都是真功夫
2. **"设计模式"主线独特**：不是"调 API 教程"，是"思维框架"
3. **配套资源丰富**：书面 + 视频 + Notebook + 50 语言翻译
4. **覆盖前沿**：MCP/A2A/NLWeb 三大协议在 Lesson 11 同台对比
5. **元认知 + 可信 Agent**：同类教程稀缺的"商业落地"内容
6. **.NET + Python 双语**：企业级开发者友好
7. **持续更新**：3 节 Coming Soon，2026 仍在迭代

### 不足

1. **代码偏 Azure**：全部基于 Azure AI Foundry，本地跑需替换
2. **2 节尚未上线**：Lesson 16/17 Coming Soon
3. **没有 Evaluation 章节**：评估测试需自学 LangSmith/RAGAS 等
4. **设计模式偏抽象**：对只想"调个 API 跑通"的新手不友好
5. **CSPM 学习曲线**：Azure 配置对个人开发者门槛

### 评分理由：⭐⭐⭐⭐ (4/5)

- 微软背书 + 设计模式主线 + 50 语言 → 必收录
- 不给 5 星：Azure 绑定 + 2 节未完成 + Evaluation 缺失

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/microsoft/ai-agents-for-beginners |
| **课程主页** | https://microsoft.github.io/ai-agents-for-beginners/ |
| **中文版** | https://microsoft.github.io/ai-agents-for-beginners/translations/zh/ |
| **配套视频** | https://learn.microsoft.com/en-us/shows/ai-agents-for-beginners/ |
| **Microsoft Foundry** | https://discord.gg/DocumentDB |

### 关联项目

- [Hello-Agents](../ai-agents/hello-agents.md) — 中文版对应
- [GenAI_Agents](../ai-engineering/genai-agents.md) — 横向最广英文教程
- [Agents-Course](../ai-engineering/agents-course.md) — HF 官方课程
- [DeerFlow](../ai-agents/deer-flow.md) — 字节 SuperAgent 生产实践
- [Pi-Mono](../ai-engineering/pi-mono.md) — TypeScript 跨语言版
