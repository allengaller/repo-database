# Cactus · 基于 CBT 的心理咨询对话生成

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Cactus |
| **仓库地址** | https://github.com/coding-groot/cactus |
| **所属组织** | coding-groot |
| **描述** | 基于 CBT（认知行为疗法）理论的心理咨询对话生成框架 |
| **论文发表** | EMNLP Findings 2024 |
| **开源许可** | 未明确标注 |
| **Star 数** | 搜索时未显示具体数值 |
| **Fork 数** | 同上 |

---

## 二、技术栈分析

### 核心技术栈

- **编程语言**：Python 3.8+
- **LLM 后端**：支持三种 LLM 类型
  - **ChatGPT**（OpenAI API）
  - **Llama 2**（自托管 vLLM 服务器）
  - **Llama 3**（自托管 vLLM 服务器）
- **推理引擎**：vLLM（用于 Llama 系列模型的服务器端推理）
- **配置管理**：YAML 配置文件（`config.yaml`）
- **Prompt 管理**：模板化提示词系统（LangChain PromptTemplate）
- **虚拟环境**：支持 conda 和 virtualenv

### 架构设计

```
Cactus 架构
├── LLM 抽象层（LLM 抽象类 + LLMFactory 工厂模式）
│   ├── ChatGPT（OpenAI API 集成）
│   ├── Llama2（vLLM 服务器集成）
│   └── Llama3（vLLM 服务器集成）
├── 咨询师 Agent 层（CounselorAgent 基类 + 继承扩展）
│   ├── Cactus Counselor（核心 CBT 咨询师）
│   └── 可扩展的新咨询师类型
├── Prompt 模板系统（prompts/ 目录下的文本模板）
└── 评估系统（Counseling-Eval）
```

### 配置文件结构

```yaml
# config.yaml
openai:
  key: <<Your openai API key>>

llama2:
  host: http://<<Server IP or URL>>/v1

llama3:
  host: http://<<Server IP or URL>>/v1
```

### 提示词模板格式

```
Client information: {client_information}
Reason for counseling: {reason_counseling}
CBT plan: {cbt_plan}
History: {history}
```

---

## 三、核心功能特性

### 1. CBT 计划驱动的对话生成

Cactus 的核心创新是将 CBT 治疗计划作为对话生成的约束条件：
- 输入包含**来访者信息**（client intake form）
- 输入包含**咨询原因**（reason for counseling）
- 输入包含**CBT 计划**（CBT plan）
- 模型基于这些结构化输入生成符合 CBT 治疗逻辑的多轮对话

### 2. 多 LLM 后端支持

通过 LLMFactory 工厂模式，Cactus 支持无缝切换不同 LLM 后端：
- **ChatGPT**：使用 OpenAI API，无需本地 GPU
- **Llama 2/3**：使用 vLLM 自托管，数据完全本地化

### 3. 可扩展的咨询师 Agent 系统

通过继承 `CounselorAgent` 基类，可以轻松添加新的咨询师类型：
- 设置 `self.language` 为 `english` 或 `chinese`
- 加载自定义提示词模板
- 可覆盖 `generate()` 方法实现定制逻辑

### 4. Counseling-Eval 评估系统

```bash
python script.py \
  --input_file ./data/intake_forms.json \
  --output_dir ./output \
  --counselor_type cactus \
  --llm_type chatgpt \
  --max_turns 20
```

支持：
- 批量处理多个来访者档案
- 可配置最大对话轮数
- 多种咨询师类型和 LLM 类型组合

### 5. 双语支持

框架原生支持英文和中文两种语言的咨询师 Agent，通过 `self.language` 属性控制。

---

## 四、应用场景说明

### 直接应用
- **CBT 咨询模拟**：生成符合 CBT 治疗逻辑的模拟咨询对话
- **治疗师培训**：为心理学学生提供 CBT 咨询对话示例
- **CBT 计划验证**：用 AI 模拟验证 CBT 治疗计划的可行性

### 研究应用
- **心理咨询 NLP 基准**：作为 CBT 对话生成的基线系统
- **多 LLM 对比研究**：在同一 CBT 框架下对比 ChatGPT/Llama2/Llama3 的咨询能力
- **合成数据生成**：生成 CBT 咨询数据用于下游模型训练

### 心力教练项目关联
- Cactus 的 CBT 计划驱动架构可作为心力教练 AI 的"治疗路线图"模板
- 双语支持适合心力教练的中英文双语场景
- LLMFactory 工厂模式便于心力教练系统灵活切换模型后端

---

## 五、优缺点评价

### 优势

1. **CBT 理论深度**：将 CBT 治疗计划作为核心约束，而非简单添加 CBT 系统提示词
2. **架构清晰**：LLMFactory + CounselorAgent 的工厂模式设计，易于扩展
3. **多 LLM 支持**：同时支持闭源（ChatGPT）和开源（Llama 2/3）模型
4. **双语原生支持**：中英文咨询师 Agent 开箱即用
5. **vLLM 集成**：为 Llama 系列提供了高性能推理方案
6. **学术发表**：EMNLP Findings 2024 收录，经过同行评审

### 不足

1. **无模型权重**：不提供预训练或微调的模型权重，仅提供推理框架
2. **依赖外部 API**：ChatGPT 需要 OpenAI API Key，Llama 需要 vLLM 服务器
3. **无训练代码**：仅提供推理代码，不包含模型训练/微调代码
4. **无评估指标**：README 中未提供量化评估结果
5. **数据集依赖**：需要用户提供 intake_forms.json 格式的输入数据
6. **安全机制缺失**：未见危机干预或风险评估机制
7. **文档简洁**：README 偏重使用说明，缺乏架构设计文档

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **论文** | [Cactus: Towards Psychological Counseling Conversations using Cognitive Behavioral Theory](https://arxiv.org/abs/2407.03103) |
| **项目仓库** | https://github.com/coding-groot/cactus |
| **数据与模型** | HuggingFace（README 中链接） |
| **vLLM** | https://github.com/vllm-project/vllm |
| **会议** | EMNLP Findings 2024 |

### 引用格式

```bibtex
@misc{lee2024cactus,
  title={Cactus: Towards Psychological Counseling Conversations using Cognitive Behavioral Theory},
  author={Suyeon Lee and Sunghwan Kim and Minju Kim and Dongjin Kang and Dongil Yang and Harim Kim and Minseok Kang and Dayi Jung and Min Hee Kim and Seungbeen Lee and Kyoung-Mee Chung and Youngjae Yu and Dongha Lee and Jinyoung Yeo},
  year={2024},
  eprint={2407.03103},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2407.03103}
}
```

### 关联项目

- **Graph2Counsel**：将 Cactus 数据集作为对比基准之一
- **CoPoLLM**：同属 CBT 理论驱动的 LLM 系统，但 CoPoLLM 增加了 RL 策略学习
- **PsyLLM**：更广泛的治疗范式（CBT+ACT+精神动力学），而 Cactus 专注 CBT

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + WebFetch 抓取
