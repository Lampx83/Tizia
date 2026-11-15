"""Driver adapter for `eval_run.py feature --driver evaluation.feature_driver:run`.

run(case, repeat) -> feature record through suite.trial.run_trial (mode e2e, dev split, capture on).
Base commit: case["base_sha"] or env AI_BOARD_FEATURE_BASE_SHA. Operator-only: real run needs model endpoints.
Limit: record files are new-side diff text, so modified files expose hunks only, not the full file.
"""
from __future__ import annotations

import dataclasses
import os
import re
from pathlib import Path

BASE_ENV = "AI_BOARD_FEATURE_BASE_SHA"
WALL_S = 600
_BLOCK = re.compile(r"^diff --git a/(\S+) b/(\S+)$", re.M)


def diff_files(diff: str) -> dict[str, str]:
    """Unified diff -> {path: new-side text}; deleted files dropped, modified files keep hunk lines only."""
    out: dict[str, str] = {}
    starts = [m.start() for m in _BLOCK.finditer(diff)] + [len(diff)]
    for begin, end in zip(starts, starts[1:]):
        block = diff[begin:end]
        path = _BLOCK.match(block).group(2)
        if re.search(r"^deleted file mode", block, re.M):
            continue
        body = block.split("\n@@", 1)
        lines = ("@@" + body[1]).splitlines() if len(body) > 1 else []
        text = [ln[1:] for ln in lines if ln[:1] in ("+", " ")]
        out[path] = "\n".join(text) + ("\n" if text else "")
    return out


def record_of(row: dict) -> dict:
    """suite trial row -> feature record; plan None when the planner produced none."""
    capture = row.get("capture") or {}
    plan = capture.get("final_plan")
    if not isinstance(plan, dict):
        record_plan = None
    else:
        steps = [{"path": t["file"], "tier": t.get("tier"), **({"kind": t["kind"]} if t.get("kind") else {})}
                 for t in plan.get("subtasks") or [] if isinstance(t, dict) and "file" in t]
        record_plan = {"steps": steps, **({"clarify": True} if plan.get("clarify") else {})}
    return {"plan": record_plan, "files": diff_files(capture.get("full_diff") or row.get("diff") or ""),
            "handed": [], "resumes": int(row.get("retries") or 0)}


def task_of(case: dict, base_sha: str) -> dict:
    """Feature case -> suite task dict (dev split, e2e)."""
    return {"id": case["id"], "title": case["id"], "detail": case["request"], "base_sha": base_sha, "split": "dev",
            "kind": "feature", "files": [s["glob"] for s in case["steps"] if s.get("kind") != "data"]}


def _real_trial(task: dict) -> dict:
    from dotenv import load_dotenv
    from evaluation import eval_run
    from evaluation.suite import trial
    from runtime.budget import Budget
    from runtime.pipeline import Deps, ENV_FILE, ROOT
    from settings import get_settings
    load_dotenv(ENV_FILE)
    deps = dataclasses.replace(Deps.real(), stop_on_model_error=True)
    root = Path(get_settings().eval_dir or eval_run.DEFAULT_ROOT)
    return trial.run_trial(task, "e2e", deps, root, ROOT, wall_s=WALL_S, budget=Budget(max_wall_clock_s=WALL_S, max_units=600))


def run(case: dict, repeat: int = 1, runner=None) -> dict:
    """Feature record for one case; runner(task) -> trial row, default is the real suite path."""
    base_sha = case.get("base_sha") or os.environ.get(BASE_ENV)
    if not base_sha:
        raise RuntimeError(f"{BASE_ENV} or case base_sha required")
    return record_of((runner or _real_trial)(task_of(case, base_sha)))
