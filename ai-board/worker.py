"""Single HTTP-only AI Board worker. Default mode is deliberately ``off``."""
from __future__ import annotations

import argparse
import dataclasses
import json
import os
import re
import shutil
import socket
import threading
import tempfile
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable


Transport = Callable[[str, str, dict, dict], dict]
REPO_ROOT = Path(__file__).resolve().parents[1]
# Worker <-> server contract, shared with server/ai-board/store.js.
CONTRACT = json.loads((REPO_ROOT / "server" / "ai-board" / "contract.json")
                      .read_text(encoding="utf-8"))
PLAN_GATES = tuple(CONTRACT["gates"]["plan"])
PRE_PR_GATES = tuple(CONTRACT["gates"]["pre_pr"])
DEFAULT_BUDGET_LIMIT = CONTRACT["default_budget_limit"]
LIMITS = CONTRACT["limits"]


def scaled_limit(kind: str, n: int) -> int:
    """Trần mỗi lượt theo số subtask n, cùng công thức với store.js scaledLimit (contract.json limits.per_run)."""
    spec = LIMITS["per_run"][kind]
    count = min(max(int(n or 0), 0), LIMITS["max_subtasks_per_run"])
    return min(spec["base"] + spec["per_subtask"] * count, spec["max"])


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


def _real_deps(Deps, tracer, progress):
    """Deps thật + tracer và progress (HttpWorker.gate_started) của worker."""
    deps = dataclasses.replace(Deps.real(), trace=tracer)
    return dataclasses.replace(deps, progress=progress) if progress else deps


