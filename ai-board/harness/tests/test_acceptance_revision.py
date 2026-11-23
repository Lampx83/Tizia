"""Plan acceptance still red after one code repair: replan once with the app's answer; the new plan goes to a human."""
import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import worker_execution  # noqa: E402
import worker_planner  # noqa: E402
from gate5.verify import _acceptance_probe  # noqa: E402
from runtime.loops import stop_report  # noqa: E402
from test_gate_feedback_cap import _execution  # noqa: E402

CMD = "curl -s localhost:8041/api/c?domain=it | grep -q 'dem-ngon-tay'"
REASON = f"feature acceptance failed: {CMD} | x | response: {{\"builtin\":[{{\"alias\":\"it-sql\"}}]}}"


def _red(execution):
    result = {"gate": 5, "blocked": True, "reason": REASON, "failure_class": "ordinary", "risk_level": "low",
              "evidence": {"text": "x"}}
    execution.gates.append(result)
    execution.last_result = result
    execution.state = {"diffs": [{"diff": f"+ line {len(execution.gates)}\n" * 5}]}
    return execution.repair_check()


def test_probe_is_the_curl_half_of_a_grep_pipe_only():
    assert _acceptance_probe(CMD) == "curl -s localhost:8041/api/c?domain=it"
    assert _acceptance_probe("node --test t.js") is None
    assert _acceptance_probe("echo a | grep a") is None


def test_first_red_repairs_code_second_replans_once_with_the_answer(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    execution = _execution()
    execution.plan = {"steps": [{"order": 1, "allowed_scope": ["server/a.js"]}]}
    assert _red(execution) == "repair"
    execution.repairs.append({"round": 1})
    assert _red(execution) != "repair"
    assert execution.kind == "plan" and execution.stop_note.startswith(worker_execution.ACCEPT_REVISE)
    reason = stop_report.render(stop_report.build("blocked", execution.stop_note, 5, "plan", [3, 4, 5]))
    failed = worker_planner.acceptance_revision({"ticket": {"internal_reason": reason}})
    assert "dem-ngon-tay" in failed and "it-sql" in failed
    assert "viết lại lệnh acceptance" in worker_planner.acceptance_note(failed)


def test_no_second_revision_and_flag_off_keeps_repairing(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    execution = _execution()
    execution.plan = {"steps": [{"order": 1, "allowed_scope": ["server/a.js"], "check_revision": {"reason": "acceptance: x", "old": []}}]}
    execution.repairs.append({"round": 1})
    _red(execution)
    assert not str(execution.stop_note or "").startswith(worker_execution.ACCEPT_REVISE)
    monkeypatch.delenv("AI_BOARD_CRITICAL_ONLY_CHECKS")
    execution = _execution()
    execution.plan = {"steps": [{"order": 1, "allowed_scope": ["server/a.js"]}]}
    execution.repairs.append({"round": 1})
    _red(execution)
    assert not str(execution.stop_note or "").startswith(worker_execution.ACCEPT_REVISE)


def test_replan_lease_passes_the_answer_to_gate_1_and_stamps_the_plan():
    from runtime.budgets.budget import Budget
    snapshot = {"request": {"id": 3, "title": "Lọc catalog", "detail": "lọc theo domain", "domain": "it"},
                "ticket": {"internal_reason": f"{worker_execution.ACCEPT_REVISE} {REASON}"}}
    seen = []

    def run_gate(gate, request, deps, budget, state):
        seen.append(request.get("plan_repair"))
        if gate == 1:
            state["plan"] = {"summary_vi": "x", "capabilities": ["public.ui"],
                             "subtasks": [{"title": "t", "file": "server/a.js", "verify": "v", "size": "small"}]}
        return {"gate": gate, "blocked": False}

    planner = worker_planner.HarnessPlanner.__new__(worker_planner.HarnessPlanner)
    planner.Budget, planner.deps, planner.run_gate = Budget, object(), run_gate
    plan, _ = planner(snapshot)
    assert "it-sql" in seen[0]
    assert plan["steps"][0]["check_revision"]["reason"].startswith("acceptance: ")
    assert plan["steps"][0]["check_revision"]["old"] == []
