"""Unified call executor: one owner of attempts, failover and the shared cap. Fake single-attempt provider only."""
import json
import urllib.error

import pytest

from budget import Budget
from main import Deps
from models import OllamaClient
from runtime import call_executor
from runtime.budget import BudgetExhausted
from settings import reset_settings


def _http(code):
    return urllib.error.HTTPError('http://x', code, 'boom', {}, None)


def _transient(error):
    return isinstance(error, urllib.error.HTTPError) and error.code >= 500


class Provider:
    """Fake single-attempt provider: per candidate id, a list of bodies or exceptions to raise."""

    def __init__(self, script):
        self.script, self.calls = script, []

    def __call__(self, candidate):
        self.calls.append(candidate['id'])
        step = self.script[candidate['id']].pop(0)
        if isinstance(step, Exception):
            raise step
        return step


def _go(provider, candidates, waits, recorded=None, **kw):
    recorded = [] if recorded is None else recorded
    record = lambda candidate, body, error, started: recorded.append((candidate['id'], error is None))
    return call_executor.run(candidates, provider, record, budget=Budget(), sleep=waits.append,
                             check_wait=lambda _: None, retryable=_transient, empty_msg='no candidate', **kw)


A, B, C = {'id': 'a'}, {'id': 'b'}, {'id': 'c'}


def test_success_is_one_attempt_without_pause():
    waits, recorded = [], []
    candidate, body = _go(Provider({'a': [{'response': 'ok'}]}), [A], waits, recorded)
    assert (candidate, body) == (A, {'response': 'ok'}) and waits == [] and recorded == [('a', True)]


def test_transient_failure_retries_same_candidate_after_first_pause():
    provider, waits = Provider({'a': [_http(503), {'response': 'ok'}]}), []
    _, body = _go(provider, [A], waits)
    assert body == {'response': 'ok'} and provider.calls == ['a', 'a'] and waits == [call_executor.BACKOFF_S[0]]


def test_gives_up_after_max_attempts_with_growing_pauses():
    provider, waits = Provider({'a': [_http(503)] * 3}), []
    with pytest.raises(urllib.error.HTTPError):
        _go(provider, [A], waits)
    assert provider.calls == ['a'] * call_executor.MAX_ATTEMPTS == ['a'] * 3
    assert waits == list(call_executor.BACKOFF_S) and waits[0] < waits[1]


def test_client_error_is_not_retried():
    provider, waits = Provider({'a': [_http(400)]}), []
    with pytest.raises(urllib.error.HTTPError):
        _go(provider, [A], waits)
    assert provider.calls == ['a'] and waits == []


def test_stop_on_error_skips_retry():
    provider, waits = Provider({'a': [_http(503)]}), []
    with pytest.raises(urllib.error.HTTPError):
        _go(provider, [A], waits, stop_on_error=True)
    assert provider.calls == ['a'] and waits == []


def test_failover_goes_to_untried_candidate_before_repeating():
    provider, failed = Provider({'a': [_http(503)], 'b': [{'response': 'ok'}]}), []
    candidate, _ = _go(provider, [A, B], [], on_failed=lambda c: failed.append(c['id']))
    assert candidate == B and provider.calls == ['a', 'b'] and failed == ['a']


def test_one_shared_cap_across_candidates():
    provider = Provider({'a': [_http(500)], 'b': [_http(502)], 'c': [_http(503)]})
    with pytest.raises(urllib.error.HTTPError) as caught:
        _go(provider, [A, B, C], [])
    assert provider.calls == ['a', 'b', 'c'] and caught.value.code == 503


def test_record_sees_every_attempt_including_failures():
    recorded = []
    _go(Provider({'a': [_http(503)], 'b': [{'response': 'ok'}]}), [A, B], [], recorded)
    assert recorded == [('a', False), ('b', True)]


def test_no_candidate_raises_without_attempt():
    with pytest.raises(RuntimeError, match='no candidate'):
        _go(Provider({}), [], [])


def test_exhausted_budget_makes_no_provider_call():
    class Spent(Budget):
        def can_request(self):
            return False

    provider = Provider({'a': [{'response': 'ok'}]})
    with pytest.raises(BudgetExhausted):
        call_executor.run([A], provider, lambda *a: None, budget=Spent(), sleep=lambda _: None,
                          check_wait=lambda _: None, retryable=_transient, empty_msg='x')
    assert provider.calls == []


