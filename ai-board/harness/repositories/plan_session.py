"""Worker-local planning history keyed by server plan_hash; never sent to the server."""
from __future__ import annotations

import json
import os

from repositories.memory import DEFAULT_PATH
from settings import get_settings

PATH = DEFAULT_PATH.parent / "plan_sessions.json"
APPROVED_PATH = DEFAULT_PATH.parent / "approved_checks.json"
KEEP = 20


def _load(path=None) -> dict:
    try:
        data = json.loads((path or PATH).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    return data if isinstance(data, dict) else {}


def put(plan_hash, session) -> None:
    """Store the capped session under plan_hash, newest KEEP entries kept; no-op with the flag off or a missing key."""
    from gates.plan_rules import SESSION_CHARS
    if not (get_settings().session_plan_execute and plan_hash and session):
        return
    data = _load()
    data.pop(str(plan_hash), None)
    data[str(plan_hash)] = str(session)[-SESSION_CHARS:]
    data = dict(list(data.items())[-KEEP:])
    PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    os.replace(tmp, PATH)


def get(plan_hash) -> str | None:
    """Session stored for exactly this plan_hash; None with the flag off or no match."""
    if not (get_settings().session_plan_execute and plan_hash):
        return None
    value = _load().get(str(plan_hash))
    return value if isinstance(value, str) and value else None


def put_approved(plan_hash, approved, pin) -> None:
    """Store requester-approved checks + pin under plan_hash, newest KEEP kept; no-op with plan_checks off or nothing approved."""
    if not (get_settings().plan_checks and plan_hash and approved and pin):
        return
    data = _load(APPROVED_PATH)
    data.pop(str(plan_hash), None)
    data[str(plan_hash)] = {"checks": approved, "pin": pin}
    data = dict(list(data.items())[-KEEP:])
    APPROVED_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp = APPROVED_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    os.replace(tmp, APPROVED_PATH)


def get_approved(plan_hash) -> dict | None:
    """{'checks', 'pin'} stored for exactly this plan_hash; None with plan_checks off or no match."""
    if not (get_settings().plan_checks and plan_hash):
        return None
    value = _load(APPROVED_PATH).get(str(plan_hash))
    return value if isinstance(value, dict) and value.get("checks") and value.get("pin") else None
