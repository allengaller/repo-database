---
name: ray-project/kuberay
url: https://github.com/ray-project/kuberay
domain: maas-platform
type: tool
languages: [Go, Python]
stars: 2644
forks: 827
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [kubernetes, ray, operator, distributed-computing, gpu]
summary: Ray 官方 K8s Operator，用 CRD 管理 RayCluster/RayJob/RayService 的分布式算力
---

# KubeRay · K8s 上的 Ray 算力编排 Operator

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | KubeRay |
| **仓库地址** | https://github.com/ray-project/kuberay |
| **所属组织/作者** | ray-project（Anyscale 主导，CNCF 生态项目） |
| **描述** | Ray 官方 K8s Operator，用 CRD 管理 RayCluster/RayJob/RayService 的分布式算力 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 2,644（截至 2026-08） |
| **Fork 数** | 827 |
| **技术类型** | tool |

## 二、技术栈分析

- Go 编写的 Operator（controller-runtime），Python 侧提供 `ray job submit` 等客户端工具链
- 三个核心 CRD：
  - `RayCluster` — 声明 head/worker 组与资源规格，支持异构 workerGroup
  - `RayJob` — 一次性任务，跑完自动回收集群
  - `RayService` — 常驻服务，内置零停机滚动升级（Ray Serve 应用）
- 自动伸缩由 Ray Autoscaler 与 K8s 侧协同完成，可按 pending task 数扩容 worker
- 与 GPU 调度组件（Volcano、Kueue）可插拔集成，实现 gang scheduling

## 三、核心功能特性

1. **声明式集群生命周期**：Ray 集群变成 K8s 资源，GitOps 管理与审计天然成立
2. **异构 worker 组**：CPU 组做数据预处理、GPU 组做训练/推理，同集群内混布
3. **RayService 零停机升级**：新旧集群并行、流量切换后回收旧集群，适合在线推理服务
4. **任务级弹性**：RayJob 跑完即释放，训练与批量推理任务的资源利用率显著提升
5. **与调度器协同**：接入 Volcano 后可避免 Ray 集群"半启动"占坑导致的资源死锁

## 四、应用场景说明

- 分布式训练/微调、批量离线推理（例如把工单历史批量结构化为语料）的算力底座
- MaaS 平台的弹性算力层：把推理引擎跑在 Ray Serve 上，用 RayService 管理版本
- 与 [volcano.md](volcano.md) 组合解决 gang scheduling，与 [hami.md](hami.md) 组合解决单卡多任务共享
- ACK 场景下可直接用官方 Helm Chart 部署，与云上弹性节点池配合做按需扩容

## 五、个人评价

### 优势

1. Ray 在 K8s 上的唯一官方落地路径，CRD 抽象干净、社区活跃
2. RayService 的滚动升级机制对"模型频繁上新"的平台非常实用
3. 与 Volcano/Kueue 等调度器的集成点明确，不与既有调度体系冲突

### 不足

1. 需要同时理解 Ray 与 K8s 两套心智模型，排障链路长（Ray Dashboard + kubectl 双线）
2. 默认配置对小规模集群偏重，head 节点单点风险需自行加固
3. Autoscaler 与 K8s HPA/Cluster Autoscaler 的职责边界容易配错，产生抖动

### 评分理由

4 星：K8s 算力调度方向的关键组件，星数不高但生态位关键、无可替代（⭐2.6k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/ray-project/kuberay |
| **官方文档** | https://docs.ray.io/en/latest/cluster/kubernetes/index.html |
| **Ray 主仓库** | https://github.com/ray-project/ray |

### 关联项目

- [volcano.md](volcano.md)
- [kserve.md](kserve.md)
- [hami.md](hami.md)
