"""A cumulative budget ends live runner work, not merely the HTTP wait."""
import json
import threading
import time

import pytest

import sandbox_verify as sandbox
from budget import Budget
from test_sandbox_verify import FakeClient, checkout, state


class BudgetClient(FakeClient):
    def __init__(self, phase=None):
        super().__init__()
        self.phase, self.closed, self.deadlines = phase, threading.Event(), []

    def wait(self, phase, deadline):
        self.deadlines.append(deadline)
        if phase == self.phase:
            assert self.closed.wait(2), "deadline did not request actual destruction"

    def create(self, run_id, manifest, *, deadline):
        out = super().create(run_id, manifest)
        self.wait("create", deadline)
        return out

    def upload(self, run_id, archive, *, deadline):
        super().upload(run_id, archive)
        self.wait("upload", deadline)

    def exec(self, run_id, argv, *, timeout, deadline):
        assert 0 < timeout <= deadline - time.monotonic() + 0.02
        out = super().exec(run_id, argv, timeout=timeout)
        self.wait("exec" if argv[0] == "sh" else "boot", deadline)
        return out

    def download(self, run_id, name, *, deadline):
        out = super().download(run_id, name)
        self.wait("download", deadline)
        return out

    def renew(self, run_id, *, deadline):
        assert time.monotonic() < deadline
        super().renew(run_id)

    def destroy(self, run_id):
        super().destroy(run_id)
        self.closed.set()
        return {"state": "destroyed"}


@pytest.mark.parametrize("phase", ["create", "upload", "boot", "exec", "download"])
def test_cumulative_deadline_destroys_hanging_work_and_rejects_late_success(tmp_path, phase, monkeypatch):
    monkeypatch.setattr(sandbox, "RENEW_EVERY_S", 0.01)
    client = BudgetClient(phase)
    # A resumed run has only 0.15 seconds left, rather than a new 0.45 seconds.
    budget = Budget(max_wall_clock_s=0.45, elapsed_before_s=0.30)
    started = time.monotonic()
    result = sandbox.run(state(checkout(tmp_path)), client=client, budget=budget)
    assert result["blocked"] and result["reason"] == "sandbox budget: wall_clock_s"
    assert time.monotonic() - started < 0.4
    assert client.closed.is_set() and client.calls[-1] == "destroy"
    assert len(set(client.deadlines)) == 1
    renewed = client.calls.count("renew")
    time.sleep(0.03)
    assert client.calls.count("renew") == renewed, "renewal continued after deadline"
    if phase == "create":
        assert renewed == 0 and "upload" not in client.calls
    if phase == "exec":
        assert "download" not in client.calls


def test_runner_exec_sends_remaining_timeout_without_broadening_default(monkeypatch):
    client = sandbox.RunnerClient("http://fixture", "fixture-token")
    calls = []
    monkeypatch.setattr(client, "_call", lambda *args, **kwargs: (calls.append((args, kwargs)) or (b"{}", {})))
    client.exec("fixture-run", ["true"], timeout=1230)
    assert json.loads(calls[-1][0][3]) == {"argv": ["true"]}
    client.exec("fixture-run", ["true"], timeout=1230, deadline=time.monotonic() + 0.5)
    assert 0 < json.loads(calls[-1][0][3])["timeout_s"] <= 0.5


def test_create_retry_backoff_cannot_reset_deadline(tmp_path, monkeypatch):
    client = BudgetClient()
    def busy(*args, **kwargs):
        client.calls.append("create")
        raise sandbox.SandboxError("busy", "provision", 429)
    client.create = busy
    monkeypatch.setattr(sandbox, "_sleep", time.sleep)
    result = sandbox.run(state(checkout(tmp_path)), client=client, budget=Budget(max_wall_clock_s=0.05))
    assert result["reason"] == "sandbox budget: wall_clock_s"
    assert client.calls.count("create") == 1 and client.closed.is_set()


def test_indeterminate_cleanup_never_confirms_success(tmp_path):
    client = FakeClient()
    client.destroy = lambda _id: {"state": "indeterminate"}
    result = sandbox.run(state(checkout(tmp_path)), client=client)
    assert result["blocked"] and result["reason"] == "sandbox destroy: cleanup_unconfirmed"
    assert result["evidence"]["sandbox"]["teardown_confirmed"] is False


def test_real_http_exec_that_never_replies_is_destroyed_at_deadline(tmp_path):
    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    destroyed = threading.Event()
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_args):
            pass

        def do_POST(self):
            body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
            if self.path.endswith("/exec") and body["argv"][0] == "sh":
                destroyed.wait(2)  # actual socket wait; only DELETE ends the simulated work
                return
            self.reply({"state": "ready", "code": 0})

        def do_PUT(self):
            self.rfile.read(int(self.headers.get("Content-Length", 0)))
            self.reply({})

        def do_DELETE(self):
            destroyed.set()
            self.reply({"state": "destroyed"})

        def reply(self, payload):
            raw = json.dumps(payload).encode()
            self.send_response(200)
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            try:
                self.wfile.write(raw)
            except (BrokenPipeError, ConnectionResetError):
                pass

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        client = sandbox.RunnerClient(f"http://127.0.0.1:{server.server_port}", "fixture-token")
        started = time.monotonic()
        result = sandbox.run(state(checkout(tmp_path)), client=client, budget=Budget(max_wall_clock_s=0.2))
        assert result["reason"] == "sandbox budget: wall_clock_s" and result["blocked"]
        assert destroyed.is_set() and time.monotonic() - started < 0.5
    finally:
        server.shutdown()
        server.server_close()
        thread.join(2)


def test_slow_headers_do_not_reset_artifact_body_deadline():
    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    release = threading.Event()
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_args):
            pass

        def do_GET(self):
            time.sleep(0.15)
            self.send_response(200)
            self.send_header("Content-Length", "100")
            self.end_headers()
            release.wait(2)  # body never arrives within the remaining budget

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        client = sandbox.RunnerClient(f"http://127.0.0.1:{server.server_port}", "fixture-token")
        started = time.monotonic()
        with pytest.raises(sandbox.SandboxError):
            client.download("fixture-run", "result", deadline=started + 0.2)
        assert time.monotonic() - started < 0.3, "body read received a fresh timeout after headers"
    finally:
        release.set()
        server.shutdown()
        server.server_close()
        thread.join(2)
