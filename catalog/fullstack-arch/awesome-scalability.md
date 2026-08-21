---
name: binhnguyennus/awesome-scalability
url: https://github.com/binhnguyennus/awesome-scalability
domain: fullstack-arch
type: awesome-list
languages: []
stars: 73432
forks: 7102
license: MIT
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [scalability, awesome-list, engineering-blog, distributed-systems]
summary: 按架构主题索引大厂工程博客与论文的可扩展性资料库，真实案例的检索入口
---

# Awesome Scalability · 大厂架构案例索引

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Awesome Scalability |
| **仓库地址** | https://github.com/binhnguyennus/awesome-scalability |
| **所属组织/作者** | Binh Nguyen |
| **描述** | 按架构主题索引大厂工程博客与论文的可扩展性资料库，真实案例的检索入口 |
| **开源许可** | MIT |
| **Star 数** | 73,432（截至 2026-08） |
| **Fork 数** | 7,102 |
| **技术类型** | awesome-list |

## 二、技术栈分析

- 纯链接索引仓库（Markdown），无代码
- 一级分类按可扩展性维度组织：Principles、Scalability、Availability、Stability、Performance、Intelligence、Architecture、DevOps、Talks、Books
- 每条目格式统一为「标题 — 来源公司」，可按公司或主题双向检索
- 收录来源以 Netflix / Uber / Airbnb / Meta / LinkedIn / Dropbox 等一线工程博客与顶会论文为主
- 由维护者长期人工筛选，收录门槛明显高于自动聚合列表

## 三、核心功能特性

1. **主题化案例检索**：要设计限流、要做分库分表，直接跳到对应章节找真实实践
2. **失败经验集中**：Stability 与 Availability 章节收录了大量事故复盘，比成功案例更有价值
3. **原理与实践双层**：Principles 章节给理论锚点，其余章节给工程落地
4. **DevOps 与 SRE 专区**：容量规划、监控、混沌工程等运维侧材料成体系
5. **持续维护**：更新节奏稳定（最近提交 2026-01，截至 2026-08），不是一次性堆料

## 四、应用场景说明

- 方案设计前的"先人经验"检索：先看同类规模的公司怎么做，再决定自研还是复用
- 故障复盘与 SRE 知识建设：事故复盘章节可直接作为内部案例库的种子材料
- 技术分享选题库：按主题挑一篇工程博客做深度解读
- 与 [system-design-primer.md](system-design-primer.md) 配合：Primer 建立框架，本库补充真实工程细节

## 五、个人评价

### 优势

1. 人工筛选质量高，几乎没有充数条目，检索效率远高于泛泛的 awesome 列表
2. 覆盖"稳定性/可用性"这类真实生产最关心但资料最零散的维度
3. MIT 许可，索引结构可直接被内部知识库借用

### 不足

1. 只有链接和标题，缺少一句话摘要，需要点开才知道是否相关
2. 外链存在失效（大厂博客改版/下线）的长期风险，没有快照机制
3. 云原生与 AI 基础设施类新主题占比偏低，重心仍是传统大规模 Web 架构

### 评分理由

5 星：真实工程案例检索的最佳入口，与 Primer 构成"框架 + 案例"的完整学习闭环（⭐73.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/binhnguyennus/awesome-scalability |

### 关联项目

- [system-design-primer.md](system-design-primer.md)
- [system-design-101.md](system-design-101.md)
- [chaos-mesh.md](chaos-mesh.md)
