---
name: coleam00/Archon
url: https://github.com/coleam00/Archon
domain: ai-agents
type: framework
languages: [TypeScript, Python]
stars: 17000
forks: 3000
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [harness, ai-coding, workflow, claude-code, codex, devops, deterministic]
summary: 首个开源 AI 编程 harness 构建器，把 AI 写代码流程化、可重复、可审计——"n8n, but for software development"。
---

# Archon

## 1. 项目基本信息

| 字段 | 值 |
|------|----|
| 仓库 | [coleam00/Archon](https://github.com/coleam00/Archon) |
| 作者 | coleam00（GitHub 知名 AI 编程博主，YouTube "Cole Medin" 频道主理人） |
| 主语言 | TypeScript（Bun runtime）+ Python（旧版本 v1 task management） |
| License | MIT |
| 当前 Stars | ~17k（2026-08 持续上涨） |
| Commits | 1,717+ |
| 维护频度 | 几乎每天更新（PR/Issue 活跃） |

## 2. 技术栈 / 核心机制分析

**定位：** 解决"AI 写代码不可控"的痛点。Archon 不是另一个 AI 编程 agent，而是**包装 agent 的 agent**——让 Claude Code / Codex / Pi 跑在确定性的 YAML workflow 上。

**核心抽象：**

```yaml
# .archon/workflows/build-feature.yaml
nodes:
  - id: plan
    prompt: "Explore the codebase and create an implementation plan"
  - id: implement
    depends_on: [plan]
    loop:                          # AI 循环节点
      prompt: "Read the plan. Implement the next task. Run validation."
      until: ALL_TASKS_COMPLETE
    fresh_context: true            # 每次循环新会话
  - id: run-tests
    depends_on: [implement]
    bash: "bun run validate"       # 确定性节点，无 AI
  - id: review
    depends_on: [run-tests]
    prompt: "Review all changes against the plan"
  - id: approve
    depends_on: [review]
    loop:
      until: APPROVED
    interactive: true              # 人工 gate
  - id: create-pr
    depends_on: [approve]
    prompt: "Push changes and create a pull request"
```

**节点类型：**
- `prompt` — AI 节点（规划/实现/审查）
- `bash` — 确定性节点（跑测试/git 操作）
- `loop` + `until` — AI 循环（实现多步任务直到全部完成）
- `interactive` — 人工审批 gate

**关键技术能力：**
- **隔离执行：** 每次 workflow run 分配独立 git worktree，5 个 fix 可并行不冲突
- **可移植：** workflow YAML 提交到 `.archon/workflows/`，团队共用
- **多平台入口：** CLI / Web UI / Telegram / Slack / GitHub Webhook / Discord 同入口
- **后端：** Claude Code / Codex / Pi 三选一，BYOK

## 3. 核心功能特性

**19 个内置 workflow（节选）：**

| Workflow | 用途 |
|---------|------|
| `archon-idea-to-pr` | 想法 → 计划 → 实现 → 验证 → PR + 5 平行 review + self-fix |
| `archon-fix-github-issue` | GitHub issue → 分类 → 调查 → 实现 → PR |
| `archon-piv-loop` | Plan-Implement-Validate 三段循环 + 人工 review |
| `archon-smart-pr-review` | PR 复杂度分类 → 针对性 review agents → 汇总 |
| `archon-comprehensive-pr-review` | 5 平行 reviewer + 自动 fix |
| `archon-architect` | 架构扫描 / 复杂度降低 / 代码库健康 |
| `archon-refactor-safely` | 类型检查 + 行为验证的安全重构 |
| `archon-resolve-conflicts` | 合并冲突检测 + 双侧分析 + 自动 resolve |
| `archon-ralph-dag` | PRD 故事循环迭代 |
| `archon-adversarial-dev` | 0 到 1 构建完整 app（对抗式开发） |

**Web UI（Mission Control）：** 实时显示 workflow 运行状态、消息流、工具调用可视化、跨平台会话聚合（CLI + Slack + Telegram + Web 一处查看）。

## 4. 应用场景与已落地案例

- **个人开发者：** "Use archon to add dark mode to the settings page" → 自动 worktree 隔离 → 计划 → 实现 → 测试失败时重试 → 人工 review → 提 PR
- **小团队：** `.archon/workflows/` 提交到 repo，PR review / issue triage / 冲突解决全自动化
- **开源项目维护者：** GitHub Webhook 接 Archon，新 issue 自动分类路由到不同 workflow
- **AI 编程教学：** 通过 web UI 让学生直观看到"AI 写代码的每一步"，替代命令行盲跑

**与同类对比：**

| 项目 | 思路 | 区别 |
|------|------|------|
| **coleam00/Archon** | 流程引擎 | YAML workflow + 多 AI 编程 agent 后端 |
| [thedotmack/claude-mem](../ai-engineering/claude-mem.md) | 记忆层 | 仅 Claude Code 插件，记忆持久化 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | 教学 | Bash is all you need，Bare Metal 教学 |
| [multica-ai/multica](https://github.com/multica-ai/multica) | 任务分配 | 把 agent 当"真实队友"管理 |
| Claude Code Subagents | 官方机制 | 单 repo 内的子 agent，不跨项目 |

## 5. 个人评价

**优势：**
- **赛道定义者：** 第一个把"AI 编程 harness"概念产品化的开源项目，被引用为该赛道标杆
- **多 AI 编程 agent 后端：** Claude Code / Codex / Pi 三家通吃，避开厂商绑定
- **可观测性极强：** Mission Control 把工作流每步实时可视化，比 CLI 盲跑友好 10 倍
- **社区活跃：** 1.7k+ commits、几乎每天 merge，作者本人是 YouTube AI 编程教育者，传播力强

**不足：**
- **Bun runtime 门槛：** macOS/Linux x64 quick install 要求 AVX2，旧 CPU / VM 需源码编译
- **CLI 二进制不内嵌 Claude Code：** 需自行装 `claude` 然后 `export CLAUDE_BIN_PATH`
- **对 Anthropic / OpenAI 依赖：** BYOK 模式下 token 成本不可控
- **匿名遥测默认开：** 虽承诺不收集 PII/代码/prompt，但用户需手动 `ARCHON_TELEMETRY_DISABLED=1` 关

**评分理由：** 4 星。赛道首创 + 工程化完整 + 社区活跃 + 作者持续输出，已经是"AI 编程 harness"的事实标准；距 5 星只差"多 AI 编程 agent 平权"——目前 CLI 二进制对 Codex/Pi 的支持弱于 Claude Code。

## 6. 相关资源

| 类型 | 链接 |
|------|------|
| 文档站 | https://archon.diy/docs |
| The Book of Archon | 10 章叙事教程 |
| 配套平台 | multica-ai/multica（任务分配）/ obra/superpowers（技能框架） |
| 同类 | [claude-mem.md](../ai-engineering/claude-mem.md)（记忆层）/ [oh-my-codex.md](../ai-engineering/oh-my-codex.md)（Codex CLI 增强） |
| Claude Code 生态 | [agents-course.md](../ai-engineering/agents-course.md) / [ai-agents-for-beginners.md](../ai-engineering/ai-agents-for-beginners.md) |
| 多 Agent 综述 | [awesome-llm-apps.md](awesome-llm-apps.md) |
