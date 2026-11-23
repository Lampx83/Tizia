"""AI Board worker: plan side (gates 1, 2, 2.5 through HarnessPlanner, plan repair, elevation, model preflight)."""
from __future__ import annotations

import dataclasses
import json
import os
import posixpath
import re
import time
import urllib.error
from typing import Callable

from worker_client import CONTRACT, DEFAULT_BUDGET_LIMIT, LIMITS, PLAN_GATES
from worker_execution import CHECK_REVISE, _load_harness, _real_deps, node_span
import path_policy  # noqa: E402
from runtime import coverage
from runtime.loops import objection_repeat  # noqa: E402
from settings import get_settings  # noqa: E402


class PlanBlockedError(RuntimeError):
    """Gate 1/2/2.5 stop. `detail` = JSON-safe {gate, reason, signals, plan} for the plan_blocked event."""

    def __init__(self, message: str, detail: dict):
        super().__init__(message)
        self.detail = detail


def _scannable_decisions(text: str | None) -> str:
    """Decision records minus blocked/cancelled entries (a stopped request's title/spec must not re-trigger the folder guard)."""
    keep, skipping = [], False
    for line in (text or "").splitlines():
        if line.startswith("- "):
            skipping = bool(re.search(r" → (blocked|cancelled)\b", line))
        if not skipping:
            keep.append(line)
    return "\n".join(keep)


def _elevation_payload(result: dict | None) -> dict | None:
    """Payload elevation_required của một gate bị chặn; None khi gate chặn vì lý do khác."""
    if not isinstance(result, dict):
        return None
    payload = result.get("elevation_required") or result.get("elevation")
    if isinstance(payload, dict) and (payload or result.get("outcome") == "elevation_required"):
        return payload
    return None


def _elevation_plan_summary(plan) -> dict | None:
    """Các bước kế hoạch gửi kèm yêu cầu nâng mức: admin thấy 'duyệt cái gì', không chỉ path."""
    if not isinstance(plan, dict):
        return None
    steps = []
    for index, step in enumerate((plan.get("steps") or [])[:20], start=1):
        if not isinstance(step, dict):
            continue
        paths = [str(path)[:200] for path in (step.get("allowed_scope") or [])]
        if isinstance(step.get("file"), str):
            paths.append(step["file"][:200])
        steps.append({
            "order": step.get("order") or index,
            "title": str(step.get("title") or "")[:160],
            "paths": list(dict.fromkeys(paths))[:8],
            "capability": step.get("capability") or None,
        })
    if not steps:
        return None
    return {"goal": str(plan.get("goal") or "")[:300], "steps": steps}


def _plan_repairable(stopped: dict) -> bool:
    """Lỗi plan do model sinh sai (không phải nguồn/kỹ năng): đáng một lượt lập lại."""
    gate = float(stopped.get("gate") or 0)
    reason = str((stopped.get("result") or {}).get("reason") or "")
    if gate == 1 and reason.startswith("plan không hợp lệ"):
        return True
    return gate == 2.5 and (reason == "plan_ungrounded" or reason.startswith("plan_unfit"))


def _plan_pins(source) -> dict:
    """Pins a blocked plan attempt ran under; the server warns when a rerun would repeat them (LF/143)."""
    from runtime import exec_graph, limits
    from repositories import code_index
    try:
        base = code_index.git(source, "rev-parse", "HEAD").decode("utf-8", "replace").strip()
    except OSError:
        base = None
    return {"base": base or None, "config": limits.config_sha256(), "graph": exec_graph.digest()}


def _objection_evidence(history: list[dict]) -> dict:
    """Bằng chứng cả hai lượt phản đối cho admin; repeat_objection khi các lượt gần nhất cùng chữ ký."""
    threshold = int((CONTRACT.get("evidence_gates") or {}).get("repeat_objection_threshold", 2))
    return {"objection_history": [objection_repeat.describe(item) for item in history],
            "repeat_objection": objection_repeat.repeated(history, threshold)}


