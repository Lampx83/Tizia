"""model_first follow-up: audit rows that guessed intent from phrasing give an observation or take the model's ledger entry; flag off = old path."""
import json

import pytest

from gates import brainstorm, decision_ledger
from runtime import plan_merge

PROSE = "public/a.html chứa 'Lưu'"


def _plan(subtasks, **extra):
    return json.dumps({"summary_vi": "x", "capabilities": [], "subtasks": subtasks, **extra})


def _task(file, verify, **extra):
    return {"title": "t", "file": file, "verify": verify, "size": "small", "depends_on": [], **extra}


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")
    monkeypatch.setenv("AI_BOARD_COMPILE_PROSE_VERIFY", "1")


def test_g1_13_prose_verify_is_not_rewritten_with_the_flag(on, monkeypatch):
    assert brainstorm.parse_plan(_plan([_task("public/a.html", PROSE)]))["subtasks"][0]["verify"] == PROSE
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST")
    assert brainstorm.parse_plan(_plan([_task("public/a.html", PROSE)]))["subtasks"][0]["verify"].startswith("sh -c ")


def test_g1_13_feature_plan_gets_the_compiled_command_as_a_suggestion(on):
    plan = _plan([_task("public/a.html", PROSE, layer="frontend"), _task("server/contexts/teacher/x.js", "node --test t.js", layer="backend", depends_on=[1])])
    with pytest.raises(ValueError) as error:
        brainstorm.parse_plan(plan)
    assert "gợi ý" in str(error.value) and "grep -qF" in str(error.value)


def test_g1_14_same_file_subtasks_are_refused_with_an_observation_not_merged(on, monkeypatch):
    tasks = [_task("public/a.html", "grep -q a public/a.html"), _task("public/b.html", "grep -q b public/b.html", depends_on=[1]),
             _task("public/a.html", "grep -q c public/a.html", depends_on=[2])]
    assert plan_merge.duplicate_files(tasks) == [("public/a.html", [1, 3])]
    assert plan_merge.duplicate_files(tasks[:2]) == []
    assert "subtask 1 và 3" in brainstorm.duplicate_file_problem(tasks)
    assert brainstorm.duplicate_file_problem(tasks[:2]) == ""
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST")
    assert brainstorm.duplicate_file_problem(tasks) == ""


def test_g1_19_unknown_task_type_message_lists_the_allowed_values(on):
    with pytest.raises(ValueError) as error:
        brainstorm.parse_plan(_plan([_task("public/a.html", "grep -q a public/a.html", task_type="ui")]))
    assert "frontend" in str(error.value)


def test_g1_14_plan_rules_report_shared_files_with_the_flag(on):
    from gates import plan_rules
    text = _plan([_task("public/a.html", "grep -q a public/a.html"), _task("public/a.html", "grep -q b public/a.html", depends_on=[1])])
    assert any("cùng sửa public/a.html" in v for v in plan_rules.violations(text, {}, None, None))


def test_g1_21_named_pages_beyond_three_are_listed_as_matches_with_the_flag(on, monkeypatch):
    from services import context
    pages = {f"public/p{i}.html": [("mo", "phong", "dien")] for i in range(5)}
    monkeypatch.setattr(context, "_page_names", lambda source, commit: pages)
    monkeypatch.setattr(context, "_page_labels", lambda source, commit: {})
    assert len(context._named_pages("tạo trang mô phỏng điện", ".", "x")) == 5
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert context._named_pages("tạo trang mô phỏng điện", ".", "x") == []


def test_g1_22_locate_note_is_evidence_without_an_imperative_with_the_flag(on, monkeypatch):
    from services import context
    note = context._locate_note("public/a.js", ["chữ A", "chữ B"])
    assert "chữ A; chữ B" in note and "sổ quyết định" in note and "sửa file đó" not in note
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert "sửa file đó, không thêm phần tử mới" in context._locate_note("public/a.js", ["chữ A"])


def test_g25_07_render_constraint_reads_the_structured_flag_with_the_flag(on, monkeypatch):
    from gates import plan_validate
    note = {"planning_context": "LƯU Ý: chữ người dùng nhắc KHÔNG nằm trong a.html"}
    assert plan_validate.render_constraint({**note, "render_only": []}) is False, "gate 1 saw no render-only case"
    assert plan_validate.render_constraint({"planning_context": "", "render_only": ["public/js/r.js"]}) is True
    assert plan_validate.render_constraint(note) is True, "no structured flag in state: sentence still read"
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert plan_validate.render_constraint({**note, "render_only": []}) is True


def _ledger(kind, target):
    return [{"decision": kind, "target": target, "evidence": [{"step_id": 1, "tool_output_excerpt": "x"}], "rejected": []}]


