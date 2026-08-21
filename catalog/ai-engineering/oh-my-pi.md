---
name: can1357/oh-my-pi
url: https://github.com/can1357/oh-my-pi
domain: ai-engineering
type: application
languages: [Rust, TypeScript]
stars: 23000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [coding-agent, terminal-agent, lsp, dap, rust, multi-provider, browser-control, agent-harness]
lineage: oh-my-zsh
summary: 终端编码 agent 的"重装版" — 55k 行 Rust 核心 + LSP/DAP 真实接入 + 32 工具 per-model loop + Python/Bun 长生命周期内核回呼 agent 工具，~23k stars，被 best-of 称为"harness 工程的典范"
---

# oh-my-pi · 重装版终端编码 agent

> 收录日期：2026-08-13
> 仓库：https://github.com/can1357/oh-my-pi
> 来源：best-of-Agent-Harnesses 在"Terminal coding agents"对比章节主推；社区称为"真正把 LSP/DAP 接入 harness 的项目"

**一句话核心总结**：oh-my-pi（fork 自 Pi/上游）是把 IDE 整个塞进 harness 的终端编码 agent —— hash 锚定 edit、32 工具 per-model 调优 loop、LSP rename/references/diagnostics on every write、真实 DAP 调试器（lldb/dlv/debugpy）、长生命周期 Python + Bun 执行内核回呼 agent 工具，外加浏览器控制与 40+ provider，~55k 行 Rust 核心，是 harness 工程的极深度参考实现。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | oh-my-pi |
| **仓库地址** | https://github.com/can1357/oh-my-pi |
| **所属作者** | can1357 |
| **上游** | badlogic/pi-mono（统一多 provider LLM API + agent loop + TUI shell） |
| **开源许可** | MIT |
| **Star 数** | ~23,000（截至 2026-08） |
| **技术类型** | application（终端编码 agent） |
| **代码规模** | ~55k 行 Rust 核心 + Bun workspaces |

---

## 二、技术栈与架构分析

### 2.1 五大"重装"特性

| 特性 | 说明 |
|------|------|
| **Hash 锚定 edit** | 每次 Edit 都基于文件 hash，文件被外部改动时自动重新感知而不漂移 |
| **32 工具 per-model loop** | 每个模型独立的 32 个工具组合（部分模型启用浏览器，部分仅基础 bash + 文件） |
| **LSP wired into edits** | 每次 Edit 触发 LSP rename / references / diagnostics，agent 看到的"事实"是 IDE 看到的同一份 |
| **真实 DAP 调试器** | lldb / dlv / debugpy 三栈接入，断点 / step / inspect 真实运行中进程 |
| **长生命周期 Python + Bun 内核** | 持久的 Jupyter-like 内核回呼 agent 的工具调用，反过来也能从内核调 agent 工具 |

### 2.2 多 Provider 抽象

40+ provider 支持：Claude、OpenAI、Gemini、本地（Ollama / vLLM）、Anthropic Bedrock / Vertex、OpenRouter 等。

### 2.3 浏览器控制

内置 headless browser 工具集：navigate / click / fill / extract / screenshot；与 `browser-use` 等专项工具的对比是"够用且不引入额外依赖"。

### 2.4 Bun workspaces + 原生包

- `packages/natives`：Rust 编译的本地绑定（pi-natives），通过 `bun run build:native` 构建
- monorepo 拆分：core / natives / agent-loop / tui / cli

---

## 三、核心功能特性

### 3.1 真正 IDE-grade 的 Edit 体验

普通终端 agent 的 Edit 操作常因 LSP 缓存/索引陈旧而出现"代码看起来对，编译却挂"的尴尬。oh-my-pi 把 LSP 接到每一次 edit 后，等于让 agent 自己看到 IDE 看到的事实。

### 3.2 DAP 调试

调试不是"建议加点 print"，而是真正在断点停下、查看变量、单步执行；agent 可以调用 DAP 工具读 backtrace / 局部变量，再决定下一步。

### 3.3 持久执行内核

- Python 内核保持变量状态，agent 多次调用之间不丢
- Bun 内核保持 JS/TS 状态
- 内核可回调 agent 工具：例如在 Python 里 `await agent.run("fix this traceback")`

### 3.4 模型感知的工具集

不同模型被分配不同工具组合：
- Claude Sonnet 4.5：完整 32 工具
- 小模型 / 本地模型：精简子集（避免"工具描述耗光上下文"）
- 长上下文模型：额外启用 refactor / migration 类重型工具

### 3.5 harness 工程典范

best-of-Agent-Harnesses 把 oh-my-pi 列为"harness 工程的典范"，原因正是：把 LSP / DAP / 持久内核这三件一般 agent 都"假支持"的工具，做到了工程级的真实集成。

---

## 四、应用场景与本仓库关联

### 4.1 重构与迁移

- 大型 monorepo 跨语言重构（Java → Kotlin、JS → TS、Python 2 → 3）
- LSP / DAP 接入让"重构后实际能编译运行"成为默认前提

### 4.2 调试复杂 bug

- 多线程 / 异步代码调试
- 需要真实断点的 crash 分析
- 内核状态保留让 agent 跨多轮迭代同一段代码

### 4.3 本地 + 开源栈

- 想完全跑在本地（Ollama + Bun + oh-my-pi），零 SaaS 依赖的开发者

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [opencode.md](opencode.md) | opencode 是上游，oh-my-pi 是"重装 fork"，可对照看 harness 深度优化空间 |
| [claude-mem.md](claude-mem.md) | 两者正合作持久代码库记忆（vectorize-io/hindsight PR 中提及） |
| [kimi-cli.md](kimi-cli.md) | 都是终端编码 agent 阵营，kimi-cli 走"绑定 Moonshot 模型栈"，oh-my-pi 走"harness 极深度" |

---

## 五、个人评价

### 5.1 优势

1. **harness 工程的极致范例** —— LSP / DAP / 持久内核三大件的真实集成，为 harness 设计树立基准
2. **Rust 核心 + Bun workspaces** —— 性能与扩展性兼顾，编译产物小，启动快
3. **per-model 工具集** —— 不是"工具堆砌"，而是按模型上下文窗口调优
4. **多 Provider 完备** —— 40+ provider，适合不愿锁定单一模型厂商的团队

### 5.2 不足

1. **构建门槛** —— 需要 Rust toolchain + Bun + 原生编译，环境搭建比纯 TS 项目复杂
2. **学习曲线陡** —— 用户需要懂 LSP / DAP / 内核才能发挥全部能力
3. **文档密度不足** —— 仓库 README 偏 demo，深度功能散落 issues / wiki
4. **23k stars 与 55k 行 Rust 不匹配** —— 长期维护可持续性需要观察（个人项目特征明显）

### 5.3 评分理由

**4 星（active）** —— harness 工程的"教科书级别"实现，best-of 把它列为对比基准；多 provider + 真实调试接入在编码 agent 里稀缺。扣分项是构建/学习曲线陡与项目长期可持续性观察；以及"fork 路线"对社区认知的统一性挑战。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/can1357/oh-my-pi |
| **上游** | https://github.com/badlogic/pi-mono |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |
| **衍生阅读** | https://blog.bytebytego.com/p/top-ai-github-repositories-in-2026 |

### 关联项目

- [opencode.md](opencode.md) — 上游 + 多 provider 标杆
- [claude-mem.md](claude-mem.md) — 跨 agent 持久记忆（含 oh-my-pi 合作 PR）
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的终端编码 agent
- [pi-mono.md](pi-mono.md) — oh-my-pi 的上游 toolkit