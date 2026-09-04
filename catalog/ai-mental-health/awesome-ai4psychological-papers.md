---
name: DreamH1gh/Awesome-AI4Psychological-Papers
url: https://github.com/DreamH1gh/Awesome-AI4Psychological-Papers
domain: ai-mental-health
type: awesome-list
languages: []
stars: 3
forks: 1
license: unknown
discovered: 2026-07-08
updated: 2026-07-30
rating: 4
status: active
tags: [papers, psychology, llm]
summary: AI 驱动心理计算的论文与数据集综合索引（2019-2026，覆盖 100+ 数据集）
---

# Awesome-AI4Psychological-Papers · AI 驱动心理计算综合综述

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Awesome-AI4Psychological-Papers |
| **仓库地址** | https://github.com/DreamH1gh/Awesome-AI4Psychological-Papers |
| **所属组织** | DreamH1gh |
| **描述** | AI 驱动心理计算的综合论文列表，配套 2026 综述论文 |
| **论文发表** | arXiv 2026 |
| **开源许可** | 未明确标注（Awesome List 惯例为 MIT） |
| **Star 数** | 搜索时未显示具体数值（截至 2026-07） |
| **Fork 数** | 同上 |

---

## 二、技术栈分析

### 项目性质

本项目是一个**学术综述配套的 Awesome List**，不包含可执行代码，而是系统性地整理了 AI 驱动心理计算领域的论文和数据集。

### 综述论文

**标题**：From Pre-trained Models to Large Language Models: A Comprehensive Survey of AI-Driven Psychological Computing

**作者**：Huiyao Chen, Ruimeng Liu, Yan Luo, Jiawen Zhang, Meishan Zhang, Baotian Hu, Min Zhang

**arXiv ID**：2604.03259

### 任务分类体系

```
AI 驱动心理计算
├── Classification & Regression（分类与回归）
│   ├── PLM-based Papers
│   └── LLM-based Papers
├── Structured Relational（结构化关系）
│   ├── PLM-based Papers
│   └── LLM-based Papers
└── Generative & Interactive（生成式与交互式）
    ├── PLM-based Papers
    └── LLM-based Papers
```

### 计算框架

综述定义了四种基本任务类型：

| 任务类型 | 输出空间 | 典型应用 | 网络架构 |
|---------|---------|---------|---------|
| **分类** | 离散心理类别 | 抑郁/焦虑/人格类型识别 | Softmax 层 |
| **回归** | 连续严重程度/特质分数 | PHQ-9 分数/IQ 估计 | 线性输出层 |
| **结构化关系** | 结构化元组（实体,关系,实体） | 症状网络/知识图谱/发展时间线 | GNN/LLM 推理 |
| **生成式交互** | 动态内容 | 个性化治疗推荐/咨询对话 | 上下文响应合成 Yₜ = f(xₜ, hₜ₋₁) |

---

## 三、核心功能特性

### 1. 全面覆盖的论文列表

综述系统性整理了从 2019 年到 2026 年的论文：

- **PLM 时代论文**：BERT/RoBERTa/ViT/Wav2Vec2 等预训练模型在心理学中的应用
- **LLM 时代论文**：GPT-4/Llama/Qwen 等大语言模型在心理学中的应用

### 2. 四大任务分类

#### Classification & Regression（分类与回归）

**PLM-based 代表论文**：
- MentalBERT（LREC 2022）：心理健康领域预训练语言模型
- PsychBERT（BIBM 2021）：社交媒体心理健康行为分析
- BioBERT（Bioinformatics 2019）：生物医学文本挖掘

**LLM-based 代表论文**：
- Cognitive-Mental-LLM（arXiv 2026-01）：LLM 心理健康预测推理评估
- MDD-LLM（arXiv 2025-04）：重度抑郁障碍诊断 LLM
- MentalGLM 系列（EMNLP 2025-11）：中文社交媒体心理健康可解释 LLM

#### Structured Relational（结构化关系）

**LLM-based 代表论文**：
- LLM 驱动的心理健康知识图谱构建（Nature Communications 2025-08）
- 认知网络揭示 STEM 心智差异（arXiv 2025-02）
- AI 增强的 CBT：从社交媒体文本提取认知路径（arXiv 2024-04）

#### Generative & Interactive（生成式与交互式）

**LLM-based 代表论文**：
- PsychAdapter（npj AI 2026-03）：让 LLM 反映人格特质和心理健康
- HopeBot（arXiv 2026-01）：LLM 聊天机器人用于 PHQ-9 抑郁筛查
- AutoCBT（arXiv 2025-01）：自主多智能体 CBT 框架
- PsyDT（ACL 2025-07）：LLM 构建心理咨询师数字孪生

### 3. 完整的数据集索引

综述整理了四大类数据集：

