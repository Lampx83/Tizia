"""Driver adapter for `eval_run.py feature --driver evaluation.feature_driver:run`.

run(case, repeat) -> feature record through suite.trial.run_trial (mode e2e, dev split, capture on).
Plan is auto-approved (mode e2e:approved); clarification questions are answered from case["answers"] (max two), others get CANNED.
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
CANNED = "tự giả định và ghi rõ"
MAX_ANSWERS = 2
MAX_ROUNDS = 5
_BLOCK = re.compile(r"^--- a/(\S+)\n\+\+\+ b/(\S+)$", re.M)  # gates.implement._unified (difflib), not git headers


def diff_files(diff: str) -> dict[str, str]:
    """difflib unified diff (run_case row diff) -> {path: new-side text}; modified files keep hunk lines only."""
    out: dict[str, str] = {}
    starts = [m.start() for m in _BLOCK.finditer(diff)] + [len(diff)]
    for begin, end in zip(starts, starts[1:]):
        block = diff[begin:end]
        path = _BLOCK.match(block).group(2)
        text = [ln[1:] for ln in block.splitlines()[2:] if ln[:1] in ("+", " ")]
        out[path] = "\n".join(text) + ("\n" if text else "")
    return out


def tier_of(path: str, kind: str | None = None) -> str:
    """Step tier from the path, never model-declared: data critical, db/backend high, rest low."""
    if kind == "data":
        return "critical"
    from gates import brainstorm
    return "high" if brainstorm.infer_layer(path) in ("db", "backend") else "low"


def record_of(row: dict) -> dict:
    """suite trial row -> feature record; plan None when the planner produced none."""
    capture = row.get("capture") or {}
    plan = capture.get("final_plan")
    if not isinstance(plan, dict):
        record_plan, handed = None, []
    else:
        subtasks = [t for t in plan.get("subtasks") or [] if isinstance(t, dict)]
        steps = [{"path": t["file"], "tier": tier_of(t["file"], t.get("kind")), **({"kind": t["kind"]} if t.get("kind") else {})}
                 for t in subtasks if "file" in t]
        record_plan = {"steps": steps, **({"clarify": True} if plan.get("clarify") else {})}
        handed = sorted({t["kind"] for t in subtasks if t.get("kind")})
    from gate5 import checks
    diff = capture.get("full_diff") or row.get("diff") or ""
    criteria = {"acceptance": [a for a in (plan or {}).get("acceptance") or [] if isinstance(a, str)] if isinstance(plan, dict) else [],
                "checks": checks.collect(plan) if isinstance(plan, dict) else []}
    return {"plan": record_plan, "files": diff_files(diff), "diff": diff, "criteria": criteria,
            "handed": handed, "resumes": int(row.get("resumes") or 0)}


def task_of(case: dict, base_sha: str) -> dict:
    """Feature case -> suite task dict (dev split, e2e). Globs must be concrete paths: grading and planning match them as paths."""
    if "steps" in case:
        files = [s["glob"] for s in case["steps"] if s.get("kind") != "data"]
    else:
        from evaluation import feature_expectation
        files = feature_expectation.paths_of(case)
    return {"id": case["id"], "title": case["id"], "detail": case["request"], "base_sha": base_sha, "split": "dev",
            "kind": "feature", "files": files, "file": files[0] if files else "", "verify": "", "gold": {},
            "check": {"mode": "feature"}}


def _real_trial(task: dict) -> dict:
    from dotenv import load_dotenv
    from evaluation import eval_run
    from evaluation.suite import trial
    from runtime.budget import Budget
    from runtime.pipeline import Deps, ENV_FILE, ROOT
    from providers.routing import local_only
    from settings import get_settings
    load_dotenv(ENV_FILE)
    deps = dataclasses.replace(local_only(Deps.real()), stop_on_model_error=True)
    root = Path(get_settings().eval_dir or eval_run.DEFAULT_ROOT)
    return trial.run_trial(task, "e2e:approved", deps, root, ROOT, wall_s=WALL_S, budget=Budget(max_wall_clock_s=WALL_S, max_units=600))


def reply_for(case: dict, asked: int) -> str:
    """Answer to the (asked+1)-th question: case list for the first two, CANNED after."""
    answers = case.get("answers") or []
    return answers[asked] if asked < min(MAX_ANSWERS, len(answers)) else CANNED


def question_of(row: dict) -> str | None:
    """Clarification question the validator raised in this trial row, if any."""
    for step in ((row.get("capture") or {}).get("validator_results") or []):
        if step.get("reason") == "needs_clarification" and step.get("public_message"):
            return str(step["public_message"])
    return None


def converse(task: dict, case: dict, runner) -> tuple[dict, list[dict]]:
    """Re-run with the requester's reply appended to the thread until no question or MAX_ROUNDS. -> (last row, [{question, reply}])."""
    thread, log = [], []
    while True:
        row = runner({**task, "thread": list(thread)} if thread else task)
        question = question_of(row)
        if not question or len(log) >= MAX_ROUNDS:
            return row, log
        reply = reply_for(case, len(log))
        thread += [{"role": "admin", "body": question}, {"role": "requester", "body": reply}]
        log.append({"question": question, "reply": reply})


def run(case: dict, repeat: int = 1, runner=None) -> dict:
    """Feature record for one case; runner(task) -> trial row, default is the real suite path."""
    base_sha = case.get("base_sha") or os.environ.get(BASE_ENV)
    if not base_sha:
        raise RuntimeError(f"{BASE_ENV} or case base_sha required")
    row, log = converse(task_of(case, base_sha), case, runner or _real_trial)
    return {**record_of(row), "clarify_log": log}
