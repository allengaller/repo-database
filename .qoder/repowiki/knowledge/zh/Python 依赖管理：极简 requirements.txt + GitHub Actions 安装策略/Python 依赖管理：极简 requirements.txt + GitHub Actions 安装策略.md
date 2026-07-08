---
kind: dependency_management
name: Python 依赖管理：极简 requirements.txt + GitHub Actions 安装策略
category: dependency_management
scope:
    - '**'
source_files:
    - requirements.txt
    - scripts/scrape.py
    - scripts/update_monthly.py
    - .github/workflows/ci.yml
    - .github/workflows/monthly-scrape.yml
---

## 1. 使用的系统/方法
- 包管理器：仅使用 Python 标准 `pip`，通过根目录的 `requirements.txt` 声明全部运行时依赖。
- 无锁文件：仓库中不存在 `requirements.lock`、`poetry.lock`、`Pipfile.lock` 等锁定文件，版本由 PyPI 默认行为决定（不固定）。
- 无虚拟环境提交：`.venv/` 在 `.gitignore` 中，本地开发需自行创建 venv；CI 与调度任务均通过 `setup-python` 临时构建环境。
- 私有源/代理：未发现任何 `pip.conf`、`PYPI_URL`、`--index-url` 或 `GOPRIVATE` 配置，所有依赖均来自公共 PyPI。
- 前端无独立依赖：`web/` 为纯静态站点，无任何 `package.json` / `node_modules`，不引入第三方 JS 库。

## 2. 关键文件与包
- `requirements.txt`：唯一依赖清单，仅声明两个运行时包：`requests`、`beautifulsoup4`。
- `scripts/scrape.py`、`scripts/update_monthly.py`：实际 import 并使用上述两个包进行 HTTP 抓取与 Markdown 解析。
- `.github/workflows/ci.yml`：CI 测试阶段通过 `pip install -r requirements.txt` + `pytest` 安装依赖并运行测试。
- `.github/workflows/monthly-scrape.yml`：每月定时任务直接 `pip install requests beautifulsoup4 pytest` 后执行抓取脚本，并通过 `GITHUB_TOKEN` 环境变量提升 API 配额。
- `scripts/scrape.py` 中的 try/except pip 自举逻辑：若运行环境缺少 `requests`，会调用 `subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])` 再导入，作为“兜底自动安装”机制。

## 3. 架构与约定
- 单文件依赖清单：整个仓库只有一个 `requirements.txt`，没有按子项目拆分，因为核心逻辑集中在 `scripts/` 下的两个脚本。
- 最小化依赖面：仅选择 `requests`（HTTP）和 `beautifulsoup4`（HTML/Markdown 解析），未引入 `pydantic`、`httpx`、`aiohttp` 等更重框架，保持脚本轻量可移植。
- CI 与生产一致：GitHub Actions 的 `setup-python@v5` 固定 Python 3.11，并开启 `cache: 'pip'` 加速依赖安装；测试与抓取共用同一套依赖集。
- 数据契约外置：`data/repos.json` 是抓取产物的持久化契约，脚本只负责更新该文件，不关心其 schema 的具体消费方（前端直接读取 JSON）。

## 4. 开发者应遵循的规则
- 新增依赖时统一在根 `requirements.txt` 中添加，不要在各脚本内硬编码 `import` 而不声明依赖。
- 如需固定版本，应在 `requirements.txt` 中使用 `==` 指定具体版本号，避免上游变更导致抓取失败。
- 不要在仓库中提交 `__pycache__/`、`.ruff_cache/`、`.venv/` 等生成产物（已在 `.gitignore` 中排除）。
- 在 CI 或本地运行前确保已安装依赖：`pip install -r requirements.txt`；若使用 `scrape.py` 的自举逻辑，请确认当前用户有 pip 写入权限。
- 需要更高 GitHub API 配额时，请在运行环境中设置 `GITHUB_TOKEN` 环境变量，脚本会自动将其注入请求头。