"""A model call that never connected settles at zero tokens; other failures keep usage unknown."""
import socket
import urllib.error

import pytest

from providers import client as client_module
from providers.client import OllamaClient


class Root:
    def __init__(self):
        self.settled = []

    def reserve(self, kind, **body):
        return 'a1'

    def settle(self, attempt, metrics):
        self.settled.append(metrics)


def post(monkeypatch, error):
    root = Root()
    monkeypatch.setattr(client_module, 'current', lambda: root)

    class Opener:
        def open(self, *_a, **_k):
            raise error

    monkeypatch.setattr(client_module.urllib.request, 'build_opener', lambda *_a: Opener())
    model = OllamaClient(base_url='https://api.example/v1', seckey='k', protocol='vllm', bearer_only=True, route_label='api')
    with pytest.raises(type(error)):
        model._post('/chat/completions', {'model': 'm', 'messages': []}, retry=False)
    return root.settled[0]


@pytest.mark.parametrize('reason', [socket.gaierror(-5, 'no address'), ConnectionRefusedError(111, 'refused'), TimeoutError('connect')])
def test_call_that_never_connected_settles_zero_tokens(monkeypatch, reason):
    metrics = post(monkeypatch, urllib.error.URLError(reason))
    assert (metrics['tokens_in'], metrics['tokens_out']) == (0, 0)


def test_reset_or_read_timeout_keeps_usage_unknown(monkeypatch):
    assert post(monkeypatch, urllib.error.URLError(ConnectionResetError(104, 'reset')))['tokens_in'] is None
    assert post(monkeypatch, TimeoutError('read'))['tokens_in'] is None


def http_error(code):
    import io
    return urllib.error.HTTPError('https://api.example/v1', code, 'busy', {}, io.BytesIO(b'{}'))


@pytest.mark.parametrize('code', [429, 503])
def test_rejected_call_settles_zero_tokens_under_patience(monkeypatch, code):
    """Patient retries send many rejected calls; charging each its whole reservation drained the root allowance."""
    monkeypatch.setenv('AI_BOARD_PROVIDER_PATIENCE', '1')
    metrics = post(monkeypatch, http_error(code))
    assert (metrics['tokens_in'], metrics['tokens_out']) == (0, 0)


@pytest.mark.parametrize('code', [500, 502, 504, 524])
def test_error_after_possible_work_keeps_usage_unknown_under_patience(monkeypatch, code):
    monkeypatch.setenv('AI_BOARD_PROVIDER_PATIENCE', '1')
    assert post(monkeypatch, http_error(code))['tokens_in'] is None


@pytest.mark.parametrize('code', [429, 503, 524])
def test_error_status_keeps_usage_unknown_by_default(monkeypatch, code):
    monkeypatch.delenv('AI_BOARD_PROVIDER_PATIENCE', raising=False)
    assert post(monkeypatch, http_error(code))['tokens_in'] is None
