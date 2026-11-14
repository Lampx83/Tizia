"""LF/258: model timeout, tool timeout, unexpected tool exception and sandbox timeout become classified observations; the loop never raises."""
import json
import time
import urllib.error

import pytest

from runtime import tool_loop
from runtime.budget import Budget
from test_gate_feedback_cap import _execution
from test_sandbox_tool import OK
from test_tool_call_id import ARGVS, OUTCOMES, PAGE, SUBTASK, Deps, RUNNERS, native, setup  # noqa: F401
from test_tool_checkpoint import MemSteps

READ = native("read_file", {"file": "public/a.html"})


def run(deps, store=None):
    return tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                                 check=lambda o: None, store=store)


def classes(deps, only_errors=True):
    return [(a["tizia.tool.error_class"], a["tizia.tool.error_kind"]) for n, a in deps.trace.spans
            if n.startswith("execute_tool") and (a["tizia.tool.error_class"] or not only_errors)]


class Failing(Deps):
    """Replays the script, then raises `error` instead of answering."""

    def __init__(self, error, script=()):
        super().__init__(script)
        self.error = error

    def call_model(self, model, prompt, **kw):
        if not self.script:
            raise self.error
        return super().call_model(model, prompt, **kw)


@pytest.mark.parametrize("error, kind", [(TimeoutError("read timed out"), "timeout"),
                                         (urllib.error.URLError("refused"), "io")])
def test_model_call_failure_stops_clean_as_transient_infra(error, kind):
    deps, store = Failing(error, [READ]), MemSteps()
    out = run(deps, store)
    assert out["status"] == "blocked" and out["failure_class"] == "transient"
    assert out["error_class"] == "infra" and out["error_kind"] == kind and out["steps"] == ["read_file"]
    row = store.db["steps"][1]
    assert row["tool"] == "model_call" and row["kind"] == "infra_error" and row["observation"].startswith(f"[infra/{kind}]")
    assert classes(deps) == [("infra", kind)]
    [span] = [a for n, a in deps.trace.spans if a["tizia.tool.error_class"]]
    assert span["gen_ai.tool.call.id"] == row["call_id"] and span["tizia.model_call_id"]


def test_first_model_call_timeout_also_stops_clean():
    out = run(Failing(TimeoutError("t")))
    assert out["status"] == "blocked" and out["failure_class"] == "transient" and out["steps"] == []


class Clock:
    """Every reading jumps 1000 s: each tool looks past its ceiling."""

    def __init__(self):
        self.now = 0

    def monotonic(self):
        self.now += 1000
        return self.now

    time = staticmethod(time.time)


def test_tool_timeout_is_an_infra_observation_and_repeats_do_not_stop_the_loop(monkeypatch):
    monkeypatch.setattr(tool_loop, "time", Clock())
    deps, store = Deps([READ] * 6), MemSteps()
    with pytest.raises(IndexError):  # six identical timed-out calls: no repeated-failure stop, the script just ends
        run(deps, store)
    rows = [store.db["steps"][i] for i in range(6)]
    assert {r["kind"] for r in rows} == {"infra_error"} and "vượt trần thời gian" in rows[0]["observation"]
    assert set(classes(deps)) == {("infra", "timeout")}


@pytest.mark.parametrize("error, klass, kind, failure_class", [(OSError("disk"), "infra", "io", "transient"),
                                                               (KeyError("x"), "product", "exception", "critical")])
def test_unexpected_tool_exception_is_classified_and_stops_clean(monkeypatch, error, klass, kind, failure_class):
    monkeypatch.setattr(tool_loop.Workspace, "_run", lambda self, name, args: (_ for _ in ()).throw(error))
    deps, store = Deps([READ]), MemSteps()
    out = run(deps, store)
    assert out["status"] == "blocked" and out["failure_class"] == failure_class
    assert (out["error_class"], out["error_kind"]) == (klass, kind) and out["steps"] == []
    row = store.db["steps"][0]
    assert row["tool"] == "read_file" and row["observation"].startswith(f"[{klass}/{kind}]")
    assert classes(deps) == [(klass, kind)]


def test_failed_write_tool_restores_the_draft(monkeypatch):
    monkeypatch.setattr(tool_loop.file_context, "apply_edits", lambda *a, **k: (_ for _ in ()).throw(OSError("boom")))
    ws = tool_loop.Workspace(".", "abc", "public/a.html", PAGE)
    ws.content = "changed"
    with pytest.raises(OSError):
        ws.run("edit_file", {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]})
    assert ws.content == "changed"


def test_sandbox_timeout_is_a_visible_infra_observation_distinct_from_truncation():
    OUTCOMES[:] = [{**OK, "code": None, "timed_out": True}] * 3
    deps, store = Deps([native(tool_loop.sandbox_tool.NAME, {"argv": ARGVS[0]})]), MemSteps()
    with pytest.raises(IndexError):
        run(deps, store)
    observed = json.loads(store.db["steps"][0]["observation"])
    assert observed["timed_out"] is True and observed["truncated"] is False
    assert store.db["steps"][0]["kind"] == "infra_error" and RUNNERS[0].receipts[0]["timed_out"] is True
    assert classes(deps) == [("infra", "timeout")]
    assert [a["tizia.sandbox.timed_out"] for n, a in deps.trace.spans if n == "sandbox_exec"] == [True]


def test_product_errors_are_classified_per_tool():
    deps = Deps([native("read_file", {"file": "../etc/passwd"})])
    out = run(deps)
    assert out["status"] == "blocked" and out["failure_class"] == "critical"
    assert classes(deps) == [("product", "path")]
    args = Deps([native("read_file", {"file": 5}), READ])
    with pytest.raises(IndexError):
        run(args)
    assert classes(args) == [("product", "args")]


def test_a_transient_stop_never_enters_the_repeat_feedback_cap(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GATE_FEEDBACK_CAP", "1")
    execution = _execution()
    execution.kind = "transient"
    execution.gates.append({"gate": 3, "reason": "model call failed", "failure_class": "transient"})
    assert execution.repair_check() == "done" and execution.feedback_stop is None and execution.repairs == []
