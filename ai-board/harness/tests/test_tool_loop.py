"""Tool-loop tuần tự: adapter, trần 10/30/300 dưới parent, ledger sửa nội dung chung, forbidden/stale dừng trước side effect."""
import json
from pathlib import Path

import pytest

import tools
from runtime import tool_loop
from runtime.budget import Budget, ChildBudget
from repositories import server_hsm

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';"}}
FINISH = {"tool": "finish", "arguments": {}}

def test_revoked_authority_during_model_call_blocks_tool_before_effect(monkeypatch):
    class Authority:
        allowed = True
        def authorize_action(self, _action, **_extra):
            return self.allowed
    authority = Authority()
    deps = Deps([EDIT, TEST, FINISH])
    original = deps.call_model
    def revoke_then_reply(*args, **kwargs):
        reply = original(*args, **kwargs)
        authority.allowed = False
        return reply
    deps.call_model = revoke_then_reply
    effects = []
    original_tool = tool_loop.Workspace.run
    def effect(self, name, args):
        effects.append(name)
        return original_tool(self, name, args)
    monkeypatch.setattr(tool_loop.Workspace, 'run', effect)
    budget = Budget()
    with server_hsm.server_scope(authority):
        result = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model='m', source='.', sha='abc', check=lambda _out: None)
    assert result['status'] == 'blocked' and result['failure_class'] == 'critical'
    assert effects == [] and budget.tool_calls == 0
    assert budget.model_calls == 1 and budget.semantic_repairs == 0


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

def test_model_spending_parent_allowance_prevents_following_tool(monkeypatch):
    effects=[]
    monkeypatch.setattr(tool_loop.Workspace,'run',lambda *_args: effects.append('write') or 'done')
    out,budget,_=run([EDIT],budget=Budget(max_model_calls=1))
    assert out['status']=='paused' and out['failure_class']=='budget'
    assert effects==[] and budget.tool_calls==0 and budget.model_calls==1


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
    alternating = [{"tool": "tree", "arguments": {"path": f"public{i % 2}"}} for i in range(2)]
    out, budget, _ = run(alternating * 6)
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


def test_loop_prompt_is_a_locked_prompt_file_the_pipeline_can_resolve():
    import hashlib
    from runtime import pipeline
    path = pipeline.PROMPTS_DIR / "tool_loop.md"
    assert pipeline._static_prefix("tool_loop.md")
    assert pipeline._PROMPT_LOCK["tool_loop.md"] == hashlib.sha256(path.read_bytes()).hexdigest()
    assert 'prompt_name="tool_loop.md"' in Path(tool_loop.__file__).read_text(encoding="utf-8")


def test_loop_reports_its_manifest_and_every_action_carries_the_hash():
    seen, registered = [], []

    class Authority:
        def authorize_action(self, action, **extra):
            seen.append((action, extra))
            return True

        def register_tool_manifest(self, manifest):
            registered.append(manifest)

    with server_hsm.server_scope(Authority()):
        result = tool_loop.run_subtask(SUBTASK, PAGE, deps=Deps([EDIT, TEST, FINISH]), budget=Budget(), model='m', source='.', sha='abc', check=lambda _out: None)
    assert result['status'] == 'proposed'
    assert registered == [tool_loop.MANIFEST.data]
    assert {action for action, _ in seen} >= {'model', 'edit_file', 'write_test', 'finish'}
    assert all(extra == {'tool_manifest': tool_loop.MANIFEST.hash} for _, extra in seen)


def test_unapproved_manifest_stops_the_loop_as_transient_not_critical():
    class Authority:
        def authorize_action(self, action, **_extra):
            raise server_hsm.AuthorityError('tool_manifest_not_approved')

    with server_hsm.server_scope(Authority()):
        result = tool_loop.run_subtask(SUBTASK, PAGE, deps=Deps([EDIT]), budget=Budget(), model='m', source='.', sha='abc', check=lambda _out: None)
    assert result['status'] == 'blocked' and result['failure_class'] == 'transient' and 'tool_manifest_not_approved' in result['reason']


def test_manifest_registration_failure_blocks_before_any_model_call():
    calls = []

    class Authority:
        def authorize_action(self, action, **_extra):
            return True

        def register_tool_manifest(self, manifest):
            raise server_hsm.AuthorityError('tool_manifest_unavailable')

    deps = Deps([EDIT])
    deps.call_model = lambda *a, **k: calls.append(1)
    with server_hsm.server_scope(Authority()):
        result = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model='m', source='.', sha='abc', check=lambda _out: None)
    assert result['status'] == 'blocked' and not calls


def test_child_caps_follow_the_environment_and_stop_the_loop_at_the_raised_cap(monkeypatch):
    monkeypatch.delenv("AI_BOARD_LOOP_MODEL_CALLS", raising=False)
    monkeypatch.delenv("AI_BOARD_LOOP_TOOL_CALLS", raising=False)
    assert tool_loop.child_caps() == {"max_model_calls": 10, "max_tool_calls": 30}
    monkeypatch.setenv("AI_BOARD_LOOP_MODEL_CALLS", "20")
    monkeypatch.setenv("AI_BOARD_LOOP_TOOL_CALLS", "oops")
    assert tool_loop.child_caps() == {"max_model_calls": 20, "max_tool_calls": 30}
    monkeypatch.setenv("AI_BOARD_LOOP_MODEL_CALLS", "3")
    deps = Deps([{"tool": "tree", "arguments": {"path": "public"}}])
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda _o: None)
    assert out["status"] == "paused" and len(deps.prompts) == 3 and "loop_model_calls" in out["reason"]


