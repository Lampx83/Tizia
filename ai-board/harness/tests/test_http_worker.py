import sys
import time
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker import HttpWorker, WorkerClient, execute_pre_pr


class FakeTransport:
    def __init__(self):
        self.calls = []

    def __call__(self, method, path, payload, headers):
        self.calls.append((method, path, payload, headers))
        if path.endswith('/claim'):
            return {'ticket': {'id': 7, 'lease_token': 'lease-7'}}
        if path.endswith('/snapshot'):
            return {'ticket': {'cumulative_budget': 20},
                    'request': {'id': 3, 'title': 'fixture'}, 'thread': []}
        if path.endswith('/runs'):
            return {'run': {'id': 11}}
        if path.endswith('/events'):
            return {'event': {'id': 12}}
        if path.endswith('/plan'):
            return {'status': 'planned', 'tier': 'surface', 'children': [{'id': 13}]}
        if path.endswith('/verdict'):
            return {'verdict': payload['verdict']}
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


def test_planned_change_runs_gates_3_to_5_5_and_posts_http_verdict(tmp_path):
    transport = FakeTransport()
    canonical_plan = {
        'domain': 'pharmacy', 'goal': 'fixture', 'allowed_scope': ['public/x.html'],
        'acceptance': ['200'], 'tests': ['smoke'], 'capabilities': ['public.ui'],
        'risk': 'low', 'non_goals': [],
        'steps': [{
            'order': 1, 'title': 'Thay đổi quan sát được', 'description': 'fixture',
            'allowed_scope': ['public/x.html'], 'acceptance': ['200'], 'tests': ['smoke'],
            'capability': 'public.ui', 'risk': 'low', 'non_goals': [],
        }],
    }
    states = []

    class Budget:
        @staticmethod
        def tick():
            return True

    def run_gate(gate, _request, _deps, _budget, state):
        states.append((gate, dict(state)))
        if gate == 3:
            state['diffs'] = [{'file': 'public/x.html', 'test_file': 'test/x.test.js', 'diff': 'fixture'}]
            state['scratch_repo'] = str(tmp_path / 'scratch')
            return {'gate': 3, 'blocked': False, 'reason': None}
        if gate == 4:
            return {'gate': 4, 'blocked': False, 'reason': None, 'issues': []}
        if gate == 5:
            assert state['checkout_source'] == str(tmp_path)
            state['full_checkout'] = str(tmp_path / 'checkout')
            return {'gate': 5, 'blocked': False, 'reason': None,
                    'evidence': {'smoke_passed': True, 'http_observed': True, 'text': 'private log'}}
        return {'gate': 5.5, 'blocked': False, 'reason': None,
                'risk_level': 'low', 'risk_signals': []}

    def change_runner(plan, ticket_id, _budget_used, cumulative_budget):
        assert cumulative_budget == 20
        return execute_pre_pr(
            plan, ticket_id=ticket_id, checkout_source=tmp_path,
            deps=object(), budget=Budget(), run_gate=run_gate,
        )

    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow',
        planner=lambda _snapshot: (canonical_plan, 80), change_runner=change_runner,
    )

    out = worker.run_once()

    assert out['pre_pr_verdict']['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in states] == [3, 4, 5, 5.5]
    assert states[2][1]['plan']['subtasks'][0] == {
        'title': 'Thay đổi quan sát được', 'file': 'public/x.html',
        'verify': 'smoke', 'size': 'small',
    }
    assert [call[1].rsplit('/', 1)[-1] for call in transport.calls] == [
        'claim', 'snapshot', 'heartbeat', 'runs', 'events', 'plan', 'verdict', 'release',
    ]
    posted = transport.calls[-2][2]['verdict']
    assert posted == {
        'outcome': 'ready_for_pr', 'gate_reached': 5.5, 'reason': None, 'budget_used': 0,
        'gates': [
            {'gate': 3, 'blocked': False, 'reason': None},
            {'gate': 4, 'blocked': False, 'reason': None, 'issues': []},
            {'gate': 5, 'blocked': False, 'reason': None,
             'smoke_passed': True, 'http_observed': True},
            {'gate': 5.5, 'blocked': False, 'reason': None,
             'risk_level': 'low', 'risk_signals': []},
        ],
    }


def test_execution_exception_becomes_an_observable_blocked_verdict(tmp_path):
    plan = {
        'capabilities': ['public.ui'],
        'steps': [{'title': 'x', 'allowed_scope': ['public/x.html'],
                   'tests': ['smoke'], 'risk': 'low'}],
    }

    class Budget:
        model_calls = 0

        @staticmethod
        def tick():
            return True

    verdict = execute_pre_pr(
        plan, ticket_id=7, checkout_source=tmp_path, deps=object(), budget=Budget(),
        run_gate=lambda gate, *_: (_ for _ in ()).throw(RuntimeError(f'gate {gate} exploded')),
    )

    assert verdict['outcome'] == 'blocked'
    assert verdict['gate_reached'] == 3
    assert 'gate 3 exploded' in verdict['reason']


def test_execution_without_http_observation_blocks_at_gate_5(tmp_path):
    plan = {
        'capabilities': ['public.ui'],
        'steps': [{'title': 'x', 'allowed_scope': ['public/x.js'],
                   'tests': ['smoke'], 'risk': 'low'}],
    }

    class Budget:
        model_calls = 0

        @staticmethod
        def tick():
            return True

    def run_gate(gate, *_):
        if gate == 5:
            return {'gate': 5, 'blocked': False, 'reason': None,
                    'evidence': {'smoke_passed': True, 'http_observed': False}}
        return {'gate': gate, 'blocked': False, 'reason': None,
                'issues': [] if gate == 4 else None}

    verdict = execute_pre_pr(
        plan, ticket_id=7, checkout_source=tmp_path, deps=object(), budget=Budget(),
        run_gate=run_gate,
    )

    assert verdict['outcome'] == 'blocked'
    assert verdict['gate_reached'] == 5
    assert verdict['reason'] == 'change has no HTTP-observable result'
