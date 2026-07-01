# GitHub Treasure Repo

[![CI](https://github.com/allengaller/repo-hoarder/actions/workflows/ci.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/ci.yml)
[![Monthly Scrape](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-scrape.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-scrape.yml)
[![Monthly Update](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-update.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/monthly-update.yml)
[![Pages](https://github.com/allengaller/repo-hoarder/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/allengaller/repo-hoarder/actions/workflows/deploy-pages.yml)
[![Live](https://img.shields.io/badge/Live-GitHub_Pages-blue)](https://allengaller.github.io/repo-hoarder/)

全自动聚合 GitHub 优质项目的开源工具，整合 Awesome 榜单 + GitHub API + Hacker News + DEV.to 多源数据，提供智能筛选、灵感探索、收藏管理的一站式体验。

[English](README.md) · [在线访问](https://allengaller.github.io/repo-hoarder/) · [报告问题](https://github.com/allengaller/repo-hoarder/issues)

---

## ✨ 核心特性

### 🎯 智能发现
- **灵感模式** - 全屏沉浸式探索，左右滑动或键盘导航浏览项目
- **智能推荐** - 基于收藏偏好自动推荐相似优质项目
- **随机宝藏** - 随机发现意想不到的优质项目
- **飙升指数** - 发现今日增长最快的新星项目

### 🔍 强大筛选
- **多维度筛选** - 语言 / Stars / Forks / 评分范围
- **实时搜索** - 输入即显示匹配结果
- **分享筛选链接** - 一键分享当前筛选条件
- **保存预设** - 自定义筛选条件保存与加载

### 💾 收藏管理
- **本地持久化** - localStorage 存储，永不丢失
- **批量操作** - 批量收藏、批量导出
- **项目对比** - 任意两个项目并排对比
- **JSON 导出** - 收藏数据一键导出

### 🎨 优质体验
- **暗夜/白天模式** - 一键切换，自动记忆
- **中英文切换** - 中文/English 随时切换
- **PWA 离线支持** - 添加到主屏幕，离线访问
- **键盘快捷键** - 全程键盘操作，高效导航

---

## 🚀 快速开始

### 在线访问（推荐）

👉 **https://allengaller.github.io/repo-hoarder/**

> 数据由 GitHub Actions 每日自动更新

### 本地运行

```bash
# 克隆项目
git clone https://github.com/allengaller/repo-hoarder.git
cd repo-hoarder

# 安装依赖
pip install -r requirements.txt

# 抓取最新数据
python3 scripts/scrape.py

# 启动本地服务
cd web && python3 -m http.server 8000
# 访问 http://localhost:8000
```

### 数据更新

```bash
# 抓取全部数据源
python3 scripts/scrape.py

# 增量更新当月新项目
python3 scripts/update_monthly.py --year 2026 --month 5 --report
```

---

## ⌨️ 键盘快捷键

### 全局快捷键

| 快捷键 | 功能 |
|--------|------|
| `/` | 聚焦搜索框 |
| `T` | 切换主题 |
| `B` | 切换书签视图 |
| `L` | 切换语言 |
| `?` | 显示帮助 |

### 列表导航

| 快捷键 | 功能 |
|--------|------|
| `↑` / `↓` | 上/下选择项目 |
| `Enter` | 打开项目详情 |
| `Space` | 收藏/取消收藏 |
| `C` | 进入对比模式 |

### 灵感模式

| 快捷键 | 功能 |
|--------|------|
| `←` / `→` | 上/下一个项目 |
| `Space` | 收藏 |
| `Enter` | 在 GitHub 打开 |
| `F` | 翻转卡片 |
| `T` | 分享到 X |
| `P` | 自动播放 |
| `Home` / `End` | 跳到首/末项目 |
| `U` | 撤销 |
| `R` | 重做 |
| `Esc` | 关闭 |

---

## 📊 数据来源

| 来源 | 描述 | 数据量 |
|------|------|--------|
| **Awesome Lists** | vinta/awesome-python, avelino/awesome-go 等经典列表 | 8+ 列表 |
| **GitHub API** | 2026 年创建的热门项目搜索 | 1000+ 项目 |
| **Hacker News** | HN 热帖中的 GitHub 项目 | 实时抓取 |
| **DEV.to** | DEV.to 热文中的开源项目 | 实时抓取 |

---

## 🏆 评分算法

```
综合得分 = Stars + Forks + (Fork数/Stars数 × 1000) + 今日增长 × 10
```

评分综合考虑项目规模（Stars）、社区活跃度（Fork 率）、增长势头（今日增长），筛选出真正有价值的宝藏项目。

---

## 🗂️ 项目结构

```
repo-hoarder/
├── scripts/
│   ├── scrape.py           # 多源聚合爬虫
│   └── update_monthly.py   # 月度增量更新
├── tests/
│   └── test_scripts.py     # pytest 单元测试（24 用例）
├── data/
│   ├── repos.json          # 抓取的数据
│   └── monthly_report_*.md # 月度报告
├── web/
│   ├── index.html          # 主页面
│   ├── styles.css          # 样式文件
│   ├── app.js              # 前端逻辑
│   ├── sw.js               # Service Worker (PWA)
│   └── manifest.json       # PWA 清单
├── docs/
│   ├── FEATURE_PLAN.md     # 功能规划（历史）
│   ├── FIX_REPORT.md       # 修复记录（历史）
│   └── REVIEW.md           # 初始检查报告（历史）
├── .github/
│   └── workflows/
│       ├── ci.yml              # PR/推送测试
│       ├── deploy-pages.yml    # 部署到 GitHub Pages
│       ├── monthly-scrape.yml  # 月度抓取
│       └── monthly-update.yml  # 月度更新
├── requirements.txt
└── README.md / README.zh-CN.md
```

---

## 🎬 功能演示

### 灵感模式
全屏沉浸式探索，随机浏览优质项目，支持滑动、键盘导航、自动播放、撤销重做。

### 项目对比
选择任意两个项目并排对比，Stars、Forks、评分一目了然。

### 智能推荐
基于已收藏项目的语言和关键词，自动推荐相似优质项目。

### 飙升指数
按 `今日增长/Stars` 排序，发现增长最快的新星项目。

---

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| **爬虫** | Python 3 + requests |
| **前端** | 纯 HTML/CSS/JS（零依赖） |
| **离线** | Service Worker + PWA |
| **CI/CD** | GitHub Actions |
| **部署** | GitHub Pages |

---

## 📈 数据统计

当前 `repos.json` 收录：

- **项目总数**: 1900+
- **数据来源**: 4 个 (Awesome Lists, GitHub API, Hacker News, DEV.to)
- **编程语言**: 15+ (Python, JavaScript, TypeScript, Go, Rust, Java, C++ 等)
- **更新周期**: 每日自动更新

---

## 🐛 常见问题

**Q: 页面显示"无法加载数据"？**
> 请通过 HTTP 服务器访问（`python3 -m http.server 8000`），浏览器安全策略禁止 `file://` 协议下的 fetch 请求。

**Q: GitHub API 请求受限？**
> 爬虫脚本支持 `GITHUB_TOKEN` 环境变量，设置后可将请求限额从 60/hour 提升到 5000/hour。

**Q: 如何部署到自己仓库？**
> 1. Fork 本仓库
> 2. 进入 Settings → Pages → Source 选择 GitHub Actions
> 3. 推送代码后自动部署

---

## 📄 License

MIT
