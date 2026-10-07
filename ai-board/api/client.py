"""Callable HTTP planner adapter; redirects never receive internal credentials."""
import json
import urllib.error
import urllib.parse
import urllib.request


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class RemotePlanner:
    last_skill = None

    def __init__(self, url, key, *, project="tizia", timeout_s=900, fallback=None, tracer=None):
        parsed = urllib.parse.urlsplit(url)
        parsed.port  # Reject malformed ports while configuring the worker, before any lease is claimed.
        if parsed.scheme not in ("http", "https") or not parsed.hostname or parsed.username or parsed.password or parsed.query or parsed.fragment:
            raise ValueError("invalid internal engine URL")
        if len(key) < 32 or not 1 <= timeout_s <= 900:
            raise ValueError("invalid internal engine configuration")
        self.url, self.token, self.project, self.timeout_s = url.rstrip("/"), key, project, timeout_s
        self.trace_id = None
        self.events = []
        self.fallback = fallback
        self.tracer = tracer

    def preflight(self):
        request = urllib.request.Request(self.url + "/ready", headers={"Authorization": f"Bearer {self.token}"})
        try:
            with urllib.request.build_opener(NoRedirect()).open(request, timeout=5) as response:
                body = response.read(4097)
                state = json.loads(body)
                if len(body) > 4096 or state.get("status") != "ready" or state.get("project") != self.project:
                    raise ValueError()
            return None
        except (urllib.error.URLError, ValueError, AttributeError, TimeoutError):
            return {"status": "engine_unavailable", "error": "internal planning service unavailable"}

    def __call__(self, snapshot, source=None):
        if source is not None or snapshot.get("folder") or snapshot.get("request", {}).get("type") == "self":
            if self.fallback is None:
                raise ValueError("remote planner workspace must be registered on the engine; folder/self require local planner")
            self.trace_id, self.events = None, []
            result = self.fallback(snapshot, source=source)
            self.last_skill = getattr(self.fallback, "last_skill", None)
            return result
        self.trace_id, self.events, self.last_skill = None, [], None
        fields = ("id", "title", "detail", "domain", "type", "student", "clarified_spec", "votes")
        request = {name: snapshot["request"][name] for name in fields if name in snapshot["request"]}
        request["domain"] = request.get("domain") or "core"
        safe = {name: snapshot[name] for name in ("thread", "folder", "capability_policy", "clarification_incomplete") if name in snapshot}
        safe["request"] = request
        payload = {"project": self.project, "snapshot": safe, "timeout_s": self.timeout_s}
        budget = (snapshot.get("ticket") or {}).get("budget_limit")
        if budget is not None:
            if type(budget) is not int or budget <= 0:
                raise ValueError("invalid planning budget")
            payload["budget_limit"] = budget
        body = json.dumps(payload).encode()
        req = urllib.request.Request(self.url + "/v1/plans", data=body, method="POST",
                                     headers={"Content-Type": "application/json", "Authorization": f"Bearer {self.token}"})
        try:
            with urllib.request.build_opener(NoRedirect()).open(req, timeout=self.timeout_s + 5) as response:
                content = response.read(262145)
                if len(content) > 262144:
                    raise ValueError("engine response too large")
                result = json.loads(content)
        except (urllib.error.URLError, ValueError):
            raise RuntimeError("internal planning service unavailable") from None
        if not isinstance(result, dict) or not isinstance(result.get("trace_id"), str):
            raise RuntimeError("invalid internal planning response")
        self.trace_id = result["trace_id"]
        events = result.get("events", [])
        if not isinstance(events, list) or len(events) > 16 or any(not isinstance(event, dict) for event in events):
            raise RuntimeError("invalid internal planning events")
        self.events = events
        skill = result.get("skill")
        if skill is not None and (not isinstance(skill, str) or len(skill) > 80):
            raise RuntimeError("invalid internal planning skill")
        self.last_skill = skill
        if type(result.get("budget_used")) is not int or result["budget_used"] < 0:
            raise RuntimeError("invalid internal planning response")
        calls = result.get("calls", [])
        if not isinstance(calls, list) or len(calls) > 5 or any(not isinstance(call, dict) for call in calls):
            raise RuntimeError("invalid internal planning calls")
        if self.tracer:
            for call in calls:
                for note in call.get("notes") or []:
                    self.tracer.note(note.get("kind", "knows"), note.get("name", "remote"),
                                     note.get("summary", ""), note.get("data"))
                self.tracer.record(gate=call["gate"], model=call["model"], prompt=call.get("prompt_var") or "",
                                   prompt_name=call.get("prompt_name"), prompt_hash=call.get("prompt_hash"),
                                   static_prefix="", output=call.get("output") or "", metrics=call["metrics"],
                                   budget_units=call["budget_units"], result=call["result"], error=call.get("error"),
                                   child=call.get("child"), iteration=call.get("iteration", 0), provider=call.get("provider"))
                # Remote payload is capped already; retain full lengths and truncation indicators for the UI.
                pending = self.tracer.pending[-1]
                for name in ("prompt_len", "output_len"):
                    if type(call.get(name)) is int and call[name] >= 0:
                        pending[name] = call[name]
                for name in ("prompt", "output"):
                    pending["truncated"][name] |= (call.get("truncated") or {}).get(name) is True
                if call.get("edits"):
                    self.tracer.attach_last("edits", call["edits"])
                for evaluation in call.get("evaluation") or []:
                    self.tracer.attach_last("evaluation", evaluation)
        if result.get("status") == "blocked":
            from worker import PlanBlockedError
            raise PlanBlockedError("remote planning blocked", {
                "gate": result.get("gate"), "reason": result.get("reason") or "remote_gate_blocked",
                "signals": result.get("signals") or [], "plan": result.get("advisory_plan"),
                "public_message": result.get("message"), "trace_id": self.trace_id,
            })
        if result.get("status") != "completed" or not isinstance(result.get("plan"), dict):
            raise RuntimeError("invalid internal planning response")
        return result["plan"], result["budget_used"]
