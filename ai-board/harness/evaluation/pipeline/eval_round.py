#!/usr/bin/env python3
"""One eval round over every DEV suite: arm, freeze, preflight, trials, grade, solved rate, gate vs previous round.

python -m evaluation.pipeline.eval_round --repeat 201 [--parallel 2] [--suites cases-dev,dev-multifile,multifile,history] [--prev 200]
Appends one section to eval-loop-report.md and writes rounds/r<repeat>.json.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from evaluation.pipeline import DATA, HARNESS

PY = sys.executable
SUITES = {
    "cases-dev": lambda: ",".join(c["id"] for c in json.loads((DATA / "cases-dev.json").read_text(encoding="utf-8"))),
    "dev-multifile": lambda: "dev-multifile:all",
    "multifile": lambda: "multifile:all",
    "history": lambda: "history:all",
}


def run(args: list[str], log: Path, check: bool = True) -> int:
    print("[round] " + " ".join(args), flush=True)
    with open(log, "a", encoding="utf-8") as fh:
        fh.write(f"\n$ {' '.join(args)}\n")
        fh.flush()
        rc = subprocess.run(args, cwd=HARNESS, stdout=fh, stderr=subprocess.STDOUT).returncode
    if check and rc:
        raise SystemExit(f"step failed rc={rc}: {' '.join(args)} (see {log})")
    return rc


def _driver():
    from evaluation.pipeline import driver
    return driver


def suite_trials(suite: str, repeat: int) -> list[Path]:
    d = _driver()
    return [p for c in d.resolve_cases(SUITES[suite]()) for p in [d.trial_path("B0", c["id"], repeat)] if p.exists()]


def all_cases() -> dict:
    d = _driver()
    out = {c["id"]: c for c in d.load_cases()}
    for spec in ("dev-multifile:all", "multifile:all", "history:all"):
        out.update({c["id"]: c for c in d.resolve_cases(spec)})
    return out


def round_view(grades: Path, repeat: int, stems: set[str], out: Path) -> int:
    """Grade rows of this round as arm r<repeat>, repeat 0, so two rounds pair by case in eval_gate."""
    n = 0
    with open(out, "a", encoding="utf-8") as fh:
        for line in grades.read_text(encoding="utf-8").splitlines():
            r = json.loads(line) if line.strip() else None
            if r and r.get("trial") in stems and r["criterion"] != "*":
                fh.write(json.dumps({**r, "arm": f"r{repeat}", "repeat": 0}, ensure_ascii=False) + "\n")
                n += 1
    return n


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repeat", type=int, required=True)
    ap.add_argument("--prev", type=int)
    ap.add_argument("--parallel", type=int, default=int(os.environ.get("AB_WORKERS", "1")))
    ap.add_argument("--suites", default=",".join(SUITES))
    ap.add_argument("--skip-arm", action="store_true", help="arm/freeze/preflight already done for this pin")
    a = ap.parse_args(argv)
    rounds = DATA / "rounds"
    rounds.mkdir(exist_ok=True)
    log = rounds / f"r{a.repeat}.log"
    t0 = time.time()
    if not a.skip_arm:
        run([PY, "-m", "evaluation.pipeline.driver", "arm", "B0", "--force"], log)
        run([PY, "-m", "evaluation.pipeline.driver", "freeze"], log)
        run([PY, "-m", "evaluation.pipeline.driver", "preflight", "--arm", "B0"], log)
    for suite in a.suites.split(","):
        # a trial-level failure must not stop the other suites
        run([PY, "-m", "evaluation.pipeline.driver", "trial", "--arm", "B0", "--cases", SUITES[suite](), "--repeat", str(a.repeat),
             "--parallel", str(a.parallel), "--keep-seeds"], log, check=False)
    run([PY, "-m", "evaluation.pipeline.criterion_grade", "--out", str(rounds / "grades.jsonl"), "--md", str(rounds / f"r{a.repeat}-criteria.md")],
        log, check=False)
    summary = {"repeat": a.repeat, "wall_s": round(time.time() - t0), "suites": {}}
    empty = rounds / "no-trials"
    empty.mkdir(exist_ok=True)
    from evaluation.pipeline import solved_rate as SR
    grades = rounds / "grades.jsonl"
    rows = [r for x in grades.read_text(encoding="utf-8").splitlines() if x.strip()
            for r in [json.loads(x)] if r["criterion"] != "*"] if grades.exists() else []
    cases = all_cases()
    for suite in a.suites.split(","):
        paths = suite_trials(suite, a.repeat)
        stems = {p.stem for p in paths}
        trials = {p.stem: json.loads(p.read_text(encoding="utf-8")) for p in paths}
        s = SR.summarize(rows, trials, cases)
        (rounds / f"r{a.repeat}-{suite}.json").write_text(json.dumps(s, indent=1, ensure_ascii=False), encoding="utf-8")
        (rounds / f"r{a.repeat}-{suite}.md").write_text(SR.md(s, suite), encoding="utf-8")
        gate = None
        if a.prev is not None and suite == "cases-dev":
            prev = {p.stem for p in suite_trials(suite, a.prev)}
            view = rounds / f"gate-r{a.prev}-r{a.repeat}.jsonl"
            view.unlink(missing_ok=True)
            if round_view(rounds / "grades.jsonl", a.prev, prev, view) and round_view(rounds / "grades.jsonl", a.repeat, stems, view):
                man = rounds / f"gate-r{a.prev}-r{a.repeat}.manifest.json"
                run([PY, "-m", "evaluation.pipeline.eval_gate", "manifest", str(view), "--arms", f"r{a.prev},r{a.repeat}", "--out", str(man),
                     "--trials", str(empty)], log, check=False)
                gate = run([PY, "-m", "evaluation.pipeline.eval_gate", "gate", str(view), "--base", f"r{a.prev}", "--cand", f"r{a.repeat}",
                            "--manifest", str(man), "--trials", str(empty)], log, check=False)
        summary["suites"][suite] = {"trials": len(stems), "cases_solved": s.get("cases_solved"),
                                    "unsolved": s.get("unsolved_cases"), "gate_exit": gate}
    (rounds / f"r{a.repeat}.json").write_text(json.dumps(summary, indent=1, ensure_ascii=False), encoding="utf-8")
    lines = [f"\n## Round r{a.repeat} ({time.strftime('%Y-%m-%d %H:%M')}, wall {summary['wall_s']} s, parallel {a.parallel})", "",
             "| suite | trials | cases solved | rate | gate vs prev |", "|---|---|---|---|---|"]
    for suite, v in summary["suites"].items():
        c = v["cases_solved"] or {"solved": 0, "n": 0, "rate": 0}
        lines.append(f"| {suite} | {v['trials']} | {c['solved']}/{c['n']} | {100 * c['rate']:.1f}% | {v['gate_exit']} |")
    with open(DATA / "eval-loop-report.md", "a", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
