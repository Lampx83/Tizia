"""LF/182 multi-file subtask: flag off = single file; flag on = plan-approved file list, strict scope."""
import pytest

from runtime import subtask_files


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")


def task(**kw):
    return {"title": "t", "file": "public/a.js", "verify": "node --test", "size": "small", **kw}


def test_flag_off_ignores_files_key():
    assert subtask_files.files_of(task(files=["public/b.js"])) == ["public/a.js"]
    assert not subtask_files.is_multi(task(files=["public/b.js"]))


def test_flag_on_returns_primary_then_extras(on):
    assert subtask_files.files_of(task(files=["./public/b.js", r"public\c.js", "public/b.js", "public/a.js"])) == [
        "public/a.js", "public/b.js", "public/c.js"]
    assert subtask_files.is_multi(task(files=["public/b.js"]))


def test_flag_on_without_files_is_single(on):
    assert subtask_files.files_of(task()) == ["public/a.js"]
    assert not subtask_files.is_multi(task())


def test_validate_accepts_seven_files(on):
    plan = {"subtasks": [task(files=[f"public/f{i}.js" for i in range(6)])]}
    subtask_files.validate(plan)
    assert len(subtask_files.files_of(plan["subtasks"][0])) == 7


def test_validate_rejects_bad_shapes(on):
    for bad in ("public/b.js", [1], [""], ["../x.js"], ["/etc/x"], ["C:/x.js"]):
        with pytest.raises(ValueError):
            subtask_files.validate({"subtasks": [task(files=bad)]})


def test_validate_rejects_overlap_between_subtasks(on):
    plan = {"subtasks": [task(files=["public/b.js"]), task(file="public/b.js")]}
    with pytest.raises(ValueError, match="public/b.js"):
        subtask_files.validate(plan)
    plan = {"subtasks": [task(files=["public/c.js"]), task(file="public/z.js", files=["public/c.js"])]}
    with pytest.raises(ValueError, match="public/c.js"):
        subtask_files.validate(plan)


def test_validate_flag_off_strips_files(monkeypatch):
    plan = {"subtasks": [task(files=["public/b.js"])]}
    subtask_files.validate(plan)
    assert "files" not in plan["subtasks"][0]


def test_validate_flag_on_normalizes_in_place(on):
    plan = {"subtasks": [task(files=["./public/b.js", "public/a.js"])]}
    subtask_files.validate(plan)
    assert plan["subtasks"][0]["files"] == ["public/b.js"]


def test_budget_factor(on, monkeypatch):
    assert subtask_files.budget_factor(task()) == 1
    assert subtask_files.budget_factor(task(files=["public/b.js", "public/c.js"])) == 3
    monkeypatch.delenv("AI_BOARD_MULTI_FILE_SUBTASK")
    assert subtask_files.budget_factor(task(files=["public/b.js"])) == 1


# ── budget by file count (LF/254): flag off keeps the current factor; flag on doubles plans of 3+ files ──

