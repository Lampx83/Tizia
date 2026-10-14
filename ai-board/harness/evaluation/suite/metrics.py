"""Eval suite statistics: Wilson CI, pass@k / pass^k, funnels, cost, trajectory, paired comparison of two runs. Pure functions over rows."""
from __future__ import annotations

import math
import random
from collections import Counter

CELLS = ("kind", "level", "style", "split")


def wilson(k: int, n: int, z: float = 1.96) -> tuple[float, float]:
    """Wilson 95% interval in % for k of n."""
    if not n:
        return 0.0, 0.0
    p, scale = k / n, 1 + z * z / n
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / scale
    centre = (p + z * z / (2 * n)) / scale
    return round(100 * (centre - half), 1) + 0.0, round(100 * (centre + half), 1) + 0.0


def rate(k: int, n: int) -> dict:
    lo, hi = wilson(k, n)
    return {"k": k, "n": n, "rate": round(100 * k / n, 1) if n else 0.0, "lo": lo, "hi": hi}


def failure_class(row: dict) -> str | None:
    """First stage that stopped the trial; None = resolved. Order follows the pipeline."""
    if row["resolved"]:
        return None
    if row.get("infra_error"):
        return "infra"
    if row["mode"].startswith("e2e"):
        if row["plan"]["blocked"]:
            return "plan_blocked"
        if row["plan"].get("validator_blocked") and not row["plan"].get("approved"):
            return "validator_blocked"
        if not row["plan"]["final_hit"]:
            return "plan_miss"
    if not row["gate_passed"]:
        reason = row.get("reason") or ""
        if "search" in reason or "after_line" in reason or "Dòng gần giống" in reason:
            return "edit_not_applied"
        if "cú pháp" in reason:
            return "syntax"
        return "gate3_blocked"
    if row.get("gate4") == "blocked":
        return "gate4_blocked"
    return "wrong_result"


def per_task(rows: list[dict]) -> dict[str, list[bool]]:
    tasks: dict[str, list[bool]] = {}
    for row in rows:
        tasks.setdefault(row["id"], []).append(bool(row["resolved"]))
    return tasks


def summarize(rows: list[dict]) -> dict:
    """One group of trials (single mode). resolved = gold oracle passed; resolved_clean also edited no file outside the target."""
    n = len(rows)
    if not n:
        return {"trials": 0}
    tasks = per_task(rows)
    out = {
        "trials": n, "tasks": len(tasks),
        "resolved": rate(sum(r["resolved"] for r in rows), n),
        "resolved_clean": rate(sum(r["resolved"] and not r["collateral"] for r in rows), n),
        "shipped": rate(sum(bool(r.get("shipped")) for r in rows), n),
        "clean_fixture_shipped": rate(sum(r["resolved"] and not r["collateral"] and bool(r.get("shipped")) for r in rows), n),
        "pass_any": rate(sum(any(v) for v in tasks.values()), len(tasks)),
        "pass_all": rate(sum(all(v) for v in tasks.values()), len(tasks)),
        "flaky_tasks": sum(0 < sum(v) < len(v) for v in tasks.values()),
        "failure": dict(Counter(failure_class(r) or "resolved" for r in rows)),
    }
    resolved = [r for r in rows if r["resolved"]]
    telemetry = clean_cost(rows)
    total = lambda name: telemetry[name]["total"]  # noqa: E731
    average = lambda name, count, digits: round(total(name) / count, digits) if total(name) is not None and count else None  # noqa: E731
    out["cost"] = {
        "model_calls_mean": average("model_calls", n, 2),
        "retries_mean": round(sum(r["retries"] for r in rows) / n, 2),
        "stuck": rate(sum(bool(r["stuck"]) for r in rows), n),
        "truncated": rate(sum(bool(r["truncated"]) for r in rows), n),
        "tokens_in_total": sum(r["tokens_in"] for r in rows) if total("tokens") is not None else None,
        "tokens_out_total": sum(r["tokens_out"] for r in rows) if total("tokens") is not None else None,
        "wall_s_mean": average("processing_s", n, 1),
        "wall_s_per_resolved": average("processing_s", len(resolved), 1),
        "tokens_per_resolved": round(total("tokens") / len(resolved)) if total("tokens") is not None and resolved else None,
        "reasoning_chars_mean": round(sum(r.get("reasoning_chars", 0) for r in rows) / n),
    }
    out["references"] = {"with_missing_ref": rate(sum(bool(r.get("ref_errors")) for r in rows), n),
                         "schema_fallbacks": sum(r.get("schema_fallbacks", 0) for r in rows)}
    out["cost_per_resolved_clean"] = telemetry
    if rows[0]["mode"].startswith("e2e"):
        plans = [r["plan"] for r in rows]
        out["planning"] = {
            "first_hit": rate(sum(p["first_hit"] for p in plans), n), "first_exact": rate(sum(p["first_exact"] for p in plans), n),
            "final_hit": rate(sum(p["final_hit"] for p in plans), n), "first_parse_ok": rate(sum(p["first_parse_ok"] for p in plans), n),
            "first_nonexistent": rate(sum(p["first_nonexistent"] for p in plans), n),
            "first_plans_new_page": rate(sum(p["first_plans_new_page"] for p in plans), n),
            "blocked": rate(sum(p["blocked"] for p in plans), n), "extra_files_mean": round(sum(p["first_extra"] for p in plans) / n, 2),
        }
    judged = [r for r in rows if (r.get("review") or {}).get("ran")]
    if judged:  # corpus and pack requests are benign: every block is a false positive of the gate 4 content guard
        out["review_false_block"] = rate(sum(bool(r["review"]["blocked"]) for r in judged), len(judged))
    funnel = [("planned", lambda r: not r["mode"].startswith("e2e") or r["plan"]["final_hit"]), ("gate3", lambda r: r["gate_passed"]),
              ("gate4", lambda r: r.get("gate4") == "passed"), ("resolved", lambda r: r["resolved"])]
    out["funnel"] = {name: sum(bool(f(r)) for r in rows) for name, f in funnel}
    return out


