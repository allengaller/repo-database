---
name: google-antigravity/antigravity-cli
url: https://github.com/google-antigravity/antigravity-cli
domain: ai-agents
type: tool
languages: [TypeScript, Python]
stars: 1900
forks: 0
license: Apache-2.0
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [google-antigravity, cli, gemini, agent-harness, terminal, vibe-coding, official]
summary: Google 官方 Antigravity agent harness 的 CLI 端 — 把 Antigravity 的推理 / 执行 / 编排能力搬进 terminal，自然语言驱动代码编辑 / GitHub 操作 / 任务编排，~1.9k stars，Google agent 战略的官方外延
---

# Antigravity CLI · Google 官方 Agent Harness 的终端版

> 收录日期：2026-08-13
> 仓库：https://github.com/google-antigravity/antigravity-cli
> 来源：Google Antigravity 团队；2026 年 Google agent 战略的官方 CLI 外延

**一句话核心总结**：Antigravity CLI 是 Google 出品的 Antigravity agent harness 终端版 —— 把 Antigravity 的推理 / 执行 / 编排能力搬进 terminal，自然语言驱动代码编辑 / GitHub 操作 / 任务编排，背后是 Gemini 系列模型，~1.9k stars，Google agent 战略的官方外延。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Antigravity CLI |
| **仓库地址** | https://github.com/google-antigravity/antigravity-cli |
| **所属组织** | Google Antigravity |
| **描述** | Antigravity CLI brings the reasoning, execution, and orchestration capabilities of Antigravity agent harness directly into your terminal |
| **开源许可** | Apache-2.0 |
| **Star 数** | ~1,900（截至 2026-08） |
| **技术类型** | tool（CLI） |
| **底层栈** | TypeScript + Python + Gemini |

---

## 二、技术栈与架构分析

### 2.1 Antigravity Harness

Antigravity 是 Google 推出的 agent 平台 / IDE：
- Web 版：https://antigravity.google
- CLI 版：本项目
- VS Code / JetBrains 插件

CLI 是 Antigravity 全家桶的一部分。

### 2.2 Gemini 后端

- 默认使用 Gemini 系列模型
- 也支持 OpenAI / Anthropic API（兼容层）
- 用户可指定本地 / 自定义模型

### 2.3 终端体验

```bash
$ antigravity "Refactor the auth module to use JWT"

> Planning...
> Step 1/5: Read current auth.py
> Step 2/5: Identify JWT candidates
> Step 3/5: Generate refactor patch
> Step 4/5: Run tests
> Step 5/5: Commit

Done. Changes pushed to PR #234.
```

### 2.4 Vibe Coding

强调"自然语言驱动开发"：
- 不需要记命令
- 不需要写 regex
- 自然语言 = 编程语言

### 2.5 GitHub 集成

- 自动开 PR
- 自动 review
- 自动 merge（如配置）

---

## 三、核心功能特性

### 3.1 自然语言任务

任何任务用自然语言描述：
- "把数据库连接池从 10 改成 50"
- "为这个函数写单元测试"
- "查找所有 TODO 并列清单"

### 3.2 多步任务编排

- 自动拆解为多步
- 每步可视化进度
- 失败可回滚 / 重试

### 3.3 代码搜索 / 重构

- 跨文件搜索
- 大规模重构
- 依赖分析

### 3.4 测试 / Lint 集成

- 自动跑测试
- 自动跑 linter
- 自动修复 lint 错误

### 3.5 多 IDE / 多平台

- macOS / Linux / Windows
- VS Code / JetBrains / Vim
- 终端原生

---

## 四、应用场景与本仓库关联

### 4.1 Google 技术栈用户

- 用 GCP / Firebase / Vertex AI 的团队
- 想用 Gemini 但不想离开终端

### 4.2 Vibe Coding 实践

- 自然语言驱动开发
- 不依赖传统 IDE

### 4.3 评估 Google agent 能力

- Google 在 agent 领域追赶 Anthropic / OpenAI
- Antigravity CLI 是 Google 的"答卷"

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [opencode.md](../ai-engineering/opencode.md) | 同为 terminal-native coding CLI，opencode 偏开源、antigravity 偏 Google |
| [crush.md](../ai-engineering/crush.md) | crush 也是 terminal agent，antigravity 是 Google 版 |
| [vibe-kanban.md](../ai-engineering/vibe-kanban.md) | vibe-kanban 强调多 agent 协作，antigravity CLI 偏单 agent |
| [oh-my-pi.md](../ai-engineering/oh-my-pi.md) | 都是 coding agent CLI，oh-my-pi 偏 Kimi、antigravity 偏 Gemini |

---

## 五、个人评价

### 5.1 优势

1. **Google 官方出品** —— 信用 + 长期投入保障
2. **Gemini 后端** —— 顶级模型能力，长上下文 + 多模态
3. **终端体验流畅** —— natural language → coding 闭环好
4. **多 IDE 支持** —— 不绑死单一 IDE
5. **GitHub 集成深** —— 自动 PR / review / merge

### 5.2 不足

1. **1.9k stars 偏少** —— 对比 Claude Code 14k+ / opencode 19.7k 差距明显
2. **Google 战略不确定** —— 历史 Google kill 项目前科（Killed by Google）
3. **依赖 Gemini** —— 强绑 Google 生态
4. **企业可用性待观察** —— 数据隐私 / 合规 / SSO 等企业功能
5. **与 Web 版功能差距** —— CLI 版可能比 IDE 版少部分功能

### 5.3 评分理由

**3 星（active）** —— Google 官方出品 + Gemini 后端 + 终端体验是其核心优势；对 Google 技术栈用户尤其有价值。扣分项是 star 数偏少、Google 战略不确定、Gemini 强绑；但作为"Google agent 战略的官方外延"，已达 3 星水平。给 3 星而非 4 星是因为 Google 历史 kill 项目记录需要观察。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/google-antigravity/antigravity-cli |
| **产品主页** | https://antigravity.google/product/antigravity-cli |
| **Codelab** | https://codelabs.developers.google.com/antigravity-cli-hands-on |

### 关联项目

- [opencode.md](../ai-engineering/opencode.md) — 开源终端 coding CLI
- [crush.md](../ai-engineering/crush.md) — Charm 出品的 terminal agent
- [vibe-kanban.md](../ai-engineering/vibe-kanban.md) — 多 agent Kanban 编排
- [oh-my-pi.md](../ai-engineering/oh-my-pi.md) — Kimi 系 coding CLI
