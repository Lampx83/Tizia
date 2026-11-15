"""Frame variants (test/review/all) selectable via AI_BOARD_SKILL_VARIANT; off = default selection unchanged."""
import pytest

from services import context, default_skills

FRAMES = {'test-frame': 'test', 'review-frame': 'review', 'all-frame': 'all'}


@pytest.fixture(autouse=True)
def no_env(monkeypatch):
    monkeypatch.delenv('AI_BOARD_SKILL_VARIANT', raising=False)


@pytest.mark.parametrize('name', FRAMES)
def test_frame_is_registered_in_both_lists_and_parses_within_its_cap(name):
    assert name in context.VARIANT_FILES and name in default_skills.VARIANTS
    skill = default_skills.parse(default_skills.VARIANTS[name].read_text(encoding='utf-8'))
    assert skill.name == name and skill.task_type == (FRAMES[name],)
    assert skill.token_bound <= skill.max_tokens


@pytest.mark.parametrize('role,ctx', [('gate3_light', {'file': 'test/a.test.js'}), ('gate1', {'task_type': 'all'}),
                                      ('gate4_review', {}), ('gate3_light', {'file': 'public/a.html'})])
def test_env_unset_selection_has_no_variant(role, ctx):
    assert not [s for s in default_skills.select(role, ctx) if s.name in default_skills.VARIANTS]
    assert default_skills.review_axes_block() == ''


@pytest.mark.parametrize('name,role,ctx,present', [
    ('test-frame', 'gate3_light', {'file': 'test/a.test.js'}, True),
    ('test-frame', 'gate3_light', {'file': 'public/a.html'}, False),
    ('test-frame', 'gate4_review', {}, False),
    ('all-frame', 'gate3_light', {'file': 'public/a.html'}, True),
    ('all-frame', 'gate4_review', {}, False),
    ('review-frame', 'gate4_review', {}, True),
    ('review-frame', 'gate3_light', {'file': 'test/a.test.js'}, False),
])
def test_variant_selected_only_for_its_task_type(monkeypatch, name, role, ctx, present):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', name)
    assert (name in [s.name for s in default_skills.select(role, ctx)]) is present


def test_selected_variant_adds_one_block_and_leaves_default_skills(monkeypatch):
    ctx = {'file': 'test/a.test.js'}
    base = default_skills.system_text(default_skills.select('gate3_light', ctx))
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'test-frame')
    selected = default_skills.select('gate3_light', ctx)
    assert default_skills.system_text(selected) == base
    assert default_skills.review_axes_block(selected).count('ADMIN_SKILL name="test-frame"') == 1
