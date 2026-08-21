---
name: obra/superpowers
url: https://github.com/obra/superpowers
domain: ai-engineering
type: framework
languages: [Markdown, Shell, JavaScript]
stars: 28000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 5
status: active
tags: [agent-skills, harness, claude-code, codex, opencode, gemini-cli, tdd, brainstorming, systematic-debugging, slash-commands]
lineage: anthropics/skills
summary: 跨 13+ 编码 agent harness 的"方法论技能包" — 把 brainstorming / TDD / systematic-debugging / code-review 等软件工程最佳实践装成可被任何 harness 加载的 SKILL.md，~28k stars，harness 工程的标杆方法论库
---

# Superpowers · 跨 harness 的工程方法论技能包

> 收录日期：2026-08-13
> 仓库：https://github.com/obra/superpowers
> 来源：best-of-Agent-Harnesses 在"Claude Code skill packs"对比章节主推；Claude Code 社区"装了就不想卸载"的明星项目

**一句话核心总结**：Superpowers 是 obra 出品的"软件工程方法论技能包" —— 把 brainstorming / TDD / systematic-debugging / writing-plans / using-git-worktrees / requesting-code-review 等工程实践拆成可独立加载的 SKILL.md，兼容 13+ 个编码 agent harness（Claude Code / Codex / OpenCode / Cursor / Gemini CLI / Copilot 等），~28k stars，把"工程纪律"做成开箱即用的 harness 能力。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Superpowers |
| **仓库地址** | https://github.com/obra/superpowers |
| **所属作者** | obra（社区资深开发者） |
| **描述** | An agentic skills framework & software development methodology for your coding agents — Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Copilot and more |
| **开源许可** | MIT |
| **Star 数** | ~28,000（截至 2026-08） |
| **技术类型** | framework（跨 harness 的技能框架） |
| **底层栈** | Markdown + Shell + JavaScript |

---

## 二、技术栈与架构分析

### 2.1 三层技能结构

| 层 | 内容 |
|----|------|
| **Core Skills** | brainstorming / TDD / systematic-debugging / writing-plans / using-git-worktrees |
| **Process Skills** | test-driven-development / verification-before-completion / writing-skills / dispatching-parallel-agents |
| **Optional Skills** | drawing / mermaid / webapp-testing / requesting-code-review |

每条 skill 是一个独立 `SKILL.md` + 可选 `code/` `examples/` 目录；harness 按需加载。

### 2.2 13+ Harness 兼容

通过 `SKILL.md` + 通用 frontmatter 格式，harness 只需满足 progressive disclosure 加载机制即可启用：

- Claude Code（主战场）
- Codex / OpenAI CLI
- OpenCode / Crush / Pi
- Gemini CLI / Antigravity CLI
- Cursor / Copilot / Trae
- Cline / Roo Code / Kilo Code
- Aider 等

### 2.3 与 Anthropic Skills 的差异

| 维度 | Superpowers | Anthropic Skills |
|------|-------------|------------------|
| 来源 | 社区（obra） | Anthropic 官方 |
| 数量 | 50+ 实战技能 | 15+ 通用技能（docx / pdf / pptx 等） |
| 焦点 | 软件开发方法论 | 通用办公 / 工具技能 |
| 许可 | MIT | Anthropic 专有许可 |
| 风格 | "工程纪律" | "工具能力" |

### 2.4 与 GStack 的差异

| 维度 | Superpowers | GStack |
|------|-------------|--------|
| 数量 | 50+ | 23 |
| 风格 | 方法论（流程型） | 角色（CEO / eng / QA / ship） |
| 维护 | obra 主导 + 社区 | Garry Tan / YC 主导 |
| 适配 | 多 harness | Claude Code 单家 |

---

## 三、核心功能特性

### 3.1 TDD skill

强制 agent 写代码前先写测试：
- 红 → 绿 → 重构 三段式
- 自动检测已有测试，跑通后才允许 push
- 与 writing-plans skill 串联形成"先规划、再测试、再实现"闭环

### 3.2 systematic-debugging

