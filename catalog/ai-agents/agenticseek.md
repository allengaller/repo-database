---
name: Fosowl/agenticSeek
url: https://github.com/Fosowl/agenticSeek
domain: ai-agents
type: framework
languages: [Python]
stars: 26800
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [deepseek-r1, local-agent, privacy-first, web-browsing, voice-frontend, file-management, autonomous]
lineage: openclaw
summary: 本地优先 DeepSeek-R1 个人 AI agent — 替代 Manus / OpenAI Operator，浏览器自主浏览 + 文件管理 + 语音前端，全本地推理保护隐私，~26.8k stars
---

# AgenticSeek · 本地优先的 DeepSeek-R1 个人 AI Agent

> 收录日期：2026-08-13
> 仓库：https://github.com/Fosowl/agenticSeek
> 来源：Fosowl 出品；2026 年初 "Manus 替代品"话题核心项目

**一句话核心总结**：AgenticSeek 是 Fosowl 出品的本地优先 DeepSeek-R1 个人 AI agent —— 替代 Manus / OpenAI Operator，主打"全本地推理 + 浏览器自主浏览 + 文件管理 + 语音前端"，数据不出本地，~26.8k stars，"个人 AI agent 隐私版"的代表作。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | AgenticSeek |
| **仓库地址** | https://github.com/Fosowl/agenticSeek |
| **所属作者** | Fosowl |
| **描述** | A local Manus AI alternative — fully autonomous, no monthly fees, privacy-first |
| **开源许可** | MIT |
| **Star 数** | ~26,800（截至 2026-08） |
| **技术类型** | framework（personal agent runtime） |
| **底层栈** | Python + DeepSeek-R1 + 本地推理栈 |

---

## 二、技术栈与架构分析

### 2.1 全本地架构

不依赖云端 LLM：
- 模型：DeepSeek-R1（本地推理）
- 推理框架：vLLM / llama.cpp / Ollama 适配
- 浏览器控制：Selenium / Playwright
- 文件系统：本地 OS 操作

### 2.2 浏览器自主浏览

```
用户指令 → Agent 解析 → 启动 Playwright → 浏览网页 → 提取信息 → 汇报结果
```

- 自主填表
- 自主点击
- 自主滚动 / 翻页
- 自主处理登录（基于 cookie / 凭证存储）

### 2.3 文件管理能力

- 读 / 写 / 改文件
- 整理目录
- 批量重命名
- 跨文件搜索

### 2.4 语音前端

可选语音输入输出：
- Whisper 转录
- TTS 播放
- 适合"无屏 / 移动"场景

### 2.5 隐私边界

- 所有数据留在本地
- 唯一外部请求：可选的 web 搜索 API（可禁用）
- 不上传用户文件 / 历史

---

## 三、核心功能特性

### 3.1 一键启动

```bash
pip install agenticseek
agenticseek start --model deepseek-r1
```

### 3.2 "Manus 替代"定位

- Manus AI 是云端托管的 personal agent
- AgenticSeek = 本地版
- 卖点：零月费 + 隐私 + 可定制

### 3.3 多任务并发

- 同时跑多个子任务
- 任务结果自动汇总
- 失败重试机制

### 3.4 Skills 插件

支持自定义 skills：
- `~/.agenticseek/skills/<name>.py`
- 与 Anthropic Skills 风格一致

### 3.5 TUI + 语音双前端

- TUI：终端交互
- 语音：hands-free 交互

---

## 四、应用场景与本仓库关联

### 4.1 隐私敏感个人助理

- 不想让 Manus / OpenAI Operator 看你的文件
- 本地模型 + 本地数据 = 完整隐私

### 4.2 离线 / 弱网环境

- 模型在本地 → 无需联网推理
- 浏览器浏览可以纯本地完成（除 web 搜索 API）

### 4.3 学习 agent 工程

- Python + 透明架构
- 比 Manus 这种闭源云服务更适合学习

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| [openclaw.md](openclaw.md) | 都是 personal agent，openclaw 英文系、agenticSeek 隐私本地系 |
| [hermes-agent.md](hermes-agent.md) | 都强调 self-learning，agenticSeek 偏本地、hermes 偏云端 |
| [evolver.md](evolver.md) | evolver 提供 audit，agenticSeek 偏本地执行 |
| [skills.md](../ai-engineering/skills.md) | skill 风格兼容 Anthropic Skills |

---

## 五、个人评价

### 5.1 优势

1. **本地优先** —— DeepSeek-R1 + 本地推理栈，零云端依赖
2. **隐私友好** —— 数据完全本地，符合 GDPR / 隐私敏感场景
3. **替代 Manus 定位清晰** —— 满足"不想付月费"的用户
4. **Python + 透明架构** —— 学习价值高，可深度定制
5. **26.8k stars** —— 社区关注度高，更新活跃

### 5.2 不足

1. **本地模型性能上限** —— DeepSeek-R1 本地推理速度不如云端 frontier 模型
2. **硬件门槛** —— 需要较好 GPU / 大量内存才能流畅跑
3. **多模态能力偏弱** —— 主要文本 + 浏览器，图像 / 视频处理能力有限
4. **安全审计工具仍待完善** —— 浏览器自主操作 + 本地文件权限边界需谨慎
5. **Fosowl 团队规模** —— 长期可持续性观察

### 5.3 评分理由

**4 星（active）** —— 本地优先 + 隐私友好 + 替代 Manus + 透明架构是其核心优势；对隐私敏感用户、离线用户、agent 工程学习者尤其有价值。扣分项是硬件门槛、性能上限、多模态弱；但作为"本地 personal agent 的代表作"，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/Fosowl/agenticSeek |
| **作者主页** | https://github.com/Fosowl |
| **替代对象** | https://manus.im |

### 关联项目

- [openclaw.md](openclaw.md) — 英文系 personal agent
- [hermes-agent.md](hermes-agent.md) — 自学习 personal agent
- [evolver.md](evolver.md) — Agent 自进化引擎
- [skills.md](../ai-engineering/skills.md) — Anthropic Skills 标准
