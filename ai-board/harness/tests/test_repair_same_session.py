"""Lượt repair tiếp tục cùng phiên agent: lịch sử giữ nguyên, lỗi gate là observation cuối, cờ mặc định tắt."""
import pytest

import tools
from runtime import repair_session, tool_loop
from runtime.budget import Budget
from settings import get_settings
from test_tool_checkpoint import Crash, Store2
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps

REASON = "cổng 4: node --check public/a.html"
EVIDENCE = {"command": "node --check public/a.html", "text": "x" * 3000 + "SyntaxError: boom"}
SECOND_EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 3, "insert": "<p>C</p>"}]}}
OUTSIDE = {"tool": "edit_file", "arguments": {"file": "public/other.html", "edits": [{"after_line": 0, "insert": "x"}]}}


def fresh():
    return {"pins": None, "ledger": None, "steps": {}}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def attempt(script, shared, prior=(), *, reason=None, evidence=None, crash_on=None, check=lambda out: None):
    deps = Deps(script)
    budget = Budget()
    out = tool_loop.run_subtask(
        SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc", check=check,
        store=Store2(crash_on=crash_on, shared=shared), repair_reason=reason, repair_evidence=evidence,
        session_from=[Store2(shared=s) for s in prior])
    return out, deps


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_SAME_SESSION", "1")


def test_flag_is_off_by_default():
    assert get_settings().repair_same_session is False


def test_flag_off_keeps_the_fresh_prompt_and_drops_history():
    first = fresh()
    attempt([EDIT, TEST, FINISH], first)
    out, deps = attempt([EDIT, TEST, FINISH], fresh(), [first], reason=REASON, evidence=EVIDENCE)
    assert out["status"] == "proposed"
    assert "Làm lại đầy đủ từ đầu" in deps.prompts[0] and "TOOL RESULT edit_file" not in deps.prompts[0]


def test_gate_error_returns_to_the_same_session_and_history_survives(on):
    first = fresh()
    attempt([EDIT, TEST, FINISH], first)
    out, deps = attempt([SECOND_EDIT, FINISH], fresh(), [first], reason=REASON, evidence=EVIDENCE)
    prompt = deps.prompts[0]
    assert out["status"] == "proposed" and len(deps.prompts) == 2
    assert "Làm lại đầy đủ từ đầu" not in prompt
    assert prompt.count("TOOL RESULT edit_file") == 1 and "TOOL RESULT write_test" in prompt
    assert prompt.index("TOOL RESULT edit_file") < prompt.index("TOOL RESULT gate_feedback")
    assert prompt.rstrip().endswith("Return the next tool call.")
    assert out["out"]["code"].count("<p>B</p>") == 1 and "<p>C</p>" in out["out"]["code"]  # draft rebuilt, then edited


def test_observation_carries_command_red_output_tail_and_is_capped(on):
    first = fresh()
    attempt([EDIT, TEST, FINISH], first)
    _, deps = attempt([FINISH], fresh(), [first], reason=REASON, evidence=EVIDENCE)
    feedback = deps.prompts[0].split("TOOL RESULT gate_feedback", 1)[1]
    assert "node --check public/a.html" in feedback and "SyntaxError: boom" in feedback
    assert len(feedback) < repair_session.LIMIT + 500


def test_resume_after_a_crash_rebuilds_the_same_session_without_a_second_feedback(on):
    first, second = fresh(), fresh()
    attempt([EDIT, TEST, FINISH], first)
    with pytest.raises(Crash):
        attempt([SECOND_EDIT, FINISH], second, [first], reason=REASON, evidence=EVIDENCE, crash_on=("intent", 4))
    out, deps = attempt([FINISH], second, [first], reason=REASON, evidence=EVIDENCE)
    assert out["status"] == "proposed" and len(deps.prompts) == 1
    assert deps.prompts[0].count("TOOL RESULT gate_feedback") == 1
    assert [row["tool"] for _, row in sorted(second["steps"].items())].count("gate_feedback") == 1


def test_second_repair_sees_both_earlier_attempts(on):
    first, second = fresh(), fresh()
    attempt([EDIT, TEST, FINISH], first)
    attempt([SECOND_EDIT, FINISH], second, [first], reason=REASON, evidence=EVIDENCE)
    _, deps = attempt([FINISH], fresh(), [first, second], reason="cổng 5: test đỏ", evidence=None)
    prompt = deps.prompts[0]
    assert prompt.count("TOOL RESULT gate_feedback") == 2 and "cổng 5: test đỏ" in prompt
    assert prompt.count("TOOL RESULT edit_file") == 2


def test_security_layer_still_stops_a_repair_turn(on):
    first = fresh()
    attempt([EDIT, TEST, FINISH], first)
    out, _ = attempt([OUTSIDE], fresh(), [first], reason=REASON, evidence=EVIDENCE)
    assert out["status"] == "blocked" and out["failure_class"] == "critical"


def test_no_prior_finished_session_falls_back_to_a_fresh_start(on):
    empty = fresh()
    out, deps = attempt([EDIT, TEST, FINISH], fresh(), [empty], reason=REASON, evidence=EVIDENCE)
    assert out["status"] == "proposed" and "Làm lại đầy đủ từ đầu" in deps.prompts[0]


def test_prior_session_from_another_base_is_not_continued(on):
    first = fresh()
    attempt([EDIT, TEST, FINISH], first)
    first["pins"]["base"] = "other-sha"
    out, deps = attempt([EDIT, TEST, FINISH], fresh(), [first], reason=REASON, evidence=EVIDENCE)
    assert out["status"] == "proposed" and "Làm lại đầy đủ từ đầu" in deps.prompts[0]


def test_observation_without_evidence_still_names_the_reason():
    text = repair_session.observation(REASON, None)
    assert REASON in text and "GATE" in text
    assert len(repair_session.observation(REASON, {"text": "y" * 99999})) <= repair_session.LIMIT


class Checkpoint:
    def __init__(self, n=0):
        self.n = n

    def attempt(self, n):
        return Checkpoint(n)

    def store(self, base, child):
        return (self.n, base, child)


def test_earlier_sessions_lists_every_prior_attempt_only_on_a_repair_turn():
    from gates import implement
    state = {"checkpoint": Checkpoint(2), "base_sha": "b", "repair_reason": REASON}
    assert implement._earlier_sessions(state, 3) == [(0, "b", 3), (1, "b", 3)]
    assert implement._earlier_sessions({**state, "repair_reason": None}, 3) == []
    assert implement._earlier_sessions({**state, "checkpoint": Checkpoint(0)}, 3) == []


def test_compact_keeps_only_small_evidence_fields():
    slim = repair_session.compact({"command": "c", "text": "t", "screenshots": ["big"], "functional": {"checks": [
        {"name": "title", "ok": False}, {"name": "ok-one", "ok": True}]}})
    assert slim == {"command": "c", "checks": [{"name": "title", "ok": False}], "text": "t"}
    assert repair_session.compact(None) is None
