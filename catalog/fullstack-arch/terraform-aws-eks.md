---
name: terraform-aws-modules/terraform-aws-eks
url: https://github.com/terraform-aws-modules/terraform-aws-eks
domain: fullstack-arch
type: library
languages: [HCL]
stars: 4998
forks: 4410
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [terraform, iac, kubernetes, eks, reference-architecture]
summary: 社区维护的 EKS Terraform 模块，是研读云上 K8s 集群 IaC 范式的最佳参考实现
---

# terraform-aws-eks · 生产级 K8s 集群 IaC 范式

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | terraform-aws-eks |
| **仓库地址** | https://github.com/terraform-aws-modules/terraform-aws-eks |
| **所属组织/作者** | terraform-aws-modules（Anton Babenko 领导的社区组织） |
| **描述** | 社区维护的 EKS Terraform 模块，是研读云上 K8s 集群 IaC 范式的最佳参考实现 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 4,998（截至 2026-08） |
| **Fork 数** | 4,410 |
| **技术类型** | library |

## 二、技术栈分析

- HCL（Terraform），面向 AWS Provider，采用「根模块 + 子模块」分层结构
- 子模块拆分清晰：`eks-managed-node-group`、`self-managed-node-group`、`fargate-profile`、`karpenter`
- 变量设计以 map/object 为主，节点组、访问权限、addon 等都是可组合的声明式配置
- 内置 `examples/` 目录提供完整可跑样例（karpenter、自管节点、Bottlerocket 等）
- 测试与文档由 terraform-docs、pre-commit 钩子自动生成，模块工程化程度高

## 三、核心功能特性

1. **集群全生命周期**：控制面、节点组、IRSA、安全组、addon、访问入口一份代码覆盖
2. **Karpenter 集成**：节点级弹性伸缩的现成范式，直接对应"按需扩容 GPU/CPU 池"的诉求
3. **IRSA 权限最小化**：Pod 级 IAM 角色的标准写法，是云上权限治理的教科书示例
4. **模块化组合**：节点组可按工作负载类型（CPU/GPU/Spot）分别声明，异构池管理清晰
5. **高 fork 比**：fork 数接近 star 数，说明它主要被"拿去改"，正是参考实现的典型特征

## 四、应用场景说明

- IaC 范式参考：即使目标平台是 ACK 而非 EKS，其模块分层、变量抽象、IRSA 权限设计思路可直接迁移
- 集群生产化清单：读它的 variables 就知道生产集群需要考虑哪些开关
- 多环境交付：dev/staging/prod 用同一模块不同 tfvars，是标准化交付的落地方式
- 与 [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md) 配合：一个给"配置怎么写"，一个给"上线前该检查什么"

## 五、个人评价

### 优势

1. 社区模块中工程质量最高的一类，文档、示例、版本兼容矩阵齐全
2. 高 fork 率证明其"参考实现"价值，抄结构比抄配置更有价值
3. Apache-2.0 许可，可安全用于商业交付

### 不足

1. 强绑定 AWS，其他云（含 ACK）需要自行映射概念，无法直接复用代码
2. 模块变量数量庞大，版本升级（尤其 v19 → v20 的破坏性变更）需要仔细读 UPGRADE 文档
3. 抽象层次深，排查一个属性最终落到哪个 AWS 资源需要跳多层子模块

### 评分理由

4 星：云原生 IaC 的标杆参考实现，跨云可迁移的是设计范式而非代码本身（⭐5.0k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/terraform-aws-modules/terraform-aws-eks |
| **Terraform Registry** | https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest |

### 关联项目

- [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md)
- [opentelemetry-collector.md](opentelemetry-collector.md)
- [architecture-decision-record.md](architecture-decision-record.md)
