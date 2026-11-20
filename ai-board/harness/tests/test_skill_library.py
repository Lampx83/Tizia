"""Unified-format skill library by work class: valid, registered, selected only by flag and class, defaults untouched."""
import re

import pytest

from services import context, default_skills, skill_format

LIBRARY = {  # name: (task_type, role, select context, natural sentences, near miss)
    'backend-unified': ('backend', 'gate3_light', {'task_type': 'backend'},
                        ['Change the server handler so it validates the input before saving.',
                         'Change the harness service so retries stay idempotent when the handler fails.'],
                        'Only read the server log and report the latency numbers.'),
    'frontend-unified': ('frontend', 'gate3_light', {'task_type': 'frontend'},
                         ['Update the public page layout so the form works on mobile.',
                          'Change the UI page component and check the empty state.'],
                         'Only rename the page title in a copy file for documentation.'),
    'database-unified': ('database', 'gate3_light', {'task_type': 'database'},
                         ['Add a migration that changes the schema for the orders table.',
                          'Change the query and schema so the migration stays additive.'],
                         'Only read rows from the orders table for a report.'),
    'review-unified': ('review', 'gate4_review', {},
                       ['Review the candidate against the request and test evidence before verdict.',
                        'The gate 4 reviewer checks the candidate and changed files for defects.'],
                       'Rewrite the candidate instead of reviewing it before verdict.'),
    'merge-unified': ('merge', 'gate3_light', {'task_type': 'merge'},
                      ['Resolve the merge conflict where unmerged files remain in the working tree.',
                       'The rebase stopped on a conflict and the working tree has unmerged files.'],
                      'The branches only need listing before the release.'),
    'test-unified': ('test', 'gate3_light', {'task_type': 'test'},
                     ['Please write tests for the changed behavior of the cart.'],
                     'Run the old tests and just read the existing test output.'),
}


@pytest.fixture(autouse=True)
def no_env(monkeypatch):
    monkeypatch.delenv('AI_BOARD_SKILL_VARIANT', raising=False)


def text(name):
    return default_skills.VARIANTS[name].read_text(encoding='utf-8')


def test_library_has_about_six_skills_one_per_class():
    assert len(LIBRARY) == 6 and len({v[0] for v in LIBRARY.values()}) == 6


@pytest.mark.parametrize('name', LIBRARY)
def test_skill_passes_format_is_registered_and_under_cap(name):
    assert skill_format.check(text(name)) == []
    skill = default_skills.parse(text(name))
    assert skill.name == name and skill.task_type == (LIBRARY[name][0],) and skill.source == 'admin'
    assert skill.token_bound <= skill.max_tokens
    assert name in context.VARIANT_FILES and context.VARIANT_FILES[name] == default_skills.VARIANTS[name]


@pytest.mark.parametrize('name', LIBRARY)
def test_skill_has_no_case_ids_or_tickets(name):
    assert not re.search(r'\b(?:case|ticket|LF|PR)[ #/-]?\d+|\bB\d+\b', text(name), re.I)


@pytest.mark.parametrize('name', LIBRARY)
def test_flag_off_selects_no_variant(name):
    _, role, ctx, _, _ = LIBRARY[name]
    assert not [s for s in default_skills.select(role, ctx) if s.name in default_skills.VARIANTS]


@pytest.mark.parametrize('name', LIBRARY)
def test_flag_on_adds_only_its_class_and_keeps_default_text(monkeypatch, name):
    task, role, ctx, _, _ = LIBRARY[name]
    base = default_skills.system_text(default_skills.select(role, ctx))
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', name)
    selected = default_skills.select(role, ctx)
    assert [s.name for s in selected if s.name in default_skills.VARIANTS] == [name]
    assert default_skills.system_text(selected) == base
    assert 'Facts (true for every task):' in default_skills.review_axes_block(selected)
    for other, (_, orole, octx, _, _) in LIBRARY.items():
        if other != name and orole == role and octx != ctx:
            assert name not in [s.name for s in default_skills.select(orole, octx)]


@pytest.mark.parametrize('name', LIBRARY)
def test_natural_sentences_route_and_near_miss_does_not(name):
    _, _, _, sentences, near = LIBRARY[name]
    assert all(skill_format.routes(s, text(name)) for s in sentences)
    assert not skill_format.routes(near, text(name))


@pytest.mark.parametrize('name', LIBRARY)
def test_other_classes_do_not_claim_a_sentence(name):
    for other, (_, _, _, sentences, _) in LIBRARY.items():
        if other != name:
            assert not any(skill_format.routes(s, text(name)) for s in sentences), (name, other)


def test_all_variants_together_select_one_per_class(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', ','.join(LIBRARY))
    for name, (_, role, ctx, _, _) in LIBRARY.items():
        assert [s.name for s in default_skills.select(role, ctx) if s.name in default_skills.VARIANTS] == [name]
