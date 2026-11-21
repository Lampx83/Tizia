"""Offline branch report for stored stagnation trials: infra / check_suspect / near_identical / candidate_wrong, no GPU.

CLI (from ai-board/harness): python -m evaluation.replay_suspect_checks <trial.json|.jsonl|dir> [...]
Record keys read (all optional): case|id, request ({subject, body} or text) | request_detail, full_diff | diff,
gates (verdict gates; Gate 5 evidence.checks.rows or the 'Check Gate 5: {json}' log line in evidence.text),
evidence (bare Gate 5 evidence), repair_diffs (per repair round: {file: diff} or diff text),
repair_state.diff_texts (journal), loop_stop | verdict_reason | internal_reason (a stored stagnation stop counts as
near_identical when no diffs were kept). Precedence: infra > check_suspect > near_identical > candidate_wrong; a record
with no Gate 5 check rows, no diffs and no stored stop is counted as unreplayable, not as a branch.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from gate5.session import missing_tool  # noqa: E402
from runtime import loop_guard  # noqa: E402
from gate5 import checks  # noqa: E402
from worker_execution import near_identical  # noqa: E402

INFRA, SUSPECT, NEAR, WRONG = checks.INFRA, checks.CHECK_SUSPECT, "near_identical", checks.CANDIDATE_WRONG
BRANCHES = (INFRA, SUSPECT, NEAR, WRONG)
_LOG = "Check Gate 5: "


def load(path: Path) -> list[dict]:
    if path.is_dir():
        return [{"case": file.stem, **record} for file in sorted(path.glob("*.json")) for record in load(file)]
    text = path.read_text(encoding="utf-8")
    if path.suffix == ".jsonl":
        return [json.loads(line) for line in text.splitlines() if line.strip()]
    data = json.loads(text)
    return data if isinstance(data, list) else [{"case": path.stem, **data}]


def _gate5(record: dict) -> dict:
    gate = next((g for g in reversed(record.get("gates") or []) if g.get("gate") == 5), None)
    return gate or {"evidence": record.get("evidence") or {}, "reason": record.get("reason")}


def rows(evidence: dict) -> list[dict]:
    """Check rows from evidence.checks, else from the last Gate 5 check log line (public results keep only the text)."""
    if (evidence.get("checks") or {}).get("rows"):
        return list(evidence["checks"]["rows"])
    text = str(evidence.get("text") or "")
    at = text.rfind(_LOG)
    if at < 0:
        return []
    try:
        data, _ = json.JSONDecoder().raw_decode(text[at + len(_LOG):])
    except ValueError:
        return []
    return list(data.get("rows") or []) if isinstance(data, dict) else []


def _request(record: dict) -> str:
    value = record.get("request") or record.get("request_detail") or ""
    return f"{value.get('subject') or ''}\n{value.get('body') or ''}".strip() if isinstance(value, dict) else str(value)


def _rounds(record: dict) -> list[dict]:
    raw = record.get("repair_diffs") or (record.get("repair_state") or {}).get("diff_texts") or []
    return [item if isinstance(item, dict) else {"*": str(item)} for item in raw]


def branch(record: dict) -> dict:
    """Branch one trial lands in, with the fact that decided it."""
    gate = _gate5(record)
    evidence = gate.get("evidence") or {}
    found = rows(evidence)
    red = [row for row in found if row.get("base") is False and not row.get("candidate")]
    # WHY: the app's own container log can say "not found" without any Gate 5 tool missing
    own_log = str(evidence.get("text") or "").split("Container logs before teardown")[0]
    stop = "\n".join(str(record.get(key) or "") for key in ("loop_stop", "verdict_reason", "internal_reason"))
    tool = missing_tool(f"{gate.get('reason') or ''}\n{own_log}\n{stop}")
    if any(row.get("class") == INFRA for row in found) or tool:
        return {"branch": INFRA, "why": f"thiếu công cụ {tool}" if tool else "check không chạy được"}
    request, diff = _request(record), str(record.get("full_diff") or record.get("diff") or "")
    for row in red:
        why = row.get("suspect") or checks.suspect(row["check"], request, diff)
        if why:
            return {"branch": SUSPECT, "why": why, "origin": row.get("origin")}
    rounds = _rounds(record)
    if len(rounds) >= 2 and (low := near_identical(rounds[-2], rounds[-1])) is not None:
        return {"branch": NEAR, "why": f"similarity {low:.3f}"}
    if not rounds and loop_guard.REASON_STAGNATION in stop:
        return {"branch": NEAR, "why": "loop stop stagnation đã lưu"}
    if not found and not rounds:
        return {"branch": None, "why": "không có check Gate 5, diff hay loop stop"}
    return {"branch": WRONG, "why": f"{len(red)} check đỏ" if red else "không có check đỏ"}


def report(records: list[dict]) -> str:
    table = [{"case": record.get("case") or record.get("id") or f"#{index}", **branch(record)}
             for index, record in enumerate(records)]
    lines = [f"{row['case']}\t{row['branch']}\t{row['why']}" for row in table]
    counts = {name: sum(row["branch"] == name for row in table) for name in BRANCHES}
    return "\n".join([*lines, "", "summary: " + " ".join(f"{k}={v}" for k, v in counts.items()),
                      f"unreplayable: {sum(row['branch'] is None for row in table)}"])


if __name__ == "__main__":
    print(report([record for arg in sys.argv[1:] for record in load(Path(arg))]))
