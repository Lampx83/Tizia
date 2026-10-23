"""Plan-from-request and implement-one-slice stay off: no trigger terms, never selected."""
from pathlib import Path

import pytest

from services import context

NAMES = ('plan-from-request', 'implement-one-slice')
SKILLS_DIR = Path(__file__).resolve().parent.parent / 'skills'
REQUESTS = [
    'lập kế hoạch từ yêu cầu này và triển khai từng bước',
    'làm theo spec, có tiêu chí chấp nhận và ngoài phạm vi',
    'đổi màu chữ tiêu đề trang chính sang xanh dương',
    'thêm khối mẹo học vào trang trường',
    'sửa lỗi bấm nút không chạy trong school.js',
    'tạo trang mới meo-hoc-tap',
]


@pytest.mark.parametrize('name,gate', [('plan-from-request', 1), ('implement-one-slice', 3)])
def test_skill_parses_and_fits_budget(name, gate):
    skill = context.parse_skill((SKILLS_DIR / name / 'SKILL.md').read_text(encoding='utf-8'))
    assert set(skill.sections) == {gate}
    for body in skill.sections.values():
        assert len(body.encode('utf-8')) < 1500
        assert body.count('\n') + 1 <= 7
        assert '—' not in body


@pytest.mark.parametrize('name', NAMES)
def test_skill_has_no_trigger_so_never_scores(name):
    skill = context.SKILLS[name]
    assert skill.match == () and skill.types == () and skill.files == ()
    assert all(context.score(skill, text, 'feature', 'public/a.html') == 0 for text in REQUESTS)


@pytest.mark.parametrize('text', REQUESTS)
def test_selection_unchanged_with_skills_off(text):
    assert context.pick_skill(text).name not in NAMES
    assert context.pick_skill(text, None, 'public/a.html').name not in NAMES


def test_existing_skill_still_selected():
    assert context.pick_skill('đổi màu chữ tiêu đề sang xanh dương', None, 'public/school.css').name == 'edit-css-style'
