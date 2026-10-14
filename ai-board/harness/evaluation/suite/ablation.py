"""Context ablation arms for gate 3 (default = production: hybrid, hybrid arm kept as its alias). Patches the running process only; one arm per run, recorded in the run name and run.json."""
from __future__ import annotations

import threading

import context
from gates import implement

ARMS = ("default", "excerpt", "fullfile", "nosiblings", "hybrid", "norepomap")
_ORIGINAL = {"gate3_context": implement.gate3_context, "siblings": implement._siblings, "calls": context._calls, "build": context.build_context}
_GATE = threading.local()


def _build_marked(gate, *args, **kwargs):
    _GATE.number = gate
    try:
        return _ORIGINAL["build"](gate, *args, **kwargs)
    finally:
        _GATE.number = None


def _calls_without_repomap(*args, **kwargs):
    calls = _ORIGINAL["calls"](*args, **kwargs)
    return [c for c in calls if not (c[0] == "repomap" and getattr(_GATE, "number", None) == 1)]


def apply(arm: str) -> None:
    if arm not in ARMS:
        raise ValueError(f"unknown context arm {arm}")
    implement.gate3_context = _ORIGINAL["gate3_context"]
    implement._siblings = _ORIGINAL["siblings"]
    context._calls = _ORIGINAL["calls"]
    context.build_context = _ORIGINAL["build"]
    if arm == "fullfile":
        implement.gate3_context = implement.whole_file_context
    elif arm == "excerpt":
        implement.gate3_context = implement.excerpt_context
    elif arm == "norepomap":
        context._calls = _calls_without_repomap
        context.build_context = _build_marked
    elif arm == "nosiblings":
        implement._siblings = lambda *_a, **_k: []
