import hashlib
import json
from pathlib import Path

import pytest

from services import context

NAME = 'frontend-design-core'
SKILL = Path(context.SKILLS_DIR) / NAME / 'SKILL.md'
SAMPLES = ['Đổi màu chữ trên trang school.html thành xanh dương', 'Thêm mục mẹo học vào cuối trang',
           'sửa dòng này', 'Make the title color blue', 'Tạo trang mới giới thiệu CLB']


def test_parses_with_both_gate_sections_and_budget():
    skill = context.SKILLS[NAME]
    assert skill.sections.get(1) and skill.sections.get(3)
    assert len(SKILL.read_bytes()) < 1500
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
