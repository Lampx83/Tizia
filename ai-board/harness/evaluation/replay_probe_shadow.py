"""Offline report: legacy probe verdict vs new-check verdict from stored Gate 5 evidence.

CLI (from ai-board/harness): python -m evaluation.replay_probe_shadow <records.json|.jsonl> [...]
Record = {"case": id, "evidence": {...}} or bare evidence; rows without probe_shadow are skipped.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path


def load(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    if path.suffix == ".jsonl":
        return [json.loads(line) for line in text.splitlines() if line.strip()]
    data = json.loads(text)
    return data if isinstance(data, list) else [data]


def _verdict(passed) -> str:
    return "pass" if passed is True else "fail" if passed is False else "none"


def rows(records: list[dict]) -> list[dict]:
    out = []
    for index, record in enumerate(records):
        evidence = record.get("evidence", record)
        shadow = evidence.get("probe_shadow")
        if not shadow:
            continue
        legacy, new = _verdict(shadow["legacy"].get("passed")), _verdict(shadow["new"].get("passed"))
        out.append({"case": record.get("case") or record.get("id") or f"#{index}", "probe": shadow["legacy"].get("probe_id"),
                    "legacy": legacy, "new": new, "agree": legacy == new, "reason": shadow["legacy"].get("reason")})
    return out


def summary(table: list[dict]) -> dict:
    count = lambda legacy, new: sum(r["legacy"] == legacy and r["new"] == new for r in table)  # noqa: E731
    return {"both_pass": count("pass", "pass"), "both_fail": count("fail", "fail"),
            "legacy_only_pass": sum(r["legacy"] == "pass" and r["new"] != "pass" for r in table),
            "new_only_pass": sum(r["new"] == "pass" and r["legacy"] != "pass" for r in table)}


def report(records: list[dict]) -> str:
    table = rows(records)
    lines = [f"{r['case']}\t{r['probe']}\tlegacy={r['legacy']}\tnew={r['new']}\t{'agree' if r['agree'] else 'DISAGREE'}" for r in table]
    lines += ["", "disagreements:"] + [f"  {r['case']}: legacy={r['legacy']} new={r['new']} {r['reason'] or ''}".rstrip()
                                       for r in table if not r["agree"]]
    lines += ["", "summary: " + " ".join(f"{k}={v}" for k, v in summary(table).items())]
    return "\n".join(lines)


if __name__ == "__main__":
    print(report([record for arg in sys.argv[1:] for record in load(Path(arg))]))
