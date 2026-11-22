"""Gate 1 planner: v2 tool defs, shared call-shape parser, read dedupe, capability hint; flag off keeps the old prompt."""
import json

import pytest

from gates import react_plan, scope_check
from runtime import tool_loop, tool_manifest
from runtime.budgets.budget import Budget
from settings import reset_settings
from test_react_plan import QUOTE, Scripted, finish, repo, react_on  # noqa: F401
from tools import readonly

READ = {"tool": "read_file", "arguments": {"file": "public/a.html"}}


@pytest.fixture
def v2(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_DEFS_V2", "1")
    reset_settings()
    yield
    monkeypatch.delenv("AI_BOARD_TOOL_DEFS_V2")
    reset_settings()


def plan(*args, **kw):
    return react_plan.run("P", *args, Budget(max_wall_clock_s=999), model="m", **kw)


def test_flattened_call_is_lifted_into_arguments_with_flag_on(v2):
    assert tool_manifest.call_args({"tool": "grep", "words": ["a"], "file": "x"}, lift=True) == {"words": ["a"], "file": "x"}


def test_flattened_call_is_an_error_with_flag_off_not_an_empty_call():
    with pytest.raises(ValueError, match="arguments"):
        react_plan.parse_action('{"tool": "read_file", "file": "public/a.html"}')
    with pytest.raises(tool_loop.ToolError, match="arguments"):
        tool_loop.parse_request({"response": '{"tool": "read_file", "file": "public/a.html"}'})


def test_implement_loop_lifts_flattened_call_with_flag_on(v2):
    assert tool_loop.parse_request({"response": '{"tool": "search_text", "words": ["a"]}'}) == ("grep", {"words": ["a"]})


def test_planner_runs_flattened_call_and_errors_unknown_param_with_example(repo, react_on, v2):
    root, sha = repo
    deps = Scripted({"tool": "read_file", "file": "public/a.html"}, {"tool": "search_text", "word": "x"}, finish([[QUOTE]]))
    out = plan(deps, source=root, sha=sha)
    assert out is not None and out["quotes"] == [[QUOTE]]
    assert f"L2|   {QUOTE}" in deps.prompts[1]
    assert "word" in deps.prompts[2] and '"tool": "search_text", "arguments"' in deps.prompts[2]


def test_planner_prompt_shows_v2_names_and_dedupes_identical_reads(repo, react_on, v2):
    root, sha = repo
    deps = Scripted(READ, READ, finish([[QUOTE]]))
    assert plan(deps, source=root, sha=sha) is not None
    assert "- search_text:" in deps.prompts[0] and "- list_files:" in deps.prompts[0] and "- grep " not in deps.prompts[0]
    assert "(đã có ở bước 1, không tính lượt đọc)" in deps.prompts[2]
    assert "Already read" in deps.prompts[2] and "read_file public/a.html head" in deps.prompts[2]


def test_planner_read_window_with_flag_on(repo, v2):
    root, sha = repo
    out = readonly.ReadOnlyTools(root, sha).run("read_file", {"file": "public/a.html", "start_line": 2, "end_line": 2})
    assert out == f"L2|   {QUOTE}"


def test_flag_off_planner_prompt_is_unchanged(repo, react_on):
    root, sha = repo
    deps = Scripted(READ, READ, finish([[QUOTE]]))
    plan(deps, source=root, sha=sha)
    assert readonly.schema_text() in deps.prompts[0] and "search_text" not in deps.prompts[0]
    assert all("đã có ở bước" not in p and "Already read" not in p for p in deps.prompts)


def mixed_plan(cap):
    return {"capabilities": [cap], "subtasks": [{"file": "server/contexts/portal-apps/builtin-catalog.js"}]}


def test_expected_capability_names_the_zone_capability(monkeypatch):
    monkeypatch.setattr(scope_check.path_policy, "may_edit", lambda path, role="student": True)
    assert scope_check.expected_capability(mixed_plan("content.write")) == scope_check.FULLSTACK_CAPABILITY
    assert scope_check.expected_capability(mixed_plan(scope_check.FULLSTACK_CAPABILITY)) is None
    assert scope_check.expected_capability({"capabilities": [], "subtasks": [{"file": "public/a.html"}]}) is None


def test_planner_returns_capability_observation_once(repo, react_on, v2, monkeypatch):
    root, sha = repo
    monkeypatch.setattr(scope_check, "expected_capability", lambda p: "public.ui" if p["capabilities"] != ["public.ui"] else None)
    wrong = finish([[QUOTE]])
    wrong["arguments"]["plan"]["capabilities"] = ["content.write"]
    deps = Scripted(READ, wrong, json.loads(json.dumps(wrong)))
    out = plan(deps, source=root, sha=sha)
    assert "public.ui" in deps.prompts[2] and len(deps.prompts) == 3
    assert json.loads(out["response"])["capabilities"] == ["content.write"]  # not auto-granted; gate 2 still judges


def test_rewoo_accepts_v2_names(repo, monkeypatch, v2):
    root, sha = repo
    monkeypatch.setenv("AI_BOARD_REACT_PLAN", "1")
    monkeypatch.setenv("AI_BOARD_REWOO_GATE2_READS", "1")
    reset_settings()
    steps = {"steps": [{"id": "#E1", "tool": "search_text", "arguments": {"words": ["go"], "file": "public/a.html"}}]}
    deps = Scripted(steps, finish([[QUOTE]]))
    assert plan(deps, source=root, sha=sha)["quotes"] == [[QUOTE]] and len(deps.prompts) == 2


def test_valid_capabilities_come_from_the_policy_catalog():
    valid = scope_check.valid_capabilities()
    assert {"public.ui", "generated.context", "features", "content", "content.write", "core.server"} <= set(valid)
    assert scope_check.FULLSTACK_CAPABILITY not in valid  # zone off
    assert all(meaning.startswith("[") for meaning in valid.values())


def test_expected_capability_fires_without_the_editable_zone():
    assert scope_check.expected_capability(mixed_plan("content.write")) == "core.server"
    assert scope_check.expected_capability(mixed_plan("core.server")) is None


def test_invented_capability_gets_the_valid_list_and_the_path_one(repo, react_on, v2):
    root, sha = repo
    wrong = finish([[QUOTE]])
    wrong["arguments"]["plan"]["capabilities"] = ["content.writes"]
    deps = Scripted(READ, wrong, finish([[QUOTE]]))
    out = plan(deps, source=root, sha=sha)
    assert "'content.writes' không phải capability hợp lệ" in deps.prompts[2]
    assert "core.server = " in deps.prompts[2] and '["public.ui"]' in deps.prompts[2]
    assert json.loads(out["response"])["capabilities"] == []


def test_invented_capability_is_not_objected_with_flag_off(repo, react_on):
    root, sha = repo
    wrong = finish([[QUOTE]])
    wrong["arguments"]["plan"]["capabilities"] = ["content.writes"]
    deps = Scripted(READ, wrong)
    assert json.loads(plan(deps, source=root, sha=sha)["response"])["capabilities"] == ["content.writes"]
    assert len(deps.prompts) == 2


def test_identical_read_is_deduped_across_planner_attempts(repo, react_on, v2):
    root, sha = repo
    assert plan(Scripted(READ, finish([[QUOTE]])), source=root, sha=sha, proposal_id="p1") is not None
    deps = Scripted(READ, finish([[QUOTE]]))
    assert plan(deps, source=root, sha=sha, proposal_id="p1") is not None
    assert "Already read" in deps.prompts[0] and "(đã có ở bước 1, không tính lượt đọc)" in deps.prompts[1]
    other = Scripted(READ, finish([[QUOTE]]))
    plan(other, source=root, sha=sha, proposal_id="p2")
    assert "Already read" not in other.prompts[0]


def test_flag_off_planner_keeps_no_reads_across_attempts(repo, react_on):
    root, sha = repo
    plan(Scripted(READ, finish([[QUOTE]])), source=root, sha=sha, proposal_id="p1")
    deps = Scripted(READ, finish([[QUOTE]]))
    plan(deps, source=root, sha=sha, proposal_id="p1")
    assert "đã có ở bước" not in deps.prompts[1]
