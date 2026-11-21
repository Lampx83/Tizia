"""Hosted API fallback seam: routing choice, payload shape, model id, limits. Fakes only, no network."""
import argparse
import json
from types import SimpleNamespace

import pytest

from providers.client import OllamaClient
from providers.routing import GEMINI_DEFAULT_MODEL, ModelRouter, local_only
from runtime import limits
from runtime.budgets.budget import Budget
from runtime.compaction import CompactionPause, History
from runtime.budgets.meter import Tracer
from runtime.pipeline import Deps

GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/openai'
ROLES = ['gate1', 'gate25', 'gate3_light', 'gate3_heavy', 'gate4_review']


def catalog():
    def vllm(model):
        return {'provider': 'vllm', 'model': model, 'enabled': True, 'approved_roles': ROLES, 'capabilities': ['json']}
    return {'version': 1, 'enabled': True, 'api_enabled': False, 'endpoint_cooldown_s': 60,
            'roles': {role: ['v', 'h'] for role in ROLES},
            'candidates': {'v': vllm('qwen'), 'h': {'provider': 'api', 'model': 'set-by-API_MODEL', 'enabled': True,
                                                    'approved_roles': ROLES, 'capabilities': ['json']}}}


def env(**over):
    return {'VLLM_URL': 'http://vllm.local', 'API_URL': GEMINI_BASE, 'API_KEY': 'k', 'API_MODEL_PROVIDER': 'gemini',
            'AI_BOARD_API_FALLBACK': '1', **over}


def busy(running=1, waiting=0):
    return lambda _settings: {'running': running, 'waiting': waiting}


def picked(settings, probe, role='gate1', config=None):
    return [c['id'] for c in ModelRouter(settings, config or catalog(), probe=probe).candidates(role)]


def test_alias_and_default_model():
    router = ModelRouter({'BASE_URL': GEMINI_BASE, 'API_KEY': 'k', 'API_MODEL_PROVIDER': 'gemini',
                          'AI_BOARD_API_FALLBACK': '1', 'VLLM_URL': 'http://v'}, catalog(), probe=busy())
    [candidate] = router.candidates('gate1')
    assert router.endpoint('api') == GEMINI_BASE and candidate['model'] == GEMINI_DEFAULT_MODEL == 'gemini-2.5-flash'


def test_unknown_provider_is_a_clear_error():
    with pytest.raises(ValueError, match='API_MODEL_PROVIDER'):
        ModelRouter(env(API_MODEL_PROVIDER='other'), catalog(), probe=busy()).candidates('gate1')


def test_api_model_overrides_every_role_model_override():
    settings = env(API_MODEL='gemini-x', GATE1_MODEL='qwen-a', GATE3_MODEL_HEAVY='qwen-b', GATE3_MODEL_LIGHT='qwen-c')
    router = ModelRouter(settings, catalog(), probe=busy())
    assert {role: router.first(role)['model'] for role in ROLES} == dict.fromkeys(ROLES, 'gemini-x')


def test_fallback_picks_api_when_busy_and_vllm_when_idle():
    assert picked(env(), busy(1, 0)) == ['h']
    assert picked(env(), busy(0, 2)) == ['h']
    assert picked(env(), busy(0, 0)) == ['v', 'h']
    assert picked(env(), lambda _s: (_ for _ in ()).throw(OSError('down'))) == ['h']


def test_verdict_is_decided_once_per_router():
    calls = []
    router = ModelRouter(env(), catalog(), probe=lambda s: calls.append(1) or {'running': 1, 'waiting': 0})
    for role in ROLES:
        router.candidates(role)
    assert len(calls) == 1


def test_flag_off_or_no_key_keeps_vllm_only():
    off = env(AI_BOARD_API_FALLBACK='')
    assert picked(off, busy()) == ['v']
    assert picked(env(API_KEY=''), busy()) == ['v']


