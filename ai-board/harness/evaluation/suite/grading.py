"""Blind independent grading of candidate diffs. collect() mixes the diffs of several runs into one shuffled batch with arm names hidden;
the grader sees only batch items. score() joins the grader's verdicts back to runs through the key and reports each arm.
"""
from __future__ import annotations

import json
import random
from collections import Counter
from pathlib import Path

VERDICTS = ("correct", "partial", "wrong", "no_candidate")

PROMPT = """You grade code changes written by a small AI model for a Vietnamese education website (static HTML/CSS/JS pages plus a Node server).
For each item you get the user's request and the unified diff the model produced against the base commit. Judge ONLY whether the diff, once shipped,
satisfies the request. Use the base code in the repository when you need to check that files, functions, element ids or classes the diff refers to exist.
An alternative implementation that plainly satisfies the request is correct. Verdicts:
- correct: satisfies the request, no broken references, no syntax errors.
- partial: right direction but incomplete or one defect breaks part of the behaviour.
- wrong: does not do the request, refers to things that do not exist, breaks syntax, or changes nothing useful.
- no_candidate: the diff is empty or missing.
Do not guess when the diff is truncated at 6000 characters: say so in the reason and grade what is visible.
Output a JSON array of {"blind_id", "verdict", "reason"} with reason at most 200 characters. You do not know which model setting produced a diff."""


def _rows(run_dir: Path) -> list[dict]:
    path = Path(run_dir) / "results.jsonl"
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def collect(run_dirs: list[Path], pack: list[dict], out_dir: Path, seed: int = 20261009) -> dict:
    """Write batch.json (for the grader) and blindmap.json (never shown to the grader); return counts."""
    by_id = {entry["id"]: entry for entry in pack}
    items, key = [], {}
    for run in run_dirs:
        for row in _rows(Path(run)):
            entry = by_id.get(row["id"])
            if not entry:
                continue
            items.append({"run": Path(run).name, "row": row, "entry": entry})
    random.Random(seed).shuffle(items)
    batch = []
    for index, item in enumerate(items, 1):
        blind = f"g{index:04d}"
        entry, row = item["entry"], item["row"]
        batch.append({"blind_id": blind, "request": {"title": entry["title"], "detail": entry["detail"], "verify": [s["verify"] for s in entry["subtasks"]]},
                      "files": entry["files"], "base_sha": entry["base_sha"], "diff": row.get("diff")})
        key[blind] = {"run": item["run"], "id": row["id"], "oracle": bool(row.get("resolved")), "mode": row.get("mode")}
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "batch.json").write_text(json.dumps({"prompt": PROMPT, "items": batch}, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "blindmap.json").write_text(json.dumps(key, ensure_ascii=False, indent=1), encoding="utf-8")
    return {"items": len(batch), "runs": len(run_dirs)}


def score(grades: list[dict], key: dict) -> dict:
    """Per run: verdict counts, correct+partial share, agreement of 'correct' with the oracle. Also verdict flips per task across runs."""
    runs: dict[str, dict] = {}
    per_task: dict[str, dict[str, str]] = {}
    for grade in grades:
        meta = key.get(grade.get("blind_id"))
        if not meta or grade.get("verdict") not in VERDICTS:
            continue
        run = runs.setdefault(meta["run"], {"verdicts": Counter(), "agree": 0, "oracle_true": 0, "n": 0})
        run["verdicts"][grade["verdict"]] += 1
        run["n"] += 1
        run["agree"] += (grade["verdict"] == "correct") == meta["oracle"]
        run["oracle_true"] += meta["oracle"]
        per_task.setdefault(meta["id"], {})[meta["run"]] = grade["verdict"]
    report = {}
    for name, run in sorted(runs.items()):
        usable = run["verdicts"]["correct"] + run["verdicts"]["partial"]
        report[name] = {"n": run["n"], "verdicts": dict(run["verdicts"]), "correct_or_partial": usable,
                        "oracle_agreement": f"{run['agree']}/{run['n']}", "oracle_resolved": run["oracle_true"]}
    return {"runs": report, "tasks_graded": len(per_task)}


def paired(grades: list[dict], key: dict, baseline: str, candidate: str) -> dict:
    """Task-level change between two runs on the correct+partial scale: tasks gained, tasks lost."""
    rank = {"correct": 2, "partial": 1, "wrong": 0, "no_candidate": 0}
    seen: dict[str, dict[str, int]] = {}
    for grade in grades:
        meta = key.get(grade.get("blind_id"))
        if meta and grade.get("verdict") in rank and meta["run"] in (baseline, candidate):
            seen.setdefault(meta["id"], {})[meta["run"]] = rank[grade["verdict"]]
    both = {t: v for t, v in seen.items() if baseline in v and candidate in v}
    gained = sum(v[candidate] > 0 and v[baseline] == 0 for v in both.values())
    lost = sum(v[baseline] > 0 and v[candidate] == 0 for v in both.values())
    return {"tasks": len(both), "gained_usable": gained, "lost_usable": lost, "net": gained - lost}
