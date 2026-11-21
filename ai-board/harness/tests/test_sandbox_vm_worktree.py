"""Worktree in the subtask VM is the source of truth: fake VM that speaks the git argv the runner emits (NUL stripped like the real runner), no real VM or git."""
import hashlib
import io
import json
import tarfile

import pytest

from runtime import sandbox_tool, tool_loop
from runtime.budgets.budget import BudgetExhausted
from runtime.tool_loop import Forbidden
from verification.sandbox import SandboxError
from tests.test_sandbox_tool import OK, FakeClient

WORKTREE = "AI_BOARD_SANDBOX_VM_WORKTREE"
KEPT = "AI_BOARD_SANDBOX_SUBTASK_VM"
TARGET = "public/a.html"
OTHER = "public/b.html"
TEST = "test/a.test.js"
BASE = {TARGET: "<h1>A</h1>\n", OTHER: "<p>B</p>\n"}
FREE = ["node", "--test", TEST]
EDIT = {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]}
ZERO = "0" * 40


def blob(value):
    data = value if isinstance(value, bytes) else value.encode()
    return hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()


class FakeVM(FakeClient):
    """`files` is the VM worktree (str or bytes); `bash(argv, files)` plays side effects of the agent's command."""

    def __init__(self, bash=None, mangle=None, outcomes=(), ignored=(), truncate_cat=False):
        super().__init__(outcomes)
        self.files, self.index, self.trees = {}, {}, {}
        self.bash, self.mangle, self.ignored, self.truncate_cat = bash, mangle or (lambda text: text), set(ignored), truncate_cat
        self.uploads, self.git_calls, self.git_argv = [], [], []

    def upload(self, run_id, archive, **_):
        with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
            for member in tar.getmembers():
                if member.isfile() and member.name.startswith("checkout/"):
                    rel = member.name[len("checkout/"):]
                    self.files[rel] = self.mangle(tar.extractfile(member).read().decode())
                    self.uploads.append(rel)
        return {}

    def exec(self, run_id, argv, *, timeout, deadline=None):
        self.execs.append(list(argv))
        if argv[0] != "git":
            if self.outcomes and isinstance(self.outcomes[0], Exception):
                raise self.outcomes.pop(0)
            if self.bash:
                self.bash(argv, self.files)
            return OK
        self.git_argv.append(list(argv))
        sub = argv[argv.index("-C") + 2:]
        while sub[0] == "-c":
            sub = sub[2:]
        self.git_calls.append(sub)
        out = self._git(sub)
        return {**out, "stdout": out["stdout"].replace("\0", "")}

    def _out(self, text="", rc=0, truncated=False):
        return {"code": rc, "stdout": text, "stderr": "", "timed_out": False, "truncated": truncated}

    @staticmethod
    def _mode(value):
        return "120000" if isinstance(value, bytes) and value.startswith(b"LINK:") else "100644"

    def _git(self, sub):
        name = sub[0]
        if name == "init":
            return self._out()
        if name == "add":
            if sub[1] == "-f":
                if sub[-1] not in self.files:
                    return self._out(rc=128)
                self.index[sub[-1]] = self.files[sub[-1]]
                return self._out()
            force = "-f" in sub
            self.index = {p: v for p, v in self.index.items() if p in self.files}
            for path, value in self.files.items():
                if force or path in self.index or path not in self.ignored:
                    self.index[path] = value
            return self._out()
        if name == "commit":
            return self._out()
        if name == "write-tree":
            tree = "tree" + hashlib.sha1(json.dumps({k: blob(v) for k, v in self.index.items()}, sort_keys=True).encode()).hexdigest()[:8]
            self.trees[tree] = dict(self.index)
            return self._out(tree + "\n")
        if name == "diff":
            base, lines = self.trees[sub[-1]], []
            for path in sorted(set(base) | set(self.index)):
                old, new = base.get(path), self.index.get(path)
                if old == new:
                    continue
                listed = '"' + path.replace("\t", "\\t") + '"' if "\t" in path else path
                if new is None:
                    lines.append(f":{self._mode(old)} 000000 {blob(old)} {ZERO} D\t{listed}")
                else:
                    lines.append(f":{self._mode(old) if old is not None else '000000'} {self._mode(new)} "
                                 f"{blob(old) if old is not None else ZERO} {blob(new)} {'A' if old is None else 'M'}\t{listed}")
            return self._out("\n".join(lines) + ("\n" if lines else ""))
        if name == "cat-file" and sub[1] == "-e":
            tree, _, path = sub[2].partition(":")
            return self._out(rc=0 if path in self.trees[tree] else 128)
        if name == "cat-file":
            for value in self.index.values():
                if blob(value) == sub[2]:
                    data = value if isinstance(value, bytes) else value.encode()
                    return self._out(data.decode("utf-8", "replace"), truncated=self.truncate_cat)
            return self._out(rc=128)
        if name == "checkout":
            self.files[sub[-1]] = self.index[sub[-1]] = self.trees[sub[1]][sub[-1]]
            return self._out()
        if name == "rm":
            self.files.pop(sub[-1], None)
            self.index.pop(sub[-1], None)
            return self._out()
        raise AssertionError(sub)


