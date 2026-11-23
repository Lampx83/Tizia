"""Whole seam: no-context adversarial review of one-way diffs, thinking on, review skill only, fail closed."""
import json
from dataclasses import replace

from runtime import pipeline as main
from gates import adversarial_review
from runtime.budgets.budget import Budget

PAY = 'diff --git a/server/contexts/payment/index.js b/server/contexts/payment/index.js\n--- a/server/contexts/payment/index.js\n+++ b/server/contexts/payment/index.js\n@@ -1 +1 @@\n+charge(user, amount)\n'
CONTEXT = 'IMPLEMENTER-RATIONALE-xyz request: add payment'


class Models:
    gate1_model = 'fake-review'
    gate3_model = 'fake-impl'
    gate3_model_light = 'fake-light'

    def __init__(self, *replies):
        self.replies, self.calls = list(replies), []

    def generate(self, model, prompt, **kw):
        self.calls.append({'model': model, 'prompt': prompt, **kw})
        reply = self.replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return {'response': reply if isinstance(reply, str) else json.dumps(reply), 'prompt_eval_count': 100, 'eval_count': 50,
                'eval_duration': 1_000_000_000}


def state():
    return {'full_diff': [{'file': 'server/contexts/payment/index.js', 'diff': PAY}], 'request_detail': CONTEXT,
            'plan': {'goal': CONTEXT}}


def run(models, st=None):
    deps = main.Deps(models=models, notify=None)
    return adversarial_review.run(st or state(), deps, Budget())


def test_review_sees_only_the_diff_with_thinking_on_and_review_skill_only():
    models = Models({'verdict': 'pass', 'findings': []})
    out = run(models)
    call = models.calls[0]
    assert out['blocked'] is False and out['verdict'] == 'pass'
    assert 'charge(user, amount)' in call['prompt'] and CONTEXT not in call['prompt']
    assert call['extra']['thinking'] is True
    assert 'DEFAULT SKILL default-review' in call['extra']['system']
    assert 'default-all' not in call['extra']['system'] and 'default-backend' not in call['extra']['system']


def test_high_finding_blocks_as_ordinary_repair_and_lower_findings_are_kept_as_evidence():
    out = run(Models({'verdict': 'concerns', 'findings': [{'severity': 'high', 'issue': 'No idempotency key on charge'},
                                                           {'severity': 'low', 'issue': 'Rename amount'}]}))
    assert out['blocked'] is True and out['failure_class'] == 'ordinary'
    assert 'idempotency' in out['reason']
    assert [f['severity'] for f in out['findings']] == ['high', 'low']
    soft = run(Models({'verdict': 'concerns', 'findings': [{'severity': 'medium', 'issue': 'Log the amount'}]}))
    assert soft['blocked'] is False and soft['findings'][0]['issue'] == 'Log the amount'


def test_outage_is_transient_and_garbage_is_critical_never_a_silent_pass():
    assert run(Models(RuntimeError('vllm down')))['failure_class'] == 'transient'
    bad = run(Models('not json'))
    assert bad['blocked'] is True and bad['failure_class'] == 'critical'
    assert run(Models({'verdict': 'pass', 'findings': 'x'}))['failure_class'] == 'critical'


def test_oversized_diff_is_marked_truncated():
    models = Models({'verdict': 'pass', 'findings': []})
    big = state()
    big['full_diff'][0]['diff'] = PAY + '+' + 'x' * 20000 + '\n'
    out = run(models, big)
    assert out['truncated'] is True and len(models.calls[0]['prompt']) < 14000


def test_gate_4_runs_review_only_for_one_way_and_blocks_on_high_finding(monkeypatch, fake_deps):
    monkeypatch.setattr(main.static_check, 'run', lambda s, **_: {'gate': 4, 'blocked': False, 'reason': None, 'issues': []})
    monkeypatch.setattr(main.static_check, 'content_review', lambda *a, **k: None)
    models = Models({'verdict': 'concerns', 'findings': [{'severity': 'high', 'issue': 'Charges twice on retry'}]})
    deps = replace(fake_deps, models=models, verify=None)
    st = {'full_diff': [{'file': 'server/contexts/payment/index.js', 'diff': PAY}], 'full_checkout': 'unused'}
    out = main.run_gate(4, {}, deps, Budget(), st)
    assert out['blocked'] is True and out['failure_class'] == 'ordinary' and 'Charges twice' in out['reason']
    assert out['change_class'] == 'one_way' and out['adversarial_review']['findings'][0]['severity'] == 'high'
    quiet = Models()
    two = {'full_diff': [{'file': 'public/a.html', 'diff': PAY.replace('server/contexts/payment/index.js', 'public/a.html')}], 'full_checkout': 'unused'}
    out = main.run_gate(4, {}, replace(fake_deps, models=quiet, verify=None), Budget(), two)
    assert out['blocked'] is False and out['change_class'] == 'two_way' and quiet.calls == []


def test_truncated_clean_review_fails_closed():
    big = state()
    big['full_diff'][0]['diff'] = PAY + '+' + 'x' * 20000 + '\n'
    out = run(Models({'verdict': 'pass', 'findings': []}), big)
    assert out['blocked'] is True and out['failure_class'] == 'critical'


def _tol(monkeypatch, on):
    from settings import reset_settings
    monkeypatch.setenv('AI_BOARD_CRITICAL_ONLY_CHECKS', '1' if on else '0')
    reset_settings()


def test_oversize_is_advisory_with_flag_and_critical_without(monkeypatch):
    big = state()
    big['full_diff'][0]['diff'] = PAY + '+' + 'x' * 20000 + '\n'
    _tol(monkeypatch, True)
    out = run(Models({'verdict': 'pass', 'findings': []}), big)
    assert out['blocked'] is False and out['advisory']
    _tol(monkeypatch, False)
    assert run(Models({'verdict': 'pass', 'findings': []}), big)['failure_class'] == 'critical'


def test_test_files_do_not_count_toward_size_with_flag(monkeypatch):
    _tol(monkeypatch, True)
    st = state()
    st['full_diff'].append({'file': 'test/a.test.js', 'diff': '+' + 'x' * 20000})
    models = Models({'verdict': 'pass', 'findings': []})
    out = run(models, st)
    assert not out.get('advisory') and out['truncated'] is False and 'xxxx' not in models.calls[0]['prompt']


def test_garbage_verdict_is_asked_again_then_advisory_with_flag(monkeypatch):
    _tol(monkeypatch, True)
    models = Models('not json', 'still not')
    out = run(models)
    assert out['blocked'] is False and out['advisory'] and len(models.calls) == 2
    good = Models('not json', {'verdict': 'pass', 'findings': []})
    assert run(good)['verdict'] == 'pass'
    _tol(monkeypatch, False)
    assert run(Models('not json'))['failure_class'] == 'critical'


def test_tolerant_prompt_does_not_ask_for_rollback_and_names_additive_migrations(monkeypatch):
    _tol(monkeypatch, True)
    models = Models({'verdict': 'pass', 'findings': []})
    run(models)
    assert 'missing rollback' not in models.calls[0]['prompt'] and 'IF NOT EXISTS' in models.calls[0]['prompt']
    _tol(monkeypatch, False)
    models = Models({'verdict': 'pass', 'findings': []})
    run(models)
    assert 'missing rollback' in models.calls[0]['prompt']