def _execution_plan(plan: dict) -> dict:
    """Server plan → subtask Gate 3. Giữ nguyên mọi field của step đã duyệt (allowed_scope, tests,
    acceptance, risk, …); thêm file = scope[0], verify = mọi test + acceptance, size theo risk."""
    subtasks = []
    for step in sorted(plan.get("steps") or [], key=lambda step: step.get("order", 0)):
        scope = step.get("allowed_scope") or []
        tests = step.get("tests") or []
        if not scope or not tests:
            raise ValueError("plan step requires allowed_scope and tests")
        checks = dict.fromkeys([*tests, *(step.get("acceptance") or [])])
        subtasks.append({
            **step, "file": scope[0], "verify": "; ".join(checks),
            "size": "small" if step.get("risk") == "low" else "large",
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
        if (result.get("evidence") or {}).get("eval"):  # yêu cầu self: kết quả eval 2 sha (self_eval.py)
            out["eval"] = result["evidence"]["eval"]
    elif result["gate"] == 5.5:
        out["risk_level"] = result.get("risk_level")
        out["risk_signals"] = list(result.get("risk_signals") or [])
    return out


MAX_REPAIRS = CONTRACT["max_repairs"]  # server enforces the same bound


def _passed(gates: list[dict], kind: str | None) -> bool:
    """Qua hết: không lỗi, tới 5.5 không bị chặn, smoke qua và quan sát được qua HTTP (self: biến thể thắng eval)."""
    smoke = next((gate for gate in gates if gate["gate"] == 5), None)
    return bool(kind is None and gates and gates[-1]["gate"] == 5.5 and not gates[-1]["blocked"]
                and smoke and ((smoke["smoke_passed"] and smoke["http_observed"])
                               or (smoke["runner"] == "eval" and (smoke.get("eval") or {}).get("accepted"))))


def _attempt(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate, cleanup,
             repair_reason: str | None, catalog: dict | None,
             request_detail: str | None, memory_path,
             should_stop: Callable[[], bool] | None,
             candidate_opts: dict | None = None,
             request_type: str | None = None,
             eval_tasks: list[dict] | None = None) -> tuple[list[dict], str | None, dict | None, list[dict], str | None]:
    """One pass of Gates 3→5.5 on fresh scratch + worktree. Return (public gates, failure kind, candidate,
    ảnh chụp cổng 5 — file tạm cục bộ, base sha các cổng đã dùng | None)."""
    scratch = Path(tempfile.mkdtemp(prefix="ai-board-change-"))
    state = {
        "plan": _execution_plan(plan), "scratch_repo": str(scratch),
        "checkout_source": str(checkout_source), "skill_id": f"ticket-{ticket_id}",
    }
    if catalog is not None:
        state["catalog"] = catalog
    if request_detail:
        state["request_detail"] = request_detail
    if request_type:
        state["request_type"] = request_type  # 'self': cổng 4 nới vùng tự sửa + tính lại file khoá
    if eval_tasks is not None:
        state["eval_tasks"] = eval_tasks  # self: phần kiểm tra, chỉ cổng 5 (eval) đọc
    state.update(candidate_opts or {})  # folder (ticket 05): branch_name + branch_restore cho candidate.create
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
                if not public["blocked"] and not public["http_observed"] and public["runner"] != "eval":
                    public["blocked"] = True
                    public["reason"] = "change has no HTTP-observable result"
                    result["failure_class"] = "plan"
            gates.append(public)
            if public["blocked"]:
                kind = result.get("failure_class") or "ordinary"
                break
    finally:
        import candidate as candidates

        lease_lost = bool(should_stop and should_stop())
        candidate = candidates.record(state) if _passed(gates, kind) and not lease_lost else None
        cleanup(state, keep_branch=candidate is not None)
        if candidate and should_stop and should_stop():
            # The heartbeat can fail while the passing worktree is being removed.
            cleanup(state, keep_branch=False)
            lease_lost = True
        shutil.rmtree(scratch, ignore_errors=True)
    shots = list((state.get("evidence") or {}).get("screenshots") or [])
    if lease_lost:
        drop_screenshots(shots)
        raise LeaseLostError("lease revoked during gate execution")
    return gates, kind, candidate, shots, state.get("base_sha")


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


def execute_pre_pr(plan: dict, *, ticket_id: int, checkout_source, deps, budget, run_gate,
                   cleanup: Callable, policy: dict | None = None, accepted_policy_hash: str | None = None,
                   request_detail: str | None = None, memory_path=None,
                   should_stop: Callable[[], bool] | None = None, candidate_opts: dict | None = None,
                   request_type: str | None = None, eval_tasks: list[dict] | None = None) -> dict:
    """Run Gates 3→5.5, repairing an ordinary failure at most MAX_REPAIRS times. Return a redacted verdict.

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
    repairs: list[dict] = []
    repair_reason = None
    shots: list[dict] = []
    while True:
        if getattr(deps, "trace", None):
            deps.trace.attempt = len(repairs)
        drop_screenshots(shots)  # ảnh của lần trước lần sửa: bỏ
        gates, kind, candidate, shots, base_sha = _attempt(
            plan, ticket_id=ticket_id, checkout_source=checkout_source, deps=deps, budget=budget,
            run_gate=run_gate, cleanup=cleanup, repair_reason=repair_reason, catalog=catalog,
            request_detail=request_detail, memory_path=memory_path, should_stop=should_stop,
            candidate_opts=candidate_opts, request_type=request_type, eval_tasks=eval_tasks,
        )
        last = gates[-1]
        if kind != "ordinary" or len(repairs) >= MAX_REPAIRS:
            break
        if not budget.tick():
            kind = "budget"
            break
        repairs.append({"gate": last["gate"], "reason": last["reason"]})
        repair_reason = f"cổng {last['gate']}: {last['reason']}"
    passed = _passed(gates, kind)
    needs_review = passed and last["risk_level"] in ("high", "critical")
    outcome = "needs_review" if needs_review else "ready_for_pr" if passed else "blocked"
    if memory_path:
        _remember(memory_path, plan, ticket_id, repairs, None if passed else kind, last, bool(passed))
    reason = "risk triage requires human review" if needs_review else last["reason"]
    return {
        "outcome": outcome, "gate_reached": last["gate"], "reason": reason,
        "failure_class": None if passed else kind, "repairs": repairs,
        "candidate": candidate if passed else None,
        "budget_used": int(getattr(budget, "units", 0)), "gates": gates,
        "screenshots": shots,  # chỉ cục bộ: HttpWorker lấy ra trước khi gửi verdict
        **({"base_sha": base_sha} if base_sha else {}),  # task eval từ lần hỏng chạy lại đúng sha này
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


def take_secret(name: str) -> str:
    """Read a secret and drop it from os.environ so no subprocess (git, docker compose, smoke) inherits it."""
    return os.environ.pop(name, "") or ""


_MENTION = re.compile(r"@(?=[\w-])")


def pr_text(snapshot: dict, plan: dict, tier: str | None, verdict: dict) -> tuple[str, str, list[str]]:
    """(title, body, labels) of the candidate's PR. Request text is the requester's, untrusted: no name, no @mention."""
    request = snapshot.get("request") or {}

    def safe(text) -> str:
        return _MENTION.sub("@​", str(text or "")).strip()

    candidate = verdict["candidate"]
    gates = verdict.get("gates") or []
    risk = next((g for g in gates if g.get("gate") == 5.5), {})
    smoke = next((g for g in gates if g.get("gate") == 5), {})
    level = risk.get("risk_level") or "?"
    names = CONTRACT["gates"]["names"]
    tests = list(dict.fromkeys([*(plan.get("tests") or []),
                                *(t for step in plan.get("steps") or [] for t in step.get("tests") or [])]))
    lines = [
        "## Yêu cầu",
        f"Yêu cầu #{request.get('id')} ({request.get('domain') or '—'}): **{safe(request.get('title'))}**",
        "", safe(request.get("clarified_spec") or request.get("detail")) or "(không có mô tả)", "",
        "## Thay đổi",
        f"Mục tiêu: {safe(plan.get('goal'))}",
        *(f"- `{c['sha'][:10]}` {safe(c.get('title'))} — {', '.join(f'`{f}`' for f in c.get('files') or [])}"
          for c in candidate.get("commits") or []),
        "", "## Rủi ro",
        f"Mức rủi ro cổng 5.5: **{level}**; tier: **{tier or '—'}**."
        + (f" Tín hiệu: {', '.join(s['name'] for s in risk['risk_signals'])}." if risk.get("risk_signals") else ""),
        "", "## Kiểm thử",
        *(f"- `{safe(t)}`" for t in tests),
        (f"- Eval (self): thắng {ev['wins']}, thua {ev['losses']}, hoà {ev['ties']} trên {ev['tasks']} task kiểm tra; "
         f"{ev['gpu_s']}/{ev['gpu_s_limit']} GPU-s; gốc `{ev['base_sha'][:10]}` → biến thể `{ev['variant_sha'][:10]}`."
         if (ev := smoke.get("eval")) else
         f"- Docker smoke: {'đạt' if smoke.get('smoke_passed') else 'không đạt'}; quan sát qua HTTP: "
         f"{'có' if smoke.get('http_observed') else 'không'}."),
        "", "## Kết quả các cổng",
        *(f"- Cổng {g.get('gate')} ({names.get(str(g.get('gate')).removesuffix('.0'), '')}): "
          f"{'chặn — ' + safe(g.get('reason')) if g.get('blocked') else 'qua'}" for g in gates),
        "", "## Bằng chứng SHA",
        f"- base (`dev` lúc kiểm): `{candidate['base_sha']}`",
        f"- head (đã kiểm): `{candidate['head_sha']}`",
        "Base hoặc head đổi thì bằng chứng trên hết hiệu lực: kiểm lại bằng `python ai-board/review_pr.py <số PR>`.",
        "", "_Mở tự động bởi AI Board. Không tự merge, không tự duyệt: người review quyết định._",
    ]
    labels = ["ai-board", f"ai-board:tier-{tier or 'unknown'}"]
    if request.get("type") == "self":
        labels.append("ai-board:self")  # review_pr.py soát guard theo luật của yêu cầu self
    if level in ("high", "critical"):
        labels.append("ai-board:review-carefully")
    elif tier == "surface":
        labels.append("ai-board:daily-batch")  # surface PRs are reviewed together once a day
    return f"AI Board #{request.get('id')}: {safe(request.get('title'))}"[:120], "\n".join(lines), labels


def server_url(env=None) -> str:
    """App base URL: AI_BOARD_SERVER_URL (compose: http://tizia:8041), else this machine on PORT."""
    env = os.environ if env is None else env
    return (env.get("AI_BOARD_SERVER_URL") or f"http://127.0.0.1:{env.get('PORT') or '8041'}").rstrip("/")


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

    def post(self, path: str, payload: dict, content_type: str | None = None) -> dict:
        """content_type riêng (vd SHOTS_TYPE) → bỏ qua express.json 64kb chung, route tự parse với trần riêng."""
        headers = {"x-ai-worker-key": self.key, **({"content-type": content_type} if content_type else {})}
        return self.transport("POST", path, payload, headers)


def sync_pull_requests(client: WorkerClient, github) -> dict:
    """Ask GitHub about the PRs the server still thinks are open; report merged/closed ones (self-improve ticket 03).
    github None (no token) → skip with a log line. One PR's GitHub/HTTP error → listed in errors, retried next sync."""
    if github is None:
        print(json.dumps({"pr_sync": "skipped", "reason": "AI_BOARD_GITHUB_TOKEN not set"}))
        return {"status": "skipped"}
    prs = client.post("/api/ai-board/worker/pull-requests/open", {})["pull_requests"]
    out = {"status": "synced", "open": len(prs), "merged": [], "closed": [], "errors": []}
    for pr in prs:
        number = pr["number"]
        try:
            info = github.pull(number)
            if info.get("state") != "closed":
                continue
            state = "merged" if info.get("merged_at") else "closed"
            client.post("/api/ai-board/worker/pull-requests/state", {
                "number": number, "state": state, "closed_at": info.get("merged_at") or info.get("closed_at"),
                "files": github.pull_files(number)})
        except (OSError, ValueError, KeyError) as error:  # urllib HTTPError/URLError are OSError
            print(json.dumps({"pr_sync_error": number, "error": str(error)[:200]}))
            out["errors"].append(number)
            continue
        out[state].append(number)
    return out


def _local_night(now_ms: int, window: dict) -> tuple[str, bool]:
    """Ngày (YYYY-MM-DD) và trong cửa sổ giờ (window: {start,end,tz} của contract.json) hay không, tại now_ms."""
    from datetime import datetime
    from zoneinfo import ZoneInfo

    dt = datetime.fromtimestamp(now_ms / 1000, ZoneInfo(window["tz"]))
    return dt.strftime("%Y-%m-%d"), window["start"] <= dt.strftime("%H:%M") < window["end"]


def run_self_improve_night(client: WorkerClient, deps, *, clock: Callable[[], int], github=None) -> dict:
    """MỘT BƯỚC của vòng tự cải thiện đêm (self-improve ticket 07): đồng bộ PR, hoặc 1 lần chẩn đoán. Gọi lại
    mỗi lượt poll khi worker rảnh việc thật (idle/gpu_paused) — chính cách gọi này là cách nhường việc thật:
    lượt poll sau luôn thử claim thật trước (yield_to_chat hiện có) rồi mới gọi lại đây, nên tối đa 1 bước
    trôi qua trước khi có thể nhường; không cần seam nào khác để "dừng giữa chừng".
    clock() → giờ hệ thống hiện tại (ms) — seam duy nhất được thêm, để test giả lập đêm/ngoài đêm.
    Ngoài cửa sổ giờ hoặc server từ chối (công tắc/nhãn/PR mở/tự dừng) → không làm gì.
    Trả {status: outside_window|not_run|progress|done, ...}.
    ponytail: đêm dở dang đúng lúc hết cửa sổ giờ không tự đóng (status vẫn 'running') — không chặn đêm sau
    (khác ngày), chỉ còn sai ở cột trạng thái trên tab admin; đóng hẳn khi cần xem đúng, chưa cấp thiết."""
    import diagnose
    from budget import Budget

    limits = LIMITS["self_improve"]
    night, inside = _local_night(clock(), limits["window"])
    if not inside:
        return {"status": "outside_window"}
    started = client.post("/api/ai-board/worker/self-improve/night", {"night": night})
    if not started.get("run"):
        return {"status": "not_run", "reason": started.get("reason")}
    report = lambda body: client.post("/api/ai-board/worker/self-improve/night/report", {"night": night, **body})
    state = started["night"]
    if state.get("pr_sync") is None:
        report({"pr_sync": sync_pull_requests(client, github)})
        return {"status": "progress", "step": "pr_sync"}
    rows = state.get("variants") or []
    created = [v for v in rows if v.get("status") != "dropped"]  # "biến thể" = yêu cầu self đã tạo được
    spent = state.get("gpu_s_propose") or 0
    remaining = limits["night_gpu_s"]["propose"] - spent
    if len(created) >= limits["max_variants_per_night"] or remaining <= 0:
        report({"finished": "done"})
        return {"status": "done", "variants": len(created)}
    # Cụm đã thành 1 dòng đêm nay (kể cả bỏ cụm) tự loại khỏi lần chẩn đoán tiếp theo trong đêm.
    skip = set(started.get("skip_clusters") or []) | {v["cluster"]["key"] for v in rows if v.get("cluster")}
    budget = Budget(max_units=remaining)
    result = diagnose.diagnose_to_self_request(client, deps, now_ms=clock(), budget=budget, skip=frozenset(skip))
    spent += budget.units
    if result["status"] == "dropped" and result.get("cluster"):
        # Chẩn đoán sai khuôn / file ngoài vùng sau khi thử lại: bỏ cụm này (đếm vào 3 đêm liền thất bại),
        # bước sau (poll tiếp) thử cụm khác — không tính vào 3 biến thể (chưa tạo yêu cầu self).
        report({"variant": {"cluster": result["cluster"], "diagnosis": None, "request_id": None,
                            "root_ticket_id": None, "status": "dropped", "reason": result.get("reason")},
               "gpu_s_propose": spent})
        return {"status": "progress", "step": "dropped", "variants": len(created)}
    if result["status"] != "created":
        report({"finished": "done", "gpu_s_propose": spent})
        return {"status": "done", "variants": len(created)}  # không còn cụm: hết việc cho đêm nay
    report({"variant": {"cluster": result["cluster"], "diagnosis": result["diagnosis"],
                        "request_id": result["request"]["request_id"],
                        "root_ticket_id": result["request"]["root_ticket_id"], "status": "waiting"},
           "gpu_s_propose": spent})
    return {"status": "progress", "step": "created", "variants": len(created) + 1}


# Khớp server/ai-board/drafts.js: PNG, ≤ 8 ảnh, mỗi ảnh ≤ 2 MB.
SHOTS_TYPE = "application/vnd.tizia.screenshots+json"
MAX_SHOT_BYTES = 2 * 1024 * 1024
MAX_SHOTS = 8


def screenshot_payload(shots: list[dict]) -> list[dict]:
    """Ảnh cổng 5 → body upload (base64). Bỏ ảnh quá trần/không đọc được; không bao giờ raise."""
    import base64

    images = []
    for shot in shots[:MAX_SHOTS]:
        try:
            data = Path(shot["path"]).read_bytes()
        except (OSError, KeyError, TypeError):
            continue
        if not data or len(data) > MAX_SHOT_BYTES:
            continue
        images.append({"phase": shot.get("phase"), "page": shot.get("page"), "width": shot.get("width"),
                       "png_base64": base64.b64encode(data).decode("ascii")})
    return images


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
    folder_base_ref: str = "HEAD"  # nhánh folder gộp ref này mỗi lượt: clone riêng → origin/<base>, checkout dev → HEAD
    _report_gate: Callable[[float], None] | None = dataclasses.field(default=None, init=False, repr=False)

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

        claim = self.client.post("/api/ai-board/worker/claim", {
            "worker_id": self.worker_id, "version": self.version, "mode": self.mode,
            "intent": "plan" if self.planner else "precheck",
        })
        ticket = claim.get("ticket")
        if not ticket:
            return {"status": "idle"}
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
            if snapshot.get("folder") and self.planner and self.candidates and trigger != "rollback":
                import candidate
                folder = snapshot["folder"]
                branch = folder.get("branch") or candidate.folder_branch(folder["slug"], folder.get("cycle") or 1)
                try:
                    path, tip = candidate.folder_source(self.candidates.repo, branch, self.folder_base_ref)
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
            return self._run_leased(ticket_id, lease, prefix, snapshot, run, trigger, folder_src)
        finally:
            self._report_gate = None
            if folder_src:
                import candidate
                candidate.drop_source(self.candidates.repo, folder_src["path"])
            if self.tracer:
                self.tracer.flush()

    def _open_pr(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict, plan: dict,
                 tier: str | None, verdict: dict) -> str | None:
        """Push the verified candidate and open its one PR into dev, then report it. Return why not, else None.
        GitHub/git trouble is not the candidate's fault: the verdict stands, the admin sees the reason."""
        existing = snapshot.get("pull_request")
        if existing:
            return f"root already has PR #{existing.get('number')}; not opening another"
        title, body, labels = pr_text(snapshot, plan, tier, verdict)
        try:
            pr = self._with_heartbeat(lambda _lost: self.candidates.publish(
                verdict["candidate"], title=title, body=body, labels=labels), ticket_id, lease)
            self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/pull-request", {
                **lease, "run_id": run["id"], "pull_request": pr, "idempotency_key": f"{prefix}:pr",
            })
        except LeaseLostError:
            raise
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
                lambda _lost: self.candidates.rollback(candidate, ticket_id,
                                                       pull_request=snapshot.get("pull_request")), ticket_id, lease)
        except LeaseLostError:
            raise
        except Exception as error:  # noqa: BLE001 — git/IO: báo server, không để root kẹt 'running'
            result = {"outcome": "failed", "detail": str(error)[:1000]}
        done = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/rollback", {
            **lease, "run_id": run["id"], **result,
        })
        return {"status": done["status"], "ticket_id": ticket_id, "run_id": run["id"], "rollback": result["outcome"]}

    def _run_leased(self, ticket_id: int, lease: dict, prefix: str, snapshot: dict, run: dict,
                    trigger: str, folder_src: dict | None = None) -> dict:
        # Folder (ticket 05): planner + cổng đọc từ đỉnh nhánh chu kỳ; candidate commit nối tiếp chính nhánh đó.
        plan_kwargs = {"source": folder_src["path"]} if folder_src else {}
        brief = (snapshot.get("folder") or {}).get("brief") or {}
        run_kwargs = {"source": folder_src["path"], "candidate_opts": {
            "branch_name": folder_src["branch"], "branch_restore": folder_src["tip"],
            "folder_brief": brief.get("text")}} if folder_src else {}
        if trigger == "rollback":
            return self._rollback(ticket_id, lease, snapshot, run)
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
            # Chỉ yêu cầu self mới gửi loại (change runner cũ không nhận tham số này).
            type_kwargs = {"request_type": "self"} if (snapshot.get("request") or {}).get("type") == "self" else {}
            # Skill cổng 1 của lượt lập plan này; lượt 'execute' (plan đã duyệt từ lease trước) không biết skill.
            skill = None if executing else getattr(self.planner, "last_skill", None)
            if self.change_runner and planned["status"] == "planned":
                if type_kwargs:  # phần kiểm tra chỉ lấy sau khi đã có plan: người lập plan không bao giờ thấy
                    type_kwargs["eval_tasks"] = self.client.post("/api/ai-board/worker/eval-tasks", {}).get("test") or []
                limit = int((snapshot.get("ticket") or {}).get("budget_limit") or DEFAULT_BUDGET_LIMIT)
                result = self._with_heartbeat(
                    lambda lost: self.change_runner(
                        plan, ticket_id, max(limit - budget_used, 0),  # giây GPU còn lại của lượt (trừ phần lập plan)
                        # {} when missing: fails the hash check closed instead of skipping the catalog.
                        policy=snapshot.get("capability_policy") or {},
                        accepted_policy_hash=planned.get("capability_policy_hash"),
                        request_detail=(snapshot.get("request") or {}).get("detail"),
                        should_stop=lost, **run_kwargs, **type_kwargs,
                    ), ticket_id, lease,
                    on_lease_lost=lambda lost_result: self.candidates.discard((lost_result or {}).get("candidate")),
                )
                shots = (result.pop("screenshots", None) if isinstance(result, dict) else None) or []
                try:
                    # Ảnh trước verdict: chuông "xem ảnh" của verdict đạt mở ra thread đã có ảnh.
                    if shots and result.get("outcome") in ("ready_for_pr", "needs_review"):
                        self._upload_screenshots(ticket_id, lease, run, shots)
                finally:
                    drop_screenshots(shots)
                try:
                    verdict = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/verdict", {
                        **lease, "run_id": run["id"], "verdict": {**result, "skill": skill} if skill else result,
                        "idempotency_key": f"{prefix}:verdict",
                    })["verdict"]
                except Exception as error:
                    if _is_stale_lease(error):
                        self.candidates.discard(result.get("candidate"))
                    raise
            pr_problem = None
            if self.open_prs and verdict and verdict.get("outcome") in ("ready_for_pr", "needs_review"):
                pr_problem = self._open_pr(ticket_id, lease, prefix, snapshot, run, plan, planned.get("tier"), verdict)
            self._release(ticket_id, {
                **lease, "outcome": "planned", "idempotency_key": f"{prefix}:release",
                **({"internal_detail": pr_problem} if pr_problem else {}),
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

    source = None

    def __init__(self, tracer=None, progress=None, source=None):
        Budget, Deps, run_gate = _load_harness()
        self.Budget = Budget
        self.deps = _real_deps(Deps, tracer, progress)
        self.run_gate = run_gate
        self.source = source  # gate 1 reads repo context here (worker clone), else the harness repo

    @staticmethod
    def _request(snapshot: dict) -> dict:
        request = snapshot["request"]
        return {
            "id": f"req-{request['id']}", "db_id": request["id"],
            "from": request.get("student"), "domain": request.get("domain"),
            "type": request.get("type"), "subject": request.get("title"),
            # Spec đã làm rõ với người gửi (ticket 06) thay mô tả gốc; không có thì như cũ.
            "body": request.get("clarified_spec") or request.get("detail") or request.get("title"),
            "thread": snapshot.get("thread") or [], "votes": request.get("votes", 1),
            "complexity_by_server": True,
            # Folder (ticket 06): L1 brief, L3 yêu cầu gần nhất, L2 file sở hữu — server tính, có trần.
            **({"folder_brief": brief["text"], "folder_recent": brief["recent"], "owned_files": brief["owned_files"]}
               if (brief := (snapshot.get("folder") or {}).get("brief")) else {}),
        }

    @staticmethod
    def _canonical(request: dict, old: dict, signals: list[str] | None = None) -> dict:
        """Plan cổng 1 → schema D0 của server. Có tín hiệu phức tạp → risk high → tier protected (admin cho phép).
        Yêu cầu self (board tự sửa): luôn self.config — server chỉ cấp năng lực này cho self, tier protected."""
        old_caps = (["self.config"] if request.get("type") == "self"
                    else list(dict.fromkeys(old.get("capabilities") or [])))
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

    last_skill = None  # skill cổng 1 của lần gọi gần nhất: worker gửi kèm verdict cùng lease

    def __call__(self, snapshot: dict, source=None) -> tuple[dict, int]:
        self.last_skill = None
        request = self._request(snapshot)
        if request.get("folder_brief"):
            # Lách guard qua nhiều lượt nhỏ (ticket 06): soát lexicon trên cả bản mô tả gộp của folder.
            from gates import guard
            hits = {label: guard.LEXICON["labels"][label]["intake"]
                    for label in guard.topic_hits(f"{request['folder_brief']}\n{request.get('folder_recent') or ''}")}
            stop = sorted(label for label, verdict in hits.items() if verdict in ("reject", "critical"))
            if stop:
                raise PlanBlockedError("folder brief crosses a hard rule", {
                    "gate": 1, "reason": f"folder_brief: {', '.join(stop)}", "signals": stop, "plan": None,
                    "public_message": "Chức năng này cần quản trị viên xem lại trước khi làm tiếp."})
        budget = self.Budget.from_env()
        budget.max_model_calls = min(budget.max_model_calls, 5)
        ticket = snapshot.get("ticket") or {}
        budget.max_units = int(ticket.get("budget_limit") or DEFAULT_BUDGET_LIMIT)  # trần mỗi lượt, không trừ các lượt trước
        source = source or self.source  # folder (ticket 05): đỉnh nhánh chu kỳ thay cho checkout chung
        state = {"checkout_source": str(source)} if source else {}
        for gate in PLAN_GATES:
            result = self.run_gate(gate, request, self.deps, budget, state)
            if gate == 1:
                self.last_skill = result.get("skill")
            if result.get("blocked"):
                raise PlanBlockedError(f"gate {gate} blocked: {result.get('reason')}", {
                    "gate": gate, "reason": result.get("reason"), "signals": list(result.get("signals") or []),
                    "public_message": result.get("public_message"),
                    "plan": json.dumps(state.get("plan"), ensure_ascii=False)[:2000],
                })
        signals = list(state.get("complexity_signals") or [])
        if snapshot.get("clarification_incomplete"):
            signals.append("requester_still_vague")  # 5 câu hỏi vẫn mơ hồ → risk high → admin cho phép plan
        return self._canonical(request, state["plan"], signals), int(budget.units)


def harness_change_runner(checkout_source=None, tracer=None, progress=None) -> Callable[..., dict]:
    """Accepted HTTP plan → Gates 3→5.5 on the full checkout. Return HttpWorker.change_runner."""
    Budget, Deps, run_gate = _load_harness()
    import candidate
    from memory import DEFAULT_PATH
    deps = _real_deps(Deps, tracer, progress)

    def run(plan: dict, ticket_id: int, max_units: int, source=None, **kwargs) -> dict:
        budget = Budget.from_env()
        budget.max_units = max_units
        # Thời gian + số lần gọi model lớn theo số bước của plan (task lớn không chạm trần cố định 900 s / 40 lần).
        steps = len(plan.get("steps") or [])
        budget.max_wall_clock_s = float(scaled_limit("wall_clock_s", steps))
        budget.max_model_calls = scaled_limit("model_calls", steps)
        return execute_pre_pr(plan, ticket_id=ticket_id, checkout_source=source or checkout_source or REPO_ROOT, deps=deps,
                              budget=budget, run_gate=run_gate, cleanup=candidate.cleanup,
                              memory_path=DEFAULT_PATH, **kwargs)
    return run


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Tizia AI Board HTTP worker")
    parser.add_argument("--mode", choices=("off", "shadow", "active"), default=os.getenv("AI_BOARD_WORKER_MODE", "off"))
    parser.add_argument("--once", action="store_true", help="poll once, then exit")
    parser.add_argument("--plan", action="store_true", help="run gates 1, 2 and 2.5, then submit child-ticket plan")
    parser.add_argument("--execute", action="store_true", help="run the accepted plan through gates 3, 4, 5 and 5.5")
    parser.add_argument("--poll-seconds", type=float, default=5.0)
    parser.add_argument("--sync-prs", action="store_true", help="report merged/closed ai-board PRs from GitHub, then exit")
    parser.add_argument("--diagnose", action="store_true",
                        help="turn the top learning-part failure cluster into at most one self request, then exit")
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
    if (args.mode != "off" or args.sync_prs or args.diagnose) and len(key) < 24:
        parser.error("AI_BOARD_WORKER_KEY must be at least 24 characters")
    _, Deps, _ = _load_harness()
    if args.diagnose:  # self-improve ticket 06: chạy tay; vòng đêm (ticket 07) gọi cùng hàm
        import diagnose
        import meter
        deps = _real_deps(Deps, meter.Tracer(diagnose.TRACES_PATH), None)
        print(json.dumps(diagnose.diagnose_to_self_request(WorkerClient(base_url, key), deps,
                                                           now_ms=int(time.time() * 1000)), ensure_ascii=False))
        return 0
    if args.sync_prs:
        import candidate
        github = (candidate.GitHub(os.getenv("AI_BOARD_GITHUB_REPO", "Lampx83/Tizia"), github_token)
                  if github_token else None)
        print(json.dumps(sync_pull_requests(WorkerClient(base_url, key), github), ensure_ascii=False))
        return 0
    import meter
    from memory import DEFAULT_PATH
    tracer = meter.Tracer(Path(DEFAULT_PATH).with_name("traces.jsonl"))
    worker = HttpWorker(
        WorkerClient(base_url, key),
        worker_id=default_worker_id(),
        version=os.getenv("AI_BOARD_WORKER_VERSION", "d0"),
        mode=args.mode,
        tracer=tracer,
    )
    # Cổng báo tiến độ qua worker.gate_started → event gate_started của run đang giữ lease.
    # AI_BOARD_REPO_DIR = the worker's own clone (prod container): reset to origin/<PR_BASE_BRANCH> before
    # every ticket and used as the candidate base. Unset = this checkout, never reset (a dev's working tree).
    repo_dir = os.getenv("AI_BOARD_REPO_DIR")
    repo = Path(repo_dir) if repo_dir else REPO_ROOT
    if repo_dir:
        import candidate
        base = os.getenv("PR_BASE_BRANCH", "dev")
        worker.sync = lambda: candidate.sync(repo, base)
        worker.folder_base_ref = f"origin/{base}"
    import memory
    print(json.dumps({"memory_pruned": memory.prune(DEFAULT_PATH, source=repo)}))
    if args.plan or args.execute:
        worker.planner = HarnessPlanner(tracer, progress=worker.gate_started, source=repo if repo_dir else None)
    if args.execute:
        import candidate
        worker.change_runner = harness_change_runner(checkout_source=repo, tracer=tracer,
                                                     progress=worker.gate_started)
        github = (candidate.GitHub(os.getenv("AI_BOARD_GITHUB_REPO", "Lampx83/Tizia"), github_token)
                  if github_token else None)
        worker.candidates = candidate.Candidates(repo, github=github)
        worker.open_prs = github is not None  # no token: verdicts stop at ready_for_pr, as before
    # Vòng tự cải thiện đêm (ticket 07): chỉ worker có thể execute mới đề xuất được biến thể. Việc thật
    # luôn đi trước — chỉ thử đêm khi lượt claim vừa rồi rảnh (idle/gpu_paused), never khi đang giữ ticket.
    night_deps = None
    if args.execute:
        import diagnose as _diagnose
        night_deps = _real_deps(Deps, meter.Tracer(_diagnose.TRACES_PATH), worker.gate_started)
    while True:
        try:
            result = worker.run_once()
        except PlanBlockedError as error:  # an expected outcome, not a crash: show why
            result = {"status": "plan_blocked", **error.detail}
        print(json.dumps(result, ensure_ascii=False))
        # 1 bước/tick, chỉ khi lượt claim vừa rồi rảnh việc thật: lượt poll tiếp theo tự ưu tiên claim thật
        # trước (yield_to_chat hiện có), nên đêm không bao giờ giữ worker quá 1 bước trước khi nhường.
        if night_deps is not None and result.get("status") in ("idle", "gpu_paused"):
            night_result = run_self_improve_night(worker.client, night_deps, clock=lambda: int(time.time() * 1000),
                                                   github=worker.candidates.github if worker.candidates else None)
            if night_result["status"] not in ("outside_window", "not_run"):
                print(json.dumps({"self_improve_night": night_result}, ensure_ascii=False))
        if args.once or args.mode == "off":
            return 0
        time.sleep(max(args.poll_seconds, 1.0))


if __name__ == "__main__":
    raise SystemExit(main())
