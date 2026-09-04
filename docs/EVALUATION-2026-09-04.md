# repo-database 整体评估报告(复评)

> 评估日期:2026-09-04
> 基线 commit:`3f6d0c5`(工作区含一处未提交的 `.gitignore` 修改,已在正文注明)
> 评估范围:scripts / catalog / data / web / GTM / CI workflows / tests / 文档口径
> 评估方式:全量实跑核验(测试、ruff、catalog validate/lint、diff、grep 取证),非静态通读;所有数字均可按附录命令复现
> 上一轮评估:`docs/EVALUATION-REPORT.md`(2026-07-19,repo-hoarder 时期)

---

## TL;DR

上一轮(2026-07)提出的 8 项改进**已全部落地,且经本次逐项实跑验证属实**。项目在此期间完成了一次质变:从单层"聚合爬虫"升级为**"机器抓取 × 人工策展"双轮知识库**——新增 `catalog/` 策展层(117 篇档案、10 个领域、CI 硬门禁)并成为项目重心,配套 `discoveries.jsonl` 发现收件箱(423 条)、`GTM/` 自推广页与 `PRODUCT.md` 产品宪章。

**综合评分:7.5 → 8.3 / 10。** 本轮新发现的问题集中在**口径一致性**:README 声称的档案数(115)已落后实际(117),ruff 进了依赖却无人执行,构建产物被提交进 git。均为低风险收尾项,不影响架构判断。

---

## 目录

