---
name: microsoft/BitNet
url: https://github.com/microsoft/BitNet
domain: ai-engineering
type: framework
languages: [C/C++, Python]
stars: 18700
forks: 1700
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [1-bit, ternary-quantization, inference, cpu-only, llama.cpp, edge-ai, energy-efficient, microsoft]
summary: 微软官方 1-bit LLM 推理框架 bitnet.cpp——1.58-bit 三元量化让 100B 模型单 CPU 跑到 5-7 tokens/s，能耗降 70%+。
---

# BitNet (bitnet.cpp)

## 1. 项目基本信息

| 字段 | 值 |
|------|----|
| 仓库 | [microsoft/BitNet](https://github.com/microsoft/BitNet) |
| 维护方 | Microsoft Research（Ma et al. 团队） |
| 主语言 | C/C++（核心 kernels）+ Python（推理脚本） |
| License | MIT |
| 当前 Stars | ~18.7k（截至 2026-08） |
| 配套模型 | BitNet-b1.58-2B-4T（2.4B / 4T tokens） / BitNet-embedding-0.6B / 270M |
| 最近更新 | 7/27/2026 VibeASR.cpp 集成（CPU 多语种 ASR） |

## 2. 技术栈 / 核心机制分析

**核心创新：1.58-bit 三元量化**

传统 LLM 权重用 FP16/FP32（16-32 bits/weight），BitNet b1.58 把每个权重压成 `-1 / 0 / +1` 三个值之一，信息量 = log₂(3) ≈ **1.58 bits/weight**。

```
传统 Transformer: weight = 0.3274 (FP16)  →  矩阵乘法（昂贵）
BitNet b1.58:     weight ∈ {-1, 0, +1}   →  加减法（廉价）
```

**核心算子 BitLinear：** 把矩阵乘中的"权重 × 激活"换成"加法 / 减法"——x86 AVX2/AVX-512 一次指令算 16-32 个 ternary weight 与 FP16 激活的点积。

**三层量化策略：**

| 量化 | 精度 | 性能 | 适用 |
|------|------|------|------|
| **I2_S** | 2 bits/weight | 最快 | x86 CPU 推荐，8 线程下 1.42-2.28x 加速 |
| **TL1** | ternary | 中等 | ARM CPU 推荐 |
| **TL2** | 2-bit | 慢但准 | 8B+ 大模型 |

**关键性能数据：**

| 平台 | 加速比 | 能耗降低 |
|------|-------|---------|
| x86 CPU | 2.37-6.17x | 71.9-82.2% |
| ARM CPU | 1.37-5.07x | 55.4-70.0% |
| **100B 模型单 CPU** | 5-7 tokens/s（人类阅读速度） | — |

**技术依赖：** 基于 llama.cpp fork → 自定义 BitLinear 内核 + LUT（Lookup Table）查表优化（参考 T-MAC 团队的 low-bit 推理工作）。

## 3. 核心功能特性

**官方支持的模型：**

| 模型 | 参数量 | 训练 tokens | 备注 |
|------|-------|------------|------|
| BitNet-b1.58-2B-4T | 2.4B | 4T | 微软首个官方 BitNet 模型，对标同尺寸 FP16 |
| BitNet-embedding-0.6B | 0.6B | — | 首个 1-bit 嵌入模型，2 bits/weight，CPU 1.42-2.28x 加速 |
| BitNet-embedding-270M | 270M | — | 轻量嵌入，边缘部署 |
| bitnet_b1_58-large / 3B | 0.7B-3.3B | — | 社区微调版 |
| Llama3-8B-1.58-100B-tokens | 8B | 100B | Llama3 8B 转 1.58-bit |
| Falcon3-1B/3B/7B/10B-1.58bit | 1B-10B | — | TII UAE 模型 |

**完整工具链：**
- `setup_env.py` — 一键下载 + 转换 + 编译（I2_S / TL1 / 预调内核）
- `run_inference.py` — CLI 推理（支持 chat mode）
- `run_inference_server.py` — llama.cpp built-in server 兼容
- `utils/convert-hf-to-gguf-bitnet.py` — HuggingFace → GGUF 转换
- `utils/e2e_benchmark.py` — 端到端 benchmark

**集成 VibeASR.cpp（2026-07 新增）：** 用 BitNet I2_S 量化做 CPU 多语种 ASR（实时语音转写），x86 AVX2 / ARM NEON 平台 RTF < 1。

## 4. 应用场景与已落地案例

- **端侧 AI：** 手机/PC/IoT 设备本地跑 2-8B LLM，无需 GPU
- **具身机器人：** AGV / 装配机械臂 / 扫地机器人本地化实时控制（低功耗 + 实时响应）
- **企业 RAG 私有化：** 公司内网 1-2 台 x86 服务器即可跑 7B 模型替代 API
- **绿色计算：** 能耗 -70% 直接转化为数据中心 PUE 优化
- **学术研究：** The Era of 1-bit LLMs（arXiv:2402.17764）已成为 1-bit LLM 范式的基础论文

**生态对比：**

| 项目 | 定位 | 与 BitNet 关系 |
|------|------|--------------|
| **microsoft/BitNet** | 1-bit 推理框架 | 标杆 |
| [meta-llama/llama.cpp](https://github.com/ggerganov/llama.cpp) | 通用量化推理（4/5/8-bit） | 上游依赖，BitNet fork 自 llama.cpp |
| [unslothai/unsloth](../ai-engineering/unsloth.md) | 训练加速（QLoRA） | 互补：unsloth 训，BitNet 推 |
| [mlfoundations/triton](https://github.com/triton-lang/triton) | GPU kernel | 不在 1-bit 赛道 |
| 国产芯动力 RPP | 国内唯一适配 BitNet 的 NPU | dNPU 加速 |

## 5. 个人评价

**优势：**
- **微软官方旗舰项目：** 与 Phi 系列同级别，研究 → 产品转化路径清晰
- **真正的"无 GPU 跑 LLM"：** 100B 模型在单 CPU 上跑到人类阅读速度，把"个人 LLM"从概念变现实
- **论文+模型+框架三位一体：** The Era of 1-bit LLMs / BitNet b1.58 2B4T 技术报告 / 多个官方模型权重同步发布
- **生态辐射：** 国产芯动力 RPP 已经在联想 ThinkPad 16p Gen6 上跑通 BitNet，证明"非 NVIDIA 也能玩"

**不足：**
- **未兼容 PyTorch 生态：** bitnet.cpp 是独立 C++ 框架，不支持 `transformers` 直接 `.from_pretrained()`，对非 C++ 开发者门槛较高
- **训练成本未公开：** 1.58-bit 模型是"从 0 用 QAT 训"而非"训完量化"，4T tokens 训练算力是隐性门槛
- **复杂推理场景待验证：** 在多物体动态交互、Agent 工具调用等长链路任务上，与 FP16 模型差距尚不明确
- **生态窄：** 训练框架 / 部署平台 / 微调工具链都没有 Hugging Face 那么成熟

**评分理由：** 4 星。微软官方 + 突破性数据（100B 单 CPU 5 tokens/s）+ 多模型同步 + 论文可引用，1-bit LLM 赛道事实上唯一被工业界广泛接受的方案。距 5 星只差"训练框架开放 + 多模态支持"。

## 6. 相关资源

| 类型 | 链接 |
|------|------|
| 论文 1 | The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits (arXiv:2402.17764) |
| 论文 2 | BitNet b1.58 2B4T Technical Report (arXiv) |
| 技术报告 | 1-bit AI Infra: Part 1.1, Fast and Lossless BitNet b1.58 Inference on CPUs |
| 模型权重 | https://huggingface.co/microsoft/BitNet-b1.58-2B-4T-gguf |
| 训练 Tips | The-Era-of-1-bit-LLMs: Training Tips, Code, FAQ |
| 同类参考 | [unsloth.md](../ai-engineering/unsloth.md)（训练加速）/[nanochat.md](../ai-engineering/nanochat.md)（极简 GPT 训练） |
| 上游 | llama.cpp（通用量化推理） |
| 端侧 AI 综述 | [pageindex.md](../ai-engineering/pageindex.md)（RAG 新范式） |
