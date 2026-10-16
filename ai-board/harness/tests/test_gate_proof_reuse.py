"""Gate 4 proof reuse: pin drift, missing proof, blocked results and an unreachable verifier all verify for real."""
import sys
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import worker  # noqa: E402
import candidate  # noqa: E402
from repositories import server_hsm  # noqa: E402
from repositories.server_gate_proof import gate4_pins  # noqa: E402


class Client:
    def __init__(self, reuse=None, fail=False):
        self.reuse, self.fail, self.calls = reuse, fail, []

    def post(self, path, body):
        self.calls.append((path.rsplit("/", 1)[-1], body))
        if path.endswith("/check"):
            if self.fail:
                raise OSError("down")
            return self.reuse or {"reuse": False, "reason": "no_proof", "drift": []}
        return {"ok": True}


def backend(client):
    return SimpleNamespace(client=client, path="/api/ai-board/worker/tickets/7/hsm",
                           identity={"run_id": 3, "worker_id": "w", "lease_token": "t"})


def state():
    return {"diffs": [{"file": "public/a.html", "diff": "+x"}], "base_sha": "abc", "catalog": {"public.ui": 1}}


def deps():
    return SimpleNamespace(models=SimpleNamespace(gate1_model="m"))


PASSED = {"gate": 4, "blocked": False, "issues": [], "checks": ["lint"]}


def run(client, monkeypatch, result=PASSED, st=None):
    ran = []
    monkeypatch.setattr(candidate, "ensure", lambda s, g: None)

    def run_gate(gate, *_):
        ran.append(gate)
        return dict(result)

    s = st if st is not None else state()
    with server_hsm.server_scope(backend(client)):
        out = worker._gate4_with_proof(run_gate, deps(), None, s, "plan-a")
    return out, ran, s


def test_no_proof_runs_the_gate_and_records_a_passing_result(monkeypatch):
    client = Client()
    out, ran, _ = run(client, monkeypatch)
    assert ran == [4] and out["blocked"] is False
    assert [name for name, _ in client.calls] == ["check", "record"]
    recorded = client.calls[1][1]["result"]
    assert recorded["checks"] == ["lint"] and "_state" in recorded


def test_blocked_result_is_never_recorded(monkeypatch):
    client = Client()
    out, ran, _ = run(client, monkeypatch, result={"gate": 4, "blocked": True, "reason": "x"})
    assert ran == [4] and [name for name, _ in client.calls] == ["check"]


def test_valid_proof_skips_the_gate_and_restores_the_scan_flags(monkeypatch):
    stored = {**PASSED, "_state": {"ui_changed": True, "guard_flags": ["f"], "review_required": False}}
    client = Client(reuse={"reuse": True, "result": stored, "proof_run_id": 2})
    out, ran, st = run(client, monkeypatch)
    assert ran == [] and out["blocked"] is False and "_state" not in out
    assert (st["ui_changed"], st["guard_flags"], st["review_required"]) == (True, ["f"], False)
    assert [name for name, _ in client.calls] == ["check"]


def test_drift_or_unreachable_verifier_checks_for_real(monkeypatch):
    for client in (Client(reuse={"reuse": False, "reason": "pin_drift", "drift": ["candidate"]}), Client(fail=True)):
        out, ran, _ = run(client, monkeypatch)
        assert ran == [4]


def test_reuse_still_rebuilds_the_worktree_and_surfaces_its_failure(monkeypatch):
    client = Client(reuse={"reuse": True, "result": dict(PASSED), "proof_run_id": 2})
    monkeypatch.setattr(candidate, "ensure", lambda s, g: {"gate": 4, "blocked": True, "reason": "git"})
    with server_hsm.server_scope(backend(client)):
        out = worker._gate4_with_proof(lambda *a: PASSED, deps(), None, state(), "plan-a")
    assert out["blocked"] is True and out["reason"] == "git"


def test_without_a_server_backend_the_gate_just_runs(monkeypatch):
    out = worker._gate4_with_proof(lambda *a: dict(PASSED), deps(), None, state(), None)
    assert out["blocked"] is False


def test_pins_change_with_the_artifact_plan_and_model():
    base = gate4_pins(state(), plan_hash="p", model="m", tool_hash="t")
    other = state()
    other["diffs"] = [{"file": "public/a.html", "diff": "+y"}]
    assert gate4_pins(other, plan_hash="p", model="m", tool_hash="t")["candidate"] != base["candidate"]
    assert gate4_pins(state(), plan_hash="q", model="m", tool_hash="t")["plan"] != base["plan"]
    assert gate4_pins(state(), plan_hash="p", model="n", tool_hash="t")["model"] != base["model"]
    assert gate4_pins(state(), plan_hash="p", model="m", tool_hash="u")["tool"] != base["tool"]


def test_the_scratch_commit_sha_is_not_part_of_the_artifact_pin():
    first, second = state(), state()
    first["diffs"][0]["commit"], second["diffs"][0]["commit"] = "a" * 40, "b" * 40
    assert gate4_pins(first, plan_hash="p", model="m", tool_hash="t") == gate4_pins(second, plan_hash="p", model="m", tool_hash="t")