@pytest.fixture
def budget_on(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_BUDGET_BY_FILE_COUNT", "1")


def test_budget_by_file_count_defaults_off():
    from settings import Settings
    assert Settings().budget_by_file_count is False


def test_budget_flag_off_keeps_current_factor(on):
    three = task(files=["public/b.js", "public/c.js"])
    assert subtask_files.budget_factor(three) == 3
    assert subtask_files.wall_clock_factor(three) == 1


def test_budget_flag_on_one_and_two_files_unchanged(budget_on):
    assert subtask_files.budget_factor(task()) == 1
    assert subtask_files.budget_factor(task(files=["public/b.js"])) == 2
    assert subtask_files.wall_clock_factor(task()) == 1
    assert subtask_files.wall_clock_factor(task(files=["public/b.js"])) == 1


def test_budget_flag_on_three_files_doubled(budget_on):
    three = task(files=["public/b.js", "public/c.js"])
    assert subtask_files.budget_factor(three) == 6
    assert subtask_files.wall_clock_factor(three) == 2


def test_child_caps_wall_clock_only_for_three_plus(budget_on):
    from runtime import limits, tool_loop
    base = limits.budget()["child_wall_clock_s"]
    assert tool_loop.child_caps(task(files=["public/b.js", "public/c.js"]))["max_wall_clock_s"] == 2 * base
    assert "max_wall_clock_s" not in tool_loop.child_caps(task(files=["public/b.js"]))


def test_budget_record_reports_files_and_steps_used(on):
    from runtime import tool_loop
    record = tool_loop.budget_record(task(files=["public/b.js"]), {"status": "proposed", "steps": ["read_file", "edit_file", "finish"]})
    assert record == {"files": 2, "steps": 3, "budget_factor": 2}


# ── plan side: parse, file policy, gate 2 ──────────────────────────────────

import json

from gates import brainstorm, scope_check


def plan_json(**sub):
    return json.dumps({"summary_vi": "x", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "ok", "size": "small", **sub}]})


def test_parse_plan_flag_off_drops_files():
    plan = brainstorm.parse_plan(plan_json(files=["public/b.html"]))
    assert "files" not in plan["subtasks"][0]


def test_parse_plan_flag_on_keeps_files(on):
    plan = brainstorm.parse_plan(plan_json(files=["./public/b.html"]))
    assert plan["subtasks"][0]["files"] == ["public/b.html"]


def test_parse_plan_flag_on_accepts_seven_files(on):
    plan = brainstorm.parse_plan(plan_json(files=[f"public/f{i}.html" for i in range(6)]))
    assert len(plan["subtasks"][0]["files"]) == 6


def test_check_files_extra_must_be_surface(on):
    plan = brainstorm.parse_plan(plan_json(files=["server/index.js"]))
    with pytest.raises(ValueError, match="server/index.js"):
        brainstorm.check_files(plan, None, None)


def test_check_files_extra_in_ai_board_zone_blocked(on):
    plan = brainstorm.parse_plan(plan_json(files=["ai-board/harness/main.py"]))
    with pytest.raises(ValueError, match="ai-board/harness/main.py"):
        brainstorm.check_files(plan, None, None)


def test_check_files_extra_db_layer_rejected(on):
    plan = brainstorm.parse_plan(plan_json(files=["server/contexts/_ai-generated/x/migrations/001-x.sql"]))
    with pytest.raises(ValueError, match="migrations"):
        brainstorm.check_files(plan, None, None)


def test_check_files_extra_surface_ok(on):
    plan = brainstorm.parse_plan(plan_json(files=["public/js/b.js"]))
    brainstorm.check_files(plan, None, None)
    assert plan["subtasks"][0]["files"] == ["public/js/b.js"]


def test_check_files_extra_must_exist_when_not_new_ok(on):
    plan = brainstorm.parse_plan(plan_json(files=["public/js/b.js", "public/readme.txt"]))

    class Tree:
        def exists(self, f):
            return f != "public/readme.txt"

    from repositories import repo_at_commit
    import pytest as _p
    mp = _p.MonkeyPatch()
    mp.setattr(repo_at_commit, "at", lambda *_a, **_k: Tree())
    try:
        with pytest.raises(ValueError, match="public/readme.txt"):
            brainstorm.check_files(plan, "src", "abc")
    finally:
        mp.undo()


def test_gate2_checks_extra_files_against_catalog(on):
    catalog = {"custom": {"tier": "surface", "allow": ["public/"], "deny": []}}
    plan = {"capabilities": ["custom"], "subtasks": [task(file="public/a.js", files=["server/index.js"])]}
    assert scope_check.check(plan, catalog=catalog)["blocked"]
    plan["subtasks"][0]["files"] = ["public/b.js"]
    assert not scope_check.check(plan, catalog=catalog)["blocked"]


