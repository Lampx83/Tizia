#!/usr/bin/env python3
"""Owner-label agreement per soft criterion: catch-wrong / accept-right rates, bootstrap by dup_group, validated vs advisory.

python -m evaluation.pipeline.oracle_agreement [--labels F] [--grades F] [--drafts F] [--contract F] [--out F]
Truth = owner labels only (label_source "owner"); drafts supply dup_group, never a label.
"""
from __future__ import annotations

import argparse
import json
import random
from pathlib import Path

from evaluation.pipeline import DATA, REPO, WORKTREE

EVID = WORKTREE / ".scratch" / "ai-board-local-first" / "evidence"
SOFT = ("matches_intent", "decision_correct", "no_collateral", "vision_advisory")
CONTRACT = REPO / "server" / "ai-board" / "contract.json"
SEED, BOOT = 7, 2000


def load_owner_labels(path) -> dict[str, str]:
    """case_id -> pass|fail for entries with label_source 'owner'; {} if file missing."""
    p = Path(path)
    if not p.exists():
        return {}
    text = p.read_text(encoding="utf-8").strip()
    items = json.loads(text) if text.startswith("[") else [json.loads(x) for x in text.splitlines() if x.strip()]
    return {i["case_id"]: i["label"] for i in items
            if i.get("label_source") == "owner" and i.get("label") in ("pass", "fail")}


def load_groups(path) -> dict[str, object]:
    """case_id -> dup_group from draft rows; labels in this file are ignored."""
    p = Path(path)
    if not p.exists():
        return {}
    rows = [json.loads(x) for x in p.read_text(encoding="utf-8").splitlines() if x.strip()]
    return {r["case_id"]: r["dup_group"] for r in rows if "dup_group" in r}


def _rates(pairs):
    """pairs = (owner_label, observed_bool); returns (catch_wrong, accept_right), None when class empty."""
    fails = [o for lab, o in pairs if lab == "fail"]
    passes = [o for lab, o in pairs if lab == "pass"]
    return (sum(not o for o in fails) / len(fails) if fails else None,
            sum(passes) / len(passes) if passes else None)


def _lower_upper(vals):
    if not vals:
        return None
    vals = sorted(vals)
    n = len(vals)
    return vals[int(0.025 * n)], vals[min(n - 1, int(0.975 * n))]


def evaluate(rows, labels, groups, thr) -> dict[str, dict]:
    """Per soft criterion: rates, bootstrap 95% CIs over dup_group, status validated|advisory."""
    by_crit: dict[str, list] = {}
    for r in rows:
        if r.get("criterion") not in SOFT or not isinstance(r.get("observed"), bool):
            continue
        key = r["trial"] if r.get("trial") in labels else r.get("case")
        if labels.get(key) in ("pass", "fail"):
            by_crit.setdefault(r["criterion"], []).append((groups.get(key, key), labels[key], r["observed"]))
    out = {}
    for crit, items in by_crit.items():
        pairs = [(lab, o) for _, lab, o in items]
        cw, ar = _rates(pairs)
        by_group: dict = {}
        for g, lab, o in items:
            by_group.setdefault(g, []).append((lab, o))
        keys, rng = list(by_group), random.Random(SEED)
        cws, ars = [], []
        for _ in range(BOOT):
            sample = [p for g in rng.choices(keys, k=len(keys)) for p in by_group[g]]
            a, b = _rates(sample)
            if a is not None:
                cws.append(a)
            if b is not None:
                ars.append(b)
        cw_ci, ar_ci = _lower_upper(cws), _lower_upper(ars)
        ok = (len(pairs) >= thr["min_labels"] and cw_ci and ar_ci
              and cw_ci[0] >= thr["min_catch_wrong"] and ar_ci[0] >= thr["min_accept_right"])
        out[crit] = {"n_labels": len(pairs), "n_fail": sum(l == "fail" for l, _ in pairs),
                     "n_pass": sum(l == "pass" for l, _ in pairs), "n_groups": len(keys),
                     "catch_wrong": cw, "catch_wrong_ci": cw_ci, "accept_right": ar, "accept_right_ci": ar_ci,
                     "status": "validated" if ok else "advisory"}
    return out


def _f(x):
    return "n/a" if x is None else f"{x:.2f}"


def _ci(c):
    return "n/a" if c is None else f"[{c[0]:.2f}, {c[1]:.2f}]"


def render(stats, thr) -> str:
    """Markdown report."""
    lines = ["# Oracle / judge agreement with owner labels", "",
             f"Thresholds (contract): labels >= {thr['min_labels']}, catch-wrong lower bound >= {thr['min_catch_wrong']}, "
             f"accept-right lower bound >= {thr['min_accept_right']}. 95% bootstrap over dup_group, seed {SEED}, {BOOT} resamples.",
             "Catch-wrong = owner fail and check rejects. Accept-right = owner pass and check accepts.", "",
             "| criterion | labels (fail/pass) | groups | catch-wrong | 95% CI | accept-right | 95% CI | status |",
             "|---|---|---|---|---|---|---|---|"]
    for c, s in stats.items():
        lines.append(f"| {c} | {s['n_labels']} ({s['n_fail']}/{s['n_pass']}) | {s['n_groups']} | {_f(s['catch_wrong'])} | "
                     f"{_ci(s['catch_wrong_ci'])} | {_f(s['accept_right'])} | {_ci(s['accept_right_ci'])} | {s['status']} |")
    lines += ["", "Advisory criteria must not decide a comparison verdict."]
    return "\n".join(lines) + "\n"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--labels", default=str(EVID / "lf237-owner-labels.json"))
    ap.add_argument("--grades", default=str(DATA / "criterion-grades.jsonl"))
    ap.add_argument("--drafts", default=str(EVID / "lf237-draft-labels.jsonl"))
    ap.add_argument("--contract", default=str(CONTRACT))
    ap.add_argument("--out", default=str(DATA / "oracle-agreement-report.md"))
    a = ap.parse_args(argv)
    labels = load_owner_labels(a.labels)
    if not labels:
        print(f"0 owner labels in {a.labels}; label diffs with lf237-review.html and export first. Nothing validated.")
        return 2
    thr = json.loads(Path(a.contract).read_text(encoding="utf-8")).get("evaluation", {}).get("oracle_validation")
    if not thr:
        print(f"{len(labels)} owner labels, but {a.contract} has no evaluation.oracle_validation block.")
        return 2
    gp = Path(a.grades)
    rows = [json.loads(x) for x in gp.read_text(encoding="utf-8").splitlines() if x.strip()] if gp.exists() else []
    md = render(evaluate(rows, labels, load_groups(a.drafts), thr), thr)
    Path(a.out).write_text(md, encoding="utf-8")
    print(md)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
