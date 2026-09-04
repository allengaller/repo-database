---
name: cloudflare/agents
url: https://github.com/cloudflare/agents
domain: ai-engineering
type: framework
languages: [TypeScript]
stars: 5282
forks: 634
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [cloudflare, agents-sdk, durable-objects, websocket, edge, mcp, serverless, stateful]
summary: Cloudflare 官方 Agents SDK——基于 Durable Objects + V8 隔离，让 AI Agent 跑在 Cloudflare 全球边缘网络，自带状态/实时/调度。
---

# Cloudflare Agents SDK (cloudflare/agents)

## 1. 项目基本信息

| 字段 | 值 |
|------|----|
| 仓库 | [cloudflare/agents](https://github.com/cloudflare/agents) |
| 维护方 | Cloudflare（官方） |
| 主语言 | TypeScript（运行在 Cloudflare Workers / V8 隔离） |
| License | MIT |
| 当前 Stars | ~5.3k（截至 2026-08） |
| 首次发布 | 2025-02-25（Agents Week） |
| 配套 | cloudflare/skills（6 个 Agent 工具链）、cloudflare/mcp-server、Project Think |

## 2. 技术栈 / 核心机制分析

**核心定位：** 把 AI Agent 变成 Cloudflare 平台上的"一等公民"——不是部署在 VPS 上的常驻进程，而是借力 Durable Objects 的**有状态 + 全球分布**计算原语。

**四大底层能力：**

| 能力 | 实现 | 价值 |
|------|------|------|
| **状态持久化** | Durable Objects（每 Agent 实例 = 1 个 DO） | Agent 断线重连后状态自动恢复 |
| **实时通信** | WebSocket（SSE fallback） | 客户端 ↔ Agent 双向流式 |
| **调度** | DO Alarm API | 定时任务、cron、间隔执行 |
| **数据库** | DO 内置 SQLite | 每实例一个 SQL 库，零配置 |

**核心抽象：AIChatAgent 基类**

```typescript
// ✅ 官方推荐用法（40 行实现一个完整 AI Chat Agent）
import { AIChatAgent } from "agents/ai-chat-agent";
import { createWorkersAI } from "workers-ai-provider";
import { streamText } from "ai";

export class ChatAgent extends AIChatAgent<Env> {
  async onChatMessage(onFinish) {
    // this.messages 自动包含完整对话历史
    const workersai = createWorkersAI({ binding: this.env.AI });
    const result = streamText({
      model: workersai("@cf/meta/llama-3.3-70b-instruct-fp8-fast"),
      messages: this.messages,
      maxTokens: 1024,
    });
    return result.toDataStreamResponse({ onFinish });
    // 框架自动处理：流式传输 / 断线重连 / 多客户端同步 / 状态持久化
  }
}
```

**架构层级：**

```
┌────────────────────────────────────────────┐
│  Platform Adapters                         │  Web UI / CLI / Telegram / Slack / Discord / GitHub
├────────────────────────────────────────────┤
│  Orchestrator (Message Routing)            │
├────────────────────────────────────────────┤
│  Command / Workflow / Handler              │  YAML / Markdown / Slash
├────────────────────────────────────────────┤
│  Executor (Claude / Codex / Pi)            │  AI Provider 适配
├────────────────────────────────────────────┤
│  Durable Objects (14 core tables)           │  Codebases / Conversations / Sessions / Workflow Runs
└────────────────────────────────────────────┘
```

## 3. 核心功能特性

**AIChatAgent 自动处理的能力（开发者不用写）：**

| 功能 | 自定义 DO 写 | AIChatAgent 写 |
|------|------------|---------------|
| 状态管理 | 自己 `this.state = {...}` | `this.messages` 自动维护 |
| 消息持久化 | `storage.put()` 手动 | 自动 |
| WebSocket | 自己处理 `onMessage` | 框架接管 |
| 流式输出 | 自己 `ws.send(chunk)` | `toDataStreamResponse()` |
| 断线重连 | 自己写恢复逻辑 | 框架自动恢复 |
| 多客户端同步 | 自己写 | 自动广播 |

**完整 Cloudflare 生态集成：**

| 服务 | 用途 |
|------|------|
| **Workers AI** | 在 DO 同节点跑 `@cf/meta/llama-3.3-70b-instruct-fp8-fast` 等模型 |
| **AI Gateway** | 跨 OpenAI/Anthropic/Groq 的统一入口 + 缓存 + 速率限制 |
| **Vectorize** | 嵌入向量数据库（语义搜索） |
| **Workflows** | 长任务编排（重试 / 状态机） |
| **R2** | 零出口费对象存储 |
| **Browser Rendering** | 无头浏览器（爬虫 / 自动化） |
| **MCP Server** | OAuth 2.1 远程 MCP 协议实现 |

**Cloudflare Skills 配套（2026 新发）：** 6 个 Agent 客户端（Claude Code / Codex / Cursor / Copilot / OpenCode / Windsurf）通过 `/plugin install cloudflare` 一键接入 + 8 个 Skill（cloudflare / agents-sdk / durable-objects / sandbox-sdk / wrangler / web-perf / building-mcp-server-on-cloudflare / building-ai-agent-on-cloudflare）。

## 4. 应用场景与已落地案例

- **个人 AI 助手：** 每天 $0.5 以内，24 小时可用（基于 Free Tier + Durable Objects 零成本休眠）
- **全球聊天应用：** 跨国低延迟（Agent 实例就近部署）+ WebSocket 流式
- **MCP Server 托管：** 5 行代码起 OAuth 2.1 MCP Server，挂在 Workers 上
- **自动化工作流：** Workflows + Agents 组合，长任务编排 + 状态机
- **AI 客服：** 多轮对话 + 知识库（Vectorize）+ 邮件接入（AIChatAgent 也支持 email 模态）

**Project Think（2026-03 Agents Week 发布）：** 升级的 AI Agent 基础设施平台——
- **V8 沙箱：** 隔离 LLM 生成的危险代码
- **执行阶梯：** Level 0（纯逻辑）→ Level 3（完整 OS 权限）按需升级
- **Facets：** 类型安全的子 Agent RPC 通信
- **自我扩展：** Agent 运行时动态生成 TypeScript 工具

## 5. 个人评价

**优势：**
- **Cloudflare 官方 + 强生态：** Durable Objects / Workers AI / Vectorize / Workflows 全部原生打通
- **真正边缘原生：** Agent 实例可部署到用户就近的数据中心，比 AWS Lambda 冷启动快 100 倍
- **成本极低：** Free Tier 每天 10 万请求 + Durable Objects 零成本休眠，个人项目几乎 $0
- **多模态支持：** AIChatAgent 内置 chat / WebSocket / 邮件 / 语音四种接口
- **Cloudflare 收购 NPM 后** 整个 JS 生态 + 部署链路打通

**不足：**
- **DO 单实例限制：** Durable Objects 单实例有请求 / 内存上限，超大 Agent 需分片
- **V8 隔离 ≠ 完整 OS：** 无法跑任意 npm 包（C++ 扩展 / 系统调用），部分 ML 库不兼容
- **Workers AI 模型选择有限：** 自家 `@cf/*` 模型为主，OpenAI/Anthropic 需走 AI Gateway 走外部 API
- **绑定 Cloudflare 平台：** 换云厂商迁移成本高（虽然 Workers 也能跑 DO）

**评分理由：** 4 星。"全球边缘 + 有状态 + 零成本休眠" 这个组合是 Cloudflare 独家，AI Agent 跑在 DO 上已经是同类最优雅的 serverless Agent 方案。距 5 星只差"模型生态再开放 + 自托管选项"。

## 6. 相关资源

| 类型 | 链接 |
|------|------|
| 文档 | https://developers.cloudflare.com/agent-setup/ |
| 教程 | Build a chat agent（官方） |
| Skills 仓库 | https://github.com/cloudflare/skills |
| Project Think | Cloudflare Agents Week 2026 发布 |
| 入门模板 | `npm create cloudflare@latest agents-starter` |
| Vite Plugin | `@cloudflare/vite-plugin` |
| 上游 CLI | [Wrangler](../..)（Cloudflare Workers CLI） |
| 同类 SDK | [pi-mono.md](../ai-engineering/pi-mono.md)（libGDX 作者 TS 全栈）/[kimi-cli.md](../ai-engineering/kimi-cli.md)（MoonshotAI 终端 Agent） |
| 边缘运行时 | [agent-lightning.md](../ai-engineering/agent-lightning.md)（训练框架，非运行时） |
| 教学 | [agents-course.md](../ai-engineering/agents-course.md) / [ai-agents-for-beginners.md](../ai-engineering/ai-agents-for-beginners.md) |
