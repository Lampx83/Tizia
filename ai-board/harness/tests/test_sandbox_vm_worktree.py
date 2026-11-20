"""Worktree in the subtask VM is the source of truth: fake VM that speaks the git argv the runner emits, no real VM or git."""
import hashlib
import io
import json
import tarfile

import pytest

from runtime import sandbox_tool, tool_loop
from runtime.tool_loop import Forbidden
from verification.sandbox import SandboxError
from tests.test_sandbox_tool import OK, FakeClient

WORKTREE = "AI_BOARD_SANDBOX_VM_WORKTREE"
KEPT = "AI_BOARD_SANDBOX_SUBTASK_VM"
TARGET = "public/a.html"
TEST = "test/a.test.js"
BASE = {TARGET: "<h1>A</h1>\n", "public/b.html": "<p>B</p>\n"}
FREE = ["sh", "-c", "anything goes"]
BINARY = "\x00BIN"


class FakeVM(FakeClient):
    """Files dict is the VM worktree; `bash(argv, files)` plays the agent's shell edits."""

    def __init__(self, bash=None, mangle=None, outcomes=()):
        super().__init__(outcomes)
        self.files, self.index, self.trees = {}, {}, {}
        self.bash, self.mangle = bash, mangle or (lambda text: text)
        self.uploads, self.git_calls = [], []

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
        sub = argv[argv.index("-C") + 2:]
        self.git_calls.append(sub)
        return self._git(sub)

    def _out(self, text="", rc=0, truncated=False):
        return {"code": rc, "stdout": text, "stderr": "", "timed_out": False, "truncated": truncated}

    def _git(self, sub):
        if sub[0] == "init":
            return self._out()
        if sub[0] == "add":
            self.index = dict(self.files)
            return self._out()
        if sub[0] == "write-tree":
            tree = "tree" + hashlib.sha1(json.dumps(self.index, sort_keys=True).encode()).hexdigest()[:8]
            self.trees[tree] = dict(self.index)
            return self._out(tree + "\n")
        if sub[0] == "diff":
            base, lines = self.trees[sub[-1]], []
            for path in sorted(set(base) | set(self.index)):
                if base.get(path) == self.index.get(path):
                    continue
                stat = "-\t-" if BINARY in (self.index.get(path) or "") else "1\t1"
                lines.append(f"{stat}\t{path}\0")
            return self._out("".join(lines))
        if sub[0] == "show":
            path = sub[1][1:]
            return self._out(self.index[path]) if path in self.index else self._out(rc=128)
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


def workspace(client, **kw):
    runner = make(client)
    return tool_loop.Workspace("repo", "abc", TARGET, BASE[TARGET], sandbox=runner, **kw), runner


def write(files, rel, text):
    files[rel] = text


def test_flag_default_off_needs_kept_vm_too(monkeypatch):
    assert make(FakeVM()).worktree is False
    monkeypatch.setenv(WORKTREE, "1")
    assert make(FakeVM()).worktree is False
    monkeypatch.setenv(KEPT, "1")
    assert make(FakeVM()).worktree is True


def test_flag_off_keeps_allow_list_and_never_runs_git(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    client = FakeVM()
    runner = make(client)
    with pytest.raises(sandbox_tool.Refused):
        runner(FREE, {})
    runner(["node", "--test", TEST], {TEST: "x"})
    runner.close()
    assert client.git_calls == [] and client.execs == [["node", "--test", TEST]]


def test_bash_is_not_filtered_but_argv_must_be_strings(on):
    client = FakeVM()
    runner = make(client)
    assert json.loads(runner(FREE, {}))["rc"] == 0
    for bad in ([], "ls", ["ls", 1]):
        with pytest.raises(sandbox_tool.Refused):
            runner(bad, {})
    runner.close()
    assert FREE in client.execs and len(client.created) == 1


def test_first_call_records_base_tree_before_the_command(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TARGET: BASE[TARGET]})
    assert [c[0] for c in client.git_calls] == ["init", "add", "write-tree"]
    assert client.execs[-1] == FREE
    runner.close()


