---
name: openai/swarm
url: https://github.com/openai/swarm
domain: ai-agents
type: framework
languages: [Python]
stars: 21866
forks: 2331
license: MIT
discovered: 2026-07-29
updated: 2026-07-29
rating: 3
status: archived
tags: [multi-agent, openai, educational]
summary: OpenAI 官方多智能体编排教学框架，handoff 模式的概念源头（已归档，被 openai-agents 取代）
---

# swarm · OpenAI 官方多智能体编排教学框架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | swarm |
| **仓库地址** | https://github.com/openai/swarm |
| **所属组织/作者** | OpenAI |
| **描述** | OpenAI 官方多智能体编排教学框架，handoff 模式的概念源头（已归档，被 openai-agents 取代） |
| **开源许可** | MIT |
| **Star 数** | 21,866（截至 2026-07） |
| **Fork 数** | 2,331 |
| **技术类型** | framework |

## 二、技术栈分析

- 纯 Python，核心实现不足千行，直接封装 Chat Completions API
- 只有 Agent 与 handoff 两个原语，无状态设计（不落地任何持久化）

## 三、核心功能特性

1. **Handoff 模式**：Agent 通过返回另一个 Agent 实现控制权移交，成为后续多智能体框架的通用词汇
2. **Routines**：以自然语言步骤+工具集定义可靠流程
3. **教学定位**：代码即文档，适合理解多智能体的最小可行抽象

## 四、应用场景说明

- 学习多智能体编排概念的第一站，读完源码即可理解 handoff 的本质
- 原型验证；生产用途官方明确建议迁移到 openai-agents-python

## 五、个人评价

### 优势

1. 概念启蒙价值极高，handoff 抽象被 pydantic-ai、agency-swarm 等广泛借鉴
2. 极简代码量，阅读成本一小时以内

### 不足

1. 官方已停止维护并归档，功能冻结
2. 无状态设计使其无法直接承载生产工作流

### 评分理由

3 星：历史与教学价值突出，但已被官方后继者取代，收录以保留多智能体编排的概念源头（⭐21.9k，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/openai/swarm |
| **后继项目 openai-agents-python** | https://github.com/openai/openai-agents-python |

### 关联项目

- [pydantic-ai.md](pydantic-ai.md)
