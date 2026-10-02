import io
import sys
import urllib.error
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from test_http_worker import FakeTransport
from worker import HttpWorker, WorkerClient, model_preflight


class FakeOllama:
    gate1_model, gate3_model, gate3_model_light, classifier_model = 'g1', 'heavy', 'light', 'clf'

    def __init__(self, broken=()):
        self.broken, self.calls = set(broken), []

    def generate(self, model, prompt, **options):
        self.calls.append((model, prompt, options))
        if model in self.broken:
            raise urllib.error.HTTPError('http://gw', 500, 'Internal Server Error', {},
                                         io.BytesIO(b'{"error":"model failed to load, resource limitations"}'))
        return {'response': 'ok'}


def worker_with(ollama, clock):
    transport = FakeTransport()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1', mode='shadow')
    worker.model_check = model_preflight(ollama, clock=clock)
    return worker, transport


def test_unloadable_model_blocks_the_claim():
    worker, transport = worker_with(FakeOllama(broken={'heavy'}), lambda: 0.0)
    out = worker.run_once()
    assert out['status'] == 'model_unavailable' and out['model'] == 'heavy'
    assert 'HTTP Error 500' in out['error'] and 'failed to load' in out['error']
    assert not any(call[1].endswith('/claim') for call in transport.calls)


def test_checks_each_distinct_model_once_with_a_tiny_generate():
    ollama = FakeOllama()
    ollama.gate3_model_light = 'heavy'  # trùng → 1 lần
    ollama.classifier_model = ''  # không cấu hình → bỏ qua
    worker, transport = worker_with(ollama, lambda: 0.0)
    assert worker.run_once()['status'] != 'model_unavailable'
    assert [call[0] for call in ollama.calls] == ['g1', 'heavy']
    assert ollama.calls[0][1:] == ('ok', {'num_predict': 1})
    assert any(call[1].endswith('/claim') for call in transport.calls)


def test_success_is_cached_for_60s_and_failure_is_retried_every_poll():
    now = [0.0]
    ollama = FakeOllama()
    worker, _ = worker_with(ollama, lambda: now[0])
    worker.run_once()
    now[0] = 59.0
    worker.run_once()
    assert len(ollama.calls) == 4  # chỉ lượt đầu gọi model
    now[0] = 61.0
    worker.run_once()
    assert len(ollama.calls) == 8

    ollama.broken = {'g1'}
    now[0] = 200.0
    assert worker.run_once()['status'] == 'model_unavailable'
    assert worker.run_once()['status'] == 'model_unavailable'  # lỗi không được cache
    assert [call[0] for call in ollama.calls[-2:]] == ['g1', 'g1']


def test_non_http_error_is_also_model_unavailable():
    class Down(FakeOllama):
        def generate(self, model, prompt, **options):
            raise TimeoutError('timed out')

    worker, _ = worker_with(Down(), lambda: 0.0)
    out = worker.run_once()
    assert out['status'] == 'model_unavailable' and 'timed out' in out['error']
