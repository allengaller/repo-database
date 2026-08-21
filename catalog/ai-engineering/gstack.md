---
name: garrytan/gstack
url: https://github.com/garrytan/gstack
domain: ai-engineering
type: framework
languages: [Markdown, Shell, JavaScript]
stars: 127000
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [agent-skills, claude-code, slash-commands, role-based, ceo-mode, eng-mode, qa-mode, ship-mode]
lineage: anthropics/claude-code
summary: Garry Tan 的 Claude Code 技能栈 — 23 个 slash-command 模式（CEO / eng / design review / QA / ship / browse / retro 等）把一个 Claude 实例变成"虚拟工程团队"，~127k stars，YC CEO 的日常工具
---

# GStack · Garry Tan 的 Claude Code 角色技能栈

> 收录日期：2026-08-13
> 仓库：https://github.com/garrytan/gstack
> 来源：YC CEO Garry Tan 公开使用 + 媒体广泛报道；best-of-Agent-Harnesses "Claude Code skill packs" 主推

**一句话核心总结**：GStack 是 YC 总裁 Garry Tan 主导的 Claude Code 技能栈 —— 23 个 slash-command 模式（CEO / eng / design / QA / ship / browse / retro / standup 等）把单个 Claude 实例组织成"虚拟工程团队"，~127k stars，YC 的日常驱动工具，"一人即团队"的工程化范本。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | GStack（也称 garry's stack） |
| **仓库地址** | https://github.com/garrytan/gstack |
| **所属作者** | Garry Tan（Y Combinator 总裁） |
| **描述** | Garry Tan's Claude Code skill stack: 23 slash-command modes (CEO/eng/design review, QA, ship, browse, retro, ...) that structure one assistant as a virtual engineering team |
| **开源许可** | MIT |
| **Star 数** | ~127,000（截至 2026-08） |
| **技术类型** | framework（Claude Code 角色技能框架） |
| **底层栈** | Markdown + Shell + JavaScript |

---

## 二、技术栈与架构分析

### 2.1 23 个 slash-command 模式（截至 2026-08）

| 模式 | 角色 | 用途 |
|------|------|------|
| `/ceo` | CEO | 战略对齐、商业优先级、跨部门协调 |
| `/eng` | 工程负责人 | 技术决策、架构 review、债务识别 |
| `/design` | 设计负责人 | UI / UX review、风格一致性 |
| `/qa` | QA | 测试覆盖、回归风险、边界情况 |
| `/ship` | 发布 | PR 生成、CI 触发、版本标记 |
| `/browse` | 调研 | 联网搜索、技术调研、竞品对比 |
| `/retro` | 复盘 | 总结本周期工作、提取教训 |
| `/standup` | 站会 | 自动生成昨日 / 今日 / 阻塞 |
| `/plan` | 规划 | 任务拆分、依赖识别、里程碑 |
| `/spec` | 规格 | 写规格文档、acceptance criteria |
| `/review` | Code Review | PR review、风格检查、最佳实践 |
| `/brief` | 简报 | 给团队 / 客户的高密度简报 |
| `/pitch` | 推介 | 投资人 / 客户推介稿生成 |
| `/hiring` | 招聘 | JD / 面试题 / 评估矩阵 |
| `/metrics` | 指标 | 北极星指标 / dashboard 设计 |
| `/incident` | 事故 | 复盘模板、根因分析 |
| `/security` | 安全 | 威胁建模、漏洞扫描 |
| `/docs` | 文档 | README / API doc / 内训材料 |
| `/comms` | 沟通 | 邮件 / 公告 / 客户回复 |
| `/forecast` | 预测 | 收入 / 增长 / 风险预测 |
| `/roadmap` | 路线图 | 季度 / 年度路线图 |
| `/experiment` | 实验 | A/B 测试设计、统计方法 |
| `/learn` | 学习 | 学习新技术的结构化路径 |

### 2.2 与 Superpowers 的差异

| 维度 | GStack | Superpowers |
|------|--------|-------------|
| 角色定位 | "我是 CEO / eng / QA..." | "用 brainstorming / TDD / debugging" |
| 焦点 | 商业 / 团队协作 / 决策 | 软件工程方法论 |
| 数量 | 23 | 50+ |
| 维护 | Garry Tan + YC 团队 | obra + 社区 |
| 适配 | Claude Code 单家 | 多 harness |

### 2.3 与 Anthropic Skills 的差异

| 维度 | GStack | Anthropic Skills |
|------|--------|------------------|
| 角色定位 | 角色型（CEO / eng） | 能力型（docx / pdf） |
| 焦点 | 商业 / 团队 / 决策 | 通用办公 / 工具 |
| 数量 | 23 | 10+ |
| 维护 | 社区 + Garry Tan | Anthropic 官方 |

