---
name: deepset-ai/haystack
url: https://github.com/deepset-ai/haystack
domain: ai-engineering
type: framework
languages: [Python]
stars: 26067
forks: 2965
license: Apache-2.0
discovered: 2026-07-29
updated: 2026-07-30
rating: 5
status: active
tags: [rag, llm, orchestration, production]
summary: deepset 出品的 AI 编排框架，生产验证最充分的 RAG/管道框架之一
---

# haystack · 生产级 LLM 应用编排框架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | haystack |
| **仓库地址** | https://github.com/deepset-ai/haystack |
| **所属组织/作者** | deepset-ai（德国 NLP 公司 deepset） |
| **描述** | deepset 出品的 AI 编排框架，生产验证最充分的 RAG/管道框架之一 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 26,051（截至 2026-07） |
| **Fork 数** | 2,961 |
| **技术类型** | framework |

## 二、技术栈分析

- Python，组件（Component）+ 管道（Pipeline）的有向图架构，管道可序列化为 YAML
- 模型/向量库全解耦：OpenAI、Hugging Face、Elasticsearch、Weaviate、pgvector 等适配齐全
- 2.x 重写后强调类型化组件接口与可插拔性

## 三、核心功能特性

1. **显式管道图**：数据流一目了然，比链式调用更易调试与审计
2. **组件生态**：检索器/重排器/生成器/评估器均为标准组件，可自由拼装
3. **生产特性**：流水线部署（Hayhooks）、可观测、评估集成

## 四、应用场景说明

- 企业级 RAG 与语义搜索系统的主干框架
- 需要长期维护、多人协作的 LLM 管道（YAML 化管道利于版本管理）

## 五、个人评价

### 优势

1. 自 2019 年迭代至今，生产案例与社区沉淀深厚
2. 架构清晰克制，没有过度魔法

### 不足

1. 显式管道的样板代码多于『三行 demo』型框架，上手曲线略陡

### 评分理由

5 星：RAG 框架里工程成熟度的天花板，重要基础设施档案（⭐26.1k，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/deepset-ai/haystack |
| **官方文档** | https://haystack.deepset.ai |

### 关联项目

- [rag-anything.md](rag-anything.md)
- [hipporag.md](hipporag.md)
