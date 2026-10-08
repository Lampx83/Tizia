import io
import json
import urllib.error

import pytest

from budget import Budget
from main import Deps
from meter import Tracer
from model_routing import ModelRouter, validate_catalog
from models import OllamaClient


def catalog():
    return {'version': 1, 'enabled': False, 'api_enabled': False, 'roles': {'gate1': ['a', 'b'], 'gate3_heavy': ['a', 'b'],
                                  'gate3_light': ['a', 'b'], 'classifier': ['a', 'b'], 'embed': ['a', 'b']},
            'endpoint_cooldown_s': 60, 'embedding_space': 'space', 'classifier_calibration_id': 'fit',
            'candidates': {name: {'provider': provider, 'model': name, 'enabled': True,
                'approved_roles': ['gate1', 'gate3_heavy', 'gate3_light', 'classifier', 'embed'],
                'capabilities': ['json', 'logprobs', 'embedding'], 'calibration_id': 'fit', 'embedding_space': 'space'}
                for name, provider in [('a', 'ollama'), ('b', 'vllm')]}}


def client(config=None, clock=lambda: 0):
    settings = {'OLLAMA_URL': 'http://primary', 'OLLAMA_SECKEY': 'primary-key',
                'VLLM_URL': 'http://secondary', 'VLLM_SECKEY': 'secondary-key'}
    return OllamaClient(base_url='http://primary', gate1_model='a', gate3_model='a', gate3_model_light='a',
                        routing=ModelRouter(settings, config or catalog(), clock=clock))


class Reply:
    def __init__(self, body):
        self.body = body
    def __enter__(self):
        return self
    def __exit__(self, *_):
        pass
    def read(self):
        return json.dumps(self.body).encode()


def chat_shape(body):
    """Ollama-shaped test step -> OpenAI chat reply, for the vLLM candidate."""
    if not isinstance(body, dict) or 'response' not in body:
        return body
    choice = {'message': {'content': body['response']}, 'finish_reason': 'stop'}
    if body.get('logprobs'):
        choice['logprobs'] = {'content': [{'token': item['token'], 'logprob': item['logprob'],
                                           'top_logprobs': item['top_logprobs']} for item in body['logprobs']]}
    usage = {key: body[src] for key, src in (('prompt_tokens', 'prompt_eval_count'), ('completion_tokens', 'eval_count')) if src in body}
    return {'choices': [choice], **({'usage': usage} if usage else {})}


def mock_gateway(monkeypatch, steps):
    calls = []
    def send(request, **_):
        calls.append((request.full_url, request.headers, json.loads(request.data)))
        step = steps.pop(0)
        if isinstance(step, Exception):
            raise step
        return Reply(chat_shape(step) if request.full_url.startswith('http://secondary') else step)
    monkeypatch.setattr('urllib.request.urlopen', send)
    monkeypatch.setattr('urllib.request.build_opener', lambda *_: type('Opener', (), {'open': staticmethod(send)}))
    return calls


def http_error(code):
    return urllib.error.HTTPError('http://primary', code, 'gateway', {}, io.BytesIO(b'{}'))


def test_opt_in_only_and_existing_client_unchanged():
    assert OllamaClient.from_env({'OLLAMA_URL': 'http://p'}).routing is None
    assert OllamaClient.from_env({'AI_BOARD_MODEL_ROUTING': 'false'}).routing is None
    assert OllamaClient.from_env({'AI_BOARD_MODEL_ROUTING': 'true'}).routing is not None


def test_reviewed_order_and_role_approval():
    config = catalog()
    config['candidates']['a']['approved_roles'] = []
    router = client(config).routing
    assert router.first('gate1')['id'] == 'b'
    config['candidates']['b']['enabled'] = False
    with pytest.raises(RuntimeError, match='No reviewed'):
        router.first('gate1')


def test_incompatible_embeddings_classifier_and_unsupported_api_are_excluded():
    config = catalog()
    config['candidates']['a']['embedding_space'] = 'other'
    config['candidates']['a']['calibration_id'] = 'other'
    config['candidates']['b']['provider'] = 'api'
    config['api_enabled'] = True
    router = client(config).routing
    assert router.candidates('embed') == []
    assert router.candidates('classifier') == []


