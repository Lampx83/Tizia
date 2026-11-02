"""The reverify entry of the execution graph with real git and stubbed gates: gate 3 is the rebase, gates 4 to 5.5 run on the rebased candidate,
nothing repairs, a conflict stops at the first node, and the branch survives only when every check passed."""
import subprocess
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import candidate
from runtime.budget import Budget
from worker import execute_pre_pr

BRANCH = 'ai-board/2026-10-17-ticket-9-abc123'
PLAN = {'steps': [{'order': 1, 'title': 't', 'allowed_scope': ['public/a.html'], 'tests': ['node --test'], 'capability': 'public.ui', 'risk': 'low'}],
        'capabilities': ['public.ui'], 'grounding': {'sha': 'x'}}


def git(cwd, *args):
    return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=cwd,
                          check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()


def commit(repo, name, text, message):
    path = Path(repo) / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    git(repo, 'add', name)
    git(repo, 'commit', '-q', '-m', message)
    return git(repo, 'rev-parse', 'HEAD')


@pytest.fixture
def world(tmp_path, monkeypatch):
    monkeypatch.delenv('PR_BASE_BRANCH', raising=False)
    repo = tmp_path / 'repo'
    git(tmp_path, 'init', '-q', '-b', 'dev', str(repo))
    base = commit(repo, 'public/a.html', 'one\ntwo\n', 'base')
    git(repo, 'checkout', '-q', '-b', BRANCH)
    c1 = commit(repo, 'public/a.html', 'one\nTWO\n', 'ai-board(ticket-9): 1/1 change')
    c2 = commit(repo, 'test/a.test.js', 'x\n', 'ai-board(ticket-9): test')
    git(repo, 'checkout', '-q', 'dev')
    cand = {'branch': BRANCH, 'base_sha': base, 'head_sha': c2,
            'commits': [{'sha': c1, 'title': 'change', 'files': ['public/a.html']}, {'sha': c2, 'title': 'test', 'files': ['test/a.test.js']}]}
    return repo, base, cand


def passing(seen):
    def run_gate(gate, _request, _deps, _budget, state):
        seen.append((gate, dict(state)))
        if gate == 3:
            raise AssertionError('reverify must never regenerate code at gate 3')
        if gate == 5:
            return {'gate': 5, 'blocked': False, 'reason': None, 'evidence': {'smoke_passed': True, 'http_observed': True, 'runner': 'docker',
                                                                              'functional': {'passed': True}}}
        if gate == 5.5:
            return {'gate': 5.5, 'blocked': False, 'reason': None, 'risk_level': 'low', 'risk_signals': []}
        return {'gate': gate, 'blocked': False, 'reason': None, 'issues': [], 'checks': ['secret']}
    return run_gate


def reverify(repo, cand, tip, run_gate, budget=None):
    return execute_pre_pr(PLAN, ticket_id=9, checkout_source=repo, deps=object(), budget=budget or Budget(), run_gate=run_gate,
                          cleanup=candidate.cleanup, reverify={'candidate': cand, 'tip': tip})


def test_gates_run_on_the_rebased_candidate_and_the_new_branch_is_kept(world):
    repo, base, cand = world
    tip = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    seen = []
    result = reverify(repo, cand, tip, passing(seen))
    assert [g for g, _ in seen] == [4, 5, 5.5]
    state4 = seen[0][1]
    assert state4['base_sha'] == tip and (Path(state4['full_checkout']) / 'public/b.html').exists() is False  # worktree already removed after the run
    assert [g['gate'] for g in result['gates']] == [3, 4, 5, 5.5]
    assert result['gates'][0]['blocked'] is False and tip[:10] in result['gates'][0]['reason']
    assert result['outcome'] == 'ready_for_pr' and result['failure_class'] is None and result['repairs'] == []
    kept = result['candidate']
    assert kept['base_sha'] == tip and kept['head_sha'] != cand['head_sha'] and kept['branch'] != BRANCH
    assert git(repo, 'rev-parse', kept['branch']) == kept['head_sha']
    assert git(repo, 'show', f"{kept['head_sha']}:public/b.html") == 'b'
    assert git(repo, 'show', f"{kept['head_sha']}:public/a.html") == 'one\nTWO'
    assert '_reverify_conflict' not in result
    assert git(repo, 'rev-parse', BRANCH) == cand['head_sha']


def test_a_failed_check_never_repairs_and_removes_the_rebased_branch(world):
    repo, base, cand = world
    tip = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    before = set(git(repo, 'branch', '--format=%(refname:short)').split())
    seen = []

    def run_gate(gate, request, deps, budget, state):
        out = passing(seen)(gate, request, deps, budget, state)
        return {**out, 'blocked': True, 'reason': 'smoke failed', 'failure_class': 'ordinary', 'evidence': {}} if gate == 5 else out

    result = reverify(repo, cand, tip, run_gate)
    assert [g for g, _ in seen] == [4, 5]
    assert result['outcome'] == 'blocked' and result['candidate'] is None and result['repairs'] == []
    assert set(git(repo, 'branch', '--format=%(refname:short)').split()) == before
    assert git(repo, 'worktree', 'list').count('\n') == 0


def test_a_conflict_stops_before_any_gate_and_reports_the_files(world):
    repo, base, cand = world
    tip = commit(repo, 'public/a.html', 'one\nOTHER\n', 'dev edits the same line')
    seen = []
    result = reverify(repo, cand, tip, passing(seen))
    assert seen == []
    assert result['outcome'] == 'blocked' and result['candidate'] is None
    assert result['_reverify_conflict']['files'] == ['public/a.html']
    assert result['gates'] == [{'gate': 3, 'blocked': True, 'reason': result['gates'][0]['reason']}]
    assert 'conflicts' in result['gates'][0]['reason']


def test_the_recheck_spends_from_the_budget_it_was_given(world):
    repo, base, cand = world
    tip = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    budget = Budget()
    budget.model_calls = budget.max_model_calls
    result = reverify(repo, cand, tip, passing([]), budget=budget)
    assert result['outcome'] == 'blocked' and result['failure_class'] == 'budget'
    assert result['gates'][-1]['reason'].startswith('budget exhausted')
