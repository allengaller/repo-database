---
name: datawhalechina/hello-agents
url: https://github.com/datawhalechina/hello-agents
domain: ai-agents
type: course
languages: [Python, Jupyter Notebook, Vue]
stars: 65000
forks: 0
license: No license
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [datawhale, chinese, agent-tutorial, from-scratch, react, plan-and-solve, reflection, agentic-rl, skills, mcp, a2a]
summary: Datawhale 中文社区的《从零开始构建智能体》教程 — 16 章 + 综合案例，覆盖 ReAct/Plan-and-Solve/Reflection 经典范式 + 自研 HelloAgents 框架 + 记忆/RAG/MCP/A2A/Agentic-RL，~65k stars，中文 AI Agent 教程天花板
---

# Hello-Agents · Datawhale 的《从零开始构建智能体》

> 收录日期：2026-08-04
> 仓库：https://github.com/datawhalechina/hello-agents
> 来源：2026-02-26 GitHub Trending 日榜 Top 6（与 deer-flow 同日上榜）

**一句话核心总结**：Hello-Agents 是 Datawhale 社区出品的**中文系统性 Agent 教程** — "百模大战"之后的"Agent 元年"开山之作，从范式原理到自研框架 HelloAgents，从记忆/RAG/协议到 Agentic-RL 训练，从 13 个综合案例到毕业设计，帮你从"LLM 使用者"蜕变为"Agent 系统构建者"。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Hello-Agents（《从零开始构建智能体》） |
| **仓库地址** | https://github.com/datawhalechina/hello-agents |
| **所属组织/作者** | Datawhale 社区（陈思州、孙韬、姜舒凡 项目负责人） |
| **描述** | 《从零开始构建智能体》——从零开始的智能体原理与实践教程 |
| **开源许可** | No license（社区免费使用） |
| **Star 数** | ~65,000（截至 2026-08） |
| **技术类型** | course（教程 + 代码 + 自研框架） |
| **最新版本** | V1.0.2（2026-02） |
| **语言构成** | Python 74.8% + Jupyter Notebook 9.4% + Vue 6.7% + HTML 5.4% |

---

## 二、技术栈 / 架构

### 2.1 五大部分 16 章

```
第一部分  基础 (1-3)        → 智能体定义、发展史、Transformer/主流 LLM
第二部分  构建 (4-7)        → ReAct/Plan-and-Solve/Reflection 范式 + 自研框架
第三部分  高级 (8-12)       → 记忆/RAG/上下文工程/MCP/A2A/ANP/Agentic-RL/评估
第四部分  案例 (13-15)      → 智能旅行助手/DeepResearch/赛博小镇
第五部分  毕业 (16)         → 综合 Agent 应用
```

### 2.2 自研框架 HelloAgents

