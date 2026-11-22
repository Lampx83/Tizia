"""AI_BOARD_PLAN_OBJECTIONS_ADVISORY: grounding objections of gate 1 / gate 2.5 reach the coder as advice instead of
blocking; safety, path/scope and budget blocks stay. Flag off = unchanged."""
import dataclasses
import uuid

import pytest

import tools
from conftest import FakeModels, deps_with
from gates import best_match, brainstorm, plan_validate, react_plan, subtask_contract
from runtime.budgets import meter
from runtime.budgets.budget import Budget
from settings import Settings
from test_code_index import _SeqModels
from test_repomap import COUNTER_REQUEST, _crowded_repo, _plan_for, _real_matching
from test_replace_old_literal_home import CATALOG, HOME, OLD, REPLACE, _plan, _repo

pytestmark = pytest.mark.usefixtures("high_target_confidence")
FLAG = "AI_BOARD_PLAN_OBJECTIONS_ADVISORY"
SCHOOL = "public/school.html"


@pytest.fixture(autouse=True)
def _setup(monkeypatch):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    monkeypatch.delenv("AI_BOARD_BEST_MATCH", raising=False)
    monkeypatch.setattr(react_plan, "exploration_enabled", lambda: False)


def _flag(monkeypatch, on):
    if on:
        monkeypatch.setenv(FLAG, "1")
    else:
        monkeypatch.delenv(FLAG, raising=False)


def _gate1(plans, request, src, budget=None):
    deps = deps_with(_SeqModels(plans))
    return brainstorm.run(request, deps, budget or Budget(max_wall_clock_s=999), source=src, sha="HEAD"), deps.models


def _sub(tmp_path):
    path = tmp_path / uuid.uuid4().hex[:8]
    path.mkdir()
    return path


def _crowded(tmp_path):
    home = tmp_path / uuid.uuid4().hex[:8]
    home.mkdir()
    return _crowded_repo(home)


def _gate25(tmp_path, request, file, quote, state=None):
    plan = _plan(file)
    validation = {"clear": True, "question": None, "grounded": True, "grounding": [
        {"target": file, "file": file, "quote": quote, "before": "a", "after": "b", "verify": "c"}]}
    tracer, batches = meter.Tracer(None), []
    tracer.begin(2.5, batches.append)
    deps = dataclasses.replace(deps_with(FakeModels(plan, validation=validation)), trace=tracer)
    state = {"plan": plan, "checkout_source": str(_repo(_sub(tmp_path))), **(state or {})}
    out = plan_validate.run({**request, "grounding_required": True}, deps, Budget(), state)
    tracer.flush()
    return out, state, {e["check"]: e for batch in batches for e in batch[0].get("evaluation", [])}


WRONG_FILE_QUOTE = "const AREAS = [{ic:'🌲', name:'Rừng Chữ'}];"


def test_flag_defaults_off():
    assert Settings().plan_objections_advisory is False


# ---- gate 1 ----

def test_gate1_best_match_objection_blocks_off_and_is_advice_on(monkeypatch, tmp_path):
    src = _crowded(tmp_path)
    _flag(monkeypatch, False)
    out, models = _gate1([_plan_for(SCHOOL)] * 2, COUNTER_REQUEST, src)
    assert out["blocked"] and len(models.calls) == 2
    _flag(monkeypatch, True)
    out, models = _gate1([_plan_for(SCHOOL)] * 2, COUNTER_REQUEST, src)
    assert out["blocked"] is False and len(models.calls) == 1
    assert any("khớp nhiều cụm" in w and subtask_contract.OBJECTION_TAG in w for w in out["form_warnings"])


