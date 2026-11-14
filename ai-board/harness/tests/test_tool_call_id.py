"""LF/257: one tool_call_id across messages, tool_step rows, execute_tool spans, sandbox receipts and the model call link."""
import json

import pytest

import tools
from runtime import sandbox_tool, tool_loop
from runtime.budget import Budget
from test_sandbox_tool import FakeClient
from test_tool_checkpoint import MemSteps

RUNNERS: list = []
OUTCOMES: list = []
PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "t", "file": "public/a.html", "verify": "v", "task_type": "backend"}
ARGVS = [["node", "--test", "test/a.test.js"], ["node", "--check", "public/a.js"], ["node", "--test", "test/b.test.js"]]


def native(name, args, provider_id=None):
    call = {"type": "function", "function": {"name": name, "arguments": json.dumps(args)}}
    return {"response": "", "tool_calls": [{**call, "id": provider_id} if provider_id else call]}


class Trace:
    run_id, attempt = 7, 0

    def __init__(self):
        self.spans, self.calls = [], 0

    def add_span(self, name, attributes, **_):
        self.spans.append((name, attributes))

    def note(self, *_):
        pass

    def last_call_id(self):
        return f"model-{self.calls}"


class Deps:
    def __init__(self, script):
        self.script, self.trace = list(script), Trace()

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        self.trace.calls += 1
        return self.script.pop(0)


@pytest.fixture(autouse=True)
def setup(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    monkeypatch.setenv("AI_BOARD_TOOL_NATIVE", "1")
    monkeypatch.setattr(sandbox_tool, "_stage", lambda *a: None)
    real = sandbox_tool.Runner
    RUNNERS.clear()
    OUTCOMES.clear()
    monkeypatch.setattr(sandbox_tool, "Runner", lambda *a, **k: RUNNERS.append(real(*a, client=FakeClient(list(OUTCOMES)), **k)) or RUNNERS[-1])


def test_three_tools_show_each_id_once_in_every_store():
    calls = [native(tool_loop.sandbox_tool.NAME, {"argv": argv}, "p1" if i == 0 else None) for i, argv in enumerate(ARGVS)]
    deps, store, receipts, seen = Deps(calls), MemSteps(), [], []
    with pytest.raises(IndexError):  # script exhausted after the third tool
        tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                              check=lambda o: None, store=store)
    receipts = RUNNERS[0].receipts
    assert len(receipts) == 3
    ids = [r["tool_call_id"] for r in receipts]
    assert ids[0] == "p1" and ids[1:] == ["tc:run7:g3:c0:a0:s1", "tc:run7:g3:c0:a0:s2"]
    rows = {row["call_id"] for row in store.db["steps"].values()}
    spans = {a["gen_ai.tool.call.id"]: a for n, a in deps.trace.spans if n.startswith("execute_tool")}
    sandbox_spans = [a["tizia.tool_call_id"] for n, a in deps.trace.spans if n == "sandbox_exec"]
    assert set(ids) <= rows and set(ids) <= set(spans) and sandbox_spans == ids
    assert len(store.db["steps"]) == len(rows) == 3 and len(spans) == 3
    assert [spans[i]["tizia.model_call_id"] for i in ids] == ["model-1", "model-2", "model-3"]


def test_message_history_carries_the_same_ids_for_calls_and_results():
    calls = [native("read_file", {"file": "public/a.html"}, "p1"), native("nope", {}, "p2"),
             native("read_file", {"file": "public/a.html", "start_line": 1}), native("tree", {})]
    seen = []
    deps = Deps(calls)
    original = deps.call_model
    deps.call_model = lambda *a, **k: seen.append(list(k["extra"]["messages"])) or original(*a, **k)
    tool_loop.run_subtask({**SUBTASK, "task_type": "x"}, PAGE, deps=deps, budget=Budget(max_model_calls=4), model="m",
                          source=".", sha="abc", check=lambda o: None)
    history = seen[-1]
    made = [c["id"] for m in history for c in m.get("tool_calls", [])]
    answered = [m["tool_call_id"] for m in history if m["role"] == "tool"]
    assert made == answered == ["p1", "p2", "tc:run7:g3:c0:a0:s2"]


def test_text_path_observation_header_carries_the_id(monkeypatch):
    monkeypatch.delenv("AI_BOARD_TOOL_NATIVE")
    prompts = []

    class TextDeps(Deps):
        def call_model(self, model, prompt, **kw):
            prompts.append(prompt)
            return super().call_model(model, prompt, **kw)
    deps = TextDeps([{"response": json.dumps({"tool": "read_file", "arguments": {"file": "public/a.html"}})},
                     {"response": "{}"}])
    tool_loop.run_subtask({**SUBTASK, "task_type": "x"}, PAGE, deps=deps, budget=Budget(max_model_calls=2), model="m",
                          source=".", sha="abc", check=lambda o: None)
    assert "TOOL RESULT read_file [tc:run7:g3:c0:a0:s0]" in prompts[1]


def test_provider_id_is_reused_only_when_clean_and_unseen():
    mint = lambda pid, seen=(): tool_loop.tool_call_id(pid, run=1, gate=3, child=2, attempt=0, step=5, seen=seen)
    assert mint("call_abc") == "call_abc"
    assert mint("call_abc", {"call_abc"}) == mint(None) == "tc:run1:g3:c2:a0:s5"
    assert mint("has space and, content!") == mint(None)
