"""best_match policy shared by gates 1 and 2.5: reject by default, record-only when AI_BOARD_BEST_MATCH=advisory."""
from __future__ import annotations

import os

ADVISORY = "advisory"
REASON_CODE = "best_match_advisory"


def mode() -> str:
    """Env AI_BOARD_BEST_MATCH; anything but `advisory` = enforce (empty string)."""
    value = os.environ.get("AI_BOARD_BEST_MATCH", "").strip().lower()
    return ADVISORY if value == ADVISORY else ""


def enforce(best_match, plan_files, message: str, judge) -> None:
    """Raise ValueError(message) if plan misses best_match; advisory mode records mismatch via judge instead."""
    if not best_match or best_match in plan_files:
        return
    if mode() != ADVISORY:
        raise ValueError(message)
    judge("best_match", True, f"{REASON_CODE}: recommended {best_match}; plan edits {', '.join(sorted(plan_files)) or '(none)'}")
