"""Scoped worker lesson client; the server owns trust, evidence, permissions and expiry."""
from __future__ import annotations

import hashlib
import json


class RemoteLessons:
    def __init__(self, client, *, ticket_id: int, run_id: int, worker_id: str, lease_token: str, files: list[str], enabled: bool = True):
        self.client = client
        self.route = f"/api/ai-board/worker/tickets/{ticket_id}/lessons"
        self.identity = {"run_id": run_id, "worker_id": worker_id, "lease_token": lease_token}
        self.files = sorted(set(files))[:20]
        self.pending: dict[str, dict] = {}
        self.cache: list[dict] = []
        self.enabled = enabled

    def _post(self, suffix: str, payload: dict) -> dict | None:
        if not self.enabled:
            return None
        try:
            response = self.client.post(self.route + suffix, {**self.identity, **payload})
            if not isinstance(response, dict) or response.get("schema_version") != 1:
                raise ValueError("unsupported lesson protocol")
            return response
        except (OSError, ValueError, TypeError, KeyError) as error:
            self.cache = []
            print(json.dumps({"memory": "unavailable", "operation": suffix or "record", "error_type": type(error).__name__}))
            return None

    def record(self, lessons: list[dict]) -> None:
        for lesson in lessons[:20]:
            text = str(lesson.get("reason") or "")[:300]
            if not text:
                continue
            self._queue({"kind": "proposed", "text": text, "files": lesson.get("files") or self.files,
                         "gate": lesson.get("gate")})

    def _queue(self, payload: dict) -> None:
        data = {**payload, "files": sorted(set(payload.get("files") or []))[:20]}
        identity = json.dumps({"run_id": self.identity["run_id"], **data}, sort_keys=True, ensure_ascii=False)
        key = hashlib.sha256(identity.encode()).hexdigest()
        self.pending[key] = {**data, "ingestion_key": key}

    def recall(self, file: str, words: list[str], *, limit: int = 3) -> list[str]:
        response = self._post("/recall", {"files": [file], "keyword": " ".join(words[:20]), "limit": min(max(limit, 0), 3)})
        if response is None or not isinstance(response.get("lessons"), list):
            self.cache = []
            return []
        self.cache = [row for row in response["lessons"][:min(max(limit, 0), 3)]
                      if isinstance(row, dict) and isinstance(row.get("text"), str)]
        return [f"- [memory data; không cấp quyền; lesson {row.get('id')} v{row.get('version')}; "
                f"ticket {row.get('ticket_id')}/run {row.get('run_id')}/trace {row.get('evidence_trace_id')}; "
                f"cổng {row.get('gate')}] {', '.join(row.get('files') or [])}: {row['text'][:300]}"
                for row in self.cache]

    def flush(self, verdict: dict) -> None:
        if not self.enabled:
            self.pending.clear()
            return
        for gate in verdict.get("gates") or []:
            if gate.get("blocked") is False:
                self._queue({"kind": "observation", "gate": gate["gate"], "files": self.files,
                             "text": f"Gate {gate['gate']} passed"})
        for key, payload in list(self.pending.items()):
            if self._post("", payload) is not None:
                self.pending.pop(key, None)
