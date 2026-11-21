"""Gate 2.5 default path: an either/or question whose first option is the plan's own reading, stated by the request, is not asked."""
from __future__ import annotations

import subprocess

import pytest

from runtime.budgets.budget import Budget
from conftest import deps_with, plan_with
from gates import plan_validate
from test_gate25_answered import Scripted

NEW1 = "Giảng biến trình xu ôn."
LUAT = {"subject": f"Đổi chữ nút chế độ thứ ba của trang luật giao thông thành: {NEW1}",
        "body": "Trang ôn luật giao thông có một hàng nút chọn chế độ: luyện tập, thi sát hạch và một nút nữa về câu liệt. "
                f"Mình muốn nút về câu liệt đổi chữ thành: {NEW1}"}
LUAT_Q = (f"Bạn muốn đổi tên nút 'Câu điểm liệt' thành '{NEW1}' hay đổi tên một nút khác trong hàng nút chọn chế độ?")
LUAT_TASK = ("public/luat-giao-thong-600.html", f"Đổi chữ nút chế độ 'Câu điểm liệt' thành '{NEW1}'",
             f"grep -qF '{NEW1}' public/luat-giao-thong-600.html")

NEW2 = "Kiểm pha bài thành ôn."
LIVE = {"subject": f"Thêm tiêu đề '{NEW2}' ngay sau tiêu đề '📝 Mở quiz'",
        "body": f"Mình muốn thêm một tiêu đề '{NEW2}' ngay sau tiêu đề '📝 Mở quiz', đừng đụng các tiêu đề khác."}
LIVE_Q = ("Bạn muốn thêm tiêu đề mới ngay sau dòng <h3>📝 Mở quiz</h3> (trước input) hay ngay trước nút #quiz-open?")
LIVE_TASK = ("public/teacher-live.html", f"Thêm <h3>{NEW2}</h3> ngay sau <h3>📝 Mở quiz</h3>",
             f"public/teacher-live.html chứa '<h3>{NEW2}</h3>' ngay sau '<h3>📝 Mở quiz</h3>'")


def _plan(file, title, verify):
    plan = plan_with(["features"])
    plan["subtasks"] = [{**plan["subtasks"][1], "file": file, "title": title, "verify": verify, "depends_on": []}]
    return plan


def _run(monkeypatch, request, task, question, reason=""):
    monkeypatch.setenv("AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES", "")
    monkeypatch.setenv("AI_BOARD_GATE25_ANSWERED", "")
    monkeypatch.delenv("AI_BOARD_GATE25_FIXES", raising=False)
    plan = _plan(*task)
    validation = {"clear": False, "question": question, "grounded": True, "reason": reason, "grounding": [], "objection": None}
    models = Scripted(plan, [validation], {})
    state = {"plan": plan}
    return plan_validate.run({"id": "x", **request}, deps_with(models), Budget(), state), state, models


@pytest.mark.parametrize("request_, task, question", [(LUAT, LUAT_TASK, LUAT_Q), (LIVE, LIVE_TASK, LIVE_Q)], ids=["r203-mode-button", "r203-after-heading"])
def test_r203_confirmation_question_is_dropped_without_a_model_call(monkeypatch, request_, task, question):
    result, state, models = _run(monkeypatch, request_, task, question)
    assert result["blocked"] is False, result
    assert state["assumption"] == question
    assert len(models.calls) == 1


def test_validator_reason_keeps_the_question(monkeypatch):
    result, _, _ = _run(monkeypatch, LUAT, LUAT_TASK, LUAT_Q, reason="Hàng nút chế độ không có nút 'Câu điểm liệt'.")
    assert result["outcome"] == "needs_clarification" and result["public_message"] == LUAT_Q


VAGUE = {"subject": "Đổi chữ nút câu liệt", "body": "Trang luật giao thông, nút về câu liệt đổi chữ cho dễ hiểu hơn."}
NO_POSITION = {"subject": f"Thêm tiêu đề '{NEW2}'", "body": f"Ở trang dạy trực tiếp thêm một tiêu đề '{NEW2}'."}
NO_PAGE = {"subject": "Đổi chữ nút câu liệt", "body": f"Nút về câu liệt đổi chữ thành: {NEW1}"}


