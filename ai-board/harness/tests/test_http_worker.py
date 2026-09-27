import sys
import threading
import time
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker import HarnessPlanner, HttpWorker, PlanBlockedError, WorkerClient, _execution_plan, execute_pre_pr, main


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


class FakeCandidates:
    def __init__(self, fail=False):
        self.discarded, self.fail = [], fail

    def discard(self, candidate):
        self.discarded.append(candidate)

    def rollback(self, candidate, ticket_id, pull_request=None):
        if self.fail:
            raise OSError('git revert: conflict')
        return {'outcome': 'discarded', 'detail': f'deleted {candidate["branch"]} of {ticket_id}'}


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


def test_heartbeat_loss_after_operation_discards_returned_candidate():
    from worker import LeaseLostError

    heartbeat_failed = threading.Event()
    discarded = []

    def transport(_method, _path, _payload, _headers):
        heartbeat_failed.set()
        raise RuntimeError('lease cancelled')

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', timeout=1, transport=transport),
                        worker_id='w1', heartbeat_interval=0.01)
    result = {'candidate': {'branch': 'ai-board/example'}}
    try:
        worker._with_heartbeat(lambda _lost: (heartbeat_failed.wait(2), result)[1], 7, {},
                               on_lease_lost=discarded.append)
    except LeaseLostError:
        pass
    else:
        raise AssertionError('heartbeat loss must reject the result')
    assert discarded == [result]


def test_rejected_verdict_discards_candidate_before_propagating():
    import io
    from urllib.error import HTTPError

    class RejectVerdict(FakeTransport):
        def __call__(self, method, path, payload, headers):
            if path.endswith('/verdict'):
                raise HTTPError(path, 409, 'stale lease', {}, io.BytesIO(b'{"error":"stale_lease"}'))
            return super().__call__(method, path, payload, headers)

    candidates = FakeCandidates()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=RejectVerdict()),
                        worker_id='w1', mode='active', planner=lambda _snapshot: ({'goal': 'x'}, 0),
                        change_runner=lambda *_a, **_k: {'candidate': {'branch': 'ai-board/example'}},
                        candidates=candidates)
    try:
        worker.run_once()
    except HTTPError as error:
        assert error.code == 409
    else:
        raise AssertionError('a rejected verdict must propagate')
    assert candidates.discarded == [{'branch': 'ai-board/example'}]


def test_ambiguous_verdict_response_keeps_candidate():
    class LostResponse(FakeTransport):
        def __call__(self, method, path, payload, headers):
            if path.endswith('/verdict'):
                raise TimeoutError('response lost')
            return super().__call__(method, path, payload, headers)

    candidates = FakeCandidates()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=LostResponse()),
                        worker_id='w1', mode='active', planner=lambda _snapshot: ({'goal': 'x'}, 0),
                        change_runner=lambda *_a, **_k: {'candidate': {'branch': 'ai-board/example'}},
                        candidates=candidates)
    try:
        worker.run_once()
    except TimeoutError:
        pass
    else:
        raise AssertionError('a lost verdict response must propagate')
    assert candidates.discarded == []


def test_candidates_discard_removes_candidate_branch(tmp_path):
    import subprocess
    from candidate import Candidates

    repo = tmp_path / 'source'
    repo.mkdir()
    quiet = {'check': True, 'capture_output': True, 'stdin': subprocess.DEVNULL}
    subprocess.run(['git', 'init', '-q', str(repo)], **quiet)
    subprocess.run(['git', '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid',
                    'commit', '-q', '--allow-empty', '-m', 'base'], cwd=repo, **quiet)
    subprocess.run(['git', 'branch', 'ai-board/candidate'], cwd=repo, **quiet)
    Candidates(repo).discard({'branch': 'ai-board/candidate'})
    Candidates(repo).discard({'branch': 'ai-board/candidate'})  # already gone is done, not an error
    Candidates(repo).discard(None)

    remaining = subprocess.run(['git', 'branch', '--list', 'ai-board/candidate'], cwd=repo,
                               check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL)
    assert remaining.stdout == ''


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

    def change_runner(plan, ticket_id, max_units, *, policy, accepted_policy_hash, request_detail, should_stop):
        assert should_stop() is False  # lease healthy while the heartbeat succeeds
        assert max_units == 200 - 80  # per-run limit minus what planning spent
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
        candidates=FakeCandidates(),
    )

    out = worker.run_once()

    assert out['pre_pr_verdict']['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in states] == [3, 4, 5, 5.5]
    assert states[0][1]['catalog'] == POLICY['capabilities']
    assert states[0][1]['request_detail'] == '[Trang: X] /x.html'
    assert states[2][1]['plan']['subtasks'][0] == {
        **canonical_plan['steps'][0], 'file': 'public/x.html', 'verify': 'smoke; 200', 'size': 'small',
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
    retries = 0

    def __init__(self, ticks=10**6, max_retries=3):
        self.ticks = ticks
        self.max_retries = max_retries

    def tick(self):
        self.ticks -= 1
        return self.ticks >= 0

    def spend(self, cap, n=1):
        setattr(self, cap, getattr(self, cap) + n)


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


def test_verdict_carries_the_last_attempts_gate_5_screenshots_and_drops_older_ones(tmp_path):
    ordinary = {'blocked': True, 'reason': 'risk', 'failure_class': 'ordinary'}
    inner, _calls = scripted_gates({5.5: [ordinary, {}]})
    made = []

    def run_gate(gate, request, deps, budget, state):
        result = inner(gate, request, deps, budget, state)
        if gate == 5:
            path = tmp_path / f'shots-{len(made)}' / 'after.png'  # mỗi lượt cổng 5 một thư mục tạm, như verify
            path.parent.mkdir()
            path.write_bytes(b'png')
            made.append(path)
            state['evidence'] = {'screenshots': [{'phase': 'after', 'page': '/x.html', 'width': 1280, 'path': str(path)}]}
        return result

    verdict = execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(),
                             budget=TickBudget(), run_gate=run_gate, cleanup=lambda *_, **__: None)
    assert verdict['outcome'] == 'ready_for_pr' and len(made) == 2
    assert verdict['screenshots'] == [{'phase': 'after', 'page': '/x.html', 'width': 1280, 'path': str(made[1])}]
    assert not made[0].parent.exists() and made[1].exists()


def test_transient_docker_failure_gets_exactly_one_mechanical_retry():
    transient = {'blocked': True, 'reason': 'docker compose up exit 1', 'failure_class': 'transient'}
    verdict, calls = run({5: [transient, {}]})
    assert verdict['outcome'] == 'ready_for_pr'
    assert [gate for gate, _ in calls] == [3, 4, 5, 5, 5.5]
    assert verdict['gates'][2]['retried'] is True
    assert verdict['failure_class'] is None and verdict['repairs'] == []


def test_mechanical_retry_spends_the_retry_cap_not_the_gpu_budget():
    transient = {'blocked': True, 'reason': 'docker compose up exit 1', 'failure_class': 'transient'}
    budget = TickBudget()
    run_gate, _calls = scripted_gates({5: [transient, {}]})
    verdict = execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(),
                             budget=budget, run_gate=run_gate, cleanup=lambda *_, **__: None)
    assert verdict['outcome'] == 'ready_for_pr'
    assert budget.retries == 1
    assert verdict['budget_used'] == 0


