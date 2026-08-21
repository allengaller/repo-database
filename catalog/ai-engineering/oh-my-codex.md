---
name: Yeachan-Heo/oh-my-codex
url: https://github.com/Yeachan-Heo/oh-my-codex
domain: ai-engineering
type: framework
languages: [TypeScript]
stars: 17000
forks: 1600
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [codex-cli, codex-enhancement, omx, agentic-workflow, multi-agent, tmux, worktree, deep-interview, ralplan, ultragoal]
lineage: oh-my-zsh
summary: Codex CLI 之上的"工作流引擎" — OmX（Oh My codeX），通过 $deep-interview / $ralplan / $ultragoal / $team / $ralph 把 Codex 升级为有记忆/会规划/可协作的工程化 AI 团队，~17k stars
---

# Oh-My-Codex (OMX) · Codex CLI 的工作流引擎

> 收录日期：2026-08-04
> 仓库：https://github.com/Yeachan-Heo/oh-my-codex
> 来源：2026-04 GitHub Trending 高频上榜（周榜 Top 1 + 日榜 Top 2）

**一句话核心总结**：OMX（Oh My codeX）是 OpenAI Codex CLI 之上的**工作流增强层**——不替换 Codex，而是给它加 `$deep-interview` 需求澄清、`$ralplan` 计划审批、`$ultragoal` 持久执行、`$team` 多 Agent 并行 tmux 协作，让"单兵作战"的 Codex 升级为"懂规划、有记忆、会协作"的工程化 AI 团队。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Oh-My-Codex（OMX，Oh My codeX） |
| **仓库地址** | https://github.com/Yeachan-Heo/oh-my-codex |
| **所属组织/作者** | Yeachan-Heo（Yeachan Heo） |
| **描述** | Your codex is not alone. Add hooks, agent teams, HUDs, and so much more. |
| **开源许可** | MIT |
| **Star 数** | ~17,000（截至 2026-04-05 官方数据 16,333） |
| **Fork 数** | ~1,600 |
| **技术类型** | framework（workflow layer） |
| **当前主版本** | v0.14.0（interactive orchestration） |
| **运行依赖** | Node.js 20+、Codex CLI、tmux（macOS/Linux） |

---

## 二、技术栈 / 架构

### 2.1 核心架构分层

```
┌─────────────────────────────────────────┐
│          OMX 工作流层                    │
│  $deep-interview / $ralplan /            │
│  $ultragoal / $team / $ralph             │
│  .omx/ 持久化（plans/logs/memory/state）  │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│          Codex CLI（执行引擎）             │
│  实际做工具调用 / 文件修改 / 测试运行      │
└──────────────────────────────────────────┘
```

### 2.2 4 大核心技能

| 命令 | 用途 |
|------|------|
| **`$deep-interview`** | 深度访谈澄清需求边界（不写代码，先问清楚） |
| **`$ralplan`** | 把澄清结果转为可审批实施计划 |
| **`$ultragoal` / `$ultrawork` / `$autopilot`** | 持久目标化执行（带 checkpoint） |
| **`$team`** | 多 Agent 并行（tmux + worktree 隔离） |
| **`$ralph`** | 单一 owner 持续执行循环 |
| **`$prometheus-strict`** | 高风险任务的访谈/批评/合成严格化 |

### 2.3 .omx/ 目录结构（项目级持久化）

```
.omx/
├── plans/                # 实施计划（auth-plan-2026-04-05.md）
├── interviews/           # 访谈记录（auth-interview.md）
├── logs/                 # 执行日志（ralph-auth-2026-04-05.log）
├── memory/               # 项目记忆（decisions / pitfalls / conventions）
├── teams/                # 团队协作状态 + 消息 + worktree
├── state/                # 运行时状态（current-mode.json）
└── ultragoal/            # 持久目标 ledger + checkpoint
```

### 2.4 30+ 内置专家角色

| 类别 | 角色 |
|------|------|
| 架构设计 | `$architect`、`$tech-lead`、`$database-designer` |
| 执行实现 | `$executor`、`$refactor-specialist`、`$debugger` |
| 质量与安全 | `$code-reviewer`、`$security-reviewer`、`$test-engineer`、`$performance-analyst` |
| 文档沟通 | `$tech-writer`、`$api-designer`、`$oncall` |