@pytest.mark.parametrize('edit', [lambda c: c['roles'].update(gate1=['missing']),
                                  lambda c: c['roles'].update(gate1=['a', 'a']),
                                  lambda c: c['candidates']['a'].update(provider='unknown')])
def test_bad_catalog_fails_before_requests(edit):
    config = catalog()
    edit(config)
    with pytest.raises(ValueError):
        validate_catalog(config)


def test_infrastructure_failover_charges_every_attempt_and_separates_credentials(monkeypatch):
    calls = mock_gateway(monkeypatch, [http_error(503)] * 3 + [{'response': '{}', 'prompt_eval_count': 2, 'eval_count': 3}])
    trace = Tracer()
    deps = Deps(models=client(), notify=None, sleep=lambda _: None, trace=trace)
    budget = Budget()
    result = deps.call_model('a', 'prompt', gate=1, budget=budget)
    assert budget.model_calls == 4 and budget.tokens == 5 and budget.units == 4
    assert [c[0] for c in calls] == ['http://primary/api/generate'] * 3 + ['http://secondary/v1/chat/completions']
    assert calls[0][1]['X-ollama-seckey'] == 'primary-key'
    assert calls[-1][1]['X-ollama-seckey'] == 'secondary-key'
    assert result['_route'] == {'role': 'gate1', 'candidate': 'b', 'provider': 'vllm', 'reason': 'infrastructure_failover'}
    assert len(trace.pending) == 4
    assert 'primary-key' not in json.dumps(trace.pending) and 'secondary-key' not in json.dumps(trace.pending)
    assert deps.models.routing.first('gate1')['id'] == 'b'


@pytest.mark.parametrize('code', [400, 401, 403, 404, 429, 501, 505])
def test_nontransient_response_cannot_switch_candidates(monkeypatch, code):
    calls = mock_gateway(monkeypatch, [http_error(code)])
    budget = Budget()
    with pytest.raises(urllib.error.HTTPError):
        Deps(models=client(), notify=None).call_model('a', 'p', gate=1, budget=budget)
    assert len(calls) == budget.model_calls == 1


def test_bad_json_is_charged_but_not_retried(monkeypatch):
    calls = mock_gateway(monkeypatch, [ValueError('invalid JSON')])
    budget = Budget()
    with pytest.raises(ValueError):
        Deps(models=client(), notify=None).call_model('a', 'p', gate=1, budget=budget)
    assert budget.model_calls == len(calls) == 1


@pytest.mark.parametrize('body', [[], None, 'text'])
def test_nonobject_json_is_charged_without_failover(monkeypatch, body):
    calls = mock_gateway(monkeypatch, [body])
    budget = Budget()
    with pytest.raises(ValueError, match='JSON object'):
        Deps(models=client(), notify=None).call_model('a', 'p', gate=1, budget=budget)
    assert budget.model_calls == len(calls) == budget.units == 1


def test_explicit_candidate_pin_does_not_run_another_model(monkeypatch):
    config = catalog()
    config['roles']['calibration'] = ['a', 'b']
    for item in config['candidates'].values():
        item['approved_roles'].append('calibration')
    calls = mock_gateway(monkeypatch, [{'response': '{}'}])
    deps = Deps(models=client(config), notify=None, model_role='calibration', model_candidate='b')
    result = deps.call_model('b', 'p', gate=1, budget=Budget())
    assert result['_route']['candidate'] == 'b' and calls[0][2]['model'] == 'b'


def test_quality_switch_counter_survives_budget_restore():
    budget = Budget(quality_switches=1)
    assert Budget.restore(budget.snapshot()).quality_switches == 1


def test_budget_is_not_reset_by_failover(monkeypatch):
    calls = mock_gateway(monkeypatch, [http_error(503)] * 2)
    budget = Budget(max_model_calls=2)
    with pytest.raises(RuntimeError, match='budget exhausted'):
        Deps(models=client(), notify=None, sleep=lambda _: None).call_model('a', 'p', gate=1, budget=budget)
    assert budget.model_calls == len(calls) == 2


