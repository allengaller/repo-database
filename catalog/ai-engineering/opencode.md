---
name: anomalyco/opencode
url: https://github.com/anomalyco/opencode
domain: ai-engineering
type: application
languages: [TypeScript, Go]
stars: 197000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 5
status: active
tags: [coding-agent, terminal-agent, multi-provider, mcp, plugin, tui, agent-harness]
lineage: anthropics/claude-code
summary: 开源终端编码 agent 的事实标准 — 195k+ stars（截至 2026-08），原 sst/opencode 转让给 anomalyco 的多 provider tool-call loop，插件 + MCP + TUI 全栈，被视作 Claude Code / Codex 的开源对应物
---

# OpenCode · 开源终端编码 agent 的事实标准

> 收录日期：2026-08-13
> 仓库：https://github.com/anomalyco/opencode
> 来源：2026-08 best-of-Agent-Harnesses 排名第 1；连续多月 GitHub Trending 头部；多 provider tool-call loop 的"参考实现"

**一句话核心总结**：OpenCode（原 sst/opencode，2026 年转让给 anomalyco）是当前最受欢迎的开源终端编码 agent —— 跨 Claude / OpenAI / Gemini / 本地模型的多 provider tool-call loop 加上 TUI 与强插件/MCP 生态，~19.7 万 stars、750 万次安装，成为"Claude Code / Codex 的开源对应物"的事实标准。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | OpenCode |
| **仓库地址** | https://github.com/anomalyco/opencode |
| **所属组织** | anomalyco（2026 年从 sst/opencode 转让） |
| **描述** | The open source coding agent — terminal-based, multi-provider, MCP-first |
| **开源许可** | MIT |
| **Star 数** | ~197,000（截至 2026-08） |
| **技术类型** | application（终端 agent） |
| **底层栈** | TypeScript + Go；客户端 Bun + TUI |

---

## 二、技术栈与架构分析

### 2.1 双代理模式（Tab 键切换）

| 代理 | 权限 | 用途 |
|------|------|------|
| **build**（默认） | 全权限 | 完整开发工作流 |
| **plan** | 只读 | 阅读代码 + 制定计划，不写文件 |

两套独立 system prompt，开发者可在同一会话内无成本切换"动手 / 构思"两种工作模式。

### 2.2 多 Provider 抽象

- 统一 API 屏蔽 Claude / OpenAI / Gemini / Bedrock / Azure / Vertex / 本地模型差异
- provider 配置走 `~/.config/opencode/config.json`
- 与 `models.dev`（同组织 6.4k stars 仓库）联动，自动维护模型清单
- 支持自定义 provider，可接 Ollama / vLLM 等本地推理

### 2.3 MCP-first + 插件体系

- 原生 MCP client，stdio / SSE / HTTP 三大传输
- 通过 `@opencode-ai/plugin` SDK 扩展自定义命令与事件钩子
- 官方插件目录涵盖 LSP / 格式化 / lint / 测试运行器

### 2.4 与 Claude Code / Codex 的差异化

| 维度 | OpenCode | Claude Code / Codex |
|------|----------|---------------------|
| 源码开放 | 100% OSS | 闭源 |
| Provider | 多 provider（任意 LLM） | 绑定自家模型 |
| 价格 | 订阅自带 / 任意 API | 必须订阅 |
| 自托管 | 是 | 否 |
| 学习曲线 | 中等（需理解 provider 配置） | 低（开箱即用） |

---

## 三、核心功能特性

### 3.1 多 Provider 切换

同一会话内可在 Claude Sonnet 4.5、Gemini 2.5 Pro、GPT-5、DeepSeek V4 之间切换，无需重启；provider 异常时自动 fallback。

### 3.2 会话持久化

`/sessions` 子命令管理历史会话，支持 fork、resume、export；与 `oh-my-pi` 等 fork 项目共享同一套会话格式。

### 3.3 强 LSP / DAP 集成

- 每一次 Edit 后自动触发 LSP rename / references / diagnostics
- 部分 fork（如 `can1357/oh-my-pi`）进一步接入真实 DAP 调试器（lldb / dlv / debugpy）

### 3.4 内置工具集

- `bash`（沙箱执行）
- `read / write / edit`（文件操作，hash 锚定 edit 防止漂移）
- `glob / grep / list`（仓库结构搜索）
- `webfetch / websearch`（联网检索）

### 3.5 TUI 体验

Bubble Tea 风格 TUI，多面板布局、会话/工具/历史可滚动查看；`/undo` 支持跨工具操作回滚。

---

## 四、应用场景与本仓库关联

### 4.1 个人开发者

- 想要"Claude Code 体验 + 任意模型选择"的开源替代
- 本地模型（Ollama / vLLM）驱动编码 agent 的最佳载体
- 想深度定制工具/插件的工程师

### 4.2 团队

- 统一团队 LLM 成本：员工按需切换更便宜的 provider
- 私有部署：在公司 VPC 内跑编码 agent，零数据外泄
- 审计：开源代码 + 自托管 + 日志可追溯

### 4.3 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [claude-mem.md](claude-mem.md) | claude-mem 通过适配器桥接 OpenCode（Issue #2263 提到的 tree-sitter bug 仍在收尾） |
| [kimi-cli.md](kimi-cli.md) | 同样是终端编码 agent，但 kimi-cli 绑定 Moonshot 模型栈 |
| [oh-my-codex.md](oh-my-codex.md) | 与 oh-my-codex 的"工作流引擎"层互补 |
| [agents-cloudflare.md](agents-cloudflare.md) | OpenCode 跑本地，云端 Agents SDK 跑边缘，可叠加 |

---

## 五、个人评价

### 5.1 优势

1. **生态最强**：19.7 万 stars、750 万次安装为多 provider 终端编码 agent 的事实标准
2. **架构清晰**：build / plan 双代理 + 插件体系可学习可改造
3. **模型中立**：避免 vendor lock-in，对成本敏感团队极有价值
4. **MCP 完备**：是 MCP 协议落地最重要的客户端之一
5. **强 fork 生态**：`oh-my-pi` 等 fork 在 LSP/DAP 层进一步增强

### 5.2 不足

1. **配置门槛高于 Claude Code / Codex**：provider / 模型选择 / 插件 / MCP server 全要自己组装
2. **响应速度仍落后闭源竞品**：Claude Code 因深度优化 Sonnet，体感响应更快
3. **大上下文管理弱于 Claude Code**：对超长 session 的 compaction 处理待加强
4. **转让过渡期影响**：sst → anomalyco 转让过程中贡献者归属、issue 迁移、fork 兼容性需要时间消化

### 5.3 评分理由

**5 星（active）** —— 截至 2026-08 是开源终端编码 agent 唯一可与 Claude Code / Codex 同台竞技的项目；多 provider 抽象 + 强 MCP + 插件体系构成清晰护城河；社区规模确保问题能在合理时间内得到响应。扣分项为配置门槛与 Claude Code 的响应优化差距，但不影响其"开源编码 agent 标杆"地位。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/anomalyco/opencode |
| **老仓库** | https://github.com/sst/opencode |
| **模型清单** | https://github.com/anomalyco/models.dev |
| **排行榜收录** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [claude-mem.md](claude-mem.md) — 跨 agent 持久记忆插件，OpenCode 适配中
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的终端编码 agent
- [oh-my-codex.md](oh-my-codex.md) — Codex 之上的工作流引擎
- [agents-cloudflare.md](agents-cloudflare.md) — Cloudflare Durable Objects 上的状态化 agent