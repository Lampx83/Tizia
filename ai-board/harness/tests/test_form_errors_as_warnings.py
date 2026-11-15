"""LF/250 AI_BOARD_FORM_ERRORS_AS_WARNINGS: form errors (prose verify, named file missing, bad subtask size) become
warnings on the last plan revision; path, file-existence and other blocks stay. Flag off = unchanged."""
import uuid

import pytest

import tools
from runtime.budget import Budget
from conftest import FakeModels, deps_with
from gates import brainstorm, plan_validate
from test_code_index import _SeqModels
from test_gate_2_5_plan_validate import _plan_with_steps
from test_repomap import COUNTER_REQUEST, _crowded_repo, _plan_for, _real_matching
from settings import Settings

pytestmark = pytest.mark.usefixtures("high_target_confidence")
WIDGET, SCHOOL = "public/js/widget.js", "public/school.html"
FLAG = "AI_BOARD_FORM_ERRORS_AS_WARNINGS"


@pytest.fixture(autouse=True)
def _retrieval(monkeypatch):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    monkeypatch.delenv("AI_BOARD_BEST_MATCH", raising=False)


def _flag(monkeypatch, on):
    if on:
        monkeypatch.setenv(FLAG, "1")
    else:
        monkeypatch.delenv(FLAG, raising=False)


def _two_steps(verify="node --test", size="small"):
    return {"summary_vi": "x", "capabilities": [], "subtasks": [
        {"title": "Bộ đếm", "file": WIDGET, "verify": verify, "size": size, "layer": "frontend"},
        {"title": "Trang", "file": SCHOOL, "verify": "node --test", "size": "small", "layer": "frontend"}]}


def _gate1(plans, tmp_path):
    deps = deps_with(_SeqModels(plans))
    home = tmp_path / uuid.uuid4().hex[:8]
    home.mkdir()
    out = brainstorm.run(COUNTER_REQUEST, deps, Budget(max_wall_clock_s=999), source=_crowded_repo(home), sha="HEAD")
    return out, deps.models


def test_flag_defaults_off():
    assert Settings().form_errors_as_warnings is False


def test_gate1_prose_verify_blocks_when_flag_off(monkeypatch, tmp_path):
    _flag(monkeypatch, False)
    out, models = _gate1([_two_steps("widget hiển thị bộ đếm")] * 2, tmp_path)
    assert out["blocked"] and "lệnh chạy được" in out["reason"] and len(models.calls) == 2


def test_gate1_prose_verify_becomes_warning_on_last_revision(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    out, models = _gate1([_two_steps("widget hiển thị bộ đếm")] * 2, tmp_path)
    assert out["blocked"] is False and len(models.calls) == 2
    assert out["plan"]["subtasks"][0]["file"] == WIDGET
    assert any("lệnh chạy được" in w for w in out["form_warnings"])


def test_gate1_first_revision_still_repairs_a_form_error(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    out, models = _gate1([_two_steps("widget hiển thị bộ đếm"), _two_steps()], tmp_path)
    assert out["blocked"] is False and len(models.calls) == 2 and out["form_warnings"] == []


def test_gate1_named_file_missing_becomes_warning_on_last_revision(monkeypatch, tmp_path):
    _flag(monkeypatch, False)
    out, _ = _gate1([_plan_for(SCHOOL)] * 2, tmp_path)
    assert out["blocked"] and WIDGET in out["reason"]
    _flag(monkeypatch, True)
    out, models = _gate1([_plan_for(SCHOOL)] * 2, tmp_path)
    assert out["blocked"] is False and len(models.calls) == 2
    assert any("khớp nhiều cụm" in w and WIDGET in w for w in out["form_warnings"])


def test_gate1_bad_subtask_size_becomes_warning_and_routes_large(monkeypatch, tmp_path):
    _flag(monkeypatch, False)
    out, _ = _gate1([_two_steps(size="xl")] * 2, tmp_path)
    assert out["blocked"] and "size='xl'" in out["reason"]
    _flag(monkeypatch, True)
    out, _ = _gate1([_two_steps(size="xl")] * 2, tmp_path)
    assert out["blocked"] is False and out["plan"]["subtasks"][0]["size"] == "large"
    assert any("size='xl'" in w for w in out["form_warnings"])


def test_gate1_missing_repo_file_still_blocks_with_flag_on(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    out, _ = _gate1([_plan_for("server/nope.js")] * 2, tmp_path)
    assert out["blocked"] is True and "server/nope.js" in out["reason"]


def test_gate25_unfit_plan_is_a_warning_only_on_a_revised_plan(monkeypatch):
    plan = _plan_with_steps(5)
    plan["subtasks"][2]["verify"] = "trang hiển thị danh sách thuật ngữ"
    _flag(monkeypatch, False)
    out = plan_validate.run({"subject": "x", "plan_repair": "lập lại"}, deps_with(FakeModels(plan)), Budget(), {"plan": plan})
    assert out["outcome"] == "plan_unfit"

    _flag(monkeypatch, True)
    out = plan_validate.run({"subject": "x"}, deps_with(FakeModels(plan)), Budget(), {"plan": plan})
    assert out.get("outcome") == "plan_unfit"

    state = {"plan": plan}
    models = FakeModels(plan)
    out = plan_validate.run({"subject": "x", "plan_repair": "lập lại"}, deps_with(models), Budget(), state)
    assert out.get("outcome") != "plan_unfit" and models.calls
    assert state["form_warnings"] == ["bước 3 'public/step-3.html': verify phải là lệnh chạy được "
                                      "(node --test/curl/pytest/...): trang hiển thị danh sách thuật ngữ"]