def test_gate1_old_literal_objection_is_advice_on(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    _flag(monkeypatch, False)
    out, _ = _gate1([_plan(CATALOG)] * 2, REPLACE, src)
    assert out["blocked"]
    _flag(monkeypatch, True)
    out, models = _gate1([_plan(CATALOG)] * 2, REPLACE, src)
    assert out["blocked"] is False and len(models.calls) == 1 and out["plan"]["subtasks"][0]["file"] == CATALOG
    assert any(OLD in w and HOME in w and subtask_contract.OBJECTION_TAG in w for w in out["form_warnings"])


def test_gate1_new_page_objection_is_advice_on(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(best_match, "new_page_refusal", lambda *a, **k: "không tạo trang mới")
    monkeypatch.setattr(best_match, "old_literal_refusal", lambda *a, **k: "")
    _flag(monkeypatch, False)
    out, _ = _gate1([_plan("public/new-page.html")] * 2, {**REPLACE, "type": "other"}, src)
    assert out["blocked"]
    _flag(monkeypatch, True)
    out, _ = _gate1([_plan("public/new-page.html")] * 2, {**REPLACE, "type": "other"}, src)
    assert out["blocked"] is False
    assert any("không tạo trang mới" in w for w in out["form_warnings"])


@pytest.mark.parametrize("file", ["ai-board/harness/settings.py", "server/nope.js"])
def test_gate1_path_policy_and_missing_file_still_block_with_flag_on(monkeypatch, tmp_path, file):
    _flag(monkeypatch, True)
    out, models = _gate1([_plan(file)] * 2, REPLACE, _repo(tmp_path))
    assert out["blocked"] is True and file in out["reason"] and len(models.calls) == 2


def test_gate1_budget_stop_still_blocks_with_flag_on(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    from runtime.budgets.budget import BudgetExhausted
    with pytest.raises(BudgetExhausted):
        _gate1([_plan("server/nope.js")] * 2, REPLACE, _repo(tmp_path), Budget(max_wall_clock_s=0))


def test_intake_block_still_blocks_with_flag_on(monkeypatch):
    from runtime import pipeline
    _flag(monkeypatch, True)
    verdict = {"verdict": "block", "labels": ["harm"], "internal_reason": "r", "public_message": "m"}
    monkeypatch.setattr(pipeline.intake_guard, "run", lambda *a, **k: verdict)
    monkeypatch.setattr(pipeline.brainstorm, "run", lambda *a, **k: pytest.fail("planning ran after a blocked intake"))
    out = pipeline._intake_and_plan({"subject": "x", "body": "y"}, deps_with(FakeModels({})), Budget(), {})
    assert out["blocked"] is True and out["outcome"] == "intake_block"


# ---- gate 2.5 ----

def test_gate25_old_literal_objection_is_advice_on(monkeypatch, tmp_path):
    _flag(monkeypatch, False)
    out, _, _ = _gate25(tmp_path, REPLACE, CATALOG, WRONG_FILE_QUOTE)
    assert out["blocked"] and out["reason"] == "plan_ungrounded"
    _flag(monkeypatch, True)
    out, state, checks = _gate25(tmp_path, REPLACE, CATALOG, WRONG_FILE_QUOTE)
    assert not out["blocked"]
    assert any(OLD in w and HOME in w and subtask_contract.OBJECTION_TAG in w for w in state["form_warnings"])
    assert any(OLD in o["text"] for o in state["plan_objections"])
    advice = checks[subtask_contract.OBJECTION_TAG]
    assert advice["ok"] is True and HOME in advice["detail"]


def test_gate25_wrong_quote_is_ungrounded_off_and_advice_with_evidence_on(monkeypatch, tmp_path):
    bad = "KHÔNG CÓ CHỮ NÀY TRONG FILE"
    _flag(monkeypatch, False)
    out, _, _ = _gate25(tmp_path, REPLACE, HOME, bad)
    assert out["blocked"] and out["reason"] == "plan_ungrounded"
    _flag(monkeypatch, True)
    out, state, _ = _gate25(tmp_path, REPLACE, HOME, bad)
    assert not out["blocked"]
    objection = state["plan_objections"][0]
    assert objection["kind"] == "plan_ungrounded" and objection["evidence"]["quote"].startswith("KHÔNG CÓ")
    assert any(subtask_contract.OBJECTION_TAG in w for w in state["form_warnings"])
    assert "grounding" not in state  # server refuses grounding whose evidence count differs from the steps


def test_gate25_target_uncertain_is_advice_on(monkeypatch, tmp_path):
    low = {"level": "low", "signals": {}, "candidates": [], "reason": "no anchor"}
    monkeypatch.setattr(plan_validate.target_confidence, "assess", lambda *a, **k: low)
    bad = "KHÔNG CÓ CHỮ NÀY TRONG FILE"
    _flag(monkeypatch, False)
    out, _, _ = _gate25(tmp_path, REPLACE, HOME, bad)
    assert out["blocked"] and out["outcome"] == "plan_target_uncertain"
    _flag(monkeypatch, True)
    out, state, _ = _gate25(tmp_path, REPLACE, HOME, bad)
    assert not out["blocked"]
    assert state["plan_objections"][0]["kind"] == "plan_target_uncertain" and state["plan_objections"][0]["evidence"]


def test_gate25_best_match_objection_is_advice_on(monkeypatch, tmp_path):
    other = "public/gioi-thieu.html"
    state = {"best_match": HOME}
    monkeypatch.setattr(best_match, "old_literal_refusal", lambda *a, **k: "")
    _flag(monkeypatch, False)
    out, _, _ = _gate25(tmp_path, {**REPLACE, "type": "other"}, other, "<h1>Giới thiệu nhà trường</h1>", dict(state))
    assert out["blocked"]
    _flag(monkeypatch, True)
    out, st, _ = _gate25(tmp_path, {**REPLACE, "type": "other"}, other, "<h1>Giới thiệu nhà trường</h1>", dict(state))
    assert not out["blocked"] and any(HOME in o["text"] for o in st["plan_objections"])


def test_gate25_path_policy_still_blocks_with_flag_on(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    out, _, _ = _gate25(tmp_path, REPLACE, "ai-board/harness/settings.py", "x")
    assert out["blocked"] and "AI Board" in out["reason"]


def test_gate25_clean_plan_records_no_objection_with_flag_on(monkeypatch, tmp_path):
    _flag(monkeypatch, True)
    out, state, _ = _gate25(tmp_path, REPLACE, HOME, f'<a class="back" href="/rung.html">{OLD}</a>')
    assert not out["blocked"] and not state.get("plan_objections") and not state.get("form_warnings")


# ---- coder note ----

def test_coder_note_labels_objections_apart_from_form_warnings():
    tagged = f"{subtask_contract.OBJECTION_TAG}: plan sửa sai file"
    block = subtask_contract.warnings_block(["verify không chạy được", tagged])
    assert "form warnings" in block and "verify không chạy được" in block
    assert "OBJECTIONS" in block and "plan sửa sai file" in block
    assert "OBJECTIONS" not in subtask_contract.warnings_block(["chỉ lỗi hình thức"])
