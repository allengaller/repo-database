---
name: VectifyAI/PageIndex
url: https://github.com/VectifyAI/PageIndex
domain: ai-engineering
type: framework
languages: [Python]
stars: 13800
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [vectorless-rag, reasoning-rag, document-index, page-index, rag, reasoning-based-retrieval]
summary: 📑 抛弃向量数据库的"无向量" RAG — 基于推理的文档索引，13.8k stars，向 RAG 引入 PageIndex 树结构，推理检索胜过传统向量检索
---

# PageIndex · 抛弃向量数据库的"无向量" RAG

> 收录日期：2026-08-04
> 仓库：https://github.com/VectifyAI/PageIndex
> 来源：2026-02-22 GitHub Trending 日榜第 2 位（与 GitNexus 同日上榜）

**一句话核心总结**：PageIndex 是 VectifyAI 开源的"无向量"（Vectorless）文档 RAG 框架——把文档索引成树状结构（PageIndex），通过推理而非相似度检索，挑战传统向量数据库 + Embedding 的 RAG 范式。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | PageIndex |
| **仓库地址** | https://github.com/VectifyAI/PageIndex |
| **所属组织/作者** | VectifyAI |
| **描述** | 📑 PageIndex: Document Index for Vectorless, Reasoning-based RAG |
| **开源许可** | MIT |
| **Star 数** | ~13,800 |
| **周新增** | +3,051 |
| **技术类型** | framework |

---

## 二、核心创新

### 2.1 抛弃向量数据库

传统 RAG 依赖向量数据库 + Embedding 检索，搭建与维护成本较高。PageIndex 采用 **"无向量、基于推理"** 的检索方式，无需向量数据库，**通过逻辑推理**实现精准的文档检索与上下文匹配。

### 2.2 树状结构 + 推理检索

文档被索引成 **PageIndex 树**——保留文档的逻辑结构（章节、段落、页码），检索时通过推理遍历树而非向量相似度匹配。

### 2.3 适用场景优势

- **长文档分析**（法律合同、研究报告）—— 树结构保留章节关系
- **需要精确引用** —— 推理检索能定位到具体页码/章节
- **可解释性要求高** —— 推理路径可审计，不像向量相似度是黑盒
- **降低基础设施成本** —— 无需向量数据库

---

## 三、关键能力

- 文档结构感知（章节、段落层级）
- 推理驱动检索（非相似度匹配）
- 可定位到具体页码/章节
- 轻量基础设施依赖
- 与 LLM 推理能力深度结合

---

## 四、与同类项目对比

| 框架 | 检索机制 | 数据库依赖 | 适用场景 |
|------|----------|------------|----------|
| **PageIndex** | 推理 + 树遍历 | 无 | 长文档、需精确引用 |
| HippoRAG (catalog 已收) | 海马体记忆索引 + 向量 | PGVector 等 | 神经科学启发 |
| RAG-Anything (catalog 已收) | 多模态向量 | 向量数据库 | 多模态文档 |
| 传统 RAG | 向量相似度 | 向量数据库 | 通用场景 |

**PageIndex 的位置**：不依赖向量数据库的"无向量" RAG 范式。

---

## 五、应用场景

- **法律合同分析** —— 精确到条款检索
- **学术论文综述** —— 章节级精确定位
- **企业文档问答** —— 降低基础设施成本
- **金融报告分析** —— 复杂结构化文档的推理检索

---

## 六、个人评价

### 优势

1. **范式创新** —— 挑战向量数据库垄断地位，提供"无向量"替代
2. **可解释性强** —— 推理路径可审计，适合监管场景
3. **基础设施轻** —— 无需向量数据库，部署简单
4. **长文档友好** —— 树结构保留文档逻辑

### 不足

1. **依赖 LLM 推理** —— 每次检索调用 LLM，成本与延迟
2. **文档结构依赖** —— 非结构化文本效果待验证
3. **生态相对小** —— 与 LangChain/LlamaIndex 相比，集成较少
4. **评估标准不统一** —— "推理检索胜过向量" 的对比需更多基准

### 评分理由

**4 星（active）** —— 范式创新（无向量 RAG）+ 可解释性优势 + 基础设施轻量。唯独"LLM 调用成本、文档结构依赖、生态成熟度"需关注。

---

## 七、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/VectifyAI/PageIndex |

### 关联项目

- [hipporag.md](hipporag.md) — 神经科学启发 RAG
- [rag-anything.md](rag-anything.md) — 多模态 RAG
- [haystack.md](haystack.md) — 经典 RAG 编排框架
- [fastmcp.md](fastmcp.md) — MCP 服务器/客户端框架
