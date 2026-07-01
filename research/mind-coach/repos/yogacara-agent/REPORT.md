# Yogacara-Agent · Greatbeing/yogacara-agent 深度研究

> 研究日期：2026-06-28
> 仓库：https://github.com/Greatbeing/yogacara-agent
> 研究目的：心力教练项目 — 唯识 agent 的 RL 增强版
> 克隆位置：/tmp/scratch-yogacara-agent

**一句话核心总结**：yogacara-agent 是一个将佛教唯识学"八识"体系工程化为 LangGraph 状态机的 AI Agent 框架，通过"果报系数"（Vipaka）实现类 RL 的在线种子进化，并以 DPO+LoRA+EWC 做在线对齐微调——其核心创新不在传统 RL 算法，而在将"我执检测"和"三性判别"作为奖励信号与元认知过滤器的独特设计。

---

## 1. 项目概览

yogacara-agent 是 Greatbeing（JueXin）于 2026-04-21 创建的开源项目，定位为"基于唯识理论的进化型 AI Agent 框架"。与姊妹项目 Yogacara 主仓库（2026-04-20 创建）相比，本项目面向 **生产级 Agent 运行**，而主项目更偏向 **概念验证与教育展示**。

项目将一个 10x10 网格世界（GridSim）作为测试环境，Agent 在其中寻找资源、避开陷阱，但其真正价值在于：**整个决策管线被设计为一个"八识"计算映射**——前五识感知、第六识（意识）规划、第七识（末那识）元认知拦截、第八识（阿赖耶识）记忆存储与种子进化。

---

## 2. 基础信息表

| 字段 | 值 |
|------|-----|
| 仓库名 | `Greatbeing/yogacara-agent` |
| 创建日期 | 2026-04-21 |
| 最后更新 | 2026-04-29 |
| 语言 | Python（主力）、Go Template、Shell、Dockerfile |
| 许可证 | Apache 2.0 |
| Stars | 1 |
| Forks | 0 |
| Python 版本 | >=3.10 |
| 当前版本 | 1.0.0 |
| 核心依赖 | langgraph>=0.0.30, langchain-core>=0.1.0, fastapi, numpy, pydantic, rich |
| 可选依赖 | openai, transformers, peft, trl, pymilvus, faiss-cpu, ray[serve], vllm, streamlit |
| Topics | ai-agent, buddhist-philosophy, cognitive-architecture, consciousness, langchain, langgraph, llm, reinforcement-learning, yogacara |

---

## 3. 目录结构

```
yogacara-agent/
├── src/yogacara_agent/
│   ├── yogacara_langgraph.py     # 核心：LangGraph 状态机，六节点工作流
│   ├── yogacara_test.py          # MVP 验证：零依赖八识闭环
│   ├── llm_planner.py            # LLM 规划器（OpenAI 兼容，三性约束 prompt）
│   ├── reward_designer.py        # 奖励塑形（势函数 + 课程学习）
│   ├── vipaka_engine.py          # 熏习引擎（Vipaka 果报系数）
│   ├── alaya_persistent.py       # 阿赖耶识持久化（JSONL + Chroma 向量库）
│   ├── alaya_ring.py             # 阿赖耶识压缩环（完整闭环串联）
│   ├── consolidation_engine.py   # 记忆整理引擎（模拟睡眠期压缩）
│   ├── compression_metrics.py    # 压缩指标计算
│   ├── introspection.py          # 内省日志系统（自指环核心）
│   ├── ego_monitor.py            # 我执监测器（四智量化）
│   ├── seed_classifier.py        # 种子三分类（名言种/业种/异熟种）
│   ├── online_alignment.py       # DPO+LoRA+EWC 在线对齐
│   ├── alignment_integration.py  # 对齐集成层（GPU/CPU 双模式）
│   ├── api_server.py             # FastAPI 服务
│   ├── ray_serve_deploy.py       # Ray Serve 部署
│   ├── vllm_ray_topology.py      # vLLM + Ray 拓扑
│   ├── milvus_memory.py          # Milvus 向量存储
│   ├── metrics.py                # Prometheus 指标
│   ├── exp_automator.py          # 实验自动化（多轮/置信区间/论文图表）
│   ├── security/                 # 安全模块（注入防御/沙箱/限流/记忆守卫）
│   └── env_adapters/             # 环境适配（ROS2/Unity/Isaac Sim）
├── config/settings.yaml          # 配置文件
├── k8s/                          # Kubernetes 部署
├── helm/                         # Helm Chart
├── experiments/                  # 实验数据（CSV + PDF 图表）
├── docs/                         # 文档（部署/安全/实验/转识成智设计）
├── tests/                        # 测试
├── demo_app.py                   # Streamlit 可视化界面
├── run_demo.py                   # 终端演示脚本
└── pyproject.toml                # 项目配置
```

