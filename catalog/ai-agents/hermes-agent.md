---
name: NousResearch/hermes-agent
url: https://github.com/NousResearch/hermes-agent
domain: ai-agents
type: framework
languages: [Python]
stars: 216000
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 5
status: active
tags: [personal-agent, self-evolving, memory, skills, multi-channel, long-running]
summary: 2026 上半年最热开源 AI Agent — "越用越聪明"的自进化个人助手，跨 20+ 消息渠道（飞书/微信/Slack/Telegram/WhatsApp）24/7 长期部署，单日+19k stars 记录
---

# Hermes Agent · 越用越聪明的开源自进化个人 AI 助手

> 收录日期：2026-08-04
> 仓库：https://github.com/NousResearch/hermes-agent
> 来源：2026-07-17 CSDN/中文圈专题 + GitHub Trending 周榜反复霸屏

**一句话核心总结**：Hermes Agent 是 Nous Research 开源的"自进化"个人 AI Agent——把"记忆（Memory）+ 程序化技能（Skills）"做成双轨长期沉淀机制，跨 20+ 消息渠道（飞书/微信/Slack/Telegram/Discord/WhatsApp/Signal 等）24/7 长期部署，支持 VPS/Docker/SSH 全场景，与 OpenRouter/Nous Portal/OpenAI/Anthropic/Ollama 等多模型无缝切换。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Hermes Agent |
| **仓库地址** | https://github.com/NousResearch/hermes-agent |
| **所属组织/作者** | Nous Research（Hermes 系列 LLM 团队） |
| **描述** | "与你共同成长的 AI 智能体"——长期记忆 + 可复用 Skills + 多渠道部署 + 多模型支持 |
| **开源许可** | MIT |
| **Star 数** | ~21.6 万（截至 2026-07-17） |
| **技术类型** | framework |

---

## 二、核心机制：Memory × Skills 双轨

| 维度 | 作用 | 类比 |
|------|------|------|
| **Memory** | 保存用户、项目、历史会话的上下文信息 | 人类的情景记忆 + 语义记忆 |
| **Skills** | 记录"某类事情应该怎样完成"的程序化工作流 | 人类的程序性记忆（肌肉记忆） |

**关键洞察**：Hermes 所谓的"越用越聪明"，不是模型参数在本地自动训练，而是 **持续积累上下文、操作经验和工作流程**。换句话说：第一次让它处理一项工作需要详细说明规则；当相关流程被保存为 Skill 后，再遇到类似任务，它直接调用之前沉淀的方法，而不是每次从零理解。

---

## 三、关键能力

### 3.1 多渠道消息接入

支持 CLI、Telegram、Discord、Slack、WhatsApp、Signal、飞书、企业微信、邮件等 **20+ 消息渠道**。用户可放在服务器上运行，通过手机向它发任务，无需一直开本地电脑。

### 3.2 多模型支持

可连接 Nous Portal、OpenRouter、OpenAI、Anthropic、Ollama、自建 OpenAI 兼容接口及其他服务。**切换模型时不需要重建记忆和 Skills**——记忆和 Skills 与模型解耦。

### 3.3 低门槛部署

- 官方支持 Linux/macOS/WSL2 (`curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`)
- 支持 Windows PowerShell (`iex (irm https://hermes-agent.nousresearch.com/install.ps1)`)
- 可运行在普通 VPS、Docker、SSH 环境或服务器无状态平台，**不要求本地高端显卡**
- 内置 Cron 调度，可执行定时日报、备份、信息整理等周期任务

### 3.4 Skills 自管理（需谨慎）

Hermes 的 Skills 可以被 Agent **自行创建、修改甚至删除**。这种开放性是它持续学习的基础，但也意味着部署时必须：
- 认真配置命令权限
- 严格管理密钥
- 隔离运行环境

**不能把"会自我完善"理解成完全不需要人为管理**。

---

## 四、与 PenguinHarness 的对比

| 维度 | Hermes Agent | PenguinHarness |
|------|--------------|-----------------|
| 核心定位 | 长期个人助手，24/7 多渠道 | 自进化 Harness，自主构建 + 调优 Agent |
| Memory × Skills | 长期沉淀 | 类似机制 |
| 自进化路径 | Skills 由 Agent 自行维护（开放） | 评估驱动 + 4 条契约（受限） |
| 部署门槛 | 低（普通 VPS） | 低（Apache 2.0，跨平台一键安装） |
| 评估基准 | 无 | 自研 GDPevo（医疗/金融/法律） |

**互补关系**：Hermes 偏"生产端个人/团队助手"，PenguinHarness 偏"工程化自进化 Harness"。

---

## 五、应用场景

- **长期使用 AI 处理固定工作流的人** —— 沉淀的 Skills 越用越顺手
- **希望自部署个人助手的人** —— 数据完全自主
- **需要把 AI 接入多个消息渠道的团队** —— 飞书/企业微信 + 多平台协作

---

## 六、个人评价

### 优势

1. **自进化范式最完整落地** —— Memory × Skills 双轨机制有理论依据（人类记忆分类）也有工程实现
2. **20+ 渠道 + 多模型解耦** —— 真生产级部署友好，避免被单一平台锁定
3. **部署门槛低** —— 普通 VPS 就能跑，不强制要求 GPU
4. **与 OpenClaw/PenguinHarness 形成互补** —— 偏助手 vs 偏 Harness

### 不足

1. **Skills 自管理是双刃剑** —— 开放性带来灵活性也带来安全风险
2. **自进化 ≠ 智能飞跃** —— 本质是"经验沉淀"，不是模型参数调整
3. **Skills 质量依赖初始设计** —— 用户引导不到位会沉淀出低质量流程
4. **项目仍在快速迭代** —— API 稳定性与版本兼容需关注

### 评分理由

**5 星（active）** —— 2026 上半年最热开源 AI Agent（GitHub 周榜反复霸屏）；Memory × Skills 双轨范式是行业重要基础设施；跨 20+ 渠道 + 多模型解耦的生产级设计；与同时间段的 OpenClaw、PenguinHarness 形成完整生态位。

---

## 七、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/NousResearch/hermes-agent |
| **官方安装脚本** | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` |

### 关联项目

- [penguin-harness.md](penguin-harness.md) — 同为自进化 Agent Harness 方向，互为补充
- [nanobot.md](nanobot.md) — 同为轻量个人 Agent 框架
- [openclaw.md](openclaw.md) — 同为长期个人助手方向
- [pydantic-ai.md](pydantic-ai.md) — 类型安全 Agent 框架
