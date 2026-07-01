#!/usr/bin/env python3
"""
持续发现 GitHub 同类项目，以 JSONL 追加到 repos/discoveries.jsonl
自动去重（基于 URL），每次运行只追加新发现的 repo

用法：
    cd research/mind-coach
    ./discover-repos.sh

前置：需要 gh CLI 已登录 (gh auth login)
可选环境变量：DISCOVER_LIMIT（每个关键词最多返回多少条，默认 15）
"""

import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUTPUT = HERE / "repos" / "discoveries.jsonl"
LIMIT = int(os.environ.get("DISCOVER_LIMIT", "15"))

QUERIES = [
    "mindfulness coach training",
    "meditation coach certification",
    "mental resilience coach",
    "yogacara buddhism",
    "vipassana app",
    "samatha vipassana",
    "buddhist psychology",
    "mind training app",
    "executive meditation",
    "consciousness coaching",
    "止观 冥想",
    "唯识 应用",
    "心力 教练",
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
    seen = load_existing()
    print(f"🔍 开始检索 {len(QUERIES)} 个关键词，去重库已有 {len(seen)} 条\n")

    new_count = 0
    with OUTPUT.open("a", encoding="utf-8") as f:
        for query in QUERIES:
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
