import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import pytest

import worker
from runtime import repair_class
from worker import execute_pre_pr

PRODUCED = {
    "public/js/campus/building.js": {"test_file": "test/building.test.js", "code": "a", "test": "t", "model": "m"},
    "public/it-campus.html": {"test_file": "test/page.test.js", "code": "b", "test": "u", "model": "m"},
}
SCOPE = set(PRODUCED)

ROOT39_EVIDENCE = (
    "not ok 1 - building renders\n  AssertionError: expected 3 got 2\n  at /app/test/building.test.js:12\n"
    "# fail 1\nGenerated tests failed (advisory)\n")


def test_root39_shape_is_acceptance_command_repairing_only_the_involved_file():
    result = {"gate": 5, "reason": "feature acceptance failed: curl -s $BASE/it-campus.html | grep -q building",
              "failure_class": "ordinary", "evidence": {"text": ROOT39_EVIDENCE}}
    out = repair_class.classify(result, PRODUCED, SCOPE)
    assert (out["class"], out["action"]) == ("acceptance_command", "repair_code")
    assert out["files"] == ["public/js/campus/building.js", "public/it-campus.html"]


def test_failing_test_in_one_file_names_only_that_file():
    result = {"gate": 5, "reason": "generated tests failed", "failure_class": "ordinary",
              "evidence": {"text": ROOT39_EVIDENCE}}
    out = repair_class.classify(result, PRODUCED, SCOPE)
    assert (out["class"], out["action"]) == ("test_assertion", "repair_code")
    assert out["files"] == ["public/js/campus/building.js"]


@pytest.mark.parametrize("result,expected", [
    ({"gate": 4, "reason": "node --check lỗi", "failure_class": "ordinary"}, ("syntax", "repair_code")),
    ({"gate": 5, "reason": "generated tests timed out", "failure_class": "ordinary"}, ("timeout", "stop_admin")),
    ({"gate": 4, "reason": "ghi ngoài scope: x.js", "failure_class": "ordinary"}, ("scope", "stop_admin")),
    ({"gate": 5, "reason": "docker up", "failure_class": "transient"}, ("infra_transient", "retry")),
    ({"gate": 5, "reason": "no http", "failure_class": "plan"}, ("plan_inconsistent", "replan")),
    ({"gate": 5, "reason": "x", "failure_class": "ordinary",
      "evidence": {"text": "Error: Cannot find module '/app/public/js/other/ghost.js'"}}, ("plan_inconsistent", "replan")),
    ({"gate": 4, "reason": "css lệch", "failure_class": "ordinary"}, ("unclassified", "repair_code")),
])
def test_classes_and_actions(result, expected):
    out = repair_class.classify(result, PRODUCED, SCOPE)
    assert (out["class"], out["action"]) == expected


def test_progress_signals():
    base = {"gate": 5, "fails": 3, "diff": "a"}
    assert repair_class.progressed(base, {"gate": 5, "fails": 2, "diff": "a"})
    assert not repair_class.progressed(base, {"gate": 5, "fails": 4, "diff": "b"})
    assert repair_class.progressed(base, {"gate": 5.5, "fails": None, "diff": "a"})
    assert repair_class.progressed(base, {"gate": 5, "fails": 3, "diff": "b"})
    assert not repair_class.progressed(base, {"gate": 5, "fails": 3, "diff": "a"})


def test_soft_limit_grows_with_progress_but_never_past_the_hard_cap():
    spec = {"soft_start": 2, "soft_step": 1}
    assert [repair_class.soft_limit(spec, n, 4) for n in (0, 1, 2, 9)] == [2, 3, 4, 4]


