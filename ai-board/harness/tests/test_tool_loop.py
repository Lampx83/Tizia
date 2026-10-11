"""Tool-loop tuần tự: adapter, trần 10/30/300 dưới parent, ledger sửa nội dung chung, forbidden/stale dừng trước side effect."""
import json

import pytest

import tools
from runtime import tool_loop
from runtime.budget import Budget, ChildBudget

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';"}}
FINISH = {"tool": "finish", "arguments": {}}


class Deps:
    """Trả lần lượt từng lời gọi; tính phí model_calls như Deps.call_model thật."""

    def __init__(self, script):
        self.script, self.prompts = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        self.prompts.append(prompt)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return item if "response" in item or "tool_calls" in item else {"response": json.dumps(item)}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def run(script, budget=None, check=lambda out: None, current=PAGE):
    budget = budget or Budget()
    deps = Deps(script)
    return tool_loop.run_subtask(SUBTASK, current, deps=deps, budget=budget, model="m", source=".", sha="abc",
                                 check=check), budget, deps


def test_native_and_json_adapters_give_the_same_request():
    native = {"tool_calls": [{"function": {"name": "tree", "arguments": '{"path": "public"}'}}]}
    text = {"response": '```json\n{"tool": "tree", "arguments": {"path": "public"}}\n```'}
    assert tool_loop.parse_request(native) == tool_loop.parse_request(text) == ("tree", {"path": "public"})


def test_two_native_calls_in_one_turn_are_rejected():
    call = {"function": {"name": "tree", "arguments": {}}}
    with pytest.raises(tool_loop.ToolError):
        tool_loop.parse_request({"tool_calls": [call, call]})


@pytest.mark.parametrize("name,args", [("grep", {"words": "abc"}), ("grep", {}), ("tree", {"path": 3}),
                                       ("tree", {"path": "x", "extra": 1}), ("shell", {})])
def test_bad_params_and_unknown_tools_fail_validation(name, args):
    with pytest.raises(tool_loop.ToolError):
        tool_loop.validate(name, args) if name in tool_loop.SCHEMAS else tool_loop.parse_request(
            {"response": json.dumps({"tool": name, "arguments": args})})


