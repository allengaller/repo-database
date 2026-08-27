# 03 · 应用视角：结合点与学习路径

> 本章从智能体建设（SRE 运维智能体、工单智能体、语料工程）与 MaaS 平台视角，给出这个模板库的使用方式。

## 一、与工单智能体的结合点

| 模板 | 可借鉴的设计 |
|------|-------------|
| `advanced_ai_agents/single_agent_apps/ai_customer_support_agent` | 客服 agent 的完整骨架：意图识别 → 知识检索 → 升级转人工，与工单分派链路同构 |
| `voice_ai_agents/customer_support_voice_agent` | 语音入口的工单处理，实时对话 + 工单落库的双通道设计 |
| `voice_ai_agents/insurance_claim_live_agent_team` | 实时多 agent 协作处理单据（理赔≈工单），角色分工可照搬 |
| `advanced_ai_agents/single_agent_apps/ai_agent_governance` | 生产 agent 的治理框架：审计、越权拦截、人工确认点 —— 工单智能体上生产前的必读 |
| `advanced_ai_agents/multi_agent_apps/multi_agent_trust_layer` | 信任门控：agent 输出分级放行，对应工单回复的「自动发/审核后发」策略 |

## 二、与语料工程的结合点

| 模板 | 可借鉴的设计 |
|------|-------------|
| `rag_tutorials/rag_failure_diagnostics_clinic` | **最直接相关**：RAG 失败诊断诊所 —— 把「检索不到/答案错误」本身作为诊断对象，其故障分类法可反哺工单语料的错误类型体系 |
| `rag_tutorials/corrective_rag` | CRAG 的检索质量评估器，可用于语料入库前的质量门 |
| `rag_tutorials/knowledge_graph_rag_citations` | 带引用的知识图谱 RAG —— 工单解决方案天然适合「问题-原因-解法」三元组建图 |
| `rag_tutorials/hybrid_search_rag` | 混合检索（向量 + 关键词）基线，工单库检索的默认选择 |
| `agent_skills/evals` | 技能评估框架，语料质量评测流程的参考实现 |
| `advanced_llm_apps/llm_finetuning_tutorials` | 微调教程集，工单语料做 SFT 的操作手册 |

## 三、与 SRE 运维智能体的结合点

| 模板 | 可借鉴的设计 |
|------|-------------|
| `mcp_ai_agents/github_mcp_agent` | MCP 接 GitHub 的标准写法，运维智能体接内部平台的 MCP 化改造模板 |
| `mcp_ai_agents/multi_mcp_agent_router` | 多工具源路由 —— 对应运维场景中「查监控/查日志/查工单」多后端分发 |
| `always_on_agents/release_radar_agent` | 守护进程式 agent 雏形：组件版本雷达、变更值守的直接起点 |
| `agent_skills/dependency-doctor`、`commit-archaeologist` | 工程诊断类技能的标准封装格式，与 Skills 工具化封装思路一致 |
| `generative_ui_agents/ai-dashboard-canvas-agent` | agent 动态生成运维大盘，故障诊断结果的可视化呈现 |
| `starter_ai_agents/ai_data_analysis_agent` | 数据分析 agent 最小骨架，指标异常分析的原型 |

## 四、与 MaaS 平台的结合点

- `rag_tutorials` 的本地系（qwen/llama/deepseek）展示了如何在自建推理服务上跑 RAG —— 对接私有化 AI Stack 的参照
- `ai_agent_framework_crash_course` 两门速成课可用于团队框架选型（OpenAI SDK vs Google ADK）
- 结合本库 [../../catalog/maas-platform/litellm.md](../../catalog/maas-platform/litellm.md)：这些模板的模型调用层换成 LiteLLM 即可统一接入多供应商
- 结合 [../../catalog/maas-platform/langfuse.md](../../catalog/maas-platform/langfuse.md)：给模板加 trace 就是 LLMOps 实训环境

## 五、推荐学习路径（按周）

| 阶段 | 内容 | 产出 |
|------|------|------|
| 第 1 周 | `starter_ai_agents` 挑 3 个跑通 + `ai_agent_framework_crash_course` 二选一 | 最小 agent 骨架手感 |
| 第 2 周 | `rag_tutorials`：hybrid → corrective → knowledge_graph 三条线对照 | RAG 架构选型判断力 |
| 第 3 周 | `single_agent_apps`：customer_support + governance 精读并改造 | 工单智能体原型 |
| 第 4 周 | `mcp_ai_agents` + `agent_skills`：github_mcp + dependency-doctor | 工具化封装方法论 |
| 持续 | `always_on_agents` + `multi_agent_apps/trust_layer` | 生产化与值守形态 |

## 六、使用注意

1. **代码质量参差**：社区投稿制，部分模板依赖版本过期或 API 已变，跑之前先看最近提交
2. **数据层不可直接生产化**：Chroma/Streamlit 组合仅适合原型，生产需替换为本库 fullstack-arch 领域的组件
3. **API 成本**：多数模板默认调用商用模型 API，批量实验前先用本地系模板（qwen/llama）验证逻辑
4. **许可**：Apache-2.0 允许商用与改造，但个别模板内嵌第三方服务 SDK，集成前逐个确认
