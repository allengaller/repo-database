---
name: anthropics/claude-plugins-official
url: https://github.com/anthropics/claude-plugins-official
domain: ai-engineering
type: awesome-list
languages: [Python]
stars: 34740
forks: 3915
license: Apache-2.0
discovered: 2026-08-27
updated: 2026-08-27
rating: 4
status: active
tags: [claude-code, plugins, official-directory, mcp, lsp, harness]
lineage: original
summary: Anthropic 官方维护的 Claude Code 插件目录，40 个内置插件 + 外部插件索引，对齐官方插件设计规范的权威参考
---

# Claude Plugins Official · 官方插件目录

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Claude Plugins Official |
| **仓库地址** | https://github.com/anthropics/claude-plugins-official |
| **所属组织/作者** | Anthropic |
| **描述** | Anthropic 官方管理的高质量 Claude Code 插件目录，含官方内置插件与外部插件收录 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 34,740（截至 2026-08，单日 +292） |
| **Fork 数** | 3,915 |
| **技术类型** | awesome-list + 插件实现集 |

## 二、技术栈分析

- 双层结构：`plugins/`（官方自研 40 个，直接可用）+ `external_plugins/`（第三方收录，如 GitHub/GitLab/Firebase/Context7 的接入）
- 官方插件按功能分族：LSP 系列（typescript/python/rust/go/swift/kotlin 等 13 个语言服务器）、开发流程（code-review、pr-review-toolkit、commit-commands、feature-dev）、输出风格（explanatory/learning-output-style）、元插件（skill-creator、plugin-dev、hookify）
- 每个插件含 `.claude-plugin/` 清单（plugin.json）+ commands/ + skills/ + agents/ 的标准组合，是插件结构的事实规范
- `example-plugin` / `playground` 目录是官方提供的模板起点
- 仓库本身也是插件市场（marketplace）的源：`.claude-plugin/marketplace.json` 定义市场索引格式

## 三、核心功能特性

1. **官方插件设计规范的可执行样本**：40 个插件每个都是「命令 + 技能 + 钩子」组合的参考实现，比读文档更直接
2. **LSP 全家桶**：13 个语言服务器插件展示了 harness 如何统一接入语言智能（诊断、跳转、重构）
3. **元编程插件**：skill-creator（造技能的技能）、plugin-dev（开发插件的插件）、hookify —— 官方亲自示范插件自举
4. **市场索引格式**：marketplace.json 是插件分发机制的规范文档，自建内部插件市场可直接复用
5. **外部插件收录标准**：asana/discord/imessage 等第三方插件的收录方式，定义了生态准入门槛

## 四、应用场景说明

- **对齐官方插件设计规范**：自研 Claude Code 插件（或兼容 harness 的插件）时，这里的 40 个实现就是风格基准
- **插件结构学习路径**：example-plugin 起步 → code-review 精读 → skill-creator 研究元插件设计
- **企业内部插件市场的蓝本**：marketplace.json 格式 + external_plugins 收录机制，可直接套用到内部技能/插件分发
- 与 [skills.md](skills.md)（Agent Skills 规范）配合：技能是插件的组成部件，插件是技能的发行单元，两个仓库合并阅读即是完整的扩展体系
- 与 [scientific-agent-skills.md](scientific-agent-skills.md) 对照：看第三方技能库如何反哺官方生态

## 五、个人评价

### 优势

1. 权威性无可替代：官方目录 = 插件结构的最终解释权，照着写不会跑偏
2. 插件类型覆盖全面：从语言服务到输出风格到元插件，生态位一次看全
3. Apache-2.0 许可，内部 fork 与二次开发无障碍

### 不足

1. 强绑定 Claude Code 生态，其他 harness 的兼容性依赖各自适配层
2. 外部插件仅收录链接与清单，质量由原仓库负责，需自行甄别
3. 目录类仓库的固有局限：内容随官方策略快速增删，引用具体插件名需注意时效

### 评分理由

4 星：Claude Code 插件体系的一手规范样本；扣分在生态绑定（⭐34.7k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/anthropics/claude-plugins-official |
| **社区目录（镜像）** | https://github.com/anthropics/claude-plugins-community |

### 关联项目

- [skills.md](skills.md) — 技能规范源头（插件的上游概念）
- [scientific-agent-skills.md](scientific-agent-skills.md) — 大规模第三方技能库实例
- [superpowers.md](superpowers.md) — 技能集框架对照
