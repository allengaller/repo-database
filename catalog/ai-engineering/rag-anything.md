---
name: HKUDS/RAG-Anything
url: https://github.com/HKUDS/RAG-Anything
domain: ai-engineering
type: framework
languages: [Python]
stars: 22479
forks: 2617
license: MIT
discovered: 2026-07-29
updated: 2026-07-30
rating: 4
status: active
tags: [rag, multimodal, document-parsing]
summary: HKUDS 出品的 All-in-One 多模态 RAG 框架，统一处理文本/图表/公式/表格
---

# RAG-Anything · All-in-One 多模态 RAG 框架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | RAG-Anything |
| **仓库地址** | https://github.com/HKUDS/RAG-Anything |
| **所属组织/作者** | HKUDS（香港大学数据智能实验室） |
| **描述** | HKUDS 出品的 All-in-One 多模态 RAG 框架，统一处理文本/图表/公式/表格 |
| **开源许可** | MIT |
| **Star 数** | 22,463（截至 2026-07） |
| **Fork 数** | 2,618 |
| **技术类型** | framework |

## 二、技术栈分析

- Python，基于同实验室 LightRAG 的图增强检索内核
- 集成 MinerU 等文档解析器，PDF/Office/图片全格式入库
- 多模态内容（图片、表格、公式）独立建模后融入统一知识图谱

## 三、核心功能特性

1. **端到端管道**：解析→分块→图谱构建→混合检索→生成一条龙
2. **多模态理解**：图表与公式不再被当作噪声丢弃，而是结构化入图
3. **知识图谱增强**：实体关系抽取提升跨文档推理能力

## 四、应用场景说明

- 论文库、财报、扫描档案等复杂文档的问答系统
- 数字人文场景（古籍扫描件多模态检索）与本库 culture-arts 领域存在潜在交叉

## 五、个人评价

### 优势

1. 多模态 RAG 一站式方案稀缺，HKUDS 系列迭代活跃
2. 与 LightRAG 同源，图检索效果有论文支撑

### 不足

1. 重管道设计，轻量场景部署成本偏高
2. 解析质量依赖上游 MinerU，对低质扫描件仍有局限

### 评分理由

4 星：多模态 RAG 的领先开源实现，适合作为复杂文档问答的首选底座（⭐22.5k，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/HKUDS/RAG-Anything |
| **LightRAG（同门内核）** | https://github.com/HKUDS/LightRAG |

### 关联项目

- [hipporag.md](hipporag.md)
- [haystack.md](haystack.md)
- [../ai-agents/nanobot.md](../ai-agents/nanobot.md)
