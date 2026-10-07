"""Stateless private HTTP adapter; durable jobs and permissions stay in the host app."""
from __future__ import annotations

import os
import json
import secrets
import subprocess
import threading
import time
import uuid
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field


class PlanningInput(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    project: str = Field(min_length=1, max_length=80)
    snapshot: dict
    timeout_s: int = Field(default=900, ge=1, le=900)
    budget_limit: int | None = Field(default=None, gt=0, le=100000)


class RequestInput(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    id: int = Field(gt=0)
    title: str = Field(min_length=1, max_length=200)
    detail: str = Field(default="", max_length=2000)
    domain: str = Field(min_length=1, max_length=80)
    type: Literal["bug", "feature", "game", "theory", "lab", "skill", "other"] = "feature"
    student: str | None = Field(default=None, max_length=80)
    clarified_spec: str | None = Field(default=None, max_length=2000)
    votes: int = Field(default=1, ge=0, le=1000000)


class PlanningResult(BaseModel):
    trace_id: str
    status: Literal["completed", "blocked"]
    plan: dict | None = None
    budget_used: int = 0
    gate: float | None = None
    message: str | None = None
    reason: str | None = Field(default=None, max_length=300)
    signals: list[str] = Field(default_factory=list, max_length=32)
    advisory_plan: str | None = Field(default=None, max_length=2000)
    skill: str | None = Field(default=None, max_length=80)
    events: list[dict] = Field(default_factory=list)
    calls: list[dict] = Field(default_factory=list, max_length=5)


class DeadlineExceeded(Exception):
    pass


class BodyLimit:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope["method"] != "POST":
            return await self.app(scope, receive, send)
        body = bytearray()
        while True:
            message = await receive()
            if message["type"] == "http.disconnect":
                return
            chunk = message.get("body", b"")
            if len(body) + len(chunk) > 16384:
                return await JSONResponse({"detail": "body_too_large"}, status_code=413)(scope, receive, send)
            body.extend(chunk)
            if not message.get("more_body"):
                break
        async def replay():
            return {"type": "http.request", "body": bytes(body), "more_body": False}
        await self.app(scope, replay, send)


def plan_operation(snapshot, workspace, checkpoint):
    """Use HttpWorker's existing planner, with deadline checks between its gates."""
    from worker import HarnessPlanner, PlanBlockedError, _load_harness
    _load_harness()
    from meter import Tracer, redact

    collected = []
    tracer = Tracer(path=None)
    tracer.begin(checkpoint.trace_id, collected.extend)
    planner = HarnessPlanner(source=workspace, tracer=tracer)
    if hasattr(planner.deps.models, "deadline"):
        planner.deps.models.deadline = checkpoint.deadline
    run_gate = planner.run_gate

    def bounded_gate(number, request, deps, budget, state, **kwargs):
        checkpoint(number)
        if hasattr(deps.models, "timeout_s"):
            deps.models.timeout_s = min(deps.models.timeout_s, checkpoint.remaining())
        return run_gate(number, request, deps, budget, state, **kwargs)

    planner.run_gate = bounded_gate
    try:
        try:
            plan, units = planner(snapshot)
            checkpoint(None)
            result = {"status": "completed", "plan": plan, "budget_used": units, "skill": planner.last_skill}
        except PlanBlockedError as error:
            checkpoint(None)
            result = {"status": "blocked", "gate": error.detail.get("gate"),
                      "message": error.detail.get("public_message") or "Requires review.",
                      "reason": redact(str(error.detail.get("reason") or "plan_blocked"))[:300],
                      "signals": [redact(str(signal))[:80] for signal in (error.detail.get("signals") or [])[:32]],
                      "advisory_plan": redact(str(error.detail.get("plan") or ""))[:2000] or None}
    finally:
        tracer.flush()
    if len(collected) > 5:
        raise ValueError("planning model call limit exceeded")
    for call in collected:
        for field in ("prompt_var", "output"):
            text = call.get(field) or ""
            if len(text) > 2048:
                call.setdefault("truncated", {})["prompt" if field == "prompt_var" else "output"] = True
            call[field] = text[:2048]
        call["error"] = redact(call.get("error") or "")[:300] or None
    if len(json.dumps(collected, ensure_ascii=False).encode()) > 180000:
        raise ValueError("planning trace limit exceeded")
    result["calls"] = collected
    return result


def create_app(*, key=None, workspace=None, project=None, operation=plan_operation, trusted_policy=None):
    key = key if key is not None else os.getenv("AI_BOARD_INTERNAL_KEY", "")
    workspace = Path(workspace or os.getenv("AI_BOARD_WORKSPACE") or Path(__file__).resolve().parents[2]).resolve()
    project = project or os.getenv("AI_BOARD_PROJECT", "tizia")
    running = threading.Lock()
    app = FastAPI(title="AI Board internal API", docs_url=None, redoc_url=None, openapi_url=None)
    app.add_middleware(BodyLimit)

    def authenticate(authorization: str | None = Header(default=None)):
        if len(key) < 32:
            raise HTTPException(503, "internal_api_not_configured")
        if not authorization or not secrets.compare_digest(authorization.encode(), f"Bearer {key}".encode()):
            raise HTTPException(401, "unauthorized")

    @app.get("/health")
    def health():
        return {"status": "ok"}

    @app.get("/ready", dependencies=[Depends(authenticate)])
    def ready():
        if not workspace.is_dir():
            raise HTTPException(503, "workspace_unavailable")
        return {"status": "ready", "mode": "stateless_planning", "project": project}

    @app.post("/v1/plans", response_model=PlanningResult, dependencies=[Depends(authenticate)])
    def plan(payload: PlanningInput):
        if payload.project != project:
            raise HTTPException(403, "project_not_registered")
        if not workspace.is_dir():
            raise HTTPException(503, "workspace_unavailable")
        snapshot = payload.snapshot
        if snapshot.get("folder"):
            raise HTTPException(403, "folder_requires_local_planner")
        if set(snapshot) - {"request", "thread", "folder", "capability_policy", "clarification_incomplete"}:
            raise HTTPException(422, "unsupported_snapshot_fields")
        try:
            request = RequestInput.model_validate(snapshot.get("request"))
        except ValueError:
            raise HTTPException(422, "invalid_request") from None
        if not isinstance(snapshot.get("thread", []), list) or len(snapshot.get("thread", [])) > 32:
            raise HTTPException(422, "invalid_thread")
        for name in ("folder", "capability_policy"):
            if snapshot.get(name) is not None and not isinstance(snapshot[name], dict):
                raise HTTPException(422, f"invalid_{name}")
        if snapshot.get("capability_policy") is not None:
            registered = trusted_policy
            if registered is None:
                policy = workspace / "server" / "ai-board" / "security" / "policy.js"
                if not policy.is_file():
                    raise HTTPException(503, "policy_unavailable")
                try:
                    script = "import {CAPABILITY_CATALOG} from " + json.dumps(policy.as_uri()) + ";console.log(JSON.stringify(CAPABILITY_CATALOG));"
                    registered = json.loads(subprocess.run(["node", "--input-type=module", "-e", script],
                                            capture_output=True, text=True, check=True, timeout=5).stdout)
                except (OSError, ValueError, subprocess.SubprocessError):
                    raise HTTPException(503, "policy_unavailable") from None
            if snapshot["capability_policy"] != registered:
                raise HTTPException(403, "policy_not_registered")
        if not running.acquire(blocking=False):
            raise HTTPException(429, "engine_busy", headers={"Retry-After": "5"})
        trace_id, events = str(uuid.uuid4()), []
        deadline = time.monotonic() + payload.timeout_s

        def checkpoint(gate):
            if time.monotonic() >= deadline:
                raise DeadlineExceeded()
            if gate is not None:
                events.append({"gate": gate, "kind": "gate_started", "at": time.time()})
        checkpoint.remaining = lambda: max(0.001, deadline - time.monotonic())
        checkpoint.deadline = deadline
        checkpoint.trace_id = trace_id

        try:
            from worker import DEFAULT_BUDGET_LIMIT
            ceiling = min(DEFAULT_BUDGET_LIMIT, int(os.getenv("BUDGET_MAX_UNITS") or DEFAULT_BUDGET_LIMIT))
            if ceiling <= 0:
                raise ValueError("invalid planning budget")
            narrowed = min(payload.budget_limit or ceiling, ceiling)
            result = operation({**snapshot, "request": request.model_dump(), "ticket": {"budget_limit": narrowed}}, workspace, checkpoint)
            checkpoint(None)
            return PlanningResult(**result, trace_id=trace_id, events=events)
        except DeadlineExceeded:
            raise HTTPException(504, {"error": "planning_deadline", "trace_id": trace_id}) from None
        except Exception:
            # Provider errors may contain keys, URLs and private prompts.
            raise HTTPException(502, {"error": "pipeline_failed", "trace_id": trace_id}) from None
        finally:
            running.release()

    return app


app = create_app()