def test_g25_03_page_named_by_the_planners_evidenced_choice_not_by_stop_words(on, monkeypatch):
    from gates import plan_validate
    plan = {"subtasks": [{"title": "Đổi 'Quay lại' thành 'Trở về'", "file": "public/lesson.html", "verify": "x"}]}
    request = {"subject": "Đổi chữ", "body": "Nút 'Quay lại' thành 'Trở về' nhé. Em không nhớ nút nằm ở trang nào."}
    assert plan_validate.names_edit(request, plan) is False
    assert plan_validate.names_edit(request, plan, _ledger("choose_file", "public/lesson.html")) is True
    assert plan_validate.names_edit(request, plan, _ledger("choose_file", "public/other.html")) is False
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert plan_validate.names_edit(request, plan, _ledger("choose_file", "public/lesson.html")) is False


def test_g25_04_either_or_question_is_answered_by_an_evidenced_placement_not_by_phrasing(on, monkeypatch):
    from gates import plan_validate
    plan = {"subtasks": [{"title": "Thêm tiêu đề", "file": "public/t.html", "verify": "x"}]}
    question = "Bạn muốn thêm tiêu đề ngay sau dòng A hay ngay trước nút B?"
    request = {"subject": "Thêm tiêu đề", "body": "thêm tiêu đề"}
    assert plan_validate.confirms_plan(question, request, plan) is False
    assert plan_validate.confirms_plan(question, request, plan, _ledger("placement", "public/t.html")) is True
    assert plan_validate.confirms_plan("Thêm tiêu đề ở đâu?", request, plan, _ledger("placement", "public/t.html")) is False
    assert plan_validate.confirms_plan(question, request, {"subtasks": plan["subtasks"] * 2}, _ledger("placement", "public/t.html")) is True
    two_files = {"subtasks": [plan["subtasks"][0], {**plan["subtasks"][0], "file": "public/u.html"}]}
    assert plan_validate.confirms_plan(question, request, two_files, _ledger("placement", "public/t.html")) is False


def test_g25_02_new_file_the_planner_decided_is_not_a_typo_of_a_close_existing_file(on, monkeypatch, tmp_path):
    from services import target_confidence
    from test_target_confidence import _plan, _repo
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", lambda *a, **k: [])
    plan = _plan("public/aa.html")
    assert target_confidence.assess(plan, {}, src, "HEAD")["signals"]["rule"] == "path_typo"
    out = target_confidence.assess(plan, {}, src, "HEAD", decided_new=frozenset({"public/aa.html"}))
    assert out["level"] == "high" and out["signals"]["rule"] == "new_file_decided"
    assert out["signals"]["path"]["kind"] == "new"
    assert target_confidence.assess(_plan("public/ghi-chu-nhanh.html"), {}, src, "HEAD")["signals"]["rule"] == "new_file_unnamed"
    assert target_confidence.assess(_plan("public/ghi-chu-nhanh.html"), {}, src, "HEAD", decided_new=frozenset({"public/ghi-chu-nhanh.html"}))["level"] == "high"
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert target_confidence.assess(plan, {}, src, "HEAD", decided_new=frozenset({"public/aa.html"}))["signals"]["rule"] == "path_typo"


def test_g25_08_requested_file_the_planner_chose_to_skip_is_not_missing(on, monkeypatch):
    from runtime import coverage
    plan = {"subtasks": [{"file": "public/a.html", "title": "t", "verify": "v"}]}
    text = "Sửa public/b.html và chữ: 'Xin chào'"
    assert coverage.requested_missing(plan, text)
    assert coverage.requested_missing(plan, text, waived={"public/b.html"}) != coverage.requested_missing(plan, text)
    assert coverage.requested_missing(plan, text, waived={"public/b.html", "Xin chào"}) == []


def test_g5_04_new_page_needs_a_link_when_the_planner_decided_it_not_when_the_request_says_link_words(on, monkeypatch):
    from gates import ready_oracle
    assert ready_oracle.link_required("Thêm trang ghi chú", [{"decision": "new_file", "target": "public/n.html"}], "public/n.html") is True
    assert ready_oracle.link_required("Thêm trang ghi chú", [{"decision": "new_file", "target": "public/n.html"}], "public/m.html") is False
    assert ready_oracle.link_required("Thêm trang, có menu", [], "public/n.html") is False, "ledger present: phrasing no longer decides"
    assert ready_oracle.link_required("Thêm trang, có menu", None, "public/n.html") is True, "no ledger: old phrase rule"
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert ready_oracle.link_required("Thêm trang, có menu", [], "public/n.html") is True
    assert ready_oracle.link_required("Thêm trang ghi chú", [{"decision": "new_file", "target": "public/n.html"}], "public/n.html") is False


def test_g5_05_reviewer_page_hint_is_the_plans_new_page(on, monkeypatch):
    from gates import intent_review
    state = {"request_detail": "[Trang: x] /school.html?domain=it", "ledger": [{"decision": "new_file", "target": "public/ghi-chu.html"}]}
    assert intent_review._page_hint(state) == "/ghi-chu.html"
    assert intent_review._page_hint({**state, "ledger": [{"decision": "new_file", "target": "server/x.js"}]}) == "/school.html"
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "0")
    assert intent_review._page_hint(state) == "/school.html"
