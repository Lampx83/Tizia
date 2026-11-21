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
