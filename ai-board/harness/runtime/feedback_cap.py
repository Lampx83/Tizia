"""Cap on repeats of one failure kind per gate; stop report fields. Flag AI_BOARD_GATE_FEEDBACK_CAP."""
from settings import get_settings

CAP = 3
EVIDENCE_LIMIT = 500


def enabled() -> bool:
    return get_settings().gate_feedback_cap


def prior(repairs: list[dict], gate, kind: str) -> int:
    """Feedbacks already returned for this (gate, kind)."""
    return sum(1 for r in repairs if r.get("kind") == kind and r.get("gate") == gate)


def stop_fields(gate, kind: str, count: int, evidence) -> dict:
    text = str((evidence or {}).get("text") or "") if isinstance(evidence, dict) else ""
    return {"gate": gate, "kind": kind, "count": count, "evidence": text.strip()[-EVIDENCE_LIMIT:]}
