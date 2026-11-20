"""Deterministic ready check: requester literal verbatim in added lines, only planned files changed."""
from gates import static_check
from runtime import subtask_files
from verification import functional
from verification.guest_inputs import GuestInputMissing

NO_ORACLE = "no deterministic check: the request pins no literal text"


def _fail(reason: str) -> dict:
    return {"passed": False, "reason": reason[:400]}


def _changed(state: dict) -> set[str]:
    return {str(path).replace("\\", "/") for item in state.get("diffs") or []
            for path in (item.get("file"), *(item.get("extra_files") or [])) if path}


def check(state: dict | None) -> dict:
    """{'passed', 'reason'}: reason empty on pass; model-written tests are not consulted."""
    state = state or {}
    try:
        want = functional.text_expectation(state)
        anchor = functional.anchor(state)
    except GuestInputMissing:
        return _fail(NO_ORACLE)
    pairs = functional.replace_pairs(state)
    # A replace pins both sides even when keep-as-is quotes defeat the strict pair parse.
    present = [new for _, new in pairs] or [text for text in want["present"] if text != anchor and not functional._is_css_selector(text)]
    absent = [old for old, _ in pairs] or want["absent"]
    diffs = state.get("full_diff") or state.get("diffs") or []
    if not (present or absent):
        return _fail(NO_ORACLE)
    if not diffs:
        return _fail("no deterministic check: no diff to inspect")
    text = "".join(str(item.get("diff") or "") for item in diffs)
    misses = static_check.literal_misses(state, text, state.get("full_checkout"))
    if misses:
        return _fail(misses[0])
    hunks = static_check._hunks(text)
    lines = lambda sign: [line for _, hunk in hunks for s, line in hunk if s == sign]
    added, removed = lines("+"), lines("-")
    for literal in map(static_check._ws, present):
        if not any(literal in line for line in added):
            return _fail(f'requester literal "{literal}" is not in the added lines')
    for literal in map(static_check._ws, absent):
        if any(literal in line for line in added) or not any(literal in line for line in removed):
            return _fail(f'requester text "{literal}" must be removed and not added back')
    planned = {path for task in (state.get("plan") or {}).get("subtasks") or [] for path in subtask_files.files_of(task)}
    stray = sorted(_changed(state) - planned)
    if stray:
        return _fail(f"files changed beyond the named files: {', '.join(stray)}")
    return {"passed": True, "reason": ""}
