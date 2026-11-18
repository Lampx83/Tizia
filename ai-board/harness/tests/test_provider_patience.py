"""AI_BOARD_PROVIDER_PATIENCE: hosted API transient errors get a longer backoff and Retry-After; an empty pool waits out the cooldown."""
import io
import urllib.error

import pytest

from providers.client import OllamaClient
from providers.routing import ModelRouter
from runtime.budget import Budget
from runtime.meter import Tracer
from runtime.pipeline import Deps
from test_model_routing import api_catalog, hosted_settings, mock_gateway

OK = {'choices': [{'message': {'content': '{}'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 2, 'completion_tokens': 3}}


def error(code, retry_after=None):
    headers = {'Retry-After': str(retry_after)} if retry_after is not None else {}
    return urllib.error.HTTPError('https://api.example.test', code, 'gateway', headers, io.BytesIO(b'{}'))


def hosted(clock=lambda: 0):
    routing = ModelRouter(hosted_settings(), api_catalog(), clock=clock)
    return OllamaClient(base_url='http://primary', gate1_model='a', gate3_model='a', gate3_model_light='a', routing=routing)


def deps(models, slept):
    return Deps(models=models, notify=None, sleep=slept.append, trace=Tracer())


@pytest.fixture(autouse=True)
def _no_throttle(monkeypatch):
    monkeypatch.setattr('providers.client._api_throttle', lambda: None)


@pytest.fixture
def patience(monkeypatch):
    monkeypatch.setenv('AI_BOARD_PROVIDER_PATIENCE', '1')


def test_flag_off_keeps_three_attempts(monkeypatch):
    mock_gateway(monkeypatch, [error(503)] * 3 + [OK])
    slept = []
    with pytest.raises(urllib.error.HTTPError):
        deps(hosted(), slept).call_model('a', 'p', gate=1, budget=Budget())
    assert slept == [2.0, 5.0]


def test_patient_api_outlasts_a_503_burst(monkeypatch, patience):
    calls = mock_gateway(monkeypatch, [error(503)] * 4 + [OK])
    slept, budget = [], Budget()
    result = deps(hosted(), slept).call_model('a', 'p', gate=1, budget=budget)
    assert result['_provider'] == 'api' and len(calls) == 5 and budget.model_calls == 5
    assert len(slept) == 4 and sum(slept) >= 2 + 5 + 15 + 30


@pytest.mark.parametrize('code', [429, 524])
def test_rate_limit_and_cloudflare_timeout_are_retried(monkeypatch, patience, code):
    mock_gateway(monkeypatch, [error(code), OK])
    assert deps(hosted(), []).call_model('a', 'p', gate=1, budget=Budget())['_provider'] == 'api'


def test_retry_after_sets_a_floor_with_a_cap(monkeypatch, patience):
    mock_gateway(monkeypatch, [error(503, retry_after=20), error(503, retry_after=9999), OK])
    slept = []
    deps(hosted(), slept).call_model('a', 'p', gate=1, budget=Budget())
    assert slept[0] >= 20 and slept[1] == 60


def test_bad_request_is_not_retried(monkeypatch, patience):
    calls = mock_gateway(monkeypatch, [error(400), OK])
    with pytest.raises(urllib.error.HTTPError):
        deps(hosted(), []).call_model('a', 'p', gate=1, budget=Budget())
    assert len(calls) == 1


def test_empty_pool_waits_out_the_cooldown(monkeypatch, patience):
    now = [100.0]
    models = hosted(clock=lambda: now[0])
    models.routing.failed(models.routing.first('gate1'))
    mock_gateway(monkeypatch, [OK])
    slept = []

    def sleep(s):
        slept.append(s)
        now[0] += s
    result = Deps(models=models, notify=None, sleep=sleep, trace=Tracer()).call_model('a', 'p', gate=1, budget=Budget())
    assert result['_provider'] == 'api' and slept == [60.0]


def test_empty_pool_without_patience_fails_as_before(monkeypatch):
    models = hosted()
    models.routing.failed(models.routing.first('gate1'))
    with pytest.raises(RuntimeError, match='No reviewed'):
        deps(models, []).call_model('a', 'p', gate=1, budget=Budget())


def test_patience_outlasts_a_burst_of_six_errors(monkeypatch, patience):
    """r105: five 503s in a row over about a minute ended gate 1; the schedule must reach past that."""
    mock_gateway(monkeypatch, [error(503)] * 6 + [OK])
    slept = []
    assert deps(hosted(), slept).call_model('a', 'p', gate=1, budget=Budget())['_provider'] == 'api'
    assert len(slept) == 6 and sum(slept) >= 120
