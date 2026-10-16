"""Bằng chứng cổng kiểm chứng qua API worker: server là verifier, worker gửi pin hiện tại và nhận reuse hoặc lý do drift."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

HARNESS = Path(__file__).resolve().parents[1]
VERIFIER_FILES = ("gates/static_check.py", "gates/guard.py", "gates/risk_triage.py", "candidate.py")


def digest(value) -> str:
    raw = value if isinstance(value, bytes) else json.dumps(value, sort_keys=True, ensure_ascii=False, default=str).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def gate4_pins(state: dict, *, plan_hash: str | None, model: str | None, tool_hash: str) -> dict:
    """Pin của bằng chứng Gate 4: artifact (diff), plan, base, mã verifier, prompt soát nội dung, tool, model, oracle (catalog)."""
    harness = hashlib.sha256()
    for name in VERIFIER_FILES:
        harness.update((HARNESS / name).read_bytes())
    prompt = HARNESS / "prompts" / "content_guard.md"
    artifact = [{key: d.get(key) for key in ("title", "file", "test_file", "diff")} for d in state.get("diffs") or []]  # not the scratch commit sha: it changes with every commit time
    return {"candidate": digest(artifact), "plan": str(plan_hash or "none"), "base": str(state.get("base_sha") or "none"),
            "harness": harness.hexdigest()[:32], "prompt": digest(prompt.read_bytes() if prompt.exists() else b"")[:32],
            "tool": str(tool_hash)[:32], "model": str(model or "none"), "oracle": digest(state.get("catalog"))[:32]}


class GateProofs:
    def __init__(self, client, ticket_id: int, lease: dict, run_id: int | None = None):
        self.client, self.lease, self.run_id = client, lease, run_id
        self.base = f"/api/ai-board/worker/tickets/{ticket_id}/gate-proof"

    def check(self, gate: int, pins: dict) -> dict:
        return self.client.post(f"{self.base}/check", {**self.lease, "gate": gate, "pins": pins})

    def record(self, gate: int, pins: dict, result: dict) -> None:
        self.client.post(f"{self.base}/record", {**self.lease, "gate": gate, "pins": pins, "result": result, "run_id": self.run_id})
