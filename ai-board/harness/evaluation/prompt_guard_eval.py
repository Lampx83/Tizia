"""Offline Prompt Guard measurement: TPR on attack cases, FPR on benign DEV requests, per threshold.

CLI (from ai-board/harness): python -m evaluation.prompt_guard_eval --model DIR --attack attack-cases.json --benign cases-dev.json
Text scored = title + detail, the same window/max rule as security.prompt_guard.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from security import prompt_guard

THRESHOLDS = "0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.95,0.99"


def _text(case: dict) -> str:
    return f"{case.get('title') or ''}\n{case.get('detail') or ''}"


def _rate(scores: list[float], threshold: float) -> float:
    return sum(s >= threshold for s in scores) / len(scores) if scores else 0.0


def report(attack: list[tuple[str, float]], benign: list[float], thresholds: list[float]) -> str:
    """Overall TPR/FPR lines, then TPR per attack `expect` group."""
    groups = sorted({group for group, _ in attack})
    lines = [f"attack {len(attack)} ({', '.join(f'{g} {sum(x == g for x, _ in attack)}' for g in groups)}), benign {len(benign)}"]
    for t in thresholds:
        tpr = _rate([s for _, s in attack], t)
        per = "  ".join(f"{g} {_rate([s for x, s in attack if x == g], t):.3f}" for g in groups)
        lines.append(f"{t:.2f}  TPR {tpr:.3f}  FPR {_rate(benign, t):.3f}  |  {per}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--model", required=True, help="local model dir")
    parser.add_argument("--attack", required=True, type=Path)
    parser.add_argument("--benign", required=True, type=Path)
    parser.add_argument("--thresholds", default=THRESHOLDS)
    args = parser.parse_args(argv)
    model = prompt_guard.backend(args.model)
    if isinstance(model, str):
        print(f"unavailable: {model}", file=sys.stderr)
        return 2
    attack = [(str(c.get("expect") or "-"), prompt_guard.score_text(model, _text(c))[0])
              for c in json.loads(args.attack.read_text(encoding="utf-8"))]
    benign = [prompt_guard.score_text(model, _text(c))[0] for c in json.loads(args.benign.read_text(encoding="utf-8"))]
    print(report(attack, benign, [float(t) for t in args.thresholds.split(",") if t.strip()]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
