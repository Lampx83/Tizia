"""Network request queue: model-facing tools, missing-package detector, decision to observation, broker stub."""
from __future__ import annotations

import hashlib
import json
import re

TOOLS = ("request_package", "fetch_url")
PACKAGE_REQUEST = "package_request"
FAILURE_CLASS = "network_request"
BROKER_UNAVAILABLE = "broker unavailable"
EVAL_REASON = "network requests are disabled in evaluation"
NO_QUEUE_REASON = "network requests are not available here"
APPROVED, REJECTED = "approved", "rejected"

_MISSING = re.compile(r"Cannot find (?:module|package) '([^']+)'|ERR_MODULE_NOT_FOUND[^\n]*?'([^']+)'", re.I)
_PACKAGE = re.compile(r"(?:@[a-z0-9~._-]+/)?[a-z0-9~._-]+(?:/[a-z0-9~._/-]+)?$", re.I)
_FILE = re.compile(r"\.(?:m?js|cjs|json|html|css|ts|node)$", re.I)
_INSTALLED = ("express",)
_BUILTIN = frozenset("assert buffer child_process crypto events fs http https net os path stream url util zlib readline "
                     "module process timers tty vm worker_threads perf_hooks dns cluster v8".split())


def package_name(target: str, scope=()) -> str | None:
    """Bare npm specifier -> package name; None for plan paths, node: builtins, installed deps."""
    if target.startswith((".", "/", "node:")) or _FILE.search(target) or not _PACKAGE.match(target):
        return None
    parts = target.split("/")
    if not target.startswith("@") and len(parts) > 1:
        return None
    name = "/".join(parts[:2]) if target.startswith("@") else parts[0]
    if name in _BUILTIN or name.startswith(_INSTALLED) or any(file.endswith(target) for file in scope):
        return None
    return name


def missing_package(text: str, scope=()) -> str | None:
    """First `Cannot find module 'x'` in text whose x is an npm package, else None."""
    for match in _MISSING.finditer(text or ""):
        if name := package_name(next(group for group in match.groups() if group), scope):
            return name
    return None


_CALL = re.compile(r"""(?:fetch|axios(?:\.\w+)?|https?\.(?:get|request)|got|request)\s*\(\s*["'`]https?://([^/"'`:?#\s]+)""", re.I)
_LOCAL = re.compile(r"(?:localhost|127\.0\.0\.1|\[::1\]|.*\.(?:localhost|test))$", re.I)


def real_api_call(test_text: str) -> str | None:
    """Host of the first absolute http(s) call in test code that is not loopback/.test; None when hermetic."""
    return next((host for host in _CALL.findall(test_text or "") if not _LOCAL.match(host)), None)


def package_call_id(name: str) -> str:
    return f"pkg:{name}"


def package_request(name: str, reason: str = "missing module detected in gate output") -> dict:
    return {"kind": "package", "name": name, "version_range": "latest", "reason": reason, "call_id": package_call_id(name)}


def tool_request(tool: str, args: dict) -> dict:
    """Request keyed by content, so a resumed run (new run id) and a repeated identical ask hit the same decision."""
    call_id = "net:" + hashlib.sha256(json.dumps([tool, args], sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:16]
    if tool == "request_package":
        return {"kind": "package", "name": args["name"], "version_range": args["version_range"],
                "reason": args["reason"], "call_id": call_id}
    return {"kind": "fetch_url", "url": args["url"], "reason": args["reason"], "call_id": call_id}


def denied(reason: str | None) -> str:
    return f"denied: {reason or 'no reason given'}"


class UnavailableBroker:
    """Stand-in when no broker is configured."""

    def resolve(self, request: dict) -> dict:
        return {"decision": "unavailable", "reason": BROKER_UNAVAILABLE, "metadata": {}}


class Queue:
    """Per-run network state: admin decisions by call id, new pending requests, eval auto-deny count."""

    def __init__(self, decisions: dict | None = None, *, eval_mode: bool = False, broker=None):
        self.decisions, self.eval_mode, self.broker = dict(decisions or {}), eval_mode, broker or UnavailableBroker()
        self.pending: list[dict] = []
        self.approved: list[dict] = []
        self.auto_denied = 0

    def settled(self, call_id: str) -> bool:
        return self.eval_mode or call_id in self.decisions

    def observe(self, request: dict) -> str | None:
        """Observation text once decided (or auto-denied in eval); None queues the request and means pause."""
        if self.eval_mode:
            self.auto_denied += 1
            return denied(EVAL_REASON)
        decision = self.decisions.get(request["call_id"])
        if decision is None:
            if request["kind"] == "package" and hasattr(self.broker, "screen"):
                screened = self.broker.screen(request)
                if screened["decision"] == REJECTED:
                    return denied(screened["reason"])
                request = {**request, "metadata": screened["metadata"]} if screened["metadata"] else request
            if all(item["call_id"] != request["call_id"] for item in self.pending):
                self.pending.append(request)
            return None
        if decision.get("decision") == REJECTED:
            return denied(decision.get("reason"))
        result = self.broker.resolve(request)
        if result.get("decision") == APPROVED and result.get("diff"):
            if all(item["call_id"] != request["call_id"] for item in self.approved):
                self.approved.append({"call_id": request["call_id"], "name": request["name"], "diff": result["diff"],
                                      "layer_key": result.get("layer_key"), "metadata": result.get("metadata") or {}})
            return str(result["reason"])
        reason = str(result.get("reason") or BROKER_UNAVAILABLE)
        return denied(reason) if result.get("decision") == REJECTED else reason

    def report(self) -> dict:
        return {"pending": list(self.pending), "auto_denied": self.auto_denied, "dependencies": list(self.approved)}
