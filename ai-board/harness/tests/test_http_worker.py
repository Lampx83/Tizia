import sys
import time
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker import HttpWorker, WorkerClient


class FakeTransport:
    def __init__(self):
        self.calls = []

    def __call__(self, method, path, payload, headers):
        self.calls.append((method, path, payload, headers))
        if path.endswith('/claim'):
            return {'ticket': {'id': 7, 'lease_token': 'lease-7'}}
        if path.endswith('/snapshot'):
            return {'request': {'id': 3, 'title': 'fixture'}, 'thread': []}
        if path.endswith('/runs'):
            return {'run': {'id': 11}}
        if path.endswith('/events'):
            return {'event': {'id': 12}}
        if path.endswith('/plan'):
            return {'status': 'planned', 'tier': 'surface', 'children': [{'id': 13}]}
        return {'ok': True}


def test_off_mode_makes_no_http_calls():
    transport = FakeTransport()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1')
    assert worker.run_once() == {'status': 'off'}
    assert transport.calls == []


def test_shadow_run_uses_only_the_worker_http_contract():
    transport = FakeTransport()
    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow',
    )
    out = worker.run_once()
    assert out == {'status': 'shadow_ok', 'ticket_id': 7, 'run_id': 11}
    assert [call[1].rsplit('/', 1)[-1] for call in transport.calls] == [
        'claim', 'snapshot', 'heartbeat', 'runs', 'events', 'release',
    ]
    assert all(call[3]['x-ai-worker-key'] == 'secret' for call in transport.calls)


def test_planner_result_is_submitted_through_guardrails_before_release():
    transport = FakeTransport()
    canonical_plan = {
        'domain': 'pharmacy', 'goal': 'fixture', 'allowed_scope': ['public/x.html'],
        'acceptance': ['200'], 'tests': ['smoke'], 'capabilities': ['public.ui'],
        'risk': 'low', 'non_goals': [], 'steps': [],
    }
    planner_calls = []

    def planner(snapshot):
        planner_calls.append(snapshot)
        return canonical_plan, 80

    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow', planner=planner,
    )
    out = worker.run_once()
    assert out == {'status': 'planned', 'ticket_id': 7, 'run_id': 11, 'tier': 'surface', 'children': 1}
    assert len(planner_calls) == 1
    assert [call[1].rsplit('/', 1)[-1] for call in transport.calls] == [
        'claim', 'snapshot', 'heartbeat', 'runs', 'events', 'plan', 'release',
    ]
    plan_call = transport.calls[-2][2]
    assert plan_call['plan'] == canonical_plan
    assert plan_call['budget_used'] == 80
    assert 'lease-7' in plan_call['idempotency_key']
    assert transport.calls[-1][2]['outcome'] == 'planned'


def test_planner_failure_records_block_and_releases_lease():
    transport = FakeTransport()

    def blocked_planner(_snapshot):
        raise RuntimeError('gate 2 blocked')

    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow', planner=blocked_planner,
    )

    try:
        worker.run_once()
    except RuntimeError as error:
        assert str(error) == 'gate 2 blocked'
    else:
        raise AssertionError('planner failure must propagate after releasing the lease')

    assert [call[1].rsplit('/', 1)[-1] for call in transport.calls] == [
        'claim', 'snapshot', 'heartbeat', 'runs', 'events', 'events', 'release',
    ]
    assert transport.calls[-2][2]['event_type'] == 'plan_blocked'
    assert transport.calls[-1][2]['outcome'] == 'waiting'


def test_long_planning_heartbeats_until_the_gates_finish():
    transport = FakeTransport()

    def slow_planner(_snapshot):
        time.sleep(0.2)
        return {'goal': 'fixture'}, 10

    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow', planner=slow_planner,
        heartbeat_interval=0.02,
    )
    worker.run_once()

    heartbeats = [call for call in transport.calls if call[1].endswith('/heartbeat')]
    assert len(heartbeats) >= 2
