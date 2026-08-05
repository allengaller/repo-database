---
name: openclaw/openclaw
url: https://github.com/openclaw/openclaw
domain: ai-agents
type: application
languages: [TypeScript, Node.js]
stars: 380000
forks: 0
license: MIT
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [personal-assistant, multi-channel, local-first, gateway, plugins, memory, security-debate]
summary: 2026 GitHub 现象级开源 AI 助手 — 38 万 stars，从 "会聊天" 升级为 "全权做事"，跨 20+ 平台（WhatsApp/Telegram/Discord/飞书/微信）部署，曾用名 ClawdBot/Moltbot
---

# OpenClaw · 2026 现象级开源个人 AI 助手

> 收录日期：2026-08-04
> 仓库：https://github.com/openclaw/openclaw
> 官网：https://openclaw.ai
> 来源：2026 全年 GitHub 现象级项目，CSDN/知乎/公众号/抖音全网刷屏

**一句话核心总结**：OpenClaw 是 2026 年初 GitHub 增长最快的开源项目之一（曾用名 ClawdBot → Moltbot → OpenClaw）——把"本地优先 + 多渠道 + 执行能力 + Skills 插件"打包成完整的个人 AI 助手平台，让 AI 从"会聊天"升级为"全权做事"。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | OpenClaw |
| **仓库地址** | https://github.com/openclaw/openclaw |
| **官网** | https://openclaw.ai |
| **所属组织/作者** | Peter Steinberger（PSPDFKit 创始人）发起，社区驱动 |
| **曾用名** | ClawdBot → Moltbot → OpenClaw |
| **描述** | Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞 |
| **开源许可** | MIT |
| **Star 数** | ~38 万（截至 2026-08-04） |
| **技术类型** | application / platform |

---

## 二、核心价值主张

| 价值 | 说明 |
|------|------|
| **数据主权** | 本地优先，所有数据保存在用户设备 |
| **执行能力** | 不是建议而是直接执行（文件、终端、浏览器、App） |
| **可扩展性** | 插件化架构，多渠道、多 Skills、多工具 |
| **多渠道** | 跨 WhatsApp/Telegram/Discord/Slack/微信/飞书 等 20+ 平台 |

---

## 三、架构：微核 + 插件 + 网关

### 3.1 三大组件

| 组件 | 作用 |
|------|------|
| **微核 (Agent Runtime)** | 任务解析、规划、状态维护、LLM 思考、插件协调 |
| **插件 (Plugins/Skills/Channels)** | 渠道（微信/Telegram 等）+ 技能（文件/日历等） |
| **网关 (Gateway)** | 会话管理、消息路由、工具执行协调、安全权限控制、客户端连接 |

### 3.2 通信机制

- 强依赖 Node.js ≥ 22
- 全栈 TypeScript（静态类型保证代码质量）
- WebSocket 实现实时双向通信
- 核心 Web 框架：Express + Hono

### 3.3 记忆系统（分层架构）

- **短期记忆**：会话缓存（内存）
- **中期记忆**：每日摘要 + JSONL 会话日志
- **长期记忆**：MEMORY.md / USER.md 等 Markdown 文件 + SQLite 向量索引

**纯文件系统 + SQLite 索引的混合架构**——兼顾可解释性、可移植性与检索效率。

---

## 四、关键能力

### 4.1 办公自动化

- 邮件自动分类、汇总、起草
- 文档批量处理（Word → PDF、提取数据生成图表）
- 会议记录自动整理 + 提取 Action Items
- 文件自动归档（监控下载文件夹自动分类）

### 4.2 信息查询与监控

- 定时抓取网站（新闻/股价/天气）
- 自然语言安排日程、设置提醒
- 多渠道消息统一收件箱

### 4.3 开发者辅助

- 代码生成与调试
- 服务器监控与运维
- 集成 CI/CD 流程

### 4.4 智能家居控制

- 通过 Home Assistant / API 控制 Philips Hue 等
- 场景编排（"准备睡觉"自动关灯拉窗帘）

---

## 五、争议与挑战

### 5.1 安全风险

- **RCE 隐患**：默认拥有执行任意 Shell 命令和读写文件系统的权限；LLM 被恶意诱导（提示注入）可能造成灾难
- **密钥明文存储**：API 密钥在本地明文存储风险
- **权限粗放**：缺乏 RBAC 精细化控制

### 5.2 运营成本

- LLM API 调用频繁，账单可能远超预期
- 7x24 运行的硬件 + 电力 + 网络 + 维护成本

### 5.3 商业可持续性

- 创始人背景强（PSPDFKit），但缺乏明确商业模式
- 维护压力巨大
- 与商业平台（腾讯云智能体等）竞争

---

## 六、应用场景

- **个人用户**：智能办公助理、信息监控、开发者工具、智能家居
- **小团队**：任务跟踪、协作文档汇总、客服初步处理
- **企业**：需谨慎评估安全和合规

---

## 七、个人评价

### 优势

1. **2026 现象级** —— 半年内从 0 增长到 38 万 stars，GitHub 历史最快之一
2. **理念先进** —— 精准把握"数据主权 + 执行能力 + 可扩展性"三大痛点
3. **技术创新** —— 多层记忆系统 + 灵活插件化架构
4. **社区强大** —— 生态扩展 + 大量云厂商一键部署

### 不足

1. **安全隐患突出** —— 默认高权限 + 粗放安全模型是最大短板
2. **成本问题现实** —— LLM API 费用可能让"便宜的玩具"变"昂贵的玩具"
3. **企业级功能缺失** —— 多租户/权限/合规审计与商业产品差距明显
4. **创始人光环消退后** —— 长期维护可持续性需观察

### 评分理由

**4 星（active）** —— 现象级影响力毋庸置疑；架构设计与技术选型优秀；社区生态活跃。但**安全、成本、可持续性**三方面的不确定性需要持续观察，故不给予 5 星。

---

## 八、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/openclaw/openclaw |
| **官网** | https://openclaw.ai |
| **官方文档** | https://docs.openclaw.ai |

### 关联项目

- [hermes-agent.md](hermes-agent.md) — 同为长期个人 Agent 方向
- [penguin-harness.md](penguin-harness.md) — 自进化 Harness
- [deer-flow.md](deer-flow.md) — 长周期 SuperAgent
- [nanobot.md](nanobot.md) — 轻量自托管 Agent
