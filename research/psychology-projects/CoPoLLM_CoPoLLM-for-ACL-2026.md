# CoPoLLM · 认知策略驱动 LLM 检测与干预认知扭曲

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | CoPoLLM (Cognitive Policy-driven Large Language Model) |
| **仓库地址** | https://github.com/Chips98/CoPoLLM-for-ACL-2026 |
| **所属组织** | Chips98 |
| **描述** | ACL 2026 论文代码：认知策略驱动 LLM 用于情绪支持对话中认知扭曲的诊断与干预 |
| **论文发表** | ACL 2026 |
| **开源许可** | MIT License |
| **Star 数** | 搜索时未显示具体数值（新项目） |
| **Fork 数** | 同上 |

---

## 二、技术栈分析

### 核心技术栈

- **编程语言**：Python 3.8+
- **深度学习框架**：PyTorch
- **LLM 框架**：HuggingFace Transformers + PEFT (LoRA)
- **训练加速**：Unsloth（可选，加速训练）+ QLoRA 4-bit 量化
- **推理引擎**：vLLM（greedy sampling, T=0.0）
- **强化学习**：自研 Double DQN + KL 正则化
- **多智能体模拟**：32 并行环境的咨询模拟
- **基础模型**：Llama3.1-8B / Qwen3-8B / Qwen2.5-7B-Instruct
- **GPU 需求**：80GB GPU 显存（完整训练流水线）

### 架构组成

CoPoLLM 框架由两个核心组件构成：

```
                    ┌─────────────────────────┐
                    │     CoPoLLM 框架        │
                    └────────┬────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐       ┌──────────▼──────────┐
    │  CPRL 引擎         │       │  DSCO 算法           │
    │  (强化学习)        │       │  (双流条件优化)      │
    │                    │       │                      │
    │  · 多智能体模拟    │       │  · 分类任务          │
    │  · Double DQN     │       │  · 生成任务          │
    │  · 9种干预策略+1   │       │  · LoRA 微调         │
    └────────────────────┘       └──────────────────────┘
```

### 项目结构

```
CoPoLLM/
├── data/
│   ├── train.json                # 2,094 条训练对话
│   └── test.json                 # 405 条测试对话
├── task1/                        # 数据准备
│   ├── create_dqn_dataset.py     # 创建 DQN 训练池+嵌入
│   └── get_bias_label.py         # 标注认知扭曲
├── task2/                        # CPRL 引擎（DQN 训练）
│   ├── config.yaml               # 超参数配置
│   ├── config_loader.py          # YAML 配置加载
│   ├── dqn.py                    # Double DQN 实现
│   ├── multi_agents.py           # 多智能体咨询模拟
│   └── run_online_training.py    # 主训练循环
├── task3/                        # SFT 数据集生成
│   └── generate_sft_dataset.py   # 生成监督微调数据
├── task4/                        # DSCO 微调
│   ├── sft_unified.py            # 统一训练（分类+生成）
│   ├── sft_classification.py     # 扭曲类型分类任务
│   └── sft_generation.py         # 回应生成任务
├── Figures/
│   └── method.png                # 框架架构图
└── requirements.txt
```

---

## 三、核心功能特性

### 1. CogBiasESC 数据集

CoPoLLM 构建了首个显式标注认知扭曲信息的 ESC 数据集：

| 属性 | 数值 |
|------|------|
| 训练集对话数 | 2,094 |
| 训练集来访者话语数 | 34,329 |
| 测试集对话数 | 405 |
| 测试集来访者话语数 | 5,568 |
| 总计对话数 | 2,499 |
| 总计来访者话语数 | 39,897 |

### 2. 八类认知扭曲分类（基于 CBT 理论）

| 序号 | 扭曲类型 | 描述 |
|------|---------|------|
| 1 | **情绪推理** (Emotional Reasoning) | 将主观感受视为客观现实 |
| 2 | **灾难化** (Catastrophizing) | 预期最坏结果 |
| 3 | **非黑即白** (All-or-Nothing) | 二元化思维 |
| 4 | **个人化** (Personalization) | 为外部事件承担责任 |
| 5 | **贴标签** (Labeling) | 贴负面全局标签 |
| 6 | **过度概括** (Overgeneralization) | 从单一事件得出广泛结论 |
| 7 | **读心术** (Mind Reading) | 假设知道他人想法 |
| 8 | **应该陈述** (Should Statements) | 应用刚性规则 |

每类扭曲还标注了：
- **强度等级**：轻度 / 中度 / 重度
- **风险等级**：低 / 中 / 高

### 3. CPRL 引擎（认知策略强化学习）

```
DQN 架构：1024 → 256 → 128 → 10
            ↓        ↓       ↓     ↓
         嵌入层    隐藏层1  隐藏层2  动作空间(9种干预策略+1危机处理)

训练参数：
· 10,000 episodes
· 32 并行环境
· 学习率 1e-4
· 折扣因子 γ=0.8
· ε-greedy: 0.9 → 0.1 (5000步衰减)
· 经验回放缓冲区: 10,000
· KL 约束: β=0.1
```

