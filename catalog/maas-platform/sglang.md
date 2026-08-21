---
name: sgl-project/sglang
url: https://github.com/sgl-project/sglang
domain: maas-platform
type: framework
languages: [Python, Cuda]
stars: 32213
forks: 8075
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [inference-engine, radixattention, structured-output, llm-serving]
summary: 以 RadixAttention 前缀复用与结构化输出著称的 LLM 推理引擎，Agent 类高并发负载首选
---

# SGLang · RadixAttention 驱动的结构化推理引擎

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | SGLang（Structured Generation Language） |
| **仓库地址** | https://github.com/sgl-project/sglang |
| **所属组织/作者** | sgl-project（LMSYS 系团队孵化，现为独立社区治理） |
| **描述** | 以 RadixAttention 前缀复用与结构化输出著称的 LLM 推理引擎，Agent 类高并发负载首选 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 32,213（截至 2026-08） |
| **Fork 数** | 8,075 |
| **技术类型** | framework |

## 二、技术栈分析

- Python 运行时 + 自研 CUDA 内核，深度依赖 FlashInfer 等高性能 attention 库
- 核心机制 **RadixAttention**：用基数树组织 KV Cache，使跨请求的公共前缀自动命中缓存
- 前端 DSL：以 Python 函数写生成流程（`gen`、`select`、`fork`），把多步生成编译为可调度的执行图
- 约束解码采用压缩状态机，JSON Schema / 正则约束几乎不损失吞吐
- 支持 TP/DP/EP 多种并行组合，对 MoE 模型和大规模 PD 分离部署有专门优化

## 三、核心功能特性

1. **跨请求前缀缓存**：系统提示词、few-shot 样例、Agent 长期上下文重复度高时收益最大
2. **结构化输出**：JSON / 正则 / 语法约束是原生能力，而不是外挂后处理
3. **多步生成编排**：DSL 层可表达分支、并行采样、投机路径，省掉业务侧的手工编排代码
4. **PD 分离（Prefill/Decode 解耦）**：把计算密集的 prefill 与显存带宽密集的 decode 分池调度
5. **OpenAI 兼容服务端**：与 vLLM 一样可无缝挂在统一网关之后

## 四、应用场景说明

- Agent / 工单智能体这类"同一套系统提示词 + 大量并发短请求"的负载，前缀复用带来的 TTFT 下降最直接
- 需要严格结构化输出的场景（结构化语料抽取、工单字段填充、函数调用）
- 与 [vllm.md](vllm.md) 形成互补：吞吐通用场景选 vLLM，前缀重复 + 结构化约束场景选 SGLang
- 上游通过 [litellm.md](litellm.md) 或 [higress.md](higress.md) 做统一入口，实现引擎级 A/B

## 五、个人评价

### 优势

1. RadixAttention 在 Agent 负载下的收益是结构性的，不是调参能补齐的差距
2. 约束解码实现质量高，是"输出必须能被程序消费"场景的最优解之一
3. 对 MoE、PD 分离等前沿部署形态跟进积极，常常领先于其他开源引擎

### 不足

1. DSL 前端有学习成本，且大部分团队最终只用 OpenAI 兼容端点，DSL 价值未被充分利用
2. 文档与 API 稳定性略逊于 vLLM，升级时结构化输出行为需要回归测试
3. 生态集成（K8s Operator、监控指标）相对薄弱，需要自行补齐平台层

### 评分理由

5 星：与 vLLM 并列的两大开源推理引擎之一，在前缀复用与结构化输出上有独占优势（⭐32.2k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/sgl-project/sglang |
| **官方文档** | https://docs.sglang.ai |
| **RadixAttention 论文** | https://arxiv.org/abs/2312.07104 |

### 关联项目

- [vllm.md](vllm.md)
- [litellm.md](litellm.md)
- [../ai-engineering/unsloth.md](../ai-engineering/unsloth.md)
