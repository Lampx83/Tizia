"""AI Board worker entrypoint: HttpWorker lease loop, poll, CLI main."""
from __future__ import annotations

import argparse
import dataclasses
import json
import os
import threading
import time
import urllib.error
from contextlib import nullcontext
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

from worker_client import (DEFAULT_BUDGET_LIMIT, REPO_ROOT, LeaseLostError, WorkerClient, _is_stale_lease, _plan_rejection,
                           _with_body, default_worker_id, server_url, take_secret)
from worker_execution import _load_harness, _real_deps, drop_screenshots, harness_change_runner
from worker_planner import HarnessPlanner, PlanBlockedError, _repaired_snapshot, gate1_probe_client, lease_provider, model_preflight
from worker_publish import SHOTS_TYPE, _forge, observe_base, pr_text, screenshot_payload, sync_pull_requests
from runtime.limits import scaled_limit  # noqa: E402
from settings import get_settings  # noqa: E402


@dataclass
class HttpWorker:
    client: WorkerClient
    worker_id: str
    version: str = "d0"
    mode: str = "off"
    planner: Callable[[dict], tuple[dict, int]] | None = None
    # change_runner(plan, ticket_id, max_units, *, policy, accepted_policy_hash, request_detail, should_stop) → verdict
    change_runner: Callable[..., dict] | None = None
    candidates: Any = None  # candidate.Candidates: discard(candidate), rollback(candidate, ticket_id)
    heartbeat_interval: float = 30.0
    tracer: Any = None  # meter.Tracer chung với planner/change runner
    sync: Callable[[], Any] | None = None  # dedicated clone → origin/<base>, once per claimed ticket
    open_prs: bool = False  # candidates.publish after a passing verdict (needs AI_BOARD_GITHUB_TOKEN)
    preview_publisher: Any = None  # optional local private preview; never changes the release verdict
    folder_base_ref: str = "HEAD"  # nhánh folder gộp ref này mỗi lượt: clone riêng → origin/<base>, checkout dev → HEAD
    model_check: Callable[[], dict | None] | None = None  # model_preflight(): lỗi → không claim
    provider_check: Callable[[], str] | None = None  # 'api' | 'vllm' this worker would use now; sizes the server's worker cap
    clock: Callable[[], float] = time.monotonic  # injectable for the GPU wait backoff
    _report_gate: Callable[[float], None] | None = dataclasses.field(default=None, init=False, repr=False)
    _gpu_retry_at: float = dataclasses.field(default=0.0, init=False, repr=False)
    _gpu_backoff_s: float = dataclasses.field(default=0.0, init=False, repr=False)

    def _report_gpu(self, blocked: dict | None, retry_at: int | None = None) -> None:
        """Best-effort board state: queued work waits for the model and retries by itself (LF/100)."""
        try:
            self.client.post("/api/ai-board/worker/gpu-state", {
                "worker_id": self.worker_id, "version": self.version, "mode": self.mode,
                "model": (blocked or {}).get("model"), "error": (blocked or {}).get("error"), "retry_at": retry_at,
            })
        except Exception as error:  # noqa: BLE001 — trạng thái GPU là best-effort
            print(f"[worker] báo trạng thái GPU lỗi: {str(error)[:160]}")

    def gate_started(self, gate: float) -> None:
        """Deps.progress: báo server cổng vừa bắt đầu trong run đang giữ lease. Lỗi gửi không làm hỏng cổng."""
        if self._report_gate is None:
            return
        try:
            self._report_gate(gate)
        except Exception as error:  # noqa: BLE001 — tiến độ best-effort
            print(f"[worker] báo cổng {gate} lỗi: {str(error)[:200]}")

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
        if self.mode == "active" and (not self.planner or not self.change_runner or not self.candidates):
            raise ValueError("active mode requires planner, change runner and candidates")
        if self.tracer and self.tracer.over_hourly_cap():
            # GPU dùng chung: hết trần giờ thì không nhận ticket mới; ticket đang chạy không bị phạt.
            return {"status": "gpu_paused", "gpu_s_last_hour": round(self.tracer.gpu_s_last_hour(), 1)}
        # A finished run may leave a node deadline or allowance in this process; clear both before probing models.
        from runtime import root_allowance
        from runtime.budget import start_node
        start_node(None)
        root_allowance.reset()
        # Not-before backoff: after a failed probe, wait before touching the GPU again (LF/100).
        now = self.clock()
        if now < self._gpu_retry_at:
            return {"status": "waiting_gpu", "retry_in_s": round(self._gpu_retry_at - now, 1)}
        if self.model_check and (blocked := self.model_check()):
            # Gateway không load nổi model (GPU tranh chấp): claim lúc này chỉ đẩy request vào 500 → precheck_blocked.
            from runtime import limits
            spec = limits.gpu_wait()
            self._gpu_backoff_s = (spec["backoff_s"] if not self._gpu_backoff_s
                                   else min(self._gpu_backoff_s * 2, spec["max_s"]))
            self._gpu_retry_at = now + self._gpu_backoff_s
            print(f"[worker] model {blocked['model']} chưa load được, chờ GPU {self._gpu_backoff_s:.0f}s, không claim: {blocked['error']}")
            self._report_gpu(blocked, retry_at=int((time.time() + self._gpu_backoff_s) * 1000))
            return {**blocked, "status": "waiting_gpu", "retry_in_s": self._gpu_backoff_s}
        if self._gpu_backoff_s:
            self._gpu_backoff_s, self._gpu_retry_at = 0.0, 0.0
            self._report_gpu(None)

        from providers import routing
        routing.LEASE_VERDICT = None
        provider = self.provider_check() if self.provider_check else "vllm"
        claim = self.client.post("/api/ai-board/worker/claim", {
            "worker_id": self.worker_id, "version": self.version, "mode": self.mode,
            "intent": "plan" if self.planner else "precheck", "provider": provider,
        })
        ticket = claim.get("ticket")
        if not ticket:
            return {"status": "idle"}
        if self.provider_check:
            routing.LEASE_VERDICT = provider
        ticket_id = ticket["id"]
        lease = {"worker_id": self.worker_id, "lease_token": ticket["lease_token"]}
        if self.sync:
            # Fails loudly (no snapshot, no run): the lease expires and a later claim recovers it.
            self.sync()
        # A new lease is a new workflow attempt; retries within that lease keep
        # the same keys, while a later clarification/replan gets fresh keys.
        prefix = f"{self.worker_id}:{ticket_id}:{ticket['lease_token'][:16]}"

        snapshot = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/snapshot", lease)
        self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/heartbeat", lease)
        # Server nói lượt này làm gì; server cũ chưa gửi trigger thì suy từ phase.
        phase = (snapshot.get("ticket") or {}).get("phase")
        trigger = ticket.get("trigger") or {"executing": "execute", "rolling_back": "rollback"}.get(phase) or (
            "plan" if self.planner else "shadow_precheck")
        run = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/runs", {
            **lease, "trigger": trigger, "idempotency_key": f"{prefix}:run",
        })["run"]
        if self.tracer:
            self.tracer.begin(
                run["id"],
                lambda calls: self.client.post(
                    f"/api/ai-board/worker/tickets/{ticket_id}/traces", {**lease, "run_id": run["id"], "calls": calls}),
                lambda spans: self.client.post(
                    f"/api/ai-board/worker/tickets/{ticket_id}/spans", {**lease, "run_id": run["id"], "spans": spans}),
            )

        def report_gate(gate: float) -> None:
            attempt = self.tracer.attempt if self.tracer else 0  # lần sửa thứ mấy (execute_pre_pr đặt)
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                **lease, "run_id": run["id"], "event_type": "gate_started", "gate": gate, "attempt": attempt,
                "internal_detail": json.dumps({"gate": gate, "attempt": attempt}),
                "idempotency_key": f"{prefix}:gate:{attempt}:{gate}",
            })

        self._report_gate = report_gate
        folder_src = None
        try:
            if snapshot.get("folder") and self.planner and self.candidates and trigger not in ("rollback", "reverify"):
                from services import candidate
                folder = snapshot["folder"]
                branch = folder.get("branch") or candidate.folder_branch(folder["slug"], folder.get("cycle") or 1)
                try:
                    path, tip = candidate.folder_source(self.candidates.repo, branch, self.folder_base_ref, folder.get("head_sha"))
                except candidate.FolderConflict as error:
                    # Không tự giải xung đột: báo admin, trả lease ở trạng thái chờ.
                    self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/events", {
                        **lease, "run_id": run["id"], "event_type": "plan_blocked",
                        "public_message": "Chức năng cần người gộp code trước khi làm tiếp.",
                        "internal_detail": f"folder_conflict: {error}", "idempotency_key": f"{prefix}:folder-conflict",
                    })
                    self._release(ticket_id, {**lease, "outcome": "waiting", "internal_detail": f"folder_conflict: {error}",
                                              "idempotency_key": f"{prefix}:release-conflict"})
                    return {"status": "folder_conflict", "ticket_id": ticket_id, "run_id": run["id"]}
                folder_src = {"path": path, "branch": branch, "tip": tip}
            from runtime.root_allowance import root_scope
            allowance = root_scope(self.client, ticket_id, lease) if snapshot.get('root_allowance_protocol') == 1 else nullcontext()
            with allowance:
                return self._run_leased(ticket_id, lease, prefix, snapshot, run, trigger, folder_src)
        finally:
            self._report_gate = None
            if folder_src:
                from services import candidate
                candidate.drop_source(self.candidates.repo, folder_src["path"])
            if self.tracer:
                self.tracer.flush()

    def _open_pr(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict, plan: dict,
                 tier: str | None, verdict: dict) -> str | None:
        """Push the verified candidate and open its one PR into dev, then report it. Return why not, else None.
        GitHub/git trouble is not the candidate's fault: the verdict stands, the admin sees the reason."""
        from services import candidate
        existing = snapshot.get("pull_request")
        if existing:
            return f"root already has PR #{existing.get('number')}; not opening another"
        title, body, labels = pr_text(snapshot, plan, tier, verdict)
        try:
            pr = self._with_heartbeat(lambda _lost: self.candidates.publish(
                verdict["candidate"], title=title, body=body, labels=labels), ticket_id, lease)
            changed = sorted({f for c in verdict["candidate"].get("commits", []) for f in c.get("files", [])})
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/pull-request", {
                **lease, "run_id": run["id"], "pull_request": pr, "idempotency_key": f"{prefix}:pr",
                "changed_files": changed,
            })
        except LeaseLostError:
            raise
        except candidate.PathDenied as error:
            return str(error)
        except Exception as error:  # noqa: BLE001
            return f"PR not opened: {str(error)[:500]}"
        return None

    def _upload_screenshots(self, ticket_id: int, lease: dict, run: dict, shots: list[dict]) -> None:
        """Đăng ảnh bản nháp vào thread yêu cầu. Best-effort: lỗi không đổi verdict (mất lease → verdict tự báo)."""
        images = screenshot_payload(shots)
        if not images:
            return
        try:
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/screenshots",
                             {**lease, "run_id": run["id"], "images": images}, content_type=SHOTS_TYPE)
        except Exception as error:  # noqa: BLE001
            print(f"[worker] đăng ảnh bản nháp lỗi: {str(error)[:200]}")

    def _release(self, ticket_id: int, payload: dict, *, after_verdict: bool = False) -> dict:
        """Gửi nốt trace còn đệm khi còn lease (sau release server trả 409 stale_lease), rồi trả lease."""
        self._close_trace(payload.get("outcome"))
        try:
            return self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/release", payload)
        except urllib.error.HTTPError as error:
            # Verdict đã được nhận và server có thể đã replan/requeue (xoá lease): release là no-op.
            if after_verdict and _is_stale_lease(error):
                return {"ok": True, "stale_lease": True}
            raise

    def _requeue_busy(self, ticket_id: int, lease: dict, prefix: str, run: dict, result: dict) -> dict:
        """Runner busy: give the lease back without a verdict; server requeues after a not-before delay."""
        self._release(ticket_id, {**lease, "outcome": "busy", "internal_detail": result.get("reason"),
                                  "idempotency_key": f"{prefix}:release-busy"})
        return {"status": "busy", "ticket_id": ticket_id, "run_id": run["id"]}

    def _close_trace(self, outcome: str | None) -> None:
        """Đóng span run và xả trace trước mọi lời gọi trả lease."""
        if self.tracer:
            if hasattr(self.tracer, "end_run"):
                self.tracer.end_run(outcome)
            self.tracer.flush()

    def _rollback(self, ticket_id: int, lease: dict, snapshot: dict, run: dict) -> dict:
        """Admin yêu cầu hoàn tác: bỏ nhánh candidate, hoặc tạo nhánh revert nếu đã merge. Lỗi → server chờ admin."""
        candidate = snapshot.get("rollback_candidate")
        try:
            if not candidate:
                raise ValueError("no candidate branch to roll back")
            result = self._with_heartbeat(
                lambda _lost: self.candidates.rollback(candidate, ticket_id,
                                                       pull_request=snapshot.get("pull_request")), ticket_id, lease)
        except LeaseLostError:
            raise
        except Exception as error:  # noqa: BLE001 — git/IO: báo server, không để root kẹt 'running'
            result = {"outcome": "failed", "detail": str(error)[:1000]}
        self._close_trace(result["outcome"])
        done = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/rollback", {
            **lease, "run_id": run["id"], **result,
        })
        return {"status": done["status"], "ticket_id": ticket_id, "run_id": run["id"], "rollback": result["outcome"]}

    def _reverify(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict) -> dict:
        """The base moved: report its tip, then rebase the kept candidate and rerun gates 4 to 5.5 on it. A conflict stops for the admin."""
        from repositories import server_hsm
        from services import reverify

        url = f"/api/ai-board/worker/tickets/{ticket_id}"
        repo = self.candidates.repo
        tip = reverify.base_tip(repo)
        if not tip:
            done = self.client.post(f"{url}/reverify/conflict", {**lease, "run_id": run["id"], "files": [],
                                                                  "detail": "the PR base branch was not found in the worker repo"})
            return {"status": done["status"], "ticket_id": ticket_id, "run_id": run["id"], "reverify": "conflict"}
        started = self.client.post(f"{url}/reverify/start", {**lease, "run_id": run["id"], "tip": tip})
        if started["outcome"] == "current":
            return {"status": "reverify_current", "ticket_id": ticket_id, "run_id": run["id"], "tip": tip}
        request = snapshot.get("request") or {}
        hsm_api = server_hsm.RemoteGate4(self.client, ticket_id=ticket_id, run_id=run["id"], worker_id=self.worker_id,
                                         lease_token=lease["lease_token"], contract=snapshot.get("hsm_contract"))
        limit = int((snapshot.get("ticket") or {}).get("budget_limit") or DEFAULT_BUDGET_LIMIT)
        with server_hsm.server_scope(hsm_api):
            result = self._with_heartbeat(lambda lost: self.change_runner(
                started["plan"], ticket_id, limit, source=repo, policy=snapshot.get("capability_policy") or {},
                accepted_policy_hash=started.get("capability_policy_hash"),
                request_detail=(request.get("title", "") + "\n" + (request.get("clarified_spec") or request.get("detail") or "")),
                should_stop=lost, plan_hash=started.get("plan_hash"), reverify={"candidate": started["candidate"], "tip": tip},
            ), ticket_id, lease, on_lease_lost=lambda lost_result: self.candidates.discard((lost_result or {}).get("candidate")))
        shots = result.pop("screenshots", None) or []
        drop_screenshots(shots)
        conflict = result.pop("_reverify_conflict", None)
        if conflict is not None:
            done = self.client.post(f"{url}/reverify/conflict", {**lease, "run_id": run["id"], "tip": tip, **conflict})
            return {"status": done["status"], "ticket_id": ticket_id, "run_id": run["id"], "reverify": "conflict"}
        if result.get("failure_class") == "busy":
            return self._requeue_busy(ticket_id, lease, prefix, run, result)
        try:
            verdict = self.client.post(f"{url}/verdict", {**lease, "run_id": run["id"], "verdict": result,
                                                         "idempotency_key": f"{prefix}:verdict"})["verdict"]
        except Exception as error:  # noqa: BLE001
            if _is_stale_lease(error):
                self.candidates.discard(result.get("candidate"))
            raise
        self._release(ticket_id, {**lease, "outcome": "planned", "idempotency_key": f"{prefix}:release"}, after_verdict=True)
        return {"status": "planned", "ticket_id": ticket_id, "run_id": run["id"], "reverify": verdict["outcome"], "pre_pr_verdict": verdict}

    def _run_leased(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict,
                    trigger: str, folder_src: dict | None = None) -> dict:
        # Folder: planner + cổng đọc từ đỉnh nhánh chu kỳ; candidate commit nối tiếp chính nhánh đó.
        plan_kwargs = {"source": folder_src["path"]} if folder_src else {}
        brief = (snapshot.get("folder") or {}).get("brief") or {}
        def journal_hook(node: str, outcome: str, snapshot: dict) -> None:
            try:
                self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/journal", {
                    **lease, "run_id": run["id"], "node": node, "outcome": outcome,
                    "state": snapshot.get("state") or {},
                    "ledger": snapshot.get("ledger") or {},
                })
            except Exception as error:  # noqa: BLE001 - journal is best effort
                print(f"[worker] journal loi: {str(error)[:160]}")

        # Run truoc bi kill (chua co verdict) + pin khop: _Execution tu dung lai scratch tu journal.
        resume = [item for item in snapshot.get("resume_journal") or []
                  if str(item.get("run_id")) != str(run["id"])]

        run_kwargs = {"source": folder_src["path"], "candidate_opts": {
            "branch_name": folder_src["branch"], "branch_restore": folder_src["tip"],
            "folder_brief": brief.get("text")}} if folder_src else {}
        if trigger == "rollback":
            return self._rollback(ticket_id, lease, snapshot, run)
        if trigger == "reverify":
            return self._reverify(ticket_id, lease, prefix, snapshot, run)
        # 'execute' = admin đã cho phép plan (tier protected): lượt này không lập plan lại mà chạy plan đã duyệt.
        executing = trigger == "execute"
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
                plan, budget_used = self._with_heartbeat(lambda _lost: self.planner(snapshot, **plan_kwargs), ticket_id, lease)
                try:
                    planned = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/plan", {
                        **lease, "run_id": run["id"], "plan": plan, "budget_used": budget_used,
                        "idempotency_key": f"{prefix}:plan",
                    })
                except urllib.error.HTTPError as rejected:
                    # Plan schema rejected (LF/106): one bounded repair turn with the rejection text,
                    # then the same submit. Any other 4xx/5xx keeps the old fail-fast path.
                    reason = _plan_rejection(rejected)
                    if not reason:
                        raise _with_body(rejected)
                    repaired = _repaired_snapshot(snapshot, reason)
                    plan, used_again = self._with_heartbeat(lambda _lost: self.planner(repaired, **plan_kwargs), ticket_id, lease)
                    budget_used += used_again
                    planned = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/plan", {
                        **lease, "run_id": run["id"], "plan": plan, "budget_used": budget_used,
                        "idempotency_key": f"{prefix}:plan-repair",
                    })
            except Exception as error:
                if isinstance(error, LeaseLostError):
                    raise
                detail_value = getattr(error, "detail", None) or {}
                clarification_delivery_error = None
                if (detail_value.get("gate") == 2.5 and detail_value.get("reason") == "needs_clarification"
                        and detail_value.get("public_message")):
                    try:
                        self._close_trace("needs_clarification")
                        clarification = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/clarifications", {
                            **lease, "run_id": run["id"], "question": detail_value["public_message"],
                            "idempotency_key": f"{prefix}:clarification",
                        })
                        if clarification.get("status") in ("clarifying", "waiting_admin", "duplicate"):
                            return {"status": clarification["status"], "ticket_id": ticket_id, "run_id": run["id"]}
                    except Exception as delivery_error:
                        clarification_delivery_error = str(delivery_error)[:500]
                # Same detail on the event and the root's internal_reason, so the admin queue API shows why.
                detail = (json.dumps({**error.detail, **({"clarification_delivery_error": clarification_delivery_error}
                                                        if clarification_delivery_error else {})}, ensure_ascii=False)
                          if isinstance(error, PlanBlockedError)
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
        if self.planner and not executing:
            from repositories import plan_session
            plan_session.put(planned.get("plan_hash"), getattr(self.planner, "last_session", None))
        if self.planner:
            verdict = None
            preview_artifact = None
            # Chỉ yêu cầu self mới gửi loại (change runner cũ không nhận tham số này).
            type_kwargs = {"request_type": "self"} if (snapshot.get("request") or {}).get("type") == "self" else {}
            # Skill cổng 1 của lượt lập plan này; lượt 'execute' (plan đã duyệt từ lease trước) không biết skill.
            skill = None if executing else getattr(self.planner, "last_skill", None)
            if self.change_runner and planned["status"] == "planned":
                if type_kwargs:  # phần kiểm tra chỉ lấy sau khi đã có plan: người lập plan không bao giờ thấy
                    type_kwargs["eval_tasks"] = self.client.post("/api/ai-board/worker/eval-tasks", {}).get("test") or []
                limit = max(int((snapshot.get("ticket") or {}).get("budget_limit") or DEFAULT_BUDGET_LIMIT),
                            scaled_limit("units", len(plan.get("steps") or [])))  # cùng công thức store.js: snapshot chụp trước khi server nới trần
                from repositories import memory
                from repositories.server_memory import RemoteLessons
                from repositories import server_hsm

                memory_api = RemoteLessons(self.client, ticket_id=ticket_id, run_id=run["id"],
                                           worker_id=self.worker_id, lease_token=lease["lease_token"],
                                           files=[file for step in plan.get("steps") or []
                                                  for file in step.get("allowed_scope") or []],
                                           enabled=snapshot.get("lessons_schema_version") == 1)
                hsm_contract = snapshot.get('hsm_contract')
                hsm_api = server_hsm.RemoteGate4(self.client,ticket_id=ticket_id,run_id=run['id'],
                    worker_id=self.worker_id,lease_token=lease['lease_token'],contract=hsm_contract)
                with memory.server_scope(memory_api), server_hsm.server_scope(hsm_api):
                    from runtime.step_gate import runnable_plan
                    result = self._with_heartbeat(
                        lambda lost: self.change_runner(
                            runnable_plan(plan, planned.get("runnable_orders")), ticket_id, max(limit - budget_used, 0),  # giây GPU còn lại của lượt (trừ phần lập plan)
                            # {} when missing: fails the hash check closed instead of skipping the catalog.
                            policy=snapshot.get("capability_policy") or {},
                            accepted_policy_hash=planned.get("capability_policy_hash"),
                            request_detail=((snapshot.get('request') or {}).get('title', '') + '\n'
                                + ((snapshot.get('request') or {}).get('clarified_spec')
                                   or (snapshot.get('request') or {}).get('detail') or '')),
                            should_stop=lost, **run_kwargs, **type_kwargs, journal=journal_hook, resume=resume,
                            network_decisions=snapshot.get('network_decisions') or {},
                            resume_node=(snapshot.get('ticket') or {}).get('resume_node'),
                        **({"plan_hash": planned["plan_hash"]} if planned.get("plan_hash") else {}),
                        ), ticket_id, lease,
                        on_lease_lost=lambda lost_result: self.candidates.discard((lost_result or {}).get("candidate")),
                    )
                preview_artifact = result.pop("_preview_artifact", None) if isinstance(result, dict) else None
                shots = (result.pop("screenshots", None) if isinstance(result, dict) else None) or []
                try:
                    # Ảnh trước verdict: chuông "xem ảnh" của verdict đạt mở ra thread đã có ảnh.
                    if shots and result.get("outcome") in ("ready_for_pr", "needs_review"):
                        self._upload_screenshots(ticket_id, lease, run, shots)
                finally:
                    drop_screenshots(shots)
                if result.get("failure_class") == "busy":
                    return self._requeue_busy(ticket_id, lease, prefix, run, result)
                try:
                    verdict = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/verdict", {
                        **lease, "run_id": run["id"], "verdict": {**result, "skill": skill} if skill else result,
                        "idempotency_key": f"{prefix}:verdict",
                    })["verdict"]
                    memory_api.flush(verdict)
                except Exception as error:
                    if _is_stale_lease(error):
                        self.candidates.discard(result.get("candidate"))
                    raise
            preview_result = None
            if self.preview_publisher and verdict and (verdict.get("candidate") or preview_artifact):
                try:
                    def publish_private(_stop):
                        if preview_artifact:
                            return self.preview_publisher.publish_archive(snapshot["request"]["id"],run["id"],self.worker_id,
                                                                          preview_artifact["candidate_sha"],preview_artifact["archive"])
                        return self.preview_publisher.publish(snapshot["request"]["id"], run["id"], self.worker_id,
                                                              verdict["candidate"], self.candidates.repo)
                    preview_result = self._with_heartbeat(publish_private, ticket_id, lease)
                except Exception:
                    preview_result = {"state": "unavailable"}  # serving verdict/candidate remain unchanged
            pr_problem = None
            if self.open_prs and verdict and verdict.get("candidate") and verdict.get("outcome") in ("ready_for_pr", "needs_review"):
                pr_problem = self._open_pr(ticket_id, lease, prefix, snapshot, run, plan, planned.get("tier"), verdict)
            pr_blocked = bool(pr_problem) and pr_problem.startswith("path_denied")
            self._release(ticket_id, {
                **lease, "outcome": "waiting" if pr_blocked else "planned", "idempotency_key": f"{prefix}:release",
                **({"internal_detail": pr_problem} if pr_problem else {}),
            }, after_verdict=True)
            result = {
                "status": planned["status"], "ticket_id": ticket_id, "run_id": run["id"],
                "tier": planned["tier"], "children": len(planned.get("children") or []),
            }
            if verdict is not None:
                result["pre_pr_verdict"] = verdict
            if preview_result is not None:
                result["preview"] = preview_result
            return result
        self._release(ticket_id, {
            **lease, "outcome": "shadow_ok", "idempotency_key": f"{prefix}:release",
        })
        return {"status": "shadow_ok", "ticket_id": ticket_id, "run_id": run["id"]}


