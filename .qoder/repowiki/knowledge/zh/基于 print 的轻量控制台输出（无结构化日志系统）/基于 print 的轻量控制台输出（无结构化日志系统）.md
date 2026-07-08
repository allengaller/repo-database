---
kind: logging_system
name: 基于 print 的轻量控制台输出（无结构化日志系统）
category: logging_system
scope:
    - '**'
source_files:
    - scripts/scrape.py
    - scripts/update_monthly.py
    - research/mind-coach/discover-repos.py
---

本仓库未引入任何第三方日志框架或 Python 标准库 logging 模块，所有运行期输出均通过内置 `print()` / `print(..., file=sys.stderr)` 直接写入控制台。具体表现如下：

- **脚本层**：`scripts/scrape.py`、`scripts/update_monthly.py` 以及 `research/mind-coach/discover-repos.py` 全部使用 `print` 打印抓取进度、速率限制警告、错误信息、统计摘要等；异常分支统一走 `except Exception as e: print(f"Error: {e}")`。
- **前端层**：`web/app.js` 为纯静态展示，不产生服务端日志。
- **CI/文档**：`.github/workflows/*.yml` 与 `docs/FIX_REPORT.md` 中的示例代码也沿用 `print`，未见集中式 logger 初始化。
- **唯一例外**：`research/mind-coach/repos/Yogacara/REPORT.md` 中引用了一个外部 `logger.py`，但该文件不在当前仓库内，属于被研究项目的产物而非本项目代码。

因此，本项目不存在统一的日志级别管理、结构化字段、多 sink 路由或可配置格式——仅依赖标准输出进行人类可读的控制台提示。若后续需要增强可观测性，建议引入 `logging` 模块并定义统一的 level 策略与 JSON 输出格式。