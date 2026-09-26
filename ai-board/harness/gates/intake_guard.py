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

import json
import re
from pathlib import Path

import classifier
from gates import guard

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "intake_guard.md").read_text(encoding="utf-8")

LABELS = (
    "ok", "prompt_injection", "privileged_area", "money", "personal_data", "politics_sovereignty", "religion",
    "discrimination_hate", "sexual", "violence_weapons", "drugs_gambling", "self_harm", "harassment_profanity",
    "defamation", "health_legal_finance_claim", "copyright", "ads_spam", "academic_cheating", "off_topic",
)
VERDICTS = ("allow", "needs_info", "human_review", "reject", "critical")  # tăng dần
_LLM_NEEDS_INFO = {"personal_data", "off_topic"}
MAX_TITLE, MAX_DETAIL = 200, 2000  # prompt + input vừa num_ctx 8192 của qwen3:8b
_WORD = re.compile(r"[^\W\d_]{2,}")
_THINK = re.compile(r"<think>.*?</think>", re.S)


def _worst(verdicts) -> str:
    return max(verdicts, key=VERDICTS.index, default="allow")


def deterministic(text: str) -> dict[str, str]:
    """{nhãn: verdict} từ luật rẻ: lexicon, PII, link ngoài allowlist, vô nghĩa."""
    hits = {label: guard.LEXICON["labels"][label]["intake"] for label in guard.topic_hits(text)}
    if guard._pii(text, set()):
        hits["personal_data"] = "needs_info"
    if any(not guard.host_allowed(m.group(1)) for m in guard._URL.finditer(text)):
        hits.setdefault("ads_spam", "human_review")
    if len(_WORD.findall(text)) < 2 or re.search(r"(.)\1{7,}", text):
        hits["off_topic"] = "needs_info"
    return hits


def parse_labels(text: str, allowed=LABELS) -> list[str]:
    """Parse {"labels": [...]} từ model. Raise ValueError nếu không phải JSON/nhãn ngoài tập đóng/rỗng."""
    try:
        data = json.loads(_THINK.sub("", text or "").strip())
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
    prompt = PROMPT.format(title=_fence(title, MAX_TITLE), detail=_fence(detail, MAX_DETAIL) or "(trống)")
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


def run(request_title: str, request_detail: str | None, deps, budget, *, db_path=None,
        proposal_id: int | None = None) -> dict:
    """Verdict allow|needs_info|human_review|reject|critical + labels + public_message (tiếng Việt,
    không nhắc lại nội dung) + internal_reason (cho admin, không gửi học viên)."""
    title, detail = request_title or "", request_detail or ""
    hits = deterministic(f"{title}\n{detail}")
    verdict = _worst(hits.values())
    reasons = [f"tất định: {', '.join(hits)}"] if hits else []
    scored = None
    if verdict in ("allow", "needs_info"):
        llm, why = classify(title, detail, deps, budget, db_path=db_path, proposal_id=proposal_id)
        llm_verdicts = ["allow" if x == "ok" else "needs_info" if x in _LLM_NEEDS_INFO else "human_review"
                        for x in llm]
        verdict = _worst([verdict, *llm_verdicts])
        hits.update({x: v for x, v in zip(llm, llm_verdicts) if x != "ok"})
        reasons.append(f"LLM: {', '.join(llm)}" + (f" ({why})" if why else ""))
        # Logprob classifier beside the JSON guard (ticket 04): only ever raises to human_review.
        scored = classifier.danger(f"{title}\n{detail}", deps, budget, gate=1, db_path=db_path, proposal_id=proposal_id)
        if scored and scored["escalate"]:
            verdict = _worst([verdict, "human_review"])
            hits.update({f"model_{key}": "human_review" for key in scored["labels"]})
            reasons.append(f"logprob: {', '.join(scored['labels'])}")
    messages = guard.LEXICON["public_messages"]
    if verdict == "allow":
        public = None
    elif verdict == "needs_info" and "personal_data" in hits:
        public = messages["needs_info_pii"]
    else:
        public = messages[verdict]
    out = {"verdict": verdict, "labels": list(hits) or ["ok"], "public_message": public,
           "internal_reason": "; ".join(reasons)[:1000] or "không có tín hiệu"}
    if scored:
        out["classifier"] = scored  # model, probs, escalate, logged: compared with the JSON guard (ticket 01)
    return out
