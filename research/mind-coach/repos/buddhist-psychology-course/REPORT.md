# Buddhist Psychology Course - FrankNavratil/buddhist-psychology-course 深度研究

> 研究日期：2026-06-28
> 仓库：https://github.com/FrankNavratil/buddhist-psychology-course
> 研究目的：心力教练项目 -- 佛教心理学课程开源参考

---

## 1. 项目概览

**FrankNavratil/buddhist-psychology-course** 是自然医学博士 Frank Navratil 创建的仓库，用于托管其 **"Middle Way Mind Training"（中道心智训练）** 体系下的佛教心理学完整课程宣传页。该仓库于 2026 年 3 月 11 日创建，截至研究日期仅有 1 次提交、1 个 star、0 个 fork。

**核心发现：该仓库并非开放的课程内容本身，而是一个自包含的 HTML 课程销售/宣传页面。** 课程本体为付费产品（原价 $795 USD，现价 $495 USD），以单个 HTML 文件形式交付，可在浏览器离线学习。仓库中不含 Markdown 课件、PDF 讲义、视频或任何可自由引用的课程正文。

尽管如此，其 30 模块的完整大纲结构、三级递进设计和 IPHM 认证体系，对心力教练项目具有重要的架构参考价值。

---

## 2. 基础信息表

| 字段 | 值 |
|---|---|
| 仓库名 | FrankNavratil/buddhist-psychology-course |
| 描述 | Course in Buddhist Psychology |
| 主语言 | HTML |
| 创建日期 | 2026-03-11 |
| 最后更新 | 2026-06-05 |
| Star / Fork | 1 / 0 |
| License | 无（未声明） |
| 默认分支 | main |
| 文件数量 | 2 个 HTML 文件 |
| 作者 | Dr. Frank Navratil（自然医学博士） |
| 作者网站 | www.franknavratil.com |
| 作者邮箱 | frank.navratil@volny.cz |
| 认证机构 | IPHM (International Practitioners of Holistic Medicine) |
| 发证机构 | Return to Health International College of Natural Medicine |
| 课程价格 | $495 USD（原价 $795） |
| 课程交付 | 单个 HTML 文件，浏览器离线阅读 |

---

## 3. 课程结构（最重要）

### 3.1 三级架构，30 模块

课程分为三个层级（Levels），每级 10 个模块，共 30 个模块。每级结束后有考试（前两级为学期考试 Term Exam，第三级为结业考试 Final Exam）。

| 层级 | 名称 | 模块编号 | 核心主题 |
|---|---|---|---|
| **Level 1** | Buddhist Psychology 1: Foundations（基础） | M1-M10 | 初心、直接经验、佛教与西方心理学的对话、佛陀作为心理学家、四圣谛、八正道、三法印、无常、无我、正念与觉知 |
| **Level 2** | Buddhist Psychology 2: The Psychology of Suffering & Mind（苦与心的心理学） | M11-M20 | 苦的本质、贪爱与执取、嗔恨与抗拒、无明与痴、五蕴、佛教心智模型、五盖、善与不善心所、缘起、业与条件作用 |
| **Level 3** | Buddhist Psychology 3: Practice, Transformation & Integration（实修、转化与整合） | M21-M30 | 止禅（Samatha）、观禅（Vipassana）、四念处、慈心与悲心、随喜与舍、佛教心理学的临床应用、正念干预、与困难情绪工作、伦理与幸福心理学、整合与持续修行 |

### 3.2 涵盖的佛教传统

从大纲的巴利语术语使用来看（Anicca、Anatta、Tanha、Upadana、Avijja、Moha、Skandhas、Nivaranas、Paticca Samuppada），课程**以上座部（Theravada）传统为核心基础**。同时，四无量心（Metta、Karuna、Mudita、Upekkha）的独立模块设置兼顾了大乘佛教的慈悲维度。但**未见明确的藏传佛教或唯识学派（Yogacara）内容** -- 没有阿赖耶识、八识、种子等概念模块。

### 3.3 与现代心理学的对接