def test_cooldown_expires_and_returns_to_reviewed_priority():
    now = [0]
    router = client(clock=lambda: now[0]).routing
    router.failed(router.first('gate1'))
    assert router.first('gate1')['id'] == 'b'
    now[0] = 60
    assert router.first('gate1')['id'] == 'a'


def test_heavy_role_does_not_depend_on_distinct_model_names(monkeypatch):
    config = catalog()
    config['roles']['gate3_heavy'] = ['b']
    calls = mock_gateway(monkeypatch, [{'response': '{}'}])
    result = Deps(models=client(config), notify=None).call_model('a', 'p', gate=3, role='gate3_heavy', budget=Budget())
    assert result['_route']['candidate'] == 'b' and calls[0][2]['model'] == 'b'


def test_quality_switch_is_explicit_and_uses_same_budget(monkeypatch):
    calls = mock_gateway(monkeypatch, [{'response': 'bad'}, {'response': '{}'}])
    budget = Budget()
    deps = Deps(models=client(), notify=None)
    first = deps.call_model('a', 'p', gate=3, role='gate3_light', budget=budget)
    second = deps.call_model('a', 'repair', gate=3, role='gate3_light', budget=budget,
                             exclude_candidates={first['_route']['candidate']}, route_reason='quality_switch')
    assert budget.model_calls == 2 and second['_route']['reason'] == 'quality_switch'
    assert calls[1][2]['model'] == 'b'


def test_gate3_switches_once_across_subtasks_without_adding_attempts(monkeypatch, tmp_path):
    from gates import implement
    monkeypatch.setattr(implement, 'check_file_path', lambda _: None)
    good = {'response': json.dumps({'code': 'export const x = 1;', 'test_file': 'test/x.test.js',
                                  'test': "import test from 'node:test';\n"})}
    calls = mock_gateway(monkeypatch, [{'response': 'bad'}] * 3 + [good] + [{'response': 'bad'}] * 3 + [good])
    state = {'plan': {'subtasks': [{'file': f'public/{name}.js', 'title': name, 'verify': 'renders', 'size': 'large'}
                                  for name in ['one', 'two']]}, 'scratch_repo': str(tmp_path)}
    budget = Budget()
    result = implement.run(state, Deps(models=client(), notify=None, sleep=lambda _: None), budget)
    assert not result['blocked'] and budget.quality_switches == 1
    assert [c[2]['model'] for c in calls] == ['a', 'a', 'a', 'b', 'a', 'a', 'a', 'a']
    assert budget.model_calls == 8


def test_critical_codegen_does_not_trigger_quality_switch(monkeypatch, tmp_path):
    from gates import implement
    monkeypatch.setattr(implement, 'check_file_path', lambda _: None)
    calls = mock_gateway(monkeypatch, [{'response': json.dumps({'code': '// code', 'test_file': '../escape.js',
                                                              'test': "import test from 'node:test';"})}])
    budget = Budget()
    result = implement.run({'plan': {'subtasks': [{'file': 'public/x.js', 'title': 'x', 'verify': 'x', 'size': 'small'}]},
                            'scratch_repo': str(tmp_path)}, Deps(models=client(), notify=None), budget)
    assert result['failure_class'] == 'critical' and len(calls) == 1 and budget.quality_switches == 0


def test_embedding_never_fails_over_to_vllm(monkeypatch):
    calls = mock_gateway(monkeypatch, [http_error(503)])
    with pytest.raises(RuntimeError):
        client().embed('one')
    assert len(calls) == 1


@pytest.mark.parametrize('response', [http_error(401), {'embedding': []}, {'embedding': [float('nan')]}])
def test_bad_embedding_response_never_changes_model(monkeypatch, response):
    calls = mock_gateway(monkeypatch, [response])
    with pytest.raises(RuntimeError):
        client().embed('one')
    assert len(calls) == 1


