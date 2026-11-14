"""Single HTTP-only AI Board worker. Default mode is deliberately ``off``. Entry point and import surface; code lives in worker_*.py."""
from __future__ import annotations

import socket  # noqa: F401 (tests patch worker.socket)

from worker_client import (  # noqa: F401
    CONTRACT, DEFAULT_BUDGET_LIMIT, LIMITS, PLAN_GATES, PRE_PR_GATES, REPO_ROOT, LeaseLostError, Transport, WorkerClient,
    _is_stale_lease, _plan_rejection, _with_body, default_worker_id, server_url, take_secret)
from runtime.limits import config_sha256, run_wall_clock_s, scaled_limit  # noqa: F401
from worker_execution import (  # noqa: F401
    MAX_REPAIRS, PIN_KEYS, REPAIR_REPLAN, _dependency_graph, _execution_plan, _Execution, _gate4_with_proof, _gate_proofs,
    _load_harness, _passed, _preview_eligible, _public_gate_result, _real_deps, _remember, _Reverification,
    _worker_checkpoint, drop_screenshots, execute_pre_pr, harness_change_runner, node_span, pin_mismatch, repair_cap,
    resume_pins)
from worker_planner import (  # noqa: F401
    HarnessPlanner, PlanBlockedError, _duplicate_files, _elevation_payload, _elevation_plan_summary, _has_runnable_verify,
    _merge_same_file, _non_runnable_layered, _objection_evidence, _plan_pins, _plan_repair_note, _plan_repairable,
    _plan_with_repair, _repaired_snapshot, _scannable_decisions, _uncovered_conditions, gate1_probe_client, model_preflight)
from worker_publish import (  # noqa: F401
    _MENTION, MAX_SHOT_BYTES, MAX_SHOTS, SHOTS_TYPE, _forge, observe_base, pr_text, screenshot_payload, sync_pull_requests)
from worker_main import HttpWorker, admin_rewrite_step, main, poll  # noqa: F401

if __name__ == "__main__":
    raise SystemExit(main())
