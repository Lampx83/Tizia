"""Worktree mode: per-step VM commit + diff checkpoint, resume on a fresh VM from the last diff, refusal on pin drift."""
import json

import pytest

import tools
from runtime import sandbox_tool, tool_loop
from runtime.budget import Budget
from test_sandbox_vm_worktree import BASE, FREE, KEPT, TARGET, TEST, WORKTREE, FakeVM, write
from test_tool_checkpoint import Crash, MemSteps
from test_tool_loop import Deps, FINISH, SUBTASK

REAL_RUNNER = sandbox_tool.Runner
SHELL = {"tool": "run_in_sandbox", "arguments": {"argv": FREE}}
EDIT = {"tool": "edit_file", "arguments": {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]}}
SUBTASK = {**SUBTASK, "file": TARGET}


class Dies(Deps):
    """Runs the script, then the worker process dies at the next model call."""

    def __init__(self, script):
        super().__init__(script)
        self.left = len(script)

    def call_model(self, model, prompt, *, budget, **kw):
        if not self.left:
            raise Crash
        self.left -= 1
        return super().call_model(model, prompt, budget=budget, **kw)


class Steps(MemSteps):
    scope = "ticket-1:plan-a"

    def reset(self, pins):
        self.db["steps"].clear()
        self.db["pins"] = dict(pins)


def shell_edit(argv, files):
    write(files, TARGET, "<h1>shell</h1>\n")
    write(files, TEST, "node:test body")


