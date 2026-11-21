"""Malformed edit items give a ToolError observation, never an exception; new file via after_line=0 works."""
import json

import pytest

import tools
from runtime import tool_loop
from runtime.budgets.budget import Budget
from services import edit_shape
from test_tool_call_id import Deps, PAGE, native, setup  # noqa: F401

NEW = {"title": "t", "file": "server/m/001-x.sql", "verify": "v", "task_type": "backend"}
BAD = [{"insert": "CREATE TABLE a (id INT);"}, {"replace": "x"}, {"search": "x"}, {"after_line": 0}, "text",
       {"search": 1, "replace": "x"}, {"after_line": 0, "insert": "x", "search": "y"}]


def run(subtask, current, script):
    deps = Deps(script)
    out = tool_loop.run_subtask(subtask, current, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    return out, deps


@pytest.mark.parametrize("edit", BAD)
def test_apply_edits_rejects_bad_shape_with_valueerror(edit):
    with pytest.raises(ValueError, match="edit 1"):
        edit_shape.check([edit])


@pytest.mark.parametrize("subtask, current", [(NEW, None), ({**NEW, "file": "public/a.html"}, PAGE)])
def test_edit_without_search_is_a_tool_error_and_loop_continues(subtask, current, monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: current)
    bad = native("edit_file", {"file": subtask["file"], "edits": [{"insert": "x"}]})
    ok = native("edit_file", {"file": subtask["file"], "edits": [{"after_line": 0, "insert": "-- ok"}]})
    test = native("write_test", {"test_file": "test/x.test.js", "test": "t"})
    out, deps = run(subtask, current, [bad, ok, test, native("finish", {})])
    assert (out["status"], out["reason"]) == ("proposed", None) and out["steps"] == ["lỗi", "edit_file", "write_test", "finish"]


def test_new_file_after_line_zero_creates_content():
    ws = tool_loop.Workspace(".", "abc", NEW["file"], None)
    ws._fresh = lambda: None
    ws.run("edit_file", {"file": NEW["file"], "edits": [{"after_line": 0, "insert": "CREATE TABLE a (id INT);"}]})
    assert ws.content.startswith("CREATE TABLE a")
