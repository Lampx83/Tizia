"""Gate 5 checks emit one span each (browser, curl, route); verdicts stay identical with or without a trace."""
import json
from types import SimpleNamespace

import pytest

from gate5 import verify
from test_gate_5_verify import FakeRunner, checkout, state
from gate5 import functional


@pytest.fixture(autouse=True)
def served(monkeypatch):
    monkeypatch.setattr(verify, "probe_http", lambda _url: (200, b"<h1>changed</h1>\n// x\n"))
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})


class Trace:
    def __init__(self):
        self.spans = []

    def add_span(self, name, attributes, *, start_ms, end_ms, status="ok", kind="internal"):
        self.spans.append({"name": name, "attributes": dict(attributes), "start_ms": start_ms,
                           "end_ms": end_ms, "status": status, "kind": kind})
        return self.spans[-1]

    def kind(self, name):
        return [s for s in self.spans if s["attributes"].get("tizia.gate5.check.kind") == name]


def _png(url, path, width=1280, **_):
    path.write_bytes(b"png")


def test_browser_check_emits_one_span_per_capture_with_path_only(tmp_path, monkeypatch):
    monkeypatch.setattr(verify, "capture_screenshot", _png)
    monkeypatch.setattr(functional, "select", lambda _state: functional.ROUTE_PROBE)
    body = b"<h1>changed</h1>\n"
    trace = Trace()
    out = verify.run(state(checkout(tmp_path), visual=True), SimpleNamespace(trace=trace), runner=FakeRunner(),
                     http_probe=lambda _url: (200, body))

    browser = trace.kind("browser")
    assert out["blocked"] is False
    assert [b["attributes"]["tizia.gate5.check.target"] for b in browser] == ["/x.html", "/x.html"]
    assert all(b["name"] == "gate5 check browser" and b["status"] == "ok" for b in browser)
    assert all(b["end_ms"] >= b["start_ms"] for b in browser)


def test_failed_browser_check_span_is_error_and_verdict_unchanged(tmp_path, monkeypatch):
    def boom(url, path, width=1280, **_):
        raise ImportError("playwright absent")

    monkeypatch.setattr(verify, "capture_screenshot", boom)
    monkeypatch.setattr(functional, "select", lambda _state: functional.ROUTE_PROBE)
    body = b"<h1>changed</h1>\n"
    root = checkout(tmp_path)
    trace = Trace()
    with_trace = verify.run(state(root, visual=True), SimpleNamespace(trace=trace), runner=FakeRunner(),
                            http_probe=lambda _url: (200, body))
    bare = verify.run(state(root, visual=True), runner=FakeRunner(), http_probe=lambda _url: (200, body))

    assert trace.kind("browser")[0]["status"] == "error"
    assert with_trace["blocked"] is True and bare["blocked"] is True
    assert with_trace["reason"] == bare["reason"] and with_trace["failure_class"] == bare["failure_class"] == "transient"
    assert "playwright absent" in with_trace["reason"]


def test_http_probe_emits_curl_span_with_query_dropped_and_status_kept(tmp_path):
    root = checkout(tmp_path)
    body = (root / "public" / "x.html").read_bytes()
    trace = Trace()
    out = verify.run(state(root, visual=True), SimpleNamespace(trace=trace), runner=FakeRunner(),
                     http_probe=lambda url: (404, b"") if "x.html" in url else (200, body))

    curl = trace.kind("curl")
    assert out["blocked"] is True and "HTTP 404" in out["reason"]
    assert len(curl) == 1 and curl[0]["name"] == "gate5 check curl"
    assert curl[0]["attributes"]["tizia.gate5.check.target"] == "/x.html"
    assert curl[0]["attributes"]["tizia.gate5.check.http_status"] == 404


def test_acceptance_curl_emits_span_and_node_test_does_not(tmp_path):
    s = {**state(checkout(tmp_path)), "acceptance": ["node --test test/generated.test.js",
                                                    "curl -fsS 'http://127.0.0.1:8041/api/x?token=abc'"]}
    trace = Trace()
    out = verify.run(s, SimpleNamespace(trace=trace), runner=FakeRunner())

    assert out["blocked"] is False
    curl = trace.kind("curl")
    assert [c["attributes"]["tizia.gate5.check.target"] for c in curl] == ["/api/x", "/x.js"]
    assert all(c["name"] == "gate5 check curl" for c in curl)
    assert "abc" not in str(trace.spans)
    assert "Feature acceptance passed: curl -fsS 'http://127.0.0.1:8041/api/x?token=abc'" in out["evidence"]["text"]


