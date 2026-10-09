"""Context ablation arms for gate 3. Patches the running process only; one arm per run, recorded in the run name and run.json."""
from __future__ import annotations

from gates import implement

ARMS = ("default", "fullfile", "nosiblings", "hybrid")
HYBRID_MAX_CHARS = 60_000
_ORIGINAL = {"gate3_context": implement.gate3_context, "siblings": implement._siblings}


def _numbered(content: str) -> str:
    return "\n".join(f"L{n}| {line}" for n, line in enumerate(content.splitlines(), 1))


def _fullfile(subtask, state, current, siblings, words):
    if current is None:
        return None, [], None
    header = f"(file {len(current.splitlines())} dòng; toàn bộ file)"
    return f"{header}\n{_numbered(current)}", [], None


def _hybrid(subtask, state, current, siblings, words):
    if current is not None and len(current) > HYBRID_MAX_CHARS:
        return _ORIGINAL["gate3_context"](subtask, state, current, siblings, words)
    return _fullfile(subtask, state, current, siblings, words)


def apply(arm: str) -> None:
    if arm not in ARMS:
        raise ValueError(f"unknown context arm {arm}")
    implement.gate3_context = _ORIGINAL["gate3_context"]
    implement._siblings = _ORIGINAL["siblings"]
    if arm == "fullfile":
        implement.gate3_context = _fullfile
    elif arm == "hybrid":
        implement.gate3_context = _hybrid
    elif arm == "nosiblings":
        implement._siblings = lambda *_a, **_k: []