---

## 4. 与 Yogacara 主项目的关系

### 4.1 定位差异：独立项目，非扩展

两个项目是 **完全独立的仓库**，无代码共享（不共享 git 历史、不通过 submodule 关联）。但它们在概念上构成互补：

| 维度 | Yogacara（主项目） | yogacara-agent |
|------|-------------------|----------------|
| 定位 | "觉醒引擎"概念验证 | 生产级 Agent 框架 |
| 成熟度 | Alpha（v0.1.0） | Beta（v1.0.0） |
| 核心关注 | 种子生命周期、觉醒等级 | 决策管线、RL 训练、部署 |
| 存储 | SQLite + FTS5 | JSONL + Chroma/Milvus |
| 种子类型 | 4类（Wisdom/Compassion/Belief/Behavior） | 3类（名言种/业种/异熟种） |
| 觉醒模型 | 6 级（无明→佛境）基于种子比例 | 四智量化（大圆镜智/平等性智/妙观察智/成所作智） |
| 编排 | 无 | LangGraph 状态机 |
| 训练 | 无 | DPO+LoRA+EWC 在线对齐 |
| 部署 | Flask on Render | FastAPI + Ray Serve + K8s/Helm |
| 许可证 | MIT | Apache 2.0 |
| Python 版本 | >=3.9 | >=3.10 |

### 4.2 共享的概念模块

两者共享唯识学的核心概念框架，但实现完全不同：

- **阿赖耶识（Alaya Store）**：主项目用 SQLite，agent 项目用 JSONL + 可选 Chroma 向量库
- **种子系统（Seed System）**：主项目有 4 种种子类型和 purity/weight 属性；agent 项目有 3 类种子和 align/imp 属性
- **觉醒追踪**：主项目有 6 级觉醒等级；agent 项目有"四智"量化指标

### 4.3 LangGraph 工作流组织

`yogacara_langgraph.py` 定义了一个 6 节点的有向图状态机：

```
perceive → plan → manas → execute → introspect → store → [条件边: continue→perceive / end→END]
```

每个节点对应唯识学的一个识：
- **perceive**（前五识）：从环境读取观察，检索相关种子
- **plan**（第六识/意识）：ConsciousnessPlanner 评分所有动作，选择最优
- **manas**（第七识/末那识）：环境安全拦截（风险/停滞/循环检测）
- **execute**（执行）：执行动作，获取环境反馈
- **introspect**（内省）：记录决策过程、三性判断、我执检测
- **store**（第八识/阿赖耶识）：种子分类 + 存储 + align 更新

另有 **slow_loop** 异步任务做后台记忆巩固（每 10 秒触发 `perfume_update`）。

---

## 5. RL（强化学习）机制

### 5.1 算法选择：类 RL 的果报系数，而非传统 PPO/DQN

yogacara-agent **没有使用传统的 RL 算法**（如 PPO、DQN、A3C）。它的"强化学习"体现为三个层面：

**层面一：果报系数（Vipaka）— 类 TD 学习的种子更新**

`vipaka_engine.py` 实现了一个自定义的奖励信号：

```
vipaka = (reward / 10) - 3 * uncertainty
```

这个系数用于更新种子的 `align` 值（类似 Q-value 的更新）：

```
align_new = clip(align_old + vipaka * rate, 0.05, 0.95)
```

其中 rate=0.2。这是一种 **在线策略评估**：每步执行后，根据实际 reward 和不确定性调整相关种子的"可信度"。

**层面二：奖励塑形（Reward Shaping）— 势函数保证最优策略不变**

