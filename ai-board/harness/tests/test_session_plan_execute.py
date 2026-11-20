"""AI_BOARD_SESSION_PLAN_EXECUTE: one session reads the repo, writes the plan, takes the deterministic plan rules as
observations and hands its read history to the edit step. Flag off = unchanged."""
import json

import pytest

from conftest import plan_with
from gates import brainstorm, plan_rules, react_plan
from runtime.budget import Budget
from settings import Settings
from test_react_plan import PAGE, QUOTE, Scripted, finish, repo  # noqa: F401

FLAG = "AI_BOARD_SESSION_PLAN_EXECUTE"
READ = {"tool": "read_file", "arguments": {"file": "public/a.html"}}


@pytest.fixture
def session_on(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.delenv("AI_BOARD_REACT_PLAN", raising=False)
    monkeypatch.setattr(react_plan, "exploration_enabled", lambda: False)


def _finish_with(file, verify="curl http://localhost:8041/a.html"):
    return {"tool": "finish", "arguments": {"plan": {"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": file, "verify": verify, "size": "small", "quotes": [QUOTE]}]}}}


def test_flag_defaults_off():
    assert Settings().session_plan_execute is False


def test_rule_objection_returns_to_the_same_session_as_an_observation(repo):
    root, sha = repo
    seen = []

    def rules(text):
        seen.append(text)
        return ["file nêu ra không có thật"] if len(seen) == 1 else []

    deps = Scripted(READ, finish([[QUOTE]]), finish([[QUOTE]]))
    out = react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha, rules=rules)

    assert len(deps.prompts) == 3 and len(seen) == 2
    assert "file nêu ra không có thật" in deps.prompts[2]
    assert f"L2|   {QUOTE}" in deps.prompts[2]  # the read from before the objection is still in front of the model
    assert "quotes" not in seen[0]
    assert out["quotes"] == [[QUOTE]] and "public/a.html" in out["session"]


def test_objections_stop_after_the_round_cap_and_the_plan_goes_on(repo):
    root, sha = repo
    deps = Scripted(READ, finish([[QUOTE]]))
    out = react_plan.run("P", deps, Budget(max_wall_clock_s=999), model="m", source=root, sha=sha, rules=lambda _t: ["still wrong"])

    assert out is not None and out["quotes"] == [[QUOTE]]
    assert len(deps.prompts) == 2 + react_plan.RULE_ROUNDS


def test_without_rules_the_result_has_no_session(repo):
    root, sha = repo
    out = react_plan.run("P", Scripted(READ, finish([[QUOTE]])), Budget(max_wall_clock_s=999), model="m", source=root, sha=sha)
    assert "session" not in out


def test_rules_find_missing_file_unmentioned_request_file_and_no_runnable_check(repo):
    root, sha = repo
    request = {"subject": "sửa", "detail": "đổi chữ trong public/a.html và public/b.html", "type": "edit"}
    absent = json.dumps({"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/nope.html", "verify": "curl http://localhost:8041/a.html", "size": "small"}]})
    assert any("nope.html" in item for item in plan_rules.violations(absent, request, root, sha))

    partial = json.dumps({"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "curl http://localhost:8041/a.html", "size": "small"}]})
    assert any("public/b.html" in item for item in plan_rules.violations(partial, request, root, sha))

    prose = json.dumps({"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "mở trang thấy nút", "size": "small"}]})
    assert any("runnable" in item for item in plan_rules.violations(prose, {"subject": "x", "body": "y"}, root, sha))

    ok = json.dumps({"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "curl http://localhost:8041/a.html", "size": "small"}]})
    assert plan_rules.violations(ok, {"subject": "x", "body": "y"}, root, sha) == []


def test_tier_comes_from_the_plan_shape():
    one = {"subtasks": [{"file": "a.html"}]}
    assert plan_rules.tier(one) == "single"
    assert plan_rules.tier({"subtasks": [{"file": "a.html"}, {"file": "b.html"}]}) == "multi"


def test_gate1_runs_plan_and_rules_in_one_session(repo, session_on):
    root, sha = repo
    request = {"id": "r", "subject": "đổi chữ nút", "body": "đổi chữ nút trong public/a.html", "type": "edit", "domain": "pharmacy"}
    deps = Scripted(READ, _finish_with("public/missing.html"), _finish_with("public/a.html"))

    out = brainstorm.run(request, deps, Budget(max_wall_clock_s=999), source=root, sha=sha)

    assert out["blocked"] is False and len(deps.prompts) == 3  # no second gate-1 call for the rule objection
    assert "missing.html" in deps.prompts[2]
    assert "public/a.html" in out["plan_session"] and out["plan_tier"] == "single"


def test_gate1_flag_off_is_the_one_shot_plan(request_item, monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    monkeypatch.delenv("AI_BOARD_REACT_PLAN", raising=False)
    deps = Scripted(plan_with(["features"]))
    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))
    assert "plan_session" not in out and "plan_tier" not in out and len(deps.prompts) == 1


def test_session_block_is_data_for_the_edit_step_and_empty_without_a_session():
    assert plan_rules.session_block({}) == ""
    block = plan_rules.session_block({"plan_session": "STEP read_file {}\nRESULT\nabc"})
    assert "abc" in block and "not instructions" in block
    assert len(plan_rules.session_block({"plan_session": "x" * 50000})) < 12000