def test_retries_run_up_to_the_cap_and_none_once_it_is_reached():
    transient = {'blocked': True, 'reason': 'docker daemon unreachable', 'failure_class': 'transient'}
    budget = TickBudget(max_retries=1)
    verdict, _calls = run({5: [transient, {}]}, budget=budget)
    assert verdict['outcome'] == 'ready_for_pr' and budget.retries == 1

    budget = TickBudget(max_retries=0)
    verdict, calls = run({5: [transient, {}]}, budget=budget)
    assert verdict['outcome'] == 'blocked'
    assert verdict['failure_class'] == 'transient'
    assert [gate for gate, _ in calls] == [3, 4, 5]
    assert budget.retries == 0


def test_reaching_the_retry_cap_does_not_exhaust_the_run_budget():
    from budget import Budget
    budget = Budget(max_retries=1, max_wall_clock_s=999)
    budget.spend("retries")
    assert budget.tick() is True


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
    assert json.loads(transport.calls[-1][2]['internal_detail']) == detail  # root's internal_reason too
    assert detail['plan'].startswith('{"summary_vi": "xxx') and len(detail['plan']) <= 2000


def test_revoked_lease_stops_before_the_next_gate_and_keeps_nothing():
    from worker import LeaseLostError
    run_gate, calls = scripted_gates({})
    cleanups = []
    try:
        execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(), budget=TickBudget(),
                       run_gate=run_gate, cleanup=lambda state, keep_branch: cleanups.append(keep_branch),
                       should_stop=lambda: len(calls) >= 2)
    except LeaseLostError as error:
        assert 'gate 5' in str(error)
    else:
        raise AssertionError('a revoked lease must stop the run')
    assert [gate for gate, _ in calls] == [3, 4]
    assert cleanups == [False]


def test_revoked_lease_during_final_gate_drops_candidate():
    from worker import LeaseLostError

    run_gate, calls = scripted_gates({})
    cleanups = []
    try:
        execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(), budget=TickBudget(),
                       run_gate=run_gate, cleanup=lambda state, keep_branch: cleanups.append(keep_branch),
                       should_stop=lambda: len(calls) == 4)
    except LeaseLostError:
        pass
    else:
        raise AssertionError('a lease revoked during gate 5.5 must stop the run')
    assert [gate for gate, _ in calls] == [3, 4, 5, 5.5]
    assert cleanups == [False]


def test_revoked_lease_during_cleanup_drops_kept_candidate():
    from worker import LeaseLostError

    run_gate, _calls = scripted_gates({})
    cleanups = []
    def cleanup(state, keep_branch):
        cleanups.append(keep_branch)

    try:
        execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(), budget=TickBudget(),
                       run_gate=run_gate, cleanup=cleanup,
                       should_stop=lambda: bool(cleanups))
    except LeaseLostError:
        pass
    else:
        raise AssertionError('a lease revoked while cleaning up must drop the candidate')
    assert cleanups == [True, False]


def test_verdicts_leave_lessons_that_later_runs_can_recall(tmp_path):
    import memory
    lessons = tmp_path / "lessons.jsonl"
    failed = {'blocked': True, 'reason': 'generated tests failed', 'failure_class': 'ordinary'}
    seen = []

    def run_gate(gate, request, deps, budget, state):
        seen.append(state.get('memory_path'))
        return scripted(gate, request, deps, budget, state)

    scripted, _calls = scripted_gates({5: [failed, {}]})
    execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source='unused', deps=object(), budget=TickBudget(),
                   run_gate=run_gate, cleanup=lambda *_, **__: None, memory_path=lessons)
    assert set(seen) == {str(lessons)}
    assert memory.recall(lessons, 'public/x.html', []) == [
        '- [cổng 5] public/x.html: generated tests failed (đã sửa được)']

    critical = {'blocked': True, 'reason': "import cấm: '../../db.js'", 'failure_class': 'critical'}
    transient = {'blocked': True, 'reason': 'docker daemon unreachable', 'failure_class': 'transient'}
    for script in ({4: [critical]}, {5: [transient]}):
        scripted, _calls = scripted_gates(script)
        execute_pre_pr(ONE_STEP_PLAN, ticket_id=8, checkout_source='unused', deps=object(),
                       budget=TickBudget(max_retries=0), run_gate=scripted, cleanup=lambda *_, **__: None,
                       memory_path=lessons)
    got = memory.recall(lessons, 'public/x.html', [], limit=10)
    assert any("import cấm" in line and "vẫn bị chặn" in line for line in got)
    assert not any("docker daemon" in line for line in got)  # environment trouble teaches nothing


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


def test_model_call_traces_are_posted_under_the_lease_and_run():
    import meter

    transport = FakeTransport()
    tracer = meter.Tracer(None)

    def planner(_snapshot):
        tracer.record(gate=1, model='qwen3:8b', prompt='p', prompt_name=None, prompt_hash=None, static_prefix='',
                      output='{}', metrics={'gpu_ms': 2100}, budget_units=3, result='ok')
        return {'goal': 'x'}, 3

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                        mode='shadow', planner=planner, tracer=tracer)
    worker.run_once()
    (trace_post,) = [call for call in transport.calls if call[1].endswith('/traces')]
    assert trace_post[1] == '/api/ai-board/worker/tickets/7/traces'
    assert trace_post[2]['run_id'] == 11 and trace_post[2]['lease_token'] == 'lease-7'
    assert trace_post[2]['calls'][0]['call_id'] == 'run11:g1:cNone:a0:i0:s1'


