"""AI Board worker: Gates 3 to 5.5 run (execution graph, repair loop, reverification, checkpoint, change runner)."""
from __future__ import annotations

import dataclasses
import hashlib
import json
import os
import shutil
import tempfile
import time
from pathlib import Path
from typing import Callable

from worker_client import CONTRACT, LeaseLostError, REPO_ROOT
from runtime import feedback_cap, loop_guard, progress, stop_report  # noqa: E402
from runtime.limits import config_sha256, loop_guard as loop_limits, progress as progress_limits, repair_agent as repair_agent_limits, run_wall_clock_s, scaled_limit  # noqa: E402
from settings import get_settings  # noqa: E402
from gates import ready_oracle  # noqa: E402
from verification import checks  # noqa: E402
import path_policy  # noqa: E402


def _load_harness():
    harness_dir = Path(__file__).resolve().parent / "harness"
    if str(harness_dir) not in os.sys.path:
        os.sys.path.insert(0, str(harness_dir))
    from runtime.budget import Budget
    from runtime.pipeline import Deps, run_gate
    return Budget, Deps, run_gate


def _real_deps(Deps, tracer, progress):
    """Deps thật + tracer và progress (HttpWorker.gate_started) của worker."""
    deps = dataclasses.replace(Deps.real(), trace=tracer)
    return dataclasses.replace(deps, progress=progress) if progress else deps


def _execution_plan(plan: dict) -> dict:
    """Server plan → subtask Gate 3. Giữ nguyên mọi field của step đã duyệt (allowed_scope, tests,
    acceptance, risk, …); thêm file = scope[0], verify = mọi test + acceptance, size theo risk."""
    from gates import two_level
    subtasks = []
    for step in sorted(plan.get("steps") or [], key=lambda step: step.get("order", 0)):
        scope = step.get("allowed_scope") or []
        tests = step.get("tests") or []
        if not scope or not tests:
            raise ValueError("plan step requires allowed_scope and tests")
        verify = dict.fromkeys([*tests, *(step.get("acceptance") or [])])
        subtasks.append({
            **step, "file": scope[0], "verify": "; ".join(verify), **({"files": scope[1:]} if len(scope) > 1 and two_level.enabled() else {}),
            "size": "small" if step.get("risk") == "low" else "large",
        })
    if not subtasks:
        raise ValueError("plan requires at least one step")
    return {"subtasks": subtasks, "capabilities": list(plan.get("capabilities") or []),
            "acceptance": [str(item) for item in (plan.get("acceptance") or []) if str(item).strip()]}


PIN_KEYS = ("plan_hash", "base", "policy", "config", "graph")


def resume_pins(*, plan_hash=None, base=None, policy_hash=None) -> dict:
    """Pin set of one attempt: any changed pin forbids resuming its journal (LF/150)."""
    from runtime import exec_graph, limits
    return {"plan_hash": plan_hash, "base": base, "policy": policy_hash,
            "config": limits.config_sha256(), "graph": exec_graph.digest()}


def pin_mismatch(pins, current: dict) -> list[str]:
    """Names of pins that differ; missing/stale pin data fails closed -> ['missing']."""
    if not isinstance(pins, dict) or any(key not in pins for key in PIN_KEYS):
        return ["missing"]
    return sorted(key for key in PIN_KEYS if pins.get(key) != current.get(key))


def _public_gate_result(result: dict) -> dict:
    out = {
        "gate": result["gate"], "blocked": bool(result.get("blocked")),
        "reason": result.get("reason"),
    }
    if result["gate"] == 4 and result.get("soft_misses"):
        out["soft_misses"] = list(result["soft_misses"])
    elif result["gate"] == 5 and (result.get("evidence") or {}).get("soft_misses"):
        out["soft_misses"] = list(result["evidence"]["soft_misses"])
    if result["gate"] == 3 and result.get("tool_manifest"):
        out["tool_manifest"] = result["tool_manifest"]
    elif result["gate"] == 4:
        out["issues"] = list(result.get("issues") or [])
        out["checks"] = list(result.get("checks") or [])
        if result.get("change_class"):
            out["change_class"] = result["change_class"]
        if result.get("adversarial_review"):
            out["adversarial_review"] = result["adversarial_review"]
        if result.get("intent_review"):
            out["intent_review"] = result["intent_review"]
    elif result["gate"] == 5:
        out["smoke_passed"] = bool((result.get("evidence") or {}).get("smoke_passed"))
        out["http_observed"] = bool((result.get("evidence") or {}).get("http_observed"))
        out["runner"] = (result.get("evidence") or {}).get("runner")
        out['functional'] = (result.get('evidence') or {}).get('functional')
        if (result.get('evidence') or {}).get('text'):
            out['evidence'] = {'text': result['evidence']['text'][-16000:]}
        if (result.get("evidence") or {}).get("eval"):  # yêu cầu self: kết quả eval 2 sha (self_eval.py)
            out["eval"] = result["evidence"]["eval"]
    elif result["gate"] == 5.5:
        out["risk_level"] = result.get("risk_level")
        out["risk_signals"] = list(result.get("risk_signals") or [])
        if result.get("change_class"):
            out["change_class"] = result["change_class"]
    return out


MAX_REPAIRS = CONTRACT["max_repairs"]  # server enforces the same bound
REPAIR_REPLAN = CONTRACT.get("repair_replan") or {}


def repair_cap() -> int:
    """Trần an toàn lượt sửa của một run (không phải điều kiện dừng thường): max_repairs, nâng theo repair_replan khi bật."""
    if not REPAIR_REPLAN.get("enabled"):
        return MAX_REPAIRS
    return max(MAX_REPAIRS, int(REPAIR_REPLAN.get("max_repairs") or 0))


# The planner finds this marker in the root's internal_reason (= verdict reason) on the replan lease.
CHECK_REVISE = "check_suspect_revise:"
_REVISE_JSON = 700  # verdict reason is cut at 1000 chars server-side, after the stop report prefix


def revise_reason(old: list[dict], reason: str) -> str:
    return f"{CHECK_REVISE} {json.dumps(old, ensure_ascii=False, separators=(',', ':'))} | {reason}"


def _norm_diff(text: str) -> str:
    """Diff without hunk/index headers, whitespace collapsed per line."""
    return "\n".join(" ".join(line.split()) for line in str(text).splitlines() if not line.startswith(("@@", "index ")))


def near_identical(before: dict[str, str], after: dict[str, str]) -> float | None:
    """Lowest similarity when every subtask diff of two rounds is above the loop-guard threshold, else None."""
    if not after or before.keys() != after.keys():
        return None
    guard = loop_limits()
    low = min(loop_guard.similarity(_norm_diff(before[file]), _norm_diff(after[file]), guard["similarity_max_chars"])
              for file in after)
    return low if low > guard["similarity"] else None


def check_rows(result: dict | None) -> list[dict]:
    return list((((result or {}).get("evidence") or {}).get("checks") or {}).get("rows") or [])


def revision_of(plan: dict | None) -> list[dict]:
    """Check revisions the plan carries: file, reason, replaced checks, the checks now in force."""
    return [{"file": (step.get("allowed_scope") or [None])[0], "reason": step["check_revision"].get("reason"),
             "old": list(step["check_revision"].get("old") or []), "new": list(step.get("checks") or [])}
            for step in (plan or {}).get("steps") or [] if isinstance(step.get("check_revision"), dict)]


def _passed(gates: list[dict], kind: str | None) -> bool:
    """Qua hết: không lỗi, tới 5.5 không bị chặn, smoke qua và quan sát được qua HTTP (self: biến thể thắng eval)."""
    smoke = next((gate for gate in gates if gate["gate"] == 5), None)
    return bool(kind is None and gates and gates[-1]["gate"] == 5.5 and not gates[-1]["blocked"]
                and smoke and ((smoke["smoke_passed"] and smoke["http_observed"]
                                and (smoke.get('functional') or {}).get('passed'))
                               or (smoke["runner"] == "eval" and (smoke.get("eval") or {}).get("accepted"))))


def _keep_blocked(gates: list[dict], kind: str | None) -> bool:
    """Eval flag: an ordinary/plan block at gate 4 or later keeps its branch so the candidate can be graded."""
    # ponytail: kept branches pile up in the worker repo; eval-only flag, prune ai-board/* branches by hand
    return (get_settings().keep_blocked_candidate and kind in ("ordinary", "plan")
            and bool(gates) and gates[-1]["gate"] >= 4 and gates[-1].get("blocked") is True)