def test_roles_without_hosted_candidate_stay_local():
    config = catalog()
    config['roles']['classifier'] = ['v']
    config['candidates']['v']['approved_roles'] = ROLES + ['classifier']
    config['candidates']['v']['capabilities'] = ['json', 'logprobs']
    config['candidates']['v']['calibration_id'] = 'qwen35-4b-v1'
    assert picked(env(), busy(), 'classifier', config) == ['v']


def test_evaluation_deps_refuse_the_hosted_route():
    router = ModelRouter(env(), catalog(), probe=busy())
    local_only(SimpleNamespace(models=SimpleNamespace(routing=router)))
    with pytest.raises(RuntimeError, match='evaluation'):
        router.candidates('gate1')
    idle = ModelRouter(env(), catalog(), probe=busy(0, 0))
    local_only(SimpleNamespace(models=SimpleNamespace(routing=idle)))
    assert [c['id'] for c in idle.candidates('gate1')] == ['v']


class Reply:
    def __init__(self, body):
        self.body = body

    def __enter__(self):
        return self

    def __exit__(self, *_):
        pass

    def read(self):
        return json.dumps(self.body).encode()


def gateway(monkeypatch):
    calls = []

    def send(request, **_):
        calls.append((request.full_url, json.loads(request.data)))
        return Reply({'choices': [{'message': {'content': '{}'}, 'finish_reason': 'stop'}],
                      'usage': {'prompt_tokens': 2, 'completion_tokens': 3}})
    monkeypatch.setattr('urllib.request.build_opener', lambda *_: type('Opener', (), {'open': staticmethod(send)}))
    monkeypatch.setattr('providers.client._sleep', lambda _s: None)
    return calls


def deps_for(settings, probe):
    router = ModelRouter(settings, catalog(), probe=probe)
    template = OllamaClient(base_url='http://x', gate1_model='qwen', gate3_model='qwen', gate3_model_light='qwen', routing=router)
    return Deps(models=template, notify=None, sleep=lambda _: None, trace=Tracer())


def test_api_route_payload_path_model_and_provenance(monkeypatch):
    calls = gateway(monkeypatch)
    deps = deps_for(env(API_MODEL='gemini-2.5-flash', GATE1_MODEL='qwen'), busy())
    body = deps.call_model('qwen', 'p', gate=1, budget=Budget(), format={'type': 'object'},
                           extra={'thinking': True}, options={'num_predict': 999, 'top_k': 20, 'min_p': 0.1, 'temperature': 0.2})
    url, payload = calls[0]
    assert url == GEMINI_BASE + '/chat/completions'
    assert payload['model'] == 'gemini-2.5-flash'
    assert not {'chat_template_kwargs', 'top_k', 'min_p', 'logprobs'} & set(payload)
    assert payload['response_format']['type'] == 'json_schema'
    assert payload['max_tokens'] == 8192
    assert body['_model'] == 'gemini-2.5-flash' and body['_route']['model'] == 'gemini-2.5-flash'
    assert body['_route']['reason'] == 'api_fallback' and body['_route']['limits']['max_tokens'] == 8192


def test_api_route_sends_the_thinking_switch_to_a_hosted_qwen(monkeypatch):
    calls = gateway(monkeypatch)
    deps = deps_for(env(API_MODEL='qwen3.5-35b-a3b', GATE1_MODEL='qwen'), busy())
    deps.call_model('qwen', 'p', gate=1, budget=Budget(), extra={'thinking': False})
    _, payload = calls[0]
    assert payload['model'] == 'qwen3.5-35b-a3b' and payload['chat_template_kwargs'] == {'enable_thinking': False}


def test_idle_vllm_route_is_untouched(monkeypatch):
    calls = gateway(monkeypatch)
    deps = deps_for(env(), busy(0, 0))
    deps.call_model('qwen', 'p', gate=1, budget=Budget(), extra={'thinking': False}, options={'num_predict': 999, 'top_k': 20})
    url, payload = calls[0]
    assert url == 'http://vllm.local/v1/chat/completions'
    assert payload['max_tokens'] == 999 and payload['top_k'] == 20 and payload['chat_template_kwargs'] == {'enable_thinking': False}


