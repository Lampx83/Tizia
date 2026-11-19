"""Gate 2.5 AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES: named edits and repo rules never become student questions."""
from __future__ import annotations

import pytest

from runtime.budget import Budget
from conftest import deps_with, plan_with
from gates import plan_validate
from test_gate25_answered import Scripted

OLD, NEW = "💬 Viết phản hồi", "Bài mới."
NAMED = {"subject": f"Đổi chữ nút '{OLD}' trang bài giảng thành '{NEW}'", "body": f"Ở trang bài giảng, nút '{OLD}' đổi chữ thành '{NEW}'."}
VAGUE = {"subject": "Đổi chữ nút trang bài giảng", "body": "Mình muốn đổi chữ nút cho hay hơn."}
RULE_Q = "Bạn muốn giữ hay đổi hành vi nút, vì luật cấm 'onclick='?"
ASK = {"clear": False, "question": "Nút nào bạn muốn đổi?", "grounded": True, "reason": "?", "grounding": []}


def _run(monkeypatch, request, question, *, on=True):
    monkeypatch.setenv("AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES", "1" if on else "")
    monkeypatch.setenv("AI_BOARD_GATE25_FIXES", "")
    plan = plan_with(["features"])
    plan["subtasks"] = [{**plan["subtasks"][1], "file": "public/lesson.html", "title": f"Đổi '{OLD}' thành '{NEW}'",
                         "verify": f"grep -qF '{NEW}' public/lesson.html"}]
    models = Scripted(plan, [{**ASK, "question": question}], {})
    state = {"plan": plan}
    return plan_validate.run({"id": "x", **request}, deps_with(models), Budget(), state), state, models


def test_named_edit_does_not_ask_again(monkeypatch):
    result, state, _ = _run(monkeypatch, NAMED, ASK["question"])
    assert result.get("outcome") != "needs_clarification", result
    assert state["assumption"] == ASK["question"]


def test_repo_rule_question_is_dropped_even_when_request_is_vague(monkeypatch):
    result, _, _ = _run(monkeypatch, VAGUE, RULE_Q)
    assert result.get("outcome") != "needs_clarification", result


def test_truly_ambiguous_request_still_asks(monkeypatch):
    result, _, _ = _run(monkeypatch, VAGUE, ASK["question"])
    assert result["outcome"] == "needs_clarification"


def test_flag_off_still_asks_named_edit(monkeypatch):
    result, _, _ = _run(monkeypatch, NAMED, ASK["question"], on=False)
    assert result["outcome"] == "needs_clarification"


def test_prompt_carries_rules_only_when_flag_on(monkeypatch):
    plan = plan_with(["features"])
    monkeypatch.setenv("AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES", "1")
    assert "5d. NAMED EDIT" in plan_validate.build_prompt(NAMED, plan)
    monkeypatch.setenv("AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES", "")
    assert "5d. NAMED EDIT" not in plan_validate.build_prompt(NAMED, plan)


def _plan(file="public/lesson.html"):
    return {"summary_vi": "Đổi chữ nút", "capabilities": [], "subtasks": [{"title": "Đổi 'Quay lại' thành 'Trở về'", "file": file, "verify": "'Trở về' hiện"}]}


@pytest.mark.parametrize("body,dropped", [
    ("Nút 'Quay lại' thành 'Trở về' nhé. Em không nhớ nút nằm ở trang nào.", False),
    ("Đổi 'Quay lại' thành 'Trở về'. Nhiều trang có nút này.", False),
    ("Ở trang bài giảng, nút 'Quay lại' đổi thành 'Trở về'.", True),
    ("Trong public/lesson.html đổi 'Quay lại' thành 'Trở về'.", True),
    ("Trang lesson: 'Quay lại' thành 'Trở về'.", True),
])
def test_names_edit_requires_page(body, dropped):
    assert plan_validate.names_edit({"subject": "Đổi chữ", "body": body}, _plan()) is dropped
