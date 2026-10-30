"""Reviewer fix: one bounded edit of a high-finding one-way diff, committed to the candidate, then review reruns."""
import json
import subprocess
from dataclasses import replace
from pathlib import Path

import main
from gates import reviewer_fix, static_check
from runtime.budget import Budget

F = 'server/contexts/payment/index.js'
BASE = 'function pay(user, amount) {\n  return charge(user, amount);\n}\n'
CANDIDATE = 'function pay(user, amount) {\n  return charge(user, amount); // paid\n}\n'
FINDING = [{'severity': 'high', 'issue': 'No idempotency key on charge'}]
FIX = {'file': F, 'edits': [{'search': 'return charge(user, amount);', 'replace': 'return charge(user, amount, idemKey);'}]}


def git(cwd, *args):
    return subprocess.run(['git', '-c', 'user.name=t', '-c', 'user.email=t@t', *args], cwd=cwd, check=True, capture_output=True,
                          text=True).stdout.strip()


def repo(tmp_path):
    """Checkout with base commit and one candidate commit touching F."""
    root = tmp_path / 'checkout'
    (root / 'server/contexts/payment').mkdir(parents=True)
    git(root, 'init', '-q')
    (root / F).write_text(BASE, encoding='utf-8')
    git(root, 'add', '-A')
    git(root, 'commit', '-q', '-m', 'base')
    base = git(root, 'rev-parse', 'HEAD')
    (root / F).write_text(CANDIDATE, encoding='utf-8')
    git(root, 'commit', '-qam', 'candidate')
    head = git(root, 'rev-parse', 'HEAD')
    diff = git(root, 'diff', '--no-ext-diff', base, 'HEAD')
    state = {'full_checkout': str(root), 'base_sha': base, 'commits': [{'sha': head, 'title': 'c', 'files': [F]}],
             'full_diff': [{'file': '', 'diff': diff}], 'plan': {'subtasks': [{'file': F, 'allowed_scope': [F]}]},
             'repairs_left': 1, 'request_detail': 'add payment'}
    return root, state


class Models:
    gate1_model = 'fake-review'

    def __init__(self, *replies):
        self.replies, self.calls = list(replies), []

    def generate(self, model, prompt, **kw):
        self.calls.append({'model': model, 'prompt': prompt, **kw})
        reply = self.replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return {'response': reply if isinstance(reply, str) else json.dumps(reply), 'prompt_eval_count': 1, 'eval_count': 1,
                'eval_duration': 1_000_000_000}


def fix(models, state, findings=FINDING):
    return reviewer_fix.run(state, main.Deps(models=models, notify=None), Budget(), findings, db_path=None, proposal_id=None)


def test_fix_edits_candidate_commits_and_runs_with_thinking_off(tmp_path):
    root, st = repo(tmp_path)
    models = Models(FIX)
    out = fix(models, st)
    assert out['applied'] is True
    assert 'idemKey' in (root / F).read_text(encoding='utf-8')
    assert len(st['commits']) == 2 and st['commits'][-1]['sha'] == git(root, 'rev-parse', 'HEAD')
    assert st['commits'][-1]['files'] == [F]
    assert '+  return charge(user, amount, idemKey);' in st['full_diff'][0]['diff']
    assert git(root, 'status', '--porcelain') == ''
    call = models.calls[0]
    assert call['extra']['thinking'] is False and 'DEFAULT SKILL default-review' in call['extra']['system']
    assert 'return charge(user, amount); // paid' in call['prompt'] and 'add payment' not in call['prompt']
    assert st['repairs_left'] == 0 and len(st['reviewer_repairs']) == 1


def test_fix_refuses_file_outside_diff_and_leaves_repo_alone(tmp_path):
    root, st = repo(tmp_path)
    out = fix(Models({'file': 'public/x.html', 'edits': FIX['edits']}), st)
    assert out['applied'] is False
    assert len(st['commits']) == 1 and 'idemKey' not in (root / F).read_text(encoding='utf-8')


def test_fix_fails_closed_on_edit_that_does_not_apply(tmp_path):
    root, st = repo(tmp_path)
    bad = {'file': F, 'edits': [{'search': 'no such line', 'replace': 'x'}]}
    out = fix(Models(bad), st)
    assert out['applied'] is False and len(st['commits']) == 1
    assert git(root, 'status', '--porcelain') == ''


def test_fix_fails_closed_on_outage_and_garbage(tmp_path):
    root, st = repo(tmp_path)
    assert fix(Models(RuntimeError('vllm down')), st)['applied'] is False
    assert fix(Models('not json'), st)['applied'] is False
    assert len(st['commits']) == 1 and git(root, 'status', '--porcelain') == ''