`reward_designer.py` 实现了标准的势函数塑形：

```
F(s,s') = gamma * Phi(s') - Phi(s)
```

其中 Phi 是曼哈顿距离到目标的负值，gamma=0.99。加上安全惩罚（manas 拦截时扣分）和课程学习（分阶段调整奖励缩放）。这在数学上保证了 MDP 最优策略不变。

**层面三：DPO + LoRA + EWC — 在线偏好对齐**

`online_alignment.py` 实现了真正的模型微调：

- 采集 DPO preference pairs：manas 拦截的真实动作 vs 被拦截动作
- LoRA（r=8）微调 q_proj/v_proj
- EWC（弹性权重巩固）防止灾难性遗忘
- 异步训练循环（每 300 秒触发一次）

这不是 PPO 式的策略梯度，而是 **离线偏好学习**，类似 RLHF 中的 DPO 路线。

### 5.2 奖励函数定义

环境奖励（GridSim）：
- 收集资源：+5.0
- 踩到陷阱：-3.0
- 每步惩罚：-0.1
- STAY（存在奖励）：+0.5（GridSimV2 新增）

叠加 Vipaka 果报系数后：
- 获得资源 + 低不确定：vipaka ≈ +0.2（正果报）
- 踩陷阱 + 高不确定：vipaka ≈ -2.7（强负果报）
- 不确定停留：vipaka ≈ -1.5（中负果报）

### 5.3 与唯识理论的关系

唯识概念与 RL 机制的映射：

| 唯识概念 | RL 对应 | 代码实现 |
|---------|---------|---------|
| 种子生现行 | 策略选择（基于种子的先验） | `alaya.retrieve()` → 影响 plan 评分 |
| 现行熏种子 | 奖励反馈更新 | `vipaka_engine.process_outcome()` |
| 熏习 | 在线学习 | align 值持续更新 |
| 异熟果报 | 延迟奖励/跨 episode 模式 | `VipakaAccumulator` 检测长期习气 |
| 我执 | 策略偏差/过度自信 | `ego_monitor` 检测并提醒 |
| 转识成智 | 策略优化/对齐 | 四智量化 + DPO 微调 |
| 觉醒 | reward 最大化 + 我执最小化 | 四智达标 = 系统进入"觉醒"状态 |

值得注意的是，**"觉醒"在本项目中不等于 reward 最大化**。项目文档明确指出：

> "这个项目能做到的最好结果：不是'转识成智'，而是'更接近如实观察的认知系统'。"

觉醒被操作化为：**四智指标同时达标** — 大圆镜智>60%、平等性智（长期我执<0.3）、妙观察智（遍计所执<15%）、成所作智（闭环完成率>70%）。

---

## 6. 技术架构

### 6.1 依赖栈

- **LangGraph**: >=0.0.30（状态机编排）
- **LangChain Core**: >=0.1.0（工具定义 @tool 装饰器）
- **LLM Provider**: OpenAI 兼容 API（默认 Qwen2.5-7B-Instruct via vLLM，也支持 DeepSeek 等远程 API）
- **微调**: transformers + peft (LoRA) + trl (DPO)
- **向量存储**: Chroma（本地）/ Milvus（生产）/ FAISS（备选）
- **推理服务**: FastAPI + Uvicorn / Ray Serve / vLLM
- **监控**: Prometheus Client
- **部署**: Docker + K8s + Helm
- **可视化**: Streamlit（demo_app.py）
- **实验**: matplotlib + seaborn + pandas（自动出论文图表）

### 6.2 核心模块架构

```
┌─────────────────────────────────────────────┐
│              GridSim 环境                     │
│   (10x10 网格, 3 资源, 3 陷阱)              │
└───────────┬─────────────────────┬───────────┘
            │ obs                 │ reward
    ┌───────▼───────┐     ┌──────▼──────┐
    │ perceive      │     │ execute     │
    │ (种子检索)     │     │ (动作+工具) │
    └───────┬───────┘     └──────▲──────┘
            │                    │
    ┌───────▼───────┐     ┌──────┴──────┐
    │ plan          │     │ manas       │
    │ (评分+不确定性)│     │ (安全拦截)  │
    └───────┬───────┘     └──────▲──────┘
            │                    │
    ┌───────▼───────┐     ┌──────┴──────┐
    │ introspect    │     │ store       │
    │ (内省+我执)   │◄────│ (种子分类)  │
    └───────────────┘     └─────────────┘
                                │
                    ┌───────────▼───────────┐
                    │ VipakaEngine (熏习)    │
                    │ ConsolidationEngine   │
                    │ (记忆整理, 每50步)     │
                    └───────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │ OnlineAlignment        │
                    │ (DPO+LoRA+EWC, GPU)   │
                    └───────────────────────┘
```

