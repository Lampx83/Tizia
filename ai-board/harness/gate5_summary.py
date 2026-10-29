"""Gate 5 sandbox runs -> table (task kind, wall s, guest peak MB, outcome). CLI reads ai_runs via DATABASE_URL."""
from __future__ import annotations

import json
import os
import sys


def sandbox_gates(evidence_json: str | None) -> list[dict]:
    """Gate 5 entries carrying evidence.sandbox metrics; [] for unparsable or pre-metrics rows."""
    try:
        data = json.loads(evidence_json or "{}")
    except ValueError:
        return []
    gates = (data.get("verdict") or {}).get("gates") or data.get("gates") or []
    return [g for g in gates if isinstance(g, dict) and g.get("gate") == 5 and isinstance(g.get("sandbox"), dict)]


def rows(runs: list[dict]) -> list[dict]:
    """runs: {run_id, kind, evidence_json} -> one row per sandboxed gate 5 entry."""
    out = []
    for run in runs:
        for gate in sandbox_gates(run.get("evidence_json")):
            sandbox = gate["sandbox"]
            peak = sandbox.get("peak_kib")
            out.append({
                "run": run["run_id"], "kind": run.get("kind") or "?", "seconds": sandbox.get("wall_s"),
                "peak_mb": None if peak is None else round(peak / 1024, 1), "outcome": sandbox.get("outcome") or "?",
            })
    return out


def table(items: list[dict]) -> str:
    """Markdown table; '-' for missing metrics."""
    head = "| run | task kind | seconds | peak MB | outcome |\n|---|---|---|---|---|\n"
    body = "".join(
        f"| {r['run']} | {r['kind']} | {'-' if r['seconds'] is None else r['seconds']} | "
        f"{'-' if r['peak_mb'] is None else r['peak_mb']} | {r['outcome']} |\n" for r in items)
    return head + body


def main() -> int:
    from repositories.dbconn import harness_db

    with harness_db(os.environ["DATABASE_URL"], dict_rows=True) as con:
        cur = con.execute("SELECT r.id AS run_id, t.kind AS kind, r.evidence_json FROM ai_runs r "
                          "JOIN ai_tickets t ON t.id = r.ticket_id WHERE r.gate = 5 ORDER BY r.id")
        runs = [{"run_id": row["run_id"], "kind": row["kind"], "evidence_json": row["evidence_json"]} for row in cur.fetchall()]
    items = rows(runs)
    sys.stdout.write(table(items) if items else "no sandboxed gate 5 runs with metrics\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
