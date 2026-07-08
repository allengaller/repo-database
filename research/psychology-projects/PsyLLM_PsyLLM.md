# PsyLLM · 超越共情：整合诊断与治疗推理的心理 LLM

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | PsyLLM (Beyond Empathy) |
| **仓库地址** | https://github.com/Emo-gml/PsyLLM |
| **所属组织** | Emo-gml |
| **描述** | 首个显式整合诊断推理与治疗推理的大语言模型，面向心理健康咨询与对话生成 |
| **创建时间** | 2025-10-21（项目网站创建） |
| **最新动态** | 2026-04-19 在 PSYCHEPASS 基准上达到领域专用模型 SOTA |
| **开源许可** | 仅限研究与教育用途 |
| **Star 数** | 搜索时未显示具体数值（新项目，持续增长中） |
| **Fork 数** | 同上 |

---

## 二、技术栈分析

### 核心技术

- **基础模型框架**：基于 HuggingFace Transformers 生态
- **训练框架**：LLaMA-Factory（开源 LLM 微调框架）
- **模型权重托管**：HuggingFace（`GMLHUHE/PsyLLM`）
- **推理方式**：支持 `enable_thinking=True` 的思维链推理，最大输出 32768 tokens
- **推理框架**：Transformers `AutoModelForCausalLM` + `device_map="auto"` 自动分布式

### 训练数据集

- **数据集名称**：OpenR1-Psy
- **数据来源**：基于三个公开 Reddit 数据集（LRF、Identifying Depression、Dreaddit），严格遵循原始许可证
- **数据特色**：包含多轮咨询对话，附带显式推理轨迹（reasoning traces），基于 DSM/ICD 诊断标准和 CBT/ACT/精神动力学等多元治疗框架

### 架构特点

```
用户输入 → 诊断推理（DSM/ICD 评估）→ 治疗推理（CBT/ACT/精神动力学策略选择）→ 临床落地的咨询回应
```

PsyLLM 与传统 LLM 心理对话系统的核心区别在于其**双轨推理架构**：
1. **诊断推理**（Diagnostic Reasoning）：评估症状、应用国际诊断标准（DSM/ICD）
2. **治疗推理**（Therapeutic Reasoning）：选择适合的治疗策略（CBT、ACT、精神动力学、人本主义）

---

## 三、核心功能特性

### 1. 诊断-治疗一体化推理
不同于传统仅提供共情或表层回应的系统，PsyLLM 模拟专业治疗师的推理过程：先评估症状，再选择治疗策略，最后生成临床落地的咨询对话。

### 2. 多元治疗范式融合
- **CBT**（认知行为疗法）：识别和重构认知扭曲
- **ACT**（接纳承诺疗法）：心理灵活性与价值导向行动
- **精神动力学**（Psychodynamic）：探索无意识冲突
- **人本主义**（Humanistic）：无条件积极关注

### 3. 思维链输出
模型支持 `enable_thinking=True` 参数，输出中包含完整的推理过程（thinking content），可用于审计、调试和教学。

### 4. HuggingFace 开源
模型权重和训练数据集均已在 HuggingFace 开源，支持 `AutoModelForCausalLM.from_pretrained("GMLHUHE/PsyLLM")` 直接加载。

---

## 四、应用场景说明

### 直接应用
- **AI 辅助心理咨询**：作为人类治疗师的辅助工具，提供初步评估和治疗建议
- **心理健康教育**：演示诊断推理和治疗推理过程，用于心理学教学
- **研究基准**：作为心理健康 NLP 研究的基线模型

### 潜在应用
- **心理健康筛查**：集成到心理健康平台中提供初步评估
- **教练 AI 系统**：为心力教练等新兴领域提供诊断-治疗一体化能力
- **数字孪生治疗师**：作为治疗师数字孪生的基础模型

### 伦理边界
> 项目明确声明：仅供研究与教育用途，不替代专业心理健康护理。需遵守心理健康 AI 研究的伦理和法律标准。

---

## 五、优缺点评价

### 优势

1. **首创性**：首个显式整合诊断推理与治疗推理的心理 LLM，填补了领域空白
2. **临床落地**：基于 DSM/ICD 国际诊断标准，不是简单的共情对话
3. **多元治疗**：融合 CBT/ACT/精神动力学等多种治疗范式，不局限于单一流派
4. **可解释性**：思维链输出提供了推理过程的可审计性
5. **开源生态**：模型权重+训练数据+推理代码全部开源
6. **SOTA 性能**：2026-04 在 PSYCHEPASS 基准上达到领域专用模型最佳

### 不足

1. **数据来源局限**：训练数据基于 Reddit 帖子，与真实临床场景存在差距
2. **伦理风险**：心理健康 AI 的安全边界问题仍然存在，特别是高风险场景
3. **缺乏临床试验**：目前未见临床试验验证数据
4. **语言局限**：主要面向英文场景，中文支持能力未知
5. **模型规模**：具体参数量未在 README 中明确说明
6. **依赖外部框架**：训练依赖 LLaMA-Factory，推理依赖 Transformers，独立性有限

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **论文** | [Beyond Empathy: Integrating Diagnostic and Therapeutic Reasoning with Large Language Models for Mental Health Counseling](https://arxiv.org/abs/2505.15715) |
| **项目仓库** | https://github.com/Emo-gml/PsyLLM |
| **模型权重** | https://huggingface.co/GMLHUHE/PsyLLM |
| **训练数据集** | OpenR1-Psy（HuggingFace） |
| **训练框架** | [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) |
| **联系邮箱** | huhe@gml.ac.cn |

### 引用格式

```bibtex
@article{hu2025beyond,
  title={Beyond Empathy: Integrating Diagnostic and Therapeutic Reasoning with Large Language Models for Mental Health Counseling},
  author={Hu, He and Zhou, Yucheng and Si, Juzheng and Wang, Qianning and Zhang, Hengheng and Ren, Fuji and Ma, Fei and Cui, Laizhong},
  journal={arXiv preprint arXiv:2505.15715},
  year={2025}
}
```

### 与心力教练项目的关联

PsyLLM 的诊断-治疗双轨推理架构与心力教练项目中"唯识八识 → 认知评估 → 干预策略"的三层架构高度契合。其 DSM/ICD 诊断标准可作为心力教练 AI 系统的"临床安全护栏"，而 CBT/ACT 等治疗范式可作为"干预工具箱"的基础。

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebFetch 抓取