def test_worker_pauses_claims_over_the_hourly_gpu_cap():
    import meter

    transport = FakeTransport()
    tracer = meter.Tracer(None)
    tracer._gpu.append((time.monotonic(), float(meter.HOURLY_GPU_S)))
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                        mode='shadow', tracer=tracer)
    assert worker.run_once()['status'] == 'gpu_paused'
    assert transport.calls == []


def test_trace_posts_are_split_under_the_server_body_limit():
    import json
    import meter

    tracer = meter.Tracer(None)
    batches = []
    tracer.begin(1, batches.append)
    big = 'đ' * 8000
    for _ in range(3):
        tracer.record(gate=3, model='m', prompt=big, prompt_name=None, prompt_hash=None, static_prefix='',
                      output=big, metrics={}, budget_units=1, result='ok')
    tracer.flush()
    assert len(batches) == 3
    assert all(len(json.dumps(b, ensure_ascii=False).encode()) < 64 * 1024 for b in batches)


def test_pending_traces_are_sent_before_the_lease_is_released():
    import meter

    transport = FakeTransport()
    tracer = meter.Tracer(None)

    def planner(_snapshot):
        tracer.record(gate=2.5, model='qwen3:8b', prompt='p', prompt_name=None, prompt_hash=None,
                      static_prefix='', output='{}', metrics={}, budget_units=1, result='ok')
        return {'goal': 'x'}, 1

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                        mode='shadow', planner=planner, tracer=tracer)
    worker.run_once()
    paths = [call[1].rsplit('/', 1)[-1] for call in transport.calls]
    assert paths.index('traces') < paths.index('release')


def test_authorized_plan_is_executed_without_replanning():
    class Executing(FakeTransport):
        def __call__(self, method, path, payload, headers):
            self.calls.append((method, path, payload, headers))
            if path.endswith('/snapshot'):
                return {'ticket': {'phase': 'executing', 'cumulative_budget': 30, 'budget_limit': 200},
                        'capability_policy': POLICY, 'request': {'id': 3, 'detail': 'x'}, 'thread': []}
            if path.endswith('/resume-plan'):
                return {'status': 'planned', 'tier': 'protected', 'plan': {'goal': 'approved'},
                        'capability_policy_hash': POLICY['hash'], 'children': [{'id': 13}]}
            self.calls.pop()
            return super().__call__(method, path, payload, headers)

    seen = {}

    def planner(_snapshot):
        raise AssertionError('an authorized plan must not be planned again')

    def change_runner(plan, ticket_id, max_units, **kwargs):
        seen.update(plan=plan, max_units=max_units, policy_hash=kwargs['accepted_policy_hash'])
        return {'outcome': 'blocked', 'candidate': None}

    transport = Executing()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                        mode='active', planner=planner, change_runner=change_runner,
                        candidates=FakeCandidates())
    out = worker.run_once()
    paths = [call[1].rsplit('/', 1)[-1] for call in transport.calls]
    assert 'resume-plan' in paths and 'plan' not in paths and 'verdict' in paths
    runs = [call[2] for call in transport.calls if call[1].endswith('/runs')]
    assert runs[0]['trigger'] == 'execute'
    assert seen == {'plan': {'goal': 'approved'}, 'max_units': 200, 'policy_hash': POLICY['hash']}
    assert out['status'] == 'planned' and out['tier'] == 'protected'


def test_gate_start_is_reported_as_an_idempotent_event():
    import meter

    import main as harness_main

    transport = FakeTransport()
    tracer = meter.Tracer(None)
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                        mode='shadow', tracer=tracer)
    deps = harness_main.Deps(models=None, notify=None, progress=worker.gate_started)

    def planner(_snapshot):
        harness_main.run_gate(2, {}, deps, None, {})  # run_gate reports through deps.progress
        return {'goal': 'x'}, 0

    worker.planner = planner
    worker.run_once()
    (event,) = [c[2] for c in transport.calls if c[1].endswith('/events') and c[2]['event_type'] == 'gate_started']
    assert event['run_id'] == 11 and (event['gate'], event['attempt']) == (2, 0)
    assert event['internal_detail'] == '{"gate": 2, "attempt": 0}'
    assert event['idempotency_key'].endswith(':gate:0:2')
    sent = len(transport.calls)
    worker.gate_started(3)  # outside a run: no-op
    assert len(transport.calls) == sent


def test_rollback_lease_runs_the_rollback_and_reports_failures():
    candidate = {'branch': 'ai-board/2026-09-25-ticket-7-abc123', 'base_sha': 'a' * 40, 'head_sha': 'b' * 40}

    class RollingBack(FakeTransport):
        def __call__(self, method, path, payload, headers):
            if path.endswith('/snapshot'):
                self.calls.append((method, path, payload, headers))
                return {'ticket': {'phase': 'rolling_back'}, 'rollback_candidate': candidate}
            if path.endswith('/rollback'):
                self.calls.append((method, path, payload, headers))
                return {'status': 'cancelled', 'phase': 'rolled_back'}
            return super().__call__(method, path, payload, headers)

    def planner(_snapshot):
        raise AssertionError('a rollback must not plan')

    def change_runner(*_args, **_kwargs):
        raise AssertionError('a rollback must not run the gates')

    for fail, outcome in ((False, 'discarded'), (True, 'failed')):
        transport = RollingBack()
        out = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                         mode='active', planner=planner, change_runner=change_runner,
                         candidates=FakeCandidates(fail)).run_once()
        runs = [c[2] for c in transport.calls if c[1].endswith('/runs')]
        (sent,) = [c[2] for c in transport.calls if c[1].endswith('/rollback')]
        assert runs[0]['trigger'] == 'rollback' and sent['run_id'] == 11 and sent['outcome'] == outcome
        assert out['rollback'] == outcome
    assert 'conflict' in sent['detail']


