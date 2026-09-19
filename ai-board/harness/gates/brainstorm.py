"""Cổng 1 — request → plan JSON (kiểu writing-plans: subtask 2-5 phút, mỗi cái
nêu file + bước verify + nhãn size để cổng 3 chọn coder model).

Schema plan (hợp đồng với cổng 2, 3, 13):
{
  "summary_vi":   str   # 1-2 câu tiếng Việt: giải quyết gì, đổi gì (cổng 5/7 ghép vào PR/Telegram)
  "capabilities": [str] # tên key surface plugin cần — cổng 2 chặn nếu có gì ngoài surface
  "subtasks": [
    {"title": str, "file": str, "verify": str, "size": "small" | "large"}
  ]                     # small → qwen2.5-coder:14b, large → qwen3-coder:30b (ticket 11)
}
"""
from __future__ import annotations

import json
from pathlib import Path

import gate_trace
from gates.scope_check import load_capability_names

SIZES = ("small", "large")
SUBTASK_KEYS = ("title", "file", "verify", "size")

# Prompt sống ở file riêng (ai-board/harness/prompts/), không phải string
# literal ở đây — dễ review/diff độc lập với logic Python, và vẫn giữ đúng
# "kỷ luật cache" rule 1 (đọc 1 lần lúc import, byte-để-byte cố định mọi
# lần gọi, y hệt lúc còn là string cứng).
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "brainstorm.md").read_text(encoding="utf-8")


def build_prompt(request: dict, surface: frozenset[str]) -> str:
    thread = " | ".join(
        f"{m.get('role')}: {m.get('body')}" for m in (request.get("thread") or [])
    ) or "(không có)"
    return PROMPT.format(
        id=request.get("id"),
        domain=request.get("domain") or "(core)",
        type=request.get("type"),
        votes=request.get("votes", 0),
        subject=request.get("subject", ""),
        body=request.get("body", ""),
        thread=thread,
        surface=", ".join(sorted(surface)),
    )


def parse_plan(text: str) -> dict:
    """Parse + validate. Raise ValueError với lý do ngắn nếu sai schema."""
    try:
        plan = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(plan, dict):
        raise ValueError("plan phải là object")
    if not isinstance(plan.get("summary_vi"), str) or not plan["summary_vi"].strip():
        raise ValueError("thiếu summary_vi")
    subtasks = plan.get("subtasks")
    if not isinstance(subtasks, list) or not subtasks:
        raise ValueError("subtasks rỗng")
    for i, st in enumerate(subtasks):
        if not isinstance(st, dict):
            raise ValueError(f"subtask[{i}] không phải object")
        for k in SUBTASK_KEYS:
            if not isinstance(st.get(k), str) or not st[k].strip():
                raise ValueError(f"subtask[{i}] thiếu {k}")
        if st["size"] not in SIZES:
            raise ValueError(f"subtask[{i}].size='{st['size']}' không thuộc {SIZES}")
    caps = plan.get("capabilities") or []
    if not isinstance(caps, list):
        raise ValueError("capabilities phải là mảng")
    plan["capabilities"] = caps
    return plan


def run(request: dict, deps, budget, *, db_path=None, proposal_id: int | None = None) -> dict:
    """1 lời gọi GATE1_MODEL, tính phí budget. Plan sai schema → blocked.
    db_path/proposal_id (ticket 23): có cả hai thì ghi 1 dòng gate_trace —
    thiếu 1 trong 2 (vd test gọi run() trực tiếp không qua main.run_once) thì
    bỏ qua, không phải lỗi."""
    surface = load_capability_names()["surface"]
    prompt = build_prompt(request, surface)
    body = deps.models.generate(deps.models.gate1_model, prompt, format="json")
    budget.spend("model_calls")
    budget.spend("tokens", int(body.get("prompt_eval_count") or 0) + int(body.get("eval_count") or 0))
    if db_path is not None and proposal_id is not None:
        gate_trace.record(db_path, skill_proposal_id=proposal_id, gate=1,
                           model=deps.models.gate1_model, prompt=prompt, body=body)
    try:
        plan = parse_plan(body.get("response", ""))
    except ValueError as e:
        return {"gate": 1, "blocked": True, "reason": f"plan không hợp lệ: {e}", "plan": None}
    return {"gate": 1, "blocked": False, "reason": None, "plan": plan}
