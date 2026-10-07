"""Public local HTTP fixtures only: no GPU or external model endpoints."""
import json
import threading
import time
import urllib.error
from contextlib import contextmanager
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import pytest

from budget import Budget
from main import Deps
from meter import Tracer, measure, units
from models import OllamaClient


@contextmanager
def gateway(*, redirect=None, response=None, status=200):
    calls = []

    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            calls.append((self.path, dict(self.headers), json.loads(self.rfile.read(int(self.headers['Content-Length'])))))
            self.send_response(302 if redirect else status)
            if redirect:
                self.send_header('Location', redirect)
            self.end_headers()
            self.wfile.write(json.dumps(response if response is not None else {
                'choices': [{'message': {'content': '{"code":"ok"}'}, 'finish_reason': 'stop'}],
                'usage': {'prompt_tokens': 11, 'completion_tokens': 7}}).encode())

        def log_message(self, *_):
            pass

    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f'http://127.0.0.1:{server.server_port}', calls
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


@pytest.mark.parametrize('routing', ['false', 'true'])
@pytest.mark.parametrize('suffix', ['', '/v1'])
def test_heavy_uses_vllm_and_shared_budget_trace(routing, suffix):
    with gateway() as (url, calls):
        models = OllamaClient.from_env({'VLLM_URL': url + suffix, 'VLLM_SECKEY': 'fixture-vllm',
            'GATE3_MODEL_HEAVY': 'qwen3.5-35b-a3b-int4', 'GATE3_MODEL_LIGHT': 'light',
            'OLLAMA_URL': 'http://unused.invalid', 'OLLAMA_SECKEY': 'must-not-leak',
            'AI_BOARD_API_ENABLED': 'false', 'AI_BOARD_MODEL_ROUTING': routing})
        models.timeout_s = 2
        budget, trace = Budget(), Tracer()
        result = Deps(models=models, notify=None, trace=trace).call_model(
            models.gate3_model, 'complex task', gate=3, role='gate3_heavy', budget=budget)
        assert calls[0][0] == '/v1/chat/completions'
        assert calls[0][1]['Authorization'] == 'Bearer fixture-vllm'
        assert calls[0][1]['X-Ollama-Seckey'] == 'fixture-vllm' and 'must-not-leak' not in json.dumps(calls)
        payload = calls[0][2]
        assert payload['model'] == models.gate3_model
        assert payload['messages'] == [{'role': 'user', 'content': 'complex task'}]
        assert payload['response_format'] == {'type': 'json_object'}
        assert payload['max_tokens'] > 0 and 'options' not in payload
        assert result['response'] == '{"code":"ok"}'
        assert budget.model_calls == 1 and budget.tokens == 18
        assert trace.pending[0]['provider'] == 'vllm'
        assert trace.pending[0]['metrics']['tokens_in'] == 11
        assert trace.pending[0]['metrics']['gpu_ms'] is None
        assert 'fixture-vllm' not in json.dumps(trace.pending)
        if routing == 'true':
            assert result['_route']['candidate'] == 'vllm-heavy-coder'


def test_light_stays_ollama_and_no_key_crosses_redirect():
    with gateway(response={'response': 'light'}) as (light_url, light_calls):
        with gateway(redirect=light_url + '/stolen') as (heavy_url, heavy_calls):
            models = OllamaClient.from_env({'OLLAMA_URL': light_url, 'OLLAMA_SECKEY': 'fixture-ollama',
                'VLLM_URL': heavy_url, 'VLLM_SECKEY': 'fixture-vllm',
                'GATE3_MODEL_HEAVY': 'heavy', 'GATE3_MODEL_LIGHT': 'light'})
            models.timeout_s = 2
            assert models.generate('light', 'p')['response'] == 'light'
            assert light_calls[0][0] == '/api/generate'
            assert light_calls[0][1]['X-Ollama-Seckey'] == 'fixture-ollama'
            with pytest.raises(urllib.error.HTTPError) as error:
                models.generate('heavy', 'p', _single_attempt=True)
            assert error.value.code == 302 and len(heavy_calls) == 1 and len(light_calls) == 1