def test_auto_mode_is_one_shot_first_and_the_loop_only_takes_over_after_the_one_shot_fails(tmp_path, monkeypatch):
    from test_inner_loop import ESM_TEST, GOOD, SeqModels, _run
    monkeypatch.undo()
    monkeypatch.setenv("AI_BOARD_TOOL_LOOP", "auto")
    out, prompts = _run(tmp_path / "ok", SeqModels([GOOD]))
    assert out["blocked"] is False and len(prompts) == 1 and "tool_loop" not in prompts[0].lower()[:200]
    edit = {"tool": "edit_file", "arguments": {"file": "public/tinh-nang.html", "edits": [{"after_line": 4, "insert": "    <p>Mới.</p>"}]}}
    test = {"tool": "write_test", "arguments": {"test_file": "test/moi.test.js", "test": ESM_TEST}}
    models = SeqModels(["không phải JSON"] * 4 + [edit, test, FINISH])
    out, prompts = _run(tmp_path / "fallback", models)
    assert out["blocked"] is False and len(prompts) == 7
    assert (tmp_path / "fallback/scratch/public/tinh-nang.html").read_text(encoding="utf-8").count("<p>Mới.</p>") == 1
    assert out["tool_manifest"]


def test_prompt_carries_the_excerpt_and_the_edit_test_finish_order():
    deps = Deps([EDIT, TEST, FINISH])
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None,
                                context="L2| <h1>A</h1>")
    assert out["status"] == "proposed"
    assert "L2| <h1>A</h1>" in deps.prompts[0] and "edit_file" in deps.prompts[0].split("Thứ tự làm")[1]


def test_finish_before_edit_and_test_is_a_cheap_nudge_not_a_content_repair():
    out, budget, deps = run([FINISH, EDIT, TEST, FINISH])
    assert out["status"] == "proposed" and budget.semantic_repairs == 0
    assert "chưa finish được" in deps.prompts[1] and "BỊ LOẠI" not in deps.prompts[1]


def test_finish_rejected_by_the_content_check_still_spends_a_repair():
    seen = []
    def check(o):
        seen.append(1)
        if len(seen) == 1:
            raise ValueError("sai")
    out, budget, _ = run([EDIT, TEST, FINISH], check=check)
    assert out["status"] == "proposed" and budget.semantic_repairs == 1


def test_repeating_the_same_request_gets_a_hint_then_stops_the_loop():
    bad = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"search": "không có", "replace": "x"}]}}
    out, _, deps = run([bad])
    assert out["status"] == "blocked" and out["failure_class"] == "ordinary" and "lặp lại" in out["reason"]
    assert "LẶP ĐÚNG" in deps.prompts[2] and "LẶP ĐÚNG" not in deps.prompts[1]


def test_search_miss_lists_real_lines_that_share_words_with_the_search():
    out, _, deps = run([{"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"search": "<main>xyz</main> h1 A tiêu", "replace": "x"}]}}, EDIT, TEST, FINISH])
    assert out["status"] == "proposed"
    assert "Dòng thật có từ trong search" in deps.prompts[1] and "L1| <main>" in deps.prompts[1]


def test_search_miss_with_a_close_line_does_not_add_the_word_overlap_list():
    close = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"search": "<main>" + chr(10) + "<h1>A</h2>", "replace": "x"}]}}
    out, _, deps = run([close, EDIT, TEST, FINISH])
    assert out["status"] == "proposed"
    assert "Dòng gần giống nhất" in deps.prompts[1] and "Dòng thật có từ trong search" not in deps.prompts[1]


def test_finish_with_an_edit_but_no_test_or_a_test_but_no_edit_is_a_free_nudge():
    out, budget, deps = run([EDIT, FINISH, TEST, FINISH])
    assert out["status"] == "proposed" and budget.semantic_repairs == 0 and "chưa finish được" in deps.prompts[2]
    out, budget, deps = run([TEST, FINISH, EDIT, FINISH])
    assert out["status"] == "proposed" and budget.semantic_repairs == 0 and "chưa finish được" in deps.prompts[2]


def test_lock_file_subtask_is_blocked_before_any_model_call():
    deps = Deps([FINISH])
    budget = Budget()
    result = tool_loop.run_subtask({**SUBTASK, "file": "package-lock.json"}, PAGE, deps=deps, budget=budget,
                                   model='m', source='.', sha='abc', check=lambda _out: None)
    assert result['status'] == 'blocked' and result['failure_class'] == 'critical'
    assert deps.prompts == [] and budget.model_calls == 0


def test_edit_outside_write_policy_is_forbidden_without_effect():
    ws = tool_loop.Workspace('.', 'abc', 'public/a.html', PAGE)
    with pytest.raises(tool_loop.Forbidden):
        ws._check_scope('dist/a.js')
    assert ws.content == PAGE


def test_check_command_refuses_outside_allowlist():
    tool_loop.check_command(['git', 'status'])
    with pytest.raises(tool_loop.Forbidden):
        tool_loop.check_command(['rm', '-rf', 'public'])