@pytest.mark.parametrize("probe_id, kind", [("ROUTE_PROBE", "route"), ("TEXT_PROBE", "browser")])
def test_functional_probe_span_kind_follows_probe_id(tmp_path, monkeypatch, probe_id, kind):
    monkeypatch.setattr(verify, "capture_screenshot", _png)
    monkeypatch.setattr(functional, "select", lambda _state: getattr(functional, probe_id))
    trace = Trace()
    out = verify.run(state(checkout(tmp_path), visual=True), SimpleNamespace(trace=trace), runner=FakeRunner(),
                     http_probe=lambda _url: (200, b"<h1>changed</h1>\n"),
                     functional_probe=lambda base, pid: {"probe_id": pid, "passed": True})

    assert out["blocked"] is False
    assert {s["name"] for s in trace.kind(kind)} == {f"gate5 check {kind}"}
    assert (len(trace.kind("route")) == 1) == (kind == "route")


def test_failed_route_probe_span_is_error(tmp_path, monkeypatch):
    from gate5 import functional
    monkeypatch.setattr(functional, "select", lambda _state: functional.ROUTE_PROBE)
    trace = Trace()
    out = verify.run(state(checkout(tmp_path), visual=True), SimpleNamespace(trace=trace), runner=FakeRunner(),
                     http_probe=lambda _url: (200, b"<h1>changed</h1>\n"),
                     functional_probe=lambda base, pid: {"probe_id": pid, "passed": False, "reason": "no"})

    assert out["blocked"] is True
    assert trace.kind("route")[0]["status"] == "error"


def test_guest_run_writes_check_spans_as_offsets_into_result(tmp_path, monkeypatch):
    from gates import gate5_guest

    def fake_run(state, deps=None, budget=None, *, checkout_dir=None, **_):
        start = deps.trace.origin_ms + 10
        deps.trace.add_span("gate5 check curl", {"tizia.gate5.check.kind": "curl"}, start_ms=start, end_ms=start + 5)
        return {"gate": 5, "blocked": False, "reason": None, "evidence": {"text": "ok"}}

    monkeypatch.setattr(verify, "run", fake_run)
    state_path, out = tmp_path / "state.json", tmp_path / "out"
    state_path.write_text("{}", encoding="utf-8")
    out.mkdir()
    result = gate5_guest.run_in_guest(state_path, tmp_path, out)

    assert result["check_spans"] == [{"name": "gate5 check curl", "attributes": {"tizia.gate5.check.kind": "curl"},
                                      "offset_ms": 10, "duration_ms": 5, "status": "ok"}]
    assert json.loads((out / "result.json").read_text(encoding="utf-8"))["check_spans"] == result["check_spans"]


def test_host_replays_guest_check_spans_and_verdict_is_unchanged(tmp_path):
    from test_sandbox_verify import FakeClient, state as sandbox_state
    from verification import sandbox as sandbox_verify

    root = checkout(tmp_path)
    plain = {"gate": 5, "blocked": True, "reason": "smoke failed", "failure_class": "ordinary", "evidence": {"screenshots": []}}
    guest = {**plain, "check_spans": [
        {"name": "gate5 check browser", "attributes": {"tizia.gate5.check.kind": "browser", "tizia.gate5.check.target": "/x.html",
                                                      "unrelated": "dropped"},
         "offset_ms": 100, "duration_ms": 40, "status": "error"},
        {"name": "not a check", "attributes": {}, "offset_ms": 0, "duration_ms": 1, "status": "ok"}]}
    trace = Trace()
    with_spans = sandbox_verify.run(sandbox_state(root), SimpleNamespace(trace=trace), client=FakeClient(result=guest))
    without = sandbox_verify.run(sandbox_state(root), SimpleNamespace(trace=Trace()), client=FakeClient(result=plain))

    assert "check_spans" not in with_spans
    assert (with_spans["blocked"], with_spans["reason"], with_spans["failure_class"]) == (
        without["blocked"], without["reason"], without["failure_class"]) == (True, "smoke failed", "ordinary")
    checks = [s for s in trace.spans if not s["name"].startswith(("gate5 setup ", "gate5 teardown"))]
    assert len(checks) == 1
    span = checks[0]
    assert span["name"] == "gate5 check browser" and span["status"] == "error"
    assert span["end_ms"] - span["start_ms"] == 40
    assert span["attributes"] == {"tizia.gate5.check.kind": "browser", "tizia.gate5.check.target": "/x.html"}
