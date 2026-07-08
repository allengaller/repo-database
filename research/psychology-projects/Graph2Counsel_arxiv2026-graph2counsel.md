# Graph2Counsel · 基于客户心理图谱的合成咨询对话生成

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Graph2Counsel |
| **仓库地址** | https://github.com/UKPLab/arxiv2026-graph2counsel |
| **所属组织** | UKP Lab / TU Darmstadt（达姆施塔特工业大学） |
| **描述** | 基于客户心理图谱（CPG）生成临床落地的合成心理咨询会话 |
| **论文发表** | 2026 arXiv 论文 |
| **联系人** | Aishik Mandal（UKP Lab） |
| **Star 数** | 搜索时未显示具体数值（学术项目） |
| **Fork 数** | 同上 |

---

## 二、技术栈分析

### 核心技术栈

- **推理与评估环境**：Python 虚拟环境 + `requirements_inf_eval.txt`
- **QLoRA 微调环境**：独立 Python 环境 + `requirements_qlora.txt`
- **分布式训练**：DeepSpeed（多 GPU QLoRA 微调）
- **推理引擎**：vLLM（高性能 LLM 推理）
- **LLM 框架**：HuggingFace Transformers + LangChain
- **基础模型**：Llama3-8B-Instruct（QLoRA 微调）
- **数据托管**：HuggingFace + TUdatalib

### 核心概念：客户心理图谱（CPG）

```
CPG = 知识图谱三元组集合
结构：(process_i, relation, process_j)
     ↓
     process = 客户的认知/情绪/行为
     relation = 之间的结构化关系
     ↓
     确保心理一致性 across 生成的会话
```

### 仓库结构

```
graph2counsel/
├── prompts_system_user/              # 系统与用户提示词
├── Graph_Dicts.ipynb                 # 从 CPG 构建 KG 三元组
├── client_profile_generation/        # 客户档案生成脚本
├── therapist_strategies_summary.csv  # 从真实咨询中提取的咨询师策略
├── configurations/                   # 生成配置实验
│   └── gc_cpg_profile_expanded.py    # 最终数据集生成（最优配置）
├── LLM_judge_evaluation/             # CTRS 和 WAI 的 LLM-as-Judge 评估
├── faithfulness_evaluation/          # 会话对 CPG 输入的忠实度评估
├── qlora_prompts/                    # QLoRA 微调提示词
├── create_qlora_fine-tuning_datasets.ipynb  # 准备 QLoRA 数据集
├── graph2counsel_qlora.py            # 在 Graph2Counsel 数据上微调
├── sqpconv_qlora.py                  # 在 SQPsychConv 数据上微调
├── magnet_qlora.py                   # 在 MAGneT 数据上微调
├── CounselBench/                     # CounselBench 下游评估
├── CounselingBench/                  # CounselingBench 下游评估
├── requirements_inf_eval.txt
└── requirements_qlora.txt
```

---

## 三、核心功能特性

### 1. 结构化心理表征

Graph2Counsel 的核心创新是**客户心理图谱（CPG）**——一种编码客户思想、情绪和行为之间关系的结构化知识图谱。与传统的非结构化文本输入不同，CPG 确保了生成会话的心理一致性。

### 2. 三种输入表征

| 表征方式 | 描述 |
|---------|------|
| **CPG** | 结构化知识图谱，编码客户认知-情绪-行为关系 |
| **Client Profile** | 从 CPG 生成的多样化客户档案，模拟不同背景和问题 |
| **CPG + Profile** | 两者结合（实验证明为最优配置） |

### 3. 四种提示策略

| 策略 | 描述 |
|------|------|
| **Base** | 直接用输入提示 LLM 生成会话 |
| **GC（Guided Counseling）** | 从论文中提取咨询师策略，用于指导生成 |
| **GC + CoT** | 在 GC 基础上增加 Chain-of-Thought 推理 |
| **GC + MA** | Multi-Agent 反馈：一个 Agent 生成、另一个 Agent 批判并反馈 |

### 4. 双重评估体系

**LLM-as-Judge 优化评估**：
- **CTRS**（认知治疗评分量表）：衡量通用和 CBT 特定咨询技能
- **WAI**（工作联盟量表）：衡量治疗师-来访者治疗联盟质量

