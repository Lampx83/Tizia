"""Read saved suite trial dir: last passed node x first failing node matrix + one-line-per-trial table.

    python evaluation/trial_matrix.py TRIAL_DIR [--csv OUT.csv]

Pure over saved records; no model, no GPU, no DB. Infra failures go to column `infra`, not a node.
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from evaluation.suite import metrics  # noqa: E402

NOTE_COLUMNS = ["note", "label"]
COLUMNS = ["file", "request_id", "mode", "outcome", "last_ok", "first_failure", "stop", "trace", *NOTE_COLUMNS]
START = "start"


def read_trials(trial_dir: Path) -> tuple[list[dict], int]:
    """(trial records from *.json sorted by name, count of unreadable/non-object files skipped)."""
    trials, skipped = [], 0
    for path in sorted(Path(trial_dir).glob("*.json")):
        try:
            record = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            skipped += 1
            continue
        if isinstance(record, dict):
            trials.append({"_path": path, **record})
        else:
            skipped += 1
    return trials, skipped


def _normal(trial: dict) -> dict:
    return {"resolved": False, "mode": "", "gate_passed": False, **trial}


def is_infra(trial: dict) -> bool:
    return not trial.get("resolved") and bool(trial.get("infra_error"))


def first_failure(trial: dict) -> str:
    """metrics.failure_class stage (infra stays its own column); 'resolved' when none."""
    return metrics.failure_class(_normal(trial)) or "resolved"


def last_ok(trial: dict) -> str:
    """Last funnel node passed: start < planned < gate3 < gate4 < resolved."""
    trial = _normal(trial)
    plan = trial.get("plan") or {}
    # e2e plan counts as passed only on final_hit, same as metrics funnel; gold mode has no plan stage.
    planned = not trial["mode"].startswith("e2e") or bool(plan.get("final_hit"))
    checks = [("planned", planned), ("gate3", trial["gate_passed"]), ("gate4", trial.get("gate4") == "passed"), ("resolved", trial["resolved"])]
    reached = START
    for name, ok in checks:
        if not ok:
            break
        reached = name
    return reached


def outcome(trial: dict) -> str:
    return "resolved" if trial.get("resolved") else "infra" if is_infra(trial) else "failed"


def stop_reason(trial: dict) -> str:
    """One line: reason, else error, truncated."""
    raw = trial.get("reason") or trial.get("error") or ""
    text = " ".join(str(raw).split())
    return text if len(text) <= 120 else text[:117] + "..."


def trial_row(trial: dict) -> dict:
    return {
        "file": trial["_path"].name,
        "request_id": trial.get("id") or "",
        "mode": trial.get("mode") or "",
        "outcome": outcome(trial),
        "last_ok": last_ok(trial),
        "first_failure": first_failure(trial),
        "stop": stop_reason(trial),
        "trace": str(trial["_path"]),
        "note": "",
        "label": "",
    }


def matrix(trials: list[dict]) -> dict[str, Counter]:
    """last_ok -> Counter of first_failure."""
    table: dict[str, Counter] = {}
    for trial in trials:
        table.setdefault(last_ok(trial), Counter())[first_failure(trial)] += 1
    return table


def _cell(value) -> str:
    return " ".join(str(value).split()).replace("|", r"\|")


def render_matrix(table: dict[str, Counter]) -> str:
    cols = sorted({col for counts in table.values() for col in counts})
    head = ["last_ok", *cols, "total"]
    lines = [" | ".join(head)]
    for node in sorted(table):
        counts = table[node]
        cells = [str(counts[col]) for col in cols]
        lines.append(" | ".join([node, *cells, str(sum(counts.values()))]))
    return "\n".join(lines)


def render_rows(rows: list[dict]) -> str:
    lines = [" | ".join(COLUMNS)]
    for row in rows:
        lines.append(" | ".join(_cell(row[col]) for col in COLUMNS))
    return "\n".join(lines)


def write_csv(rows: list[dict], out: Path) -> None:
    """Per-trial rows to csv, utf-8; note and label left blank for the reader."""
    with Path(out).open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNS)
        writer.writeheader()
        writer.writerows(rows)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("trial_dir", type=Path)
    parser.add_argument("--csv", type=Path, default=None)
    args = parser.parse_args(argv)
    trials, skipped = read_trials(args.trial_dir)
    rows = [trial_row(t) for t in trials]
    print(render_matrix(matrix(trials)))
    print(f"skipped unreadable files: {skipped}")
    print()
    print(render_rows(rows))
    if args.csv:
        write_csv(rows, args.csv)
    return 0


if __name__ == "__main__":
    sys.exit(main())
