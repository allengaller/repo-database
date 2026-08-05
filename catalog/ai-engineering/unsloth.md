---
name: unslothai/unsloth
url: https://github.com/unslothai/unsloth
domain: ai-engineering
type: tool
languages: [Python]
stars: 69000
forks: 0
license: Apache-2.0
discovered: 2026-08-04
updated: 2026-08-04
rating: 5
status: active
tags: [llm-finetuning, gpu-acceleration, low-memory, qLoRA, llama, mistral, qwen, training-acceleration]
summary: 6.9 万 stars 的 LLM 微调加速库 — 比 HuggingFace Transformers 快 2-5x、内存省 80%，单张消费级 GPU 就能微调 70B 模型，Llama/Mistral/Qwen 全适配
---

# Unsloth · 单卡 GPU 微调 70B 大模型

> 收录日期：2026-08-04
> 仓库：https://github.com/unslothai/unsloth
> 来源：2026 GitHub AI Trending 反复上榜

**一句话核心总结**：Unsloth 是 2026 年最热的 LLM 微调加速库——**比 HuggingFace Transformers 快 2-5 倍、内存省 80%**，单张消费级 GPU 就能微调 70B 模型，原生支持 Llama/Mistral/Qwen 全系列，是研究者和中小团队微调 LLM 的首选工具。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Unsloth |
| **仓库地址** | https://github.com/unslothai/unsloth |
| **所属组织/作者** | unslothai |
| **描述** | LLM 微调加速库：比 HF Transformers 快 2-5x，内存省 80% |
| **开源许可** | Apache-2.0 |
| **Star 数** | ~69,403 |
| **技术类型** | tool / library |

---

## 二、核心性能优势

| 指标 | Unsloth | HuggingFace Transformers |
|------|---------|---------------------------|
| **训练速度** | 2-5x 加速 | 1x（基线） |
| **内存占用** | 省 80% | 100%（基线） |
| **支持的模型** | Llama/Mistral/Qwen/Gemma/Phi 全系列 | 全部但需更多优化 |
| **单 GPU 微调 70B** | ✅（24GB 显存可启动） | ❌（需多卡） |
| **QLoRA/LoRA** | 原生支持 | 需额外配置 bitsandbytes |

---

## 三、关键能力

### 3.1 极低显存需求

- 4-bit QLoRA 微调 7B 模型：仅需 6GB 显存
- 单卡 24GB（如 RTX 4090）可微调 13B 模型
- 通过梯度检查点 + 智能 offload，微调 70B 也成为可能

### 3.2 速度优化原理

- 手写 Triton kernel
- RoPE/Embedding 优化
- 减少冗余计算

### 3.3 简单易用

```python
from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained("unsloth/llama-3-70b-bnb-4bit")
```

仅 2 行代码完成模型加载 + LoRA 配置。

---

## 四、支持的模型（部分）

- Llama 3 / 3.1 / 3.2 全系列
- Mistral / Mixtral
- Qwen 2 / 2.5
- Gemma 1 / 2
- Phi-3
- DeepSeek-V2/V3

---

## 五、应用场景

- **中小团队微调** —— 单卡 GPU 即可启动，无需 H100 集群
- **个人研究者** —— 笔记本也能微调 7B 模型
- **企业定制化** —— 在私有数据上微调行业专属模型
- **学术研究** —— 快速验证不同微调策略的效果

---

## 六、与同类项目对比

| 工具 | 速度 | 内存 | 易用性 | 模型支持 |
|------|------|------|--------|----------|
| **Unsloth** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| HF Transformers + PEFT | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Axolotl | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| LLaMA-Factory | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Unsloth 的位置**：速度+内存最优，单 GPU 微调 70B 的标杆。

---

## 七、个人评价

### 优势

1. **极致性能** —— 2-5x 加速 + 80% 内存节省是结构性优势
2. **极低门槛** —— 单 GPU 即可微调 70B，研究者友好
3. **模型覆盖广** —— Llama/Mistral/Qwen 全系列
4. **使用简单** —— 2 行代码完成配置
5. **Apache-2.0 + 6.9 万 stars** —— 商业友好，社区活跃

### 不足

1. **新模型支持滞后** —— 刚发布的模型可能需要等适配
2. **Triton 依赖** —— 需要 CUDA 环境
3. **完全兼容性问题** —— 与部分训练框架（如 FSDP）集成有摩擦
4. **生产部署需导出** —— 训练后模型需导出回标准格式

### 评分理由

**5 星（active）** —— 性能优势是结构性壁垒；6.9 万 stars 与持续迭代；模型覆盖广；用户口碑极好。Unsloth 是"中小团队微调 LLM 不可绕过的工具"。

---

## 八、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/unslothai/unsloth |

### 关联项目

- [nanochat.md](nanochat.md) — Karpathy 100 美元 ChatGPT
- [haystack.md](haystack.md) — RAG 编排框架
- [tabby.md](tabby.md) — 自托管 AI 编码助手
- [fastmcp.md](fastmcp.md) — MCP 框架
