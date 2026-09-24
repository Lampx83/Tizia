import sys
import time
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker import HttpWorker, WorkerClient, _execution_plan, execute_pre_pr, main


POLICY = {'version': 'd0-v2', 'hash': 'c' * 64,
          'capabilities': {'public.ui': {'tier': 'surface', 'allow': ['public/'], 'deny': []}}}


class FakeTransport:
    def __init__(self):
        self.calls = []

    def __call__(self, method, path, payload, headers):
        self.calls.append((method, path, payload, headers))
        if path.endswith('/claim'):
            return {'ticket': {'id': 7, 'lease_token': 'lease-7'}}
        if path.endswith('/snapshot'):
            return {'ticket': {'cumulative_budget': 20}, 'capability_policy': POLICY,
                    'request': {'id': 3, 'title': 'fixture', 'detail': '[Trang: X] /x.html'}, 'thread': []}
        if path.endswith('/runs'):
            return {'run': {'id': 11}}
        if path.endswith('/events'):
            return {'event': {'id': 12}}
        if path.endswith('/plan'):
            return {'status': 'planned', 'tier': 'surface', 'children': [{'id': 13}],
                    'capability_policy_hash': POLICY['hash']}
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


def test_shadow_mode_refuses_change_execution_before_http():
    transport = FakeTransport()
    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='shadow',
        planner=lambda _snapshot: ({'goal': 'x'}, 0),
        change_runner=lambda *_: {'outcome': 'ready_for_pr'},
    )

    try:
        worker.run_once()
    except ValueError as error:
        assert 'shadow' in str(error)
    else:
        raise AssertionError('shadow mode must not execute implementation gates')
    assert transport.calls == []