@pytest.fixture(autouse=True)
def stage_base(monkeypatch):
    def stage(source, sha, drafts, root):
        for rel, text in {**BASE, **drafts}.items():
            (root / rel).parent.mkdir(parents=True, exist_ok=True)
            (root / rel).write_bytes(text.encode())
    monkeypatch.setattr(sandbox_tool, "_stage", stage)
    monkeypatch.setattr(tool_loop.tools, "_show", lambda source, sha, path: BASE.get(path))
    monkeypatch.setenv("AI_BOARD_SANDBOX_TOOL", "1")
    token = tool_loop._SANDBOX_OFFERED.set(True)
    yield
    tool_loop._SANDBOX_OFFERED.reset(token)


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    monkeypatch.setenv(WORKTREE, "1")


def make(client, **kw):
    return sandbox_tool.Runner("repo", "abc", client=client, lease_ok=lambda: True, **kw)


def workspace(client, file=TARGET, current=BASE[TARGET], **kw):
    runner = make(client, **kw)
    return tool_loop.Workspace("repo", "abc", file, current, sandbox=runner), runner


def write(files, rel, text):
    files[rel] = text


def prepared(client):
    ws, runner = workspace(client)
    ws.run("edit_file", EDIT)
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    return ws, runner


def test_flag_default_off_needs_kept_vm_too(monkeypatch):
    assert make(FakeVM()).worktree is False
    monkeypatch.setenv(WORKTREE, "1")
    assert make(FakeVM()).worktree is False
    monkeypatch.setenv(KEPT, "1")
    assert make(FakeVM()).worktree is True


def test_flag_off_never_runs_git(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TEST: "x"})
    runner.close()
    assert client.git_calls == [] and client.execs == [FREE]


@pytest.mark.parametrize("argv", [["sh", "-c", "ls"], ["git", "status"], ["node", "x.js"], [], "ls", ["ls", 1]])
def test_model_argv_is_still_allow_listed_in_worktree_mode(on, argv):
    client = FakeVM()
    runner = make(client)
    with pytest.raises(sandbox_tool.Refused):
        runner(argv, {})
    assert client.created == [] and client.execs == []


def test_internal_git_calls_work_and_the_model_still_runs_allowed_argv(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"))
    ws, runner = workspace(client)
    assert json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))["rc"] == 0
    assert ws.content == "<h1>VM</h1>\n"
    assert {c[0] for c in client.git_calls} >= {"init", "add", "write-tree", "diff", "cat-file"}
    with pytest.raises(Forbidden):
        ws.run(sandbox_tool.NAME, {"argv": ["git", "-C", "checkout", "add", "-A"]})
    runner.close()


def test_internal_git_is_hardened_against_repo_config(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {})
    assert client.git_argv and all("core.hooksPath=/dev/null" in a and "core.fsmonitor=" in a for a in client.git_argv)
    runner.close()


def test_first_call_records_base_tree_with_ignored_files_before_the_command(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TARGET: BASE[TARGET]})
    assert client.git_calls[:3] == [["init", "-q"], ["add", "-A", "-f"], ["write-tree"]]
    assert client.execs[-1] == FREE
    runner.close()


def test_only_drafts_that_differ_from_base_are_pushed(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TARGET: BASE[TARGET]})
    before = len(client.uploads)
    runner(FREE, {TARGET: "<h1>B</h1>\n"})
    assert client.uploads[before:] == [TARGET] and client.files[TARGET] == "<h1>B</h1>\n"
    runner(FREE, {TARGET: "<h1>B</h1>\n"})
    assert client.uploads[before:] == [TARGET]
    runner.close()


def test_second_call_with_a_dropped_draft_keeps_the_same_vm(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TARGET: BASE[TARGET], TEST: "t"})
    runner(FREE, {TARGET: BASE[TARGET]})
    assert len(client.created) == 1 and client.destroyed == []
    runner.close()


