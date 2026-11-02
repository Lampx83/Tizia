"""Worker E2E với graph persistence: crash giữa node → resume vào lại attempt_open + replay; ledger không đếm đôi; lease cũ bị chặn."""
import subprocess
import sys
from pathlib import Path
import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from repositories.server_graph_saver import HttpGraphSaver
from runtime.budget import Budget
from test_graph_persistence import LEASE, FakeServer
from worker import _Execution, resume_pins

PLAN = {"steps": [{"order": 1, "title": "A", "allowed_scope": ["public/a.html"], "tests": ["t"]}], "capabilities": []}


class Crash(BaseException):
    """BaseException: giả lập process chết, không bị _attempt nuốt."""


class FakeCheckpoint:
    """Đối tượng checkpoint của Worker: ledger/cursor nằm trên server giả, graph saver đi qua HTTP giả."""

    def __init__(self, server, run_scope="ticket-7:digA", lease=LEASE):
        self.server, self.run_scope, self.lease, self.ledger, self.cursor = server, run_scope, lease, None, None
        self.saves = 0

    def attempt(self, n):
        return self

    def restore(self, budget):
        if self.ledger:
            budget.absorb(self.ledger)

    def save(self, budget):
        self.saves += 1
        self.ledger = budget.snapshot()

    def load_cursor(self):
        return self.cursor

    def save_cursor(self, cursor):
        self.cursor = cursor

    def purge(self):
        pass

    def graph_saver(self, pin):
        return HttpGraphSaver(self.server, 7, self.lease, pin, thread_id=f"{self.run_scope}:graph")


def worker(checkpoint, run_gate, budget, resume=None, journal_hook=None):
    return _Execution(PLAN, ticket_id=7, checkout_source=".", deps=object(), budget=budget, run_gate=run_gate,
                      cleanup=lambda *a, **k: None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                      candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                      checkpoint=checkpoint, plan_hash=None, resume=resume, journal_hook=journal_hook)


