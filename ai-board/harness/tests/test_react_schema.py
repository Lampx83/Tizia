"""AI_BOARD_REACT_SCHEMA (default off): json_schema reply + `thought` on both paths, fallback on a provider without schema support."""
import json
import urllib.error

import pytest

import tools
from providers.client import OllamaClient
from runtime import tool_loop
from runtime.budget import Budget

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';\n// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}
SCRIPT = [EDIT, TEST, FINISH]


class Trace:
    run_id, attempt = 1, 0

    def __init__(self):
        self.spans, self.notes = [], []

    def add_span(self, name, attributes, **_):
        self.spans.append((name, attributes))

    def note(self, kind, name, summary="", data=None):
        self.notes.append((kind, name, summary))

    def last_call_id(self):
        return None


def reply(call, thought=None, native=False, n=0):
    if native:
        args = {**({"thought": thought} if thought else {}), **call["arguments"]}
        return {"response": "", "tool_calls": [{"id": f"c{n}", "type": "function",
                "function": {"name": call["tool"], "arguments": json.dumps(args)}}]}
    return {"response": json.dumps({**({"thought": thought} if thought else {}), **call})}


class Deps:
    """Fake model; `reject` = provider that answers HTTP 400 to a schema / tool_choice request."""

    def __init__(self, script, reject=False):
        self.script, self.calls, self.reject, self.trace = list(script), [], reject, Trace()

    def call_model(self, model, prompt, *, budget, format=None, extra=None, **kw):
        self.calls.append({"prompt": prompt, "format": format, "extra": extra or {}})
        if self.reject and (isinstance(format, dict) or (extra or {}).get("tool_choice")):
            raise urllib.error.HTTPError("http://m/v1", 400, "bad request", {}, None)
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        return self.script.pop(0) if len(self.script) > 1 else self.script[0]


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def run(script, reject=False):
    deps = Deps(script, reject)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    return out, deps


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REACT_SCHEMA", "1")


@pytest.fixture
def native_on(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")


def thoughts(deps):
    return [a["tizia.thought"] for name, a in deps.trace.spans if "tizia.thought" in a]


def test_default_off_keeps_json_object_and_no_thought():
    assert tool_loop.schema_enabled() is False
    out, deps = run([reply(c, "t") for c in SCRIPT])
    assert out["status"] == "proposed"
    assert all(c["format"] == "json" and "THOUGHT" not in c["prompt"] and "`thought`" not in c["prompt"] for c in deps.calls)
    assert thoughts(deps) == []


def test_text_on_sends_schema_over_every_manifest_tool_and_traces_thought(on):
    out, deps = run([reply(c, f"step {i}") for i, c in enumerate(SCRIPT)])
    schema = deps.calls[0]["format"]
    branches = {b["properties"]["tool"]["const"]: b for b in schema["anyOf"]}
    assert set(branches) == set(tool_loop.MANIFEST.tools) and {"request_package", "fetch_url", "read_skill_resource"} <= set(branches)
    for name, branch in branches.items():
        assert branch["properties"]["arguments"] == tool_loop.MANIFEST.tools[name].parameters
        assert branch["required"][0] == "thought" and branch["properties"]["thought"]["maxLength"] == tool_loop.THOUGHT_MAX
    assert out["status"] == "proposed" and thoughts(deps) == ["step 0", "step 1", "step 2"]


def test_pair_off_on_same_proposal_native_and_text(monkeypatch):
    off, _ = run([reply(c) for c in SCRIPT])
    monkeypatch.setenv("AI_BOARD_REACT_SCHEMA", "1")
    text, _ = run([reply(c, "x") for c in SCRIPT])
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")
    nat, _ = run([reply(c, "x", True, i) for i, c in enumerate(SCRIPT)])
    assert off["out"] == text["out"] == nat["out"] and off["steps"] == text["steps"] == nat["steps"]


def test_thought_is_capped_redacted_and_missing_thought_is_still_valid(on):
    long = "a" * 900
    out, deps = run([reply(EDIT, long), reply(TEST), reply(FINISH, "ok")])
    assert out["status"] == "proposed"
    assert thoughts(deps) == ["a" * tool_loop.THOUGHT_MAX, "ok"]


def test_native_on_adds_thought_arg_and_required_tool_choice(native_on):
    out, deps = run([reply(c, "why", True, i) for i, c in enumerate(SCRIPT)])
    extra = deps.calls[0]["extra"]
    assert deps.calls[0]["format"] is None and extra["tool_choice"] == "required"
    assert [t["function"]["name"] for t in extra["tools"]] == list(tool_loop.MANIFEST.tools)
    for t in extra["tools"]:
        params = t["function"]["parameters"]
        assert params["required"][0] == "thought" and "thought" in params["properties"]
        assert "thought" not in tool_loop.MANIFEST.tools[t["function"]["name"]].parameters["properties"]
    assert out["status"] == "proposed" and thoughts(deps) == ["why"] * 3


def test_native_thought_is_rejected_when_flag_off(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")
    with pytest.raises(tool_loop.ToolError):
        name, args = tool_loop.parse_request(reply(EDIT, "t", True))
        tool_loop.validate(name, args)


def test_text_provider_without_schema_falls_back_with_trace_note(on):
    out, deps = run([reply(c, "t") for c in SCRIPT], reject=True)
    assert out["status"] == "proposed"
    assert isinstance(deps.calls[0]["format"], dict) and all(c["format"] == "json" for c in deps.calls[1:])
    assert [n[1] for n in deps.trace.notes] == ["react_schema_fallback"]


def test_native_provider_without_tool_choice_falls_back_once(native_on):
    out, deps = run([reply(c, None, True, i) for i, c in enumerate(SCRIPT)], reject=True)
    assert out["status"] == "proposed"
    assert deps.calls[0]["extra"].get("tool_choice") == "required" and not any("tool_choice" in c["extra"] for c in deps.calls[1:])
    assert all("thought" not in t["function"]["parameters"]["properties"] for t in deps.calls[1]["extra"]["tools"])
    assert len(deps.trace.notes) == 1


def test_other_http_errors_are_not_treated_as_schema_rejection(on):
    class Down(Deps):
        def call_model(self, *a, **k):
            raise urllib.error.HTTPError("http://m", 500, "boom", {}, None)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=Down(SCRIPT), budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    assert out["status"] == "blocked" and out["failure_class"] == "transient"


def test_client_vllm_sends_json_schema_and_tool_choice(monkeypatch):
    seen = {}
    monkeypatch.setattr(OllamaClient, "_post", lambda self, path, payload, retry=False: seen.update(payload) or {
        "choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}], "usage": {}})
    schema = {"type": "object"}
    OllamaClient(base_url="http://127.0.0.1:8037/v1", protocol="vllm").generate(
        "m", "hi", format=schema, extra={"tools": [{"type": "function", "function": {"name": "t"}}], "tool_choice": "required"})
    assert seen["response_format"]["type"] == "json_schema" and seen["response_format"]["json_schema"]["schema"] == schema
    assert seen["tool_choice"] == "required"
