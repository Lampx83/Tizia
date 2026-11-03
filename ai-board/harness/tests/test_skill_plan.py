"""Skill selection node (LF/76): one deterministic pass per role, pinned, flag off keeps today's behaviour."""
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