def test_candidates_rollback_deletes_unmerged_and_reverts_merged(tmp_path, monkeypatch):
    import subprocess
    from candidate import Candidates

    monkeypatch.setenv('PR_BASE_BRANCH', 'dev')
    repo = tmp_path / 'source'
    repo.mkdir()

    def git(*args):
        return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=repo,
                              check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()

    git('init', '-q', '-b', 'dev')
    git('commit', '-q', '--allow-empty', '-m', 'base')
    base = git('rev-parse', 'HEAD')

    def make_candidate(name):
        branch = f'ai-board/2026-09-25-{name}'
        git('checkout', '-q', '-b', branch, base)
        (repo / f'{name}.txt').write_text('x', encoding='utf-8')
        git('add', f'{name}.txt')
        git('commit', '-q', '-m', name)
        head = git('rev-parse', 'HEAD')
        git('checkout', '-q', 'dev')
        return {'branch': branch, 'base_sha': base, 'head_sha': head}

    runner = Candidates(repo)

    unmerged = make_candidate('ticket-1-aaa111')
    assert runner.rollback(unmerged, 1)['outcome'] == 'discarded'
    assert git('branch', '--list', unmerged['branch']) == ''

    merged = make_candidate('ticket-2-bbb222')
    git('merge', '-q', '--no-ff', '-m', 'merge', merged['branch'])
    out = runner.rollback(merged, 2)
    assert out['outcome'] == 'revert_ready'
    revert = out['revert']
    assert revert['branch'].startswith('ai-board/') and '-ticket-2-revert-' in revert['branch']
    assert revert['base_sha'] == git('rev-parse', 'dev') and revert['head_sha'] == git('rev-parse', revert['branch'])
    assert revert['commits'][0]['files'] == ['ticket-2-bbb222.txt']
    assert git('ls-tree', '--name-only', revert['branch']) == ''  # file removed on the revert branch
    assert (repo / 'ticket-2-bbb222.txt').exists()  # dev itself untouched
    assert git('worktree', 'list').count('\n') == 0  # temporary worktree removed

    busy = make_candidate('ticket-3-ccc333')
    git('worktree', 'add', '-q', str(tmp_path / 'preview'), busy['branch'])  # e.g. an admin preview checkout
    import pytest
    with pytest.raises(OSError, match='branch -D'):
        runner.rollback(busy, 3)
    assert git('branch', '--list', busy['branch']) != ''


def test_claim_trigger_wins_over_the_phase_mapping():
    candidate = {'branch': 'ai-board/2026-09-25-ticket-7-abc123', 'base_sha': 'a' * 40, 'head_sha': 'b' * 40}

    class Triggered(FakeTransport):
        def __call__(self, method, path, payload, headers):
            if path.endswith('/claim'):
                self.calls.append((method, path, payload, headers))
                return {'ticket': {'id': 7, 'lease_token': 'lease-7', 'trigger': 'rollback'}}
            if path.endswith('/snapshot'):
                self.calls.append((method, path, payload, headers))
                return {'ticket': {'phase': 'planned'}, 'rollback_candidate': candidate}
            if path.endswith('/rollback'):
                self.calls.append((method, path, payload, headers))
                return {'status': 'cancelled'}
            return super().__call__(method, path, payload, headers)

    transport = Triggered()
    out = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1',
                     mode='active', planner=lambda _s: (_ for _ in ()).throw(AssertionError('no plan')),
                     change_runner=lambda *_a, **_k: None, candidates=FakeCandidates()).run_once()
    runs = [c[2] for c in transport.calls if c[1].endswith('/runs')]
    assert runs[0]['trigger'] == 'rollback' and out['rollback'] == 'discarded'


def test_approved_multi_scope_multi_test_step_reaches_gate_3_intact():
    step = {'order': 1, 'title': 'Trang + dữ liệu', 'description': 'd',
            'allowed_scope': ['public/a.html', 'public/a.json'], 'tests': ['node --test test/a.test.js', 'smoke /a'],
            'acceptance': ['trang /a trả 200', 'smoke /a'], 'capability': 'public.ui', 'risk': 'medium',
            'non_goals': ['x']}
    seen = {}

    def run_gate(gate, _request, _deps, _budget, state):
        seen.setdefault(gate, state['plan']['subtasks'][0])
        return {'gate': gate, 'blocked': True, 'reason': 'stop', 'failure_class': 'critical'}

    execute_pre_pr({'capabilities': ['public.ui'], 'steps': [step]}, ticket_id=7, checkout_source='unused',
                   deps=object(), budget=TickBudget(), run_gate=run_gate, cleanup=lambda *_, **__: None)
    subtask = seen[3]
    assert {k: subtask[k] for k in step} == step  # every approved field survives
    assert subtask['file'] == 'public/a.html' and subtask['size'] == 'large'
    assert subtask['verify'] == 'node --test test/a.test.js; smoke /a; trang /a trả 200'


def test_server_url_prefers_ai_board_server_url_then_same_machine_port():
    from worker import server_url

    assert server_url({'AI_BOARD_SERVER_URL': 'http://tizia:8041/'}) == 'http://tizia:8041'
    assert server_url({'PORT': '9000'}) == 'http://127.0.0.1:9000'
    assert server_url({}) == 'http://127.0.0.1:8041'


def test_claimed_ticket_syncs_the_clone_before_the_snapshot():
    order = []

    class Recording(FakeTransport):
        def __call__(self, method, path, payload, headers):
            order.append(path.rsplit('/', 1)[-1])
            return super().__call__(method, path, payload, headers)

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=Recording()),
                        worker_id='w1', version='test', mode='shadow', sync=lambda: order.append('sync'))
    worker.run_once()
    assert order[:3] == ['claim', 'sync', 'snapshot']


def test_idle_claim_does_not_touch_the_clone():
    synced = []

    class Idle(FakeTransport):
        def __call__(self, method, path, payload, headers):
            return {'ticket': None} if path.endswith('/claim') else super().__call__(method, path, payload, headers)

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=Idle()),
                        worker_id='w1', version='test', mode='shadow', sync=lambda: synced.append(1))
    assert worker.run_once() == {'status': 'idle'}
    assert synced == []


def test_sync_moves_the_dedicated_clone_to_the_latest_origin_base(tmp_path):
    import subprocess
    import candidate

    def git(cwd, *args):
        return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=cwd,
                              check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()

    upstream = tmp_path / 'upstream'
    upstream.mkdir()
    git(upstream, 'init', '-q', '-b', 'dev')
    git(upstream, 'commit', '-q', '--allow-empty', '-m', 'base')
    clone = tmp_path / 'clone'
    git(tmp_path, 'clone', '-q', str(upstream), str(clone))
    git(clone, 'branch', 'ai-board/2026-09-26-ticket-1-abc123')  # a kept candidate
    (upstream / 'new.txt').write_text('new', encoding='utf-8')
    git(upstream, 'add', 'new.txt')
    git(upstream, 'commit', '-q', '-m', 'newer dev')
    (clone / 'stray.txt').write_text('left by a crashed job', encoding='utf-8')

    sha = candidate.sync(clone, 'dev')

    assert sha == git(upstream, 'rev-parse', 'HEAD') == git(clone, 'rev-parse', 'HEAD')
    assert (clone / 'new.txt').exists() and not (clone / 'stray.txt').exists()
    assert git(clone, 'branch', '--list', 'ai-board/*') != ''  # candidates survive the sync


