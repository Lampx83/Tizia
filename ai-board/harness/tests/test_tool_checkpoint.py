"""Tool-step checkpoint/resume: crash trước/sau ghi, kết quả chưa rõ, pin lệch, ledger cộng dồn. PG thật cần TEST_PG_URL."""
import json

import pytest

import tools
from providers.client import OllamaClient
from repositories.tool_steps import PgSteps, identity
from runtime import tool_loop
from runtime.budget import Budget
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps


class Crash(Exception):
    pass


class MemSteps:
    """Cùng giao diện PgSteps, giữ trong dict; `crash_on` = (method, step) nổ Crash để giả lập process chết."""

    def __init__(self, crash_on=None, shared=None):
        self.db = shared if shared is not None else {"pins": None, "ledger": None, "steps": {}}
        self.crash_on = crash_on

    def _hit(self, method, step):
        if self.crash_on == (method, step):
            raise Crash

    def identity(self, step, tool, args):
        return identity(1, 0, step, tool, args)

    def load(self):
        return {"pins": self.db["pins"], "ledger": self.db["ledger"],
                "steps": [dict(r) for _, r in sorted(self.db["steps"].items())]}

    def save_pins(self, pins):
        self.db["pins"] = json.loads(json.dumps(pins))

    def save_ledger(self, snapshot):
        self.db["ledger"] = dict(snapshot)

    def intent(self, step, tool, args):
        self._hit("intent", step)
        assert step not in self.db["steps"]
        self.db["steps"][step] = {"step": step, "identity": self.identity(step, tool, args), "tool": tool,
                                  "args": json.loads(json.dumps(args)), "status": "intent", "kind": None, "observation": None}

    def done(self, step, tool, args, observation, kind):
        self._hit("done", step)
        self.db["steps"][step] = {"step": step, "identity": self.identity(step, tool, args), "tool": tool,
                                  "args": json.loads(json.dumps(args)), "status": "done", "kind": kind,
                                  "observation": observation}

    def mark(self, step, status):
        self.db["steps"][step]["status"] = status

    def drop(self, step):
        del self.db["steps"][step]

    def reconcile(self, step, resolution, by):
        assert self.db["steps"][step]["status"] == "unknown"
        self.db["steps"][step]["status"] = {"applied": "applied", "not_applied": "void"}[resolution]


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def loop(script, store, budget=None, check=lambda out: None, pins=None):
    deps = Deps(script)
    budget = budget or Budget()
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc",
                                check=check, store=store, pins=pins)
    return out, budget, deps


def test_vllm_sends_tools_and_returns_native_tool_calls(monkeypatch):
    sent = []
    call = {"id": "c1", "type": "function", "function": {"name": "finish", "arguments": "{}"}}

    def post(self, path, payload, **kw):
        sent.append(payload)
        return {"choices": [{"message": {"content": None, "tool_calls": [call]}, "finish_reason": "tool_calls"}],
                "usage": {"prompt_tokens": 3, "completion_tokens": 2}}
    monkeypatch.setattr(OllamaClient, "_post", post)
    tools_spec = [{"type": "function", "function": {"name": "finish", "parameters": {"type": "object"}}}]
    body = OllamaClient(base_url="http://x", protocol="vllm").generate("m", "p", extra={"tools": tools_spec})
    assert sent[0]["tools"] == tools_spec and body["tool_calls"] == [call] and body["response"] == ""
    assert tool_loop.parse_request(body) == ("finish", {})
    OllamaClient(base_url="http://x", protocol="vllm").generate("m", "p")
    assert "tools" not in sent[1]


def test_resumed_budget_keeps_semantic_repairs_across_the_loop():
    def reject(out):
        raise ValueError("test sai")
    first = Budget()
    first.semantic_repairs = 2
    resumed = Budget.restore(first.snapshot())
    out, resumed, _ = loop([EDIT, TEST, FINISH], MemSteps(), budget=resumed, check=reject)
    assert (out["status"], out["failure_class"]) == ("blocked", "ordinary") and resumed.semantic_repairs == 3


