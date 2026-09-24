"""Single HTTP-only AI Board worker. Default mode is deliberately ``off``."""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import socket
import threading
import tempfile
import time
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Callable


Transport = Callable[[str, str, dict, dict], dict]


class LeaseLostError(RuntimeError):
    pass


def _load_harness():
    harness_dir = Path(__file__).resolve().parent / "harness"
    if str(harness_dir) not in os.sys.path:
        os.sys.path.insert(0, str(harness_dir))
    from budget import Budget
    from main import Deps, run_gate
    return Budget, Deps, run_gate


def _execution_plan(plan: dict) -> dict:
    """Map the server-owned plan contract back to the existing Gate-3 seam."""
    subtasks = []
    for step in sorted(plan.get("steps") or [], key=lambda step: step.get("order", 0)):
        scope = step.get("allowed_scope") or []
        tests = step.get("tests") or []
        if not scope or not tests:
            raise ValueError("plan step requires allowed_scope and tests")
        subtasks.append({
            "title": step["title"], "file": scope[0], "verify": tests[0],
            "size": "small" if step.get("risk") == "low" else "large",
            "allowed_scope": list(scope),
        })
    if not subtasks:
        raise ValueError("plan requires at least one step")
    return {"subtasks": subtasks, "capabilities": list(plan.get("capabilities") or [])}


def _public_gate_result(result: dict) -> dict:
    out = {
        "gate": result["gate"], "blocked": bool(result.get("blocked")),
        "reason": result.get("reason"),
    }
    if result["gate"] == 4:
        out["issues"] = list(result.get("issues") or [])
        out["checks"] = list(result.get("checks") or [])
    elif result["gate"] == 5:
        out["smoke_passed"] = bool((result.get("evidence") or {}).get("smoke_passed"))
        out["http_observed"] = bool((result.get("evidence") or {}).get("http_observed"))
        out["runner"] = (result.get("evidence") or {}).get("runner")
    elif result["gate"] == 5.5:
        out["risk_level"] = result.get("risk_level")
        out["risk_signals"] = list(result.get("risk_signals") or [])
    return out


MAX_REPAIRS = 1  # ponytail: one repair child per verdict; server enforces the same bound


def _attempt(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate, cleanup,
             repair_reason: str | None) -> tuple[list[dict], str | None, dict | None]:
    """One pass of Gates 3→5.5 on fresh scratch + worktree. Return (public gates, failure kind, candidate)."""
    scratch = Path(tempfile.mkdtemp(prefix="ai-board-change-"))
    state = {
        "plan": _execution_plan(plan), "scratch_repo": str(scratch),
        "checkout_source": str(checkout_source), "skill_id": f"ticket-{ticket_id}",
        "manifest": {"capabilities": {"core": [
            cap for cap in plan.get("capabilities") or [] if str(cap).startswith("core.")
        ]}},
    }
    if repair_reason:
        state["repair_reason"] = repair_reason
    gates: list[dict] = []
    kind = None
    try:
        for gate in (3, 4, 5, 5.5):
            retried = False
            while True:
                if not budget.tick():
                    result = {"gate": gate, "blocked": True, "reason": "budget exhausted", "failure_class": "budget"}
                else:
                    try:
                        result = run_gate(gate, {}, deps, budget, state)
                    except Exception as error:  # model/network/tool outage, not the candidate's code
                        result = {"gate": gate, "blocked": True, "reason": str(error)[:1000],
                                  "failure_class": "transient"}
                # Transient Docker/checkout trouble gets one mechanical retry, no model call.
                if gate == 5 and result.get("blocked") and result.get("failure_class") == "transient" and not retried:
                    retried = True
                    continue
                break
            public = _public_gate_result(result)
            if gate == 5:
                public["retried"] = retried
                if not public["blocked"] and not public["http_observed"]:
                    public["blocked"] = True
                    public["reason"] = "change has no HTTP-observable result"
            gates.append(public)
            if public["blocked"]:
                kind = result.get("failure_class") or "ordinary"
                break
    finally:
        passed = kind is None and bool(gates) and gates[-1]["gate"] == 5.5
        candidate = {
            "branch": state["branch"], "base_sha": state["base_sha"],
            "head_sha": state["commits"][-1]["sha"], "commits": state["commits"],
        } if passed and state.get("commits") else None
        cleanup(state, keep_branch=candidate is not None)
        shutil.rmtree(scratch, ignore_errors=True)
    return gates, kind, candidate


