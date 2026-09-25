"""Single HTTP-only AI Board worker. Default mode is deliberately ``off``."""
from __future__ import annotations

import argparse
import dataclasses
import json
import os
import re
import shutil
import socket
import subprocess
import threading
import tempfile
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable


Transport = Callable[[str, str, dict, dict], dict]
# Worker <-> server contract, shared with server/ai-board/store.js.
CONTRACT = json.loads((Path(__file__).resolve().parents[1] / "server" / "ai-board" / "contract.json")
                      .read_text(encoding="utf-8"))
PLAN_GATES = tuple(CONTRACT["gates"]["plan"])
PRE_PR_GATES = tuple(CONTRACT["gates"]["pre_pr"])
DEFAULT_BUDGET_LIMIT = CONTRACT["default_budget_limit"]


class LeaseLostError(RuntimeError):
    pass


def _is_stale_lease(error: Exception) -> bool:
    if not isinstance(error, urllib.error.HTTPError) or error.code != 409:
        return False
    try:
        return json.loads(error.read().decode("utf-8")).get("error") == "stale_lease"
    except (ValueError, UnicodeError):
        return False


class PlanBlockedError(RuntimeError):
    """Gate 1/2/2.5 stop. `detail` = JSON-safe {gate, reason, signals, plan} for the plan_blocked event."""

    def __init__(self, message: str, detail: dict):
        super().__init__(message)
        self.detail = detail


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


MAX_REPAIRS = CONTRACT["max_repairs"]  # server enforces the same bound


def _attempt(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate, cleanup,
             repair_reason: str | None, catalog: dict | None,
             request_detail: str | None, memory_path,
             should_stop: Callable[[], bool] | None) -> tuple[list[dict], str | None, dict | None]:
    """One pass of Gates 3→5.5 on fresh scratch + worktree. Return (public gates, failure kind, candidate)."""
    scratch = Path(tempfile.mkdtemp(prefix="ai-board-change-"))
    state = {
        "plan": _execution_plan(plan), "scratch_repo": str(scratch),
        "checkout_source": str(checkout_source), "skill_id": f"ticket-{ticket_id}",
    }
    if catalog is not None:
        state["catalog"] = catalog
    if request_detail:
        state["request_detail"] = request_detail
    if memory_path:
        state["memory_path"] = str(memory_path)
    if repair_reason:
        state["repair_reason"] = repair_reason
    gates: list[dict] = []
    kind = None
    lease_lost = False
    try:
        for gate in PRE_PR_GATES:
            if should_stop and should_stop():  # lease revoked, e.g. the requester cancelled
                raise LeaseLostError(f"lease revoked before gate {gate}")
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
                    if getattr(deps, "trace", None):
                        deps.trace.flush()  # 1 lô trace mỗi cổng
                # Transient Docker/checkout trouble gets one mechanical retry, no model call. It spends the
                # retry cap, never budget_used; no retry once the cap is reached.
                if (gate == 5 and result.get("blocked") and result.get("failure_class") == "transient"
                        and not retried and budget.retries < budget.max_retries):
                    retried = True
                    budget.spend("retries")
                    continue
                break
            public = _public_gate_result(result)
            if gate == 5:
                public["retried"] = retried
                if not public["blocked"] and not public["http_observed"]:
                    public["blocked"] = True
                    public["reason"] = "change has no HTTP-observable result"
                    result["failure_class"] = "plan"
            gates.append(public)
            if public["blocked"]:
                kind = result.get("failure_class") or "ordinary"
                break
    finally:
        lease_lost = bool(should_stop and should_stop())
        passed = kind is None and bool(gates) and gates[-1]["gate"] == 5.5 and not lease_lost
        candidate = {
            "branch": state["branch"], "base_sha": state["base_sha"],
            "head_sha": state["commits"][-1]["sha"], "commits": state["commits"],
        } if passed and state.get("commits") else None
        cleanup(state, keep_branch=candidate is not None)
        if candidate and should_stop and should_stop():
            # The heartbeat can fail while the passing worktree is being removed.
            cleanup(state, keep_branch=False)
            lease_lost = True
        shutil.rmtree(scratch, ignore_errors=True)
    if lease_lost:
        raise LeaseLostError("lease revoked during gate execution")
    return gates, kind, candidate


