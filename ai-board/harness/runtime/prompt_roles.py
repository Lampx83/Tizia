"""Tách lời gọi model thành system (luật nền tảng, giá trị) + user (nội dung, định dạng nhắc lại cuối). Bật bằng AI_BOARD_PROMPT_ROLE_SPLIT=1."""
from __future__ import annotations

from pathlib import Path
from providers import thinking
from settings import get_settings

SYSTEM = (Path(__file__).resolve().parent.parent / "prompts" / "system_roles.md").read_text(encoding="utf-8").strip()
RESTATE = "\n\nReminder: reply in exactly the format requested above, with no text outside that format."
TOOL_ROLES = thinking.TOOL_ROLES
REASONING_ROLES = thinking.SPLIT_ON_ROLES
# Dự phòng khi catalog thiếu role; số liệu theo manual (tool loop: thinking off, sampling non-thinking).
DEFAULT_SAMPLING = {"thinking": False, "temperature": 0.7, "top_p": 0.8, "top_k": 20, "presence_penalty": 1.5}
REASONING_SAMPLING = {"temperature": 0.6, "top_p": 0.95, "top_k": 20, "presence_penalty": 0, "num_predict": 16384}


def enabled() -> bool:
    """Bật tách system/user; mặc định tắt."""
    return get_settings().prompt_role_split


def split(user: str) -> tuple[str, str]:
    """(system, user) với định dạng được nhắc lại ở cuối user."""
    return SYSTEM, user + RESTATE


def call_params(role: str, routing, *, structured: bool = False) -> tuple[dict, dict]:
    """Separate bounded reasoning from schema/implementation calls in split mode."""
    if structured:
        return {"thinking": False, "force_thinking": False}, {"temperature": 0}
    if role in REASONING_ROLES:
        sampling = dict(REASONING_SAMPLING)
        if thinking.budget_enabled():  # answer cap stays the caller's; reasoning budget added downstream
            sampling.pop("num_predict")
            return {"thinking": True, "force_thinking": True}, sampling
        return {"thinking": True, "force_thinking": True, "max_total_output_tokens": 16384}, sampling
    if role not in TOOL_ROLES:
        return {}, {}
    entry = {**DEFAULT_SAMPLING, **((routing.sampling(role) if routing else None) or {})}
    entry.pop("thinking")
    think = thinking.effective(role, routing, split=True)
    return {"thinking": think, "force_thinking": think}, entry
