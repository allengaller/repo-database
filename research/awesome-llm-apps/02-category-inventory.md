# 02 · 十大分类全盘点

> 目录名与数量为 2026-08-26 通过 GitHub Contents API 实测清点（约 115 个应用目录）。「★ 推荐」表示与智能体建设/SRE/语料工程方向相关性最高的条目。

## 1. starter_ai_agents（16）— 入门单 Agent

单文件级实现，一个 agent + 一两个工具。代表作：

- `ai_travel_agent`、`web_scraping_ai_agent`、`ai_data_analysis_agent` —— 经典工具调用三件套
- `ai_reasoning_agent`、`mixture_of_agents` —— 推理与 MoA 聚合范式
- `multimodal_ai_agent`、`ai_music_generator_agent`、`ai_medical_imaging_agent` —— 多模态入口
- `xai_finance_agent` —— 带实时数据源的垂直 agent

**读法**：半天扫完，建立「最小 agent 骨架」的肌肉记忆。

## 2. advanced_ai_agents/single_agent_apps（18）— 生产形态单 Agent ★ 推荐

从玩具走向业务的分水岭目录。代表作：

- ★ `ai_customer_support_agent` —— 客服/工单场景的直接参考架构
- ★ `ai_agent_governance` —— agent 治理（审计、边界、合规），生产落地必答题
- `ai_deep_research_agent` —— 深度研究 agent 的完整实现
- `ai_fraud_investigation_agent` —— 调查类 agent（取证式推理链路）
- `ai_system_architect_r1` —— 用推理模型做架构设计
- `earnings_call_analyst_agent` —— 财报电话会分析，垂直语料处理的样本
- `ai_meeting_agent`、`ai_consultant_agent`、`windows_use_autonomous_agent`（桌面自主操作）

## 3. advanced_ai_agents/multi_agent_apps（16）— 多 Agent 系统 ★ 推荐

- ★ `agent_teams` —— 通用多 agent 团队编排模板
- ★ `multi_agent_trust_layer` / `trust_gated_agent_team` —— 带信任门控的协作，对生产环境 agent 安全有参考价值
- `ai_self_evolving_agent` —— 自进化 agent（与本库 ai-agents 领域的 evolver 同赛道）
- `ai_negotiation_battle_simulator` —— agent 对抗仿真
- `devpulse_ai`、`product_launch_intelligence_agent` —— 工程/市场情报类多 agent
- `multi_agent_researcher`、`ai_news_and_podcast_agents` —— 研究 + 内容生产流水线

## 4. advanced_ai_agents/autonomous_game_playing_agent_apps（3）

`ai_chess_agent`、`ai_3dpygame_r1`、`ai_tic_tac_toe_agent` —— 自主决策循环的教学样本，看 agent 如何在规则环境里闭环试错。

## 5. mcp_ai_agents（7）— MCP 集成 ★ 推荐

- ★ `github_mcp_agent` —— MCP 接 GitHub 的标准示范（与 SRE 场景直接相关）
- ★ `multi_mcp_agent_router` —— 多 MCP server 的路由与选择，工具编排进阶
- `notion_mcp_agent`、`browser_mcp_agent`、`openai_remote_mcp_bridge`（远程 MCP）
- `ai_travel_planner_mcp_agent_team` —— MCP + 多 agent 组合
- `multi_mcp_agent` —— 并行多 MCP 调用

## 6. voice_ai_agents（4）

- ★ `customer_support_voice_agent` —— 语音客服，工单场景的语音入口参考
- `insurance_claim_live_agent_team` —— 保险理赔实时多 agent（电话场景）
- `ai_audio_tour_agent`、`voice_rag_openaisdk`

## 7. always_on_agents（2）— 常驻 Agent

- `always_on_hn_briefing_agent` —— 7×24 持续产出 HN 简报
- ★ `release_radar_agent` —— 持续追踪依赖发布动态（SRE 场景：组件版本雷达的雏形）

数量少但方向新：agent 从「会话式」走向「守护进程式」。

## 8. generative_ui_agents（8）— 生成式 UI

- `ai-dashboard-canvas-agent` —— agent 动态生成仪表盘（与 SRE 运维大盘结合有想象空间）
- ★ `ai-deep-research-agent`、`ai-financial-coach-agent`、`ai-knowledge-explorer` —— 生成式 UI 的完整产品形态
- `ai-mcp-app-builder`、`ai-shadcn-component-generator` —— agent 生成前端组件
- `generative-ui-starter-project`、`mcp-apps-generative-ui-showcase` —— 脚手架与展示

## 9. agent_skills（8）— 技能封装 ★ 推荐

2026 年最新目录，与「技能工具化封装」思路同源：

- ★ `advisor-orchestrator-worker` —— 顾问-编排者-执行者三层技能分工
- ★ `evals` —— 技能评估框架
- ★ `dependency-doctor`、`commit-archaeologist` —— 工程域技能样本（依赖诊断、提交考古），直接映射 SRE 工具化
- `scope-creep-detector`、`project-graveyard` —— 项目管理类技能
- `self-improving-agent-skills`、`thinking-out-loud` —— 技能自改进与思维外化

## 10. rag_tutorials（24）— RAG 架构对照 ★ 推荐

全库最硬核的目录，24 种 RAG 写法平铺对照：

- **Agentic RAG 系**：★ `agentic_rag_gpt5`、`gemini_agentic_rag`、`agentic_typed_rag_pydanticai`（类型安全）、`agentic_rag_with_reasoning`、`agentic_rag_math_agent`、`agentic_rag_embedding_gemma`
- **纠错系**：★ `corrective_rag`（CRAG）、`rag_failure_diagnostics_clinic`（RAG 失败诊断，SRE 语料工程可直接借鉴）
- **检索系**：★ `hybrid_search_rag`、`local_hybrid_search_rag`、`rag_database_routing`（多库路由）
- **知识图谱系**：★ `knowledge_graph_rag_citations`（带引用的 KG-RAG）
- **本地系**：`llama3.1_local_rag`、`qwen_local_rag`、`deepseek_local_rag_agent`、`local_rag_agent`
- **多模态与服务化**：`vision_rag`、`multimodal_agentic_rag`、`rag-as-a-service`
- 其余：`autonomous_rag`、`rag_chain`、`ai_blog_search`、`rag_agent_cohere`、`contextualai_rag_agent`

## 11. advanced_llm_apps（10 个子目录）

`llm_apps_with_memory_tutorials`（★ 记忆系统）、`llm_finetuning_tutorials`、`llm_optimization_tools`、`resume_job_matcher`、`multimodal_video_moment_finder`、`gpt_oss_critique_improvement_loop`（批判-改进循环）、`chat_with_X_tutorials`、`cursor_ai_experiments`、`chat-with-tarots`、`thinkpath_chatbot_app`

## 12. ai_agent_framework_crash_course（2）

`google_adk_crash_course`、`openai_sdk_crash_course` —— 两大框架的最小速成课，选型前各花一小时。
