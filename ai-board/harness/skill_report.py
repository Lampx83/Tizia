"""Per-skill report from ai_spans chat spans + run outcome: uses, first-pass, repair rounds, outcomes. CLI reads DATABASE_URL."""
from __future__ import annotations

import json
import os
import sys
from collections import Counter


def rows(spans: list[dict], outcomes: dict) -> list[dict]:
    """spans: {run_id, start_ms, name, attributes_json}; outcomes: run_id -> outcome. Unit = (run, skill, gate, child) calls."""
    units: dict[tuple, list[tuple]] = {}
    for span in spans:
        if not str(span.get("name", "")).startswith("chat"):
            continue
        try:
            attrs = json.loads(span.get("attributes_json") or "{}")
        except ValueError:
            continue
        skill = attrs.get("tizia.skill.id")
        if skill:
            key = (skill, span["run_id"], attrs.get("tizia.gate"), attrs.get("tizia.child"))
            units.setdefault(key, []).append((span["start_ms"], attrs.get("tizia.result") == "ok"))
    out: dict[str, dict] = {}
    skill_runs: dict[str, set] = {}
    for (skill, run, _, _), calls in units.items():
        calls.sort(key=lambda c: c[0])
        row = out.setdefault(skill, {"skill": skill, "uses": 0, "runs": 0, "first_pass": 0, "units": 0,
                                     "repair_rounds": 0, "outcomes": Counter()})
        row["uses"] += len(calls)
        row["units"] += 1
        row["first_pass"] += calls[0][1] and len(calls) == 1
        row["repair_rounds"] += len(calls) - 1
        skill_runs.setdefault(skill, set()).add(run)
    for skill, runs in skill_runs.items():
        out[skill]["runs"] = len(runs)
        out[skill]["outcomes"] = dict(Counter(outcomes.get(r) or "?" for r in runs))
    return sorted(out.values(), key=lambda r: (-r["uses"], r["skill"]))


def table(items: list[dict]) -> str:
    """Markdown table; first pass as passed/units."""
    head = "| skill | uses | runs | first pass | repair rounds | outcomes |\n|---|---|---|---|---|---|\n"
    body = "".join(
        f"| {r['skill']} | {r['uses']} | {r['runs']} | {r['first_pass']}/{r['units']} | {r['repair_rounds']} | "
        f"{', '.join(f'{k}:{v}' for k, v in sorted(r['outcomes'].items()))} |\n" for r in items)
    return head + body


def main() -> int:
    from repositories.dbconn import harness_db

    with harness_db(os.environ["DATABASE_URL"], dict_rows=True) as con:
        spans = con.execute("SELECT run_id, start_ms, name, attributes_json FROM ai_spans "
                            "WHERE name LIKE 'chat%' AND attributes_json LIKE '%tizia.skill.id%'").fetchall()
        outcomes = {r["id"]: r["outcome"] for r in con.execute("SELECT id, outcome FROM ai_runs").fetchall()}
    items = rows([dict(s) for s in spans], outcomes)
    sys.stdout.write(table(items) if items else "no skill-tagged chat spans\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
