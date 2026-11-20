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
    runner._charged_at -= 7.5
    runner.close()
    assert 7.5 <= trace.gpu < 9


def test_vm_deadline_follows_the_loop_budget_through_run_subtask(monkeypatch):
    from tests import test_tool_loop as base
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)
    seen = {}

    class Stop(Exception):
        pass

    class Recorder:
        kept = True

        def __init__(self, *a, **kw):
            seen.update(kw)
            raise Stop

    monkeypatch.setattr(sandbox_tool, "Runner", Recorder)
    monkeypatch.setattr(tool_loop.tools, "_show", lambda *a: base.PAGE)
    with pytest.raises(Stop):
        tool_loop.run_subtask(base.SUBTASK, base.PAGE, deps=base.Deps([]), budget=Budget(max_wall_clock_s=60), model="m",
                              source=".", sha="abc", check=lambda _o: None)
    assert 0 < seen["remaining"]() <= 60


def test_no_vm_is_created_when_no_time_remains():
    client = UploadClient()
    out = json.loads(kept(client, remaining=lambda: 0)(ALLOWED, {}))
    assert out["error"] == "wall_clock_s" and client.created == []


def test_vm_expiry_is_reported_as_wall_clock_not_lease_lost():
    client = UploadClient()
    state = {"ok": True}
    runner = kept(client, lease_ok=lambda: state["ok"])
    runner(ALLOWED, {})
    state["ok"] = False
    runner._deadline = 1.0
    assert json.loads(runner(ALLOWED, {}))["error"] == "wall_clock_s"


def test_dropped_draft_path_gets_a_fresh_vm():
    client = UploadClient()
    runner = kept(client)
    runner(ALLOWED, {"a.html": "x", "test/a.test.js": "t"})
    runner(ALLOWED, {"a.html": "x", "test/b.test.js": "t"})
    assert len(client.created) == 2 and client.destroyed == client.created[:1]
    runner.close()


def test_failed_create_is_not_charged_and_charge_goes_to_the_budget_ledger():
    class Trace(FakeTrace):
        gpu = 0.0

        def add_gpu_s(self, seconds):
            self.gpu += seconds

    class NoCreate(UploadClient):
        def create(self, *a, **kw):
            raise SandboxError("bad_request", "create", 400)

    trace = Trace()
    kept(NoCreate(), trace=trace)(ALLOWED, {})
    assert trace.gpu == 0
    budget = Budget()
    runner = kept(UploadClient(), budget=ChildBudget(budget))
    runner(ALLOWED, {})
    runner._charged_at -= 4
    runner.close()
    assert budget.vm_s >= 4 and budget.snapshot()["vm_s"] >= 4
    assert Budget.restore(budget.snapshot()).vm_s == pytest.approx(budget.vm_s, abs=0.01)


def test_staging_is_removed_when_vm_construction_fails(monkeypatch):
    made = []
    real = sandbox_tool.tempfile.TemporaryDirectory

    def spy(*a, **kw):
        made.append(real(*a, **kw))
        return made[-1]

    monkeypatch.setattr(sandbox_tool.tempfile, "TemporaryDirectory", spy)
    monkeypatch.setattr(sandbox_tool, "SandboxSession", lambda *a, **kw: (_ for _ in ()).throw(RuntimeError("x")))
    with pytest.raises(RuntimeError):
        kept(UploadClient())(ALLOWED, {})
    import os
    assert not os.path.exists(made[0].name)


def test_close_error_does_not_skip_other_runners_or_the_ledger_save(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)
    closed = []

    class Bad:
        kept = True
        unconfirmed = None

        def close(self):
            closed.append("bad")
            raise PermissionError("x")

    class Good(Bad):
        def close(self):
            closed.append("good")

    monkeypatch.setattr(tool_loop, "_run_subtask", lambda *a, **kw: kw["sandbox_runners"].extend([Bad(), Good()]) or {"status": "proposed"})
    out = tool_loop.run_subtask({"task_type": "t"}, None, deps=object(), budget=Budget(), source=".", sha="abc")
    assert closed == ["bad", "good"] and out["status"] == "blocked"


def test_unconfirmed_teardown_mirrors_the_checks_path(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)
    capture = {}
    deps = type("D", (), {"capture": capture})()

    def loop(*a, **kw):
        runner = sandbox_tool.Runner("repo", "abc", client=FakeClient())
        runner.unconfirmed = "run-9"
        kw["sandbox_runners"].append(runner)
        kw["sandbox_log"].append({"rc": 0})
        return {"status": "proposed"}

    monkeypatch.setattr(tool_loop, "_run_subtask", loop)
    monkeypatch.setattr(sandbox_tool.Runner, "close", lambda self: None)
    out = tool_loop.run_subtask({"task_type": "t"}, None, deps=deps, budget=Budget(), source=".", sha="abc")
    assert out["unknown_outcome"] == {"run_id": "run-9"} and capture["sandbox_cleanup_pending"] is True
    assert out["sandbox_receipts"] == [{"rc": 0}]


def test_fanout_is_one_while_the_subtask_vm_holds_the_runner_slot():
    from gates import implement
    env = {"AI_BOARD_FANOUT_MAX": "4"}
    assert implement.fanout_limit(env) == 4
    assert implement.fanout_limit({**env, FLAG: "1"}) == 4
    assert implement.fanout_limit({**env, FLAG: "1", "AI_BOARD_SANDBOX_TOOL": "1"}) == 1


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


class StuckDestroy(UploadClient):
    def destroy(self, run_id, **_):
        return {"state": "destroying"}


def test_draft_path_change_with_unconfirmed_teardown_records_a_receipt_and_stops():
    receipts = []
    runner = kept(StuckDestroy(), receipts=receipts)
    runner(ALLOWED, {"a.html": "x", "test/a.test.js": "t"})
    with pytest.raises(sandbox_tool.CleanupUnconfirmed):
        runner(ALLOWED, {"a.html": "x"})
    assert receipts[-1]["error"] == "cleanup_unconfirmed"


def test_failed_create_with_unconfirmed_cleanup_stops_at_once():
    class Bad(StuckDestroy):
        def create(self, *a, **kw):
            raise SandboxError("bad_request", "create", 400)

    receipts = []
    with pytest.raises(sandbox_tool.CleanupUnconfirmed):
        kept(Bad(), receipts=receipts)(ALLOWED, {})
    assert receipts[-1]["error"] == "cleanup_unconfirmed"


def test_added_draft_path_keeps_the_vm():
    client = UploadClient()
    runner = kept(client)
    runner(ALLOWED, {"a.html": "x"})
    runner(ALLOWED, {"a.html": "x", "test/a.test.js": "t"})
    assert len(client.created) == 1 and client.uploads == 2
    runner.close()


def test_unknown_outcome_carries_the_run_id_when_close_fails_otherwise(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(sandbox_tool, "offered", lambda *_: True)
    runner = sandbox_tool.Runner("repo", "abc", client=UploadClient())
    runner.run_id = "run-5"
    monkeypatch.setattr(tool_loop, "_run_subtask", lambda *a, **kw: kw["sandbox_runners"].append(runner) or {"status": "proposed"})
    monkeypatch.setattr(sandbox_tool.Runner, "close", lambda self: (_ for _ in ()).throw(PermissionError("x")))
    out = tool_loop.run_subtask({"task_type": "t"}, None, deps=object(), budget=Budget(), source=".", sha="abc")
    assert out["unknown_outcome"] == {"run_id": "run-5"}
