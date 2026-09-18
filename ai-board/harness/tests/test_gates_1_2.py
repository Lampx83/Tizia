"""Cổng 1 (plan) + cổng 2 (scope-check). Model fake ở biên I/O, không Ollama thật."""
import pytest

from budget import Budget
from conftest import deps_with, plan_with
from gates import brainstorm, scope_check
from main import run_once


# ── cổng 2 thuần: capability names đọc từ capabilities.js thật ──────────────

def test_capability_names_parsed_from_real_capabilities_js():
    names = scope_check.load_capability_names()
    assert {"features", "content", "experiments", "quiz"} <= names["surface"]
    assert {"db", "requireAdmin", "csrf", "registry"} <= names["core"]
    assert not (names["surface"] & names["core"])


@pytest.mark.parametrize("caps", [[], ["features"], ["features", "content", "quiz", "experiments"]])
def test_surface_only_plan_passes(caps):
    assert scope_check.check(plan_with(caps)) == {"blocked": False, "reason": None}


@pytest.mark.parametrize("cap", ["db", "requireAdmin", "csrf", "registry", "ws", "websocket", "sse", "httpServer", "fs"])
def test_core_or_unknown_capability_is_blocked_without_model(cap):
    out = scope_check.check(plan_with(["features", cap]))
    assert out["blocked"] is True
    assert cap in out["reason"]


def test_non_string_capability_is_blocked():
    assert scope_check.check(plan_with([{"name": "features"}]))["blocked"] is True


# ── cổng 1: schema plan ──────────────────────────────────────────────────────

def test_brainstorm_returns_validated_plan_and_charges_budget(request_item):
    deps = deps_with(plan_with(["features"]))
    budget = Budget(max_wall_clock_s=999)

    out = brainstorm.run(request_item, deps, budget)

    assert out["blocked"] is False
    plan = out["plan"]
    assert plan["summary_vi"].startswith("Thêm bộ thẻ")
    assert [s["size"] for s in plan["subtasks"]] == ["small", "large"]
    assert budget.model_calls == 1
    assert budget.tokens == 200
    (call,) = deps.models.calls
    assert call["model"] == "fake-gate1"
    assert call["format"] == "json"
    assert request_item["subject"] in call["prompt"]
    assert "features" in call["prompt"]      # model được bảo surface có gì


@pytest.mark.parametrize("bad", [
    "không phải json",
    {"summary_vi": "x"},                                        # thiếu subtasks
    {"summary_vi": "", "subtasks": [{"title": "a", "file": "f", "verify": "v", "size": "small"}]},
    {"summary_vi": "x", "subtasks": [{"title": "a", "file": "f", "verify": "v", "size": "huge"}]},
    {"summary_vi": "x", "subtasks": [{"title": "a", "file": "f", "size": "small"}]},   # thiếu verify
])
def test_brainstorm_blocks_on_invalid_plan(request_item, bad):
    out = brainstorm.run(request_item, deps_with(bad), Budget(max_wall_clock_s=999))
    assert out["blocked"] is True
    assert out["plan"] is None
    assert out["reason"]


# ── qua cả loop: cổng 2 chặn thật, ghi outcome ───────────────────────────────

def test_loop_blocks_db_plan_at_gate_2(request_item, db_file):
    out = run_once(request_item, db_path=db_file, deps=deps_with(plan_with(["features", "db"])))
    assert out["outcome"] == "blocked_gate_2"
    assert out["gate_reached"] == 2
    assert "db" in out["reason"]


def test_loop_blocks_ws_plan_at_gate_2(request_item, db_file):
    out = run_once(request_item, db_path=db_file, deps=deps_with(plan_with(["ws"])))
    assert out["outcome"] == "blocked_gate_2"


def test_loop_surface_plan_reaches_gate_7_with_plan_attached(request_item, db_file):
    out = run_once(request_item, db_path=db_file, deps=deps_with(plan_with(["features", "quiz"])))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7
    assert out["plan"]["summary_vi"]
