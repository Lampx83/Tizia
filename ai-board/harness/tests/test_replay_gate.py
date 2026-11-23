import json
import os
import subprocess
import types

import pytest

from evaluation.pipeline import driver, replay_gate as rg


def row(run, node, outcome="passed", at=1, **state):
    return {"run_id": run, "node": node, "outcome": outcome, "created_at": at, "state": state, "ledger": {}}


JOURNAL = [
    row(1, "attempt_open", at=1, base_sha="b1"),
    row(1, "gate_3", at=2, base_sha="b1", produced={"a.js": {"code": "x"}}),
    row(1, "gate_4", at=3, base_sha="b1"),
    row(2, "gate_3", at=4, base_sha="b2", produced={"a.js": {"code": "y"}}),
    row(2, "gate_4", "blocked", at=5, base_sha="b2"),
]


def test_fetch_parses_rows_and_plan():
    payload = {"root": {"id": 7, "plan_hash": "h"}, "plan": {"plan_json": json.dumps({"steps": [1, 2]}), "capability_policy_hash": "p"},
               "journal": [{"id": 1, "run_id": 3, "node": "gate_3", "outcome": "passed", "created_at": 9,
                            "state_delta": json.dumps({"base_sha": "b"}), "ledger": "{}"}]}
    data = rg.fetch(5, lambda sql: json.dumps(payload))
    assert data["plan"] == {"steps": [1, 2]} and data["journal"][0]["state"] == {"base_sha": "b"} and data["policy_hash"] == "p"


def test_fetch_missing_plan_refused():
    with pytest.raises(rg.ReplayError):
        rg.fetch(5, lambda sql: json.dumps({"root": None, "plan": None}))


def test_checkpoint_gate4_uses_latest_run_with_passed_gate3():
    cp = rg.pick_checkpoint(JOURNAL, 4)
    assert cp["run_id"] == 2 and cp["entries"][-1]["node"] == "gate_3" and cp["base_sha"] == "b2"


def test_checkpoint_gate5_skips_blocked_gate4_run():
    cp = rg.pick_checkpoint(JOURNAL, 5)
    assert cp["run_id"] == 1 and [e["node"] for e in cp["entries"]] == ["attempt_open", "gate_3", "gate_4"]


def test_checkpoint_gate3_needs_only_base_and_missing_checkpoint_refused():
    assert rg.pick_checkpoint(JOURNAL, 3) == {"run_id": 2, "entries": [], "base_sha": "b2"}
    with pytest.raises(rg.ReplayError):
        rg.pick_checkpoint([row(1, "gate_3", base_sha="b")], 4)


def test_board_query_is_read_only(monkeypatch):
    seen = {}
    monkeypatch.setattr(rg.subprocess, "run", lambda cmd, **kw: seen.update(cmd=cmd) or types.SimpleNamespace(returncode=0, stdout=b"{}", stderr=b""))
    rg.ro_query("pg", "SELECT 1")
    assert "PGOPTIONS=-c default_transaction_read_only=on" in seen["cmd"]
    sql = rg.SQL.upper()
    assert sql.lstrip().startswith("SELECT") and not any(w in sql for w in ("INSERT", "UPDATE", "DELETE", "DROP", "ALTER"))


class FakeExec:
    log: list = []

    def __init__(self, plan, **kw):
        self.kw, self.state, self.scratch, self.last_result = kw, {}, "/nope", {"gate": 5, "blocked": True, "reason": "r", "guest_switches": {"k": 1}}
        FakeExec.log = []

    def _checkout_head(self):
        return "head"

    def _prepare_resume(self):
        FakeExec.log.append("resume")
        return {"ok": 1}

    def attempt_open(self):
        FakeExec.log.append("open")

    def gate(self, n):
        FakeExec.log.append(f"gate{n}")
        return "blocked"


