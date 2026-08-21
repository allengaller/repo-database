---
name: wasp-lang/open-saas
url: https://github.com/wasp-lang/open-saas
domain: fullstack-arch
type: application
languages: [TypeScript, MDX]
stars: 15539
forks: 1859
license: MIT
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [saas-boilerplate, fullstack, react, nodejs, prisma]
summary: 基于 Wasp DSL 的免费 SaaS 全栈模板，认证/支付/管理后台/邮件全套开箱
---

# Open SaaS · 全功能 SaaS 全栈模板

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Open SaaS |
| **仓库地址** | https://github.com/wasp-lang/open-saas |
| **所属组织/作者** | wasp-lang（Wasp 框架团队） |
| **描述** | 基于 Wasp DSL 的免费 SaaS 全栈模板，认证/支付/管理后台/邮件全套开箱 |
| **开源许可** | MIT |
| **Star 数** | 15,539（截至 2026-08） |
| **Fork 数** | 1,859 |
| **技术类型** | application |

## 二、技术栈分析

- 上层用 **Wasp** DSL（`main.wasp`）声明路由、实体、job、auth，编译期生成前后端胶水代码
- 实际运行栈：React + Node.js + Prisma + PostgreSQL，前端 Tailwind，博客文档用 Astro/Starlight
- 集成项：Stripe/Lemon Squeezy 支付、多种 OAuth、SendGrid 邮件、AWS S3 上传、Plausible/GA 分析
- 内置 admin dashboard 与 cron job（Wasp job 声明式定义）
- 部署支持 Fly.io、Railway 等，一条命令产出前后端两个服务

## 三、核心功能特性

1. **声明式全栈**：一个 `.wasp` 文件描述整个应用骨架，样板代码由编译器生成
2. **订阅计费闭环**：Stripe webhook、订阅状态机、试用期与配额逻辑均已实现
3. **管理后台现成**：用户列表、订阅状态、分析看板不必从零写
4. **AI 示例应用**：内置调用 LLM 的 demo（任务规划器），可作为 AI SaaS 起点
5. **文档站同仓**：Astro 文档 + 博客一体，产品与内容营销一起交付

## 四、应用场景说明

- 内部工具/小产品的快速起量：认证、计费、后台三件事一次到位，一周内可上线 MVP
- 全栈架构范式学习：观察 Wasp 如何把"声明式配置 → 生成代码"这条路走通
- AI 应用外壳：把 MaaS 侧模型能力包成可计费的产品形态时，可复用其计费与配额结构
- 与 [saas-boilerplate.md](saas-boilerplate.md) 取舍：Open SaaS 抽象更高、开发更快；后者是纯 Next.js，可控性更强

## 五、个人评价

### 优势

1. 完整度是同类模板里最高的一档，MIT 许可无商业限制
2. Wasp DSL 消除了大量样板代码，小团队迭代速度提升明显
3. 文档与示例质量高，社区活跃（最近提交 2026-08）

### 不足

1. 绑定 Wasp 框架，遇到 DSL 未覆盖的需求需要 escape hatch，长期有生态锁定风险
2. Wasp 本身仍在演进，破坏性变更概率高于纯 Next.js 方案
3. 前后端分离部署（两个服务）在某些托管环境上成本高于单体 Serverless 方案

### 评分理由

4 星：SaaS 脚手架里完成度与许可友好度最好的选择，扣分主要在框架锁定（⭐15.5k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/wasp-lang/open-saas |
| **官方文档** | https://docs.opensaas.sh |
| **Wasp 框架** | https://github.com/wasp-lang/wasp |

### 关联项目

- [saas-boilerplate.md](saas-boilerplate.md)
- [system-design-primer.md](system-design-primer.md)
