"""Stage replay for repair_sampling_diversity: does the 2nd repair attempt repeat the 1st, flag OFF vs ON.

Judged at the repair stage only, upstream inputs (plan, base, repair feedback) held fixed from saved journal rows.
CLI (from ai-board/harness): python -m evaluation.replay_repair --fetch | --offline | --model
"""
from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import subprocess
import sys
from pathlib import Path

SNAPSHOT = Path(__file__).resolve().parents[3] / ".scratch" / "lf201-repair" / "snapshot.json"
SECOND = 2
NEAR = 0.98
DIFF_TAIL = 8000
MIN_PAIRS = 20
REPAIR_ACTION = "repair_code"

_SQL_JOURNAL = ("select id,ticket_id,run_id,node,state_delta from ai_attempt_journal order by ticket_id,run_id,id")
_SQL_PLANS = "select root_ticket_id,plan_hash,plan_json from ai_plans"


def _psql(container: str, sql: str) -> list[list[str]]:
    user = subprocess.run(["docker", "exec", container, "printenv", "POSTGRES_USER"], capture_output=True, text=True,
                          check=True).stdout.strip()
    out = subprocess.run(["docker", "exec", container, "psql", "-U", user, "-d", "tizia", "-At", "-F", "\x1f", "-R", "\x1e",
                          "-c", sql], capture_output=True, text=True, encoding="utf-8", check=True).stdout
    return [row.split("\x1f") for row in out.split("\x1e") if row.strip()]


def fetch(container: str, out: Path = SNAPSHOT) -> dict:
    """Dump journal rows + plans from the aiboard Postgres container to a local JSON snapshot."""
    journal = [{"id": int(r[0]), "ticket": r[1], "run": r[2], "node": r[3], "state": _loads(r[4])}
               for r in _psql(container, _SQL_JOURNAL)]
    plans = {r[1]: _loads(r[2]) for r in _psql(container, _SQL_PLANS)}
    snap = {"journal": journal, "plans": plans}
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(snap, ensure_ascii=False), encoding="utf-8")
    return snap


def _loads(text: str) -> dict:
    try:
        value = json.loads(text)
    except ValueError:
        return {}
    return value.get("state", value) if isinstance(value, dict) else {}


def _digest(value) -> str:
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def _failure(gates: list[dict]) -> dict | None:
    return next((g for g in reversed(gates or []) if g.get("blocked")), None)


def failure_class(reason: str) -> tuple[str, str]:
    """(class, action) from repair_class.classify on a reason string; no model."""
    from runtime import repair_class
    out = repair_class.classify({"reason": reason or ""}, {}, set())
    return out["class"], out["action"]


def build_chains(snapshot: dict) -> list[dict]:
    """One chain per (ticket, run): per attempt n the candidate, the failure after it, and the feedback it started from."""
    groups: list[tuple[str, list[dict]]] = []
    open_group: dict[str, list[dict]] = {}
    for row in snapshot["journal"]:
        if "repairs" not in row["state"]:
            continue
        rows = open_group.get(row["ticket"])
        if rows is None or len(row["state"]["repairs"]) < len(rows[-1]["state"]["repairs"]):
            rows = open_group[row["ticket"]] = []
            groups.append((row["ticket"], rows))
        rows.append(row)
    chains = []
    for ticket, rows in groups:
        run = rows[-1]["run"]
        final = rows[-1]["state"]
        repairs, metrics = final["repairs"], (final.get("repair_state") or {}).get("round_metrics") or []
        attempts: dict[int, dict] = {}
        for row in rows:
            state, n = row["state"], len(row["state"]["repairs"])
            slot = attempts.setdefault(n, {})
            if row["node"] == "attempt_open":
                slot["feedback"] = (state.get("repair_state") or {}).get("repair_reason")
                slot["evidence"] = (state.get("repair_state") or {}).get("repair_evidence")
            if row["node"] == "gate_3" and state.get("produced"):
                slot["produced"] = state["produced"]
                slot["base_sha"] = state.get("base_sha")
        texts = (final.get("repair_state") or {}).get("diff_texts") or []
        for n in range(len(repairs) + 1):
            slot = attempts.setdefault(n, {})
            if n < len(repairs):
                slot["reason"], slot["gate"] = repairs[n].get("reason"), repairs[n].get("gate")
            elif fail := _failure(final.get("gates")):
                slot["reason"], slot["gate"] = fail.get("reason"), fail.get("gate")
            if n < len(metrics):
                slot["diff"] = metrics[n].get("diff")
            if (at := n - (len(metrics) - len(texts))) >= 0 and at < len(texts):
                slot["diff_text"] = texts[at]
            if n and "feedback" not in slot and n - 1 < len(repairs):
                prev = repairs[n - 1]
                slot["feedback"] = f"cổng {prev.get('gate')}: {prev.get('reason')}"
        plan_hash = (final.get("pins") or {}).get("plan_hash")
        chains.append({"ticket": ticket, "run": run, "plan": snapshot["plans"].get(plan_hash), "base_sha": final.get("base_sha"), "attempts": attempts})
    return chains