### 2.5 关键技术

- **Worktree 隔离**：每个 Agent 独立 git worktree，互不污染
- **tmux 持久化**（macOS/Linux）/ psmux（Windows，less-supported）
- **Native Codex hooks**（`~/.codex/hooks.json`）+ Plugin hooks
- **AGENTS.md 持久化指导**（project + user 双 scope）
- **scoped setup**：`omx setup --scope project --merge-agents` 或 `--scope user`

### 2.6 v0.14.0 新增（interactive orchestration）

- `omx question` 结构化交互入口（first-party blocking-question）
- `deep-interview` 问题跟踪（pending/required/satisfied lifecycle）
- Advisory triage classifier（PASS/LIGHT/HEAVY 自动分级）
- Autoresearch 强制 validator-gated + skill-first
- Runtime stop/continue 语义统一

---

## 三、核心功能特性

### 3.1 $deep-interview 深度访谈

> 以前用 Codex 最头疼的就是需求不清楚时它就开始瞎猜。

```
> $deep-interview "给系统添加用户认证功能"
🤔 开始深度访谈...
Q1: 认证方式选择 - JWT vs Session? 是否需要刷新令牌?
Q2: 第三方登录 - Google/GitHub/微信? OAuth 2.0 流程?
Q3: 安全等级 - 密码强度? 双因素? Session 过期?
✅ 访谈完成 → .omx/interviews/auth-2026-04-05.md
```

### 3.2 $ralplan 计划审批

```
> $ralplan "审批用户认证实施计划"
📋 实施计划生成中...
【架构决策】✓ JWT + Redis、✓ 前后端分离、✓ Google/GitHub OAuth
【文件变更】- backend/auth/jwt.ts、- backend/routes/auth.ts ...
【技术权衡】⚖️ JWT: 分布式友好 / 代价: 无法主动失效
【风险点】⚠️ XSS → HttpOnly Cookie、⚠️ CSRF → Token
【工作量】3-4 天
是否批准此计划?(y/n/修改建议)
```

### 3.3 $ultragoal / $ralph 持续执行

**Ultragoal** = 持久多目标（带 checkpoint ledger）  
**Ralph** = 单一 owner 不放弃执行（relentless alpha）

```
> $ralph "执行用户认证实施计划"
🔄 Ralph 持续执行循环启动...
[Step 1/5] 创建数据库迁移文件  ✅
[Step 2/5] 实现 JWT 工具类      ❌ token 过期未设置 → 🔧 修复 → ✅
[Step 3/5] 创建认证路由         ✅
[Step 4/5] 实现认证中间件       ✅
[Step 5/5] 前端登录页面         ✅
✨ 所有任务完成!共修复 3 个问题,运行 28 个测试,全部通过。
```

### 3.4 $team 多 Agent 并行

```
> $team 3:executor "重构电商模块"
🚀 启动 3 个 Agent 团队...
Agent-1 [Frontend]   tmux: omx-team-1  ░░ 80%   等待后端 API
Agent-2 [Backend]    tmux: omx-team-2  █ 100% ✅ 通知 Agent-1
Agent-3 [Database]   tmux: omx-team-3  ░░ 60%   执行迁移脚本
💬 [14:32] Agent-2 → Agent-1: "订单 API v2 已完成"
```

**协作机制**：
- 每个 Agent 独立 tmux session + git worktree
- 互不干扰，独立提交
- 通过 `.omx/teams/<name>/messages.json` 共享消息

### 3.5 安全保障

| 机制 | 说明 |
|------|------|
| **Git Worktree 隔离** | main 分支保护，Agent 各自独立 |
| **完整审计日志** | `.omx/logs/audit.log` 记录每步操作 |
| **决策可追溯** | 每个决策记录批准人/时间戳/影响范围 |
| **故障快速恢复** | `omx team rollback --to-commit <sha>` |
| **`--madmax` 显式风险提示** | bypass approvals + sandbox 仅 trusted repo |

### 3.6 omx hud 监控

```bash
$ omx hud --watch
🎯 当前任务: 电商模块重构   📊 78%   ⏱️ 2h 15m
🟢 Agent-1 [architect] 审查 src/services/order.ts
🟢 Agent-2 [executor]  重构 src/api/products.ts (15/20)
🟡 Agent-3 [test-engineer] 等待代码完成
按 'q' 退出 | 'r' 刷新 | 't' 切换团队视图
```

