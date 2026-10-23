import json
import tempfile
from pathlib import Path

import pytest

from evaluation.suite import reconcile, runner
from test_eval_suite import SEED, deps_for, world  # noqa: F401  (module fixture)
from verification.sandbox import SandboxError

RUN = "loop-" + "a" * 24
RUN2 = "g5-" + "b" * 24


class FakeClient:
    def __init__(self, states=None, fail=None):
        self.states, self.fail, self.calls = states or {}, fail, []

    def destroy(self, run_id, *, deadline=None):
        self.calls.append(run_id)
        if self.fail:
            raise self.fail
        return {"state": self.states.get(run_id, "destroyed")}


@pytest.fixture(autouse=True)
def temp_root(tmp_path, monkeypatch):
    monkeypatch.setattr(reconcile.tempfile, "gettempdir", lambda: str(tmp_path))


def journal_file(tmp_path, lines):
    path = Path(tempfile.mkdtemp(prefix="ai-board-owned-", dir=tmp_path)) / "runs"
    path.write_text("".join(line + "\n" for line in lines), encoding="ascii")
    return path


@pytest.fixture
def pending_run(world, monkeypatch):
    """Gold run of 2 cases; first row flipped to cleanup_pending with intent file; second row removed (still todo)."""
    root, _ = world
    deps, _ = deps_for(world)
    for name in ("AI_BOARD_TOOL_LOOP", "AI_BOARD_GATE25_FIXES", "AI_BOARD_BEST_MATCH", "AI_BOARD_RETRIEVAL"):
        monkeypatch.setenv(name, "")
    argv = ["run", "--seed", str(SEED), "--split", "dev", "--cases", "2", "--repeats", "1", "--modes", "gold",
            "--gate25-answered", "--root", str(root), "--allow-dirty"]
    assert runner.main(argv, deps) == 0
    run_dir = next((root / "suite").glob("*-ans"))
    results = run_dir / "results.jsonl"
    original = results.read_bytes()
    rows = [json.loads(line) for line in original.decode("utf-8").splitlines()]
    first = {**rows[0], "cleanup_pending": True, "infra_error": True, "error": "trial_process_error"}
    results.write_text(json.dumps(first, ensure_ascii=False) + "\n", encoding="utf-8")
    intent = {"id": first["id"], "mode": first["mode"], "repeat": first["repeat"]}
    (run_dir / "trial-intent.json").write_text(json.dumps(intent), encoding="utf-8")
    yield run_dir, argv, deps, rows, first
    results.write_bytes(original)
    (run_dir / "trial-intent.json").unlink(missing_ok=True)
    (run_dir / reconcile.AUDIT).unlink(missing_ok=True)


def test_refuses_without_runner_and_changes_nothing(pending_run, tmp_path):
    run_dir, _, _, _, _ = pending_run
    before = {p.name: p.read_bytes() for p in run_dir.iterdir() if p.is_file()}
    path = journal_file(tmp_path, [RUN])
    with pytest.raises(reconcile.ReconcileError, match="chưa cấu hình"):
        reconcile.reconcile(run_dir, by="owner", reason="502 hạ tầng", journal=path, client=None)
    assert {p.name: p.read_bytes() for p in run_dir.iterdir() if p.is_file()} == before


def test_refuses_when_remote_run_not_confirmed_destroyed(pending_run, tmp_path):
    run_dir, _, _, _, _ = pending_run
    path = journal_file(tmp_path, [RUN])
    with pytest.raises(reconcile.ReconcileError, match="chưa xác nhận"):
        reconcile.reconcile(run_dir, by="owner", reason="502", journal=path, client=FakeClient({RUN: "running"}))
    with pytest.raises(reconcile.ReconcileError, match="không xác nhận"):
        reconcile.reconcile(run_dir, by="owner", reason="502", journal=path, client=FakeClient(fail=SandboxError("runner_unreachable", "destroy")))
    assert not (run_dir / reconcile.AUDIT).exists()
    assert (run_dir / "trial-intent.json").exists()
    assert json.loads((run_dir / "results.jsonl").read_text(encoding="utf-8").splitlines()[0])["cleanup_pending"] is True


