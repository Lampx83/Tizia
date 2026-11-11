"""Deterministic loop detection: state hash repeats, repair stagnation. No model, no clock."""
from __future__ import annotations

import hashlib
import os
from difflib import SequenceMatcher

REASON_STATE_REPEAT = "state_repeat"
REASON_NODE_TIMEOUT = "node_wall_clock_s"
REASON_STAGNATION = "stagnation"
REPAIR_WINDOW_FLAG = "AI_BOARD_REPAIR_STAGNATION_WINDOW"


def state_hash(code: str, error: str, signature: str = "") -> str:
    """Hash of (code, error, block signature); equal hash = byte-identical retry."""
    digest = hashlib.sha256()
    for part in (code, error, signature):
        digest.update(str(part).encode())
        digest.update(b"\0")
    return digest.hexdigest()


def repeated(hashes: list[str], current: str, count: int) -> bool:
    """True when `current` has already been seen count-1 times (default 2: second sighting)."""
    return count >= 2 and hashes.count(current) >= count - 1


def similarity(before: str, after: str, max_chars: int) -> float:
    """SequenceMatcher ratio of two texts, tails beyond max_chars ignored; quick bounds first."""
    a, b = before[:max_chars], after[:max_chars]
    if a == b:
        return 1.0
    matcher = SequenceMatcher(None, a, b, autojunk=False)
    return matcher.ratio() if matcher.real_quick_ratio() >= .5 and matcher.quick_ratio() >= .5 else 0.0


def stagnant(texts: list[str], threshold: float, window: int, max_chars: int) -> float | None:
    """Lowest similarity over the last `window` consecutive pairs when all exceed threshold, else None."""
    if window < 1 or len(texts) < window + 1:
        return None
    ratios = [similarity(texts[i], texts[i + 1], max_chars) for i in range(len(texts) - window - 1, len(texts) - 1)]
    return min(ratios) if all(r > threshold for r in ratios) else None


def repair_window(default: int, env=None) -> int:
    """Stagnation window: contract default unless flag holds a positive int."""
    raw = str((os.environ if env is None else env).get(REPAIR_WINDOW_FLAG, "")).strip()
    return int(raw) if raw.isdigit() and int(raw) >= 1 else default