def execute_pre_pr(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate,
                   cleanup: Callable) -> dict:
    """Run Gates 3→5.5, repairing an ordinary failure at most MAX_REPAIRS times. Return a redacted verdict.

    failure_class: ordinary (repair exhausted) | transient (retry exhausted) | critical (boundary
    violation, never repaired) | budget (no budget left to run or repair)."""
    repairs: list[dict] = []
    repair_reason = None
    while True:
        gates, kind, candidate = _attempt(
            plan, ticket_id=ticket_id, checkout_source=checkout_source, deps=deps, budget=budget,
            run_gate=run_gate, cleanup=cleanup, repair_reason=repair_reason,
        )
        last = gates[-1]
        if kind != "ordinary" or len(repairs) >= MAX_REPAIRS:
            break
        if not budget.tick():
            kind = "budget"
            break
        repairs.append({"gate": last["gate"], "reason": last["reason"]})
        repair_reason = f"cổng {last['gate']}: {last['reason']}"
    smoke = next((gate for gate in gates if gate["gate"] == 5), None)
    risk = next((gate for gate in gates if gate["gate"] == 5.5), None)
    passed = (kind is None and last["gate"] == 5.5 and not last["blocked"] and smoke
              and smoke["smoke_passed"] and smoke["http_observed"])
    needs_review = passed and risk["risk_level"] in ("high", "critical")
    outcome = "needs_review" if needs_review else "ready_for_pr" if passed else "blocked"
    reason = "risk triage requires human review" if needs_review else last["reason"]
    return {
        "outcome": outcome, "gate_reached": last["gate"], "reason": reason,
        "failure_class": None if passed else kind, "repairs": repairs,
        "candidate": candidate if passed else None,
        "budget_used": int(getattr(budget, "model_calls", 0)) * 40, "gates": gates,
    }


def default_worker_id() -> str:
    """Per-machine worker id from hostname. Per-request identity is the server's lease token + run id."""
    host = re.sub(r"[^a-z0-9]+", "-", socket.gethostname().lower()).strip("-")[:60]
    return f"{host}-worker" if host else "local-worker"


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
    change_runner: Callable[[dict, int, int, int], dict] | None = None
    heartbeat_interval: float = 30.0

    def _with_heartbeat(self, operation: Callable, ticket_id: int, lease: dict):
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
            result = operation()
        finally:
            stopped.set()
            heartbeat_thread.join(timeout=max(self.client.timeout, 1.0))
        if failures:
            raise LeaseLostError("worker lease heartbeat failed") from failures[0]
        return result

    def run_once(self) -> dict:
        if self.mode == "off":
            return {"status": "off"}
        if self.mode not in ("shadow", "active"):
            raise ValueError("D0 worker only supports off, shadow or active")
        if self.mode == "shadow" and self.change_runner:
            raise ValueError("shadow mode cannot execute implementation gates")
        if self.mode == "active" and (not self.planner or not self.change_runner):
            raise ValueError("active mode requires planner and change runner")

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
                plan, budget_used = self._with_heartbeat(lambda: self.planner(snapshot), ticket_id, lease)
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
            verdict = None
            if self.change_runner and planned["status"] == "planned":
                ticket_row = snapshot.get("ticket", {})
                candidate = self._with_heartbeat(
                    lambda: self.change_runner(
                        plan, ticket_id, budget_used,
                        int(ticket_row.get("cumulative_budget") or 0),
                        int(ticket_row.get("budget_limit") or 200),
                    ), ticket_id, lease,
                )
                verdict = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/verdict", {
                    **lease, "run_id": run["id"], "verdict": candidate,
                    "idempotency_key": f"{prefix}:verdict",
                })["verdict"]
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", {
                **lease, "outcome": "planned", "idempotency_key": f"{prefix}:release",
            })
            result = {
                "status": planned["status"], "ticket_id": ticket_id, "run_id": run["id"],
                "tier": planned["tier"], "children": len(planned.get("children") or []),
            }
            if verdict is not None:
                result["pre_pr_verdict"] = verdict
            return result
        self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", {
            **lease, "outcome": "shadow_ok", "idempotency_key": f"{prefix}:release",
        })
        return {"status": "shadow_ok", "ticket_id": ticket_id, "run_id": run["id"]}


