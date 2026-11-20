#!/usr/bin/env python3
"""Regression gate over criterion-grades.jsonl: per-criterion verdicts, slices, pass^k, paired rows, report integrity.

python -m evaluation.pipeline.eval_gate manifest <grades.jsonl> --arms X,Y --out manifest.json [--expected plan.json]
python -m evaluation.pipeline.eval_gate gate <grades.jsonl> --base X --cand Y --manifest manifest.json [--noise noise-floor.json]
Exit 0 pass, 1 regress or integrity refusal, 2 inconclusive (unpaired rows).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import sys
from pathlib import Path

from evaluation.pipeline import DATA
from evaluation.pipeline import aa_noise
from evaluation.pipeline import criteria
from evaluation.pipeline import criterion_stats as S
MIN_SLICE_N = 10


class IntegrityError(ValueError):
    pass


def _h(obj) -> str:
    return hashlib.sha256(json.dumps(obj, sort_keys=True, ensure_ascii=False, default=list).encode("utf-8")).hexdigest()


def key(r) -> tuple:
    return (r["case"], r["repeat"], r.get("seed"))


def pair_key(trial: dict) -> tuple:
    """(case, model seed) a trial pairs on across rounds."""
    return (trial.get("case"), trial.get("model_seed", trial.get("seed")))


def slice_of(case: dict) -> dict:
    return {"types": sorted(case.get("types") or []), "level": case.get("level"), "tier": case.get("tier"),
            "attack": criteria.is_attack(case)}


def enrich(rows, trial_dir, cases: dict) -> list[dict]:
    """Add seed (from trial json) and slice fields (from case) to grade rows."""
    out, seeds = [], {}
    for r in rows:
        if r["trial"] not in seeds:
            p = Path(trial_dir) / f"{r['trial']}.json"
            t = json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
            seeds[r["trial"]] = pair_key(t)[1] if t else r.get("seed")
        out.append({**r, "seed": seeds[r["trial"]], **(slice_of(cases[r["case"]]) if r["case"] in cases else {})})
    return out


def params(noise=None, seed=7, boot=4000) -> dict:
    return {"noise_floor": noise or {}, "seed": seed, "boot": boot}


def make_manifest(rows, cases, expected=None, gate_params=None) -> dict:
    """Manifest to pin before measuring; expected defaults to the keys present in rows (weak: supply a plan)."""
    if expected is None:
        expected = {}
        for r in rows:
            expected.setdefault(r["arm"], set()).add(key(r))
    return {"criteria_hash": _h({c.id: [c.hard, c.question, c.check] for c in criteria.CRITERIA.values()}),
            "quality_hash": _h(criteria.QUALITY), "gate_hash": _h(gate_params or params()),
            "expected": {a: sorted([list(k) for k in ks], key=str) for a, ks in expected.items()},
            "slices": {r["case"]: slice_of(cases[r["case"]]) for r in rows if r["case"] in cases}}


def _bad(v) -> bool:
    return v is None or (isinstance(v, float) and math.isnan(v))


def check_integrity(manifest, rows, cases, gate_params=None) -> None:
    """Raise IntegrityError on any sign of a doctored report."""
    if manifest["criteria_hash"] != _h({c.id: [c.hard, c.question, c.check] for c in criteria.CRITERIA.values()}):
        raise IntegrityError("criteria table changed since manifest")
    if manifest["quality_hash"] != _h(criteria.QUALITY):
        raise IntegrityError("quality_checks changed since manifest")
    if manifest["gate_hash"] != _h(gate_params or params()):
        raise IntegrityError("gate thresholds changed since manifest")
    for r in rows:
        if r["match"] != S.ND and (_bad(r["match"]) or any(isinstance(r.get(f), float) and math.isnan(r[f])
                                                          for f in ("value", "threshold"))):
            raise IntegrityError(f"NaN/None metric on gradable row {r['trial']} {r['criterion']}")
        name = r["criterion"].removeprefix("quality:")
        if r["criterion"].startswith("quality:") and r.get("threshold") is not None \
                and r["threshold"] != criteria.QUALITY.get(name, {}).get("threshold"):
            raise IntegrityError(f"threshold for {r['criterion']} differs from contract")
    for r in rows:
        if r["case"] not in cases or manifest["slices"].get(r["case"]) != slice_of(cases[r["case"]]):
            raise IntegrityError(f"slice of case {r['case']} differs from manifest")
    expected = {a: {tuple(k) for k in ks} for a, ks in manifest["expected"].items()}
    seen: dict = {}
    for r in rows:
        if key(r) not in expected.get(r["arm"], ()):
            raise IntegrityError(f"seed/trial {key(r)} of arm {r['arm']} outside expected list")
        seen.setdefault((r["arm"], key(r)), set()).add(r["criterion"])
    for arm, ks in expected.items():
        for k in sorted(ks, key=str):
            if (arm, k) not in seen:
                raise IntegrityError(f"missing trial {k} of arm {arm}")
            need = {c.id for c, _ in criteria.table_for(cases[k[0]])}
            if need - seen[(arm, k)]:
                raise IntegrityError(f"missing criterion rows {sorted(need - seen[(arm, k)])} for {k} of arm {arm}")


def _verdict(v, thr) -> str:
    if v["verdict"] == "no_data":
        return "inconclusive"
    lo, hi = v["ci95_points"]
    return "regress" if hi < thr else "pass" if lo >= thr else "inconclusive"


def _paired(base, cand) -> dict:
    """criterion -> pass_to_fail / fail_to_pass key lists over gradable rows present on both sides."""
    side = [{(key(r), r["criterion"]): bool(r["match"]) for r in rs if r["match"] != S.ND} for rs in (base, cand)]
    out: dict = {}
    for (k, crit), a in side[0].items():
        if (k, crit) in side[1]:
            o = out.setdefault(crit, {"pass_to_fail": [], "fail_to_pass": [], "n": 0})
            o["n"] += 1
            if a and not side[1][(k, crit)]:
                o["pass_to_fail"].append(k)
            elif not a and side[1][(k, crit)]:
                o["fail_to_pass"].append(k)
    for o in out.values():
        o["pass_to_fail"].sort(key=str)
        o["fail_to_pass"].sort(key=str)
        o["rate_pass_to_fail"] = round(len(o["pass_to_fail"]) / o["n"], 4)
    return out


def _slice_keys(r):
    yield from (f"types:{t}" for t in r.get("types") or [])
    for dim in ("level", "tier", "attack"):
        if r.get(dim) is not None:
            yield f"{dim}:{r[dim]}"


def _slices(pa, pb, thr, seed, boot) -> dict:
    members: dict = {}
    for r in pa + pb:
        for s in _slice_keys(r):
            members.setdefault(s, set()).add(r["case"])
    ma, mb = S.per_case_means(pa)["pass_rate"], S.per_case_means(pb)["pass_rate"]
    out = {}
    for s, cs in sorted(members.items()):
        v = S.compare_criterion({c: ma[c] for c in cs if c in ma}, {c: mb[c] for c in cs if c in mb}, seed, boot)
        out[s] = {**v, "n": v["cases"], "small_n": v["cases"] < MIN_SLICE_N, "verdict": _verdict(v, thr)}
    return out


def gate(base, cand, noise=None, manifest=None, cases=None, seed=7, boot=4000) -> dict:
    if manifest is not None:
        check_integrity(manifest, base + cand, cases or {}, params(noise, seed, boot))
    noise = noise or {}
    ab, cb = S.add_pass_rate(base), S.add_pass_rate(cand)
    cmp = S.compare(ab, cb, seed, boot)
    thr = {k: -noise[k] if k in noise else 0.0 for k in set(cmp["soft"]) | {"pass_rate", "pass_k"}}
    soft = {k: {**v, "verdict": _verdict(v, thr[k])} for k, v in cmp["soft"].items()}
    pairs = _paired(base, cand)
    hard = {}
    for k in sorted(set(cmp["hard"]["a"]) | set(cmp["hard"]["b"])):
        a, b = cmp["hard"]["a"].get(k, 0), cmp["hard"]["b"].get(k, 0)
        new = pairs.get(k, {}).get("pass_to_fail", [])
        hard[k] = {"base": a, "cand": b, "pass_to_fail": new, "verdict": "regress" if b > a or new else "pass"}
    pa, pb = S.trial_passes(base), S.trial_passes(cand)
    pk = {"base": S.pass_k(base)["pass_k"], "cand": S.pass_k(cand)["pass_k"]}
    flat = lambda rs: {c: float(all(r["match"] for r in rs if r["case"] == c)) for c in {r["case"] for r in rs}}
    v = S.compare_criterion(flat(pa), flat(pb), seed, boot)
    pk.update(v, verdict=_verdict(v, thr["pass_k"]))
    slices = _slices(pa, pb, thr["pass_rate"], seed, boot) if "pass_rate" in S.per_case_means(pa) else {}
    kb, kc = {key(r) for r in base}, {key(r) for r in cand}
    unpaired = {"base_only": sorted(kb - kc, key=str), "cand_only": sorted(kc - kb, key=str)}
    regress = any(x["verdict"] == "regress" for x in [*soft.values(), *hard.values(), *slices.values(), pk])
    overall = "regress" if regress else "inconclusive" if unpaired["base_only"] or unpaired["cand_only"] else "pass"
    return {"soft": soft, "hard": hard, "paired": pairs, "unpaired": unpaired, "slices": slices, "pass_k": pk,
            "threshold_points": thr, "overall": overall, "exit": {"pass": 0, "regress": 1, "inconclusive": 2}[overall]}


def gate_md(res, base, cand) -> str:
    out = [f"# Gate {base} (baseline) vs {cand} (candidate): {res['overall'].upper()}", "",
           "Verdict: regress when the whole bootstrap CI of delta is below the threshold (0, or minus the A/A noise floor).", "",
           "| criterion | verdict | delta pts | CI95 | threshold | MDE pts |", "|---|---|---|---|---|---|"]
    for k, v in res["soft"].items():
        out.append(f"| {k} | {v['verdict']} | {v.get('delta_points')} | {v.get('ci95_points')} | {res['threshold_points'][k]} | {v.get('mde_points')} |")
    out += ["", "## Hard", "", "| criterion | base | cand | pass->fail pairs | verdict |", "|---|---|---|---|---|"]
    out += [f"| {k} | {v['base']} | {v['cand']} | {len(v['pass_to_fail'])} | {v['verdict']} |" for k, v in res["hard"].items()]
    pk = res["pass_k"]
    out += ["", f"## pass^k: base {pk['base']}, cand {pk['cand']}: {pk['verdict']}", "", "## Slices (pass_rate)", "",
            "| slice | n | verdict | delta pts | CI95 |", "|---|---|---|---|---|"]
    out += [f"| {k} | {v['n']}{' (small)' if v['small_n'] else ''} | {v['verdict']} | {v.get('delta_points')} | {v.get('ci95_points')} |"
            for k, v in res["slices"].items()]
    out += ["", "## Paired pass->fail (soft)", ""]
    for k, p in res["paired"].items():
        if p["pass_to_fail"] and k not in res["hard"]:
            out.append(f"- {k}: {len(p['pass_to_fail'])} pass->fail ({100 * p['rate_pass_to_fail']:.1f}%), "
                       f"{len(p['fail_to_pass'])} fail->pass")
    u = res["unpaired"]
    out += ["", f"unpaired: base_only {len(u['base_only'])}, cand_only {len(u['cand_only'])}"]
    return "\n".join(out) + "\n"


def _cases(args) -> dict:
    return {c["id"]: c for p in (args.cases, args.attack) for c in json.loads(Path(p).read_text(encoding="utf-8"))}


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    for name in ("manifest", "gate"):
        p = sub.add_parser(name)
        p.add_argument("grades")
        p.add_argument("--cases", default=str(DATA / "cases-dev.json"))
        p.add_argument("--attack", default=str(DATA / "attack-cases.json"))
        p.add_argument("--trials", default=str(DATA / "trials"))
        p.add_argument("--noise")
        p.add_argument("--seed", type=int, default=7)
        p.add_argument("--boot", type=int, default=4000)
    m = sub.choices["manifest"]
    m.add_argument("--arms", required=True)
    m.add_argument("--out", required=True)
    m.add_argument("--expected", help="json {arm: [[case, repeat, seed], ...]} planned before the run")
    g = sub.choices["gate"]
    g.add_argument("--base", required=True)
    g.add_argument("--cand", required=True)
    g.add_argument("--manifest", required=True)
    args = ap.parse_args(argv)
    cases = _cases(args)
    noise = aa_noise.load_noise(args.noise) if args.noise else None
    rows = enrich(S.load(args.grades), args.trials, cases)
    gp = params(noise, args.seed, args.boot)
    if args.cmd == "manifest":
        arms = args.arms.split(",")
        exp = json.loads(Path(args.expected).read_text(encoding="utf-8")) if args.expected else None
        if exp:
            exp = {a: {tuple(k) for k in ks} for a, ks in exp.items()}
        Path(args.out).write_text(json.dumps(make_manifest([r for r in rows if r["arm"] in arms], cases, exp, gp), indent=1),
                                  encoding="utf-8")
        return 0
    base, cand = ([r for r in rows if r["arm"] == a] for a in (args.base, args.cand))
    try:
        res = gate(base, cand, noise, json.loads(Path(args.manifest).read_text(encoding="utf-8")), cases, args.seed, args.boot)
    except IntegrityError as e:
        print(f"REFUSED: {e}")
        return 1
    sys.stdout.write(gate_md(res, args.base, args.cand))
    return res["exit"]


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