def _preview_eligible(gates: list[dict], kind: str | None) -> bool:
    gate4 = next((gate for gate in gates if gate["gate"] == 4), {})
    gate5 = next((gate for gate in gates if gate["gate"] == 5), {})
    oracle = gate5.get("functional") or {}
    return (kind == "plan" and gate4.get("blocked") is False and gate5.get("runner") == "docker"
            and gate5.get("smoke_passed") is True and gate5.get("http_observed") is True
            and gate5.get("blocked") is True and oracle.get("passed") is False
            and not oracle.get("probe_id") and oracle.get("reason") == "No trusted behavioral oracle for this request")


def node_span(deps, node_id: str, fn: Callable[[], str]) -> Callable[[], str]:
    """Bọc 1 handler node của graph trong 1 span tên `node_id`; không tracer thì trả nguyên hàm."""
    trace = getattr(deps, "trace", None)
    if trace is None or not hasattr(trace, "open_span"):
        return fn

    def run():
        span = trace.open_span(node_id, {"gen_ai.operation.name": "invoke_agent", "tizia.node.id": node_id})
        try:
            outcome = fn()
        except BaseException as error:
            trace.close_span(span, "error", {"tizia.node.status": "error", "tizia.error.type": type(error).__name__})
            raise
        trace.close_span(span, "ok", {"tizia.node.status": str(outcome)[:40]})
        return outcome
    return run


