#!/usr/bin/env python3
"""Per-criterion statistics over criterion-grades.jsonl. No combined score.

python -m evaluation.pipeline.criterion_stats report <grades.jsonl> [--arm X]
python -m evaluation.pipeline.criterion_stats compare <grades.jsonl> --a X --b Y [--seed 7] [--boot 4000]
"""
from __future__ import annotations

import argparse
import json
import math
import random
import sys
from collections import defaultdict
from pathlib import Path

from evaluation.suite.metrics import _binom_two_sided, wilson

ND = "not_gradable"
Z_ALPHA, Z_BETA = 1.96, 0.8416  # two-sided alpha 0.05, power 80%


def load(path, arm=None) -> list[dict]:
    rows = [json.loads(line) for line in Path(path).read_text(encoding="utf-8").splitlines() if line.strip()]
    return [r for r in rows if r["criterion"] != "*" and (arm is None or r["arm"] == arm)]


def upper_bound(k: int, n: int, alpha: float = 0.05) -> float:
    """One-sided Clopper-Pearson upper bound on rate for k of n (bisection). ~3/n at k=0."""
    if not n or k >= n:
        return 1.0
    lo, hi = k / n, 1.0
    for _ in range(60):
        mid = (lo + hi) / 2
        cdf = sum(math.comb(n, i) * mid**i * (1 - mid) ** (n - i) for i in range(k + 1))
        lo, hi = (mid, hi) if cdf > alpha else (lo, mid)
    return hi


def by_criterion(rows) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for r in rows:
        c = out.setdefault(r["criterion"], {"hard": r["hard"], "ok": 0, "bad": 0, "nd": 0})
        if r["match"] == ND:
            c["nd"] += 1
        elif r["match"]:
            c["ok"] += 1
        else:
            c["bad"] += 1
    return out


def per_case_means(rows) -> dict[str, dict[str, float]]:
    """criterion -> case -> mean match over gradable repeats (soft only)."""
    acc: dict = defaultdict(lambda: defaultdict(list))
    for r in rows:
        if r["match"] != ND and not r["hard"]:
            acc[r["criterion"]][r["case"]].append(float(bool(r["match"])))
    return {k: {c: sum(v) / len(v) for c, v in d.items()} for k, d in acc.items()}


def trial_passes(rows) -> list[dict]:
    """One derived row per trial: pass iff every gradable criterion matched; all-not_gradable trials dropped."""
    by: dict = defaultdict(list)
    for r in rows:
        by[r["trial"]].append(r)
    return [{**rs[0], "criterion": "pass_rate", "hard": False, "match": all(bool(r["match"]) for r in g), "value": None,
             "threshold": None} for rs in by.values() for g in [[r for r in rs if r["match"] != ND]] if g]


def add_pass_rate(rows) -> list[dict]:
    return rows + trial_passes(rows)


def pass_k(rows) -> dict:
    """pass^k: share of cases whose every gradable trial passed."""
    by: dict = defaultdict(list)
    for r in trial_passes(rows):
        by[r["case"]].append(r["match"])
    return {"cases": len(by), "pass_k": sum(all(v) for v in by.values()) / len(by) if by else None}


def mde(diffs: list[float]) -> float | None:
    """Min detectable paired difference in points; sd=0.707 (binary worst case) when SD is 0 or m<2."""
    m = len(diffs)
    if not m:
        return None
    sd = 0.0
    if m > 1:
        mu = sum(diffs) / m
        sd = math.sqrt(sum((d - mu) ** 2 for d in diffs) / (m - 1))
    sd = sd or math.sqrt(0.5)
    return round(100 * (Z_ALPHA + Z_BETA) * sd / math.sqrt(m), 1)


def compare_criterion(a: dict, b: dict, seed=7, boot=4000) -> dict:
    ids = sorted(set(a) & set(b))
    if not ids:
        return {"verdict": "no_data", "cases": 0, "mde_points": None}
    diff = [b[i] - a[i] for i in ids]
    rng = random.Random(seed)
    s = sorted(sum(diff[rng.randrange(len(diff))] for _ in diff) / len(diff) for _ in range(boot))
    lo, hi = round(100 * s[int(0.025 * boot)], 1), round(100 * s[int(0.975 * boot) - 1], 1)
    better, worse = sum(d > 0 for d in diff), sum(d < 0 for d in diff)
    p = _binom_two_sided(better, worse)
    verdict = "improved" if lo > 0 and p < 0.05 else "regressed" if hi < 0 and p < 0.05 else "no_significant_change"
    return {"verdict": verdict, "cases": len(ids), "delta_points": round(100 * sum(diff) / len(diff), 1),
            "ci95_points": [lo, hi], "better": better, "worse": worse, "sign_p": p, "mde_points": mde(diff)}