def test_fix_disabled_without_repair_slot_or_after_one_fix(tmp_path):
    _, st = repo(tmp_path)
    assert reviewer_fix.allowed(st) is True
    assert reviewer_fix.allowed({**st, 'repairs_left': 0}) is False
    assert reviewer_fix.allowed({**st, 'reviewer_fixed': True}) is False
    assert reviewer_fix.allowed({'full_checkout': 'unused'}) is False


def test_fix_covers_a_multi_file_change_beyond_the_old_12k_cap(tmp_path):
    """Run 52: listing 5 file ~17KB > MAX_CONTEXT_CHARS 12000 → reviewer fix skip 'change too large',
    slot đã tiêu mà không gọi model nào. Trần nguyên file của executor là 60000."""
    root, st = repo(tmp_path)
    big = CANDIDATE + ('// fill\n' * 1700)  # ~13.7KB: vượt cap cũ 12000, dưới cap mới
    (root / F).write_text(big, encoding='utf-8')
    git(root, 'commit', '-qam', 'bigger')
    st = {**st, 'full_diff': [{'file': '', 'diff': git(root, 'diff', '--no-ext-diff', st['base_sha'], 'HEAD')},
                              {'file': F, 'diff': ''}]}
    models = Models({'file': F, 'edits': [{'search': 'return charge(user, amount); // paid',
                                           'replace': 'return charge(user, amount, idemKey);'}]})
    out = fix(models, st)
    assert out['applied'] is True, out
    assert out['file'] == F and 'idemKey' in (root / F).read_text(encoding='utf-8')


def test_fix_still_fails_closed_when_change_exceeds_the_cap(tmp_path):
    root, st = repo(tmp_path)
    huge = CANDIDATE + ('// fill\n' * 8000)  # ~64KB > 60000
    (root / F).write_text(huge, encoding='utf-8')
    git(root, 'commit', '-qam', 'huge')
    st = {**st, 'full_diff': [{'file': '', 'diff': git(root, 'diff', '--no-ext-diff', st['base_sha'], 'HEAD')}]}
    models = Models()
    out = fix(models, st)
    assert out['applied'] is False and 'too large' in out['reason']
    assert len(models.calls) == 0  # thoát trước lời gọi model


def test_gate_4_one_high_finding_fixed_then_reviewed_again(monkeypatch, fake_deps):
    monkeypatch.setattr(main.static_check, 'run', lambda s, **_: {'gate': 4, 'blocked': False, 'reason': None, 'issues': []})
    monkeypatch.setattr(main.static_check, 'content_review', lambda *a, **k: None)
    calls = []

    def applied(state, deps, budget, findings, **_):
        calls.append(findings)
        state.setdefault('commits', []).append({'sha': 'x', 'title': 'fix', 'files': [F]})
        state['repairs_left'] -= 1
        return {'applied': True}
    monkeypatch.setattr(reviewer_fix, 'run', applied)
    models = Models({'verdict': 'concerns', 'findings': [{'severity': 'high', 'issue': 'Charges twice'}]}, {'verdict': 'pass', 'findings': []})
    deps = replace(fake_deps, models=models, verify=None)
    out = main.run_gate(4, {}, deps, Budget(), {'full_diff': [{'file': F, 'diff': 'diff --git a/%s b/%s\n+charge(u)\n' % (F, F)}],
                                              'full_checkout': 'unused', 'repairs_left': 1})
    assert out['blocked'] is False and out['change_class'] == 'one_way'
    assert len(calls) == 1 and len(models.calls) == 2


def test_gate_4_keeps_repair_loop_when_fix_not_applied(monkeypatch, fake_deps):
    monkeypatch.setattr(main.static_check, 'run', lambda s, **_: {'gate': 4, 'blocked': False, 'reason': None, 'issues': []})
    monkeypatch.setattr(main.static_check, 'content_review', lambda *a, **k: None)
    monkeypatch.setattr(reviewer_fix, 'run', lambda *a, **k: {'applied': False})
    models = Models({'verdict': 'concerns', 'findings': [{'severity': 'high', 'issue': 'Charges twice'}]})
    deps = replace(fake_deps, models=models, verify=None)
    out = main.run_gate(4, {}, deps, Budget(), {'full_diff': [{'file': F, 'diff': 'diff --git a/%s b/%s\n+charge(u)\n' % (F, F)}],
                                              'full_checkout': 'unused', 'repairs_left': 1})
    assert out['blocked'] is True and out['failure_class'] == 'ordinary' and 'Charges twice' in out['reason']
    assert len(models.calls) == 1
