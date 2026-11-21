"""Guardrail yêu cầu học viên (spec .scratch/ai-board-guardrails/spec.md §A) — chạy TRƯỚC cổng 1.

Thứ tự: luật tất định rẻ trước (lexicon chung server/ai-board/guard-lexicon.json, PII, link ngoài
allowlist, vô nghĩa) → trúng reject/critical thì dừng luôn, không gửi model. Còn lại mới hỏi LLM
(gate1_model, prompts/intake_guard.md, tập nhãn đóng). LLM chỉ được NÂNG verdict tới needs_info/
human_review, không tự reject và không bao giờ tự duyệt: model lỗi/hết budget/JSON sai → human_review.

CHƯA nối vào đâu — lead nối. Lời gọi đề xuất, ở main.run_gate khi number == 1, TRƯỚC brainstorm.run
(phủ cả main.run_once lẫn worker.HarnessPlanner vì planner gọi run_gate(1, ...)):

    guard = intake_guard.run(request.get("subject") or "", request.get("body") or "", deps, budget,
                             db_path=db_path, proposal_id=proposal_id)
    state["intake"] = guard
    if guard["verdict"] != "allow":
        return {"gate": 1, "blocked": True, "reason": guard["internal_reason"], "plan": None,
                "signals": guard["labels"], "public_message": guard["public_message"],
                "outcome": f"intake_{guard['verdict']}"}

Worker (HarnessPlanner) biến blocked thành PlanBlockedError → event plan_blocked; lead cần cho worker
dùng result["public_message"] thay câu cố định, và verdict critical thì mở ai_alerts (store chưa có đường này).
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from security import classifier, spotlight
from gates import guard
from runtime import limits, model_json

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "intake_guard.md").read_text(encoding="utf-8")
SELFCHECK_PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "intake_selfcheck.md").read_text(encoding="utf-8")
SELFCHECK_CALIBRATION_ID = "intake-selfcheck-v1"
SELFCHECK_OPTIONS = {"num_predict": 5, "temperature": 0.001}
SELFCHECK_MAX_TEXT = 2000

LABELS = (
    "ok", "prompt_injection", "privileged_area", "money", "personal_data", "politics_sovereignty", "religion",
    "discrimination_hate", "sexual", "violence_weapons", "drugs_gambling", "self_harm", "harassment_profanity",
    "defamation", "health_legal_finance_claim", "copyright", "ads_spam", "academic_cheating", "off_topic",
)
VERDICTS = ("allow", "needs_info", "human_review", "reject", "critical")  # tăng dần
_LLM_NEEDS_INFO = {"personal_data", "off_topic"}
MAX_TITLE, MAX_DETAIL = 200, limits.prompt_cap_chars("intake_detail")
_WORD = re.compile(r"[^\W\d_]{2,}")
_FORMAT_CUE = re.compile(r"dinh dang|format|dau (?:cham|phay|ngan cach)|doi ten|rename|lam tron")
_MONEY_ACTION = re.compile(r"thanh toan|rut tien|hoan tien|refund|ma giam gia|ma khuyen mai|mua goi|nang cap|dang ky goi|"
                           r"vnpay|momo|zalopay|the (?:tin dung|ngan hang)|tai khoan ngan hang|so tai khoan|tien that|"
                           r"vi dien tu|credit card|subscription|billing|invoice|pricing|thu phi|tinh phi|tra phi|giam gia")
_THINK = re.compile(r"<think>.*?</think>", re.S)


def _worst(verdicts) -> str:
    return max(verdicts, key=VERDICTS.index, default="allow")


def deterministic(text: str) -> dict[str, str]:
    """{nhãn: verdict} từ luật rẻ: lexicon, PII, link ngoài allowlist, vô nghĩa."""
    text = readonly_verification_text(text)
    hits = {label: guard.LEXICON["labels"][label]["intake"] for label in guard.topic_hits(text)}
    folded = guard.fold(text)
    if hits.get("money") and _FORMAT_CUE.search(folded) and not _MONEY_ACTION.search(folded):
        del hits["money"]  # display/rename only; money files are still critical at the gate 4 diff check
    if guard._pii(text, set()):
        hits["personal_data"] = "needs_info"
    if any(not guard.host_allowed(m.group(1)) for m in guard._URL.finditer(text)):
        hits.setdefault("ads_spam", "human_review")
    if len(_WORD.findall(text)) < 2 or re.search(r"(.)\1{7,}", text):
        hits["off_topic"] = "needs_info"
    return hits


def readonly_verification_text(text: str) -> str:
    rule = guard.LEXICON["readonly_admin_verification"]
    clauses = re.split(r"(?<=[.!?;])\s+|\n", text)
    for i, clause in enumerate(clauses):
        clause = re.sub(r"chỉ đọc (?=trang (?:quản trị|admin))", "chỉ quan sát ", clause, flags=re.I)
        words = guard.fold(clause)
        if re.search(rule["observe"], words) and not re.search(r"\b(?:" + rule["mutate"] + r")\b", re.sub(r"\btheo doi\b", "", words)):
            clauses[i] = re.sub(r"trang (quản trị|quan tri|admin)|admin-request\.html|\badmin\b", "giao diện chỉ đọc", clause, flags=re.I)
    return "\n".join(clauses)


_ARBITRABLE = {"privileged_area", "prompt_injection"}
_ROLE_WARN_LABELS = frozenset({"money", "off_topic"})


def _arbiter_clears(llm_labels, scored) -> bool:
    """Flag gate1_arbiter: nhãn LLM mềm + từ khóa sạch + classifier p(safe) cao → bỏ chặn. Không động tới từ khóa/escalate."""
    from settings import get_settings
    cfg = get_settings()
    bad = [x for x in llm_labels if x != "ok"]
    return bool(cfg.gate1_arbiter and bad and all(x in _ARBITRABLE for x in bad)
                and (scored.get("probs") or {}).get("safe", 0) >= cfg.gate1_arbiter_min)


def _trusts_requester(requester_role: str | None) -> bool:
    """Admin đã xác thực ở server + cờ bật → nới privileged_area. Role lấy từ server, không từ chữ trong đề."""
    from settings import get_settings
    return bool(get_settings().admin_requester_trust and requester_role == "admin")


def _selfcheck_on() -> bool:
    from settings import get_settings
    return bool(get_settings().intake_selfcheck)


def _warns_by_role() -> bool:
    from settings import get_settings
    return bool(get_settings().intake_labels_by_role)


def parse_labels(text: str, allowed=LABELS) -> list[str]:
    """Parse {"labels": [...]} từ model. Raise ValueError nếu không phải JSON/nhãn ngoài tập đóng/rỗng."""
    try:
        data = model_json.loads(text)
    except ValueError as e:
        raise ValueError(f"không phải JSON: {e}") from None
    labels = data.get("labels") if isinstance(data, dict) else None
    if not isinstance(labels, list) or not labels or not all(isinstance(x, str) for x in labels):
        raise ValueError("thiếu labels")
    labels = list(dict.fromkeys(x.strip() for x in labels))
    unknown = [x for x in labels if x not in allowed]
    if unknown:
        raise ValueError(f"nhãn ngoài tập đóng: {unknown[:3]}")
    return [x for x in labels if x != "ok"] or ["ok"]


def _fence(text: str, limit: int) -> str:
    """Cắt độ dài, gỡ ký tự phân cách để học viên không đóng được khối dữ liệu sớm."""
    return re.sub(r"<{3,}|>{3,}", "", text or "")[:limit]


def labels_format(allowed=LABELS) -> dict:
    """Ollama JSON schema for {"labels", "reason"}: labels non-empty, closed set.
    Plain format="json" let qwen3:8b answer "{}" on the gate 4 prompt (2026-09-26 run)."""
    return {"type": "object", "required": ["labels", "reason"], "properties": {
        "labels": {"type": "array", "minItems": 1, "items": {"type": "string", "enum": list(allowed)}},
        "reason": {"type": "string"}}}


def classify(title: str, detail: str, deps, budget, *, db_path=None, proposal_id=None) -> tuple[list[str], str]:
    """(nhãn LLM, lý do nội bộ). Lỗi/hết budget → (["classifier_error"], lý do) — người gọi coi là human_review."""
    if not budget.tick():
        return ["classifier_error"], "hết budget, không gọi được bộ phân loại"
    prompt = spotlight.fence(PROMPT).format(title=spotlight.scrub(_fence(title, MAX_TITLE)),
                                            detail=spotlight.scrub(_fence(detail, MAX_DETAIL)) or "(trống)")
    try:
        body = deps.call_model(deps.models.gate1_model, prompt, gate=1, budget=budget,
                               db_path=db_path, proposal_id=proposal_id, prompt_name="intake_guard.md",
                               format=labels_format())
        text = body.get("response", "")
        labels = parse_labels(text)
    except Exception as e:  # model sập/timeout/JSON sai — fail closed, không bao giờ auto-approve
        return ["classifier_error"], f"bộ phân loại lỗi: {str(e)[:200]}"
    reason = ""
    try:
        reason = str(json.loads(_THINK.sub("", text).strip()).get("reason") or "")[:200]
    except (ValueError, AttributeError):
        pass
    return labels, reason


def selfcheck_prompt(text: str) -> str:
    """Render self-check template; trailing newline dropped, text inserted raw."""
    return SELFCHECK_PROMPT.removesuffix("\n").replace("{{ user_input }}", text[:SELFCHECK_MAX_TEXT], 1)


def selfcheck_blocks(response: str) -> bool:
    """Yes/No answer -> True when message must be blocked. Unclear or empty answer blocks."""
    words = re.sub(r"\W+", " ", response.lower().strip()).split(" ")[:2]
    for word, safe in (("safe", True), ("unsafe", False), ("yes", False), ("no", True)):
        if word in words:
            return not safe
    return True


def selfcheck(text: str, deps, budget, *, db_path=None, proposal_id=None) -> tuple[bool | None, str]:
    """(blocked, answer). Error or budget exhausted -> (None, reason)."""
    if not budget.tick():
        return None, "hết budget, không gọi được tự kiểm"
    try:
        body = deps.call_model(deps.models.gate1_model, selfcheck_prompt(text), gate=1, budget=budget, db_path=db_path,
                               proposal_id=proposal_id, prompt_name="intake_selfcheck.md", format=None,
                               options=dict(SELFCHECK_OPTIONS), extra={"thinking": False, "_no_split": True})
        answer = body.get("response", "")
    except Exception as e:  # model sập/timeout/hết budget — fail closed
        return None, f"tự kiểm lỗi: {str(e)[:200]}"
    return selfcheck_blocks(answer), _THINK.sub("", answer).strip()[:40]


_CACHE: dict[str, dict] = {}
_CACHE_MAX = 64


def run(request_title: str, request_detail: str | None, deps, budget, *, db_path=None,
        proposal_id: int | None = None, requester_role: str | None = None) -> dict:
    """Verdict như _run; cache theo hash(yêu cầu, role, model, config) trong process: vòng plan và admin rerun không gọi lại LLM. Không cache lỗi bộ phân loại."""
    from runtime import limits
    models = getattr(deps, "models", None)
    key = hashlib.sha256(json.dumps([request_title or "", request_detail or "", requester_role or "",
                                     str(getattr(models, "gate1_model", "")),
                                     str(getattr(models, "classifier_model", "")), limits.config_sha256(),
                                     *([SELFCHECK_CALIBRATION_ID] if _selfcheck_on() else [])]).encode()).hexdigest()
    if key in _CACHE:
        return {**_CACHE[key], "cached": True}
    out = _run(request_title, request_detail, deps, budget, db_path=db_path, proposal_id=proposal_id,
               requester_role=requester_role)
    if "classifier_error" not in out["labels"]:
        _CACHE[key] = out
        while len(_CACHE) > _CACHE_MAX:
            _CACHE.pop(next(iter(_CACHE)))
    return out


def _run(request_title: str, request_detail: str | None, deps, budget, *, db_path=None,
         proposal_id: int | None = None, requester_role: str | None = None) -> dict:
    """Verdict allow|needs_info|human_review|reject|critical + labels + public_message (tiếng Việt,
    không nhắc lại nội dung) + internal_reason (cho admin, không gửi học viên)."""
    title, detail = request_title or "", request_detail or ""
    hits = deterministic(f"{title}\n{detail}")
    trusted = _trusts_requester(requester_role)
    trusted_hit = False
    keyword_clear, arbitrated = not hits, None
    verdict = _worst(hits.values())
    reasons = [f"tất định: {', '.join(hits)}"] if hits else []
    scored = None
    selfchecked = None
    if verdict in ("allow", "needs_info") and _selfcheck_on():
        blocked, answer = selfcheck(readonly_verification_text(f"{title}\n{detail}".strip()), deps, budget,
                                    db_path=db_path, proposal_id=proposal_id)
        selfchecked = {"calibration_id": SELFCHECK_CALIBRATION_ID, "answer": answer, "blocked": blocked}
        if blocked is None:
            hits["classifier_error"] = "human_review"
            reasons.append(f"tự kiểm: {answer}")
        elif blocked:
            hits["selfcheck_unsafe"] = "human_review"
            reasons.append(f"tự kiểm: model chặn ({answer})")
        else:
            reasons.append(f"tự kiểm: cho qua ({answer})")
        verdict = _worst([verdict, *hits.values()])
    elif verdict in ("allow", "needs_info"):
        llm, why = classify(readonly_verification_text(title), readonly_verification_text(detail), deps, budget,
                            db_path=db_path, proposal_id=proposal_id)
        if trusted and "privileged_area" in llm:
            llm = [x for x in llm if x != "privileged_area"] or ["ok"]
            trusted_hit = True
        llm_verdicts = ["allow" if x == "ok" else "needs_info" if x in _LLM_NEEDS_INFO else "human_review"
                        for x in llm]
        verdict = _worst([verdict, *llm_verdicts])
        hits.update({x: v for x, v in zip(llm, llm_verdicts) if x != "ok"})
        reasons.append(f"LLM: {', '.join(llm)}" + (f" ({why})" if why else ""))
        # Logprob classifier beside the JSON guard: only ever raises to human_review.
        scored = classifier.danger(readonly_verification_text(f"{title}\n{detail}"), deps, budget, gate=1, db_path=db_path, proposal_id=proposal_id)
        if scored and scored["escalate"]:
            verdict = _worst([verdict, "human_review"])
            hits.update({f"model_{key}": "human_review" for key in scored["labels"]})
            reasons.append(f"logprob: {', '.join(scored['labels'])}")
        elif scored and keyword_clear and _arbiter_clears(llm, scored):
            verdict, arbitrated = "allow", [x for x in llm if x != "ok"]
            hits = {k: v for k, v in hits.items() if k not in arbitrated}
            reasons.append(f"arbiter: classifier p(safe)={scored['probs'].get('safe', 0):.3f} xoá {', '.join(arbitrated)}")
    warned = []
    if trusted and _warns_by_role():
        warned = sorted(label for label in hits if label in _ROLE_WARN_LABELS)
        if warned:
            hits = {k: v for k, v in hits.items() if k not in warned}
            verdict = _worst(hits.values())
            reasons.append(f"admin: chỉ cảnh báo {', '.join(warned)}")
    messages = guard.LEXICON["public_messages"]
    if verdict == "allow":
        public = None
    elif "prompt_injection" in hits:
        public = messages["prompt_injection"]
    elif verdict == "needs_info" and "personal_data" in hits:
        public = messages["needs_info_pii"]
    else:
        public = messages[verdict]
    out = {"verdict": verdict, "labels": list(hits) or ["ok"], "public_message": public,
           "internal_reason": "; ".join(reasons)[:1000] or "không có tín hiệu"}
    if trusted_hit:
        out["trusted_admin"] = True
        out["internal_reason"] = (out["internal_reason"] + "; admin tin cậy: bỏ privileged_area")[:1000]
    if arbitrated:
        out["arbitrated"] = arbitrated
    if warned:
        out["warned_labels"] = warned
    if selfchecked:
        out["selfcheck"] = selfchecked
    if scored:
        out["classifier"] = scored  # model, probs, escalate, logged: compared with the JSON guard
    if readonly_verification_text(f"{title}\n{detail}") != f"{title}\n{detail}":
        out["read_only_verification"] = True
    return out
