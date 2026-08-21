# 范式谱系总览

本目录收录 catalog 内各范式的谱系档案，追踪每个范式的源头、衍生品和演化路径。

## 范式列表

| 范式 | 范式源头 | 衍生品数量 | 档案 |
|------|---------|-----------|------|
| CLI 流式 diff 编辑器 | paul-gauthier/aider | 5 | [link](cli-streaming-diff-editor.md) |
| 多 agent 编排 | All-Hands-AI/OpenHands | 3 | [link](multi-agent-orchestration.md) |
| Agent harness 配置 | anthropics/skills | 4 | [link](agent-harness-config.md) |
| Oh-my-zsh 家族范式 | ohmyzsh/ohmyzsh | 2 | [link](oh-my-zsh-family.md) |
| Prompt 演化框架 | DSPy | 1 | [link](prompt-evolution.md) |

## 统计

- 总范式数：5
- 总衍生品数：15
- 原创仓库数：6（无明确范式源头）

## 使用方法

1. 查看某个范式的谱系档案，了解其源头和演化路径
2. 在 catalog 档案的 frontmatter 中查看 `lineage` 字段，了解该仓库的范式归属
3. 使用 `~/.qoder/skills/repo-digger/scripts/lineage.py` 识别新仓库的范式源头

## 维护

- 每次新增 catalog 档案时，运行 `lineage.py` 识别范式源头
- 每个范式至少维护一份谱系档案
- 定期回顾和更新谱系图