def clean_cost(rows: list[dict]) -> dict:
    """All attempts contribute; absent telemetry or zero clean successes stays unknown."""
    clean = sum(bool(r.get("resolved")) and not r.get("collateral") for r in rows)
    fields = {"model_calls": ("model_calls",), "tokens": ("tokens_in", "tokens_out"), "processing_s": ("wall_s",)}
    out = {"version": 1, "denominator": clean, "attempts": len(rows)}
    for name, keys in fields.items():
        complete = bool(rows) and all(isinstance(r.get(k), (int, float)) and not isinstance(r[k], bool)
                                    and math.isfinite(r[k]) and r[k] >= 0 for r in rows for k in keys)
        total = sum(r[k] for r in rows for k in keys) if complete else None
        out[name] = {"total": total, "per_resolved_clean": total / clean if total is not None and clean else None,
                     "status": "available" if complete and clean else "missing_telemetry" if not complete else "zero_success"}
    # shortcut: wall time is processing telemetry, not GPU usage; require matched operator conditions for its verdict.
    out["timing_comparable"] = False
    return out


def compare_clean_cost(rows_a: list[dict], rows_b: list[dict], *, timing_comparable: bool = False) -> dict:
    """Check the separate +10% limits; caller must establish protocol/pin comparability."""
    a, b = clean_cost(rows_a), clean_cost(rows_b)
    out = {}
    for name in ("model_calls", "tokens", "processing_s"):
        av, bv = a[name]["per_resolved_clean"], b[name]["per_resolved_clean"]
        if av is None or bv is None or (name == "processing_s" and not timing_comparable):
            out[name] = {"status": "pending", "baseline": av, "candidate": bv, "increase_percent": None}
        else:
            limit = av * 1.1
            out[name] = {"status": "pass" if bv <= limit or math.isclose(bv, limit, rel_tol=1e-12, abs_tol=0) else "fail", "baseline": av,
                         "candidate": bv, "increase_percent": round(100 * (bv / av - 1), 2) if av else None}
    return out


def report(rows: list[dict]) -> dict:
    """Groups by mode, then by corpus cell. Held-out contributes to the totals and the split=heldout group only."""
    result: dict[str, dict] = {}
    for mode in sorted({r["mode"] for r in rows}):
        part = [r for r in rows if r["mode"] == mode]
        groups = {"all": summarize(part)}
        for cell in CELLS:
            for value in sorted({str(r[cell]) for r in part if r.get(cell) is not None}):
                groups[f"{cell}={value}"] = summarize([r for r in part if str(r.get(cell)) == value])
        result[mode] = groups
    return result


def _binom_two_sided(b: int, c: int) -> float:
    n = b + c
    if not n:
        return 1.0
    k = min(b, c)
    tail = sum(math.comb(n, i) for i in range(k + 1)) / 2 ** n
    return min(1.0, round(2 * tail, 4))


def compare(rows_a: list[dict], rows_b: list[dict], *, seed: int = 7, boot: int = 4000) -> dict:
    """Paired by task id (mean resolved over repeats). A = baseline, B = candidate. Verdict needs both the bootstrap CI and the sign test to agree."""
    keys_a = [(r.get("id"), r.get("mode"), r.get("repeat")) for r in rows_a]
    keys_b = [(r.get("id"), r.get("mode"), r.get("repeat")) for r in rows_b]
    if any(None in key for key in keys_a + keys_b) or len(set(keys_a)) != len(keys_a) or len(set(keys_b)) != len(keys_b):
        return {"verdict": "incomparable", "reason": "missing trial identity or duplicate task/mode/repeat"}
    if set(keys_a) != set(keys_b):
        return {"verdict": "incomparable", "reason": "task/mode/repeat cohorts differ"}
    ta, tb = per_task(rows_a), per_task(rows_b)
    ids = sorted(ta)
    if not ids:
        return {"verdict": "incomparable", "reason": "no common tasks"}
    mean = lambda v: sum(v) / len(v)  # noqa: E731
    diff = [mean(tb[i]) - mean(ta[i]) for i in ids]
    rng = random.Random(seed)
    samples = sorted(sum(diff[rng.randrange(len(diff))] for _ in diff) / len(diff) for _ in range(boot))
    lo, hi = round(100 * samples[int(0.025 * boot)], 1), round(100 * samples[int(0.975 * boot) - 1], 1)
    better, worse = sum(d > 0 for d in diff), sum(d < 0 for d in diff)
    p = _binom_two_sided(better, worse)
    delta = round(100 * sum(diff) / len(diff), 1)
    verdict = "improved" if lo > 0 and p < 0.05 else "regressed" if hi < 0 and p < 0.05 else "no_significant_change"
    return {"verdict": verdict, "tasks": len(ids), "delta_points": delta, "ci95_points": [lo, hi], "tasks_better": better, "tasks_worse": worse, "sign_test_p": p}
