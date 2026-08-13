---
name: BloopAI/vibe-kanban
url: https://github.com/BloopAI/vibe-kanban
domain: ai-engineering
type: tool
languages: [TypeScript, Rust]
stars: 27700
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [kanban, fleet-manager, coding-agent, claude-code, codex, multi-agent, parallel-execution]
summary: 把"编码 agent 当队员管理"的 Kanban —— 同时调度 Claude Code / Codex / Gemini CLI / AMP 多 agent 并行跑多个 ticket，~27.7k stars，"AI 工程团队的看板"
---

# Vibe-Kanban · 编码 agent 的 Kanban 舰队管理

> 收录日期：2026-08-13
> 仓库：https://github.com/BloopAI/vibe-kanban
> 来源：2026 年 GitHub Trending 高频上榜；bradAGI/awesome-cli-coding-agents 列为"运行多 agent 的标杆工具"

**一句话核心总结**：Vibe-Kanban 是给"AI 编码 agent 团队"用的看板 —— 一块板上同时跑 Claude Code、Codex、Gemini CLI、AMP 等多种 agent，每个 ticket 是一个独立 worktree，agent 在自己的隔离环境里执行 PR 级任务，"10× Claude Code 产出"的实际工作流。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Vibe-Kanban |
| **仓库地址** | https://github.com/BloopAI/vibe-kanban |
| **所属组织** | BloopAI |
| **描述** | Get 10X more out of Claude Code, Codex or any coding agent |
| **开源许可** | MIT |
| **Star 数** | ~27,700（截至 2026-08） |
| **技术类型** | tool（fleet manager） |
| **底层栈** | TypeScript（前端）+ Rust（后端） |

---

## 二、技术栈与架构分析

### 2.1 核心架构

| 模块 | 作用 |
|------|------|
| **Board UI** | Kanban 界面：Backlog / In Progress / In Review / Done |
| **Agent Adapter 层** | 适配 Claude Code / Codex / Gemini CLI / AMP / Aider 等 |
| **Worktree Manager** | 每个 ticket 自动创建独立 Git worktree，agent 间零冲突 |
| **Diff Viewer** | 内置 diff 视图，PR-ready 评审 |
| **Attempt Logger** | 每次 agent 执行的 prompt / 工具调用 / diff 全量留痕 |

### 2.2 多 agent 并行

同一时间可在多个 ticket 上跑不同 agent：
- Ticket A：Claude Code（Sonnet 4.5）
- Ticket B：Codex
- Ticket C：Gemini CLI
- 互不干扰，每个都在自己的 worktree 里写代码

### 2.3 Rust 后端的性能取舍

Web 后端用 Rust（Tauri / Actix-Web 系），保证：
- 长时间跑多 agent 不泄漏内存
- WebSocket 实时推送执行状态
- 启动速度 < 1s

---

## 三、核心功能特性

### 3.1 一键启动 Claude Code / Codex

不用手动起多个 terminal 窗口；在 UI 上点"New Attempt"，自动拉起对应 agent 进程，连 prompt 模板都内置。

### 3.2 Worktree 隔离

每个 ticket 独立 worktree：agent A 改 main 分支，agent B 改 feature-2，互不冲突；完成后自动产出 PR。

### 3.3 Diff Review UI

每个 ticket 都看得到"agent 打算改什么" —— diff viewer 内置，支持 approve / reject / request changes。

### 3.4 Attempt 追溯

每个 ticket 记录：
- 用了哪个 model
- prompt 模板
- 工具调用序列
- 产生的 diff
- 最终输出

可重放、可对比、可分享给团队成员。

### 3.5 真实 PR 流程

不是"agent 改了文件"，而是产出实际 PR；与 GitHub / GitLab 集成，CI 跑完直接合并。

---

## 四、应用场景与本仓库关联

### 4.1 个人开发者

- 同时推进多个 feature / bugfix，agent 并行跑
- 减少"开多个 terminal 切来切去"的认知开销

### 4.2 小团队 / Startup

- 2-5 人工程团队，AI 加速 10×
- 每人每天产出从 1-2 个 PR → 5-10 个 PR

### 4.3 AI 重度用户

- 已经订阅 Claude Code / Codex / Gemini CLI 多家的"agent 收藏家"
- 想统一管理多 agent 调度，而不是各自维护 prompt 模板

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [opencode.md](opencode.md) | Vibe-Kanban 可调度 opencode 作为 fleet 中的一个 agent |
| [oh-my-codex.md](oh-my-codex.md) | 都是"多 agent 协作"思路，oh-my-codex 走 Codex 之上的 workflow，Vibe-Kanban 走 UI 层 fleet |
| [agents-cloudflare.md](agents-cloudflare.md) | 云端 Durable Objects 上的 stateful agent + Vibe-Kanban 本地 fleet 可互补 |

---

## 五、个人评价

### 5.1 优势

1. **解决真实痛点** —— "agent 多起来后调度难"是当下开发者最头疼的问题
2. **worktree 隔离** —— 并行 agent 不冲突的工程解法，工程味道浓
3. **agent 无关** —— 支持 Claude Code / Codex / Gemini CLI / Aider 等多 provider，不绑死任何一家
4. **Diff Review UI** —— 把 agent 输出"PR 化"，符合团队协作流程

### 5.2 不足

1. **本地工具属性** —— 不是 SaaS，团队协作需要自托管或共享实例
2. **worktree 数量上限** —— 极端并行（> 20 个 ticket）时 Git worktree 开销需注意
3. **agent 输出质量仍取决于底层模型** —— Vibe-Kanban 本身不优化 prompt，需用户自己调
4. **新项目，文档偏少** —— 主要靠 README + 视频 demo，深度使用靠摸索

### 5.3 评分理由

**4 星（active）** —— 把"AI agent 团队管理"这一空白赛道填上；worktree + diff UI + attempt logger 三个特性对应真实痛点；27.7k stars 与 GitHub Trending 表现验证市场认可。扣分项是本地工具的协作属性、并行上限、文档密度；但作为"AI PM 视角的多 agent 工具"，已达到最佳实践水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/BloopAI/vibe-kanban |
| **社区文章** | https://medium.com/@PowerUpSkills/every-developer-wants-vibe-kanban-the-next-step-in-managing-your-ai-coding-agents-398e3cc90764 |
| **同类对比** | https://github.com/bradagi/awesome-cli-coding-agents |

### 关联项目

- [opencode.md](opencode.md) — 多 provider 编码 agent，可作为 fleet 成员
- [oh-my-codex.md](oh-my-codex.md) — Codex 之上的工作流引擎（思路相似）
- [agents-cloudflare.md](agents-cloudflare.md) — Cloudflare Agents SDK，云端 stateful agent