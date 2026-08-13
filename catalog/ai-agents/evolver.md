---
name: EvoMap/evolver
url: https://github.com/EvoMap/evolver
domain: ai-agents
type: framework
languages: [Python, TypeScript]
stars: 9000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [self-evolving, gep-protocol, agent-evolution, meta-agent, audit, plugin-cursor, plugin-claude-code]
summary: GEP 协议驱动的 AI Agent 自进化引擎 — 元 agent 审计 + Git 演进 + 可审计的进化轨迹，覆盖 Claude Code / Codex CLI / Cursor / ChatGPT，~9k stars，"Agent 自进化"赛道代表
---

# Evolver · GEP 驱动的 AI Agent 自进化引擎

> 收录日期：2026-08-13
> 仓库：https://github.com/EvoMap/evolver
> 来源：EvoMap 团队；2026 年 "Agent 自进化"赛道代表项目

**一句话核心总结**：Evolver 是 EvoMap 出品的 GEP 协议驱动的 AI Agent 自进化引擎 —— 元 agent 审计 + Git 演进 + 可审计的进化轨迹，标准化 "Genome Evolution Protocol" 让 agent 能持续从经验中学习，覆盖 Claude Code / Codex CLI / Cursor / ChatGPT，~9k stars，"Agent 自进化"赛道代表。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Evolver |
| **仓库地址** | https://github.com/EvoMap/evolver |
| **所属组织** | EvoMap |
| **描述** | The GEP-powered self-evolving engine for AI agents |
| **开源许可** | MIT |
| **Star 数** | ~9,000（截至 2026-08） |
| **技术类型** | framework（Agent 自进化引擎） |
| **底层栈** | Python + TypeScript |

---

## 二、技术栈与架构分析

### 2.1 GEP 协议

Genome Evolution Protocol（GEP）是 Evolver 团队定义的标准协议：
- Agent 经验 → 编码为 "Genome"
- Genome 变异 → 生成新版本
- 评估 → 选择最优
- 部署 → 替换旧版本

类似生物进化的 "自然选择 + 变异 + 遗传"。

### 2.2 元 Agent 架构

Evolver 本身是"元 agent"：
- 不直接执行任务
- 监督其他 agent 的工作
- 审计工具调用 / 结果
- 触发进化迭代

### 2.3 Git-backed 演进

每次进化都对应一次 Git commit：
- 完整可审计
- 可回滚
- 可 diff

```
commit 1: base agent
commit 2: evolve(经验 1) → 修正 prompt
commit 3: evolve(经验 2) → 增加新工具
...
```

### 2.4 多端插件

- Claude Code 插件：session hook + skill
- Codex CLI 插件
- Cursor 插件
- ChatGPT 自定义指令集成

### 2.5 EvoMap 平台

Evolver 是 EvoMap 网络的核心引擎：
- 多个 agent 共享经验库
- 跨 agent 的 "基因流动"
- 联合进化

---

## 三、核心功能特性

### 3.1 自动日志分析

```
agent 执行 → 日志 → evolver 分析 → 发现问题模式 → 触发修复
```

### 3.2 自修复指导

不是直接改 agent，而是给出"修复建议"：
- "你在 prompt X 中漏掉了 Y"
- "工具 Z 在场景 W 下会失败，建议加 timeout"

### 3.3 可配置策略

策略预设：
- Conservative：仅在明显失败时进化
- Aggressive：高频进化
- A/B Test：多版本并行测试
- Custom：自定义规则

### 3.4 标准化协议

GEP 协议公开：
- 任何 agent harness 可实现 GEP 客户端
- 任何 platform 可接入 EvoMap

### 3.5 可审计

每次进化的完整记录：
- 触发原因
- 修改内容
- 评估指标变化
- 是否保留

---

## 四、应用场景与本仓库关联

### 4.1 长跑 agent 的自优化

- 一个 agent 跑久了会"积累经验"
- Evolver 把经验转化为代码 / prompt 改进

### 4.2 跨 agent 经验共享

- 多 agent 团队共享 "基因库"
- 优秀经验快速扩散

### 4.3 学术研究

- "agent 自进化"是可研究的范式
- GEP 协议提供标准化接口

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [hermes-agent.md](hermes-agent.md) | 都强调 self-learning，hermes 是应用层，evolver 是引擎层 |
| [superpowers.md](../ai-engineering/superpowers.md) | superpowers 提供 systematic-debugging skill，evolver 自动化该过程 |
| [skills.md](../ai-engineering/skills.md) | evolver Claude Code 插件用 Anthropic Skills 集成方式 |
| [agenticseek.md](agenticseek.md) | agenticseek 是执行 agent，evolver 可监督其进化 |

---

## 五、个人评价

### 5.1 优势

1. **概念新颖** —— "Agent 自进化"是 2026 年新热点，Evolver 抢先定义协议
2. **GEP 协议标准化** —— 给行业提供可复用接口，避免"各做各的"
3. **Git-backed 演进** —— 可审计可回滚，工程严谨
4. **多端插件覆盖** —— Claude Code / Codex / Cursor / ChatGPT 全支持
5. **学术价值** —— 元 agent + 进化算法 + GEP 协议可作研究素材

### 5.2 不足

1. **9k stars 偏少** —— 对比 Hermes-Agent 26k+ 仍有差距
2. **进化效果验证难** —— "agent 进化后是否真的变好"难以量化
3. **安全风险** —— 自我修改 prompt / 工具的 agent 可能产生不可预期行为
4. **EvoMap 平台商业化** —— 闭源平台与开源引擎的边界需要观察
5. **学术 vs 工程 gap** —— 协议标准优雅但实际部署可能复杂

### 5.3 评分理由

**4 星（active）** —— 概念新颖 + GEP 协议标准化 + Git-backed 严谨 + 多端覆盖是其核心优势；对想跑长跑 agent 团队、agent 自进化研究者尤其有价值。扣分项是验证难、潜在安全风险、商业化边界；但作为"Agent 自进化赛道代表"，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/EvoMap/evolver |
| **平台主页** | https://evomap.ai |
| **协议规范** | https://github.com/EvoMap/evolver/blob/main/GEPSPEC.md |

### 关联项目

- [hermes-agent.md](hermes-agent.md) — 自学习个人 agent（应用层）
- [superpowers.md](../ai-engineering/superpowers.md) — 工程方法论（含 systematic-debugging）
- [skills.md](../ai-engineering/skills.md) — Anthropic Skills 标准
- [agenticseek.md](agenticseek.md) — 本地 personal agent 执行端