def _uncovered_conditions(request: dict, plan: dict, deps, budget) -> list[str]:
    """Điều kiện của clarified_spec chưa có subtask verify chạy được; model chỉ khi không có mục tất định (LF/128)."""
    def call_model(prompt: str) -> str:
        if not hasattr(deps, "call_model"):  # deps không có model (test HTTP worker): không kiểm điều kiện
            return ""
        body = deps.call_model(deps.models.gate1_model, prompt, gate=1, budget=budget, format=coverage.SCHEMA,
                               prompt_name="spec_conditions.md")
        return str(body.get("response") or "")

    items, source = coverage.spec_conditions(str(request.get("clarified_spec") or ""), call_model)
    trace = getattr(deps, "trace", None)
    if trace:
        trace.note("knows", "spec conditions", source, {"source": source, "items": len(items)})
    return coverage.uncovered_items(items, plan)


def _waived(state: dict) -> set[str]:
    """model_first: requested items the planner chose to skip, each with evidence in its ledger."""
    from gates import decision_ledger
    return decision_ledger.decided(state.get("ledger"), "skip_alternative") if get_settings().model_first else set()


def _has_runnable_verify(plan: dict) -> bool:
    return coverage.has_runnable(plan)


def _non_runnable_layered(plan: dict) -> list[str]:
    return coverage.non_runnable_layered(plan)


def _plan_repair_note(reason: str, files: list[str] | None = None,
                      rejected_files: list[str] | None = None) -> str:
    """Lời nhắc cho lượt sửa plan: nêu lỗi, file trùng/file cũ và các luật cứng."""
    dupes = [f for f in (files or []) if f]
    old = [f for f in (rejected_files or []) if f and f not in dupes]
    banned = "\n[CẤM TUYỆT ĐỐI]\n- KHÔNG được giao một file cho quá 1 subtask."
    if dupes:
        banned += "\n- File bị trùng: " + ", ".join(dupes)
    if old:
        banned += "\n- KHÔNG dùng lại file của plan bị từ chối: " + ", ".join(old)
    banned += ("\n- Mọi file, hạng mục người dùng nhắc tên phải có subtask riêng; test nêu tên chỉ cần nằm trong acceptance/verify (không tạo subtask cho file test); thiếu thì plan bị từ chối."
               "\n- Yêu cầu cần trang mới thì TẠO FILE MỚI, không sửa trang có sẵn."
               "\n- Trang mới có danh sách dữ liệu + tương tác (tìm kiếm, mở/đóng): phải có 2 subtask — module "
               "public/js/features/<slug>/<name>.js chứa dữ liệu và logic, rồi trang public/<slug>.html nạp module đó (depends_on)."
               "\n- Mọi plan có `layer` phải có verify là LỆNH CHẠY ĐƯỢC (node --test <file>, curl <url>, pytest, python <file>, bash <script>)."
               "\n- Plan trước đã sai vì vi phạm các điều trên; lặp lại thì hệ thống dừng ngay.")
    return (f"Kế hoạch trước bị từ chối: {reason}.{banned}\n"
            "Lập lại kế hoạch: trước khi viết, liệt kê [subtask | file] và kiểm tra không file nào lặp; "
            "acceptance/verify của plan nhiều bước phải là LỆNH CHẠY ĐƯỢC "
            "(node --test <file>, curl <url>, pytest, python <file>, bash <script>).")


def _duplicate_files(reason: str) -> list[str]:
    """Tên file nêu trong lỗi 'N subtask cùng sửa <file>' (rỗng nếu lỗi khác)."""
    match = re.search(r"cùng sửa (\S+?)(?:\s+[—-]|$)", str(reason or ""))
    return [match.group(1)] if match else []


def _merge_same_file(subtasks: list[dict]) -> list[dict]:
    """Gộp subtask cùng file (một file/subtask) trước khi validate; xem runtime/plan_merge.py."""
    from runtime.plan_merge import merge_same_file
    return merge_same_file(subtasks)


def _checks_by_file(plan: dict) -> dict[str, list[dict]]:
    """Plan checks per normalised file, read before the same-file merge (it keeps only the first subtask's)."""
    from gate5 import checks
    out: dict[str, list[dict]] = {}
    for subtask in plan.get("subtasks") or []:
        if isinstance(subtask, dict) and subtask.get("file"):
            items = out.setdefault(posixpath.normpath(str(subtask["file"]).replace("\\", "/")), [])
            items += [item for item in subtask.get("checks") or [] if item not in items]
    return {file: items[:checks.MAX_CHECKS] for file, items in out.items() if items}


