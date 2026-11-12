"""Ghi ngoài phạm vi lần đầu là observation, lần hai dừng critical; path cấm dừng ngay; cờ mặc định tắt."""
import pytest

import tools
from runtime import tool_loop
from runtime.budget import Budget
from settings import get_settings
from test_tool_checkpoint import Store2
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps

OUTSIDE = {"tool": "edit_file", "arguments": {"file": "public/other.html", "edits": [{"after_line": 0, "insert": "x"}]}}
BAD_TEST = {"tool": "write_test", "arguments": {"test_file": "scripts/a.test.js", "test": "x"}}
LOCKED = {"tool": "edit_file", "arguments": {"file": "package-lock.json", "edits": [{"after_line": 0, "insert": "x"}]}}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SCOPE_FIRST_WARNING", "1")


def go(script, store=None):
    deps, budget = Deps(script), Budget()
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc",
                                check=lambda o: None, store=store)
    return out, deps, budget


def test_flag_is_off_by_default():
    assert get_settings().scope_first_warning is False


def test_flag_off_first_miss_still_stops():
    out, _, _ = go([OUTSIDE])
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")


def test_first_miss_is_a_warning_with_the_allowed_scope_and_no_side_effect(on):
    out, deps, budget = go([OUTSIDE, EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and "other.html" not in out["out"]["code"]
    assert "public/a.html" in deps.prompts[1] and "dừng" in deps.prompts[1]
    assert budget.semantic_repairs == 0


def test_second_miss_stops_critical(on):
    out, _, _ = go([OUTSIDE, OUTSIDE])
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")


def test_test_outside_test_dir_gets_the_same_first_warning(on):
    out, _, _ = go([BAD_TEST, EDIT, TEST, FINISH])
    assert out["status"] == "proposed"


def test_policy_denied_write_stops_at_once(on):
    out, _, _ = go([LOCKED, EDIT, TEST, FINISH])
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")


def test_traversal_stops_at_once(on):
    bad = {"tool": "read_file", "arguments": {"file": "../secret"}}
    out, _, _ = go([bad, EDIT, TEST, FINISH])
    assert out["failure_class"] == "critical"


def test_resume_after_warning_keeps_the_warning_spent(on):
    shared = {"pins": None, "ledger": None, "steps": {}}
    go([OUTSIDE, EDIT], Store2(shared=shared))
    out, _, _ = go([OUTSIDE], Store2(shared=shared))
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")
    assert "replay" not in out["reason"] and "ngoài phạm vi" in out["reason"]