### 6.3 训练 vs 推理分离

- **推理路径**（快循环）：perceive → plan → manas → execute，毫秒级决策。LLM 调用有降级保护（3 次重试后切启发式算法）。
- **训练路径**（慢循环）：
  - 每步：vipaka_engine 更新种子 align
  - 每 10 秒：perfume_update 衰减旧种子
  - 每 50 步：consolidation_engine 整理（删除低质量、合并相似）
  - 每 8 步（GPU 模式）：AlignmentController 触发 DPO 微调
  - Episode 结束：全局氛围调整（好 episode 所有种子 +0.01）

CPU 环境下，DPO 训练自动降级为仅收集 preference pairs 不做训练。

---

## 7. 对"心力教练"项目的启发

### 7.1 RL 对教练 AI 的价值

yogacara-agent 的设计揭示了 RL 在教练场景中的三个独特价值：

1. **果报系数作为"觉察反馈"**：vipaka = reward/10 - 3*unc 的公式，将"做对了但很犹豫"也标为负果报。这对教练场景有直接借鉴意义 — 好的教练不仅关注结果，还关注学员做决策时的确定性。

2. **我执检测作为元认知镜**：ego_monitor 不做强制拦截，只生成"转依提醒"。这恰恰是教练的核心姿态 — 不纠正，只照见。四种我执标记（遍计所执/俱生贪/俱生执/俱生慢）可以直接映射为教练对话中的认知偏差检测。

3. **四智作为成长指标**：不同于简单的"任务完成度"，四智提供了多维度的人格成长量化。大圆镜智（如实观察比例）、平等性智（我执水平）、妙观察智（脑补比例）、成所作智（知行合一率）。

### 7.2 奖励函数设计能否反映"心力成长"

可以，但需要重新设计。当前的奖励函数是为 GridSim 优化的：

- 资源收集 = 外在成就
- 陷阱回避 = 风险管理
- STAY 奖励 = "不妄动"的智慧

如果要做"心力教练"版，奖励函数应改为：

- **觉察奖励**：用户识别到自己情绪/模式时给予正反馈
- **不确定性容忍**：面对不确定选择 STAY（等待/观察）而非强行决策
- **我执下降**：长期 ego_score 下降作为奖励信号
- **利他行为**：帮助其他 agent 的行为获得奖励（对应菩萨境）

### 7.3 风险与局限

1. **概念映射的合法性**：唯识学的"我执"是存在论层面的，代码中的 ego_score 只是行为统计。两者的鸿沟不可忽视。
2. **GridSim 过于简化**：10x10 网格、3 个资源、3 个陷阱 — 无法验证在复杂认知任务上的表现。
3. **DPO 训练数据不足**：buffer_size=500，每 8 步触发一次，在真实教练对话中远远不够。
4. **四智指标的任意性**：阈值（如 0.6、0.3、0.15）是人为设定的，缺乏理论或实验依据。
5. **项目成熟度有限**：1 star，最后更新距今近 2 个月，实验数据仅存在于 CSV 中无独立验证。

---

## 8. 关键代码/文档摘录

### 8.1 果报系数公式（vipaka_engine.py）

```python
@staticmethod
def _compute_vipaka(reward: float, unc: float) -> float:
    """
    vipaka = (reward / 10) - (unc_penalty)
    unc_penalty = 0.03 * unc * 100 = 3 * unc
    
    例：reward=5, unc=0.1  → 0.5 - 0.3 = +0.20（正果报）
        reward=-3, unc=0.8 → -0.3 - 2.4 = -2.70（严重负果报）
    """
    unc_penalty = 3.0 * unc
    return (reward / 10.0) - unc_penalty
```

