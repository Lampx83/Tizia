#!/usr/bin/env python3
"""TPR/TNR of each evaluator (oracle corpus, oracle pack, judges) against human labels, test split only.

python -m evaluation.pipeline.judge_agreement [--labels F...] [--verdicts F] [--min-tpr X --min-tnr Y [--min-n N]] [--out F]
python -m evaluation.pipeline.judge_agreement --export-results EVAL results.jsonl | --export-judge EVAL judge.jsonl
                                              | --export-grades EVAL grades.json blindmap.json   (writes --verdicts)
Labels: owner-reviewed ('owner') and AI-labelled owner-approved ('ai' with approved_by) reported as separate sources plus combined.
Verdicts: jsonl {evaluator, trial|case, verdict}. Without thresholds, or when anything is missing/too small, an evaluator is 'reference'.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import random
from pathlib import Path

from evaluation.pipeline import DATA, WORKTREE
from evaluation.pipeline.oracle_agreement import BOOT, EVID, SEED, _f, _lower_upper, _rates
from evaluation.suite.grading import binary

SOURCES = ("owner", "ai_owner_approved", "combined")
DEFAULT_LABELS = [WORKTREE / ".scratch" / "ai-board-owner-prep" / "237-labels-owner.jsonl",
                  EVID / "lf237-ai-labels-owner-approved-2026-11-20.json"]
NO_EVALUATOR = "(no evaluator)"
DEFAULT_MIN_N = 10


def _read(path) -> list[dict]:
    p = Path(path)
    if not p.exists():
        return []
    text = p.read_text(encoding="utf-8").strip()
    return json.loads(text) if text.startswith("[") else [json.loads(x) for x in text.splitlines() if x.strip()]


def split_for(case: str) -> str:
    """Deterministic 60/20/20 train/dev/test by case."""
    bucket = int(hashlib.sha256(case.encode("utf-8")).hexdigest(), 16) % 10
    return "train" if bucket < 6 else "dev" if bucket < 8 else "test"


def load_labels(paths) -> tuple[list[dict], dict]:
    """Normalised label items {trial, case, label, split, source} plus a report of conflicts and skipped rows."""
    rows, missing = [], []
    for p in paths:
        if Path(p).exists():
            rows += _read(p)
        else:
            missing.append(str(p))
    case_split, split_conflicts = {}, []
    for r in rows:
        case, sp = r.get("case") or r.get("trial"), r.get("split")
        if case and sp in ("train", "dev", "test"):
            if case_split.setdefault(case, sp) != sp and case not in split_conflicts:
                split_conflicts.append(case)
    by_trial: dict[str, dict] = {}
    skipped = 0
    for r in rows:
        who = r.get("label_source") or r.get("labeller")
        source = "owner" if who == "owner" else "ai_owner_approved" if who == "ai" and r.get("approved_by") else None
        trial = r.get("trial") or r.get("case")
        if source is None or r.get("label") not in ("pass", "fail") or not trial:
            skipped += 1
            continue
        case = r.get("case") or trial
        entry = by_trial.setdefault(trial, {"case": case, "owner": set(), "ai_owner_approved": set()})
        entry[source].add(r["label"])
    items, conflicts, disagree = [], [], []
    for trial, e in by_trial.items():
        if len(e["owner"]) > 1 or len(e["ai_owner_approved"]) > 1:
            conflicts.append(trial)
            continue
        source = "owner" if e["owner"] else "ai_owner_approved"
        label = next(iter(e[source]))
        if e["owner"] and e["ai_owner_approved"] and e["ai_owner_approved"] != e["owner"]:
            disagree.append(trial)
        items.append({"trial": trial, "case": e["case"], "label": label, "source": source,
                      "split": case_split.get(e["case"]) or split_for(e["case"])})
    return items, {"label_conflicts": conflicts, "owner_ai_disagree": disagree, "split_conflicts": split_conflicts,
                   "skipped_unapproved": skipped, "missing_files": missing}


def _lookup(by_key, item):
    for k in (item["trial"], item["case"]):
        s = by_key.get(k)
        if s and len(s) == 1:
            return next(iter(s))
    return None


def _stats(subset, by_key, thr):
    pairs, groups, missing = [], {}, 0
    for it in subset:
        v = _lookup(by_key, it)
        if v is None:
            missing += 1
            continue
        pair = (it["label"], v == "pass")
        pairs.append(pair)
        groups.setdefault(it["case"], []).append(pair)
    tnr, tpr = _rates(pairs)
    n_pass, n_fail = sum(l == "pass" for l, _ in pairs), sum(l == "fail" for l, _ in pairs)
    out = {"n_pass": n_pass, "n_fail": n_fail, "missing": missing, "tpr": tpr, "tnr": tnr, "tpr_lower": None, "tnr_lower": None}
    reasons = []
    if missing:
        reasons.append(f"{missing} labels missing a valid verdict")
    if not thr:
        reasons.append("no owner threshold set")
    else:
        for name, n in (("pass", n_pass), ("fail", n_fail)):
            if n < thr["min_n"]:
                reasons.append(f"too few {name} labels ({n} < {thr['min_n']})")
        if groups:
            keys, rng, tprs, tnrs = list(groups), random.Random(SEED), [], []
            for _ in range(BOOT):
                b, a = _rates([p for g in rng.choices(keys, k=len(keys)) for p in groups[g]])
                if a is not None:
                    tprs.append(a)
                if b is not None:
                    tnrs.append(b)
            lo_tpr, lo_tnr = _lower_upper(tprs), _lower_upper(tnrs)
            out["tpr_lower"], out["tnr_lower"] = lo_tpr and lo_tpr[0], lo_tnr and lo_tnr[0]
            if out["tpr_lower"] is not None and out["tpr_lower"] < thr["min_tpr"]:
                reasons.append(f"TPR lower bound {out['tpr_lower']:.2f} < {thr['min_tpr']}")
            if out["tnr_lower"] is not None and out["tnr_lower"] < thr["min_tnr"]:
                reasons.append(f"TNR lower bound {out['tnr_lower']:.2f} < {thr['min_tnr']}")
    out["status"], out["reason"] = ("reference", "; ".join(reasons)) if reasons else ("usable", "")
    return out


def evaluate(items, rows, thr=None) -> dict:
    """Per evaluator and label source: tpr (owner pass accepted), tnr (owner fail rejected), test split only; every evaluator seen is listed."""
    if thr:
        thr = {"min_n": DEFAULT_MIN_N, **thr}
    seen: dict[str, dict] = {}
    for r in rows:
        ev = r.get("evaluator")
        e = seen.setdefault(ev or NO_EVALUATOR, {"by_key": {}, "n_rows": 0, "n_valid": 0, "n_invalid": 0})
        e["n_rows"] += 1
        key, v = r.get("trial") or r.get("case_id") or r.get("case"), binary(r.get("verdict"))
        if not ev or not key or v is None:
            e["n_invalid"] += 1
            continue
        e["n_valid"] += 1
        e["by_key"].setdefault(key, set()).add(v)
    test = [i for i in items if i["split"] == "test"]
    out = {}
    for ev, e in sorted(seen.items()):
        by_source = {src: _stats([i for i in test if src == "combined" or i["source"] == src], e["by_key"], thr) for src in SOURCES}
        out[ev] = {"by_source": by_source, "n_rows": e["n_rows"], "n_valid": e["n_valid"], "n_invalid": e["n_invalid"],
                   "conflicts": sum(len(s) > 1 for s in e["by_key"].values())}
    return {"evaluators": out}


def render(res, report, thr=None) -> str:
    """Markdown report."""
    head = (f"Thresholds (owner): TPR >= {thr['min_tpr']}, TNR >= {thr['min_tnr']}, min labels per class {thr.get('min_n', DEFAULT_MIN_N)}; "
            "bootstrap 95% lower bound by case." if thr else "No thresholds set by owner: all results are reference.")
    lines = ["# Evaluator agreement with human labels (test split)", "", head,
             "TPR = label pass and evaluator passes. TNR = label fail and evaluator fails. Missing or invalid verdicts block 'usable'.",
             "Sources: owner = owner-reviewed; ai_owner_approved = AI-labelled, owner-approved; combined = both (owner wins on a shared trial).", "",
             f"Label files missing: {report['missing_files'] or 'none'}. Skipped label rows: {report['skipped_unapproved']}. "
             f"Conflicting trials dropped: {report['label_conflicts'] or 'none'}. Owner/AI disagreements: {report['owner_ai_disagree'] or 'none'}. "
             f"Cases with conflicting splits: {report['split_conflicts'] or 'none'}.", "",
             "| evaluator | source | labels (pass/fail) | missing | TPR | TNR | status | reason |", "|---|---|---|---|---|---|---|---|"]
    for ev, e in res["evaluators"].items():
        for src, s in e["by_source"].items():
            lines.append(f"| {ev} | {src} | {s['n_pass'] + s['n_fail']} ({s['n_pass']}/{s['n_fail']}) | {s['missing']} | "
                         f"{_f(s['tpr'])} | {_f(s['tnr'])} | {s['status']} | {s['reason']} |")
        lines.append(f"| {ev} | verdict rows | {e['n_rows']} rows, {e['n_valid']} valid, {e['n_invalid']} invalid, {e['conflicts']} conflicting | | | | | |")
    return "\n".join(lines) + "\n"


def export_results(evaluator, path) -> list[dict]:
    """Oracle rows from results.jsonl: resolved -> pass."""
    return [{"evaluator": evaluator, "trial": r.get("trial") or r.get("case") or r.get("id"), "verdict": "pass" if r.get("resolved") else "fail"}
            for r in _read(path)]


def export_judge(evaluator, path) -> list[dict]:
    """Judge rows from judge.jsonl (equivalent/partial/different)."""
    return [{"evaluator": evaluator, "trial": r.get("case"), "verdict": r.get("verdict")} for r in _read(path)]


def export_grades(evaluator, grades_path, blindmap_path) -> list[dict]:
    """Blind grades joined to the task id through blindmap.json."""
    key = json.loads(Path(blindmap_path).read_text(encoding="utf-8"))
    return [{"evaluator": evaluator, "trial": key[g["blind_id"]]["id"], "verdict": g.get("verdict")}
            for g in _read(grades_path) if g.get("blind_id") in key]


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--labels", nargs="+", default=[str(p) for p in DEFAULT_LABELS])
    ap.add_argument("--verdicts", default=str(DATA / "evaluator-verdicts.jsonl"))
    ap.add_argument("--min-tpr", type=float)
    ap.add_argument("--min-tnr", type=float)
    ap.add_argument("--min-n", type=int, default=DEFAULT_MIN_N)
    ap.add_argument("--out", default=str(DATA / "judge-agreement-report.md"))
    ap.add_argument("--export-results", nargs=2, action="append", metavar=("EVAL", "FILE"), default=[])
    ap.add_argument("--export-judge", nargs=2, action="append", metavar=("EVAL", "FILE"), default=[])
    ap.add_argument("--export-grades", nargs=3, action="append", metavar=("EVAL", "GRADES", "BLINDMAP"), default=[])
    a = ap.parse_args(argv)
    if (a.min_tpr is None) != (a.min_tnr is None):
        ap.error("--min-tpr and --min-tnr go together")
    if a.export_results or a.export_judge or a.export_grades:
        rows = ([r for e, f in a.export_results for r in export_results(e, f)] + [r for e, f in a.export_judge for r in export_judge(e, f)]
                + [r for e, g, m in a.export_grades for r in export_grades(e, g, m)])
        Path(a.verdicts).write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n", encoding="utf-8")
        print(f"{len(rows)} verdict rows -> {a.verdicts}")
        return 0
    items, report = load_labels(a.labels)
    if not any(i["split"] == "test" for i in items):
        print(f"0 test-split labels from {a.labels}; nothing measured.")
        return 2
    thr = {"min_tpr": a.min_tpr, "min_tnr": a.min_tnr, "min_n": a.min_n} if a.min_tpr is not None else None
    md = render(evaluate(items, _read(a.verdicts), thr), report, thr)
    Path(a.out).write_text(md, encoding="utf-8")
    print(md)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
