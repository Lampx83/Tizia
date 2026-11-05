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
    routing = type('Router', (), {'candidates': staticmethod(lambda role: [] if role == 'classifier' else [{}]), 'cooldowns': {}})()
    ollama = type('Models', (), {'routing': routing, 'gate1_model': 'm'})()
    assert model_preflight(ollama)() is None
    assert roles == ['gate1']


def test_probe_is_skipped_while_the_endpoint_cools_down(monkeypatch):
    import main
    calls = []
    monkeypatch.setattr(main.Deps, 'call_model', lambda self, *a, **k: calls.append(1) or {})
    routing = type('Router', (), {'candidates': staticmethod(lambda role, exclude=(): []), 'cooldowns': {}})()
    ollama = type('Models', (), {'routing': routing, 'gate1_model': 'm'})()
    verdict = model_preflight(ollama)()
    assert verdict['status'] == 'model_unavailable' and 'cooldown' in verdict['error']
    assert calls == []  # không đẩy thêm 1 request vào endpoint vừa lỗi


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


class RoutedOllama(FakeOllama):
    """Fake routed gateway: one gate1 candidate, router cooldown rules like ModelRouter.candidates."""

    def __init__(self, now):
        super().__init__()
        self.now, self.down, self.cooldowns = now, True, {}
        self.routing = self

    def clock(self):
        return self.now[0]

    def candidates(self, role, exclude=()):
        if role != 'gate1' or self.cooldowns.get('ollama', 0) > self.clock():
            return []
        return [{'provider': 'ollama', 'id': 'g1', 'model': 'g1'}]

    def failed(self, candidate):
        self.cooldowns[candidate['provider']] = self.clock() + 60


def routed_call(ollama, now):
    """Fake Deps.call_model: a down endpoint hangs 45 s then fails, arming the router cooldown like pipeline.py."""
    def call(self, model, prompt, *, role=None, **kwargs):
        ollama.calls.append((role, prompt))
        if not ollama.down:
            return {}
        now[0] += 45.0
        ollama.failed(ollama.candidates(role)[0])
        raise TimeoutError('timed out')
    return call


def test_failed_preflight_probe_does_not_arm_cooldown(monkeypatch):
    import main
    now = [0.0]
    ollama = RoutedOllama(now)
    monkeypatch.setattr(main.Deps, 'call_model', routed_call(ollama, now))
    verdict = model_preflight(ollama, clock=lambda: now[0])()
    assert verdict['status'] == 'model_unavailable' and 'timed out' in verdict['error']
    assert ollama.candidates('gate1') and ollama.cooldowns == {}


def test_real_call_failure_still_arms_cooldown():
    now = [0.0]
    ollama = RoutedOllama(now)
    ollama.failed(ollama.candidates('gate1')[0])
    assert ollama.candidates('gate1') == []
    now[0] = 61.0
    assert ollama.candidates('gate1')


def test_next_probe_after_backoff_actually_probes_and_clears_backoff(monkeypatch):
    import main
    now = [0.0]
    ollama = RoutedOllama(now)
    monkeypatch.setattr(main.Deps, 'call_model', routed_call(ollama, now))
    worker, transport = worker_with(ollama, lambda: now[0])
    assert worker.run_once()['retry_in_s'] == 60.0
    ollama.down = False
    now[0] = 60.0
    assert worker.run_once()['status'] != 'waiting_gpu'
    assert ollama.calls[-1][0] == 'gate1'
    assert any(call[1].endswith('/claim') for call in transport.calls)
    assert worker._gpu_backoff_s == 0.0


def test_gate1_probe_timeout_default_is_45s(monkeypatch):
    import worker
    from models import OllamaClient
    from settings import reset_settings
    monkeypatch.delenv('AI_BOARD_GATE1_PROBE_TIMEOUT_S', raising=False)
    monkeypatch.setattr(OllamaClient, 'from_env', lambda *a, **kw: OllamaClient())
    reset_settings()
    assert worker.gate1_probe_client().timeout_s == 45.0


def test_gate1_probe_timeout_comes_from_env(monkeypatch):
    import worker
    from models import OllamaClient
    from settings import reset_settings
    monkeypatch.setenv('AI_BOARD_GATE1_PROBE_TIMEOUT_S', '120')
    monkeypatch.setattr(OllamaClient, 'from_env', lambda *a, **kw: OllamaClient())
    reset_settings()
    assert worker.gate1_probe_client().timeout_s == 120.0


def test_gate1_probe_timeout_rejects_out_of_range(monkeypatch):
    import pytest
    from settings import get_settings, reset_settings
    reset_settings()
    for bad in ('0', '-1', '301', 'nan', 'abc'):
        with pytest.raises(ValueError):
            get_settings({'AI_BOARD_GATE1_PROBE_TIMEOUT_S': bad})
