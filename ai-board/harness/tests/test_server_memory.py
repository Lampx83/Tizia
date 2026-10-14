"""Worker memory uses the authenticated HTTP boundary and never a local authority fallback."""
import json
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from worker import WorkerClient
from worker import HttpWorker
import memory
from repositories.server_memory import RemoteLessons


@pytest.fixture
def endpoint():
    state = {"calls": [], "authorized": True}

    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            body = json.loads(self.rfile.read(int(self.headers["content-length"])))
            state["calls"].append((self.path, body, self.headers.get("x-ai-worker-key")))
            status, data = 200, {"schema_version": 1}
            if not state["authorized"]:
                status, data = 409, {"error": "stale_lease"}
            elif self.path.endswith("/recall"):
                data["lessons"] = [{"id": 1, "text": "Gate 4 passed", "files": ["public/x.html"], "gate": 4}]
            elif self.path.endswith("/claim"):
                data = {"ticket": {"id": 7, "lease_token": "lease-7"}}
            elif self.path.endswith("/snapshot"):
                data = {"ticket": {"budget_limit": 200}, "lessons_schema_version": 1,
                        "request": {"id": 3, "title": "fixture", "detail": "edit"},
                        "capability_policy": {"version": "fixture", "hash": "c" * 64, "capabilities": {}}}
            elif self.path.endswith("/runs"):
                data = {"run": {"id": 11}}
            elif self.path.endswith("/plan"):
                data = {"status": "planned", "tier": "surface", "capability_policy_hash": "c" * 64}
            elif self.path.endswith("/verdict"):
                data = {"verdict": body["verdict"]}
            elif not self.path.endswith("/lessons"):
                data = {"ok": True}
            else:
                data["lesson"] = {"id": len(state["calls"])}
            self.send_response(status)
            self.send_header("content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())

        def log_message(self, *_):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield WorkerClient(f"http://127.0.0.1:{server.server_port}", "test-memory-key"), state
    server.shutdown()
    server.server_close()
    thread.join()


def test_worker_records_after_ack_and_recalls_without_local_file(endpoint, tmp_path):
    client, state = endpoint
    path = tmp_path / "lessons.jsonl"
    remote = RemoteLessons(client, ticket_id=7, run_id=11, worker_id="w1", lease_token="lease-7", files=["public/x.html"])
    with memory.server_scope(remote):
        memory.record(path, [{"reason": "failure interpretation", "files": ["public/x.html"], "gate": 4}])
        assert not path.exists() and state["calls"] == []
        assert "Gate 4 passed" in memory.recall(path, "public/x.html", ["gate"])[0]
        assert state["calls"][-1][1]["files"] == ["public/x.html"]
        assert state["calls"][-1][1]["keyword"] == "gate"
    remote.flush({"gates": [{"gate": 4, "blocked": False}]})
    posts = [body for route, body, _ in state["calls"] if not route.endswith("/recall")]
    assert [body["kind"] for body in posts] == ["proposed", "observation"]
    assert all(body["run_id"] == 11 and body["worker_id"] == "w1" for body in posts)
    assert all(key == "test-memory-key" for _, _, key in state["calls"])
    assert not path.exists()


def test_recall_rechecks_authority_and_never_uses_old_cache(endpoint, tmp_path):
    client, state = endpoint
    path = tmp_path / "legacy.jsonl"
    path.write_text(json.dumps({"reason": "stale local authority", "files": ["public/x.html"]}) + "\n")
    remote = RemoteLessons(client, ticket_id=7, run_id=11, worker_id="w1", lease_token="lease-7", files=["public/x.html"])
    with memory.server_scope(remote):
        assert memory.recall(path, "public/x.html", ["gate"])
        state["authorized"] = False
        assert memory.recall(path, "public/x.html", ["gate"]) == []
        assert remote.cache == []
    assert len(state["calls"]) == 2


def test_old_server_disables_memory_without_local_fallback(endpoint, tmp_path):
    client, state = endpoint
    path = tmp_path / "legacy.jsonl"
    remote = RemoteLessons(client, ticket_id=7, run_id=11, worker_id="w1", lease_token="lease-7", files=[], enabled=False)
    with memory.server_scope(remote):
        memory.record(path, [{"reason": "proposed", "gate": 4}])
        assert memory.recall(path, "public/x.html", ["gate"]) == []
    remote.flush({"gates": [{"gate": 4, "blocked": False}]})
    assert not path.exists()
    assert state["calls"] == []


def test_http_worker_scope_sends_lessons_only_after_verdict_ack(endpoint, tmp_path):
    client, state = endpoint
    path = tmp_path / "legacy.jsonl"
    plan = {"steps": [{"allowed_scope": ["public/x.html"]}]}

    def runner(*_, **__):
        memory.record(path, [{"reason": "interpretation", "files": ["public/x.html"], "gate": 4}])
        assert "Gate 4 passed" in memory.recall(path, "public/x.html", ["gate"])[0]
        return {"outcome": "blocked", "gate_reached": 4, "reason": "blocked", "budget_used": 0,
                "failure_class": "ordinary", "candidate": None, "gates": [{"gate": 4, "blocked": True}]}

    worker = HttpWorker(client, worker_id="w1", mode="active", planner=lambda *_, **__: (plan, 0),
                        change_runner=runner, candidates=object())
    assert worker.run_once()["pre_pr_verdict"]["outcome"] == "blocked"
    routes = [route for route, _, _ in state["calls"]]
    assert routes.index("/api/ai-board/worker/tickets/7/lessons") > routes.index("/api/ai-board/worker/tickets/7/verdict")
    assert not path.exists()
