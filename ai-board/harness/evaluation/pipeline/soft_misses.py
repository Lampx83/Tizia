"""Trial field soft_misses: board gate 4/5 soft quality misses, read from ai_gate_traces of the root and its children."""
from __future__ import annotations

import json


def from_traces(traces: list[dict]) -> list[dict]:
    """Soft misses of the last gate 4 row and the last gate 5 row (a repaired run's earlier rows are superseded)."""
    last = {}
    for row in traces:
        if row.get("gate") in (4, 5):
            last[row["gate"]] = row
    return [m for gate in (4, 5) for m in (last.get(gate) or {}).get("soft_misses") or []]


def sql(root: int) -> str:
    return (f"SELECT COALESCE(json_agg(g.evidence_json ORDER BY g.id), '[]') FROM ai_gate_traces g "
            f"JOIN ai_runs r ON r.id = g.run_id WHERE g.gate IN (4, 5) AND r.ticket_id IN "
            f"(SELECT id FROM ai_tickets WHERE id = {int(root)} OR parent_id = {int(root)})")


def for_record(record: dict, query) -> dict:
    """{soft_misses} for a trial record. Never raises; failure -> {soft_misses_error}."""
    try:
        rows = query(sql(record["root_ticket_id"])) or []
        return {"soft_misses": from_traces([json.loads(r) if isinstance(r, str) else r for r in rows])}
    except Exception as exc:
        return {"soft_misses_error": f"{type(exc).__name__}: {exc}"[:200]}
