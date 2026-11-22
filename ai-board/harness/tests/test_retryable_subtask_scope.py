"""critical_only_checks: out-of-scope write is rejected with an owner hint and retried within the repair budget."""
import pytest

import tools
from gates import implement
from runtime import subtask_files, tool_loop
from runtime.budgets.budget import Budget
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps

OUTSIDE = {"tool": "edit_file", "arguments": {"file": "public/other.html", "edits": [{"after_line": 0, "insert": "x"}]}}
PLAN = [SUBTASK, {"title": "other", "file": "public/other.html", "verify": "v"}]


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")


def go(script, budget=None, plan=PLAN):
    deps, budget = Deps(script), budget or Budget()
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc",
                                check=lambda o: None, plan_subtasks=plan)
    return out, deps, budget


def test_flag_off_stays_terminal():
    out, _, _ = go([OUTSIDE, EDIT, TEST, FINISH])
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")


def test_out_of_scope_edit_rejected_with_owner_hint_and_loop_continues(on):
    out, deps, budget = go([OUTSIDE, EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and "x" not in out["out"].get("extra_files", {})
    assert "public/other.html" not in (out["out"].get("extra_files") or {})
    hint = deps.prompts[1]
    assert "'other'" in hint and "public/a.html" in hint and "Không có thay đổi nào được áp" in hint
    assert budget.semantic_repairs == 1


def test_unowned_file_hint_says_no_subtask_owns_it(on):
    _, deps, _ = go([OUTSIDE, EDIT, TEST, FINISH], plan=[SUBTASK])
    assert "không subtask nào" in deps.prompts[1]


def test_repair_cap_exhausted_blocks(on):
    budget = Budget()
    budget.semantic_repairs = budget.max_semantic_repairs
    out, _, _ = go([OUTSIDE, EDIT, TEST, FINISH], budget)
    assert (out["status"], out["failure_class"]) == ("blocked", "critical") and "ngoài phạm vi" in out["reason"]


def test_in_scope_edits_spend_nothing(on):
    out, _, budget = go([EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and budget.semantic_repairs == 0


def test_one_shot_scope_error_gets_scope_hint(on):
    hint = implement.retry_hint("test phải import hoặc nêu file trong phạm vi: public/a.html", 0)
    assert hint == subtask_files.SCOPE_RETRY


def test_one_shot_hint_flag_off_unchanged():
    assert implement.retry_hint("test phải import hoặc nêu file trong phạm vi: public/a.html", 0) == "Sửa đúng lỗi trên, giữ nguyên file và phạm vi."
