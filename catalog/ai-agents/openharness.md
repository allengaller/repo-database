---
name: HKUDS/OpenHarness
url: https://github.com/HKUDS/OpenHarness
domain: ai-agents
type: framework
languages: [Python]
stars: 15300
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [agent-harness, python, personal-agent, ohmo, feishu, slack, telegram, discord, multi-channel, anthropic-skills-compat]
summary: HKUDS 出品的 Python 开源 Agent Harness — 轻量 + 可扩展 + 可审查，包含 agent loop / tools / skills / memory / plugins 一站式基础设施，内置个人 agent "Ohmo" 跨飞书/Slack/Telegram/Discord 部署，~15.3k stars（10 天 9.5k）
---

# OpenHarness · Python 开源 Agent Harness

> 收录日期：2026-08-13
> 仓库：https://github.com/HKUDS/OpenHarness
> 来源：HKUDS 团队（nanobot 同源）出品；2026 年中知乎"10 天 9.5k Star"长文刷屏

**一句话核心总结**：OpenHarness 是港大 HKUDS 团队出品的 Python 开源 Agent Harness —— 一条命令拥有 tools / skills / memory / plugins / agent loop 全栈基础设施，内置个人 agent "Ohmo" 跨飞书 / Slack / Telegram / Discord 多渠道部署，兼容 Anthropic Skills + Claude-style plugins，~15.3k stars，"重新定义 Agent Harness"的中文社区代表作。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | OpenHarness |
| **仓库地址** | https://github.com/HKUDS/OpenHarness |
| **所属团队** | HKUDS（香港大学数据智能实验室） |
| **描述** | Open Agent Harness with a Built-in Personal Agent — Ohmo |
| **开源许可** | MIT |
| **Star 数** | ~15,300（截至 2026-08，含 10 天 9.5k 增长） |
| **技术类型** | framework（Agent Harness / 基础设施） |
| **底层栈** | Python 3.11+ |

---

## 二、技术栈与架构分析

### 2.1 五大基础设施

| 组件 | 作用 |
|------|------|
| **Agent Loop** | 模型驱动 + 工具调用的核心循环 |
| **Tools / Skills / Plugins** | 工具、技能、插件三层扩展机制 |
| **Memory / Session** | 跨会话记忆（CLAUDE.md 兼容格式） |
| **Channels** | 跨飞书 / Slack / Telegram / Discord 接入 |
| **Sub-Agents** | 多 agent 协调 + auto-compaction |

### 2.2 内置个人 agent "Ohmo"

直接可用：
- 飞书 / Slack / Telegram / Discord 收发消息
- 自动开分支、写代码、跑测试
- 可在 PR 中自我迭代

### 2.3 与 Anthropic Skills 兼容

`SKILL.md` 目录直接复用 Anthropic Skills 标准；已有的 docx / pdf / pptx / xlsx 等技能可直接装入。

### 2.4 与 Claude-style Plugins 兼容

`.claude/` 配置目录结构沿用 Claude Code 习惯；从 Claude Code 迁过来的开发者零学习成本。

### 2.5 auto-compaction（长会话）

多日 / 多周会话通过自动压缩机制避免 context rot；与 get-shit-done 的"全新上下文"思路呼应。

---

## 三、核心功能特性

### 3.1 一键安装 + 多渠道

```bash
pip install openharness
# 一行命令启动 Ohmo
ohmo --channel feishu,telegram,discord
```

无需配置复杂的 LLM / 网关 / 渠道，OpenHarness 提供默认开箱即用。

### 3.2 多 agent 协调

- 主 agent + sub-agent 委派
- auto-compaction：长会话自动压缩
- 跨 agent 共享 memory

### 3.3 内置工具集

- 文件操作（read / write / edit）
- Bash 执行
- Git 操作（commit / branch / PR）
- 联网搜索
- 代码搜索（基于 ripgrep）

### 3.4 SKILL.md + Claude 兼容

- 任何 Anthropic Skill 直接可用
- 任何 Claude Code plugin 直接可用
- 生态复用最大化

### 3.5 可审查的 agent 行为

- 所有工具调用留痕
- Memory 变更可审计
- 适合企业合规场景

---

## 四、应用场景与本仓库关联

### 4.1 中文用户的"开箱即用"选择

- 飞书 / 微信生态天然适配
- 中文文档 + 中文社区讨论
- 解决 OpenClaw / Hermes 等英文圈主导项目的本地化门槛

### 4.2 跨渠道个人助理

- 同时在飞书 + Telegram 跑同一 agent
- 7×24 在线、永不丢失会话

### 4.3 企业内 Agent Harness

- Python 生态天然适合企业内部集成
- MIT 许可 + 可审查 + 可审计

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [openclaw.md](openclaw.md) | 同为常驻个人 agent；openclaw 英文生态强，OpenHarness 中文生态强 |
| [hermes-agent.md](hermes-agent.md) | 同为常驻 agent；Hermes 强调"自学习"，OpenHarness 强调"harness 基础设施" |
| [nanobot.md](nanobot.md) | 同为 HKUDS 出品，nanobot 偏轻量 daemon，OpenHarness 偏完整 harness |
| [skills.md](../ai-engineering/skills.md) | OpenHarness 直接兼容 SKILL.md 标准 |

---

## 五、个人评价

### 5.1 优势

1. **中文社区原生** —— 飞书 / 微信 / 中文文档 / 中文讨论，对中文开发者极友好
2. **兼容 Anthropic Skills + Claude Plugins** —— 生态复用最大化，无需从零构建
3. **MIT + Python** —— 企业集成门槛低，可审查可审计
4. **HKUDS 团队背书** —— nanobot / RAG-Anything / OpenHarness 形成完整 HKUDS 生态
5. **一站式基础设施** —— loop / tools / skills / memory / channels / sub-agents 全栈

### 5.2 不足

1. **15.3k stars 中含"10 天 9.5k"增长红利** —— 长期活跃度需观察
2. **Ohmo 个人 agent 复杂度低于 Hermes / OpenClaw** —— 偏 harness 框架，内置 agent 体验需打磨
3. **Python 生态对比 TS / Go** —— 在高并发 / 边缘部署场景不及 TS 系
4. **多渠道适配深度不一** —— 飞书最强，其他渠道适配深度可能不齐
5. **企业级 governance 工具仍偏弱** —— RBAC / 审计 / 合规大规模企业场景需自己包装

### 5.3 评分理由

**4 星（active）** —— 中文社区原生 + 兼容 Anthropic 生态 + HKUDS 团队背书 + 一站式基础设施；对中文 / 企业 / 飞书用户尤其有价值。扣分项是个人 agent 体验、Harness 长期可持续性、多渠道适配深度观察；但作为"Python 系 Harness 的代表作"，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/HKUDS/OpenHarness |
| **中文文档** | https://github.com/HKUDS/OpenHarness/blob/main/README.zh-CN.md |
| **媒体长文** | https://zhuanlan.zhihu.com/p/2027773381517287987 |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [openclaw.md](openclaw.md) — 个人 AI 助理（chat-app-first 英文系）
- [hermes-agent.md](hermes-agent.md) — 自学习个人 agent（Nous Research）
- [nanobot.md](nanobot.md) — 同团队轻量自托管 agent
- [skills.md](../ai-engineering/skills.md) — Anthropic 官方 Skill 标准