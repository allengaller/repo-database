---
name: MoonshotAI/kimi-cli
url: https://github.com/MoonshotAI/kimi-cli
domain: ai-engineering
type: tool
languages: [Python, TypeScript]
stars: 6000
forks: 600
license: Apache-2.0
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [kimi, moonshot, code-cli, ai-coding-assistant, acp, mcp, shell-integration, chinese-llm, kimi-k2]
summary: MoonshotAI 官方出品的 Kimi Code CLI — Python 3.13 + uv + ACP（Agent Client Protocol） + MCP + Zsh 插件，"你的 next CLI agent"，~6k stars，Kimi K2.6 模型加持下"5 天长链路"自主执行
---

# Kimi CLI · MoonshotAI 官方的下一代编码 CLI Agent

> 收录日期：2026-08-04
> 仓库：https://github.com/MoonshotAI/kimi-cli
> 来源：2026-01-30 GitHub Trending 日榜 Top 3（与 moltbot / memU 同日上榜）

**一句话核心总结**：Kimi CLI 是 MoonshotAI 开源的下一代编码 Agent CLI——基于 Python 3.13 + uv + ACP（Agent Client Protocol） + MCP + Zsh 深度集成，是 Kimi K2.6 "5 天长链路自主执行"能力的官方入口。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Kimi Code CLI（kimi） |
| **仓库地址** | https://github.com/MoonshotAI/kimi-cli |
| **所属组织/作者** | MoonshotAI（月之暗面） |
| **描述** | Kimi Code CLI is your next CLI agent. |
| **开源许可** | Apache-2.0 |
| **Star 数** | ~6,000（截至 2026-08） |
| **Fork 数** | ~600 |
| **技术类型** | tool（CLI agent） |
| **运行依赖** | Python 3.13+、uv 包管理器 |

---

## 二、技术栈 / 架构

### 2.1 Monorepo 多个包

```
kimi-cli/                     # CLI 主程序
packages/
  kosong/                     # 基础库（核心）
  kaos/                       # pykaos 工具集
  kimi-sdk/                   # SDK
sdks/
  kimi-sdk/                   # SDK 包
web/                          # Web UI（Vite）
vis/                          # 可视化
src/kimi_cli/                 # CLI 源码
tests/ tests_ai/ tests_e2e/  # 测试
```

### 2.2 协议栈

| 协议 | 用途 | 集成对象 |
|------|------|---------|
| **ACP**（Agent Client Protocol） | IDE 集成 | Zed、JetBrains AI Chat、Claude Code |
| **MCP**（Model Context Protocol） | 工具/上下文服务 | 任意 MCP server |
| **Zsh 插件** | Shell 深度集成 | Oh-My-Zsh 用户 |

### 2.3 核心库

- **kosong**（空）— 核心抽象层
- **pykaos / kosong** — 工具调度
- **kimi-sdk** — Python SDK

### 2.4 构建与运行

- uv tool install 一键安装
- PyInstaller 支持 one-file 和 one-dir 两种 standalone 可执行
- ruff + pyright + ty 多层 lint/type 检查
- test_ai/ 使用 Kimi Code CLI 自身生成 changelog/docs（self-bootstrapping）

---

## 三、核心功能特性

### 3.1 智能命令行助手

- **自然语言命令**：描述意图即可执行
- **命令补全 + 解释 + 错误诊断**
- **Shell 模式 / AI 模式无缝切换**（`/shell` ↔ `/ai`）
- **历史学习 + 个性化推荐**

### 3.2 ACP（Agent Client Protocol）支持

- **Zed 编辑器**：`kimi acp` 直接接入
- **JetBrains 全家桶**（IntelliJ/PyCharm/WebStorm）：通过 AI Chat 插件 + Registry 启用
- **标准化协议**：未来可被任何支持 ACP 的 IDE 接入

### 3.3 MCP 工具生态

- 配置文件驱动，集成任何 MCP server
- 典型用法：
  ```json
  {
    "mcpServers": {
      "context7": {"url": "https://mcp.context7.com/mcp"},
      "chrome-devtools": {"command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"]}
    }
  }
  ```

### 3.4 Zsh 插件深度集成

