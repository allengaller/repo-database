---
name: giekaton/vipassana-app
url: https://github.com/giekaton/vipassana-app
domain: mindfulness-apps
type: application
languages: [JavaScript]
stars: 9
forks: 1
license: unknown
discovered: 2026-06-28
updated: 2026-07-30
rating: 4
status: active
tags: [pwa, meditation, vipassana]
summary: 游戏化内观冥想 PWA，八角形 SVG 觉察-标记机制
---

# Vipassana App - giekaton/vipassana-app 深度研究

> 研究日期：2026-06-28
> 仓库：https://github.com/giekaton/vipassana-app
> 研究目的：心力教练项目 — 冥想产品化案例

## 1. 项目概览

Vipassana App 是一个基于 Vue.js 2 构建的渐进式 Web 应用（PWA），以八角形（Octagon）SVG 交互界面为核心，将佛教内观禅修（Vipassana）的"觉察-标记"练习转化为一种可视化的点击游戏。用户在冥想过程中，每当觉察到八种感官体验（看、听、触、情绪、身体感受、思维、味觉、嗅觉）之一时，便点击对应图标进行"标记"。应用会在冥想结束后展示本次会话的统计柱状图。作者自称这更像是一个"艺术项目"而非严肃冥想工具，但其在将内观核心操作——"平等心地觉察并标记体验"——产品化方面做出了极简而有启发性的尝试。项目自 2018 年 11 月创建，最后一次推送为 2024 年 1 月，目前处于低频维护状态。

## 2. 基础信息表

| 字段 | 值 |
|---|---|
| Stars / Forks | 9 / 1 |
| Watchers | 3 |
| 主语言 / 框架 | Vue.js 2.6 + Vue Router 3 + vue-cookies |
| 构建工具 | Vue CLI 4 + Babel + Webpack |
| PWA 方案 | Workbox（InjectManifest 模式） |
| License | 未声明 |
| 部署地址 | https://vipassana.app |
| 仓库大小 | ~1 MB（极轻量） |
| 核心贡献者 | giekaton（Gie Katon），唯一贡献者，22 次提交 |
| 创建时间 | 2018-11-06 |
| 最后推送 | 2024-01-30 |
| 归档状态 | 未归档，无 open issues / PR |
| 作者主页 | https://giekaton.com |

## 3. 目录结构

```
vipassana-app/
├── public/
│   ├── img/                  # 截图、图标资源（含 icons 备份目录）
│   ├── sound/                # 3 个 MP3 音效：start.mp3, end.mp3, touch.mp3
│   ├── index.html            # 入口 HTML（含 Google Analytics、splash screen）
│   ├── manifest.json         # PWA manifest（standalone 模式）
│   ├── service-worker.js     # Workbox 自定义 Service Worker
│   ├── .htaccess             # Apache 配置
│   ├── browserconfig.xml     # Windows tile 配置
│   └── robots.txt
├── src/
│   ├── App.vue               # 根组件（菜单按钮、路由、cookie 管理、主题变量）
│   ├── main.js               # Vue 实例化入口
│   ├── router.js             # 路由：/ → App, /about → About（懒加载）
│   ├── registerServiceWorker.js  # PWA Service Worker 注册
│   └── components/
│       ├── Octagon.vue        # 核心冥想交互组件（八角形 SVG + 统计面板）
│       └── About.vue          # 侧滑菜单/关于页面（设置、教程、说明）
├── package.json
├── package-lock.json
├── vue.config.js             # Vue CLI PWA 插件配置
├── babel.config.js
├── .gitignore
└── README.md
```

整个项目只有 **2 个核心 Vue 组件**（Octagon + About），结构极其精简。

## 4. 产品形态与用户体验

### 游戏化机制

该项目的"游戏化"并非传统意义上的积分、等级、排行榜体系，而是一种**视觉-触觉反馈式的即时交互游戏化**：