def admin_rewrite_step(status, client, deps, worker_id, *, rewrite=None) -> dict | None:
    """Một job viết lại skill do admin xác nhận, chỉ khi poll vừa rồi rảnh (idle). Không đề xuất, không retro."""
    if status != "idle":
        return None
    if rewrite is None:
        from services import skill_rewrite as rewrite
    step = rewrite.run_step(client, deps, worker_id=worker_id)
    return None if step["status"] == "none" else {"skill_rewrite": step}


def poll(worker) -> dict:
    """One poll. Plan block = expected outcome. Server down/restarting (DNS, refused, reset, 5xx) = a status, retried next tick:
    crashing instead would burn the container's restart budget during a normal redeploy. 4xx (bad key) still raises."""
    try:
        return worker.run_once()
    except PlanBlockedError as error:
        return {"status": "plan_blocked", **error.detail}
    except (urllib.error.URLError, ConnectionError, TimeoutError) as error:  # HTTPError is a URLError
        if isinstance(error, urllib.error.HTTPError) and error.code < 500:
            raise
        return {"status": "server_unreachable", "reason": str(getattr(error, "reason", error))}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Tizia AI Board HTTP worker")
    parser.add_argument("--mode", choices=("off", "shadow", "active"), default=get_settings().worker_mode)
    parser.add_argument("--once", action="store_true", help="poll once, then exit")
    parser.add_argument("--plan", action="store_true", help="run gates 1, 2 and 2.5, then submit child-ticket plan")
    parser.add_argument("--execute", action="store_true", help="run the accepted plan through gates 3, 4, 5 and 5.5")
    parser.add_argument("--poll-seconds", type=float, default=5.0)
    parser.add_argument("--sync-prs", action="store_true", help="report merged/closed ai-board PRs from GitHub, then exit")
    parser.add_argument("--observe-base", action="store_true", help="report the PR base branch tip of the worker repo, then exit")
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
    base_url = server_url()
    key = take_secret("AI_BOARD_WORKER_KEY")
    github_token = take_secret("AI_BOARD_GITHUB_TOKEN")
    if (args.mode != "off" or args.sync_prs or args.observe_base) and len(key) < 24:
        parser.error("AI_BOARD_WORKER_KEY must be at least 24 characters")
    _, Deps, _ = _load_harness()
    if args.observe_base:
        repo_dir = get_settings().repo_dir
        print(json.dumps(observe_base(WorkerClient(base_url, key), Path(repo_dir) if repo_dir else REPO_ROOT), ensure_ascii=False))
        return 0
    if args.sync_prs:
        from services import candidate
        github = _forge(candidate, github_token)
        print(json.dumps(sync_pull_requests(WorkerClient(base_url, key), github), ensure_ascii=False))
        return 0
    from runtime import meter
    from repositories.memory import DEFAULT_PATH
    from runtime import prompt_labels
    if drift := prompt_labels.check_all(lock=meter.prompt_lock(), labels=prompt_labels.load()):
        parser.error(f"prompt label lệch prompts.lock.json, worker không chạy: {drift}")
    tracer = meter.Tracer(Path(DEFAULT_PATH).with_name("traces.jsonl"))
    worker = HttpWorker(
        WorkerClient(base_url, key),
        worker_id=default_worker_id(),
        version=get_settings().worker_version,
        mode=args.mode,
        tracer=tracer,
    )
    # Cổng báo tiến độ qua worker.gate_started → event gate_started của run đang giữ lease.
    # AI_BOARD_REPO_DIR = the worker's own clone (prod container): reset to origin/<PR_BASE_BRANCH> before
    # every ticket and used as the candidate base. Unset = this checkout, never reset (a dev's working tree).
    repo_dir = get_settings().repo_dir
    repo = Path(repo_dir) if repo_dir else REPO_ROOT
    if repo_dir:
        from services import candidate
        base = os.getenv("PR_BASE_BRANCH", "dev")
        worker.sync = lambda: candidate.sync(repo, base)
        worker.folder_base_ref = f"origin/{base}"
    from repositories import memory
    print(json.dumps({"memory_pruned": memory.prune(DEFAULT_PATH, source=repo)}))
    if args.plan or args.execute:  # shadow thuần không gọi model → không preflight
        probe_client = gate1_probe_client()
        worker.model_check = model_preflight(probe_client)
        worker.provider_check = lambda: lease_provider(probe_client)
        worker.planner = HarnessPlanner(tracer, progress=worker.gate_started, source=repo if repo_dir else None,
                                       client=worker.client, worker_id=worker.worker_id)
        if engine_url := get_settings().engine_url:
            from api.client import RemotePlanner
            try:
                worker.planner = RemotePlanner(
                    engine_url, take_secret("AI_BOARD_INTERNAL_KEY"),
                    project=get_settings().project,
                    fallback=worker.planner, tracer=tracer,
                )
            except ValueError as error:
                parser.error(str(error))
            # Plan-only callers do not need a local GPU; execution still uses its local model preflight.
            if not args.execute:
                worker.model_check = worker.planner.preflight
    if args.execute:
        from services import candidate
        worker.change_runner = harness_change_runner(checkout_source=repo, tracer=tracer,
                                                     progress=worker.gate_started)
        github = _forge(candidate, github_token)
        from runtime import package_broker
        worker.candidates = candidate.Candidates(repo, github=github,
                                                 broker_receipts=package_broker.receipts_path(get_settings().package_broker_dir))
        if get_settings().private_preview_enabled:
            from preview import PreviewPublisher
            worker.preview_publisher = PreviewPublisher(base_url, key)
        worker.open_prs = github is not None  # no token: verdicts stop at ready_for_pr, as before
    rewrite_deps = _real_deps(Deps, tracer, worker.gate_started) if args.execute else None
    while True:
        result = poll(worker)
        print(json.dumps(result, ensure_ascii=False))
        step = admin_rewrite_step(result.get("status"), worker.client, rewrite_deps, worker.worker_id) if rewrite_deps else None
        if step is not None:
            print(json.dumps(step, ensure_ascii=False))
        if args.once or args.mode == "off":
            return 0
        time.sleep(max(args.poll_seconds, 1.0))