@pytest.fixture
def fake_worker(monkeypatch):
    mod = types.SimpleNamespace(
        _Execution=FakeExec, resume_pins=lambda **kw: {"plan_hash": kw["plan_hash"], "base": kw["base"], "config": "NEW"},
        pin_mismatch=lambda old, cur: sorted(k for k in cur if (old or {}).get(k) != cur[k]),
        _public_gate_result=lambda r: {"blocked": r["blocked"], "reason": r["reason"], "guest_switches": r.get("guest_switches")})
    monkeypatch.setattr(rg, "_worker", lambda: mod)
    from repositories import plan_session
    monkeypatch.setattr(plan_session, "get", lambda h: None)
    monkeypatch.setattr(plan_session, "get_approved", lambda h: None)


@pytest.fixture
def source(tmp_path):
    repo = tmp_path / "src"
    repo.mkdir()
    run = lambda *a: subprocess.run(["git", "-C", str(repo), *a], check=True, capture_output=True)
    run("init", "-q")
    run("-c", "user.name=t", "-c", "user.email=t@t", "commit", "--allow-empty", "-q", "-m", "x")
    sha = subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    return repo, sha


def _data():
    return {"root": {"id": 7, "plan_hash": "h", "budget_limit": 5, "title": "t"}, "plan": {"steps": []}, "policy_hash": "p"}


def test_gate5_restores_checkpoint_then_runs_only_gate5(fake_worker, source):
    repo, sha = source
    cp = {"run_id": 1, "base_sha": sha, "entries": [row(1, "gate_4", pins={"plan_hash": "h", "base": "head", "config": "OLD"})]}
    out = rg.run_once(_data(), 5, cp, repo, deps=object(), budget=types.SimpleNamespace(max_units=0), run_gate=None, cleanup=lambda *a, **k: None)
    assert FakeExec.log == ["resume", "open", "gate5"]
    assert out["blocked"] and out["guest_switches"] == {"k": 1} and out["pin_drift"] == ["config"]
    assert cp["entries"][-1]["state"]["pins"]["config"] == "NEW"


def test_gate3_skips_resume_and_clone_is_removed(fake_worker, source, monkeypatch):
    repo, sha = source
    paths = []
    monkeypatch.setattr(FakeExec, "attempt_open", lambda self: paths.append(self.kw["checkout_source"]))
    rg.run_once(_data(), 3, {"run_id": 1, "base_sha": sha, "entries": []}, repo, deps=object(),
                budget=types.SimpleNamespace(max_units=0), run_gate=None, cleanup=lambda *a, **k: None)
    assert FakeExec.log == ["gate3"] and not paths[0].exists() and FakeExec.log.count("resume") == 0


def test_replay_applies_arm_env_writes_report_and_leaves_db_alone(tmp_path):
    payload = {"root": {"id": 7, "plan_hash": "h"}, "plan": {"plan_json": "{}", "capability_policy_hash": "p"},
               "journal": [{"id": 1, "run_id": 1, "node": "gate_4", "outcome": "passed", "created_at": 1, "ledger": "{}",
                            "state_delta": json.dumps({"base_sha": "b", "produced": {"a": 1}})}]}
    queries, envs = [], []

    def runner(data, gate, cp, src):
        envs.append(os.environ.get("REPLAY_TEST_FLAG"))
        return {"blocked": False, "reason": None, "guest_switches": None, "pin_drift": []}

    report = rg.replay(1, 5, query=lambda sql: queries.append(sql) or json.dumps(payload), source=tmp_path,
                       arm_env={"REPLAY_TEST_FLAG": "1"}, times=2, out_dir=tmp_path / "out", arm="B0", runner=runner)
    assert envs == ["1", "1"] and "REPLAY_TEST_FLAG" not in os.environ
    assert len(queries) == 1 and queries[0].lstrip().upper().startswith("SELECT")
    assert len(json.loads(open(report["path"]).read())["runs"]) == 2


def test_driver_subcommand_wired(monkeypatch):
    calls = {}
    monkeypatch.setattr(rg, "replay", lambda *a, **k: calls.update(a=a, k=k) or {})
    assert driver.main(["replay-gate", "--request", "12", "--gate", "4", "--arm", "B0", "--times", "2"]) == 0
    assert calls["a"] == (12, 4) and calls["k"]["times"] == 2 and calls["k"]["arm_env"] == driver.arm_env("B0")


