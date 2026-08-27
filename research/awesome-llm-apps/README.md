# 专题：Awesome-LLM-Apps 深度调研

> 调研日期：2026-08-26 · 仓库档案见 [../../catalog/ai-agents/awesome-llm-apps.md](../../catalog/ai-agents/awesome-llm-apps.md)

对 [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) 的单仓库专题调研。该仓库是当前 GitHub 上规模最大的可运行 LLM 应用模板库（134.5k stars，截至 2026-08），从「LLM 应用」演进到「AI Agent」再到「Agent Skills」，是观察 2024-2026 应用层范式迁移的最佳样本。

## 文档结构

| 文档 | 内容 |
|------|------|
| [01-repo-analysis.md](01-repo-analysis.md) | 仓库概览：实时数据、增长轨迹、工程组织方式、技术栈特征 |
| [02-category-inventory.md](02-category-inventory.md) | 10 大分类全盘点（约 115 个应用）与各类代表应用 |
| [03-practical-perspective.md](03-practical-perspective.md) | 应用视角：与 SRE/工单智能体、语料工程、MaaS 的结合点 + 学习路径 |

## 核心结论（TL;DR）

1. **不是清单，是可运行代码库**：每个应用独立目录，含 `requirements.txt` + README，克隆即可跑，与一般 awesome-list 有本质区别。
2. **框架中立是最大卖点**：样本横跨 OpenAI Agents SDK、LangChain/LangGraph、Google ADK、PydanticAI、Gemini、本地 DeepSeek/Qwen/Llama，不锁定任何生态。
3. **分类演进映射行业节奏**：2024 RAG Apps → 2025 AI Agents → 2026 Agent Skills / Generative UI / Always-on Agents，仓库描述与目录结构的每次变化都是一次行业风向记录。
4. **对智能体建设者价值最高的三个目录**：`advanced_ai_agents/single_agent_apps`（生产形态单 agent）、`rag_tutorials`（24 种 RAG 架构对照）、`agent_skills`（技能封装范式）。
