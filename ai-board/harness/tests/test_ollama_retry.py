"""The shared Ollama gateway answers 5xx now and then (model swap, GPU memory); one blip must not block a gate."""
import io
import json
import urllib.error

import pytest

import models


class _Reply:
    def __init__(self, body):
        self.body = json.dumps(body).encode("utf-8")

    def read(self):
        return self.body

    def __enter__(self):
        return self

    def __exit__(self, *_):
        return False


def _http(code):
    return urllib.error.HTTPError("http://x/api/generate", code, "boom", {}, io.BytesIO(b"{}"))


@pytest.fixture
def gateway(monkeypatch):
    """Scripted replies: each item is an exception to raise or a dict to return."""
    script, calls, waited = [], [], []
    monkeypatch.setattr(models, "_sleep", waited.append)

    def urlopen(request, timeout=None):
        calls.append(request.full_url)
        step = script.pop(0)
        if isinstance(step, Exception):
            raise step
        return _Reply(step)

    monkeypatch.setattr(models.urllib.request, "urlopen", urlopen)
    return script, calls, waited


def client():
    return models.OllamaClient(base_url="http://x", classifier_model="m")


@pytest.mark.parametrize("code", [500, 502, 503, 504])
def test_a_gateway_5xx_is_retried_and_the_second_answer_is_used(gateway, code):
    script, calls, waited = gateway
    script += [_http(code), {"response": "ok"}]
    assert client().generate("m", "p") == {"response": "ok"}
    assert len(calls) == 2 and len(waited) == 1


def test_a_dropped_connection_is_retried(gateway):
    script, calls, waited = gateway
    script += [urllib.error.URLError(ConnectionResetError("reset")), {"response": "ok"}]
    assert client().generate("m", "p")["response"] == "ok"
    assert len(calls) == 2


def test_it_gives_up_after_three_tries_with_growing_pauses(gateway):
    script, calls, waited = gateway
    script += [_http(500), _http(500), _http(500)]
    with pytest.raises(urllib.error.HTTPError):
        client().generate("m", "p")
    assert len(calls) == 3 and len(waited) == 2 and waited[0] < waited[1]


@pytest.mark.parametrize("code", [400, 401, 404])
def test_a_client_error_is_not_retried(gateway, code):
    script, calls, waited = gateway
    script += [_http(code)]
    with pytest.raises(urllib.error.HTTPError):
        client().generate("m", "p")
    assert len(calls) == 1 and waited == []
