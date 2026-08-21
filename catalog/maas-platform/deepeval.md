---
name: confident-ai/deepeval
url: https://github.com/confident-ai/deepeval
domain: maas-platform
type: framework
languages: [Python]
stars: 17747
forks: 1829
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [llm-evaluation, testing, rag-metrics, pytest, llmops]
summary: 像 pytest 一样写 LLM 单元测试的评估框架，内置 RAG 与 Agent 指标可直接进 CI
---

# DeepEval · LLM 应用的单元测试框架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | DeepEval |
| **仓库地址** | https://github.com/confident-ai/deepeval |
| **所属组织/作者** | Confident AI（开源框架 + 商业观测平台） |
| **描述** | 像 pytest 一样写 LLM 单元测试的评估框架，内置 RAG 与 Agent 指标可直接进 CI |
| **开源许可** | Apache-2.0 |
| **Star 数** | 17,747（截至 2026-08） |
| **Fork 数** | 1,829 |
| **技术类型** | framework |

## 二、技术栈分析

- Python，API 设计刻意贴近 pytest：`assert_test(test_case, [metric])` + `deepeval test run`
- 指标分三类实现：统计式（BLEU/ROUGE）、模型式（NLI/交叉编码器）、LLM-as-a-judge（可换任意评判模型）
- 核心数据结构 `LLMTestCase`（input / actual_output / expected_output / retrieval_context / tools_called）
- 评判模型可指向自建 OpenAI 兼容端点，评测可完全在内网闭环
- 支持红队测试（DeepTeam）与合成数据生成，覆盖安全与数据构造场景

## 三、核心功能特性

1. **RAG 四件套指标**：answer relevancy、faithfulness、contextual precision/recall，定位"检索差还是生成差"
2. **Agent 指标**：task completion、tool correctness，评估多步执行而不只是最终文本
3. **G-Eval 自定义指标**：用自然语言描述评分标准即可生成可复用 metric，适配业务专属判据
4. **CI 集成**：测试即代码，模型/提示词变更走 PR 门禁，防止提示词回退
5. **数据集与批量评测**：支持并发执行与缓存，大规模回归的耗时可控

## 四、应用场景说明

- 提示词与模型升级的回归门禁：改动前后跑同一套 test case，避免"改好了一个场景、坏了三个"
- 工单/运维智能体的质量基线：把典型工单构造成 dataset，用 tool correctness 校验工具调用链
- RAG 系统调优：先用 contextual recall 判断检索召回，再看 faithfulness 判断生成幻觉
- 与 [langfuse.md](langfuse.md) 互补：Langfuse 收集线上 trace 与 bad case，DeepEval 在 CI 里把它们变成断言

## 五、个人评价

### 优势

1. pytest 心智模型让工程团队几乎零学习成本接入评测
2. 指标覆盖从 RAG 到 Agent 到安全红队，是开源里最完整的评估指标库之一
3. 评判模型可换成自建端点，成本与合规都可控

### 不足

1. LLM-as-a-judge 指标本身有方差，阈值需要按业务标定，否则 CI 会出现随机失败
2. 评测成本随 test case 数量线性增长，大规模回归需要认真做采样与缓存
3. 部分高级能力与 Confident AI 云平台绑定，纯开源使用体验略打折

### 评分理由

4 星：LLM 评估方向工程化程度最高的开源框架，是把"模型效果"纳入 CI 的现成答案（⭐17.7k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/confident-ai/deepeval |
| **官方文档** | https://deepeval.com/docs/getting-started |

### 关联项目

- [langfuse.md](langfuse.md)
- [litellm.md](litellm.md)
- [../ai-engineering/rag-anything.md](../ai-engineering/rag-anything.md)
