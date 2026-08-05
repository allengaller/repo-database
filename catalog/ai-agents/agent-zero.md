---
name: agent0ai/agent-zero
url: https://github.com/agent0ai/agent-zero
domain: ai-agents
type: framework
languages: [Python]
stars: 16000
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [dockerized-desktop, browser-dom, multi-agent, plugin-hub, open-source-linux-desktop, full-compute-environment]
summary: 给 Agent 装一个真正的 Linux 桌面 — Docker 化的 XFCE 桌面 + 浏览器 DOM 注释 + 100+ 社区插件，Agent 不只是聊天，而是能在真桌面上操作 Blender/浏览器/办公软件
---

# Agent Zero · 给 Agent 装一个真正的 Linux 桌面

> 收录日期：2026-08-04
> 仓库：https://github.com/agent0ai/agent-zero
> 来源：2026-08-04 GitHub Trending 当日榜（40+ 新增 stars）

**一句话核心总结**：Agent Zero 是个"全能 Agent 框架"——给 Agent 装上 Docker 化的 Linux XFCE 桌面、原生浏览器（带 DOM Annotate 模式）、LibreOffice 集成、100+ 社区插件、Project 隔离、多 Agent 协作、Time Travel 回滚——Agent 不只是聊天，而是能在真桌面上操作 Blender/Chrome/办公软件。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Agent Zero |
| **仓库地址** | https://github.com/agent0ai/agent-zero |
| **所属组织/作者** | agent0ai（社区驱动） |
| **描述** | Give your agent a full Linux computer. Agent Zero is an open agent framework for work that needs more than chat. |
| **开源许可** | MIT |
| **Star 数** | ~16,000 |
| **新增 commits** | 2,500+ commits（活跃维护） |
| **技术类型** | framework |

---

## 二、核心特性

### 2.1 Dockerized Linux 桌面

Agent Zero 在 Canvas 右侧打开自己的 Linux 桌面（XFCE），**不是远程 VM，不是共享剪贴板**——是真正运行在容器中的桌面会话。Agent 可驱动真实桌面软件：
- 打开 Blender 建模
- 跳转终端窗口
- 视觉管理文件
- 运行无 API 的 GUI 工具

用户可随时介入，因为鼠标键盘共享同一桌面。

### 2.2 原生浏览器 + DOM Annotate

内置浏览器（Docker 浏览器 + 任意主机浏览器），支持 **Annotate 模式**——把任何网页变成可交互指令面：
- **Change** — 改元素（"让按钮变蓝圆角"作为 JS 指令应用）
- **Inspect** — 提取 DOM/样式/父链/框架提示
- **Lift** — 卡片/英雄区/组件"提走"到自己项目栈
- **Comment** — 评审时留 actionable notes

### 2.3 文档 Cowork + LibreOffice

Canvas 内含 Markdown 编辑器（非预览窗，是真编辑器），可与 Agent 共同编辑 TODO/计划/会议笔记。LibreOffice Writer/Calc/Impress 集成——ODT/ODS/ODP 一等公民。

### 2.4 插件中心（100+ 社区插件）

包括开发框架（BMAD Method 等 20 个专家 Agent）、记忆系统、工具集成、UI 扩展、工作流插件等。

### 2.5 A0 CLI Connector

不是独立 CLI Agent，而是连接到运行中的 Agent Zero 实例的桥梁——同一个 Agent（含记忆/项目/Skills）也可在主机真实文件上工作。

---

## 三、安全模型（必读）

Agent Zero 强大是因为它能使用真实环境。**保持 Docker 隔离**，不要挂载整个 home 目录除非你了解风险。Grant A0 CLI 读写 + 远程代码执行仅信任的机器/工作区。生产环境必备：
- Docker 隔离
- 独立凭证（不在 prompt 或公开文件中）
- 重要工作区备份

---

## 四、应用场景

- **软件工程**：检查代码库、做范围编辑、跑测试、解释权衡、保留可恢复历史
- **设计灵感**：浏览网页、注释喜欢的元素、组件化到自己的栈
- **金融分析与图表**：收集数据、关联事件、生成电子表格、可编辑图表
- **办公交付物**：Cowork 文档/电子表格/演示文稿
- **Web/移动 QA**：浏览应用、注释 UI 问题、把视觉评论变成 actionable 修复
- **API 集成**：粘贴 API 片段，Agent 构建可工作示例

---

## 五、个人评价

### 优势

1. **真桌面 + 真浏览器** —— 把 Agent 从"聊天"推到"全栈操作"
2. **Annotate 模式** —— 把"看到 UI → 改 UI"流程化，UI 评审与修改的杀手锏
3. **插件生态丰富** —— 100+ 社区插件，覆盖开发/记忆/UI/工作流
4. **Time Travel 快照** —— Agent 操作的回滚与审计能力
5. **透明可扩展** —— 几乎无隐藏，prompts/tools/plugins/settings 都可检视编辑

### 不足

1. **Docker 学习曲线** —— 用户需了解容器化部署
2. **默认高权限风险** —— 与 OpenClaw 类似，强大等于需要严格管理
3. **资源占用** —— 桌面+浏览器+Agent 同时跑，对硬件有要求
4. **生态相对年轻** —— 与 OpenClaw 38 万 stars 相比，社区规模有限

### 评分理由

**4 星（active）** —— 形态独特（真桌面+真浏览器+DOM 注释），解决了 Agent 落地的"GUI 操作"空白；插件生态+Time Travel 体现工程深度；唯独社区规模与生态成熟度需观察。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/agent0ai/agent-zero |
| **A0 CLI** | `curl -LsSf https://cli.agent-zero.ai/install.sh \| sh` |

### 关联项目

- [openclaw.md](openclaw.md) — 同为个人 Agent 方向，但定位不同（OpenClaw 偏消息渠道，Agent Zero 偏桌面操作）
- [deer-flow.md](deer-flow.md) — 长周期 SuperAgent
- [penguin-harness.md](penguin-harness.md) — 自进化 Harness
