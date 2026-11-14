"""LF/259: native tool calls keep their tool and arguments in the trace; an unparseable reply is recorded as an error."""
import json

from runtime import meter, tool_loop
from runtime.budget import Budget
from test_tool_call_id import Deps, PAGE, SUBTASK, native, setup  # noqa: F401


class MarkTrace:
    run_id, attempt = 7, 0

    def __init__(self):
        self.marks, self.calls = [], 0

    def add_span(self, *_, **__):
        pass

    def note(self, *_):
        pass

    def last_call_id(self):
        return "model-1"

    def mark_last(self, result, error=None):
        self.marks.append((result, error))


def test_output_text_carries_native_tool_and_decoded_arguments():
    body = native("read_file", {"file": "public/a.html"}, "p1")
    assert json.loads(meter.output_text(body)) == {"tool": "read_file", "arguments": {"file": "public/a.html"}}
    string_args = {"response": "", "tool_calls": [{"function": {"name": "tree", "arguments": '{"path": "public"}'}}]}
    assert json.loads(meter.output_text(string_args)) == {"tool": "tree", "arguments": {"path": "public"}}


def test_output_text_keeps_plain_reply_and_skips_multiple_calls():
    assert meter.output_text({"response": "hello"}) == "hello"
    two = {"response": "", "tool_calls": [{"function": {"name": "a"}}, {"function": {"name": "b"}}]}
    assert meter.output_text(two) == ""


def test_unparseable_reply_marks_the_model_call_as_error():
    deps = Deps([{"response": "not json at all"}])
    deps.trace = MarkTrace()
    try:
        tool_loop.run_subtask({**SUBTASK, "task_type": "x"}, PAGE, deps=deps, budget=Budget(max_model_calls=2), model="m",
                              source=".", sha="abc", check=lambda o: None)
    except IndexError:
        pass
    assert deps.trace.marks and deps.trace.marks[0][0] == "error"
