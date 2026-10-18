"""Verified coding loop: scripted provider, real pinned repository, isolated check boundary."""
import json
import subprocess

import pytest

from runtime import tool_loop
from runtime.budget import Budget
from verification import loop_checks


@pytest.fixture
def repo(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir()
    (tmp_path / 'public/a.js').write_text('export const a = 1;\n', encoding='utf-8')
    (tmp_path / 'public/b.js').write_text('export const b = 2;\n', encoding='utf-8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', 'public'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@invalid', 'commit', '-qm', 'base'], check=True)
    return tmp_path, subprocess.check_output(['git', '-C', str(tmp_path), 'rev-parse', 'HEAD'], text=True).strip()


class Script:
    def __init__(self, actions):
        self.actions = iter(actions)
        self.prompts = []

    def call_model(self, model, prompt, *, budget, **kwargs):
        budget.spend('model_calls')
        self.prompts.append(prompt)
        return {'response': json.dumps(next(self.actions))}


def action(tool, **arguments):
    return {'tool': tool, 'arguments': arguments}


def test_pinned_dependency_is_readable_without_granting_write_scope(repo, monkeypatch):
    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    provider = Script([action('read_file', file='public/b.js'),
                       action('edit_file', file='public/b.js', edits=[{'search': '2', 'replace': '3'}])])
    result = tool_loop.run_subtask({'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 3'},
              'export const a = 1;\n', deps=provider, budget=Budget(), model='fake', source=source, sha=sha, check=lambda out: None)
    assert 'export const b = 2' in provider.prompts[-1]
    assert result['status'] == 'blocked' and result['failure_class'] == 'critical'
    assert (source / 'public/b.js').read_text() == 'export const b = 2;\n'


def test_unavailable_sandbox_never_turns_written_test_into_verified_finish(repo, monkeypatch):
    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    monkeypatch.delenv('AI_BOARD_SANDBOX_URL', raising=False)
    provider = Script([action('edit_file', file='public/a.js', edits=[{'search': '1', 'replace': '3'}]),
                       action('write_test', test_file='test/a.test.js', test='throw new Error("never execute on host");'),
                       action('finish')])
    result = tool_loop.run_subtask({'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 3'},
              'export const a = 1;\n', deps=provider, budget=Budget(), model='fake', source=source, sha=sha, check=lambda out: None)
    assert result['status'] != 'proposed'
    assert (source / 'public/a.js').read_text() == 'export const a = 1;\n'


class Checks:
    def __init__(self, source, sha, budget, tools):
        self.sha, self.tools = sha, tools
        self.calls, self.closed, self.cleanup_pending = [], False, False

    def run(self, profile, ws):
        pin = loop_checks.digest(ws.file, ws.content, ws.test_file, ws.test, self.sha, self.tools)
        self.calls.append((profile, pin, ws.content, ws.test))
        return {'profile': profile, 'digest': pin, 'passed': 'broken' not in ws.content,
                'output': 'observed syntax error' if 'broken' in ws.content else 'passed',
                'policy_hash': 'no-network-policy', 'run_id': 'fake-isolated-check'}

    def close(self):
        self.closed = True


def test_observed_error_is_repaired_and_edits_invalidate_prior_test_proof(repo, monkeypatch):
    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    checks = Checks(source, sha, Budget(), tool_loop.MANIFEST.hash)
    monkeypatch.setattr(loop_checks, 'CheckSession', lambda *args: checks)
    provider = Script([
        action('finish'),
        action('edit_file', file='public/a.js', edits=[{'search': '1', 'replace': 'broken'}]),
        action('edit_file', file='public/a.js', edits=[{'search': 'broken', 'replace': '3'}]),
        action('write_test', test_file='test/a.test.js', test='a public test'),
        action('run_check', profile='relevant'),
        action('edit_file', file='public/a.js', edits=[{'search': '3', 'replace': '4'}]),
        action('finish')])
    budget = Budget(max_wall_clock_s=300, elapsed_before_s=90)
    result = tool_loop.run_subtask({'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 4'},
              'export const a = 1;\n', deps=provider, budget=budget, model='fake', source=source, sha=sha, check=lambda out: None)
    assert result['status'] == 'proposed' and checks.closed
    assert any('observed syntax error' in prompt for prompt in provider.prompts)
    relevant = [call for call in checks.calls if call[0] == 'relevant']
    assert len(relevant) == 2 and relevant[0][1] != relevant[1][1]
    assert relevant[-1][2] == result['out']['code'] == 'export const a = 4;\n'
    assert set(result['out']['verification']) == {'light', 'platform', 'relevant'}
    assert budget.semantic_repairs == 0
    assert len(provider.prompts) == 7  # A rejected finish can repair after the legacy 60-second cutoff.


@pytest.mark.parametrize('path', ['../public/b.js', 'public/../server/b.js', 'secrets/config.json', 'AGENTS.md', 'ai-board/harness/evaluation/gold.py'])
def test_dependency_denials_are_terminal_before_candidate_generation(repo, monkeypatch, path):
    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    provider = Script([action('read_file', file=path)])
    result = tool_loop.run_subtask({'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 4'},
              'export const a = 1;\n', deps=provider, budget=Budget(), model='fake', source=source, sha=sha, check=lambda out: None)
    assert result['status'] == 'blocked' and len(provider.prompts) == 1


def test_unconfirmed_check_teardown_cannot_return_proposal(repo, monkeypatch):
    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    checks = Checks(source, sha, Budget(), tool_loop.MANIFEST.hash)
    checks.cleanup_pending, checks.run_id = True, 'unreconciled-vm'
    monkeypatch.setattr(loop_checks, 'CheckSession', lambda *args: checks)
    provider = Script([action('edit_file', file='public/a.js', edits=[{'search': '1', 'replace': '3'}]),
                       action('write_test', test_file='test/a.test.js', test='public test'), action('finish')])
    result = tool_loop.run_subtask({'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 3'},
              'export const a = 1;\n', deps=provider, budget=Budget(), model='fake', source=source, sha=sha, check=lambda out: None)
    assert result['status'] == 'blocked' and result['unknown_outcome']['run_id'] == 'unreconciled-vm'


def test_resume_rechecks_proof_and_preserves_all_check_spending(repo, monkeypatch):
    from test_tool_checkpoint import MemSteps

    source, sha = repo
    monkeypatch.setenv('AI_BOARD_VERIFIED_LOOP', '1')
    created = []
    def factory(*args):
        checks = Checks(*args)
        created.append(checks)
        return checks
    monkeypatch.setattr(loop_checks, 'CheckSession', factory)
    store, budget = MemSteps(), Budget()
    common = {'deps': Script([action('edit_file', file='public/a.js', edits=[{'search': '1', 'replace': '3'}]),
                 action('write_test', test_file='test/a.test.js', test='public test'), action('finish')]),
              'budget': budget, 'model': 'fake', 'source': source, 'sha': sha, 'check': lambda out: None, 'store': store}
    subtask = {'title': 'Change a', 'file': 'public/a.js', 'verify': 'a is 3'}
    first = tool_loop.run_subtask(subtask, 'export const a = 1;\n', **common)
    assert first['status'] == 'proposed'
    before = budget.snapshot()
    resumed = Budget.restore(before)
    common.update(deps=Script([]), budget=resumed)
    second = tool_loop.run_subtask(subtask, 'export const a = 1;\n', **common)
    assert second['status'] == 'proposed' and created[-1].calls
    assert resumed.model_calls == before['model_calls']
    assert resumed.tool_calls > before['tool_calls']
    assert store.load()['ledger']['tool_calls'] == resumed.tool_calls
