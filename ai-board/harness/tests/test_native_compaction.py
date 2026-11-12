"""LF/211: compaction runs with native tool calling; recent call and gate error stay verbatim."""
import json
from types import SimpleNamespace

import pytest

import tools
from runtime import limits, tool_loop
from runtime.budget import Budget
from test_native_tool_calling import EDIT, FINISH, PAGE, SUBTASK, TEST, native

BIG = "界" * 2000


class Deps:
    def __init__(self, script):
        self.script, self.calls, self.compactions = list(script), [], []
        self.models = SimpleNamespace(context_window=lambda *_a, **_k: 14000, routing=None)

    def call_model(self, model, prompt, *, budget, role=None, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        if role == "compactor":
            payload = json.loads(prompt.split("\nHISTORY_JSON\n", 1)[1])
            self.compactions.append(payload)
            return {"response": json.dumps({"version": 1, "notes": "listings were read", "references": payload["required_references"]})}
        self.calls.append({"prompt": prompt, **kw, "extra": {**kw["extra"], "messages": json.loads(json.dumps(kw["extra"]["messages"]))}})
        return self.script.pop(0) if len(self.script) > 1 else self.script[0]


@pytest.fixture(autouse=True)
def env(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")
    monkeypatch.setenv("AI_BOARD_CONTEXT_COMPACTION", "1")
    monkeypatch.setattr(tools, "_show", lambda *_a: PAGE)
    monkeypatch.setattr(tools, "run", lambda *_a, **_k: BIG)


def reads(k):
    return [native({"tool": "tree", "arguments": {"path": f"public/p{i}"}}, i) for i in range(k)]


def run(script):
    deps = Deps(script)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    return out, deps


def test_threshold_lives_in_contract():
    assert limits.loop()["compaction_tokens"] == 24000


def test_native_with_compaction_runs_and_keeps_calls_and_latest_result():
    out, deps = run([*reads(3), native(EDIT, 3), native(TEST, 4), native(FINISH, 5)])
    assert out["status"] == "proposed" and len(deps.compactions) == 1
    messages = deps.calls[3]["extra"]["messages"]
    calls = [m for m in messages if m["role"] == "assistant"]
    assert [m["tool_calls"][0]["id"] for m in calls] == ["call_0", "call_1", "call_2"]
    results = [m for m in messages if m["role"] == "tool"]
    assert [r["content"] == tool_loop.COMPACTED for r in results] == [True, True, False]
    assert "界界" in results[2]["content"]
    assert "UNTRUSTED_SUMMARY" in deps.calls[3]["prompt"] and "界界" not in deps.calls[3]["prompt"]


def test_latest_gate_error_is_never_compacted(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")
    ws_check = {"n": 0}

    def check(_out):
        ws_check["n"] += 1
        raise ValueError("GATE-ERR " + BIG)
    deps = Deps([native(EDIT, 0), native(TEST, 1), native(FINISH, 2), *reads(1), native(FINISH, 4)])
    tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=check)
    for call in deps.calls:
        tool_msgs = [m["content"] for m in call["extra"]["messages"] if m["role"] == "tool"]
        rejected = [c for c in tool_msgs if "GATE-ERR" in c]
        if rejected:
            assert rejected[-1] != tool_loop.COMPACTED
    assert any("GATE-ERR" in m["content"] for m in deps.calls[-1]["extra"]["messages"] if m["role"] == "tool")
    assert deps.compactions


def test_authority_text_stays_out_of_compacted_state():
    out, deps = run([*reads(3), native(EDIT, 3), native(TEST, 4), native(FINISH, 5)])
    assert "native" in tool_loop._pins(SUBTASK, "abc", tool_loop.Workspace(".", "abc", "public/a.html", PAGE), {"native": True, "compaction": "x"})
