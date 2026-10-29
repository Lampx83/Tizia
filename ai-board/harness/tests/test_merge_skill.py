import pytest

from services import conflict_markers, default_skills


def test_merge_default_skill_in_catalog_with_declared_task_type():
    skill = {s.name: s for s in default_skills.catalog()}['default-merge']
    assert skill.task_type == ('merge',)
    assert skill.source == 'default'
    assert skill.token_bound <= skill.max_tokens <= 1500


def test_merge_task_selects_only_the_merge_skill():
    selected, report = default_skills.select_report('gate3_light', {'task_type': 'merge'})
    names = [s.name for s in selected]
    assert names == ['default-merge']


@pytest.mark.parametrize('task', ['backend', 'frontend', 'test', 'database'])
def test_other_task_types_do_not_pick_the_merge_skill(task):
    selected, _ = default_skills.select_report('gate3_light', {'task_type': task})
    assert 'default-merge' not in [s.name for s in selected]


def test_marker_check_flags_conflict_markers_and_passes_clean_text():
    dirty = 'a\n<<<<<<< HEAD\nx\n=======\ny\n>>>>>>> feat\n'
    assert [m for _, m in conflict_markers.find_markers(dirty)] == ['<<<<<<<', '=======', '>>>>>>>']
    assert conflict_markers.find_markers('def f():\n    return 1\n') == []


def test_marker_check_needs_marker_at_line_start():
    assert conflict_markers.find_markers('use ======= in text\n') == []


@pytest.mark.parametrize('line', ['<<<<<<<', '=======', '>>>>>>>'])
def test_marker_check_exact_seven_chars(line):
    assert conflict_markers.find_markers(line + ' x\n') == [(1, line)]
