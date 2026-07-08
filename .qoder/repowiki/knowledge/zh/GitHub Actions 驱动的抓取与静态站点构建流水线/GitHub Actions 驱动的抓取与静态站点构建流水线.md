---
kind: build_system
name: GitHub Actions 驱动的抓取与静态站点构建流水线
category: build_system
scope:
    - '**'
source_files:
    - .github/workflows/ci.yml
    - .github/workflows/monthly-scrape.yml
    - .github/workflows/monthly-update.yml
    - .github/workflows/deploy-pages.yml
    - scripts/scrape.py
    - scripts/update_monthly.py
    - requirements.txt
    - data/repos.json
---

本项目采用纯 GitHub Actions 的 CI/CD 方案，无 Makefile、Dockerfile 或本地构建工具链。整个“构建”由四个工作流协作完成：CI 检查、数据抓取、月度增量更新、Pages 部署。

1. 系统组成
- CI（ci.yml）：push / PR 到 main 时触发，使用 Python 3.11 + pip 缓存安装 requirements.txt，运行 pytest 并对 scripts/scrape.py 与 scripts/update_monthly.py 做 AST 语法校验。
- 月度抓取（monthly-scrape.yml）：每月 1 日 0:00 UTC cron 触发，安装 requests + beautifulsoup4，运行 scripts/scrape.py 拉取 Awesome Lists、GitHub API、Hacker News、DEV.to 等源，合并后写入 data/repos.json；若文件有变更则自动 commit & push。
- 月度新增仓库更新（monthly-update.yml）：每月 1 日 02:00 UTC 触发，支持 workflow_dispatch 传入 year/month 参数回补历史月份；生成 data/monthly_report_{YYYY-MM}.md 报告并写入步骤摘要。
- Pages 部署（deploy-pages.yml）：push 到 main 时触发，将 data/repos.json 复制到 web/data/，以 upload-pages-artifact 上传 ./web 目录，再 deploy-pages 发布到 github-pages 环境。

2. 关键工件与约定
- 数据契约：data/repos.json 是唯一持久化产物，被 scrape.py 与 update_monthly.py 共同读写，被前端 web/app.js 直接加载。
- 依赖声明：requirements.txt 仅声明 requests、beautifulsoup4；脚本内通过 pip install -r requirements.txt 或运行时自举安装第三方包。
- 环境变量：GITHUB_TOKEN 通过 secrets.GITHUB_TOKEN 注入，用于提高 GitHub API 配额。
- 版本与发布：无版本号概念，以 git tag 与 data/monthly_report_*.md 作为时间戳标识；页面 URL 由 GitHub Pages 自动生成。

3. 架构与约定
- 构建即“数据生产 + 静态拷贝”，不存在编译步骤；Python 脚本是唯一的“构建器”。
- 所有工作流均基于 ubuntu-latest + setup-python@v5，Python 版本锁定为 3.11。
- 失败通知：scrape 与 monthly-update 在 failure() 分支向 $GITHUB_STEP_SUMMARY 写入 Markdown 摘要并 exit 1，便于查看失败原因。
- 并发控制：deploy-pages 使用 concurrency group "pages" 防止重复部署。

4. 开发者应遵循的规则
- 新增 Python 依赖请同步更新 requirements.txt，并在各 workflow 的 pip install 步骤中保持一致。
- 修改 scripts/*.py 后需确保可通过 python -m ast.parse(...) 语法检查，否则 CI 会失败。
- 任何对 data/repos.json 结构的变更都应同时更新前端 web/app.js 的数据消费逻辑，避免 Pages 部署后页面异常。
- 如需手动触发抓取或回补历史月份，请使用 workflow_dispatch 而非直接修改 cron 表达式。