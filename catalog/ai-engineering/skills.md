---
name: anthropics/skills
url: https://github.com/anthropics/skills
domain: ai-engineering
type: framework
languages: [Markdown, Python, JavaScript]
stars: 172107
forks: 0
license: Other
discovered: 2026-08-13
updated: 2026-08-13
rating: 5
status: active
tags: [agent-skills, anthropic, claude-code, claude-api, progressive-disclosure, skill-md, docx-pdf-pptx]
lineage: original
summary: Anthropic 官方 Agent Skills 仓库 — SKILL.md-based 文件夹（指令/脚本/资源）让 Claude 在 Claude Code / Claude.ai / API 上动态加载，~167k stars，2026 年 progressive-disclosure 技能包的事实标准
---

# Anthropic Skills · 官方 Agent Skills 标准

> 收录日期：2026-08-13
> 仓库：https://github.com/anthropics/skills
> 来源：best-of-Agent-Harnesses 列为 "Coding harness configs and SDKs" 排名第 2；Anthropic 2025-2026 年力推的核心概念

**一句话核心总结**：Anthropic Skills 是 Anthropic 官方出品的 Agent Skills 参考仓库 —— 基于 SKILL.md-based 文件夹（指令 + 脚本 + 资源），让 Claude 在 Claude Code、Claude.ai、Anthropic API 上动态加载不同能力（docx / pdf / pptx / xlsx 等），~167k stars，progressive-disclosure 技能包在 2026 年的事实标准。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Anthropic Skills（也称 Claude Skills） |
| **仓库地址** | https://github.com/anthropics/skills |
| **所属组织** | Anthropic（Claude 团队） |
| **描述** | The official Agent Skills repository: SKILL.md-based folders (instructions, scripts, resources) Claude dynamically loads on Claude Code, Claude.ai, and the API |
| **开源许可** | Anthropic 专有许可（Other，非标准 OSS） |
| **Star 数** | 172,107（截至 2026-08） |
| **技术类型** | framework（跨平台的技能包框架） |
| **支持平台** | Claude Code + Claude.ai + Anthropic API |

---

## 二、技术栈与架构分析

### 2.1 SKILL.md 格式

每个 skill 是一个文件夹，核心是 `SKILL.md`：

```yaml
---
name: skill-name
description: 一句话描述，harness 根据它判断是否加载
allowed-tools: [Read, Write, Bash]
---

# Skill 名称
正文：agent 加载后读到的完整指令
```

设计哲学：**progressive disclosure** —— 不一次塞满上下文，只在需要时按 description 匹配加载。

### 2.2 内置技能清单（截至 2026-08）

| Skill | 功能 |
|-------|------|
| **docx** | 创建/读取 Word 文档 |
| **pdf** | PDF 处理（解析 / 抽取 / 合并） |
| **pptx** | PowerPoint 演示文稿生成 |
| **xlsx** | Excel 表格读写 |
| **frontend-design** | 前端设计规范 |
| **artifacts-builder** | HTML artifacts 构建 |
| **mcp-builder** | 自建 MCP server 指南 |
| **webapp-testing** | Web 应用测试 |
| **brand-guidelines** | 品牌规范 |
| **internal-comms** | 内部沟通模板 |

### 2.3 跨平台加载

- **Claude Code**：通过 `.claude/skills/<skill-name>/SKILL.md` 加载
- **Claude.ai**：通过"项目 Skills"功能加载
- **Anthropic API**：通过 `/v1/skills` 端点（2026 年新增）

### 2.4 与 Superpowers 的关系

| 维度 | Anthropic Skills | Superpowers |
|------|------------------|-------------|
| 来源 | Anthropic 官方 | obra 社区 |
| 焦点 | 通用能力（docx/pdf/...） | 软件工程方法论（brainstorming/TDD/...） |
| 许可 | 专有 | MIT |
| 数量 | 10+ | 50+ |

两者**互补**而非竞争：Anthropic Skills 教 Claude"做什么"，Superpowers 教 Claude"怎么做"。

---

## 三、核心功能特性

### 3.1 Progressive Disclosure

不一次塞入所有 skill 全文，而是：
- 启动时只把每个 skill 的 `name` + `description` 注入上下文（约 100 tokens/skill）
- 当用户任务匹配某 skill 的 description 时，再加载完整 SKILL.md
- 上下文节省可达 90%+

