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
    worker.clock = clock
    return worker, transport


def test_unloadable_model_blocks_the_claim():
    worker, transport = worker_with(FakeOllama(broken={'clf'}), lambda: 0.0)
    out = worker.run_once()
    assert out['status'] == 'waiting_gpu' and out['model'] == 'clf'
    assert 'HTTP Error 500' in out['error'] and 'failed to load' in out['error']
    assert not any(call[1].endswith('/claim') for call in transport.calls)


def test_busy_gpu_resumes_claiming_once_the_model_loads_again():
    now = [0.0]
    ollama = FakeOllama(broken={'g1'})
    worker, transport = worker_with(ollama, lambda: now[0])
    assert worker.run_once()['status'] == 'waiting_gpu'
    assert not any(call[1].endswith('/claim') for call in transport.calls)
    ollama.broken = set()
    now[0] = 1.0  # still inside the not-before backoff: no model probe and no claim yet
    assert worker.run_once()['status'] == 'waiting_gpu'
    assert not any(call[1].endswith('/claim') for call in transport.calls)
    now[0] = 61.0
    assert worker.run_once()['status'] != 'waiting_gpu'
    assert any(call[1].endswith('/claim') for call in transport.calls)


def test_checks_only_the_intake_models_once_each_with_a_tiny_generate():
    ollama = FakeOllama()  # Gate 3 models are NOT loaded early: that would pin a 20 GB model in the shared GPU
    worker, transport = worker_with(ollama, lambda: 0.0)
    assert worker.run_once()['status'] != 'model_unavailable'
    assert [call[0] for call in ollama.calls] == ['g1', 'clf']
    assert ollama.calls[0][1:] == ('ok', {'num_predict': 1})
    assert any(call[1].endswith('/claim') for call in transport.calls)


def test_success_is_cached_for_60s_and_failure_is_retried_every_poll():
    now = [0.0]
    ollama = FakeOllama()
    worker, _ = worker_with(ollama, lambda: now[0])
    worker.run_once()
    now[0] = 59.0
    worker.run_once()
    assert len(ollama.calls) == 2  # chỉ lượt đầu gọi model
    now[0] = 61.0
    worker.run_once()
    assert len(ollama.calls) == 4

    ollama.broken = {'g1'}
    now[0] = 200.0
    assert worker.run_once()['status'] == 'waiting_gpu'
    before = len(ollama.calls)
    assert worker.run_once()['status'] == 'waiting_gpu'  # backoff: no probe, no claim
    assert len(ollama.calls) == before
    now[0] = 260.0
    assert worker.run_once()['status'] == 'waiting_gpu'
    assert ollama.calls[-1][0] == 'g1'


def test_non_http_error_is_also_model_unavailable():
    class Down(FakeOllama):
        def generate(self, model, prompt, **options):
            raise TimeoutError('timed out')

    worker, _ = worker_with(Down(), lambda: 0.0)
    out = worker.run_once()
    assert out['status'] == 'waiting_gpu' and 'timed out' in out['error']


def test_classifier_without_calibrated_candidate_does_not_block_intake(monkeypatch):
    import main
    roles = []
    monkeypatch.setattr(main.Deps, 'call_model', lambda self, *a, role=None, **k: roles.append(role) or {})
    routing = type('Router', (), {'candidates': staticmethod(lambda role: [] if role == 'classifier' else [{}])})()
    ollama = type('Models', (), {'routing': routing, 'gate1_model': 'm'})()
    assert model_preflight(ollama)() is None
    assert roles == ['gate1']


def test_gpu_wait_reports_board_state_and_clears_it_after_a_successful_probe():
    now = [0.0]
    ollama = FakeOllama(broken={'g1'})
    worker, transport = worker_with(ollama, lambda: now[0])
    out = worker.run_once()
    assert out['status'] == 'waiting_gpu' and out['retry_in_s'] == 60.0
    report = [call for call in transport.calls if call[1].endswith('/gpu-state')]
    assert len(report) == 1 and report[0][2]['retry_at'] and report[0][2]['model'] == 'g1'
    assert not any(call[1].endswith('/claim') for call in transport.calls)

    ollama.broken = set()
    now[0] = 61.0
    worker.run_once()
    clears = [call for call in transport.calls if call[1].endswith('/gpu-state')]
    assert len(clears) == 2 and clears[-1][2]['retry_at'] is None


def test_gpu_wait_doubles_up_to_the_contract_ceiling():
    now = [0.0]
    ollama = FakeOllama(broken={'g1'})
    worker, _ = worker_with(ollama, lambda: now[0])
    waits = []
    for step in range(5):
        waits.append(worker.run_once()['retry_in_s'])
        now[0] += waits[-1]
    assert waits == [60.0, 120.0, 240.0, 300.0, 300.0]
