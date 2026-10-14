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


def collect_plans(run_dirs: list[Path], out_dir: Path, seed: int = 20261009) -> dict:
    """Blind DEV plan cards; fail before writing if paired arms or captured evidence are incomplete."""
    if len(run_dirs) < 2 or len({Path(run).name for run in run_dirs}) != len(run_dirs):
        raise ValueError("plan review needs at least two distinct runs")
    arms = []
    pins = None
    for run in run_dirs:
        manifest = json.loads((Path(run) / "run.json").read_text(encoding="utf-8"))
        if manifest.get("status") != "complete" or manifest.get("dirty") is not False or manifest.get("integrity") != []:
            raise ValueError(f"DEV run is not complete, clean and integrity-checked: {Path(run).name}")
        fixed = tuple(manifest.get(field) for field in ("ref", "model", "corpus_sha", "seed", "repeats", "modes", "prompt_lock", "skill_lock", "contract_hash", "suite_hash", "pipeline_hash"))
        if None in fixed or (pins is not None and pins != fixed):
            raise ValueError("DEV run pins are missing or differ between arms")
        pins = fixed
        slots = {}
        for row in _rows(Path(run)):
            if row.get("split") != "dev" or row.get("mode") != "e2e":
                continue
            slot = (row["id"], row["mode"], row["repeat"])
            capture = row.get("capture")
            if slot in slots or not isinstance(capture, dict) or capture.get("version") != 1:
                raise ValueError(f"duplicate or uncaptured DEV plan in {Path(run).name}: {slot}")
            slots[slot] = capture
        if not slots:
            raise ValueError(f"no captured DEV e2e plans in {Path(run).name}")
        arms.append((Path(run).name, slots))
    expected = set(arms[0][1])
    if any(set(slots) != expected for _, slots in arms[1:]):
        raise ValueError("DEV plan slots differ between paired runs")
    items = [(name, slot, capture) for name, slots in arms for slot, capture in slots.items()]
    random.Random(seed).shuffle(items)
    batch, key = [], {}
    for index, (name, slot, capture) in enumerate(items, 1):
        blind = f"p{index:04d}"
        batch.append({"blind_id": blind, **{field: capture.get(field) for field in
                      ("request", "base_sha", "planning_context", "source_targets", "source", "initial_plan", "final_plan")}})
        key[blind] = {"run": name, "id": slot[0], "mode": slot[1], "repeat": slot[2]}
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "plan-batch.json").write_text(json.dumps({"prompt": "Independently judge the initial and final plan against the user's request using only the shown source. Return blind_id, initial_verdict, final_verdict (each correct, wrong, or insufficient), and a brief reason. A missing plan is wrong; use insufficient only when evidence cannot decide. Do not infer an arm or runtime outcome.", "items": batch}, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "plan-blindmap.json").write_text(json.dumps(key, ensure_ascii=False, indent=1), encoding="utf-8")
    return {"items": len(batch), "runs": len(arms), "slots_per_run": len(expected)}


def score_plans(grades: list[dict], key: dict, run_dirs: list[Path]) -> dict:
    """Count independently reviewed correct-plan blocks and wrong-plan passes per trial."""
    if len(grades) != len(key) or {g.get("blind_id") for g in grades} != set(key):
        raise ValueError("every blind plan card needs exactly one review")
    rows = {(Path(run).name, row["id"], row["mode"], row["repeat"]): row
            for run in run_dirs for row in _rows(Path(run)) if row.get("split") == "dev" and row.get("mode") == "e2e"}
    report = {}
    for grade in grades:
        if grade.get("initial_verdict") not in ("correct", "wrong", "insufficient") or grade.get("final_verdict") not in ("correct", "wrong", "insufficient"):
            raise ValueError(f"invalid plan verdict for {grade.get('blind_id')}")
        meta = key[grade["blind_id"]]
        slot = (meta["run"], meta["id"], meta["mode"], meta["repeat"])
        if slot not in rows:
            raise ValueError(f"missing reviewed trial: {slot}")
        row = rows[slot]
        facts = row.get("plan") or {}
        blocked = bool(not facts or facts.get("blocked") or facts.get("validator_blocked")) and not facts.get("approved")
        arm = report.setdefault(meta["run"], {"trials": 0, "false_block": 0, "wrong_plan_pass": 0, "insufficient": 0, "infra_error": 0, "correct_initial": 0})
        arm["trials"] += 1
        arm["correct_initial"] += grade["initial_verdict"] == "correct"
        arm["insufficient"] += grade["final_verdict"] == "insufficient"
        arm["infra_error"] += bool(row.get("infra_error"))
        arm["false_block"] += grade["final_verdict"] == "correct" and blocked and not row.get("infra_error")
        arm["wrong_plan_pass"] += grade["final_verdict"] == "wrong" and not blocked and not row.get("infra_error")
    for arm in report.values():
        arm["false_block_rate"] = round(arm["false_block"] / arm["trials"], 4)
        arm["review_complete"] = arm["insufficient"] == 0 and arm["infra_error"] == 0
    return {"runs": report, "reviewed": len(grades)}


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
    """Task-level change between two runs on the usable (correct or partial) scale. Repeats of a task are summed, so a task counts as gained
    when the candidate had more usable repeats than the baseline."""
    usable: dict[str, dict[str, int]] = {}
    for grade in grades:
        meta = key.get(grade.get("blind_id"))
        if meta and grade.get("verdict") in VERDICTS and meta["run"] in (baseline, candidate):
            bucket = usable.setdefault(meta["id"], {baseline: 0, candidate: 0})
            bucket[meta["run"]] += grade["verdict"] in ("correct", "partial")
    gained = sum(v[candidate] > v[baseline] for v in usable.values())
    lost = sum(v[candidate] < v[baseline] for v in usable.values())
    return {"tasks": len(usable), "gained_usable": gained, "lost_usable": lost, "net": gained - lost,
            "usable_trials_delta": sum(v[candidate] - v[baseline] for v in usable.values())}
