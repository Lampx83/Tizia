"""Blind independent grading of candidate diffs. collect() mixes the diffs of several runs into one shuffled batch with arm names hidden;
the grader sees only batch items. score() joins the grader's verdicts back to runs through the key and reports each arm.
"""
from __future__ import annotations

import json
import random
from collections import Counter
from pathlib import Path

VERDICTS = ("pass", "fail")
LEGACY_PASS = ("correct", "equivalent")
LEGACY_FAIL = ("partial", "wrong", "no_candidate", "different")
OLD_DIFF_CAP = 6000

PROMPT = """You grade code changes written by a small AI model for a Vietnamese education website (static HTML/CSS/JS pages plus a Node server).
For each item you get the user's request and the complete unified diff the model produced against the base commit. Judge ONLY whether the diff, once shipped,
satisfies the request. Use the base code in the repository when you need to check that files, functions, element ids or classes the diff refers to exist.
An alternative implementation that plainly satisfies the request passes. Binary verdicts:
- pass: satisfies the request, no broken references, no syntax errors, and nothing else visible in the diff is broken.
- fail: anything else, including an almost-right diff that is incomplete or has one defect breaking part of the behaviour (say which in the reason), a diff that does not do the request, refers to things that do not exist, breaks syntax, changes nothing useful, or is empty or missing.
An item with "diff_truncated": true was cut by an old size cap, so the rest is unseen: do not assume it is complete; fail it and start the reason with "truncated" unless the visible part already fails.
Output a JSON array of {"blind_id", "verdict", "reason"} with reason at most 200 characters. You do not know which model setting produced a diff."""


def binary(verdict) -> str | None:
    """pass|fail from a verdict (case/space-insensitive, bool, legacy and judge vocab; partial is fail); unknown None."""
    if isinstance(verdict, bool):
        return "pass" if verdict else "fail"
    if not isinstance(verdict, str):
        return None
    verdict = verdict.strip().lower()
    return verdict if verdict in VERDICTS else "pass" if verdict in LEGACY_PASS else "fail" if verdict in LEGACY_FAIL else None


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
                      "files": entry["files"], "base_sha": entry["base_sha"], "diff": row.get("diff"),
                      "diff_truncated": len(row.get("diff") or "") == OLD_DIFF_CAP})
        key[blind] = {"run": item["run"], "id": row["id"], "oracle": bool(row.get("resolved")), "mode": row.get("mode"), "repeat": row.get("repeat")}
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
    """Per run: verdict counts, pass count, agreement of 'pass' with the oracle. Also verdict flips per task across runs."""
    runs: dict[str, dict] = {}
    per_task: dict[str, dict[str, str]] = {}
    for grade in grades:
        meta = key.get(grade.get("blind_id"))
        verdict = binary(grade.get("verdict"))
        if not meta or verdict is None:
            continue
        run = runs.setdefault(meta["run"], {"verdicts": Counter(), "agree": 0, "oracle_true": 0, "n": 0})
        run["verdicts"][verdict] += 1
        run["n"] += 1
        run["agree"] += (verdict == "pass") == meta["oracle"]
        run["oracle_true"] += meta["oracle"]
        per_task.setdefault(meta["id"], {})[meta["run"]] = verdict
    report = {}
    for name, run in sorted(runs.items()):
        report[name] = {"n": run["n"], "verdicts": dict(run["verdicts"]), "passed": run["verdicts"]["pass"],
                        "oracle_agreement": f"{run['agree']}/{run['n']}", "oracle_resolved": run["oracle_true"]}
    return {"runs": report, "tasks_graded": len(per_task)}


def paired(grades: list[dict], key: dict, baseline: str, candidate: str) -> dict:
    """Task-level change between two runs on pass counts. Repeats of a task are summed, so a task counts as gained
    when the candidate had more passing repeats than the baseline."""
    passed: dict[str, dict[str, int]] = {}
    for grade in grades:
        meta = key.get(grade.get("blind_id"))
        if meta and binary(grade.get("verdict")) and meta["run"] in (baseline, candidate):
            bucket = passed.setdefault(meta["id"], {baseline: 0, candidate: 0})
            bucket[meta["run"]] += binary(grade["verdict"]) == "pass"
    gained = sum(v[candidate] > v[baseline] for v in passed.values())
    lost = sum(v[candidate] < v[baseline] for v in passed.values())
    return {"tasks": len(passed), "gained": gained, "lost": lost, "net": gained - lost,
            "passed_trials_delta": sum(v[candidate] - v[baseline] for v in passed.values())}
