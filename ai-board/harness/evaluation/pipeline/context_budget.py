"""Context-budget arms: one flag each over B1, paired against B1, decision rule fixed before any measurement."""
from __future__ import annotations

import sys

from evaluation.pipeline import comparison as cmp

BASE_ARM = "B1"  # compaction and state file only act inside the tool loop, which B1 turns on
ARM_FLAGS = {
    "B1-ctx": {"AI_BOARD_CONTEXT_COMPACTION": "1"},
    "B1-state": {"AI_BOARD_STATE_FILE": "1"},
}
ZONES = {"core": 0.20, "working": 0.60, "headroom": 0.20}  # working = map + working set + recent turns
MIN_PAIRS = cmp.SMALL_SAMPLE_PAIRS
# Order matters: the first matching rule wins. Recorded per arm and per model; never compared across models.
DECISION_RULE = (
    ("reject", "any single-file case resolved at baseline is lost; arm is switched off and the loss logged"),
    ("reject", "wrong-ship count above baseline, or correct-stop count / resolved count below baseline"),
    ("hold", f"fewer than {MIN_PAIRS} paired (case, repeat) rows"),
    ("promote", "none of the above; tokens, compaction count and conversation length are reported, not gating"),
)


def zone_tokens(window: int) -> dict[str, int]:
    """Token budget per zone from the real context window."""
    if window <= 0:
        raise ValueError("window must be positive")
    return {name: int(window * share) for name, share in ZONES.items()}


def _single_file(trial: dict) -> bool:
    files = trial.get("case_files")
    return files is None or (len(files) if isinstance(files, (list, tuple)) else files) == 1


def decide(trials: list[dict], base: str, arm: str) -> dict:
    """Apply DECISION_RULE to the paired trials of base vs arm."""
    rows = cmp.pair_by_case(trials, base, arm)
    single = {(t["case"], t.get("repeat")) for t in trials if t.get("arm") == base and _single_file(t)}
    names = {(r["case"]) for r in rows}
    single_names = {c if r is None else f"{c} r{r}" for c, r in single} & names
    lost = [r["case"] for r in rows if r["case"] in single_names and r["base_resolved"] and not r["arm_resolved"]]
    total = lambda key: sum(r[key] for r in rows)
    if lost:
        verdict = "reject"
    elif (total("arm_wrong_ship") > total("base_wrong_ship") or total("arm_correct_stop") < total("base_correct_stop")
          or total("arm_resolved") < total("base_resolved")):
        verdict = "reject"
    elif len(rows) < MIN_PAIRS:
        verdict = "hold"
    else:
        verdict = "promote"
    return {"base": base, "arm": arm, "pairs": len(rows), "verdict": verdict, "lost_single_file": lost}


def dry_run() -> dict[str, dict[str, str]]:
    """Print each arm's effective env (diff against base marked) and the rule; touches nothing."""
    from evaluation.pipeline import driver

    base = driver.arm_env(BASE_ARM)
    out = {BASE_ARM: base, **{arm: driver.arm_env(arm) for arm in ARM_FLAGS}}
    for arm, env in out.items():
        print(f"[arm] {arm} (dry-run, worker untouched), {len(env)} vars")
        for key in sorted(env):
            print(f"  {key}={env[key]}" + ("   <- differs from " + BASE_ARM if env[key] != base.get(key) else ""))
    print("zones: " + ", ".join(f"{k} {int(v * 100)}%" for k, v in ZONES.items()) + " of the real context window")
    print(f"paired against {BASE_ARM} per model; decision rule (first match wins):")
    for verdict, text in DECISION_RULE:
        print(f"  {verdict}: {text}")
    return out


def main(argv: list[str] | None = None) -> int:
    args = argv if argv is not None else sys.argv[1:]
    if args[:1] == ["decide"] and len(args) == 3:
        import json

        result = decide(cmp.load_trials(), BASE_ARM, args[2])
        print(json.dumps(result, ensure_ascii=False))
        return {"promote": 0, "hold": 2, "reject": 1}[result["verdict"]]
    dry_run()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