```bash
git clone https://github.com/MoonshotAI/zsh-kimi-cli.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/kimi-cli

# .zshrc
plugins=(... kimi-cli)
```

- 命令补全增强
- 智能建议 + 主题兼容
- 跨平台支持（macOS / Linux 主推，Windows 在开发中）

### 3.5 Kimi K2.6 模型加持

K2.6 专为长链路（5 天级）任务设计：
- **10 小时构建完整 SysY 编译器**（≈ 4 工程师 × 2 个月）
- **Agent Swarms**：协调 300 个子代理、4000 协调步骤
- **5 天持续运行**：监控 + 事件响应 + 系统运维闭环

---

## 四、应用场景与已落地案例

### 4.1 个人开发者

- 终端内 AI 结对编程（Zed/JetBrains 集成）
- 复杂重构 / Bug 调试 / 文档查询
- Git 辅助（commit message / 冲突解决）

### 4.2 企业研发

- 内网部署 + 国产模型（数据不出域）
- 私有化（vLLM + Kimi K2.6 权重）
- 与现有 CI/CD 流程集成

### 4.3 系统管理

- 日常运维脚本生成
- 复杂多步骤任务自动化
- 监控/告警处理

### 4.4 与 catalog 其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [PenguinHarness](../ai-agents/penguin-harness.md) | 都是"AI 编码助手 + harness"路线的代表 |
| [OpenClaw](../ai-agents/openclaw.md) | OpenClaw 强调本地/自托管，Kimi CLI 强调云端 K2.6 |
| [Claude-Mem](../ai-engineering/claude-mem.md) | claude-mem 适配器列表中提到 Kimi (通过 WorkBuddy) |
| [Uns.loth](../ai-engineering/unsloth.md) | 都属于中文 AI 圈，Uns.loth 加速训练，Kimi CLI 加速编码 |
| [Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | Kimi CLI 是 Skills 协议的早期采用者之一 |

---

## 五、个人评价

### 优势

1. **官方背书 + 国产之光**：MoonshotAI 投入 K2.6 长链路优化，CLI 是官方能力出口
2. **ACP 协议前瞻性**：Zed/JetBrains/Claude Code 都在采用 ACP，是 IDE-agent 集成的标准方向
3. **极简安装**：uv tool install 一行命令，环境友好
4. **monorepo 工程规范**：ruff + pyright + ty + pytest 多层 quality gate
5. **Kimi K2.6 模型差异化**：5 天长链路执行能力在业界罕见

### 不足

1. **stars 体量小**（~6k）：相比 Claude Code（10万+）社区规模仍有差距
2. **K2.6 商业版需要付费订阅**（$31/月 Allegretto / $159/月 Vivace）
3. **Windows 支持尚未发布**（"即将支持（开发中）"）
4. **2026-08 仍处"技术预览版"**：作者自述"可能存在 Bug"
5. **v2.6 长链路演示的工程难度被业内质疑**（SysY 而非完整 C 编译器，对比 Anthropic 的 Opus 4.6 项目）

### 评分理由：⭐⭐⭐⭐ (4/5)

- 6k stars + 官方出品 + 协议前瞻性 → 必收录
- 不给 5 星：商业化压力（订阅制）+ 预览版稳定性 + 社区规模

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/MoonshotAI/kimi-cli |
| **IDE 集成文档** | https://github.com/MoonshotAI/kimi-cli/blob/main/docs/en/guides/ides.md |
| **Zsh 插件** | https://github.com/MoonshotAI/zsh-kimi-cli |
| **Kimi 官网** | https://kimi.com |
| **Kimi K2.6 长链路案例** | https://kimi.moonshot.cn |

### 关联项目

- [PenguinHarness](../ai-agents/penguin-harness.md) — AI 编程助手 harness
- [OpenClaw](../ai-agents/openclaw.md) — 个人 AI 助理
- [Claude-Mem](../ai-engineering/claude-mem.md) — Claude Code 长期记忆（通过 WorkBuddy 间接支持 Kimi）
- [Uns.loth](../ai-engineering/unsloth.md) — LLM 微调加速器
- [Agent-Lightning](../ai-engineering/agent-lightning.md) — Agent 训练框架
