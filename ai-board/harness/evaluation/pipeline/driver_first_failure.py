"""First-failure fields per trial from board DB trace. Mode rules live in code_modes.py (one copy)."""
from __future__ import annotations

import importlib.util

from evaluation.pipeline import DATA

ANALYSIS = DATA.parent / "ai-board-error-analysis"


def _load(name: str):
    spec = importlib.util.spec_from_file_location(f"_ea_{name}", ANALYSIS / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def _first(events: list) -> dict | None:
    """First blocked event; node rows are live, gate rows land at run end, so a node row stands for its gate."""
    blocked = [e for e in events if e["status"] == "blocked" and e["src"] in ("gate", "node")]
    gates = [e for e in blocked if e["src"] == "gate"]
    first = (gates or blocked or [None])[0]
    if blocked and blocked[0]["src"] == "node":
        number = blocked[0]["gate"].replace("gate_", "").replace("_", ".")
        match = [e for e in gates if e["at"] >= blocked[0]["at"] and str(e["gate"]) in (number, number + ".0")]
        first = {**match[0], "at": blocked[0]["at"]} if match else blocked[0]
    return first


def compute(events: list) -> dict:
    """Rows (extract.py shape) -> first_block, call_errors_before, length_cut_before, mode."""
    mode, reason, flags = _load("code_modes").code({"events": events})
    first = _first(events)
    start = min((e["at"] for e in events), default=0)
    block = None
    if first:
        gate = str(first["gate"]).replace("gate_", "").replace("_", ".")
        block = {"gate": gate, "reason": " ".join(str(first["detail"]).split())[:600],
                 "seconds": round((first["at"] - start) / 1000, 1)}
    return {"first_block": block, **flags, "mode": mode}


def fetch(request_id: int, query) -> list:
    """query(sql) -> parsed JSON; read-only."""
    return query(_load("extract").SQL % {"req": int(request_id)}) or []


def for_record(record: dict, query) -> dict:
    """Fields to merge into a trial record. Never raises; failure -> {first_block_error}."""
    try:
        if not record.get("request_id"):
            raise ValueError("no request_id")
        return compute(fetch(record["request_id"], query))
    except Exception as exc:
        return {"first_block_error": f"{type(exc).__name__}: {exc}"[:200]}