def test_api_run_raises_the_token_ceiling_only_on_api(monkeypatch):
    gateway(monkeypatch)
    budget = Budget()
    deps_for(env(), busy()).call_model('qwen', 'p', gate=1, budget=budget)
    assert budget.max_tokens == 400000
    local = Budget()
    deps_for(env(), busy(0, 0)).call_model('qwen', 'p', gate=1, budget=local)
    assert local.max_tokens == Budget().max_tokens


def hosted_payload(monkeypatch, model, extra, route_label='api'):
    calls = gateway(monkeypatch)
    monkeypatch.setattr('providers.client._api_throttle', lambda: None)
    OllamaClient(base_url=GEMINI_BASE, protocol='vllm', route_label=route_label, bearer_only=True,
                 seckey='k').generate(model, 'p', extra=extra)
    return calls[0][1]


@pytest.mark.parametrize('model', ['qwen3.5-35b-a3b', 'Qwen3.5-35B-A3B'])
@pytest.mark.parametrize('think', [False, True])
def test_hosted_qwen_sends_the_per_role_thinking_switch(monkeypatch, model, think):
    payload = hosted_payload(monkeypatch, model, {'thinking': think})
    assert payload['chat_template_kwargs'] == {'enable_thinking': think}


def test_hosted_non_qwen_omits_the_thinking_switch(monkeypatch):
    assert 'chat_template_kwargs' not in hosted_payload(monkeypatch, 'gemini-2.5-flash', {'thinking': False})


def test_hosted_qwen_without_a_thinking_choice_keeps_the_server_default(monkeypatch):
    assert 'chat_template_kwargs' not in hosted_payload(monkeypatch, 'qwen3.5-35b-a3b', {})


def test_local_vllm_sends_the_switch_for_any_model_name(monkeypatch):
    payload = hosted_payload(monkeypatch, 'gemma-local', {'thinking': False}, route_label='vllm')
    assert payload['chat_template_kwargs'] == {'enable_thinking': False}


def test_hosted_context_comes_from_the_contract_not_a_server_query():
    client = OllamaClient(base_url=GEMINI_BASE, protocol='vllm', route_label='api', bearer_only=True)
    assert client.context_window('gemini-2.5-flash') == 32768


def test_limits_contract_defaults():
    assert limits.api_limits('gate4_review') == {'max_tokens': 2048, 'context': 32768, 'compaction': 24000,
                                                 'reasoning_extra': 2048, 'run_tokens': 400000, 'rpm': 10}
    assert limits.api_limits('gate1')['max_tokens'] == 8192


def test_global_env_then_role_env_then_cli(monkeypatch):
    monkeypatch.setenv('AI_BOARD_API_MAX_TOKENS', '1000')
    assert limits.api_limits('gate25')['max_tokens'] == 1000
    monkeypatch.setenv('AI_BOARD_API_MAX_TOKENS_GATE1', '777')
    assert limits.api_limits('gate1')['max_tokens'] == 777 and limits.api_limits('gate25')['max_tokens'] == 1000
    monkeypatch.setenv('AI_BOARD_API_RUN_TOKENS', '5000')
    monkeypatch.setenv('AI_BOARD_API_RPM', '0')
    assert limits.api_limits()['run_tokens'] == 5000 and limits.api_limits()['rpm'] == 0
    parser = argparse.ArgumentParser()
    limits.add_api_args(parser)
    args = parser.parse_args(['--api-max-tokens', '321', '--api-run-tokens', '9000'])
    limits.apply_api_args(args)
    assert limits.api_limits('gate25')['max_tokens'] == 321 and limits.api_limits()['run_tokens'] == 9000


@pytest.mark.parametrize('name,value', [('AI_BOARD_API_MAX_TOKENS', '0'), ('AI_BOARD_API_MAX_TOKENS_GATE1', '-5'),
                                        ('AI_BOARD_API_RUN_TOKENS', 'abc'), ('AI_BOARD_API_CONTEXT_TOKENS', '1.5')])
