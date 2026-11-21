"""Feature tier CLI (registered in eval_run): end-to-end feature cases, acceptance + rubric 0-3.

    python eval_run.py feature --records RECORDED.jsonl [--root DIR] [--repeats N]    # offline, no model
    python eval_run.py feature --driver pkg.module:fn --model NAME [--root DIR]       # real: fn(case, repeat) -> record, run by the operator
Dev cases only (evaluation/feature_cases.py); results under <root>/feature/<label>/. Drivers return the record described in evaluation/feature.py.
    --case ID                 run one case
    --cases-file PATH         tuning file in feature_expectation format; records are {diff, criteria}, graded by feature_expectation.grade_record (oracle_cmd included)
"""
from __future__ import annotations

import hashlib
import importlib
import json
import sys
from pathlib import Path
from types import SimpleNamespace

from evaluation import feature
from evaluation import feature_expectation as fx
from evaluation.feature_cases import CASES
from settings import get_settings


def register(subs) -> None:
    from evaluation import eval_run
    p = subs.add_parser("feature", help="tầng chức năng e2e: acceptance tự động + rubric 0-3")
    p.add_argument("--root", default=str(get_settings().eval_dir or eval_run.DEFAULT_ROOT))
    p.add_argument("--records", help="jsonl bản ghi run đã thu (offline, không model)")
    p.add_argument("--driver", help="module:hàm chạy pipeline thật, trả record cho (case, repeat)")
    p.add_argument("--model", default="recorded", help="nhãn model ghim vào báo cáo")
    p.add_argument("--repeats", type=int, default=1)
    p.add_argument("--label", default="latest")
    p.add_argument("--cases-file", help="file ca tuning (định dạng feature_expectation) thay cho feature_cases.CASES")
    p.add_argument("--case", help="chỉ chạy ca có id này")
    p.set_defaults(handler=run, no_model=True)


def pins(model: str, cases=None) -> dict:
    from evaluation import eval_run
    from runtime.pipeline import ROOT
    base = eval_run.pins(model, SimpleNamespace(models=SimpleNamespace()))
    manifest = ROOT / "ai-board" / "harness" / "runtime" / "tool_manifest.json"
    return {**base, "tool_manifest": hashlib.sha256(manifest.read_bytes().replace(b"\r\n", b"\n")).hexdigest()[:16] if manifest.exists() else None,
            "corpus_sha": hashlib.sha256(json.dumps(CASES if cases is None else [{k: v for k, v in c.items() if k != "_dir"} for c in cases], ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]}


def load_cases(path, case_id=None) -> list[dict]:
    """Cases from a tuning file (each gets _dir = file dir, for oracle_files) or the default corpus; narrowed to case_id. Raise KeyError when none match."""
    if path:
        base = Path(path).parent
        cases = [{**c, "_dir": base} for c in fx.load(Path(path))["cases"]]
    else:
        cases = CASES
    picked = [c for c in cases if case_id in (None, c["id"])]
    if not picked:
        raise KeyError(case_id)
    return picked


def grade_rows(cases: list[dict], driver, repeats: int) -> list[dict]:
    """One score row per (case, repeat) via grade_record; rubric 3 all green, 2 files green, else 0."""
    rows = []
    for r in range(1, repeats + 1):
        for c in cases:
            rec = driver(c, r)
            g = fx.grade_record(c, rec)
            rows.append({"case": c["id"], "size": "tuning", "repeat": r, "split": "dev", "rubric": 3 if g["ok"] else 2 if g["files_ok"] else 0,
                         "accepted": g["ok"], "plan_ok": g["files_ok"], "resumes": int(rec.get("resumes") or 0), "grade": g})
    return rows


def run(args, deps=None, source=None) -> int:
    if bool(args.records) == bool(args.driver):
        print("[feature] cần đúng một trong --records / --driver", file=sys.stderr)
        return 2
    if args.records:
        driver, source = feature.Recorded(args.records), "recorded"
    else:
        module, _, name = args.driver.partition(":")
        driver, source = getattr(importlib.import_module(module), name), "real"
    try:
        cases = load_cases(args.cases_file, args.case)
    except KeyError:
        print(f"[feature] không có ca {args.case!r}", file=sys.stderr)
        return 2
    meta = {"tier": "feature", "source": source, "model": args.model, "repeats": args.repeats, "pins": pins(args.model, cases if args.cases_file else None)}
    try:
        rows = grade_rows(cases, driver, args.repeats) if args.cases_file else feature.run(driver, args.repeats, cases)
    except fx.OracleInfra as err:
        print(f"[feature] oracle không chạy được (hạ tầng): {err}", file=sys.stderr)
        return 3
    rep = feature.build_report(meta, rows)
    out = Path(args.root) / "feature" / args.label
    out.mkdir(parents=True, exist_ok=True)
    (out / "report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    text = feature.render(rep)
    (out / "report.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return 0
