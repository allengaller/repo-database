---
name: NevaMind-AI/memU
url: https://github.com/NevaMind-AI/memU
domain: ai-engineering
type: framework
languages: [Python]
stars: 14000
forks: 1000
license: Other
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [agent-memory, persistent-memory, proactive-agent, file-system-memory, claude-code, codex, openclaw, hermes, locomo-benchmark]
summary: 7×24 主动式 AI Agent 的开源记忆框架 — 把记忆组织成"文件系统"层级，500 行核心逻辑，支持 7 个 host adapter（Claude Code/Codex/Cursor/OpenClaw/Hermes/WorkBuddy/Cola），~14k stars，Locomo benchmark 92.09% 准确率
---

# MemU · 7×24 主动式 AI Agent 的开源记忆层

> 收录日期：2026-08-04
> 仓库：https://github.com/NevaMind-AI/memU
> 来源：2026-01 至 2026-02 GitHub Trending 高频上榜（多次日榜 Top 10）

**一句话核心总结**：memU 是 NevaMind-AI 开源的"主动式 AI Agent 记忆框架"——把多模态输入（对话/文档/图片/音视频）自动提取为结构化记忆，以**类文件系统**的层级组织（Folder/Category/Item），通过 host adapter 矩阵无缝接入 7 款主流编码 Agent，让"昨天学到的技能今天自动可用"。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | memU（Personal memory across agents） |
| **仓库地址** | https://github.com/NevaMind-AI/memU |
| **所属组织/作者** | NevaMind-AI |
| **描述** | Personal memory, stored as Wiki. Across Sessions. Across Agents. Across Devices. |
| **开源许可** | Other（自定义） |
| **Star 数** | ~14,000（截至 2026-04 官方数据 14,071） |
| **Fork 数** | ~1,000 |
| **技术类型** | framework |
| **核心代码量** | ~500 行（刻意保持精简） |

---

## 二、技术栈 / 架构

### 2.1 核心理念：记忆即文件系统

```
💾 File System        →   🧠 memU Memory
📁 Folders            →   🏷️ Categories（自动主题分类）
📄 Files              →   🧠 Memory Items（提取的事实/偏好/技能）
🔗 Symlinks           →   🔄 Cross-references（关联记忆）
📂 Mount points       →   📥 Resources（对话/文档/图片）
```

### 2.2 3 层记忆架构

| 层 | 响应式用法 | 主动式用法 |
|----|----------|----------|
| **Resource** | 直接访问原始数据 | 后台监听新模式 |
| **Item** | 定向事实检索 | 实时提取新交互 |
| **Category** | 概要级概览 | 自动预装上下文 |

### 2.3 Host Adapter 矩阵（核心差异化）

| Agent | binary | 会话日志位置 | 指令文件 |
|-------|--------|------------|---------|
| **Codex** | memu-codex | `~/.codex/sessions/**/*.jsonl` | `~/.codex/AGENTS.md` |
| **Claude Code** | memu-claude-code | `~/.claude/projects/<p>/<s>.jsonl` | `~/.claude/CLAUDE.md` |
| **Cursor** | memu-cursor | `~/.cursor/projects/<p>/agent-transcripts/**.jsonl` | `./AGENTS.md` |
| **OpenClaw** | memu-openclaw | `~/.openclaw/agents/<id>/sessions/*.jsonl` | `~/.openclaw/workspace/AGENTS.md` |
| **Hermes Agent** | memu-hermes | `~/.hermes/state.db`（SQLite 只读） | `~/.hermes/SOUL.md` |
| **WorkBuddy** | memu-workbuddy | `~/.workbuddy/projects/<p>/<s>.jsonl` | `~/.workbuddy/SOUL.md` |
| **Cola** | memu-cola | `~/.cola/sessions/<scope>/<s>.jsonl` | `~/.cola/memory-bank/MEMORY.md` |
| **未识别 Agent** | memu-agent | JSONL dialect 嗅探 | AGENTS.md / CLAUDE.md / SOUL.md 探测 |

### 2.4 数据流

```
Record:  调度任务切片新会话日志 → 准备 self-contained job 文件
         → Agent 自主蒸馏为 memory/skill Markdown
         → commit 提交至 commit_results 后端

Inject:  在 host 指令文件中加 `<binary> retrieve`
         → progressive_retrieve 在回答前召回相关 skill
```

### 2.5 存储后端

| Provider | DSN | 向量检索 | 适用 |
|---------|-----|---------|------|
| **inmemory** | — | brute-force cosine | 测试 |
| **sqlite** | sqlite:///path.sqlite3 | brute-force cosine | local/default 单写 |
| **postgres** | postgresql://... | **pgvector** | 并发访问 / 大存储 |
| **MemU Cloud** | https://api.memu.so | 托管 | 零部署 7×24 |

### 2.6 Embedding Providers

- `openai`（默认）
- `jina` / `voyage` / `doubao`（字节）/ `openrouter`

### 2.7 v2.0 重构亮点

- **三层工作流**（memorize / retrieve / skill extraction）分离
- MemoryService 缩小到 agentic surface，不直接调用 LLM
- 新增 Cola host adapter
- Cloud-backed memory behind existing CLI

---

## 三、核心功能特性

### 3.1 自动技能提取（self-evolve）

