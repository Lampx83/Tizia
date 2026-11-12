"""Read saved trial JSON dir: final outcome x first failing gate matrix + one-line-per-trial table.

    python evaluation/trial_matrix.py TRIAL_DIR [--csv OUT.csv]

Pure over saved records; no model, no GPU, no DB. Infra trials go to column `infra`, not a gate.
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter
from pathlib import Path

INFRA_CLASSES = {"transient"}
INFRA_TAGS = {"driver_cancel"}
NOTE_COLUMNS = ["note", "label"]
COLUMNS = ["file", "request_id", "case", "arm", "outcome", "first_failure", "stop", "trace", *NOTE_COLUMNS]


def read_trials(trial_dir: Path) -> list[dict]:
    """Trial records from *.json in dir, sorted by name; utf-8."""
    trials = []
    for path in sorted(Path(trial_dir).glob("*.json")):
        record = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(record, dict):
            trials.append({"_path": path, **record})
    return trials


def is_infra(trial: dict) -> bool:
    return trial.get("failure_class") in INFRA_CLASSES or trial.get("infra_tag") in INFRA_TAGS


def first_failure(trial: dict) -> str:
    """'infra' | gate number as text | 'no_gate' when no gate was reached."""
    if is_infra(trial):
        return "infra"
    gate = trial.get("gate_reached")
    if gate is None:
        return "no_gate"
    return f"{float(gate):g}"


def stop_reason(trial: dict) -> str:
    """One line: loop_stop, else verdict_reason, truncated."""
    raw = trial.get("loop_stop") or trial.get("verdict_reason") or ""
    text = " ".join(str(raw).split())
    return text if len(text) <= 120 else text[:117] + "..."


def trial_row(trial: dict) -> dict:
    return {
        "file": trial["_path"].name,
        "request_id": trial.get("request_id") or "",
        "case": trial.get("case") or "",
        "arm": trial.get("arm") or "",
        "outcome": trial.get("outcome") or "",
        "first_failure": first_failure(trial),
        "stop": stop_reason(trial),
        "trace": str(trial["_path"]),
        "note": "",
        "label": "",
    }


def matrix(trials: list[dict]) -> dict[str, Counter]:
    """outcome -> Counter of first_failure."""
    table: dict[str, Counter] = {}
    for trial in trials:
        table.setdefault(trial.get("outcome") or "", Counter())[first_failure(trial)] += 1
    return table


def render_matrix(table: dict[str, Counter]) -> str:
    cols = sorted({col for counts in table.values() for col in counts})
    head = ["outcome", *cols, "total"]
    lines = [" | ".join(head)]
    for outcome in sorted(table):
        counts = table[outcome]
        cells = [str(counts[col]) for col in cols]
        lines.append(" | ".join([outcome, *cells, str(sum(counts.values()))]))
    return "\n".join(lines)


def render_rows(rows: list[dict]) -> str:
    lines = [" | ".join(COLUMNS)]
    for row in rows:
        lines.append(" | ".join(str(row[col]) for col in COLUMNS))
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
    trials = read_trials(args.trial_dir)
    rows = [trial_row(t) for t in trials]
    print(render_matrix(matrix(trials)))
    print()
    print(render_rows(rows))
    if args.csv:
        write_csv(rows, args.csv)
    return 0


if __name__ == "__main__":
    sys.exit(main())
