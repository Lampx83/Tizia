"""Independent oracle verdict for saved single-file product-path trials, beside the board verdict; offline, no model, no GPU.

Candidate artifact per trial: <dir>/<stem>.candidate.<ext> (target file at candidate head). Dev corpus cases only.
  python evaluation/product_grading.py TRIAL_DIR --cases CASES.json --source GIT_DIR [--arms B0,B1] [--write]
Exit 2 when --arms names an arm with no graded trial: no A/B conclusion without the matrix.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
import eval_corpus  # noqa: E402
from evaluation.suite import metrics  # noqa: E402
from evaluation.suite.candidate_grade import PROTOCOL  # noqa: E402

SHIP = {"needs_review", "ready_for_pr"}
CANDIDATE_GATE = 3
CELLS = ("correct_ship", "wrong_ship", "false_block", "correct_block")
NOT_GRADABLE = ("no_case", "no_candidate", "no_artifact", "no_base")


def _allowed(path: str, target: str) -> bool:
    return path == target or path.startswith(("test/", "tests/"))


def _skip(trial: dict, reason: str) -> dict:
    return {"matrix_cell": "not_gradable", "independent_verdict": f"not_gradable:{reason}", "oracle_rc": None, "resolved": None,
            "touched_files": trial.get("candidate_files") or [], "out_of_scope_files": [], "mf_outcome": f"not_gradable:{reason}",
            "evaluator": PROTOCOL}


def grade_trial(trial: dict, case: dict | None, base: str | None, files: dict | None) -> dict:
    """Fields to record on the trial. No candidate or no base = not_gradable, never an oracle fail."""
    if case is None or case.get("split") != "dev":
        return _skip(trial, "no_case")
    ship = trial.get("outcome") in SHIP
    text = (files or {}).get(case["file"])
    if text is None:
        return _skip(trial, "no_artifact" if ship or (trial.get("gate_reached") or 0) >= CANDIDATE_GATE else "no_candidate")
    if base is None and case["check"]["mode"] != "page":
        return _skip(trial, "no_base")
    touched = sorted(trial.get("candidate_files") or files)
    stray = sorted(p for p in touched if not _allowed(p, case["file"]))
    passed = eval_corpus.check(text, base, case) and not stray
    cell = ("correct_ship" if passed else "wrong_ship") if ship else ("false_block" if passed else "correct_block")
    return {"matrix_cell": cell, "independent_verdict": "pass" if passed else "fail", "oracle_rc": 0 if passed else 1, "resolved": passed,
            "touched_files": touched, "out_of_scope_files": stray, "evaluator": PROTOCOL,
            "mf_outcome": {"correct_ship": "resolved", "wrong_ship": "wrong_ship"}.get(cell, "not_resolved" if cell == "correct_block" else cell)}


def load_cases(path: Path) -> dict[str, dict]:
    """Dev cases by id from a corpus cases.json; held-out entries are dropped unread."""
    return {c["id"]: c for c in json.loads(Path(path).read_text(encoding="utf-8")) if c.get("split") == "dev"}


def git_base(source: Path):
    """Case -> target file text at the case base commit, None if absent."""
    def base_of(case: dict) -> str | None:
        done = subprocess.run(["git", "--git-dir", str(source), "show", f"{case['base_sha']}:{case['file']}"], capture_output=True,
                              stdin=subprocess.DEVNULL)
        return done.stdout.decode("utf-8") if done.returncode == 0 else None
    return base_of


def regrade_dir(trial_dir: Path, cases: dict[str, dict], base_of, write: bool = False) -> list[dict]:
    """One row per saved single-file trial; multi-file trials (own oracle) are skipped. write=True merges the fields into each trial JSON."""
    rows = []
    for path in sorted(Path(trial_dir).glob("*.json")):
        trial = json.loads(path.read_text(encoding="utf-8"))
        if "mf_outcome" in trial and "independent_verdict" not in trial:
            continue
        case = cases.get(trial.get("case"))
        art = next((p for p in Path(trial_dir).glob(f"{path.stem}.candidate.*") if p.suffix != ".diff"), None)
        files = {case["file"]: art.read_text(encoding="utf-8")} if case and art else None
        graded = grade_trial(trial, case, base_of(case) if case else None, files)
        if write:
            path.write_text(json.dumps({**trial, **graded}, ensure_ascii=False, indent=1), encoding="utf-8")
        rows.append({"trial": path.stem, "arm": trial.get("arm"), "case": trial.get("case"), "outcome": trial.get("outcome"), **graded})
    return rows


def report(rows: list[dict]) -> dict[str, dict]:
    """Per arm: oracle-resolved count, matrix cells, not-gradable by reason; rates over shipped and over blocked gradable trials."""
    by_arm = defaultdict(list)
    for row in rows:
        by_arm[row["arm"]].append(row)
    out = {}
    for arm, part in sorted(by_arm.items(), key=lambda kv: str(kv[0])):
        count = lambda cell: sum(r["matrix_cell"] == cell for r in part)  # noqa: E731
        s = {"n": len(part), "oracle_resolved": sum(r["resolved"] is True for r in part),
             "gradable": sum(r["matrix_cell"] in CELLS for r in part), "not_gradable": count("not_gradable"),
             **{cell: count(cell) for cell in CELLS}}
        for reason in NOT_GRADABLE:
            s[f"not_gradable_{reason}"] = sum(r["independent_verdict"] == f"not_gradable:{reason}" for r in part)
        s["wrong_ship_rate"] = metrics.rate(s["wrong_ship"], s["wrong_ship"] + s["correct_ship"])
        s["false_block_rate"] = metrics.rate(s["false_block"], s["false_block"] + s["correct_block"])
        out[arm] = s
    return out


def require_matrix(rep: dict, arms: list[str]) -> None:
    """Raise unless every named arm has at least one independently graded trial."""
    bare = [arm for arm in arms if not rep.get(arm, {}).get("gradable")]
    if bare:
        raise ValueError(f"no independent wrong-ship/false-block matrix for arm(s): {', '.join(bare)}")


def render(rep: dict) -> str:
    head = ["arm", "n", "oracle_resolved", "correct_ship", "wrong_ship", "false_block", "correct_block", "not_gradable", "no_candidate", "no_artifact"]
    lines = [" | ".join(head)]
    for arm, s in rep.items():
        lines.append(" | ".join(str(x) for x in [arm, s["n"], s["oracle_resolved"], s["correct_ship"], s["wrong_ship"], s["false_block"],
                                                 s["correct_block"], s["not_gradable"], s["not_gradable_no_candidate"], s["not_gradable_no_artifact"]]))
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("trial_dir", type=Path)
    ap.add_argument("--cases", type=Path, required=True)
    ap.add_argument("--source", type=Path, required=True)
    ap.add_argument("--arms", default="")
    ap.add_argument("--write", action="store_true")
    a = ap.parse_args(argv)
    rep = report(regrade_dir(a.trial_dir, load_cases(a.cases), git_base(a.source), a.write))
    print(render(rep))
    try:
        require_matrix(rep, [x for x in a.arms.split(",") if x])
    except ValueError as error:
        print(error, file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
