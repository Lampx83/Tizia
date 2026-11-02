"""Feature tier: acceptance, rubric 0-3 and metrics over a run record.

record: {"plan": {"steps": [{"path","tier","kind"?}], "clarify"?} | None, "files": {path: text}, "handed": [kind], "resumes": int}
rubric: 0 no/wrong plan, 1 correct plan, 2 some expected file written, 3 acceptance passed.
"""
from __future__ import annotations

import fnmatch
import json
import re
from collections import Counter

from evaluation.feature_cases import CASES

LEVELS = (0, 1, 2, 3)


def wilson(k: int, n: int, z: float = 1.96) -> tuple[float, float]:
    """Wilson 95% interval in % for k of n."""
    if not n:
        return 0.0, 0.0
    p, scale = k / n, 1 + z * z / n
    half = z * (p * (1 - p) / n + z * z / (4 * n * n)) ** 0.5 / scale
    centre = (p + z * z / (2 * n)) / scale
    return round(100 * (centre - half), 1) + 0.0, round(100 * (centre + half), 1) + 0.0


def _match(files: dict, glob: str) -> list[str]:
    return [p for p in files if fnmatch.fnmatchcase(p, glob)]


def check(spec: tuple, record: dict) -> bool:
    """One acceptance check against the record's written files / handed-over steps."""
    files, kind = record.get("files") or {}, spec[0]
    if kind == "file":
        return bool(_match(files, spec[1]))
    if kind == "has":
        return any(re.search(spec[2], files[p]) for p in _match(files, spec[1]))
    if kind == "json":
        for p in _match(files, spec[1]):
            try:
                data = json.loads(files[p])
            except ValueError:
                continue
            if all(k in data for k in spec[2]):
                return True
        return False
    if kind == "handed":
        return spec[1] in (record.get("handed") or [])
    if kind == "absent":
        return not _match(files, spec[1])
    if kind == "asked":
        return bool((record.get("plan") or {}).get("clarify"))
    raise ValueError(f"unknown check {kind}")


def accepted(case: dict, record: dict) -> bool:
    return all(check(tuple(c), record) for c in case["checks"])


def plan_ok(case: dict, record: dict) -> bool:
    """Plan covers every expected step with its tier, touches no forbidden path; clarify cases must ask instead of planning the bogus target."""
    plan = record.get("plan")
    if not plan:
        return False
    steps = plan.get("steps") or []
    if any(fnmatch.fnmatchcase(s.get("path", ""), g) for s in steps for g in case.get("forbid", [])):
        return False
    if case.get("clarify"):
        return bool(plan.get("clarify"))
    for want in case["steps"]:
        if not any(fnmatch.fnmatchcase(s.get("path", ""), want["glob"]) and s.get("tier") == want["tier"]
                   and (want.get("kind") == s.get("kind") or want.get("kind") is None) for s in steps):
            return False
    return True


def rubric(case: dict, record: dict) -> int:
    if accepted(case, record):
        return 3
    if any(_match(record.get("files") or {}, s["glob"]) for s in case["steps"] if s.get("kind") != "data"):
        return 2
    return 1 if plan_ok(case, record) else 0


def score(case: dict, record: dict, repeat: int = 1) -> dict:
    return {"case": case["id"], "size": case["size"], "repeat": repeat, "split": "dev", "rubric": rubric(case, record),
            "accepted": accepted(case, record), "plan_ok": plan_ok(case, record), "resumes": int(record.get("resumes") or 0)}


def _group(rows: list[dict]) -> dict:
    n, k = len(rows), sum(r["accepted"] for r in rows)
    lo, hi = wilson(k, n)
    return {"trials": n, "accepted": k, "rate": round(100 * k / n, 1) if n else 0.0, "lo": lo, "hi": hi,
            "mean_resumes": round(sum(r["resumes"] for r in rows) / n, 2) if n else None}


def build_report(meta: dict, rows: list[dict]) -> dict:
    by_level = {str(level): _group([r for r in rows if r["rubric"] == level]) for level in LEVELS}
    return {**meta, "trials": len(rows), "overall": _group(rows), "by_rubric": by_level,
            "rubric_counts": dict(Counter(str(r["rubric"]) for r in rows)),
            "by_size": {s: _group([r for r in rows if r["size"] == s]) for s in sorted({r["size"] for r in rows})}}


def render(rep: dict) -> str:
    o = rep["overall"]
    lines = [f"[FEATURE TIER | {rep['source']}] model {rep['model']}: {rep['trials']} lượt",
             "cấu hình ghim: " + ", ".join(f"{k}={v}" for k, v in rep["pins"].items()),
             f"đạt acceptance {o['accepted']}/{o['trials']} = {o['rate']}% (Wilson 95%: {o['lo']}-{o['hi']}%) | resume trung bình {o['mean_resumes']}"]
    lines += [f"rubric {lv}: {g['trials']} lượt, resume trung bình {g['mean_resumes']}" for lv, g in rep["by_rubric"].items()]
    lines += [f"cỡ {s}: đạt {g['accepted']}/{g['trials']} = {g['rate']}%, resume {g['mean_resumes']}" for s, g in rep["by_size"].items()]
    return "\n".join(lines)


def run(driver, repeats: int = 1, cases: list[dict] | None = None) -> list[dict]:
    """driver(case, repeat) -> record; one score row per (case, repeat)."""
    return [score(c, driver(c, r), r) for r in range(1, repeats + 1) for c in (cases or CASES)]


class Recorded:
    """Offline driver: replay records from a jsonl of {"case","repeat"?,"record"}; missing = no plan."""

    def __init__(self, path):
        self.by = {}
        for line in open(path, encoding="utf-8"):
            if line.strip():
                row = json.loads(line)
                self.by[(row["case"], row.get("repeat", 1))] = row["record"]

    def __call__(self, case, repeat):
        return self.by.get((case["id"], repeat)) or self.by.get((case["id"], 1)) or {"plan": None, "files": {}}
