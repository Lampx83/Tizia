"""Span OTel GenAI qua seam run_gate + tool loop: Deps.call_model thật, model fake trả body dạng vLLM client."""
import json

import pytest

import tools
from runtime import meter, pipeline, tool_loop
from runtime.budget import Budget
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST


class FakeVllm:
    protocol, gate3_model, gate3_model_light = "vllm", "qwen", "light"

    def __init__(self, script):
        self.script, self.extras = list(script), []

    def generate(self, model, prompt, format=None, extra=None, **options):
        self.extras.append(extra)
        item = self.script.pop(0)
        return {"choices": [{"finish_reason": "stop"}], "usage": {"prompt_tokens": 900, "completion_tokens": 40},
                "response": json.dumps(item), "done_reason": "stop", "prompt_eval_count": 900, "eval_count": 40,
                "_reasoning_chars": 0}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def test_gate_model_and_tool_steps_become_one_span_tree(monkeypatch):
    posted = []
    tracer = meter.Tracer()
    tracer.begin(7, lambda calls: None, posted.extend)
    deps = pipeline.Deps(models=FakeVllm([{"tool": "grep", "arguments": {"words": ["nope"]}}, EDIT, TEST, FINISH]),
                         notify=None, trace=tracer)

    def gate3(request, deps, budget, state, **_):
        out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="qwen", source=".", sha="abc",
                                    check=lambda _out: None, child=1, call_extra={"thinking": False})
        return {"gate": 3, "blocked": out["status"] != "proposed"}

    monkeypatch.setitem(pipeline._GATE_FNS, 3, gate3)
    assert pipeline.run_gate(3, {}, deps, Budget(), {})["blocked"] is False
    tracer.end_run("planned")
    tracer.flush()

    by_name = {}
    for span in posted:
        by_name.setdefault(span["name"].split(" ")[0], []).append(span)
    gate = next(s for s in posted if s["name"] == "invoke_agent gate 3")
    run = next(s for s in posted if s["name"] == "invoke_agent ai-board")
    assert {s["trace_id"] for s in posted} == {run["trace_id"]}
    assert run["parent_span_id"] is None and run["status"] == "ok" and run["attributes"]["tizia.outcome"] == "planned"
    assert gate["parent_span_id"] == run["span_id"] and gate["attributes"]["tizia.gate.status"] == "passed"

    chats, tools_ = by_name["chat"], by_name["execute_tool"]
    assert len(chats) == 4 and all(c["parent_span_id"] == gate["span_id"] and c["kind"] == "client" for c in chats)
    a = chats[0]["attributes"]
    assert a["gen_ai.provider.name"] == "vllm" and a["gen_ai.request.model"] == "qwen"
    assert (a["gen_ai.usage.input_tokens"], a["gen_ai.usage.output_tokens"]) == (900, 40)
    assert a["gen_ai.response.finish_reasons"] == ["stop"] and a["tizia.thinking"] is False
    assert a["gen_ai.request.temperature"] == 0 and a["gen_ai.request.max_tokens"] == 3072

    assert [t["attributes"]["gen_ai.tool.name"] for t in tools_] == ["grep", "edit_file", "write_test", "finish"]
    assert all(t["parent_span_id"] == gate["span_id"] for t in tools_)
    assert tools_[-1]["attributes"]["tizia.tool.status"] == "finish_ok"
    assert [t["attributes"]["tizia.step"] for t in tools_] == [0, 1, 2, 3]
    assert all(s["end_ms"] >= s["start_ms"] for s in posted)

    text = json.dumps(posted, ensure_ascii=False)
    assert "<p>B</p>" not in text and "Thêm dòng" not in text  # no prompt, completion or observation content


def test_gate_exception_closes_its_span_as_error(monkeypatch):
    posted = []
    tracer = meter.Tracer()
    tracer.begin(8, lambda calls: None, posted.extend)
    deps = pipeline.Deps(models=FakeVllm([]), notify=None, trace=tracer)
    monkeypatch.setitem(pipeline._GATE_FNS, 4, lambda *a, **k: (_ for _ in ()).throw(RuntimeError("boom")))
    with pytest.raises(RuntimeError):
        pipeline.run_gate(4, {}, deps, Budget(), {})
    tracer.end_run("failed")
    tracer.flush()
    gate = next(s for s in posted if s["name"] == "invoke_agent gate 4")
    assert gate["status"] == "error" and gate["attributes"]["tizia.error.type"] == "RuntimeError"
    assert next(s for s in posted if s["name"] == "invoke_agent ai-board")["status"] == "error"


def test_every_gate_leaves_one_timed_span_with_gate_id(monkeypatch):
    posted = []
    tracer = meter.Tracer()
    tracer.begin(9, lambda calls: None, posted.extend)
    deps = pipeline.Deps(models=FakeVllm([]), notify=None, trace=tracer)
    gates = (1, 2.5, 3, 4, 5.5)
    for number in gates:
        monkeypatch.setitem(pipeline._GATE_FNS, number, lambda *a, _n=number, **k: {"gate": _n, "blocked": _n == 4, "outcome": "x" if _n == 4 else None})
    for number in gates:
        pipeline.run_gate(number, {}, deps, Budget(), {})
    tracer.end_run("blocked")
    tracer.flush()

    run = next(s for s in posted if s["name"] == "invoke_agent ai-board")
    spans = [s for s in posted if "tizia.gate.id" in s["attributes"]]
    assert [s["attributes"]["tizia.gate.id"] for s in spans] == list(gates)
    assert all(s["parent_span_id"] == run["span_id"] and s["status"] == "ok" for s in spans)
    assert all(s["start_ms"] <= s["end_ms"] for s in spans)
    statuses = {s["attributes"]["tizia.gate.id"]: s["attributes"]["tizia.gate.status"] for s in spans}
    assert statuses == {1: "passed", 2.5: "passed", 3: "passed", 4: "blocked", 5.5: "passed"}
    assert next(s for s in spans if s["attributes"]["tizia.gate.id"] == 4)["attributes"]["tizia.gate.outcome"] == "x"
