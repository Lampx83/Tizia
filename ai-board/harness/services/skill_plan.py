"""One deterministic skill selection per role (LF/76): every source once, priority + shared budget, pinned."""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass

from runtime import limits
from services import default_skills, skill_selection
from settings import get_settings


TASK_PICK = "task-pick"  # khớp topic: một skill thư mục mỗi prompt


@dataclass(frozen=True)
class Selection:
    role: str
    skills: list
    report: dict
    pin: str


@dataclass(frozen=True)
class Block:
    """Skill thư mục của context (pick hoặc biến thể) vào node; body = text của một gate."""
    name: str
    source: str  # "folder" | "variant"
    body: str
    priority: int  # nhỏ thắng
    scope: tuple = ()  # biến thể chỉ gắn khi pick nằm trong scope; () = mọi pick
    payload: object = None

    def evidence(self):
        return {"name": self.name, "source": self.source, "token_bound": 0,
                "sha256": hashlib.sha256(self.body.encode("utf-8")).hexdigest()}


def enabled(env=None) -> bool:
    """Flag AI_BOARD_SKILL_SELECT; absent = contract default (off, so prompts stay byte-identical)."""
    spec = limits.contract()["limits"]["skills"]["selection_node"]
    flag = get_settings(env).skill_select
    return bool(limits.tri_state(flag, spec))


def _folder(picks: list, variants: list) -> tuple[list, dict]:
    """Một pick thư mục (cùng topic), rồi biến thể có scope chứa pick đó. Trả (Block đã chọn, report)."""
    picked, report = skill_selection.choose([skill_selection.Candidate(b.name, b.priority, "task-type pick (context score)",
                                                                       counted=False, topic=TASK_PICK, payload=b) for b in picks])
    winner = picked[0].payload.name if picked else None
    attach = [skill_selection.Candidate(v.name, 1 + i, "experiment variant (AI_BOARD_SKILL_VARIANT)", counted=False, payload=v)
              for i, v in enumerate(variants) if winner and v.name != winner and (not v.scope or winner in v.scope)]
    attached, attached_report = skill_selection.choose(attach)
    merged = {"selected": report["selected"] + attached_report["selected"],
              "dropped": report["dropped"] + attached_report["dropped"]}
    return [c.payload for c in picked + attached], merged


def build(role: str, context: dict | None = None, folder: tuple | None = None) -> Selection:
    """Select once, deterministically: defaults + approved admin skills + variants through skill_selection.choose.

    folder = (picks, variants) of context Blocks: one pick plus its variants join the same pin.
    The pin covers the role, each selected skill's evidence (name, version, hash, token bound) and the contract hash,
    so a skill or config change changes it and a resumed attempt can refuse a different selection.
    """
    skills, report = default_skills.select_report(role, context)
    if folder is not None:
        picked, folder_report = _folder(*folder)
        skills = [*skills, *picked]
        report = {"selected": report["selected"] + folder_report["selected"],
                  "dropped": report["dropped"] + folder_report["dropped"]}
    payload = {"role": role, "skills": [skill.evidence() for skill in skills], "config": limits.config_sha256()}
    pin = hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    return Selection(role=role, skills=skills, report=report, pin=pin)


def pin(role: str, context: dict | None = None) -> str:
    return build(role, context).pin