### 4. DSCO 算法（双流条件优化）

将 DQN 学到的策略知识注入 LLM：
- **分类流**：训练 LLM 识别认知扭曲类型
- **生成流**：训练 LLM 生成针对性干预回应
- **统一训练**：两流合并训练（推荐方式）

### 5. 安全保障机制

- 风险等级评估与分类
- 安全感知策略学习
- 策略一致性与安全性的理论保证

### 6. 预训练适配器

模型权重已在 HuggingFace 开源：`Chips95/Lora_Adapter_for_ACL2026_CoPoLLM`

---

## 四、应用场景说明

### 直接应用
- **情绪支持对话增强**：在现有 ESC 系统中集成认知扭曲检测与干预能力
- **心理健康自评工具**：帮助用户识别自己的认知扭曲模式
- **CBT 治疗辅助**：为 CBT 治疗师提供认知扭曲自动标注和干预建议

### 研究应用
- **RL + LLM 融合范式**：CPRL + DSCO 提供了"强化学习策略 → LLM 微调"的新范式
- **认知扭曲研究**：CogBiasESC 数据集支持认知扭曲的细粒度研究
- **安全 AI 研究**：高风险场景的安全保障机制设计

### 心力教练项目关联
- 八类认知扭曲与唯识学"烦恼心所"（贪/瞋/痴/慢/疑/恶见）存在映射关系
- CPRL 的多智能体模拟可用于心力教练 AI 的对抗训练
- 风险等级评估可用于心力教练系统的安全分级响应

---

## 五、优缺点评价

### 优势

1. **理论扎实**：严格基于 CBT 理论的八类认知扭曲分类体系
2. **RL+LLM 融合**：CPRL+DSCO 创新性地将强化学习策略注入 LLM，而非简单 SFT
3. **安全保障**：显式设计风险等级评估和安全感知策略学习
4. **数据集贡献**：CogBiasESC 是首个细粒度认知扭曲标注的 ESC 数据集
5. **开源完整**：代码 + 数据 + 模型权重全部开源（MIT 许可）
6. **实验充分**：在 15 个 SOTA 基线上显著优于所有方法
7. **可扩展架构**：DQN 动作空间可轻松扩展新的干预策略

### 不足

1. **GPU 门槛高**：完整训练需要 80GB GPU 显存
2. **数据规模有限**：2,499 条对话相比工业需求仍然偏小
3. **D4 数据限制**：部分测试集数据受 SJTU X-LANCE Lab 政策限制不可再分发
4. **语言局限**：主要面向英文场景
5. **临床验证缺失**：未报告临床试验数据
6. **策略空间固定**：9种干预策略+1危机处理，扩展需重新训练 DQN
7. **依赖外部 API**：Task 1 的认知扭曲标注需要 LLM API

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **论文** | ACL 2026（具体链接待补充） |
| **项目仓库** | https://github.com/Chips98/CoPoLLM-for-ACL-2026 |
| **模型权重** | https://huggingface.co/Chips95/Lora_Adapter_for_ACL2026_CoPoLLM/tree/main |
| **数据集** | CogBiasESC（仓库内 data/ 目录） |
| **基础模型** | Qwen2.5-7B-Instruct / Llama3.1-8B / Qwen3-8B |

### 引用格式

```bibtex
@inproceedings{zhong2025copolllm,
  title={Cognitive Policy-Driven LLM for Diagnosis and Intervention of Cognitive Distortions in Emotional Support Conversation},
  author={Zhong, Lin and Zhu, Renjin and Ma, Shujuan and Cui, Jinhao and Wang, Lingzhi and Chen, Hao and Liao, Qing},
  booktitle={Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (ACL)},
  year={2025}
}
```

### 训练流水线四阶段

| 阶段 | 任务 | 输出 |
|------|------|------|
| Stage 1 | 数据准备（认知扭曲标注 + DQN 训练池） | `dqn_pool.jsonl` |
| Stage 2 | CPRL 训练（DQN 多智能体模拟） | `policy_net_final.pth` |
| Stage 3 | SFT 数据集生成（DQN 选择最优策略） | `sft_dataset.json` |
| Stage 4 | DSCO 微调（QLoRA 双流优化） | LoRA 适配器 |

### 关联项目

- **PsyLLM**：同样聚焦心理健康 LLM，但 PsyLLM 侧重诊断-治疗推理，CoPoLLM 侧重认知扭曲检测与 RL 策略
- **Cactus**：同样基于 CBT 理论，但 Cactus 侧重对话生成，CoPoLLM 侧重扭曲诊断与干预策略优化
- **Graph2Counsel**：同样关注合成咨询数据，但 Graph2Counsel 用心理图谱，CoPoLLM 用 RL 模拟

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebFetch 抓取
