---
name: OthmanAdi/planning-with-files
url: https://github.com/OthmanAdi/planning-with-files
domain: ai-engineering
type: tool
languages: [Markdown, Shell]
stars: 26000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [planning-skill, claude-code, persistent-memory, markdown-files, manus-style, session-recovery, agent-skills]
lineage: original
summary: Manus 风格的文件式持久规划技能 — 把 task_plan.md / findings.md / progress.md 当作 agent 的"工作记忆"，跨 /clear / compaction 不丢任务状态，~26k stars，Claude Code 上最受欢迎的单 skill 之一
---

# Planning-with-Files · 文件式持久规划

> 收录日期：2026-08-13
> 仓库：https://github.com/OthmanAdi/planning-with-files
> 来源：Claude Code skill 包生态"复刻 Manus 风格"代表项目；best-of-Agent-Harnesses 在"Claude Code skill packs"中列出

**一句话核心总结**：Planning-with-Files 是 OthmanAdi 出品的 Claude Code 持久规划 skill —— 把 task_plan.md / findings.md / progress.md 当作 agent 的"工作记忆"，让 Claude Code 在 /clear / compaction 之后仍能续上工作而不丢任务，~26k stars，"Agent Skills 标准"下的"经典范例"。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | planning-with-files |
| **仓库地址** | https://github.com/OthmanAdi/planning-with-files |
| **所属作者** | OthmanAdi |
| **描述** | Persistent file-based planning for AI coding agents and long-running tasks. Crash-proof markdown plans, session recovery after /clear/compaction, and a deterministic completion gate — Manus-style planning as a drop-in harness layer |
| **开源许可** | MIT |
| **Star 数** | ~26,000（截至 2026-08） |
| **技术类型** | tool（Claude Code skill） |
| **底层栈** | Markdown + Shell |

---

## 二、技术栈与架构分析

### 2.1 三大核心文件

| 文件 | 作用 |
|------|------|
| **task_plan.md** | 当前任务的完整计划：目标 / 步骤 / 依赖 / 进度 |
| **findings.md** | 调研 / 探索中发现的 fact：代码位置 / 命令结果 / 引用 |
| **progress.md** | 时间线：每一步做了 / 决定 / 下一步 |

agent 不再依赖上下文窗口记忆，而是把这三份文件当作"硬盘上的工作记忆"。

### 2.2 Manus 风格的设计灵感

参考 Manus（早期自主 agent）的工作方式：每次操作前更新 plan，操作中记录 findings，操作后归档 progress。这套模式在 LLM 上下文窗口有限时尤为重要。

### 2.3 完成 gate（确定性终止）

skill 强制约定：只有 `progress.md` 显示所有 step 完成，才算任务结束；agent 不会"误以为做完了"。

### 2.4 与 claude-mem 的差异

| 维度 | planning-with-files | claude-mem |
|------|---------------------|------------|
| 焦点 | 单任务的完整规划 | 跨会话的语义记忆 |
| 持久化粒度 | 任务级（task plan） | 会话级（observation） |
| 数据形式 | Markdown 文件 | SQLite + ChromaDB |
| 检索 | 全文读 | 语义搜索 |
| 适用 | 长任务 / 多步骤 / 易中断 | 长期跨日 / 跨周项目 |

两者**互补**：planning-with-files 解决"任务中途被打断"，claude-mem 解决"上次会话说过什么"。

---

## 三、核心功能特性

### 3.1 抗 /clear / compaction

Claude Code 的 `/clear` 会清空上下文；context compaction 也会丢早期信息。planning-with-files 把任务状态落到磁盘，agent 在 compaction 后读回文件即可续上。

### 3.2 抗崩溃

agent 崩溃 / 终端断电 / 网络断开后，重新启动会话：
1. Claude Code 自动加载 planning-with-files skill
2. 读 task_plan.md 知道目标
3. 读 progress.md 知道做了哪些
4. 读 findings.md 知道已知事实
5. 继续下一步

### 3.3 跨工具协作可见

不同 agent / 不同 harness 间通过 Markdown 文件通信：
- Agent A 写 task_plan.md
- Agent B 读 task_plan.md 接手
- 跨 Anthropic Skills / OpenAI / 本地模型都识别 Markdown

### 3.4 Git-as-history

三份文件天然适合 Git 管理：每次 commit 留痕，可回滚 / diff。

### 3.5 团队可读

Markdown 让人也能直接审阅 agent 在做什么；新成员 onboarding 直接看 task_plan.md 就懂项目状态。

---

## 四、应用场景与本仓库关联

### 4.1 长任务（多步骤 / 跨日）

- 一次会话跑不完的重构 / 迁移 / 新功能开发
- 跨 /clear / compaction 续上

### 4.2 多 agent 协作

- Agent A 调研 / Agent B 实现 / Agent C 验证
- 通过 task_plan.md 协调

### 4.3 团队透明

- 让团队成员也能审阅 agent 当前在做什么
- task_plan.md 当作"项目看板"

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [claude-mem.md](claude-mem.md) | 互补：planning-with-files 是任务级，claude-mem 是会话级 |
| [skills.md](skills.md) | 完美符合 SKILL.md 标准，可直接接入 |
| [superpowers.md](superpowers.md) | Superpowers 中的 writing-plans / using-git-worktrees 与本 skill 同源思路 |
| [kimi-cli.md](kimi-cli.md) | Kimi CLI 的"5 天长链路"自主执行同样依赖类似的持久规划 |

---

## 五、个人评价

### 5.1 优势

1. **解决真痛点** —— /clear 与 compaction 是 Claude Code 用户最大痛点之一
2. **极简 + 透明** —— 三个 Markdown 文件 + SKILL.md 指令，零外部依赖
3. **跨 harness 兼容** —— 任何支持 SKILL.md 标准的 harness 都能用
4. **Manus 范式落地** —— 把"agent 持久规划"从概念变成工程实现
5. **Git 友好 + 团队透明** —— Markdown 文件天然可审阅、可版本化

### 5.2 不足

1. **26k stars 主要来自单一 skill 性质** —— 不像 Superpowers 是 50+ skill 的集合
2. **维护节奏不明** —— 主要靠 OthmanAdi 个人驱动，长期 roadmap 不清晰
3. **Markdown 检索弱** —— 不如 SQLite + 向量检索的语义能力
4. **大任务下文件膨胀** —— 长期任务的 task_plan.md / findings.md 可能变得难以导航
5. **缺乏可视化工具** —— 需要第三方 GUI 才能直观看到任务进度

### 5.3 评分理由

**4 星（active）** —— 解决真痛点 + 极简透明 + 跨 harness 兼容 + Git 友好；Manus 范式的最佳工程实现；可与 claude-mem / Superpowers 形成完整生态。扣分项是个人项目维护节奏、Mardown 检索能力、文件膨胀；但作为"持久规划 skill"的标杆，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/OthmanAdi/planning-with-files |
| **MCP 接入** | https://skillsovermcp.com/connect/OthmanAdi/planning-with-files |
| **Wiki** | https://github.com/OthmanAdi/planning-with-files/wiki |
| **衍生版本** | https://github.com/soucod/planning-with-files-skill |

### 关联项目

- [claude-mem.md](claude-mem.md) — 跨 agent 持久记忆（会话级）
- [skills.md](skills.md) — Anthropic 官方 Skill 标准
- [superpowers.md](superpowers.md) — 跨 harness 工程方法论
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的编码 agent