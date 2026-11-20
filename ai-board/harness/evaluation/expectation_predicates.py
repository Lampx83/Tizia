#!/usr/bin/env python3
"""Pure predicate grader: (tree before, tree after, case) -> (ok, reason). No model, no Docker.

python -m evaluation.expectation_predicates   # two-way self-check of the data file, exit 1 on any problem
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from evaluation.pipeline import DATA, REPO
from evaluation.pipeline import criteria as C
from evaluation.pipeline import lf235_grade as L

DATA_FILE = Path(__file__).with_suffix(".json")
Verdict = tuple[bool, str]


def load_expectations(path: Path = DATA_FILE) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_seed(rel: str) -> str:
    return (REPO / rel).read_text(encoding="utf-8")


def _rm(text: str) -> str:
    return re.sub(r"\s+", "", text)


def _check_zones(exp: dict, before: str, after: str) -> Verdict:
    """Only the listed spans may differ; each span must hold exactly the expected new text."""
    b, a = _rm(before), _rm(after)
    spans = []
    for z in exp["zones"]:
        find = _rm(z["find"])
        if b.count(find) != 1:
            return False, f"zone anchor not unique in seed: {z['find'][:40]!r}"
        i = b.index(find)
        if exp["kind"] == "insert_text":
            s = e = i + len(find)
        else:
            span = _rm(z.get("span", z["find"]))
            s = i + find.index(span)
            e = s + len(span)
        spans.append((s, e, z))
    spans.sort(key=lambda t: t[0])
    prev, rest = 0, a
    for k, (s, e, z) in enumerate(spans):
        seg = b[prev:s]
        if s < prev or not rest.startswith(seg):
            return False, "change outside the allowed zone"
        rest = rest[len(seg):]
        tail = b[e:spans[k + 1][0]] if k + 1 < len(spans) else b[e:]
        if k + 1 < len(spans):
            j = rest.find(tail)
            if j < 0:
                return False, "change outside the allowed zone"
        else:
            if not rest.endswith(tail):
                return False, "change outside the allowed zone"
            j = len(rest) - len(tail)
        mid, rest, prev = rest[:j], rest[j:], e
        bad = _check_mid(exp["kind"], z, mid)
        if bad:
            return False, bad
        if "new" in z and re.sub(r"\s+", " ", z["new"]) not in re.sub(r"\s+", " ", after):
            return False, f"new literal not verbatim: {z['new']!r}"
    return True, ""


def _check_mid(kind: str, z: dict, mid: str) -> str:
    if kind == "remove_element":
        return "" if mid == "" else f"element not removed, zone holds {mid[:40]!r}"
    want = _rm(z["new"])
    if kind == "replace_text":
        return "" if mid == want else f"zone text is {mid[:60]!r}, need {z['new']!r}"
    if not mid.startswith("<") or re.sub(r"<[^>]*>", "", mid) != want:
        return f"inserted block must be one new element holding {z['new']!r}, got {mid[:60]!r}"
    return ""


def _decls(body: str) -> dict:
    return {k.strip().lower(): v.strip().lower() for k, v in (d.split(":", 1) for d in body.split(";") if ":" in d)}


def _check_rule(exp: dict, before: str, after: str) -> Verdict:
    """Selector rule must carry the new declarations, keep the rest, and nothing else changes."""
    sel, want = exp["rule"]["selector"], {k: v.lower() for k, v in exp["rule"]["set"].items()}
    mb, ma = L._rule_body(before, sel), L._rule_body(after, sel)
    if not mb:
        return False, "selector not in seed"
    if not ma:
        return False, "rule missing"
    db, da = _decls(mb.group(1)), _decls(ma.group(1))
    for k, v in want.items():
        if da.get(k) != v:
            return False, f"{k} is {da.get(k)!r}, need {v!r}"
    if {k: v for k, v in da.items() if k not in want} != {k: v for k, v in db.items() if k not in want}:
        return False, "other declarations of the rule changed"

    def mask(text: str, m: re.Match) -> str:
        return _rm(text[: m.start(1)] + text[m.end(1):])

    if mask(before, mb) != mask(after, ma):
        return False, "change outside the allowed zone"
    return True, ""


def _check(exp: dict, before: str, after: str) -> Verdict:
    return (_check_rule if "rule" in exp else _check_zones)(exp, before, after)


def grade(before: dict, after: dict, case: dict, expectations: dict | None = None) -> Verdict:
    """Trees are {path: text}. Target file, literals and zone checked; ok plus reason when failed."""
    data = expectations or load_expectations()
    exp = data["cases"].get(case["id"])
    if exp is None:
        return False, "no_expectation"
    target = case["file"]
    if target not in before:
        return False, "target missing in seed"
    if target not in after:
        return False, f"target file missing: {target}"
    prefixes = tuple(data.get("new_file_prefixes", ()))
    for p in after:
        if p not in before and not p.startswith(prefixes):
            return False, f"new file outside target: {p}"
    for p, text in before.items():
        if p != target and after.get(p) != text:
            return False, f"file changed outside target: {p}"
    if after[target] == before[target]:
        return False, "no change"
    return _check(exp, before[target], after[target])


def after_tree(before: dict, target: str, diff: str, candidate_target_text: str) -> dict:
    """Tree after a stored candidate: captured target text, other touched files marked changed."""
    out = dict(before)
    for path, is_new in C.diff_files(diff):
        if path == target:
            out[path] = candidate_target_text
        else:
            out[path] = (out.get(path) or "") + "\n<changed by candidate>" if not is_new else "<new file>"
    return out


def _apply(text: str, fix: list) -> str | None:
    for old, new in fix:
        if text.count(old) != 1:
            return None
        text = text.replace(old, new)
    return text


def self_check(expectations: dict | None = None, cases: dict | None = None, seed=read_seed) -> list[str]:
    """Problems list: every expectation must fail on the seed and pass on its hand-written fix."""
    data = expectations or load_expectations()
    if cases is None:
        cases = {c["id"]: c for c in json.loads((DATA / "cases-dev.json").read_text(encoding="utf-8"))}
    problems = []
    for cid in data.get("tuned_ids", []):
        if cid not in data["cases"]:
            problems.append(f"{cid}: tuned id without expectation")
    for cid, exp in data["cases"].items():
        case = cases.get(cid)
        if case is None:
            problems.append(f"{cid}: case not found")
            continue
        if case.get("types") and exp["kind"] != case["types"][0]:
            problems.append(f"{cid}: kind {exp['kind']} differs from case type {case['types'][0]}")
        text = seed(case["file"])
        if _check(exp, text, text)[0]:
            problems.append(f"{cid}: expectation passes on the untouched seed")
        fixed = _apply(text, exp.get("fix") or [])
        if fixed is None:
            problems.append(f"{cid}: sample fix does not apply exactly once")
            continue
        ok, why = grade({case["file"]: text}, {case["file"]: fixed}, case, data)
        if not ok:
            problems.append(f"{cid}: sample fix rejected: {why}")
    return problems


def main() -> int:
    problems = self_check()
    print("\n".join(problems) or f"ok: {len(load_expectations()['cases'])} expectations fail on seed and pass on sample fix")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
