"""Approved structured checks handed from the plan run to the exec run by plan_hash, worker-local; the verdict counts them."""
import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import pytest

import worker
from repositories import plan_session
from gate5 import checks

CHECK = {"primitive": "text_present", "path": "/x.html", "text": "Chào"}
PLAN = {"capabilities": ["public.ui"],
        "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/x.html"], "tests": ["t"], "risk": "low", "checks": [CHECK]}]}
PIN = checks.pin({"subtasks": [{"checks": [CHECK]}]})


@pytest.fixture(autouse=True)
def _store(monkeypatch, tmp_path):
    monkeypatch.setattr(plan_session, "APPROVED_PATH", tmp_path / "approved_checks.json")
    for name in ("AI_BOARD_PLAN_CHECKS", "AI_BOARD_SESSION_PLAN_EXECUTE", "AI_BOARD_DETERMINISTIC_READY_ORACLE"):
        monkeypatch.delenv(name, raising=False)


def test_flag_off_stores_and_reads_nothing():
    plan_session.put_approved("h1", [CHECK], PIN)
    assert not plan_session.APPROVED_PATH.exists() and plan_session.get_approved("h1") is None


def test_roundtrip_exact_plan_hash_only_and_independent_of_session_flag(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    plan_session.put_approved("h1", [CHECK], PIN)
    assert plan_session.get_approved("h1") == {"checks": [CHECK], "pin": PIN}
    assert plan_session.get_approved("h2") is None and plan_session.get_approved(None) is None
    plan_session.put_approved("h3", [], PIN)
    plan_session.put_approved(None, [CHECK], PIN)
    assert plan_session.get_approved("h3") is None


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def _outcome(plan_hash, candidate_ok=True):
    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            state["diffs"] = [{"file": "public/x.html", "diff": "d"}]
            state["produced"] = {"public/x.html": {"test_file": "t.js", "code": "a", "test": "t", "model": "m"}}
        if gate == 4:
            base["issues"] = []
        if gate == 5:
            rows = [{"check": CHECK, "base": False, "candidate": candidate_ok}]
            base["evidence"] = {"smoke_passed": True, "http_observed": True, "functional": {"probe_id": "p", "passed": True},
                                "checks": {"verdict": "proving", "rows": rows}}
            state["evidence"] = base["evidence"]
            state.update(branch="ai-board/2026-09-24-ticket-7", base_sha="a" * 40,
                         commits=[{"sha": "b" * 40, "title": "t", "files": ["public/x.html"]}])
        if gate == 5.5:
            base.update(risk_level="low", risk_signals=[])
        return base

    return worker.execute_pre_pr(PLAN, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                                 run_gate=run_gate, cleanup=lambda *_a, **_k: None, plan_hash=plan_hash)["outcome"]


@pytest.fixture
def flags(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.setenv("AI_BOARD_DETERMINISTIC_READY_ORACLE", "1")


def test_seeded_approved_checks_with_passing_rows_are_ready(flags):
    plan_session.put_approved("h1", [CHECK], PIN)
    assert _outcome("h1") == "ready_for_pr"


def test_without_the_seed_the_oracle_has_no_check_and_needs_review(flags):
    assert _outcome("h1") == "needs_review"
    plan_session.put_approved("h1", [CHECK], PIN)
    assert _outcome("other") == "needs_review"


def test_seeded_but_failing_row_needs_review(flags):
    plan_session.put_approved("h1", [CHECK], PIN)
    assert _outcome("h1", candidate_ok=False) == "needs_review"


def test_planner_exposes_the_approval_of_its_last_run():
    planner = worker.HarnessPlanner.__new__(worker.HarnessPlanner)
    assert planner.last_approved is None
