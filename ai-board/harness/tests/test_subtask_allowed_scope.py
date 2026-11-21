"""Subtask allowed_scope: declared file set, gate 2.5 set check, tool loop edits only inside it."""
import json

import pytest

import tools
from gates import brainstorm, plan_validate
from runtime import subtask_files, tool_loop
from runtime.budgets.budget import Budget
from test_multi_file_subtask_scope import multi_state, source  # noqa: F401


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_MAX", "3")


def task(**kw):
    return {"title": "t", "file": "public/a.html", "verify": "node --test", "size": "small", **kw}


def plan_of(**kw):
    return {"capabilities": [], "subtasks": [task(**kw)]}


# plan shape

def test_allowed_scope_becomes_the_file_set(on):
    plan = plan_of(allowed_scope=["public/a.html", "./public/b.html", "public/js/c.js"])
    subtask_files.validate(plan)
    st = plan["subtasks"][0]
    assert subtask_files.files_of(st) == ["public/a.html", "public/b.html", "public/js/c.js"]
    assert st["allowed_scope"] == ["public/a.html", "public/b.html", "public/js/c.js"]


def test_fourth_file_in_scope_is_rejected(on):
    plan = plan_of(allowed_scope=["public/a.html", "public/b.html", "public/c.html", "public/d.html"])
    with pytest.raises(ValueError, match="tối đa"):
        subtask_files.validate(plan)


def test_scope_must_contain_the_primary_file(on):
    with pytest.raises(ValueError, match="public/a.html"):
        subtask_files.validate(plan_of(allowed_scope=["public/b.html"]))


def test_scope_and_files_must_agree(on):
    with pytest.raises(ValueError, match="allowed_scope"):
        subtask_files.validate(plan_of(allowed_scope=["public/a.html", "public/b.html"], files=["public/c.html"]))


@pytest.mark.parametrize("bad", [[], "public/a.html", ["public/a.html", ""], ["public/a.html", "../x.js"], ["public/a.html", 3]])
def test_bad_scope_shape_is_rejected(on, bad):
    with pytest.raises(ValueError):
        subtask_files.validate(plan_of(allowed_scope=bad))


def test_scope_cannot_be_shared_by_two_subtasks(on):
    plan = {"subtasks": [task(allowed_scope=["public/a.html", "public/b.html"]), task(file="public/b.html")]}
    with pytest.raises(ValueError, match="2 subtask"):
        subtask_files.validate(plan)


def test_flag_off_drops_both_keys():
    plan = plan_of(allowed_scope=["public/a.html", "public/b.html"], files=["public/b.html"])
    subtask_files.validate(plan)
    assert subtask_files.files_of(plan["subtasks"][0]) == ["public/a.html"]
    assert "files" not in plan["subtasks"][0] and "allowed_scope" not in plan["subtasks"][0]


def test_parse_plan_keeps_the_declared_scope(on):
    raw = json.dumps({"summary_vi": "x", "capabilities": [], "subtasks": [
        task(allowed_scope=["public/a.html", "public/b.html"])]})
    assert brainstorm.parse_plan(raw)["subtasks"][0]["files"] == ["public/b.html"]


# gate 2.5 set check

def reader(existing):
    return lambda path: "x" if path in existing else None


def test_gate_accepts_existing_and_declared_new_files(on):
    plan = plan_of(allowed_scope=["public/a.html", "public/b.html", "public/js/new-one.js"])
    subtask_files.validate(plan)
    assert plan_validate.scope_problems(plan, reader({"public/a.html", "public/b.html"})) == []


def test_gate_rejects_a_missing_file_that_is_not_a_new_path(on):
    plan = plan_of(allowed_scope=["public/a.html", "public/notes.txt"])
    subtask_files.validate(plan)
    problems = plan_validate.scope_problems(plan, reader({"public/a.html"}))
    assert len(problems) == 1 and "public/notes.txt" in problems[0]


def test_gate_rejects_a_path_outside_write_policy(on):
    plan = plan_of(allowed_scope=["public/a.html", "ai-board/harness/x.py"])
    subtask_files.validate(plan)
    problems = plan_validate.scope_problems(plan, reader({"public/a.html", "ai-board/harness/x.py"}))
    assert problems and "ai-board/harness/x.py" in problems[0]


def test_gate_rejects_a_set_over_the_limit_even_if_validate_was_skipped(on):
    plan = plan_of(files=["public/b.html", "public/c.html", "public/d.html"],
                   allowed_scope=["public/a.html", "public/b.html", "public/c.html", "public/d.html"])
    assert any("tối đa" in p for p in plan_validate.scope_problems(plan, None))


def test_gate_skips_existence_without_a_source(on):
    plan = plan_of(allowed_scope=["public/a.html", "public/notes.txt"])
    subtask_files.validate(plan)
    assert plan_validate.scope_problems(plan, None) == []


def test_gate_is_silent_when_flag_off_or_no_scope(monkeypatch):
    plan = plan_of(allowed_scope=["public/a.html", "ai-board/harness/x.py"])
    assert plan_validate.scope_problems(plan, reader(set())) == []
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    assert plan_validate.scope_problems(plan_of(), reader(set())) == []


# tool loop

FILES = {f"public/{n}.html": f"<main>\n<h1>{n}</h1>\n</main>\n" for n in "abcd"}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js",
                                              "test": "import test from 'node:test';\n// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}


