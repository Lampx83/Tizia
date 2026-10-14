"""Gate 2.5 AI_BOARD_GATE25_ANSWERED: clarifications settled by a verbatim request/source quote do not block."""
from __future__ import annotations

import json

import pytest

from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import plan_validate

# Dev-split cases from the s20261003 corpus (blocked by gate 2.5 on a right plan); source lines copied from the base commit.
CASES = {
    "replace_text-l3-9b8997": dict(
        subject="Đổi chữ nút chế độ thứ ba của trang luật giao thông thành: Giảng biến trình xu ôn.",
        body="Trang ôn luật giao thông có một hàng nút chọn chế độ: luyện tập, thi sát hạch và một nút nữa về câu liệt. Mình muốn nút về câu liệt đổi chữ thành: Giảng biến trình xu ôn.",
        question="Bạn muốn đổi chữ 'Câu điểm liệt' trong ô chọn (select) hay trong hàng nút chọn chế độ?",
        answer="Đổi nút thứ ba trong hàng nút chọn chế độ.",
        quote="một hàng nút chọn chế độ: luyện tập, thi sát hạch và một nút nữa về câu liệt",
        source='<button data-mode="exam">📝 Thi sát hạch theo hạng</button>\n<button data-mode="critical">⚠️ Chỉ câu liệt</button>\n<option value="c">Câu điểm liệt</option>'),
    "replace_text-l5-c3823b": dict(
        subject="Đổi chữ tab cuối của bảng xếp hạng thành: Thuốc bài tập lượng thẻ.",
        body="Bảng phong thần có ba tab thời gian là tuần, tháng và một tab nữa là tất cả. Mình muốn tab thứ ba đổi chữ thành: Thuốc bài tập lượng thẻ.",
        question="Tab thứ ba tên gì?",
        answer="Tab thứ ba là tab 'tất cả'.",
        quote="ba tab thời gian là tuần, tháng và một tab nữa là tất cả",
        source='<button class="tab" data-range="month">🌙 Tháng</button>\n<button class="tab" data-range="all">∞ Tất cả</button>'),
    "remove_element-l2-906044": dict(
        subject="Xóa dòng tiêu đề nhỏ ở thanh trên trang cấp phát thuốc",
        body="Trang cấp phát thuốc có thanh trên với liên kết quay về, một dòng tiêu đề nhỏ nói về cấp phát thuốc và khung điểm. Mình muốn bỏ dòng tiêu đề nhỏ đó đi.",
        question="Xóa tiêu đề ở thanh trên hay mô tả cuối trang?",
        answer="Xóa dòng tiêu đề nhỏ ở thanh trên.",
        quote="thanh trên với liên kết quay về, một dòng tiêu đề nhỏ",
        source='<span class="title">💊 Cấp phát thuốc · 5 Đúng</span>\n<div class="note">Đối chiếu NHÃN với ĐƠN.</div>'),
    "size_hide-l2-af3012": dict(
        subject="Ẩn nhãn màu xanh da trời đánh dấu loại metaverse ở trang dashboard",
        body="Trang dashboard có mấy nhãn màu nhỏ đánh dấu loại 2D, 3D, metaverse, quiz. Mình muốn ẩn hẳn nhãn màu xanh da trời của loại metaverse, không để lại chỗ trống, các nhãn kia giữ nguyên.",
        question="Ẩn nhãn badge-mv trong danh sách VERSIONS hay EXPERIENCES?",
        answer="badge-mv chỉ dùng trong VERSIONS.",
        quote=".badge-mv { background: #0ea5e9; color: white; }",
        source=".badge-2d { background: #43a047; color: white; }\n.badge-mv { background: #0ea5e9; color: white; }\nconst VERSIONS = [{ badge: 'badge-mv' }];\nconst EXPERIENCES = [];"),
    "css_color-l5-137071": dict(
        subject="Đổi màu chữ của các ô ghi là có trong bảng so sánh sang xanh lá #16a34a",
        body="Ở trang hub sắp xếp có bảng so sánh, các ô ghi là có đang màu xanh ngọc. Mình muốn đổi thành xanh lá #16a34a, ô ghi là không thì để nguyên.",
        question="Trang chưa có bảng so sánh, bạn muốn tạo bảng mới?",
        answer="Sửa quy tắc màu của các ô có trong bảng so sánh.",
        quote=".compare .yes { color: #10b981; }",
        source=".compare td:first-child { font-weight: 700; }\n.compare .yes { color: #10b981; }\n.compare .no { color: #ef4444; }"),
}


