import hashlib
import json
from pathlib import Path

import pytest

import settings
from services import context, token_count

NAME = 'frontend-design-core'
SKILL = Path(context.SKILLS_DIR) / NAME / 'SKILL.md'
SAMPLES = ['Đổi màu chữ trên trang school.html thành xanh dương', 'Thêm mục mẹo học vào cuối trang',
           'sửa dòng này', 'Make the title color blue', 'Tạo trang mới giới thiệu CLB']


def test_parses_with_both_gate_sections_and_budget():
    skill = context.SKILLS[NAME]
    assert skill.sections.get(1) and skill.sections.get(3)
    assert token_count.skill_count(SKILL.read_text(encoding='utf-8')) < 1500
    assert skill.budget <= 1200 and skill.budget3 <= 1600


def test_off_by_default_never_scores():
    skill = context.SKILLS[NAME]
    assert skill.match == () and skill.files == () and skill.types == ()
    for text in SAMPLES:
        for rtype in (None, 'game', 'frontend'):
            for file in (None, 'public/school.html', 'public/css/a.css'):
                assert context.score(skill, text, rtype, file) == 0


@pytest.mark.parametrize('text', SAMPLES)
def test_selection_unchanged_with_skill_disabled(text, monkeypatch):
    with_skill = context.pick_skill(text).name
    monkeypatch.delitem(context.SKILLS, NAME)
    assert context.pick_skill(text).name == with_skill


def test_lock_hash_matches_file():
    lock = json.loads((SKILL.parent.parent / 'skills.lock.json').read_text(encoding='utf-8'))
    assert lock[NAME] == hashlib.sha256(SKILL.read_bytes()).hexdigest()


def test_gate3_covers_a11y_and_copy_rules():
    text = context.SKILLS[NAME].sections[3].lower()
    for term in ('focus', 'keyboard', 'em dash'):
        assert term in text


def test_machine_checked_rules_map_to_existing_gates():
    root = Path(__file__).resolve().parents[1]
    assert 'low_contrast' in (root / 'gates' / 'guard.py').read_text(encoding='utf-8')
    assert 'overflow' in (root / 'gates' / 'visual.py').read_text(encoding='utf-8')
    assert 'focus' in (root / 'gates' / 'verify.py').read_text(encoding='utf-8')


def test_variant_attaches_to_frontend_picks_only(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', NAME)
    settings.reset_settings()
    try:
        _, front = context.select_block(context.SKILLS['edit-css-style'], 3)
        _, backend = context.select_block(context.SKILLS['fix-js-behavior'], 3)
    finally:
        settings.reset_settings()
    assert NAME in [s['name'] for s in front['selected']]
    assert NAME not in [s['name'] for s in backend['selected'] + backend['dropped']]


FRONTEND_VARIANTS = {'frontend-css-style': 'edit-css-style', 'frontend-html-text': 'edit-html-text',
                     'frontend-html-section': 'add-html-section', 'frontend-new-page': 'new-static-page'}


@pytest.mark.parametrize('name, picked', sorted(FRONTEND_VARIANTS.items()))
def test_frontend_variant_parses_spec_and_budget(name, picked):
    from services import skill_frontmatter
    text = context.VARIANT_FILES[name].read_text(encoding='utf-8')
    assert skill_frontmatter.spec_errors(text, name) == []
    skill = context.variant_skill(name)
    assert skill.sections.get(1) and skill.sections.get(3)
    assert len(skill.sections[1]) <= skill.budget and len(skill.sections[3]) <= skill.budget3
    assert token_count.skill_count(text) < 1500
    assert context.VARIANT_SCOPE[name] == (picked,) and name not in context.SKILLS


@pytest.mark.parametrize('name, picked', sorted(FRONTEND_VARIANTS.items()))
def test_frontend_variant_attaches_only_to_its_pick(name, picked, monkeypatch):
    monkeypatch.delenv('AI_BOARD_SKILL_VARIANT', raising=False)
    settings.reset_settings()
    off = context.skill_block(context.SKILLS[picked], 3)
    assert off == context.skill_text(context.SKILLS[picked], 3)
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', name)
    settings.reset_settings()
    try:
        on = context.skill_block(context.SKILLS[picked], 3)
        other = next(n for n in context.SKILLS if n not in (picked, 'default') and n not in FRONTEND_VARIANTS.values())
        assert on == context.skill_text(context.SKILLS[picked], 3) + '\n\n' + context.variant_skill(name).sections[3]
        assert context.skill_block(context.SKILLS[other], 3) == context.skill_text(context.SKILLS[other], 3)
    finally:
        settings.reset_settings()