调试不是"猜"，而是分阶段：
1. 复现 → 2. 隔离 → 3. 假设 → 4. 验证 → 5. 修复 → 6. 防回归

agent 加载该 skill 后会严格走这 6 步，而不是循环"加 print 再跑"。

### 3.3 brainstorming

任何"开始写代码"之前必须先 brainstorming：
- 明确问题域
- 列出候选方案
- 与用户对齐 acceptance criteria
- 输出后再进入 writing-plans

避免 agent "立刻动手改代码"的常见毛病。

### 3.4 verification-before-completion

"声称完成"前必须自证：
- 跑测试
- 看日志
- 验证行为
- 失败则不报告"完成"

agent loop 的常见 bug（"代码没改就说改完了"）被该 skill 系统化拦截。

### 3.5 writing-skills

skill 本身用 skill 来写 —— 元层级的 self-referential 设计，让贡献者也能"用 Superpowers 开发新 Superpower"。

---

## 四、应用场景与本仓库关联

### 4.1 个人开发者

- 想给编码 agent 装"工程纪律"的开发者
- 跨多个 harness 时统一技能库

### 4.2 团队

- 把"代码 review 流程"嵌入 agent loop
- 让新人快速掌握团队编码规范

### 4.3 Harness 厂商

- 自家 harness 接入 Superpowers 即可获得 50+ 高质量技能
- 不用自己重新发明 brainstorming / TDD 等方法论

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [kimi-cli.md](kimi-cli.md) | kimi-cli 是 harness，Superpowers 是其上可加载的技能 |
| [opencode.md](opencode.md) | opencode 加载 Superpowers 后获得完整方法论支持 |
| [skills.md](skills.md) | Anthropic 官方 skills，与 Superpowers 互补（通用 vs 方法论） |
| [gstack.md](gstack.md) | GStack 是另一套 Claude Code 技能，可与 Superpowers 并存 |

---

## 五、个人评价

### 5.1 优势

1. **跨 harness 中立** —— 一次学习，13+ harness 通用，避免技能库碎片化
2. **方法论深度** —— 不只是"工具调用"，而是"工程纪律"系统化注入
3. **社区驱动持续演进** —— 28k stars + obra 长期维护，技能库持续扩充
4. **元层级设计** —— writing-skills skill 让贡献者也能"用 Superpowers 开发新 Superpower"
5. **可与 Anthropic Skills / GStack 共存** —— 不冲突，可叠加

### 5.2 不足

1. **学习曲线存在** —— 50+ skill 全部了解需时间；harness 自动加载的"默认行为"对老用户可能反直觉
2. **方法论过严可能拖慢速度** —— brainstorming / TDD 强制流程对快速原型不友好
3. **28k stars 与 best-of 列表的 270k 数字差距大** —— best-of 似乎把"包含依赖的复合 stars"算进了，需以 GitHub 实际为准
4. **SKILL.md 标准尚未广泛统一** —— 各 harness 加载方式细节差异仍存在
5. **多语言支持有限** —— skill 内容以英文为主，中文开发者阅读门槛存在

### 5.3 评分理由

**5 星（active）** —— 跨 harness 技能框架的"事实标准"；方法论深度 + 工程纪律为 agent 注入灵魂；obra 长期维护 + 28k stars 验证生态活跃。扣分项是学习曲线与流程对快速原型不友好；但作为"提升 harness 工程质量"的工具，已经达到标杆水平，值得 5 星。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/obra/superpowers |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |
| **官方博客** | https://blog.obralog.com/ |
| **Claude Code 集成** | https://claudeskills.info/plugins/obra/superpowers/ |

### 关联项目

- [skills.md](skills.md) — Anthropic 官方通用技能
- [gstack.md](gstack.md) — Garry Tan 的 Claude Code 角色技能
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的编码 agent（可加载 Superpowers）
- [opencode.md](opencode.md) — 多 provider 编码 agent（可加载 Superpowers）
- [planning-with-files.md](planning-with-files.md) — 同类持久规划技能