def compare(rows_a, rows_b, seed=7, boot=4000) -> dict:
    ma, mb = per_case_means(rows_a), per_case_means(rows_b)
    soft = {k: compare_criterion(ma[k], mb[k], seed, boot) for k in sorted(set(ma) & set(mb))}
    hard = {"a": {k: v["bad"] for k, v in by_criterion(rows_a).items() if v["hard"]},
            "b": {k: v["bad"] for k, v in by_criterion(rows_b).items() if v["hard"]}}
    hard["flagged"] = {"a": any(hard["a"].values()), "b": any(hard["b"].values())}
    return {"soft": soft, "hard": hard, "seed": seed, "boot": boot}


MDE_NOTE = ("Detectable difference: MDE = (1.96 + 0.8416) * sd / sqrt(m). Two-sided alpha 0.05, 80% power, m paired cases, "
            "sd = observed SD of per-case differences (0.707, the binary worst case, when SD is 0 or m < 2). A difference "
            "below the MDE is not reliably detectable: no_significant_change is not 'equal'.")


def report_md(rows, title="Criterion report") -> str:
    st = by_criterion(rows)
    out = [f"# {title}", "", f"Rows: {len(rows)}. No combined score. not_gradable rows are excluded from n.", "",
           "## Hard criteria", "", "| criterion | violations | n | not_gradable | 95% upper bound (rate) |", "|---|---|---|---|---|"]
    for k, v in sorted(st.items()):
        if v["hard"]:
            n = v["ok"] + v["bad"]
            out.append(f"| {k} | {v['bad']} | {n} | {v['nd']} | {100 * upper_bound(v['bad'], n):.1f}% |")
    out += ["", "Upper bound: one-sided exact binomial (Clopper-Pearson) 95%; about 3/n at 0 violations.", "",
            "## Soft criteria", "", "| criterion | k/n | rate | Wilson 95% | not_gradable | measured value of misses (min / median / max) |",
            "|---|---|---|---|---|---|"]
    values = defaultdict(list)
    for r in rows:
        if r.get("value") is not None:
            values[r["criterion"]].append(r["value"])
    for k, v in sorted(st.items()):
        if not v["hard"]:
            n = v["ok"] + v["bad"]
            lo, hi = wilson(v["ok"], n)
            rate = f"{100 * v['ok'] / n:.1f}%" if n else "-"
            vals = sorted(values.get(k, []))
            spread = f"{vals[0]} / {vals[len(vals) // 2]} / {vals[-1]}" if vals else "-"
            out.append(f"| {k} | {v['ok']}/{n} | {rate} | {lo}-{hi}% | {v['nd']} | {spread} |")
    pk = pass_k(rows)
    out += ["", f"pass^k (cases passing every repeat): {pk['pass_k']} over {pk['cases']} cases."]
    out += ["", "Soft n is the count of gradable trials; trials of the same case are not independent, so intervals are optimistic."]
    return "\n".join(out) + "\n"


def compare_md(res, a, b) -> str:
    out = [f"# Compare {a} vs {b} (A = baseline, B = candidate)", "",
           f"Paired by case, mean over repeats. Bootstrap over cases: seed {res['seed']}, {res['boot']} resamples. "
           "Verdict needs bootstrap CI excluding 0 and sign test p < 0.05.", "", "## Hard criteria", "",
           "| criterion | violations A | violations B |", "|---|---|---|"]
    for k in sorted(set(res["hard"]["a"]) | set(res["hard"]["b"])):
        out.append(f"| {k} | {res['hard']['a'].get(k, 0)} | {res['hard']['b'].get(k, 0)} |")
    fl = res["hard"]["flagged"]
    out += ["", f"Run A flagged: {fl['a']}. Run B flagged: {fl['b']}.", "", "## Soft criteria"]
    for k, v in res["soft"].items():
        out += ["", f"### {k}", ""]
        if v["verdict"] == "no_data":
            out.append("verdict: no_data (no common gradable cases)")
            continue
        out += [f"- verdict: **{v['verdict']}**", f"- cases: {v['cases']}, delta: {v['delta_points']} points, CI95: {v['ci95_points']}",
                f"- better/worse cases: {v['better']}/{v['worse']}, sign test p = {v['sign_p']}",
                f"- detectable difference (MDE, 80% power): {v['mde_points']} points"]
    return "\n".join(out) + f"\n\n{MDE_NOTE}\n"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("report")
    r.add_argument("grades")
    r.add_argument("--arm")
    c = sub.add_parser("compare")
    c.add_argument("grades")
    c.add_argument("--a", required=True)
    c.add_argument("--b", required=True)
    c.add_argument("--seed", type=int, default=7)
    c.add_argument("--boot", type=int, default=4000)
    args = ap.parse_args(argv)
    if args.cmd == "report":
        sys.stdout.write(report_md(add_pass_rate(load(args.grades, args.arm)), f"Criterion report{' arm ' + args.arm if args.arm else ''}"))
    else:
        res = compare(load(args.grades, args.a), load(args.grades, args.b), args.seed, args.boot)
        sys.stdout.write(compare_md(res, args.a, args.b))
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