@pytest.fixture
def flag(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GRAPH_PERSISTENCE", "1")
    monkeypatch.delenv("AI_BOARD_TOOL_LOOP", raising=False)


def gates(log, seen, crash_after_3=False, gate4_reason=None):
    def run_gate(gate, _request, _deps, bud, _state):
        log.append(gate)
        if gate == 3:
            seen.setdefault("calls_on_entry", []).append(bud.model_calls)
            bud.spend("model_calls", 2)
            return {"gate": 3, "blocked": False}
        if gate == 4:
            if crash_after_3:
                raise Crash("killed between gate 3 and gate 4")
            return {"gate": 4, "blocked": True, "reason": gate4_reason or "stop", "failure_class": "critical"}
        return {"gate": gate, "blocked": True, "reason": "stop", "failure_class": "critical"}
    return run_gate


def test_crash_between_nodes_resumes_by_reentry_without_double_counting_ledger(flag):
    server, cp, log, seen = FakeServer(), FakeCheckpoint(FakeServer()), [], {}
    cp = FakeCheckpoint(server)
    with pytest.raises(Crash):
        worker(cp, gates(log, seen, crash_after_3=True), Budget()).run()
    assert log == [3, 4]
    saved_calls = cp.ledger["model_calls"]
    assert saved_calls == 2
    log.clear()
    second = Budget()
    worker(cp, gates(log, seen), second).run()
    assert seen["calls_on_entry"] == [0, 2], "run 2 restores the saved ledger before gate 3"
    # Gate 3 has no tool-step replay here, so its spend is real and counted again: 2 saved + 2 re-run.
    # Replay of recorded tool steps (tool_loop store) is what avoids re-spending; see evidence.
    assert second.model_calls == 4
    assert log[0] == 3 and 4 in log, "resume re-enters the attempt from gate 3"


def test_flag_on_resume_needs_no_tool_loop_flag(flag, monkeypatch):
    import worker as worker_module
    monkeypatch.setattr(worker_module, "_worker_checkpoint", lambda *a, **k: None)
    log, seen = [], {}
    cp = FakeCheckpoint(FakeServer())
    worker(cp, gates(log, seen), Budget()).run()
    assert cp.saves >= 1
    assert "AI_BOARD_TOOL_LOOP" not in __import__("os").environ


def test_stale_lease_worker_is_blocked_and_leaves_no_graph_rows(flag):
    server = FakeServer()
    old = FakeCheckpoint(server, lease={"worker_id": "w1", "lease_token": "t0"})
    log, seen = [], {}
    with pytest.raises(RuntimeError, match="stale_lease"):
        worker(old, gates(log, seen), Budget()).run()
    assert server.checkpoints == {}
    assert log == []


def test_changed_plan_starts_a_separate_thread_and_leaves_old_progress(flag):
    server, log, seen = FakeServer(), [], {}
    with pytest.raises(Crash):
        worker(FakeCheckpoint(server, run_scope="ticket-7:digA"), gates(log, seen, crash_after_3=True), Budget()).run()
    assert any(key[0].startswith("ticket-7:digA") for key in server.checkpoints)
    log.clear()
    worker(FakeCheckpoint(server, run_scope="ticket-7:digB"), gates(log, seen), Budget()).run()
    assert any(key[0].startswith("ticket-7:digA") for key in server.checkpoints), "old thread untouched"
    assert any(key[0].startswith("ticket-7:digB") for key in server.checkpoints)
    assert log[0] == 3


def test_journal_keeps_the_code_gate_3_wrote_into_the_attempt_state():
    seen = []
    instance = _Execution(PLAN, ticket_id=7, checkout_source=".", deps=object(), budget=Budget(), run_gate=None,
                          cleanup=None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                          candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                          checkpoint=None, plan_hash=None, journal_hook=lambda node, outcome, snap: seen.append(snap))
    instance.state = {"produced": dict(PRODUCED), "base_sha": "a" * 40}
    instance.journal("gate_3", "passed")
    assert seen[0]["state"]["produced"] == PRODUCED
    assert seen[0]["state"]["base_sha"] == "a" * 40


PRODUCED = {"public/a.html": {"model": "light", "test_file": "test/a.test.js", "code": "<!doctype html>",
                              "test": "import test from 'node:test';\n// public/a.html\n"}}


def journal_run(plan_hash=None, graph=None, base=None, produced=None, outcome="passed", ledger=None, node="gate_3"):
    import subprocess
    base = base or subprocess.run(["git", "rev-parse", "HEAD"], cwd=".", capture_output=True,
                                  text=True, check=True).stdout.strip()
    pins = resume_pins(plan_hash=plan_hash, base=base, policy_hash=None)
    if graph:
        pins["graph"] = graph
    full = {
        "produced": dict(PRODUCED if produced is None else produced),
        "base_sha": base, "repairs": [], "gates": [{"gate": 3, "blocked": False}],
        "pins": pins,
        "resumable": True,
    }
    entries = [{"node": "gate_3", "outcome": outcome, "created_at": 1,
                "ledger": dict(ledger or {}), "state": full}]
    if node == "gate_4":
        entries.append({"node": "gate_4", "outcome": "passed", "created_at": 2, "ledger": dict(ledger or {}),
                        "state": {**{k: v for k, v in full.items() if k != "produced"},
                                  "gates": [{"gate": 3, "blocked": False}, {"gate": 4, "blocked": False}]}})
    return [{"run_id": "41", "entries": entries}]


def test_matching_journal_skips_gate_3_and_reuses_the_generated_code(flag):
    server, log, seen = FakeServer(), [], {}
    cp = FakeCheckpoint(server)
    result = worker(cp, gates(log, seen), Budget(), resume=journal_run()).run()
    assert log == [4], "gate 3 không chạy lại; gate 4 chạy tiếp"
    assert seen.get("calls_on_entry") is None, "không có model call nào cho gate 3"
    assert result["gates"][0]["gate"] == 3, "gate 3 đã xong vẫn nằm trong gates"
    assert result["gate_reached"] == 4


def test_resume_pin_mismatch_runs_gate_3_again(flag):
    server, log, seen = FakeServer(), [], {}
    cp = FakeCheckpoint(server)
    worker(cp, gates(log, seen), Budget(), resume=journal_run(plan_hash="other-plan")).run()
    assert log == [3, 4], "pin lệch thì chạy lại từ gate 3"
    assert seen["calls_on_entry"] == [0]


def test_resume_unavailable_when_no_generated_code_in_the_journal(flag):
    server, log, seen = FakeServer(), [], {}
    worker(FakeCheckpoint(server), gates(log, seen), Budget(), resume=journal_run(produced={})).run()
    assert log == [3, 4], "journal thiếu code thì gate 3 làm lại"


def test_resume_only_when_gate_3_is_the_last_completed_node(flag):
    server, log, seen = FakeServer(), [], {}
    journal = journal_run()
    journal[0]["entries"].append({"node": "gate_4", "outcome": "passed", "created_at": 2, "state": {}})
    worker(FakeCheckpoint(server), gates(log, seen), Budget(), resume=journal).run()
    assert log == [3, 4], "crash sau gate 4 chưa được resume ở lát này"


def test_resume_absorbs_the_journal_ledger_before_the_next_gate(flag):
    server, log, seen = FakeServer(), [], {}
    def gates4_spends(gate, _request, _deps, bud, _state):
        log.append(gate)
        if gate == 3:
            raise AssertionError("gate 3 must not run after a matching journal")
        bud.spend("model_calls", 2)
        return {"gate": 4, "blocked": True, "reason": "stop", "failure_class": "critical"}
    budget = Budget()
    worker(FakeCheckpoint(server), gates4_spends, budget,
           resume=journal_run(ledger={"model_calls": 2, "max_model_calls": 40})).run()
    assert log == [4]
    assert budget.model_calls == 4, "2 da tieu truoc khi kill + 2 cua gate 4, khong phai 2 hay 6"


def test_preparing_a_resume_twice_does_not_inflate_the_ledger(flag):
    instance = worker(FakeCheckpoint(FakeServer()), gates([], {}), Budget(),
                      resume=journal_run(ledger={"model_calls": 2}))
    assert instance._prepare_resume() is not None
    assert instance.budget.model_calls == 2
    assert instance._prepare_resume() is not None
    assert instance.budget.model_calls == 2, "absorb: max, khong cong don"


@pytest.mark.parametrize("pin", ["plan_hash", "base", "config", "policy", "graph", "missing"])
def test_any_changed_pin_invalidates_the_journal(pin, flag):
    server, log, seen, journaled = FakeServer(), [], {}, []
    journal = journal_run()
    entry = journal[0]["entries"][0]
    if pin == "missing":
        entry["state"]["pins"] = {}
    else:
        entry["state"]["pins"][pin] = "other"
    worker(FakeCheckpoint(server), gates(log, seen), Budget(), resume=journal,
           journal_hook=lambda node, outcome, snap: journaled.append((node, outcome, snap))).run()
    assert log == [3, 4], "pin lech thi purge checkpoint va chay moi"
    reasons = [snap["state"]["mismatch"] for node, outcome, snap in journaled
               if node == "resume" and outcome == "pin_mismatch"]
    assert reasons and (pin in reasons[0] or "missing" in reasons[0])


def _git_repo(tmp_path):
    repo = tmp_path / "repo"
    repo.mkdir()
    def git(*args):
        return subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, check=True).stdout
    git("init", "-q")
    git("config", "user.email", "test@example.com")
    git("config", "user.name", "Test")
    (repo / "base.txt").write_text("base\n", encoding="utf-8")
    git("add", "-A")
    git("commit", "-q", "-m", "base")
    return repo, git("rev-parse", "HEAD").strip()