- **Module 3** 专门处理 "From Freud to Mindfulness: The Evolution of Western Psychology and the Buddhist Turn" -- 从弗洛伊德到正念的西方心理学演化史
- **Module 26** "Buddhist Psychology in Clinical Practice" -- 佛教心理学的临床应用
- **Module 27** "Mindfulness-Based Interventions" -- 正念干预（对接 MBSR/MBCT 等循证体系）
- **Module 28** "Working with Difficult Emotions" -- 与困难情绪工作（对接情绪调节/创伤知情的临床实践）
- 目标受众明确包括心理咨询师、心理治疗师、社工等临床从业者

### 3.4 实修练习

课程包含明确的实修模块：
- **止禅（Samatha）与观禅（Vipassana）** 各设独立模块（M21、M22）
- **四念处**（M23）作为系统正念框架
- **四无量心**（M24、M25）作为慈悲修习
- 但仓库中**不含实修引导音频、冥想脚本或练习手册** -- 这些内容应在付费课程 HTML 文件内部

---

## 4. 目录结构

```
buddhist-psychology-course/
├── index.html                                    # 空文件（原为 index.html.html 重命名）
└── buddhist-psychology-advertisement-final.html  # 12.3 MB 自包含课程宣传页
                                                  # 内嵌 base64 图片，可在浏览器离线打开
```

仓库极其精简：仅 2 个文件，1 次提交（`98d599d Rename index.html.html to index.html`）。课程本体（30 模块完整内容）以单个大型 HTML 文件交付，不在此开源仓库中。

---

## 5. 核心内容摘要（逐模块）

### Level 1: Foundations（基础篇，M1-M10）

- **Beginner's Mind（初心）**：以开放、不带预设的心态进入学习，禅宗"初心"概念
- **Direct Experience（直接经验）**：强调直接认知而非概念化理解，呼应现象学方法
- **From Freud to Mindfulness（从弗洛伊德到正念）**：西方心理学发展脉络梳理，以及佛教心理学的"转向"
- **The Buddha as Psychologist（佛陀作为心理学家）**：将佛陀定位为心的科学研究者而非宗教创始人
- **Four Noble Truths（四圣谛）**：苦、集、灭、道 -- 作为心理学诊断-治疗框架
- **Noble Eightfold Path（八正道）**：系统性修行路径，涵盖正见到正定
- **Three Universal Characteristics（三法印）**：无常、苦、无我 -- 存在的三个基本特征
- **Impermanence / Non-Self（无常/无我）**：各自独立深入，Anatta（无我）是佛教心理学最独特的自我观
- **Mindfulness and Awareness（正念与觉知）**：作为核心修行方法和心理学工具

### Level 2: The Psychology of Suffering（苦的心理学篇，M11-M20）

- **Dukkha（苦的本质）**：不仅是"痛苦"，而是存在的不满足性与根本不安
- **Tanha & Upadana（贪爱与执取）**：渴望-抓取的心理链条，成瘾与 compulsive behavior 的佛教解读
- **Aversion & Resistance（嗔恨与抗拒）**：回避-排斥的心理模式，与焦虑/恐惧的关系
- **Avijja & Moha（无明与痴）**：认知扭曲的根本层面，不是"不知道"而是"错误地知道"
- **Five Aggregates / Skandhas（五蕴）**：色受想行识 -- 佛教的"自我"解构模型
- **Buddhist Model of Mind（佛教心智模型）**：阿毗达摩（Abhidhamma）式的心-心所分析
- **Five Hindrances / Nivaranas（五盖）**：贪欲、嗔恚、昏沉、掉悔、疑 -- 禅修障碍即心理防御
- **Wholesome & Unwholesome Mental States（善与不善心所）**：佛教心理学的价值判断框架
- **Dependent Origination / Paticca Samuppada（缘起）**：十二因缘 -- 心理因果链的系统分析
- **Karma & Conditioning（业与条件作用）**：行为-后果-习性的循环，接近行为心理学的强化理论

### Level 3: Practice, Transformation & Integration（实修与整合篇，M21-M30）

