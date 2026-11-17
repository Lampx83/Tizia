"""Vision advisory vs owner labels: prints agreement and balanced accuracy. Usage: python -m evaluation.vision_advisory_eval TRIALS [--labels FILE]

TRIALS: json list or jsonl of {case_id, vision_advisory}. Reads only the files named; never held-out data.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

EVIDENCE = Path(__file__).resolve().parents[3] / ".scratch" / "ai-board-local-first" / "evidence"
LABEL_FILES = ("lf237-owner-labels.json", "lf237-draft-labels.jsonl")
LABEL_KEYS = ("owner_label", "label", "draft_label")


def load(path) -> list[dict]:
    """Rows of a json list or jsonl file."""
    text = Path(path).read_text(encoding="utf-8").strip()
    if text.startswith("["):
        return json.loads(text)
    return [json.loads(line) for line in text.splitlines() if line.strip()]


def default_labels() -> Path:
    """Owner labels when present, else the draft."""
    return next((EVIDENCE / name for name in LABEL_FILES if (EVIDENCE / name).is_file()), EVIDENCE / LABEL_FILES[0])


def _label(row: dict):
    return next((row[k] for k in LABEL_KEYS if row.get(k) in ("pass", "fail")), None)


def score(trials: list[dict], labels: list[dict]) -> dict:
    """Agreement and balanced accuracy over trials whose overall is pass|fail; unsure/unavailable counted apart."""
    truth = {str(r["case_id"]): _label(r) for r in labels}
    hits = {"pass": [0, 0], "fail": [0, 0]}
    unsure = unavailable = unlabeled = 0
    for trial in trials:
        want = truth.get(str(trial["case_id"]))
        advisory = trial.get("vision_advisory") or {}
        if want is None:
            unlabeled += 1
        elif advisory.get("status") != "ok":
            unavailable += 1
        elif advisory.get("overall") not in ("pass", "fail"):
            unsure += 1
        else:
            hits[want][0] += advisory["overall"] == want
            hits[want][1] += 1
    decided = hits["pass"][1] + hits["fail"][1]
    recalls = [ok / n for ok, n in hits.values() if n]
    return {"decided": decided, "unsure": unsure, "unavailable": unavailable, "unlabeled": unlabeled,
            "agreement": (hits["pass"][0] + hits["fail"][0]) / decided if decided else None,
            "balanced_accuracy": sum(recalls) / len(recalls) if recalls else None,
            "pass_recall": hits["pass"][0] / hits["pass"][1] if hits["pass"][1] else None,
            "fail_recall": hits["fail"][0] / hits["fail"][1] if hits["fail"][1] else None}


def main(argv=None) -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("trials")
    parser.add_argument("--labels", default=None)
    args = parser.parse_args(argv)
    print(json.dumps(score(load(args.trials), load(args.labels or default_labels())), indent=2))


if __name__ == "__main__":
    main()
