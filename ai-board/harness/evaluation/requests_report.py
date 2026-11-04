"""Group board results by request difficulty: pass rate, mean plan steps, resume count.

Pure functions over two CSVs; no model calls and no DB.

    python evaluation/requests_report.py --results runs.csv [--dataset DIR_OR_CSV] [--json]

Dataset: `--dataset`, else $AI_BOARD_EVAL_DATA, else the in-repo sample fixture. The output
carries the dataset sha256 so a table can be tied to one exact file.

Results CSV contract: id + either passed (1/0) or outcome (compared to the dataset's
expected_outcome). Optional plan_steps and resumes columns.
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from evaluation import requests_dataset as ds  # noqa: E402

TRUTHY = {"1", "true", "yes", "y", "pass", "passed", "ok"}
LABELS = {1: "trivial one file", 2: "one file + test", 3: "two layers / db",
          4: "protected / elevation", 5: "multi-layer risk"}


def read_results(path: Path) -> tuple[list[str], list[dict]]:
    """(fieldnames, rows) of a results CSV."""
    with Path(path).open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return list(reader.fieldnames or []), list(reader)


def as_int(value) -> int | None:
    """Int from CSV cell; None when absent or not a number."""
    try:
        return int(float(str(value).strip()))
    except (TypeError, ValueError):
        return None


def passed(row: dict, expected_outcome: str) -> bool:
    """Explicit passed column wins; otherwise the outcome must match the dataset label."""
    value = (row.get("passed") or "").strip().lower()
    if value:
        return value in TRUTHY
    return (row.get("outcome") or "").strip() == expected_outcome


def summarize(rows: list[dict], results: list[dict]) -> dict:
    """{by_difficulty, totals, unknown_ids, missing_ids} for dataset rows joined with results."""
    expected = {row["id"]: row for row in rows}
    groups: dict[int, dict] = defaultdict(lambda: {"cases": 0, "passed": 0, "steps": [], "resumes": 0})
    unknown, seen = [], set()
    for result in results:
        rid = (result.get("id") or "").strip()
        request = expected.get(rid)
        if request is None:
            unknown.append(rid)
            continue
        seen.add(rid)
        group = groups[int(request["difficulty"])]
        group["cases"] += 1
        group["passed"] += bool(passed(result, request["expected_outcome"]))
        steps = as_int(result.get("plan_steps"))
        if steps is not None:
            group["steps"].append(steps)
        group["resumes"] += as_int(result.get("resumes")) or 0
    by_difficulty = {
        str(d): {
            "label": LABELS[d],
            "cases": groups[d]["cases"],
            "passed": groups[d]["passed"],
            "pass_rate": round(100 * groups[d]["passed"] / groups[d]["cases"], 1) if groups[d]["cases"] else 0.0,
            "mean_steps": round(sum(groups[d]["steps"]) / len(groups[d]["steps"]), 1) if groups[d]["steps"] else None,
            "resumes": groups[d]["resumes"],
        }
        for d in sorted(groups)
    }
    cases = sum(g["cases"] for g in by_difficulty.values())
    won = sum(g["passed"] for g in by_difficulty.values())
    steps = [s for group in groups.values() for s in group["steps"]]
    return {
        "by_difficulty": by_difficulty,
        "totals": {"cases": cases, "passed": won,
                   "pass_rate": round(100 * won / cases, 1) if cases else 0.0,
                   "mean_steps": round(sum(steps) / len(steps), 1) if steps else None,
                   "resumes": sum(g["resumes"] for g in groups.values())},
        "unknown_ids": unknown,
        "missing_ids": sorted(set(expected) - seen),
    }


def table(summary: dict) -> str:
    """Markdown table of the summary; '-' for no step data."""
    head = "| difficulty | band | cases | passed | pass % | mean steps | resumes |\n|---|---|---|---|---|---|---|\n"
    body = "".join(
        f"| {d} | {g['label']} | {g['cases']} | {g['passed']} | {g['pass_rate']} | "
        f"{'-' if g['mean_steps'] is None else g['mean_steps']} | {g['resumes']} |\n"
        for d, g in summary["by_difficulty"].items())
    total = summary["totals"]
    foot = (f"| all | - | {total['cases']} | {total['passed']} | {total['pass_rate']} | "
            f"{'-' if total['mean_steps'] is None else total['mean_steps']} | {total['resumes']} |\n")
    return head + body + foot


def dataset_line(name: str, sha256: str, rows: int) -> str:
    """One header line binding the report to the exact dataset file."""
    return f"dataset {name}\nsha256 {sha256}\nrows {rows}\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--results", required=True, type=Path, help="CSV with id and passed or outcome")
    parser.add_argument("--dataset", default=None,
                        help=f"dataset directory or CSV (default: ${ds.ENV}, else the in-repo sample fixture)")
    parser.add_argument("--json", action="store_true", help="machine-readable output instead of a table")
    args = parser.parse_args(argv)

    fieldnames, results = read_results(args.results)
    if "id" not in fieldnames or not ({"passed", "outcome"} & set(fieldnames)):
        parser.error("results CSV needs 'id' plus 'passed' or 'outcome'")
    try:
        dataset = ds.load(args.dataset)
    except OSError as error:
        parser.error(str(error))
    problems = ds.validate(dataset.fieldnames, dataset.rows)
    if problems:
        sys.stderr.write(f"dataset warning ({len(problems)}): {problems[0]}\n")
    summary = summarize(dataset.rows, results)
    summary["dataset"] = {"path": str(dataset.path), "sha256": dataset.sha256, "rows": len(dataset.rows)}
    if args.json:
        sys.stdout.write(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")
    else:
        sys.stdout.write(dataset_line(str(dataset.path), dataset.sha256, len(dataset.rows)))
        sys.stdout.write(table(summary))
    if summary["unknown_ids"]:
        sys.stderr.write(f"ignored unknown ids: {summary['unknown_ids']}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
