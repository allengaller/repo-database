---
name: K-Dense-AI/scientific-agent-skills
url: https://github.com/K-Dense-AI/scientific-agent-skills
domain: ai-engineering
type: awesome-list
languages: [Python]
stars: 35439
forks: 3408
license: MIT
discovered: 2026-08-27
updated: 2026-08-27
rating: 4
status: active
tags: [agent-skills, science, claude-code, cursor, codex, skill-library, validated-skills]
lineage: anthropics/skills
summary: 163 个经验证的科研 Agent Skills 库，覆盖生物/化学/医学/药物发现，兼容 Cursor/Claude Code/Codex 等主流 harness
---

# Scientific Agent Skills · 科研智能体技能库

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Scientific Agent Skills |
| **仓库地址** | https://github.com/K-Dense-AI/scientific-agent-skills |
| **所属组织/作者** | K-Dense AI |
| **描述** | 163 个经验证的科研 Agent Skills，覆盖生物、化学、医学与药物发现，兼容 Cursor / Claude Code / Codex / Pi / Antigravity 及开放 Agent Skills 标准 |
| **开源许可** | MIT（其中 docx/pdf/pptx/xlsx 四个技能从 anthropics/skills vendored，遵循其原许可） |
| **Star 数** | 35,439（截至 2026-08，单日 +498） |
| **Fork 数** | 3,408 |
| **技术类型** | awesome-list + 技能库 |

## 二、技术栈分析

- 标准技能封装：`skills/` 下 163 个目录，每个含 SKILL.md（frontmatter + 渐进披露）+ 脚本 + 参考资料三件套，完全对齐 anthropics/skills 的规范
- 学科覆盖极广：biopython / scanpy / deepchem / astropy / cirq 等主流科研库均有对应技能，另有临床决策支持、临床试验报告等应用级技能
- 自带工程化设施：`scan_skills.py` / `scan_pr_skills.py` 做技能静态校验，`tests/` 目录做回归，`plugin.json` 可直接作为 Claude Code 插件安装
- 双规范输出：既符合 Claude Code 插件市场格式，也兼容开放 Agent Skills 标准（多家 harness 通用）
- AGENTS.md + CLAUDE.md 双入口，说明其面向多 harness 的设计意图

## 三、核心功能特性

1. **每个技能都经过验证**：区别于一般 awesome-list 的纯链接聚合，技能目录里有可执行脚本与测试，这是「163 个 validated skills」的技术底气
2. **vendored 上游同步**：Anthropic 官方四个文档技能（docx/pdf/pptx/xlsx）直接内嵌并追踪上游更新，展示了技能库之间「fork + 追踪」的复用模式
3. **科研数据库集成**：100+ 科学数据库（DepMap、CellxGene、Benchling 等）的查询技能，把「会用工具」下沉为「会查专业数据」
4. **技能静态扫描**：scan 脚本检查 SKILL.md 规范合规性，可作为自建技能库的 CI 门禁参考
5. **多 harness 兼容矩阵**：同一技能包在 Cursor/Claude Code/Codex/Pi/Antigravity 下均可安装，验证了技能标准的可移植性

## 四、应用场景说明

- **技能工程范式的最佳大规模样本**：163 个技能的同构组织，是研究「技能粒度怎么切、SKILL.md 怎么写、验证怎么做」的最大样本库，直接参考其组织与验证方式
- **技能 CI 门禁的参考实现**：`scan_skills.py` 的静态检查规则可移植到内部技能库的流水线
- **垂直领域技能库的模板**：证明「Agent Skills 标准 + 单一垂域深耕」路线可行 —— 同理可做 SRE 技能库、工单技能库
- 与 [skills.md](skills.md)（anthropics/skills，技能规范源头）配合：先读规范源头，再看 163 个实例
- 与本库 SRE 方向结合：可参照其结构做「运维诊断技能包」（依赖诊断、日志分析、变更核查等技能化封装）

## 五、个人评价

### 优势

1. 当前规模最大、质量最高的垂域技能库，「validated」不是口号而是有扫描器与测试支撑
2. 对 Agent Skills 标准的落地最彻底：多 harness 兼容 + 插件市场格式 + 开放标准三线并行
3. MIT 许可 + 上游许可清晰分离，二次使用的法律边界干净

### 不足

1. 技能质量仍有梯度：163 个里头部（biopython/scanpy 级）扎实，长尾技能的验证深度存疑
2. 科研垂域离通用工程场景较远，非科研团队主要参考其「组织方式」而非内容本身
3. 中文科研工具链（如国产数据库）覆盖为零，本土化需自建

### 评分理由

4 星：技能工程化的最佳实践样本库，价值在范式而非内容；扣分在垂域局限（⭐35.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/K-Dense-AI/scientific-agent-skills |
| **技能扫描器** | https://github.com/K-Dense-AI/scientific-agent-skills/blob/main/scan_skills.py |

### 关联项目

- [skills.md](skills.md) — 范式源头（Agent Skills 规范与官方技能库）
- [superpowers.md](superpowers.md) — 同范式衍生（技能集框架）
- [awesome-llm-apps.md](../ai-agents/awesome-llm-apps.md) — 应用模板库视角的对照