def test_resume_after_gate_4_rebuilds_one_candidate_and_runs_only_gate_5(flag, tmp_path):
    from services import candidate
    repo, head = _git_repo(tmp_path)
    journal, log = journal_run(base=head, node="gate_4"), []

    def run_gate(gate, _request, _deps, _budget, _state):
        log.append(gate)
        return {"gate": gate, "blocked": True, "reason": "stop", "failure_class": "critical"}

    def instance():
        return _Execution(PLAN, ticket_id=7, checkout_source=repo, deps=object(), budget=Budget(), run_gate=run_gate,
                          cleanup=candidate.cleanup, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                          candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None,
                          checkpoint=None, plan_hash=None, resume=journal)

    first = instance()
    seed = first._prepare_resume()
    assert seed and seed["resume_nodes"] == {"gate_3": "passed", "gate_4": "passed"}
    assert len(seed["candidate_state"]["commits"]) == 1
    candidate.cleanup({**seed, **seed["candidate_state"]}, keep_branch=False)

    second = instance()
    seed2 = second._prepare_resume()
    assert seed2 and len(seed2["candidate_state"]["commits"]) == 1
    listed = subprocess.run(["git", "worktree", "list", "--porcelain"], cwd=repo, capture_output=True, text=True).stdout
    assert listed.count("ai-board-worktree-") == 1, "leftover worktree duoc don, chi con candidate dang dung"
    candidate.cleanup({**seed2, **seed2["candidate_state"]}, keep_branch=False)

    log.clear()
    instance().run()
    assert log == [5], "gate 3 va 4 da xong thi chi chay gate 5"


def test_resume_keeps_repair_history_classification_and_stagnation(flag):
    journal = journal_run()
    entry = journal[0]["entries"][0]
    entry["state"]["repairs"] = [{"gate": 4, "reason": "lan sua 1"}]
    entry["state"]["repair_state"] = {
        "round_metrics": [{"gate": 4, "fails": 2, "diff": "abc"}], "diff_texts": ["diff cu"],
        "progress_rounds": 1, "no_progress": 1, "stop_note": "stuck gan",
        "repair_reason": "cong 4: lan sua 1",
    }
    instance = worker(FakeCheckpoint(FakeServer()), gates([], {}), Budget(), resume=journal)
    assert instance._prepare_resume() is not None
    assert instance.repairs == [{"gate": 4, "reason": "lan sua 1"}]
    assert instance.round_metrics == [{"gate": 4, "fails": 2, "diff": "abc"}]
    assert instance.diff_texts == ["diff cu"]
    assert (instance.progress_rounds, instance.no_progress) == (1, 1)
    assert instance.stop_note == "stuck gan"
    assert instance.repair_reason == "cong 4: lan sua 1"