**下游评估**：
- **Faithfulness**：生成会话对输入 CPG 的忠实度
- **CounselBench / CounselingBench**：QLoRA 微调后的基准测试

### 5. 数据集规模

- 从 76 个 CPG 生成 **760 个会话**
- 跨越多样化客户档案
- 专家评估中在特异性、咨询师能力、真实性、对话流畅度和安全性上优于先前数据集
- 标注者间一致性：Krippendorff's α = 0.70

---

## 四、应用场景说明

### 学术研究
- **合成数据生成**：解决心理咨询数据隐私受限导致的稀缺问题
- **LLM 微调**：用合成数据 QLoRA 微调开源模型，提升心理咨询能力
- **评估方法学研究**：CTRS/WAI 的 LLM-as-Judge 自动化评估范式

### 工业应用
- **训练数据工厂**：为心理健康 AI 产品提供高质量训练数据
- **咨询质量评估**：自动评估咨询师对话质量
- **心理图谱建模**：将来访者认知-情绪-行为关系结构化，用于个性化干预

### 心力教练项目关联
- CPG 的"认知-情绪-行为"三元组与唯识学"心所-心王-心所"结构具有同构性
- GC+MA 的多智能体反馈机制可用于心力教练 AI 的自我审计
- CTRS/WAI 评估体系可直接用于教练对话质量评估

---

## 五、优缺点评价

### 优势

1. **结构化创新**：CPG 是心理咨询数据生成领域的范式创新，解决了非结构化输入导致的心理不一致问题
2. **评估严谨**：CTRS + WAI + Faithfulness 三维评估体系，含专家标注验证
3. **可复现性**：完整的 10 步复现指南，从 CPG 构建到下游评估
4. **数据集丰富**：与 CACTUS、SQPsychConv、MAGneT 等多个数据集对比
5. **学术背书**：TU Darmstadt UKP Lab（NLP 领域顶级实验室）
6. **专家验证**：Krippendorff's α = 0.70 的标注者间一致性

### 不足

1. **数据规模有限**：76 个 CPG → 760 个会话，相比工业级需求仍然偏小
2. **计算门槛高**：QLoRA 微调需要多 GPU + DeepSpeed
3. **依赖闭源 LLM**：生成合成数据依赖 GPT-4 等闭源模型
4. **CPG 构建成本**：需要人工构建客户心理图谱，难以大规模自动化
5. **语言局限**：主要面向英文场景
6. **安全边界**：合成数据可能包含不准确的心理评估，需人工审核

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **论文** | [Graph2Counsel: Clinically Grounded Synthetic Counseling Dialogue Generation from Client Psychological Graphs](https://arxiv.org/abs/2604.20382) |
| **项目仓库** | https://github.com/UKPLab/arxiv2026-graph2counsel |
| **数据集下载** | HuggingFace + TUdatalib |
| **UKP Lab** | https://www.informatik.tu-darmstadt.de/ukp/ukp_home/ |
| **对比数据集** | CACTUS (HuggingFace), SQPsychConv (HuggingFace), MAGneT (HuggingFace/TUdatalib) |
| **评估基准** | CounselBench-Eval (HuggingFace), CounselBench-Adv (HuggingFace), CounselingBench (HuggingFace) |

### 引用格式

```bibtex
@misc{mandal2026graph2counselclinicallygroundedsynthetic,
  title={Graph2Counsel: Clinically Grounded Synthetic Counseling Dialogue Generation from Client Psychological Graphs},
  author={Aishik Mandal and Hiba Arnaout and Clarissa W. Ong and Juliet Bockhorst and Kate Sheehan and Rachael Moldow and Tanmoy Chakraborty and Iryna Gurevych},
  year={2026},
  eprint={2604.20382},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2604.20382}
}
```

### 关联项目

- **CACTUS**：基于 CBT 的心理咨询对话生成（EMNLP Findings 2024）
- **SQPsychConv**：心理学对话数据集
- **MAGneT**：心理健康咨询数据集
- **PsyLLM**：诊断-治疗一体化心理 LLM（本系列另一项目）

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebFetch 抓取
