"""Skill selection node: overlap, budget, cap, order, disabled, evidence/span."""
import dataclasses
import random

import pytest

from runtime import pipeline, meter, tool_loop
from runtime.budget import Budget
from runtime.root_allowance import root_scope
from services import context, default_skills, skill_selection as node
from test_admin_skills import CatalogClient, approved
from test_prompt_roles import FakeModels, EDIT, TEST, FINISH, PAGE, SUBTASK


def cand(name, priority, **kw):
    return node.Candidate(name, priority, f'reason {name}', **kw)


def test_overlapping_topic_keeps_highest_priority_and_records_owner():
    chosen, report = node.choose([cand('low', 2, topic='css'), cand('top', 0, topic='css'), cand('other', 1)], 3)
    assert [c.name for c in chosen] == ['top', 'other']
    assert report['dropped'] == [{'name': 'low', 'reason': 'overlaps top'}]


def test_no_topic_never_overlaps():
    chosen, report = node.choose([cand('a', 0), cand('b', 1)], 2)
    assert [c.name for c in chosen] == ['a', 'b'] and report['dropped'] == []


def test_token_budget_drops_lower_priority_and_never_cuts_inside_a_skill():
    chosen, report = node.choose([cand('big', 0, tokens=900), cand('mid', 1, tokens=900), cand('small', 2, tokens=98)], 3, 1000)
    assert [c.name for c in chosen] == ['big', 'small']
    assert report['dropped'] == [{'name': 'mid', 'reason': 'max_tokens_per_prompt'}]
    assert sum(c.tokens for c in chosen) + node.SEPARATOR_TOKENS <= 1000


def test_required_skill_over_budget_raises_instead_of_silent_drop():
    with pytest.raises(ValueError, match='big exceeds skill token budget'):
        node.choose([cand('big', 0, tokens=2000, required=True)], 3, 1000)


def test_count_cap_and_disabled_candidates_are_ignored():
    chosen, report = node.choose([cand('a', 0), cand('off', 1, enabled=False), cand('b', 2), cand('c', 3)], 2)
    assert [c.name for c in chosen] == ['a', 'b']
    assert report['dropped'] == [{'name': 'off', 'reason': 'disabled'}, {'name': 'c', 'reason': 'max_per_prompt'}]


def test_uncounted_candidate_skips_cap_but_not_overlap():
    chosen, _ = node.choose([cand('a', 0), cand('x', 1, counted=False), cand('y', 2, counted=False, topic='t'),
                             cand('z', 3, counted=False, topic='t')], 1)
    assert [c.name for c in chosen] == ['a', 'x', 'y']


def test_order_is_deterministic_regardless_of_input_order():
    items = [cand('n', 1), cand('a', 0), cand('b', 1), cand('m', 2)]
    expected = node.choose(items, 3)
    for seed in range(5):
        shuffled = items[:]
        random.Random(seed).shuffle(shuffled)
        assert node.choose(shuffled, 3) == expected
    assert [c.name for c in expected[0]] == ['a', 'b', 'n']


def test_admin_plus_default_respects_cap_and_keeps_task_then_admin_order(monkeypatch):
    monkeypatch.setenv('AI_BOARD_PROMPT_ROLE_SPLIT', '1')
    with root_scope(CatalogClient([approved()]), 1, {}):
        selected, report = default_skills.select_report('gate3_light', {'file': 'public/school.html'})
    assert [s.name for s in selected] == ['default-frontend', 'frontend-example']
    assert report['dropped'] == [{'name': 'default-all', 'reason': 'max_per_prompt'}]


def test_admin_topic_overlap_with_default_is_dropped(monkeypatch):
    original = default_skills.catalog
    monkeypatch.setattr(default_skills, 'catalog', lambda: [dataclasses.replace(s, topic='frontend-style')
        if s.name == 'default-frontend' else s for s in original()])
    text = approved()['text'].replace('task_type: frontend\n', 'task_type: frontend\ntopic: frontend-style\n')
    skill = default_skills.parse(text)
    row = {**approved(), 'text': text, 'hash': skill.digest, 'token_count': len(default_skills.admin_text(skill).encode())}
    with root_scope(CatalogClient([row]), 1, {}):
        selected, report = default_skills.select_report('gate3_light', {'file': 'public/school.html'})
    assert [s.name for s in selected] == ['default-frontend', 'default-all']
    assert {'name': 'frontend-example', 'reason': 'overlaps default-frontend'} in report['dropped']


def test_topic_field_parses_and_is_validated():
    text = default_skills.ROOT.joinpath('default-all/SKILL.md').read_text(encoding='utf-8')
    assert default_skills.parse(text.replace('source: default', 'source: default\ntopic: shared-style')).topic == 'shared-style'
    with pytest.raises(ValueError, match='invalid skill topic'):
        default_skills.parse(text.replace('source: default', 'source: default\ntopic: Bad Topic'))


def test_context_variant_sharing_picked_topic_is_dropped(monkeypatch):
    picked = dataclasses.replace(context.SKILLS['edit-css-style'], topic='css')
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'plan-from-request')
    original = context.variant_skill
    monkeypatch.setattr(context, 'variant_skill', lambda name: dataclasses.replace(original(name), topic='css'))
    block, report = context.select_block(picked, 3)
    assert block == context.skill_text(picked, 3)
    assert report['dropped'] == [{'name': 'plan-from-request', 'reason': 'overlaps edit-css-style'}]


def test_chat_span_and_evidence_carry_selected_names_only(monkeypatch):
    monkeypatch.setenv('AI_BOARD_PROMPT_ROLE_SPLIT', '1')
    monkeypatch.setattr('tools._show', lambda *args: PAGE)
    spans = []
    trace = meter.Tracer()
    trace.begin(1, lambda rows: None, spans.extend)
    models = FakeModels([EDIT, TEST, FINISH])
    with root_scope(CatalogClient([approved()]), 1, {}):
        tool_loop.run_subtask(SUBTASK, PAGE, deps=pipeline.Deps(models=models, notify=None, trace=trace),
            budget=Budget(), model='m', source='.', sha='abc', check=lambda out: None, role='gate3_light')
    trace.end_run()
    trace.flush()
    chats = [s for s in spans if s['name'].startswith('chat ')]
    assert chats
    for chat in chats:
        assert chat['attributes']['tizia.skills.selected'] == ['default-frontend', 'frontend-example']
        assert chat['attributes']['tizia.skills.dropped'] == ['default-all: max_per_prompt']
        assert 'Keep labels clear' not in str(chat['attributes'])
