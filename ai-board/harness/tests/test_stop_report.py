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


def test_flag_default_off_and_env_on():
    assert stop_report.enabled() is False
    assert stop_report.enabled(env={"AI_BOARD_STOP_REPORT_V2": "1"}) is True
    assert get_settings(env={}).stop_report_v2 is False


def test_build_and_render_name_tried_and_blocker():
    report = stop_report.build("blocked_gate_5", "Chữ cần bỏ vẫn còn trên trang", 5, None, [1, 2, 2.5, 3, 4, 5])
    assert report == {"class": "check_failed", "tried": [1, 2, 2.5, 3, 4, 5], "blocked_gate": 5,
                      "reason": "Chữ cần bỏ vẫn còn trên trang"}
    text = stop_report.render(report)
    assert text.startswith("stop[check_failed]")
    assert "tried gates 1, 2, 2.5, 3, 4, 5" in text
    assert "blocked at gate 5: Chữ cần bỏ vẫn còn trên trang" in text
