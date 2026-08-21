---
name: Project-HAMi/HAMi
url: https://github.com/Project-HAMi/HAMi
domain: maas-platform
type: tool
languages: [Go]
stars: 4411
forks: 788
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [kubernetes, gpu-sharing, virtualization, cncf, device-plugin]
summary: CNCF 异构算力虚拟化中间件，在 K8s 上实现 GPU 显存与算力的细粒度切分共享
---

# HAMi · K8s 异构算力虚拟化与 GPU 共享

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | HAMi（Heterogeneous AI Computing Virtualization Middleware） |
| **仓库地址** | https://github.com/Project-HAMi/HAMi |
| **所属组织/作者** | Project-HAMi（前身为 4paradigm/k8s-vGPU-scheduler，CNCF 沙箱项目） |
| **描述** | CNCF 异构算力虚拟化中间件，在 K8s 上实现 GPU 显存与算力的细粒度切分共享 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 4,411（截至 2026-08） |
| **Fork 数** | 788 |
| **技术类型** | tool |

## 二、技术栈分析

- Go 实现，由三部分组成：调度扩展器（scheduler extender）、device plugin（mutating webhook 注入）、HAMi-core（CUDA API 劫持层）
- 通过劫持 CUDA 调用实现 **硬限制**：容器只能看到分配给它的显存额度，超限即 OOM 而非影响邻居
- 扩展资源语义：`nvidia.com/gpumem`（显存 MB）、`nvidia.com/gpucore`（算力百分比）、`nvidia.com/gpu`（卡数）
- 异构支持：NVIDIA 之外还覆盖寒武纪 MLU、海光 DCU、昇腾 NPU、天数智芯等国产卡
- 可与 Volcano、kube-scheduler、Koordinator 等调度体系共存

## 三、核心功能特性

1. **显存硬隔离**：不同于 time-slicing 的"软共享"，显存额度有强制上限，多租户安全性明显更好
2. **算力配额**：按百分比限制 SM 使用，避免单个推理进程打满整卡
3. **国产算力统一抽象**：一套资源语义覆盖多种异构芯片，专有云信创场景价值大
4. **无需改应用**：CUDA 劫持在容器内透明生效，业务镜像不用改代码
5. **调度器可插拔**：与既有调度体系（含 Volcano 队列）叠加使用

## 四、应用场景说明

- 小模型/低 QPS 推理服务的成本优化：一张卡切成多份跑多个模型档位，是 MaaS 平台降本的直接手段
- 开发测试环境的 GPU 共享：多人共用少量卡，靠显存额度避免互相踩踏
- 与 [volcano.md](volcano.md) 分工明确：Volcano 解决排队与配额，HAMi 解决单卡切分
- 与 [vllm.md](vllm.md) 组合时需注意：vLLM 预占显存比例（`--gpu-memory-utilization`）必须与 HAMi 额度对齐

## 五、个人评价

### 优势

1. 硬隔离方案在开源里稀缺，比 NVIDIA time-slicing / MPS 更适合多租户平台
2. 国产异构芯片覆盖度好，专有云与信创交付有实际不可替代性
3. 部署形态轻（DaemonSet + webhook + scheduler extender），对既有集群侵入可控

### 不足

1. CUDA 劫持机制与驱动/CUDA 版本耦合，升级驱动前必须验证兼容矩阵
2. 有一定性能开销，极致吞吐场景仍应整卡独占
3. MIG 等硬件级切分能力与 HAMi 软切分的选择边界需要按卡型逐一评估

### 评分理由

4 星：GPU 共享方向最实用的开源方案，与专有云/信创 AI Stack 场景强绑定（⭐4.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/Project-HAMi/HAMi |
| **官方文档** | https://project-hami.io |

### 关联项目

- [volcano.md](volcano.md)
- [kuberay.md](kuberay.md)
- [vllm.md](vllm.md)
