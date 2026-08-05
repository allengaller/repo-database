# GitHub 心理学相关项目 · 研究索引

> 创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebSearch + WebFetch
> 项目数量：9 个独立项目 + 2 个 Awesome List

---

## 总览

本目录收录了 2026 年在 GitHub 上发现的心理学相关项目，按类别分为 **AI + 心理咨询/治疗**、**AI Agent + 心理健康**、**冥想/正念应用** 三大类。各项目的独立专题档案（含项目基本信息、技术栈分析、核心功能特性、应用场景说明、优缺点评价和相关参考资料）已迁入 [`catalog/`](../../catalog/INDEX.md) 档案库统一管理，本文保留横向对比矩阵与心力教练相关性评估。

---

## 一、AI + 心理咨询/治疗

### 1. PsyLLM · 超越共情：整合诊断与治疗推理的心理 LLM

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/Emo-gml/PsyLLM |
| **论文** | arXiv:2505.15715 |
| **核心定位** | 首个整合诊断推理+治疗推理的心理 LLM |
| **治疗范式** | CBT + ACT + 精神动力学 + 人本主义 |
| **诊断标准** | DSM/ICD |
| **开源情况** | 模型权重 + 训练数据 + 推理代码 |
| **最新动态** | 2026-04 PSYCHEPASS SOTA |
| **详细档案** | [catalog/ai-mental-health/psyllm.md](../../catalog/ai-mental-health/psyllm.md) |

### 2. Graph2Counsel · 基于客户心理图谱的合成咨询对话生成

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/UKPLab/arxiv2026-graph2counsel |
| **论文** | arXiv:2604.20382 (2026) |
| **核心定位** | 用客户心理图谱(CPG)生成结构化、临床落地的合成咨询会话 |
| **创新点** | CPG 知识图谱 + GC+MA 多智能体反馈 |
| **评估体系** | CTRS + WAI + Faithfulness |
| **数据规模** | 76 CPG → 760 会话 |
| **详细档案** | [catalog/ai-mental-health/arxiv2026-graph2counsel.md](../../catalog/ai-mental-health/arxiv2026-graph2counsel.md) |

### 3. CoPoLLM · 认知策略驱动 LLM 检测与干预认知扭曲

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/Chips98/CoPoLLM-for-ACL-2026 |
| **论文** | ACL 2026 |
| **核心定位** | RL+LLM 融合，检测和干预情绪支持对话中的认知扭曲 |
| **核心组件** | CPRL(DQN) + DSCO(双流优化) |
| **数据集** | CogBiasESC (2,499 对话, 8类认知扭曲) |
| **基础模型** | Qwen2.5-7B / Llama3.1-8B |
| **详细档案** | [catalog/ai-mental-health/copollm-for-acl-2026.md](../../catalog/ai-mental-health/copollm-for-acl-2026.md) |

### 4. Cactus · 基于 CBT 的心理咨询对话生成

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/coding-groot/cactus |
| **论文** | EMNLP Findings 2024 |
| **核心定位** | CBT 计划驱动的咨询对话生成框架 |
| **LLM 后端** | ChatGPT + Llama 2/3 (vLLM) |
| **双语支持** | 英文 + 中文 |
| **详细档案** | [catalog/ai-mental-health/cactus.md](../../catalog/ai-mental-health/cactus.md) |

---

## 二、AI Agent + 心理健康

### 5. Awesome-AI4Psychological-Papers · AI 心理计算综合综述

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/DreamH1gh/Awesome-AI4Psychological-Papers |
| **综述论文** | arXiv:2604.03259 (2026) |
| **核心定位** | AI 驱动心理计算的论文+数据集综合索引 |
| **任务分类** | 分类回归 / 结构化关系 / 生成式交互 |
| **论文覆盖** | 2019-2026, PLM+LLM 两个时代 |
| **数据集覆盖** | 100+ 数据集 |
| **详细档案** | [catalog/ai-mental-health/awesome-ai4psychological-papers.md](../../catalog/ai-mental-health/awesome-ai4psychological-papers.md) |

### 6. Awesome-AI-Agents-for-Healthcare · 医疗健康 AI Agent 大全

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare |
| **核心定位** | 医疗健康领域 AI Agent 精选列表 |
| **心理健康收录** | AutoCBT, MAGI, PsyCounAssist, TheraMind, MIND 等 |
| **覆盖链路** | 筛查 → 治疗 → 长期监护 → 深度疗愈 |
| **详细档案** | [catalog/ai-agents/awesome-ai-agents-for-healthcare.md](../../catalog/ai-agents/awesome-ai-agents-for-healthcare.md) |

### 7. awesome-ai-agents-2026 · 2026 AI Agent 大全

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026 |
| **核心定位** | 2026 年全领域 AI Agent 列表 |
| **心理健康收录** | Talkspace AI, AI 心理伴侣(NHS), 21-day-self-interview |
| **特色** | 含认证信息 + 用户满意度数据 |
| **详细档案** | [catalog/ai-agents/awesome-ai-agents-2026.md](../../catalog/ai-agents/awesome-ai-agents-2026.md) |

