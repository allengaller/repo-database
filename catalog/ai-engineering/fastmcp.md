---
name: PrefectHQ/fastmcp
url: https://github.com/PrefectHQ/fastmcp
domain: ai-engineering
type: framework
languages: [Python]
stars: 26968
forks: 2204
license: Apache-2.0
discovered: 2026-07-29
updated: 2026-07-30
rating: 5
status: active
tags: [mcp, python, framework]
summary: Pythonic 的 MCP 服务器/客户端开发框架，MCP 官方 Python SDK 的上游来源
---

# fastmcp · 快速构建 MCP 服务器与客户端的 Python 框架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | fastmcp |
| **仓库地址** | https://github.com/PrefectHQ/fastmcp |
| **所属组织/作者** | PrefectHQ（工作流编排公司 Prefect） |
| **描述** | Pythonic 的 MCP 服务器/客户端开发框架，MCP 官方 Python SDK 的上游来源 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 26,928（截至 2026-07） |
| **Fork 数** | 2,200 |
| **技术类型** | framework |

## 二、技术栈分析

- Python，装饰器驱动的 API 设计（@mcp.tool / @mcp.resource / @mcp.prompt）
- FastMCP 1.0 已被并入 MCP 官方 Python SDK；本仓库为持续演进的 2.x
- 支持 stdio / SSE / Streamable HTTP 多传输层，内置认证、代理、服务器组合

## 三、核心功能特性

1. **极简工具定义**：Python 函数 + 装饰器即成 MCP 工具，自动生成 schema
2. **服务器组合与代理**：可将多个 MCP 服务器聚合为一个入口
3. **客户端能力**：同一框架可写 MCP 客户端，便于端到端测试
4. **OpenAPI/FastAPI 转换**：一行代码把现有 REST API 暴露为 MCP 服务器

## 四、应用场景说明

- 为内部系统快速封装 MCP 工具层，是 Python 侧建 MCP 服务器的默认选择
- 与 [awesome-mcp-servers](awesome-mcp-servers.md) 配合：先查现成、没有再用 fastmcp 自建

## 五、个人评价

### 优势

1. 1.0 被官方 SDK 采纳，事实上的 Python MCP 标准写法
2. 文档质量高，从 hello world 到认证部署路径完整

### 不足

1. 2.x 功能面扩张较快，部分高级特性（如 auth）与官方 SDK 存在概念分叉

### 评分理由

5 星：MCP Python 开发的事实标准框架，工程成熟度与生态位俱佳（⭐26.9k，截至 2026-07）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/PrefectHQ/fastmcp |
| **官方文档** | https://gofastmcp.com |

### 关联项目

- [awesome-mcp-servers.md](awesome-mcp-servers.md)
- [../ai-agents/pydantic-ai.md](../ai-agents/pydantic-ai.md)