def revision_request(snapshot: dict) -> list[dict] | None:
    """Suspect checks the last verdict asked to replace ({file, check, reason}); None without the marker or with a flag off."""
    settings = get_settings()
    if not (settings.plan_checks and settings.red_check_classify):
        return None
    reason = str((snapshot.get("ticket") or {}).get("internal_reason") or "")
    at = reason.find(CHECK_REVISE)
    if at < 0:
        return None
    try:
        old, _ = json.JSONDecoder().raw_decode(reason[at + len(CHECK_REVISE):].lstrip())
    except ValueError:
        return None
    old = [item for item in old if isinstance(item, dict) and isinstance(item.get("check"), dict)] if isinstance(old, list) else []
    return old or None


def revision_note(old: list[dict]) -> str:
    """Planner hint: which checks Gate 5 judged suspect and the rule the new ones must meet."""
    lines = "\n".join(f"- {item.get('file')}: {json.dumps(item['check'], ensure_ascii=False)} — {item.get('reason')}" for item in old)
    return ("[THAY CHECK NGHI SAI — chỉ một lần]\nGate 5 xếp các check sau vào nhánh nghi check (thay đổi có vẻ đã đúng, check sai):\n"
            f"{lines}\nKhai check mới cho bước đó: phải đỏ trên base và xanh khi thay đổi làm đúng yêu cầu. Không lặp lại check cũ.")


def stamp_revision(plan: dict, old: list[dict]) -> None:
    """Record the replaced checks on the step that owned them (else the first step); plan_hash then pins the record."""
    steps = [step for step in plan["steps"] if step["allowed_scope"][0] in {item.get("file") for item in old}] or plan["steps"][:1]
    for step in steps:
        mine = [item for item in old if item.get("file") == step["allowed_scope"][0]] or old
        step["check_revision"] = {"reason": "; ".join(dict.fromkeys(str(item.get("reason") or "") for item in mine))[:500],
                                  "old": [item["check"] for item in mine][:8]}


def _plan_with_repair(run_plan: Callable[[dict], dict], request: dict, state: dict, budget, stopped: dict | None) -> tuple[dict | None, list[dict]]:
    """Lượt lập lại plan sau lỗi sai luật (LF/106): trả (cổng chặn cuối, các lượt chặn theo thứ tự)."""
    history = [dict(stopped)] if stopped else []
    if not (stopped and _plan_repairable(stopped)):
        return stopped, history
    # Model sinh plan sai luật: một lượt lập lại với lỗi nêu riêng cho planner, không nhét vào thread
    # (validator cổng 2.5 cũng đọc thread và sẽ coi file đó "đã bị từ chối"), sampling thoáng hơn.
    reason = str(stopped["result"].get("reason") or "")
    rejected = [str(st.get("file") or "") for st in ((state.get("plan") or {}).get("subtasks") or [])
                if isinstance(st, dict)]
    note = _plan_repair_note(reason, _duplicate_files(reason), rejected)
    # Lượt sửa cần thêm lời gọi cổng 1/2/2.5; trần lượt gọi của lượt lập plan đang rất sát.
    budget.max_model_calls = max(budget.max_model_calls, budget.model_calls + 5)
    repaired = _repaired_snapshot(request, reason, note)
    os.environ["AI_BOARD_PLAN_REPAIR"] = "1"
    try:
        stopped = run_plan(repaired)
    finally:
        os.environ.pop("AI_BOARD_PLAN_REPAIR", None)
    if stopped:
        history.append(dict(stopped))
    return stopped, history


def _repaired_snapshot(snapshot: dict, reason: str, note: str | None = None) -> dict:
    """Snapshot cho lượt sửa plan: hint riêng cho planner, KHÔNG nhét vào thread (validator cũng đọc thread)."""
    return {**snapshot, "plan_repair": note or _plan_repair_note(reason)}


def lease_provider(client) -> str:
    """'api' when gate 1 would run on the hosted API right now, else 'vllm'."""
    router = getattr(client, 'routing', None)
    found = router.candidates('gate1') if router else []
    return 'api' if found and found[0]['provider'] == 'api' else 'vllm'