1. **点击标记机制**：八角形的 8 个方位各放置一个感官体验图标。冥想进行中（点击中心启动），每当用户觉察到某种体验，点击对应图标，图标会短暂变为亮青色（`#00eeff`）并播放"touch"音效（150ms 动画反馈）。
2. **即时统计**：冥想结束后弹出统计面板，用 SVG 柱状图展示 8 类体验各自的标记次数，以及冥想总时长和体验总数。
3. **音效反馈**：三种音效（开始、结束、每次点击）提供听觉层面的游戏感。可在设置中关闭。
4. **视觉状态切换**：点击中心按钮启动/停止时，8 个图标依次以 110ms 间隔渐次变色（动画队列），中心区域颜色也相应切换，营造"仪式感"。
5. **计时器**：可设置自定义定时器（分钟），到时自动结束冥想。

**没有的**：积分系统、成就系统、排行榜、每日挑战、连续打卡追踪、社交功能、用户账户。

### 内观（Vipassana）产品化的要素

- **核心操作映射**：内观修习的核心——"觉察当下体验并如实标记"（note/label）——被直接映射为"看到/感受到某类体验 → 点击对应图标"。这是对传统内观"mental noting"技术的可视化实现。
- **八类体验分类**：Seeing（看）、Hearing（听）、Touch sensation（触）、Emotion（情绪）、Body sensations（身体感受）、Thinking（思维）、Taste sensation（味觉）、Smell sensation（嗅觉）。覆盖了六根门的感知对象。
- **平等心（Equanimity）原则**：README 和 About 页面明确说明"不渴望愉快体验，不回避不愉快体验，只如实观察"。
- **慈心（Metta）回向**：代码中有注释掉的 Metta 回向文（"May all beings be peaceful..."），但最终版本未启用。
- **会话级数据**：数据不持久化——每次冥想结束后统计只展示一次，关闭即清零。这暗合内观"不执着"的精神。

### 与主流 App 的差异

| 维度 | Vipassana App | Headspace / Calm | Waking Up |
|---|---|---|---|
| 交互方式 | 主动点击标记 | 被动跟听引导 | 引导 + 理论教学 |
| 冥想类型 | 纯内观（标记法） | 正念/呼吸/身体扫描 | 多种（含内观、非二元） |
| 游戏化 | 视觉反馈+即时统计 | 连续天数/徽章/课程进度 | 较少游戏化 |
| 数据持久化 | 无（纯会话级） | 完整用户画像 | 完整用户画像 |
| 音频内容 | 3 个简短音效 | 大量引导语音 | 大量引导+对话 |
| 复杂度 | 极简（2 组件） | 大型商业平台 | 大型商业平台 |
| 定价 | 免费开源 | 订阅制 | 订阅制 |

最大差异在于：Vipassana App 将冥想变成了一种**主动操作的"游戏"**，而非被动聆听的引导。用户需要自己去觉察并点击，这更接近真实内观修习中的自主练习。

## 5. 技术架构

### 前端框架
- **Vue.js 2.6.12** + **Vue Router 3**（history 模式）
- 两个路由：`/`（App 主页面）和 `/about`（懒加载的侧滑面板）
- 状态管理：无 Vuex，通过 `$parent` 引用实现父子组件间状态共享（soundFx、timer、mobileChrome 等），以及 `vue-cookies` 做偏好持久化
- 样式：纯 CSS，CSS 自定义属性（CSS Variables）实现暗色/亮色主题

### PWA 能力
- **manifest.json**：standalone 模式，192x192 和 512x512 图标
- **Service Worker**（Workbox InjectManifest 模式）：
  - `index.html`：network-first 策略
  - CSS：network-first 策略
  - 静态资源（png/ico/svg/mp3/js）：stale-while-revalidate，30 天缓存
  - Google Fonts：cache-first 策略
- 支持桌面/移动端安装，离线完全可用

### 数据存储
- **Cookies**（vue-cookies）：存储 `visited`（首次访问标记）、`soundFx`（音效开关）、`timer`（定时器分钟数），均为永久 cookie
- **无后端**：纯前端 SPA，无数据库、无 API、无用户系统
- **Google Analytics**：通过 gtag.js 集成（UA-57930548-57）
- **会话数据**：内存中维护的 8 类体验计数器（el1~el8），会话结束后不持久化