class _Execution:
    """Gates 3→5.5 and the repair loop as one run of the execution graph (contract.json `execution_graph`).
    Each node is a method; the graph owns the order and the termination, the node bodies own the work."""

    def __init__(self, plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate, cleanup, catalog,
                 request_detail, memory_path, should_stop, candidate_opts, request_type, eval_tasks, preview_capture,
                 checkpoint, plan_hash, journal_hook=None, resume=None, policy_hash=None, resume_node=None, plan_session=None, approved=None):
        self.plan, self.ticket_id, self.checkout_source = plan, ticket_id, checkout_source
        self.deps, self.budget, self.run_gate, self.cleanup = deps, budget, run_gate, cleanup
        self.catalog, self.request_detail, self.memory_path = catalog, request_detail, memory_path
        self.should_stop, self.candidate_opts, self.request_type = should_stop, candidate_opts, request_type
        self.eval_tasks, self.preview_capture, self.checkpoint, self.plan_hash = eval_tasks, preview_capture, checkpoint, plan_hash
        self.journal_hook = journal_hook
        self.plan_session = plan_session
        self.approved = approved
        self.resume = resume or []
        self.resume_node = resume_node
        self.resume_seed: dict | None = None
        self.policy_hash = policy_hash
        self.grounded = (plan.get("grounding") or {}).get("sha")
        self.repairs: list[dict] = []
        self.repair_reason = None
        self.repair_evidence: dict | None = None
        self.last_result: dict = {}
        self.produced: dict[str, dict] = {}
        self.repair_files: list[str] = []
        self.round_metrics: list[dict] = []
        self.progress_rounds = self.no_progress = 0
        self.diff_texts: list[str] = []
        self.repair_diffs: dict | None = None
        self.progress_window = None
        self.agent_attempts = 0
        self.agent_evidence: list[dict] = []
        self.agent_images: list[dict] = []
        self.reuse_next = None
        self.halt: dict = {}
        self.stop_note: str | None = None
        self.settled_packages: set[str] = set()
        self.feedback_stop: dict | None = None
        self.shots: list[dict] = []
        self.gates: list[dict] = []
        self.kind = self.candidate = self.base_sha = self.state = self.scratch = None
        self.blocked_candidate: dict | None = None
        self.attempt_checkpoint = None
        self.open = self.lease_lost = False
        self.result: dict | None = None
        self.path: list[str] = []

    def handlers(self) -> dict:
        node = lambda name, fn: node_span(self.deps, name, fn)  # gates already span inside run_gate
        return {"attempt_open": node("attempt_open", self.attempt_open), "gate_3": lambda: self.gate(3), "gate_4": lambda: self.gate(4),
                "gate_5": lambda: self.gate(5), "gate_5_5": lambda: self.gate(5.5), "attempt_close": node("attempt_close", self.attempt_close),
                "repair_check": node("repair_check", self.repair_check), "repair_agent": node("repair_agent", self.repair_agent),
                "repair": node("repair", self.repair),
                "verdict": node("verdict", self.verdict)}

    ENTRY = "execute"

    def run(self) -> dict:
        from runtime import exec_graph

        if self.checkpoint is not None:
            self.checkpoint.restore(self.budget)
            # Deepest valid state: a worker that died during a repair continues that repair, not the failed first attempt.
            cursor = self.checkpoint.load_cursor()
            if cursor and cursor.get("base") == self.grounded and isinstance(cursor.get("repairs"), list):
                self.repairs, self.repair_reason = list(cursor["repairs"]), cursor.get("repair_reason")
                self.repair_evidence = cursor.get("repair_evidence")
        self.resume_seed = self._prepare_resume()
        resume_nodes = (self.resume_seed or {}).get("resume_nodes")
        saver = self.checkpoint.graph_saver(f"{self.checkpoint.run_scope}@{self.grounded}") if self.graph_persistence() else None
        try:
            self.path = exec_graph.run(self.handlers(), exec_graph.spec()["entries"][self.ENTRY], checkpointer=saver,
                                       thread_id=saver.thread_id if saver else None,
                                       observe={"repair_check": self.observe_state}, report=self.halt,
                                       journal=self.journal, resume_nodes=resume_nodes)
        finally:
            self.close_attempt()  # a lease loss or crash inside a node still cleans the attempt up
        return self.result

    def _checkout_head(self) -> str | None:
        from repositories import code_index
        try:
            return code_index.git(self.checkout_source, "rev-parse", "HEAD").decode().strip()
        except Exception:  # noqa: BLE001 - khong phai repo: khong resume
            return None

    def _note(self, detail: str) -> None:
        trace = getattr(self.deps, "trace", None)
        if trace is not None and hasattr(trace, "note"):
            trace.note("tool", "graph resume", detail)

    def _journal_mismatch(self, mismatch: list[str], pins) -> None:
        """Ghi ly do khong resume vao journal de admin thay (LF/150)."""
        if not self.journal_hook:
            return
        try:
            self.journal_hook("resume", "pin_mismatch", {
                "state": {"mismatch": mismatch, "pins": pins}, "ledger": {}})
        except Exception:  # noqa: BLE001 - journal la best effort
            pass

    def _journal_resume(self, previous_run_id, from_node: str = "gate_4") -> None:
        """Danh dau run nay chay tiep tu `from_node` (LF/152 doc de hien badge)."""
        if not self.journal_hook:
            return
        try:
            self.journal_hook("resume", "resumed", {
                "state": {"from_node": from_node, "previous_run_id": previous_run_id}, "ledger": {}})
        except Exception:  # noqa: BLE001 - journal la best effort
            pass

    def _prepare_resume(self) -> dict | None:
        """Doc journal cua cac run truoc: pin khop + gate 3 da xong -> dung lai scratch/diffs, bo qua gate 3."""
        if not self.resume:
            return None
        head = self._checkout_head()
        current = resume_pins(plan_hash=self.plan_hash, base=head, policy_hash=self.policy_hash)
        for candidate in self.resume:  # server tra run moi nhat truoc
            entries = sorted(candidate.get("entries") or [], key=lambda e: (e.get("created_at") or 0))
            # Chi resume khi gate 3 hoac gate 4 la node vua xong: crash giua mot luot sua thi phai lam lai.
            done = entries[-1] if entries else None
            if (done is None or done.get("node") not in ("gate_3", "gate_4")
                    or done.get("outcome") != "passed"):
                continue
            state = done.get("state") or {}
            mismatch = pin_mismatch(state.get("pins"), current)
            if state.get("resumable") is False:
                mismatch = sorted(set(mismatch) | {"state"})
            if mismatch:
                detail = f"pin lech ({', '.join(mismatch)}); purge checkpoint va chay moi"
                self._note(detail)
                self._journal_mismatch(mismatch, state.get("pins"))
                continue
            produced = ((next((entry for entry in reversed(entries)
                               if (entry.get("state") or {}).get("produced")), None) or {}).get("state") or {}).get("produced") or {}
            base = state.get("base_sha") or head
            if not produced or not base:
                continue
            from_gate = 4 if done.get("node") == "gate_3" else 5
            if self.resume_node and self.resume_node != f"gate_{from_gate}":
                continue  # admin asked for another node: this journal is not its checkpoint
            scratch = Path(tempfile.mkdtemp(prefix="ai-board-change-"))
            seed = {"plan": _execution_plan(self.plan), "produced": dict(produced),
                    "base_sha": base, "scratch_repo": str(scratch), "checkout_source": str(self.checkout_source),
                    "skill_id": f"ticket-{self.ticket_id}", **dict(self.candidate_opts or {})}
            try:
                from gates import implement
                implement.restore(seed)
            except Exception as error:  # noqa: BLE001 - khong dung lai duoc scratch thi chay lai gate 3
                shutil.rmtree(scratch, ignore_errors=True)
                self._note(f"khong dung lai duoc scratch tu journal: {str(error)[:200]}")
                continue
            if from_gate >= 5:  # gate 5 can the candidate worktree: dung lai mot lan, khong commit trung
                from services import candidate as candidates
                failed = candidates.ensure(seed, 5)
                if failed:
                    shutil.rmtree(scratch, ignore_errors=True)
                    self._note(f"khong dung lai duoc candidate: {str(failed.get('reason'))[:200]}")
                    continue
                base = seed.get("base_sha") or base
            produced_keys = ("full_checkout", "checkout_repo", "branch", "branch_restore", "commits",
                             "full_diff", "_owned_full_checkout")
            candidate_state = {key: seed[key] for key in produced_keys if key in seed}
            self.produced = dict(produced)
            self.gates = list(state.get("gates") or [])
            self.repairs = list(state.get("repairs") or [])
            repair_state = state.get("repair_state") or {}
            self.round_metrics = list(repair_state.get("round_metrics") or [])
            self.diff_texts = list(repair_state.get("diff_texts") or [])
            self.repair_diffs = repair_state.get("repair_diffs")
            self.progress_rounds = int(repair_state.get("progress_rounds") or 0)
            self.no_progress = int(repair_state.get("no_progress") or 0)
            tried = [str(item) for item in repair_state.get("window_tried") or []][:20]
            if tried:  # resume starts a fresh window but keeps what was already tried
                self._progress_window().tried = tried
            self.stop_note = repair_state.get("stop_note")
            self.repair_reason = repair_state.get("repair_reason")
            self.repair_evidence = repair_state.get("repair_evidence")
            self.base_sha = base
            ledger = done.get("ledger") or {}
            if ledger:  # chi phi da tieu truoc khi kill: cong don, khong reset
                self.budget.absorb(ledger)
            self._journal_resume(candidate.get("run_id"), f"gate_{from_gate}")
            self._note(f"resume tu journal run {candidate.get('run_id')} tai gate {from_gate}")
            return {"scratch": str(scratch), "diffs": seed["diffs"], "base_sha": base,
                    "gates": list(self.gates), "candidate_state": candidate_state,
                    "resume_nodes": {"gate_3": "passed", "gate_4": "passed"} if from_gate >= 5
                    else {"gate_3": "passed"}}
        return None

    def observe_state(self) -> tuple | None:
        """(code fingerprint, error, block signature) of the failed attempt, for the graph's state-hash router."""
        if not self.gates or not self.gates[-1].get("blocked"):
            return None
        from runtime import repair_class
        last = self.gates[-1]
        code = repair_class.metrics(self.last_result, (self.state or {}).get("diffs") or [])["diff"]
        return code, str(last.get("reason")), f"{last.get('gate')}:{self.kind}"

    def journal(self, node: str, outcome: str) -> None:
        """Node outcome plus the state a later attempt needs to continue right after it (LF/147/LF/148)."""
        if not self.journal_hook:
            return
        state = self.state or {}
        produced = dict(state.get("produced") or self.produced)
        base = state.get("base_sha") or self.base_sha or self.grounded
        entry = {
            "pins": resume_pins(plan_hash=self.plan_hash, base=base, policy_hash=self.policy_hash),
            "base_sha": base, "repairs": list(self.repairs), "gates": list(self.gates),
            "produced_files": sorted(produced), "resumable": True,
            # Repair classification/stagnation is cumulative; a resume must not restart it (LF/153).
            "repair_state": {
                "round_metrics": list(self.round_metrics), "progress_rounds": self.progress_rounds,
                "no_progress": self.no_progress, "stop_note": self.stop_note, "repair_reason": self.repair_reason,
                "repair_evidence": self.repair_evidence,
                "diff_texts": [str(text)[-8000:] for text in self.diff_texts[-3:]],
                **({"repair_diffs": self.repair_diffs} if self.repair_diffs else {}),
                "window_tried": list(self.progress_window.tried) if self.progress_window is not None else [],
            },
        }
        if node == "gate_3":  # the full generated code is only needed once per attempt; other nodes cost little
            entry["produced"] = produced
        if len(json.dumps(entry, ensure_ascii=False, default=str)) > 190_000:
            entry.pop("produced", None)  # qua lon: journal van ghi, nhung khong du de resume
            entry["resumable"] = False
        self.journal_hook(node, outcome, {"state": entry,
                                          "ledger": self.budget.snapshot() if hasattr(self.budget, "snapshot") else {}})

    def graph_persistence(self) -> bool:
        from runtime import exec_graph
        return exec_graph.persistence_enabled() and self.checkpoint is not None and hasattr(self.checkpoint, "graph_saver")

    # ── nodes ──
    def attempt_open(self) -> str:
        seed, self.resume_seed = self.resume_seed, None
        if getattr(self.deps, "trace", None):
            self.deps.trace.attempt = len(self.repairs)
        drop_screenshots(self.shots)  # ảnh của lần trước lần sửa: bỏ
        self.shots, self.gates, self.kind, self.candidate = [], [], None, None
        self.attempt_checkpoint = self.checkpoint.attempt(len(self.repairs)) if self.checkpoint is not None else None
        self.scratch = Path(seed["scratch"]) if seed else Path(tempfile.mkdtemp(prefix="ai-board-change-"))
        execution_plan = _execution_plan(self.plan)
        state = self.state = {
            "plan": execution_plan, "scratch_repo": str(self.scratch),
            "checkout_source": str(self.checkout_source), "skill_id": f"ticket-{self.ticket_id}",
            # Lệnh acceptance cấp feature: cổng 5 chạy trước verdict (và gửi sang guest nếu dùng sandbox).
            "acceptance": list(execution_plan.get("acceptance") or []),
            **getattr(getattr(self.deps, "network", None), "broker_state", dict)(),
        }
        if seed:  # gate 3 da xong trong journal: dung lai state + scratch, khong goi model lai
            state.update(seed.get("candidate_state") or {})
            state["produced"] = dict(self.produced)
            state["diffs"] = list(seed["diffs"])
            state["base_sha"] = seed["base_sha"]
            self.gates = list(seed["gates"])
        self.open = True
        if self.catalog is not None:
            state["catalog"] = self.catalog
        if self.request_detail:
            state["request_detail"] = self.request_detail
        if self.request_type:
            state["request_type"] = self.request_type  # 'self': cổng 4 nới vùng tự sửa + tính lại file khoá
        if self.eval_tasks is not None:
            state["eval_tasks"] = self.eval_tasks  # self: phần kiểm tra, chỉ cổng 5 (eval) đọc
        if self.attempt_checkpoint is not None:
            state["checkpoint"] = self.attempt_checkpoint
        if self.plan_session:
            state["plan_session"] = self.plan_session
        if self.approved:
            state["approved_checks"], state["approved_pin"] = self.approved["checks"], self.approved["pin"]
        state["should_stop"] = self.should_stop  # sandbox Gate 5 renews its VM lease only while this is false
        state.update(self.candidate_opts or {})  # folder: branch_name + branch_restore cho candidate.create
        if self.memory_path:
            state["memory_path"] = str(self.memory_path)
        if self.repair_reason:
            state["repair_reason"] = self.repair_reason
            state["repair_evidence"] = self.repair_evidence
        if self.reuse_next is not None:
            state["reuse"] = dict(self.reuse_next)  # the agent already wrote these files: rebuild, no model call
            self.reuse_next = None
        elif self.repair_files and 0 < len(self.repair_files) < len(self.produced):
            state["reuse"] = {file: entry for file, entry in self.produced.items() if file not in self.repair_files}
        state["repairs_left"] = repair_cap() - len(self.repairs)  # reviewer fix spends the same repair cap
        if self.plan.get("grounding"):
            from repositories import code_index
            if (code_index.git(self.checkout_source, "rev-parse", "HEAD").decode().strip() != self.plan["grounding"]["sha"]
                    or state.get("base_sha", self.plan["grounding"]["sha"]) != self.plan["grounding"]["sha"]):
                self.gates = [{"gate": 3, "blocked": True, "reason": "source changed since grounded plan"}]
                self.kind = "plan"
                return "blocked"
            state["base_sha"] = self.plan["grounding"]["sha"]
        return "passed"

    def gate(self, gate) -> str:
        budget, deps, state = self.budget, self.deps, self.state
        if self.should_stop and self.should_stop():  # lease revoked, e.g. the requester cancelled
            raise LeaseLostError(f"lease revoked before gate {gate}")
        retried = False
        while True:
            if not budget.tick():
                result = {"gate": gate, "blocked": True, "reason": f"budget exhausted: {budget.exhausted_detail()}",
                          "failure_class": "budget"}
            else:
                try:
                    if gate == 4:
                        from repositories import server_hsm
                        result = server_hsm.execute(lambda: _gate4_with_proof(self.run_gate, deps, budget, state, self.plan_hash))
                    else:
                        result = self.run_gate(gate, {}, deps, budget, state)
                except Exception as error:  # model/network/tool outage, not the candidate's code
                    result = {"gate": gate, "blocked": True, "reason": str(error)[:1000],
                              "failure_class": getattr(error, 'failure_class', 'transient')}
                self.repairs.extend(state.pop("reviewer_repairs", []))
                if self.attempt_checkpoint is not None:
                    self.attempt_checkpoint.save(budget)
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
        if gate == 5 and self._soft_pass(result):
            result = {**result, "blocked": False, "reason": None, "soft_passed": True}
        if gate == 5 and self.state is not None:  # gate 4 writes its own entries into state (static_check)
            misses = (result.get("evidence") or {}).get("soft_misses") or []
            self.state["soft_misses"] = [m for m in self.state.get("soft_misses") or [] if m.get("gate") != 5] + list(misses)
        self.last_result = result
        public = _public_gate_result(result)
        if gate == 5:
            public["retried"] = retried
            if not public["blocked"] and not public["http_observed"] and public["runner"] != "eval":
                public["blocked"] = True
                public["reason"] = "change has no HTTP-observable result"
                result["failure_class"] = "plan"
            if not public["blocked"] and public["runner"] != "eval" and not (public.get("functional") or {}).get("passed"):
                public.update(blocked=True, reason="missing independent functional evidence")
                result["failure_class"] = "plan"
            suspects = [row for row in check_rows(result) if row.get("class") == checks.CHECK_SUSPECT]
            if not public["blocked"] and suspects and self._revise(suspects):
                public.update(blocked=True, reason=f"{checks.CHECK_SUSPECT}: " + " | ".join(
                    str(row.get("suspect")) for row in suspects)[:500])
                result["failure_class"] = "plan"
        self.gates.append(public)
        if public["blocked"]:
            self.kind = result.get("failure_class") or "ordinary"
            return "blocked"
        return "passed"

    def _soft_pass(self, result: dict) -> bool:
        """Gate 5 blocked only by soft misses, after one soft repair round (or no repair left): ship with the warning."""
        if not (result.get("blocked") and result.get("soft_only") and get_settings().soft_quality_checks):
            return False
        return any(entry.get("soft") for entry in self.repairs) or len(self.repairs) >= repair_cap()

    def close_attempt(self) -> None:
        if not self.open:
            return
        self.open = False
        import services.candidate as candidates

        state = self.state
        lease_lost = bool(self.should_stop and self.should_stop())
        if self.preview_capture and not lease_lost and self.request_type != "self" and _preview_eligible(self.gates, self.kind):
            private_candidate = candidates.record(state)
            if private_candidate:
                try:
                    self.preview_capture(state, private_candidate)
                except Exception:
                    pass  # optional artifact must never change verdict or prevent cleanup
        self.candidate = candidates.record(state) if _passed(self.gates, self.kind) and not lease_lost else None
        if self.candidate is None and not lease_lost and _keep_blocked(self.gates, self.kind):
            self.blocked_candidate = candidates.record(state)
        self.cleanup(state, keep_branch=self.candidate is not None or self.blocked_candidate is not None)
        if self.candidate and self.should_stop and self.should_stop():
            # The heartbeat can fail while the passing worktree is being removed.
            self.cleanup(state, keep_branch=False)
            lease_lost = True
        shutil.rmtree(self.scratch, ignore_errors=True)
        self.shots = list((state.get("evidence") or {}).get("screenshots") or [])
        self.produced = dict(state.get("produced") or {})
        self.base_sha = state.get("base_sha")
        self.lease_lost = lease_lost

    def attempt_close(self) -> str:
        self.close_attempt()
        if self.lease_lost:
            drop_screenshots(self.shots)
            raise LeaseLostError("lease revoked during gate execution")
        return "passed"

    def repair_check(self) -> str:
        last = self.gates[-1]
        if self.kind != "ordinary" or len(self.repairs) >= repair_cap():
            return "done"
        if self._package_request(last):
            return "done"
        if self._repeat_suspect(last):
            return "done"
        if REPAIR_REPLAN.get("enabled") and not self._repair_allowed(last):
            from runtime import repair_agent as agent
            if (agent.applies(last.get("repair_action")) and last.get("repair_class") != "broken_check"
                    and self._agent_available() and self._diagnose_routes(last)):
                return "agent"
            return "done"
        entry = {"gate": last["gate"], "reason": last["reason"]}
        if (self.last_result or {}).get("soft_only"):
            entry["soft"] = True
        if feedback_cap.enabled():
            from runtime import repair_class
            scope = {file for step in self.plan.get("steps") or [] for file in step.get("allowed_scope") or []}
            entry["kind"] = repair_class.classify(self.last_result, self.produced, scope, self.settled_packages, self._project())["class"]
            count = feedback_cap.prior(self.repairs, last["gate"], entry["kind"])
            if count >= feedback_cap.CAP:
                self.feedback_stop = feedback_cap.stop_fields(last["gate"], entry["kind"], count, last.get("evidence"))
                self.stop_note = f"gate {last['gate']} {entry['kind']} lặp {count} lần phản hồi"
                return "done"
        if not self.budget.tick():
            self.kind = "budget"
            return "done"
        from runtime.root_allowance import current as root_allowance
        if (get_settings().tool_loop == "1" or root_allowance() is not None) and not self.budget.spend_repair():
            return "done"
        self.repairs.append(entry)
        tag = f" [{last['repair_class']}]" if last.get("repair_class") else ""
        self.repair_reason = f"cổng {last['gate']}{tag}: {last['reason']}"
        from runtime import repair_session
        self.repair_evidence = repair_session.compact(last.get("evidence"))
        return "repair"

    def _repeat_suspect(self, last: dict) -> bool:
        """Two consecutive repairs with near-identical diffs while Gate 5 checks stay red: the check is suspect, stop repairing."""
        if not get_settings().red_check_classify or last.get("gate") != 5:
            return False
        cap = loop_limits()["similarity_max_chars"]  # similarity reads no further; keeps the journal entry small
        now = {str(item.get("file")): str(item.get("diff") or "")[:cap] for item in (self.state or {}).get("diffs") or []}
        before = self.repair_diffs
        self.repair_diffs = {"round": len(self.repairs), "diffs": now} if self.repairs else None
        wrong = [row for row in check_rows(self.last_result) if row.get("class") == checks.CANDIDATE_WRONG]
        if not wrong or not before or before["round"] != len(self.repairs) - 1:
            return False
        low = near_identical(before["diffs"], now)
        if low is None:
            return False
        why = f"hai lượt repair liên tiếp cho diff gần trùng (similarity {low:.3f} > {loop_limits()['similarity']})"
        for row in wrong:
            row.update({"class": checks.CHECK_SUSPECT, "suspect": why})
        if any(row.get("origin") != "plan" for row in wrong):
            self.stop_note = f"{checks.CHECK_SUSPECT}: {checks.SUSPECT_STOP}: {why}"
        elif not self._revise(wrong):
            self.stop_note = f"{checks.CHECK_SUSPECT}: {why}"
        return True

    def _revise(self, rows: list[dict]) -> bool:
        """Model-declared suspect checks, no revision yet: end as a plan failure so the server replans once, carrying the reason."""
        settings = get_settings()
        if (not (REPAIR_REPLAN.get("enabled") and settings.plan_checks and settings.red_check_classify)
                or revision_of(self.plan) or any(row.get("origin") != "plan" for row in rows)):
            return False
        steps = self.plan.get("steps") or []
        old = [{"file": next(((step.get("allowed_scope") or [None])[0] for step in steps
                              if row["check"] in (step.get("checks") or [])), None),
                "check": row["check"], "reason": str(row.get("suspect") or "")[:200]} for row in rows]
        if len(json.dumps(old, ensure_ascii=False)) > _REVISE_JSON:
            return False
        self.kind, self.stop_note = "plan", revise_reason(old, f"{checks.CHECK_SUSPECT}: thay check một lần qua plan revision")
        return True

    def _project(self):
        """Deps and repo roots at the base sha, read from the checkout (not the host)."""
        from runtime import network_request
        return network_request.project_at(str(self.checkout_source), self.base_sha or self.grounded)

    def _package_request(self, last: dict) -> bool:
        """Missing npm package in the gate evidence: queue an admin request and stop. False = not pending (decided, denied, eval)."""
        from runtime import network_request, repair_class
        scope = {file for step in self.plan.get("steps") or [] for file in step.get("allowed_scope") or []}
        cls = repair_class.classify(self.last_result, self.produced, scope, self.settled_packages, self._project())
        if cls["class"] != network_request.PACKAGE_REQUEST:
            return False
        queue = getattr(self.deps, "network", None)
        request = network_request.package_request(cls["package"])
        text = queue.observe(request) if queue else network_request.denied(network_request.NO_QUEUE_REASON)
        if text is None:
            self.kind, self.stop_note = network_request.FAILURE_CLASS, f"{network_request.PACKAGE_REQUEST}: {cls['package']}"
            return True
        self.settled_packages.add(cls["package"])
        last["reason"] = f"{last['reason']} | {text}"
        return False

    def _repair_allowed(self, last: dict) -> bool:
        """Classify the failure, then spend a repair only while rounds make progress inside the hard cap."""
        from runtime import repair_class
        scope = {file for step in self.plan.get("steps") or [] for file in step.get("allowed_scope") or []}
        scope |= {entry.get("test_file") for entry in self.produced.values()} - {None}
        cls = repair_class.classify(self.last_result, self.produced, scope, self.settled_packages, self._project())
        choice = None
        if progress.enabled():
            window = self._progress_window()
            window.allow_strategy(loop_guard.state_hash(str(self.last_result.get("reason")),
                                                         str(self.last_result.get("gate")), str(self.kind)))
            choice = progress.choose(cls["class"], tried=window.tried)
            if choice:
                cls["action"] = choice["action"]
                if cls["action"] != repair_class.REPAIR_CODE:
                    if cls["action"] not in window.tried:
                        window.tried.append(cls["action"])
                    window.reset()
        last["repair_class"], last["repair_action"] = cls["class"], cls["action"]
        progress.record(getattr(self.deps, "trace", None), node="repair_check",
                        failure_class=cls["class"], action=cls["action"])
        if cls["action"] == repair_class.REPLAN:
            self.kind, self.stop_note = "plan", f"plan_inconsistent: {last['reason'][:200]}"
            return False
        if cls["action"] not in (repair_class.REPAIR_CODE, progress.CHANGE_FILE):
            self.stop_note = f"{cls['class']}: {last['reason'][:200]}"
            return False
        now = repair_class.metrics(self.last_result, (self.state or {}).get("diffs") or [])
        if self.round_metrics:
            if repair_class.progressed(self.round_metrics[-1], now):
                self.progress_rounds, self.no_progress = self.progress_rounds + 1, 0
            else:
                self.no_progress += 1
        self.round_metrics.append(now)
        if progress.enabled():
            decision = self._progress_step(now)
            if decision["stagnant"]:
                detail = f"{decision['reason']} in window of {len(decision['window'])} steps"
                self.halt.update(reason=decision["reason"], node="repair_check", detail=detail)
                self.stop_note = f"{decision['reason']}: {detail}"
                return False
            self.repair_files = cls["files"]
            return True
        spec = REPAIR_REPLAN
        if self.no_progress >= int(spec.get("no_progress_rounds") or 2):
            self.stop_note = (f"stuck: {self.no_progress} consecutive repair rounds without progress "
                              f"(gate {now['gate']}, failing tests {now['fails']}, diff {now['diff'][:12]})")
            return False
        diff_text = chr(10).join(str(item.get("diff")) for item in (self.state or {}).get("diffs") or [])
        self.diff_texts.append(diff_text)
        guard = loop_limits()
        window = loop_guard.repair_window(guard["similarity_window"])
        low = loop_guard.stagnant(self.diff_texts, guard["similarity"], window, guard["similarity_max_chars"])
        if low is not None:
            self.halt.update(reason=loop_guard.REASON_STAGNATION, node="repair_check",
                             detail=f"{window} consecutive repairs with similarity {low:.3f} > {guard['similarity']}")
            self.stop_note = f"{loop_guard.REASON_STAGNATION}: {self.halt['detail']}"
            return False
        self.repair_files = cls["files"]
        return True

    def _progress_window(self):
        if self.progress_window is None:
            spec, guard = progress_limits(), loop_limits()
            self.progress_window = progress.Window(
                window=spec["window"], min_signals=spec["min_signals"], repeat_hash=spec["repeat_hash"],
                similarity=spec["similarity"], max_chars=guard["similarity_max_chars"])
        return self.progress_window

    def _progress_step(self, now: dict) -> dict:
        """Feed one repair round into the window; signals come from real change, never raw diff text."""
        diff_text = chr(10).join(str(item.get("diff")) for item in (self.state or {}).get("diffs") or [])
        text = str((self.last_result.get("evidence") or {}).get("text") or "")
        evidence = tuple(str(item)[:160] for item in (self.last_result.get("issues") or [])) or (
            hashlib.sha256(text.encode()).hexdigest()[:12],)
        return self._progress_window().step(
            fails=now["fails"], gate=now["gate"], check="fail" if self.last_result.get("blocked") else "pass",
            diff=diff_text, evidence=evidence,
            state=loop_guard.state_hash(diff_text, str(self.last_result.get("reason")),
                                        f"{self.last_result.get('gate')}:{self.kind}"))

    def _diagnose_routes(self, last: dict) -> bool:
        """Flag AI_BOARD_REPAIR_DIAGNOSE: agent only for quality failures; off keeps every ladder stop routable."""
        from runtime import repair_agent as agent
        return not get_settings().repair_diagnose or agent.routable(last.get("repair_class"))

    def _diagnosis_note(self, proposal: dict, last: dict) -> dict:
        """Flag-gated fields that make the stated diagnosis auditable per attempt."""
        if not get_settings().repair_diagnose:
            return {}
        return {"diagnosis": proposal["diagnosis"], "failure_class": last.get("repair_class"), "gate": last["gate"]}

    def _agent_available(self) -> bool:
        """Agent runs only before its attempt cap and never twice for the same failure input."""
        spec = repair_agent_limits()
        if not spec["enabled"] or self.agent_attempts >= int(spec["attempts"]):
            return False
        return "repair_agent" not in self._progress_window().tried

    def _produced_text(self) -> dict[str, str]:
        """File text the agent may edit: each produced file and its test."""
        out = {}
        for file, entry in self.produced.items():
            out[file] = str(entry.get("code") or "")
            if entry.get("test_file"):
                out[entry["test_file"]] = str(entry.get("test") or "")
        return out

    def _agent_note(self, record: dict) -> None:
        """One bounded agent record; the trace keeps the same fields as a span so the admin panel can show them."""
        self.agent_evidence.append({**record, "attempt": self.agent_attempts,
                                    **({"images": list(self.agent_images)} if self.agent_images else {})})
        trace = getattr(self.deps, "trace", None)
        if trace is None or not hasattr(trace, "add_span"):
            return
        now = int(time.time() * 1000)
        window = self.progress_window.snapshot() if self.progress_window is not None else {}
        trace.add_span("repair_agent.proposal", {
            "tizia.agent.outcome": str(record.get("outcome") or ""),
            "tizia.agent.action": str(record.get("action") or "")[:40],
            "tizia.agent.reason": str(record.get("reason") or "")[:300],
            "tizia.agent.files": [str(item)[:120] for item in record.get("files") or []][:8],
            "tizia.progress.window": [str(item)[:80] for item in window.get("window") or []][:8],
        }, start_ms=now, end_ms=now)

    def repair_agent(self) -> str:
        """One heavy-model proposal for a failure class the deterministic ladder can only hand to the admin."""
        from runtime import levels, repair_agent as agent, tool_loop
        spec = repair_agent_limits()
        self.agent_attempts += 1
        self.agent_images = []
        if self.agent_attempts > int(spec["attempts"]):
            self._agent_note({"outcome": "stopped", "reason": f"hết {spec['attempts']} lượt"})
            self.stop_note = f"repair agent: hết {spec['attempts']} lượt"
            return "blocked"
        routing = getattr(getattr(self.deps, "models", None), "routing", None)
        if routing is None:
            self._agent_note({"outcome": "stopped", "reason": "không có model routing"})
            self.stop_note = "repair agent: không có model routing"
            return "blocked"
        code = self._produced_text()
        scope = set(code)
        last = self.gates[-1]
        window = self._progress_window()
        from runtime.root_allowance import current as root_allowance
        if not self.budget.tick():
            self._agent_note({"outcome": "stopped", "reason": "budget cạn"})
            self.stop_note = "repair agent: budget cạn"
            return "blocked"
        if (get_settings().tool_loop == "1" or root_allowance() is not None) and not self.budget.spend_repair():
            self._agent_note({"outcome": "stopped", "reason": "hết lượt sửa nội dung"})
            self.stop_note = "repair agent: hết lượt sửa nội dung"
            return "blocked"
        # Ảnh là content part, không phải text: trừ IMAGE_CHARS mỗi ảnh khỏi context_chars (6000 → 4000 với 2 ảnh).
        shots = agent.images(self.last_result or last, max_images=int(spec.get("max_images") or agent.MAX_IMAGES))
        self.agent_images = [{"page": shot["page"], "width": shot["width"], "phase": shot["phase"]} for shot in shots]
        limit = max(1000, int(spec["context_chars"]) - len(shots) * agent.IMAGE_CHARS)
        extra = {"images": [{"mime": shot["mime"], "b64": shot["b64"]} for shot in shots]} if shots else None
        context = agent.context({
            "rules": (f"tools: {', '.join(sorted(agent.allowed_tools(tool_loop.MANIFEST)))}; "
                      "không shell, không mạng, không Docker; chỉ sửa file trong scope, mỗi thay đổi là một khối search/replace "
                      "khớp đúng một lần trong file."),
            "capability": ", ".join(str(item) for item in self.plan.get("capabilities") or []),
            "request": str(self.request_detail or ""),
            "spec": str(self.plan.get("goal") or ""),
            "failure": f"cổng {last['gate']}: {last.get('reason')}\n" + str((last.get("evidence") or {}).get("text") or "")
                       + (f"\nẢnh đính kèm: {len(shots)} ảnh chụp AFTER của trang "
                          + ", ".join(sorted({str(shot['page']) for shot in shots})) + "." if shots else ""),
            "tried": "\n".join(window.tried),
            "plan": json.dumps(_execution_plan(self.plan), ensure_ascii=False)[:2000],
            "target": "\n".join(sorted(code)),
        }, limit=limit)
        try:
            body = self.deps.call_model(routing.first(spec["role"])["model"], agent.prompt(context), gate=3, budget=self.budget,
                                        role=spec["role"], format="json", prompt_name="repair_agent.md",
                                        options={"temperature": spec["temperature"], "num_predict": spec["max_tokens"]},
                                        **({"extra": extra} if extra else {}))
            proposal = agent.parse(body.get("response"))
        except agent.ProposalError as error:
            self._agent_note({"outcome": "rejected", "reason": str(error)[:300]})
            self.stop_note = f"repair agent: {error}"
            return "blocked"
        except Exception as error:  # noqa: BLE001 - model/network outage: hand the failure to the admin
            self._agent_note({"outcome": "error", "reason": str(error)[:300]})
            self.stop_note = f"repair agent: {error}"
            return "blocked"
        verdict = agent.check(proposal, scope=scope, code=code, elevation=levels.approved_scope(state=self.state, plan=self.plan),
                              plan_hash=levels.fingerprint(self.plan), manifest=tool_loop.MANIFEST)
        if not verdict["ok"]:
            self._agent_note({"outcome": "denied", "reason": verdict["reason"][:300], "files": verdict["files"],
                              "action": proposal["action"], **self._diagnosis_note(proposal, last)})
            self.stop_note = f"repair agent: {verdict['reason']}"
            return "blocked"
        if proposal["action"] == progress.STOP_ADMIN:
            self._agent_note({"outcome": "stopped", "action": proposal["action"], "files": [],
                              "reason": proposal["diagnosis"][:300]})
            self.stop_note = f"repair agent: {proposal['diagnosis'][:200]}"
            return "blocked"
        self._apply_agent(proposal, verdict["files"])
        self.repairs.append({"gate": last["gate"], "reason": f"repair agent: {proposal['diagnosis'][:160]}"})
        self.repair_reason = f"cổng {last['gate']} [repair_agent]: {proposal['diagnosis'][:160]}"
        self.repair_evidence = None
        window.tried.append("repair_agent")
        steps = window.snapshot().get("window") or ()
        window.reset()
        progress.record(getattr(self.deps, "trace", None), node="repair_agent", failure_class=last.get("repair_class"),
                        action=proposal["action"], window=steps)
        self._agent_note({"outcome": "applied", "action": proposal["action"], "files": verdict["files"],
                          "reason": proposal["diagnosis"][:300], **self._diagnosis_note(proposal, last)})
        return "passed"

    def _apply_agent(self, proposal: dict, files: list[str]) -> None:
        """Write the accepted edits into the produced entries; the next gate 3 rebuilds the scratch from them."""
        from runtime import repair_agent as agent
        text = agent.apply(proposal, self._produced_text())
        for file, entry in self.produced.items():
            test = entry.get("test_file")
            touched = [path for path in (file, test) if path and path in files]
            if not touched:
                continue
            if file in files:
                entry["code"] = text[file]
            if test and test in files:
                entry["test"] = text[test]
            entry["model"] = f"{entry.get('model') or 'model'}+repair_agent"
        if isinstance(self.state, dict):
            self.state["produced"] = dict(self.produced)
        self.reuse_next = dict(self.produced)
        self.repair_files = []

    def repair(self) -> str:
        if self.checkpoint is not None:
            self.checkpoint.save_cursor({"base": self.grounded, "repairs": self.repairs, "repair_reason": self.repair_reason,
                                         "repair_evidence": self.repair_evidence, "graph": _dependency_graph(self.plan)})
        return "passed"

    def _network_fields(self) -> dict:
        report = getattr(getattr(self.deps, "network", None), "report", lambda: {})()
        return {"network_requests": report} if report.get("pending") or report.get("auto_denied") or report.get("dependencies") else {}

    def verdict(self) -> str:
        gates, kind, last = self.gates, self.kind, self.gates[-1]
        passed = _passed(gates, kind)
        if self.checkpoint is not None and kind not in ("transient", "critical", "busy", "partial", "network_request"):
            self.checkpoint.purge()  # lượt có kết luận cuối; transient/critical/busy/partial giữ lại để resume hoặc đối chiếu
        smoke = next((gate for gate in gates if gate["gate"] == 5), {})
        oracle = smoke.get("functional") or {}
        oracle_review = passed and bool(oracle.get("needs_review"))
        manifests = path_policy.manifest_changes(st.get("file") for st in (self.plan or {}).get("subtasks") or [])
        files = next((g["files"] for g in gates if g["gate"] == 4 and g.get("files")), None)
        outside = (files or {}).get("out_of_plan") or []
        revised = revision_of(self.plan) if get_settings().red_check_classify else []
        ready = ready_oracle.check(self.state) if passed and get_settings().deterministic_ready_oracle else None
        oracle_capped = bool(ready) and not ready["passed"]
        needs_review = passed and (oracle_review or bool(revised) or last["risk_level"] in ("high", "critical")
                                   or bool(manifests) or bool(outside) or oracle_capped)
        outcome = "needs_review" if needs_review else "ready_for_pr" if passed else "blocked"
        loop_stopped = (not passed and get_settings().deterministic_ready_oracle and kind == "ordinary"
                        and bool(self.halt.get("reason") or self.stop_note))
        if loop_stopped:
            outcome = "needs_review"
        if self.memory_path:
            _remember(self.memory_path, self.plan, self.ticket_id, self.repairs, None if passed else kind, last, bool(passed))
        if passed and revised:
            reason = "check đã thay một lần qua nhánh nghi check, cần người xem: " + "; ".join(
                f"{item['file']}: {item['reason']}" for item in revised)[:400]
        elif oracle_review:
            reason = ("needs_review, không có oracle hành vi, generated tests/smoke/acceptance xanh: "
                      if not oracle.get("probe_id")
                      else "oracle functional fail trong khi acceptance, generated tests và smoke xanh: ") + str(oracle.get("reason"))[:300]
        elif needs_review and oracle_capped and not (manifests or outside or last["risk_level"] in ("high", "critical")):
            reason = f"needs_review, deterministic check not passed: {ready['reason']}"
        elif needs_review:
            reason = (f"package manifest changed, human review required: {', '.join(manifests)}" if manifests
                      else f"files outside the plan, human review required: {', '.join(outside)}" if outside
                      else "risk triage requires human review")
        else:
            reason = last["reason"]
        if passed and oracle.get("check_suspect"):
            reason = f"{reason} | {checks.CHECK_SUSPECT}: " + " | ".join(str(item) for item in oracle["check_suspect"])[:400]
        if self.halt.get("reason") and not passed:
            reason = f"loop stop {self.halt['reason']}: {self.halt['detail']} | {reason}"
        elif self.stop_note and not passed and self.stop_note.startswith(CHECK_REVISE):
            reason = f"{self.stop_note} | {reason}"
        elif self.stop_note and not passed:
            reason = f"{reason} | repair stop: {self.stop_note}"
        if revised:
            self._trace_revision(revised)
        stop = None
        if not passed and (stop_report.enabled() or self.feedback_stop):
            stop = stop_report.build(outcome, reason, last["gate"], kind, [g["gate"] for g in gates])
            if self.feedback_stop:
                stop.update(error_kind=self.feedback_stop["kind"], feedback_count=self.feedback_stop["count"],
                            last_evidence=self.feedback_stop["evidence"])
            reason = stop_report.render(stop)
        self.result = {
            "outcome": outcome, "gate_reached": last["gate"], "reason": reason,
            "failure_class": None if passed else kind, "repairs": self.repairs,
            **self._network_fields(),
            **({"stop_report": stop} if stop else {}),
            **({"loop_guard": dict(self.halt)} if self.halt.get("reason") else {}),
            "candidate": self.candidate if passed else None,
            **({"files": files} if files else {}),
            **({"blocked_candidate": self.blocked_candidate} if self.blocked_candidate and not passed else {}),
            "budget_used": int(getattr(self.budget, "units", 0)), "gates": gates, "config_sha256": config_sha256(),
            **progress.verdict_fields(window=self.progress_window),
            **({"repair_agent": self.agent_evidence} if self.agent_evidence else {}),
            **({"check_revision": revised} if revised else {}),
            "screenshots": self.shots,  # chỉ cục bộ: HttpWorker lấy ra trước khi gửi verdict
            **({"base_sha": self.base_sha} if self.base_sha else {}),  # task eval từ lần hỏng chạy lại đúng sha này
        }
        return "passed"

    def _trace_revision(self, revised: list[dict]) -> None:
        trace = getattr(self.deps, "trace", None)
        if trace is None or not hasattr(trace, "add_span"):
            return
        now = int(time.time() * 1000)
        trace.add_span("plan_revision.checks", {"tizia.check_revision": json.dumps(revised, ensure_ascii=False)[:4000]},
                       start_ms=now, end_ms=now)