def test_vllm_missing_usage_remains_unknown_and_self_hosted_units_use_wall():
    with gateway(response={'choices': [{'message': {'content': '{}'}, 'finish_reason': 'stop'}]}) as (url, _):
        body = OllamaClient(base_url=url, protocol='vllm').generate('heavy', 'p')
        metrics = measure('vllm', body, 2500)
        assert metrics['tokens_in'] is None and metrics['tokens_out'] is None
        assert units('vllm', metrics) == 3


def test_infrastructure_fallback_preserves_heavy_role_budget_and_credentials(monkeypatch, tmp_path):
    # The real catalog is vLLM-only for heavy; inject a synthetic Ollama fallback to keep failover covered.
    from providers import routing
    catalog = json.loads(routing.CATALOG.read_text(encoding='utf8'))
    catalog['candidates']['test-ollama-heavy'] = {'provider': 'ollama', 'model': 'test-heavy-fallback', 'enabled': True,
        'approved_roles': ['gate3_heavy'], 'capabilities': ['json']}
    catalog['roles']['gate3_heavy'] = ['vllm-heavy-coder', 'test-ollama-heavy']
    path = tmp_path / 'routing.json'
    path.write_text(json.dumps(catalog), encoding='utf8')
    monkeypatch.setattr(routing, 'CATALOG', path)
    with gateway(response={'response': '{}', 'prompt_eval_count': 2, 'eval_count': 1}) as (ollama_url, ollama_calls):
        with gateway(status=503) as (vllm_url, vllm_calls):
            models = OllamaClient.from_env({'OLLAMA_URL': ollama_url, 'OLLAMA_SECKEY': 'ollama-only',
                'VLLM_URL': vllm_url, 'VLLM_SECKEY': 'vllm-only',
                'GATE3_MODEL_HEAVY': 'heavy', 'AI_BOARD_MODEL_ROUTING': 'true'})
            budget = Budget()
            result = Deps(models=models, notify=None, sleep=lambda _: None).call_model(
                'heavy', 'p', gate=3, role='gate3_heavy', budget=budget)
            assert len(vllm_calls) == 3 and len(ollama_calls) == 1
            assert budget.model_calls == 4 and budget.tokens == 3
            assert result['_route']['reason'] == 'infrastructure_failover'
            assert result['_route']['candidate'] == 'test-ollama-heavy'
            assert ollama_calls[0][1]['X-Ollama-Seckey'] == 'ollama-only'
            assert 'Authorization' not in ollama_calls[0][1]


def test_complex_subtask_selects_heavy_and_small_selects_vllm_default():
    from gates.implement import model_for
    models = OllamaClient.from_env({'VLLM_URL': 'http://fixture.test', 'OLLAMA_URL': 'http://ollama.test',
        'GATE3_MODEL_HEAVY': 'custom-heavy', 'AI_BOARD_MODEL_ROUTING': 'true'})
    assert model_for({'size': 'large'}, models) == 'custom-heavy'
    assert model_for({'size': 'small'}, models) == 'qwen3.5-35b-a3b-int4'


def test_explicit_roles_keep_shared_tag_bound_to_provider():
    with gateway(response={'response': '{}'}) as (ollama_url, ollama_calls):
        with gateway() as (vllm_url, vllm_calls):
            models = OllamaClient.from_env({'OLLAMA_URL': ollama_url, 'VLLM_URL': vllm_url,
                'GATE3_MODEL_HEAVY': 'same', 'GATE3_MODEL_LIGHT': 'same'})
            deps = Deps(models=models, notify=None)
            for role in ['gate3_light', 'gate4_review', 'calibration']:
                deps.call_model('same', 'p', gate=3, role=role, budget=Budget())
            deps.call_model('same', 'p', gate=3, role='gate3_heavy', budget=Budget())
            assert len(ollama_calls) == 3 and len(vllm_calls) == 1


