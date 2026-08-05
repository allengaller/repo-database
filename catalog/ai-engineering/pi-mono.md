---
name: badlogic/pi-mono
url: https://github.com/badlogic/pi-mono
domain: ai-engineering
type: framework
languages: [TypeScript]
stars: 19000
forks: 2000
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [ai-agent, monorepo, coding-cli, llm-abstraction, agent-runtime, tui, slack-bot, vllm, libgdx, unified-llm-api]
summary: libGDX 作者 Mario Zechner 主导的 TypeScript AI Agent 全栈 monorepo — 7 个包覆盖统一 LLM API / Agent 运行时 / 编码 CLI / TUI / Web UI / Slack Bot / vLLM Pod 管理，反 MCP 哲学 + 极简核心（仅 4 工具），~19k stars
---

# Pi-Mono · libGDX 作者的 TypeScript AI Agent 全栈底座

> 收录日期：2026-08-04
> 仓库：https://github.com/badlogic/pi-mono
> 来源：2026-01-30 GitHub Trending 日榜 Top 7（与 moltbot / memU / kimi-cli 同日）

**一句话核心总结**：pi-mono 是 libGDX 作者 Mario Zechner（badlogic）主导的 TypeScript Monorepo——包含 7 个紧密协作的包（pi-ai 统一 LLM API + pi-agent-core Agent 运行时 + pi-coding-agent 极简编码 CLI + pi-mom Slack Bot + pi-tui 差分渲染 TUI + pi-web-ui Web 组件 + pi-pods vLLM Pod 管理），以"提供原语，而非成品"的乐高哲学挑战 MCP + Skills 生态。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | pi-mono（Pi Monorepo） |
| **仓库地址** | https://github.com/badlogic/pi-mono |
| **所属组织/作者** | badlogic（Mario Zechner, libGDX 作者） |
| **描述** | AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods |
| **开源许可** | MIT |
| **Star 数** | ~19,000（截至 2026-08，从 2026-01 的 3.4k 增长 5x+） |
| **Fork 数** | ~2,000 |
| **技术类型** | framework（monorepo） |
| **代码语言** | TypeScript 96.4% + JavaScript 2.7% |

---

## 二、技术栈 / 架构

### 2.1 7 个包的功能矩阵

| 包名 | 功能 | 一句话 |
|------|------|--------|
| **@mariozechner/pi-ai** | 统一 LLM API | 一套 API 调 20+ 大模型（OpenAI/Anthropic/Google/DeepSeek/Mistral/Groq/xAI/OpenRouter） |
| **@mariozechner/pi-agent-core** | Agent 运行时 | 工具调用、状态管理、事件流、Steering/Follow-up |
| **@mariozechner/pi-coding-agent** | 编码 Agent CLI | 终端交互式编程助手，仅 4 个原子工具 |
| **@mariozechner/pi-mom** | Slack Bot | 把 Slack 消息委托给 pi 编码 Agent |
| **@mariozechner/pi-tui** | 终端 UI 库 | 差分渲染 + 同步输出 + 组件化 |
| **@mariozechner/pi-web-ui** | Web 组件 | AI 聊天界面的 Web Components |
| **@mariozechner/pi-pods** | vLLM Pod 管理 | CLI 管理 vLLM 部署到 GPU Pod |

### 2.2 pi-coding-agent 的 4 个原子工具

```
read   → 读取文件（文本/图片，指定行范围）
write  → 创建或完全重写文件（自动建目录）
edit   → 精确替换文本（完全匹配 oldText）
bash   → 执行 shell 命令（返回 stdout/stderr，可超时）
```

> 这种"故意"极简让 pi 在 Terminal-Bench 基准测试中表现优异——避免了功能臃肿带来的性能损耗。

### 2.3 反 MCP 的设计哲学

作者明确**选择不用 MCP**，而是用：
- **CLI 工具**（任何能跑 CLI 的事就不必走 MCP）
- **README + Skills 标准**（Markdown 描述技能，渐进披露）
- **TypeScript Extensions**（类型安全的插件）

> "把选择权还给用户"——不内置子 Agent、不内置权限弹窗、不内置计划模式、不内置 Todo 列表（用 TODO.md）。

### 2.4 三层扩展体系

```
Extensions (TypeScript 插件) → 可注册工具/命令/快捷键
Skills     (Markdown 技能包) → 渐进披露
Packages   (Pi Packages 生态) → npm 式安装
```

### 2.5 关键设计

- **跨供应商上下文交接**：OpenAI ↔ Anthropic 切换不丢上下文（自动转换 thinking 轨迹）
- **Context 可序列化**：方便持久化和传输
- **Token + 成本追踪**：内置 `usage.input` / `usage.output` / `usage.cost.total`
- **会话分支管理**：`/tree` 看分支，`/fork` 从历史节点创建新分支

### 2.6 工程化

- npm workspaces + 双重 TypeScript 配置
- biome.json（lint + format）
- Husky + pre-commit
- Shrinkwrap 锁定 transitive deps
- 供应链加固：`save-exact=true` + `min-release-age=2`

---

## 三、核心功能特性

### 3.1 统一 LLM API（pi-ai）

```typescript
import { getModel, stream, complete } from '@mariozechner/pi-ai';

const model = getModel('openai', 'gpt-4o-mini');  // 一行切换
const s = stream(model, { systemPrompt: 'You are helpful.', messages, tools });
for await (const event of s) {
  if (event.type === 'text_delta') process.stdout.write(event.delta);
}
```