TWO_STEP_PLAN = {
    "capabilities": ["public.ui"],
    "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/js/campus/building.js"], "tests": ["t"], "risk": "low"},
              {"order": 2, "title": "b", "allowed_scope": ["public/it-campus.html"], "tests": ["t"], "risk": "low"}],
}


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def drive(monkeypatch, failures, hard=4, plan=TWO_STEP_PLAN):
    """failures: list of (gate-5 result extras, diff text) per attempt; last attempt past the list passes."""
    monkeypatch.setattr(worker, "REPAIR_REPLAN", {"enabled": True, "max_repairs": hard, "no_progress_rounds": 2,
                                                  "soft": {"soft_start": 2, "soft_step": 1}})
    monkeypatch.setattr(worker, "MAX_REPAIRS", 1)
    attempts, reuse_seen = [0], []

    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            reuse_seen.append(sorted(state.get("reuse") or {}))
            state["diffs"] = [{"diff": failures[attempts[0]][1] if attempts[0] < len(failures) else "ok"}]
            state["produced"] = dict(PRODUCED)
        if gate == 4:
            base["issues"] = []
        if gate == 5:
            n = attempts[0]
            attempts[0] += 1
            base["evidence"] = {"smoke_passed": True, "http_observed": True,
                                "functional": {"probe_id": "p", "passed": True}}
            state.update(branch="ai-board/2026-09-24-ticket-7", base_sha="a" * 40,
                         commits=[{"sha": "b" * 40, "title": "t", "files": ["public/x.html"]}])
            if n < len(failures):
                base.update(blocked=True, **failures[n][0])
        if gate == 5.5:
            base.update(risk_level="low", risk_signals=[])
        return base

    verdict = execute_pre_pr(plan, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                             run_gate=run_gate, cleanup=lambda *_a, **_k: None)
    return verdict, reuse_seen


def fail(reason, text=""):
    return {"reason": reason, "failure_class": "ordinary", "evidence": {"text": text}}


def test_multi_file_repair_reuses_the_passing_file(monkeypatch):
    verdict, reuse_seen = drive(monkeypatch, [(fail("generated tests failed", ROOT39_EVIDENCE), "d1")])
    assert verdict["outcome"] == "ready_for_pr"
    assert reuse_seen == [[], ["public/it-campus.html"]]
    assert verdict["repairs"] == [{"gate": 5, "reason": "generated tests failed"}]


def test_progress_keeps_repairing_past_the_soft_start_up_to_the_hard_cap(monkeypatch):
    rounds = [(fail(f"generated tests failed r{n}", f"# fail {5 - n}\nnot ok x"), f"d{n}") for n in range(5)]
    verdict, _ = drive(monkeypatch, rounds)
    assert verdict["outcome"] == "blocked" and len(verdict["repairs"]) == 4
    assert "repair stop" not in verdict["reason"]


def test_two_rounds_without_progress_stop_with_evidence(monkeypatch):
    rounds = [(fail(f"generated tests failed r{n}", "# fail 3\nnot ok x"), "same") for n in range(5)]
    verdict, _ = drive(monkeypatch, rounds)
    assert verdict["outcome"] == "blocked" and len(verdict["repairs"]) == 2
    assert "repair stop: stuck: 2 consecutive repair rounds without progress" in verdict["reason"]
    assert "failing tests 3" in verdict["reason"]


def test_scope_failure_stops_without_repair(monkeypatch):
    verdict, _ = drive(monkeypatch, [(fail("ghi ngoài scope: x"), "d")])
    assert verdict["repairs"] == [] and "repair stop: scope" in verdict["reason"]


def test_plan_inconsistent_requeues_as_plan_class(monkeypatch):
    verdict, _ = drive(monkeypatch, [(fail("x", "Cannot find module '/app/public/js/ghost.js'"), "d")])
    assert verdict["failure_class"] == "plan" and verdict["repairs"] == []


def test_a_no_oracle_run_reaches_the_verdict_as_needs_review_instead_of_a_replan():
    execution = worker._Execution({}, ticket_id=1, checkout_source="unused", deps=None, budget=None, run_gate=None,
                                  cleanup=None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                                  candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                                  checkpoint=None, plan_hash=None)
    execution.gates = [{"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker",
                        "functional": {"probe_id": None, "passed": True, "oracle_passed": False, "needs_review": True,
                                       "reason": "No trusted behavioral oracle for this request"}},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind, execution.state = None, {}
    execution.candidate = {"branch": "ai-board/ticket-1", "base_sha": "a" * 40, "head_sha": "b" * 40, "commits": []}
    execution.verdict()
    result = execution.result
    assert result["outcome"] == "needs_review" and result["candidate"] is not None
    assert result["failure_class"] is None and "loop stop" not in result["reason"]
    assert result["reason"].startswith("needs_review") and "No trusted behavioral oracle" in result["reason"]


def test_missing_tool_verdict_is_infra_retry_and_skips_repair():
    result = {"gate": 5, "failure_class": "transient",
              "reason": "thiếu công cụ trong container: curl (acceptance: curl -s $BASE/x | grep -q y)"}
    out = repair_class.classify(result, PRODUCED, SCOPE)
    assert (out["class"], out["action"], out["files"]) == ("infra_transient", "retry", [])
