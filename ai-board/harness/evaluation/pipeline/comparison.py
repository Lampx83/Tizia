#!/usr/bin/env python3
"""Paired comparison of arms by case id: resolved, wrong-ship, correct-stop, wall, GPU.

python -m evaluation.pipeline.comparison [--base B0] [--arms B1,B1-minus-AI_BOARD_TOOL_LOOP] [--dir trials] [--out comparison.md]
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from statistics import mean

from evaluation.pipeline import DATA

GOAL_OUTCOMES = {"ready_for_pr", "needs_review"}
SMALL_SAMPLE_PAIRS = 20


def is_resolved(trial: dict) -> bool:
    if "resolved" in trial:
        return bool(trial["resolved"])
    return trial.get("outcome") in GOAL_OUTCOMES


def is_wrong_ship(trial: dict) -> bool:
    if "wrong_ship" in trial:
        return bool(trial["wrong_ship"])
    if "mf_outcome" in trial:
        return trial["mf_outcome"] == "wrong_ship"
    return False


def is_correct_stop(trial: dict) -> bool:
    if "correct_stop" in trial:
        return bool(trial["correct_stop"])
    return trial.get("mf_outcome") == "correct_stop"


def load_trials(directory: Path | None = None) -> list[dict]:
    out = []
    for path in sorted((directory or DATA / "trials").glob("*.json")):
        try:
            out.append(json.loads(path.read_text(encoding="utf-8")))
        except Exception:
            continue
    return out


def _by_key(trials: list[dict], arm: str) -> dict[tuple, dict]:
    return {(t["case"], t.get("repeat")): t for t in trials if t.get("arm") == arm}


def pair_by_case(trials: list[dict], base: str, arm: str) -> list[dict]:
    """One row per (case, repeat) that has a trial in both arms (base first)."""
    left, right = _by_key(trials, base), _by_key(trials, arm)
    rows = []
    for key in sorted(set(left) & set(right), key=lambda k: (str(k[0]), k[1] or 0)):
        a, b = left[key], right[key]
        rows.append({
            "case": key[0] if key[1] is None else f"{key[0]} r{key[1]}",
            "base_resolved": is_resolved(a), "arm_resolved": is_resolved(b),
            "base_wrong_ship": is_wrong_ship(a), "arm_wrong_ship": is_wrong_ship(b),
            "base_correct_stop": is_correct_stop(a), "arm_correct_stop": is_correct_stop(b),
            "wall_delta_s": _delta(b, a, "trial_wall_s"),
            "gpu_delta_s": _delta(b, a, "gpu_s"),
        })
    return rows


def _delta(new: dict, old: dict, key: str) -> float | None:
    if new.get(key) is None or old.get(key) is None:
        return None
    return round(float(new[key]) - float(old[key]), 1)


def summarise(trials: list[dict]) -> dict:
    n = len(trials)
    walls = [float(t["trial_wall_s"]) for t in trials if t.get("trial_wall_s") is not None]
    gpus = [float(t["gpu_s"]) for t in trials if t.get("gpu_s") is not None]
    return {
        "n": n,
        "resolved": sum(is_resolved(t) for t in trials),
        "wrong_ship": sum(is_wrong_ship(t) for t in trials),
        "correct_stop": sum(is_correct_stop(t) for t in trials),
        "wall_mean_s": round(mean(walls), 1) if walls else None,
        "gpu_mean_s": round(mean(gpus), 1) if gpus else None,
    }


def split_infra(trials: list[dict]) -> tuple[list[dict], list[dict]]:
    """(model trials, infra-tagged trials); infra rows are excluded from outcomes."""
    infra = [t for t in trials if t.get("infra_tag")]
    return [t for t in trials if not t.get("infra_tag")], infra


def render(trials: list[dict], base: str, arms: list[str]) -> str:
    trials, infra = split_infra(trials)
    lines = [f"# Arm comparison (base {base})", ""]
    if infra:
        tags: dict[str, int] = {}
        for t in infra:
            tags[f"{t.get('arm')}/{t.get('infra_tag')}"] = tags.get(f"{t.get('arm')}/{t.get('infra_tag')}", 0) + 1
        lines += ["Infra-tagged trials (excluded from model outcomes): "
                  + ", ".join(f"{k}={v}" for k, v in sorted(tags.items())), ""]
    lines += ["| arm | n | resolved | wrong-ship | correct-stop | mean wall s | mean GPU s |",
              "|---|---|---|---|---|---|---|"]
    for arm in [base] + arms:
        s = summarise([t for t in trials if t.get("arm") == arm])
        lines.append(f"| {arm} | {s['n']} | {s['resolved']} | {s['wrong_ship']} | {s['correct_stop']} | "
                     f"{s['wall_mean_s']} | {s['gpu_mean_s']} |")
    lines.append("")
    for arm in arms:
        rows = pair_by_case(trials, base, arm)
        lines += [f"## {arm} vs {base}", ""]
        if len(rows) < SMALL_SAMPLE_PAIRS:
            lines += [f"> small-sample: {len(rows)} paired cases (< {SMALL_SAMPLE_PAIRS}). "
                      "Counts and deltas are not evidence of a difference yet.", ""]
        if not rows:
            lines += ["no shared cases", ""]
            continue
        lines += [f"resolved: {base} {sum(r['base_resolved'] for r in rows)}/{len(rows)}, "
                  f"{arm} {sum(r['arm_resolved'] for r in rows)}/{len(rows)}; "
                  f"pass->fail {sum(r['base_resolved'] and not r['arm_resolved'] for r in rows)}; "
                  f"fail->pass {sum(r['arm_resolved'] and not r['base_resolved'] for r in rows)}", ""]
        lines += ["| case | resolved base/arm | wrong-ship base/arm | correct-stop base/arm | wall delta s | GPU delta s |",
                  "|---|---|---|---|---|---|"]
        for r in rows:
            lines.append(f"| {r['case']} | {_yn(r['base_resolved'])}/{_yn(r['arm_resolved'])} | "
                         f"{_yn(r['base_wrong_ship'])}/{_yn(r['arm_wrong_ship'])} | "
                         f"{_yn(r['base_correct_stop'])}/{_yn(r['arm_correct_stop'])} | "
                         f"{r['wall_delta_s']} | {r['gpu_delta_s']} |")
        lines.append("")
    return "\n".join(lines) + "\n"


def _yn(flag: bool) -> str:
    return "Y" if flag else "-"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="B0")
    parser.add_argument("--arms", default="", help="comma list; default every other arm found in trials")
    parser.add_argument("--dir", default="")
    parser.add_argument("--out", default="comparison.md")
    args = parser.parse_args(argv)
    trials = load_trials(Path(args.dir) if args.dir else None)
    found = sorted({t.get("arm") for t in trials} - {args.base, None})
    arms = [a for a in args.arms.split(",") if a] or found
    text = render(trials, args.base, arms)
    (DATA / args.out).write_text(text, encoding="utf-8")
    print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
