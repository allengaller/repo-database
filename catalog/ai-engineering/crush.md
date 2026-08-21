---
name: charmbracelet/crush
url: https://github.com/charmbracelet/crush
domain: ai-engineering
type: application
languages: [Go]
stars: 23000
forks: 0
license: FSL-1.1-MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [terminal-agent, golang, tui, bubble-tea, charm, multi-provider, session-persistence, coding-agent]
lineage: anthropics/claude-code
summary: Charm 出品的终端编码 agent — 23k stars（截至 2026-08），Bubble Tea TUI + tool-call loop + 会话持久化，Go 单二进制部署，"glamourous agentic coding for all"
---

# Crush · Charm 出品的"性感"终端编码 agent

> 收录日期：2026-08-13
> 仓库：https://github.com/charmbracelet/crush
> 来源：Charm 团队（vhs / gum / lipgloss / bubbles 生态）在编码 agent 赛道的代表作；best-of-Agent-Harnesses 列入 Terminal coding agents 主榜

**一句话核心总结**：Crush 是 Charm 团队（原 OpenCode 的 Bubble Tea fork 系）出品的终端编码 agent —— Go 单二进制 + Bubble Tea TUI + 多 provider tool-call loop + 会话持久化，~23k stars（截至 2026-08），把 Charm 一贯的"性感终端美学"带进 agent 赛道。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Crush |
| **仓库地址** | https://github.com/charmbracelet/crush |
| **所属组织** | Charmbracelet（vhs / gum / lipgloss / bubbles / mods 母公司） |
| **描述** | Glamourous agentic coding for all — a terminal coding agent that switches between models |
| **开源许可** | FSL-1.1-MIT（Functional Source License，1 年后转 MIT） |
| **Star 数** | ~23,000（截至 2026-08-13） |
| **技术类型** | application（终端编码 agent） |
| **底层栈** | Go + Bubble Tea TUI + Glamour 渲染 |

---

## 二、技术栈与架构分析

### 2.1 Charm 技术栈的集大成

| 模块 | 来源 |
|------|------|
| TUI 框架 | Bubble Tea（Charm 旗舰） |
| 样式系统 | Lip Gloss（CSS-like Go） |
| Markdown 渲染 | Glamour |
| 提示输入 | Bubbles + Huh |
| 持久化 | SQLite / BoltDB |

复用 Charm 已有生态，避免重复造 UI 轮子。

### 2.2 Go 单二进制部署

`go install` 或下载单二进制即可运行；无 Python / Node 运行时依赖，启动 < 100ms；适合 CI / 容器 / 边缘部署。

### 2.3 FSL-1.1-MIT 许可

FSL（Functional Source License）是 Charm 团队提出的"两年后转 MIT"许可 —— 当前不可商用做"竞争性 SaaS"，但个人 / 企业内部用、做产品均可；2027 年自动转 MIT。

### 2.4 多 Provider 抽象

支持 Claude / OpenAI / Gemini / Bedrock / Ollama / OpenRouter 等，与 opencode 路线一致；`/model` 子命令热切换。

### 2.5 会话持久化

session JSON 存 `~/.config/crush/sessions/`；`/resume` 拉起历史会话，跨终端恢复上下文。

---

## 三、核心功能特性

### 3.1 Bubble Tea 美学 TUI

- 主题切换：内置 10+ 配色（dracula / monokai / solarized 等）
- 工具调用可视化：每个工具调用在右侧 panel 实时展示输出
- Markdown 流式渲染：agent 输出按 streaming 渲染，体感流畅

### 3.2 多模型热切换

`/model claude-sonnet-4.5` 切换 Claude；`/model gpt-5` 切换 OpenAI；同一会话内可切，prompt 不丢。

### 3.3 工具调用 loop

内置工具：
- `bash`（命令执行）
- `read / write / edit`（文件操作）
- `grep / glob`（搜索）
- `webfetch`（HTTP 拉取）
- `code-search`（基于 ripgrep）

### 3.4 会话持久化

每条 prompt 与对应输出全量留痕到 SQLite；可回放、可搜索、可分享。

### 3.5 LSP 集成（v0.5+）

2026 年中起支持 LSP 客户端接入，编辑时自动拿到 diagnostics；尚不及 oh-my-pi 的"DAP + LSP 全套"。

---

## 四、应用场景与本仓库关联

### 4.1 想要 Go 单二进制部署的开发者

- CI / Docker / K8s 中跑编码 agent
- 边缘 / VPS 环境（无需 Python / Node）

### 4.2 Charm 美学爱好者

- 已有 Charm 工具栈（vhs / gum）的用户
- 想要统一"颜值与功能"的 TUI 体验

### 4.3 多 Provider + 模型热切换

- 同一任务对比不同模型效果
- 成本优化：根据任务复杂度动态选小 / 大模型

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [opencode.md](opencode.md) | 同为多 provider 终端 agent；opencode 用 TS，crush 用 Go；可对照看"语言选型对 agent 体验的影响" |
| [oh-my-pi.md](oh-my-pi.md) | oh-my-pi 是 Rust 极深度重装，crush 是 Go 优雅实用 |
| [kimi-cli.md](kimi-cli.md) | kimi-cli 是 Moonshot 官方绑定栈，crush 是中立 provider |

---

## 五、个人评价

### 5.1 优势

1. **Charm 美学 + 工程底蕴** —— TUI 体验在所有终端 agent 里属于第一梯队
2. **Go 单二进制** —— 部署简单、启动快、内存稳，CI / 容器友好
3. **多 Provider + 热切换** —— 模型中立，符合 2026 年"不绑死模型"的趋势
4. **FSL-1.1-MIT** —— 短期非商用竞争保护 + 长期转 MIT，对生态贡献者友好
5. **Charm 生态整合** —— 用户已有 vhs / gum 等工具，学习曲线极低

### 5.2 不足

1. **LSP / DAP 接入深度不及 oh-my-pi** —— 编辑后看不到 IDE 级 diagnostics
2. **Go 单体架构** —— 大规模插件 / 扩展生态弱于 TS 系（opencode / Claude Code）
3. **FSL 商用限制** —— 想做"Crush-as-a-Service"竞争产品的开发者需等 1 年转 MIT
4. **多 agent / 工作流能力弱** —— 偏单会话，要并行需靠 Vibe-Kanban 等 fleet manager
5. **agent loop 偶发"empty input 无限 retry"** —— GitHub Issue #805 暴露的 agent loop bug 仍在跟进

### 5.3 评分理由

**4 星（active）** —— Charm 团队的工程底蕴 + 美学优势体现得淋漓尽致；Go 单二进制对运维友好；多 provider 抽象清晰。扣分项为 LSP / DAP 深度不及 oh-my-pi，扩展性弱于 TS 系；FSL 1 年商用限制。整体定位"实用 + 美学 + 部署简单"非常清晰，值得 4 星。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/charmbracelet/crush |
| **官网** | https://charm.sh/crush |
| **Charm 生态** | https://github.com/charmbracelet |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [opencode.md](opencode.md) — TS 路线多 provider 标杆
- [oh-my-pi.md](oh-my-pi.md) — Rust 极深度 harness 重装版
- [kimi-cli.md](kimi-cli.md) — Moonshot 官方绑定栈
- [vibe-kanban.md](vibe-kanban.md) — 编码 agent 舰队管理器