"""run_in_sandbox: fake RunnerClient, staging stubbed, no real VM or git."""
import json
import time

import pytest

from runtime import loop_budget, sandbox_tool, tool_loop
from runtime.tool_loop import Forbidden, ToolError
from verification.sandbox import SandboxError, SandboxSession

FLAG = "AI_BOARD_SANDBOX_TOOL"
ALLOWED = ["node", "--test", "test/a.test.js"]
PAGE = "<main>\n<h1>A</h1>\n</main>\n"
CALL = {"tool_calls": [{"name": sandbox_tool.NAME, "arguments": {"argv": ALLOWED}}]}
OK = {"code": 0, "stdout": "ok\n", "stderr": "", "timed_out": False, "truncated": False}


class FakeClient:
    def __init__(self, outcomes=()):
        self.outcomes = list(outcomes)
        self.created, self.destroyed, self.execs = [], [], []

    def create(self, run_id, manifest, **_):
        self.created.append(run_id)
        return {"run_id": run_id, "state": "ready"}

    def upload(self, run_id, archive, **_):
        return {}

    def exec(self, run_id, argv, *, timeout, deadline=None):
        self.execs.append(list(argv))
        item = self.outcomes.pop(0) if self.outcomes else OK
        if isinstance(item, Exception):
            raise item
        return item

    def renew(self, run_id, **_):
        return {}

    def destroy(self, run_id, **_):
        self.destroyed.append(run_id)
        return {"state": "destroyed"}


@pytest.fixture(autouse=True)
def stage_without_git(monkeypatch):
    def stage(source, sha, drafts, root):
        for rel, text in drafts.items():
            (root / rel).parent.mkdir(parents=True, exist_ok=True)
            (root / rel).write_text(text, encoding="utf-8")
    monkeypatch.setattr(sandbox_tool, "_stage", stage)


@pytest.fixture
def flag_on(monkeypatch):
    monkeypatch.setenv(FLAG, "1")


def runner(client, lease_ok=lambda: True, trace=None):
    return sandbox_tool.Runner("repo", "abc", client=client, lease_ok=lease_ok, trace=trace)


def assert_every_vm_destroyed(client):
    assert client.created and set(client.created) <= set(client.destroyed)


def test_allowed_argv_runs_in_one_vm_and_destroys_it():
    client = FakeClient()
    out = json.loads(runner(client)(ALLOWED, {"test/a.test.js": "x"}))
    assert out["rc"] == 0 and out["stdout"] == "ok\n"
    assert client.execs == [ALLOWED] and len(client.created) == 1
    assert_every_vm_destroyed(client)


def test_node_check_on_repo_file_is_allowed():
    client = FakeClient()
    assert json.loads(runner(client)(["node", "--check", "public/a.js"], {}))["rc"] == 0


@pytest.mark.parametrize("argv", [
    ["sh", "-c", "ls"],
    ["node", "--test", "public/a.js"],
    ["node", "--test", "test/../x.js"],
    ["node", "--test", "/etc/x.js"],
    ["node", "--test", "./test/a.test.js"],
    ["node", "--test", "test/a.test.js", "extra"],
    ["node", "--check", "public/a.html"],
    [],
    "node --test test/a.test.js",
])
def test_disallowed_argv_refused_before_any_vm(argv):
    client = FakeClient()
    with pytest.raises(sandbox_tool.Refused):
        runner(client)(argv, {})
    assert client.created == []


def test_vm_destroyed_when_exec_errors_non_transient():
    client = FakeClient([SandboxError("bad_request", "exec", 400)])
    out = json.loads(runner(client)(ALLOWED, {}))
    assert out == {"rc": None, "error": "bad_request", "phase": "exec"}
    assert len(client.created) == 1
    assert_every_vm_destroyed(client)


def test_transient_error_retries_in_fresh_vm_up_to_two_retries():
    client = FakeClient([SandboxError("runner_unreachable", "exec", 503)] * 5)
    out = json.loads(runner(client)(ALLOWED, {}))
    assert out["error"] == "runner_unreachable"
    assert len(client.created) == 3 and len(set(client.created)) == 3
    assert_every_vm_destroyed(client)