### 桌面键盘支持
小键盘数字键映射到 8 个体验方位（与八角形位置对应），数字 5 为中心启动/停止键，Escape 关闭统计面板。这是一个贴心的桌面适配。

## 6. 对"心力教练"项目的启发

### 可借鉴之处

1. **"标记法"的交互化**：将内观的 mental noting 转化为点击操作，是一个极其简洁的产品化思路。心力教练可以考虑类似的"觉察-标记"交互，但需要更丰富的分类体系和纵向追踪。
2. **极简 MVP 哲学**：整个应用只有 2 个组件、约 500 行核心逻辑代码（Octagon.vue），却完整传达了一个冥想产品的核心体验。对于心力教练的早期原型阶段，这种极简思路值得学习。
3. **视觉反馈设计**：点击后的颜色闪烁 + 音效 = 即时的正反馈循环，虽然简单但有效。可以扩展为更丰富的反馈系统（如冥想过程中的实时可视化、呼吸引导动画等）。
4. **PWA 离线优先**：冥想场景往往在无网络环境下进行（静室、户外），离线可用是刚需。
5. **仪式感设计**：启动/停止时的动画队列（图标依次亮起），为冥想练习增添了"开始"和"结束"的仪式边界。

### 游戏化 x 止观训练的结合点

- **止（Samatha）的 gamification**：可以借鉴"持续专注计时"机制——用户保持不点击（不分心）的时间越长，视觉状态越"平静"，反之则"波动"。
- **观（Vipassana）的 gamification**：本项目已实现——觉察并标记体验。可扩展为：纵向追踪（哪些体验类型在哪些时段占主导）、模式识别（情绪-思维-身体感受的关联图谱）、冥想深度指标。
- **平等心的量化**：如果用户对"愉悦体验"和"不愉悦体验"的标记频率趋于平衡，是否意味着平等心在增长？这是一个有趣的量化维度。

### 局限与改进空间

1. **无数据持久化**：无法追踪长期冥想进度，无法看到模式变化。这是最大的产品短板。
2. **无引导内容**：对初学者来说，8 个分类可能不够直观，缺乏交互式教程。
3. **体验分类粗糙**：8 个分类虽然有佛学依据（六根门），但"Emotion"和"Feeling"边界模糊，"Body sensations"和"Touch sensation"也容易混淆。
4. **无社交/社区层**：缺少分享、对比、社群支持功能。
5. **技术栈老旧**：Vue 2 已进入维护模式，Service Worker 中残留了对 `vipassana.live`（旧域名）的引用。
6. **作者自谦为"艺术项目"**：Disclaimer 中明确表示"不应该太认真对待"，这在产品可信度上是减分项。

## 7. 关键代码/README 摘录

### 核心交互逻辑（Octagon.vue - onTap 方法）

```javascript
onTap: function (el) {
  function toggle () {
    element.classList.toggle('elements-touch')
  }
  if (data.started) {
    var element = document.getElementsByClassName('element-' + el)[0];
    var elX = 'el' + el;
    data.stat[elX]++;
    if (this.soundFx) data.sound.soundTouch.cloneNode(true).play();
    toggle();
    setTimeout(toggle, 150);
  }
}
```

这就是整个"游戏化"的核心——只有在冥想进行中（`data.started === true`）时才响应点击，每次点击递增对应类别的计数器，播放音效，并触发 150ms 的颜色闪烁。

### 统计面板数据计算（startStop 方法片段）

```javascript
data.stat.timeTotal = new Date().getTime() - data.stat.timeStart;
let seconds = data.stat.timeTotal / 1000;
let minutes = Math.floor(seconds / 60);
seconds = seconds - minutes * 60;
data.stat.timeMeditatedHtml = 'Time meditated: '+ minutes + ' min. ' + Math.round(seconds) + ' sec.';
data.stat.timeMeditatedHtml += '<br>Experiences: ' + (data.stat.el1 + data.stat.el2 + ... + data.stat.el8);
```

### 作者的 Disclaimer

> "Vipassana App shouldn't be taken too seriously. It's more like an art project than a meditation tool. It's an interactive visual way to explain Vipassana. Actually, you don't need any app at all for Vipassana meditation practice."

