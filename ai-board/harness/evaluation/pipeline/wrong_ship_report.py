#!/usr/bin/env python3
"""Per-tier report for stored B0 trials: wrong-ship, solved, needs_review unproven, blocked. Re-grades candidates offline, no model.

python -m evaluation.pipeline.wrong_ship_report --round r204 [--round r205] [--trials trials] [--cases cases-dev.json] [--expectations f.json] [--out dir]
Writes b0-simple-report.json and .md. Infra trials stay out of n; a round with more than 10% infra is discarded.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

from evaluation import expectation_predicates as EP
from evaluation.pipeline import DATA
from evaluation.pipeline import criterion_stats as S
from evaluation.pipeline import lf235_grade as L

NO_EXPECTATION = (False, "no_expectation")
INFRA_MAX = 0.10
PROVIDER_ERR = re.compile(r"remote end closed|http error 5\d\d|connection (reset|refused|aborted)|timed out", re.I)
TIERS = ("wrong_ship", "solved", "needs_review_unproven", "blocked", "ungraded")


def is_infra(t: dict) -> bool:
    return bool(t.get("infra_tag") or t.get("timed_out") or t.get("failure_class") == "transient"
                or PROVIDER_ERR.search(str(t.get("verdict_reason") or "")))


def tier_of(t: dict, verdict: tuple | None) -> str:
    if t.get("outcome") not in L.SHIP:
        return "blocked"
    if verdict is None:
        return "ungraded"
    if not verdict[0]:
        return "wrong_ship"
    return "solved" if t["outcome"] == "ready_for_pr" else "needs_review_unproven"


def bound(k: int, n: int) -> float | None:
    """Upper 95% bound on the wrong-ship rate; 3/n when none observed."""
    if not n:
        return None
    return round(3 / n, 4) if k == 0 else round(S.upper_bound(k, n), 4)


def build(trials: dict, cases: dict, grader, expected: int | None = None) -> dict:
    """trials: stem -> trial json. grader(stem, trial, case) -> (ok, reason) | None (no candidate) | NO_EXPECTATION."""
    counts = dict.fromkeys(TIERS, 0)
    infra, wrong, no_exp, per = [], [], 0, {}
    for stem, t in sorted(trials.items()):
        if is_infra(t):
            infra.append(stem)
            continue
        verdict = grader(stem, t, cases.get(t.get("case"), {"id": t.get("case")}))
        if verdict == NO_EXPECTATION:
            no_exp += 1
            continue
        tier = per[stem] = tier_of(t, verdict)
        counts[tier] += 1
        if tier == "wrong_ship":
            wrong.append(stem)
    n = sum(counts.values())
    total = n + no_exp + len(infra)
    rate = round(len(infra) / total, 4) if total else 0.0
    return {"n": n, "tiers": counts, "wrong_ship_trials": wrong,
            "wrong_ship_upper_bound": bound(counts["wrong_ship"], n), "no_expectation": no_exp,
            "infra": {"n": len(infra), "rate": rate, "rerun_once": infra, "round_discarded": rate > INFRA_MAX},
            "trials": len(trials), "expected": expected, "partial": expected is not None and len(trials) < expected,
            "per_trial": per}


def stored_grader(trial_dir: Path, seed=None, expectations: dict | None = None):
    """Grader over <stem>.candidate.{html,diff}; seed(ref, path) -> base file text, default git show."""
    seed = seed or L._git_show
    data = expectations or EP.load_expectations()

    def grade(stem: str, t: dict, case: dict):
        if case["id"] not in data["cases"]:
            return NO_EXPECTATION
        art = L.find_artifact(trial_dir, stem)
        if art is None:
            return None
        target = case["file"]
        base = next((b for ref in (t.get("candidate_base_sha"), t.get("pin")) if ref
                     for b in [seed(ref, target)] if b), None)
        if base is None:
            return None
        dpath = trial_dir / f"{stem}.candidate.diff"
        diff = dpath.read_text(encoding="utf-8") if dpath.exists() else ""
        before = {target: base}
        before.update({p: "" for p, new in EP.C.diff_files(diff) if not new and p != target})
        after = EP.after_tree(before, target, diff, art.read_text(encoding="utf-8"))
        return EP.grade(before, after, case, data)
    return grade


def _pct(x) -> str:
    return "n/a" if x is None else f"{100 * x:.1f}%"


def md(r: dict, name: str) -> str:
    t, i = r["tiers"], r["infra"]
    head = f"# B0 simple tier, round {name}: {r['n']} graded trials"
    out = [head + (" (PARTIAL)" if r["partial"] else ""), ""]
    if r["partial"]:
        out += [f"PARTIAL: {r['trials']} of {r['expected']} trials ran. Numbers cover those trials only; nothing projected.", ""]
    if i["round_discarded"]:
        out += [f"ROUND DISCARDED: infra rate {_pct(i['rate'])} is over {_pct(INFRA_MAX)}.", ""]
    out += ["| tier | trials |", "|---|---|",
            f"| wrong-ship (expectation fails, shipped) | {t['wrong_ship']} |",
            f"| solved (ready_for_pr, expectation passes) | {t['solved']} |",
            f"| needs_review, correct but unproven | {t['needs_review_unproven']} |",
            f"| blocked | {t['blocked']} |", f"| shipped, no candidate to grade | {t['ungraded']} |", ""]
    k, n = t["wrong_ship"], r["n"]
    if k == 0:
        out.append(f"Wrong-ship: 0 observed in {n}. Upper bound 3/{n} = {_pct(r['wrong_ship_upper_bound'])} (95%).")
    else:
        out.append(f"Wrong-ship: {k}/{n}. Upper bound {_pct(r['wrong_ship_upper_bound'])} (95%).")
    out += [f"Wrong-ship trials: {', '.join(r['wrong_ship_trials']) or '-'}",
            f"Infra trials (outside n, rerun once): {i['n']} ({_pct(i['rate'])}): {', '.join(i['rerun_once']) or '-'}",
            f"No expectation for the case (outside n): {r['no_expectation']}"]
    return "\n".join(out) + "\n"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--round", action="append", required=True, help="e.g. r204; trial files B0-<round>-*.json")
    ap.add_argument("--trials", default=str(DATA / "trials"))
    ap.add_argument("--cases", default=str(DATA / "cases-dev.json"))
    ap.add_argument("--expectations")
    ap.add_argument("--out", default=str(DATA / "rounds"))
    ap.add_argument("--expected", type=int, help="trials a full round has; default case count")
    a = ap.parse_args(argv)
    case_list = json.loads(Path(a.cases).read_text(encoding="utf-8"))
    cases = {c["id"]: c for c in case_list}
    exps = EP.load_expectations(Path(a.expectations)) if a.expectations else None
    grader = stored_grader(Path(a.trials), expectations=exps)
    rounds = {}
    for rnd in a.round:
        trials = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in sorted(Path(a.trials).glob(f"B0-{rnd}-*.json"))}
        rounds[rnd] = build(trials, cases, grader, a.expected or len(case_list))
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "b0-simple-report.json").write_text(
        json.dumps({"tier": "simple", "arm": "B0", "rounds": rounds}, indent=1, ensure_ascii=False), encoding="utf-8")
    text = "\n".join(md(r, k) for k, r in rounds.items())
    (out / "b0-simple-report.md").write_text(text, encoding="utf-8")
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
