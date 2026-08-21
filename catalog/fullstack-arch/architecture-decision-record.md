---
name: architecture-decision-record/architecture-decision-record
url: https://github.com/architecture-decision-record/architecture-decision-record
domain: fullstack-arch
type: awesome-list
languages: []
stars: 16702
forks: 2795
license: NOASSERTION
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [adr, decision-record, documentation, architecture-governance]
summary: 架构决策记录（ADR）的模板与实践合集，把技术决策的理由与代价固化为可追溯文档
---

# Architecture Decision Record · ADR 模板与实践库

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Architecture Decision Record (ADR) |
| **仓库地址** | https://github.com/architecture-decision-record/architecture-decision-record |
| **所属组织/作者** | architecture-decision-record 组织（Joel Parker Henderson 发起，已迁入同名组织） |
| **描述** | 架构决策记录（ADR）的模板与实践合集，把技术决策的理由与代价固化为可追溯文档 |
| **开源许可** | NOASSERTION（多协议混合，各模板目录下单独声明，复用前逐个确认） |
| **Star 数** | 16,702（截至 2026-08） |
| **Fork 数** | 2,795 |
| **技术类型** | awesome-list |

## 二、技术栈分析

- 纯文档仓库：`locales/` 下多语言说明 + `templates/` 下多套 ADR 模板
- 收录的主流模板谱系：
  - **Nygard 版**（最简：Context / Decision / Status / Consequences）
  - **MADR**（Markdown ADR，带 Considered Options 与 Decision Outcome）
  - **Y-Statements**（一句话结构化表达决策）
  - Tyree & Akerman 版（重量级，含 Assumptions / Constraints / Implications）
- 提供工具链索引（adr-tools 等），支持把 ADR 编号与生命周期纳入仓库流程
- 含中文等多语言翻译

## 三、核心功能特性

1. **模板谱系齐全**：从三行的极简版到评审级重量版，按团队成熟度选档
2. **决策生命周期语义**：proposed / accepted / deprecated / superseded 状态机让"旧决策为何被推翻"可追溯
3. **备选方案强制留档**：MADR 类模板要求写 Considered Options，避免只留结论不留权衡
4. **与代码同仓**：ADR 放在 `docs/adr/` 随代码演进，评审走 PR 流程
5. **工具链索引**：adr-tools 等 CLI 可自动编号与生成 superseded 关系

## 四、应用场景说明

- 平台/方案团队的决策留档：为什么选 Volcano 而不是 Kueue、为什么自建网关，都应有对应 ADR
- 新人 onboarding：读 ADR 序列比读代码更快理解系统为何长成现在的样子
- 客户交付物：把关键技术选择整理成 ADR 附在方案文档后，显著提升方案可信度
- 与本库自身的档案体系互补：catalog 记录"有什么"，ADR 记录"我们为什么选它"

## 五、个人评价

### 优势

1. 把"口头决策"变成可检索资产，是对抗架构知识流失最低成本的手段
2. 模板分档清晰，团队可以从 Nygard 极简版起步再逐步加重
3. 语言中立、工具中立，不绑定任何具体技术栈或平台

### 不足

1. 内容偏"模板集合"，缺少大型组织落地 ADR 的完整流程指南
2. 许可为 NOASSERTION 且多协议混合，直接复制模板进商业交付物前需逐个核对
3. 仓库已迁移过 owner（原 joelparkerhenderson 路径），历史外链需要更新

### 评分理由

4 星：架构治理方向的实用基础设施，工程价值高但内容形态较轻（⭐16.7k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/architecture-decision-record/architecture-decision-record |
| **MADR 规范** | https://adr.github.io/madr/ |
| **adr-tools** | https://github.com/npryce/adr-tools |

### 关联项目

- [system-design-primer.md](system-design-primer.md)
- [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md)