def test_execute_flag_requires_active_mode():
    try:
        main(['--mode', 'shadow', '--execute', '--once'])
    except SystemExit as error:
        assert error.code == 2
    else:
        raise AssertionError('--execute must reject shadow mode')


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
                    'evidence': {'smoke_passed': True, 'http_observed': True, 'runner': 'docker',
                                 'text': 'private log'}}
        return {'gate': 5.5, 'blocked': False, 'reason': None,
                'risk_level': 'low', 'risk_signals': []}

    def change_runner(plan, ticket_id, _budget_used, cumulative_budget, budget_limit, *, policy,
                      accepted_policy_hash, request_detail):
        assert (cumulative_budget, budget_limit) == (20, 200)
        assert (policy, accepted_policy_hash) == (POLICY, POLICY['hash'])
        return execute_pre_pr(
            plan, ticket_id=ticket_id, checkout_source=tmp_path,
            policy=policy, accepted_policy_hash=accepted_policy_hash, request_detail=request_detail,
            deps=object(), budget=Budget(), run_gate=run_gate, cleanup=lambda *_, **__: None,
        )

    worker = HttpWorker(
        WorkerClient('http://fixture', 'secret', transport=transport),
        worker_id='w1', version='test', mode='active',
        planner=lambda _snapshot: (canonical_plan, 80), change_runner=change_runner,
    )

    out = worker.run_once()

    assert out['pre_pr_verdict']['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in states] == [3, 4, 5, 5.5]
    assert states[0][1]['catalog'] == POLICY['capabilities']
    assert states[0][1]['request_detail'] == '[Trang: X] /x.html'
    assert states[2][1]['plan']['subtasks'][0] == {
        'title': 'Thay đổi quan sát được', 'file': 'public/x.html',
        'verify': 'smoke', 'size': 'small', 'allowed_scope': ['public/x.html'],
    }
    assert [call[1].rsplit('/', 1)[-1] for call in transport.calls] == [
        'claim', 'snapshot', 'heartbeat', 'runs', 'events', 'plan', 'verdict', 'release',
    ]
    posted = transport.calls[-2][2]['verdict']
    assert posted == {
        'outcome': 'ready_for_pr', 'gate_reached': 5.5, 'reason': None, 'budget_used': 0,
        'failure_class': None, 'repairs': [], 'candidate': None,
        'gates': [
            {'gate': 3, 'blocked': False, 'reason': None},
            {'gate': 4, 'blocked': False, 'reason': None, 'issues': [], 'checks': []},
            {'gate': 5, 'blocked': False, 'reason': None,
             'smoke_passed': True, 'http_observed': True, 'runner': 'docker', 'retried': False},
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
        cleanup=lambda *_, **__: None,
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
        run_gate=run_gate, cleanup=lambda *_, **__: None,
    )

    assert verdict['outcome'] == 'blocked'
    assert verdict['gate_reached'] == 5
    assert verdict['reason'] == 'change has no HTTP-observable result'
    assert verdict['failure_class'] == 'plan'  # a repair cannot make an unobservable change observable
    assert verdict['repairs'] == []


class TickBudget:
    model_calls = 0

    def __init__(self, ticks=10**6):
        self.ticks = ticks

    def tick(self):
        self.ticks -= 1
        return self.ticks >= 0


ONE_STEP_PLAN = {
    'capabilities': ['public.ui'],
    'steps': [{'order': 1, 'title': 'x', 'allowed_scope': ['public/x.html'], 'tests': ['smoke'], 'risk': 'low'}],
}


def scripted_gates(script):
    """run_gate fake: script maps gate -> list of results consumed per call (last one repeats)."""
    calls = []

    def run_gate(gate, _request, _deps, _budget, state):
        calls.append((gate, state.get('repair_reason')))
        queue = script.get(gate) or [{}]
        result = queue.pop(0) if len(queue) > 1 else queue[0]
        base = {'gate': gate, 'blocked': False, 'reason': None}
        if gate == 4:
            base['issues'] = []
        if gate == 5:
            base['evidence'] = {'smoke_passed': True, 'http_observed': True}
            state.update(branch='ai-board/2026-09-24-ticket-7', base_sha='a' * 40,
                         commits=[{'sha': 'b' * 40, 'title': 'ai-board(ticket-7): 1/1 x',
                                   'files': ['public/x.html', 'test/x.test.js']}])
        if gate == 5.5:
            base.update(risk_level='low', risk_signals=[])
        return {**base, **result}

    return run_gate, calls


def run(script, budget=None, cleanups=None):
    run_gate, calls = scripted_gates(script)
    verdict = execute_pre_pr(
        ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(),
        budget=budget or TickBudget(), run_gate=run_gate,
        cleanup=lambda state, keep_branch: (cleanups if cleanups is not None else []).append(keep_branch),
    )
    return verdict, calls


def test_transient_docker_failure_gets_exactly_one_mechanical_retry():
    transient = {'blocked': True, 'reason': 'docker compose up exit 1', 'failure_class': 'transient'}
    verdict, calls = run({5: [transient, {}]})
    assert verdict['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in calls] == [3, 4, 5, 5, 5.5]
    assert verdict['gates'][2]['retried'] is True
    assert verdict['failure_class'] is None and verdict['repairs'] == []


def test_second_transient_failure_blocks_without_repair():
    transient = {'blocked': True, 'reason': 'docker daemon unreachable', 'failure_class': 'transient'}
    verdict, calls = run({5: [transient]})
    assert verdict['outcome'] == 'blocked'
    assert verdict['failure_class'] == 'transient'
    assert [gate for gate, _ in calls] == [3, 4, 5, 5]
    assert verdict['repairs'] == []


def test_ordinary_failure_gets_one_repair_pass_with_the_failure_reason():
    failed = {'blocked': True, 'reason': 'generated tests failed', 'failure_class': 'ordinary'}
    cleanups = []
    verdict, calls = run({5: [failed, {}]}, cleanups=cleanups)
    assert verdict['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in calls] == [3, 4, 5, 3, 4, 5, 5.5]
    assert calls[3] == (3, 'cổng 5: generated tests failed')
    assert verdict['repairs'] == [{'gate': 5, 'reason': 'generated tests failed'}]
    assert cleanups == [False, True]  # failed attempt's branch dropped, passing candidate kept
    assert verdict['candidate']['branch'] == 'ai-board/2026-09-24-ticket-7'
    assert verdict['candidate']['head_sha'] == 'b' * 40


def test_repair_is_bounded_to_one_child():
    failed = {'blocked': True, 'reason': 'node --check lỗi', 'failure_class': 'ordinary'}
    verdict, calls = run({4: [failed]})
    assert verdict['outcome'] == 'blocked'
    assert verdict['failure_class'] == 'ordinary'
    assert [gate for gate, _ in calls] == [3, 4, 3, 4]
    assert len(verdict['repairs']) == 1
    assert verdict['candidate'] is None


def test_critical_boundary_violation_stops_without_repair():
    critical = {'blocked': True, 'reason': "import cấm: '../../db.js'", 'failure_class': 'critical'}
    verdict, calls = run({4: [critical]})
    assert verdict['outcome'] == 'blocked'
    assert verdict['failure_class'] == 'critical'
    assert [gate for gate, _ in calls] == [3, 4]
    assert verdict['repairs'] == []


def test_exhausted_budget_blocks_before_any_gate():
    verdict, calls = run({}, budget=TickBudget(ticks=0))
    assert verdict['outcome'] == 'blocked'
    assert verdict['failure_class'] == 'budget'
    assert verdict['gate_reached'] == 3
    assert calls == []


def test_ordinary_failure_without_budget_for_repair_is_a_budget_failure():
    failed = {'blocked': True, 'reason': 'generated tests failed', 'failure_class': 'ordinary'}
    verdict, calls = run({5: [failed]}, budget=TickBudget(ticks=3))
    assert verdict['failure_class'] == 'budget'
    assert [gate for gate, _ in calls] == [3, 4, 5]


def test_unexpected_gate_exception_is_not_repaired():
    def run_gate(gate, *_):
        raise ConnectionError('ollama down')
    verdict = execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(),
                             budget=TickBudget(), run_gate=run_gate, cleanup=lambda *a, **k: None)
    assert verdict['failure_class'] == 'transient'
    assert verdict['repairs'] == []


def test_execution_plan_keeps_step_order_and_scope():
    plan = {'steps': [
        {'order': 2, 'title': 'b', 'allowed_scope': ['public/b.html'], 'tests': ['t'], 'risk': 'low'},
        {'order': 1, 'title': 'a', 'allowed_scope': ['public/a.html', 'public/a.json'], 'tests': ['t'], 'risk': 'medium'},
    ]}
    subtasks = _execution_plan(plan)['subtasks']
    assert [s['title'] for s in subtasks] == ['a', 'b']
    assert subtasks[0]['allowed_scope'] == ['public/a.html', 'public/a.json']


def test_worker_id_defaults_to_a_valid_per_machine_name(monkeypatch):
    import worker
    monkeypatch.setattr(worker.socket, "gethostname", lambda: "DESKTOP ADMIN/Ổ#1")
    assert worker.default_worker_id() == "desktop-admin-1-worker"
    monkeypatch.setattr(worker.socket, "gethostname", lambda: "")
    assert worker.default_worker_id() == "local-worker"


def test_complexity_gated_plan_records_reason_signals_and_truncated_plan():
    import json
    from worker import HarnessPlanner
    from budget import Budget

    big_plan = {'summary_vi': 'x' * 5000, 'capabilities': ['features', 'quiz'],
                'subtasks': [{'title': 'a', 'file': 'server/index.js', 'verify': 'v', 'size': 'small'}]}

    def run_gate(gate, _request, _deps, _budget, state):
        if gate == 1:
            state['plan'] = big_plan
        if gate == 2.5:
            return {'gate': 2.5, 'blocked': True, 'reason': 'complexity_gated', 'outcome': 'complexity_gated',
                    'signals': ['capabilities: features, quiz', 'file ngoài vùng an toàn: server/index.js']}
        return {'gate': gate, 'blocked': False, 'reason': None}

    planner = HarnessPlanner.__new__(HarnessPlanner)
    planner.Budget, planner.deps, planner.run_gate = Budget, object(), run_gate
    transport = FakeTransport()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport),
                        worker_id='w1', version='test', mode='shadow', planner=planner)
    try:
        worker.run_once()
    except RuntimeError as error:
        assert 'complexity_gated' in str(error)
    else:
        raise AssertionError('blocked plan must propagate')

    event = transport.calls[-2][2]
    assert event['event_type'] == 'plan_blocked'
    detail = json.loads(event['internal_detail'])
    assert detail['gate'] == 2.5 and detail['reason'] == 'complexity_gated'
    assert detail['signals'] == ['capabilities: features, quiz', 'file ngoài vùng an toàn: server/index.js']
    assert detail['plan'].startswith('{"summary_vi": "xxx') and len(detail['plan']) <= 2000


def test_catalog_changed_since_plan_acceptance_is_a_plan_failure_before_any_gate():
    for policy in ({**POLICY, 'hash': 'd' * 64}, {}):
        run_gate, calls = scripted_gates({})
        verdict = execute_pre_pr(
            ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(), budget=TickBudget(),
            run_gate=run_gate, cleanup=lambda *_, **__: None,
            policy=policy, accepted_policy_hash=POLICY['hash'],
        )
        assert calls == []
        assert verdict['outcome'] == 'blocked'
        assert verdict['failure_class'] == 'plan'
        assert verdict['gate_reached'] == 3 and 'catalog' in verdict['reason']
        assert verdict['gates'] == [{'gate': 3, 'blocked': True, 'reason': verdict['reason']}]
