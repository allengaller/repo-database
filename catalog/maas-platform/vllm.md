---
name: vllm-project/vllm
url: https://github.com/vllm-project/vllm
domain: maas-platform
type: framework
languages: [Python, Cuda, C++]
stars: 89589
forks: 20978
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [inference-engine, llm-serving, pagedattention, gpu]
summary: PagedAttention 起家的高吞吐 LLM 推理引擎，事实上的 MaaS 平台推理层标准底座
---

# vLLM · 高吞吐低显存的 LLM 推理服务引擎

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | vLLM |
| **仓库地址** | https://github.com/vllm-project/vllm |
| **所属组织/作者** | vllm-project（源自 UC Berkeley Sky Computing Lab，现为 PyTorch 基金会托管项目） |
| **描述** | PagedAttention 起家的高吞吐 LLM 推理引擎，事实上的 MaaS 平台推理层标准底座 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 89,589（截至 2026-08） |
| **Fork 数** | 20,978 |
| **技术类型** | framework |

## 二、技术栈分析

- Python 调度层 + CUDA/C++ 算子内核，另有 ROCm、TPU、CPU、Neuron 等多后端支持
- 核心机制 **PagedAttention**：把 KV Cache 按页管理，显存碎片率接近操作系统虚拟内存的水平
- **Continuous batching**（连续批处理）替代静态 batch，请求级流水线让 GPU 空转窗口最小化
- 分布式：张量并行（TP）+ 流水并行（PP），大模型可横跨多卡多机
- 对外暴露 OpenAI 兼容的 `/v1/chat/completions`、`/v1/completions` 接口，可直接被网关层接管

## 三、核心功能特性

1. **吞吐优先的调度器**：PagedAttention + continuous batching 组合，是同等硬件下吞吐提升最显著的开源方案
2. **OpenAI 兼容 API**：MaaS 平台可以零改造把 vLLM 挂到统一网关后面，模型替换对业务方透明
3. **量化矩阵完整**：AWQ / GPTQ / FP8 / INT8 等主流量化路径均有内核实现，便于按显存预算做档位切分
4. **Prefix caching 与投机解码**：多轮对话、系统提示词重复场景显著降低 TTFT
5. **模型覆盖广**：主流开源模型（Llama、Qwen、DeepSeek、Mixtral 等）首日适配基本成为常态

## 四、应用场景说明

- MaaS 平台的推理执行层：一个 Deployment 承载一个模型档位，上游用网关做路由与配额
- K8s 上的 GPU 池化部署：与本库 [volcano.md](volcano.md)、[hami.md](hami.md) 组合可实现队列排队与显存切分
- 私有化/专有云交付：Apache-2.0 许可对商业闭源集成友好，是专有云 AI Stack 推理层的稳妥选择
- 与 [kserve.md](kserve.md) 搭配可获得声明式的 InferenceService 生命周期管理

## 五、个人评价

### 优势

1. 生态位不可替代：几乎所有 MaaS/推理平台的默认推理后端，社区适配速度和文档质量都是第一梯队
2. 性能收益可量化：PagedAttention 带来的显存利用率提升在生产环境是真金白银的成本下降
3. 治理成熟：进入 PyTorch 基金会后版本节奏与 breaking change 管理明显规范化

### 不足

1. 迭代极快，小版本间调度器行为和 CLI 参数常有变化，生产环境必须锁定镜像 tag
2. 显存与并行参数（`--gpu-memory-utilization`、TP/PP 组合）调优门槛高，缺乏自动化推荐
3. 长上下文与超大模型场景仍需配合外部 KV offload 方案，单引擎难以覆盖全部档位

### 评分理由

5 星：MaaS 平台推理层的事实标准，任何做模型服务的团队都绕不开（⭐89.6k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/vllm-project/vllm |
| **官方文档** | https://docs.vllm.ai |
| **PagedAttention 论文** | https://arxiv.org/abs/2309.06180 |

### 关联项目

- [sglang.md](sglang.md)
- [kserve.md](kserve.md)
- [litellm.md](litellm.md)
- [../ai-engineering/bitnet.md](../ai-engineering/bitnet.md)
