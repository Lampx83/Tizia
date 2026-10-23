"""Two check sessions and two owned process trees run side by side without touching each other."""
import json
import sys
import threading
import types

import pytest

from evaluation.suite.process_tree import run_owned
from verification import loop_checks


class FakeRunner:
    """Record every call by run id; answer like a healthy no-network sandbox."""

    def __init__(self):
        self.calls = []
        self.lock = threading.Lock()
        self.live = set()
        self.receipts = {}

    def _log(self, method, run_id):
        with self.lock:
            self.calls.append((method, run_id))

    def create(self, run_id, manifest, **kwargs):
        self._log('create', run_id)
        self.live.add(run_id)
        return {'network': 'none', 'policy_hash': 'policy-' + run_id}

    def upload(self, run_id, archive, **kwargs):
        self._log('upload', run_id)
        return {}

    def exec(self, run_id, argv, *, timeout, deadline=None):
        self._log('exec', run_id)
        if argv[0] == 'python' and '-c' in argv:
            return {'code': 0, 'timed_out': False, 'truncated': False}
        return {'code': 0, 'timed_out': False, 'truncated': False,
                'stdout': json.dumps(self.receipts[run_id])}

    def renew(self, run_id, **kwargs):
        self._log('renew', run_id)
        return {'state': 'ready', 'policy_hash': 'policy-' + run_id}

    def destroy(self, run_id, **kwargs):
        self._log('destroy', run_id)
        self.live.discard(run_id)
        return {'state': 'destroyed'}


class Workspace:
    file, content, test_file, test = 'public/a.js', 'export const a = 3;\n', None, None


def _session(runner, run_id):
    budget = types.SimpleNamespace(max_wall_clock_s=600, elapsed_s=0, tick=lambda: True)
    session = loop_checks.CheckSession('unused', 'sha-' + run_id, budget, 'tools', client=runner)
    session.run_id = run_id
    session.source_files = lambda: {}
    return session


@pytest.fixture
def lease(monkeypatch):
    class Lease:
        revoked = False

        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, *exc):
            return None

    monkeypatch.setattr(loop_checks, '_Lease', Lease)


def _receipt(profile, ws, sha):
    pin = loop_checks.digest(ws.file, ws.content, ws.test_file, ws.test, sha, 'tools')
    return {'digest': pin, 'profile': profile, 'passed': True, 'exit_code': 0, 'output': 'ok',
            'timed_out': False, 'truncated': False, 'capability_version': loop_checks.VERSION}


def test_two_sessions_use_only_their_own_run_id(lease):
    runner = FakeRunner()
    sessions = [_session(runner, 'loop-' + ('a' if i == 0 else 'b') * 24) for i in range(2)]
    for session in sessions:
        runner.receipts[session.run_id] = _receipt('light', Workspace, session.sha)
    errors = []

    def work(session):
        try:
            session.run('light', Workspace)
        except Exception as error:
            errors.append(error)

    threads = [threading.Thread(target=work, args=(s,)) for s in sessions]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    assert errors == []
    own = {s.run_id for s in sessions}
    assert {run_id for _, run_id in runner.calls} == own


def test_session_close_destroys_only_its_own_run(lease):
    runner = FakeRunner()
    first, second = _session(runner, 'loop-' + 'c' * 24), _session(runner, 'loop-' + 'd' * 24)
    for session in (first, second):
        session._start()
        session.cleanup_pending = True
    first.close()
    destroyed = [run_id for method, run_id in runner.calls if method == 'destroy']
    assert destroyed == [first.run_id]
    assert second.cleanup_pending and second.run_id in runner.live


def test_parallel_owned_trees_keep_their_own_journal_and_cleanup():
    slow = [sys.executable, '-c', 'import sys,time; sys.stdin.read(); time.sleep(0.5); print("slow-done", flush=True)']
    fast = [sys.executable, '-c', 'import sys; sys.stdin.read(); print("fast-done", flush=True)']
    results = {}

    def go(name, command):
        results[name] = run_owned(command, input='x', timeout=30)

    threads = [threading.Thread(target=go, args=(n, c)) for n, c in (('slow', slow), ('fast', fast))]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    assert results['slow'].stdout.strip() == 'slow-done'
    assert results['fast'].stdout.strip() == 'fast-done'