def test_refuses_bad_journal_and_missing_reason(pending_run, tmp_path):
    run_dir, _, _, _, _ = pending_run
    client = FakeClient()
    with pytest.raises(reconcile.ReconcileError, match="thiếu"):
        reconcile.reconcile(run_dir, by="", reason="502", journal=journal_file(tmp_path, [RUN]), client=client)
    with pytest.raises(reconcile.ReconcileError, match="sai định dạng"):
        reconcile.reconcile(run_dir, by="owner", reason="502", journal=journal_file(tmp_path, ["../etc"]), client=client)
    outside = tmp_path / "runs"
    outside.write_text(RUN + "\n", encoding="ascii")
    with pytest.raises(reconcile.ReconcileError, match="journal phải"):
        reconcile.reconcile(run_dir, by="owner", reason="502", journal=outside, client=client)
    assert client.calls == []


def test_success_writes_audit_keeps_infra_row_and_clears_intent(pending_run, tmp_path):
    run_dir, _, _, rows, first = pending_run
    client = FakeClient()
    out = reconcile.reconcile(run_dir, by="owner", reason="502 vLLM, sandbox sống", journal=journal_file(tmp_path, [RUN, RUN2]), client=client)
    assert client.calls == [RUN, RUN2] and out["run_ids"] == {RUN: "destroyed", RUN2: "destroyed"}
    audit = [json.loads(line) for line in (run_dir / reconcile.AUDIT).read_text(encoding="utf-8").splitlines()]
    assert len(audit) == 1 and audit[0]["by"] == "owner" and audit[0]["reason"] == "502 vLLM, sandbox sống"
    assert audit[0]["run_dir"] == str(run_dir) and audit[0]["trial"] == {"id": first["id"], "mode": "gold", "repeat": 1}
    lines = [json.loads(line) for line in (run_dir / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    assert lines[0]["cleanup_pending"] is True and lines[-1]["cleanup_pending"] is False
    assert lines[-1]["infra_error"] is True and lines[-1]["id"] == first["id"]
    assert len(lines) == 2
    assert not (run_dir / "trial-intent.json").exists()


def test_reconcile_twice_is_refused_and_leaves_no_second_audit(pending_run, tmp_path):
    run_dir, _, _, _, _ = pending_run
    reconcile.reconcile(run_dir, by="owner", reason="502", journal=journal_file(tmp_path, [RUN]), client=FakeClient())
    after = (run_dir / "results.jsonl").read_bytes()
    with pytest.raises(reconcile.ReconcileError, match="không có trial cleanup_pending"):
        reconcile.reconcile(run_dir, by="owner", reason="502", journal=journal_file(tmp_path, [RUN]), client=FakeClient())
    assert (run_dir / "results.jsonl").read_bytes() == after
    assert len((run_dir / reconcile.AUDIT).read_text(encoding="utf-8").splitlines()) == 1


def test_resume_after_reconcile_runs_only_the_remaining_trial(pending_run, tmp_path):
    run_dir, argv, deps, rows, first = pending_run
    reconcile.reconcile(run_dir, by="owner", reason="502", journal=journal_file(tmp_path, [RUN]), client=FakeClient())
    calls = len(deps.models.calls)
    assert runner.main(argv, deps) == 0
    assert len(deps.models.calls) == calls + 1
    assert not any(key == first["id"] for _, key in deps.models.calls[calls:])


def test_cli_refuses_when_runner_missing(pending_run, tmp_path, monkeypatch):
    run_dir, _, _, _, _ = pending_run
    monkeypatch.delenv("AI_BOARD_SANDBOX_URL", raising=False)
    argv = ["reconcile", str(run_dir), "--by", "owner", "--reason", "502", "--journal", str(journal_file(tmp_path, [RUN]))]
    assert runner.main(argv) == 2
    assert not (run_dir / reconcile.AUDIT).exists()


def test_run_refuses_while_intent_pending_without_reconcile(pending_run):
    run_dir, argv, deps, _, _ = pending_run
    calls = len(deps.models.calls)
    assert runner.main(argv, deps) == 2
    assert len(deps.models.calls) == calls
