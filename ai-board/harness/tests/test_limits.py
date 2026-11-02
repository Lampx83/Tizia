"""contract limits loader: defaults = old constants, env override, shared scaling golden, config hash."""
import hashlib
import json
import os
import sys
from pathlib import Path

import pytest

from runtime import limits, meter, tool_loop
from runtime.budget import Budget, ChildBudget
from verification import sandbox

REPO = Path(__file__).resolve().parents[3]
GOLDEN = json.loads((REPO / "test" / "fixtures" / "ai-board-scaled-limit.json").read_text(encoding="utf-8"))


def test_defaults_equal_old_constants():
    assert limits.budget(env={}) == {"model_calls": 400, "plan_model_calls": 24, "tool_calls": 2000, "tokens": 200_000, "retries": 3, "units": 600,
                                     "wall_clock_s": 900.0, "semantic_repairs": 24, "child_wall_clock_s": 300.0,
                                     "node_wall_clock_s": 1200.0}
    assert limits.loop(env={}) == {"model_calls": 10, "tool_calls": 30, "repeats": 3, "error_chars": 2000}
    assert limits.sandbox_client()["backoff_s"] == (1, 2, 4, 8)
    assert limits.sandbox_client()["call_attempts"] == 3
    assert (sandbox.CREATE_TIMEOUT_S, sandbox.UPLOAD_TIMEOUT_S, sandbox.ARTIFACT_TIMEOUT_S) == (600.0, 300, 120)
    assert (tool_loop.MAX_REPEATS, tool_loop.ERROR_CHARS) == (3, 2000)
    assert Budget().max_wall_clock_s == 900.0 and Budget().max_units == 600
    child = ChildBudget(Budget())
    assert (child._max["model_calls"], child._max["tool_calls"]) == (10, 30)


def test_from_env_defaults_match_contract_without_env(monkeypatch):
    for key in list(os.environ):
        if key.startswith("BUDGET_MAX_") or key.startswith("AI_BOARD_LOOP_"):
            monkeypatch.delenv(key)
    b = Budget.from_env()
    assert (b.max_model_calls, b.max_tool_calls, b.max_units, b.max_wall_clock_s) == (400, 2000, 600, 900.0)


def test_env_override_applies_inside_loader(monkeypatch):
    monkeypatch.setenv("BUDGET_MAX_UNITS", "123")
    monkeypatch.setenv("BUDGET_MAX_WALL_CLOCK_S", "45.5")
    monkeypatch.setenv("AI_BOARD_LOOP_TOOL_CALLS", "7")
    b = Budget.from_env()
    assert (b.max_units, b.max_wall_clock_s) == (123, 45.5)
    assert tool_loop.child_caps()["max_tool_calls"] == 7
    assert limits.budget(env={"BUDGET_MAX_UNITS": ""})["units"] == 600


def test_meter_reads_contract_limits():
    assert meter.ROTATE_BYTES == 5 * 1024 * 1024 and meter.ROTATE_KEEP == 2
    assert meter.HOURLY_GPU_S == 2700


@pytest.mark.parametrize("case", GOLDEN["cases"], ids=lambda c: f"{c['kind']}-{c['n']}")
def test_scaled_limit_golden(case):
    assert limits.scaled_limit(case["kind"], case["n"]) == case["expected"]
    sys.path.insert(0, str(REPO / "ai-board"))
    import worker
    assert worker.scaled_limit(case["kind"], case["n"]) == case["expected"]


def test_config_hash_is_file_sha256():
    raw = (REPO / "server" / "ai-board" / "contract.json").read_bytes()
    assert limits.config_sha256() == hashlib.sha256(raw).hexdigest()


def test_every_flag_accepts_the_same_truthy_spellings():
    for value in ("1", "true", "ON", "yes"):
        assert limits.react_plan({"AI_BOARD_REACT_PLAN": value})["enabled"]
        assert limits.loop_adaptive({"AI_BOARD_ADAPTIVE_BUDGET": value})["enabled"]
        assert limits.sandbox_tool({"AI_BOARD_SANDBOX_TOOL": value})["enabled"]
    for value in ("0", "false", "no"):
        assert not limits.sandbox_tool({"AI_BOARD_SANDBOX_TOOL": value})["enabled"]


def test_local_run_wall_clock_is_sum_of_node_caps():
    node = limits.budget(env={})["node_wall_clock_s"]
    assert limits.run_wall_clock_s(2, local=True) == 300 + 2 * node
    assert limits.run_wall_clock_s(2, local=True) > 1073  # run 100: 2 steps ran 1073 s, api cap 1020 s
    assert limits.run_wall_clock_s(2, local=False) == limits.scaled_limit("wall_clock_s", 2) == 1020
    assert limits.run_wall_clock_s(99, local=True) == 12300 <= limits._parsed()["limits"]["local_wall_clock_s"]["max"]


def test_exhausted_detail_names_the_cap():
    b = Budget(max_wall_clock_s=10.0)
    b.elapsed_before_s = 20.0
    assert b.exhausted_detail().startswith("wall_clock_s 2")
    assert "/10s" in b.exhausted_detail()
    c = Budget()
    c.units = c.max_units
    assert c.exhausted_detail() == f"units {c.max_units}/{c.max_units}"
    assert Budget().exhausted_detail() is None