def test_vm_edit_is_not_overwritten_by_an_unchanged_draft(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == "<h1>VM</h1>\n"
    client.bash = None
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert client.files[TARGET] == "<h1>VM</h1>\n"
    runner.close()


def test_host_drafts_follow_the_vm_after_each_exec(on):
    def shell(argv, files):
        write(files, TARGET, "<h1>VM</h1>\n")
        write(files, TEST, "test body")
    client = FakeVM(bash=shell)
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == "<h1>VM</h1>\n" and (ws.test_file, ws.test) == (TEST, "test body")
    client.bash = lambda argv, files: files.update({TARGET: BASE[TARGET]}) or files.pop(TEST)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == BASE[TARGET] and ws.test_file is None
    assert len(client.created) == 1
    runner.close()


def test_proposal_is_the_vm_diff_not_the_memory_draft(on):
    client = FakeVM(mangle=lambda text: text.upper())
    ws, runner = workspace(client)
    ws.run("edit_file", EDIT)
    ws.run("write_test", {"test_file": TEST, "test": "node:test body"})
    assert ws.content == "<h1>Z</h1>\n"
    out = ws.proposal()
    assert out["code"] == "<H1>Z</H1>\n" and out["test"] == "NODE:TEST BODY"
    runner.close()


def test_proposal_without_any_exec_still_goes_through_the_vm(on):
    client = FakeVM()
    ws, runner = prepared(client)
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    assert len(client.created) == 1 and client.files[TARGET] == "<h1>Z</h1>\n"
    runner.close()
    assert client.destroyed == client.created


def test_out_of_scope_create_and_delete_are_restored_not_a_trap(on):
    def shell(argv, files):
        write(files, OTHER, "<p>X</p>\n")
        write(files, "public/new.html", "n")
    client = FakeVM(bash=shell)
    ws, runner = prepared(client)
    body = json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))
    assert sorted(body["restored_to_base"]) == [OTHER, "public/new.html"]
    assert client.files[OTHER] == BASE[OTHER] and "public/new.html" not in client.files
    client.bash = lambda argv, files: files.pop(OTHER)
    assert json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))["restored_to_base"] == [OTHER]
    assert ws.proposal()["code"] == "<h1>Z</h1>\n" and client.files[OTHER] == BASE[OTHER]
    runner.close()


