"""Single HTTP-only AI Board worker. Default mode is deliberately ``off``."""
from __future__ import annotations

import argparse
import json
import os
import threading
import time
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Callable


Transport = Callable[[str, str, dict, dict], dict]


class LeaseLostError(RuntimeError):
    pass


class WorkerClient:
    def __init__(self, base_url: str, key: str, *, timeout: float = 30.0, transport: Transport | None = None):
        self.base_url = base_url.rstrip("/")
        self.key = key
        self.timeout = timeout
        self.transport = transport or self._request

    def _request(self, method: str, path: str, payload: dict, headers: dict) -> dict:
        request = urllib.request.Request(
            self.base_url + path,
            data=json.dumps(payload).encode("utf-8"),
            headers={"content-type": "application/json", **headers},
            method=method,
        )
        with urllib.request.urlopen(request, timeout=self.timeout) as response:
            return json.loads(response.read().decode("utf-8"))

    def post(self, path: str, payload: dict) -> dict:
        return self.transport("POST", path, payload, {"x-ai-worker-key": self.key})


@dataclass
class HttpWorker:
    client: WorkerClient
    worker_id: str
    version: str = "d0"
    mode: str = "off"
    planner: Callable[[dict], tuple[dict, int]] | None = None
    heartbeat_interval: float = 30.0

    def _plan_with_heartbeat(self, snapshot: dict, ticket_id: int, lease: dict) -> tuple[dict, int]:
        stopped = threading.Event()
        failures: list[Exception] = []

        def heartbeat_loop() -> None:
            while not stopped.wait(max(self.heartbeat_interval, 0.1)):
                try:
                    self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/heartbeat", lease)
                except Exception as error:
                    failures.append(error)
                    stopped.set()

        heartbeat_thread = threading.Thread(target=heartbeat_loop, name="ai-board-lease-heartbeat", daemon=True)
        heartbeat_thread.start()
        try:
            result = self.planner(snapshot)
        finally:
            stopped.set()
            heartbeat_thread.join(timeout=max(self.client.timeout, 1.0))
        if failures:
            raise LeaseLostError("worker lease heartbeat failed") from failures[0]
        return result

    def run_once(self) -> dict:
        if self.mode == "off":
            return {"status": "off"}
        if self.mode != "shadow":
            raise ValueError("D0 worker only supports off or shadow")

        claim = self.client.post("/api/ai-board/worker/claim", {
            "worker_id": self.worker_id, "version": self.version, "mode": self.mode,
            "intent": "plan" if self.planner else "precheck",
        })
        ticket = claim.get("ticket")
        if not ticket:
            return {"status": "idle"}
        ticket_id = ticket["id"]
        lease = {"worker_id": self.worker_id, "lease_token": ticket["lease_token"]}
        # A new lease is a new workflow attempt; retries within that lease keep
        # the same keys, while a later clarification/replan gets fresh keys.
        prefix = f"{self.worker_id}:{ticket_id}:{ticket['lease_token'][:16]}"

        snapshot = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/snapshot", lease)
        self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/heartbeat", lease)
        run = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/runs", {
            **lease, "trigger": "plan" if self.planner else "shadow_precheck",
            "idempotency_key": f"{prefix}:run",
        })["run"]
        self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
            **lease, "run_id": run["id"], "event_type": "shadow_precheck_passed",
            "public_message": "Đã kiểm tra yêu cầu; đang chờ lập kế hoạch.",
            "internal_detail": "HTTP shadow precheck completed",
            "idempotency_key": f"{prefix}:event",
        })
        if self.planner:
            try:
                plan, budget_used = self._plan_with_heartbeat(snapshot, ticket_id, lease)
                planned = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/plan", {
                    **lease, "run_id": run["id"], "plan": plan, "budget_used": budget_used,
                    "idempotency_key": f"{prefix}:plan",
                })
            except Exception as error:
                if isinstance(error, LeaseLostError):
                    raise
                self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                    **lease, "run_id": run["id"], "event_type": "plan_blocked",
                    "public_message": "Kế hoạch chưa vượt qua kiểm tra an toàn.",
                    "internal_detail": str(error),
                    "idempotency_key": f"{prefix}:plan-blocked",
                })
                self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", {
                    **lease, "outcome": "waiting", "internal_detail": str(error),
                    "idempotency_key": f"{prefix}:release-blocked",
                })
                raise
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", {
                **lease, "outcome": "planned", "idempotency_key": f"{prefix}:release",
            })
            return {
                "status": planned["status"], "ticket_id": ticket_id, "run_id": run["id"],
                "tier": planned["tier"], "children": len(planned.get("children") or []),
            }
        self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", {
            **lease, "outcome": "shadow_ok", "idempotency_key": f"{prefix}:release",
        })
        return {"status": "shadow_ok", "ticket_id": ticket_id, "run_id": run["id"]}


