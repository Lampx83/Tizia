"""Unified-format skill library by work class: valid, registered, selected only by flag and class, defaults untouched."""
import re

import pytest

from services import context, default_skills, skill_format

LIBRARY = {  # name: (task_type, role, select context, realistic English sentences, near miss)
    'backend-unified': ('backend', 'gate3_light', {'task_type': 'backend'},
                        ['Add a new route handler to the server that validates its input.',
                         'Change the service code so the retry is idempotent.'],
                        'Only read the server log and report the latency numbers.'),
    'frontend-unified': ('frontend', 'gate3_light', {'task_type': 'frontend'},
                         ['Change the CSS of the pricing page so the cards stack on mobile.',
                          'Update the public page styles and script so the button has a visible focus ring.'],
                         'Only edit server code and read page text for the report.'),
    'database-unified': ('database', 'gate3_light', {'task_type': 'database'},
                         ['Add an index on the attempts table so the leaderboard query is fast.',
                          'Add a column to the users table and keep the schema change safe to re-run.'],
                         'Only read rows from the orders table for a report.'),
    'review-unified': ('review', 'gate4_review', {},
                       ['Review this handler change and give a verdict before it merges.',
                        'Please review the candidate diff for authorization defects and return findings.'],
                       'Rewrite the candidate instead of reviewing it before verdict.'),
    'merge-unified': ('merge', 'gate3_light', {'task_type': 'merge'},
                      ['I have a merge conflict in server/index.js after merging main, please resolve it.',
                       'The rebase stopped on a conflict and unmerged files are left in the working tree.'],
                      'The branches only need listing before the release.'),
    'test-unified': ('test', 'gate3_light', {'task_type': 'test'},
                     ['Write tests for the new handler, including the error path.',
                      'Add a test that covers the changed behavior of the endpoint.'],
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
def test_flag_on_replaces_its_default_and_keeps_the_rest(monkeypatch, name):
    task, role, ctx, _, _ = LIBRARY[name]
    base = default_skills.select(role, ctx)
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', name)
    selected = default_skills.select(role, ctx)
    assert [s.name for s in selected if s.name in default_skills.VARIANTS] == [name]
    assert f'default-{task}' in [s.name for s in base] and f'default-{task}' not in [s.name for s in selected]
    assert [s.name for s in selected if s.source == 'default'] == [s.name for s in base if s.name != f'default-{task}']
    assert 'Facts (true for every task):' in default_skills.review_axes_block(selected)


@pytest.mark.parametrize('file,name', [('server/index.js', 'backend-unified'), ('public/site.css', 'frontend-unified'),
                                       ('server/migrations/001.sql', 'database-unified'), ('test/a.test.js', 'test-unified')])
def test_production_selection_is_by_task_type_of_the_step(monkeypatch, file, name):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', ','.join(LIBRARY))
    assert [s.name for s in default_skills.select('gate3_light', {'file': file}) if s.name in default_skills.VARIANTS] == [name]


@pytest.mark.parametrize('name', LIBRARY)
def test_variant_scope_keeps_a_class_off_other_picks(name):
    scope = context.VARIANT_SCOPE[name]
    assert scope and (set(scope) == set(context.FRONTEND_SKILLS)) == (name == 'frontend-unified')
    assert not set(scope) & set(context.FRONTEND_SKILLS) or name == 'frontend-unified'


def test_review_unified_fits_a_diff_only_pass_or_concerns_review():
    t = text('review-unified')
    assert 'Verdict: concerns' in t and 'Verdict: fail' not in t and 'diff' in t.split('Look:')[1].splitlines()[0]


def test_database_unified_follows_inline_idempotent_ddl_convention():
    t = text('database-unified')
    assert 'IF NOT EXISTS' in t and 'ALTER TABLE ADD COLUMN' in t and 'parameterized' in t and 'ORM' in t


@pytest.mark.parametrize('name', LIBRARY)
def test_natural_sentences_route_and_near_miss_does_not(name):
    _, _, _, sentences, near = LIBRARY[name]
    assert all(skill_format.routes(s, text(name)) for s in sentences)
    assert not skill_format.routes(near, text(name))


def test_all_variants_together_select_one_per_class(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', ','.join(LIBRARY))
    for name, (_, role, ctx, _, _) in LIBRARY.items():
        assert [s.name for s in default_skills.select(role, ctx) if s.name in default_skills.VARIANTS] == [name]


def test_reviewer_fix_keeps_default_review_and_gets_no_unified_variant(monkeypatch):
    from gates import reviewer_fix
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'review-unified,review-two-axes')
    verdict = [s.name for s in default_skills.review_selection()]
    assert 'review-unified' in verdict and 'default-review' not in verdict
    fix = [s.name for s in default_skills.review_selection(fixing=True)]
    assert 'default-review' in fix and 'review-unified' not in fix and 'review-two-axes' in fix
    assert 'review_selection(fixing=True)' in open(reviewer_fix.__file__, encoding='utf-8').read()
