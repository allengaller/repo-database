---
name: AI4Finance-Foundation/FinRobot
url: https://github.com/AI4Finance-Foundation/FinRobot
domain: ai-agents
type: framework
languages: [Python]
stars: 3300
forks: 800
license: Apache-2.0
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [finance, multi-agent, autogen, financial-analysis, rag, chain-of-thought, market-forecasting]
summary: 面向金融垂直领域的多 Agent LLM 平台，用金融 CoT 思维链 + 智能调度做市场预测、研报生成、交易策略。
---

# FinRobot

## 1. 项目基本信息

| 字段 | 值 |
|------|----|
| 仓库 | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) |
| 论文 | arXiv:2405.14767 / ICAIF 2024 Workshop |
| 维护方 | AI4Finance Foundation（开源金融 AI 联盟） |
| 主语言 | Python 3.10 |
| License | Apache-2.0 |
| 当前 Stars | ~3.3k（2026-08） |
| Commits | 274+ |
| 最近发布 | 持续小版本迭代（pip `finrobot`） |

## 2. 技术栈 / 核心机制分析

**四层架构：**

```
┌─────────────────────────────────────┐
│  Financial AI Agents Layer         │  ← 业务侧（市场预测/研报/交易）
├─────────────────────────────────────┤
│  Financial LLMs Algorithms Layer   │  ← 模型侧（FinGPT + 多源 LLM）
├─────────────────────────────────────┤
│  LLMOps + DataOps Layers           │  ← 中台（智能调度 + RAG + 数据管道）
├─────────────────────────────────────┤
│  Multi-source LLM Foundation       │  ← 基础（Llama / ChatGLM / OpenAI）
└─────────────────────────────────────┘
```

**两大核心机制：**

1. **金融 CoT（Chain-of-Thought）提示** — 把"分析公司"这类复杂任务拆成"业务概述 → 行业对比 → 财务比率 → 风险评估 → 估值"五步链式推理，每步有据可查、可回溯。
2. **Smart Scheduler** — 由 Director Agent / Agent Registration / Agent Adaptor / Task Manager 组成，按任务评分动态挑选最合适的 LLM 组合，避免单模型偏见。

**依赖栈：** `pyautogen`（多 Agent 框架）、`yfinance` / `finnhub-python` / `sec-api` / `fmp-api`（数据源）、`reportlab`（PDF 研报生成）、`matplotlib` + `mplfinance`（图表）、`huggingface_hub`（模型加载）。

## 3. 核心功能特性

| 代理类型 | 输入 | 输出 | 关键技术 |
|---------|------|------|---------|
| Market Forecaster | ticker + 财务 + 新闻 | 短期走势预测 + 因素分析 | 微调 FinGPT-Forecaster（Llama-2-7B + LoRA） |
| Document Analysis Agent | 10-K / SEC / 财报 | 结构化提取 + 摘要 | 9 个子 Agent 协同 + RAG |
| Equity Research Report | 10-K + 财务 + 市场 | PDF 研报 | SingleAssistantShadow 多步规划 + ReportLab 排版 |
| Trade Strategist | 行情 + 规则 | 交易信号 + 风险评估 | 多模态 LMM Agent（mplfinance） |
| Financial Charting | 财务数据 | 可解释图表 | mplfinance + LLM 解读 |
| Optimization Trading | 历史数据 | 优化策略 | 机器学习回测 |

**可插拔设计：** 配置文件 `OAI_CONFIG_LIST` 切模型（GPT-4 / DeepSeek / 本地 Llama），`config_api_keys` 切数据源；同一套代码既能跑云端 GPT-4，也能跑本地开源模型。

## 4. 应用场景与已落地案例

- **个人投资者：** 输入 NVDA → 得到周度走势预测 + 2-4 个关键因素 + 投资建议（demo 案例：NVIDIA、贵州茅台）
- **卖方研究：** 输入 Microsoft FY2023 10-K → 自动生成 400-450 词研报 + PDF 输出
- **量化研究：** Trade Strategist 生成多模态交易信号，结合 mplfinance 可视化
- **学术研究：** ICAIF 2024 论文配套，复现金融 CoT 实验

**生态位：** 与 virattt/ai-hedge-fund（对冲基金 Agent 团队）形成互补——FinRobot 偏"分析师视角"，ai-hedge-fund 偏"基金经理视角"。

## 5. 个人评价

**优势：**
- 论文配套（arXiv + ICAIF 双发表），学术可引用
- 金融 CoT 思路清晰，把"分析师思考过程"显式建模，可解释性优于纯黑盒 LLM
- 数据源覆盖完整（美股 Finnhub + A 股 EastMoney + 美 SEC + FMP）
- Apache-2.0，可商用

**不足：**
- 主框架仍依赖 `pyautogen`（Microsoft 项目），autogen 0.2 → 0.4 重构期间 API 不稳
- 核心仍是 GPT-4 调优效果最好，本地模型对金融术语理解有限
- 单 repo 单 demo 风格，缺少完整 backtest 框架（对比 FinRL 偏弱）
- 274 commits + ~3.3k stars，增长曲线相对平缓，2024-2026 热度被 shiyu-coder/Kronos（金融 LLM 基础模型）盖过

**评分理由：** 4 星。垂直领域完整度（论文 + 框架 + 数据 + 应用）达 9 成，生态建设略逊于综合 Agent 平台（LangChain / AutoGen），但在"金融 AI Agent"这个细分赛道稳坐前 2。

## 6. 相关资源

| 类型 | 链接 |
|------|------|
| 论文 | https://arxiv.org/abs/2405.14767 |
| ICAIF 2024 | The 1st Workshop on LLMs and Generative AI for Finance |
| 配套模型 | FinGPT（[AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)） |
| 同类竞品 | [virattt/ai-hedge-fund](../ai-engineering/..)（对冲基金 Agent） |
| 同类竞品 | [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)（金融 LLM 基础模型） |
| 综合 Agent 框架参考 | [pydantic-ai.md](pydantic-ai.md) / [swarm.md](swarm.md) |
| 多 Agent 综述 | [awesome-llm-apps.md](awesome-llm-apps.md) |