def test_gate_1_reads_context_from_the_checkout_source(monkeypatch, fake_deps, tmp_path):
    import main

    seen = {}
    monkeypatch.setattr(main.intake_guard, 'run', lambda *_a, **_k: {'verdict': 'allow', 'labels': ['ok']})
    monkeypatch.setattr(main.brainstorm, 'run',
                        lambda request, deps, budget, **kw: seen.update(kw) or {'gate': 1, 'blocked': False})
    main.run_gate(1, {'subject': 's', 'body': 'b'}, fake_deps, None, {'checkout_source': str(tmp_path)})
    assert seen['source'] == str(tmp_path)


PASSING = {
    'outcome': 'ready_for_pr', 'gate_reached': 5.5, 'reason': None, 'failure_class': None, 'repairs': [],
    'budget_used': 10,
    'candidate': {'branch': 'ai-board/2026-09-26-ticket-7-abc123', 'base_sha': 'a' * 40, 'head_sha': 'b' * 40,
                  'commits': [{'sha': 'b' * 40, 'title': 'ai-board(ticket-7): 1/1 Sửa', 'files': ['public/x.html']}]},
    'gates': [{'gate': 3, 'blocked': False, 'reason': None}, {'gate': 4, 'blocked': False, 'reason': None},
              {'gate': 5, 'blocked': False, 'reason': None, 'smoke_passed': True, 'http_observed': True,
               'runner': 'docker'},
              {'gate': 5.5, 'blocked': False, 'reason': None, 'risk_level': 'medium', 'risk_signals': []}],
}
PLAN = {'goal': 'Sửa trang x', 'tests': ['node --test test/x.test.js'], 'steps': [
    {'order': 1, 'title': 'Sửa', 'allowed_scope': ['public/x.html'], 'tests': ['node --test test/x.test.js']}]}


class PublishingCandidates(FakeCandidates):
    def __init__(self, fail=None):
        super().__init__()
        self.published, self.publish_fail = [], fail

    def publish(self, candidate, *, title, body, labels=()):
        if self.publish_fail:
            raise self.publish_fail
        self.published.append((candidate, title, body, list(labels)))
        return {'number': 42, 'url': 'https://github.com/Lampx83/Tizia/pull/42', 'branch': candidate['branch'],
                'base': 'dev', 'base_sha': candidate['base_sha'], 'head_sha': candidate['head_sha']}


def _publishing_worker(transport, candidates, verdict=PASSING):
    return HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1', mode='active',
                      planner=lambda _snapshot: (PLAN, 0), change_runner=lambda *_a, **_k: dict(verdict),
                      candidates=candidates, open_prs=True)


def test_passing_verdict_opens_one_pr_and_reports_it_before_release():
    transport, candidates = FakeTransport(), PublishingCandidates()
    _publishing_worker(transport, candidates).run_once()
    tail = [call[1].rsplit('/', 1)[-1] for call in transport.calls][-3:]
    assert tail == ['verdict', 'pull-request', 'release']
    sent = transport.calls[-2][2]
    assert sent['pull_request']['number'] == 42 and sent['run_id'] == 11 and 'lease-7' in sent['idempotency_key']
    (candidate, title, body, labels), = candidates.published
    assert candidate['head_sha'] == 'b' * 40 and title.startswith('AI Board #3')
    for part in ('a' * 40, 'b' * 40, 'medium', 'node --test test/x.test.js', 'Không tự merge'):
        assert part in body
    assert labels == ['ai-board', 'ai-board:tier-surface', 'ai-board:daily-batch']


def test_blocked_verdict_or_existing_pr_opens_nothing():
    blocked = {**PASSING, 'outcome': 'blocked', 'candidate': None, 'failure_class': 'ordinary'}
    candidates = PublishingCandidates()
    _publishing_worker(FakeTransport(), candidates, blocked).run_once()

    class HasPr(FakeTransport):
        def __call__(self, method, path, payload, headers):
            out = super().__call__(method, path, payload, headers)
            if path.endswith('/snapshot'):
                out['pull_request'] = {'number': 41}
            return out

    transport = HasPr()
    _publishing_worker(transport, candidates).run_once()
    assert candidates.published == []
    assert not any(call[1].endswith('/pull-request') for call in transport.calls)
    assert '#41' in transport.calls[-1][2]['internal_detail']


def _shots(tmp_path, sizes):
    out = []
    for index, size in enumerate(sizes):
        path = tmp_path / f'shot-{index}.png'
        path.write_bytes(b'\x89PNG\r\n\x1a\n' + b'x' * size)
        out.append({'phase': 'after' if index < 2 else 'before', 'page': '/x.html', 'width': (375, 1280)[index % 2],
                    'path': str(path)})
    return out


def test_passing_draft_screenshots_are_uploaded_before_the_verdict_then_deleted(tmp_path):
    import base64
    import worker as worker_module

    shots = _shots(tmp_path, [10, 20, 30, worker_module.MAX_SHOT_BYTES])  # ảnh cuối quá trần → bỏ
    transport = FakeTransport()
    _publishing_worker(transport, PublishingCandidates(), {**PASSING, 'screenshots': shots}).run_once()
    names = [call[1].rsplit('/', 1)[-1] for call in transport.calls]
    assert names.index('screenshots') == names.index('verdict') - 1
    _method, path, payload, headers = transport.calls[names.index('screenshots')]
    assert path == '/api/ai-board/worker/tickets/7/screenshots'
    assert headers['content-type'] == worker_module.SHOTS_TYPE and headers['x-ai-worker-key'] == 'secret'
    assert payload['lease_token'] == 'lease-7' and payload['run_id'] == 11
    assert [(i['phase'], i['width']) for i in payload['images']] == [('after', 375), ('after', 1280), ('before', 375)]
    assert base64.b64decode(payload['images'][0]['png_base64']).startswith(b'\x89PNG')
    assert 'screenshots' not in transport.calls[names.index('verdict')][2]['verdict']  # đường dẫn cục bộ không lên server
    assert not any(Path(s['path']).exists() for s in shots)


