"""Worker E2E với graph persistence: crash giữa node → resume vào lại attempt_open + replay; ledger không đếm đôi; lease cũ bị chặn."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from repositories.server_graph_saver import HttpGraphSaver
from runtime.budget import Budget
from test_graph_persistence import LEASE, FakeServer
from worker import _Execution

PLAN = {"steps": [{"order": 1, "allowed_scope": ["public/a.html"], "tests": ["t"]}], "capabilities": []}


class Crash(BaseException):
    """BaseException: giả lập process chết, không bị _attempt nuốt."""


class FakeCheckpoint:
    """Đối tượng checkpoint của Worker: ledger/cursor nằm trên server giả, graph saver đi qua HTTP giả."""

    def __init__(self, server, run_scope="ticket-7:digA", lease=LEASE):
        self.server, self.run_scope, self.lease, self.ledger, self.cursor = server, run_scope, lease, None, None
        self.saves = 0

    def attempt(self, n):
        return self

    def restore(self, budget):
        if self.ledger:
            budget.absorb(self.ledger)

    def save(self, budget):
        self.saves += 1
        self.ledger = budget.snapshot()

    def load_cursor(self):
        return self.cursor

    def save_cursor(self, cursor):
        self.cursor = cursor

    def purge(self):
        pass

    def graph_saver(self, pin):
        return HttpGraphSaver(self.server, 7, self.lease, pin, thread_id=f"{self.run_scope}:graph")


def worker(checkpoint, run_gate, budget):
    return _Execution(PLAN, ticket_id=7, checkout_source=".", deps=object(), budget=budget, run_gate=run_gate,
                      cleanup=lambda *a, **k: None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                      candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                      checkpoint=checkpoint, plan_hash=None)


@pytest.fixture
def flag(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GRAPH_PERSISTENCE", "1")
    monkeypatch.delenv("AI_BOARD_TOOL_LOOP", raising=False)


def gates(log, seen, crash_after_3=False, gate4_reason=None):
    def run_gate(gate, _request, _deps, bud, _state):
        log.append(gate)
        if gate == 3:
            seen.setdefault("calls_on_entry", []).append(bud.model_calls)
            bud.spend("model_calls", 2)
            return {"gate": 3, "blocked": False}
        if gate == 4:
            if crash_after_3:
                raise Crash("killed between gate 3 and gate 4")
            return {"gate": 4, "blocked": True, "reason": gate4_reason or "stop", "failure_class": "critical"}
        return {"gate": gate, "blocked": True, "reason": "stop", "failure_class": "critical"}
    return run_gate


def test_crash_between_nodes_resumes_by_reentry_without_double_counting_ledger(flag):
    server, cp, log, seen = FakeServer(), FakeCheckpoint(FakeServer()), [], {}
    cp = FakeCheckpoint(server)
    with pytest.raises(Crash):
        worker(cp, gates(log, seen, crash_after_3=True), Budget()).run()
    assert log == [3, 4]
    saved_calls = cp.ledger["model_calls"]
    assert saved_calls == 2
    log.clear()
    second = Budget()
    worker(cp, gates(log, seen), second).run()
    assert seen["calls_on_entry"] == [0, 2], "run 2 restores the saved ledger before gate 3"
    # Gate 3 has no tool-step replay here, so its spend is real and counted again: 2 saved + 2 re-run.
    # Replay of recorded tool steps (tool_loop store) is what avoids re-spending; see evidence.
    assert second.model_calls == 4
    assert log[0] == 3 and 4 in log, "resume re-enters the attempt from gate 3"


def test_flag_on_resume_needs_no_tool_loop_flag(flag, monkeypatch):
    import worker as worker_module
    monkeypatch.setattr(worker_module, "_worker_checkpoint", lambda *a, **k: None)
    log, seen = [], {}
    cp = FakeCheckpoint(FakeServer())
    worker(cp, gates(log, seen), Budget()).run()
    assert cp.saves >= 1
    assert "AI_BOARD_TOOL_LOOP" not in __import__("os").environ


def test_stale_lease_worker_is_blocked_and_leaves_no_graph_rows(flag):
    server = FakeServer()
    old = FakeCheckpoint(server, lease={"worker_id": "w1", "lease_token": "t0"})
    log, seen = [], {}
    with pytest.raises(RuntimeError, match="stale_lease"):
        worker(old, gates(log, seen), Budget()).run()
    assert server.checkpoints == {}
    assert log == []


def test_changed_plan_starts_a_separate_thread_and_leaves_old_progress(flag):
    server, log, seen = FakeServer(), [], {}
    with pytest.raises(Crash):
        worker(FakeCheckpoint(server, run_scope="ticket-7:digA"), gates(log, seen, crash_after_3=True), Budget()).run()
    assert any(key[0].startswith("ticket-7:digA") for key in server.checkpoints)
    log.clear()
    worker(FakeCheckpoint(server, run_scope="ticket-7:digB"), gates(log, seen), Budget()).run()
    assert any(key[0].startswith("ticket-7:digA") for key in server.checkpoints), "old thread untouched"
    assert any(key[0].startswith("ticket-7:digB") for key in server.checkpoints)
    assert log[0] == 3