def test_driver_replay_error_exit_code(monkeypatch):
    def boom(*a, **k):
        raise rg.ReplayError("x")
    monkeypatch.setattr(rg, "replay", boom)
    assert driver.main(["replay-gate", "--request", "1", "--gate", "5"]) == 4


class FakeDocker:
    def __init__(self, running=True, exec_rc=0, exec_err=b""):
        self.calls, self.running, self.exec_rc, self.exec_err, self.sent = [], running, exec_rc, exec_err, {}

    def __call__(self, args, timeout=0):
        self.calls.append(args)
        rc, out, err = 0, b"", b""
        if args[0] == "inspect":
            out = b"true\n" if self.running else b"false\n"
        elif args[0] == "exec" and "python" in args:
            rc, err, out = self.exec_rc, self.exec_err, b"[replay] #1: PASSED\n"
        elif args[0] == "cp" and args[2].startswith("aiboard-worker:"):
            self.sent = json.loads(open(args[1], encoding="utf-8").read())
        elif args[0] == "cp":
            open(args[2], "w", encoding="utf-8").write(json.dumps({"request": 1, "gate": 5, "arm": "B0", "runs": [{"blocked": False}]}))
        return types.SimpleNamespace(returncode=rc, stdout=out, stderr=err)


PAYLOAD_SQL = json.dumps({"root": {"id": 7, "plan_hash": "h"}, "plan": {"plan_json": "{}", "capability_policy_hash": "p"},
                          "journal": [{"id": 1, "run_id": 1, "node": "gate_4", "outcome": "passed", "created_at": 1, "ledger": "{}",
                                       "state_delta": json.dumps({"base_sha": "b", "produced": {"a": 1}})}]})


def test_in_worker_ships_payload_execs_with_env_and_copies_report_back(tmp_path):
    fake = FakeDocker()
    report = rg.replay_in_worker(1, 5, query=lambda sql: PAYLOAD_SQL, arm_env={"AI_BOARD_X": "0"}, arm="B0",
                                 out_dir=tmp_path / "out", docker=fake)
    cmd = next(c for c in fake.calls if c[0] == "exec" and "python" in c)
    assert cmd[:3] == ["exec", "-w", rg.WORKER_HARNESS] and "AI_BOARD_X=0" in cmd
    assert cmd[cmd.index("-m") + 1] == "evaluation.pipeline.replay_gate"
    assert fake.sent["gate"] == 5 and fake.sent["arm_env"] == {"AI_BOARD_X": "0"} and fake.sent["checkpoint"]["base_sha"] == "b"
    assert os.path.dirname(report["path"]) == str(tmp_path / "out") and os.path.exists(report["path"])
    assert any(c[:3] == ["exec", "aiboard-worker", "rm"] for c in fake.calls)


def test_in_worker_refuses_when_worker_down(tmp_path):
    fake = FakeDocker(running=False)
    with pytest.raises(rg.ReplayError, match="not running"):
        rg.replay_in_worker(1, 5, query=lambda sql: PAYLOAD_SQL, out_dir=tmp_path, docker=fake)
    assert [c[0] for c in fake.calls] == ["inspect"]


def test_in_worker_missing_module_says_rebuild(tmp_path):
    fake = FakeDocker(exec_rc=1, exec_err=b"No module named evaluation.pipeline.replay_gate")
    with pytest.raises(rg.ReplayError, match="rebuild the worker image"):
        rg.replay_in_worker(1, 5, query=lambda sql: PAYLOAD_SQL, out_dir=tmp_path, docker=fake)


def test_worker_main_runs_payload_and_writes_report(tmp_path, monkeypatch):
    payload = {"request": 1, "gate": 5, "arm": "B0", "arm_env": {}, "times": 1, "data": {"plan": {}},
               "checkpoint": {"run_id": 1, "base_sha": "b", "entries": []}}
    p = tmp_path / "p.json"
    p.write_text(json.dumps(payload))
    monkeypatch.setattr(rg, "run_once", lambda *a, **k: {"blocked": False, "reason": None, "guest_switches": None, "pin_drift": []})
    assert rg.main(["--payload", str(p)]) == 0
    assert json.loads((tmp_path / "p.json.report.json").read_text())["runs"][0]["blocked"] is False
