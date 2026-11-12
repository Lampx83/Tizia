"""Mỗi gate trả cùng một loại lỗi tối đa 3 lần; lần thứ tư dừng kèm stop report. Cờ mặc định tắt."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from runtime import feedback_cap  # noqa: E402
from settings import get_settings  # noqa: E402


class Budget:
    units = 0

    def tick(self):
        return True

    def spend_repair(self):
        return True


def _execution():
    import worker
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=Budget(), run_gate=None, cleanup=None,
                                  catalog=None, request_detail=None, memory_path=None, should_stop=None, candidate_opts=None,
                                  request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.plan = {"steps": []}
    execution.kind = "ordinary"
    return execution


def _fail(execution, gate=4, reason="node --check public/a.html", text="SyntaxError: boom"):
    result = {"gate": gate, "blocked": True, "reason": reason, "failure_class": "ordinary", "risk_level": "low",
              "evidence": {"command": "node --check public/a.html", "text": text}}
    execution.gates.append(result)
    execution.last_result = result
    n = len(execution.gates)
    line = f"+ distinct line {n} " + "abcdefghij"[n % 10] * n + chr(10)
    execution.state = {"diffs": [{"diff": line * 9}]}
    return execution.repair_check()


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GATE_FEEDBACK_CAP", "1")


def test_flag_is_off_by_default():
    assert get_settings().gate_feedback_cap is False


def test_flag_off_never_caps(monkeypatch):
    monkeypatch.delenv("AI_BOARD_GATE_FEEDBACK_CAP", raising=False)
    execution = _execution()
    assert [_fail(execution) for _ in range(4)] == ["repair"] * 4
    assert execution.feedback_stop is None


def test_same_kind_at_same_gate_gets_three_feedbacks_then_stops(on):
    execution = _execution()
    assert [_fail(execution) for _ in range(3)] == ["repair"] * 3
    assert _fail(execution) == "done"
    assert execution.feedback_stop["count"] == 3 and execution.feedback_stop["gate"] == 4
    assert execution.feedback_stop["kind"] == "syntax"


def test_a_different_kind_or_gate_has_its_own_budget(on):
    execution = _execution()
    for _ in range(3):
        _fail(execution)
    assert _fail(execution, gate=5, reason="generated tests failed", text="AssertionError: expected 1") == "repair"
    assert _fail(execution, gate=4, reason="boom", text="plain failure") == "repair"


def test_count_survives_resume_through_the_repairs_list(on):
    execution = _execution()
    for _ in range(3):
        _fail(execution)
    resumed = _execution()
    resumed.repairs = list(execution.repairs)
    assert _fail(resumed) == "done"


def test_verdict_stop_report_names_gate_kind_count_and_last_evidence(on):
    execution = _execution()
    for _ in range(4):
        _fail(execution, text="a" * 900 + "SyntaxError: last")
    execution.verdict()
    stop = execution.result["stop_report"]
    assert execution.result["outcome"] == "blocked"
    assert (stop["blocked_gate"], stop["error_kind"], stop["feedback_count"]) == (4, "syntax", 3)
    assert stop["last_evidence"].endswith("SyntaxError: last") and len(stop["last_evidence"]) <= feedback_cap.EVIDENCE_LIMIT


def test_other_stops_keep_a_report_free_of_feedback_fields(on):
    execution = _execution()
    execution.gates = [{"gate": 4, "blocked": True, "reason": "boom", "risk_level": "low"}]
    execution.verdict()
    assert "stop_report" not in execution.result
