#!/usr/bin/env python3
"""
持续发现 GitHub 优质仓库，以 JSONL 追加到 data/discoveries.jsonl（发现收件箱）
自动去重（基于 URL），每次运行只追加新发现的 repo

用法：
    python scripts/discover_repos.py                       # 使用默认 AI/开源关键词
    python scripts/discover_repos.py "vector database"     # 追加自定义关键词
    DISCOVER_LIMIT=30 python scripts/discover_repos.py

前置：需要 gh CLI 已登录 (gh auth login)
可选环境变量：DISCOVER_LIMIT（每个关键词最多返回多少条，默认 15）

后续流程：审阅 data/discoveries.jsonl，对值得深挖的仓库执行
    python scripts/catalog.py new <url> --domain <domain>
"""

import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "data" / "discoveries.jsonl"
LIMIT = int(os.environ.get("DISCOVER_LIMIT", "15"))

QUERIES = [
    # AI / LLM 生态
    "AI agent framework",
    "LLM application",
    "RAG framework",
    "multi-agent orchestration",
    "coding assistant",
    "MCP server",
    # AI × 心理健康 / 心智哲学（延续 mind-coach 研究方向）
    "AI mental health",
    "psychology LLM",
    "yogacara buddhism",
    "vipassana app",
    "buddhist psychology",
    "mindfulness coach",
    # 泛文化艺术 / 数字人文
    "digital humanities",
    "creative coding",
    "generative art",
    "cultural heritage open data",
    "chinese poetry",
    # 交叉：AI × 艺术文化 / AI × 心理
    "AI art generation",
    "music generation AI",
    "computational creativity",
    "therapy chatbot LLM",
]


def load_existing():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if not OUTPUT.exists():
        OUTPUT.touch()
        return set()
    seen = set()
    for line in OUTPUT.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            seen.add(json.loads(line).get("url", ""))
        except json.JSONDecodeError:
            continue
    return seen


def search(query, limit):
    try:
        out = subprocess.run(
            [
                "gh", "search", "repos", query,
                "--limit", str(limit),
                "--sort", "stars",
                "--json", "url,fullName,description,stargazersCount,language,updatedAt",
            ],
            capture_output=True, text=True, timeout=30, check=True,
        )
        return json.loads(out.stdout) if out.stdout.strip() else []
    except FileNotFoundError:
        print("❌ 需要 GitHub CLI: brew install gh && gh auth login", file=sys.stderr)
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"  ⚠️  gh 查询失败: {e.stderr.strip()}", file=sys.stderr)
        return []


def main():
    queries = QUERIES + sys.argv[1:]
    seen = load_existing()
    print(f"🔍 开始检索 {len(queries)} 个关键词，去重库已有 {len(seen)} 条\n")

    new_count = 0
    with OUTPUT.open("a", encoding="utf-8") as f:
        for query in queries:
            print(f"━━━ 🔎 {query} ━━━")
            rows = search(query, LIMIT)
            for r in rows:
                url = r.get("url", "")
                if not url or url in seen:
                    continue
                record = {
                    "url": url,
                    "name": r.get("fullName", ""),
                    "description": (r.get("description") or "")[:200],
                    "stars": r.get("stargazersCount", 0),
                    "language": r.get("language"),
                    "updated_at": r.get("updatedAt", ""),
                    "query": query,
                    "discovered_at": date.today().isoformat(),
                    "notes": "",
                }
                f.write(json.dumps(record, ensure_ascii=False) + "\n")
                seen.add(url)
                new_count += 1
                print(f"  + {record['name']:<40} ⭐{record['stars']:>5}")
            print()

    print(f"✅ 完成。本次新增 {new_count} 条，结果保存在 {OUTPUT}")


if __name__ == "__main__":
    main()
