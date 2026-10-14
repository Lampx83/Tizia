"""AI_BOARD_BEST_MATCH=advisory: gates 1 and 2.5 record the best_match mismatch instead of rejecting; every other check still blocks."""
import dataclasses
import subprocess

import functional
import meter
import pytest
import tools
from budget import Budget
from conftest import FakeModels, deps_with
from gates import best_match, brainstorm, plan_validate
from test_code_index import _SeqModels
from test_repomap import COUNTER_REQUEST, _crowded_repo, _plan_for, _real_matching

WIDGET, SCHOOL = "public/js/widget.js", "public/school.html"


@pytest.fixture(autouse=True)
def _real_retrieval(monkeypatch):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    monkeypatch.delenv("AI_BOARD_BEST_MATCH", raising=False)


def _gate1(plans, tmp_path, trace=None, source=None):
    deps = deps_with(_SeqModels(plans))
    batches = []
    if trace:
        trace.begin(1, batches.append)
        deps = dataclasses.replace(deps, trace=trace)
    out = brainstorm.run(COUNTER_REQUEST, deps, Budget(max_wall_clock_s=999), source=source or _crowded_repo(tmp_path), sha="HEAD")
    if trace:
        trace.flush()
    return out, deps.models, batches


def test_mode_is_off_unless_exactly_advisory(monkeypatch):
    assert best_match.mode() == ""
    for value in ("", "on", "true", "enforce"):
        monkeypatch.setenv("AI_BOARD_BEST_MATCH", value)
        assert best_match.mode() == ""
    monkeypatch.setenv("AI_BOARD_BEST_MATCH", " Advisory ")
    assert best_match.mode() == "advisory"


def test_gate1_flag_off_still_rejects_and_retries_on_best_match(tmp_path):
    out, models, _ = _gate1([_plan_for(SCHOOL), _plan_for(SCHOOL)], tmp_path)
    assert out["blocked"] and len(models.calls) == 2 and WIDGET in out["reason"]


def test_gate1_advisory_accepts_first_plan_and_records_mismatch_in_trace(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_BOARD_BEST_MATCH", "advisory")
    out, models, batches = _gate1([_plan_for(SCHOOL)], tmp_path, meter.Tracer(None))
    assert not out["blocked"] and out["plan"]["subtasks"][0]["file"] == SCHOOL and len(models.calls) == 1
    assert out["best_match"] == WIDGET
    checks = {e["check"]: e for e in batches[0][0]["evaluation"]}
    assert checks["best_match"]["ok"] and best_match.REASON_CODE in checks["best_match"]["detail"] and WIDGET in checks["best_match"]["detail"]


def test_gate1_advisory_still_blocks_missing_file_and_renderer_constraint(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_BOARD_BEST_MATCH", "advisory")
    src = _crowded_repo(tmp_path)
    out, models, _ = _gate1([_plan_for("server/nope.js")] * 2, tmp_path, source=src)
    assert out["blocked"] and "nope.js" in out["reason"] and len(models.calls) == 2
    monkeypatch.setattr(functional, "expected_targets", lambda _request: {WIDGET})
    out, models, _ = _gate1([_plan_for(SCHOOL)] * 2, tmp_path, source=src)
    assert out["blocked"] and "renderer" in out["reason"] and len(models.calls) == 2


def _repo_with_school(tmp_path):
    subprocess.run(["git", "init", "-q", str(tmp_path)], check=True)
    (tmp_path / "public" / "js").mkdir(parents=True)
    (tmp_path / "public" / "school.html").write_text("<h1>Trường công nghệ</h1>\n", encoding="utf8")
    (tmp_path / WIDGET).write_text("const d = 1;\n", encoding="utf8")
    subprocess.run(["git", "-C", str(tmp_path), "add", "."], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "-c", "user.name=T", "-c", "user.email=t@t", "commit", "-qm", "base"], check=True)


REQUEST = {"subject": "Thêm bộ đếm ký tự", "grounding_required": True, "complexity_by_server": True}
QUOTE = {"clear": True, "question": None, "grounded": True, "grounding": [
    {"target": SCHOOL, "file": SCHOOL, "quote": "<h1>Trường công nghệ</h1>", "before": "none", "after": "counter", "verify": "counter shown"}]}


def _gate25(tmp_path, validation=QUOTE, plan_file=SCHOOL, tracer=None):
    plan = _plan_for(plan_file)
    state = {"plan": plan, "checkout_source": str(tmp_path), "best_match": WIDGET, "source_targets": [WIDGET, SCHOOL]}
    deps = deps_with(FakeModels(plan, validation=validation))
    batches = []
    if tracer:
        tracer.begin(2.5, batches.append)
        deps = dataclasses.replace(deps, trace=tracer)
    out = plan_validate.run(REQUEST, deps, Budget(), state)
    if tracer:
        tracer.flush()
    return out, batches


def test_gate25_flag_off_blocks_on_best_match_even_with_valid_grounding(tmp_path):
    _repo_with_school(tmp_path)
    out, _ = _gate25(tmp_path)
    assert out["blocked"] and out["reason"] == "plan_ungrounded" and WIDGET in out["signals"][0]


def test_gate25_advisory_passes_grounded_plan_and_records_mismatch(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_BOARD_BEST_MATCH", "advisory")
    _repo_with_school(tmp_path)
    out, batches = _gate25(tmp_path, tracer=meter.Tracer(None))
    assert not out["blocked"]
    checks = [(e["check"], e["ok"]) for e in batches[0][0]["evaluation"]]
    assert checks == [("validator", True), ("best_match", True), ("source grounding", True)]
    assert best_match.REASON_CODE in batches[0][0]["evaluation"][1]["detail"]


def test_gate25_advisory_still_blocks_missing_evidence_and_renderer_constraint(monkeypatch, tmp_path):
    monkeypatch.setenv("AI_BOARD_BEST_MATCH", "advisory")
    _repo_with_school(tmp_path)
    no_evidence = {"clear": True, "question": None, "grounded": False, "grounding": [], "reason": "thiếu dẫn chứng"}
    out, _ = _gate25(tmp_path, validation=no_evidence)
    assert out["blocked"] and out["reason"] == "plan_ungrounded"
    forged = {**QUOTE, "grounding": [{**QUOTE["grounding"][0], "quote": "<h1>Không có trong file</h1>"}]}
    assert _gate25(tmp_path, validation=forged)[0]["reason"] == "plan_ungrounded"
    monkeypatch.setattr(functional, "expected_targets", lambda _request: {"public/js/renderer.js"})
    out, _ = _gate25(tmp_path)
    assert out["blocked"] and "renderer" in out["signals"][0]
