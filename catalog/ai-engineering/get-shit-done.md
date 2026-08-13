---
name: gsd-build/get-shit-done
url: https://github.com/gsd-build/get-shit-done
domain: ai-engineering
type: tool
languages: [Markdown, Python, Shell]
stars: 7900
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [meta-prompting, context-engineering, spec-driven, wave-execution, claude-code, opencode, gemini-cli, fresh-context]
summary: TÂCHES 团队出品的目标倒推 + 波次执行引擎 — 在"全新上下文窗口"上跑 agent，避免 context rot；spec-driven 开发，~7.9k stars，"Claude Code 社区的 context engineering 风暴"
---

# Get-Shit-Done · 目标倒推 + 波次执行引擎

> 收录日期：2026-08-13
> 仓库：https://github.com/gsd-build/get-shit-done
> 来源：2026 年 Claude Code 社区"context engineering 风暴"代表项目；dev.to"如何叠加 Superpowers + GStack + GSD"长文重点讨论

**一句话核心总结**：Get-Shit-Done（GSD）是 TÂCHES 团队出品的 meta-prompting 引擎 —— 目标倒推（goal-backward）+ 波次执行（wave-based execution）+ 全新上下文窗口（fresh context windows），spec-driven 开发模式跨 Claude Code / OpenCode / Gemini CLI，~7.9k stars，把"context rot"问题工程化解决。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Get-Shit-Done（GSD） |
| **仓库地址** | https://github.com/gsd-build/get-shit-done |
| **所属团队** | TÂCHES（gsd-build 组织） |
| **描述** | A light-weight and powerful meta-prompting, context engineering and spec-driven development system for Claude Code, OpenCode, Gemini CLI — `gsd:ship` command |
| **开源许可** | MIT |
| **Star 数** | ~7,900（截至 2026-08） |
| **技术类型** | tool（meta-prompting 引擎） |
| **底层栈** | Markdown + Python + Shell |

---

## 二、技术栈与架构分析

### 2.1 三大设计原则

| 原则 | 说明 |
|------|------|
| **目标倒推 (Goal-Backward)** | 从最终交付物反推：要交付 X，需要先交付 Y、Z... |
| **波次执行 (Wave-Based)** | 把任务拆成多个 wave，每个 wave 在全新上下文窗口跑 |
| **全新上下文 (Fresh Context)** | 每个 wave 启动新 agent session，避免 context rot |

### 2.2 context rot 问题

LLM agent 在长会话中性能下降（"context rot"）—— 早期指令 / 早期决策被新内容稀释。GSD 解法：每个 wave 一个新会话，只注入当前 wave 需要的最小上下文。

### 2.3 spec-driven 工作流

1. **gsd:plan** —— 启动规划，生成 PROJECT.md + SPEC.md + ROADMAP.md
2. **gsd:research** —— 对每个 plan 自动生成 RESEARCH.md（联网调研）
3. **gsd:execute** —— 按 wave 执行 plan，每 wave 一个新 agent
4. **gsd:verify** —— 验证交付物与 SPEC 一致
5. **gsd:ship** —— 收尾：发 PR / 合并 / release notes

### 2.4 多 Harness 适配

通过适配层支持：
- Claude Code（主战场）
- OpenCode
- Gemini CLI
- Codex（实验性）

每个 harness 一个 adapter，spec / roadmap 文件统一。

---

## 三、核心功能特性

### 3.1 gsd:plan

输入项目目标，自动产出：
- **PROJECT.md** —— 一句话定位 + 成功指标
- **SPEC.md** —— 详细需求 / 边界 / 非目标
- **ROADMAP.md** —— 拆 wave + 子任务 + 依赖关系

### 3.2 gsd:research

对每个 plan 自动调研：
- 联网搜索相关技术 / 库 / 最佳实践
- 生成 RESEARCH.md（带引用）
- 后续 execute wave 读 RESEARCH.md 作为参考

### 3.3 gsd:execute（核心）

- 每个 wave 启动全新 agent
- 注入本 wave 的最小上下文
- agent 完成后写 wave 结果 + 自动 commit
- 失败 → 自动 retry；超过 3 次 → 暂停让用户介入

### 3.4 gsd:verify

验收测试：
- 跑测试
- 检查 SPEC 中的 acceptance criteria
- 与用户对齐"是否真做完了"

### 3.5 gsd:ship

发布自动化：
- 生成 changelog
- 创建 PR
- 触发 CI
- 合并 / release

---

## 四、应用场景与本仓库关联

### 4.1 大型项目启动

- 从模糊目标到可执行 roadmap
- 一次性理清需求、调研、规划、执行

### 4.2 context rot 受害者

- 跑长会话性能下降严重的 Claude Code / Codex 用户
- 想"每次都新鲜启动"的开发者

### 4.3 团队协作

- 多人协作时统一 spec / roadmap 格式
- wave-based 执行让进度可见

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [superpowers.md](superpowers.md) | 互补（Superpowers 方法论 + GSD 执行引擎） |
| [gstack.md](gstack.md) | 互补（GStack 角色 + GSD 执行） |
| [skills.md](skills.md) | GSD 自建 skill 范例 |
| [oh-my-codex.md](oh-my-codex.md) | 都是"在 harness 之上加 workflow"思路 |
| [planning-with-files.md](planning-with-files.md) | GSD 的 wave 文件组织借鉴了 Manus 风格 |

---

## 五、个人评价

### 5.1 优势

1. **直击 context rot 痛点** —— 全新的 wave + 全新上下文，避免"长会话性能崩溃"
2. **spec-driven 工程化** —— 把"模糊目标 → 可验收交付"做成一键流程
3. **多 harness 适配** —— Claude Code / OpenCode / Gemini CLI 通用，不锁死
4. **MIT + 开源社区活跃** —— 7.9k stars 与 dev.to 长文讨论验证热度
5. **可与 Superpowers / GStack 叠加** —— 互补关系，三者结合覆盖"方法论 + 角色 + 执行"

### 5.2 不足

1. **复杂度高于单 skill** —— gsd:plan / research / execute / verify / ship 五步对简单任务过重
2. **依赖外部命令 `npx get-shit-done-cc`** —— 需要 npm + 安装，与 Claude Code 原生 slash-command 体感不同
3. **TÂCHES 团队小** —— 主要靠团队几个人维护，长期可持续性观察
4. **验证机制可能过于严格** —— 严格按 SPEC 验收，遇到"SPEC 没说但用户想要"的灰色场景需手动调整
5. **多 harness 适配深度不一** —— Claude Code 主战场，OpenCode / Gemini CLI 适配较新

### 5.3 评分理由

**4 星（active）** —— 解决 context rot 这一关键痛点；spec-driven + wave-based 是大型项目启动的有效范式；与 Superpowers / GStack 形成"方法论 + 角色 + 执行"完整生态。扣分项是复杂度、团队规模、严格验证带来的使用门槛；但作为"meta-prompting 引擎"的代表作，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/gsd-build/get-shit-done |
| **组合实践** | https://dev.to/imaginex/a-claude-code-skills-stack-how-to-combine-superpowers-gstack-and-gsd-without-the-chaos-44b3 |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [superpowers.md](superpowers.md) — 跨 harness 工程方法论
- [gstack.md](gstack.md) — Garry Tan 的角色技能
- [skills.md](skills.md) — Anthropic 官方 skill 标准
- [oh-my-codex.md](oh-my-codex.md) — Codex 之上的工作流引擎
- [planning-with-files.md](planning-with-files.md) — 持久规划 skill 范例