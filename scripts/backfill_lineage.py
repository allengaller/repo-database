#!/usr/bin/env python3
"""
Backfill lineage field for 21 new catalog profiles.

Usage:
    python3 scripts/backfill_lineage.py
"""

import re
from pathlib import Path

# Lineage mapping based on previous analysis
LINEAGE_MAP = {
    "superpowers": "anthropics/skills",
    "get-shit-done": "planning-with-files",
    "planning-with-files": "original",  # 范式起源
    "gstack": "anthropics/claude-code",
    "skills": "original",  # 原始范式
    "oh-my-codex": "oh-my-zsh",  # 家族范式
    "vibe-kanban": "original",  # 需要进一步分析
    "opencode": "anthropics/claude-code",
    "oh-my-pi": "oh-my-zsh",  # 家族范式
    "cc-haha": "anthropics/claude-code",
    "crush": "anthropics/claude-code",
    "best-of-agent-harnesses": "original",  # awesome-list 范式
    "agenticseek": "openclaw",
    "openfang": "openmultiagent",
    "evolver": "DSPy",
    "open-multi-agent": "All-Hands-AI/OpenHands",
    "antigravity-cli": "anthropics/claude-code",
    "loopy": "oh-my-codex",
    "loop-engineering": "original",  # 需要进一步分析
    "foreman": "original",  # 需要进一步分析
    "looptroop": "anthropics/claude-code",
}


def add_lineage_to_frontmatter(file_path, lineage):
    """Add lineage field to frontmatter."""
    with open(file_path, encoding="utf-8") as f:
        content = f.read()

    # Parse frontmatter
    if not content.startswith("---\n"):
        print(f"  ⚠️  No frontmatter found in {file_path}")
        return False

    end = content.find("\n---\n", 4)
    if end == -1:
        print(f"  ⚠️  Malformed frontmatter in {file_path}")
        return False

    frontmatter = content[4:end]
    body = content[end + 5:]

    # Check if lineage already exists
    if "lineage:" in frontmatter:
        print(f"  ⏭️  Lineage already exists in {file_path}")
        return False

    # Add lineage field before summary
    lines = frontmatter.split("\n")
    new_lines = []
    for line in lines:
        if line.startswith("summary:"):
            new_lines.append(f"lineage: {lineage}")
        new_lines.append(line)

    new_frontmatter = "\n".join(new_lines)
    new_content = f"---\n{new_frontmatter}\n---\n{body}"

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


def main():
    repo_root = Path(__file__).resolve().parent.parent

    files = [
        "catalog/ai-engineering/superpowers.md",
        "catalog/ai-engineering/get-shit-done.md",
        "catalog/ai-engineering/planning-with-files.md",
        "catalog/ai-engineering/gstack.md",
        "catalog/ai-engineering/skills.md",
        "catalog/ai-engineering/oh-my-codex.md",
        "catalog/ai-engineering/vibe-kanban.md",
        "catalog/ai-engineering/opencode.md",
        "catalog/ai-engineering/oh-my-pi.md",
        "catalog/ai-engineering/cc-haha.md",
        "catalog/ai-engineering/crush.md",
        "catalog/ai-agents/best-of-agent-harnesses.md",
        "catalog/ai-agents/agenticseek.md",
        "catalog/ai-agents/openfang.md",
        "catalog/ai-agents/evolver.md",
        "catalog/ai-agents/open-multi-agent.md",
        "catalog/ai-agents/antigravity-cli.md",
        "catalog/ai-agents/loopy.md",
        "catalog/ai-agents/loop-engineering.md",
        "catalog/ai-agents/foreman.md",
        "catalog/ai-agents/looptroop.md",
    ]

    updated = 0
    skipped = 0
    failed = 0

    for file_rel in files:
        file_path = repo_root / file_rel
        if not file_path.exists():
            print(f"  ❌ File not found: {file_rel}")
            failed += 1
            continue

        # Extract repo name from filename
        repo_name = file_path.stem
        lineage = LINEAGE_MAP.get(repo_name)

        if not lineage:
            print(f"  ⚠️  No lineage mapping for {repo_name}")
            failed += 1
            continue

        print(f"  Processing {repo_name} -> lineage: {lineage}")
        if add_lineage_to_frontmatter(file_path, lineage):
            updated += 1
        else:
            skipped += 1

    print(f"\n✅ Backfill complete:")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")
    print(f"  Failed:  {failed}")


if __name__ == "__main__":
    main()
