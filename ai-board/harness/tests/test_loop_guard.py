"""Loop control: state hash repeat, node timeout flag, repair stagnation."""
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from runtime import exec_graph, loop_guard  # noqa: E402

SPEC = {"entries": {"go": "work"}, "recursion_limit": 50,
        "nodes": [{"id": "work"}, {"id": "check"}, {"id": "verdict", "end": True}],
        "edges": [{"from": "work", "on": "passed", "to": "check"}, {"from": "check", "on": "repair", "to": "work"},
                  {"from": "check", "on": "done", "to": "verdict"}, {"from": "verdict", "on": "passed", "to": "verdict"}]}
SPEC["edges"].pop()


def walk(material, **kwargs):
    calls = []
    report = {}
    handlers = {"work": lambda: calls.append("work") or "passed", "check": lambda: "repair", "verdict": lambda: calls.append("verdict") or "passed"}
    path = exec_graph.run(handlers, "work", graph_spec=SPEC, observe={"check": material}, report=report, **kwargs)
    return path, report, calls


def test_byte_identical_retry_halts_on_second_sighting():
    path, report, calls = walk(lambda: ("code", "boom", "3:ordinary"))
    assert path == ["work", "check", "work", "check", "verdict"]
    assert report["reason"] == loop_guard.REASON_STATE_REPEAT and report["node"] == "check"
    assert calls[-1] == "verdict"


def test_changed_code_keeps_going_until_it_repeats():
    codes = iter(["a", "b", "c", "c"])
    path, report, _ = walk(lambda: (next(codes), "boom", "3:ordinary"))
    assert path.count("check") == 4 and report["reason"] == loop_guard.REASON_STATE_REPEAT


def test_node_over_its_time_budget_halts_gracefully(monkeypatch):
    spec = {**SPEC, "nodes": [{"id": "work", "gate": 3}, {"id": "check"}, {"id": "verdict", "end": True}]}
    report = {}
    handlers = {"work": lambda: time.sleep(.05) or "passed", "check": lambda: "repair", "verdict": lambda: "passed"}
    monkeypatch.setattr(exec_graph.limits, "budget", lambda env=None: {"node_wall_clock_s": .01})
    path = exec_graph.run(handlers, "work", graph_spec=spec, report=report)
    assert path[-1] == "verdict" and report["reason"] == loop_guard.REASON_NODE_TIMEOUT


def test_hash_distinguishes_every_part():
    base = loop_guard.state_hash("c", "e", "s")
    assert base == loop_guard.state_hash("c", "e", "s")
    assert len({base, loop_guard.state_hash("c2", "e", "s"), loop_guard.state_hash("c", "e2", "s"), loop_guard.state_hash("c", "e", "s2")}) == 4
    assert loop_guard.state_hash("ab", "c") != loop_guard.state_hash("a", "bc")


def test_stagnation_needs_consecutive_near_identical_repairs():
    a = "def f():\n    return 1\n" * 40
    b = a + "# x\n"
    c = "totally different\n" * 40
    assert loop_guard.stagnant([a, b, a], .98, 2, 20000) is not None
    assert loop_guard.stagnant([a, c, a], .98, 2, 20000) is None
    assert loop_guard.stagnant([a, b], .98, 2, 20000) is None


def test_gate3_identical_retry_is_blocked_with_reason():
    from gates import implement
    from runtime import limits
    assert limits.loop_guard()["repeat_state_count"] == 2
    seen = []
    digest = loop_guard.state_hash("raw", "bad edits", "gate3")
    assert not loop_guard.repeated(seen, digest, 2)
    seen.append(digest)
    assert loop_guard.repeated(seen, digest, 2)
    assert hasattr(implement, "loop_guard")


def _execution():
    import worker
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None, cleanup=None, catalog=None,
                                  request_detail=None, memory_path=None, should_stop=None, candidate_opts=None, request_type=None,
                                  eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.plan = {"steps": []}
    return execution


def _round(execution, diff, fails):
    execution.last_result = {"gate": 5, "reason": f"generated tests failed\n# fail {fails}", "failure_class": "ordinary"}
    execution.state = {"diffs": [{"diff": diff}]}
    return execution._repair_allowed({"gate": 5, "reason": "generated tests failed"})


def test_worker_stops_on_stagnation_with_named_reason():
    execution = _execution()
    base = "+ const total = items.reduce((a, b) => a + b, 0);\n" * 30
    assert _round(execution, base, 3)
    assert _round(execution, base + "+ // tweak\n", 2)
    assert _round(execution, base + "+ // tweak two\n", 1) is False
    assert execution.halt["reason"] == loop_guard.REASON_STAGNATION
    assert execution.stop_note.startswith("stagnation:")


def test_worker_keeps_repairing_while_the_code_really_changes():
    execution = _execution()
    assert _round(execution, "+ alpha beta gamma\n" * 20, 5)
    assert _round(execution, "- delta epsilon zeta\n" * 20, 4)
    assert _round(execution, "* eta theta iota kappa lambda\n" * 20, 3)
    assert not execution.halt


def test_verdict_carries_the_loop_guard_reason():
    execution = _execution()
    execution.halt.update(reason=loop_guard.REASON_STATE_REPEAT, node="repair_check", detail="same code")
    execution.gates = [{"gate": 4, "blocked": True, "reason": "boom", "risk_level": "low"}]
    execution.kind = "ordinary"
    execution.verdict()
    assert execution.result["loop_guard"]["reason"] == "state_repeat"
    assert execution.result["reason"].startswith("loop stop state_repeat: same code | ")


def test_repair_window_flag_adds_one_repair_before_stagnation(monkeypatch):
    monkeypatch.setenv(loop_guard.REPAIR_WINDOW_FLAG, "3")
    execution = _execution()
    base = "+ const total = items.reduce((a, b) => a + b, 0);\n" * 30
    assert _round(execution, base, 3)
    assert _round(execution, base + "+ // tweak\n", 2)
    assert _round(execution, base + "+ // tweak two\n", 1)
    assert _round(execution, base + "+ // tweak three\n", 1) is False
    assert execution.halt["reason"] == loop_guard.REASON_STAGNATION


def test_repair_window_flag_off_keeps_default_window(monkeypatch):
    monkeypatch.delenv(loop_guard.REPAIR_WINDOW_FLAG, raising=False)
    execution = _execution()
    base = "+ const total = items.reduce((a, b) => a + b, 0);\n" * 30
    assert _round(execution, base, 3)
    assert _round(execution, base + "+ // tweak\n", 2)
    assert _round(execution, base + "+ // tweak two\n", 1) is False
