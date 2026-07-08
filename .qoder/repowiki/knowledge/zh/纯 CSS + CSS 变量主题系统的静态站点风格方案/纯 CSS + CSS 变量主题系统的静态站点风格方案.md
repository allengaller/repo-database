---
kind: frontend_style
name: 纯 CSS + CSS 变量主题系统的静态站点风格方案
category: frontend_style
scope:
    - '**'
source_files:
    - web/styles.css
    - web/index.html
    - web/app.js
    - web/sw.js
    - web/manifest.json
---

## 系统概述
该仓库的前端是一个纯静态站点，位于 `web/` 目录，采用「原生 HTML + 单文件 CSS + 原生 JavaScript」架构，无任何构建工具、CSS 框架或组件库。视觉风格通过 CSS 自定义属性（CSS Variables）集中管理，实现暗色/亮色双主题切换。

## 核心文件与职责
- `web/index.html`：页面骨架，内联 SVG 图标，通过 `<link>` 引入 `styles.css`，并通过 `<script>` 加载 `app.js`；注册 Service Worker 以支持离线浏览。
- `web/styles.css`（~2574 行）：唯一样式源，按功能区块用注释分隔（Theme / Layout / Header / Filters / Repo Grid / Card / Modal / Compare / Batch / Skeleton / Animations / Responsive），全部使用 BEM 风格的类名（如 `.repo-card`、`.card-stat`、`.modal-overlay`）。
- `web/app.js`：负责数据渲染、筛选排序、收藏/对比/批量操作、键盘导航等交互逻辑。
- `web/sw.js`：Service Worker 缓存策略，使站点可离线运行。
- `web/manifest.json`：PWA Manifest，配合 SW 提供安装能力。

## 设计系统与约定
1. **CSS 变量主题**：在 `:root` 中定义暗色主题变量（`--bg`、`--bg-card`、`--text`、`--accent`、`--border` 等），通过 `[data-theme="light"]` 覆盖为亮色主题，所有颜色均通过 `var(--xxx)` 引用，无硬编码色值。
2. **字体体系**：正文使用 Google Fonts 的 `Outfit`（sans-serif），代码/数值使用 `JetBrains Mono`，通过 `<link rel="preconnect">` 预连接加速加载。
3. **布局策略**：主容器 `max-width: 1280px` 居中，卡片网格使用 `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))` 自适应列数；响应式断点集中在 `@media (max-width: 900px)` 和 `600px` 两处。
4. **动画规范**：统一使用 `ease-out` 缓动，关键帧包括 `fadeUp`（入场）、`cardIn`（卡片渐入）、`shimmer`（骨架屏）、`bookmarkPop`（收藏反馈）、`slideUp`（底部栏滑入）等，时长控制在 0.15s–0.6s 之间。
5. **图标方案**：全部使用内联 SVG（viewBox 坐标系），通过 `currentColor` 继承文本颜色，避免额外图片资源。
6. **滚动条与选中**：自定义 `::-webkit-scrollbar` 与 `::selection` 样式，保持与主题一致。

## 开发者应遵循的规则
- 新增样式一律追加到 `web/styles.css` 对应区块末尾，使用 BEM 命名（块-元素-修饰符），禁止在 HTML 中写内联 style。
- 所有颜色、字号、间距必须通过 CSS 变量引用，不得直接写十六进制色值；如需新语义色，先在 `:root` 中声明变量再使用。
- 新增组件时复制现有区块注释模板（`/* === Component Name === */`），并在 `index.html` 中保持结构语义化（header/main/footer）。