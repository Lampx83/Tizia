"""One JSON trial in an owned process tree; uncertain remote cleanup stops the suite."""
from __future__ import annotations

import contextlib
import dataclasses
import json
from pathlib import Path
import subprocess
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evaluation.suite.process_tree import run_owned


def execute_trial(command: list[str], request: dict, *, timeout_s: float) -> dict:
    if timeout_s <= 0:
        raise ValueError("trial timeout must be positive")
    started = time.monotonic()
    task, mode = request["task"], request["mode"]
    try:
        result = run_owned(command, input=json.dumps(request), timeout=timeout_s)
        if result.returncode:
            raise ValueError(f"trial exited with status {result.returncode}")
        row = json.loads(result.stdout)
        if (not isinstance(row, dict) or row.get("id") != task["id"] or row.get("mode") != mode
                or not isinstance(row.get("resolved"), bool)):
            raise ValueError("trial returned an invalid result")
        return {**row, "wall_s": round(time.monotonic() - started, 3)}
    except subprocess.TimeoutExpired:
        reason = "trial_timeout"
    except KeyboardInterrupt:
        reason = "trial_cancelled"
    except (OSError, ValueError):
        reason = "trial_process_error"
    return {
        "id": task["id"], "mode": mode, "resolved": False, "collateral": [], "gate_passed": False,
        "gate4": None, "prod": "skipped", "ended": reason, "shipped": False, "review": None,
        "reason": reason, "infra_error": True, "error": reason, "plan": None, "capture": None,
        "model_calls": None, "tokens_in": None, "tokens_out": None, "cost_status": "unknown",
        "cleanup_pending": True, "loop_tools": [], "retries": 0, "stuck": False, "truncated": False,
        "wall_s": round(time.monotonic() - started, 3), "providers": [], "served": [],
        "reasoning_chars": 0, "diff": None, "recall": None, "ref_errors": 0, "schema_fallbacks": 0,
    }


def main() -> None:
    from dotenv import load_dotenv
    import eval_fast
    from evaluation.suite import ablation, trial
    from evaluation.suite.launcher import sqlite_launcher
    from runtime.budget import Budget
    from runtime.pipeline import Deps, ENV_FILE

    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    request = json.load(sys.stdin)
    ablation.apply(request.get("context_arm", "default"))
    load_dotenv(ENV_FILE)
    deps = dataclasses.replace(Deps.real(), stop_on_model_error=True)
    if deps.models.routing:
        deps.models.routing.catalog["reasoning"] = request.get("reasoning", {})
    fast = eval_fast.FastTier(sqlite_launcher, Path(request["root"])) if request.get("fast_tier") else None
    try:
        with contextlib.redirect_stdout(sys.stderr):
            row = trial.run_trial(request["task"], request["mode"], deps, Path(request["root"]),
                                  request["source"], fast, wall_s=request["wall_s"],
                                  review=request.get("review", False),
                                  budget=Budget.restore(request["budget"]) if request.get("budget") else None)
    finally:
        if fast:
            fast.close()
    print(json.dumps(row, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
