---
name: bytedance/deer-flow
url: https://github.com/bytedance/deer-flow
domain: ai-agents
type: framework
languages: [Python]
stars: 70000
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [super-agent, long-horizon, sandbox, memory, sub-agent, workflow, bytedance]
summary: 字节跳动开源的长周期 SuperAgent 控制框架 — 沙箱 + 记忆 + 工具调用 + 子 Agent + 工作流编排，工业级 AI 代理系统的开源标杆
---

# Deer-Flow · 字节跳动开源的长周期 SuperAgent 框架

> 收录日期：2026-08-04
> 仓库：https://github.com/bytedance/deer-flow
> 来源：2026-05 GitHub 月榜 33k+ stars 增长

**一句话核心总结**：Deer-Flow 是字节跳动开源的"工业级 SuperAgent 控制框架"——把沙箱环境、记忆系统、工具调用、技能管理、子 Agent 协作、消息网关整合到同一框架中，让 AI Agent 能处理从几分钟到几小时的复杂长周期任务。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Deer-Flow |
| **仓库地址** | https://github.com/bytedance/deer-flow |
| **所属组织/作者** | 字节跳动（ByteDance） |
| **描述** | Long-horizon SuperAgent 框架：执行时间可从几分钟延长到数小时 |
| **开源许可** | MIT |
| **Star 数** | ~7 万（截至 2026-05） |
| **新增 Star** | 月度 +33,722 |
| **技术类型** | framework |

---

## 二、核心组件

| 组件 | 作用 |
|------|------|
| **沙箱环境** | Agent 安全运行代码和实验的隔离空间 |
| **记忆系统** | 跨会话 + 跨任务的状态与上下文管理 |
| **工具调用** | 标准化 function call 协议与多工具协同 |
| **技能管理** | 沉淀可复用 Skills，统一调度 |
| **子 Agent 协作** | 父子 Agent 任务拆分、汇报、状态同步 |
| **消息网关** | 对接多消息渠道（CLI/Web/IM） |

---

## 三、关键能力

### 3.1 长周期任务执行

Deer-Flow 的核心差异化点是**执行时间可从几分钟延长到数小时**——这正是当前大多数 AI 系统难以突破的瓶颈。一般 Agent 框架要么任务太短（单次对话），要么可靠性不够（长链路容易中断）。

### 3.2 完整工业级组件链

不像一些只提供 ReAct 循环的教学型框架，Deer-Flow 给出了**生产环境所需的全部组件**：
- 沙箱（避免代码执行风险）
- 记忆（上下文不丢）
- 工具调用（标准化协议）
- 技能（可复用沉淀）
- 子 Agent（任务分层）
- 网关（渠道对接）

### 3.3 字节内部验证

作为字节跳动出品，Deer-Flow 经历了**字节内部大量生产场景的验证**，架构设计充分考虑了安全性、可靠性和可扩展性。

---

## 四、应用场景

- **深度研究 Agent** —— 多步搜索、整理、生成报告（数小时任务）
- **自动化内容生产** —— 选题 → 调研 → 写作 → 编辑 → 发布全流程
- **代码生成与工程化** —— 复杂代码库的多文件协同修改
- **数据分析流水线** —— 跨多数据源的分析 + 报告生成

---

## 五、与同类项目对比

| 框架 | 任务时长 | 沙箱 | 工业级验证 | 多渠道网关 |
|------|----------|------|------------|------------|
| **Deer-Flow** | 分钟到小时 | ✅ | ✅ 字节 | ✅ |
| LangGraph | 分钟 | ❌ | ✅ | ❌ |
| AutoGen | 分钟 | ❌ | ⚠️ | ❌ |
| CrewAI | 分钟 | ❌ | ⚠️ | ❌ |
| OpenClaw | 长期 | ⚠️ | ⚠️ | ✅ 20+ 渠道 |

**Deer-Flow 的位置**：工业级 SuperAgent + 长周期任务 + 多组件完整。

---

## 六、个人评价

### 优势

1. **长周期任务支持** —— 分钟到小时，是当前 Agent 框架的稀缺能力
2. **完整工业级组件** —— 沙箱/记忆/工具/技能/子 Agent/网关六件套齐
3. **字节跳动背书** —— 经过内部生产验证
4. **MIT 协议 + 7 万 stars** —— 商业友好，社区活跃

### 不足

1. **学习曲线较陡** —— 完整组件链对新手不友好
2. **生态相对封闭** —— 主要围绕字节的技术栈（虽然开源）
3. **中文文档较少** —— 国际化文档覆盖待提升
4. **需要较强的基础设施能力** —— 沙箱部署对运维有要求

### 评分理由

**4 星（active）** —— 长周期 SuperAgent 方向标杆；完整工业级组件链；字节背书；唯独"长周期任务的稳定性、文档完整性、生态开放度"需持续观察。

---

## 七、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/bytedance/deer-flow |

### 关联项目

- [penguin-harness.md](penguin-harness.md) — 自进化 Harness
- [hermes-agent.md](hermes-agent.md) — 长期个人 Agent
- [nanobot.md](nanobot.md) — 轻量自托管 Agent
- [pydantic-ai.md](pydantic-ai.md) — 类型安全 Agent
