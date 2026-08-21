---
name: BerriAI/litellm
url: https://github.com/BerriAI/litellm
domain: maas-platform
type: library
languages: [Python]
stars: 56885
forks: 10770
license: NOASSERTION
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [llm-gateway, multi-provider, proxy, cost-tracking]
summary: 用 OpenAI 格式统一 100+ 模型供应商的 SDK 与代理网关，MaaS 平台多模型接入的通用适配层
---

# LiteLLM · 100+ 模型供应商的统一网关

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | LiteLLM |
| **仓库地址** | https://github.com/BerriAI/litellm |
| **所属组织/作者** | BerriAI |
| **描述** | 用 OpenAI 格式统一 100+ 模型供应商的 SDK 与代理网关，MaaS 平台多模型接入的通用适配层 |
| **开源许可** | NOASSERTION（MIT 基础上附加企业版条款，商用前需确认 enterprise 目录的许可边界） |
| **Star 数** | 56,885（截至 2026-08） |
| **Fork 数** | 10,770 |
| **技术类型** | library |

## 二、技术栈分析

- Python SDK（`litellm.completion`）+ 独立部署的 Proxy Server（FastAPI），两种形态共享同一套 provider 适配层
- Provider 适配以「请求/响应转换器」组织，新增供应商只需实现 transform 逻辑
- Proxy 侧依赖 PostgreSQL 存 key/预算/审计，Redis 做路由缓存与限流计数
- 路由器内置多种策略：least-busy、latency-based、usage-based、加权随机，并带熔断与自动重试
- 可观测集成：Langfuse、OpenTelemetry、Prometheus 等 callback 开箱可用

## 三、核心功能特性

1. **统一入参出参**：业务代码只写 OpenAI 格式，切换模型只改 `model` 字符串
2. **虚拟 Key 与预算治理**：按团队/用户发 key，设置 TPM/RPM 与费用上限，是 MaaS 平台计量计费的现成骨架
3. **多模型路由与故障转移**：主模型超时或限流自动降级到备选池，对 SLA 保障很实用
4. **成本核算**：内置各家 token 价目表，逐请求落成本，可直接对接内部账单
5. **自建模型接入**：把 vLLM / SGLang 的 OpenAI 端点注册为 provider，自研与三方模型同池管理

## 四、应用场景说明

- MaaS 平台的接入层：对上提供一个稳定端点，对下屏蔽自研引擎与公有云模型的差异
- 多模型成本优化：简单请求路由到小模型，复杂请求升级到大模型，路由策略集中在网关维护
- Agent 平台的模型抽象层：与本库 [../ai-agents/pydantic-ai.md](../ai-agents/pydantic-ai.md) 等框架组合，避免框架锁定单一供应商
- 与 [langfuse.md](langfuse.md) 组合即得到「网关 + 全链路 trace + 成本看板」的最小可用 LLMOps 闭环

## 五、个人评价

### 优势

1. 供应商覆盖数量断层领先，几乎不存在"这家模型接不了"的情况
2. SDK 与 Proxy 双形态，从单体应用到平台化演进不需要换技术栈
3. 治理能力（虚拟 key、预算、审计日志）在开源网关里最完整，省下大量平台自研工作

### 不足

1. 许可为 NOASSERTION：核心 MIT，但企业特性受额外条款约束，商业化交付前必须做许可审计
2. 抽象层带来额外延迟与偶发的字段丢失，供应商私有参数常需 `extra_body` 绕行
3. 迭代非常快，Proxy 的配置项与数据库 schema 变更频繁，升级需要演练

### 评分理由

5 星：多模型接入这件事上的默认答案，MaaS 平台可省掉整层适配与计量自研（⭐56.9k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/BerriAI/litellm |
| **官方文档** | https://docs.litellm.ai |

### 关联项目

- [higress.md](higress.md)
- [langfuse.md](langfuse.md)
- [vllm.md](vllm.md)
