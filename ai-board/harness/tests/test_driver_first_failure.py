import json

import pytest

from evaluation.pipeline import driver_first_failure as ff

if not ff.ANALYSIS.exists():
    pytest.skip("needs the local error-analysis scripts beside AB_DATA", allow_module_level=True)


def ev(at, src, gate, status, detail="", extra=""):
    return {"at": at, "ord": 0, "src": src, "gate": gate, "status": status, "detail": detail, "extra": extra}


def span(at, prompt, status="ok", finish='["stop"]'):
    return ev(at, "span", "3", status, f"{prompt} provider=vllm result=ok finish={finish}", "10")


def test_node_row_wins_over_later_gate_row_and_gate_reason_is_not_needed():
    events = [
        ev(1000, "run", None, ""),
        ev(2000, "node", "gate_1", "blocked", "plan_target_uncertain: x"),
        ev(9000, "gate", "1", "blocked", "plan_target_uncertain: x"),
    ]
    r = ff.compute(events)
    assert r["first_block"] == {"gate": "1", "reason": "plan_target_uncertain: x", "seconds": 1.0}
    assert r["mode"] == "G plan_target_uncertain"


def test_gate_row_reason_used_when_node_reason_empty():
    events = [
        ev(1000, "run", None, ""),
        ev(2000, "node", "gate_3", "blocked", ""),
        ev(9000, "gate", "3", "blocked", "state_repeat: same"),
    ]
    r = ff.compute(events)
    assert r["first_block"]["reason"] == "state_repeat: same"
    assert r["first_block"]["seconds"] == 1.0
    assert r["mode"].startswith("R ")


def test_errors_and_length_cuts_counted_only_before_first_block():
    events = [
        ev(0, "run", None, ""),
        span(100, "react_plan.md", "error"),
        span(200, "validate.md", "ok", '["length"]'),
        span(300, "validate.md", "ok", '["length"]'),
        span(400, "classifier_danger.md", "error"),
        ev(500, "node", "gate_1", "blocked", "plan_ungrounded: y"),
        span(600, "late.md", "error"),
    ]
    r = ff.compute(events)
    assert r["call_errors_before"] == 1
    assert r["length_cut_before"] == "validate.md"
    assert r["mode"] == "L plan_ungrounded"


def test_no_block_gives_null_first_block_and_n_mode():
    r = ff.compute([])
    assert r["first_block"] is None and r["mode"].startswith("N3")
    r = ff.compute([ev(0, "run", None, ""), span(5, "a.md", "error")])
    assert r["first_block"] is None and r["mode"].startswith("N1")


RULE_SAMPLES = {
    "tool_manifest_not_approved": "A1", "tool_manifest_unavailable": "A2", "không có trong repo": "K",
    "intake_human_review": "F1", "intake_needs_info": "F2", "plan_target_uncertain": "G", "plan_ungrounded": "L",
    "plan_unfit": "M", "plan không hợp lệ: z": "B2", "feature acceptance failed": "D",
    "No trusted behavioral oracle": "E", "classifier_error": "H2", "secret leaked": "H", "No reviewed, compatible": "I1",
    "Errno 13": "I2", "budget exhausted": "J", "generated tests fail": "T", "state_repeat: a": "R",
    "giao diện tệ hơn": "V", "Không có trang nào để quan sát": "C4", "something else": "Z",
    "verify phải là lệnh chạy được: nói bằng lời": "B1a",
    "verify phải là lệnh chạy được: grep -q x f": "B1b",
    "không hiển thị trên trang: 'Xin chào'": "C2",
    "không hiển thị trên trang: '.btn-x'": "C1",
    "vẫn còn trên trang: 'abc'": "C3",
}


def test_each_mode_rule():
    for reason, code in RULE_SAMPLES.items():
        r = ff.compute([ev(0, "run", None, ""), ev(10, "node", "gate_2", "blocked", reason)])
        assert r["mode"].split()[0] == code, (reason, r["mode"])


def test_node_blocked_without_reason_is_x():
    r = ff.compute([ev(0, "node", "gate_2", "blocked", "")])
    assert r["mode"].startswith("X")


def test_for_record_never_raises_and_records_error():
    out = ff.for_record({"request_id": 5}, lambda sql: (_ for _ in ()).throw(RuntimeError("db down")))
    assert "db down" in out["first_block_error"] and "mode" not in out
    assert ff.for_record({}, lambda sql: [])["first_block_error"]


def test_for_record_uses_fetch_rows():
    rows = [ev(0, "run", None, ""), ev(4000, "node", "gate_1", "blocked", "intake_needs_info")]
    out = ff.for_record({"request_id": 5}, lambda sql: json.loads(json.dumps(rows)))
    assert out["mode"].startswith("F2") and out["first_block"]["seconds"] == 4.0