def test_happy_path_proposes_and_only_finish_ends_it():
    out, budget, _ = run([EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and "<p>B</p>" in out["out"]["code"]
    assert out["steps"] == ["edit_file", "write_test", "finish"]
    assert budget.model_calls == 3 and budget.tool_calls == 3 and budget.semantic_repairs == 0


def test_bad_params_are_corrected_without_spending_a_semantic_repair():
    bad = {"tool": "grep", "arguments": {"words": "abc"}}
    out, budget, deps = run([bad, EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and budget.semantic_repairs == 0
    assert "tham số/định dạng sai" in deps.prompts[1]


def test_file_outside_scope_stops_before_any_change():
    other = {"tool": "edit_file", "arguments": {"file": "server/index.js", "edits": [{"after_line": 0, "insert": "x"}]}}
    out, _, _ = run([other])
    assert (out["status"], out["failure_class"]) == ("blocked", "critical")
    for bad in ("../secret", "/etc/passwd", "C:/x"):
        out, _, _ = run([{"tool": "tree", "arguments": {"path": bad}}])
        assert out["failure_class"] == "critical"


def test_stale_base_stops_before_the_edit(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE + "changed\n")
    out, _, _ = run([EDIT])
    assert out["failure_class"] == "critical" and "stale" in out["reason"]


def test_new_file_uses_the_same_edit_tool_and_remains_only_a_proposal(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: None)
    create = {"tool": "edit_file", "arguments": {"file": SUBTASK["file"],
              "edits": [{"after_line": 0, "insert": PAGE.rstrip("\n")}]}}
    out, budget, deps = run([create, TEST, FINISH], current=None)
    assert out["status"] == "proposed" and out["out"]["code"] == PAGE
    assert budget.model_calls == budget.tool_calls == 3
    assert "after_line=0" in deps.prompts[0]


def test_new_file_created_at_base_during_loop_blocks_before_edit(monkeypatch):
    create = {"tool": "edit_file", "arguments": {"file": SUBTASK["file"],
              "edits": [{"after_line": 0, "insert": PAGE}]}}
    out, _, _ = run([create], current=None)
    assert out["failure_class"] == "critical" and "stale" in out["reason"]


def test_empty_new_file_finish_cannot_be_proposed(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: None)
    out, budget, _ = run([TEST, FINISH], current=None)
    assert out["status"] == "blocked" and out["failure_class"] == "ordinary"
    assert "chưa có thay đổi" in out["reason"]
    assert budget.semantic_repairs == 3


def test_existing_file_empty_replacement_remains_a_changed_proposal():
    workspace = tool_loop.Workspace(".", "abc", SUBTASK["file"], PAGE)
    workspace.content = ""
    workspace.run("write_test", TEST["arguments"])
    assert workspace.proposal()["code"] == ""


def test_finish_rechecks_base_after_the_last_edit(monkeypatch):
    reads = iter([PAGE, PAGE + "changed\n"])
    monkeypatch.setattr(tools, "_show", lambda *a: next(reads))
    out, _, _ = run([EDIT, TEST, FINISH])
    assert out["failure_class"] == "critical" and "stale" in out["reason"]


def test_rejected_finish_spends_the_shared_ledger_then_blocks_after_three():
    def reject(out):
        raise ValueError("test sai")
    budget = Budget(max_model_calls=40)
    budget.semantic_repairs = 1  # lượt sửa của vòng ngoài cũng nằm trong cùng ledger
    out, budget, _ = run([EDIT, TEST, FINISH], budget=budget, check=reject)
    assert (out["status"], out["failure_class"]) == ("blocked", "ordinary")
    assert budget.semantic_repairs == 3 == budget.max_semantic_repairs


def test_no_verification_reserve_pauses_instead_of_repairing():
    budget = Budget(max_model_calls=4)
    out, budget, _ = run([EDIT, TEST, FINISH], budget=budget, check=lambda o: (_ for _ in ()).throw(ValueError("x")))
    assert (out["status"], out["failure_class"]) == ("paused", "budget")
    assert "dự phòng" in out["reason"] and budget.semantic_repairs == 1


def test_loop_caps_are_10_models_30_tools_under_the_parent():
    out, budget, _ = run([{"tool": "read_file", "arguments": {"file": "public/a.html"}}])
    assert out["status"] == "paused" and "loop_model_calls" in out["reason"]
    assert budget.model_calls == 10 and budget.max_model_calls == 40
    child = ChildBudget(Budget())
    for _ in range(30):
        child.spend("tool_calls")
    assert child.exhausted() == "loop_tool_calls"


def test_parent_cap_wins_when_tighter_than_the_loop():
    out, budget, _ = run([{"tool": "read_file", "arguments": {"file": "public/a.html"}}], budget=Budget(max_model_calls=4))
    assert out["status"] == "paused" and budget.model_calls == 4 and "model_calls" in out["reason"]


def test_probe_passes_a_good_candidate_and_fails_a_bad_one():
    def good(prompt):
        words = '["abc"]' if "Gọi lại" in prompt else '["abc", "def"]'
        tool = "tree" if "`tree`" in prompt.rsplit("\n", 1)[-1] else "grep"
        args = {"path": "public"} if tool == "tree" else {"words": json.loads(words)}
        return {"response": json.dumps({"tool": tool, "arguments": args})}
    assert tool_loop.probe(good)["passed"]
    report = tool_loop.probe(lambda prompt: {"response": "xin chào"})
    assert not report["passed"] and not any(report[k] for k in ("structure", "params", "recovery"))


def test_gate3_uses_the_loop_when_flagged_and_still_writes_the_diff(tmp_path, monkeypatch):
    from test_inner_loop import PAGE as REAL_PAGE, ESM_TEST, SeqModels, _run
    monkeypatch.undo()
    monkeypatch.setenv("AI_BOARD_TOOL_LOOP", "1")
    edit = {"tool": "edit_file", "arguments": {"file": "public/tinh-nang.html", "edits": [{"after_line": 4, "insert": "    <p>Mới.</p>"}]}}
    test = {"tool": "write_test", "arguments": {"test_file": "test/moi.test.js", "test": ESM_TEST}}
    models = SeqModels([edit, test, FINISH])
    out, prompts = _run(tmp_path, models)
    assert out["blocked"] is False and len(prompts) == 3
    assert (tmp_path / "scratch/public/tinh-nang.html").read_text(encoding="utf-8").count("<p>Mới.</p>") == 1
    assert "+    <p>Mới.</p>" in out["diffs"][0]["diff"]


def test_gate3_new_file_uses_loop_and_writes_only_to_scratch(tmp_path, monkeypatch):
    from conftest import deps_with
    from gates import implement
    from test_inner_loop import ESM_TEST, SeqModels, _source
    monkeypatch.undo()
    monkeypatch.setenv("AI_BOARD_TOOL_LOOP", "1")
    source = _source(tmp_path)
    target = "public/new.html"
    subtask = {**SUBTASK, "file": target, "size": "small"}
    create = {"tool": "edit_file", "arguments": {"file": target,
              "edits": [{"after_line": 0, "insert": PAGE.rstrip("\n")}]}}
    test = {"tool": "write_test", "arguments": {"test_file": "test/new.test.js", "test": ESM_TEST}}
    models = SeqModels([create, test, FINISH])
    state = {"plan": {"summary_vi": "Tạo trang", "capabilities": ["features"], "subtasks": [subtask]},
             "checkout_source": str(source)}
    out = implement.run(state, deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path / "scratch")
    assert out["blocked"] is False and len(models.calls) == 3
    assert (tmp_path / "scratch" / target).read_text(encoding="utf-8") == PAGE
    assert not (source / target).exists()
    assert "+<h1>A</h1>" in out["diffs"][0]["diff"]