| 类别 | 典型数据集 | 规模范围 |
|------|-----------|---------|
| **分类数据集** | DAIC, RSDD, EATD, CLPsych | 32 ~ 116,484 参与者 |
| **回归数据集** | AffectNet, IEMOCAP, myPersonality | 28 ~ 6,000,000+ 参与者 |
| **结构化数据集** | 社交网络, 人格网络, APD 网络 | 38 ~ 14.7M 帖子 |
| **交互数据集** | ESConv, PsyQA, CACTUS, SoulChat | 1,053 ~ 2.3M 对话 |

### 4. 数据集组织框架

```
数据集光谱（从受控到自然主义）
├── Clinical & Laboratory（临床与实验室）
│   └── 专家验证标签，小样本（数十到数百）
├── Longitudinal Multi-Site（纵向多站点）
│   └── 数月/数年重复测量，数百到数万参与者
├── Ecological & Naturalistic（生态与自然主义）
│   └── 社交媒体/手机传感器/可穿戴设备，数千到数百万
└── Specialized & Task-Specific（专用与任务特定）
    └── 独特模态组合，用于特定研究问题
```

---

## 四、应用场景说明

### 学术研究
- **文献综述参考**：快速了解 AI 心理计算领域全貌
- **论文写作引用**：综述本身可作为引用来源
- **研究方向定位**：通过任务分类体系找到研究空白

### 工业应用
- **数据集选型**：根据任务类型和数据规模选择合适的训练数据
- **技术路线规划**：了解 PLM vs LLM 在不同任务上的优劣
- **合规参考**：数据集的隐私和许可信息辅助合规决策

### 心力教练项目关联
- **任务分类体系**：心力教练 AI 的"评估 → 干预 → 反馈"流程可映射到四类任务
- **数据集参考**：SoulChat、CACTUS、ESConv 等中文/双语数据集可用于训练
- **LLM 论文参考**：AutoCBT、PsyDT 等论文为心力教练 AI 架构提供参考

---

## 五、优缺点评价

### 优势

1. **覆盖全面**：从 2019 到 2026 年，涵盖 PLM 和 LLM 两个时代的心理计算研究
2. **分类清晰**：按计算处理模式而非应用领域分类，避免了领域交叉混乱
3. **数据集丰富**：整理了 100+ 个数据集，含规模、领域和链接
4. **持续更新**：README 标注 "Continuous updating..."，欢迎社区贡献
5. **学术背书**：配套 arXiv 综述论文，经过学术审查
6. **中文相关**：包含多篇中文社交媒体心理健康研究论文

### 不足

1. **无代码实现**：纯论文列表，无可执行代码或工具
2. **无评估对比**：不提供各方法之间的性能对比表
3. **无方法分析**：仅列出论文，缺少方法优劣势的深入分析
4. **链接不完整**：部分数据集标记为 "-"，缺少获取链接
5. **更新滞后风险**：虽然标注持续更新，但依赖维护者精力
6. **缺少工业实践**：偏重学术论文，缺少工业落地案例

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **综述论文** | [From Pre-trained Models to Large Language Models: A Comprehensive Survey of AI-Driven Psychological Computing](https://arxiv.org/abs/2604.03259) |
| **项目仓库** | https://github.com/DreamH1gh/Awesome-AI4Psychological-Papers |
| **联系邮箱** | chenhy1018@gmail.com |

### 引用格式

```bibtex
@misc{chen2026pretrainedmodelslargelanguage,
  title={From Pre-trained Models to Large Language Models: A Comprehensive Survey of AI-Driven Psychological Computing},
  author={Huiyao Chen and Ruimeng Liu and Yan Luo and Jiawen Zhang and Meishan Zhang and Baotian Hu and Min Zhang},
  year={2026},
  eprint={2604.03259},
  archivePrefix={arXiv},
  primaryClass={cs.CY},
  url={https://arxiv.org/abs/2604.03259}
}
```

### 综述中值得重点关注的 LLM 论文

| 论文 | 会议/期刊 | 日期 | 与心力教练相关性 |
|------|----------|------|-----------------|
| PsychAdapter | npj AI | 2026-03 | ⭐⭐⭐ 人格适配 LLM |
| HopeBot | arXiv | 2026-01 | ⭐⭐ PHQ-9 筛查聊天机器人 |
| Cognitive-Mental-LLM | arXiv | 2026-01 | ⭐⭐ LLM 心理健康推理评估 |
| MentalGLM 系列 | EMNLP | 2025-11 | ⭐⭐⭐ 中文心理健康可解释 LLM |
| AutoCBT | arXiv | 2025-01 | ⭐⭐⭐ 自主多智能体 CBT |
| PsyDT | ACL | 2025-07 | ⭐⭐⭐ 心理咨询师数字孪生 |
| SoulChat | EMNLP Findings | 2023-12 | ⭐⭐⭐ 中文共情对话微调 |

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebFetch 抓取