三者构成完整技能生态：
- **Anthropic Skills**：教 Claude"做什么"（能力）
- **Superpowers**：教 Claude"怎么做"（方法论）
- **GStack**：教 Claude"为谁做"（角色）

---

## 三、核心功能特性

### 3.1 /ship 全流程自动化

输入 `/ship`，GStack 自动完成：
1. 跑测试
2. 生成 changelog
3. 创建 PR
4. 触发 CI
5. 自动合并（如通过）
6. 发 release 公告

适合"小项目 / 个人项目 / YC 内部工具"的快速发布。

### 3.2 /retro 周期复盘

`/retro` 拉取本周期所有 commit / PR / issue / Slack 总结，生成：
- 完成了什么
- 没完成什么
- 学到了什么
- 下周期改进

agent 把"回顾会议"自动化。

### 3.3 /plan + /spec 完整规划链

`/plan` 把模糊需求拆解为子任务；`/spec` 把每个子任务写成可验收的规格；agent 自动产出"开发任务书"。

### 3.4 /browse 联网调研

`/browse <query>` 触发联网搜索 + 摘要 + 引用，对"技术调研 / 竞品对比 / 行业报告"特别有用。

### 3.5 /metrics 指标设计

`/metrics <业务目标>` 自动产出：
- 北极星指标
- 输入指标 / 输出指标
- dashboard 草图
- A/B 测试设计建议

---

## 四、应用场景与本仓库关联

### 4.1 YC 内部 / 创业公司

- 创始人 / 小团队一站式 agent 协作
- 用 `/ceo` 对齐目标，`/eng` 拆技术，`/ship` 发布

### 4.2 个人开发者

- "一个人 = 一支团队"的工作流
- `/retro` 自动回顾、`/standup` 自动站会

### 4.3 企业内部工具

- 把企业流程做成 slash-command
- 跨部门协作的统一 agent 接口

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [skills.md](skills.md) | 互补（官方通用 vs Garry Tan 角色型） |
| [superpowers.md](superpowers.md) | 互补（方法论 vs 角色），可叠加 |
| [kimi-cli.md](kimi-cli.md) | Kimi CLI 用户可借鉴 GStack 思路构建自己的 stack |
| [oh-my-codex.md](oh-my-codex.md) | 同样"在 harness 之上加 workflow"，oh-my-codex 偏工程化 |

---

## 五、个人评价

### 5.1 优势

1. **角色化创新** —— 把 agent 抽象成"虚拟工程团队"，对一人创业 / 小团队极其实用
2. **slash-command 设计优雅** —— 23 个 mode 覆盖 CEO 日常 90% 场景，学习曲线友好
3. **YC 实战背书** —— Garry Tan 公开使用 + YC 生态背书，质量有保障
4. **开源 + 商业并行** —— YC 既开源 stack 又用其运营，是真实生产验证
5. **与 Anthropic Skills / Superpowers 形成完整生态** —— 通用 + 方法论 + 角色三者各司其职

### 5.2 不足

1. **仅 Claude Code** —— 不直接支持其他 harness，多 provider 用户迁移成本
2. **角色化可能"用力过猛"** —— 不是所有任务都需要"假装 CEO"，简单任务反而增加负担
3. **Garry Tan 个人色彩浓** —— 风格 / 用词 / 决策框架偏向硅谷创业语境，国内 / 大企业场景需本地化
4. **23 个 mode 数量上限** —— 远少于 Superpowers 50+，复杂工程方法论覆盖不足
5. **没有与 GSD 的清晰边界** —— "GStack + GSD + Superpowers"组合的工程味儿不足，需用户自己调

### 5.3 评分理由

**4 星（active）** —— 角色化思路创新，slash-command 体验好；YC 背书 + 127k stars 验证市场认可；与 Anthropic Skills / Superpowers 形成完整生态。扣分项是仅 Claude Code、Garry Tan 个人色彩浓、23 个 mode 覆盖度有限；但作为"一人即团队"的工作流标杆，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/garrytan/gstack |
| **Garry Tan 个人博客** | https://garrytan.com |
| **最佳实践** | https://dev.to/imaginex/a-claude-code-skills-stack-how-to-combine-superpowers-gstack-and-gsd-without-the-chaos-44b3 |
| **对比基准** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |

### 关联项目

- [skills.md](skills.md) — Anthropic 官方通用技能
- [superpowers.md](superpowers.md) — 跨 harness 工程方法论技能包
- [kimi-cli.md](kimi-cli.md) — Moonshot 出品的编码 agent
- [oh-my-codex.md](oh-my-codex.md) — Codex 之上的工作流引擎
- [get-shit-done.md](get-shit-done.md) — 目标倒推 + 波次执行引擎