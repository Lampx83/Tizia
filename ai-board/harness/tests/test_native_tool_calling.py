"""LF/181: native `tools` + message history behind AI_BOARD_TOOL_NATIVE (default off), fake model on both paths."""
import json

import pytest

import tools
from providers.client import OllamaClient
from runtime import tool_loop
from runtime.budget import Budget
from repositories import server_hsm

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';\n// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}


def native(call, n=0):
    return {"response": "", "tool_calls": [{"id": f"c{n}", "type": "function",
            "function": {"name": call["tool"], "arguments": json.dumps(call["arguments"])}}]}


class Deps:
    def __init__(self, script):
        self.script, self.calls = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        self.calls.append({"prompt": prompt, **kw})
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return item if "response" in item else {"response": json.dumps(item)}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def run(script):
    deps = Deps(script)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    return out, deps


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")


def test_default_is_off_and_text_path_sends_no_tools_or_messages():
    assert tool_loop.native_enabled() is False
    out, deps = run([EDIT, TEST, FINISH])
    assert out["status"] == "proposed"
    for call in deps.calls:
        assert call["format"] == "json" and not (call.get("extra") or {}).get("messages") and not (call.get("extra") or {}).get("tools")
    assert "TOOL RESULT" in deps.calls[1]["prompt"]


def test_native_path_gives_same_proposal_as_text_path(on, monkeypatch):
    native_out, deps = run([native(EDIT, 0), native(TEST, 1), native(FINISH, 2)])
    monkeypatch.delenv("AI_BOARD_TOOL_NATIVE")
    text_out, _ = run([EDIT, TEST, FINISH])
    assert native_out["status"] == "proposed" and native_out["out"] == text_out["out"] and native_out["steps"] == text_out["steps"]


def test_native_call_carries_manifest_tools_and_message_history(on):
    _, deps = run([native(EDIT, 0), native(TEST, 1), native(FINISH, 2)])
    first, second, third = (c["extra"] for c in deps.calls)
    assert deps.calls[0]["format"] is None and first["messages"] == []
    assert [t["function"]["name"] for t in first["tools"]] == list(tool_loop.MANIFEST.tools)
    assert all(t["type"] == "function" and t["function"]["parameters"]["type"] == "object" for t in first["tools"])
    assert deps.calls[0]["prompt"] == deps.calls[1]["prompt"] == deps.calls[2]["prompt"]
    assistant, result = second["messages"]
    assert assistant["role"] == "assistant" and assistant["tool_calls"][0]["id"] == "call_0"
    assert json.loads(assistant["tool_calls"][0]["function"]["arguments"]) == EDIT["arguments"]
    assert result["role"] == "tool" and result["tool_call_id"] == "call_0" and "đã áp 1 edit" in result["content"]
    assert len(third["messages"]) == 4


def test_two_calls_in_one_reply_is_a_fixable_error_and_loop_continues(on):
    two = {"response": "", "tool_calls": native(EDIT)["tool_calls"] * 2}
    out, deps = run([two, native(EDIT, 1), native(TEST, 2), native(FINISH, 3)])
    assert out["status"] == "proposed"
    reply = deps.calls[1]["extra"]["messages"]
    assert reply[0]["role"] == "assistant" and "tool_calls" not in reply[0]
    assert reply[1]["role"] == "user" and "MỘT tool" in reply[1]["content"] and "nhận 2" in reply[1]["content"]


def test_text_json_reply_still_works_inside_native_mode(on):
    out, _ = run([EDIT, TEST, FINISH])
    assert out["status"] == "proposed"


