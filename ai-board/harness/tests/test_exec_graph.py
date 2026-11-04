"""The execution graph is one spec shared with the server: coverage, termination and cleanup."""
import hashlib
import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from runtime import exec_graph  # noqa: E402
import worker  # noqa: E402

SPEC = exec_graph.spec()
NODES = {n["id"]: n for n in SPEC["nodes"]}


def test_every_edge_connects_known_nodes_and_every_working_node_has_a_way_out():
    for edge in SPEC["edges"]:
        assert edge["from"] in NODES and edge["to"] in NODES
        assert not NODES[edge["from"]].get("end"), "an end node has no outgoing edge"
    for nid, node in NODES.items():
        if not node.get("end"):
            assert any(e["from"] == nid for e in SPEC["edges"]), nid
    assert set(SPEC["entries"].values()) <= set(NODES)


def test_every_node_is_reachable_from_an_entry_and_the_graph_can_terminate():
    reach = set(SPEC["entries"].values())
    todo = list(reach)
    while todo:
        for e in SPEC["edges"]:
            if e["from"] == todo[-1] and e["to"] not in reach:
                reach.add(e["to"])
                todo.append(e["to"])
        if todo[-1] in reach and all(e["to"] in reach for e in SPEC["edges"] if e["from"] == todo[-1]):
            todo.pop()
    assert reach == set(NODES), set(NODES) - reach
    assert any(n.get("end") for n in SPEC["nodes"])


def test_gates_in_the_graph_are_exactly_the_contract_gates():
    gates = {n["gate"] for n in SPEC["nodes"] if "gate" in n}
    assert gates == {*worker.PLAN_GATES, *worker.PRE_PR_GATES}


def test_the_execution_handlers_cover_exactly_the_execute_part_of_the_graph():
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None, cleanup=None, catalog=None,
                                  request_detail=None, memory_path=None, should_stop=None, candidate_opts=None, request_type=None,
                                  eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    exec_graph.compile_graph(execution.handlers(), SPEC["entries"]["execute"])  # raises when handlers and graph disagree


def handlers(outcomes):
    calls = []

    def node(nid):
        def run():
            calls.append(nid)
            queue = outcomes.get(nid, ["passed"])
            return queue.pop(0) if len(queue) > 1 else queue[0]
        return run
    names = ["attempt_open", "gate_3", "gate_4", "gate_5", "gate_5_5", "attempt_close", "repair_check", "repair_agent", "repair", "verdict"]
    return {n: node(n) for n in names}, calls


def test_a_passing_run_walks_every_gate_then_closes_and_ends_in_the_verdict():
    h, calls = handlers({"repair_check": ["done"]})
    path = exec_graph.run(h, "attempt_open")
    assert calls == path == ["attempt_open", "gate_3", "gate_4", "gate_5", "gate_5_5", "attempt_close", "repair_check", "verdict"]


def test_each_node_reports_its_outcome_to_the_journal():
    seen = []
    handlers = {"gate_1": lambda: "passed", "gate_2": lambda: "passed", "gate_2_5": lambda: "passed",
                "plan_ready": lambda: "passed"}
    path = exec_graph.run(handlers, "gate_1", journal=lambda node, outcome: seen.append((node, outcome)))
    assert path[:3] == ["gate_1", "gate_2", "gate_2_5"]
    assert seen[:3] == [("gate_1", "passed"), ("gate_2", "passed"), ("gate_2_5", "passed")]


def test_journal_resume_replays_a_finished_node_once_without_running_it():
    h, calls = handlers({"gate_4": ["blocked"], "repair_check": ["done"]})
    seen = []
    path = exec_graph.run(h, "attempt_open", resume_nodes={"gate_3": "passed"},
                          journal=lambda node, outcome: seen.append(node))
    assert calls.count("gate_3") == 0, "gate 3 replays the journal outcome instead of running"
    assert calls.count("gate_4") >= 1 and "gate_3" not in seen
    assert path.index("gate_3") < path.index("gate_4")


def test_a_repair_after_a_resumed_node_runs_it_for_real_again():
    h, calls = handlers({"gate_4": ["blocked"], "repair_check": ["repair", "done"]})
    exec_graph.run(h, "attempt_open", resume_nodes={"gate_3": "passed"})
    assert calls.count("gate_3") == 1, "the repair attempt must regenerate code, not replay the journal"


def test_graph_digest_changes_when_the_spec_changes():
    assert exec_graph.digest() == exec_graph.digest()
    changed = exec_graph.spec()
    changed["recursion_limit"] = int(changed.get("recursion_limit", 80)) + 1
    raw = json.dumps(changed, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    assert hashlib.sha256(raw.encode("utf-8")).hexdigest() != exec_graph.digest()


def test_a_blocked_gate_skips_the_later_gates_but_still_closes_the_attempt():
    h, calls = handlers({"gate_4": ["blocked"], "repair_check": ["done"]})
    assert exec_graph.run(h, "attempt_open") == ["attempt_open", "gate_3", "gate_4", "attempt_close", "repair_check", "verdict"]


def test_a_repair_loops_back_to_a_new_attempt_and_terminates():
    h, calls = handlers({"gate_5": ["blocked", "passed"], "repair_check": ["repair", "done"]})
    path = exec_graph.run(h, "attempt_open")
    assert path.count("attempt_open") == 2 and path[-1] == "verdict" and "repair" in path


def test_an_outcome_without_an_edge_is_an_error_not_a_silent_stop():
    h, _ = handlers({"gate_3": ["weird"]})
    with pytest.raises(exec_graph.GraphError):
        exec_graph.run(h, "attempt_open")


def test_a_graph_that_never_ends_is_stopped_by_the_recursion_limit():
    h, _ = handlers({"repair_check": ["repair"]})
    with pytest.raises(exec_graph.GraphError):
        exec_graph.run(h, "attempt_open")


def test_missing_or_extra_handlers_are_refused():
    h, _ = handlers({})
    h.pop("gate_4")
    with pytest.raises(exec_graph.GraphError):
        exec_graph.compile_graph(h, "attempt_open")
    h2, _ = handlers({})
    h2["gate_1"] = lambda: "passed"
    with pytest.raises(exec_graph.GraphError):
        exec_graph.compile_graph(h2, "attempt_open")


def _verdict_of(functional):
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None, cleanup=None, catalog=None,
                                  request_detail=None, memory_path=None, should_stop=None, candidate_opts=None, request_type=None,
                                  eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.gates = [{"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker", "functional": functional},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind = None
    execution.verdict()
    return execution.result


def test_oracle_needs_review_flag_gives_needs_review_verdict_with_oracle_reason():
    result = _verdict_of({"passed": True, "needs_review": True, "oracle_passed": False, "reason": "Chữ không hiển thị"})
    assert result["outcome"] == "needs_review" and "Chữ không hiển thị" in result["reason"] and result["failure_class"] is None
    assert _verdict_of({"passed": True})["outcome"] == "ready_for_pr"
