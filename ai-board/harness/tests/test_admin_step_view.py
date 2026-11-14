"""Native tool calls keep their tool and arguments in the trace; an unparseable reply is recorded as an error."""
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


def test_http_checkpoint_sends_call_id_on_intent_and_done():
    from repositories.server_checkpoint import HttpSteps

    sent = []

    class Client:
        def post(self, url, body):
            sent.append(body)
            return {}

    steps = HttpSteps(Client(), "http://server/checkpoint", {"worker_id": "w", "lease_token": "t"}, 123, 0, "ticket-7:r")
    steps.intent(1, "write_file", {"file": "a"}, "tc:1")
    steps.done(1, "write_file", {"file": "a"}, "ok", "ok", "tc:1")
    assert [body["call_id"] for body in sent] == ["tc:1", "tc:1"]
