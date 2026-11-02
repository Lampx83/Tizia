"""Feature tier CLI (registered in eval_run): end-to-end feature cases, acceptance + rubric 0-3.

    python eval_run.py feature --records RECORDED.jsonl [--root DIR] [--repeats N]    # offline, no model
    python eval_run.py feature --driver pkg.module:fn --model NAME [--root DIR]       # real: fn(case, repeat) -> record, run by the operator
Dev cases only (evaluation/feature_cases.py); results under <root>/feature/<label>/. Drivers return the record described in evaluation/feature.py.
"""
from __future__ import annotations

import hashlib
import importlib
import json
import sys
from pathlib import Path
from types import SimpleNamespace

from evaluation import feature
from evaluation.feature_cases import CASES
from settings import get_settings


def register(subs) -> None:
    import eval_run
    p = subs.add_parser("feature", help="tầng chức năng e2e: acceptance tự động + rubric 0-3")
    p.add_argument("--root", default=str(get_settings().eval_dir or eval_run.DEFAULT_ROOT))
    p.add_argument("--records", help="jsonl bản ghi run đã thu (offline, không model)")
    p.add_argument("--driver", help="module:hàm chạy pipeline thật, trả record cho (case, repeat)")
    p.add_argument("--model", default="recorded", help="nhãn model ghim vào báo cáo")
    p.add_argument("--repeats", type=int, default=1)
    p.add_argument("--label", default="latest")
    p.set_defaults(handler=run, no_model=True)


def pins(model: str) -> dict:
    import eval_run
    from main import ROOT
    base = eval_run.pins(model, SimpleNamespace(models=SimpleNamespace()))
    manifest = ROOT / "ai-board" / "harness" / "runtime" / "tool_manifest.json"
    return {**base, "tool_manifest": hashlib.sha256(manifest.read_bytes().replace(b"\r\n", b"\n")).hexdigest()[:16] if manifest.exists() else None,
            "corpus_sha": hashlib.sha256(json.dumps(CASES, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]}


def run(args, deps=None, source=None) -> int:
    if bool(args.records) == bool(args.driver):
        print("[feature] cần đúng một trong --records / --driver", file=sys.stderr)
        return 2
    if args.records:
        driver, source = feature.Recorded(args.records), "recorded"
    else:
        module, _, name = args.driver.partition(":")
        driver, source = getattr(importlib.import_module(module), name), "real"
    meta = {"tier": "feature", "source": source, "model": args.model, "repeats": args.repeats, "pins": pins(args.model)}
    rep = feature.build_report(meta, feature.run(driver, args.repeats))
    out = Path(args.root) / "feature" / args.label
    out.mkdir(parents=True, exist_ok=True)
    (out / "report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    text = feature.render(rep)
    (out / "report.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return 0
