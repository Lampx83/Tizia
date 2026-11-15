"""Skill selection node (LF/76): one deterministic pass per role, pinned, flag off keeps today's behaviour."""
import dataclasses
import re

import pytest

import settings
from runtime import pipeline
from services import default_skills, skill_plan


def test_flag_off_by_default_and_on_by_env(monkeypatch):
    monkeypatch.delenv("AI_BOARD_SKILL_SELECT", raising=False)
    settings.reset_settings()
    assert skill_plan.enabled() is False
    monkeypatch.setenv("AI_BOARD_SKILL_SELECT", "1")
    settings.reset_settings()
    assert skill_plan.enabled() is True


def test_selection_is_deterministic_and_pinned():
    first = skill_plan.build("gate1", {"task_type": "frontend"})
    again = skill_plan.build("gate1", {"task_type": "frontend"})
    assert [s.name for s in first.skills] == [s.name for s in again.skills]
    assert first.pin == again.pin and re.fullmatch(r"[0-9a-f]{64}", first.pin)
    assert first.report["selected"] and first.pin != skill_plan.build("gate4_review", {}).pin


def test_selection_stays_inside_the_stage_budget():
    selection = skill_plan.build("gate3_light", {"file": "public/school.html"})
    budget = default_skills.stage_budget("gate3_light")
    counted = [s for s in selection.skills if s.source == "default"]
    assert len(counted) <= budget["max_per_prompt"]
    assert sum(s.token_bound for s in counted) + 2 * (len(counted) - 1) <= budget["max_tokens_per_prompt"]


def test_split_call_consumes_the_node_selection(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROMPT_ROLE_SPLIT", "1")
    monkeypatch.setenv("AI_BOARD_SKILL_SELECT", "1")
    settings.reset_settings()
    chosen = next(s for s in default_skills.catalog() if s.name == "default-all")
    fake = skill_plan.Selection(role="gate1", skills=[chosen], report={"selected": [], "dropped": []}, pin="P" * 64)
    monkeypatch.setattr(skill_plan, "build", lambda role, context=None: fake)

    prompt, extra, _options = pipeline._split_call("PROMPT", "gate1", None, {}, {}, None)
    assert "DEFAULT SKILL default-all" in extra["system"]
    assert extra["_skill_selection"]["pin"] == fake.pin

    with pytest.raises(default_skills.SkillPolicyChanged):
        pipeline._split_call("PROMPT", "gate1", None, {"_skill_context": {"expected_pin": "other"}}, {}, None)


def test_flag_off_does_not_touch_the_node(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROMPT_ROLE_SPLIT", "1")
    monkeypatch.delenv("AI_BOARD_SKILL_SELECT", raising=False)
    settings.reset_settings()

    def boom(*_a, **_k):
        raise AssertionError("the node must stay unused when the flag is off")

    monkeypatch.setattr(skill_plan, "build", boom)
    _prompt, extra, _options = pipeline._split_call("PROMPT", "gate1", None, {}, {}, None)
    assert extra["_skill_evidence"] and extra["_skill_selection"]["selected"]


def test_pin_changes_with_config_and_with_selected_skill(monkeypatch):
    before = skill_plan.build("gate1", {"task_type": "frontend"}).pin
    monkeypatch.setattr(skill_plan.limits, "config_sha256", lambda: "changed-config")
    assert skill_plan.build("gate1", {"task_type": "frontend"}).pin != before
    monkeypatch.undo()
    original = default_skills.catalog
    monkeypatch.setattr(default_skills, "catalog", lambda: [
        dataclasses.replace(s, digest="f" * 64) if s.name == "default-frontend" else s for s in original()])
    assert skill_plan.build("gate1", {"task_type": "frontend"}).pin != before


CSS_REQUEST = {"subject": "Đổi màu chữ trên trang school.html thành xanh dương", "body": "", "type": "other", "thread": []}
JS_REQUEST = {"subject": "Sửa lỗi nút không phản hồi trong public/js/suggestion-fab.js", "body": "", "type": "other", "thread": []}
CSS_SUBTASK = {"file": "public/school.html", "title": "Đổi color của .big thành #2563eb",
               "verify": "rule .big có color: #2563eb", "size": "small"}


def _context_runs(monkeypatch, flag, variant="", request=CSS_REQUEST):
    """build_context gate 1 và gate 3 của một request, cờ node và biến thể đặt theo tham số."""
    from pathlib import Path
    from services import context
    monkeypatch.setenv("AI_BOARD_SKILL_SELECT", "1") if flag else monkeypatch.delenv("AI_BOARD_SKILL_SELECT", raising=False)
    monkeypatch.setenv("AI_BOARD_SKILL_VARIANT", variant) if variant else monkeypatch.delenv("AI_BOARD_SKILL_VARIANT", raising=False)
    settings.reset_settings()
    source = Path(__file__).resolve().parents[3]
    return [context.build_context(gate, dict(request), sub, source, "HEAD") for gate, sub in ((1, None), (3, CSS_SUBTASK))]


@pytest.mark.parametrize("variant", ["", "frontend-design-core"])
def test_context_flag_off_never_calls_node_and_keeps_legacy_block(monkeypatch, variant):
    from services import context

    def boom(*_a, **_k):
        raise AssertionError("node unused when flag off")
    monkeypatch.setattr(skill_plan, "build", boom)
    for gate, result in zip((1, 3), _context_runs(monkeypatch, False, variant)):
        skill = context.SKILLS[result["skill"]]
        block, legacy = context.select_block(skill, gate)
        assert result["selection"] == legacy and "pin" not in result["selection"]
        assert f"SKILL: {skill.name}\n{block}\n\n" in result["text"]


@pytest.mark.parametrize("variant", ["", "frontend-design-core"])
def test_context_flag_on_takes_pick_and_block_from_node(monkeypatch, variant):
    off = _context_runs(monkeypatch, False, variant)
    on = _context_runs(monkeypatch, True, variant)
    for before, after in zip(off, on):
        assert after["skill"] == before["skill"] and after["text"] == before["text"]
        assert re.fullmatch(r"[0-9a-f]{64}", after["selection"]["pin"])
        picks = [s["name"] for s in after["selection"]["selected"] if s["reason"].startswith("task-type pick")]
        assert picks == [after["skill"]]
    again = _context_runs(monkeypatch, True, variant)
    assert [r["selection"]["pin"] for r in again] == [r["selection"]["pin"] for r in on]


def test_context_flag_on_does_not_attach_variant_outside_its_scope(monkeypatch):
    result = _context_runs(monkeypatch, True, "frontend-design-core", request=JS_REQUEST)[0]
    assert result["skill"] == "fix-js-behavior"
    assert "frontend-design-core" not in [s["name"] for s in result["selection"]["selected"]]
