"""Skill variant arm: gate 1/3 sections of AI_BOARD_SKILL_VARIANT appended after the picked skill; off = unchanged prompt."""
import hashlib
import os

import pytest

from services import context


@pytest.fixture(autouse=True)
def no_env(monkeypatch):
    monkeypatch.delenv("AI_BOARD_SKILL_VARIANT", raising=False)
    monkeypatch.delenv("AI_BOARD_SKILL_PAD_CHARS", raising=False)


def test_off_block_equals_skill_text_for_every_skill_and_gate():
    for skill in context.SKILLS.values():
        for gate in (1, 3):
            assert context.skill_block(skill, gate) == context.skill_text(skill, gate)


@pytest.mark.parametrize("variant", sorted(context.VARIANT_FILES))
def test_on_appends_only_that_variants_gate_section_after_picked_skill(monkeypatch, variant):
    picked = context.SKILLS["edit-css-style"]
    monkeypatch.setenv("AI_BOARD_SKILL_VARIANT", variant)
    for gate in (1, 3):
        extra = context.variant_skill(variant).sections.get(gate, "")
        expected = "\n\n".join(p for p in [context.skill_text(picked, gate), extra] if p)
        assert context.skill_block(picked, gate) == expected
        assert context.skill_block(picked, gate).startswith(context.skill_text(picked, gate))


def test_two_variants_keep_listed_order_and_do_not_replace_picked_rules(monkeypatch):
    picked = context.SKILLS["edit-css-style"]
    monkeypatch.setenv("AI_BOARD_SKILL_VARIANT", "plan-from-request,implement-one-slice")
    block = context.skill_block(picked, 3)
    own, plan, slice_ = (context.skill_text(picked, 3), context.variant_skill("plan-from-request").sections.get(3, ""),
                         context.variant_skill("implement-one-slice").sections[3])
    assert block == "\n\n".join(p for p in [own, plan, slice_] if p)


def test_review_two_axes_has_no_gate_1_or_3_section_so_nothing_is_added(monkeypatch):
    picked = context.SKILLS["edit-css-style"]
    monkeypatch.setenv("AI_BOARD_SKILL_VARIANT", "review-two-axes")
    assert context.variant_skill("review-two-axes").sections == {}
    assert context.skill_block(picked, 1) == context.skill_text(picked, 1)


def test_unknown_variant_name_is_refused():
    with pytest.raises(ValueError, match="skill biến thể lạ"):
        context.variant_skill("no-such-skill")
    assert "edit-css-style" not in context.VARIANT_FILES


def test_pad_filler_never_uses_variant_skills(monkeypatch):
    skill = context.SKILLS["edit-css-style"]
    monkeypatch.setenv("AI_BOARD_SKILL_PAD_CHARS", "60000")
    padded = context.skill_text(skill, 3)
    for name in ("frontend-design-core", "plan-from-request", "implement-one-slice"):
        for section in context.SKILLS[name].sections.values():
            assert section.strip() not in padded


def test_pad_with_variant_off_is_the_same_length_ablation_as_before_variants(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SKILL_PAD_CHARS", "10100")
    text = context.skill_text(context.SKILLS["edit-css-style"], 3)
    assert hashlib.sha256(text.encode()).hexdigest()[:16] == "0e697dc251580837"
