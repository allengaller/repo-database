---
name: thedotmack/claude-mem
url: https://github.com/thedotmack/claude-mem
domain: ai-engineering
type: tool
languages: [TypeScript, JavaScript]
stars: 33000
forks: 2200
license: Other
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [claude-code, persistent-memory, context-injection, plugin, sqlite, chromadb, ai-coding-assistant, mem-search]
summary: Claude Code 跨会话持久记忆插件 — 通过 6 个生命周期 Hook + Worker service + SQLite/FTS5/ChromaDB，把每次会话压缩成语义化记忆并自动注入未来会话，~33k stars，AI 编程助手的"长期记忆"基础设施
---

# Claude-Mem · Claude Code 的跨会话长期记忆

> 收录日期：2026-08-04
> 仓库：https://github.com/thedotmack/claude-mem
> 来源：2026-01 至 2026-07 GitHub Trending 高频上榜（多次日榜 Top 3）

**一句话核心总结**：claude-mem 是 Claude Code 的"长期记忆"插件——通过 6 个生命周期 Hook 自动捕获每次工具调用，调用 Claude Agent SDK 压缩为 ~500 Token 的语义化观测，按类型分类后存入本地 SQLite + ChromaDB，新会话自动按需检索注入，彻底解决"Claude Code 阅后即焚"的痛点。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Claude-Mem（cmem） |
| **仓库地址** | https://github.com/thedotmack/claude-mem |
| **所属组织/作者** | thedotmack（Alex, cmem.ai） |
| **描述** | A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI (using Claude's agent-sdk), and injects relevant context back into future sessions. |
| **开源许可** | Other（自定义许可） |
| **Star 数** | ~33,000（截至 2026-08） |
| **Fork 数** | ~2,200 |
| **技术类型** | tool（plugin） |
| **当前主版本** | v13.11.0（worker-native cloud sync） |

---

## 二、技术栈 / 架构

### 2.1 6 钩子生命周期捕获

```
context-hook        (SessionStart)    → 启动 Bun Worker + 注入上下文
user-message-hook   (UserMessage)     → 调试钩子
new-hook            (UserPromptSubmit) → 创建新会话
save-hook           (PostToolUse)     → 捕获工具执行记录
summary-hook        (Stop)            → 生成当前会话摘要
cleanup-hook        (SessionEnd)      → 标记会话结束 + 清理
```

### 2.2 Worker service（HTTP API）

- 端口：37777（可配置）
- 暴露 10 个搜索端点
- 调用 Claude Agent SDK 压缩工具输出（1000~10000 Token → ~500 Token）
- 默认 model：`claude-haiku-4-5-20251001`

### 2.3 数据层

| 组件 | 用途 |
|------|------|
| **SQLite + FTS5** | 全文检索的会话/观察记录 |
| **ChromaDB** | 语义向量检索 |
| **`<private>` 标签** | 用户级隐私排除 |
| **`<claude-mem-context>`** | 系统级防递归存储 |

### 2.4 运行时

- Node.js 18+
- Bun（JavaScript 运行时 + 进程管理器）
- 跨平台：macOS / Linux / Windows

### 2.5 多 IDE 适配矩阵

| IDE | 钩子支持 | MCP server | 备注 |
|-----|---------|-----------|------|
| Claude Code | ✅ | ✅ | 主战场 |
| OpenAI Codex | ✅ | ✅ | SessionStart 钩子专属 |
| Gemini CLI | ✅（已弃用 → Antigravity） | ✅ | 2026-06 Google 弃用 |
| **Antigravity CLI** | ✅ | ✅ | 2026-05 Google 继任者 |
| OpenClaw | ✅ | — | 多 IDE 共享 |
| Cursor | ✅ | — | 适配器 |
| OpenCode | ⚠️ | — | 已知 tree-sitter ERESOLVE bug |

---

## 三、核心功能特性

### 3.1 自动捕获 + 语义压缩

每次工具调用（Read/Edit/Bash 等）由 `save-hook` 拦截，调用 Haiku 压缩为 5 类结构化观察：

- `decision` — 决策
- `bugfix` — Bug 修复
- `feature` — 功能
- `refactor` — 重构
- `discovery` — 发现

每条 observation 附带 **概念标签 + 文件引用**，便于跨会话检索。

### 3.2 渐进式上下文检索（mem-search skill）

`/mem-search` 技能支持基于自然语言的历史查询，新会话开始时按需召回相关 observation，避免一次性塞满上下文。

### 3.3 隐私 + 安全

- 双层标签（`<private>` / `<claude-mem-context>`）在 Hook 层剥离敏感内容
- worker 默认绑定 `127.0.0.1`（localhost only）
- 命令执行全程 array-based 参数 + `shell: false`（防注入）
- **无遥测**（官方明确声明）

### 3.4 Token 节省可视化

实时 UI 显示 read tokens / work tokens / savings percent，让开发者清楚每条注入的"性价比"。

### 3.5 跨平台云同步（v13.11.0 新增）

worker-native cloud sync 直连 cmem.ai 后台：
- write-site 触发 1.5s debounce flush
- 200-row / 2MB 分页
- 失败指数退避
- 旧 `cloud-sync.mjs` daemon 已废弃

---

## 四、应用场景与已落地案例

### 4.1 个人开发者

- 跨日/跨周编码时保持项目连续性（昨天讨论的架构设计自动加载）
- 减少重复"重新解释项目背景"的 Token 浪费
- 历史 bug 修复 / 重构决策可追溯

### 4.2 团队知识沉淀

- 成员间共享 observation 库，新人快速上手
- 决策可审计，code review 时可回溯历史讨论

### 4.3 敏感项目场景

- 金融/医疗/政企可借助 `<private>` 标签排除敏感内容
- 本地优先存储（~/.claude-mem/）+ 显式不向 worker 发送敏感 PII

### 4.4 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [PenguinHarness](../ai-agents/penguin-harness.md) | 同样为 AI 编程助手增强，但走 harness 路线而非记忆路线 |
| [OpenClaw](../ai-agents/openclaw.md) | openclaw 的 OpenClaw adapter 支持互操作 |
| [Pi-Mono](../ai-engineering/pi-mono.md) | 同样关注扩展性，但 pi-mono 走 Skills/Extensions 体系 |
| [MemU](../ai-engineering/memU.md) | 同样做"agent 持久记忆"，但 memU 是 host-agnostic，claude-mem 专攻 Claude Code |

---

## 五、个人评价

### 优势

1. **解决真痛点**：Claude Code 的会话失忆是开发者最头疼的问题，claude-mem 直接命中
2. **架构清晰**：6 钩子 + Worker + DB + Viewer 的分层易理解、好排错
3. **跨 IDE 适配广**：已从 Claude Code 扩展到 Codex、Antigravity、OpenClaw、Cursor
4. **本地优先 + 隐私可控**：双层标签 + 无遥测，对企业敏感场景友好
5. **云同步可选择**：v13.11.0 worker-native cloud sync 解决多设备同步痛点

### 不足

1. **多 IDE 安装稳定性差**：GitHub Issue #2263 记录了 OpenCode 安装时 `tree-sitter` peer-dep 冲突 + uv 缺失，install 脚本静默成功但运行时崩溃
2. **依赖 Bun 运行时**：对纯 Node.js 用户增加额外依赖管理成本
3. **自 v13 起生态变化快**：Gemini CLI 弃用 → Antigravity 替代，开发者需持续跟随
4. **自定义许可（非 OSI 标准）**：商业使用需仔细审查 LICENSE

### 评分理由：⭐⭐⭐⭐ (4/5)

- 13k → 33k 增长曲线显示社区认可
- 解决问题真实 + 架构清晰 + 跨 IDE 适配
- 不给 5 星：多 IDE 兼容性 bug 较多（v12-v13 修复历史清晰可见）、自定义许可限制商业使用、生态变化快（Gemini 弃用事件）

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/thedotmack/claude-mem |
| **官方网站** | https://claude-mem.ai |
| **v13.11.0 release** | https://github.com/thedotmack/claude-mem/releases/tag/v13.11.0 |
| **安全策略** | https://github.com/thedotmack/claude-mem/security |

### 关联项目

- [PenguinHarness](../ai-agents/penguin-harness.md) — AI 编程助手 harness 路线
- [OpenClaw](../ai-agents/openclaw.md) — 个人 AI 助理，claude-mem 适配 host 之一
- [MemU](../ai-engineering/memU.md) — Host-agnostic 持久记忆层
- [Pi-Mono](../ai-engineering/pi-mono.md) — TypeScript AI Agent 全栈工具集
- [Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) — 上下文工程技能库