def execute_pre_pr(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate,
                   cleanup: Callable, policy: dict | None = None, accepted_policy_hash: str | None = None,
                   request_detail: str | None = None, memory_path=None,
                   should_stop: Callable[[], bool] | None = None) -> dict:
    """Run Gates 3→5.5, repairing an ordinary failure at most MAX_REPAIRS times. Return a redacted verdict.

    policy = snapshot catalog {hash, capabilities}; None only outside the HTTP worker (no catalog check).
    memory_path = lessons JSONL: Gate 3 recalls from it, repairs and final blocks are appended to it.
    should_stop() true between or during gates (lease lost) → LeaseLostError, worktree cleaned, nothing kept.
    failure_class: ordinary | transient | critical | budget | plan (see store.js FAILURE_CLASSES)."""
    # plan_hash embeds the policy hash, so a catalog change between leases already forces a fresh plan
    # server-side; this guards the in-lease race and a snapshot missing its catalog (fail closed).
    if policy is not None and (not policy.get("hash") or policy.get("hash") != accepted_policy_hash):
        reason = ("snapshot has no capability catalog" if not policy.get("hash")
                  else "capability catalog changed since the plan was accepted")
        return {"outcome": "blocked", "gate_reached": 3, "reason": reason, "failure_class": "plan",
                "repairs": [], "candidate": None, "budget_used": 0,
                "gates": [{"gate": 3, "blocked": True, "reason": reason}]}
    catalog = policy.get("capabilities") if policy is not None else None
    repairs: list[dict] = []
    repair_reason = None
    while True:
        if getattr(deps, "trace", None):
            deps.trace.attempt = len(repairs)
        gates, kind, candidate = _attempt(
            plan, ticket_id=ticket_id, checkout_source=checkout_source, deps=deps, budget=budget,
            run_gate=run_gate, cleanup=cleanup, repair_reason=repair_reason, catalog=catalog,
            request_detail=request_detail, memory_path=memory_path, should_stop=should_stop,
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
    if memory_path:
        _remember(memory_path, plan, ticket_id, repairs, None if passed else kind, last, bool(passed))
    reason = "risk triage requires human review" if needs_review else last["reason"]
    return {
        "outcome": outcome, "gate_reached": last["gate"], "reason": reason,
        "failure_class": None if passed else kind, "repairs": repairs,
        "candidate": candidate if passed else None,
        "budget_used": int(getattr(budget, "units", 0)), "gates": gates,
    }


def _remember(memory_path, plan: dict, ticket_id: int, repairs: list[dict], kind: str | None,
              last: dict, passed: bool) -> None:
    """Ghi bài học: mỗi lần sửa (đã sửa được hay chưa) + lý do chặn cuối nếu là lỗi của code/plan.
    Lỗi môi trường (transient) và budget không dạy gì về code nên bỏ qua."""
    import memory

    files = [(step.get("allowed_scope") or [""])[0] for step in plan.get("steps") or []]
    lessons = [{"files": files, "gate": r["gate"], "failure_class": "ordinary", "reason": r["reason"],
                "outcome": "fixed" if passed else "blocked", "ticket": ticket_id} for r in repairs]
    if kind in ("ordinary", "critical", "plan") and all(r["reason"] != last["reason"] for r in repairs):
        lessons.append({"files": files, "gate": last["gate"], "failure_class": kind, "reason": last["reason"],
                        "outcome": "blocked", "ticket": ticket_id})
    memory.record(memory_path, lessons)


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
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),  # tiếng Việt: 2-3 byte, không phải 6
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
    tracer: Any = None  # meter.Tracer chung với planner/change runner

    def _with_heartbeat(self, operation: Callable, ticket_id: int, lease: dict,
                        on_lease_lost: Callable | None = None):
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
            result = operation(lambda: bool(failures))
        finally:
            stopped.set()
            heartbeat_thread.join(timeout=max(self.client.timeout, 1.0))
        if failures:
            if on_lease_lost:
                on_lease_lost(result)
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
        if self.tracer and self.tracer.over_hourly_cap():
            # GPU dùng chung: hết trần giờ thì không nhận ticket mới; ticket đang chạy không bị phạt.
            return {"status": "gpu_paused", "gpu_s_last_hour": round(self.tracer.gpu_s_last_hour(), 1)}

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
        phase = (snapshot.get("ticket") or {}).get("phase")
        trigger = {"executing": "execute", "rolling_back": "rollback"}.get(phase) or (
            "plan" if self.planner else "shadow_precheck")
        run = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/runs", {
            **lease, "trigger": trigger, "idempotency_key": f"{prefix}:run",
        })["run"]
        if self.tracer:
            self.tracer.begin(
                run["id"],
                lambda calls: self.client.post(
                    f"/api/ai-board/worker/tickets/{ticket_id}/traces", {**lease, "run_id": run["id"], "calls": calls}),
                on_gate=lambda gate, attempt: self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                    **lease, "run_id": run["id"], "event_type": "gate_started",
                    "internal_detail": json.dumps({"gate": gate, "attempt": attempt}),
                    "idempotency_key": f"{prefix}:gate:{attempt}:{gate}",
                }),
            )
        try:
            return self._run_leased(ticket_id, lease, prefix, snapshot, run)
        finally:
            if self.tracer:
                self.tracer.flush()

    def _release(self, ticket_id: int, payload: dict) -> dict:
        """Gửi nốt trace còn đệm khi còn lease (sau release server trả 409 stale_lease), rồi trả lease."""
        if self.tracer:
            self.tracer.flush()
        return self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", payload)

    def _rollback(self, ticket_id: int, lease: dict, snapshot: dict, run: dict) -> dict:
        """Admin yêu cầu hoàn tác: bỏ nhánh candidate, hoặc tạo nhánh revert nếu đã merge. Lỗi → server chờ admin."""
        candidate = snapshot.get("rollback_candidate")
        try:
            if not candidate:
                raise ValueError("no candidate branch to roll back")
            result = self._with_heartbeat(
                lambda _lost: self.change_runner.rollback(candidate, ticket_id), ticket_id, lease)
        except LeaseLostError:
            raise
        except Exception as error:  # noqa: BLE001 — git/IO: báo server, không để root kẹt 'running'
            result = {"outcome": "failed", "detail": str(error)[:1000]}
        done = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/rollback", {
            **lease, "run_id": run["id"], **result,
        })
        return {"status": done["status"], "ticket_id": ticket_id, "run_id": run["id"], "rollback": result["outcome"]}

    def _run_leased(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict) -> dict:
        if (snapshot.get("ticket") or {}).get("phase") == "rolling_back":
            return self._rollback(ticket_id, lease, snapshot, run)
        # 'executing' = admin đã cho phép plan (tier protected): lượt này không lập plan lại mà chạy plan đã duyệt.
        executing = (snapshot.get("ticket") or {}).get("phase") == "executing"
        if not executing:
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                **lease, "run_id": run["id"], "event_type": "shadow_precheck_passed",
                "public_message": "Đã kiểm tra yêu cầu; đang chờ lập kế hoạch.",
                "internal_detail": "HTTP shadow precheck completed",
                "idempotency_key": f"{prefix}:event",
            })
        if self.planner and executing:
            planned = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/resume-plan", {
                **lease, "run_id": run["id"],
            })
            plan, budget_used = planned["plan"], 0
        if self.planner and not executing:
            try:
                plan, budget_used = self._with_heartbeat(lambda _lost: self.planner(snapshot), ticket_id, lease)
                planned = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/plan", {
                    **lease, "run_id": run["id"], "plan": plan, "budget_used": budget_used,
                    "idempotency_key": f"{prefix}:plan",
                })
            except Exception as error:
                if isinstance(error, LeaseLostError):
                    raise
                # Same detail on the event and the root's internal_reason, so the admin queue API shows why.
                detail = (json.dumps(error.detail, ensure_ascii=False) if isinstance(error, PlanBlockedError)
                          else str(error))
                self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                    **lease, "run_id": run["id"], "event_type": "plan_blocked",
                    "public_message": (getattr(error, "detail", None) or {}).get("public_message")
                    or "Kế hoạch chưa vượt qua kiểm tra an toàn.",
                    "internal_detail": detail,
                    "idempotency_key": f"{prefix}:plan-blocked",
                })
                self._release(ticket_id, {
                    **lease, "outcome": "waiting", "internal_detail": detail,
                    "idempotency_key": f"{prefix}:release-blocked",
                })
                raise
        if self.planner:
            verdict = None
            if self.change_runner and planned["status"] == "planned":
                ticket_row = snapshot.get("ticket", {})
                candidate = self._with_heartbeat(
                    lambda lost: self.change_runner(
                        plan, ticket_id, budget_used,
                        int(ticket_row.get("cumulative_budget") or 0),
                        int(ticket_row.get("budget_limit") or DEFAULT_BUDGET_LIMIT),
                        # {} when missing: fails the hash check closed instead of skipping the catalog.
                        policy=snapshot.get("capability_policy") or {},
                        accepted_policy_hash=planned.get("capability_policy_hash"),
                        request_detail=(snapshot.get("request") or {}).get("detail"),
                        should_stop=lost,
                    ), ticket_id, lease,
                    on_lease_lost=getattr(self.change_runner, "discard_candidate", None),
                )
                try:
                    verdict = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/verdict", {
                        **lease, "run_id": run["id"], "verdict": candidate,
                        "idempotency_key": f"{prefix}:verdict",
                    })["verdict"]
                except Exception as error:
                    if _is_stale_lease(error):
                        discard = getattr(self.change_runner, "discard_candidate", None)
                        if discard:
                            discard(candidate)
                    raise
            self._release(ticket_id, {
                **lease, "outcome": "planned", "idempotency_key": f"{prefix}:release",
            })
            result = {
                "status": planned["status"], "ticket_id": ticket_id, "run_id": run["id"],
                "tier": planned["tier"], "children": len(planned.get("children") or []),
            }
            if verdict is not None:
                result["pre_pr_verdict"] = verdict
            return result
        self._release(ticket_id, {
            **lease, "outcome": "shadow_ok", "idempotency_key": f"{prefix}:release",
        })
        return {"status": "shadow_ok", "ticket_id": ticket_id, "run_id": run["id"]}