---

## 四、应用场景与已落地案例

### 4.1 软件开发团队

- 大型项目多人/多模块并行开发
- 敏捷团队的"AI 团队成员"补充
- 标准化开发流程（$deep-interview → $ralplan → $ralph）

### 4.2 个人开发者

- 个人项目的"虚拟团队"
- 复杂任务（重构、迁移、调试）的结构化推进
- 长期项目的连续性（.omx/ 记忆）

### 4.3 复杂任务协调

- 前端/后端/数据库 3 角色同步推进
- 多个 breaking change 协调同步
- CI 失败时 `$ralph` 持续修复

### 4.4 高风险场景

- `$prometheus-strict` 用于"高风险"任务（auth、payment、data migration）
- 三阶段：访谈 → 批评 → 合成
- 严格的 validator-gated 流程

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [PenguinHarness](../ai-agents/penguin-harness.md) | 都做 harness 层，OMX 强 Codex 专属，PenguinHarness 跨 AI 助手 |
| [OpenClaw](../ai-agents/openclaw.md) | 都是"个人 AI 团队"思路，OMX 走 CLI 路线，OpenClaw 走 GUI |
| [Kimi CLI](../ai-engineering/kimi-cli.md) | 都通过 ACP/MCP 集成 IDE，OMX 是 Kimi CLI 的对照（都做工作流层） |
| [Agent-Lightning](../ai-engineering/agent-lightning.md) | OMX 解决"执行"问题，Agent-Lightning 解决"训练"问题 |
| [Claude-Mem](../ai-engineering/claude-mem.md) | OMX 的 `.omx/memory` 是 project-scoped，claude-mem 是 session-scoped |

---

## 五、个人评价

### 优势

1. **解决 Codex 真痛点**：会话失忆 + 不会规划 + 不会协作，OMX 三个全打
2. **结构化工作流清晰**：`$deep-interview` → `$ralplan` → `$ultragoal` → `$team` 链路完整
3. **多 Agent 协作实用**：tmux + worktree 隔离是真工程化方案
4. **持久化项目记忆**：`.omx/memory/` 让项目级连续性成为可能
5. **专家角色系统**：30+ 角色覆盖架构/执行/质量/文档
6. **安全保障充分**：worktree 隔离 + 审计日志 + 决策追溯
7. **活跃迭代**：v0.14.0 引入 omx question 交互入口

### 不足

1. **仅 macOS/Linux 主推**：Windows 用户需 WSL2 或 psmux，"目前 receive less support"
2. **依赖 Codex CLI**：必须先有 codex + 认证，对纯 OpenAI 生态外的用户不友好
3. **`--madmax` 安全模型**：需用户主动判断 trusted repo，否则 bypass approvals 有风险
4. **学习曲线陡**：30+ 角色 + 5+ 主命令 + 多 scope setup，新人需读 docs/getting-started
5. **stars 体量相对小**（~17k）：相比 OpenClaw (380k+) 用户群仍有差距

### 评分理由：⭐⭐⭐⭐ (4/5)

- 5x 增长曲线 + 工作流设计清晰 + 真工程化保障
- 不给 5 星：平台支持不均 + 强依赖 Codex + 角色系统学习成本

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/Yeachan-Heo/oh-my-codex |
| **官方网站** | https://github.com/Yeachan-Heo/oh-my-codex-website |
| **Getting Started** | https://github.com/Yeachan-Heo/oh-my-codex/blob/main/docs/getting-started.html |
| **Discord 社区** | 见 README 顶部 |
| **npm 包** | `npm install -g oh-my-codex` |

### 关联项目

- [PenguinHarness](../ai-agents/penguin-harness.md) — 编码 agent harness
- [Kimi CLI](../ai-engineering/kimi-cli.md) — Moonshot 编码 CLI
- [OpenClaw](../ai-agents/openclaw.md) — 个人 AI 助理
- [Claude-Mem](../ai-engineering/claude-mem.md) — Claude Code 持久记忆
- [Agent-Lightning](../ai-engineering/agent-lightning.md) — Agent 训练框架