def gate1_probe_client():
    """OllamaClient cho preflight; timeout = AI_BOARD_GATE1_PROBE_TIMEOUT_S (mặc định 45s), không ảnh hưởng call thật."""
    from providers.client import OllamaClient
    return dataclasses.replace(OllamaClient.from_env(), timeout_s=get_settings().gate1_probe_timeout_s)


def _probe_budget(ollama, role: str, budget_cls):
    """Budget covering every retry attempt call_model may make across the role's candidates."""
    from runtime.pipeline import MODEL_RETRY_BACKOFF_S, PATIENT_BACKOFF_S, RETRY_AFTER_CAP_S
    patience = get_settings().provider_patience
    calls, wait_s = 0, 0.0
    for candidate in ollama.routing.candidates(role):
        waits = PATIENT_BACKOFF_S if patience and candidate.get('provider') == 'api' else MODEL_RETRY_BACKOFF_S
        calls += 1 + len(waits)
        # Each wait is jittered up to 25% and may be floored by a capped Retry-After.
        wait_s += sum(max(w * 1.25, RETRY_AFTER_CAP_S) for w in waits)
    timeout_s = getattr(ollama, 'timeout_s', 45.0) or 45.0
    return budget_cls(max_model_calls=max(6, calls), max_units=max(600, 100 * calls),
                      max_wall_clock_s=max(600.0, wait_s + calls * timeout_s))


def model_preflight(ollama, *, clock: Callable[[], float] = time.monotonic, ttl: float = 60.0) -> Callable[[], dict | None]:
    """Generate 1 token on each intake model. None = load được hết, else model_unavailable. Chỉ cache thành công."""
    ok_at: dict[str, float] = {}

    def check() -> dict | None:
        if getattr(ollama, 'routing', None):
            from runtime.budgets.budget import Budget
            from runtime.pipeline import Deps
            # Classifier is fail-open: with no calibrated candidate it must not block intake.
            for role in ('gate1', *(('classifier',) if ollama.routing.candidates('classifier') else ())):
                if role in ok_at and clock() - ok_at[role] < ttl:
                    continue
                if not ollama.routing.candidates(role):
                    # Endpoint đang cooldown sau lỗi trước: probe lúc này chỉ treo thêm hoặc đẩy intake sang 500.
                    return {'status': 'model_unavailable', 'model': role,
                            'error': f'{role}: endpoint đang cooldown, không probe'}
                budget = _probe_budget(ollama, role, Budget)
                # Probe failure must not arm the router cooldown, or the backoff retry is refused without probing.
                cooldowns = dict(ollama.routing.cooldowns)
                try:
                    Deps(models=ollama, notify=None).call_model(ollama.gate1_model, 'ok', gate=1,
                        role=role, budget=budget, format=None, prompt_name='model_probe',
                        options={'num_predict': 1})
                except Exception as error:
                    ollama.routing.cooldowns.clear()
                    ollama.routing.cooldowns.update(cooldowns)
                    ok_at.pop(role, None)
                    from runtime import root_allowance as _root
                    from runtime.budgets import budget as _budget
                    detail = (f"{error} | exhausted={budget.exhausted()} | node={_budget._NODE}"
                              f" | root={_root.current() is not None}")
                    return {'status': 'model_unavailable', 'model': role, 'error': detail[:300]}
                ok_at[role] = clock()
            return None
        # Only what every request needs at intake. Gate 3 models are loaded when Gate 3 runs: probing them here
        # would keep a 20 GB model pinned in the shared GPU while idle.
        models = dict.fromkeys(m for m in (ollama.gate1_model, ollama.classifier_model) if m)
        for model in models:
            if model in ok_at and clock() - ok_at[model] < ttl:
                continue
            try:
                ollama.generate(model, "ok", num_predict=1)
            except Exception as error:  # noqa: BLE001 — mọi lỗi = chưa dùng được
                body = error.read().decode("utf-8", "replace") if isinstance(error, urllib.error.HTTPError) else ""
                ok_at.pop(model, None)
                return {"status": "model_unavailable", "model": model, "error": f"{error} {body}".strip()[:200]}
            ok_at[model] = clock()
        return None
    return check


FULLSTACK_CAPABILITY = "context.write"  # server catalog has it only when AI_BOARD_REQUESTER_FULLSTACK_DB is on


