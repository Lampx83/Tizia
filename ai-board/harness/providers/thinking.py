"""Single source: thinking on/off and token budget per role. Precedence: caller force_thinking > split role table > REASONING_OFF > catalog `reasoning`."""
from __future__ import annotations

from settings import get_settings

TOOL_ROLES = ("gate3_light", "gate3_heavy")
SPLIT_ON_ROLES = ("gate1", "gate4_review")
_INTERNAL = ("force_thinking", "max_total_output_tokens")


def budget_enabled() -> bool:
    """Flag AI_BOARD_THINKING_BUDGET: answer cap + separate reasoning budget."""
    return get_settings().thinking_budget


def _catalog(role: str, routing) -> bool:
    return bool(routing and routing.reasoning(role))


def effective(role: str, routing, *, split: bool = False, structured: bool = False, extra: dict | None = None) -> bool:
    """Thinking value for role; split = system/user prompt mode."""
    if extra and "force_thinking" in extra:
        return bool(extra["force_thinking"])
    if split:
        if structured:
            return False
        if role in SPLIT_ON_ROLES:
            return True
        if role in TOOL_ROLES:
            return bool(((routing.sampling(role) if routing else None) or {}).get("thinking", False))
    return _catalog(role, routing)


def reasoning_budget(role: str, routing) -> int:
    """Reasoning tokens on top of the answer cap; catalog `thinking_budget[role]` overrides the shared default."""
    per_role = ((routing.catalog.get("thinking_budget") or {}).get(role)) if routing else None
    return int(per_role) if per_role is not None else routing.reasoning_tokens()


def apply(role: str, routing, extra: dict | None, options: dict) -> tuple[dict, dict]:
    """(extra, options) for a vLLM call: internal markers stripped, `thinking` explicit, num_predict sized for reasoning."""
    think = effective(role, routing, extra=extra)
    call_extra = {**{k: v for k, v in (extra or {}).items() if k not in _INTERNAL}, "thinking": think}
    if not think:
        return call_extra, options
    cap = (extra or {}).get("max_total_output_tokens")
    if budget_enabled():
        answer = int(cap if cap is not None else options.get("num_predict") or 0)
        return call_extra, {**options, "num_predict": answer + reasoning_budget(role, routing)}
    total = cap if cap is not None else int(options.get("num_predict") or 0) + routing.reasoning_tokens()
    return call_extra, {**options, "num_predict": total}