class _Reverification(_Execution):
    """Gates 4 to 5.5 on a kept candidate cherry-picked onto the moved base (graph entry `reverify`). It never regenerates code
    and never repairs: a failed check or a conflict is the admin's call."""

    ENTRY = "reverify"

    def __init__(self, *args, carried: dict, tip: str, **kwargs):
        super().__init__(*args, **kwargs)
        self.carried, self.tip, self.conflict = carried, tip, None
        self.memory_path = None

    def handlers(self) -> dict:
        return {**super().handlers(), "reverify_open": self.reverify_open, "repair_check": lambda: "done"}

    def reverify_open(self) -> str:
        from services import reverify

        self.shots, self.gates, self.kind, self.candidate = [], [], None, None
        try:
            owned = reverify.integrate(self.checkout_source, self.carried, self.tip, label=f"ticket-{self.ticket_id}")
        except reverify.Conflict as error:
            self.conflict = error
            self.gates, self.kind = [{"gate": 3, "blocked": True, "reason": str(error)[:500]}], "ordinary"
            return "blocked"
        self.scratch = Path(tempfile.mkdtemp(prefix="ai-board-change-"))
        execution_plan = _execution_plan(self.plan)
        state = self.state = {
            "plan": execution_plan, "scratch_repo": owned["full_checkout"], "checkout_source": str(self.checkout_source),
            "skill_id": f"ticket-{self.ticket_id}", "diffs": reverify.diffs_of(owned["commits"]), "should_stop": self.should_stop,
            "acceptance": list(execution_plan.get("acceptance") or []), **owned,
        }
        from runtime import package_broker
        state.update(package_broker.carried(owned["full_checkout"], owned["commits"],
                                            package_broker.receipts_path(get_settings().package_broker_dir)))
        if self.catalog is not None:
            state["catalog"] = self.catalog
        if self.request_detail:
            state["request_detail"] = self.request_detail
        if self.request_type:
            state["request_type"] = self.request_type
        self.open = True
        self.gates = [{"gate": 3, "blocked": False, "reason": f"ghép lên base mới {self.tip[:10]}; không sinh lại code"}]
        return "passed"

    def verdict(self) -> str:
        out = super().verdict()
        if self.conflict is not None:
            self.result["_reverify_conflict"] = {"files": self.conflict.files, "detail": str(self.conflict)}
        return out


