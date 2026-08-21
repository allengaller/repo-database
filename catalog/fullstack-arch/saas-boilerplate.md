---
name: ixartz/SaaS-Boilerplate
url: https://github.com/ixartz/SaaS-Boilerplate
domain: fullstack-arch
type: application
languages: [TypeScript]
stars: 7368
forks: 1333
license: MIT
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [nextjs, saas-boilerplate, multi-tenant, drizzle, tailwind]
summary: Next.js App Router 的多租户 SaaS 脚手架，团队/权限/i18n/测试链路一应俱全
---

# SaaS Boilerplate · Next.js 多租户脚手架

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | SaaS Boilerplate |
| **仓库地址** | https://github.com/ixartz/SaaS-Boilerplate |
| **所属组织/作者** | Rémi Gaudin（ixartz） |
| **描述** | Next.js App Router 的多租户 SaaS 脚手架，团队/权限/i18n/测试链路一应俱全 |
| **开源许可** | MIT |
| **Star 数** | 7,368（截至 2026-08） |
| **Fork 数** | 1,333 |
| **技术类型** | application |

## 二、技术栈分析

- Next.js（App Router）+ TypeScript + Tailwind CSS + Shadcn UI
- 数据层 Drizzle ORM + PostgreSQL，migration 由 drizzle-kit 管理
- 认证与组织管理用 Clerk（含多租户 organization、成员邀请、角色）
- 计费 Stripe；国际化 next-intl；表单 React Hook Form + Zod
- 工程链路完备：Vitest 单测、Playwright E2E、Storybook、ESLint、Sentry、Checkly 监控、Husky + Commitlint

## 三、核心功能特性

1. **多租户模型现成**：organization / member / role 三层结构直接可用，是 B2B SaaS 的核心骨架
2. **类型安全全链路**：Drizzle + Zod + TS 让 schema 到表单校验的类型一致
3. **测试与质量门禁齐全**：单测/E2E/Storybook/lint/commit 规范全部预配置，工程规范可直接沿用
4. **国际化内建**：next-intl 路由级多语言，出海产品省一层改造
5. **可观测集成**：Sentry 错误追踪 + Checkly 合成监控，上线即有基本 SRE 能力

## 四、应用场景说明

- B2B 多租户产品起步：组织与权限模型是最容易做错的部分，直接复用可少走弯路
- Next.js 工程规范参考：即使不用整个模板，其 lint/test/CI 配置组合值得抄
- 全栈技术选型样本：观察 2026 年 Next.js 生态的主流组合（Drizzle + Clerk + Shadcn）
- 与 [open-saas.md](open-saas.md) 取舍：本项目无框架 DSL、可控性强；Open SaaS 抽象更高、起步更快

## 五、个人评价

### 优势

1. 纯 Next.js 生态，没有额外 DSL 抽象，逃逸成本低
2. 工程配套（测试、监控、提交规范）完整度罕见，是"可维护性优先"的模板
3. 活跃维护（最近提交 2026-08），依赖版本跟得上上游

### 不足

1. 认证与组织强依赖 Clerk（SaaS 服务），私有化/内网场景需替换为自建方案，改造量不小
2. 依赖数量多，初次安装与升级依赖树的维护负担偏重
3. 缺少后台管理界面，运营侧功能仍需自建

### 评分理由

4 星：Next.js 多租户脚手架的优质样本，扣分在 Clerk 依赖限制了私有化场景（⭐7.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/ixartz/SaaS-Boilerplate |
| **在线 Demo** | https://demo.nextjs-boilerplate.com |

### 关联项目

- [open-saas.md](open-saas.md)
- [system-design-101.md](system-design-101.md)
