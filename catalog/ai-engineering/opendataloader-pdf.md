---
name: opendataloader-project/opendataloader-pdf
url: https://github.com/opendataloader-project/opendataloader-pdf
domain: ai-engineering
type: tool
languages: [Java, Python, TypeScript]
stars: 15500
forks: 1100
license: Apache-2.0
discovered: 2026-08-04
updated: 2026-08-04
rating: 4
status: active
tags: [pdf-parser, rag, accessibility, ocr, pdf-ua, eaa-compliance, bounding-box, langchain]
summary: 基准测试第一的 PDF 解析器（0.907 准确率）——结构化输出 + 边界框 + 自动 PDF 无障碍标记 + 80+ 语言 OCR。
---

# OpenDataLoader PDF

## 1. 项目基本信息

| 字段 | 值 |
|------|----|
| 仓库 | [opendataloader-project/opendataloader-pdf](https://github.com/opendataloader-project/opendataloader-pdf) |
| 维护方 | OpenDataLoader Project（与 PDF Association + Dual Lab 合作） |
| 主语言 | Java（核心引擎）+ Python/Node.js/Java SDK |
| License | Apache-2.0（2026-03 从 MPL-2.0 切换） |
| 当前 Stars | ~15.5k（截至 2026-08） |
| 最近发布 | v2.4.7（2026-05-27） |
| Commits | 847+ |

## 2. 技术栈 / 核心机制分析

**核心定位双轨：**

```
轨道 A: AI-ready 数据提取    ──→  喂 RAG / 喂 LLM context
轨道 B: PDF 无障碍自动化     ──→  EAA / ADA 合规
```

**关键算法：XY-Cut++ 读序分析**

传统解析器遇到左右分栏的报纸会"从左读到右"切断语义。XY-Cut++ 先识别版面几何（X、Y 坐标切割），像人类一样"先读完左列再读右列"。

**三大运行模式：**

| 模式 | 速度 | 适用 | 安装 |
|------|------|------|------|
| **Fast（默认）** | 0.02s/page | 数字版 PDF | `pip install opendataloader-pdf` |
| **Hybrid** | 0.46s/page | 复杂表格 / 扫描件 / 公式 | `pip install "opendataloader-pdf[hybrid]"` + 启动 docling-fast 服务 |
| **Hybrid + OCR** | ~3s/page | 80+ 语言扫描件 | `--force-ocr --ocr-lang "ko,en"` |

**完整架构：**

```
input PDF
   ↓
[Layout Analysis] → 标题/段落/列表/表格/图片/公式 分类
   ↓
[XY-Cut++ Reading Order] → 正确读序
   ↓
[Noise Filter] → 过滤页眉页脚 + 隐藏文本（防 prompt injection）
   ↓
[Optional: AI Hybrid Backend] → 复杂页面调 docling-fast
   ↓
output: { Markdown, JSON(bounding boxes), HTML, Tagged PDF }
```

## 3. 核心功能特性

**基准测试（200 真实 PDF 综合跑分）：**

| 引擎 | Overall | Reading Order | Table | Heading | Speed (s/page) | License |
|------|---------|---------------|-------|---------|----------------|---------|
| **opendataloader [hybrid]** | **0.907** | 0.934 | **0.928** | 0.821 | 0.463 | Apache-2.0 |
| nutrient | 0.885 | 0.925 | 0.708 | 0.819 | 0.008 | Commercial |
| docling (IBM) | 0.882 | 0.898 | 0.887 | 0.824 | 0.762 | MIT |
| marker | 0.861 | 0.890 | 0.808 | 0.796 | 53.932 | GPL-3.0 |
| unstructured [hi_res] | 0.841 | 0.904 | 0.588 | 0.749 | 3.008 | Apache-2.0 |
| opendataloader（纯本地） | 0.831 | 0.902 | 0.489 | 0.739 | **0.015** | Apache-2.0 |
| mineru | 0.831 | 0.857 | 0.873 | 0.743 | 5.962 | AGPL-3.0 |
| pymupdf4llm | 0.732 | 0.885 | 0.401 | 0.412 | 0.091 | AGPL-3.0 |
| markitdown (Microsoft) | 0.589 | 0.844 | 0.273 | 0.000 | 0.114 | MIT |
| liteparse | 0.576 | 0.866 | 0.000 | 0.000 | 1.061 | Apache-2.0 |

**关键能力（Apache 2.0 免费版）：**

- ✅ 结构化提取（Markdown / JSON / HTML / Annotated PDF）
- ✅ 边界框（每个元素 [left, bottom, right, top] PDF points）
- ✅ 表格提取（简单边框 / Hybrid 模式复杂无边框表）
- ✅ 标题层级 / 列表 / 图片坐标
- ✅ AI 安全过滤（防隐藏 prompt injection）
- ✅ 自动标记 → Tagged PDF（PDF/UA 路径的免费第一步）
- ✅ OCR（hybrid 模式，80+ 语言）

**企业版（Enterprise add-on）：** PDF/UA-1/2 export / 可视化 tag 编辑器 / Hancom Data Loader 集成（30+ 元素类型 + SLA 级 OCR）。

**三种 SDK：**

```python
# Python
import opendataloader_pdf
opendataloader_pdf.convert(
    input_path=["file1.pdf", "folder/"],
    output_dir="output/",
    format="markdown,json"
)
```

```typescript
// Node.js
import { convert } from '@opendataloader/pdf';
await convert(['file1.pdf'], { outputDir: 'output/', format: 'markdown,json' });
```

**LangChain 集成（官方）：**

```python
pip install langchain-opendataloader-pdf
from langchain_opendataloader_pdf import OpenDataLoaderPDFLoader
loader = OpenDataLoaderPDFLoader(file_path=["doc.pdf"], format="text")
documents = loader.load()
```

## 4. 应用场景与已落地案例

- **RAG 知识库：** 喂企业 PDF（合同/财报/学术论文）→ Markdown 进 chunker → 向量库（核心场景，结构化保留 heading 层级）
- **EAA 合规自动化：** 2025-06-28 欧盟《European Accessibility Act》生效，要求所有数字产品无障碍。手动 PDF 修复成本 $50-200/doc，OpenDataLoader 自动出 Tagged PDF
- **法律 / 金融 / 医疗：** 100% 本地运行 + 0 字节数据外流，满足 HIPAA / GDPR / 金融监管
- **学术研究：** LaTeX 公式提取（hybrid 模式）→ 可被 MathJax/KaTeX 渲染
- **AI 引用溯源：** 每个元素带 bounding box → RAG 回答可点击"跳到原 PDF 对应区域"（无竞品支持）

## 5. 个人评价

**优势：**
- **基准测试第一：** 0.907 综合分，0.928 表格分（同尺寸开源最强）
- **零 GPU 极速：** 0.015s/page（Fast 模式），比 marker 快 3500 倍
- **完整生态：** 三种 SDK + LangChain 集成 + 80+ 语言 OCR
- **AI 安全内置：** 默认过滤隐藏文本（防 prompt injection），RAG 数据源很关键
- **无障碍自动化：** 与 PDF Association 合作 + veraPDF 验证，是开源界第一个端到端 Tagged PDF 工具
- **Apache 2.0（2026 切换）：** 完全可商用，避开了 docling (MIT) / mineru (AGPL) 的许可证风险

**不足：**
- **依赖 JVM：** 需要 JDK 11+ 环境，纯 Python 栈需 `apt install openjdk-17-jre`
- **复杂场景需 Hybrid：** 纯本地表格准确率只有 0.489，需要起 docling-fast 后台服务才到 0.928
- **企业级 PDF/UA 导出收费：** Tagged PDF 步骤免费，但"完全合规 PDF/UA-1/2 输出"是 enterprise add-on
- **Word/Excel/PPT 不支持：** 严格 PDF-only，多格式需配合 markitdown

**评分理由：** 4 星。基准测试第一 + Apache 2.0 + 三种 SDK + RAG 友好 + AI 安全 = 综合性最强。距 5 星只差"多模态格式支持（Word/Excel）+ PDF/UA 完全免费"。

## 6. 相关资源

| 类型 | 链接 |
|------|------|
| 基准 | benchmarks（200 PDF 跑分） |
| 论文合作 | PDF Association + Dual Lab（veraPDF） |
| 合规章节 | EAA 2025-06-28 / ADA & Section 508 / 韩国 Digital Inclusion Act |
| LangChain 集成 | `langchain-opendataloader-pdf` |
| 同类工具 | [MarkItDown（微软）](https://github.com/microsoft/markitdown) / [docling（IBM）](https://github.com/DS4SD/docling) / [marker](https://github.com/datalab-to/marker) / [pymupdf4llm](https://github.com/pymupdf/RAG) |
| RAG 上下游 | [pageindex.md](../ai-engineering/pageindex.md)（无向量 RAG）/[hipporag.md](../ai-engineering/hipporag.md) / [rag-anything.md](../ai-engineering/rag-anything.md) |
| AI 数据提取 | [kimi-cli.md](../ai-engineering/kimi-cli.md)（终端 Agent） |
| 文档转换生态 | MarkItDown（Office → MD）/ Pandoc（通用格式） |
