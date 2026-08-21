---
name: kserve/kserve
url: https://github.com/kserve/kserve
domain: maas-platform
type: framework
languages: [Go, Python]
stars: 5813
forks: 1630
license: Apache-2.0
discovered: 2026-08-21
updated: 2026-08-21
rating: 4
status: active
tags: [kubernetes, model-serving, inferenceservice, cncf, autoscaling]
summary: K8s 上标准化的模型推理平台，用 InferenceService CRD 统一部署、扩缩与灰度
---

# KServe · 声明式模型推理服务平台

## 一、项目基本信息

| 属性 | 内容 |
|------|------|
| **项目名称** | KServe |
| **仓库地址** | https://github.com/kserve/kserve |
| **所属组织/作者** | kserve（原 KFServing，从 Kubeflow 独立，CNCF 孵化项目） |
| **描述** | K8s 上标准化的模型推理平台，用 InferenceService CRD 统一部署、扩缩与灰度 |
| **开源许可** | Apache-2.0 |
| **Star 数** | 5,813（截至 2026-08） |
| **Fork 数** | 1,630 |
| **技术类型** | framework |

## 二、技术栈分析

- Go 控制器 + Python runtime SDK；`InferenceService` 是唯一面向用户的核心 CRD
- 两种部署模式：Serverless（依赖 Knative + Istio，支持缩容到零）与 RawDeployment（纯 Deployment + HPA，依赖更轻）
- 预定义 ServingRuntime：vLLM、Hugging Face、Triton、TorchServe、SKLearn、XGBoost 等，也可自定义
- 推理协议标准化：V1/V2（Open Inference Protocol）+ OpenAI 兼容端点，客户端不与实现绑定
- 支持 transformer（前后处理）+ predictor + explainer 的多组件推理图，以及 ModelMesh 多模型共池

## 三、核心功能特性

1. **声明式模型上线**：一份 YAML 描述模型来源、runtime、资源、伸缩策略，其余交给控制器
2. **金丝雀发布**：`canaryTrafficPercent` 按比例切流，模型版本迭代不再需要自研发布逻辑
3. **缩容到零**：Serverless 模式下长尾模型不占 GPU，是多模型平台的成本关键
4. **多框架统一**：传统 ML 与 LLM 共用一套服务规范，平台不必维护两套上线流程
5. **模型仓库对接**：S3/OSS/PVC/HF Hub 直接拉取，权重与镜像解耦

## 四、应用场景说明

- MaaS 平台的控制面：把 [vllm.md](vllm.md) 作为 ServingRuntime，KServe 负责生命周期与灰度
- 多模型多档位管理：几十个模型的上线、扩缩、下线通过 GitOps 统一编排
- 与 [volcano.md](volcano.md)/[hami.md](hami.md) 组合，形成"控制面（KServe）+ 调度（Volcano）+ 切分（HAMi）"的完整栈
- 传统 ML 服务与 LLM 服务并存的企业环境，统一收口到同一套 API

## 五、个人评价

### 优势

1. InferenceService 抽象经过多年打磨，是模型服务控制面的事实标准
2. 金丝雀 + 缩容到零两项能力自研成本极高，直接复用价值大
3. CNCF 治理与厂商中立，跨云迁移风险低

### 不足

1. Serverless 模式的 Knative + Istio 依赖较重，中小集群运维负担明显
2. LLM 场景的适配略滞后于推理引擎自身的演进（如 PD 分离、KV 缓存共享）
3. 概念层级多（InferenceService / ServingRuntime / ClusterServingRuntime），上手曲线偏陡

### 评分理由

4 星：模型服务控制面的首选开源方案，但需承担一定的架构复杂度（⭐5.8k，截至 2026-08）。

## 六、相关资源

| 类型 | 链接 |
|------|------|
| **项目仓库** | https://github.com/kserve/kserve |
| **官方文档** | https://kserve.github.io/website/ |
| **Open Inference Protocol** | https://github.com/kserve/open-inference-protocol |

### 关联项目

- [vllm.md](vllm.md)
- [volcano.md](volcano.md)
- [kuberay.md](kuberay.md)
