---
name: volcano-sh/volcano
url: https://github.com/volcano-sh/volcano
domain: maas-platform
type: tool
languages: [Go]
stars: 5877
forks: 1498
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [kubernetes, scheduler, batch, gang-scheduling, cncf]
summary: CNCF 批量计算调度系统，为 K8s 补上 gang scheduling 与队列公平共享等 AI 训练必需能力
---

# Volcano · K8s 批量计算与 AI 负载调度器

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Volcano |
| **仓库地址** | https://github.com/volcano-sh/volcano |
| **所属组织/作者** | volcano-sh（华为云主导捐赠，CNCF 孵化项目） |
| **描述** | CNCF 批量计算调度系统，为 K8s 补上 gang scheduling 与队列公平共享等 AI 训练必需能力 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 5,877（截至 2026-08） |
| **Fork 数** | 1,498 |
| **技术类型** | tool |

## 二、技术栈分析

- Go，作为独立 scheduler 与 kube-scheduler 并存（Pod 通过 `schedulerName` 指定）
- 核心 CRD：`Queue`（资源配额与优先级）、`PodGroup`（成组调度单元）、`VolcanoJob`（多角色任务）
- 调度框架由 actions（enqueue / allocate / preempt / backfill / reclaim）与 plugins（gang、drf、proportion、binpack、task-topology）组成
- 支持 GPU/NPU 等扩展资源感知，可做拓扑亲和（NVLink / NUMA）编排
- 上游生态：PyTorch/TF Operator、Spark、Flink、KubeRay、Kubeflow 均可切换到 Volcano 调度

## 三、核心功能特性

1. **Gang Scheduling**：分布式训练要么全部 Pod 起来要么都不起，彻底避免部分启动的资源死锁
2. **队列与公平共享**：DRF、proportion 插件实现多团队按权重分配 GPU，是 AI 平台配额治理的基础
3. **抢占与回收**：高优先级在线推理可抢占低优先级训练任务，提升昂贵 GPU 的整体利用率
4. **Binpack 装箱**：GPU 碎片最小化，同规格任务尽量集中在同一节点
5. **拓扑感知调度**：多卡任务优先落在同一 NVLink 域，减少通信开销

## 四、应用场景说明

- AI 平台的调度底座：训练、微调、批量推理共享一个 GPU 池，靠队列与优先级隔离团队
- 与 [kuberay.md](kuberay.md) 组合：Ray 集群以 PodGroup 提交，解决 head/worker 成组启动问题
- 与 [hami.md](hami.md) 分工：Volcano 管"任务级排队与配额"，HAMi 管"单卡显存/算力切分"
- ACK 已提供 Volcano 托管形态，专有云 AI Stack 中亦常作为默认批调度器

## 五、个人评价

### 优势

1. Gang scheduling 是 AI 训练在 K8s 上的硬需求，Volcano 是最成熟的开源答案
2. CNCF 孵化 + 多云厂商托管，长期维护风险低
3. 插件式调度框架可扩展，自研调度策略不必 fork 整个调度器

### 不足

1. 双调度器并存带来运维复杂度，与 kube-scheduler 的资源视图不一致时排障困难
2. 队列/PodGroup 概念对业务团队不透明，需要平台层封装才可用
3. 在线推理弹性场景（秒级扩缩）不是它的设计目标，仍需 HPA/KEDA 配合

### 评分理由

4 星：K8s AI 调度层的事实标准之一，与 ACK/专有云 AI Stack 场景直接相关（⭐5.9k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/volcano-sh/volcano |
| **官方文档** | https://volcano.sh/en/docs/ |

### 关联项目

- [kuberay.md](kuberay.md)
- [hami.md](hami.md)
- [kserve.md](kserve.md)
