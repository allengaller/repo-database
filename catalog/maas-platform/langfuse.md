---
name: langfuse/langfuse
url: https://github.com/langfuse/langfuse
domain: maas-platform
type: application
languages: [TypeScript]
stars: 33496
forks: 3613
license: NOASSERTION
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [llmops, observability, tracing, prompt-management, evaluation]
summary: 开源 LLM 工程平台，把 trace 追踪、Prompt 版本管理、评估与成本核算收在一处
---

# Langfuse · 开源 LLMOps 可观测平台

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Langfuse |
| **仓库地址** | https://github.com/langfuse/langfuse |
| **所属组织/作者** | Langfuse（YC 孵化，开源核心 + 商业云） |
| **描述** | 开源 LLM 工程平台，把 trace 追踪、Prompt 版本管理、评估与成本核算收在一处 |
| **开源许可** | NOASSERTION（核心 MIT，`ee/` 企业目录为商业许可，自建前需确认边界） |
| **Star 数** | 33,496（截至 2026-08） |
| **Fork 数** | 3,613 |
| **技术类型** | application |

## 二、技术栈分析

- TypeScript / Next.js 全栈应用，PostgreSQL 存元数据，ClickHouse 存 trace 明细，Redis 做队列，S3 兼容存储放大对象
- 埋点 SDK 覆盖 Python / JS，且**原生 OpenTelemetry 兼容**，可与既有可观测体系合流
- 集成面广：LiteLLM、LangChain、LlamaIndex、OpenAI SDK、Dify 等均有官方或社区适配
- 数据模型分层：Trace → Observation（span / generation / event）→ Score，评估结果与 trace 直接挂钩
- 支持 Docker Compose 与 Helm 自建，也可用官方云

## 三、核心功能特性

1. **全链路 trace**：Agent 的多步调用、工具调用、检索过程逐层展开，是排查"为什么模型这样答"的主要手段
2. **Prompt 管理**：Prompt 带版本、标签与灰度，SDK 侧运行时拉取，实现提示词与代码解耦发布
3. **评估体系**：人工标注 + LLM-as-a-judge + 自定义 score，可对线上流量抽样打分
4. **数据集与回归**：把线上 bad case 收成 dataset，改动前后跑对比实验
5. **成本与延迟看板**：按模型/用户/租户维度出 token 与费用报表，MaaS 计量的现成前端

## 四、应用场景说明

- MaaS 平台的可观测层：网关（[litellm.md](litellm.md) / [higress.md](higress.md)）上报 trace，Langfuse 做统一分析
- Agent 类系统的调试主战场：多步推理链路可视化，比读日志的效率高一个量级
- 语料工程闭环：线上真实对话 → 标注/打分 → 数据集 → 微调或提示词优化，Langfuse 承担收集与标注环节
- 与 [deepeval.md](deepeval.md) 分工：DeepEval 做 CI 内的离线评测，Langfuse 做线上追踪与人工标注

## 五、个人评价

### 优势

1. 三件事（trace、prompt、eval）在一个平台闭环，避免自研工具链拼凑
2. OpenTelemetry 原生兼容，与 [../fullstack-arch/opentelemetry-collector.md](../fullstack-arch/opentelemetry-collector.md) 体系不冲突
3. 自建路径完整，数据不出内网，适合有合规要求的企业环境

### 不足

1. 许可为 NOASSERTION：SSO、RBAC 等企业能力在 `ee/` 下受商业条款约束
2. 自建依赖组件多（PG + ClickHouse + Redis + S3），运维成本不容忽视
3. 高吞吐场景需要认真做采样与保留策略，否则 ClickHouse 存储增长很快

### 评分理由

5 星：LLMOps 可观测方向的头部开源方案，是模型服务从"能跑"走向"可运营"的关键一环（⭐33.5k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/langfuse/langfuse |
| **官方文档** | https://langfuse.com/docs |
| **自建部署指南** | https://langfuse.com/self-hosting |

### 关联项目

- [litellm.md](litellm.md)
- [deepeval.md](deepeval.md)
- [../fullstack-arch/opentelemetry-collector.md](../fullstack-arch/opentelemetry-collector.md)