---

## 三、冥想/正念应用

### 8. Vipassana App · 游戏化内观冥想 PWA

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/giekaton/vipassana-app |
| **核心定位** | 游戏化内观冥想 PWA，八角形 SVG 觉察-标记 |
| **技术类型** | PWA（离线优先） |
| **Star 数** | 9 |
| **心力教练关联** | 已有深度报告，启发 vasana PoC |
| **详细档案** | [catalog/mindfulness-apps/vipassana-app.md](../../catalog/mindfulness-apps/vipassana-app.md) |

### 9. Vipassana Android · Android 内观冥想引导 App

| 属性 | 内容 |
|------|------|
| **仓库** | https://github.com/happyruss/vipassana_android |
| **核心定位** | Android 原生内观冥想引导，开源可复用 |
| **技术类型** | Android 原生 |
| **开源理念** | 让其他实践者基于此创建自己的冥想 App |
| **详细档案** | [catalog/mindfulness-apps/vipassana-android.md](../../catalog/mindfulness-apps/vipassana-android.md) |

---

## 项目对比矩阵

### 技术维度对比

| 项目 | 类型 | 核心技术 | AI 集成 | 开源程度 | 语言 |
|------|------|---------|---------|---------|------|
| PsyLLM | LLM 模型 | Transformers + LLaMA-Factory | 核心能力 | 模型+数据+代码 | EN |
| Graph2Counsel | 数据生成 | vLLM + DeepSpeed + QLoRA | 核心能力 | 数据+代码 | EN |
| CoPoLLM | RL+LLM 框架 | PyTorch + DQN + PEFT | 核心能力 | 数据+模型+代码 | EN |
| Cactus | 推理框架 | LangChain + vLLM | 核心能力 | 代码 | EN/ZH |
| Awesome-List ×2 | 论文/项目列表 | - | 参考性质 | 列表 | EN |
| Vipassana App | 冥想应用 | PWA + SVG | 无 | 代码 | - |
| Vipassana Android | 冥想应用 | Android 原生 | 无 | 代码 | - |

### 心力教练相关性评估

| 项目 | 相关性 | 核心参考价值 |
|------|--------|-------------|
| **PsyLLM** | ⭐⭐⭐⭐⭐ | 诊断-治疗双轨推理架构可直接参考 |
| **Graph2Counsel** | ⭐⭐⭐⭐⭐ | CPG 结构化心理建模与唯识学同构 |
| **CoPoLLM** | ⭐⭐⭐⭐ | RL 策略优化+安全保障机制 |
| **Cactus** | ⭐⭐⭐⭐ | CBT 计划驱动+双语支持 |
| **Awesome-AI4Psych** | ⭐⭐⭐⭐ | 论文/数据集全景图 |
| **Awesome-AI-Agents-HC** | ⭐⭐⭐ | Agent 架构参考 |
| **awesome-ai-agents-2026** | ⭐⭐⭐ | 认证路径+用户数据参考 |
| **Vipassana App** | ⭐⭐⭐⭐ | 已有深度报告，PWA 架构参考 |
| **Vipassana Android** | ⭐⭐ | Android 原生参考 |

---

## 与心力教练研究的关联

心力教练研究档案已迁移至 [peace-lab-global/hush.ai](https://github.com/peace-lab-global/hush.ai) 项目的 `knowledge/mind-coach/` 目录。

本目录的项目与心力教练研究形成互补关系：

- **心力教练研究**（已迁移）：聚焦唯识学 × AI × 冥想的深度融合，含三轮研究 + 15 份报告
- **心理学项目研究**（本目录）：聚焦 2026 年 GitHub 上心理学相关开源项目的横向扫描

### 推荐交叉阅读

| 心力教练报告（已迁移至 hush.ai） | 对应的心理学项目 |
|-------------|-----------------|
| 02-five-repos-synthesis.md | Vipassana App + 新发现的冥想项目 |
| 08-direct-cognition.md | PsyLLM + Graph2Counsel（认知建模） |
| 09-curriculum-30-modules.md | Cactus + CoPoLLM（CBT 干预方法） |
| 07-legal-compliance.md | awesome-ai-agents-2026（NHS 认证参考） |

---

## 维护说明

- **创建日期**：2026-07-08（2026-07-29 档案迁入 catalog/）
- **数据来源**：GitHub 仓库搜索 + WebSearch + WebFetch
- **更新策略**：单仓库档案在 [`catalog/`](../../catalog/README.md) 维护（新增/刷新/索引均由 `scripts/catalog.py` 支持）；本文仅随新一轮专题调研更新对比矩阵
- **档案命名规范**：见 [catalog/README.md](../../catalog/README.md)（小写仓库名.md，按 domain 分目录）
- **每档案标准结构**：frontmatter 元数据 + 项目基本信息 → 技术栈分析 → 核心功能特性 → 应用场景说明 → 个人评价 → 相关资源