def test_blocked_run_uploads_no_screenshots_but_still_deletes_them(tmp_path):
    shots = _shots(tmp_path, [10])
    blocked = {**PASSING, 'outcome': 'blocked', 'candidate': None, 'failure_class': 'ordinary', 'screenshots': shots}
    transport = FakeTransport()
    _publishing_worker(transport, PublishingCandidates(), blocked).run_once()
    assert not any(call[1].endswith('/screenshots') for call in transport.calls)
    assert not Path(shots[0]['path']).exists()


def test_failed_screenshot_upload_does_not_change_the_verdict(tmp_path):
    class Down(FakeTransport):
        def __call__(self, method, path, payload, headers):
            if path.endswith('/screenshots'):
                self.calls.append((method, path, payload, headers))
                raise OSError('connection reset')
            return super().__call__(method, path, payload, headers)

    transport = Down()
    result = _publishing_worker(transport, PublishingCandidates(), {**PASSING, 'screenshots': _shots(tmp_path, [5])}).run_once()
    assert result['pre_pr_verdict']['outcome'] == 'ready_for_pr'
    assert transport.calls[-1][1].endswith('/release')


def test_failed_publish_still_releases_with_the_reason():
    transport = FakeTransport()
    _publishing_worker(transport, PublishingCandidates(fail=OSError('git push: denied'))).run_once()
    assert not any(call[1].endswith('/pull-request') for call in transport.calls)
    assert transport.calls[-1][1].endswith('/release')
    assert 'git push: denied' in transport.calls[-1][2]['internal_detail']


def test_pr_text_hides_the_student_and_defuses_mentions():
    from worker import pr_text

    snapshot = {'request': {'id': 3, 'title': 'Đổi màu @team', 'detail': 'ping @admin please', 'student': 'Lan'}}
    title, body, labels = pr_text(snapshot, PLAN, 'protected',
                                  {**PASSING, 'outcome': 'needs_review',
                                   'gates': [*PASSING['gates'][:3], {**PASSING['gates'][3], 'risk_level': 'high'}]})
    assert 'Lan' not in body and '@admin' not in body and '@team' not in title
    assert labels == ['ai-board', 'ai-board:tier-protected', 'ai-board:review-carefully']


def test_worker_env_secrets_are_taken_out_of_the_process_environment(monkeypatch):
    import os
    from worker import take_secret

    monkeypatch.setenv('AI_BOARD_GITHUB_TOKEN', 'tok')
    assert take_secret('AI_BOARD_GITHUB_TOKEN') == 'tok'
    assert 'AI_BOARD_GITHUB_TOKEN' not in os.environ
    assert take_secret('AI_BOARD_GITHUB_TOKEN') == ''


def test_planner_reads_the_clarified_spec_and_flags_a_still_vague_request():
    from worker import HarnessPlanner

    snapshot = {'request': {'id': 3, 'title': 'Sửa trang', 'detail': 'làm đẹp hơn', 'domain': 'primary',
                            'clarified_spec': 'Trang / chức năng: trang chủ\nThay đổi mong muốn: nút to hơn'},
                'clarification_incomplete': True}
    assert HarnessPlanner._request(snapshot)['body'].startswith('Trang / chức năng: trang chủ')
    assert HarnessPlanner._request({'request': {**snapshot['request'], 'clarified_spec': None}})['body'] == 'làm đẹp hơn'
    seen = []

    def run_gate(gate, request, deps, budget, state):
        seen.append(request['body'])
        if gate == 1:
            state['plan'] = {'summary_vi': 'x', 'subtasks': [{'title': 't', 'file': 'public/x.html', 'verify': 'v'}]}
        return {'gate': gate, 'blocked': False}

    from budget import Budget
    planner = HarnessPlanner.__new__(HarnessPlanner)
    planner.Budget, planner.deps, planner.run_gate = Budget, object(), run_gate
    plan, _ = planner(snapshot)
    assert plan['risk'] == 'high'  # still vague after 5 questions: admin authorizes the plan (tier protected)


def test_per_run_caps_scale_with_the_plan_and_come_from_the_shared_contract():
    """Feature-folders ticket 02: same formula as store.js scaledLimit; worker hourly cap fits the biggest run."""
    import meter
    from worker import LIMITS, scaled_limit
    units = LIMITS["per_run"]["units"]
    assert scaled_limit("units", 3) == units["base"] + 3 * units["per_subtask"]
    assert scaled_limit("units", 999) <= units["max"]
    assert scaled_limit("wall_clock_s", 10) > 900 and scaled_limit("model_calls", 10) > 40
    assert meter.HOURLY_GPU_S == LIMITS["gpu_s_per_worker_hour"]["value"] > units["max"]


class FolderTransport(FakeTransport):
    """Snapshot of a root inside a feature folder (feature-folders ticket 05)."""

    def __call__(self, method, path, payload, headers):
        out = super().__call__(method, path, payload, headers)
        if path.endswith('/snapshot'):
            out['folder'] = {'id': 1, 'slug': 'tro-doan-tu', 'branch': 'ai-board/2026-09-26-feature-tro-doan-tu',
                             'head_sha': 'b' * 40, 'cycle': 1}
        return out


def test_folder_root_plans_and_commits_on_the_folder_branch(monkeypatch):
    import candidate
    dropped, seen = [], {}
    monkeypatch.setattr(candidate, 'folder_source', lambda repo, branch, base: ('/tmp/folder-src', 'c' * 40))
    monkeypatch.setattr(candidate, 'drop_source', lambda repo, path: dropped.append(path))
    candidates = PublishingCandidates()
    candidates.repo = '/tmp/repo'

    def planner(snapshot, source=None):
        seen['plan_source'] = source
        return PLAN, 0

    def runner(*_a, **kw):
        seen.update(run_source=kw.get('source'), opts=kw.get('candidate_opts'))
        return dict(PASSING)

    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=FolderTransport()), worker_id='w1',
                        mode='active', planner=planner, change_runner=runner, candidates=candidates)
    assert worker.run_once()['status'] == 'planned'
    assert seen == {'plan_source': '/tmp/folder-src', 'run_source': '/tmp/folder-src',
                    'opts': {'branch_name': 'ai-board/2026-09-26-feature-tro-doan-tu', 'branch_restore': 'c' * 40,
                             'folder_brief': None}}
    assert dropped == ['/tmp/folder-src']  # worktree tạm luôn được gỡ