class HarnessPlanner:
    """Runs existing gates 1, 2 and 2.5, then emits the server-owned D0 schema."""

    def __init__(self):
        harness_dir = Path(__file__).resolve().parent / "harness"
        if str(harness_dir) not in os.sys.path:
            os.sys.path.insert(0, str(harness_dir))
        from budget import Budget
        from main import Deps, run_gate
        self.Budget = Budget
        self.deps = Deps.real()
        self.run_gate = run_gate

    @staticmethod
    def _request(snapshot: dict) -> dict:
        request = snapshot["request"]
        return {
            "id": f"req-{request['id']}", "db_id": request["id"],
            "from": request.get("student"), "domain": request.get("domain"),
            "type": request.get("type"), "subject": request.get("title"),
            "body": request.get("detail") or request.get("title"),
            "thread": snapshot.get("thread") or [], "votes": request.get("votes", 1),
        }

    @staticmethod
    def _canonical(request: dict, old: dict) -> dict:
        old_caps = list(dict.fromkeys(old.get("capabilities") or []))
        steps = []
        for index, subtask in enumerate(old.get("subtasks") or [], start=1):
            file = subtask["file"].replace("\\", "/")
            capability = old_caps[0] if old_caps else (
                "public.ui" if file.startswith("public/") else "generated.context"
            )
            steps.append({
                "order": index,
                "title": subtask["title"],
                "description": subtask["title"],
                "allowed_scope": [file],
                "acceptance": [subtask["verify"]],
                "tests": [subtask["verify"]],
                "capability": capability,
                "risk": "medium" if subtask.get("size") == "large" else "low",
                "non_goals": ["Không sửa file ngoài allowed_scope."],
            })
        capabilities = list(dict.fromkeys([*old_caps, *(step["capability"] for step in steps)]))
        return {
            "domain": request["domain"],
            "goal": old["summary_vi"],
            "allowed_scope": [step["allowed_scope"][0] for step in steps],
            "acceptance": [item for step in steps for item in step["acceptance"]],
            "tests": [item for step in steps for item in step["tests"]],
            "capabilities": capabilities,
            "risk": "medium" if any(step["risk"] == "medium" for step in steps) else "low",
            "non_goals": ["Không sửa file ngoài allowed_scope.", "Không tự mở rộng quyền."],
            "steps": steps,
        }

    def __call__(self, snapshot: dict) -> tuple[dict, int]:
        request = self._request(snapshot)
        budget = self.Budget.from_env()
        # D0 uses 40 units per model call and a hard 200-unit automatic cap.
        budget.max_model_calls = min(budget.max_model_calls, 5)
        state = {}
        for gate in (1, 2, 2.5):
            result = self.run_gate(gate, request, self.deps, budget, state)
            if result.get("blocked"):
                raise RuntimeError(f"gate {gate} blocked: {result.get('reason')}")
        spent = budget.snapshot()
        budget_used = int(spent.get("model_calls", 0)) * 40
        return self._canonical(request, state["plan"]), budget_used


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Tizia AI Board HTTP worker")
    parser.add_argument("--mode", choices=("off", "shadow"), default=os.getenv("AI_BOARD_WORKER_MODE", "off"))
    parser.add_argument("--once", action="store_true", help="poll once, then exit")
    parser.add_argument("--plan", action="store_true", help="run gates 1, 2 and 2.5, then submit child-ticket plan")
    parser.add_argument("--poll-seconds", type=float, default=5.0)
    args = parser.parse_args(argv)
    base_url = os.getenv("TIZIA_URL", "http://127.0.0.1:8041")
    key = os.getenv("AI_BOARD_WORKER_KEY", "")
    if args.mode != "off" and len(key) < 24:
        parser.error("AI_BOARD_WORKER_KEY must be at least 24 characters")
    worker = HttpWorker(
        WorkerClient(base_url, key),
        worker_id=os.getenv("AI_BOARD_WORKER_ID", "local-worker-1"),
        version=os.getenv("AI_BOARD_WORKER_VERSION", "d0"),
        mode=args.mode,
        planner=HarnessPlanner() if args.plan else None,
    )
    while True:
        print(json.dumps(worker.run_once(), ensure_ascii=False))
        if args.once or args.mode == "off":
            return 0
        time.sleep(max(args.poll_seconds, 1.0))


if __name__ == "__main__":
    raise SystemExit(main())
