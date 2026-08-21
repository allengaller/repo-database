---
name: RightNow-AI/openfang
url: https://github.com/RightNow-AI/openfang
domain: ai-agents
type: framework
languages: [Rust]
stars: 18100
forks: 0
license: Apache-2.0
discovered: 2026-08-13
updated: 2026-08-13
rating: 3
status: active
tags: [agent-os, autonomous, rust, knowledge-graph, scheduled-tasks, hands, channels, llm-providers]
lineage: openmultiagent
summary: Rust 写的开源 Agent Operating System — 7 个自主 "Hands" 7×24 跑知识图谱 / 监控 / 社交 / 线索管理；支持 40+ 渠道 + 27 家 LLM provider，~18.1k stars，"Agent OS" 概念的代表项目
---

# OpenFang · Rust 写的开源 Agent Operating System

> 收录日期：2026-08-13
> 仓库：https://github.com/RightNow-AI/openfang
> 来源：RightNow-AI 出品；2026 年 "Agent OS" 概念的代表项目

**一句话核心总结**：OpenFang 是 RightNow-AI 出品的 Rust 开源 Agent Operating System —— 7 个自主 "Hands" 7×24 跑知识图谱构建 / 目标监控 / 线索生成 / 社交管理 / 报告生成，支持 40+ 渠道接入 + 27 家 LLM provider 切换，~18.1k stars，"Agent OS" 概念的工程代表作。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | OpenFang |
| **仓库地址** | https://github.com/RightNow-AI/openfang |
| **所属组织** | RightNow-AI |
| **描述** | Open-source Agent Operating System — autonomous Hands running 24/7 |
| **开源许可** | Apache-2.0 |
| **Star 数** | ~18,100（截至 2026-08） |
| **技术类型** | framework（Agent OS） |
| **底层栈** | Rust |

---

## 二、技术栈与架构分析

### 2.1 "Agent OS" 定位

不同于"agent framework"或"agent library"，OpenFang 把自己定位成 OS：
- 长期常驻进程
- 多 agent 调度
- 资源隔离
- 渠道接入（40+）
- LLM provider 路由（27 家）

### 2.2 7 个 "Hands"

| Hand | 职责 |
|------|------|
| **Research Hand** | 持续研究主题、生成报告 |
| **Monitor Hand** | 监控目标变化（价格 / 新闻 / 竞品） |
| **Lead Hand** | 线索生成 / 跟进 / 转化 |
| **Social Hand** | 社交媒体管理 / 调度 |
| **Knowledge Hand** | 知识图谱构建 / 维护 |
| **Outreach Hand** | 外联 / 邮件 / 私信 |
| **Reporting Hand** | 报告汇总 / 仪表盘更新 |

### 2.3 Rust 实现

- 高性能 + 内存安全
- 单二进制部署
- 低资源占用
- 适合"7×24 常驻"

### 2.4 多渠道接入

40+ 渠道：Slack / Discord / Telegram / Email / SMS / WhatsApp / 飞书 / 钉钉 / 企业微信 / Webhook / ...

### 2.5 多 LLM Provider

27 家：OpenAI / Anthropic / Google / Mistral / DeepSeek / Qwen / GLM / Kimi / Cohere / Groq / Together / Fireworks / Ollama / ...

---

## 三、核心功能特性

### 3.1 知识图谱

每个 Hand 维护专属知识图谱：
- 实体抽取
- 关系建立
- 自动合并 / 去重

### 3.2 调度系统

- 定时任务（cron-like）
- 事件触发（webhook / 邮件到达）
- 条件触发（指标达到阈值）

### 3.3 仪表盘

Web 仪表盘：
- 所有 Hand 状态
- 任务执行历史
- 知识图谱可视化
- 报告汇总

### 3.4 安全模型

16 安全系统：
- 权限隔离（每个 Hand 独立权限域）
- 资源配额
- 审计日志
- 操作回滚

### 3.5 53 Tools

预置工具集：搜索 / 浏览器 / 文件 / 数据库 / 邮件 / 通讯 / ...

---

## 四、应用场景与本仓库关联

### 4.1 个人 / 小团队的"agent 员工"

- 雇不起员工但需要 7×24 的人
- 想要"自动化助理"代替人工

### 4.2 内容 / 销售 / 客服运营

- 自动化 lead 跟进
- 自动化社交运营
- 自动化客服响应

### 4.3 研究 / 监控

- 持续监控行业动态
- 持续生成研究报告

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [openclaw.md](openclaw.md) | 都是常驻 personal agent，openclaw 偏 chat、openfang 偏 OS |
| [openharness.md](openharness.md) | openharness 偏 harness，openfang 偏 OS |
| [hermes-agent.md](hermes-agent.md) | hermes 强调自学习，openfang 强调任务自动化 |
| [agenticseek.md](agenticseek.md) | 都是替代 Manus 的方案，openfang 偏云端调度、agenticseek 偏本地 |

---

## 五、个人评价

### 5.1 优势

1. **"Agent OS" 概念清晰** —— 不只是 framework，是 OS 级别的抽象
2. **Rust 实现** —— 高性能 + 内存安全 + 低资源
3. **7 Hands 覆盖** —— 研究 / 监控 / 销售 / 社交 / 知识图谱 / 外联 / 报告一站式
4. **多渠道 + 多 LLM** —— 灵活性极高，不绑死特定栈
5. **Apache-2.0 + 18.1k stars** —— 社区成熟度高

### 5.2 不足

1. **"OS" 概念偏营销** —— 实质上仍是 agent framework；OS 定位带来的复杂度和学习曲线
2. **配置复杂度高** —— 7 Hands × 40 渠道 × 27 LLM provider = 配置爆炸
3. **依赖云端 LLM** —— 与 agenticseek 的本地优先理念相反
4. **商业化倾向** —— RightNow-AI 有商业产品，开源版功能可能被分化
5. **中文生态接入深度不一** —— 渠道虽然多，但飞书 / 钉钉 / 微信适配深度待观察

### 5.3 评分理由

**3 星（active）** —— Agent OS 概念 + Rust 实现 + 多渠道多 LLM + 7 Hands 是其核心优势；对个人 / 小团队的"agent 员工"场景有价值。扣分项是配置复杂度高、概念偏营销、商业化倾向；但作为"Agent OS 概念的代表项目"，已达 3 星水平。给 3 星而非 4 星是因为商业化风险 + 配置门槛。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/RightNow-AI/openfang |
| **项目主页** | https://openfang.sh |
| **商业产品** | https://rightnow.ai |

### 关联项目

- [openclaw.md](openclaw.md) — 个人 AI 助理（chat-app-first）
- [openharness.md](openharness.md) — Python Agent Harness
- [hermes-agent.md](hermes-agent.md) — 自学习个人 agent
- [agenticseek.md](agenticseek.md) — 本地优先 DeepSeek-R1 agent
