---
name: remoteintech/remote-jobs
url: https://github.com/remoteintech/remote-jobs
domain: interview-career
type: awesome-list
languages: [JavaScript]
stars: 40748
forks: 3959
license: NOASSERTION
discovered: 2026-08-25
updated: 2026-08-25
rating: 4
status: active
tags: [remote-jobs, companies, job-search, awesome-list, career]
summary: 社区维护的远程友好科技公司名录，是 remoteintech.company 站点的数据源
---

# Remote Jobs · 远程友好公司名录

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Remote Jobs |
| **仓库地址** | https://github.com/remoteintech/remote-jobs |
| **所属组织/作者** | Remote In Tech 社区 |
| **描述** | 社区维护的远程友好科技公司名录，是 remoteintech.company 站点的数据源 |
| **开源许可** | NOASSERTION（数据名录，非标准开源许可，使用前查看仓库说明） |
| **Star 数** | 40,748（截至 2026-08） |
| **Fork 数** | 3,959 |
| **技术类型** | awesome-list |

## 二、技术栈分析

- 数据以 Markdown 表格维护（公司名 | 地域 | 是否全远程 | 备注），JS 工具负责校验与站点生成
- 收录标准明确：公司需有远程岗位历史，PR 需附证据（岗位链接），拒绝传闻供稿
- CI 自动校验表格格式与链接，站点由数据直接生成
- 维护活跃（最近提交 2026-08-11），条目随公司远程政策变化更新
- 配套 Slack/社区渠道处理争议条目

## 三、核心功能特性

1. **证据制供稿**：每条收录要求可验证的岗位证据，数据可信度高于普通清单
2. **全远程/部分远程区分**：标注公司的远程程度，避免「伪远程」坑
3. **地域限制标注**：不少远程岗位有国家限制，名录直接标出
4. **数据与站点分离**：Markdown 即数据库，方便程序化消费（如做自己的筛选器）
5. **社区纠错机制**：公司政策变化（如强制返岗）会被 PR 移除或降级

## 四、应用场景说明

- 寻找远程/混合办公机会时的第一手名单，按地域限制快速过滤
- 数据可编程消费：Markdown 表格可直接解析成 JSON 做个性化筛选
- 与 [hiring-without-whiteboards.md](hiring-without-whiteboards.md) 叠加使用：先选远程名单，再看面试流程
- 对国内求职者：可作为海外远程岗位（contractor 形式）的线索库

## 五、个人评价

### 优势

1. 证据制 + CI 校验让数据质量显著高于一般 awesome-list
2. 远程程度与地域限制两个关键维度都标注，实用性强
3. 更新勤快，后疫情时代公司政策反复，这份名单跟得紧

### 不足

1. 许可为 NOASSERTION，商业化转载需先确认条款
2. 偏欧美公司，亚太时区友好的条目少
3. 名录只到公司层面，具体岗位仍需自行去招聘页查

### 评分理由

4 星：远程求职方向的权威名录，数据治理做得认真，扣分在许可与地域（⭐40.7k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/remoteintech/remote-jobs |
| **在线站点** | https://remoteintech.company |

### 关联项目

- [hiring-without-whiteboards.md](hiring-without-whiteboards.md)
- [tech-interview-handbook.md](tech-interview-handbook.md)