def drop_screenshots(shots: list[dict]) -> None:
    """Xoá file ảnh tạm của cổng 5 (và thư mục chứa nếu đã rỗng)."""
    for shot in shots or []:
        if not shot.get("path"):
            continue
        path = Path(shot["path"])
        path.unlink(missing_ok=True)
        try:
            path.parent.rmdir()
        except OSError:
            pass


def _worker_checkpoint(ticket_id: int, plan: dict, plan_hash: str | None = None):
    """Checkpoint theo ticket + plan_hash server (thiếu → băm plan cục bộ): qua API server khi có lease, DATABASE_URL chỉ cho chạy ngoài worker HTTP; None khi cờ tắt."""
    from runtime import exec_graph
    if get_settings().tool_loop != "1" and not exec_graph.persistence_enabled():
        return None
    digest = str(plan_hash) if plan_hash else hashlib.sha256(
        json.dumps(plan, sort_keys=True, ensure_ascii=False, default=str).encode("utf-8")).hexdigest()
    if plan.get("held_back"):  # tập step chạy đổi sau khi gỡ chặn: checkpoint cũ không khớp chỉ số child
        digest = hashlib.sha256(f"{digest}:{plan['held_back']}".encode()).hexdigest()
    scope = f"ticket-{ticket_id}:{digest[:16]}"
    from repositories import server_hsm
    backend = server_hsm._SERVER.get()
    if backend is not None and getattr(backend, "client", None) is not None:
        from repositories.server_checkpoint import HttpCheckpoint
        lease = {key: backend.identity[key] for key in ("worker_id", "lease_token")}
        return HttpCheckpoint(backend.client, ticket_id, lease, scope)
    dsn = os.getenv("DATABASE_URL")
    if not dsn:
        return None
    from repositories.tool_steps import Checkpoint
    return Checkpoint(dsn, scope)