class HarnessPlanner:
    """Runs existing gates 1, 2 and 2.5, then emits the server-owned D0 schema."""

    def __init__(self, tracer=None):
        Budget, Deps, run_gate = _load_harness()
        self.Budget = Budget
        self.deps = dataclasses.replace(Deps.real(), trace=tracer)
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
            "complexity_by_server": True,
        }

    @staticmethod
    def _canonical(request: dict, old: dict, signals: list[str] | None = None) -> dict:
        """Plan cổng 1 → schema D0 của server. Có tín hiệu phức tạp → risk high → tier protected (admin cho phép)."""
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
            "risk": "high" if signals else "medium" if any(step["risk"] == "medium" for step in steps) else "low",
            "non_goals": ["Không sửa file ngoài allowed_scope.", "Không tự mở rộng quyền."],
            "steps": steps,
        }

    def __call__(self, snapshot: dict) -> tuple[dict, int]:
        request = self._request(snapshot)
        budget = self.Budget.from_env()
        budget.max_model_calls = min(budget.max_model_calls, 5)
        ticket = snapshot.get("ticket") or {}
        budget.max_units = int(ticket.get("budget_limit") or DEFAULT_BUDGET_LIMIT)  # trần mỗi lượt, không trừ các lượt trước
        state = {}
        for gate in PLAN_GATES:
            result = self.run_gate(gate, request, self.deps, budget, state)
            if result.get("blocked"):
                raise PlanBlockedError(f"gate {gate} blocked: {result.get('reason')}", {
                    "gate": gate, "reason": result.get("reason"), "signals": list(result.get("signals") or []),
                    "public_message": result.get("public_message"),
                    "plan": json.dumps(state.get("plan"), ensure_ascii=False)[:2000],
                })
        return self._canonical(request, state["plan"], state.get("complexity_signals")), int(budget.units)