def test_folder_conflict_with_dev_waits_for_a_human(monkeypatch):
    import candidate

    def conflict(repo, branch, base):
        raise candidate.FolderConflict('public/a.html')

    monkeypatch.setattr(candidate, 'folder_source', conflict)
    candidates = PublishingCandidates()
    candidates.repo = '/tmp/repo'
    transport = FolderTransport()
    worker = HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1', mode='active',
                        planner=lambda *_a, **_k: (PLAN, 0), change_runner=lambda *_a, **_k: dict(PASSING),
                        candidates=candidates)
    assert worker.run_once()['status'] == 'folder_conflict'
    release = [c for c in transport.calls if c[1].endswith('/release')][-1][2]
    assert release['outcome'] == 'waiting' and 'folder_conflict' in release['internal_detail']
    assert not any(c[1].endswith('/plan') for c in transport.calls)


def test_folder_brief_reaches_gate_1_and_a_brief_crossing_a_hard_rule_stops_the_plan():
    """Feature-folders ticket 06: L1 brief + L3 recent + L2 owned files go to gate 1; lexicon runs on the whole brief."""
    brief = {'text': 'Chức năng: Trò đoán từ\nĐã làm (mới nhất trước):\n- Trang chơi', 'recent': '[#3] Thêm điểm: x',
             'owned_files': ['public/tro-doan-tu.html']}
    request = HarnessPlanner._request({'request': {'id': 3, 'title': 't', 'detail': 'd'}, 'folder': {'brief': brief}})
    assert request['folder_brief'].startswith('Chức năng') and request['owned_files'] == ['public/tro-doan-tu.html']
    planner = HarnessPlanner.__new__(HarnessPlanner)
    bad = {**brief, 'recent': '[#4] thêm ảnh sex vào trang chơi'}
    try:
        planner({'request': {'id': 4, 'title': 't', 'detail': 'd'}, 'folder': {'brief': bad}})
    except PlanBlockedError as error:
        assert error.detail['reason'].startswith('folder_brief:')
    else:
        raise AssertionError('brief crossing a hard rule must stop the plan')


def test_a_self_request_plan_asks_only_for_self_config():
    """Self-improve ticket 04: server gives self.config (tier protected) only to self requests."""
    old = {'summary_vi': 'x', 'capabilities': ['features'],
           'subtasks': [{'title': 't', 'file': 'ai-board/harness/skills/default/SKILL.md', 'verify': 'v', 'size': 'small'}]}
    plan = HarnessPlanner._canonical({'domain': 'ai-board', 'type': 'self'}, old)
    assert plan['capabilities'] == ['self.config']
    assert [step['capability'] for step in plan['steps']] == ['self.config']
    assert HarnessPlanner._canonical({'domain': 'it', 'type': 'other'}, old)['capabilities'] == ['features']


def test_a_self_request_reaches_the_gates_as_self_and_its_verdict_names_base_sha_and_skill(tmp_path):
    class SelfTransport(FakeTransport):
        def __call__(self, method, path, payload, headers):
            out = super().__call__(method, path, payload, headers)
            if path.endswith('/snapshot'):
                out['request'] = {**out['request'], 'type': 'self'}
            return out

    class Planner:
        last_skill = None

        def __call__(self, _snapshot):
            self.last_skill = 'edit-html-text'
            return PLAN, 0

    class Budget:
        @staticmethod
        def tick():
            return True

    seen = {}

    def run_gate(gate, _request, _deps, _budget, state):
        seen[gate] = dict(state)
        if gate == 3:
            state['base_sha'] = 'a' * 40  # gate 3 records the base it showed the model
            return {'gate': 3, 'blocked': False, 'reason': None}
        return {'gate': 4, 'blocked': True, 'reason': 'protected_path', 'failure_class': 'critical'}

    transport = SelfTransport()
    HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1', mode='active',
               planner=Planner(), candidates=FakeCandidates(),
               change_runner=lambda plan, ticket_id, _units, **kw: execute_pre_pr(
                   plan, ticket_id=ticket_id, checkout_source=tmp_path, deps=object(), budget=Budget(),
                   run_gate=run_gate, cleanup=lambda *_a, **_k: None, **kw)).run_once()

    assert seen[3]['request_type'] == 'self' == seen[4]['request_type']
    verdict = next(call[2]['verdict'] for call in transport.calls if call[1].endswith('/verdict'))
    assert verdict['outcome'] == 'blocked'
    assert (verdict['base_sha'], verdict['skill']) == ('a' * 40, 'edit-html-text')


# Self-improve ticket 03: worker hỏi GitHub các PR server còn coi là mở, báo PR đã đóng.
class FakePrServer:
    def __init__(self, numbers):
        self.numbers, self.calls = numbers, []

    def __call__(self, method, path, payload, headers):
        self.calls.append((path, payload))
        if path.endswith('/pull-requests/open'):
            return {'pull_requests': [{'number': n, 'url': f'https://github.com/o/r/pull/{n}',
                                       'branch': f'ai-board/2026-09-28-ticket-{n}'} for n in self.numbers]}
        return {'pull_request': {'number': payload['number'], 'state': payload['state']}}


class FakePulls:
    """candidate.GitHub double: pull(n) → state, pull_files(n) → paths."""

    def __init__(self, pulls):
        self.pulls = pulls

    def pull(self, number):
        pr = self.pulls[number]
        if isinstance(pr, Exception):
            raise pr
        return pr

    def pull_files(self, number):
        return [f'public/p{number}.html']


def test_pr_sync_reports_merged_and_closed_prs_and_skips_open_ones():
    from worker import sync_pull_requests
    server = FakePrServer([41, 42, 43, 44])
    github = FakePulls({
        41: {'state': 'closed', 'merged_at': '2026-09-28T01:00:00Z', 'closed_at': '2026-09-28T01:00:00Z'},
        42: {'state': 'closed', 'merged_at': None, 'closed_at': '2026-09-28T02:00:00Z'},
        43: {'state': 'open', 'merged_at': None, 'closed_at': None},
        44: OSError('GitHub 502'),  # 1 PR lỗi không chặn các PR khác
    })
    out = sync_pull_requests(WorkerClient('http://fixture', 'secret', transport=server), github)
    reports = [payload for path, payload in server.calls if path.endswith('/pull-requests/state')]
    assert reports == [
        {'number': 41, 'state': 'merged', 'closed_at': '2026-09-28T01:00:00Z', 'files': ['public/p41.html']},
        {'number': 42, 'state': 'closed', 'closed_at': '2026-09-28T02:00:00Z', 'files': ['public/p42.html']},
    ]
    assert out == {'status': 'synced', 'open': 4, 'merged': [41], 'closed': [42], 'errors': [44]}


