"""Stop class + tried/blocked render (LF/162). Reporting only; flag AI_BOARD_STOP_REPORT_V2."""
from settings import get_settings

CLASSES = ("human_review", "needs_clarification", "plan_invalid", "check_failed", "budget", "infra", "model_limit")
PLAN_OUTCOMES = {"plan_unfit", "plan_ungrounded", "plan_target_uncertain", "validator_disagreement", "complexity_gated"}


def enabled(env=None) -> bool:
    return get_settings(env).stop_report_v2


def classify(outcome, reason, gate, failure_class) -> str:
    outcome, reason = outcome or "", reason or ""
    if failure_class == "budget" or outcome == "budget_exhausted" or reason.startswith("budget exhausted"):
        return "budget"
    if (outcome in ("intake_human_review", "intake_reject", "intake_critical", "elevation_required")
            or "privileged_area" in reason or "human review" in reason or "needs_review" in reason):
        return "human_review"
    if outcome in ("needs_clarification", "intake_needs_info"):
        return "needs_clarification"
    if outcome.startswith("error_gate") or failure_class == "transient" or "timeout" in reason.lower():
        return "infra"
    if gate in (1, 2, 2.5) or outcome in PLAN_OUTCOMES:
        return "plan_invalid"
    if gate in (4, 5, 5.5):
        return "check_failed"
    return "model_limit"


def build(outcome, reason, gate, failure_class, gates_tried) -> dict:
    return {"class": classify(outcome, reason, gate, failure_class), "tried": list(gates_tried),
            "blocked_gate": gate, "reason": str(reason or "")[:300]}


def render(report: dict) -> str:
    tried = ", ".join(str(g) for g in report["tried"])
    return f"stop[{report['class']}] tried gates {tried}; blocked at gate {report['blocked_gate']}: {report['reason']}"