| 模块 | 内容 |
|------|------|
| **core/** | Agent 基类、HelloAgentsLLM、Message、Config、Exception |
| **agents/** | SimpleAgent、ReActAgent、ReflectionAgent、PlanAndSolveAgent |
| **tools/** | Tool 基类、ToolRegistry、ToolChain、AsyncExecutor、builtin/ |

> **核心哲学**："万物皆为工具" — Memory、RAG、RL、MCP 等都被抽象成 Tool，消除不必要的抽象层。

### 2.3 4 大设计原则

1. **轻量级 + 教学友好**：除 OpenAI SDK 外不引入重型依赖
2. **基于标准 API**：用 OpenAI 兼容协议，迁移成本低
3. **渐进式学习路径**：每章代码可 pip 安装历史版本，按节奏前进
4. **统一"工具"抽象**：消除 Memory/RAG/MCP 的概念割裂

### 2.4 多 LLM 适配

- OpenAI（默认）
- ModelScope / 智谱 AI（国产）
- vLLM / Ollama（本地部署）
- `_auto_detect_provider` 自动识别服务商标识

### 2.5 综合案例

- **第 13 章 智能旅行助手**：MCP + 多智能体协作
- **第 14 章 DeepResearch**：自动化深度研究复现
- **第 15 章 赛博小镇**：Agent × 游戏的社会动态模拟
- **共创项目**：金融（StockInsightAgent）、医疗（HealthRecordAgent）、学术（InnocoreAI）等

---

## 三、核心功能特性

### 3.1 经典范式手把手实现

```python
# 第四章 ReAct 范式
class ReActAgent:
    def run(self, input_text):
        # Thought → Action → Observation 循环
        for step in range(self.max_steps):
            thought, action = self._parse_output(llm.invoke(prompt))
            if action.startswith("Finish"):
                return self._parse_action_input(action)
            observation = tool_registry.execute(tool_name, tool_input)
```

支持 SimpleAgent、ReActAgent、ReflectionAgent、PlanAndSolveAgent、FunctionCallAgent 5 大范式

### 3.2 工具系统

```python
class Tool(ABC):
    def __init__(self, name, description):
        self.name, self.description = name, description
    @abstractmethod
    def run(self, parameters) -> str: ...
    @abstractmethod
    def get_parameters(self) -> List[ToolParameter]: ...

class ToolRegistry:
    def register_tool(self, tool: Tool)      # 对象注册
    def register_function(self, name, desc, func)  # 函数注册
    def to_openai_schema(self) -> dict         # 转 OpenAI function call
```

- 多源搜索（Tavily + SerpAPI）智能降级
- 工具链（ToolChain）支持顺序执行 + 上下文传递
- 异步工具执行（asyncio + ThreadPoolExecutor）

### 3.3 LLM 适配层

```python
class HelloAgentsLLM:
    # 自动识别 provider（OpenAI/ModelScope/智谱/vLLM/Ollama）
    # 自动注入环境变量与 base_url
    # 支持流式 + JSON 模式 + Function Calling
```

### 3.4 高级章节亮点

- **第 8 章 记忆与检索**：短期/长期记忆、RAG、向量数据库
- **第 9 章 上下文工程**：多轮对话情境理解
- **第 10 章 智能体通信协议**：MCP / A2A / ANP
- **第 11 章 Agentic-RL**：SFT → GRPO 的 LLM 训练全流程
- **第 12 章 性能评估**：核心指标、基准测试、评估框架

### 3.5 多模态扩展

社区共创项目 `YYHDBL-HelloCodeAgentCli`：
- 感知记忆模块支持 text/image/audio/video
- SQLite + Qdrant 组合（结构化 + 向量）
- 懒加载编码器（CLIP/CLAP/sentence-transformers）
- "万物皆为工具"设计贯彻

---

## 四、应用场景与已落地案例

### 4.1 求职者 / 学生

- 完整 16 章系统补齐 Agent 原理与实践
- 3 个综合实战项目 + 毕业设计 = 简历亮点
- 配套 PDF 版本（带水印防盗版）

### 4.2 中文 AI 工程师

- **国产模型适配**：阿里百炼、智谱、ModelScope、DeepSeek 全部支持
- **中文文档 + 视频**：降低学习曲线
- **国内网络环境**：避坑 OpenAI 直连问题

### 4.3 团队培训

- 系统性 16 章 + 社区精选可作为企业内部培训材料
- 13+ 共创项目覆盖金融/医疗/学术等垂直场景
- Extra-Chapter 提供更细分的实战案例

### 4.4 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [GenAI_Agents](../ai-engineering/genai-agents.md) | Hello-Agents 是中文版，GenAI_Agents 是英文版（都是教程路线） |
| [DeerFlow](../ai-agents/deer-flow.md) | 字节 SuperAgent harness，Hello-Agents 第 14 章 DeepResearch 类似 |
| [Claude-Mem](../ai-engineering/claude-mem.md) | 持久记忆在 Hello-Agents 第 8 章有更体系化教学 |
| [Pi-Mono](../ai-engineering/pi-mono.md) | Hello-Agents 偏 Python + OpenAI API，Pi-Mono 偏 TypeScript 全栈 |
| [Agents-Course](../ai-engineering/agents-course.md) | HuggingFace 出品的英文版官方课程 |

---

## 五、个人评价

### 优势

1. **中文系统性最强**：16 章 + 综合案例 + 毕业设计 = 完整学习路径
2. **"造轮子"哲学**：手写 ReAct/Plan-and-Solve 后再看 LangChain/LangGraph 会有"原来如此"的感觉
3. **生态完整**：Datawhale 社区维护 + 50+ 贡献者 + 13+ 共创项目
4. **国产友好**：阿里/智谱/DeepSeek 全适配，国内网络无忧
5. **PDF/视频/Notebook 多形式**：满足不同学习偏好
6. **协议前沿**：第 10 章覆盖 MCP/A2A/ANP，工程师的"沟通协议"指南

### 不足

1. **License 缺失**：仓库没声明 license，商业使用有合规风险
2. **代码不一定是 production-ready**：自研框架为教学简化，复杂场景需迁移
3. **覆盖框架相对窄**：主要用 OpenAI 原生 API，LangGraph/AutoGen 实战较少
4. **贡献者依赖**：核心作者陈思州单人维护，迭代速度受限
5. **2026-02 之后更新变慢**：V1.0.2 之后没有明显进展

### 评分理由：⭐⭐⭐⭐ (4/5)

- 中文 Agent 教程天花板 + 16 章完整路径 + 国产模型适配
- 不给 5 星：License 缺失 + 框架深度不如 LangGraph + 更新变慢

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/datawhalechina/hello-agents |
| **在线文档** | https://hello-agents.datawhale.cc |
| **国内镜像** | https://www.datawhale.cn/learn/summary/239 |
| **PDF 下载** | https://github.com/datawhalechina/hello-agents/releases/tag/V1.0.0 |

### 关联项目

- [GenAI_Agents](../ai-engineering/genai-agents.md) — 英文版 GenAI Agents 教程
- [DeerFlow](../ai-agents/deer-flow.md) — 字节 SuperAgent harness
- [Claude-Mem](../ai-engineering/claude-mem.md) — Claude Code 持久记忆
- [Pi-Mono](../ai-engineering/pi-mono.md) — TypeScript AI Agent 全栈
- [Agents-Course](../ai-engineering/agents-course.md) — HF 官方英文课程
