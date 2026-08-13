---
name: liviux/LoopTroop
url: https://github.com/liviux/LoopTroop
domain: ai-agents
type: framework
languages: [TypeScript]
stars: 116
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [agent-loop, llm-council, ralph-loop, opencode-worktree, config-pipeline, agent-orchestration]
summary: 三段式配置层 —— LLM council 规划 → Ralph loop 迭代精炼 → OpenCode worktree 交付；OpenCode 之上跑"集体决策 + 持续打磨"的 agent pipeline，~116 stars
---

# LoopTroop · Council → Loop → Worktree 三段式编排

> 收录日期：2026-08-13
> 仓库：https://github.com/liviux/LoopTroop
> 来源：best-of-Agent-Harnesses 贡献者项目；社区称为"集体决策 + 持续打磨"编排范式

**一句话核心总结**：LoopTroop 是 liviux 出品的 agent 编排配置层 —— Council → Loop → Worktree 三段式 pipeline（多 LLM 集体决策规划 → Ralph loop 迭代精炼 → OpenCode worktree 交付），OpenCode 之上跑"集体决策 + 持续打磨"的 agent pipeline，~116 stars。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | LoopTroop |
| **仓库地址** | https://github.com/liviux/LoopTroop |
| **所属作者** | liviux（best-of-Agent-Harnesses 贡献者） |
| **描述** | Config layer that chains LLM councils for planning, Ralph loops for iterative refinement, and OpenCode worktrees for shipping. The harness contribution is the council → loop → worktree pipeline |
| **开源许可** | MIT |
| **Star 数** | ~116（截至 2026-08） |
| **技术类型** | framework（编排配置层） |
| **底层栈** | TypeScript |

---

## 二、技术栈与架构分析

### 2.1 三段式 Pipeline

```
[Council] → [Loop] → [Worktree]
   规划       精炼       交付
```

- **Council**：多个 LLM（Claude / GPT / Gemini / DeepSeek）集体决策，投票出方案
- **Loop**：Ralph loop（Geoffrey Huntley 命名的"持续打磨直到满意"循环）迭代精炼
- **Worktree**：OpenCode worktree 隔离 + 提交 + 推 PR

### 2.2 Council 阶段

多 LLM 投票机制：
- 输入：用户目标
- 多个 LLM 各自出方案
- 投票 / 共识算法选出最佳方案
- 输出：可执行的实施计划

### 2.3 Ralph Loop 阶段

Ralph loop 是 Geoffrey Huntley 提出的"持续打磨"概念：
- agent 持续跑同一个任务直到满足验收条件
- 每次循环：评估当前状态 → 找改进点 → 改进
- 上限：达到 N 次循环 或 验收通过

### 2.4 OpenCode Worktree 阶段

借助 opencode 的多 provider / worktree 能力：
- 每个 ticket 一个 worktree
- 完成后产出 PR
- 自动集成到 GitHub

### 2.5 配置即代码

整个 pipeline 用 YAML 配置：

```yaml
council:
  models: [claude-sonnet-4.5, gpt-5, gemini-2.5-pro]
  voting: majority
loop:
  type: ralph
  max_iterations: 10
  accept_criteria: tests_pass
worktree:
  runner: opencode
  branch_pattern: "feature/{ticket}"
```

---

## 三、核心功能特性

### 3.1 集体决策

单一 LLM 难免有偏见；多 LLM 投票能让方案更稳健：
- Claude 偏向严谨
- GPT 偏向创造
- Gemini 偏向均衡
- 投票机制综合三者优点

### 3.2 持续打磨

Ralph loop 让 agent 不"一次跑完就完事"，而是持续迭代：
- 每次循环找到新问题
- 解决后再评估
- 直到满足验收

### 3.3 隔离交付

worktree 隔离保证：
- agent 跑在独立分支
- 不污染主分支
- 出问题可回滚

### 3.4 复用 OpenCode 生态

不重新发明 harness，借力 opencode 的：
- 多 provider 抽象
- 会话持久化
- LSP / MCP 集成

### 3.5 配置驱动

整个 pipeline 是 YAML 配置，换 Council 组成 / Loop 类型 / Worktree runner 不用改代码。

---

## 四、应用场景与本仓库关联

### 4.1 复杂任务决策

- 架构选型（多 LLM 投票比单 LLM 可靠）
- 关键 bug fix（多角度分析）

### 4.2 持续打磨场景

- Code review 自动化（直到 PR 满足所有 checklist）
- 文档生成（多轮改进直到风格统一）

### 4.3 团队流水线

- 让 agent 跑 7×24 改进 backlog
- 每个 ticket 都经过 Council → Loop → Worktree

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [opencode.md](../ai-engineering/opencode.md) | OpenCode 是 LoopTroop 的执行后端 |
| [superpowers.md](../ai-engineering/superpowers.md) | Superpowers 提供方法论 skill，LoopTroop 提供编排 pipeline |
| [get-shit-done.md](../ai-engineering/get-shit-done.md) | 都强调"全新上下文窗口"避免 context rot |

---

## 五、个人评价

### 5.1 优势

1. **三段式 pipeline 思路清晰** —— Council → Loop → Worktree 各司其职
2. **复用 opencode 生态** —— 不重新造 harness，借力现有最强开源编码 agent
3. **集体决策 + 持续打磨** —— 把"LLM 投票"和"Ralph loop"两个概念组合
4. **配置驱动** —— YAML 配置灵活切换组件
5. **MIT 许可** —— 商用友好

### 5.2 不足

1. **116 stars 极少** —— 社区认知度非常有限
2. **依赖 opencode** —— opencode 任何变更都影响 LoopTroop
3. **个人项目** —— liviux 主导，长期可持续性观察
4. **Council 投票成本** —— 每次任务跑 3+ LLM，token 成本高
5. **Ralph loop 上限配置** —— 10 次循环够不够？不同任务差异大

### 5.3 评分理由

**3 星（active）** —— 三段式 pipeline 思路清晰 + 复用 opencode + 配置驱动是其优势；对理解"集体决策 + 持续打磨"编排范式有参考价值。扣分项是 star 数极少、依赖 opencode、token 成本；但作为"agent 编排配置层"的实验性实现，已达 3 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/liviux/LoopTroop |
| **Ralph loop 概念** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |
| **依赖** | https://github.com/anomalyco/opencode |

### 关联项目

- [opencode.md](../ai-engineering/opencode.md) — LoopTroop 的执行后端
- [superpowers.md](../ai-engineering/superpowers.md) — 跨 harness 工程方法论
- [get-shit-done.md](../ai-engineering/get-shit-done.md) — context engineering 引擎