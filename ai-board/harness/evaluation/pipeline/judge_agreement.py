#!/usr/bin/env python3
"""TPR/TNR of each evaluator (oracle corpus, oracle pack, judges) against owner labels, test split only.

python -m evaluation.pipeline.judge_agreement [--labels F] [--verdicts F] [--min-tpr X --min-tnr Y] [--out F]
Labels: owner entries {case_id, label pass|fail, split train|dev|test}. Verdicts: jsonl {evaluator, case_id, verdict}.
Without thresholds every evaluator is 'reference'; below them too.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from evaluation.pipeline import DATA
from evaluation.pipeline.oracle_agreement import EVID, _f, _rates
from evaluation.suite.grading import binary


def _load(path) -> list[dict]:
    p = Path(path)
    if not p.exists():
        return []
    text = p.read_text(encoding="utf-8").strip()
    return json.loads(text) if text.startswith("[") else [json.loads(x) for x in text.splitlines() if x.strip()]


def evaluate(items, rows, thr=None) -> dict[str, dict]:
    """Per evaluator: tpr (owner pass accepted), tnr (owner fail rejected), test-split owner labels only."""
    truth = {i["case_id"]: i["label"] for i in items
             if i.get("split") == "test" and i.get("label_source") == "owner" and i.get("label") in ("pass", "fail")}
    seen: dict[str, dict[str, str]] = {}
    for r in rows:
        verdict = binary(r.get("verdict"))
        if verdict:
            seen.setdefault(r["evaluator"], {})[r["case_id"]] = verdict
    out = {}
    for ev, by_case in sorted(seen.items()):
        pairs = [(lab, by_case[c] == "pass") for c, lab in truth.items() if c in by_case]
        tnr, tpr = _rates(pairs)
        ok = bool(thr) and tpr is not None and tnr is not None and tpr >= thr["min_tpr"] and tnr >= thr["min_tnr"]
        out[ev] = {"n_pass": sum(lab == "pass" for lab, _ in pairs), "n_fail": sum(lab == "fail" for lab, _ in pairs),
                   "missing": sum(c not in by_case for c in truth), "tpr": tpr, "tnr": tnr,
                   "status": "usable" if ok else "reference"}
    return out


def render(stats, thr=None) -> str:
    """Markdown report."""
    head = (f"Thresholds (owner): TPR >= {thr['min_tpr']}, TNR >= {thr['min_tnr']}." if thr
            else "No thresholds set by owner: all results are reference.")
    lines = ["# Evaluator agreement with owner labels (test split)", "", head,
             "TPR = owner pass and evaluator passes. TNR = owner fail and evaluator fails. Below threshold = reference only.", "",
             "| evaluator | labels (pass/fail) | missing | TPR | TNR | status |", "|---|---|---|---|---|---|"]
    for ev, s in stats.items():
        lines.append(f"| {ev} | {s['n_pass'] + s['n_fail']} ({s['n_pass']}/{s['n_fail']}) | {s['missing']} | "
                     f"{_f(s['tpr'])} | {_f(s['tnr'])} | {s['status']} |")
    return "\n".join(lines) + "\n"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--labels", default=str(EVID / "lf237-owner-labels.json"))
    ap.add_argument("--verdicts", default=str(DATA / "evaluator-verdicts.jsonl"))
    ap.add_argument("--min-tpr", type=float)
    ap.add_argument("--min-tnr", type=float)
    ap.add_argument("--out", default=str(DATA / "judge-agreement-report.md"))
    a = ap.parse_args(argv)
    items = _load(a.labels)
    if not any(i.get("split") == "test" and i.get("label_source") == "owner" for i in items):
        print(f"0 owner test-split labels in {a.labels}; nothing measured.")
        return 2
    thr = {"min_tpr": a.min_tpr, "min_tnr": a.min_tnr} if a.min_tpr is not None and a.min_tnr is not None else None
    md = render(evaluate(items, _load(a.verdicts), thr), thr)
    Path(a.out).write_text(md, encoding="utf-8")
    print(md)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
