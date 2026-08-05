---
name: hsc748NLP/SikuBERT-for-digital-humanities-and-classical-Chinese-information-processing
url: https://github.com/hsc748NLP/SikuBERT-for-digital-humanities-and-classical-Chinese-information-processing
domain: culture-arts
type: model
languages: []
stars: 168
forks: 17
license: Apache-2.0
discovered: 2026-07-29
updated: 2026-07-29
rating: 4
status: active
tags: [chinese, bert, classical-chinese, nlp, digital-humanities]
summary: SikuBERT：基于《四库全书》语料的古文预训练语言模型，古典中文 NLP 的基础设施
---

# SikuBERT · 四库全书预训练语言模型

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | SikuBERT-for-digital-humanities-and-classical-Chinese-information-processing |
| **仓库地址** | https://github.com/hsc748NLP/SikuBERT-for-digital-humanities-and-classical-Chinese-information-processing |
| **所属组织/作者** | hsc748NLP（南京农业大学信息管理学院团队） |
| **描述** | SikuBERT：基于《四库全书》语料的古文预训练语言模型，古典中文 NLP 的基础设施 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 168（截至 2026-07） |
| **Fork 数** | 17 |
| **技术类型** | model |

## 二、技术栈分析

- BERT/RoBERTa 架构，在《四库全书》高质量古文语料上继续预训练
- 提供 SikuBERT 与 SikuRoBERTa 两个版本，Hugging Face 可直接加载
- 配套古文分词、词性标注、断句、实体识别等下游任务基线

## 三、核心功能特性

1. **古文语言理解基座**：面向文言文的分词/断句/NER 显著优于通用中文模型
2. **学术开放**：模型权重与论文公开，已成古典中文 NLP 论文的常用 baseline

## 四、应用场景说明

- 古籍数字化管线中的自动断句、标点、实体抽取
- 与 [chinese-poetry](chinese-poetry.md) 数据集组合可做诗词语言分析；是 AI × 文化遗产交叉的核心基础设施

## 五、个人评价

### 优势

1. 垂直语料预训练的价值明确，填补古文 NLP 基座空白
2. 国内数字人文学界实际采用度高

### 不足

1. BERT 体系在 LLM 时代显得传统，生成式古文任务需另寻方案
2. 仓库工程化程度一般（偏学术代码发布）

### 评分理由

4 星：古典中文信息处理的事实基座模型，AI × 数字人文交叉的代表性沉淀（⭐168，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/hsc748NLP/SikuBERT-for-digital-humanities-and-classical-Chinese-information-processing |
| **Hugging Face 模型** | https://huggingface.co/SIKU-BERT/sikubert |

### 关联项目

- [chinese-poetry.md](chinese-poetry.md)
- [awesome-digital-humanities.md](awesome-digital-humanities.md)
