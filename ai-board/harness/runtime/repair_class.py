"""Deterministic failure class, repair action, involved files and progress metrics for the repair loop."""
from __future__ import annotations

import hashlib
import re

REPAIR_CODE, REPLAN, STOP_ADMIN, RETRY = "repair_code", "replan", "stop_admin", "retry"
_SCOPE = re.compile(r"out of scope|ngoài scope|ScopeViolation|allowed_scope|import cấm", re.I)
_SYNTAX = re.compile(r"SyntaxError|node --check|Unexpected token|Unexpected identifier", re.I)
_MISSING = re.compile(r"Cannot find module '([^']+)'|ERR_MODULE_NOT_FOUND[^\n]*?'([^']+)'", re.I)
_ASSERT = re.compile(r"AssertionError|^\s*not ok\b|^# fail [1-9]|expected", re.I | re.M)
_FAILS = re.compile(r"^# fail (\d+)", re.M)


def _text(result: dict) -> str:
    evidence = (result.get("evidence") or {}).get("text") or ""
    issues = "\n".join(str(issue) for issue in result.get("issues") or [])
    return "\n".join([str(result.get("reason") or ""), evidence, issues])


def involved_files(text: str, produced: dict[str, dict]) -> list[str]:
    """Plan files whose source path, test path or basename appears in the failure text."""
    hits = []
    for file, entry in produced.items():
        names = {file, entry.get("test_file") or "", file.rsplit("/", 1)[-1]} - {""}
        if any(name in text for name in names):
            hits.append(file)
    return hits


def _plan_missing(text: str, scope: set[str]) -> bool:
    """Missing module that no plan step creates: plan references a path nobody owns."""
    for match in _MISSING.finditer(text):
        target = next(group for group in match.groups() if group).replace("/app/", "", 1).lstrip("./")
        if not target.startswith(("node:", "express")) and not any(target.endswith(file) or file.endswith(target) for file in scope):
            return True
    return False


def classify(result: dict, produced: dict[str, dict], scope: set[str]) -> dict:
    """Class + action from gate result evidence; no model. files = involved plan files, [] when unknown."""
    failure_class, reason, text = result.get("failure_class") or "ordinary", str(result.get("reason") or ""), _text(result)
    if failure_class == "transient":
        out = ("infra_transient", RETRY)
    elif failure_class == "plan":
        out = ("plan_inconsistent", REPLAN)
    elif failure_class != "ordinary":
        out = ("scope" if failure_class == "critical" else failure_class, STOP_ADMIN)
    elif _SCOPE.search(text):
        out = ("scope", STOP_ADMIN)
    elif "timed out" in reason:
        out = ("timeout", STOP_ADMIN)
    elif _plan_missing(text, scope):
        out = ("plan_inconsistent", REPLAN)
    elif _SYNTAX.search(text):
        out = ("syntax", REPAIR_CODE)
    elif reason.startswith("feature acceptance failed"):
        out = ("acceptance_command", REPAIR_CODE)
    elif _ASSERT.search(text) or "generated tests failed" in reason:
        out = ("test_assertion", REPAIR_CODE)
    else:
        out = ("unclassified", REPAIR_CODE)
    return {"class": out[0], "action": out[1], "files": involved_files(text, produced) if out[1] == REPAIR_CODE else []}


def metrics(result: dict, diffs: list[dict]) -> dict:
    """Round snapshot: gate reached, failing-test count (None if unreported), diff fingerprint."""
    counts = [int(n) for n in _FAILS.findall(_text(result))]
    digest = hashlib.sha256("\n".join(str(item.get("diff")) for item in diffs or []).encode()).hexdigest()
    return {"gate": result.get("gate"), "fails": max(counts) if counts else None, "diff": digest}


def progressed(before: dict, after: dict) -> bool:
    """Later gate, fewer failing tests, or (same failures) different diff."""
    if (after["gate"] or 0) > (before["gate"] or 0):
        return True
    if before["fails"] is not None and after["fails"] is not None and after["fails"] != before["fails"]:
        return after["fails"] < before["fails"]
    return after["diff"] != before["diff"]


def soft_limit(spec: dict, progress_rounds: int, hard: int) -> int:
    """Repairs allowed now: soft start grown per progress round, never above the hard cap."""
    return min(hard, int(spec["soft_start"]) + int(spec["soft_step"]) * progress_rounds)
