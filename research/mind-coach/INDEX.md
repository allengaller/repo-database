# 心力教练研究 · 总索引

> 🌟 **首次访问？** 请先阅读 [**00-EXECUTIVE-SUMMARY.md**](00-EXECUTIVE-SUMMARY.md)（三轮研究终极总览，10 条核心结论 + 行动路线图 + 风险警示 + 可交付物清单）

> 最后更新：2026-07-01
> 累计产出：**~440 KB / 6000+ 行 / 15 份报告 + 1 份 PoC + 1 份中文 Prompt + 1 份课程大纲**

## 调研报告

| # | 主题 | 日期 | 文件 | 状态 |
|---|------|------|------|------|
| 01 | 全球市场 + 竞品谱系 + 生态位分析 | 2026-06-28 | [01-market-landscape.md](01-market-landscape.md) | ✅ 完成 |
| 02 | 唯识 × AI × 冥想 · 五大开源项目深度对比 | 2026-06-28 | [02-five-repos-synthesis.md](02-five-repos-synthesis.md) | ✅ 完成 |
| 03 | ICF 教练认证路径（成本/时间/ROI） | 2026-06-28 | [03-icf-certification.md](03-icf-certification.md) | ✅ 完成 |
| 04 | 中文圈"心力"品牌深度拆解（10 个品牌） | 2026-06-28 | [04-chinese-brands.md](04-chinese-brands.md) | ✅ 完成 |
| 05 | 第二轮研究综合摘要（认证/市场/落地） | 2026-06-28 | [05-round2-synthesis.md](05-round2-synthesis.md) | ✅ 完成 |
| 06 | 首发训练营 MVP 落地方案（5 天 × 12 人 × ¥3,999） | 2026-06-30 | [06-bootcamp-mvp.md](06-bootcamp-mvp.md) | ✅ 完成 |
| 07 | 法律合规边界（中国 vs 美国 vs 国际）⚠️ | 2026-06-30 | [07-legal-compliance.md](07-legal-compliance.md) | ✅ 完成 |
| 08 | 直接认知冥想深度研究（五大传统 + 科学化） | 2026-06-30 | [08-direct-cognition.md](08-direct-cognition.md) | ✅ 完成 |
| 09 | 30 模块认证课大纲（唯识×正念×教练×ICF） | 2026-06-30 | [09-curriculum-30-modules.md](09-curriculum-30-modules.md) | ✅ 完成 |
| 10 | 第三轮研究综合摘要（MVP/合规/理论/课程） | 2026-06-30 | [10-round3-synthesis.md](10-round3-synthesis.md) | ✅ 完成 |

### 仍待深化（如有精力）

| 主题 | 当前状态 |
|------|---------|
| 唯识论现代认知翻译 | 部分完成（见 Abhidhamma 中文 Prompt） |
| 企业 L&D 采购与报价 | 待启动 |
| 法律合规边界（具体律师推荐） | 07 报告已给框架 |
| 小红书/公众号/播客内容矩阵 | 待启动 |

## 开源项目深度研究

每份报告独立成文件夹，包含 9 个标准章节（概览/基础信息/目录结构/核心分析/技术架构/教练启发/关键摘录/后续问题/相关资源）。综合对比见 [02 报告](02-five-repos-synthesis.md)。

| 项目 | ⭐ | 核心定位 | 报告 |
|------|-----|---------|------|
| SecurityRonin/alaya | 13 | 唯识"种子-现行-熏习"Rust 记忆引擎 | [alaya/REPORT.md](repos/alaya/REPORT.md) |
| giekaton/vipassana-app | 9 | 游戏化内观 PWA（八角形 SVG 觉察-标记） | [vipassana-app/REPORT.md](repos/vipassana-app/REPORT.md) |
| dosanko-tousan/Gemini-Abhidhamma-Alignment | 3 | 阿毗达磨 × Gemini prompt 框架（减法对齐） | [Gemini-Abhidhamma-Alignment/REPORT.md](repos/Gemini-Abhidhamma-Alignment/REPORT.md) + [PROMPT-ZH.md](repos/Gemini-Abhidhamma-Alignment/PROMPT-ZH.md) |
| Greatbeing/Yogacara | 1 | 唯识八识全映射 Python agent 框架 | [Yogacara/REPORT.md](repos/Yogacara/REPORT.md) |
| Greatbeing/yogacara-agent | 0 | LangGraph + 果报系数 RL 唯识 agent | [yogacara-agent/REPORT.md](repos/yogacara-agent/REPORT.md) |
| FrankNavratil/buddhist-psychology-course | 1 | 30 模块佛教心理学商业课程（$495） | [buddhist-psychology-course/REPORT.md](repos/buddhist-psychology-course/REPORT.md) |