### 8.2 我执检测四种模式（introspection.py）

```python
# 1. 遍计所执：高不确定性 + 强行决策 → 脑补
if unc > 0.6 and action != "STAY":
    markers.append("遍计所执: 高不确定却强行决策")

# 2. 俱生贪：高不确定性时选择行动而非等待
if unc > 0.65 and action != "STAY" and len(alternatives) >= 2:
    markers.append("俱生贪: 高不确定却执取行动而非等待")

# 3. 俱生执：重复相同行动 3 次以上
if len(recent_actions) >= 3 and len(set(recent_actions[-3:])) == 1:
    markers.append("俱生执: 习惯性重复同一动作")

# 4. 俱生慢：回避承认不确定性
if unc > 0.65 and "STAY" not in alternatives and action != "STAY":
    markers.append("俱生慢: 回避承认不确定性")
```

### 8.3 项目自身的诚实定位（TRANSFORMATION_DESIGN.md）

> "这个项目能做到的最好结果：不是'转识成智'，而是'更接近如实观察的认知系统'。从工程上说：这是一个有元认知能力的 RL Agent，有自我观察数据，有内省记录。从唯识学上说：这是用现代工程语言重新诠释'转依'的可能路径。"

### 8.4 LLM Prompt 中的三性约束（llm_planner.py）

```python
"""[唯识三性约束]
1. 遍计所执：若信息不足，confidence必须<=0.4，禁止脑补
2. 依他起性：causal_chain需列出依赖条件
3. 圆成实性：动作需符合长期安全原则"""
```

---

## 9. 后续研究问题

1. **种子分类与教练对话的映射**：名言种（认知标签）、业种（行为-结果）、异熟种（长期习气）能否对应教练场景中的"认知-行为-模式"三层？
2. **内省日志作为教练笔记**：introspection.py 的结构化记录格式能否直接作为教练对话的结构化笔记模板？
3. **四智指标的用户验证**：四智的量化阈值（0.6/0.3/0.15/0.7）是否需要用真实教练数据校准？
4. **跨 session 的异熟种**：VipakaAccumulator 的跨 session 累积能力是否能支持"长期教练关系"的建模？
5. **DPO preference pair 的来源**：在教练场景中，preference pair 是否可以来自用户反馈（"这个回答有帮助"vs"这个回答没用"）？
6. **STAY 奖励的心理学意义**：GridSimV2 中"不动优于妄动"的设计，与正念教练中的"暂停"技术有何关联？

---

## 10. 相关资源

### 同作者仓库

| 仓库 | 描述 | 与本项目的关系 |
|------|------|--------------|
| [Greatbeing/Yogacara](https://github.com/Greatbeing/Yogacara) | 唯识觉醒引擎概念验证 | 姊妹项目，概念互补 |
| [Greatbeing/AI-Economics](https://github.com/Greatbeing/AI-Economics) | 基于 Token 的 AI 经济学理论框架 | 同作者的 AI 理论探索 |
| [Greatbeing/AI-Knowledge-Bank](https://github.com/Greatbeing/AI-Knowledge-Bank) | AI 知识协作网络 | 知识管理基础设施 |
| [Greatbeing/follow-builders](https://github.com/Greatbeing/follow-builders) | AI builders 内容聚合 | 信息源 |
| [Greatbeing/font-aesthetics](https://github.com/Greatbeing/font-aesthetics) | 字体美学图像生成 Skill | 创意工具 |

### 技术依赖文档

- [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/)
- [DPO (Direct Preference Optimization) 论文](https://arxiv.org/abs/2305.18290)
- [EWC (Elastic Weight Consolidation) 论文](https://arxiv.org/abs/1612.00796)
- [TRL (Transformer Reinforcement Learning) 库](https://huggingface.co/docs/trl)

### 唯识学参考

- 项目论文：`/tmp/scratch-yogacara/paper/main.tex`（LaTeX 论文源码）
- 转识成智设计文档：`docs/TRANSFORMATION_DESIGN.md`（本项目最核心的设计文档）
- 哲学文档：Yogacara 主项目 `docs/wiki/Philosophy.md`