def edit(file):
    return {"tool": "edit_file", "arguments": {"file": file, "edits": [{"after_line": 2, "insert": "<p>x</p>"}]}}


class Deps:
    def __init__(self, script):
        self.script = list(script)

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


def run_loop(script, st):
    return tool_loop.run_subtask(st, FILES["public/a.html"], deps=Deps(script), budget=Budget(), model="m",
                                 source=".", sha="abc", check=lambda out: None)


def declared(*files):
    plan = {"subtasks": [task(allowed_scope=list(files))]}
    subtask_files.validate(plan)
    return plan["subtasks"][0]


@pytest.fixture
def repo(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda source, sha, path: FILES.get(path))


def test_loop_edits_every_declared_file(on, repo):
    result = run_loop([edit("public/a.html"), edit("public/b.html"), edit("public/c.html"), TEST, FINISH],
                      declared("public/a.html", "public/b.html", "public/c.html"))
    assert result["status"] == "proposed"
    assert sorted(result["out"]["extra_files"]) == ["public/b.html", "public/c.html"]


def test_loop_refuses_a_file_outside_the_declared_scope(on, repo):
    result = run_loop([edit("public/a.html"), edit("public/d.html"), TEST, FINISH],
                      declared("public/a.html", "public/b.html", "public/c.html"))
    assert result["status"] == "blocked" and "public/d.html" in result["reason"]


def test_run_returns_plan_unfit_for_a_bad_scope_set(on, monkeypatch):
    from conftest import FakeModels, deps_with
    from runtime import levels
    plan = plan_of(allowed_scope=["public/a.html", "public/notes.txt"])
    subtask_files.validate(plan)
    monkeypatch.setattr(levels, "source_reader", lambda *a, **k: reader({"public/a.html"}))
    out = plan_validate.run({"subject": "s", "body": "b"}, deps_with(FakeModels(plan)), Budget(), {"plan": plan})
    assert out["blocked"] and out["outcome"] == plan_validate.PLAN_UNFIT and "public/notes.txt" in out["reason"]


# review fixes

def test_planner_is_told_about_allowed_scope_only_when_flag_on(monkeypatch):
    request = {"id": "1", "type": "feature", "subject": "s", "body": "b"}
    off = brainstorm.build_prompt(request, frozenset())
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    on_ = brainstorm.build_prompt(request, frozenset())
    assert "allowed_scope" not in off and "allowed_scope" in on_ and on_.startswith(off.split("REPO DATA")[0][:200])


def test_out_of_plan_growth_cannot_add_a_fourth_file(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_OUT_OF_PLAN_FILES", "1")
    monkeypatch.setenv("AI_BOARD_ADMIN_BACKEND_ZONE", "1")
    monkeypatch.setattr(tools, "_show", lambda source, sha, path: FILES.get(path, "x\n"))
    st = declared("public/a.html", "public/b.html", "public/c.html")
    result = tool_loop.run_subtask(st, FILES["public/a.html"], deps=Deps([edit("public/a.html"), edit("public/d.html"), TEST, FINISH]),
                                   budget=Budget(), model="m", source=".", sha="abc", check=lambda out: None, requester_role="admin")
    assert result["status"] == "blocked" and "public/d.html" in result["reason"]


def test_candidate_refuses_out_of_plan_file_for_a_declared_scope(on, monkeypatch, tmp_path, source):
    from services import candidate
    monkeypatch.setenv("AI_BOARD_OUT_OF_PLAN_FILES", "1")
    monkeypatch.setenv("AI_BOARD_ADMIN_BACKEND_ZONE", "1")
    scope = ["public/a.js", "public/b.js"]
    state = multi_state(tmp_path, {"public/b.js": "// b", "public/c.js": "// c"}, {"allowed_scope": scope})
    state["requester_role"] = "admin"
    state["diffs"][0]["out_of_plan"] = ["public/c.js"]
    with pytest.raises(candidate.ScopeViolation, match="public/c.js"):
        candidate.create(state, source)
    del state["plan"]["subtasks"][0]["allowed_scope"]
    state["plan"]["subtasks"][0]["files"] = ["public/b.js"]
    candidate.create(state, source)


@pytest.mark.parametrize("bad", [r"public\..\x.js", ".", "./", "../x.js", "public/.."])
def test_shape_rejects_backslash_traversal_and_bare_dot(on, bad):
    for key in ("allowed_scope", "files"):
        plan = plan_of(**{key: ["public/a.html", bad] if key == "allowed_scope" else [bad]})
        with pytest.raises(ValueError):
            subtask_files.validate(plan)


def test_primary_dotfile_scope_stays_in_step_with_check_files(on):
    raw = json.dumps({"summary_vi": "x", "capabilities": [], "subtasks": [
        task(file=".well-known/x.html", allowed_scope=[".well-known/x.html", "public/b.html"])]})
    plan = brainstorm.parse_plan(raw)
    try:
        brainstorm.check_files(plan, None, None)
    except Exception:  # elevation for the odd path is expected; only the normalised scope matters here
        pass
    st = plan["subtasks"][0]
    assert st["file"] in st["allowed_scope"]


def test_prompt_limit_follows_the_setting(monkeypatch):
    request = {"id": "1", "type": "feature", "subject": "s", "body": "b"}
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_MAX", "5")
    assert "at most 5 repo paths" in brainstorm.build_prompt(request, frozenset())
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_MAX", "2")
    assert "at most 2 repo paths" in brainstorm.build_prompt(request, frozenset())
