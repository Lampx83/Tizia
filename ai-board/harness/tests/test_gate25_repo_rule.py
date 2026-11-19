"""Gate 2.5 default path: a repo-rule or implementation objection never becomes a requester question."""
from __future__ import annotations

import subprocess

from runtime.budget import Budget
from conftest import deps_with, plan_with
from gates import plan_validate
from test_gate25_answered import Scripted

OLD, NEW = "💬 Viết phản hồi", "Bài biến tựu cân xu."
LINE = """<button onclick="document.getElementById('cmt-input').focus()">💬 Viết phản hồi</button>"""
R203 = {"subject": f"Đổi chữ nút '{OLD}' thành '{NEW}'",
        "body": f"Thẻ hiện ra khi học xong bài có nút '{OLD}'. Chỉ đổi chữ nút đó thành '{NEW}'."}
R203_Q = ("Quy tắc cấm dùng onclick trong public/ yêu cầu chuyển sự kiện sang addEventListener. Em có muốn giữ nguyên "
          "hành vi hiện tại hay thay đổi cách xử lý khi bấm nút này không?")
R203_REASON = "Yêu cầu thay đổi văn bản nhưng kế hoạch giữ nguyên thuộc tính onclick bị cấm bởi quy tắc repo."
INTENT_Q = "Bạn muốn cấm bấm nút khi chưa đăng nhập hay vẫn cho bấm?"


def _plan(title=f"Đổi chữ nút '{OLD}' thành '{NEW}'"):
    plan = plan_with(["features"])
    plan["subtasks"] = [{**plan["subtasks"][1], "file": "public/lesson.html", "title": title,
                         "verify": f"grep -qF '{NEW}' public/lesson.html", "depends_on": []}]
    return plan


def _run(monkeypatch, validation, plan=None, request=R203, state=None):
    monkeypatch.setenv("AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES", "")
    monkeypatch.setenv("AI_BOARD_GATE25_FIXES", "")
    plan = plan or _plan()
    state = {"plan": plan, **(state or {})}
    result = plan_validate.run({"id": "x", **request}, deps_with(Scripted(plan, [validation], {})), Budget(), state)
    return result, state


def _ask(question):
    return {"clear": False, "question": question, "grounded": True, "reason": R203_REASON, "grounding": [], "objection": None}


def test_r203_repo_rule_question_on_existing_code_is_dropped(monkeypatch):
    result, state = _run(monkeypatch, _ask(R203_Q))
    assert result["blocked"] is False, result
    assert state["assumption"] == R203_Q


def test_plan_that_adds_a_handler_goes_back_to_the_planner(monkeypatch):
    plan = _plan(title=f"Đổi chữ nút thành '{NEW}', thêm onclick=\"go()\" cho nút")
    result, _ = _run(monkeypatch, _ask(R203_Q), plan=plan)
    assert result["outcome"] == plan_validate.PLAN_UNFIT and result.get("outcome") != "needs_clarification"
    assert any('onclick="go()"' in signal for signal in result["signals"])


def test_intent_question_is_still_asked(monkeypatch):
    for question in (INTENT_Q, "Nút nào bạn muốn đổi?"):
        result, _ = _run(monkeypatch, _ask(question), request={"subject": "Đổi chữ nút", "body": "đổi cho hay hơn"})
        assert result["outcome"] == "needs_clarification" and result["public_message"] == question


def test_intent_question_beside_a_rule_veto_is_still_asked(monkeypatch):
    veto = {**_ask("Nút nào bạn muốn đổi?"), "grounded": False,
            "objection": {"claim": "onclick bị cấm", "evidence": [{"file": "public/lesson.html", "snippet": LINE}]}}
    result, _ = _run(monkeypatch, veto, request={"subject": "Đổi chữ nút", "body": "đổi cho hay hơn"})
    assert result["outcome"] == "needs_clarification"


def test_rule_question_tokens():
    assert plan_validate.asks_repo_rule(R203_Q)
    assert plan_validate.asks_repo_rule("Giữ hay đổi hành vi nút (luật repo cấm 'onclick=')?")
    assert not plan_validate.asks_repo_rule(INTENT_Q)


def test_rule_breaks_ignores_markup_already_in_source():
    quoted = _plan(title=f"Trong `{LINE}` đổi chữ thành '{NEW}'")
    assert plan_validate.rule_breaks(quoted, {"public/lesson.html": f"<div>\n  {LINE}\n</div>"}) == []
    assert plan_validate.rule_breaks(quoted, {})


def _repo(tmp_path):
    page = tmp_path / "public" / "lesson.html"
    page.parent.mkdir(parents=True)
    page.write_text(f"<div class=\"end-card\">\n  {LINE}\n</div>\n", encoding="utf8")
    subprocess.run(["git", "init", "-q", str(tmp_path)], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "add", "."], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "-c", "user.name=Test", "-c", "user.email=test@example.com",
                    "commit", "-qm", "base"], check=True)


def test_r203_repo_rule_veto_on_existing_code_does_not_block(monkeypatch, tmp_path):
    _repo(tmp_path)
    veto = {"clear": False, "question": R203_Q, "grounded": False, "reason": R203_REASON,
            "grounding": [{"target": "public/lesson.html", "file": "public/lesson.html", "quote": LINE,
                           "before": OLD, "after": NEW, "verify": "nút hiện chữ mới"}],
            "objection": {"claim": "Kế hoạch giữ nguyên onclick bị cấm bởi quy tắc repo.",
                          "evidence": [{"file": "public/lesson.html", "snippet": LINE}]}}
    result, state = _run(monkeypatch, veto, request={**R203, "grounding_required": True, "complexity_by_server": True},
                         state={"checkout_source": str(tmp_path)})
    assert result["blocked"] is False, result
    assert state["grounding"]["evidence"][0]["quote"] == LINE


def test_r203_repo_rule_veto_in_reason_only_does_not_block(monkeypatch, tmp_path):
    _repo(tmp_path)
    veto = {**_ask(R203_Q), "grounded": False}
    result, state = _run(monkeypatch, veto, request={**R203, "grounding_required": True, "complexity_by_server": True},
                         state={"checkout_source": str(tmp_path)})
    assert result["blocked"] is False, result
    assert "public/lesson.html" in state["validator_note"]