# mirrors server policy.js RUNNABLE; the server rejects any other backend/multi-step test command
_RUNNABLE = re.compile(r"^(node --test\b|node\s|npx\s|npm\s+(test|run)\b|curl\s|python[0-9.]*\s|pytest\b|grep\s|rg\s|bash\s|sh\s|docker compose\s|psql\s)")


def _critical_only() -> bool:
    return bool(getattr(get_settings(), "critical_only_checks", False))


def _runnable_verify(verify: str, scope: list[str]) -> tuple[str, str]:
    """(command, prose). Non-runnable verify -> node --test <test file> | node --check <js file>; prose kept apart."""
    if not _critical_only() or _RUNNABLE.match(verify.strip()):
        return verify, ""
    test = next((path for path in scope if re.match(r"tests?/", path) and path.endswith(".js")), None)
    js = next((path for path in scope if path.endswith(".js")), None)
    command = f"node --test {test}" if test else f"node --check {js}" if js else None
    return (command, verify) if command else (verify, "")


class HarnessPlanner:
    """Runs existing gates 1, 2 and 2.5, then emits the server-owned D0 schema."""

    source = None

    def __init__(self, tracer=None, progress=None, source=None, client=None, worker_id=None):
        Budget, Deps, run_gate = _load_harness()
        self.Budget = Budget
        self.deps = _real_deps(Deps, tracer, progress)
        self.run_gate = run_gate
        self.source = source  # gate 1 reads repo context here (worker clone), else the harness repo
        self.client = client  # xin quyền nâng mức qua worker route; None = chỉ báo trong plan_blocked
        self.worker_id = worker_id
        self._elevation_asked: set[str] = set()  # mỗi kế hoạch xin một lần, không dội lại server

    @staticmethod
    def _request(snapshot: dict) -> dict:
        request = snapshot["request"]
        # Quyền đã duyệt: server gắn ở snapshot.elevation và bản sao trong request.elevation;
        # cổng đọc ở context request (runtime/levels.approved_scope).
        elevation = snapshot.get("elevation") or request.get("elevation")
        return {
            "id": f"req-{request['id']}", "db_id": request["id"],
            "from": request.get("student"), "domain": request.get("domain"),
            "type": request.get("type"), "subject": request.get("title"), "detail": request.get("detail"),
            # Spec đã làm rõ với người gửi thay mô tả gốc; không có thì như cũ.
            "body": request.get("clarified_spec") or request.get("detail") or request.get("title"),
            "clarified_spec": request.get("clarified_spec"),
            "thread": snapshot.get("thread") or [], "votes": request.get("votes", 1),
            "plan_repair": snapshot.get("plan_repair"),
            "complexity_by_server": True,
            "grounding_required": request.get('type') != 'self',
            **({"elevation": elevation} if elevation else {}),
            **({"requester_profile": snapshot["requester_profile"]}
               if get_settings().requester_profile_context and snapshot.get("requester_profile") else {}),
            # Folder: L1 brief, L3 yêu cầu gần nhất, L2 file sở hữu — server tính, có trần.
            **({"folder_brief": brief["text"], "folder_decisions": brief.get("decisions") or "",
                 "folder_recent": brief["recent"], "owned_files": brief["owned_files"]}
               if (brief := (snapshot.get("folder") or {}).get("brief")) else {}),
        }

    @staticmethod
    def _canonical(request: dict, old: dict, signals: list[str] | None = None, catalog: dict | None = None) -> dict:
        """Plan cổng 1 → schema D0 của server. Có tín hiệu phức tạp → risk high → tier protected (admin cho phép).
        Yêu cầu self (board tự sửa): luôn self.config — server chỉ cấp năng lực này cho self, tier protected."""
        old_caps = (["self.config"] if request.get("type") == "self"
                    else list(dict.fromkeys(old.get("capabilities") or [])))
        steps = []
        settings = get_settings()
        from gates import data_kinds, two_level
        from runtime import subtask_files
        two_level_on = two_level.enabled() or subtask_files.enabled()
        planned = (_checks_by_file(old) if (settings.plan_checks and settings.red_check_classify) or two_level.enabled() else {})
        for index, subtask in enumerate(_merge_same_file(list(old.get("subtasks") or [])), start=1):
            file = posixpath.normpath(subtask["file"].replace("\\", "/"))
            capability = next((cap for cap in old_caps
                               if any(file.startswith(prefix) for prefix in (catalog or {}).get(cap, {}).get('allow', []))
                               and not any(file.startswith(prefix) for prefix in (catalog or {}).get(cap, {}).get('deny', []))),
                              old_caps[0] if old_caps else (
                "public.ui" if file.startswith("public/") else "generated.context"
            ))
            if (path_policy.fullstack_on() and FULLSTACK_CAPABILITY in (catalog or {}) and file.startswith("server/contexts/")
                    and not file.startswith(path_policy.GENERATED_ROOT) and path_policy.may_edit(file)):
                capability = FULLSTACK_CAPABILITY
            scope = [file, *subtask_files.files_of(subtask)[1:]] if two_level_on else [file]
            if len(scope) > 1:  # the server grants a step one capability: it must cover every file of the step
                capability = next((cap for cap in dict.fromkeys([*old_caps, *(catalog or {})]) if all(
                    any(path.startswith(prefix) for prefix in (catalog or {}).get(cap, {}).get('allow', []))
                    and not any(path.startswith(prefix) for prefix in (catalog or {}).get(cap, {}).get('deny', []))
                    for path in scope)), capability)
            layer = subtask.get("layer") or ("db" if path_policy.context_migration(file)
                                             else "backend" if path_policy.may_edit(file)
                                             else "db" if "/migrations/" in file and file.endswith(".sql")
                                             else "frontend" if file.startswith("public/") else "wiring")
            depends_on = subtask.get("depends_on")
            if depends_on is None:
                depends_on = [index - 1] if index > 1 else []
            verify, prose = _runnable_verify(subtask["verify"], scope)
            steps.append({
                "order": index,
                "title": subtask["title"],
                "description": f"{subtask['title']} | {prose}" if prose else subtask["title"],
                "allowed_scope": scope,
                "acceptance": [verify],
                "tests": [verify],
                "capability": capability,
                "risk": "medium" if subtask.get("size") == "large" else "low",
                "non_goals": ["Không sửa file ngoài allowed_scope."],
                "layer": layer,
                "depends_on": list(depends_on),
                **({'task_type': subtask['task_type']} if subtask.get('task_type') in
                   {'backend', 'frontend', 'database', 'review', 'test', 'merge', 'all'} else {}),
                **({"checks": planned[file]} if planned.get(file) else {}),
            })
        steps += data_kinds.steps(old, len(steps) + 1, steps)
        capabilities = list(dict.fromkeys([*old_caps, *(step["capability"] for step in steps)]))
        return {
            "domain": request["domain"],
            "goal": old["summary_vi"],
            "allowed_scope": [path for step in steps for path in (step["allowed_scope"] if two_level_on else step["allowed_scope"][:1])],
            "acceptance": list(dict.fromkeys(
                [item for item in (old.get("acceptance") or []) if not _critical_only() or _RUNNABLE.match(str(item))]
                or [item for step in steps for item in step["acceptance"]])),
            "tests": list(dict.fromkeys(item for step in steps for item in step["tests"])),
            "capabilities": capabilities,
            "risk": "high" if signals else "medium" if any(step["risk"] == "medium" for step in steps) else "low",
            "non_goals": ["Không sửa file ngoài allowed_scope.", "Không tự mở rộng quyền."],
            "steps": steps,
        }

    last_approved = None  # {'checks','pin'} the requester approved in the last run (plan_checks); worker stores it locally by plan_hash
    last_session = None  # lịch sử phiên lập plan của lần gọi gần nhất (cờ session_plan_execute); worker lưu cục bộ theo plan_hash
    last_skill = None  # skill cổng 1 của lần gọi gần nhất: worker gửi kèm verdict cùng lease

    def _ask_elevation(self, ticket_id, payload: dict, plan=None) -> dict | None:
        """Xin quyền chạm mức trên surface cho đúng kế hoạch này (một lần/plan, không retry).
        Trả elevation đã duyệt khi server tự cấp (yêu cầu do admin tạo), None khi phải chờ quyết định."""
        key = f"{ticket_id}:{payload.get('plan_hash') or ','.join(payload.get('paths') or [])}"
        if not self.client or ticket_id is None or key in self._elevation_asked:
            return None
        self._elevation_asked.add(key)
        summary = _elevation_plan_summary(plan)
        body = {**payload, **({"worker_id": self.worker_id} if self.worker_id else {}),
                **({"plan": summary} if summary else {})}
        try:
            out = self.client.post(f"/api/ai-board/worker/tickets/{ticket_id}/elevation", body)
        except Exception as error:  # noqa: BLE001 — best effort: plan_blocked vẫn mang payload cho admin
            print(f"[worker] elevation request loi: {str(error)[:160]}")
            return None
        return out.get("elevation") if out.get("state") == "approved" else None

    def _blocked(self, gate, result: dict, history: list[dict], source, state: dict, ticket: dict):
        """PlanBlockedError cho cổng chặn; cổng elevation mang payload + câu chờ admin duyệt."""
        elevation = _elevation_payload(result)
        detail = {
            "gate": gate, "reason": result.get("reason"), "signals": list(result.get("signals") or []),
            **({"evidence": result["evidence"]} if result.get("evidence") else {}),
            **({"retry": result["retry"]} if result.get("retry") else {}),
            "public_message": result.get("public_message"),
            "plan": json.dumps(state.get("plan"), ensure_ascii=False)[:2000],
            **_objection_evidence(history), "pins": _plan_pins(source),
        }
        if elevation is not None:
            detail.update(outcome="elevation_required", elevation_required=elevation,
                          public_message="Cần quản trị viên duyệt quyền cho kế hoạch này.")
        return PlanBlockedError(f"gate {gate} blocked: {result.get('reason')}", detail)

    def __call__(self, snapshot: dict, source=None) -> tuple[dict, int]:
        self.last_skill = self.last_session = self.last_approved = None
        replaced = revision_request(snapshot)
        if replaced:
            snapshot = {**snapshot, "plan_repair": "\n\n".join(filter(None, (snapshot.get("plan_repair"), revision_note(replaced))))}
        request = self._request(snapshot)
        if request.get("folder_brief"):
            # Lách guard qua nhiều lượt nhỏ: soát lexicon trên cả bản mô tả gộp của folder.
            from gates import guard
            hits = {label: guard.LEXICON["labels"][label]["intake"]
                    for label in guard.topic_hits(f"{request['folder_brief']}\n{_scannable_decisions(request.get('folder_decisions'))}\n{request.get('folder_recent') or ''}")}
            stop = sorted(label for label, verdict in hits.items() if verdict in ("reject", "critical"))
            if stop:
                raise PlanBlockedError("folder brief crosses a hard rule", {
                    "gate": 1, "reason": f"folder_brief: {', '.join(stop)}", "signals": stop, "plan": None,
                    "public_message": "Chức năng này cần quản trị viên xem lại trước khi làm tiếp."})
        budget = self.Budget.from_env()
        answered = get_settings().gate25_answered
        # Một lượt lập kế hoạch: gate 1 (tối đa 2 lần, mỗi lần vài lời gọi), gate 2, gate 2.5 (chạy lại khi
        # người gửi đã trả lời). Trần này chỉ chặn vòng lặp vô hạn; trần thật là root allowance của server.
        plan_calls = int(LIMITS['budget'].get('plan_model_calls') or 24)
        budget.max_model_calls = min(budget.max_model_calls, plan_calls)
        # Model 35B chạy tuần tự: một lượt lập plan (gate 1 nhiều lần thử + 2.5) dễ vượt 900 s mặc định.
        budget.max_wall_clock_s = max(budget.max_wall_clock_s, 1800.0)
        ticket = snapshot.get("ticket") or {}
        # Trần units mỗi lượt: plan của request mới chưa có steps nên budget_limit mặc định (200) quá thấp
        # cho 10+ lời gọi model 35B; không thấp hơn trần units mặc định của contract.
        budget.max_units = max(int(ticket.get("budget_limit") or DEFAULT_BUDGET_LIMIT), 600)
        source = source or self.source  # folder: đỉnh nhánh chu kỳ thay cho checkout chung
        state = {'catalog': (snapshot.get('capability_policy') or {}).get('capabilities', {})}
        if request.get('elevation'):
            state['elevation'] = request['elevation']  # cổng 2.5 đọc cả state
        if source:
            state['checkout_source'] = str(source)
        from runtime import exec_graph

        stopped = {}

        def run_plan(req):
            """Một lượt cổng 1 → 2.5 trên `req`; trả {gate, result} của cổng chặn (rỗng nếu qua)."""
            stopped.clear()
            for key in ("plan", "complexity_signals", "intake", "grounding", "assumption", "skill", "attachments",
                        "validator_retry"):
                state.pop(key, None)

            def plan_gate(gate):
                def node():
                    result = self.run_gate(gate, req, self.deps, budget, state)
                    if gate == 1:
                        self.last_skill = result.get("skill")
                    if result.get("blocked"):
                        stopped.update(gate=gate, result=result)
                        return "blocked"
                    return "passed"
                return node

            handlers = {f"gate_{str(g).replace('.', '_')}": plan_gate(g) for g in PLAN_GATES}
            # plan_ready is an end node; give it a handler so the walk emits the marker span (the router ends there anyway).
            handlers["plan_ready"] = node_span(self.deps, "plan_ready", lambda: "passed")
            exec_graph.run(handlers, exec_graph.spec()["entries"]["plan"])
            result = dict(stopped)
            if not result:
                reason = coverage.plan_block(plan_now := state.get("plan") or {}, lambda: _uncovered_conditions(request, plan_now, self.deps, budget),
                                            lambda: coverage.requested_missing(plan_now, coverage.user_text(request),
                                                                                    waived=_waived(state)))
                if reason:
                    result = {"gate": 1, "result": {"gate": 1, "blocked": True, "plan": None, "signals": [],
                                                    "reason": f"plan không hợp lệ: {reason}"}}
            return result

        stopped, history = _plan_with_repair(run_plan, request, state, budget, run_plan(request))
        if stopped:
            # Cổng xin quyền chạm protected/core: báo server ngay; server tự cấp (yêu cầu do admin
            # tạo) thì lập lại một lượt với quyền đó thay vì bắt admin bấm thêm lần nữa.
            payload = _elevation_payload(stopped.get("result"))
            granted = self._ask_elevation(ticket.get("id"), payload, state.get("plan")) if payload is not None else None
            if granted:
                budget.max_model_calls = max(budget.max_model_calls, budget.model_calls + 6)
                request = {**request, "elevation": granted}
                state["elevation"] = granted
                stopped, history = _plan_with_repair(run_plan, request, state, budget, run_plan(request))
        if stopped:
            gate, result = stopped["gate"], stopped["result"]
            raise self._blocked(gate, result, history, source, state, ticket)
        signals = list(state.get("complexity_signals") or [])
        if snapshot.get("clarification_incomplete"):
            signals.append("requester_still_vague")  # legacy incomplete clarification → risk high → admin cho phép plan
        plan = self._canonical(request, state["plan"], signals, state['catalog'])
        from gates import data_kinds
        try:
            data_kinds.sandbox([step for step in plan["steps"] if step.get("layer") == "data"])
        except ValueError as error:
            raise PlanBlockedError(f"data step blocked: {error}", {
                "gate": 1, "reason": str(error), "signals": [], "plan": json.dumps(state.get("plan"), ensure_ascii=False)[:2000],
                "public_message": "Bước thay đổi dữ liệu chưa qua kiểm tra trên Postgres thử nghiệm."}) from None
        self.last_session = state.get("plan_session")
        self.last_approved = ({"checks": state["approved_checks"], "pin": state.get("approved_pin")}
                              if state.get("approved_checks") else None)
        if replaced:
            stamp_revision(plan, replaced)
        if state.get('grounding'):
            plan['grounding'] = state['grounding']
        if state.get('ledger'):
            plan['ledger'] = [{**item, 'gate': 1} for item in state['ledger']]
        if state.get('assumption'):
            note = f"Giả định chưa xác nhận với người gửi: {state['assumption']}"[:300]
            plan['non_goals'] = [*plan['non_goals'], note]
        if (state.get('intake') or {}).get('read_only_verification'):
            plan['read_only_admin_verification'] = True
        return plan, int(budget.units)