def _gate_proofs():
    """GateProofs của lease hiện tại (qua backend server_hsm); None khi chạy ngoài worker HTTP."""
    from repositories import server_hsm
    backend = server_hsm._SERVER.get()
    if backend is None or getattr(backend, "client", None) is None:
        return None
    from repositories.server_gate_proof import GateProofs
    ident = backend.identity
    return GateProofs(backend.client, int(backend.path.split("/")[-2]), {k: ident[k] for k in ("worker_id", "lease_token")}, ident.get("run_id"))


def _gate4_with_proof(run_gate, deps, budget, state, plan_hash):
    """Gate 4: dùng lại bằng chứng đã qua khi server xác nhận mọi pin còn khớp, ngược lại chạy thật rồi ghi bằng chứng nếu qua."""
    proofs = _gate_proofs()
    if proofs is None:
        return run_gate(4, {}, deps, budget, state)
    from repositories.server_gate_proof import gate4_pins
    from runtime import tool_loop
    pins = gate4_pins(state, plan_hash=plan_hash, model=getattr(getattr(deps, "models", None), "gate1_model", None),
                      tool_hash=tool_loop.MANIFEST.hash)
    try:
        verdict = proofs.check(4, pins)
    except Exception:
        verdict = {"reuse": False}  # verifier unreachable: verify for real
    if verdict.get("reuse"):
        from services import candidate
        patch = verdict["result"].pop("_state", {})
        state.update({key: patch[key] for key in ("ui_changed", "guard_flags", "review_required") if key in patch})
        failed = candidate.ensure(state, 4)  # the worktree is rebuilt for real; only the scan and review are reused
        return failed or verdict["result"]
    result = run_gate(4, {}, deps, budget, state)
    if not result.get("blocked"):
        try:
            proofs.record(4, pins, {**result, "_state": {key: state.get(key) for key in ("ui_changed", "guard_flags", "review_required")}})
        except Exception:
            pass  # a missing proof only costs a re-check later
    return result