@pytest.fixture(autouse=True)
def vm_env(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    monkeypatch.setenv(WORKTREE, "1")
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    monkeypatch.setattr(tool_loop.sandbox_tool, "offered", lambda *a, **k: True)
    monkeypatch.setattr(tools, "_show", lambda source, sha, path: BASE.get(path))

    def stage(source, sha, drafts, root):
        for rel, text in {**BASE, **drafts}.items():
            (root / rel).parent.mkdir(parents=True, exist_ok=True)
            (root / rel).write_bytes(text.encode())
    monkeypatch.setattr(sandbox_tool, "_stage", stage)


PROMPTS = []


def worker(monkeypatch, vm, script, store, sha="abc", deps=Deps):
    monkeypatch.setattr(sandbox_tool, "Runner", lambda *a, **kw: REAL_RUNNER(*a, client=vm, **kw))
    d = deps(script)
    PROMPTS[:] = [d.prompts]
    return tool_loop.run_subtask(SUBTASK, BASE[TARGET], deps=d, budget=Budget(), model="m", source=".", sha=sha,
                                 check=lambda out: None, store=store)


def killed_after_shell(monkeypatch, store):
    with pytest.raises(Crash):
        worker(monkeypatch, FakeVM(bash=shell_edit), [EDIT, SHELL], store, deps=Dies)
    return store


def test_each_step_is_committed_in_the_vm_and_the_diff_is_checkpointed(monkeypatch):
    vm, store = FakeVM(bash=shell_edit), Steps()
    with pytest.raises(Crash):
        worker(monkeypatch, vm, [EDIT, SHELL], store, deps=Dies)
    assert [c for c in vm.git_calls if c[0] == "commit"] == [["commit", "-q", "--no-verify", "--allow-empty", "-m", "step 1"]]
    record = store.db["ledger"]["vm"]
    assert record["step"] == 1 and record["files"] == {TARGET: "<h1>shell</h1>\n", TEST: "node:test body"}


def test_resume_applies_last_diff_to_a_fresh_vm_without_replaying_commands(monkeypatch):
    store = killed_after_shell(monkeypatch, Steps())
    fresh = FakeVM()
    out = worker(monkeypatch, fresh, [FINISH], store)
    assert out["status"] == "proposed"
    assert out["out"]["code"] == "<h1>shell</h1>\n" and out["out"]["test"] == "node:test body"
    assert FREE not in fresh.execs and len(fresh.created) == 1
    assert fresh.files[TARGET] == "<h1>shell</h1>\n"


def test_killed_run_ends_with_the_same_result_as_an_uninterrupted_one(monkeypatch):
    whole = worker(monkeypatch, FakeVM(bash=shell_edit), [EDIT, SHELL, FINISH], Steps())
    resumed = worker(monkeypatch, FakeVM(), [FINISH], killed_after_shell(monkeypatch, Steps()))
    assert resumed["out"] == whole["out"]


def test_edit_after_a_shell_edit_does_not_fail_replay(monkeypatch):
    edit_again = {"tool": "edit_file", "arguments": {"file": TARGET, "edits": [{"search": "shell", "replace": "late"}]}}
    store = Steps()
    with pytest.raises(Crash):
        worker(monkeypatch, FakeVM(bash=shell_edit), [SHELL, edit_again], store, deps=Dies)
    out = worker(monkeypatch, FakeVM(), [FINISH], store)
    assert out["status"] == "proposed" and out["out"]["code"] == "<h1>late</h1>\n"


@pytest.mark.parametrize("drift", ["check_runtime", "spec", "tools", "base"])
def test_pin_mismatch_refuses_and_never_applies_the_stale_diff(monkeypatch, drift):
    store = killed_after_shell(monkeypatch, Steps())
    store.db["ledger"]["vm"]["pins"][drift] = "stale"
    fresh = FakeVM()
    out = worker(monkeypatch, fresh, [FINISH], store)
    assert (out["status"], out["failure_class"]) == ("blocked", "critical") and drift in out["reason"]
    assert fresh.created == [] and fresh.uploads == []


def test_moved_base_sha_starts_fresh_instead_of_applying_the_old_diff(monkeypatch):
    store = killed_after_shell(monkeypatch, Steps())
    fresh = FakeVM()
    out = worker(monkeypatch, fresh, [FINISH], store, sha="abd")
    assert out["status"] != "proposed" or out["out"]["code"] != "<h1>shell</h1>\n"
    assert TARGET not in fresh.files or fresh.files[TARGET] != "<h1>shell</h1>\n"


def test_oversized_diff_is_stored_as_unresumable(monkeypatch):
    monkeypatch.setattr(tool_loop, "VM_CAP", 10)
    store = killed_after_shell(monkeypatch, Steps())
    assert store.db["ledger"]["vm"]["files"] is None
    out = worker(monkeypatch, FakeVM(), [FINISH], store)
    assert out["status"] == "blocked" and out["failure_class"] == "critical"


def test_sandbox_step_missing_from_the_diff_is_void_not_replayed(monkeypatch):
    store = killed_after_shell(monkeypatch, Steps())
    store.db["ledger"]["vm"]["step"] = 0
    fresh = FakeVM(bash=shell_edit)
    out = worker(monkeypatch, fresh, [FINISH], store)
    assert FREE not in fresh.execs and "was not checkpointed" in PROMPTS[0][0]
    assert out["status"] == "proposed"


def test_kill_before_the_first_vm_record_voids_the_shell_step(monkeypatch):
    store = killed_after_shell(monkeypatch, Steps())
    del store.db["ledger"]["vm"]
    fresh = FakeVM(bash=shell_edit)
    out = worker(monkeypatch, fresh, [FINISH], store)
    assert FREE not in fresh.execs and "was not checkpointed" in PROMPTS[0][0]
    assert out["status"] != "proposed" or out["out"]["code"] != "<h1>shell</h1>\n"


def test_commit_skips_hooks_and_read_only_steps(monkeypatch):
    vm = FakeVM(bash=shell_edit)
    tree = {"tool": "tree", "arguments": {"path": "public"}}
    with pytest.raises(Crash):
        worker(monkeypatch, vm, [SHELL, tree], Steps(), deps=Dies)
    commits = [a for a in vm.git_argv if "commit" in a]
    assert len(commits) == 1 and "--no-verify" in commits[0] and "core.hooksPath=/dev/null" in commits[0]


def test_open_vm_fault_is_kept_and_refuses_resume(monkeypatch):
    def deny(argv, files):
        write(files, TARGET, "<h1>shell</h1>\n")
        write(files, "package-lock.json", "{}")
    store = Steps()
    with pytest.raises(Crash):
        worker(monkeypatch, FakeVM(bash=deny), [SHELL], store, deps=Dies)
    assert store.db["ledger"]["vm"]["faults"]
    out = worker(monkeypatch, FakeVM(), [FINISH], store)
    assert out["status"] == "blocked" and "lỗi path" in out["reason"]


def test_flag_off_checkpoint_has_no_vm_record(monkeypatch):
    monkeypatch.delenv(WORKTREE)
    store = Steps()
    with pytest.raises(Crash):
        worker(monkeypatch, FakeVM(), [EDIT], store, deps=Dies)
    assert "vm" not in (store.db["ledger"] or {})
