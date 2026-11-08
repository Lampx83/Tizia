"""Stop class, tried/blocked render, next-step route, stop metrics. Reporting only; flag AI_BOARD_STOP_REPORT_V2."""
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


_NEXT = {
    "human_review": ("needs_review", "Cần người duyệt: board dừng vì thay đổi nằm ở vùng cần review."),
    "needs_clarification": ("clarify", "Cần làm rõ yêu cầu: bổ sung mục tiêu hoặc phạm vi rồi gửi lại."),
    "plan_invalid": ("claude_code_queue", "Board chưa lập được kế hoạch an toàn: chuyển hàng chờ Claude Code."),
    "check_failed": ("claude_code_queue", "Code chưa qua kiểm tra: chuyển hàng chờ Claude Code."),
    "budget": ("claude_code_queue", "Hết ngân sách trước khi xong: chuyển hàng chờ Claude Code."),
    "infra": ("retry", "Lỗi hạ tầng tạm thời: thử lại sau."),
    "model_limit": ("claude_code_queue", "Model chưa tự làm được: chuyển hàng chờ Claude Code."),
}


def next_step(cls) -> dict:
    """Route + requester-facing message for stop class."""
    route, message = _NEXT[cls]
    return {"route": route, "message": message}


def build(outcome, reason, gate, failure_class, gates_tried) -> dict:
    cls = classify(outcome, reason, gate, failure_class)
    return {"class": cls, "tried": list(gates_tried), "blocked_gate": gate, "reason": str(reason or "")[:300],
            "next_step": next_step(cls)}


def render(report: dict) -> str:
    tried = ", ".join(str(g) for g in report["tried"])
    return (f"stop[{report['class']}] tried gates {tried}; blocked at gate {report['blocked_gate']}: {report['reason']}"
            + (f"; next: {report['next_step']['route']}" if report.get("next_step") else ""))


def stop_metrics(rows) -> dict:
    """Rows {should_stop, outcome, stop_class} -> correct-stop / wrong-ship / budget counts and rates."""
    should = [r for r in rows if r.get("should_stop")]
    def stopped(r):
        return r.get("outcome") in ("blocked", "needs_review")

    budget = [r for r in rows if r.get("stop_class") == "budget"]
    correct = [r for r in should if stopped(r) and r.get("stop_class") != "budget"]
    wrong = [r for r in should if r.get("outcome") == "ready_for_pr"]
    over = [r for r in rows if not r.get("should_stop") and stopped(r) and r.get("stop_class") != "budget"]
    n = len(should)
    return {"should_stop": n, "correct_stop": len(correct), "wrong_ship": len(wrong), "budget_exhausted": len(budget),
            "over_stop": len(over), "correct_stop_rate": len(correct) / n if n else None,
            "wrong_ship_rate": len(wrong) / n if n else None}