- **Samatha（止禅/寂止）**：专注力训练，安定心智
- **Vipassana（观禅/内观）**：洞察力训练，直接观照实相
- **Four Foundations of Mindfulness（四念处）**：身受心法 -- 系统正念修习框架
- **Metta & Karuna（慈与悲）**：四无量心的前二，培养善意与同理
- **Mudita & Upekkha（喜与舍）**：四无量心的后二，随喜与平等心
- **Clinical Practice（临床应用）**：佛教心理学在咨询/治疗场景的落地
- **Mindfulness-Based Interventions（正念干预）**：MBSR/MBCT 等循证正念方案
- **Working with Difficult Emotions（困难情绪工作）**：愤怒、恐惧、悲伤等的佛教心理学处理
- **Ethics & Well-Being（伦理与幸福）**：戒律（Sila）作为心理健康基础
- **Integration & Continued Practice（整合与持续修行）**：课程收束，指向终身修行路径

---

## 6. 教学方法论

### 6.1 教学风格

根据宣传页文本，该课程采用**自主学习（self-paced）模式**，定位为 "Study at your own pace, on any device, anywhere in the world"（按你自己的节奏，在任何设备、任何地点学习）。交付形式为单个 HTML 文件，下载后无需联网。

从文本风格看，该课程**偏向学术授课 + 体验式教学的融合**：
- 学术性：严格的巴利语术语使用、30 模块的系统递进结构、学期考试和结业考试
- 体验性：强调 "Direct Experience"（直接经验）、实修模块（止观禅修、四无量心）、"Signs of Real Progress"（真实进步的标志）描述的是生活层面的变化而非知识掌握

### 6.2 评估方式

- 2 次学期考试（Term Exam）：Level 1 结束后（M1-M10）、Level 2 结束后（M11-M20）
- 1 次结业考试（Final Exam）：Level 3 结束后（M21-M30）
- 通过后获颁 IPHM 认证的佛教心理学证书

### 6.3 缺失的教学元素

仓库中**未见**以下元素（可能在付费课程内部，或完全缺失）：
- 教练对话 / 一对一辅导
- 朋辈练习 / 小组讨论
- 引导冥想音频/视频
- 练习手册 / 工作表
- 案例研究 / 临床案例

---

## 7. 对"心力教练"项目的启发

### 7.1 能否作为心力教练认证课的原型？

**可以作为结构性参考，但不能直接复用。** 理由如下：

**可借鉴之处：**
- **30 模块三级递进架构** 极为成熟：基础 -> 深入 -> 实修整合，这个"认知-理解-转化"的三段式是认证课程设计的优秀范本
- **考试 + 认证** 的设计（Term Exam + Final Exam + IPHM 认证）提供了可信的评估框架
- **Module 3 的"从弗洛伊德到正念"** 是连接佛教智慧与现代心理学的桥梁模块，心力教练课程需要类似的"历史脉络"模块
- **Module 26-28 的临床应用系列** 直接对应教练场景的实操需求

**不可直接复用之处：**
- 该课程定位为**个人修行为主的教育产品**，而非教练/引导者培训 -- 心力教练需要"如何带领他人"的教学法模块
- 缺少教练核心技能：倾听、提问、反馈、建立关系等
- 缺少教练伦理、边界、转介等职业规范内容

### 7.2 哪些模块可以直接借鉴？

| 模块 | 借鉴方式 |
|---|---|
| M2 Direct Experience | 直接作为心力教练的"认知论基础" -- 教练工作依赖客户的直接体认而非概念理解 |
| M5 Four Noble Truths | 四圣谛可重构为教练框架：现状诊断 -> 根因分析 -> 目标设定 -> 行动路径 |
| M15 Five Aggregates | 五蕴解构可作为"自我认知"工具，帮助客户看见身心过程而非固着于"我是..." |
| M17 Five Hindrances | 五盖可直接作为"教练过程中客户常见阻力"的分类框架 |
| M19 Dependent Origination | 缘起法则可用于教练的"系统思维"训练 -- 看见心理事件的因果链 |
| M24-25 Four Immeasurables | 四无量心可作为教练"核心品质"培养 -- 慈悲喜舍是优秀教练的内在基础 |
| M28 Difficult Emotions | 直接适用于教练实践中"如何处理客户的强烈情绪" |

### 7.3 唯识/止观/直接认知在此课程中的占比

