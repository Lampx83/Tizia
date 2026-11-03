"""Record the two skill-delivery modes for skill_batch_compare.py: all skills in one call vs one skill per call.

Needs the local model (VLLM_URL/VLLM_SECKEY). Writes one result file per mode; compare them offline with
evaluation/skill_batch_compare.py gold.json multi.json per.json.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

HARNESS = Path(__file__).resolve().parents[1]
if str(HARNESS) not in sys.path:
    sys.path.insert(0, str(HARNESS))

from budget import Budget  # noqa: E402
from main import Deps  # noqa: E402
from models import OllamaClient  # noqa: E402


def skill_text(name: str) -> str:
    return (HARNESS / "skills" / name / "SKILL.md").read_text(encoding="utf-8")


def call(deps, model: str, prompt: str, system: str, cap: int) -> tuple[str, int]:
    body = deps.call_model(model, prompt, gate=1, budget=Budget(max_model_calls=8, max_units=600, max_wall_clock_s=300),
                           format=None, extra={"system": system}, options={"num_predict": cap})
    metrics = body.get("_metrics") or {}
    tokens = int(metrics.get("tokens_in") or 0) + int(metrics.get("tokens_out") or 0)
    return str(body.get("response") or ""), tokens


def run(gold: dict, systems: dict[str, str], model: str, cap: int) -> tuple[list, list]:
    deps = Deps(models=OllamaClient.from_env(os.environ), notify=None)
    multi, per = [], []
    for case in gold["cases"]:
        text, tokens = call(deps, model, case["prompt"], "\n\n".join(systems.values()), cap)
        multi.append({"case": case["id"], "calls": 1, "tokens": tokens, "output": text})
        parts, calls, total = [], 0, 0
        for system in systems.values():
            out, used = call(deps, model, case["prompt"], system, cap)
            parts.append(out)
            calls, total = calls + 1, total + used
        per.append({"case": case["id"], "calls": calls, "tokens": total, "output": "\n\n".join(parts)})
    return multi, per


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Record multi-skill vs per-skill outputs for the gold set")
    parser.add_argument("gold")
    parser.add_argument("--skill", action="append", dest="skills", default=None,
                        help="default skill directory name (repeatable); default default-tdd + default-code-review")
    parser.add_argument("--model", default=os.environ.get("GATE1_MODEL") or "qwen3.5-35b-a3b-int4")
    parser.add_argument("--multi-out", default="multi.json")
    parser.add_argument("--per-out", default="per.json")
    parser.add_argument("--cap", type=int, default=4096)
    args = parser.parse_args(argv)

    gold = json.loads(Path(args.gold).read_text(encoding="utf-8"))
    names = args.skills or ["default-test", "default-review"]
    systems = {name: skill_text(name) for name in names}
    multi, per = run(gold, systems, args.model, args.cap)
    Path(args.multi_out).write_text(json.dumps({"mode": "multi-skill", "runs": multi}, ensure_ascii=False, indent=1),
                                    encoding="utf-8")
    Path(args.per_out).write_text(json.dumps({"mode": "per-skill", "runs": per}, ensure_ascii=False, indent=1),
                                  encoding="utf-8")
    print(f"{len(multi)} cases x {len(systems)} skills -> {args.multi_out}, {args.per_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
