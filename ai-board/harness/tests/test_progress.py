"""Progress/strategy seam: registry lookup, contract defaults, verdict and trace fields, inert when off."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from runtime import exec_graph, limits, progress  # noqa: E402
import worker  # noqa: E402


def test_signal_registry_is_empty_by_default_for_every_node_and_task_type():
    assert progress.signals("gate_3") == ()
    assert progress.signals("plan", "execute") == ()
    assert progress.signals("a-node-nobody-registered", "review") == ()


def test_a_node_signal_is_data_added_without_touching_the_loop(monkeypatch):
    signal = lambda snapshot: {"value": 1, "reason": "one more passing check"}  # noqa: E731
    monkeypatch.setitem(progress.SIGNALS, "gate_3", {"execute": (signal,)})
    assert progress.signals("gate_3", "execute") == (signal,)
    assert progress.signals("gate_3") == (), "task types stay separate"


def test_strategy_hook_returns_no_strategy_when_the_flag_is_off(monkeypatch):
    monkeypatch.setitem(progress.ACTIONS, "syntax", ("repair_code",))
    assert progress.choose("syntax", env={}) is None


def test_strategy_hook_returns_the_first_action_not_yet_tried(monkeypatch):
    monkeypatch.setitem(progress.ACTIONS, "syntax", ("repair_code", "replan"))
    env = {"AI_BOARD_PROGRESS_LOOP": "1"}
    assert progress.choose("syntax", env=env) == {"class": "syntax", "action": "repair_code",
                                                  "reason": "syntax -> repair_code"}
    assert progress.choose("syntax", tried=["repair_code"], env=env)["action"] == "replan"
    assert progress.choose("syntax", tried=["repair_code", "replan"], env=env) is None
    assert progress.choose("unseen-class", env=env) is None


def test_contract_holds_progress_and_repair_agent_defaults():
    spec = limits.progress(env={})
    assert (spec["enabled"], spec["window"], spec["min_signals"], spec["repeat_hash"]) == (False, 3, 1, 2)
    assert (spec["similarity"], spec["strategy_max_per_level"], spec["max_children"]) == (0.98, 2, 2)
    agent = limits.repair_agent(env={})
    assert (agent["enabled"], agent["role"], agent["attempts"], agent["context_chars"]) == (
        False, "repair_planner", 3, 6000)
    assert limits.progress(env={"AI_BOARD_PROGRESS_LOOP": "1"})["enabled"]
    assert limits.repair_agent(env={"AI_BOARD_MODEL_REPAIR": "true"})["enabled"]


class FakeTrace:
    def __init__(self):
        self.spans = []

    def add_span(self, name, attributes, *, start_ms, end_ms, status="ok", kind="internal"):
        self.spans.append({"name": name, "attributes": attributes})


def test_trace_stays_untouched_when_off_and_records_one_span_when_on(monkeypatch):
    trace = FakeTrace()
    monkeypatch.delenv("AI_BOARD_PROGRESS_LOOP", raising=False)
    progress.record(trace, node="repair_check", failure_class="syntax", action="repair_code")
    assert trace.spans == []
    monkeypatch.setenv("AI_BOARD_PROGRESS_LOOP", "1")
    progress.record(trace, node="repair_check", failure_class="syntax", action="repair_code")
    assert len(trace.spans) == 1
    assert trace.spans[0]["name"] == "progress.decision"
    assert trace.spans[0]["attributes"]["tizia.progress.failure_class"] == "syntax"


def _verdict(monkeypatch, env=None):
    for key, value in (env or {}).items():
        monkeypatch.setenv(key, value)
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None,
                                  cleanup=None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                                  candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                                  checkpoint=None, plan_hash=None)
    execution.gates = [{"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker",
                        "functional": {"passed": True}},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind = None
    execution.verdict()
    return execution.result


def test_execute_verdict_is_unchanged_when_the_flag_is_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PROGRESS_LOOP", raising=False)
    result = _verdict(monkeypatch)
    assert {"progress", "strategy"}.isdisjoint(result)
    assert result["outcome"] == "ready_for_pr"


def test_execute_verdict_carries_empty_progress_and_strategy_when_on(monkeypatch):
    result = _verdict(monkeypatch, {"AI_BOARD_PROGRESS_LOOP": "1"})
    assert result["progress"] == {"signals": [], "window": []}
    assert result["strategy"] is None


def test_plan_only_run_walks_the_same_nodes_and_never_touches_the_seam(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PROGRESS_LOOP", raising=False)
    seen = []

    def handler(nid):
        def run():
            seen.append(nid)
            return "passed"
        return run

    handlers = {nid: handler(nid) for nid in ("gate_1", "gate_2", "gate_2_5", "plan_ready")}
    path = exec_graph.run(handlers, "gate_1")
    assert path == seen == ["gate_1", "gate_2", "gate_2_5", "plan_ready"]


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def test_the_repair_ladder_uses_the_registry_only_when_the_flag_is_on(monkeypatch):
    plan = {"capabilities": ["public.ui"],
            "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/js/campus/building.js"],
                       "tests": ["t"], "risk": "low"}]}
    monkeypatch.setattr(worker, "REPAIR_REPLAN", {"enabled": True, "max_repairs": 4, "no_progress_rounds": 2})
    monkeypatch.setattr(worker, "MAX_REPAIRS", 4)
    monkeypatch.setitem(progress.ACTIONS, "syntax", ("stop_admin",))
    attempts = [0]

    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            state["diffs"] = [{"diff": "d"}]
            state["produced"] = {"public/js/campus/building.js": {"test_file": "test/b.js"}}
        if gate == 5:
            attempts[0] += 1
            base.update(blocked=True, reason="node --check lỗi", failure_class="ordinary", evidence={"text": "SyntaxError"})
        if gate == 5.5:
            base.update(risk_level="low")
        return base

    def verdict():
        return worker.execute_pre_pr(plan, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                                     run_gate=run_gate, cleanup=lambda *_a, **_k: None)

    monkeypatch.delenv("AI_BOARD_PROGRESS_LOOP", raising=False)
    off = verdict()
    assert off["repairs"], "off: the old ladder still repairs a syntax failure"
    attempts[0] = 0
    monkeypatch.setenv("AI_BOARD_PROGRESS_LOOP", "1")
    on = verdict()
    assert on["repairs"] == [] and "repair stop: syntax" in on["reason"]