def test_stray_files_left_at_finish_are_restored_too(on):
    client = FakeVM()
    ws, runner = prepared(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    client.files["public/late.html"] = "x"
    assert ws.proposal()["code"] == "<h1>Z</h1>\n" and "public/late.html" not in client.files
    runner.close()


@pytest.mark.parametrize("rel", ["ai-board/harness/x.py", "server/ai-board/x.json", "package-lock.json"])
def test_denied_or_locked_path_in_vm_stops_the_run(on, rel):
    client = FakeVM(bash=lambda argv, files: write(files, rel, "x"))
    ws, runner = prepared(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(Forbidden):
        ws.proposal()
    runner.close()


@pytest.mark.parametrize("value", [b"\x00\x01binary", b"\xff\xfe bad utf8", b"LINK:target"])
def test_binary_non_utf8_and_symlink_never_become_content(on, value):
    client = FakeVM(bash=lambda argv, files: files.update({TARGET: value}))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == BASE[TARGET] and client.files[TARGET] == BASE[TARGET]
    runner.close()


def test_nul_stripped_transport_is_caught_by_the_blob_hash(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>a\0b</h1>\n"))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == BASE[TARGET] and client.files[TARGET] == BASE[TARGET]
    runner.close()


def test_truncated_read_is_rejected_and_restored(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"), truncate_cat=True)
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == BASE[TARGET] and client.files[TARGET] == BASE[TARGET]
    runner.close()


def test_gitignored_target_is_still_submitted(on):
    new = "public/new.html"
    client = FakeVM(ignored={new})
    ws, runner = workspace(client, file=new, current=None)
    ws.content = "fresh\n"
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    assert ws.proposal()["code"] == "fresh\n"
    runner.close()


def test_stray_files_do_not_use_up_the_cap_of_declared_targets(on):
    def shell(argv, files):
        for n in range(12):
            write(files, f"public/junk{n}.html", "x")
    client = FakeVM(bash=shell)
    ws, runner = prepared(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == "<h1>Z</h1>\n" and ws.test_file == TEST
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    assert not [p for p in client.files if p.startswith("public/junk")]
    runner.close()


def test_second_test_file_in_vm_is_restored(on):
    client = FakeVM(bash=lambda argv, files: files.update({TEST: "1", "test/b.test.js": "2"}))
    ws, runner = workspace(client)
    ws.run("edit_file", EDIT)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.test_file == TEST and "test/b.test.js" not in client.files
    runner.close()


def test_vm_failure_at_finish_is_transient_after_retries_never_forbidden(on):
    client = FakeVM()
    ws, runner = prepared(client)
    client._git = lambda sub: client._out(rc=1)
    with pytest.raises(sandbox_tool.VMUnavailable) as caught:
        ws.proposal()
    assert caught.value.failure_class == "transient" and not isinstance(caught.value, Forbidden)
    assert client.destroyed == client.created and len(client.created) == 3


def test_transient_error_at_finish_retries_in_a_fresh_vm(on, monkeypatch):
    client = FakeVM()
    ws, runner = prepared(client)
    real, calls = runner.changes, []

    def flaky(drafts, ensure=False):
        calls.append(1)
        if len(calls) == 1:
            raise SandboxError("runner_unreachable", "exec", 503)
        return real(drafts, ensure)
    monkeypatch.setattr(runner, "changes", flaky)
    assert ws.proposal()["code"] == "<h1>Z</h1>\n" and len(calls) == 2
    runner.close()


def test_busy_runner_at_finish_raises_busy(on, monkeypatch):
    client = FakeVM()
    ws, runner = prepared(client)
    monkeypatch.setattr(runner, "changes", lambda *a, **k: (_ for _ in ()).throw(SandboxError("busy", "provision", 429)))
    with pytest.raises(sandbox_tool.RunnerBusy):
        ws.proposal()


def test_out_of_time_at_finish_is_a_budget_pause(on):
    client = FakeVM()
    runner = make(client, remaining=lambda: 0)
    ws = tool_loop.Workspace("repo", "abc", TARGET, BASE[TARGET], sandbox=runner)
    ws.run("edit_file", EDIT)
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    with pytest.raises(BudgetExhausted):
        ws.proposal()
    assert client.created == []


def test_failed_baseline_destroys_the_vm(on):
    client = FakeVM()
    client._git = lambda sub: client._out(rc=1)
    runner = make(client)
    assert json.loads(runner(FREE, {}))["error"] == "worktree_git"
    assert client.created and client.destroyed == client.created


def test_replacement_vm_is_rebuilt_from_followed_drafts(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    client.bash = None
    client.outcomes = [SandboxError("runner_unreachable", "exec", 503)]
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert len(client.created) == 2 and client.files[TARGET] == "<h1>VM</h1>\n"
    runner.close()


def test_failed_exec_leaves_drafts_untouched(on):
    client = FakeVM(outcomes=[SandboxError("lease_lost", "lease")])
    ws, runner = workspace(client)
    ws.run("edit_file", EDIT)
    assert json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))["error"] == "lease_lost"
    assert ws.content == "<h1>Z</h1>\n"
    runner.close()


def test_flag_off_workspace_proposal_never_touches_a_vm(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    client = FakeVM()
    ws, runner = prepared(client)
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    assert client.created == [] and client.git_calls == []


def test_tool_spec_changes_only_when_worktree_is_on(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    off_hash = sandbox_tool.spec_hash()
    off = sandbox_tool.specs()[sandbox_tool.NAME]
    monkeypatch.setenv(WORKTREE, "1")
    on_spec = sandbox_tool.specs()[sandbox_tool.NAME]
    assert on_spec.description != off.description and on_spec.parameters == off.parameters
    assert sandbox_tool.spec_hash() == off_hash
    assert sandbox_tool.worktree_spec_hash() != off_hash


def test_worktree_flag_without_kept_vm_keeps_the_allow_list_spec(monkeypatch):
    base = sandbox_tool.specs()[sandbox_tool.NAME]
    monkeypatch.setenv(WORKTREE, "1")
    assert sandbox_tool.specs()[sandbox_tool.NAME] == base


def test_model_test_file_wins_over_an_earlier_sorting_vm_test_file(on):
    helper = "test/0-helper.test.js"
    client = FakeVM(bash=lambda argv, files: write(files, helper, "helper"))
    ws, runner = prepared(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert (ws.test_file, ws.test) == (TEST, "t") and helper not in client.files and client.files[TEST] == "t"
    assert ws.proposal()["test_file"] == TEST
    runner.close()


def test_git_quoting_is_turned_off_for_internal_calls(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {})
    assert all("core.quotePath=false" in a for a in client.git_argv)
    runner.close()


def test_name_git_still_quotes_is_unquoted_and_restored_not_a_hard_fault(on):
    odd = "public/a\tb.txt"
    client = FakeVM(bash=lambda argv, files: write(files, odd, "x"))
    ws, runner = prepared(client)
    body = json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))
    assert body["restored_to_base"] == [odd] and odd not in client.files
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    runner.close()


@pytest.mark.parametrize("raw,expected", [(r'"a\tb"', "a\tb"), (r'"t\303\252p"', "têp"), (r'"q\"x\\"', 'q"x' + chr(92)),
                                          ("plain", None), (r'"bad\q"', None)])
def test_unquote(raw, expected):
    assert sandbox_tool._unquote(raw) == expected


@pytest.mark.parametrize("value", [b"\x00\x01binary", b"LINK:target"])
def test_declared_target_that_turns_unusable_goes_back_to_the_model_draft(on, value):
    client = FakeVM(bash=lambda argv, files: files.update({TARGET: value}))
    ws, runner = workspace(client)
    ws.run("edit_file", EDIT)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.content == "<h1>Z</h1>\n" and client.files[TARGET] == "<h1>Z</h1>\n"
    runner.close()
