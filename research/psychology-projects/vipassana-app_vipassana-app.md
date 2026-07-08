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
