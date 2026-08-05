---
name: OSU-NLP-Group/HippoRAG
url: https://github.com/OSU-NLP-Group/HippoRAG
domain: ai-engineering
type: framework
languages: [Python]
stars: 3898
forks: 416
license: MIT
discovered: 2026-07-29
updated: 2026-07-30
rating: 4
status: active
tags: [rag, knowledge-graph, neuroscience, paper]
summary: 受海马体记忆索引理论启发的 RAG 框架（NeurIPS'24），神经科学 × LLM 检索的交叉代表
---

# HippoRAG · 海马体记忆理论启发的长期记忆 RAG

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | HippoRAG |
| **仓库地址** | https://github.com/OSU-NLP-Group/HippoRAG |
| **所属组织/作者** | OSU-NLP-Group（俄亥俄州立大学 NLP 组） |
| **描述** | 受海马体记忆索引理论启发的 RAG 框架（NeurIPS'24），神经科学 × LLM 检索的交叉代表 |
| **开源许可** | MIT |
| **Star 数** | 3,895（截至 2026-07） |
| **Fork 数** | 416 |
| **技术类型** | framework |

## 二、技术栈分析

- Python，OpenIE 抽取三元组构建知识图谱 + Personalized PageRank 检索
- 模拟海马体记忆索引理论：新皮层（LLM）与海马体（KG 索引）分工
- NeurIPS 2024 论文配套官方实现，HippoRAG 2 持续演进

## 三、核心功能特性

1. **单步多跳检索**：PPR 图游走天然支持多跳关联，无需迭代式检索
2. **知识整合**：新知识增量并入图谱，模拟人类持续学习
3. **可解释性**：检索路径即图谱路径，比纯向量检索更可审计

## 四、应用场景说明

- 多跳问答、需要跨文档关联推理的知识库
- 认知科学 × AI 交叉研究的范例——与本库 mind-philosophy 领域（唯识记忆建模如 alaya）形成有趣互文

## 五、个人评价

### 优势

1. 认知理论驱动的架构设计，学术与工程双重价值
2. 多跳检索基准显著优于传统 RAG，论文可复现

### 不足

1. 图构建成本高（每文档 OpenIE 抽取），大规模语料入库慢

### 评分理由

4 星：神经科学启发式 RAG 的代表作，与本库心智建模主线高度相关（⭐3.9k，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/OSU-NLP-Group/HippoRAG |
| **NeurIPS'24 论文** | https://arxiv.org/abs/2405.14831 |

### 关联项目

- [rag-anything.md](rag-anything.md)
- [../mind-philosophy/alaya.md](../mind-philosophy/alaya.md)