def test_pr_sync_without_github_token_skips_quietly(capsys):
    from worker import sync_pull_requests
    server = FakePrServer([41])
    assert sync_pull_requests(WorkerClient('http://fixture', 'secret', transport=server), None) == {'status': 'skipped'}
    assert server.calls == []
    assert 'AI_BOARD_GITHUB_TOKEN' in capsys.readouterr().out


def test_sync_prs_flag_without_token_exits_cleanly(monkeypatch, capsys):
    monkeypatch.delenv('AI_BOARD_GITHUB_TOKEN', raising=False)
    monkeypatch.setenv('AI_BOARD_WORKER_KEY', 'k' * 32)
    monkeypatch.setattr('dotenv.load_dotenv', lambda *_a, **_k: False, raising=False)
    assert main(['--sync-prs']) == 0
    assert '"skipped"' in capsys.readouterr().out


# Self-improve ticket 05: cổng 5 của yêu cầu self là eval 2 sha trên phần kiểm tra, không phải Docker/HTTP.
LEARNING = [{'id': 1, 'request_text': 'cũ', 'expected_files': ['public/1.html']}]
TEST_PART = [{'id': i, 'request_text': f'mới {i}', 'expected_files': [f'public/{i}.html']} for i in (2, 3, 4)]


def _self_run(tmp_path, variant_hits):
    import self_eval

    class SelfTransport(FakeTransport):
        def __call__(self, method, path, payload, headers):
            out = super().__call__(method, path, payload, headers)
            if path.endswith('/snapshot'):
                out['request'] = {**out['request'], 'type': 'self'}
            if path.endswith('/eval-tasks'):
                return {'ready': True, 'labelled': 4, 'min_tasks': 20, 'split': 0.7,
                        'learning': LEARNING, 'test': TEST_PART}
            return out

    snapshots, seen = [], {}

    def planner(snapshot):
        snapshots.append(snapshot)
        return PLAN, 0

    def run_at(sha, job, payload):
        if job == 'strata':
            return {'strata': {'type=ui': 80.0}, 'config': {'prompts.lock.json': sha[:10]}}
        hits = variant_hits if sha == 'b' * 40 else {2}
        return {'results': [{'id': t['id'], 'passed': t['id'] in hits} for t in payload['tasks']],
                'units': 5, 'exhausted': False}

    def run_gate(gate, _request, _deps, _budget, state):
        seen[gate] = dict(state)
        if gate == 3:
            state.update(base_sha='a' * 40, branch='ai-board/2026-09-28-ticket-7-abc123', commits=[
                {'sha': 'b' * 40, 'title': 'x', 'files': ['ai-board/harness/skills/default/SKILL.md']}])
        if gate == 5:
            return self_eval.run(state, run_at=run_at)
        if gate == 5.5:
            return {'gate': 5.5, 'blocked': False, 'reason': None, 'risk_level': 'high',
                    'risk_signals': [{'name': 'catalog_tier', 'tier': 'high', 'detail': 'self.config'}]}
        return {'gate': gate, 'blocked': False, 'reason': None}

    transport = SelfTransport()
    HttpWorker(WorkerClient('http://fixture', 'secret', transport=transport), worker_id='w1', mode='active',
               planner=planner, candidates=FakeCandidates(),
               change_runner=lambda plan, ticket_id, _units, **kw: execute_pre_pr(
                   plan, ticket_id=ticket_id, checkout_source=tmp_path, deps=object(), budget=TickBudget(),
                   run_gate=run_gate, cleanup=lambda *_a, **_k: None, **kw)).run_once()
    verdict = next(call[2]['verdict'] for call in transport.calls if call[1].endswith('/verdict'))
    return verdict, snapshots, seen, transport


def test_a_self_variant_that_wins_the_eval_passes_gate_5_without_http_and_goes_to_human_review(tmp_path):
    verdict, snapshots, seen, transport = _self_run(tmp_path, variant_hits={2, 3})
    assert verdict['outcome'] == 'needs_review' and verdict['failure_class'] is None
    gate5 = next(g for g in verdict['gates'] if g['gate'] == 5)
    assert gate5['runner'] == 'eval' and gate5['http_observed'] is False and gate5['blocked'] is False
    assert (gate5['eval']['wins'], gate5['eval']['losses'], gate5['eval']['accepted']) == (1, 0, True)
    assert gate5['eval']['gpu_s'] == 10 and gate5['eval']['base_sha'] == 'a' * 40
    assert verdict['candidate']['head_sha'] == 'b' * 40
    # Phần kiểm tra chỉ tới cổng eval: người lập plan (cổng 1–2.5) không thấy, phần học không vào cổng nào.
    assert [t['id'] for t in seen[5]['eval_tasks']] == [2, 3, 4]
    paths = [call[1] for call in transport.calls]
    assert paths.index('/api/ai-board/worker/eval-tasks') > next(i for i, p in enumerate(paths) if p.endswith('/plan'))
    assert 'mới 2' not in repr(snapshots) and 'cũ' not in repr(seen)


def test_a_self_pr_shows_its_eval_evidence_and_is_labelled_self(tmp_path):
    from worker import pr_text

    verdict, _, _, _ = _self_run(tmp_path, variant_hits={2, 3})
    snapshot = {'request': {'id': 3, 'title': 'Sửa skill', 'type': 'self'}}
    _title, body, labels = pr_text(snapshot, PLAN, 'protected', verdict)
    assert 'thắng 1, thua 0, hoà 2 trên 3 task kiểm tra' in body and 'Docker smoke' not in body
    assert 'ai-board:self' in labels
    assert 'ai-board:self' not in pr_text({'request': {'id': 3, 'title': 'x'}}, PLAN, 'surface', PASSING)[2]


def test_a_self_variant_that_loses_the_eval_is_blocked_without_a_repair(tmp_path):
    verdict, _, _, _ = _self_run(tmp_path, variant_hits=set())
    assert verdict['outcome'] == 'blocked' and verdict['failure_class'] == 'eval'
    assert verdict['gate_reached'] == 5 and verdict['reason'] == 'thua 1 task, thắng 0, hoà 2'
    assert verdict['repairs'] == [] and verdict['candidate'] is None