```
1. 捕获新会话：host adapter 读新 session log
2. 准备 self-evolve job：slices 每个 session 成 self-contained job
3. 让 Agent 决定：do nothing / patch existing skill / create new skill
4. 写可读 skill Markdown：name + description + workflow + edge cases
5. 提交 + 索引：commit 提交 → memU 嵌入 skill name/description
6. 未来检索：类似任务召回，agent 直接复用 learned workflow
```

> 关键设计：判断与合成留在 agent 内部，MemoryService 本身**不调用 LLM**，只存储/嵌入/检索 skill markdown。

### 3.2 跨 host 记忆共享

所有 host 共享一个 `~/.memu/config.env` 配置的存储后端——

> "What one host's sessions taught memU, another host retrieves."

Claude Code 学到的 OpenClaw 可以读，OpenClaw 蒸馏的 skill 可以喂给 Hermes。

### 3.3 双模式记忆检索

| Method | 速度 | 成本 | 适用 |
|--------|------|------|------|
| **rag** | ⚡ ms | embedding only | 实时 agent 上下文 |
| **llm** | 🐢 seconds | LLM inference | 复杂预判 |

### 3.4 自动分类（零手工标签）

- 自动生成 Category（如 `preferences/communication_style.md`）
- 自动 cross-link 关联记忆
- 主动模式：后台监听 + 持续更新

### 3.5 Locomo Benchmark

- 平均准确率 **92.09%**（在所有推理任务上）
- 行业领先（supermemoryai/supermemory ~50k ⭐ 与之同档位）

---

## 四、应用场景与已落地案例

### 4.1 个人 / 团队开发者

- 跨日/跨周编码时保持连续上下文
- 团队共享 observation 库，新人快速上手
- 决策可审计，code review 时回溯历史讨论

### 4.2 客服 / 销售（生产级 B2B Agent）

```python
await service.memorize(
    resource_url="customer_workspace/",
    modality="conversation",
    user={"user_id": "acme-corp"}
)
context = await service.retrieve(
    queries=[{"role": "user", "content": {"text": "What does this customer need?"}}],
    where={"user_id": "acme-corp"}
)
```

### 4.3 金融交易监控

- 持续学习用户交易偏好
- 主动告警基于个人 context 而非通用规则
- Token 成本降低（声称 50%+ 节省）

### 4.4 跨 host 复用

- 在 OpenClaw 学到的"代码审查模式"自动喂给 Claude Code
- 在 Hermes 的对话记忆自动喂给 Codex

### 4.5 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [Claude-Mem](../ai-engineering/claude-mem.md) | 同样做 agent 持久记忆，但 claude-mem 专攻 Claude Code + 同步较细 |
| [Pi-Mono](../ai-engineering/pi-mono.md) | pi-mono 是 agent 工具集，memU 是其潜在记忆后端 |
| [OpenClaw](../ai-agents/openclaw.md) | memU 原生 OpenClaw adapter，与 memUBot（OpenClaw 主动版）协同 |
| [Hermes Agent](../ai-agents/hermes-agent.md) | memU Hermes adapter 让 Hermes 拥有 7×24 记忆 |
| [PenguinHarness](../ai-agents/penguin-harness.md) | harness 决定"做什么"，memU 决定"记得什么"，可互补 |

---

## 五、个人评价

### 优势

1. **host-agnostic 抽象**：7 个 host adapter 是目前最广的覆盖矩阵（vs claude-mem 专注 Claude Code）
2. **500 行核心 + 主动循环**：刻意保持精简，"compact enough to inspect, understand, and adapt"
3. **跨 host 记忆共享**：单一 `~/.memu/config.env` 后端让"一处学到处处用"
4. **Cloud + Self-host 双部署**：MemU Cloud API + 本地 SQLite/Postgres 都 OK
5. **Locomo 92.09% 准确率**：行业头部水平
6. **v2.0 拆出 Skill 系统**：让 agent 主动蒸馏 reusable workflow，从"记忆"升级为"技能"

### 不足

1. **学习曲线陡**：需理解 host adapter / 存储后端 / embedding provider 三层抽象
2. **Mac 优先**：Windows 平台 Hermes adapter 兼容性有 warning（"use Windows HERMES_HOME support"）
3. **依赖外部 embedding API**：默认需 `OPENAI_API_KEY`（可换 jina/voyage/doubao，但仍是云依赖）
4. **社区规模相对小**：~14k stars，相比 supermemoryai（50k+）仍有差距
5. **v2.0-beta**：当前主版本是 2.0.0-beta.0，生产使用需谨慎

### 评分理由：⭐⭐⭐⭐ (4/5)

- 7 host adapters + 主动式 + 技能蒸馏 → 工程化典范
- 不给 5 星：仍处 beta + 社区规模 + 依赖外部 embedding

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/NevaMind-AI/memU |
| **官方网站** | https://memu.so |
| **Skill 路由文档** | https://memu.pro/SKILL.md |
| **API 文档** | https://api.memu.so |
| **Cloud 控制台** | https://memu.so |

### 关联项目

- [Claude-Mem](../ai-engineering/claude-mem.md) — Claude Code 专属持久记忆
- [Pi-Mono](../ai-engineering/pi-mono.md) — TypeScript AI Agent 全栈
- [OpenClaw](../ai-agents/openclaw.md) — memU 原生 host 之一
- [Hermes Agent](../ai-agents/hermes-agent.md) — memU 原生 host 之一
- [PenguinHarness](../ai-agents/penguin-harness.md) — 可与 memU 互补
