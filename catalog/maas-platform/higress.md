---
name: higress-group/higress
url: https://github.com/higress-group/higress
domain: maas-platform
type: tool
languages: [Go]
stars: 9154
forks: 1241
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [ai-gateway, envoy, kubernetes, ingress, wasm]
summary: 阿里开源的云原生 AI 网关，基于 Envoy 把 Ingress 与 AI 代理能力合并为一层
---

# Higress · 云原生 AI 网关

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Higress |
| **仓库地址** | https://github.com/higress-group/higress |
| **所属组织/作者** | higress-group（阿里巴巴开源，原仓库 alibaba/higress 已迁移至此） |
| **描述** | 阿里开源的云原生 AI 网关，基于 Envoy 把 Ingress 与 AI 代理能力合并为一层 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 9,154（截至 2026-08） |
| **Fork 数** | 1,241 |
| **技术类型** | tool |

## 二、技术栈分析

- Go 控制面 + Envoy 数据面，兼容 Ingress / Gateway API / Nacos 多种配置源
- 插件体系基于 **Wasm**（Go、Rust、C++ 均可写插件），热更新不重启数据面
- AI 能力以插件形式实现：ai-proxy（多供应商协议转换）、ai-token-ratelimit、ai-cache、ai-statistics、ai-security-guard
- 与 Nacos / MSE 生态打通，可复用既有微服务注册与配置中心
- 提供 Helm Chart，在 ACK 等 K8s 环境可作为标准 Ingress 控制器直接替换 Nginx Ingress

## 三、核心功能特性

1. **AI 代理插件**：一套配置对接 OpenAI、通义、DeepSeek、Claude 等，协议转换在数据面完成
2. **按 token 限流**：不同于传统 QPS 限流，按 token 消耗做配额是 MaaS 平台的关键治理原语
3. **语义缓存**：ai-cache 插件对相似请求命中缓存，直接降低后端推理成本
4. **内容安全网关**：可串接内容风控服务，在网关层完成入出参审核，满足合规要求
5. **Ingress + AI 合一**：不必在集群里同时维护业务 Ingress 与独立 AI 网关两套组件

## 四、应用场景说明

- ACK / 专有云环境下的模型服务统一入口：南北向流量、认证、限流、审计集中在网关层
- 大模型多租户配额管理：按租户发 key + token 配额，配合 ai-statistics 出量化报表
- 与 [litellm.md](litellm.md) 的取舍：LiteLLM 偏应用层治理与供应商覆盖广度，Higress 偏数据面性能与 K8s 原生集成
- 后端可挂 [vllm.md](vllm.md) / [sglang.md](sglang.md) 的 OpenAI 端点，形成完整 MaaS 链路

## 五、个人评价

### 优势

1. Envoy 数据面 + Wasm 插件的架构在性能与可扩展性上比 Python 网关有本质优势
2. AI 治理原语（token 限流、语义缓存、内容安全）设计贴合国内合规与成本诉求
3. 阿里云生态一致性好，ACK 与专有云 AI Stack 场景落地路径清晰

### 不足

1. Wasm 插件开发调试链路较长，团队需要额外学习成本
2. 供应商适配数量不及 LiteLLM，长尾模型仍需自行扩展 ai-proxy
3. 文档中英文进度不一致，部分高级配置只能读源码或插件 README

### 评分理由

4 星：云原生 AI 网关里工程成熟度最高的开源选项之一，与 K8s/ACK 主场高度契合（⭐9.2k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/higress-group/higress |
| **官方文档** | https://higress.cn |
| **AI 插件说明** | https://higress.cn/docs/latest/plugins/ai/ |

### 关联项目

- [litellm.md](litellm.md)
- [vllm.md](vllm.md)
- [../fullstack-arch/opentelemetry-collector.md](../fullstack-arch/opentelemetry-collector.md)
