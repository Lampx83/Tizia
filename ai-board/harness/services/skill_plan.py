"""One deterministic skill selection per role (LF/76): every source once, priority + shared budget, pinned."""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass

from runtime import limits
from services import default_skills
from settings import get_settings


@dataclass(frozen=True)
class Selection:
    role: str
    skills: list
    report: dict
    pin: str


def enabled(env=None) -> bool:
    """Flag AI_BOARD_SKILL_SELECT; absent = contract default (off, so prompts stay byte-identical)."""
    spec = limits.contract()["limits"]["skills"]["selection_node"]
    flag = get_settings(env).skill_select
    return bool(spec["default_enabled"] if flag is None else flag)


def build(role: str, context: dict | None = None) -> Selection:
    """Select once, deterministically: defaults + approved admin skills + variants through skill_selection.choose.

    The pin covers the role, each selected skill's evidence (name, version, hash, token bound) and the contract hash,
    so a skill or config change changes it and a resumed attempt can refuse a different selection.
    """
    skills, report = default_skills.select_report(role, context)
    payload = {"role": role, "skills": [skill.evidence() for skill in skills], "config": limits.config_sha256()}
    pin = hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    return Selection(role=role, skills=skills, report=report, pin=pin)


def pin(role: str, context: dict | None = None) -> str:
    return build(role, context).pin
