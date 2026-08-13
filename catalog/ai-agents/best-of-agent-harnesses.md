---
name: RyanAlberts/best-of-Agent-Harnesses
url: https://github.com/RyanAlberts/best-of-Agent-Harnesses
domain: ai-agents
type: awesome-list
languages: [Markdown]
stars: 1500
forks: 0
license: MIT
discovered: 2026-08-13
updated: 2026-08-13
rating: 4
status: active
tags: [awesome-list, agent-harness, ranking, radar, evaluation, periodic-update]
summary: Agent Harness 方向的 awesome-list 与季度榜单 — 按 stars/contributors/维护活跃度三维评分，覆盖 Claude Code/Cursor/Aider/Cline/Oh-My 等主流 harness，~1.5k stars，"Agent Harness 圈的事实雷达"
---

# Best-of-Agent-Harnesses · Agent Harness 圈的事实雷达

> 收录日期：2026-08-13
> 仓库：https://github.com/RyanAlberts/best-of-Agent-Harnesses
> 来源：best-of-* 项目矩阵（best-of-ml-python / best-of-ml-ops 等）成员，Ryan Alberts 维护

**一句话核心总结**：Best-of-Agent-Harnesses 是 Ryan Alberts 出品的 Agent Harness 排行榜与 awesome-list —— 按 stars / contributors / 维护活跃度 / 更新频率多维度评分，定期发布 "Agent Harness 季度榜"，覆盖 Claude Code / Cursor / Aider / Cline / Oh-My-Codex / opencode / kimi-cli / tabby 等主流 harness，~1.5k stars，"Agent Harness 圈的事实雷达"。

---

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | best-of-Agent-Harnesses |
| **仓库地址** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |
| **所属作者** | Ryan Alberts |
| **描述** | A ranked list of awesome open-source agent harnesses, updated weekly |
| **开源许可** | MIT |
| **Star 数** | ~1,500（截至 2026-08） |
| **技术类型** | awesome-list（排名 + 索引） |
| **底层栈** | Markdown + 自动生成脚本（Python） |

---

## 二、技术栈与架构分析

### 2.1 best-of-* 项目矩阵

Ryan Alberts 维护的 "best-of-*" 系列：
- best-of-ml-python
- best-of-ml-ops
- best-of-jupyter
- best-of-agent-harnesses ← 本项目

风格统一：每项目配 README 模板 + 项目元数据自动拉取 + 周更。

### 2.2 评分维度

| 维度 | 权重 |
|------|------|
| **GitHub stars** | 主指标（带时间衰减） |
| **Contributors 数** | 反映团队规模 |
| **维护活跃度** | 最近 commit / release 频率 |
| **更新频率** | 文档 / 路线图 / changelog 是否跟进 |
| **生态集成** | Skills / Plugins / MCP 兼容度 |
| **社区反馈** | issues / discussions 质量 |

### 2.3 自动生成 pipeline

```mermaid
GitHub API → 抓取 metadata → 评分 → 生成 markdown 表格 → 提交 commit
```

项目元数据靠 GitHub API 周期抓取，README 几乎全自动更新。

### 2.4 季度榜

每季度发布 "Agent Harness Top 20" 长文：
- 名次变动
- 新晋项目
- 退榜项目
- 主题趋势分析

---

## 三、核心功能特性

### 3.1 排名透明

每个项目显示：
- 综合分
- 各维度得分
- 数据采集时间戳

便于研究者验证排名合理性。

### 3.2 分类导航

按维度分组的索引：
- 编码 agent
- 对话 agent
- 多 agent 框架
- harness / loop 库
- awesome-list 本体

### 3.3 趋势雷达

- 月度趋势图
- 增速榜（哪些 harness 在加速）
- 衰退榜（哪些 harness 趋冷）

### 3.4 链接深链

每个 harness 配：
- 仓库链接
- 文档链接
- 教程链接
- 相关讨论

### 3.5 配套博客

README 中嵌入分析长文链接：
- "为什么 Claude Code 持续领先"
- "Oh-My-Codex 是如何颠覆 Claude Code"
- "国产 harness 现状综述"

---

## 四、应用场景与本仓库关联

### 4.1 harness 选型决策

- 工程师选 harness 时的"事实雷达"
- CTO 评估团队技术栈时的参考依据

### 4.2 行业趋势研究

- 学术 / 投资机构做 agent harness 趋势报告
- 媒体写 "agent harness 圈年度盘点" 时的数据源

### 4.3 个人导航

- 想发现新 harness 的人
- 想跟进行业最新动态的人

### 4.4 与本仓库其他档案的关联

| 关联项目 | 关联点 |
|---------|--------|
| 所有 ai-engineering/*.md | 本仓库的 harness 排名可与 best-of 互证 |
| [loop-engineering.md](loop-engineering.md) | best-of 把"agent loop"作为评分维度 |
| [looptroop.md](looptroop.md) | 此类新项目通过 best-of 获得曝光 |

---

## 五、个人评价

### 5.1 优势

1. **方法论严谨** —— 多维度评分 + 时间衰减 + 自动数据采集，避免"拍脑袋排名"
2. **覆盖面广** —— 主流 harness 全收录，且持续跟踪
3. **更新及时** —— 周更 + 季度榜，跟得上社区节奏
4. **写作深度** —— 配套分析长文提供上下文，不只是表格
5. **MIT 许可 + 透明数据** —— 可验证可复现

### 5.2 不足

1. **1.5k stars 偏少** —— 对比 best-of-ml-python 的 5k+ 仍有差距
2. **个人维护** —— Ryan Alberts 单人维护，长期可持续性观察
3. **数据源单一** —— 仅靠 GitHub API，npm / PyPI 等数据源未纳入
4. **中文 harness 覆盖偏少** —— 对国产 harness（如 kimi-cli / oh-my-codex）的索引可加强
5. **评分模型固定** —— 评分逻辑不公开调整，难以跟上社区新维度

### 5.3 评分理由

**4 星（active）** —— 事实雷达 + 方法论严谨 + 持续更新是其核心优势；对 harness 选型 / 行业研究 / 个人导航都有价值。扣分项是 star 数偏少、个人维护、中文覆盖有限；但作为"Agent Harness 圈的事实雷达"，已达 4 星水平。

---

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/RyanAlberts/best-of-Agent-Harnesses |
| **作者主页** | https://github.com/RyanAlberts |
| **姊妹项目** | https://github.com/RyanAlberts/best-of-ml-python |

### 关联项目

- 本仓库的 21 个 catalog 档案均可被本雷达索引
- [loop-engineering.md](loop-engineering.md) — agent loop 模式库
- [looptroop.md](looptroop.md) — 多 agent loop 协调框架