def _dependency_graph(plan: dict) -> list[dict]:
    """Child i phụ thuộc depends_on của step + level (LF/107); thiếu depends_on thì giữ chuỗi cũ."""
    from runtime import schedule
    steps = _execution_plan(plan).get("subtasks") or []
    return schedule.dependency_graph(schedule.prepare(steps)) if steps else []


def execute_pre_pr(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate,
                   cleanup: Callable, policy: dict | None = None, accepted_policy_hash: str | None = None,
                   journal=None, resume=None,
                   request_detail: str | None = None, memory_path=None,
                   should_stop: Callable[[], bool] | None = None, candidate_opts: dict | None = None,
                   request_type: str | None = None, eval_tasks: list[dict] | None = None, preview_capture=None,
                   checkpoint=None, plan_hash: str | None = None, reverify: dict | None = None,
                   resume_node: str | None = None, network_decisions: dict | None = None) -> dict:
    """Run Gates 3→5.5, repairing an ordinary failure at most repair_cap() times. Return a redacted verdict.

    policy = snapshot catalog {hash, capabilities}; None only outside the HTTP worker (no catalog check).
    memory_path = lessons JSONL: Gate 3 recalls from it, repairs and final blocks are appended to it.
    should_stop() true between or during gates (lease lost) → LeaseLostError, worktree cleaned, nothing kept.
    failure_class: ordinary | transient | critical | budget | plan | eval (see store.js FAILURE_CLASSES).
    eval_tasks (self only) = phần kiểm tra của task eval cho cổng 5; biến thể thua eval → 'eval', không sửa lại."""
    # plan_hash embeds the policy hash, so a catalog change between leases already forces a fresh plan
    # server-side; this guards the in-lease race and a snapshot missing its catalog (fail closed).
    if policy is not None and (not policy.get("hash") or policy.get("hash") != accepted_policy_hash):
        reason = ("snapshot has no capability catalog" if not policy.get("hash")
                  else "capability catalog changed since the plan was accepted")
        return {"outcome": "blocked", "gate_reached": 3, "reason": reason, "failure_class": "plan",
                "repairs": [], "candidate": None, "budget_used": 0,
                "gates": [{"gate": 3, "blocked": True, "reason": reason}]}
    catalog = policy.get("capabilities") if policy is not None else None
    if network_decisions is not None and dataclasses.is_dataclass(deps):
        from runtime import network_request, package_broker
        broker = package_broker.configured(checkout_source, get_settings().package_broker_dir, get_settings().package_layer_cap)
        deps = dataclasses.replace(deps, network=network_request.Queue(
            network_decisions, broker=network_request.FetchBroker(fallback=broker)))
    extra = {"carried": reverify["candidate"], "tip": reverify["tip"]} if reverify else {}
    if not reverify:
        from repositories import plan_session
        extra["plan_session"] = plan_session.get(plan_hash)
        extra["approved"] = plan_session.get_approved(plan_hash)
    execution = (_Reverification if reverify else _Execution)(
        plan, ticket_id=ticket_id, checkout_source=checkout_source, deps=deps, budget=budget, run_gate=run_gate, cleanup=cleanup,
        catalog=catalog, request_detail=request_detail, memory_path=memory_path, should_stop=should_stop,
        candidate_opts=candidate_opts, request_type=request_type, eval_tasks=eval_tasks, preview_capture=preview_capture,
        checkpoint=checkpoint if checkpoint is not None or reverify else _worker_checkpoint(ticket_id, plan, plan_hash), plan_hash=plan_hash,
        journal_hook=journal, resume=None if reverify else resume, policy_hash=accepted_policy_hash,
        resume_node=resume_node, **extra)
    return execution.run()


