"""Guardrail đã nối vào pipeline: intake chặn trước Gate 1, cờ high của guard đẩy Gate 5.5 lên needs_review."""
import main
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import risk_triage


def test_sensitive_request_stops_before_planning_with_a_polite_public_message():
    models = FakeModels({"labels": ["politics_sovereignty"], "reason": "chủ quyền"})
    state = {}
    out = main.run_gate(1, {"subject": "Đổi theme", "body": "Đổi màu trang giống cờ nước khác"},
                        deps_with(models), Budget(), state)
    assert out["blocked"] and out["outcome"] == "intake_human_review"
    assert out["public_message"] and "cờ" not in out["public_message"]
    assert "plan" not in state and len(models.calls) == 1  # không lập plan


def test_benign_request_goes_on_to_planning():
    models = FakeModels(plan_with(["features"]))
    out = main.run_gate(1, {"subject": "Thêm nút phát âm", "body": "Thêm nút nghe phát âm tên thuốc"},
                        deps_with(models), Budget(), {})
    assert not out.get("blocked") and len(models.calls) == 2


def test_high_guard_flag_raises_risk_to_high():
    state = {"diffs": [{"diff": "diff --git a/public/a.html b/public/a.html\n+<p>x</p>\n"}],
             "review_required": True,
             "guard_flags": [{"severity": "high", "detail": "public/logo.png: ảnh mới cần người xem"}]}
    out = risk_triage.run(state)
    assert out["risk_level"] in ("high", "critical")
    assert any(s["name"] == "guard_review" for s in out["risk_signals"])
