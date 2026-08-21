---
name: donnemartin/system-design-primer
url: https://github.com/donnemartin/system-design-primer
domain: fullstack-arch
type: course
languages: [Python]
stars: 365155
forks: 57982
license: NOASSERTION
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [system-design, scalability, interview, architecture]
summary: 系统设计学习的第一入口，把可扩展架构的核心概念与经典案例整理成体系化教材
---

# System Design Primer · 系统设计知识主干

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | The System Design Primer |
| **仓库地址** | https://github.com/donnemartin/system-design-primer |
| **所属组织/作者** | Donne Martin |
| **描述** | 系统设计学习的第一入口，把可扩展架构的核心概念与经典案例整理成体系化教材 |
| **开源许可** | NOASSERTION（正文 CC BY 4.0，代码 MIT，引用需按各自条款署名） |
| **Star 数** | 365,155（截至 2026-08） |
| **Fork 数** | 57,982 |
| **技术类型** | course |

## 二、技术栈分析

- 主体是 Markdown 教材 + Anki 记忆卡组，`solutions/` 下附 Python 实现的设计题解
- 知识组织为三层：索引（学习路径）→ 主题（每个组件一节）→ 案例（Pastebin、Twitter timeline、网络爬虫等）
- 覆盖组件：DNS、CDN、负载均衡、反向代理、应用层拆分、SQL/NoSQL 选型、缓存、异步、通信协议
- 每个主题固定给出"优点 / 缺点 / 何时使用"，可直接搬进架构评审文档
- 多语言翻译（含简体中文）由社区维护

## 三、核心功能特性

1. **组件级权衡清单**：每种技术选择都写明代价，避免只讲优点的技术选型讨论
2. **经典案例全流程**：从需求澄清、容量估算到接口与数据模型，示范完整的设计推演套路
3. **容量估算速查**：延迟数量级、幂等换算等经验数字，架构讨论时的通用标尺
4. **Anki 卡组**：把架构常识做成可复习的记忆材料，适合长期内化
5. **中文翻译完备**：团队内共享学习成本低

## 四、应用场景说明

- SA 的知识地基：客户方案沟通前用它复核"我是否漏掉了某一层"
- 架构评审的公共语言：团队用同一套术语与权衡框架讨论，减少无效争论
- 面试准备与新人培养：作为系统设计的标准教材
- 与 [awesome-scalability.md](awesome-scalability.md) 组合使用：前者给框架，后者给真实公司的落地案例

## 五、个人评价

### 优势

1. 覆盖面与组织度在同类资料中最好，是"读一遍就能建立完整索引"的少数资源
2. 权衡导向的写法直接可用于方案文档，不是纯理论罗列
3. 社区体量巨大，翻译与勘误质量高

### 不足

1. 内容重心在 2010s 的分布式 Web 架构，对云原生、Serverless、AI 基础设施覆盖不足
2. 最近一次代码提交在 2026-03（截至 2026-08），更新节奏明显放缓
3. 案例偏面试导向，工程细节（容量压测、灰度、成本）不深入

### 评分理由

5 星：系统设计方向的唯一"必读"级仓库，全栈 SA 的知识主干（⭐365k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/donnemartin/system-design-primer |
| **简体中文版** | https://github.com/donnemartin/system-design-primer/blob/master/README-zh-Hans.md |

### 关联项目

- [system-design-101.md](system-design-101.md)
- [awesome-scalability.md](awesome-scalability.md)
- [architecture-decision-record.md](architecture-decision-record.md)
