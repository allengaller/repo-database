---
name: chaos-mesh/chaos-mesh
url: https://github.com/chaos-mesh/chaos-mesh
domain: fullstack-arch
type: tool
languages: [Go]
stars: 7849
forks: 1029
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [chaos-engineering, kubernetes, sre, fault-injection, cncf]
summary: Kubernetes 原生的混沌工程平台，用 CRD 声明式注入 Pod/网络/IO/内核等故障
---

# Chaos Mesh · Kubernetes 原生混沌工程平台

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Chaos Mesh |
| **仓库地址** | https://github.com/chaos-mesh/chaos-mesh |
| **所属组织/作者** | chaos-mesh（CNCF 孵化项目，源自 PingCAP） |
| **描述** | Kubernetes 原生的混沌工程平台，用 CRD 声明式注入 Pod/网络/IO/内核等故障 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 7,849（截至 2026-08） |
| **Fork 数** | 1,029 |
| **技术类型** | tool |

## 二、技术栈分析

- Go 实现，控制面为 `chaos-controller-manager`（Operator 模式），数据面为每节点的 `chaos-daemon`（DaemonSet）
- 故障类型即 CRD：PodChaos、NetworkChaos、IOChaos、StressChaos、TimeChaos、DNSChaos、KernelChaos、HTTPChaos、JVMChaos
- 底层机制分工明确：网络故障用 tc/iptables，文件 IO 用 FUSE 注入，内核故障依赖 BPF，JVM 故障走 byteman
- 编排层 Workflow CRD 支持串行/并行/条件分支，把单点故障组合成完整演练剧本
- Chaos Dashboard 提供可视化编排与实验归档；Chaosd 可对非 K8s 的物理机/虚拟机注入故障

## 三、核心功能特性

1. **声明式故障注入**：故障即 YAML，可进 Git、可 Code Review、可在 CI 中回归执行
2. **精准爆炸半径控制**：selector 支持 namespace / label / annotation / phase 以及 `mode: fixed-percent` 等采样模式
3. **网络故障谱系完整**：延迟、丢包、乱序、带宽限制、分区，覆盖分布式系统绝大多数网络异常假设
4. **实验编排与自动回滚**：Workflow 编排多阶段演练，`duration` 到期自动恢复，避免故障残留
5. **可观测闭环**：实验事件与状态写入 CR status，可与监控告警联动验证稳态假设是否被破坏

## 四、应用场景说明

- 生产前稳定性验证：上线新架构前，用 NetworkChaos 验证超时/重试/熔断参数是否真的生效
- 高可用演练常态化：把主备切换、节点驱逐、依赖不可用等场景固化为周期性 Workflow
- SRE 智能体的训练场：故障注入产生的真实告警与日志，是自动根因分析与工单语料的高质量来源
- 与 [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md) 配合：清单给出应该配的项，混沌实验验证配了是否真有用
- 与 [opentelemetry-collector.md](opentelemetry-collector.md) 配合：注入期间以遥测数据度量稳态偏移

## 五、个人评价

### 优势

1. K8s 原生程度最高的混沌工具，CRD + Operator 模型与 GitOps 流程天然契合
2. 故障类型覆盖面广且粒度细，网络与 IO 两类最难自造的故障做得尤其扎实
3. CNCF 孵化项目，文档与社区成熟，生产落地案例充足

### 不足

1. KernelChaos、IOChaos 等对内核版本与容器运行时有要求，部分托管集群上不可用或需特权容器
2. chaos-daemon 需要较高权限（hostPID、privileged），在安全合规严格的环境中审批成本高
3. 稳态假设与观测指标需自行定义，工具本身不判定"实验是否通过"，缺少内建的稳态校验层

### 评分理由

4 星：K8s 混沌工程的首选工具，扣分在特权需求与部分故障类型的环境限制（⭐7.8k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/chaos-mesh/chaos-mesh |
| **官方文档** | https://chaos-mesh.org/docs/ |
| **Chaosd（主机侧）** | https://github.com/chaos-mesh/chaosd |

### 关联项目

- [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md)
- [opentelemetry-collector.md](opentelemetry-collector.md)
- [awesome-scalability.md](awesome-scalability.md)