def pairs(chains: list[dict]) -> list[dict]:
    """Usable pairs: first repair (attempt 1) and second (attempt 2) both with a recorded failure."""
    out = []
    for chain in chains:
        first, second = chain["attempts"].get(SECOND - 1), chain["attempts"].get(SECOND)
        if not (first and second and first.get("reason") is not None and second.get("reason") is not None):
            continue
        base = first.get("base_sha") or chain.get("base_sha")
        replayable = bool(second.get("feedback") and chain.get("plan") and (first.get("produced") or first.get("diff_text")) and base)
        out.append({"ticket": chain["ticket"], "run": chain["run"], "first": first, "second": second,
                    "plan": chain.get("plan"), "base_sha": base, "replayable": replayable})
    return out


def _code(produced: dict) -> dict:
    return {file: entry.get("code") for file, entry in (produced or {}).items()}


def similar(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, a, b, autojunk=False).ratio()


def judge_saved(pair: dict) -> dict:
    """Repeat flags of one saved pair: byte-identical (candidate or diff), near-identical code, same failure class."""
    first, second = pair["first"], pair["second"]
    c1, c2 = first.get("produced"), second.get("produced")
    identical = bool((first.get("diff") and first.get("diff") == second.get("diff")) or (c1 and c2 and _code(c1) == _code(c2)))
    near = identical or bool(c1 and c2 and all(similar(a or "", (_code(c2).get(f) or "")) > NEAR for f, a in _code(c1).items()))
    k1, a1 = failure_class(first["reason"])
    k2, a2 = failure_class(second["reason"])
    same_class = (first.get("gate"), k1) == (second.get("gate"), k2)
    return {"identical": identical, "near": near, "same_class": same_class, "repeat": identical or same_class,
            "worse": a1 == REPAIR_ACTION and a2 != REPAIR_ACTION, "class1": k1, "class2": k2}


def offline(chains: list[dict]) -> dict:
    """OFF baseline from saved second attempts (flag was off then); no model."""
    prs = pairs(chains)
    rows = [judge_saved(p) for p in prs]
    n = len(rows)
    rate = lambda key: round(sum(r[key] for r in rows) / n, 4) if n else None  # noqa: E731
    return {"chains": len(chains), "pairs": n, "tickets": len({p["ticket"] for p in prs}),
            "replayable_pairs": sum(p["replayable"] for p in prs), "identical": sum(r["identical"] for r in rows),
            "near_identical": sum(r["near"] for r in rows), "same_class": sum(r["same_class"] for r in rows),
            "repeat": sum(r["repeat"] for r in rows), "worse": sum(r["worse"] for r in rows),
            "repeat_rate": rate("repeat"), "identical_rate": rate("identical"), "worse_rate": rate("worse")}


def verdict(off: dict, on: dict, pairs_n: int) -> dict:
    """PASS | FAIL at stage | NOT MEASURABLE from per-sample repeat/worse counts of both arms."""
    if pairs_n < MIN_PAIRS:
        return {"verdict": "NOT MEASURABLE", "why": f"{pairs_n} replayable pairs, need >= {MIN_PAIRS}"}
    if not off["repeat"]:
        return {"verdict": "NOT MEASURABLE", "why": "OFF never repeats, nothing for the flag to lower"}
    off_r, on_r = off["repeat"] / off["n"], on["repeat"] / on["n"]
    off_w, on_w = off["worse"] / off["n"], on["worse"] / on["n"]
    if on_r < off_r and on_w <= off_w:
        return {"verdict": "PASS", "why": f"repeat {off_r:.3f} -> {on_r:.3f}, worse {off_w:.3f} -> {on_w:.3f}"}
    return {"verdict": "FAIL at stage", "why": f"repeat {off_r:.3f} -> {on_r:.3f}, worse {off_w:.3f} -> {on_w:.3f}"}


class _SpyModels:
    """Wrap a models client, record the temperature of each gate-3 call to prove the flag took effect."""

    def __init__(self, inner, temps: list):
        self._inner, self._temps = inner, temps

    def __getattr__(self, name):
        attr = getattr(self._inner, name)
        if name not in ("generate", "generate_for"):
            return attr

        def call(*args, **kwargs):
            self._temps.append(kwargs.get("temperature"))
            return attr(*args, **kwargs)
        return call


