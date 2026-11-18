"""Deterministic failure class, repair action, involved files and progress metrics for the repair loop."""
from __future__ import annotations

import hashlib
import re
import shlex

from runtime import network_request
from settings import get_settings
from verification import checks

REPAIR_CODE, REPLAN, STOP_ADMIN, RETRY = "repair_code", "replan", "stop_admin", "retry"
_SCOPE = re.compile(r"out of scope|ngoài scope|ScopeViolation|allowed_scope|import cấm", re.I)
_SYNTAX = re.compile(r"SyntaxError|node --check|Unexpected token|Unexpected identifier", re.I)
_MISSING = re.compile(r"Cannot find module '([^']+)'|ERR_MODULE_NOT_FOUND[^\n]*?'([^']+)'", re.I)
_ASSERT = re.compile(r"AssertionError|^\s*not ok\b|^# fail [1-9]|expected", re.I | re.M)
_FAILS = re.compile(r"^# fail (\d+)", re.M)
_ACCEPTANCE = "feature acceptance failed:"
_SHELL_BROKEN = re.compile(
    r"\bsh: [^\n]*(syntax error|unterminated|unexpected)|unterminated quoted string|"
    r"\bgrep: [^\n]*(unmatched|unrecognized option|invalid option|trailing backslash)|usage: grep", re.I)


def broken_check(reason: str, text: str) -> bool:
    """Acceptance command failed because the command itself is malformed, not because the code is wrong."""
    if not reason.startswith(_ACCEPTANCE):
        return False
    if _SHELL_BROKEN.search(reason) or _SHELL_BROKEN.search(text):
        return True
    rest = reason[len(_ACCEPTANCE):].strip()
    cuts = [i for i in range(len(rest)) if rest.startswith(" | ", i)]
    for candidate in [rest[:i] for i in reversed(cuts)] + [rest]:
        try:
            shlex.split(candidate)
            return False
        except ValueError:
            continue
    return True


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


def _plan_missing(text: str, scope: set[str], project: network_request.Project) -> bool:
    """Missing module that no plan step creates: plan references a path nobody owns."""
    for match in _MISSING.finditer(text):
        raw = next(group for group in match.groups() if group)
        if raw.startswith(("./", "/")):
            if network_request.module_kind(raw.removeprefix("/app/").removeprefix("./"), scope, project) != "owned":
                return True
        elif network_request.module_kind(raw, scope, project) == "plan":
            return True
    return False


def classify(result: dict, produced: dict[str, dict], scope: set[str], settled=(),
             project: network_request.Project = network_request.Project()) -> dict:
    """Class + action from gate result evidence; no model. files = involved plan files, [] when unknown.
    Missing npm package -> package_request/stop_admin unless already decided (`settled` names).
    `project` (deps + repo roots at the base sha) decides installed/builtin modules vs. packages."""
    failure_class, reason, text = result.get("failure_class") or "ordinary", str(result.get("reason") or ""), _text(result)
    if failure_class == "transient":
        out = ("infra_transient", RETRY)
    elif failure_class == "plan":
        out = ("plan_inconsistent", REPLAN)
    elif failure_class != "ordinary":
        out = ("scope" if failure_class == "critical" else failure_class, STOP_ADMIN)
    elif reason.startswith(checks.SUSPECT_STOP):
        out = (checks.CHECK_SUSPECT, STOP_ADMIN)
    elif _SCOPE.search(text):
        out = ("scope", STOP_ADMIN)
    elif "timed out" in reason:
        out = ("timeout", STOP_ADMIN)
    elif _plan_missing(text, scope, project):
        out = ("plan_inconsistent", REPLAN)
    elif (package := network_request.missing_package(text, scope, project)) and package not in settled:
        out = (network_request.PACKAGE_REQUEST, STOP_ADMIN)
    elif _SYNTAX.search(text):
        out = ("syntax", REPAIR_CODE)
    elif get_settings().repair_skip_broken_check and broken_check(reason, text):
        out = ("broken_check", STOP_ADMIN)
    elif reason.startswith("feature acceptance failed"):
        out = ("acceptance_command", REPAIR_CODE)
    elif _ASSERT.search(text) or "generated tests failed" in reason:
        out = ("test_assertion", REPAIR_CODE)
    else:
        out = ("unclassified", REPAIR_CODE)
    found = {"package": package} if out[0] == network_request.PACKAGE_REQUEST else {}
    return {"class": out[0], "action": out[1], "files": involved_files(text, produced) if out[1] == REPAIR_CODE else [], **found}


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
