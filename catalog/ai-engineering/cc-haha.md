---
name: NanmiCoder/cc-haha
url: https://github.com/NanmiCoder/cc-haha
domain: ai-engineering
type: application
languages: [TypeScript]
stars: 14000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [desktop-workspace, claude-code, multi-agent, git-worktree, skill-marketplace, agent-harness, local-first]
summary: 本地优先的桌面 agent 工作空间 — 多 agent 会话 + Git worktree + skill 市场 + 聊天 App 接入（微信/Telegram/WhatsApp），~14k stars，Claude Code "本地可运行 + 多端可达"的复刻方案
---

# cc-haha · Claude Code 风格的桌面工作空间

> 收录日期：2026-08-13
> 仓库：https://github.com/NanmiCoder/cc-haha
> 来源：2026-05 媒体"6 个 Claude Code 衍生项目"长报道之一；best-of-Agent-Harnesses 列为"local-first desktop harness"

**一句话核心总结**：cc-haha 是 Claude Code 源码泄露后第一个能本地跑通的开源复刻 —— 多 agent 会话 + Git worktree + skill 市场 + 跨聊天 App（微信 / Telegram / WhatsApp）部署，~14k stars，把"Claude Code 体验 + 本地优先 + 多端可达"打包成桌面应用。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | cc-haha |
| **仓库地址** | https://github.com/NanmiCoder/cc-haha |
| **所属作者** | NanmiCoder |
| **描述** | Local-first cross-platform desktop workspace for Claude Code / agents: multi-agent, Git worktrees, code diffs, skill marketplace, and chat-app access (WeChat / Telegram / WhatsApp) |
| **开源许可** | MIT |
| **Star 数** | ~14,000（截至 2026-08） |
| **技术类型** | application（桌面 agent harness） |
| **底层栈** | TypeScript + Tauri / Electron（桌面）+ 跨端适配 |

---

## 二、技术栈与架构分析

### 2.1 三大支柱

| 支柱 | 内容 |
|------|------|
| **多 agent 会话** | 同时跑多个 agent，UI 上有 tab 切换 |
| **Git worktree** | 每个 agent 一个 worktree，零冲突 |
| **Skill 市场** | 内置 skill marketplace，可一键安装第三方 skill |

### 2.2 跨聊天 App 接入

把 agent 接到聊天 App 是一大亮点：

| 平台 | 集成方式 |
|------|---------|
| **微信** | 公众号 / 个人号 webhook |
| **Telegram** | Bot API |
| **WhatsApp** | WhatsApp Business API |
| **飞书 / Discord / Slack** | 通用 webhook |

agent 不只在桌面 UI 内可用，微信里发条消息也能驱动。

### 2.3 与 Claude Code 的关系

| 维度 | cc-haha | Claude Code（闭源） |
|------|---------|---------------------|
| 源码 | 100% OSS（基于泄露源码的本地化复刻） | 闭源 |
| 模型绑定 | 多 provider 灵活 | Claude 绑定 |
| 部署 | 本地 / 自托管 | 官方托管 |
| 聊天 App | 内置 | 需自行集成 |
| 合规 | 可商用 | 接受 Anthropic ToS |

### 2.4 衍生背景

cc-haha 诞生于 2026 年 5 月某次 Claude Code 源码"未经官方授权"公开事件 —— 原泄露代码"缺失文件、跑不起来"，cc-haha 是第一个能本地完整跑通的社区复刻版本。这一背景使其 AGENTS.md 与 Anthropic 官方 CLI 高度相似。

---

## 三、核心功能特性

### 3.1 本地优先 + 跨平台

macOS / Linux / Windows 全平台桌面应用；所有 session / skill / 记忆数据存本地 SQLite。

### 3.2 多 agent 并行

UI 左侧 agent 列表，右侧 tab 切换；每个 agent 独立 worktree 跑独立任务。

### 3.3 Skill Marketplace

内置 skill 注册中心：
- `claude-mem`：跨会话记忆
- `web-search`：联网搜索
- `mcp-server-bridge`：MCP 协议桥接
- 社区贡献的 100+ skill 一键安装

### 3.4 跨聊天 App

微信 / Telegram / WhatsApp 上发消息驱动 agent；agent 主动 push 结果回聊天。

### 3.5 隐私与合规

- 数据全本地，不上云
- 适配企业合规场景
- 与 Anthropic 官方 ToS 兼容问题需开发者自行评估

---

## 四、应用场景与本仓库关联

### 4.1 想"Claude Code 体验 + 任意模型 + 本地"的开发者

- 多 provider 灵活选择
- 数据不出本地
- 可商用

### 4.2 跨聊天 App 的个人助理

- 微信 / Telegram 上随时驱动 agent
- 不必"开终端"也能用

### 4.3 团队内"Claude Code 风格"工具落地

- 企业内分发
- 团队成员共享 skill

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [openclaw.md](../ai-agents/openclaw.md) | openclaw 走 chat-app-first，cc-haha 走 desktop-first，可对照 |
| [claude-mem.md](claude-mem.md) | skill marketplace 内置 claude-mem 适配 |
| [oh-my-codex.md](oh-my-codex.md) | 都是"在 harness 之上加 workflow"，但 oh-my-codex 走 Codex 路线 |
| [penguin-harness.md](../ai-agents/penguin-harness.md) | 同样是 harness 思路，但 penguin 走自进化方向 |

---

## 五、个人评价

### 5.1 优势

1. **填补"本地 Claude Code"空白** —— 在 Anthropic 官方不开源的情况下提供 100% OSS 替代
2. **跨聊天 App 接入** —— 微信 / Telegram / WhatsApp 三端覆盖，对中文用户尤其友好
3. **Skill 市场** —— 与 Anthropic Skills / Superpowers 等技能生态打通
4. **本地优先 + 合规友好** —— 企业内分发、数据不出本地的现实需求

### 5.2 不足

1. **合规与版权风险** —— 基于源码泄露事件的复刻，与 Anthropic 官方关系暧昧，社区需自行评估
2. **14k stars 对比 Claude Code 数十万 stars，生态规模较小**
3. **维护可持续性存疑** —— 主要靠 NanmiCoder 个人驱动，长期 roadmap 不清晰
4. **多 provider 接入深度不及 opencode / kimi-cli** —— 模型适配广度需观察
5. **项目处于"vibe coding 产物"阶段** —— 与正式工程化产品相比，issue 响应 / 文档 / 测试覆盖度均偏弱

### 5.3 评分理由

**3 星（active）** —— 创意与场景定位好（"本地 + 跨聊天 App"），14k stars 反映市场有需求；但版权 / 合规 / 维护可持续性都是观察项；与 oh-my-pi 等"harness 工程"派相比，工程化程度有差距。给 3 星而非 4 星的核心原因是合规风险与单一维护者的不可持续性。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/NanmiCoder/cc-haha |
| **AGENTS.md 规范** | https://github.com/NanmiCoder/cc-haha/blob/main/AGENTS.md |
| **衍生报道** | https://medium.com/ai-software-engineer/6-spins-of-leaked-claude-code-source-thatll-teach-you-more-than-you-expect-3e806ee47aea |

### 关联项目

- [openclaw.md](../ai-agents/openclaw.md) — 个人 AI 助理，chat-app-first 路线
- [claude-mem.md](claude-mem.md) — 跨 agent 持久记忆插件
- [oh-my-codex.md](oh-my-codex.md) — Codex 之上的工作流引擎
- [penguin-harness.md](../ai-agents/penguin-harness.md) — 自进化 Agent Harness