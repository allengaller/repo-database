# 心力教练研究项目

> 🌟 **首次访问？** 请直接阅读 [**00-EXECUTIVE-SUMMARY.md**](00-EXECUTIVE-SUMMARY.md) — 三轮研究的终极总览，包含：
> - 10 条核心结论
> - 30 天 MVP 落地行动清单
> - 风险警示（"唯识"术语高危）
> - 三大理论基石整合框架
> - 30 模块认证课大纲摘要
> - 4 份可直接使用的可交付物清单

> 启动日期：2026-06-28
> 最后更新：2026-07-01
> 状态：研究阶段基本完成，进入落地执行阶段

## 项目定位

围绕"**心力教练**"这一方向，系统性调研全球市场上的：

- 同类产品 / 教练项目 / 认证体系
- 理论基础（**直接认知冥想 + 止观冥想 + 唯识论**）
- 市场容量、定价、获客渠道
- 可借鉴的开源项目、工具、方法论
- 法律合规边界（教练 vs 心理咨询）

## 理论基础

| 理论 | 来源 | 作用 |
|------|------|------|
| **直接认知冥想** | 藏传/禅宗"离言现量"传统 | 跳过概念、直接体验认知本身 |
| **止观冥想** (Samatha-Vipassana) | 上座部/大乘共通 | 专注力 + 洞察力双轨 |
| **唯识论** (Yogācāra) | 弥勒/无著/世亲 | 八识模型 + 三性说，提供认知地图 |

## 目录结构

```
research/mind-coach/
├── README.md              本文件
├── INDEX.md               所有调研内容的索引
├── 01-market-landscape.md 全球市场 + 竞品谱系（2026-06-28）
├── repos/
│   └── discoveries.jsonl  持续沉淀的 GitHub 同类项目
├── discover-repos.py      可复用的检索脚本（Python，基于 gh CLI）
└── discover-repos.sh      shell 入口（薄封装 discover-repos.py）
```

## 使用方式

### 查看已有调研
打开 `INDEX.md` 或直接看 `01-market-landscape.md`。

### 发现新的 GitHub 项目

前置：需要 `gh` CLI 已登录（`brew install gh && gh auth login`）。

```bash
cd research/mind-coach
./discover-repos.sh
# 或者直接
python3 discover-repos.py
```

脚本会用 `gh search repos` 查询 13 个关键词（中英混合），把新发现的 repo 以 JSONL 追加到 `repos/discoveries.jsonl`。已有 URL **自动去重**不会重复入库。

可选环境变量：
- `DISCOVER_LIMIT=8` 每个关键词最多返回多少条（默认 15）

### 新增一篇调研
创建 `NN-title-slug.md`（NN 为序号），并在 `INDEX.md` 中追加一行。

## 下一步待调研
- [ ] ICF 认证路径与成本
- [ ] 中文圈"心力"相关教练品牌深度拆解（张德芬、武志红、古典等）
- [ ] 唯识论的现代认知翻译方案
- [ ] 企业 L&D 采购流程与报价模板
- [ ] 竞品定价调研（1v1 / 小班 / 认证课）
- [ ] 法律合规：教练 vs 心理咨询边界（中国 vs 美国）
