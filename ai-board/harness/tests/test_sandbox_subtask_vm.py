"""Subtask-scoped VM for run_in_sandbox: fake RunnerClient, staging stubbed, no real VM or git."""
import json

import pytest

from runtime import sandbox_tool, tool_loop
from runtime.budget import Budget, ChildBudget
from runtime.tool_loop import Forbidden
from verification.sandbox import SandboxError
from tests.test_sandbox_tool import ALLOWED, OK, FakeClient, FakeTrace, stage_without_git  # noqa: F401

FLAG = "AI_BOARD_SANDBOX_SUBTASK_VM"


class UploadClient(FakeClient):
    def __init__(self, outcomes=()):
        super().__init__(outcomes)
        self.uploads = 0

    def upload(self, run_id, archive, **_):
        self.uploads += 1
        return {}


def kept(client, **kw):
    return sandbox_tool.Runner("repo", "abc", client=client, lease_ok=kw.pop("lease_ok", lambda: True), kept=True, **kw)


def test_flag_default_off_and_runner_follows_it(monkeypatch):
    assert sandbox_tool.Runner("repo", "abc", client=FakeClient()).kept is False
    monkeypatch.setenv(FLAG, "1")
    assert sandbox_tool.Runner("repo", "abc", client=FakeClient()).kept is True


def test_many_execs_share_one_vm_destroyed_on_close():
    client = UploadClient()
    runner = kept(client)
    for _ in range(3):
        assert json.loads(runner(ALLOWED, {"test/a.test.js": "x"}))["rc"] == 0
    assert len(client.created) == 1 and len(client.execs) == 3 and client.destroyed == []
    runner.close()
    assert client.destroyed == client.created


def test_edited_drafts_are_uploaded_before_exec_unchanged_are_not():
    client = UploadClient()
    runner = kept(client)
    runner(ALLOWED, {"test/a.test.js": "x"})
    base = client.uploads
    runner(ALLOWED, {"test/a.test.js": "x"})
    assert client.uploads == base
    runner(ALLOWED, {"test/a.test.js": "y"})
    assert client.uploads == base + 1
    runner.close()


def test_refused_argv_opens_no_vm():
    client = UploadClient()
    with pytest.raises(sandbox_tool.Refused):
        kept(client)(["sh", "-c", "ls"], {})
    assert client.created == []


def test_close_is_idempotent_and_safe_without_a_vm():
    client = UploadClient()
    runner = kept(client)
    runner.close()
    runner(ALLOWED, {})
    runner.close()
    runner.close()
    assert client.destroyed == client.created and len(client.created) == 1


def test_lease_lost_destroys_vm_and_next_call_gets_a_fresh_one():
    state = {"ok": True}
    client = UploadClient()
    runner = kept(client, lease_ok=lambda: state["ok"])
    runner(ALLOWED, {})
    state["ok"] = False
    out = json.loads(runner(ALLOWED, {}))
    assert out["error"] == "lease_lost"
    assert client.destroyed == client.created
    state["ok"] = True
    assert json.loads(runner(ALLOWED, {}))["rc"] == 0
    assert len(client.created) == 2
    runner.close()
    assert set(client.created) <= set(client.destroyed)


def test_transient_error_replaces_the_vm_and_retries():
    client = UploadClient([SandboxError("runner_unreachable", "exec", 503), OK])
    runner = kept(client)
    assert json.loads(runner(ALLOWED, {}))["rc"] == 0
    assert len(client.created) == 2 and client.destroyed == client.created[:1]
    runner.close()
    assert set(client.created) <= set(client.destroyed)


def test_unconfirmed_teardown_on_close_raises():
    class Stuck(UploadClient):
        def destroy(self, run_id, **_):
            return {"state": "destroying"}

    runner = kept(Stuck())
    runner(ALLOWED, {})
    with pytest.raises(sandbox_tool.CleanupUnconfirmed):
        runner.close()


def test_vm_seconds_charged_to_gpu_meter_on_close():
    class Trace(FakeTrace):
        gpu = 0.0

        def add_gpu_s(self, seconds):
            self.gpu += seconds

    trace = Trace()
    runner = kept(UploadClient(), trace=trace)
    runner(ALLOWED, {})
    runner._opened -= 7.5
    runner.close()
    assert 7.5 <= trace.gpu < 9


def test_vm_deadline_follows_the_loop_budget():
    budget = ChildBudget(Budget(), max_wall_clock_s=50)
    assert 0 < budget.remaining_s() <= 50


def test_run_subtask_closes_the_vm_even_when_the_loop_fails(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    monkeypatch.setenv(FLAG, "1")
    closed = []
    monkeypatch.setattr(sandbox_tool.Runner, "close", lambda self: closed.append(self))
    monkeypatch.setattr(tool_loop, "_run_subtask", lambda *a, **kw: kw["sandbox_runners"].append(
        sandbox_tool.Runner("repo", "abc", client=FakeClient())) or (_ for _ in ()).throw(RuntimeError("boom")))
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)
    with pytest.raises(RuntimeError):
        tool_loop.run_subtask({"task_type": "t"}, None, deps=object(), budget=Budget(), source=".", sha="abc")
    assert len(closed) == 1


def test_cleanup_unconfirmed_at_subtask_end_blocks_result(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)

    def loop(*a, **kw):
        kw["sandbox_runners"].append(sandbox_tool.Runner("repo", "abc", client=FakeClient()))
        return {"status": "proposed"}

    def boom(self):
        raise sandbox_tool.CleanupUnconfirmed("x")

    monkeypatch.setattr(tool_loop, "_run_subtask", loop)
    monkeypatch.setattr(sandbox_tool.Runner, "close", boom)
    out = tool_loop.run_subtask({"task_type": "t"}, None, deps=object(), budget=Budget(), source=".", sha="abc")
    assert out["status"] == "blocked" and out["failure_class"] == "critical"