@pytest.fixture
def transport(monkeypatch):
    """Fake HTTP attempt per generate call, scripted per model name (candidate model)."""
    script, calls = {}, []

    def generate(self, model, prompt, *, format=None, extra=None, _single_attempt=False, **options):
        assert _single_attempt, 'Deps must own retries: one HTTP attempt per provider call'
        calls.append(model)
        step = script[model].pop(0)
        if isinstance(step, Exception):
            raise step
        return step

    monkeypatch.setattr(OllamaClient, 'generate', generate)
    return script, calls


@pytest.fixture
def flag(monkeypatch):
    def set_flag(on):
        monkeypatch.setenv('AI_BOARD_CALL_EXECUTOR', '1' if on else '0')
        reset_settings()
    yield set_flag
    monkeypatch.delenv('AI_BOARD_CALL_EXECUTOR', raising=False)
    reset_settings()


def _models(monkeypatch, tmp_path, *, fallback):
    from providers import routing
    catalog = json.loads(routing.CATALOG.read_text(encoding='utf8'))
    if fallback:
        catalog['candidates']['test-ollama-heavy'] = {'provider': 'ollama', 'model': 'test-heavy-fallback', 'enabled': True,
            'approved_roles': ['gate3_heavy'], 'capabilities': ['json']}
        catalog['roles']['gate3_heavy'] = ['vllm-heavy-coder', 'test-ollama-heavy']
    path = tmp_path / 'routing.json'
    path.write_text(json.dumps(catalog), encoding='utf8')
    monkeypatch.setattr(routing, 'CATALOG', path)
    return OllamaClient.from_env({'OLLAMA_URL': 'http://ollama.test', 'VLLM_URL': 'http://vllm.test',
                                  'GATE3_MODEL_HEAVY': 'heavy', 'AI_BOARD_MODEL_ROUTING': 'true'})


def _call(models, waits):
    budget = Budget()
    result = Deps(models=models, notify=None, sleep=waits.append).call_model(
        'heavy', 'p', gate=3, role='gate3_heavy', budget=budget)
    return result, budget


@pytest.mark.parametrize('on', [False, True])
def test_one_failing_endpoint_makes_three_http_attempts(monkeypatch, tmp_path, transport, flag, on):
    flag(on)
    script, calls = transport
    script['heavy'] = [_http(503)] * 3
    waits = []
    with pytest.raises(urllib.error.HTTPError):
        _call(_models(monkeypatch, tmp_path, fallback=False), waits)
    assert calls == ['heavy'] * 3 and waits == list(call_executor.BACKOFF_S)


def test_failing_endpoint_with_fallback_counts_attempts_per_flag(monkeypatch, tmp_path, transport, flag):
    script, calls = transport
    script['heavy'] = [_http(503)] * 3
    script['test-heavy-fallback'] = [{'response': '{}', 'prompt_eval_count': 2, 'eval_count': 1}]
    flag(False)
    legacy, _ = _call(_models(monkeypatch, tmp_path, fallback=True), [])
    legacy_calls = list(calls)
    calls.clear()
    script['heavy'] = [_http(503)]
    script['test-heavy-fallback'] = [{'response': '{}', 'prompt_eval_count': 2, 'eval_count': 1}]
    flag(True)
    unified, budget = _call(_models(monkeypatch, tmp_path, fallback=True), [])
    assert legacy_calls == ['heavy'] * 3 + ['test-heavy-fallback']
    assert calls == ['heavy', 'test-heavy-fallback'] and budget.model_calls == 2
    assert unified['_route']['candidate'] == legacy['_route']['candidate'] == 'test-ollama-heavy'
    assert unified['_route']['reason'] == 'infrastructure_failover'


@pytest.mark.parametrize('on', [False, True])
def test_happy_path_is_the_same_with_flag_either_way(monkeypatch, tmp_path, transport, flag, on):
    flag(on)
    script, calls = transport
    script['heavy'] = [{'response': '{}', 'prompt_eval_count': 2, 'eval_count': 1}]
    result, budget = _call(_models(monkeypatch, tmp_path, fallback=False), [])
    assert calls == ['heavy'] and budget.model_calls == 1 and budget.units >= 0
    assert result['_route'] == {'role': 'gate3_heavy', 'candidate': 'vllm-heavy-coder', 'provider': 'vllm',
                                'reason': 'reviewed_priority'}
    assert result['_model'] == 'heavy' and result['response'] == '{}'


def test_flag_defaults_off(monkeypatch):
    monkeypatch.delenv('AI_BOARD_CALL_EXECUTOR', raising=False)
    reset_settings()
    from settings import get_settings
    assert get_settings().call_executor is False
