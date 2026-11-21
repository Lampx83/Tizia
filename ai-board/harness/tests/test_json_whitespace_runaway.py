"""Schema calls to vLLM carry whitespace-run stop sequences; a reply with trailing whitespace still parses."""
import json

import pytest

from providers.client import WHITESPACE_STOPS, OllamaClient
from runtime import model_json

OK = {'choices': [{'message': {'content': '{}'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 1, 'completion_tokens': 1}}
SCHEMA = {'type': 'object'}


def sent(route='vllm', **kw):
    payloads = []
    client = OllamaClient(base_url='http://vllm', protocol='vllm', route_label=route)
    client._post = lambda _path, payload, **_: payloads.append(payload) or OK
    client.generate('m', 'p', **kw)
    return payloads[0]


def test_schema_call_adds_whitespace_stops_and_keeps_caller_stop():
    assert sent(format=SCHEMA)['stop'] == list(WHITESPACE_STOPS)
    assert sent(format=SCHEMA, stop='END')['stop'] == ['END', *WHITESPACE_STOPS]
    assert sent(format=SCHEMA, stop=['END', WHITESPACE_STOPS[0]])['stop'] == ['END', *WHITESPACE_STOPS]


@pytest.mark.parametrize('kw', [{}, {'format': 'json'}])
def test_non_schema_call_has_no_stop(kw):
    assert 'stop' not in sent(**kw)


def test_hosted_call_has_no_added_stop():
    assert 'stop' not in sent('api', format=SCHEMA)


def test_stops_cannot_cut_pretty_printed_json():
    pretty = json.dumps({'a': [{'b': 'x\ny\tz', 'c': 1}], 'd': {'e': {'f': {'g': 2}}}}, indent=4)
    pretty += '\n'
    assert not any(stop in pretty for stop in WHITESPACE_STOPS)
    assert not any(stop in json.dumps({'s': 'a\n\n\n\n\n\n\n\nb'}) for stop in WHITESPACE_STOPS)


def test_trailing_whitespace_run_still_parses():
    assert model_json.loads(('{"a": 1}' + '\t' * 500).rstrip()) == {'a': 1}
