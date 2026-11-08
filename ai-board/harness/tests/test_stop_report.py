"""Stop report v2 (LF/162): stable class + tried/blocked render, off by default."""
import pytest

from runtime import stop_report
from settings import get_settings


@pytest.mark.parametrize("outcome, reason, gate, failure_class, cls", [
    ("intake_human_review", "intake_human_review: tất định: privileged_area", 1, None, "human_review"),
    (None, "risk triage requires human review", 5.5, None, "human_review"),
    ("needs_clarification", "needs_clarification", 2.5, None, "needs_clarification"),
    ("intake_needs_info", "intake_needs_info: LLM: off_topic", 1, None, "needs_clarification"),
    ("plan_unfit", "plan_unfit: x", 2.5, None, "plan_invalid"),
    ("complexity_gated", "complexity_gated", 2.5, None, "plan_invalid"),
    (None, "plan không hợp lệ: verify phải là lệnh chạy được", 1, None, "plan_invalid"),
    ("budget_exhausted", "budget exhausted", 3, "budget", "budget"),
    ("error_gate_3.0: boom", "boom", 3, None, "infra"),
    (None, "http timeout", 3, "transient", "infra"),
    (None, "Chữ cần bỏ vẫn còn trên trang", 5, None, "check_failed"),
    ("blocked_gate_4", "static fail", 4, None, "check_failed"),
    (None, "repair stuck", 3, None, "model_limit"),
])
def test_classify_stable_class(outcome, reason, gate, failure_class, cls):
    assert stop_report.classify(outcome, reason, gate, failure_class) == cls


def test_flag_default_off_and_env_on(monkeypatch):
    monkeypatch.delenv("AI_BOARD_STOP_REPORT_V2", raising=False)
    assert stop_report.enabled() is False
    assert stop_report.enabled(env={"AI_BOARD_STOP_REPORT_V2": "1"}) is True
    assert get_settings(env={}).stop_report_v2 is False


def test_build_and_render_name_tried_and_blocker():
    report = stop_report.build("blocked_gate_5", "Chữ cần bỏ vẫn còn trên trang", 5, None, [1, 2, 2.5, 3, 4, 5])
    assert report == {"class": "check_failed", "tried": [1, 2, 2.5, 3, 4, 5], "blocked_gate": 5,
                      "reason": "Chữ cần bỏ vẫn còn trên trang",
                      "next_step": stop_report.next_step("check_failed")}
    text = stop_report.render(report)
    assert text.startswith("stop[check_failed]")
    assert "tried gates 1, 2, 2.5, 3, 4, 5" in text
    assert "blocked at gate 5: Chữ cần bỏ vẫn còn trên trang" in text


@pytest.mark.parametrize("cls, route", [
    ("human_review", "needs_review"), ("check_failed", "claude_code_queue"), ("model_limit", "claude_code_queue"),
    ("plan_invalid", "claude_code_queue"), ("budget", "claude_code_queue"),
    ("needs_clarification", "clarify"), ("infra", "retry"),
])
def test_next_step_route_per_class(cls, route):
    step = stop_report.next_step(cls)
    assert step["route"] == route and step["message"]


def test_build_carries_next_step_and_render_names_it():
    report = stop_report.build("blocked_gate_5", "x", 5, None, [1, 5])
    assert report["next_step"] == stop_report.next_step("check_failed")
    assert f"next: {report['next_step']['route']}" in stop_report.render(report)


def test_stop_metrics_separates_correct_stop_wrong_ship_budget():
    rows = [
        {"should_stop": True, "outcome": "blocked", "stop_class": "human_review"},
        {"should_stop": True, "outcome": "needs_review", "stop_class": None},
        {"should_stop": True, "outcome": "ready_for_pr", "stop_class": None},
        {"should_stop": True, "outcome": "blocked", "stop_class": "budget"},
        {"should_stop": False, "outcome": "blocked", "stop_class": "check_failed"},
        {"should_stop": False, "outcome": "ready_for_pr", "stop_class": None},
    ]
    m = stop_report.stop_metrics(rows)
    assert (m["should_stop"], m["correct_stop"], m["wrong_ship"], m["budget_exhausted"], m["over_stop"]) == (4, 2, 1, 1, 1)
    assert m["correct_stop_rate"] == 0.5 and m["wrong_ship_rate"] == 0.25


def test_stop_metrics_empty_has_no_rates():
    m = stop_report.stop_metrics([])
    assert m["correct_stop_rate"] is None and m["wrong_ship_rate"] is None