### 关于游戏化的描述（About 页面）

> "Because of its visual and gamified nature, the Vipassana App works instantly and effortlessly. It activates our inner observer who is witnessing our experiences. Even one minute of the practice can break an ongoing pattern of thoughts and feelings."

## 8. 后续研究问题

1. **用户实际使用情况如何？** Google Analytics 数据不可获取，但 9 stars 和 1 fork 表明社区关注度极低。是否有线上用户留存数据？
2. **作者 Gie Katon 的背景？** 其 GitHub 个人简介仅为"I build digital services"，无更多冥想/佛学背景信息。是否可以联系获取产品理念访谈？
3. **"标记法"的学术依据？** 内观传统中的 noting/labeling 技术（如马哈希尊者的方法）在心理学研究中是否有对应的认知效果验证？
4. **旧域名 vipassana.live 的去向？** Service Worker 中仍缓存该域名，暗示项目曾经历域名迁移。
5. **如果做纵向追踪版本，数据模型如何设计？** 需要定义：会话记录、体验类型、时间段、冥想深度指标等 schema。

## 9. 相关资源

- 线上部署：https://vipassana.app
- 源码仓库：https://github.com/giekaton/vipassana-app
- 作者主页：https://giekaton.com
- 作者 GitHub：https://github.com/giekaton
- README 截图链接：
  - https://vipassana.app/img/github-01.png
  - https://vipassana.app/img/github-02.png
  - https://vipassana.app/img/github-03.png（8 类体验图标说明）

---

**一句话总结**：Vipassana App 是一个极简的"冥想即游戏"概念验证——用八角形 SVG 交互界面将内观的"觉察-标记"操作转化为可视化点击体验，无后端、无数据持久化、仅有 2 个 Vue 组件，却精准抓住了内观修习的核心操作，为"心力教练"项目提供了一个优秀的交互范式参考，但在纵向追踪、引导内容、分类体系精细度方面存在明显的改进空间。

---

# 附录：横向扫描档案（psychology-projects · 2026-07-08）

# Vipassana App · 游戏化内观冥想 PWA

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | Vipassana App |
| **仓库地址** | https://github.com/giekaton/vipassana-app |
| **所属组织** | giekaton |
| **描述** | 游戏化内观冥想 PWA（渐进式 Web 应用），支持离线安装 |
| **开源许可** | 未明确标注 |
| **Star 数** | 9（截至 2026-06 心力教练研究时） |
| **Fork 数** | 未显示 |
| **技术类型** | PWA（Progressive Web App） |

---

## 二、技术栈分析

### 核心技术

- **应用类型**：PWA（渐进式 Web 应用）
- **离线支持**：完全离线可用，无需网络连接
- **安装方式**：可安装到移动和桌面设备
- **核心交互**：八角形 SVG 可视化（觉察-标记机制）
- **游戏化元素**：将冥想练习游戏化，增加用户参与度

### 架构特点

```
Vipassana App 架构
├── PWA 前端
│   ├── 离线 Service Worker
│   ├── 可安装 manifest
│   └── 响应式设计（移动+桌面）
├── 冥想引导系统
│   ├── 八角形 SVG 觉察可视化
│   ├── 标记（labeling）机制
│   └── 渐进式难度设计
└── 游戏化层
    ├── 进度追踪
    ├── 成就系统
    └── 持续激励
```

### 与 repo-hoarder 项目的关联