def test_gate2_ignores_extra_files_when_flag_off():
    catalog = {"custom": {"tier": "surface", "allow": ["public/"], "deny": []}}
    plan = {"capabilities": ["custom"], "subtasks": [task(file="public/a.js", files=["server/index.js"])]}
    assert not scope_check.check(plan, catalog=catalog)["blocked"]


def test_budget_factor_is_clamped(on, monkeypatch):
    from runtime import limits
    cap = limits.loop()["file_factor_max"]
    big = task(files=[f"public/f{i}.js" for i in range(21)])
    assert len(subtask_files.files_of(big)) == 22 and subtask_files.budget_factor(big) == cap
    monkeypatch.setenv("AI_BOARD_BUDGET_BY_FILE_COUNT", "1")
    assert subtask_files.budget_factor(big) == 2 * cap
    from runtime import tool_loop
    assert tool_loop.child_caps(big)["max_model_calls"] <= 2 * cap * limits.loop()["model_calls"]


CATALOG = {"generated.context": {"allow": ["server/contexts/"], "deny": []}}
REQUEST = {"domain": "it", "type": "feature"}


def _canonical(verify, files):
    from worker import HarnessPlanner
    old = {"summary_vi": "g", "capabilities": ["generated.context"],
           "subtasks": [{"title": "t", "file": "server/contexts/a/index.js", "verify": verify, "size": "small", "files": files}]}
    return HarnessPlanner._canonical(REQUEST, old, None, CATALOG)


def test_canonical_carries_extra_files_when_multi_file_on(on):
    plan = _canonical("node --test test/a.test.js", ["server/contexts/a/x.js"])
    assert plan["steps"][0]["allowed_scope"] == ["server/contexts/a/index.js", "server/contexts/a/x.js"]
    assert plan["allowed_scope"] == plan["steps"][0]["allowed_scope"]


def test_canonical_drops_extra_files_when_flag_off():
    plan = _canonical("node --test test/a.test.js", ["server/contexts/a/x.js"])
    assert plan["steps"][0]["allowed_scope"] == ["server/contexts/a/index.js"]


def test_execution_plan_keeps_files_when_multi_file_on(on):
    from worker_execution import _execution_plan
    step = {"order": 1, "title": "t", "allowed_scope": ["a.js", "b.js"], "tests": ["node --test x"], "risk": "low"}
    assert _execution_plan({"steps": [step]})["subtasks"][0]["files"] == ["b.js"]


def test_execution_plan_drops_files_when_flag_off():
    from worker_execution import _execution_plan
    step = {"order": 1, "title": "t", "allowed_scope": ["a.js", "b.js"], "tests": ["node --test x"], "risk": "low"}
    assert "files" not in _execution_plan({"steps": [step]})["subtasks"][0]


def test_prose_verify_becomes_runnable_command_under_critical_only(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    step = _canonical("Route trả 200 khi gọi", ["test/a.test.js"])["steps"][0]
    assert step["tests"] == step["acceptance"] == ["node --test test/a.test.js"]
    assert "Route trả 200" in step["description"]
    step = _canonical("prose only", [])["steps"][0]
    assert step["tests"] == ["node --check server/contexts/a/index.js"]


def test_prose_verify_unchanged_when_critical_only_off():
    step = _canonical("Route trả 200 khi gọi", [])["steps"][0]
    assert step["tests"] == ["Route trả 200 khi gọi"]


def test_scope_check_exempts_test_file_under_critical_only(monkeypatch):
    from gates import scope_check
    plan = {"capabilities": ["generated.context"], "subtasks": [{"file": "server/contexts/_ai-generated/a/index.js", "files": ["test/a.test.js"]}]}
    cat = {"generated.context": {"tier": "surface", "allow": ["server/contexts/_ai-generated/"], "deny": []}}
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    assert scope_check.run({"plan": plan, "catalog": cat})["blocked"]
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    assert not scope_check.run({"plan": plan, "catalog": cat})["blocked"]