def test_crash_after_write_before_ack_stops_as_unknown_then_resumes_without_double_apply():
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT, TEST, FINISH], MemSteps(crash_on=("done", 0), shared=db))
    assert db["steps"][0]["status"] == "intent"

    out, _, deps = loop([EDIT, TEST, FINISH], MemSteps(shared=db), budget=Budget())
    assert out["status"] == "blocked" and out["unknown_outcome"] == {"step": 0, "tool": "edit_file"}
    assert deps.prompts == [] and db["steps"][0]["status"] == "unknown"

    MemSteps(shared=db).reconcile(0, "applied", "operator")
    out, budget, deps = loop([TEST, FINISH], MemSteps(shared=db))
    assert out["status"] == "proposed" and out["out"]["code"].count("<p>B</p>") == 1
    assert len(deps.prompts) == 2 and "đã áp 1 edit" in deps.prompts[0]


def test_reconciled_as_not_applied_is_not_replayed():
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT], MemSteps(crash_on=("done", 0), shared=db))
    loop([EDIT], MemSteps(shared=db))
    MemSteps(shared=db).reconcile(0, "not_applied", "operator")
    out, _, deps = loop([EDIT, TEST, FINISH], MemSteps(shared=db))
    assert out["status"] == "proposed" and out["out"]["code"].count("<p>B</p>") == 1
    assert "bị hủy khi đối chiếu" in deps.prompts[0]


def test_crash_before_write_leaves_no_row_and_resume_does_not_reapply():
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT, TEST, FINISH], MemSteps(crash_on=("intent", 0), shared=db))
    assert db["steps"] == {}
    out, _, _ = loop([EDIT, TEST, FINISH], MemSteps(shared=db))
    assert out["status"] == "proposed" and out["out"]["code"].count("<p>B</p>") == 1


def test_resume_after_ack_replays_recorded_steps_and_keeps_the_ledger():
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT, TEST, FINISH], MemSteps(crash_on=("intent", 1), shared=db))
    assert db["ledger"]["model_calls"] == 2

    out, budget, deps = loop([TEST, FINISH], MemSteps(shared=db), budget=Budget())
    assert out["status"] == "proposed" and out["steps"] == ["edit_file", "write_test", "finish"]
    assert budget.model_calls == 4 and len(deps.prompts) == 2
    assert out["out"]["code"].count("<p>B</p>") == 1 and "đã áp 1 edit" in deps.prompts[0]


def test_resume_keeps_rejected_finish_repair_in_the_ledger():
    def reject(out):
        raise ValueError("test sai")
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT, TEST, FINISH, FINISH], MemSteps(crash_on=("done", 3), shared=db), check=reject)
    assert db["ledger"]["semantic_repairs"] == 2
    out, budget, _ = loop([FINISH], MemSteps(shared=db), budget=Budget(), check=reject)
    assert out["status"] == "blocked" and budget.semantic_repairs == 3


def test_incompatible_pins_stop_before_any_model_call():
    db = {"pins": None, "ledger": None, "steps": {}}
    with pytest.raises(Crash):
        loop([EDIT, TEST, FINISH], MemSteps(crash_on=("intent", 1), shared=db), pins={"pool": "a"})
    out, _, deps = loop([TEST, FINISH], MemSteps(shared=db), pins={"pool": "b"})
    assert out["status"] == "blocked" and "pool" in out["reason"] and deps.prompts == []


def test_pg_store_roundtrip_with_unknown_outcome(db_file):
    store = PgSteps(db_file, 7, 0)
    with pytest.raises(Crash):
        real_done = store.done
        store.done = lambda *a, **k: (_ for _ in ()).throw(Crash())
        try:
            loop([EDIT, TEST, FINISH], store)
        finally:
            store.done = real_done
    out, _, _ = loop([EDIT], PgSteps(db_file, 7, 0))
    assert out["unknown_outcome"]["step"] == 0
    PgSteps(db_file, 7, 0).reconcile(0, "applied", "operator")
    with pytest.raises(ValueError):
        PgSteps(db_file, 7, 0).reconcile(0, "applied", "operator")
    out, budget, _ = loop([TEST, FINISH], PgSteps(db_file, 7, 0))
    assert out["status"] == "proposed" and out["out"]["code"].count("<p>B</p>") == 1
    assert budget.model_calls >= 3