### 3.2 跨平台一致性

同一份 SKILL.md 在 Claude Code、Claude.ai、API 上行为一致；开发者一次编写，三处生效。

### 3.3 工具白名单

`allowed-tools` 字段限制 skill 可调用的工具集：
- `pdf` skill 允许 `Read / Bash / Write`
- `frontend-design` skill 允许 `Read / Edit / Bash`
- 安全边界清晰

### 3.4 自建 skill 模板

`mcp-builder` skill 教用户如何写自己的 skill：模板、frontmatter 规范、allowed-tools 设计、测试方法。

### 3.5 品牌 / 内部规范承载

企业可把自己的品牌指南、内部沟通模板等做成 skill，让 Claude 永远按"我们公司的风格"输出。

---

## 四、应用场景与本仓库关联

### 4.1 个人开发者

- 在 Claude Code 上装 docx/pdf/pptx 技能，处理办公文档
- 学习"如何写 skill"作为元能力

### 4.2 企业 / 团队

- 把品牌指南做成 skill，全公司 Claude 输出风格统一
- 把合规检查做成 skill，自动检测文档是否过红线
- 把内部工具链做成 skill，新人也能"一键调用"

### 4.3 Skill 生态贡献者

- 在 Anthropic Skills 基础上扩展自己领域的 skill
- 与 Superpowers / GStack 等生态互通

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [superpowers.md](superpowers.md) | 互补（通用能力 vs 工程方法论），可同时加载 |
| [gstack.md](gstack.md) | 互补（官方通用 vs Garry Tan 的 CEO/eng 角色） |
| [kimi-cli.md](kimi-cli.md) | kimi-cli 等 harness 借鉴 SKILL.md 格式 |
| [planning-with-files.md](planning-with-files.md) | 自建 skill 范例：Manus 风格的持久规划 |
| [opencode.md](opencode.md) | opencode 通过 MCP 加载 skills |

---

## 五、个人评价

### 5.1 优势

1. **Anthropic 官方背书** —— 167k stars 反映其权威地位，Claude 全栈支持
2. **Progressive Disclosure** —— 设计哲学领先，避免上下文爆炸
3. **跨平台一致性** —— 一次编写，Claude Code/Claude.ai/API 三处生效
4. **自建模板 + 工具白名单** —— 让生态贡献门槛降低、安全边界清晰
5. **互补而非替代** —— 与 Superpowers / GStack 不冲突，企业可叠加使用

### 5.2 不足

1. **专有许可** —— 不是标准 OSS，企业商用需评估 Anthropic ToS
2. **官方技能数量仍少** —— 10+ 个技能远不如 Superpowers 的 50+ 覆盖度
3. **仅 Claude 生态** —— 不直接支持 OpenAI / Gemini / 本地模型；多 provider 用户需自己适配
4. **更新节奏受 Anthropic 节奏影响** —— bug 修复 / 新 skill 节奏受公司优先级影响
5. **企业级 governance 工具缺失** —— 大规模分发、版本管理、权限控制仍依赖外部工具

### 5.3 评分理由

**5 星（active）** —— Anthropic 官方背书 + 167k stars + progressive disclosure 设计哲学为后续所有 skill 生态奠定基础；跨平台一致性降低开发者适配成本；与 Superpowers / GStack 的互补关系形成"通用 + 方法论 + 角色"的完整生态。扣分项是专有许可与仅 Claude 生态限制；但作为"Agent Skills 概念的事实标准"，必须 5 星。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/anthropics/skills |
| **Claude Code 集成** | https://docs.claude.com/en/docs/claude-code/skills |
| **官方博客** | https://www.anthropic.com/news/skills |
| **MCP 协议** | https://modelcontextprotocol.io |

### 关联项目

- [superpowers.md](superpowers.md) — 跨 harness 的工程方法论技能包（互补）
- [gstack.md](gstack.md) — Garry Tan 的 Claude Code 角色技能（互补）
- [planning-with-files.md](planning-with-files.md) — 持久规划 skill 自建范例
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的编码 agent
- [opencode.md](opencode.md) — 多 provider 编码 agent（MCP 加载 skills）