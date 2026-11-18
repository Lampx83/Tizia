"""Suspect check branch outside Gate 5: plan checks reach the worker, one check revision through replan, near-identical repair stop."""
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import worker_execution  # noqa: E402
import worker_planner  # noqa: E402
from runtime import stop_report  # noqa: E402
from verification import checks  # noqa: E402
from test_gate_feedback_cap import _execution  # noqa: E402

CHECK = {"primitive": "text_present", "path": "/x.html", "text": "Liên hệ"}
OTHER = {"primitive": "text_absent", "path": "/x.html", "text": "Cũ"}
FLAGS = ("AI_BOARD_PLAN_CHECKS", "AI_BOARD_RED_CHECK_CLASSIFY")


def old_plan(*subtasks):
    return {"summary_vi": "x", "capabilities": ["public.ui"], "subtasks": list(subtasks)}


def subtask(file="public/x.html", **extra):
    return {"title": "t", "file": file, "verify": "v", "size": "small", **extra}


@pytest.fixture
def flags(monkeypatch):
    for name in FLAGS:
        monkeypatch.setenv(name, "1")


@pytest.fixture
def replan_on(monkeypatch):
    monkeypatch.setattr(worker_execution, "REPAIR_REPLAN", {**worker_execution.REPAIR_REPLAN, "enabled": True})


# Plan checks reach the server plan.

def test_canonical_carries_checks_per_file_only_with_plan_checks_on(monkeypatch):
    old = old_plan(subtask(checks=[CHECK]), subtask(checks=[CHECK, OTHER]), subtask("public/y.html"))
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    off = worker_planner.HarnessPlanner._canonical({"domain": "it"}, old)
    assert all("checks" not in step for step in off["steps"])
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    on = worker_planner.HarnessPlanner._canonical({"domain": "it"}, old)
    assert [step.get("checks") for step in on["steps"]] == [[CHECK, OTHER], None]
    assert worker_execution._execution_plan(on)["subtasks"][0]["checks"] == [CHECK, OTHER]
    assert {**on, "steps": [{k: v for k, v in s.items() if k != "checks"} for s in on["steps"]]} == off
