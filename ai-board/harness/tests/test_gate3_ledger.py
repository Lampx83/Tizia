"""Gate 3 (cờ model_first): sổ nối/vị trí trong finish, kiểm bằng chứng từ chính các lần đọc của subtask. Model fake."""
import json

import pytest

import tools
from runtime import tool_loop
from runtime.budgets.budget import Budget

INDEX = "<main>\n<h1>A</h1>\n</main>\n"
NEW = {"title": "Trang mới", "file": "public/notes.html", "verify": "thấy ghi chú"}
OLD = {"title": "Sửa chữ", "file": "public/index.html", "verify": "thấy B"}
OUTLINE = {"tool": "outline", "arguments": {"file": "public/index.html"}}
EDIT_NEW = {"tool": "edit_file", "arguments": {"file": "public/notes.html", "edits": [{"after_line": 0, "insert": "<h1>Ghi chú</h1>"}]}}
EDIT_OLD = {"tool": "edit_file", "arguments": {"file": "public/index.html", "edits": [{"after_line": 1, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/x.test.js", "test": "t"}}
WIRED = {"step_id": 0, "tool_output_excerpt": "css liên kết: (không có file .css"}


@pytest.fixture(autouse=True)
def base(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda source, sha, path: None if path == "public/notes.html" else INDEX)


class Deps:
    def __init__(self, script):
        self.script, self.prompts = list(script), []

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        self.prompts.append(prompt)
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item)}


def finish(decisions=None):
    return {"tool": "finish", "arguments": {} if decisions is None else {"decisions": decisions}}


def new_file(evidence, kind="new_file"):
    return [{"decision": kind, "target": "public/notes.html", "evidence": evidence, "rejected": []}]


def run(subtask, current, script):
    deps = Deps(script)
    out = tool_loop.run_subtask(subtask, current, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda _out: None)
    return out, deps


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_MODEL_FIRST", "1")


def test_new_file_with_wiring_evidence_from_its_own_read_is_accepted(on):
    out, deps = run(NEW, None, [OUTLINE, EDIT_NEW, TEST, finish(new_file([WIRED]))])
    assert out["status"] == "proposed", out
    assert out["ledger"][0]["target"] == "public/notes.html"
    assert "[step 0]" in deps.prompts[1] and "DECISION LEDGER" in deps.prompts[0]


def test_new_file_without_a_ledger_goes_back_to_the_model_in_the_loop(on):
    out, deps = run(NEW, None, [OUTLINE, EDIT_NEW, TEST, finish(), finish(new_file([WIRED]))])
    assert out["status"] == "proposed" and "thiếu decisions" in deps.prompts[-1]


SELF = {"tool": "outline", "arguments": {"file": "public/notes.html"}}


@pytest.mark.parametrize("reads,evidence,why", [
    ([OUTLINE], [{"step_id": 9, "tool_output_excerpt": "css liên kết"}], "step_id 9"),
    ([OUTLINE], [{"step_id": 0, "tool_output_excerpt": "không có trong kết quả"}], "nguyên văn"),
    ([OUTLINE, SELF], [{"step_id": 1, "tool_output_excerpt": "chưa tồn tại ở base"}], "bằng chứng nối"),
])
def test_wrong_or_unwired_evidence_is_returned_then_accepted(on, reads, evidence, why):
    out, deps = run(NEW, None, [*reads, EDIT_NEW, TEST, finish(new_file(evidence)), finish(new_file([WIRED]))])
    assert out["status"] == "proposed", out
    assert why in deps.prompts[-1]


def test_evidence_that_stays_wrong_does_not_ship(on):
    bad = finish(new_file([{"step_id": 9, "tool_output_excerpt": "css liên kết"}]))
    out, _ = run(NEW, None, [OUTLINE, EDIT_NEW, TEST, bad])
    assert out["status"] in ("blocked", "paused") and out["failure_class"] in ("ordinary", "budget")


def test_editing_an_existing_file_needs_no_ledger_but_a_given_one_is_checked(on):
    out, _ = run(OLD, INDEX, [EDIT_OLD, TEST, finish()])
    assert out["status"] == "proposed" and "ledger" not in out
    bad = [{"decision": "placement", "target": "public/index.html", "evidence": [{"step_id": 7, "tool_output_excerpt": "x"}], "rejected": []}]
    out, deps = run(OLD, INDEX, [EDIT_OLD, TEST, finish(bad), finish()])
    assert out["status"] == "proposed" and "step_id 7" in deps.prompts[-1]


def test_flag_off_loop_is_unchanged(monkeypatch):
    monkeypatch.delenv("AI_BOARD_MODEL_FIRST", raising=False)
    out, deps = run(NEW, None, [OUTLINE, EDIT_NEW, TEST, finish()])
    assert out["status"] == "proposed" and "ledger" not in out
    assert not any("DECISION LEDGER" in p or "[step" in p for p in deps.prompts)
    out, deps = run(NEW, None, [OUTLINE, EDIT_NEW, TEST, finish(new_file([WIRED])), finish()])
    assert out["status"] == "proposed" and "vượt trần 100 byte" in deps.prompts[4]
