"""Literal của yêu cầu chèn bằng tên hằng khi cờ bật; cờ tắt giữ nguyên hành vi."""
import json

import pytest

import tools
from runtime import tool_loop
from runtime.budget import Budget

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "t", "file": "public/a.html", "verify": "v"}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "// public/a.html\n"}}
FINISH = {"tool": "finish", "arguments": {}}
REQUEST = 'Add the text "Hello there." and the label \'Next -> Step\' to the page.'


def edit(text):
    return {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": text}]}}


class Deps:
    def __init__(self, script):
        self.script, self.prompts = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        self.prompts.append(prompt)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def run(script, request=REQUEST):
    deps = Deps(script)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                                check=lambda out: None, request_text=request)
    return out, deps


def test_flag_on_lists_constants_and_inserts_verbatim(monkeypatch):
    monkeypatch.setenv("AI_BOARD_LITERAL_BY_REFERENCE", "1")
    out, deps = run([edit("<p>{{LIT_1}}</p><b>{{LIT_2}}</b>"), TEST, FINISH])
    assert "LIT_1" in deps.prompts[0] and "Hello there." in deps.prompts[0]
    assert "<p>Hello there.</p><b>Next -> Step</b>" in out["out"]["code"]


def test_unknown_constant_is_an_observation_error(monkeypatch):
    monkeypatch.setenv("AI_BOARD_LITERAL_BY_REFERENCE", "1")
    out, deps = run([edit("{{LIT_9}}"), edit("{{LIT_1}}"), TEST, FINISH])
    assert "LIT_9" in deps.prompts[1] and "unknown" in deps.prompts[1].lower()
    assert "Hello there." in out["out"]["code"] and "LIT_9" not in out["out"]["code"]


def test_other_braces_are_untouched(monkeypatch):
    monkeypatch.setenv("AI_BOARD_LITERAL_BY_REFERENCE", "1")
    out, _ = run([edit("{{name}}"), TEST, FINISH])
    assert "{{name}}" in out["out"]["code"]


def test_flag_off_is_unchanged(monkeypatch):
    monkeypatch.delenv("AI_BOARD_LITERAL_BY_REFERENCE", raising=False)
    out, deps = run([edit("{{LIT_1}}"), TEST, FINISH])
    assert "LIT_1" not in deps.prompts[0]
    assert "{{LIT_1}}" in out["out"]["code"]


def test_manifest_hash_unchanged_by_flag(monkeypatch):
    before = tool_loop.MANIFEST.hash
    monkeypatch.setenv("AI_BOARD_LITERAL_BY_REFERENCE", "1")
    assert tool_loop.MANIFEST.hash == before