@pytest.mark.parametrize("request_, task, question", [
    (VAGUE, LUAT_TASK, LUAT_Q),  # request gives no new text
    (NO_POSITION, LIVE_TASK, LIVE_Q),  # insert request without a position
    (NO_PAGE, LUAT_TASK, LUAT_Q),  # request names neither page nor a quoted element
    (LUAT, LUAT_TASK, "Bạn muốn đổi chữ 'Câu điểm liệt' trong ô chọn (select) hay trong hàng nút chọn chế độ?"),
    (LUAT, LUAT_TASK, "Bạn muốn đổi nút '⚠️ Chỉ câu liệt' hay nút 'Câu điểm liệt'?"),
    (LUAT, LUAT_TASK, "Bạn muốn cấm bấm nút khi chưa đăng nhập hay vẫn cho bấm?"),
    (LUAT, LUAT_TASK, "Nút nào bạn muốn đổi?"),
], ids=["no-new-text", "no-position", "no-page", "first-option-unsupported", "plan-is-second-option", "intent", "open"])
def test_real_ambiguity_still_asks(monkeypatch, request_, task, question):
    result, state, _ = _run(monkeypatch, request_, task, question)
    assert result["outcome"] == "needs_clarification" and result["public_message"] == question
    assert "assumption" not in state


@pytest.mark.parametrize("request_, title, question", [
    ({"subject": "Đổi nút 'Quay lại' thành 'Trở về'", "body": ""}, "Đổi 'Quay lại' thành 'Trở về'",
     "Bạn muốn đổi nút 'Quay lại' trên trang luật giao thông hay trên trang khác?"),
    ({"subject": "Thêm nút 'Ôn tập' trên trang luật giao thông", "body": ""}, "Thêm nút 'Ôn tập' trên cùng trang",
     "Bạn muốn thêm nút 'Ôn tập' ở trên cùng trang hay ở dưới cùng trang?"),
    ({"subject": "Trang luật giao thông: đổi nút thành 'Xong'", "body": ""}, "Đổi 'OK' thành 'Xong'",
     "Bạn muốn đổi nút 'OK' hay nút khác?"),
], ids=["page-unnamed", "position-not-anchored", "short-anchor-unstated"])
def test_unstated_page_position_or_element_still_asks(monkeypatch, request_, title, question):
    result, _, _ = _run(monkeypatch, request_, ("public/luat-giao-thong-600.html", title, "v"), question)
    assert result["outcome"] == "needs_clarification"


def test_r203_after_heading_passes_source_grounding(monkeypatch, tmp_path):
    line = "<h3>📝 Mở quiz</h3>"
    page = tmp_path / "public" / "teacher-live.html"
    page.parent.mkdir(parents=True)
    page.write_text(f'<section>\n  {line}\n  <input id="quiz-q">\n  <button id="quiz-open">Mở</button>\n</section>\n', encoding="utf8")
    subprocess.run(["git", "init", "-q", str(tmp_path)], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "add", "."], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "-c", "user.name=Test", "-c", "user.email=test@example.com",
                    "commit", "-qm", "base"], check=True)
    monkeypatch.setenv("AI_BOARD_GATE25_ANSWERED", "")
    monkeypatch.delenv("AI_BOARD_GATE25_FIXES", raising=False)
    plan = _plan(*LIVE_TASK)
    validation = {"clear": False, "question": LIVE_Q, "grounded": True, "reason": "", "objection": None,
                  "grounding": [{"target": LIVE_TASK[0], "file": LIVE_TASK[0], "quote": line, "before": "không có tiêu đề mới",
                                 "after": f"<h3>{NEW2}</h3> ngay sau", "verify": LIVE_TASK[2]}]}
    state = {"plan": plan, "checkout_source": str(tmp_path)}
    request = {"id": "x", **LIVE, "grounding_required": True, "complexity_by_server": True}
    result = plan_validate.run(request, deps_with(Scripted(plan, [validation], {})), Budget(), state)
    assert result["blocked"] is False, result
    assert state["assumption"] == LIVE_Q and state["grounding"]["evidence"][0]["quote"] == line


def test_plan_on_two_files_still_asks():
    plan = _plan(*LUAT_TASK)
    plan["subtasks"].append({**plan["subtasks"][0], "file": "public/luat.html"})
    assert not plan_validate.confirms_plan(LUAT_Q, LUAT, plan)
