---
name: learnk8s/kubernetes-production-best-practices
url: https://github.com/learnk8s/kubernetes-production-best-practices
domain: fullstack-arch
type: awesome-list
languages: []
stars: 1135
forks: 217
license: MIT
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [kubernetes, checklist, production-readiness, sre]
summary: K8s 生产就绪检查清单，按应用/集群/治理三层给出可勾选的上线前核对项
---

# Kubernetes Production Best Practices · 生产就绪检查清单

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Kubernetes Production Best Practices |
| **仓库地址** | https://github.com/learnk8s/kubernetes-production-best-practices |
| **所属组织/作者** | Learnk8s |
| **描述** | K8s 生产就绪检查清单，按应用/集群/治理三层给出可勾选的上线前核对项 |
| **开源许可** | MIT |
| **Star 数** | 1,135（截至 2026-08） |
| **Fork 数** | 217 |
| **技术类型** | awesome-list |

## 二、技术栈分析

- 纯文档仓库，内容以 checklist 形式组织，每项含「怎么做 + 为什么」
- 三个板块：
  - **Application development** — 健康探针、优雅退出、资源 request/limit、亲和与反亲和、标签规范
  - **Governance** — 命名空间限额、NetworkPolicy、RBAC、Pod 安全、镜像准入
  - **Cluster configuration** — 版本升级、节点池、审计日志、备份恢复、监控告警
- 有配套在线版（learnk8s 网站）与 PDF，便于在评审会上逐项过
- MIT 许可，可直接改造为内部上线门禁模板

## 三、核心功能特性

1. **可勾选粒度**：每项都是明确的"是/否"判断，不是模糊的最佳实践口号
2. **健康检查专章**：liveness/readiness/startup 三种探针的常见误用（尤其 liveness 误杀）说明到位
3. **优雅退出细节**：`terminationGracePeriodSeconds` 与 preStop 钩子的时序坑点讲清楚
4. **治理层完整**：RBAC、NetworkPolicy、资源配额三件套是多租户集群的最低门槛
5. **与工具解耦**：不绑定具体监控/CI 产品，任何技术栈都能落地

## 四、应用场景说明

- 业务上线前的评审门禁：把清单转为内部 checklist，PR 或工单流程中强制勾选
- 工单/故障根因归类：大量生产事故本质是清单里某一项未做，可用它反查故障模式
- 客户交付验收：作为"集群是否生产就绪"的第三方中立依据
- 与 [terraform-aws-eks.md](terraform-aws-eks.md) 互补：IaC 保证配置一致，清单保证配置正确

## 五、个人评价

### 优势

1. 清单化表达最贴合运维实操，可直接嵌入流程而不需要二次加工
2. 探针与优雅退出这两块的坑点覆盖，直接对应最高频的生产事故类型
3. MIT 许可 + 无技术栈绑定，内部改造成本极低

### 不足

1. 更新节奏偏慢（最近提交 2026-05，截至 2026-08），较新的 K8s 特性（Gateway API、Sidecar 容器）未纳入
2. 只给判断项不给验证脚本，落地仍需自行实现自动化检查
3. 缺少 GPU / AI 工作负载的专项条目，AI 平台场景需自行补充

### 评分理由

4 星：星数不高但实用密度极高，是 K8s 生产化最省事的现成清单（⭐1.1k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/learnk8s/kubernetes-production-best-practices |
| **在线清单** | https://learnk8s.io/production-best-practices |

### 关联项目

- [terraform-aws-eks.md](terraform-aws-eks.md)
- [chaos-mesh.md](chaos-mesh.md)
- [opentelemetry-collector.md](opentelemetry-collector.md)
