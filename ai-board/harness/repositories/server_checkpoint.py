"""Checkpoint tool-step qua API worker: cùng giao diện PgSteps/Checkpoint, mọi lời gọi mang lease; không cần DB credential."""
from __future__ import annotations

from repositories.tool_steps import identity, scope_key


class HttpSteps:
    """Checkpoint của 1 loop = (proposal_id, child) ở server; lease cũ bị server từ chối (stale_lease)."""

    def __init__(self, client, base: str, lease: dict, proposal_id: int, child: int | None, scope: str):
        self.client, self.base, self.lease = client, base, lease
        self.proposal_id, self.child, self.scope = proposal_id, child or 0, scope

    def _call(self, op: str, **body) -> dict:
        return self.client.post(f"{self.base}/{op}", {**self.lease, "proposal_id": str(self.proposal_id), "child": self.child, **body})

    def identity(self, step: int, tool: str, args: dict) -> str:
        return identity(self.proposal_id, self.child, step, tool, args)

    def load(self) -> dict:
        return self._call("load")

    def save_pins(self, pins: dict) -> None:
        self._call("pins", pins=pins, run_scope=self.scope)

    def save_ledger(self, snapshot: dict) -> None:
        self._call("ledger", snapshot=snapshot)

    def intent(self, step: int, tool: str, args: dict) -> None:
        self._call("intent", step=step, tool=tool, args=args, identity=self.identity(step, tool, args))

    def done(self, step: int, tool: str, args: dict, observation: str, kind: str) -> None:
        self._call("done", step=step, tool=tool, args=args, identity=self.identity(step, tool, args),
                   observation=observation, kind=kind)

    def mark(self, step: int, status: str) -> None:
        self._call("mark", step=step, status=status)

    def drop(self, step: int) -> None:
        self._call("drop", step=step)

    def reset(self, pins: dict) -> None:
        self._call("reset", pins=pins)

    def reconcile(self, step: int, resolution: str, by: str, reason: str | None = None, evidence: dict | None = None) -> None:
        self._call("reconcile", step=step, resolution=resolution, by=by, reason=reason, evidence=evidence or {})


class HttpCheckpoint:
    """Như tool_steps.Checkpoint nhưng qua server; run_scope phải bắt đầu bằng `ticket-<id>:`."""

    def __init__(self, client, ticket_id: int, lease: dict, run_scope: str, attempt: int = 0, keys: set | None = None):
        self.client, self.ticket_id, self.lease, self.run_scope, self.n = client, ticket_id, lease, run_scope, attempt
        self.keys = set() if keys is None else keys
        self._pinned = False
        self.base = f"/api/ai-board/worker/tickets/{ticket_id}/checkpoint"

    def attempt(self, n: int) -> "HttpCheckpoint":
        return HttpCheckpoint(self.client, self.ticket_id, self.lease, self.run_scope, n, self.keys)

    def _steps(self, key: int, child: int) -> HttpSteps:
        self.keys.add(key)
        return HttpSteps(self.client, self.base, self.lease, key, child, self.run_scope)

    def store(self, base_sha: str, child: int) -> HttpSteps:
        return self._steps(scope_key(self.run_scope, self.n, base_sha), child)

    def _ledger(self) -> HttpSteps:
        return self._steps(scope_key(self.run_scope, "ledger"), 0)

    def restore(self, budget) -> None:
        saved = self._ledger().load()["ledger"]
        if saved:
            budget.absorb(saved)

    def save(self, budget) -> None:
        store = self._ledger()
        if not self._pinned:
            store.save_pins({"kind": "worker_ledger"})
            self._pinned = True
        store.save_ledger(budget.snapshot())

    def _cursor(self) -> HttpSteps:
        return self._steps(scope_key(self.run_scope, "cursor"), 0)

    def _progress(self, base_sha: str) -> HttpSteps:
        return self._steps(scope_key(self.run_scope, "gate3_progress", self.n, base_sha), 0)

    def load_progress(self, base_sha: str) -> dict:
        return self._progress(base_sha).load()["ledger"] or {}

    def save_progress(self, base_sha: str, data: dict) -> None:
        store = self._progress(base_sha)
        store.save_pins({"kind": "gate3_progress"})
        store.save_ledger(data)

    def load_cursor(self) -> dict | None:
        return self._cursor().load()["ledger"]

    def save_cursor(self, cursor: dict) -> None:
        store = self._cursor()
        store.save_pins({"kind": "cursor"})
        store.save_ledger(cursor)

    def purge(self) -> None:
        self.client.post(f"{self.base}/purge", {**self.lease, "run_scope": self.run_scope, "proposal_ids": [str(key) for key in sorted(self.keys)]})

    def graph_saver(self, pin: str):
        """LangGraph saver of this run; thread = run_scope, so a new plan or base starts a new thread."""
        from repositories.server_graph_saver import HttpGraphSaver
        return HttpGraphSaver(self.client, self.ticket_id, self.lease, pin, thread_id=f"{self.run_scope}:graph")
