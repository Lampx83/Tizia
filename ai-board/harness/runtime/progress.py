"""Progress and strategy seam read by every gate and node.

Registries are data: a node or task type adds signals without the loop knowing gate names.
Both flags default off; with them off every helper returns empty and nothing is recorded.
"""
from __future__ import annotations

import hashlib
import time
from dataclasses import dataclass, field

from runtime import limits, loop_guard

DEFAULT_TASK = "default"

REASON_NO_PROGRESS = "no_progress"
REASON_SIMILARITY = "similarity"
REASON_STATE_REPEAT = "state_repeat"

REPAIR_CODE, REPLAN, RETRY, STOP_ADMIN = "repair_code", "replan", "retry", "stop_admin"
CHANGE_FILE, RESPLIT, SELECT_SKILL, CHANGE_ROLE, SPLIT, REQUEST_ELEVATION = (
    "change_file", "resplit", "select_skill", "change_role", "split", "request_elevation")
ALLOWED_ACTIONS = frozenset({REPAIR_CODE, REPLAN, RETRY, STOP_ADMIN, CHANGE_FILE, RESPLIT, SELECT_SKILL,
                             CHANGE_ROLE, SPLIT, REQUEST_ELEVATION})
# Never automatic: a permission change, an AI board file, system config, data deletion, a model outside the catalog.
FORBIDDEN_ACTIONS = frozenset({"change_permissions", "edit_ai_board", "change_config", "delete_data", "outside_catalog_model"})

# node -> task type -> signal functions(snapshot) -> {"value": ..., "reason": ...}
SIGNALS: dict[str, dict[str, tuple]] = {}

# failure class -> ordered actions; the first one not tried with the same input wins
ACTIONS: dict[str, tuple[str, ...]] = {
    "syntax": (REPAIR_CODE, CHANGE_FILE, REPLAN, STOP_ADMIN),
    "test_assertion": (REPAIR_CODE, CHANGE_FILE, REPLAN, STOP_ADMIN),
    "acceptance_command": (REPAIR_CODE, CHANGE_FILE, REPLAN, STOP_ADMIN),
    "unclassified": (REPAIR_CODE, CHANGE_FILE, REPLAN, STOP_ADMIN),
    "scope": (CHANGE_FILE, REQUEST_ELEVATION, STOP_ADMIN),
    "grounding": (REPLAN, CHANGE_FILE, SELECT_SKILL, STOP_ADMIN),
    "plan_inconsistent": (REPLAN, SPLIT, STOP_ADMIN),
    "infra_transient": (RETRY, STOP_ADMIN),
    "timeout": (RETRY, STOP_ADMIN),
    "budget": (REQUEST_ELEVATION, STOP_ADMIN),
    "unknown": (REPAIR_CODE, STOP_ADMIN),
}


def _norm(text: str) -> str:
    """Diff text with whitespace collapsed, so a format-only edit is not a new diff."""
    return " ".join(str(text).split())


def signals(node: str, task_type: str = DEFAULT_TASK) -> tuple:
    """Signals registered for a node and task type; empty tuple when nobody registered any."""
    return SIGNALS.get(node, {}).get(task_type, ())


def enabled(env=None) -> bool:
    """True when the progress loop flag is on; contract default when no env override."""
    return limits.progress(env)["enabled"]


def choose(failure_class: str, tried=(), env=None) -> dict | None:
    """First allowed action for the failure class that is not in `tried`; None when off or unmapped."""
    if not enabled(env):
        return None
    used = {item if isinstance(item, str) else item.get("action") for item in tried}
    for action in ACTIONS.get(failure_class, ()):
        if action in FORBIDDEN_ACTIONS or action not in ALLOWED_ACTIONS or action in used:
            continue
        return {"class": failure_class, "action": action, "reason": f"{failure_class} -> {action}"}
    return None


def can_split(children: int, env=None) -> bool:
    """True while the plan still has child tickets left under the contract cap."""
    return int(children or 0) < int(limits.progress(env)["max_children"])