def test_only_drafts_that_differ_from_base_are_pushed(on):
    client = FakeVM()
    runner = make(client)
    runner(FREE, {TARGET: BASE[TARGET]})
    assert TARGET not in client.uploads[-1:] or client.files[TARGET] == BASE[TARGET]
    before = len(client.uploads)
    runner(FREE, {TARGET: "<h1>B</h1>\n"})
    assert client.uploads[before:] == [TARGET] and client.files[TARGET] == "<h1>B</h1>\n"
    runner(FREE, {TARGET: "<h1>B</h1>\n"})
    assert client.uploads[before:] == [TARGET]
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
    runner.close()


def test_proposal_is_the_vm_diff_not_the_memory_draft(on):
    client = FakeVM(mangle=lambda text: text.upper())
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "node:test body"})
    assert ws.content == "<h1>Z</h1>\n"
    out = ws.proposal()
    assert out["code"] == "<H1>Z</H1>\n" and out["test"] == "NODE:TEST BODY"
    runner.close()


def test_proposal_includes_in_scope_files_changed_only_in_the_vm(on):
    client = FakeVM(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    assert ws.proposal()["code"] == "<h1>VM</h1>\n"
    runner.close()


def test_out_of_scope_file_in_vm_blocks_candidate_until_removed(on):
    client = FakeVM(bash=lambda argv, files: write(files, "public/b.html", "<p>X</p>\n"))
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(ValueError, match="public/b.html"):
        ws.proposal()
    client.bash = lambda argv, files: files.update({"public/b.html": BASE["public/b.html"]})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    runner.close()


@pytest.mark.parametrize("rel", ["ai-board/harness/x.py", "server/ai-board/x.json"])
def test_denied_path_in_vm_stops_the_run(on, rel):
    client = FakeVM(bash=lambda argv, files: write(files, rel, "x"))
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(Forbidden):
        ws.proposal()
    runner.close()


def test_lockfile_and_test_outside_test_dir_are_refused(on):
    client = FakeVM(bash=lambda argv, files: write(files, "package-lock.json", "{}"))
    ws, runner = workspace(client)
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(Forbidden):
        ws.proposal()
    runner.close()


def test_deleted_and_binary_changes_never_become_candidate_content(on):
    def shell(argv, files):
        files.pop("public/b.html")
        write(files, "public/c.bin", BINARY)
    client = FakeVM(bash=shell)
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(ValueError) as caught:
        ws.proposal()
    assert "public/b.html" in str(caught.value) and "public/c.bin" in str(caught.value)
    runner.close()


def test_second_test_file_in_vm_is_a_scope_error(on):
    client = FakeVM(bash=lambda argv, files: files.update({TEST: "1", "test/b.test.js": "2"}))
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    with pytest.raises(ValueError, match="test"):
        ws.proposal()
    runner.close()


def test_truncated_file_read_fails_closed(on):
    class Truncating(FakeVM):
        def _git(self, sub):
            out = super()._git(sub)
            return {**out, "truncated": True} if sub[0] == "show" else out
    client = Truncating(bash=lambda argv, files: write(files, TARGET, "<h1>VM</h1>\n"))
    ws, runner = workspace(client)
    ws.run(sandbox_tool.NAME, {"argv": FREE})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    with pytest.raises(Forbidden):
        ws.proposal()
    runner.close()


def test_proposal_without_any_exec_still_goes_through_the_vm(on):
    client = FakeVM()
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    assert ws.proposal()["code"] == "<h1>Z</h1>\n"
    assert len(client.created) == 1 and client.files[TARGET] == "<h1>Z</h1>\n"
    runner.close()
    assert client.destroyed == client.created


def test_vm_unavailable_at_finish_blocks(on):
    client = FakeVM()
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
    client._git = lambda sub: client._out(rc=1)
    with pytest.raises(Forbidden):
        ws.proposal()
    runner.close()


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
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    assert json.loads(ws.run(sandbox_tool.NAME, {"argv": FREE}))["error"] == "lease_lost"
    assert ws.content == "<h1>Z</h1>\n"
    runner.close()


def test_flag_off_workspace_proposal_never_touches_a_vm(monkeypatch):
    monkeypatch.setenv(KEPT, "1")
    client = FakeVM()
    ws, runner = workspace(client)
    ws.run("edit_file", {"file": TARGET, "edits": [{"search": "A", "replace": "Z"}]})
    ws.run("write_test", {"test_file": TEST, "test": "t"})
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