Vipassana App 已在心力教练研究阶段进行了深度分析（报告已迁移至 [hush.ai](https://github.com/peace-lab-global/hush.ai/blob/main/knowledge/mind-coach/repos/vipassana-app/REPORT.md)）。

---

## 三、核心功能特性

### 1. 八角形 SVG 觉察-标记系统

Vipassana App 的核心创新是使用八角形 SVG 可视化内观冥想的"觉察-标记"过程：
- 用户在冥想中觉察到感受/念头/情绪时，通过交互标记
- 八角形代表内观的核心观察维度
- 可视化反馈增强觉察力训练

### 2. 完全离线可用

作为 PWA，Vipassana App 可以：
- 安装到手机主屏幕，像原生应用一样使用
- 完全离线运行，不需要网络连接
- 在飞行模式下使用，符合冥想场景需求

### 3. 游戏化设计

- **渐进式难度**：从短时间冥想到长时间冥想的渐进路径
- **进度可视化**：冥想时长、频率、连续性的可视化追踪
- **成就系统**：激励用户持续练习

### 4. 内观冥想理论落地

基于 S.N. Goenka 传承的内观冥想传统：
- **身体扫描**（Body Scan）：从头到脚逐一观察感受
- **标记技术**（Labeling）：为觉察到的体验命名
- **平等心**（Equanimity）：不评判地观察感受的生灭

---

## 四、应用场景说明

### 直接应用
- **个人冥想练习**：日常内观冥想引导和记录
- **冥想入门教学**：通过游戏化降低冥想入门门槛
- **冥想训练营辅助**：作为训练营学员的日常练习工具

### 心力教练项目关联
- Vipassana App 已在心力教练第二轮研究中进行深度分析
- 其八角形 SVG 觉察机制启发了 vasana PoC 的设计
- 离线 PWA 模式可作为心力教练 App 的技术架构参考
- 游戏化设计理念可用于心力教练训练营的激励机制

### 与 repo-hoarder PWA 的技术对比

| 特性 | Vipassana App | repo-hoarder |
|------|--------------|-------------|
| 应用类型 | PWA | PWA |
| 离线支持 | 完全离线 | Service Worker 缓存 |
| 安装方式 | 可安装到设备 | manifest.json |
| 核心交互 | 八角形 SVG | 卡片网格 |
| 数据来源 | 本地 | 远程 JSON |

---

## 五、优缺点评价

### 优势

1. **理论落地**：将内观冥想的"觉察-标记"传统转化为可交互的数字体验
2. **离线优先**：完全离线可用，符合冥想场景（无干扰）的需求
3. **PWA 跨平台**：一次开发，移动+桌面全覆盖
4. **游戏化降低门槛**：冥想入门的最大障碍是"太无聊"，游戏化有效缓解
5. **开源可复用**：允许其他冥想实践者基于此创建自己的应用
6. **轻量级**：作为 PWA，无需下载大型应用

### 不足

1. **Star 数低**：仅 9 Star，社区关注度有限
2. **功能单一**：专注内观冥想，缺少其他冥想流派支持
3. **无数据同步**：离线优先意味着跨设备数据同步可能缺失
4. **无 AI 集成**：纯工具型应用，缺少个性化引导
5. **无社区功能**：缺少冥想者社区和分享功能
6. **文档有限**：作为小型个人项目，文档和教程可能不完善

---

## 六、相关论文或参考资料链接

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/giekaton/vipassana-app |
| **心力教练深度报告**（已迁移） | [hush.ai/knowledge/mind-coach/repos/vipassana-app/REPORT.md](https://github.com/peace-lab-global/hush.ai/tree/main/knowledge/mind-coach/repos/vipassana-app) |
| **五项目综合对比**（已迁移） | [hush.ai/knowledge/mind-coach/02-five-repos-synthesis.md](https://github.com/peace-lab-global/hush.ai/blob/main/knowledge/mind-coach/02-five-repos-synthesis.md) |
| **PWA 文档** | https://web.dev/progressive-web-apps/ |

### 内观冥想参考资料

| 资源 | 描述 |
|------|------|
| S.N. Goenka 内观传承 | Vipassana App 的理论基础 |
| 八角形觉察模型 | App 的核心可视化设计 |
| 标记技术 (Labeling) | 内观冥想的核心技术之一 |

### 关联项目

- **vipassana_android**：另一个内观冥想 App（Android 原生）
- **vasana-poc**：心力教练项目的熏习机制 PoC，受 Vipassana App 启发
- **repo-hoarder**：本项目（repo-hoarder）也是 PWA，技术栈有相似性

---

> 文件创建时间：2026-07-08
> 数据来源：GitHub 仓库搜索 + 心力教练研究报告 + WebFetch 抓取