def record(trace, *, node: str, failure_class: str | None = None, action: str | None = None,
           window=(), env=None) -> None:
    """One compact progress span; no-op when the flag is off or there is no tracer."""
    if trace is None or not enabled(env) or not hasattr(trace, "add_span"):
        return
    now = int(time.time() * 1000)
    trace.add_span("progress.decision", {"tizia.progress.node": node, "tizia.progress.failure_class": failure_class,
                                         "tizia.strategy.action": action, "tizia.progress.window": list(window)},
                   start_ms=now, end_ms=now)


def verdict_fields(env=None, window: "Window | None" = None) -> dict:
    """Progress and strategy fields of the run evidence; empty when the flag is off."""
    if not enabled(env):
        return {}
    sn = window.snapshot() if window is not None else {"signals": [], "window": []}
    return {"progress": sn, "strategy": window.strategy() if window is not None else None}


@dataclass
class Window:
    """Sliding progress window: one vector per step, no model, no clock."""

    window: int = 3
    min_signals: int = 1
    repeat_hash: int = 2
    similarity: float = 0.98
    max_chars: int = 20000
    tried: list[str] = field(default_factory=list)
    steps: list[dict] = field(default_factory=list)
    diffs: list[str] = field(default_factory=list)
    reason: str | None = None
    signature: str = ""

    def step(self, *, fails=None, gate=None, check=None, diff: str = "", evidence=(), state: str = "") -> dict:
        """Record one step; return progress signals and the stagnation verdict (latest reason wins)."""
        prev = self.steps[-1] if self.steps else None
        signals = []
        if prev is not None:
            if prev["fails"] is not None and fails is not None and fails < prev["fails"]:
                signals.append(f"fails {prev['fails']}->{fails}")
            if prev["gate"] is not None and gate is not None and gate > prev["gate"]:
                signals.append(f"gate {prev['gate']}->{gate}")
            if prev["check"] == "fail" and check == "pass":
                signals.append("check fail->pass")
            if diff and _norm(diff) != _norm(prev["diff_text"]):
                signals.append("diff changed")
        seen = {item for record in self.steps[-self.window:] for item in record["evidence"]}
        fresh = tuple(item for item in evidence or () if item not in seen)
        if prev is not None and fresh:
            signals.append("evidence new")
        record = {"fails": fails, "gate": gate, "check": check, "diff": hashlib.sha256(diff.encode()).hexdigest()[:12],
                  "diff_text": diff, "evidence": fresh, "state": state,
                  "progress": len(signals) >= self.min_signals, "signals": signals}
        self.steps.append(record)
        self.diffs.append(diff)
        self.reason = self._stagnant(record, diff)
        return {"progress": record["progress"], "signals": signals, "stagnant": self.reason is not None,
                "reason": self.reason, "window": self.snapshot()["window"]}

    def _stagnant(self, record: dict, diff: str) -> str | None:
        if record["state"] and sum(1 for item in self.steps if item["state"] == record["state"]) >= self.repeat_hash:
            return REASON_STATE_REPEAT
        if len(self.diffs) >= 2 and self.diffs[-2] and diff and loop_guard.similarity(self.diffs[-2], diff, self.max_chars) > self.similarity:
            return REASON_SIMILARITY
        recent = self.steps[-self.window:]
        if len(recent) >= self.window and not any(item["progress"] for item in recent):
            return REASON_NO_PROGRESS
        return None

    def reset(self) -> None:
        """New window after a real change; tried strategies survive so they are not repeated."""
        self.steps.clear()
        self.diffs.clear()
        self.reason = None

    def allow_strategy(self, signature: str) -> None:
        """A changed failure signature clears the tried list; the same input keeps it."""
        if signature != self.signature:
            self.tried.clear()
            self.signature = signature

    def strategy(self) -> str | None:
        """Latest strategy that changed the approach, or None while the window has none."""
        return self.tried[-1] if self.tried else None

    def snapshot(self) -> dict:
        """Compact evidence: signal names and step fingerprints, never raw diff text."""
        return {"signals": [s for item in self.steps[-self.window:] for s in item["signals"]],
                "window": [f"g{item['gate']} f{item['fails']} {item['diff']}" for item in self.steps[-self.window:]],
                **({"reason": self.reason} if self.reason else {})}