class Scripted(FakeModels):
    def __init__(self, plan, validations, answerable):
        super().__init__(plan)
        self.validations, self.answerable = list(validations), answerable

    def generate(self, model, prompt, **kw):
        self.calls.append({"model": model, "prompt": prompt, **kw})
        if "PLAN CẦN SOÁT" in prompt:
            payload = self.validations.pop(0)
        elif "CÂU HỎI CẦN KIỂM" in prompt:
            payload = self.answerable
        else:
            payload = self.plan
        return {"response": json.dumps(payload, ensure_ascii=False), "prompt_eval_count": 1, "eval_count": 1}


def ask(case, validations, answerable, monkeypatch, *, on=True):
    monkeypatch.setenv("AI_BOARD_GATE25_ANSWERED", "1" if on else "")
    plan = plan_with(["features"])
    models = Scripted(plan, validations, answerable)
    request = {"id": "x", "subject": case["subject"], "body": case["body"]}
    result = plan_validate.run(request, deps_with(models), Budget(), {"plan": plan, "planning_context": case["source"]})
    return result, models


def found(case, **over):
    return {"answerable": True, "answer": case["answer"], "quote": case["quote"], **over}


def unclear(case):
    return {"clear": False, "question": case["question"]}


CLEAR = {"clear": True, "question": None}


@pytest.mark.parametrize("name", CASES)
def test_flag_off_still_blocks_and_makes_no_extra_call(name, monkeypatch):
    result, models = ask(CASES[name], [unclear(CASES[name])], found(CASES[name]), monkeypatch, on=False)
    assert result["outcome"] == "needs_clarification" and len(models.calls) == 1


ANSWERABLE = [n for n in CASES if n != "css_color-l5-137071"]


@pytest.mark.parametrize("name", ANSWERABLE)
def test_flag_on_answers_from_request_or_source_and_reruns_validator(name, monkeypatch):
    case = CASES[name]
    result, models = ask(case, [unclear(case), CLEAR], found(case), monkeypatch)
    assert result["blocked"] is False
    assert [("PLAN CẦN SOÁT" in c["prompt"]) for c in models.calls] == [True, False, True]
    assert case["answer"] in models.calls[2]["prompt"] and case["question"] in models.calls[2]["prompt"]


def test_ambiguity_with_invented_quote_still_blocks(monkeypatch):
    case = dict(CASES["replace_text-l5-c3823b"], subject="Đổi màu nút", body="Mình muốn nút đẹp hơn.",
                question="Nút ở trang nào?", source="<button>Ok</button>")
    result, models = ask(case, [unclear(case)], found(case, quote="nút ở trang quản trị là nút chính"), monkeypatch)
    assert result["outcome"] == "needs_clarification" and result["public_message"] == case["question"]
    assert len(models.calls) == 2


def test_quote_unrelated_to_the_question_does_not_unblock(monkeypatch):
    case = CASES["remove_element-l2-906044"]
    result, _ = ask(case, [unclear(case)], found(case, quote="Mình muốn bỏ dòng"), monkeypatch)
    assert result["outcome"] == "needs_clarification"


def test_answerable_false_or_short_quote_blocks(monkeypatch):
    case = CASES["size_hide-l2-af3012"]
    for reply in ({"answerable": False, "answer": "", "quote": ""}, found(case, quote="badge"), "không phải JSON"):
        result, _ = ask(case, [unclear(case)], reply, monkeypatch)
        assert result["outcome"] == "needs_clarification"


def test_request_that_does_not_match_the_file_stays_blocked(monkeypatch):
    case = CASES["css_color-l5-137071"]
    result, models = ask(case, [unclear(case)], found(case), monkeypatch)
    assert result["outcome"] == "needs_clarification" and len(models.calls) == 2


def test_validator_still_unclear_after_answer_blocks_with_its_new_question(monkeypatch):
    case = CASES["remove_element-l2-906044"]
    result, models = ask(case, [unclear(case), {"clear": False, "question": "Màu mới là gì?"}], found(case), monkeypatch)
    assert result["outcome"] == "needs_clarification" and result["public_message"] == "Màu mới là gì?"
    assert len(models.calls) == 3


def test_answer_run_keeps_later_grounding_check(monkeypatch):
    case = CASES["replace_text-l3-9b8997"]
    monkeypatch.setenv("AI_BOARD_GATE25_ANSWERED", "1")
    plan = plan_with(["features"])
    models = Scripted(plan, [unclear(case), {"clear": True, "question": None, "grounded": False, "grounding": []}], found(case))
    request = {"id": "x", "subject": case["subject"], "body": case["body"], "grounding_required": True}
    result = plan_validate.run(request, deps_with(models), Budget(), {"plan": plan, "planning_context": case["source"]})
    assert result["blocked"] and result["outcome"] == "plan_ungrounded"