def test_transient_error_then_success_uses_second_vm():
    client = FakeClient([SandboxError("runner_unreachable", "exec", 503), OK])
    assert json.loads(runner(client)(ALLOWED, {}))["rc"] == 0
    assert len(client.created) == 2
    assert_every_vm_destroyed(client)


def test_guest_timeout_still_destroys_vm():
    client = FakeClient([{**OK, "code": None, "timed_out": True}])
    out = json.loads(runner(client)(ALLOWED, {}))
    assert out["truncated"] is True
    assert_every_vm_destroyed(client)


def test_budget_timeout_destroys_vm():
    client = FakeClient()
    with pytest.raises(SandboxError) as info:
        with SandboxSession("repo", client=client, deadline=time.monotonic() - 1) as session:
            session.exec(ALLOWED, 5)
    assert info.value.code in {"wall_clock_s", "lease_lost"}
    assert_every_vm_destroyed(client)


def test_lease_lost_blocks_exec_and_destroys_vm():
    client = FakeClient()
    out = json.loads(runner(client, lease_ok=lambda: False)(ALLOWED, {}))
    assert out["error"] == "lease_lost" and client.execs == []
    assert_every_vm_destroyed(client)


def test_receipt_written_per_exec():
    client = FakeClient()
    r = runner(client)
    r(ALLOWED, {})
    receipt = r.receipts[0]
    assert receipt["run_id"].startswith("loop-") and receipt["argv"] == ALLOWED
    assert receipt["rc"] == 0 and receipt["duration_ms"] >= 0 and receipt["error"] is None


def test_output_truncated_to_contract_limit_and_full_text_kept_as_artifact():
    client = FakeClient([{**OK, "stdout": "a" * 5000}])
    r = runner(client)
    out = json.loads(r(ALLOWED, {}))
    assert len(out["stdout"]) == 2000 and out["truncated"] is True
    assert "a" * 5000 in open(r.receipts[0]["artifact"], encoding="utf-8").read()


def test_flag_off_leaves_tool_loop_unchanged(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    assert sandbox_tool.specs() == {}
    assert tool_loop._specs() == tool_loop.MANIFEST.tools
    with pytest.raises(ToolError):
        tool_loop.parse_request(CALL)


def test_flag_on_registers_tool_without_touching_manifest(flag_on):
    assert sandbox_tool.NAME in tool_loop._specs()
    assert sandbox_tool.NAME not in tool_loop.MANIFEST.tools
    assert tool_loop.parse_request(CALL) == (
        sandbox_tool.NAME, {"argv": ALLOWED})


def test_workspace_runs_sandbox_tool_on_draft_and_refuses_bad_argv(flag_on):
    client = FakeClient()
    ws = tool_loop.Workspace("repo", "abc", "public/a.html", PAGE, sandbox=runner(client))
    assert json.loads(ws.run(sandbox_tool.NAME, {"argv": ALLOWED}))["rc"] == 0
    with pytest.raises(Forbidden):
        ws.run(sandbox_tool.NAME, {"argv": ["sh", "-c", "ls"]})
    assert len(client.created) == 1


def test_loop_budget_same_result_is_not_progress():
    spec = {"soft_start": 5, "soft_step": 5, "same_call_repeats": 9, "no_progress_steps": 2}
    budget = loop_budget.LoopBudget(spec, 30)
    observation = json.dumps({"rc": 0, "stdout": "x", "stderr": ""})
    assert isinstance(budget.step(sandbox_tool.NAME, {"argv": ALLOWED}, observation), loop_budget.Continue)
    assert isinstance(budget.step(sandbox_tool.NAME, {"argv": ["node", "--check", "test/a.test.js"]}, observation), loop_budget.Continue)
    assert isinstance(budget.step(sandbox_tool.NAME, {"argv": ALLOWED}, observation), loop_budget.Stop)