class HarnessChangeRunner:
    """Connect an accepted HTTP plan to the existing full-checkout gate pipeline."""

    def __init__(self, checkout_source=None, tracer=None):
        Budget, Deps, run_gate = _load_harness()
        from main import cleanup_full_checkout
        from memory import DEFAULT_PATH
        self.memory_path = DEFAULT_PATH
        self.Budget = Budget
        self.deps = dataclasses.replace(Deps.real(), trace=tracer)
        self.run_gate = run_gate
        self.cleanup = cleanup_full_checkout
        self.checkout_source = checkout_source or Path(__file__).resolve().parents[1]

    def __call__(self, plan: dict, ticket_id: int, budget_used: int = 0,
                 cumulative_budget: int = 0, budget_limit: int = 200, *, policy: dict,
                 accepted_policy_hash: str | None, request_detail: str | None = None,
                 should_stop: Callable[[], bool] | None = None) -> dict:
        budget = self.Budget.from_env()
        budget.max_units = max(budget_limit - budget_used, 0)  # giây GPU còn lại của lượt này (đã trừ phần lập plan)
        return execute_pre_pr(
            plan, ticket_id=ticket_id, checkout_source=self.checkout_source,
            deps=self.deps, budget=budget, run_gate=self.run_gate, cleanup=self.cleanup,
            policy=policy, accepted_policy_hash=accepted_policy_hash, request_detail=request_detail,
            memory_path=self.memory_path, should_stop=should_stop,
        )

    def rollback(self, candidate: dict, ticket_id: int) -> dict:
        """Chưa merge: xóa nhánh candidate. Đã merge vào base: nhánh revert mới từ base, để người mở PR."""
        from main import _git_out
        repo, head = self.checkout_source, candidate["head_sha"]
        base = os.getenv("PR_BASE_BRANCH", "dev")
        refs = [ref for name in dict.fromkeys((base, "main")) for ref in (f"origin/{name}", name)]
        merged_into = next((ref for ref in refs if _merged(repo, candidate, ref)), None)
        if not merged_into:
            deleted = subprocess.run(["git", "branch", "-D", candidate["branch"]], cwd=repo, capture_output=True,
                                     text=True, stdin=subprocess.DEVNULL)
            # Đã mất nhánh cũng coi như xong; còn nhánh (vd đang checkout ở 1 worktree) thì báo lỗi, không nói dối.
            if not subprocess.run(["git", "rev-parse", "--verify", "--quiet", f"refs/heads/{candidate['branch']}"],
                                  cwd=repo, capture_output=True, stdin=subprocess.DEVNULL).returncode:
                raise OSError(f"git branch -D {candidate['branch']}: {deleted.stderr.strip()[:300]}")
            return {"outcome": "discarded", "detail": f"deleted unmerged branch {candidate['branch']}"}
        branch = f"ai-board/{time.strftime('%Y-%m-%d')}-ticket-{ticket_id}-revert-{os.urandom(3).hex()}"
        checkout = tempfile.mkdtemp(prefix="ai-board-revert-")
        try:
            _git_out(["worktree", "add", "-q", "-b", branch, checkout, merged_into], repo)
            base_sha = _git_out(["rev-parse", "HEAD"], checkout).strip()
            _git_out(["-c", "user.name=AI Board", "-c", "user.email=ai-board@tizia.local",
                      "revert", "--no-edit", f"{candidate['base_sha']}..{head}"], checkout)
            shas = _git_out(["rev-list", "--reverse", f"{base_sha}..HEAD"], checkout).split()
            commits = [{"sha": sha, "title": _git_out(["log", "-1", "--format=%s", sha], checkout).strip(),
                        "files": _git_out(["show", "--name-only", "--format=", sha], checkout).split()}
                       for sha in shas]
        except Exception:
            subprocess.run(["git", "worktree", "remove", "--force", checkout], cwd=repo, capture_output=True,
                           stdin=subprocess.DEVNULL)
            subprocess.run(["git", "branch", "-D", branch], cwd=repo, capture_output=True, stdin=subprocess.DEVNULL)
            raise
        finally:
            subprocess.run(["git", "worktree", "remove", "--force", checkout], cwd=repo, capture_output=True,
                           stdin=subprocess.DEVNULL)
            shutil.rmtree(checkout, ignore_errors=True)
        return {"outcome": "revert_ready", "detail": f"{candidate['branch']} was merged into {merged_into}",
                "revert": {"branch": branch, "base_sha": base_sha, "head_sha": shas[-1], "commits": commits}}

    def discard_candidate(self, verdict: dict) -> None:
        """Drop a candidate that could not be submitted under its lease."""
        candidate = verdict.get("candidate") or {}
        branch = candidate.get("branch")
        if branch:
            subprocess.run(["git", "branch", "-D", branch], cwd=self.checkout_source,
                           capture_output=True, text=True, stdin=subprocess.DEVNULL, check=True)