class HarnessPlanner:
    """Runs existing gates 1, 2 and 2.5, then emits the server-owned D0 schema."""

    def __init__(self):
        Budget, Deps, run_gate = _load_harness()
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


class HarnessChangeRunner:
    """Connect an accepted HTTP plan to the existing full-checkout gate pipeline."""

    def __init__(self, checkout_source=None):
        Budget, Deps, run_gate = _load_harness()
        from main import cleanup_full_checkout
        self.Budget = Budget
        self.deps = Deps.real()
        self.run_gate = run_gate
        self.cleanup = cleanup_full_checkout
        self.checkout_source = checkout_source or Path(__file__).resolve().parents[1]

    def __call__(self, plan: dict, ticket_id: int, budget_used: int = 0,
                 cumulative_budget: int = 0, budget_limit: int = 200) -> dict:
        budget = self.Budget.from_env()
        remaining = budget_limit - cumulative_budget - budget_used
        budget.max_model_calls = min(budget.max_model_calls, max(remaining // 40, 0))
        return execute_pre_pr(
            plan, ticket_id=ticket_id, checkout_source=self.checkout_source,
            deps=self.deps, budget=budget, run_gate=self.run_gate, cleanup=self.cleanup,
        )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Tizia AI Board HTTP worker")
    parser.add_argument("--mode", choices=("off", "shadow", "active"), default=os.getenv("AI_BOARD_WORKER_MODE", "off"))
    parser.add_argument("--once", action="store_true", help="poll once, then exit")
    parser.add_argument("--plan", action="store_true", help="run gates 1, 2 and 2.5, then submit child-ticket plan")
    parser.add_argument("--execute", action="store_true", help="run the accepted plan through gates 3, 4, 5 and 5.5")
    parser.add_argument("--poll-seconds", type=float, default=5.0)
    args = parser.parse_args(argv)
    try:  # same repo env file as harness/main.py; process env still wins
        from dotenv import load_dotenv
    except ImportError:
        pass
    else:
        load_dotenv(Path(__file__).resolve().parents[1] / ".env")
    if args.execute and args.mode != "active":
        parser.error("--execute requires --mode active")
    if args.mode == "active" and not args.execute:
        parser.error("--mode active requires --execute")
    # Same machine as the server; HOST is its bind address (0.0.0.0), not a connect address.
    base_url = f"http://127.0.0.1:{os.getenv('PORT', '8041')}"
    key = os.getenv("AI_BOARD_WORKER_KEY", "")
    if args.mode != "off" and len(key) < 24:
        parser.error("AI_BOARD_WORKER_KEY must be at least 24 characters")
    worker = HttpWorker(
        WorkerClient(base_url, key),
        worker_id=default_worker_id(),
        version=os.getenv("AI_BOARD_WORKER_VERSION", "d0"),
        mode=args.mode,
        planner=HarnessPlanner() if args.plan or args.execute else None,
        change_runner=HarnessChangeRunner() if args.execute else None,
    )
    while True:
        print(json.dumps(worker.run_once(), ensure_ascii=False))
        if args.once or args.mode == "off":
            return 0
        time.sleep(max(args.poll_seconds, 1.0))


if __name__ == "__main__":
    raise SystemExit(main())