def test_real_implement_uses_heavy_role_with_shared_tag_and_routing_off(monkeypatch, tmp_path):
    from gates import implement
    # Scope checks have their own tests; this fixture isolates the actual Gate 3 call boundary.
    monkeypatch.setattr(implement, 'check_file_path', lambda _: None)
    codegen = json.dumps({'code': 'export const x = 1;', 'test_file': 'test/x.test.js',
                         'test': "import test from 'node:test';\n"})
    with gateway(response={'response': codegen}) as (ollama_url, ollama_calls):
        with gateway(response={'choices': [{'message': {'content': codegen}, 'finish_reason': 'stop'}]}) as (vllm_url, vllm_calls):
            models = OllamaClient.from_env({'OLLAMA_URL': ollama_url, 'VLLM_URL': vllm_url,
                'GATE3_MODEL_HEAVY': 'same', 'GATE3_MODEL_LIGHT': 'same', 'AI_BOARD_MODEL_ROUTING': 'false'})
            budget = Budget()
            result = implement.run({'plan': {'subtasks': [{'file': 'public/x.js', 'title': 'x',
                'verify': 'renders', 'size': 'large'}]}, 'scratch_repo': str(tmp_path)},
                Deps(models=models, notify=None), budget)
            assert not result['blocked'] and budget.model_calls == 1
            assert len(vllm_calls) == 1 and ollama_calls == []


@pytest.mark.parametrize('url', ['http://user:secret@fixture.test', 'http://fixture.test?secret=x', 'file:///tmp/model'])
def test_vllm_endpoint_rejects_credentials_queries_and_non_http(url):
    with pytest.raises(ValueError, match='Invalid model provider endpoint'):
        OllamaClient.from_env({'VLLM_URL': url, 'GATE3_MODEL_HEAVY': 'heavy'}).generate('heavy', 'p')


def test_expired_deadline_makes_no_http_request_and_retry_cannot_exceed_it():
    with gateway(status=503) as (url, calls):
        models = OllamaClient(base_url=url, protocol='vllm', deadline=time.monotonic() - 1)
        with pytest.raises(TimeoutError, match='deadline'):
            models.generate('heavy', 'p')
        assert calls == []
        models.deadline = time.monotonic() + 1
        budget = Budget()
        with pytest.raises(TimeoutError, match='deadline'):
            Deps(models=models, notify=None).call_model('heavy', 'p', gate=3, budget=budget)
        assert len(calls) == budget.model_calls == 1


@pytest.mark.parametrize('body', [{}, {'choices': []}, {'choices': [{'message': {'content': None}}]},
                                  {'choices': [{'message': {'content': '{}'}}], 'usage': {'prompt_tokens': -1}}])
def test_malformed_vllm_is_charged_without_switching(body):
    with gateway(response=body) as (url, calls):
        models = OllamaClient.from_env({'VLLM_URL': url, 'GATE3_MODEL_HEAVY': 'heavy'})
        budget = Budget()
        with pytest.raises(ValueError, match='Invalid vLLM'):
            Deps(models=models, notify=None).call_model('heavy', 'p', gate=3, budget=budget)
        assert budget.model_calls == len(calls) == 1


def test_reasoning_is_per_role_with_extra_token_allowance():
    """gate1 (plan) thinks and gets +4096 tokens; gate3_light does not; both send the choice explicitly."""
    with gateway() as (vllm_url, calls):
        models = OllamaClient.from_env({'VLLM_URL': vllm_url, 'VLLM_SECKEY': 'k', 'AI_BOARD_MODEL_ROUTING': 'true'})
        deps = Deps(models=models, notify=None, sleep=lambda _: None)
        deps.call_model('m', 'p', gate=1, role='gate1', budget=Budget(), options={'num_predict': 100})
        deps.call_model('m', 'p', gate=3, role='gate3_light', budget=Budget(), options={'num_predict': 100})
    plan, light = calls[0][2], calls[1][2]
    assert plan['chat_template_kwargs'] == {'enable_thinking': True} and plan['max_tokens'] == 100 + 4096
    assert light['chat_template_kwargs'] == {'enable_thinking': False} and light['max_tokens'] == 100