def test_authority_and_scope_unchanged_on_native_path(on):
    seen = []

    class Authority:
        def authorize_action(self, action, **extra):
            seen.append((action, extra.get("tool_manifest")))
            return True
    with server_hsm.server_scope(Authority()):
        out, _ = run([native(EDIT, 0), native(TEST, 1), native(FINISH, 2)])
    assert out["status"] == "proposed"
    assert {m for _, m in seen if m} == {tool_loop.MANIFEST.hash} and ("edit_file", tool_loop.MANIFEST.hash) in seen
    outside = {"tool": "edit_file", "arguments": {"file": "public/other.html", "edits": [{"after_line": 0, "insert": "x"}]}}
    out, _ = run([native(outside)])
    assert out["status"] == "blocked" and out["failure_class"] == "critical"
    out, _ = run([native({"tool": "shell", "arguments": {}}), native(FINISH)])
    assert out["status"] != "proposed"


def test_native_with_compaction_is_refused(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_CONTEXT_COMPACTION", "1")
    out, deps = run([native(EDIT)])
    assert out["status"] == "blocked" and "compaction" in out["reason"] and deps.calls == []


def test_native_changes_the_checkpoint_pin(on):
    ws = tool_loop.Workspace(".", "abc", "public/a.html", PAGE)
    assert tool_loop._pins(SUBTASK, "abc", ws, {"native": True})["native"] is True


def test_client_vllm_sends_tools_and_history(monkeypatch):
    seen = {}
    monkeypatch.setattr(OllamaClient, "_post", lambda self, path, payload, retry=False: seen.update(payload) or {
        "choices": [{"message": {"content": None, "tool_calls": [{"id": "x", "function": {"name": "tree", "arguments": "{}"}}]}, "finish_reason": "tool_calls"}], "usage": {}})
    history = [{"role": "assistant", "content": "", "tool_calls": []}, {"role": "tool", "tool_call_id": "c0", "content": "ok"}]
    tools_ = [{"type": "function", "function": {"name": "tree", "parameters": {"type": "object"}}}]
    body = OllamaClient(base_url="http://127.0.0.1:8037/v1", protocol="vllm").generate("m", "hi", extra={"tools": tools_, "messages": history})
    assert seen["messages"] == [{"role": "user", "content": "hi"}, *history] and seen["tools"] == tools_
    assert "response_format" not in seen and body["tool_calls"][0]["function"]["name"] == "tree"


def test_client_ollama_refuses_history():
    with pytest.raises(ValueError):
        OllamaClient(base_url="http://127.0.0.1:11434", protocol="ollama").generate("m", "hi", extra={"messages": [{"role": "user", "content": "x"}]})


class Crash(Exception):
    pass


class CrashingDeps(Deps):
    def __init__(self, script):
        super().__init__(script)
        self.left = len(script)

    def call_model(self, model, prompt, *, budget, **kw):
        self.left -= 1
        if self.left < 0:
            self.calls.append({"prompt": prompt, **kw})
            raise Crash
        return super().call_model(model, prompt, budget=budget, **kw)


def test_resume_replay_rebuilds_the_live_native_history(on):
    from test_tool_checkpoint import MemSteps
    bad_args = {"tool": "tree", "arguments": {"path": 5}}
    two = {"response": "", "tool_calls": native(EDIT)["tool_calls"] * 2}
    bad_range = {"tool": "read_file", "arguments": {"file": "public/a.html", "start_line": 99}}
    shared = {"pins": None, "ledger": None, "steps": {}}
    live = CrashingDeps([bad_args, two, bad_range, native(EDIT, 7), native(TEST, 8)])
    with pytest.raises(Crash):
        tool_loop.run_subtask(SUBTASK, PAGE, deps=live, budget=Budget(), model="m", source=".", sha="abc",
                              check=lambda o: None, store=MemSteps(shared=shared))
    resumed = Deps([native(FINISH, 9)])
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=resumed, budget=Budget(), model="m", source=".", sha="abc",
                                check=lambda o: None, store=MemSteps(shared=shared))
    assert out["status"] == "proposed"
    history = live.calls[-1]["extra"]["messages"]
    assert len(history) == 10 and resumed.calls[0]["extra"]["messages"] == history
    assert [m["tool_call_id"] for m in history if m["role"] == "tool"] == ["call_3", "call_4"]