def _remember(memory_path, plan: dict, ticket_id: int, repairs: list[dict], kind: str | None,
              last: dict, passed: bool) -> None:
    """Ghi bài học: mỗi lần sửa (đã sửa được hay chưa) + lý do chặn cuối nếu là lỗi của code/plan.
    Lỗi môi trường (transient) và budget không dạy gì về code nên bỏ qua."""
    from repositories import memory

    files = [(step.get("allowed_scope") or [""])[0] for step in plan.get("steps") or []]
    lessons = [{"files": files, "gate": r["gate"], "failure_class": "ordinary", "reason": r["reason"],
                "outcome": "fixed" if passed else "blocked", "ticket": ticket_id} for r in repairs]
    if kind in ("ordinary", "critical", "plan") and all(r["reason"] != last["reason"] for r in repairs):
        lessons.append({"files": files, "gate": last["gate"], "failure_class": kind, "reason": last["reason"],
                        "outcome": "blocked", "ticket": ticket_id})
    memory.record(memory_path, lessons)


def harness_change_runner(checkout_source=None, tracer=None, progress=None) -> Callable[..., dict]:
    """Accepted HTTP plan → Gates 3→5.5 on the full checkout. Return HttpWorker.change_runner."""
    Budget, Deps, run_gate = _load_harness()
    from services import candidate
    from repositories.memory import DEFAULT_PATH
    deps = _real_deps(Deps, tracer, progress)

    def run(plan: dict, ticket_id: int, max_units: int, source=None, **kwargs) -> dict:
        if kwargs.get('request_type') != 'self' and not plan.get('grounding'):
            reason = 'accepted plan predates required source grounding; admin must request a new plan'
            return {'outcome':'blocked','gate_reached':3,'reason':reason,'failure_class':'plan',
                    'repairs':[],'candidate':None,'budget_used':0,
                    'gates':[{'gate':3,'blocked':True,'reason':reason}]}
        budget = Budget.from_env()
        budget.max_units = max_units
        # Thời gian + số lần gọi model lớn theo số bước của plan (task lớn không chạm trần cố định 900 s / 40 lần).
        if get_settings().tool_loop != "1":  # tool-loop: trần parent cố định từ BUDGET_MAX_*, không scale theo plan
            steps = len(plan.get("steps") or [])
            budget.max_wall_clock_s = run_wall_clock_s(steps, local=getattr(deps, "provider", "ollama") != "api")
            budget.max_model_calls = scaled_limit("model_calls", steps)
        artifact = {}
        def capture(state, private_candidate):
            from preview import commit_archive
            artifact.update(candidate_sha=private_candidate["head_sha"], reason="oracle_unavailable",
                            archive=commit_archive(state["full_checkout"], private_candidate["head_sha"]))
        result = execute_pre_pr(plan, ticket_id=ticket_id, checkout_source=source or checkout_source or REPO_ROOT, deps=deps,
                              budget=budget, run_gate=run_gate, cleanup=candidate.cleanup,
                              memory_path=DEFAULT_PATH,
                              preview_capture=capture if get_settings().private_preview_enabled else None, **kwargs)
        if artifact: result["_preview_artifact"] = artifact
        return result
    return run
