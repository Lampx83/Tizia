"""Bảng cổng: cổng lạ phải raise, cổng khai báo phải có handler, CLI và worker chặn cùng plan."""
import dataclasses
import json
import sys
from pathlib import Path

import pytest

from budget import Budget
from conftest import deps_with, plan_with
from main import run_once
from runtime import pipeline
from runtime.pipeline import GATES, UnknownGateError, run_gate

REPO = Path(__file__).resolve().parents[3]
AI_BOARD_DIR = REPO / "ai-board"
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import worker  # noqa: E402


def _recording_deps(models):
    calls = []
    return dataclasses.replace(deps_with(models), progress=calls.append), calls


@pytest.mark.parametrize("number", [0, 6.5, 8, 99])
def test_unknown_gate_raises_before_progress_reports_it(number):
    deps, progressed = _recording_deps(plan_with(["features"]))
    with pytest.raises(UnknownGateError) as caught:
        run_gate(number, {}, deps, Budget(), {})
    assert caught.value.number == number
    assert progressed == []


def test_every_declared_gate_has_handler():
    contract = json.loads((REPO / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))
    declared = set(GATES) | set(contract["gates"]["plan"]) | set(contract["gates"]["pre_pr"])
    assert declared <= set(pipeline._GATE_FNS)


@pytest.mark.parametrize("number", [6, 7])
def test_stub_gate_is_marked_not_passed_silently(number):
    deps, progressed = _recording_deps(plan_with(["features"]))
    out = run_gate(number, {}, deps, Budget(), {})
    assert out == {"gate": number, "blocked": False, "reason": None, "stub": True}
    assert progressed == [number]


def test_worker_and_cli_run_the_same_gate_entry():
    assert worker._load_harness()[2] is pipeline.run_gate


def test_cli_and_worker_both_block_db_plan_at_gate_2(request_item, db_file):
    cli = run_once(request_item, db_path=db_file, deps=deps_with(plan_with(["features", "db"])))
    assert cli["outcome"] == "blocked_gate_2"
    assert cli["gate_reached"] == 2
    assert "db" in cli["reason"]

    planner = worker.HarnessPlanner.__new__(worker.HarnessPlanner)
    planner.Budget, planner.run_gate = Budget, pipeline.run_gate
    planner.deps = deps_with(plan_with(["features", "db"]))
    snapshot = {"request": {"id": request_item["db_id"], "student": request_item["from"],
                            "domain": request_item["domain"], "type": request_item["type"],
                            "title": request_item["subject"], "body": request_item["body"]}}
    with pytest.raises(worker.PlanBlockedError) as caught:
        planner(snapshot)
    assert caught.value.detail["gate"] == 2
    assert "db" in caught.value.detail["reason"]
