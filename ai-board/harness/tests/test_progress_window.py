"""Progress vector and stagnant window: fixed vectors, reset rules, compact snapshot."""
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from runtime import progress  # noqa: E402
import worker  # noqa: E402


def window(**overrides):
    return progress.Window(**{"window": 3, "min_signals": 1, "repeat_hash": 2, "similarity": 0.98, **overrides})


def step(w, **fields):
    base = {"fails": 3, "gate": 5, "check": "fail", "diff": "a", "evidence": ("e1",), "state": "s1"}
    base.update(fields)
    return w.step(**base)


def test_fewer_failing_tests_is_progress():
    w = window()
    step(w, fails=3)
    out = step(w, fails=2, diff="b", evidence=("e2",), state="s2")
    assert out["progress"] and "fails 3->2" in out["signals"]


def test_a_later_gate_is_progress():
    w = window()
    step(w, gate=4)
    out = step(w, gate=5, diff="b", evidence=("e2",), state="s2")
    assert out["progress"] and "gate 4->5" in out["signals"]


def test_a_new_diff_is_progress_but_whitespace_only_is_not():
    w = window()
    step(w, diff="line one\nline two")
    same = step(w, diff="line one\nline   two\n", evidence=("e1",), state="s2")
    assert same["progress"] is False
    real = step(w, diff="line one\nline three", evidence=("e3",), state="s3")
    assert real["progress"] and "diff changed" in real["signals"]


def test_evidence_counts_only_when_it_is_new_to_the_window():
    w = window()
    step(w, evidence=("e1",))
    repeated = step(w, evidence=("e1",), diff="a", state="s1")
    assert repeated["progress"] is False
    fresh = step(w, evidence=("e1", "e2"), diff="a", state="s1")
    assert fresh["progress"] and "evidence new" in fresh["signals"]


def test_three_steps_without_progress_are_stagnant():
    w = window()
    for n in range(3):
        out = step(w, fails=3, diff="", evidence=("e1",), state=f"s{n}")
    assert out["stagnant"] and out["reason"] == "no_progress"


def test_the_same_state_hash_twice_is_stagnant_even_while_other_signals_move():
    w = window()
    step(w, state="same", diff="a")
    out = step(w, state="same", diff="b", evidence=("e2",))
    assert out["stagnant"] and out["reason"] == "state_repeat"


def test_two_near_identical_diffs_are_stagnant():
    w = window()
    step(w, diff="export const a = 1;\nexport const b = 2;\nexport const c = 3;")
    out = step(w, diff="export const a = 1;\nexport const b = 2;\nexport const c = 3;!",
               evidence=("e2",), state="s2")
    assert out["stagnant"] and out["reason"] == "similarity"


def test_reset_clears_the_window_but_keeps_tried_strategies():
    w = window()
    step(w, fails=3)
    step(w, fails=3)
    w.tried.append("repair_code")
    w.reset()
    assert w.snapshot()["window"] == []
    assert w.tried == ["repair_code"]


def test_snapshot_is_compact_and_carries_no_raw_diff():
    w = window()
    step(w, diff="secret body of the diff")
    snap = w.snapshot()
    assert set(snap) >= {"signals", "window"}
    assert "secret body" not in json.dumps(snap)


def test_verdict_fields_report_the_window_without_raw_diff():
    w = window()
    step(w, fails=3, diff="raw diff text")
    fields = progress.verdict_fields(env={"AI_BOARD_PROGRESS_LOOP": "1"}, window=w)
    assert fields["progress"]["window"] and fields["strategy"] is None
    assert "raw diff text" not in json.dumps(fields)
    assert progress.verdict_fields(env={}) == {}


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def test_a_repeated_failure_stops_on_the_window_and_reports_progress(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROGRESS_LOOP", "1")
    monkeypatch.setattr(worker, "REPAIR_REPLAN", {"enabled": True, "max_repairs": 6, "no_progress_rounds": 99})
    monkeypatch.setattr(worker, "MAX_REPAIRS", 6)
    plan = {"capabilities": ["public.ui"],
            "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/js/campus/building.js"],
                       "tests": ["t"], "risk": "low"}]}
    attempts = [0]

    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            state["diffs"] = []
            state["produced"] = {"public/js/campus/building.js": {"test_file": "test/b.js"}}
        if gate == 4:
            attempts[0] += 1
            base.update(blocked=True, reason=f"node --check lỗi lần {attempts[0]}", failure_class="ordinary",
                        evidence={"text": "SyntaxError"})
        if gate == 5.5:
            base.update(risk_level="low")
        return base

    result = worker.execute_pre_pr(plan, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                                   run_gate=run_gate, cleanup=lambda *_a, **_k: None)
    assert result["outcome"] == "blocked" and len(result["repairs"]) == 2
    assert result["progress"]["reason"] == "no_progress" and result["progress"]["window"]
    assert result["strategy"] is None and "no_progress" in result["reason"]


def test_a_resume_keeps_tried_strategies_and_starts_a_fresh_window(monkeypatch):
    plan = {"steps": [{"order": 1, "title": "a", "allowed_scope": ["public/a.js"], "tests": ["t"], "risk": "low"}]}
    def execution():
        return worker._Execution(plan, ticket_id=1, checkout_source="unused", deps=object(), budget=None, run_gate=None,
                                 cleanup=None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                                 candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                                 checkpoint=None, plan_hash=None)
    crashed = execution()
    crashed._progress_window().tried = ["replan"]
    step(crashed._progress_window())
    from gates import implement
    monkeypatch.setattr(implement, "restore", lambda seed: seed.update(diffs=[]))
    run = execution()
    monkeypatch.setattr(run, "_checkout_head", lambda: "base")
    state = {"pins": worker.resume_pins(plan_hash=None, base="base", policy_hash=None), "base_sha": "base",
             "repairs": [], "gates": [], "produced_files": ["public/a.js"], "resumable": True,
             "repair_state": {"window_tried": ["replan"]},
             "produced": {"public/a.js": {"code": "x", "model": "m"}}}
    run.resume = [{"entries": [{"node": "gate_3", "outcome": "passed", "state": state}]}]
    assert run._prepare_resume()["resume_nodes"] == {"gate_3": "passed"}
    assert run._progress_window().tried == ["replan"]
    assert run._progress_window().steps == []
