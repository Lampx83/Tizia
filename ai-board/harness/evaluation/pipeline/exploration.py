"""Exploration per trial: first_hit, named_missing_file, planning_reads. Pure; DB and git injected."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import Callable

REACT_PROMPT = "react_plan.md"
PLANNING_GATE = "1"

PLAN_SQL = ("SELECT row_to_json(x) FROM (SELECT plan_json::json AS plan FROM ai_plans "
            "WHERE root_ticket_id={root} ORDER BY revision DESC LIMIT 1) x")
SPANS_SQL = """SELECT coalesce(json_agg(row_to_json(s)), '[]') FROM (
  SELECT s.attributes_json::json->>'tizia.gate' AS gate, s.attributes_json::json->>'tizia.prompt_name' AS prompt,
         s.status
    FROM ai_spans s JOIN ai_runs r ON r.id = s.run_id JOIN ai_tickets t ON t.id = r.ticket_id
   WHERE t.source_request_id = {req} AND s.kind = 'client') s"""


def norm(path) -> str:
    """Repo path with / separators, no leading ./."""
    p = str(path or "").replace("\\", "/").strip()
    while p.startswith("./"):
        p = p[2:]
    return p


def plan_scope(plan: dict) -> list[str]:
    """Top-level allowed_scope, else steps' allowed_scope in order."""
    top = plan.get("allowed_scope")
    if isinstance(top, list):
        return [norm(p) for p in top if p]
    return [norm(p) for step in plan.get("steps") or [] for p in (step or {}).get("allowed_scope") or [] if p]


def named_files(plan: dict) -> list[str]:
    """Scope paths plus grounding evidence files, deduplicated in order."""
    evidence = [norm((e or {}).get("file")) for e in (plan.get("grounding") or {}).get("evidence") or []]
    return list(dict.fromkeys(p for p in plan_scope(plan) + evidence if p))


def first_hit(plan: dict | None, labelled: str | None) -> bool | None:
    """Plan's first target equals labelled file. None when either is unknown."""
    scope = plan_scope(plan) if plan else []
    if not scope or not labelled:
        return None
    return scope[0] == norm(labelled)


def missing_files(plan: dict, exists: Callable[[str], bool]) -> list[str]:
    return [p for p in named_files(plan) if not exists(p)]


def named_missing_file(plan: dict | None, exists: Callable[[str], bool]) -> bool | None:
    if not plan:
        return None
    return bool(missing_files(plan, exists))


def planning_reads(spans: list[dict] | None, has_plan: bool) -> int | None:
    """react_plan replies at gate 1; minus the finish reply when a plan exists (approximate)."""
    if spans is None:
        return None
    n = sum(1 for s in spans if str(s.get("gate")) == PLANNING_GATE and s.get("prompt") == REACT_PROMPT)
    return max(n - 1, 0) if has_plan else n


def fetch_plan(root_ticket_id: int, query) -> dict | None:
    """Latest plan_json of the root ticket; query(sql) -> parsed JSON, read-only."""
    row = query(PLAN_SQL.format(root=int(root_ticket_id)))
    plan = (row or {}).get("plan")
    return json.loads(plan) if isinstance(plan, str) else plan


def fetch_spans(request_id: int, query) -> list[dict]:
    return query(SPANS_SQL.format(req=int(request_id))) or []


def git_exists(repo, pin: str) -> Callable[[str], bool]:
    """Path exists at commit pin in repo (read-only git cat-file, cached)."""
    cache: dict[str, bool] = {}

    def exists(path: str) -> bool:
        if path not in cache:
            done = subprocess.run(["git", "-C", str(repo), "cat-file", "-e", f"{pin}:{path}"],
                                  capture_output=True, timeout=30)
            cache[path] = done.returncode == 0
        return cache[path]

    return exists


def measure(plan: dict | None, spans: list[dict] | None, labelled: str | None,
            exists: Callable[[str], bool]) -> dict:
    return {"first_hit": first_hit(plan, labelled),
            "named_missing_file": named_missing_file(plan, exists),
            "planning_reads": planning_reads(spans, bool(plan))}


def for_record(record: dict, query, exists_at: Callable[[str], Callable[[str], bool]]) -> dict:
    """Fields to merge into a trial record. Never raises; failure -> {exploration_error}."""
    try:
        root, req, pin = record.get("root_ticket_id"), record.get("request_id"), record.get("pin")
        if not root or not req or not pin:
            raise ValueError("missing root_ticket_id, request_id or pin")
        plan = fetch_plan(root, query)
        spans = fetch_spans(req, query)
        exists = exists_at(pin) if plan else (lambda path: True)
        return measure(plan, spans, record.get("file"), exists)
    except Exception as exc:
        return {"exploration_error": f"{type(exc).__name__}: {exc}"[:200]}


def vague_case_ids(path: Path) -> set[str]:
    return {c["id"] for c in json.loads(Path(path).read_text(encoding="utf-8"))["cases"]}


def case_kind(case_id: str, vague_ids: set[str]) -> str:
    return "vague" if case_id in vague_ids else "dev"


def _rate(values: list) -> str:
    known = [v for v in values if v is not None]
    return f"{sum(1 for v in known if v)}/{len(known)}" if known else "-"


def _mean(values: list) -> str:
    known = [v for v in values if v is not None]
    return f"{sum(known) / len(known):.2f} ({len(known)})" if known else "-"


def report(rows: list[dict], tool_loop: Callable[[str], bool]) -> str:
    """Markdown table per (arm, kind); k/n counts only known values."""
    groups: dict[tuple[str, str], list[dict]] = {}
    for r in rows:
        groups.setdefault((r["arm"], r["kind"]), []).append(r)
    lines = ["| arm | tool loop | kind | n | first_hit k/n | named_missing k/n | planning_reads mean (n) |",
             "|---|---|---|---|---|---|---|"]
    for (arm, kind) in sorted(groups):
        g = groups[(arm, kind)]
        lines.append(f"| {arm} | {'yes' if tool_loop(arm) else 'no'} | {kind} | {len(g)} | "
                     f"{_rate([r['first_hit'] for r in g])} | {_rate([r['named_missing_file'] for r in g])} | "
                     f"{_mean([r['planning_reads'] for r in g])} |")
    return "\n".join(lines) + "\n"