def run_second_attempt(pair: dict, flag_on: bool, source: str, deps_factory=None) -> dict:
    """Re-run attempt 2 of gate 3 from saved feedback with the flag on/off; judge against the saved first candidate."""
    import os
    import tempfile
    import settings
    from gates import implement
    from runtime.budget import Budget
    from runtime import meter
    os.environ["AI_BOARD_REPAIR_SAMPLING_DIVERSITY"] = "1" if flag_on else "0"
    settings.reset_settings()
    temps: list = []
    deps = deps_factory() if deps_factory else _real_deps()
    tracer = meter.Tracer(Path(tempfile.mkdtemp(prefix="replay-repair-")) / "t.jsonl")
    tracer.begin(1, lambda _spans: None)
    tracer.attempt = SECOND
    import dataclasses
    deps = dataclasses.replace(deps, models=_SpyModels(deps.models, temps), trace=tracer)
    state = {"plan": pair["plan"], "checkout_source": source, "scratch_repo": tempfile.mkdtemp(prefix="replay-repair-repo-"),
             "repair_reason": pair["second"]["feedback"], "repair_evidence": pair["second"].get("evidence"),
             "produced": {}, "base_sha": pair["base_sha"]}
    result = implement.run(state, deps, Budget.from_env())
    produced = state.get("produced") or {}
    blocked = bool(result.get("blocked"))
    first_code = _code(pair["first"].get("produced"))
    if first_code:
        identical = not blocked and all((produced.get(f) or {}).get("code") == code for f, code in first_code.items())
        near = not blocked and all(similar(code or "", (produced.get(f) or {}).get("code") or "") > NEAR
                                    for f, code in first_code.items())
    else:
        new = "\n".join(str(d.get("diff")) for d in result.get("diffs") or [])[-DIFF_TAIL:]
        old = pair["first"]["diff_text"][-DIFF_TAIL:]
        identical, near = not blocked and new == old, not blocked and similar(old, new) > NEAR
    kind, action = failure_class(result.get("reason")) if blocked else (None, REPAIR_ACTION)
    return {"flag_on": flag_on, "temps": temps, "blocked": blocked, "identical": identical, "near": near,
            "class": kind, "repeat": identical or near, "worse": blocked and action != REPAIR_ACTION}


def model_arms(prs: list[dict], repeats: int, source: str, runner=run_second_attempt) -> dict:
    """Both arms over replayable pairs x repeats; a sample whose first call temperature contradicts its arm is invalid (inner retries warm up either way)."""
    arms = {"off": {"n": 0, "repeat": 0, "worse": 0, "invalid": 0}, "on": {"n": 0, "repeat": 0, "worse": 0, "invalid": 0}}
    for pair in prs:
        for _ in range(repeats):
            for name in ("off", "on"):
                sample = runner(pair, name == "on", source)
                arm = arms[name]
                warm = (sample["temps"][0] or 0) > 0 if sample["temps"] else None
                if warm is not None and warm != (name == "on"):
                    arm["invalid"] += 1
                    continue
                arm["n"] += 1
                arm["repeat"] += sample["repeat"]
                arm["worse"] += sample["worse"]
    return arms


def _real_deps():
    from runtime.pipeline import Deps
    return Deps.real()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--snapshot", type=Path, default=SNAPSHOT)
    ap.add_argument("--container", default="aiboard-postgres")
    mode = ap.add_mutually_exclusive_group(required=True)
    mode.add_argument("--fetch", action="store_true", help="dump journal+plans from the DB container to --snapshot")
    mode.add_argument("--offline", action="store_true", help="OFF baseline from saved data, no model")
    mode.add_argument("--model", action="store_true", help="re-run attempt 2 flag OFF vs ON (GPU lane)")
    ap.add_argument("--repeats", type=int, default=3, help="N repeats per pair and arm (--model)")
    ap.add_argument("--source", default=str(Path(__file__).resolve().parents[3]), help="git checkout holding base_sha (--model)")
    args = ap.parse_args(argv)
    if args.fetch:
        snap = fetch(args.container, args.snapshot)
        print(f"snapshot {args.snapshot}: {len(snap['journal'])} journal rows, {len(snap['plans'])} plans")
        return 0
    chains = build_chains(json.loads(args.snapshot.read_text(encoding="utf-8")))
    if args.offline:
        print(json.dumps(offline(chains), indent=1))
        print("GPU lane: cd ai-board/harness && python -m evaluation.replay_repair --model --repeats 3 [--source <git checkout holding base_sha>]")
        return 0
    prs = [p for p in pairs(chains) if p["replayable"]]
    arms = model_arms(prs, args.repeats, args.source)
    print(json.dumps({"pairs": len(prs), "repeats": args.repeats, "arms": arms,
                       **verdict(arms["off"], arms["on"], len(prs))}, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