- **止观（Samatha-Vipassana）**：占比适中，M21-M23 共 3 个模块专门讨论禅修，占总量 10%
- **直接认知（Direct Experience）**：M2 独立设置，但作为贯穿全课程的方法论原则（"This is not philosophy. This is a complete science of mind"）
- **唯识（Yogacara/Vijnanavada）**：**完全缺失**。课程不涉及阿赖耶识、八识论、种子说、三性说等唯识核心教义。这是最大的结构性缺口

### 7.4 缺什么（需要补充的）

心力教练认证课程若以此大纲为起点，至少需要补充：

1. **唯识心理学模块**：八识模型、种子-现行-熏习循环、转识成智 -- 这是"心力"概念的佛学理论根基
2. **教练方法论模块**：教练对话结构、强有力提问、深度倾听、 mirroring、 accountability
3. **身心整合模块**：体感（somatic）觉察、身体扫描、创伤知情（trauma-informed）方法
4. **中国文化心理学模块**：儒释道融合视角、心性论、"心力"概念的中国哲学渊源
5. **实践督导模块**：带教练习、个案督导、朋辈互助 -- 该课程完全缺失这一维度
6. **商业/职业模块**：如何作为心力教练执业、伦理边界、定价与客户管理

---

## 8. 关键摘录（保留原文段落）

> "The ancient science of mind meets modern natural medicine. 30 modules. Three transformative levels. One complete path."

> "Buddhist psychology -- refined over 2,500 years of direct investigation into the human mind -- reveals exactly why it happens, and offers a precise, tested path out. This is not philosophy. This is a complete science of mind, as rigorous and as compassionate as anything in the natural health literature."

> "The mind that created the suffering is not separate from the mind that can end it. Every moment of genuine practice is a step on the path."

> "His Middle Way Mind Training is not an adaptation -- it is a living synthesis, tested across decades of clinical and personal practice, refined through direct experience, and grounded in the deepest teachings of Buddhist psychology."

> "We have always had the chance to change -- to transform -- and to get back onto the middle of the road so that we can progress on our journey of discovery of who we really are."

> "The Middle Way Mind Training does not promise quick fixes. It offers something far more valuable -- a systematic cultivation of the conditions for genuine, lasting wellbeing."

> "Awareness: You recognise non-beneficial thoughts earlier -- and realise you have a genuine choice about whether to follow them."

> "Baseline Happiness: A quiet, unshakeable happiness that does not depend on external circumstances -- found already within."

---

## 9. 后续问题

1. **付费课程 HTML 内部结构如何？** 12.3 MB 的单个 HTML 文件很可能包含 30 个模块的完整正文（含内嵌图片），值得购买后做深度内容提取
2. **Dr. Navratil 的 "Middle Way Mind Training" 体系完整面貌**是什么？是否有其他课程、书籍或培训项目？
3. **IPHM 认证的含金量和适用范围**如何？在教练行业中的认可度？
4. **该课程的学员反馈和完成率**如何？是否有社区或学员社群？
5. 课程是否计划增加**互动元素**（如视频、音频引导冥想、在线答疑）？
6. 作者是否有**唯识或藏传佛教背景**的训练？如果没有，心力教练项目需要另行补充这一维度

---

## 10. 相关资源（作者链接、配套网站）

| 资源 | 链接 |
|---|---|
| GitHub 仓库 | https://github.com/FrankNavratil/buddhist-psychology-course |
| 作者官网 | https://www.franknavratil.com |
| 作者邮箱 | frank.navratil@volny.cz |
| 品牌名 | Middle Way Mind Training |
| 发证机构 | Return to Health International College of Natural Medicine |
| 认证机构 | IPHM (International Practitioners of Holistic Medicine) |
| 课程宣传页 | https://franknavratil.github.io/buddhist-psychology-course/ (GitHub Pages) |

---

## 核心总结

**FrankNavratil/buddhist-psychology-course 是一个以上座部佛教心理学为核心、30 模块三级递进的商业付费课程的开源宣传页 -- 其大纲架构（基础-苦的心理-实修整合）和"佛陀作为心理学家"的立场对心力教练认证课程设计具有重要参考价值，但唯识学的完全缺失、教练方法论的空白以及无实修引导素材，意味着心力教练项目需要在此基础上大幅补充唯识心理学、教练技能和身心整合三个维度。**
