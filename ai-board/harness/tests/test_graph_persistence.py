"""LangGraph checkpoint qua HTTP saver: resume sau crash, pin drift, lease cũ. Server giả đúng hợp đồng graph_* của tool-checkpoint.js."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from repositories.server_graph_saver import HttpGraphSaver
from runtime import exec_graph

SPEC = {"entries": {"go": "a"}, "recursion_limit": 20, "nodes": [{"id": "a"}, {"id": "b"}, {"id": "c"}, {"id": "done", "end": True}],
        "edges": [{"from": "a", "on": "ok", "to": "b"}, {"from": "b", "on": "ok", "to": "c"}, {"from": "c", "on": "ok", "to": "done"}]}
THREAD = "ticket-7:graph"
LEASE = {"worker_id": "w1", "lease_token": "t1"}


class Crash(BaseException):
    """BaseException: giả lập process chết giữa node."""


class FakeServer:
    """Bản in-memory của graph_* trong tool-checkpoint.js: lease kiểm trước, pin khác → graph_drift."""

    def __init__(self):
        self.checkpoints, self.writes, self.pin, self.lease_ok = {}, {}, None, True
        self.calls = []

    def post(self, path, payload):
        op = path.rsplit("/", 1)[1]
        self.calls.append(op)
        if not self.lease_ok or payload.get("lease_token") != "t1":
            raise RuntimeError("stale_lease")
        assert payload["thread_id"].startswith("ticket-7:"), "thread outside ticket scope"
        if self.checkpoints and self.pin != payload["pin"]:
            raise RuntimeError("graph_drift")
        if op == "graph_put":
            self.pin = payload["pin"]
            self.checkpoints[payload["checkpoint_id"]] = {"checkpoint_id": payload["checkpoint_id"], "parent_id": payload["parent_id"],
                                                          "type": payload["type"], "checkpoint": payload["checkpoint"], "metadata": payload["metadata"]}
            return {"ok": True}
        if op == "graph_writes":
            for w in payload["writes"]:
                self.writes.setdefault(payload["checkpoint_id"], {})[(payload["task_id"], w["idx"])] = {
                    "task_id": payload["task_id"], "idx": w["idx"], "channel": w["channel"], "type": w["type"], "value": w["value"]}
            return {"ok": True}
        if op == "graph_get":
            cid = payload.get("checkpoint_id") or (max(self.checkpoints) if self.checkpoints else None)
            row = self.checkpoints.get(cid)
            return {"checkpoint": row, "writes": sorted(self.writes.get(cid, {}).values(), key=lambda w: (w["task_id"], w["idx"]))}
        if op == "graph_list":
            rows = sorted(self.checkpoints.values(), key=lambda r: r["checkpoint_id"], reverse=True)
            return {"checkpoints": rows[:payload.get("limit") or 10]}
        if op == "graph_purge":
            self.checkpoints.clear()
            self.writes.clear()
            return {"ok": True}
        raise AssertionError(op)


def saver(server, pin="plan-7:base-a"):
    return HttpGraphSaver(server, 7, LEASE, pin)


def handlers(log, crash_at=None):
    def make(nid):
        def node():
            log.append(nid)
            if nid == crash_at:
                raise Crash(nid)
            return "ok"
        return node
    return {nid: make(nid) for nid in ("a", "b", "c")}


def test_worker_side_saver_has_no_db_client():
    import repositories.server_graph_saver as module
    assert not {"dbconn", "psycopg", "sqlite3"} & set(vars(module))


def test_graph_without_saver_is_unchanged():
    log = []
    assert exec_graph.run(handlers(log), "a", graph_spec=SPEC) == ["a", "b", "c", "done"]
    assert log == ["a", "b", "c"]


def test_crash_after_b_resumes_at_c_without_rerunning_finished_nodes():
    server, log = FakeServer(), []
    with pytest.raises(Crash):
        exec_graph.run(handlers(log, crash_at="c"), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD)
    assert log == ["a", "b", "c"]
    log.clear()
    path = exec_graph.run(handlers(log), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD)
    assert log == ["c"], "finished nodes must not run again"
    assert path == ["a", "b", "c", "done"]


def test_resume_refuses_a_changed_plan_pin():
    server, log = FakeServer(), []
    with pytest.raises(Crash):
        exec_graph.run(handlers(log, crash_at="b"), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD)
    with pytest.raises(RuntimeError, match="graph_drift"):
        exec_graph.run(handlers([]), "a", graph_spec=SPEC, checkpointer=saver(server, pin="plan-8:base-a"), thread_id=THREAD)


def test_stale_lease_stops_before_any_checkpoint_write():
    server, log = FakeServer(), []
    server.lease_ok = False
    with pytest.raises(RuntimeError, match="stale_lease"):
        exec_graph.run(handlers(log), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD)
    assert server.checkpoints == {}


def test_purge_after_completion_makes_the_next_run_start_fresh():
    server, log = FakeServer(), []
    exec_graph.run(handlers(log), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD)
    saver(server).purge(THREAD)
    log.clear()
    assert exec_graph.run(handlers(log), "a", graph_spec=SPEC, checkpointer=saver(server), thread_id=THREAD) == ["a", "b", "c", "done"]
    assert log == ["a", "b", "c"]


def test_persistence_flag_defaults_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_GRAPH_PERSISTENCE", raising=False)
    assert exec_graph.persistence_enabled() is False
    monkeypatch.setenv("AI_BOARD_GRAPH_PERSISTENCE", "1")
    assert exec_graph.persistence_enabled() is True
