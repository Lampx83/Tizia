#!/usr/bin/env python3
"""A/A noise floor: same arm, two repeat sets, per-criterion delta CI -> hashed noise_floor JSON.

python -m evaluation.pipeline.aa_noise aa --arm A --pin <sha> --set1 1,2,3 --set2 4,5,6 [--cases cases-dev.json] [--grades criterion-grades.jsonl]
    [--trials trials] [--out noise-floor.json]
Exit 3 and print driver commands when trials are missing; else write --out and print the report.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

from evaluation.pipeline import DATA
from evaluation.pipeline import criterion_stats as S


def split_runs(rows, arm, set1, set2):
    """Rows of one arm split by repeat id into arms 'set1' / 'set2'."""
    return ([{**r, "arm": "set1"} for r in rows if r["arm"] == arm and r["repeat"] in set1],
            [{**r, "arm": "set2"} for r in rows if r["arm"] == arm and r["repeat"] in set2])


def noise_report(s1, s2, seed=7, boot=4000) -> dict:
    res = S.compare(S.add_pass_rate(s1), S.add_pass_rate(s2), seed, boot)
    per = {k: v for k, v in res["soft"].items() if v["verdict"] != "no_data"}
    floor = {k: max(abs(v["ci95_points"][0]), abs(v["ci95_points"][1])) for k, v in per.items()}
    return {"per_criterion": per, "noise_floor": floor, "hard_violations": res["hard"], "seed": seed, "boot": boot}


def _digest(payload) -> str:
    return hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False).encode("utf-8")).hexdigest()


def write_noise(path, payload) -> None:
    Path(path).write_text(json.dumps({"payload": payload, "sha256": _digest(payload)}, indent=1, ensure_ascii=False),
                          encoding="utf-8")


def load_noise(path) -> dict:
    """noise_floor map (criterion -> points); ValueError when the hash does not match."""
    d = json.loads(Path(path).read_text(encoding="utf-8"))
    if d.get("sha256") != _digest(d["payload"]):
        raise ValueError(f"noise file hash mismatch: {path}")
    return d["payload"]["noise_floor"]


def plan_missing(trial_dir, arm, cases, repeats, pin) -> dict[int, list[str]]:
    """repeat -> cases without a trial of this arm at this pin."""
    have = set()
    for p in Path(trial_dir).glob("*.json"):
        t = json.loads(p.read_text(encoding="utf-8"))
        if t.get("pin") == pin:
            have.add((t.get("arm"), t.get("case"), t.get("repeat")))
    todo = {rep: [c for c in cases if (arm, c, rep) not in have] for rep in repeats}
    return {k: v for k, v in todo.items() if v}


def _ints(s):
    return [int(x) for x in s.split(",") if x]


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("aa")
    a.add_argument("--arm", required=True)
    a.add_argument("--pin", required=True)
    a.add_argument("--set1", required=True, type=_ints)
    a.add_argument("--set2", required=True, type=_ints)
    a.add_argument("--cases", default=str(DATA / "cases-dev.json"))
    a.add_argument("--grades", default=str(DATA / "criterion-grades.jsonl"))
    a.add_argument("--trials", default=str(DATA / "trials"))
    a.add_argument("--out", default=str(DATA / "noise-floor.json"))
    a.add_argument("--seed", type=int, default=7)
    a.add_argument("--boot", type=int, default=4000)
    args = ap.parse_args(argv)
    ids = [c["id"] for c in json.loads(Path(args.cases).read_text(encoding="utf-8"))]
    todo = plan_missing(args.trials, args.arm, ids, args.set1 + args.set2, args.pin)
    if todo:
        for rep, cs in todo.items():
            print(f"python -m evaluation.pipeline.driver trial --arm {args.arm} --repeat {rep} --cases {','.join(cs)}")
        print("then: python -m evaluation.pipeline.criterion_grade, and rerun this command", file=sys.stderr)
        return 3
    out = noise_report(*split_runs(S.load(args.grades), args.arm, args.set1, args.set2), args.seed, args.boot)
    out.update(arm=args.arm, pin=args.pin, set1=args.set1, set2=args.set2, cases=len(ids))
    write_noise(args.out, out)
    for k, v in sorted(out["noise_floor"].items()):
        print(f"{k}\tdelta {out['per_criterion'][k]['delta_points']}\tfloor {v}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
