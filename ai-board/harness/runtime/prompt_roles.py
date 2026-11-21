"""Tách lời gọi model thành system (luật nền tảng, giá trị) + user (nội dung, định dạng nhắc lại cuối). Bật bằng AI_BOARD_PROMPT_ROLE_SPLIT=1."""
from __future__ import annotations

from pathlib import Path
from providers import thinking
from settings import get_settings

_PROMPTS = Path(__file__).resolve().parent.parent / "prompts"
SYSTEM = (_PROMPTS / "system_roles.md").read_text(encoding="utf-8").strip()
SYSTEM_PRINCIPLES = (_PROMPTS / "system_roles_principles.md").read_text(encoding="utf-8").strip()
RESTATE = "\n\nReminder: reply in exactly the format requested above, with no text outside that format."
TOOL_ROLES = thinking.TOOL_ROLES
REASONING_ROLES = thinking.SPLIT_ON_ROLES
# Dự phòng khi catalog thiếu role; số liệu theo manual (tool loop: thinking off, sampling non-thinking).
DEFAULT_SAMPLING = {"thinking": False, "temperature": 0.7, "top_p": 0.8, "top_k": 20, "presence_penalty": 1.5}
REASONING_SAMPLING = {"temperature": 0.6, "top_p": 0.95, "top_k": 20, "presence_penalty": 0, "num_predict": 16384}


def system() -> str:
    """System prompt; principles variant when AI_BOARD_PROMPT_PRINCIPLES on."""
    return SYSTEM_PRINCIPLES if get_settings().prompt_principles else SYSTEM


def enabled() -> bool:
    """Bật tách system/user; mặc định tắt."""
    return get_settings().prompt_role_split


TAIL = "\n\nSubtask goal: {title}. Target file: {file}. Done when: {verify}.\nKey constraints: edit only the target file and tests under test/; finish only after edit_file and write_test."


def tail(subtask: dict) -> str:
    """Mục tiêu + ràng buộc then chốt + nhắc định dạng, nối cuối mỗi lượt gọi; kết bằng RESTATE."""
    return TAIL.format(title=subtask["title"], file=subtask["file"], verify=subtask["verify"]) + RESTATE


def split(user: str) -> tuple[str, str]:
    """(system, user) với định dạng được nhắc lại ở cuối user (không nhắc lần nữa nếu đã có)."""
    return system(), user if user.endswith(RESTATE) else user + RESTATE


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