## 可交付物（可直接使用）

| 产物 | 用途 | 文件 |
|------|------|------|
| **vasana 熏习机制 PoC** | 交互式 HTML，可直接给来访者演示"种子-现行-熏习"循环 | [vasana-poc/index.html](repos/vasana-poc/index.html) |
| **Abhidhamma v5.3 中文 System Prompt** | 可直接用作教练 AI 的 system prompt（含 Reflexion / Sona 协议） | [PROMPT-ZH.md](repos/Gemini-Abhidhamma-Alignment/PROMPT-ZH.md) |
| **30 模块认证课大纲** | 三级递进 × 40 个实修练习 × ICF 8 大能力全覆盖，可直接用于课程开发 | [09-curriculum-30-modules.md](09-curriculum-30-modules.md) |
| **首发训练营 MVP 方案** | 5 天 × 12 人 × ¥3,999，30 天可落地 | [06-bootcamp-mvp.md](06-bootcamp-mvp.md) |

## 沉淀的 GitHub 同类项目

所有通过脚本发现的 repo 以 JSONL 形式保存在 [`repos/discoveries.jsonl`](repos/discoveries.jsonl)（当前 20+ 条）。

每行格式：
```json
{
  "url": "https://github.com/owner/repo",
  "name": "owner/repo",
  "description": "...",
  "stars": 123,
  "language": "Python",
  "query": "搜索时用的关键词",
  "discovered_at": "2026-06-28",
  "notes": ""
}
```

运行 [`discover-repos.sh`](discover-repos.sh) 即可增量发现（自动去重）。

## 术语对照表

| 中文 | 英文 / 梵文 | 备注 |
|------|------------|------|
| 心力 | Mental Power / Mental Resilience | 中文创投圈流行词 |
| 止 | Samatha (奢摩他) | 专注力训练 |
| 观 | Vipassana / Vipashyana (毗钵舍那) | 洞察力训练 |
| 止观双运 | Samatha-Vipassana Yoke | 双轨训练 |
| 唯识 | Yogācāra / Vijñānavāda | 瑜伽行派 |
| 八识 | Eight Consciousnesses | 前五 + 意识 + 末那 + 阿赖耶 |
| 三性 | Three Natures (Trisvabhāva) | 遍计所执 / 依他起 / 圆成实 |
| 直接认知 | Direct Cognition | 对应"离言现量"(nirvikalpaka-pratyakṣa) |
| 现量 | Pratyakṣa | 直接感知，无概念介入 |
| 比量 | Anumāna | 推理认知 |
| 末那识 | Manas | 我执中心 |
| 阿赖耶识 | Ālaya-vijñāna | 种子库 |
| 熏习 | Vāsanā / Perfuming | 种子的累积效应 |
| 果报 | Vipāka | 业力的显现 |
| 四智 | Four Wisdoms | 大圆镜/平等性/妙观察/成所作 |
| 我执 | Ātma-grāha | Self-grasping |
| 三毒 | Three Poisons | 贪/瞋/痴 (rāga/dveṣa/moha) |
| 心路过程 | Citta-vīthi | 上座部阿毗达磨的认知流程 |
| 有分 | Bhavaṅga | 潜流意识 |
| 速行 | Javana | 决策阶段 |

## 下一步行动（第三轮完成后）

### 🚨 立即行动（本周）
1. 重新命名"唯识" — 改为"深层认知" / "心智操作系统"（参考 07 报告第 4 节）
2. 预约专业律师合规审查（¥2,000-5,000）

### 🎯 短期（30 天内）
3. 跑通首发训练营 MVP（5 天 × 12 人 × ¥3,999，参考 06 报告）
4. 开始内容发布（每周 3 条，小红书 + 公众号）

### 🎯 中期（3-12 个月）
5. 启动 30 模块认证课开发（8 个月周期，参考 09 报告）
6. 核心团队 1-2 人拿 ICF ACC（参考 03 报告）
7. 把 vasana PoC 升级为产品

### 🎯 长期（12+ 个月）
8. 申请 ICF CCE 课程供应商
9. 扩展到企业 L&D 市场
10. 建立教练社群生态

### 🟡 待深化（如有精力）
- 首发训练营具体课件/PPT 大纲（06 报告已给结构，需细化）
- vasana PoC 产品化路线图
- 找 5-10 个教练实测 Abhidhamma 中文 Prompt
- 小红书/公众号/播客账号定位与内容矩阵
- 30 模块认证课的师资招募与培训
