"""Local providers spend no tokens; a graph node past node_wall_clock_s exhausts the budget."""
import time

from runtime import budget as budget_mod
from runtime import exec_graph, limits
from runtime.budget import Budget


def test_node_deadline_exhausts_budget_then_clears():
    b = Budget()
    assert b.exhausted() is None
    budget_mod.start_node(0.05)
    try:
        time.sleep(0.08)
        assert b.exhausted() == "node_wall_clock_s"
    finally:
        budget_mod.start_node(None)
    assert b.exhausted() is None


def test_node_without_deadline_is_unbounded():
    budget_mod.start_node(None)
    assert Budget().exhausted() is None


def test_graph_node_runs_under_its_deadline_and_clears_it(monkeypatch):
    monkeypatch.setattr(limits, "budget", lambda env=None: {"node_wall_clock_s": 30.0})
    seen = []
    spec = {"nodes": [{"id": "work"}, {"id": "done", "end": True}],
            "edges": [{"from": "work", "on": "ok", "to": "done"}]}

    def work():
        seen.append(budget_mod._NODE["deadline"])
        return "ok"

    exec_graph.run({"work": work}, "work", graph_spec=spec)
    assert seen[0] is not None and 25 < seen[0] - time.monotonic() <= 30
    assert budget_mod._NODE["deadline"] is None


def test_slow_graph_node_reports_node_wall_clock(monkeypatch):
    monkeypatch.setattr(limits, "budget", lambda env=None: {"node_wall_clock_s": 0.05})
    spec = {"nodes": [{"id": "work"}, {"id": "done", "end": True}],
            "edges": [{"from": "work", "on": "ok", "to": "done"}]}
    reasons = []

    def work():
        time.sleep(0.08)
        reasons.append(Budget().exhausted())
        return "ok"

    exec_graph.run({"work": work}, "work", graph_spec=spec)
    assert reasons == ["node_wall_clock_s"]
