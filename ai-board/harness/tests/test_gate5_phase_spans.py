"""Gate 5 setup/teardown phases emit spans in order on the guest and the host; verdicts unchanged."""
import json
from types import SimpleNamespace

import pytest

from gates import verify
from test_gate5_check_spans import Trace
from test_gate_5_verify import FakeRunner, checkout, state
from verification import functional
from verification import sandbox as sandbox_verify

GUEST_ORDER = ["gate5 setup config", "gate5 setup build", "gate5 setup app_up", "gate5 setup ready",
               "gate5 step tests", "gate5 step smoke", "gate5 teardown"]


@pytest.fixture(autouse=True)
def served(monkeypatch):
    monkeypatch.setattr(verify, "probe_http", lambda _url: (200, b"<h1>changed</h1>\n// x\n"))
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})
    monkeypatch.setattr(sandbox_verify, "_sleep", lambda *_: None)


def phases(trace):
    return [s for s in trace.spans if not s["name"].startswith("gate5 check ")]


def test_guest_phases_are_spans_in_order_around_the_checks(tmp_path):
    trace = Trace()
    out = verify.run(state(checkout(tmp_path)), SimpleNamespace(trace=trace), runner=FakeRunner())

    assert out["blocked"] is False
    assert [s["name"] for s in phases(trace)] == GUEST_ORDER
    assert all(s["status"] == "ok" and s["end_ms"] >= s["start_ms"] for s in phases(trace))
    names = [s["name"] for s in trace.spans]
    first_check = next(i for i, n in enumerate(names) if n.startswith("gate5 check "))
    assert names.index("gate5 step smoke") < first_check < names.index("gate5 teardown")


def test_failed_app_up_span_is_error_and_teardown_still_has_a_span(tmp_path):
    trace, root = Trace(), checkout(tmp_path)
    with_trace = verify.run(state(root), SimpleNamespace(trace=trace), runner=FakeRunner(fail="up"))
    bare = verify.run(state(root), runner=FakeRunner(fail="up"))

    assert [(s["name"], s["status"]) for s in phases(trace)] == [
        ("gate5 setup config", "ok"), ("gate5 setup build", "ok"), ("gate5 setup app_up", "error"), ("gate5 teardown", "ok")]
    assert (with_trace["blocked"], with_trace["failure_class"]) == (bare["blocked"], bare["failure_class"]) == (True, "transient")


def test_build_runs_before_up_and_up_never_rebuilds(tmp_path):
    runner = FakeRunner()
    verify.run(state(checkout(tmp_path)), runner=runner)
    compose = [args for args, _ in runner.calls if args[0] == "docker" and ("build" in args or "up" in args)]
    assert compose[0][-1] == "build"
    assert "up" in compose[1] and "--no-build" in compose[1] and "--build" not in compose[1]
    assert compose[1][compose[1].index("--wait-timeout") + 1] == "120"


class _Client:
    def __init__(self, result):
        self.result, self.calls = result, []

    def create(self, run_id, manifest):
        self.calls.append("create")
        return {"run_id": run_id, "state": "ready", "policy_hash": "h" * 64}

    def upload(self, run_id, archive):
        self.calls.append("upload")

    def exec(self, run_id, argv, *, timeout):
        self.calls.append(argv[0])
        return {"code": 0, "stdout": "", "stderr": "", "timed_out": False, "truncated": False}

    def download(self, run_id, name):
        self.calls.append("download")
        return json.dumps(self.result).encode() if name == "result" else b""

    def renew(self, run_id):
        pass

    def destroy(self, run_id):
        self.calls.append("destroy")
        return {"state": "destroyed"}


HOST_ORDER = ["gate5 setup package", "gate5 setup create", "gate5 setup upload", "gate5 setup boot",
              "gate5 teardown collect", "gate5 teardown destroy"]


def _host_state(root):
    return {"skill_id": "skill-1", "full_checkout": str(root), "diffs": [{"file": "public/x.html", "diff": "+x"}]}


def test_host_phases_are_spans_in_order(tmp_path):
    trace = Trace()
    client = _Client({"gate": 5, "blocked": False, "reason": None, "evidence": {"screenshots": []}})
    out = sandbox_verify.run(_host_state(checkout(tmp_path)), SimpleNamespace(trace=trace), client=client)

    assert out["blocked"] is False
    assert [s["name"] for s in trace.spans] == HOST_ORDER
    assert all(s["status"] == "ok" for s in trace.spans)
    assert out["evidence"]["sandbox"]["teardown_confirmed"] is True


def test_host_layer_load_has_its_own_span_after_boot(tmp_path, monkeypatch):
    layer = tmp_path / "deps.tar"
    layer.write_bytes(b"layer")
    monkeypatch.setattr(sandbox_verify, "_layer", lambda *_: layer)
    trace = Trace()
    client = _Client({"gate": 5, "blocked": False, "reason": None, "evidence": {"screenshots": []}})
    sandbox_verify.run(_host_state(checkout(tmp_path)), SimpleNamespace(trace=trace), client=client)
    names = [s["name"] for s in trace.spans]
    assert names[names.index("gate5 setup boot") + 1] == "gate5 setup layer"


def test_host_replays_guest_phase_spans_and_drops_unknown_names(tmp_path):
    guest = {"gate": 5, "blocked": False, "reason": None, "evidence": {"screenshots": []}, "check_spans": [
        {"name": "gate5 setup build", "attributes": {"x": "dropped"}, "offset_ms": 50, "duration_ms": 900, "status": "ok"},
        {"name": "gate5 teardown", "attributes": {}, "offset_ms": 2000, "duration_ms": 10, "status": "error"},
        {"name": "gate5 setup anything", "attributes": {}, "offset_ms": 0, "duration_ms": 1, "status": "ok"}]}
    trace = Trace()
    out = sandbox_verify.run(_host_state(checkout(tmp_path)), SimpleNamespace(trace=trace), client=_Client(guest))

    assert "check_spans" not in out
    replayed = {s["name"]: s for s in trace.spans if s["name"] in ("gate5 setup build", "gate5 teardown")}
    assert replayed["gate5 setup build"]["end_ms"] - replayed["gate5 setup build"]["start_ms"] == 900
    assert replayed["gate5 setup build"]["attributes"] == {}
    assert replayed["gate5 teardown"]["status"] == "error"
    assert "gate5 setup anything" not in [s["name"] for s in trace.spans]
