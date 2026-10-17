"""Tách lời gọi model thành system (luật nền tảng, giá trị) + user (nội dung, định dạng nhắc lại cuối). Bật bằng AI_BOARD_PROMPT_ROLE_SPLIT=1."""
from __future__ import annotations

import os
from pathlib import Path

SYSTEM = (Path(__file__).resolve().parent.parent / "prompts" / "system_roles.md").read_text(encoding="utf-8").strip()
RESTATE = "\n\nNhắc lại: trả đúng định dạng đã yêu cầu ở trên, không thêm chữ nào ngoài định dạng đó."
TOOL_ROLES = ("gate3_light", "gate3_heavy")
# Dự phòng khi catalog thiếu role; số liệu theo manual (tool loop: thinking off, sampling non-thinking).
DEFAULT_SAMPLING = {"thinking": False, "temperature": 0.7, "top_p": 0.8, "top_k": 20, "presence_penalty": 1.5}


def enabled() -> bool:
    """Bật tách system/user; mặc định tắt."""
    return os.environ.get("AI_BOARD_PROMPT_ROLE_SPLIT", "") == "1"


def split(user: str) -> tuple[str, str]:
    """(system, user) với định dạng được nhắc lại ở cuối user."""
    return SYSTEM, user + RESTATE


def call_params(role: str, routing) -> tuple[dict, dict]:
    """(extra, options) của gate 3: thinking tắt và sampling theo catalog; role khác không đổi."""
    if role not in TOOL_ROLES:
        return {}, {}
    entry = {**DEFAULT_SAMPLING, **((routing.sampling(role) if routing else None) or {})}
    thinking = bool(entry.pop("thinking"))
    return {"thinking": thinking, "force_thinking": thinking}, entry