def test_invalid_limit_env_is_a_clear_error(monkeypatch, name, value):
    monkeypatch.setenv(name, value)
    with pytest.raises(ValueError, match=name):
        limits.api_limits('gate1')


def test_invalid_cli_value_is_rejected():
    parser = argparse.ArgumentParser()
    limits.add_api_args(parser)
    for bad in ('0', '-1', 'x'):
        with pytest.raises(SystemExit):
            parser.parse_args(['--api-max-tokens', bad])


def prepare(provider):
    router = SimpleNamespace(candidates=lambda role: [{'provider': provider}])
    deps = SimpleNamespace(models=SimpleNamespace(context_window=lambda *_a, **_k: 65536, routing=router))
    return History().prepare('x' * 30000, deps=deps, model='m', role='gate3_heavy', budget=Budget(), manifest=None)


def test_compaction_threshold_on_api_comes_from_the_api_block(monkeypatch):
    monkeypatch.setattr(limits, 'api_limits', lambda role=None, env=None: {'compaction': 48000})
    assert prepare('api').startswith('x')
    with pytest.raises(CompactionPause):
        prepare('vllm')


def test_verdict_is_reprobed_after_the_ttl():
    from providers.routing import FALLBACK_PROBE_TTL_S
    now, loads = [0.0], [{'running': 0, 'waiting': 0}]
    router = ModelRouter(env(), catalog(), probe=lambda _s: loads[0], clock=lambda: now[0])
    assert [c['id'] for c in router.candidates('gate1')] == ['v', 'h']
    loads[0] = {'running': 3, 'waiting': 0}
    now[0] = FALLBACK_PROBE_TTL_S / 2
    assert [c['id'] for c in router.candidates('gate1')] == ['v', 'h']
    now[0] = FALLBACK_PROBE_TTL_S + 1
    assert [c['id'] for c in router.candidates('gate1')] == ['h']


def test_vllm_cooldown_mid_run_fails_over_to_api():
    router = ModelRouter(env(), catalog(), probe=busy(0, 0), clock=lambda: 10.0)
    assert [c['id'] for c in router.candidates('gate3_light')] == ['v', 'h']
    router.cooldowns['vllm'] = 70.0
    assert [c['id'] for c in router.candidates('gate3_light')] == ['h']


def test_pinned_suite_verdict_does_not_fail_over_on_cooldown():
    router = ModelRouter(env(AI_BOARD_API_VERDICT='vllm'), catalog(), probe=busy(0, 0), clock=lambda: 10.0)
    router.cooldowns['vllm'] = 70.0
    assert router.candidates('gate3_light') == []


def test_pinned_vllm_verdict_has_no_api_backup():
    assert picked(env(AI_BOARD_API_VERDICT='vllm'), busy(0, 0)) == ['v']


def test_local_only_router_drops_the_backup_instead_of_refusing():
    router = ModelRouter(env(), catalog(), probe=busy(0, 0))
    router.local_only = True
    assert [c['id'] for c in router.candidates('gate1')] == ['v']


def test_lease_verdict_pins_the_provider_for_every_router(monkeypatch):
    from providers import routing
    monkeypatch.setattr(routing, 'LEASE_VERDICT', 'api')
    assert picked(env(), busy(0, 0)) == ['h']
    monkeypatch.setattr(routing, 'LEASE_VERDICT', 'vllm')
    assert picked(env(), busy(5, 0)) == ['v', 'h']


def test_lease_provider_reports_what_gate1_would_use():
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker_planner import lease_provider
    client = lambda probe: SimpleNamespace(routing=ModelRouter(env(), catalog(), probe=probe))
    assert lease_provider(client(busy(1, 0))) == 'api'
    assert lease_provider(client(busy(0, 0))) == 'vllm'
    assert lease_provider(SimpleNamespace(routing=None)) == 'vllm'
