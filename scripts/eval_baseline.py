#!/usr/bin/env python3
"""Repository review baseline — one command health check.

In-process gates (no subprocess needed): pytest via pytest.main, catalog
validate/lint via direct function calls, plus repo-hygiene checks CI cannot
see (README count drift, GTM/dist duplication, stray tracked state).
Ruff runs through its console script when available.

Prints a PASS/FAIL/WARN summary and exits non-zero on any hard failure, so
it serves as the pre/post baseline for every review cycle
(see docs/EVALUATION-2026-09-04.md appendix).

Usage (from repo root, inside the venv that has pytest + ruff):
    python scripts/eval_baseline.py

Severity contract:
    FAIL — hard gate; non-zero exit (tests, ruff, validate, drift, hygiene)
    WARN — soft signal recorded in the summary, does not fail the run
           (catalog lint warnings; CI also keeps these non-blocking)
"""

import contextlib
import io
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

import catalog  # module path extended above


def check_tests():
    import pytest

    rc = pytest.main(["tests/", "-q", "--rootdir=" + ROOT, "-p", "no:cacheprovider"])
    return rc == 0, f"pytest exit code {int(rc)}"


def check_ruff():
    if shutil.which("ruff") is None:
        return None, "ruff not on PATH — run inside the venv or rely on CI"
    r = subprocess.run(
        ["ruff", "check", "scripts/", "tests/"],
        capture_output=True, text=True, cwd=ROOT,
        timeout=300, check=False, shell=False,
    )
    if r.returncode == 0:
        return True, "no findings"
    count = len([ln for ln in r.stdout.splitlines() if ln.strip() and not ln.startswith(" ")])
    return False, f"{count} findings"


def _catalog_capture(fn):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        rc = fn(None)
    return rc, buf.getvalue()


def check_catalog_validate():
    rc, out = _catalog_capture(catalog.cmd_validate)
    tail = out.strip().splitlines()[-1:] or ["no output"]
    return rc == 0, tail[0]


def check_catalog_lint():
    rc, out = _catalog_capture(catalog.cmd_lint)
    m = re.search(r"Lint: (\d+) warnings", out)
    warnings = int(m.group(1)) if m else (0 if "Lint OK" in out else -1)
    if rc != 0 or warnings < 0:
        return False, "lint produced no parseable summary"
    if warnings == 0:
        return True, "0 warnings"
    # Soft by design (CI keeps `|| true`), but the target state is zero.
    return None, f"{warnings} warnings — clear them before the next review"


def check_readme_count():
    domain_counts = {}
    for _, meta, _ in catalog.iter_profiles():
        domain_counts[meta.get("domain", "unknown")] = domain_counts.get(meta.get("domain", "unknown"), 0) + 1
    errs = catalog.check_readme_consistency(sum(domain_counts.values()), domain_counts)
    if errs:
        return False, f"{len(errs)} drift claims: " + "; ".join(errs[:2])
    return True, f"badge/prose/table match {sum(domain_counts.values())} profiles"


def check_gtm_dist():
    dist = os.path.join(ROOT, "GTM", "dist")
    if os.path.isdir(dist):
        return False, "GTM/dist exists — build output must stay out of the repo (single source: GTM/)"
    return True, "absent (single source)"


def check_stray_tracked_files():
    for candidate in (".mimosa", "GTM/dist"):
        probe = subprocess.run(
            ["git", "ls-files", "--", candidate],
            capture_output=True, text=True, cwd=ROOT,
            timeout=60, check=False, shell=False,
        )
        lines = [ln for ln in (probe.stdout or "").splitlines() if ln.strip()]
        if lines:
            return False, f"tracked runtime/build state: {', '.join(lines[:3])}"
    return True, "none"


def main():
    hard = [
        ("pytest", check_tests),
        ("ruff", check_ruff),
        ("catalog validate", check_catalog_validate),
        ("README count drift", check_readme_count),
        ("GTM/dist duplication", check_gtm_dist),
        ("stray tracked files", check_stray_tracked_files),
    ]
    soft = [("catalog lint", check_catalog_lint)]

    failed = 0
    print(f"repo-database review baseline — {os.path.basename(ROOT)}")
    print("-" * 64)
    for name, fn in hard + soft:
        try:
            ok, detail = fn()
        except Exception as exc:  # noqa: BLE001 — report any gate crash as a failure
            ok, detail = False, f"gate crashed: {exc}"
        if ok is True:
            status = "PASS"
        elif ok is None:
            status = "WARN"
        else:
            status = "FAIL"
            failed += 1
        print(f"  [{status}] {name:<22} {detail}")
    print("-" * 64)
    if failed:
        print(f"Result: {failed} hard check(s) failed")
        return 1
    print("Result: all hard checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