def _merged(repo, candidate: dict, ref: str) -> bool:
    """Candidate đã vào ref: head là tổ tiên, hoặc mọi commit có bản vá tương đương (cherry-pick/squash 1 commit)."""
    # ponytail: squash nhiều commit thành 1 không nhận ra được; nhận thêm merge commit khi có PR thật (ticket 06).
    def git(*args):
        return subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, stdin=subprocess.DEVNULL)
    if git("rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}").returncode:
        return False
    if not git("merge-base", "--is-ancestor", candidate["head_sha"], ref).returncode:
        return True
    cherry = git("cherry", ref, candidate["head_sha"], candidate["base_sha"])
    lines = cherry.stdout.split()
    return not cherry.returncode and bool(lines) and "+" not in lines


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
    _load_harness()
    import meter
    from memory import DEFAULT_PATH
    tracer = meter.Tracer(Path(DEFAULT_PATH).with_name("traces.jsonl"))
    worker = HttpWorker(
        WorkerClient(base_url, key),
        worker_id=default_worker_id(),
        version=os.getenv("AI_BOARD_WORKER_VERSION", "d0"),
        mode=args.mode,
        planner=HarnessPlanner(tracer) if args.plan or args.execute else None,
        change_runner=HarnessChangeRunner(tracer=tracer) if args.execute else None,
        tracer=tracer,
    )
    while True:
        try:
            result = worker.run_once()
        except PlanBlockedError as error:  # an expected outcome, not a crash: show why
            result = {"status": "plan_blocked", **error.detail}
        print(json.dumps(result, ensure_ascii=False))
        if args.once or args.mode == "off":
            return 0
        time.sleep(max(args.poll_seconds, 1.0))


if __name__ == "__main__":
    raise SystemExit(main())