- 自动补全模型
- 支持 Tool Calling（所有模型必须支持）
- 支持 Thinking/Reasoning（Claude extended thinking / o1）
- 支持 OAuth（Claude Pro/Max、ChatGPT Plus/Pro、GitHub Copilot）

### 3.2 Agent 运行时引擎（pi-agent-core）

```typescript
const agent = new Agent({
  initialState: {
    systemPrompt: 'You are a helpful assistant.',
    model: getModel('anthropic', 'claude-sonnet-4-20250514'),
    tools: [myTool]
  }
});

agent.subscribe((event) => { /* 事件流 */ });
await agent.prompt('帮我读一下 config.json');
```

**Steering + Follow-up 机制**：
- Steering：Agent 执行中插入消息打断（"停！改做这个"）
- Follow-up：完成当前工作后自动接收排队的后续任务

### 3.3 编码 Agent CLI（pi-coding-agent）

```bash
npm install -g @mariozechner/pi-coding-agent
pi                  # 进入交互
pi "帮我重构"       # 单次任务
pi -c              # 继续上次会话
pi -r              # 浏览历史会话
/model claude-3-5-sonnet   # 切换模型
```

### 3.4 TUI 差分渲染（pi-tui）

- 三种渲染策略的差分渲染系统
- 只更新变化的部分
- CSI 2026 同步输出协议
- 零闪烁终端 UI
- 组件：Text、Input、Editor、Markdown、Loader、SelectList、SettingsList、Image、Box、Container
- 支持 Kitty/iTerm2 内联图片协议

### 3.5 私有化部署（pi-pods）

- vLLM GPU Pod 管理 CLI
- 部署、扩缩容、状态监控
- 企业内网化 AI 编程助手

### 3.6 Slack Bot 集成（pi-mom）

- 频道消息转发给 pi 编码 Agent
- 团队协作编程平台
- 权限控制靠自定义 Extension（限制 Agent 只能访问特定代码目录）

---

## 四、应用场景与已落地案例

### 4.1 团队"AI 结对编程"平台

- pi-mom 搭建 Slack Bot
- 自定义 Extension 限制 Agent 权限
- 内部受控的 AI 编程平台

### 4.2 低成本"私有模型 + IDE"一体化

- pi-pods 在内网部署 vLLM + Llama
- pi-ai 配置自定义 Provider
- 全内网化 AI 编程助手，数据不出域

### 4.3 AI 应用快速原型

- pi-ai 统一 LLM 层
- pi-web-ui 快速搭建聊天界面
- pi-agent-core 业务逻辑
- 几天内完成产品 Demo

### 4.4 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [PenguinHarness](../ai-agents/penguin-harness.md) | 同样做编码 agent harness，但 pi-mono 走"乐高原语"路线 |
| [OpenClaw](../ai-agents/openclaw.md) | OpenClaw 的核心运行时受 pi-mono 影响 |
| [Claude-Mem](../ai-engineering/claude-mem.md) | pi-coding-agent 也支持 Memory 插件扩展（可通过 Skills 加 memory） |
| [Agent-Lightning](../ai-engineering/agent-lightning.md) | 都是"AI Agent 工程基础设施"，一上一下 |
| [Uns.loth](../ai-engineering/unsloth.md) | pi-pods 部署 vLLM + Uns.loth 微调模型，可组合 |

---

## 五、个人评价

### 优势

1. **libGDX 作者背书**：Mario Zechner 二十年开源项目经验，TypeScript 工程化能力顶级
2. **"原语而非成品"哲学清晰**：不与 Cursor / Claude Code 抢饭碗，提供底层工具
3. **反 MCP 设计**：CLI + Skills + Extensions 三件套，对 MCP 生态垄断的解药
4. **20+ LLM 统一接口**：一行代码切换模型，业务逻辑零改动
5. **极简核心 + 极强扩展**：4 个原子工具 + 强扩展系统，Terminal-Bench 表现优异
6. **工程化规范**：biome + Husky + shrinkwrap + 供应链加固

### 不足

1. **生态还在成长期**：相比 Claude Code 百万级用户，pi-mono 用户群体小
2. **无内置权限系统**：作者主动放弃（需 OpenShell / Gondolin / Docker 自行解决）
3. **Windows 部分功能受限**：tmux 需 WSL；bash 工具需 WSL
4. **API 仍在迭代**：项目更新快，API 可能变化（"项目迭代很快"作者自述）
5. **Pi Packages 全系统访问**：安装第三方包需审查源码

### 评分理由：⭐⭐⭐⭐ (4/5)

- 5x 增长曲线 + libGDX 作者 + 极简哲学 + 全栈 monorepo → 必收录
- 不给 5 星：生态仍在成长期 + 主动放弃内置权限可能劝退一部分用户

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/badlogic/pi-mono |
| **官方网站** | https://pi.dev |
| **Sessions 分享** | https://github.com/badlogic/pi-share-hf |
| **Python 移植版** | https://github.com/encyc/py-mono |

### 关联项目

- [PenguinHarness](../ai-agents/penguin-harness.md) — 编码 agent harness
- [OpenClaw](../ai-agents/openclaw.md) — 个人 AI 助理（pi-mono 风格影响）
- [Claude-Mem](../ai-engineering/claude-mem.md) — 持久记忆（可作 pi-coding-agent 扩展）
- [Agent-Lightning](../ai-engineering/agent-lightning.md) — Agent 训练框架
- [Uns.loth](../ai-engineering/unsloth.md) — pi-pods 部署 vLLM 后可结合微调
