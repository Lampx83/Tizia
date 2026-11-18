"""AI_BOARD_API_STREAM: hosted calls stream and join deltas; the proxy's non-stream reply has newlines at chunk joins."""
import json

import pytest

from providers import client as client_module
from providers.client import OllamaClient, sse_completion
from providers.routing import ModelRouter
from runtime.budget import Budget
from runtime.meter import Tracer
from runtime.pipeline import Deps
from test_model_routing import api_catalog, hosted_settings


def sse(*events):
    return "".join(f"data: {json.dumps(e)}\n\n" for e in events) + "data: [DONE]\n\n"


def delta(**d):
    return {"choices": [{"index": 0, "delta": d, "finish_reason": None}]}


STREAM = sse(delta(role="assistant", content='{"summary_vi": "Thêm hàm getApp'),
             delta(content='Domains vào public/js/integrations'), delta(content='.js"}'),
             {"choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]},
             {"choices": [], "usage": {"prompt_tokens": 50, "completion_tokens": 9}})


def test_deltas_join_without_newlines_and_keep_finish_and_usage():
    body = sse_completion(STREAM)
    message = body["choices"][0]["message"]
    assert message["content"] == '{"summary_vi": "Thêm hàm getAppDomains vào public/js/integrations.js"}'
    assert body["choices"][0]["finish_reason"] == "stop"
    assert body["usage"] == {"prompt_tokens": 50, "completion_tokens": 9}


def test_tool_call_arguments_are_assembled_by_index():
    text = sse(delta(tool_calls=[{"index": 0, "id": "c1", "type": "function", "function": {"name": "read_file", "arguments": '{"pa'}}]),
               delta(tool_calls=[{"index": 0, "function": {"arguments": 'th": "a.js"}'}}]),
               {"choices": [{"index": 0, "delta": {}, "finish_reason": "tool_calls"}]})
    call = sse_completion(text)["choices"][0]["message"]["tool_calls"][0]
    assert call["id"] == "c1" and call["function"] == {"name": "read_file", "arguments": '{"path": "a.js"}'}


def test_stream_with_no_choice_is_an_invalid_response():
    with pytest.raises(ValueError):
        sse_completion("data: [DONE]\n\n")


class Raw:
    def __init__(self, text):
        self.data = text.encode()

    def __enter__(self):
        return self

    def __exit__(self, *_):
        pass

    def read(self, *_):
        data, self.data = self.data, b""
        return data


def hosted_call(monkeypatch, reply):
    sent = []

    def send(request, **_):
        sent.append(json.loads(request.data))
        return Raw(reply)
    monkeypatch.setattr("urllib.request.build_opener", lambda *_: type("Opener", (), {"open": staticmethod(send)}))
    monkeypatch.setattr(client_module, "_api_throttle", lambda: None)
    routing = ModelRouter(hosted_settings(), api_catalog())
    models = OllamaClient(base_url="http://primary", gate1_model="a", gate3_model="a", gate3_model_light="a", routing=routing)
    body = Deps(models=models, notify=None, sleep=lambda _: None, trace=Tracer()).call_model("a", "p", gate=1, budget=Budget())
    return sent[0], body


def test_flag_on_streams_the_hosted_call(monkeypatch):
    monkeypatch.setenv("AI_BOARD_API_STREAM", "1")
    payload, body = hosted_call(monkeypatch, STREAM)
    assert payload["stream"] is True and payload["stream_options"] == {"include_usage": True}
    assert body["response"].endswith('integrations.js"}') and "\n" not in body["response"]
    assert body["prompt_eval_count"] == 50 and body["done_reason"] == "stop"


def test_flag_off_keeps_the_plain_call(monkeypatch):
    reply = json.dumps({"choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}]})
    payload, body = hosted_call(monkeypatch, reply)
    assert payload["stream"] is False and "stream_options" not in payload and body["response"] == "{}"
