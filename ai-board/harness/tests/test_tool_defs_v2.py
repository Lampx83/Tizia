"""Tool definitions: param docs in manifest, aliases, phase filter, enum error, dedupe of identical reads (tool_defs_v2)."""
import json

import pytest

import tools
from gates import react_plan  # noqa: F401
from runtime import tool_loop, tool_manifest
from runtime.budgets.budget import Budget
from settings import reset_settings
from tools import readonly

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
READ = {"tool": "read_file", "arguments": {"file": "public/a.html", "start_line": 1, "end_line": 2}}
GREP = {"tool": "grep", "arguments": {"words": ["h1"], "file": "public/a.html"}}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';\n// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


@pytest.fixture
def v2(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_DEFS_V2", "1")
    reset_settings()
    yield
    monkeypatch.delenv("AI_BOARD_TOOL_DEFS_V2")
    reset_settings()


class Deps:
    def __init__(self, script):
        self.script, self.prompts = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        self.prompts.append(prompt)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


def run(script):
    budget, deps = Budget(), Deps(script)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc", check=lambda o: None)
    return out, budget, deps


def test_every_manifest_parameter_is_described():
    for spec in tool_manifest.load(known=tool_loop.IMPLEMENTED).tools.values():
        for key, prop in spec.parameters["properties"].items():
            assert prop.get("description"), f"{spec.name}.{key}"


def test_run_check_profile_is_an_enum():
    assert tool_loop.SCHEMAS["run_check"]["properties"]["profile"]["enum"] == ["light", "platform", "relevant"]


@pytest.mark.parametrize("alias,name", [("list_files", "tree"), ("outline_file", "outline"), ("search_text", "grep")])
def test_new_names_resolve_to_internal_names_with_flag_off(alias, name):
    assert tool_loop.parse_request({"response": json.dumps({"tool": alias, "arguments": {}})})[0] == name


def test_old_names_still_resolve_with_flag_on(v2):
    assert tool_loop.parse_request({"response": json.dumps({"tool": "grep", "arguments": {}})})[0] == "grep"


def test_flag_off_keeps_the_legacy_tool_list():
    listing = tool_loop.tool_list()
    assert "- tree:" in listing and "- grep:" in listing and "search_text" not in listing


def test_flag_on_shows_new_names_and_filters_the_implement_phase(v2):
    listing = tool_loop.tool_list()
    assert "- search_text:" in listing and "- outline_file:" in listing
    assert "list_files" not in listing and "- tree:" not in listing and "- grep:" not in listing


def test_plan_phase_matches_the_read_only_planner_tools():
    assert set(tool_manifest.PHASES["plan"]) == set(readonly.SPECS)
    assert "tree" not in tool_manifest.PHASES["implement"]


def test_enum_violation_says_which_values_are_allowed(v2):
    with pytest.raises(tool_loop.ToolError) as error:
        tool_loop.validate("run_check", {"profile": "heavy"})
    assert "light, platform, relevant" in str(error.value)


def test_missing_parameter_error_shows_a_valid_call(v2):
    with pytest.raises(tool_loop.ToolError) as error:
        tool_loop.validate("read_file", {})
    assert "public/index.html" in str(error.value)


def test_identical_read_returns_earlier_result_without_spending(v2):
    out, budget, deps = run([READ, READ, EDIT, TEST, FINISH])
    assert out["status"] == "proposed"
    assert budget.tool_calls == 4  # second identical read is free
    assert "đã có ở bước 0" in deps.prompts[2]
    assert "Already read" in deps.prompts[2] and "read_file public/a.html L1-2" in deps.prompts[2]


def test_read_after_an_edit_is_not_deduped(v2):
    out, budget, deps = run([READ, EDIT, READ, TEST, FINISH])
    assert out["status"] == "proposed" and budget.tool_calls == 5
    assert "đã có ở bước" not in deps.prompts[3]


def test_flag_off_does_not_dedupe():
    out, budget, deps = run([GREP, READ, GREP, EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and budget.tool_calls == 6
    assert all("đã có ở bước" not in p and "Already read" not in p for p in deps.prompts)


def test_flag_off_prompt_view_has_no_new_docs():
    listing = tool_loop.tool_list()
    assert '"description"' not in listing and '"enum"' not in listing
    assert "Window of lines around keywords in one file" in listing
