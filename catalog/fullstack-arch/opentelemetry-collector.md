---
name: open-telemetry/opentelemetry-collector
url: https://github.com/open-telemetry/opentelemetry-collector
domain: fullstack-arch
type: tool
languages: [Go]
stars: 7424
forks: 2207
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 5
status: active
tags: [opentelemetry, observability, telemetry-pipeline, cncf, go]
summary: 厂商中立的遥测数据管道，用统一 pipeline 接收/处理/导出 trace、metric、log
---

# OpenTelemetry Collector · 厂商中立的遥测管道

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | OpenTelemetry Collector |
| **仓库地址** | https://github.com/open-telemetry/opentelemetry-collector |
| **所属组织/作者** | open-telemetry（CNCF 毕业级项目） |
| **描述** | 厂商中立的遥测数据管道，用统一 pipeline 接收/处理/导出 trace、metric、log |
| **开源许可** | Apache-2.0 |
| **Star 数** | 7,424（截至 2026-08） |
| **Fork 数** | 2,207 |
| **技术类型** | tool |

## 二、技术栈分析

- Go 实现，架构为四类组件的可组合 pipeline：**receiver → processor → exporter**，加横切的 extension
- 本仓库是 core（OTLP 及基础组件），厂商与第三方组件在 `opentelemetry-collector-contrib` 中
- 配置为 YAML 声明式：`service.pipelines` 定义 traces/metrics/logs 三条独立管道
- 两种部署形态：Agent（DaemonSet / sidecar 就近采集）与 Gateway（集中处理、采样、限流）
- 可用 `ocb`（builder）裁剪出只含所需组件的自定义发行版，减小攻击面与镜像体积

## 三、核心功能特性

1. **协议与后端解耦**：应用只发 OTLP，换后端（Prometheus / Jaeger / 云厂商）只改 exporter 配置
2. **尾部采样**：tail sampling processor 可按"有错误/慢请求"决定保留哪些 trace，成本与信息量兼顾
3. **数据加工**：属性重写、脱敏、批处理、内存限制，把治理逻辑从应用侧下沉到管道
4. **三信号统一**：trace / metric / log 一套组件模型，运维心智负担显著低于三套系统
5. **可裁剪发行版**：ocb 构建自定义 collector，生产环境只带必要组件

## 四、应用场景说明

- 可观测体系的统一入口：集群内 Agent 采集 + Gateway 集中治理，是云原生监控的标准骨架
- 成本控制：在管道层做采样与降维，比在后端存储侧省钱得多
- 与 [../maas-platform/langfuse.md](../maas-platform/langfuse.md) 打通：LLM trace 走 OTLP 上报，与应用侧链路合并在同一视图
- SRE 智能体的数据来源：结构化遥测是自动根因分析的输入前提

## 五、个人评价

### 优势

1. CNCF 毕业项目 + 厂商中立，是避免可观测厂商锁定的关键一环
2. Pipeline 抽象干净，采样与脱敏这类横切需求不必污染业务代码
3. 生态极大，几乎所有监控后端都提供官方 exporter

### 不足

1. core 与 contrib 分仓，组件版本对齐与稳定性等级（alpha/beta/stable）需要逐个确认
2. 配置项繁多，内存限制与队列参数配错容易在流量峰值时丢数据
3. 高吞吐场景的资源开销不小，Gateway 层需要独立容量规划

### 评分理由

5 星：可观测性方向不可绕过的基础设施，SRE 与 LLMOps 两条链路的公共底座（⭐7.4k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/open-telemetry/opentelemetry-collector |
| **contrib 组件库** | https://github.com/open-telemetry/opentelemetry-collector-contrib |
| **官方文档** | https://opentelemetry.io/docs/collector/ |

### 关联项目

- [chaos-mesh.md](chaos-mesh.md)
- [kubernetes-production-best-practices.md](kubernetes-production-best-practices.md)
- [../maas-platform/langfuse.md](../maas-platform/langfuse.md)
