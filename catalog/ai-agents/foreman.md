---
name: VisionForge-OU/foreman
url: https://github.com/VisionForge-OU/foreman
domain: ai-agents
type: application
languages: [Python]
stars: 485
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [boris-style, agent-orchestrator, tui, headless-claude, gated-pipeline, software-delivery, supervisor-agent]
summary: Boris 风格的 agentic 编排 TUI — 监督 headless Claude Code agent 跑软件交付 gated pipeline；针对任意代码仓库，~485 stars，"agent 督导员"概念的工程实现
---

# Foreman · Boris 风格的 Agent 督导员

> 收录日期：2026-08-13
> 仓库：https://github.com/VisionForge-OU/foreman
> 来源：GitHub topic "agent-loop" 代表项目；社区称为"agent 督导员"

**一句话核心总结**：Foreman 是 VisionForge-OU 出品的 Boris 风格 agentic 编排 TUI —— 监督多个 headless Claude Code agent 跑软件交付 gated pipeline（开发 / 测试 / 部署），针对任意代码仓库，~485 stars，"agent 督导员"概念的工程实现。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Foreman |
| **仓库地址** | https://github.com/VisionForge-OU/foreman |
| **所属组织** | VisionForge-OU |
| **描述** | A Boris-style agentic orchestrator TUI that supervises headless Claude Code agents through a gated software-delivery pipeline — pointed at any repository |
| **开源许可** | MIT |
| **Star 数** | ~485（截至 2026-08） |
| **技术类型** | application（agent 编排 TUI） |
| **底层栈** | Python + TUI |

---

## 二、技术栈与架构分析

### 2.1 Boris 风格定义

"Boris" 风格源自 Boris Cherny（Claude Code 创造者）提倡的 agent 协作模式：
- headless agent 跑在后台
- 督导员 agent 监督进度
- 通过 gated pipeline 控制质量

Foreman 是该风格的开源 TUI 实现。

### 2.2 Gated Pipeline

软件交付按"门"组织：

```
PR 创建 → 单元测试门 → Lint 门 → Code Review 门 → 集成测试门 → 部署门 → 合并
```

每道门：
- 自动检查（CI / 测试）
- 督导 agent 评审
- 通过 → 下一道门
- 失败 → 回滚或暂停让人介入

### 2.3 Headless Claude Code Agents

- 多个 Claude Code 进程以 headless 模式后台运行
- Foreman 通过 SDK / API 控制启停
- 每个 agent 独立 worktree，互不干扰

### 2.4 TUI 体验

- 左：pipeline 可视化（每个 ticket 当前在哪个门）
- 中：当前 agent 输出 / 工具调用日志
- 右：metrics（成功率 / 平均耗时 / 失败原因）
- 底部：手动干预命令（暂停 / 重跑 / 跳过门）

---

## 三、核心功能特性

### 3.1 多 agent 督导

- 同时监督 5-20 个 Claude Code agent
- 自动分配 ticket
- 失败 / 停滞时自动提醒

### 3.2 任意仓库适配

- 不绑死特定项目结构
- 通过 `foreman.yaml` 配置 pipeline 门
- 适配 monorepo / multi-repo

### 3.3 Gated Pipeline 配置

```yaml
pipeline:
  - name: unit-test
    type: shell
    command: npm test
  - name: code-review
    type: agent
    prompt: "Review the PR for security and best practices"
  - name: deploy
    type: shell
    command: ./deploy.sh staging
```

### 3.4 失败回滚

- 任一门失败 → 自动回滚
- 保留失败状态供调试
- 重试策略可配置

### 3.5 手动介入

- `foreman pause <ticket>` 暂停
- `foreman rerun <ticket>` 重跑
- `foreman skip-gate <ticket> <gate>` 跳过门

---

## 四、应用场景与本仓库关联

### 4.1 工程团队

- 让 AI agent 7×24 跑 PR 流水线
- 督导员角色减少人工盯 PR

### 4.2 CI/CD 增强

- 在传统 CI 之上加 AI 评审门
- 比纯脚本更智能

### 4.3 Boris 风格实践

- 想把 Claude Code 跑成"无人值守"的开发者
- 多 agent 协同的工程化参考

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [vibe-kanban.md](../ai-engineering/vibe-kanban.md) | Vibe-Kanban 也是 fleet manager，但偏 UI；Foreman 偏 TUI + gated pipeline |
| [claude-mem.md](../ai-engineering/claude-mem.md) | claude-mem 给 agent 持久记忆，Foreman 给 agent 监督 |
| [planning-with-files.md](../ai-engineering/planning-with-files.md) | Boris 风格常配合持久规划文件 |

---

## 五、个人评价

### 5.1 优势

1. **Boris 风格开源实现** —— 把"headless agent + 督导员"概念工程化
2. **Gated Pipeline 思想好** —— 软件交付"门"的概念比传统 CI 更智能
3. **TUI 体验** —— 适合 terminal-native 开发者，比 web UI 更轻
4. **任意仓库适配** —— 不绑死项目结构
5. **手动介入友好** —— pause / rerun / skip-gate 命令完整

### 5.2 不足

1. **485 stars 偏少** —— 社区认知度有限
2. **VisionForge-OU 团队规模小** —— 长期维护可持续性观察
3. **绑死 Claude Code** —— 不支持其他 LLM / harness
4. **Gated Pipeline 配置复杂度** —— foreman.yaml 编写有学习曲线
5. **失败恢复策略仍待完善** —— 复杂失败场景（如部分门通过）处理不够细致

### 5.3 评分理由

**3 星（active）** —— Boris 风格开源实现 + Gated Pipeline 思想 + TUI 体验是其核心优势；对想跑无人值守 agent 流水线的工程团队有价值。扣分项是 star 数偏少、绑死 Claude Code、配置复杂度；但作为"agent 督导员"概念的工程实现，已达 3 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/VisionForge-OU/foreman |
| **主题标签** | https://github.com/topics/agent-loop?l=python |
| **Boris 风格引用** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [vibe-kanban.md](../ai-engineering/vibe-kanban.md) — 编码 agent Kanban 舰队管理
- [claude-mem.md](../ai-engineering/claude-mem.md) — 跨 agent 持久记忆
- [planning-with-files.md](../ai-engineering/planning-with-files.md) — 持久规划 skill