def test_catalog_cannot_omit_classifier_or_embedding_lock():
    config = catalog()
    del config['classifier_calibration_id']
    del config['embedding_space']
    for item in config['candidates'].values():
        del item['calibration_id']
        del item['embedding_space']
    router = client(config).routing
    assert router.candidates('embed') == [] and router.candidates('classifier') == []


def test_endpoint_validation_does_not_disclose_credentials():
    router = client().routing
    router.settings['OLLAMA_URL'] = 'https://user:secret@example.com'
    with pytest.raises(ValueError) as caught:
        router.candidates('gate1')
    assert 'secret' not in str(caught.value)


def test_classifier_reports_actual_candidate_without_legacy_model_setting(monkeypatch):
    import classifier
    monkeypatch.setattr(classifier, 'task_mode', lambda _: 'active')
    body = {'response': 'A', 'logprobs': [{'token': 'A', 'logprob': 0, 'top_logprobs': [{'token': 'A', 'logprob': 0}]}]}
    mock_gateway(monkeypatch, [http_error(503)] * 3 + [body])
    result = classifier.classify('clarity', 'request', Deps(models=client(), notify=None, sleep=lambda _: None),
                                 Budget(), gate=1)
    assert result['model'] == 'b' and result['route']['provider'] == 'vllm'


def test_vllm_classifier_needs_logprobs_and_matching_calibration_and_embed_stays_blocked():
    config = catalog()
    for name in ('a', 'b'):
        config['candidates'][name]['provider'] = 'vllm'
    router = ModelRouter({'VLLM_URL': 'http://vllm/v1', 'VLLM_SECKEY': 'k'}, config)
    assert [c['id'] for c in router.candidates('classifier')] == ['a', 'b']
    assert router.candidates('embed') == []
    config['candidates']['a']['calibration_id'] = 'x-unfitted'
    config['candidates']['b']['capabilities'] = ['json']
    assert router.candidates('classifier') == []


def test_classifier_routes_to_vllm_chat_logprobs(monkeypatch):
    import classifier
    monkeypatch.setattr(classifier, 'task_mode', lambda _: 'active')
    config = catalog()
    config['candidates']['a']['provider'] = 'vllm'
    router = ModelRouter({'VLLM_URL': 'http://vllm', 'VLLM_SECKEY': 'vllm-key'}, config)
    models = OllamaClient(base_url='http://vllm', gate1_model='a', gate3_model='a', gate3_model_light='a', routing=router)
    top = [{'token': 'A', 'logprob': -0.1}, {'token': 'B', 'logprob': -2.5}]
    reply = {'choices': [{'message': {'content': 'A'}, 'finish_reason': 'length',
                          'logprobs': {'content': [{'token': 'A', 'logprob': -0.1, 'top_logprobs': top}]}}],
             'usage': {'prompt_tokens': 5, 'completion_tokens': 1}}
    calls = []  # vLLM goes through a no-redirect opener, not urlopen
    def send(request, **_):
        calls.append((request.full_url, request.headers, json.loads(request.data)))
        return Reply(reply)
    monkeypatch.setattr('urllib.request.build_opener', lambda *_: type('Opener', (), {'open': staticmethod(send)}))
    result = classifier.classify('clarity', 'request', Deps(models=models, notify=None, sleep=lambda _: None), Budget(), gate=1)
    url, headers, payload = calls[0]
    assert url == 'http://vllm/v1/chat/completions'
    assert headers['X-ollama-seckey'] == 'vllm-key' and headers['Authorization'] == 'Bearer vllm-key'
    assert payload['logprobs'] is True and payload['top_logprobs'] == 20 and payload['max_tokens'] == 1
    assert payload['chat_template_kwargs'] == {'enable_thinking': False} and 'options' not in payload
    assert result['route']['provider'] == 'vllm' and result['probs']['clear'] > result['probs']['vague']


def test_vllm_classifier_response_without_logprobs_is_rejected():
    reply = {'choices': [{'message': {'content': 'A'}}], 'usage': {}}
    client_ = OllamaClient(base_url='http://vllm', protocol='vllm')
    client_._post = lambda *_a, **_k: reply
    with pytest.raises(ValueError, match='no logprobs'):
        client_.generate('m', 'p', extra={'logprobs': True})
