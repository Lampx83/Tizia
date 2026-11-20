"""Planning history handed from the plan run to the exec run by plan_hash, worker-local. Flag off: nothing stored or read."""
import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import pytest

import worker
from conftest import deps_with, plan_with
from repositories import plan_session
from runtime import pipeline
from runtime.budget import Budget

FLAG = "AI_BOARD_SESSION_PLAN_EXECUTE"
PLAN = {"capabilities": ["public.ui"],
        "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/x.html"], "tests": ["t"], "risk": "low"}]}


@pytest.fixture(autouse=True)
def _store(monkeypatch, tmp_path):
    monkeypatch.setattr(plan_session, "PATH", tmp_path / "plan_sessions.json")
    monkeypatch.delenv(FLAG, raising=False)


def test_flag_off_stores_and_reads_nothing(tmp_path):
    plan_session.put("h1", "history")
    assert not plan_session.PATH.exists() and plan_session.get("h1") is None


def test_roundtrip_is_keyed_by_plan_hash(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    plan_session.put("h1", "history one")
    plan_session.put("h2", "history two")
    assert plan_session.get("h1") == "history one" and plan_session.get("h2") == "history two"
    assert plan_session.get("other") is None and plan_session.get(None) is None


def test_session_is_capped_and_old_entries_dropped(monkeypatch):
    from gates.plan_rules import SESSION_CHARS
    monkeypatch.setenv(FLAG, "1")
    plan_session.put("big", "x" * (SESSION_CHARS * 3))
    assert len(plan_session.get("big")) == SESSION_CHARS
    for n in range(plan_session.KEEP + 2):
        plan_session.put(f"k{n}", "s")
    assert plan_session.get("big") is None and plan_session.get(f"k{plan_session.KEEP + 1}") == "s"


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def _run(plan_hash):
    seen = []

    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            seen.append(state.get("plan_session"))
            state["diffs"] = [{"diff": "d"}]
            state["produced"] = {"public/x.html": {"test_file": "t.js", "code": "a", "test": "t", "model": "m"}}
        if gate == 4:
            base["issues"] = []
        if gate == 5:
            base["evidence"] = {"smoke_passed": True, "http_observed": True, "functional": {"probe_id": "p", "passed": True}}
            state.update(branch="ai-board/2026-09-24-ticket-7", base_sha="a" * 40,
                         commits=[{"sha": "b" * 40, "title": "t", "files": ["public/x.html"]}])
        if gate == 5.5:
            base.update(risk_level="low", risk_signals=[])
        return base

    worker.execute_pre_pr(PLAN, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                          run_gate=run_gate, cleanup=lambda *_a, **_k: None, plan_hash=plan_hash)
    return seen


def test_exec_run_is_seeded_only_for_the_same_plan_hash(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    plan_session.put("h1", "planner read this")
    assert _run("h1") == ["planner read this"]
    assert _run("h2") == [None] and _run(None) == [None]


def test_flag_off_exec_run_is_not_seeded(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    plan_session.put("h1", "planner read this")
    monkeypatch.delenv(FLAG)
    assert _run("h1") == [None]


def test_planner_exposes_the_session_of_its_last_run(request_item, monkeypatch):
    def gate(number, request, deps, budget, state, **_):
        if number == 1:
            state["plan"] = plan_with(["features"])
            state["plan_session"] = "read steps"
        return {"gate": number, "blocked": False, "reason": None, **({"plan": state["plan"]} if number == 1 else {})}

    planner = worker.HarnessPlanner.__new__(worker.HarnessPlanner)
    planner.Budget, planner.run_gate, planner.deps = Budget, gate, deps_with(plan_with(["features"]))
    snapshot = {"request": {"id": 42, "student": "s", "domain": "pharmacy", "type": "feature", "title": "t", "detail": "d"}}
    planner(snapshot)
    assert planner.last_session == "read steps"
    planner.run_gate = lambda n, r, d, b, state, **k: (state.update(plan=plan_with(["features"])) or {"gate": n, "blocked": False, "reason": None})
    planner(snapshot)
    assert planner.last_session is None
