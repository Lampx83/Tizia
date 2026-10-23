"""Soft per-subtask budget for the tool loop: grows on progress, stops when stuck. Off unless AI_BOARD_ADAPTIVE_BUDGET=1."""
from __future__ import annotations

import json
from dataclasses import dataclass

from runtime import limits

READS = frozenset({"read_file"})
EDITS = frozenset({"edit_file"})
CHECKS = frozenset({"run_check"})
SANDBOX = frozenset({"run_in_sandbox"})


@dataclass(frozen=True)
class Continue:
    pass


@dataclass(frozen=True)
class Stop:
    reason: str
    failure_class: str = "ordinary"


class LoopBudget:
    """Soft step budget for one subtask; step() takes each finished tool turn."""

    def __init__(self, spec: dict, ceiling: int):
        self.spec, self.ceiling = spec, ceiling
        self.steps = self.progress = self.idle = self.repeats = 0
        self.last_sig = None
        self.seen_reads: set[str] = set()
        self.receipt_state: dict[str, tuple] = {}

    def soft_limit(self) -> int:
        return min(self.ceiling, self.spec["soft_start"] + self.spec["soft_step"] * self.progress)

    def allow(self) -> bool:
        return self.steps < self.soft_limit()

    def step(self, tool: str, args: dict, observation: str, *, ok: bool = True):
        sig = None if tool == "finish" else json.dumps([tool, args], sort_keys=True, ensure_ascii=False)
        self.steps += 1
        self.repeats = self.repeats + 1 if sig is not None and sig == self.last_sig else 0
        self.last_sig = sig
        if self.repeats >= self.spec["same_call_repeats"]:
            return Stop(f"model lặp lại đúng một request {self.repeats + 1} lần ({tool})")
        if tool == "finish":
            return Continue()
        if ok and self._progressed(tool, sig, observation):
            self.progress += 1
            self.idle = 0
        else:
            self.idle += 1
        if self.idle >= self.spec["no_progress_steps"]:
            return Stop(f"{self.idle} lượt liên tiếp không có tiến triển ({tool})")
        return Continue()

    def _progressed(self, tool: str, sig: str, observation: str) -> bool:
        if tool in READS:
            fresh = sig not in self.seen_reads
            self.seen_reads.add(sig)
            return fresh
        if tool in EDITS:
            return True
        if tool in CHECKS:
            return self._receipt_changed(tool, observation, ("passed", "exit_code"))
        if tool in SANDBOX:
            return self._receipt_changed(tool, observation, ("rc", "stdout", "stderr"))
        return False

    def _receipt_changed(self, tool: str, observation: str, keys: tuple) -> bool:
        """Kết quả khác lần trước của cùng tool mới là tiến triển; lặp lại kết quả cũ thì không."""
        try:
            receipt = json.loads(observation)
        except ValueError:
            return False
        if not isinstance(receipt, dict) or not all(key in receipt for key in keys):
            return False
        state = tuple(receipt.get(key) for key in keys)
        changed = state != self.receipt_state.get(tool)
        self.receipt_state[tool] = state
        return changed


def make_adaptive(ceiling: int, env=None) -> LoopBudget | None:
    """LoopBudget when flag on, else None (caller keeps fixed caps); ceiling = hard model_calls cap."""
    spec = limits.loop_adaptive(env)
    return LoopBudget(spec, ceiling) if spec["enabled"] else None
