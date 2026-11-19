#!/usr/bin/env python3
"""Offline independent grader for single-file corpus trials, no model, no GPU.

python -m evaluation.pipeline.lf235_grade [--dir trials] [--out lf235-grades.json] [--md lf235-independent-grade.md]
Candidate artifact per trial: <dir>/<trial stem>.candidate.<ext> (full file at candidate head), written by driver_capture.py.
"""
from __future__ import annotations

import argparse
import difflib
import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path

from evaluation.pipeline import DATA, REPO

SHIP = {"needs_review", "ready_for_pr"}
CANDIDATE_GATE = 3
QUOTED = re.compile(r"'([^']+)'")


def _ws(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def parse_expect(case: dict) -> dict | None:
    """Structured expectation from the case title, None when title lacks an exact target."""
    kind = (case.get("types") or [None])[0]
    title = case.get("title", "")
    quoted = QUOTED.findall(title)
    if kind == "css_color":
        hexes = re.findall(r"#[0-9a-fA-F]{3,8}\b", title)
        if len(quoted) == 1 and len(hexes) == 1 and quoted[0][0] in ".#":
            return {"kind": kind, "selector": quoted[0], "color": hexes[0].lower()}
    elif kind == "replace_text":
        if len(quoted) >= 2 and len(quoted) % 2 == 0 and " thành " in title:
            return {"kind": kind, "pairs": list(zip(quoted[::2], quoted[1::2]))}
    elif kind == "insert_text":
        if len(quoted) == 2:
            return {"kind": kind, "text": quoted[0], "anchor": quoted[1]}
        if len(quoted) == 1 and " ngay sau dòng " in title:
            return {"kind": kind, "text": quoted[0], "anchor": None}
        m = re.search(r": ([^:]+)$", title)
        if not quoted and m:
            return {"kind": kind, "text": m.group(1).strip(), "anchor": None}
    return None


def _rule_body(css: str, selector: str) -> re.Match | None:
    sel = re.escape(selector).replace(r"\ ", r"\s+")
    return re.search(rf"(?:^|[}}\s>]){sel}\s*\{{([^}}]*)\}}", css)


def _check_css_color(e: dict, base: str, cand: str):
    rule = _rule_body(cand, e["selector"])
    if not rule:
        return "fail", "rule missing"
    m = re.search(r"(?<![\w-])color\s*:\s*([^;}]+)", rule.group(1))
    if not m or m.group(1).strip().lower() != e["color"]:
        return "fail", f"color is {m.group(1).strip() if m else None!r}, need {e['color']}"
    base_rule = _rule_body(base, e["selector"])
    if not base_rule:
        return "fail", "selector not in base"

    def mask(text: str, rule_m: re.Match) -> str:
        body = re.sub(r"((?<![\w-])color\s*:\s*)[^;}]+", r"\1<C>", rule_m.group(1))
        return _ws(text[: rule_m.start(1)] + body + text[rule_m.end(1):])

    if mask(base, base_rule) != mask(cand, rule):
        return "fail", "collateral change outside the color declaration"
    return "pass", ""


def _check_replace(e: dict, base: str, cand: str):
    for old, new in e["pairs"]:
        if new not in cand:
            return "fail", f"new text absent: {new!r}"
    every, first = base, base
    for old, new in e["pairs"]:
        every = every.replace(old, new)
        first = first.replace(old, new, 1)
    if _ws(cand) in (_ws(every), _ws(first)):
        return "pass", ""
    return "fail", "collateral change beyond the requested replacement"


def _check_insert(e: dict, base: str, cand: str):
    a, b = base.splitlines(), cand.splitlines()
    ops = [op for op in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes() if op[0] != "equal"]
    if not ops:
        return "fail", "no change"
    if any(op[0] != "insert" for op in ops):
        return "fail", "deletion or modification of existing lines"
    added = "\n".join("\n".join(b[j1:j2]) for _, _, _, j1, j2 in ops)
    if e["text"] not in added:
        return "fail", "inserted text absent"
    if cand.count(e["text"]) > base.count(e["text"]) + 1:
        return "fail", "inserted text duplicated"
    if e["anchor"]:
        first = ops[0]
        if first[1] == 0 or e["anchor"] not in a[first[1] - 1]:
            return "fail", "not placed directly after anchor"
    return "pass", ""


CHECKS = {"css_color": _check_css_color, "replace_text": _check_replace, "insert_text": _check_insert}


def check_candidate(expect: dict, base: str, cand: str) -> tuple[str, str]:
    """(pass|fail, reason) for candidate file text against expectation."""
    return CHECKS[expect["kind"]](expect, base, cand)


def grade_trial(trial: dict, expect: dict | None, base: str | None, cand: str | None) -> dict:
    """Label one trial. No candidate or no expectation = not_gradable, never a fail."""
    ship = trial.get("outcome") in SHIP
    gate = trial.get("gate_reached") or 0
    reason = ""
    if cand is None:
        verdict = "not_gradable:no_artifact" if ship or gate >= CANDIDATE_GATE else "not_gradable:no_candidate"
    elif expect is None or base is None or expect.get("kind") not in CHECKS:
        verdict = "not_gradable:no_expectation"
    else:
        verdict, reason = check_candidate(expect, base, cand)
    gradable = verdict in ("pass", "fail")
    return {
        "case": trial.get("case"), "arm": trial.get("arm"), "repeat": trial.get("repeat"),
        "pin": trial.get("pin"), "outcome": trial.get("outcome"), "gate_reached": trial.get("gate_reached"),
        "ship": ship, "independent_verdict": verdict, "reason": reason,
        "correct_pass": gradable and ship and verdict == "pass",
        "wrong_pass": gradable and ship and verdict == "fail",
        "false_block": gradable and not ship and verdict == "pass",
        "correct_block": gradable and not ship and verdict == "fail",
    }


def summarize(rows: list[dict]) -> dict:
    """Per-arm counts and rates; rates over gradable ship (wrong_pass) and gradable blocked (false_block)."""
    out: dict = {}
    by_arm = defaultdict(list)
    for r in rows:
        by_arm[r["arm"]].append(r)
    for arm, rs in sorted(by_arm.items()):
        s = {"n": len(rs), "gradable": sum(r["independent_verdict"] in ("pass", "fail") for r in rs)}
        for k in ("correct_pass", "wrong_pass", "false_block", "correct_block"):
            s[k] = sum(r[k] for r in rs)
        s["not_gradable_no_artifact"] = sum(r["independent_verdict"] == "not_gradable:no_artifact" for r in rs)
        s["not_gradable_no_candidate"] = sum(r["independent_verdict"] == "not_gradable:no_candidate" for r in rs)
        s["not_gradable_no_expectation"] = sum(r["independent_verdict"] == "not_gradable:no_expectation" for r in rs)
        shipped, blocked = s["correct_pass"] + s["wrong_pass"], s["false_block"] + s["correct_block"]
        s["wrong_pass_rate"] = s["wrong_pass"] / shipped if shipped else None
        s["false_block_rate"] = s["false_block"] / blocked if blocked else None
        out[arm] = s
    return out


def find_artifact(trial_dir: Path, stem: str) -> Path | None:
    """Captured candidate file for a trial stem (not the .diff)."""
    hits = [p for p in trial_dir.glob(f"{stem}.candidate.*") if p.suffix != ".diff"]
    return hits[0] if hits else None


def _git_show(ref: str, path: str) -> str | None:
    p = subprocess.run(["git", "show", f"{ref}:{path}"], cwd=REPO, capture_output=True)
    return p.stdout.decode("utf-8", errors="replace") if p.returncode == 0 else None


def run(trial_dir: Path) -> list[dict]:
    cases = {c["id"]: c for c in json.loads((DATA / "cases-dev.json").read_text(encoding="utf-8"))}
    rows = []
    for path in sorted(trial_dir.glob("*.json")):
        trial = json.loads(path.read_text(encoding="utf-8"))
        case = cases.get(trial.get("case"))
        if case is None or "mf_outcome" in trial:
            continue
        art = find_artifact(trial_dir, path.stem)
        cand = art.read_text(encoding="utf-8") if art else None
        base = next((b for ref in (trial.get("candidate_base_sha"), trial.get("pin"), "HEAD") if ref
                     for b in [_git_show(ref, case["file"])] if b), None)
        row = grade_trial(trial, parse_expect(case), base, cand)
        row["trial"] = path.stem
        row["candidate_missing"] = trial.get("candidate_missing")
        rows.append(row)
    return rows


def render_md(rows: list[dict]) -> str:
    lines = ["| trial | board outcome | gate | independent_verdict | wrong_pass | false_block |", "|---|---|---|---|---|---|"]
    for r in rows:
        lines.append(f"| {r['trial']} | {r['outcome']} | {r['gate_reached']} | {r['independent_verdict']} | "
                     f"{'yes' if r['wrong_pass'] else '-'} | {'yes' if r['false_block'] else '-'} |")
    lines += ["", "| arm | n | gradable | correct_pass | wrong_pass | false_block | correct_block | no_artifact | no_candidate | no_expectation |",
              "|---|---|---|---|---|---|---|---|---|---|"]
    for arm, s in summarize(rows).items():
        lines.append(f"| {arm} | {s['n']} | {s['gradable']} | {s['correct_pass']} | {s['wrong_pass']} | {s['false_block']} | "
                     f"{s['correct_block']} | {s['not_gradable_no_artifact']} | {s['not_gradable_no_candidate']} | {s['not_gradable_no_expectation']} |")
    return "\n".join(lines) + "\n"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default=str(DATA / "trials"))
    ap.add_argument("--out", default=str(DATA / "lf235-grades.json"))
    ap.add_argument("--md", default="")
    a = ap.parse_args()
    rows = run(Path(a.dir))
    Path(a.out).write_text(json.dumps({"rows": rows, "summary": summarize(rows)}, ensure_ascii=False, indent=1), encoding="utf-8")
    md = render_md(rows)
    if a.md:
        Path(a.md).write_text(md, encoding="utf-8")
    print(md)


if __name__ == "__main__":
    main()
