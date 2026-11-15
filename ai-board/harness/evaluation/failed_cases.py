"""Failed trace calls -> draft eval cases (pending_review). No model call, no GPU.

CLI: python -m evaluation.failed_cases --trace memory/traces.jsonl --out memory/failed-cases.jsonl
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

INFRA = re.compile(r"timed? ?out|timeout|connection|refused|unreachable|reset by peer|\b50[234]\b|out of memory|cuda|budget", re.I)
ABNORMAL_STOP = frozenset({"length", "content_filter"})
SPLITS = ("tune", "confirm")
SEALED_MARKERS = ("heldout", "sealed")
_RUN = re.compile(r"^run([^:]+):")
_SKILL = re.compile(r"^skill (\S+)")


def read_calls(paths) -> dict[str, dict]:
    """Trace jsonl -> {call_id: record}; partial lines (result/edits/evaluation updates) merge into the call."""
    calls: dict[str, dict] = {}
    for path in paths:
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            try:
                rec = json.loads(line)
            except ValueError:
                continue
            cid = rec.get("call_id")
            if not cid:
                continue
            calls.setdefault(cid, {}).update(rec)
    return {cid: rec for cid, rec in calls.items() if "gate" in rec}


def classify(rec: dict, rejected=frozenset()) -> str | None:
    """Failure reason for a call, None if not a case. Infra errors never become cases."""
    if INFRA.search(rec.get("error") or ""):
        return None
    run = _RUN.match(rec["call_id"])
    if rec["call_id"] in rejected or (run and run.group(1) in rejected):
        return "admin_rejected"
    if rec.get("result") not in (None, "ok"):
        return "result_not_ok"
    if (rec.get("metrics") or {}).get("done_reason") in ABNORMAL_STOP:
        return "stop_abnormal"
    return None


def split_for(case_id: str) -> str:
    """Stable split, ~1/3 tune, rest confirm; no sealed split ever."""
    return SPLITS[0] if int(hashlib.sha256(case_id.encode()).hexdigest()[:8], 16) % 3 == 0 else SPLITS[1]


def _case(rec: dict, reason: str) -> dict:
    notes = rec.get("notes") or []
    skill = next((m.group(1) for n in notes if n.get("name") == "skill" and (m := _SKILL.match(n.get("summary") or ""))), None)
    run = _RUN.match(rec["call_id"])
    body = {"prompt_name": rec.get("prompt_name"), "prompt_hash": rec.get("prompt_hash"),
            "prompt": rec.get("prompt_var") or "", "output": rec.get("output") or ""}
    case_id = "fail-" + hashlib.sha256(json.dumps(body, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
    return {"id": case_id, "status": "pending_review", "split": split_for(case_id), "reason": reason,
            "source": {"call_id": rec["call_id"], "run_id": run.group(1) if run else None, "gate": rec.get("gate"),
                       "prompt_name": rec.get("prompt_name"), "prompt_hash": rec.get("prompt_hash"), "skill": skill},
            "prompt": body["prompt"], "output": body["output"], "error": rec.get("error")}


def build_cases(calls: dict[str, dict], rejected=frozenset()) -> list[dict]:
    """Calls -> deduped draft cases, in call order."""
    seen: dict[str, dict] = {}
    for rec in calls.values():
        reason = classify(rec, rejected)
        if reason:
            case = _case(rec, reason)
            seen.setdefault(case["id"], case)
    return list(seen.values())


def append_new(cases: list[dict], out: str | Path) -> int:
    """Append cases whose id is not already in out; returns count written."""
    out = Path(out)
    if any(marker in str(out).lower() for marker in SEALED_MARKERS):
        raise ValueError(f"draft output must not be a sealed/heldout path: {out}")
    existing = set()
    if out.exists():
        existing = {json.loads(line)["id"] for line in out.read_text(encoding="utf-8").splitlines() if line.strip()}
    fresh = [c for c in cases if c["id"] not in existing]
    if fresh:
        out.parent.mkdir(parents=True, exist_ok=True)
        with out.open("a", encoding="utf-8") as f:
            f.writelines(json.dumps(c, ensure_ascii=False) + "\n" for c in fresh)
    return len(fresh)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--trace", action="append", required=True, help="trace jsonl (repeatable)")
    parser.add_argument("--out", required=True, help="draft cases jsonl (appended, deduped)")
    parser.add_argument("--rejections", help="json list of run ids or call_ids the admin rejected")
    args = parser.parse_args(argv)
    rejected = frozenset(json.loads(Path(args.rejections).read_text(encoding="utf-8"))) if args.rejections else frozenset()
    cases = build_cases(read_calls(args.trace), rejected)
    print(f"{append_new(cases, args.out)} case nháp mới (tổng ứng viên {len(cases)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
