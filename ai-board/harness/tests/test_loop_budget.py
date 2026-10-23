"""Ngân sách mềm của tool loop: progress nâng trần mềm, lặp và idle dừng subtask, cờ tắt = hành vi cũ."""
import json

import pytest

import tools
from runtime import limits, tool_loop
from runtime.budget import Budget
from runtime.loop_budget import Continue, LoopBudget, Stop, make_adaptive

SPEC = {"soft_start": 2, "soft_step": 2, "same_call_repeats": 3, "no_progress_steps": 3}
PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}


def grep(word):
    return ("grep", {"words": [word]}, "")


def test_progress_raises_soft_budget_up_to_the_ceiling():
    budget = LoopBudget(SPEC, ceiling=5)
    assert budget.soft_limit() == 2 and budget.allow()
    budget.step("read_file", {"file": "a", "start": 1}, "")
    assert budget.soft_limit() == 4
    budget.step("edit_file", {"file": "a"}, "ok")
    assert budget.soft_limit() == 5 and budget.allow() is True
    budget.steps = 5
    assert budget.allow() is False


def test_same_read_is_not_progress_twice():
    budget = LoopBudget(SPEC, ceiling=10)
    budget.step("read_file", {"file": "a"}, "")
    budget.step("read_file", {"file": "a"}, "")
    assert budget.progress == 1


def test_changed_check_state_is_progress_and_same_state_is_not():
    budget = LoopBudget(SPEC, ceiling=10)
    budget.step("run_check", {"profile": "light"}, json.dumps({"passed": False, "exit_code": 1}))
    budget.step("run_check", {"profile": "light"}, json.dumps({"passed": False, "exit_code": 1}))
    assert budget.progress == 1
    budget.step("run_check", {"profile": "light"}, json.dumps({"passed": True, "exit_code": 0}))
    assert budget.progress == 2


def test_failed_turn_is_not_progress():
    budget = LoopBudget(SPEC, ceiling=10)
    budget.step("edit_file", {"file": "a"}, "lỗi", ok=False)
    assert budget.progress == 0


def test_repeated_identical_request_stops_as_stuck():
    budget = LoopBudget({**SPEC, "no_progress_steps": 10}, ceiling=10)
    verdicts = [budget.step(*grep("abc")) for _ in range(4)]
    assert all(isinstance(v, Continue) for v in verdicts[:3])
    assert isinstance(verdicts[3], Stop) and verdicts[3].failure_class == "ordinary"
    assert "lặp lại" in verdicts[3].reason


def test_idle_steps_without_signal_stop_as_stuck():
    budget = LoopBudget(SPEC, ceiling=10)
    verdicts = [budget.step(*grep(w)) for w in ("a", "b", "c")]
    assert isinstance(verdicts[2], Stop) and "tiến triển" in verdicts[2].reason


def test_finish_never_counts_as_idle():
    budget = LoopBudget(SPEC, ceiling=10)
    budget.step(*grep("a"))
    budget.step(*grep("b"))
    assert isinstance(budget.step("finish", {}, ""), Continue)


def test_flag_default_off_and_env_turns_it_on(monkeypatch):
    monkeypatch.delenv("AI_BOARD_ADAPTIVE_BUDGET", raising=False)
    assert limits.loop_adaptive()["enabled"] is False and make_adaptive(10) is None
    monkeypatch.setenv("AI_BOARD_ADAPTIVE_BUDGET", "1")
    adaptive = make_adaptive(10)
    assert isinstance(adaptive, LoopBudget) and adaptive.ceiling == 10
    assert adaptive.spec["soft_start"] == limits.contract()["limits"]["loop"]["soft_start"]


@pytest.fixture
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


class Deps:
    def __init__(self, script):
        self.script = list(script)

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


def run_loop(script):
    return tool_loop.run_subtask(SUBTASK, PAGE, deps=Deps(script), budget=Budget(), model="m", source=".", sha="abc",
                                 check=lambda _out: None)


def test_loop_flag_on_stops_identical_reads_as_blocked(base_file, monkeypatch):
    monkeypatch.setenv("AI_BOARD_ADAPTIVE_BUDGET", "1")
    read = {"tool": "read_file", "arguments": {"file": "public/a.html"}}
    out = run_loop([read])
    assert out["status"] == "blocked" and out["failure_class"] == "ordinary" and "lặp lại" in out["reason"]


def test_loop_flag_off_keeps_fixed_repeat_stop(base_file, monkeypatch):
    monkeypatch.delenv("AI_BOARD_ADAPTIVE_BUDGET", raising=False)
    read = {"tool": "read_file", "arguments": {"file": "public/a.html"}}
    out = run_loop([read])
    assert out["status"] == "blocked" and "lặp lại" in out["reason"]


def test_loop_flag_on_distinct_idle_tree_calls_stop_as_stuck(base_file, monkeypatch):
    monkeypatch.setenv("AI_BOARD_ADAPTIVE_BUDGET", "1")
    script = [{"tool": "tree", "arguments": {"path": f"public{i}"}} for i in range(6)]
    out = run_loop(script)
    assert out["status"] == "blocked" and "tiến triển" in out["reason"]