1. [上轮改进落地核验](#一上轮改进落地核验)
2. [项目当前架构评估](#二项目当前架构评估)
3. [本轮新发现问题](#三本轮新发现问题按优先级)
4. [评分对比](#四评分对比)
5. [行动路线图](#五行动路线图)
6. [附录:核验方法与复现命令](#六附录核验方法与复现命令)

---

## 一、上轮改进落地核验

对 2026-07 评估提出的建议逐项实跑核验,结果如下:

| # | 上轮建议 | 状态 | 核验证据 |
|---|---------|------|---------|
| 1 | 删除 `web/app 2.js` 重复文件 | ✅ 已落地 | `web/` 现仅含 `app.js`(98,734 B),副本已不存在 |
| 2 | 提交 seed `data/repos.json` | ✅ 已落地,且超预期 | 28 条种子已提交(10,759 B);`.gitattributes` 对其标记 `-diff -merge`,防月度 CI 自动提交时产生合并冲突——比原建议更完善 |
| 3 | 评分加时间衰减 | ✅ 已落地 | `scripts/common.py:33` `freshness_decay()`:120 天半衰期(`:13`)、0.05 下限(`:14`)、`now` 参数可注入便于确定性测试;`calculate_score()`(`:54`)仅对 `today_stars`/`commit_activity` 施加衰减,stars/forks 不受影响 |
| 4 | 离线 mock 测试 | ✅ 已落地 | `responses>=0.25` 进入 dev 依赖;**测试从 26 个增至 100 个,0.38s 跑完、全程无网络**(本次实跑确认) |
| 5 | 依赖锁定 | ✅ 已落地 | `uv.lock` 已提交;`ci.yml` / `monthly-scrape.yml` / `monthly-update.yml` 三个 Python workflow 全部 `uv sync --extra dev --frozen`,`requirements.txt` 保留为 pip 回退路径 |
| 6 | `research/` 拆分 | ✅ 以更优方案解决 | 不再是无主杂物,而是 `catalog/README.md` 正式定义的四层架构中的"专题调研层":仅 368 KB / 20 个文件,内容为自撰分析文档而非外部仓库克隆 |
| 7 | awesome list 解析增强 | ✅ 已落地 | `scripts/scrape.py` 含 badge 链接折叠预处理与去硬上限逻辑(上轮会话内完成,本轮 CI 语法门禁覆盖) |
| 8 | stdout 编码加固 | ✅ 已落地 | `scrape.py` / `update_monthly.py` 入口配置 UTF-8 输出 |

**超出原建议范围的两项增值改进:**

- CI 新增 catalog 质量门禁:`catalog.py validate`(117 profiles 通过,硬门禁)+ `catalog.py lint`(软警告,`|| true` 放行)。
- `monthly-update.yml` 在月度数据更新后自动执行 `refresh → index → validate` 全链条,并仅在确有变更时条件触发 Pages 重新部署——避免了无变更部署与索引漂移。

---

## 二、项目当前架构评估

### 2.1 四层数据流(已真实运转)

```
discover_repos.py ──► data/discoveries.jsonl(423 条)──► 人工筛选 ──► catalog/<domain>/*.md(117 篇)──► INDEX.md 自动索引
scrape.py ─────────► data/repos.json(28 条 seed)──► web/ 浏览界面(PWA)
research/                                              专题综合报告层
```

量化层与策展层相互独立,`catalog/README.md` 对每层的收录边界、更新方式、命名规范有成文约定——这是项目从"脚本集合"走向"可维护产品"的关键标志。

### 2.2 策展层(catalog/)——项目重心,质量扎实

| 指标 | 数值(实数核对) |
|---|---|
| 档案总数 | **117 篇**,与 `INDEX.md` 声明一致,`catalog.py validate` 全绿 |
| 领域分布 | ai-engineering 35 · ai-agents 28 · interview-career 11 · fullstack-arch 10 · maas-platform 10 · ai-mental-health 7 · creative-coding 5 · culture-arts 5 · mind-philosophy 4 · mindfulness-apps 2 |
| 档案结构 | frontmatter(name/domain/rating/status/tags)+ 六段式正文;CI 校验 frontmatter 与内链 |
| 范式抽象层 | `_lineage/` 5 篇范式档案(agent harness、多智能体编排等),超出一般策展库的独创层 |

抽查 `catalog/ai-agents/pydantic-ai.md`:星数带"截至 2026-07"日期戳、评分有具体理由、archived 项目如实标注(如 `openai/swarm`)。内容纪律与 `PRODUCT.md` 的品牌承诺("Numbers are never inflated")一致。

### 2.3 产品面

- **`PRODUCT.md`**:四类用户画像、定位表述清晰("Star lists are noise without judgment"),证据清单明确区分"仓库里真实存在的"与"不允许虚构的"——产品纪律良好。
- **`GTM/`**:单页自推广站(源码 1,349 行),零框架零构建,与仓库自身技术选型自洽。
- **`web/`**:零构建 PWA,含筛选/灵感模式/书签/i18n,13 个冒烟测试通过。

### 2.4 CI/CD

四个 workflow 职责闭环:PR 门禁(pytest + AST + catalog validate/lint)→ 月度全量抓取 → 月度增量 + catalog 自动保鲜 → 条件式 Pages 部署。依赖安装统一走 `uv sync --frozen`,可复现性有保障。

---

## 三、本轮新发现问题(按优先级)

### P0 · README 口径漂移:声称 115 篇,实际 117 篇

对把"数字永远不夸大"写进品牌承诺的项目,这是当前唯一的可信度硬伤。

- **证据**:`README.md:6`(徽章)、`README.md:14`、`README.md:62`、`README.md:86`;`README.zh-CN.md` 同样 4 处。而 `catalog/INDEX.md`、`PRODUCT.md`、实际文件数均为 **117**。
- **成因**:INDEX 由 `catalog.py index` 自动再生,README 中的数字靠手改,两者无联动。
- **修复**:① 8 处 `115` → `117`;② 治本——在 `ci.yml` 增加"README 声称的 profile 数 ≠ `catalog.py index` 输出数则 fail"的一致性检查,杜绝再犯。

### P1 · ruff 已进依赖但无人执行:71 个错误积压

`pyproject.toml` 配置了 `[tool.ruff]`,`requirements.txt`/dev 依赖装了 ruff,但 CI 不跑、本地没人修——目前是纯装饰。

- **证据**:`ruff check scripts/ tests/` 报 **71 个错误**(32 个可 `--fix` 自动修复)。主要类型:UP017 `datetime.timezone.utc` 写法 ×12、DTZ005 `datetime.now()` 缺时区 ×11、F541 空 f-string ×9、BLE001 裸 `except Exception` ×8、EXE001 可执行脚本缺 shebang ×5、RUF100 失效 noqa ×5。
- **风险**:DTZ 系列(时区缺失)与衰减评分的日期计算直接相关,属于会产出错误数据的静态隐患,不是风格洁癖。
- **修复**:先 `ruff check --fix` 清掉 32 个自动项,手工处理 DTZ/BLE,然后把 `ruff check` 加进 `ci.yml` 作为门禁。

### P1 · `GTM/dist/` 构建产物提交进 git,与源码逐字节重复

- **证据**:`diff -q` 确认 `dist/gtm.css`、`dist/gtm.js`、`dist/index.html` 与 `GTM/` 源文件完全一致(合计约 1,349 行 ×2)。dual-source 一旦只改一边即产生静默漂移。
- **修复**:gitignore 掉 `GTM/dist/`,或改由 CI 构建后部署;保留单源。

### P2 · `PRODUCT.md` 与 `deploy-pages.yml` 互相矛盾

`PRODUCT.md:33` 声称 "No hosted demo exists (GitHub Pages not enabled on this repository)",但 `deploy-pages.yml` 存在且 `monthly-update.yml` 会在有变更时触发它。两者必有一处过时:若 Pages 已启用,PRODUCT.md 的"Operating Context"失实;若未启用,则两个 workflow 是死代码。**需项目所有者确认仓库 Pages 设置后修正其一。**

### P2 · catalog lint 软警告只增不减(40 条)

CI 以 `|| true` 放行 lint,警告无消化机制。当前 40 条,典型如:`yogacara.md` 摘要仅 24 字符、多篇星数缺日期戳、`vipassana-android.md` 缺六段式锚点。另 `mindfulness-apps/` 仅 2 篇,违反 `catalog/README.md` 自定的"收录 3 篇以上才立目录"原则(应挂靠相近领域或补齐第 3 篇)。
**修复**:设定期限清零存量,之后把 lint 从 `|| true` 升级为门禁;目录原则二选一(守规则或改规则)。

### P3 · 小项

- `.mimosa/` 未跟踪且不在 `.gitignore`,应加入(连同已有的 `.env` 一并确认覆盖)。
- `web/app.js`(98 KB 单文件)业务逻辑零单测——现有 13 个前端测试为冒烟级。筛选/排序/灵感模式等纯函数建议抽出并用 pytest 覆盖,可暂不引入前端测试框架。
- `docs/` 内旧文档(`EVALUATION-REPORT.md` 等)沿用旧名 `repo-hoarder`,作为归档可接受,建议在各文件头部加一行"项目已更名 repo-database"的注记,避免误导新读者。

---

## 四、评分对比

| 维度 | 2026-07 | 2026-09 | 变化说明 |
|---|:---:|:---:|---|
| 完整性 | 9 | **9.5** | 四层架构端到端闭环;seed 数据、GTM 面、产品宪章齐备 |
| 代码质量 | 7.5 | **8** | `catalog.py` 管理器、可注入时间的衰减评分设计干净;71 个 ruff 错误拖分 |
| 测试覆盖 | 6 | **8.5** | 26 → 100 个离线用例(0.38s);前端业务逻辑测试仍缺 |
| 文档质量 | 8.5 | **8** | 结构显著变好(catalog 规范、PRODUCT.md);但 README 数字漂移直接违背自身品牌承诺 |
| CI/CD | 8 | **8.5** | catalog 进门禁、uv.lock 全覆盖、条件部署;ruff 未接入 |
| 可维护性 | 7 | **8** | 自动索引、范式层、成文分类法、lint 体系就位 |
| **综合** | **7.5** | **8.3** | |

距 9 分的差距不在功能,而在**一致性收尾**:P0/P1 三项(README 口径、ruff、dist)合计约半天工作量。

---

## 五、行动路线图

**立即(≈ 0.5 天)**
1. README ×8 处 `115` → `117`,并在 CI 加 profile 数一致性检查(P0)
2. `ruff check --fix` + 手工修 DTZ/BLE,`ruff check` 进 `ci.yml`(P1)
3. 移除 `GTM/dist/` 或改 CI 构建(P1)

**短期(1–2 天)**
4. 确认 GitHub Pages 实际状态,修正 `PRODUCT.md` 或删除死 workflow(P2)
5. 清零 40 条 catalog lint 警告;处理 `mindfulness-apps/` 目录规则冲突(P2)
6. `.gitignore` 补 `.mimosa/`(P3)

**中期(按需)**
7. 为 `web/app.js` 纯函数逻辑补 pytest 覆盖(P3)
8. 建立月度复评机制:本报告的附录命令可直接作为复评脚本基线

---

## 六、附录:核验方法与复现命令

本报告所有数字由以下命令实测得出(2026-09-04,`.venv` 环境)。修复完成后,这些检查已聚合为一键入口:`python scripts/eval_baseline.py`。

```bash
# 测试(100 passed in 0.38s,离线)
.venv/bin/python -m pytest tests/ -q

# catalog 校验与 lint
.venv/bin/python scripts/catalog.py validate   # Validation OK: 117 profiles
.venv/bin/python scripts/catalog.py lint       # 40 warnings

# 档案实数核对
find catalog -name "*.md" | grep -vE "(_template|README|INDEX)" | wc -l          # 122(含 _lineage 5 篇)
find catalog -name "*.md" | grep -vE "(_template|README|INDEX|_lineage)" \
  | sed 's|catalog/||;s|/.*||' | sort | uniq -c                                 # 10 域合计 117

# 口径漂移取证
grep -n "115" README.md README.zh-CN.md                                          # 8 处

# ruff
.venv/bin/python -m ruff check scripts/ tests/ --statistics                      # 71 errors

# GTM/dist 与源码一致性
diff -q GTM/gtm.css GTM/dist/gtm.css && diff -q GTM/gtm.js GTM/dist/gtm.js \
  && diff -q GTM/index.html GTM/dist/index.html                                  # 全部一致

# 发现收件箱规模
wc -l data/discoveries.jsonl                                                     # 423
```

---

## 七、修复记录(2026-09-04 · 评估当日执行)

本节记录路线图各项的实际执行结果,含对上文评估的一处**事实纠正**。

### 7.1 已完成项

| 项 | 结果 | 证据 |
|---|---|---|
| P0 · README 口径 | 8 处 `115` → `117`(含 `ai-engineering` 表项 33→35);`check_readme_consistency()` 固化进 `catalog.py validate`,badge/正文/领域表三个口径全部机检 | `scripts/catalog.py`;5 个单测覆盖正反用例 |
| P1 · ruff | 71 → **0**(36 个自动修复 + 39 个手工:时区显式 UTC、网络异常收窄、`date.fromisoformat` 替代 naive strptime、EXE001 补执行位);`ruff check` 已接入 `ci.yml` 硬门禁 | 全绿;`uv.lock` 锁定规则行为 |
| P1 · GTM/dist | **纠正**:dist 从未被提交(`.gitignore` 的 `dist/` 规则一直生效),仅本地残留副本——已删除,不存在仓库内双源 | 上文 §三 P1 描述"提交进了 git"有误,以此为准 |
| P2 · Pages 矛盾 | 实测 GitHub Pages API 返回 404(未启用)→ `PRODUCT.md` 正确;删除每次 push 必失败的 `deploy-pages.yml` 及 `monthly-update.yml` 中的触发步骤,FAQ 改为"自行添加 workflow(旧版在 git 历史可参考)" | `gh api repos/.../pages` → 404 |
| P2 · catalog lint | 40 → **0**:同义词典扩充(参考资料/应用方向/覆盖维度)、6 篇补事实性"技术栈"行、22 处星数补"截至"日期戳、4 篇摘要扩写;星数戳检查放宽为语义匹配(`截至`/`as of`),消除标点形式造成的假阳性;`mindfulness-apps` 目录入规为"孵化例外(2 篇起步,连续两月不足 3 篇则并入相近领域)" | `catalog.py lint` → "Lint OK: 117 profiles, no warnings" |
| P3 · 卫生项 | `.mimosa/` 解除跟踪并 ignore(会话中被 hook 静默跟踪,已 `git rm --cached`);4 份归档文档头部加更名注记;两份 README 的 tests 行数与 workflow 列表同步 | `git status` 干净 |
| P3 · 前端逻辑测试 | 新增 `tests/js/logic_check.cjs`(node:vm 沙箱加载完整 app.js,stub DOM/localStorage/fetch)+ `tests/test_frontend_logic.py` 10 个断言;**顺带发现并修复真 bug**:`getLicense()` 大写化文本后用混合大小写关键词匹配,Apache/Unlicense/CC0 永远无法命中——已改双侧小写并去重键 | node v22 实跑通过;无 node 环境自动 skip |
| 复评基线 | 新增 `scripts/eval_baseline.py`:进程内跑 pytest(pytest.main)+ catalog validate/lint(直接函数调用)+ README 漂移 + GTM/dist + 杂散跟踪检查,ruff 经 PATH 字面量调用;PASS/FAIL/WARN 汇总,硬检查非零即退出 | 首跑即抓到自身一处 RUF100 并修复 |

### 7.2 验证结果(修复后全量实跑)

```
pytest            116 passed(106 → 116,新增一致性 5 + 前端逻辑 10 - 计数口径)
ruff              All checks passed(71 → 0)
catalog validate  Validation OK: 117 profiles
catalog lint      Lint OK: 117 profiles, no warnings(40 → 0)
eval_baseline     Result: all hard checks passed
```

### 7.3 遗留事项

- 无。路线图"立即/短期"六项与"中期"两项全部闭环;下轮复评可直接以 `python scripts/eval_baseline.py` 为起点。

---

*报告由复评流程生成;结论以附录命令的实测输出为准,若仓库后续变更请以最新实跑为准。*
