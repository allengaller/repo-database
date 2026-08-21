---
name: ByteByteGoHq/system-design-101
url: https://github.com/ByteByteGoHq/system-design-101
domain: fullstack-arch
type: course
languages: []
stars: 87367
forks: 9721
license: NOASSERTION
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [system-design, visual-explanation, architecture, cheatsheet]
summary: ByteByteGo 的图解系统设计合集，用大量架构示意图快速建立分布式系统直觉
---

# System Design 101 · 图解式架构速查

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | System Design 101 |
| **仓库地址** | https://github.com/ByteByteGoHq/system-design-101 |
| **所属组织/作者** | ByteByteGo（《System Design Interview》作者团队） |
| **描述** | ByteByteGo 的图解系统设计合集，用大量架构示意图快速建立分布式系统直觉 |
| **开源许可** | NOASSERTION（图文内容版权归 ByteByteGo，转载与商用需遵守仓库声明） |
| **Star 数** | 87,367（截至 2026-08） |
| **Fork 数** | 9,721 |
| **技术类型** | course |

## 二、技术栈分析

- 纯内容仓库：一个巨型 README + 图片资源，无代码依赖
- 组织维度按主题切块：通信（REST/GraphQL/gRPC/WebSocket）、CI/CD、架构模式、数据库、缓存、微服务、支付、DevOps、云服务
- 每个知识点固定一图一段说明，信息密度高、阅读成本低
- 图片风格统一（等宽色块 + 编号流程），适合直接引用到内部方案与培训材料

## 三、核心功能特性

1. **协议与通信对比图**：REST / GraphQL / gRPC / WebSocket / 长轮询的适用边界一图说清
2. **架构模式速查**：微服务与单体、事件驱动、CQRS、Saga 等模式的图解对照
3. **数据库与缓存决策图**：选型维度（一致性、扩展性、访问模式）可视化呈现
4. **支付/对账等业务链路**：少见的业务架构图解，对做行业方案的 SA 有直接价值
5. **DevOps 与云服务图谱**：把 K8s、CI/CD、可观测三块串成一张运维全景

## 四、应用场景说明

- 客户/业务方沟通的图库来源：讲架构时直接复用图示，比现场画白板更清晰
- 快速补齐知识盲区：某个概念只需三分钟即可建立正确直觉，再深入查资料
- 与 [system-design-primer.md](system-design-primer.md) 分工：Primer 给推演框架，101 给可视化速查
- 内部培训与新人 onboarding 的图解教材

## 五、个人评价

### 优势

1. 图解质量与一致性极高，是少见的"能直接拿去做汇报"的开源内容库
2. 覆盖广度远超一般速查表，含支付、对账等业务架构视角
3. 阅读成本极低，碎片时间即可消费

### 不足

1. 上游更新停滞：最近一次提交在 2025-04（截至 2026-08 已逾一年），新技术（AI 基础设施、边缘计算）未覆盖
2. 只有结论没有推演过程，深度不足，不能替代 Primer 或原书
3. 内容许可为 NOASSERTION，对外材料引用需注明来源并注意商用限制

### 评分理由

4 星：图解质量顶级、实用性强，但上游已停更且深度有限，因此不给满分（⭐87.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/ByteByteGoHq/system-design-101 |
| **ByteByteGo 官网** | https://bytebytego.com |

### 关联项目

- [system-design-primer.md](system-design-primer.md)
- [awesome-scalability.md](awesome-scalability.md)
