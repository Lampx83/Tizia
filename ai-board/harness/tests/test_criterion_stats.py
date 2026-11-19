from evaluation.pipeline import criterion_stats as S


def rows(arm, crit, matches, hard=False):
    """matches: per case, list of bool per repeat."""
    return [{"trial": f"{arm}-{ci}-{ri}", "case": f"c{ci}", "arm": arm, "repeat": ri, "criterion": crit, "hard": hard,
             "expected": True, "observed": m, "match": m, "reason": ""}
            for ci, reps in enumerate(matches) for ri, m in enumerate(reps)]


def test_detects_large_difference():
    a = rows("A", "matches_intent", [[False, False]] * 15)
    b = rows("B", "matches_intent", [[True, True]] * 15)
    res = S.compare(a, b)["soft"]["matches_intent"]
    assert res["verdict"] == "improved" and res["delta_points"] == 100.0
    assert S.compare(b, a)["soft"]["matches_intent"]["verdict"] == "regressed"


def test_zero_difference_not_flagged():
    a = rows("A", "matches_intent", [[True, False]] * 12)
    res = S.compare(a, rows("B", "matches_intent", [[True, False]] * 12))["soft"]["matches_intent"]
    assert res["verdict"] == "no_significant_change" and res["delta_points"] == 0.0
    assert res["mde_points"] > 0


def test_hard_upper_bound_and_flag():
    n = 60
    ub = S.upper_bound(0, n)
    assert abs(ub - 3 / n) < 0.006 and abs(ub - (1 - 0.05 ** (1 / n))) < 1e-6
    assert S.upper_bound(1, 2) > 0.7
    ra = rows("A", "scope_ok", [[True]] * 5, hard=True)
    rb = rows("B", "scope_ok", [[True]] * 4 + [[False]], hard=True)
    assert S.compare(ra, rb)["hard"]["flagged"] == {"a": False, "b": True}


def test_wilson_matches_metrics():
    from evaluation.suite import metrics
    r = rows("A", "no_collateral", [[True]] * 7 + [[False]] * 3)
    lo, hi = metrics.wilson(7, 10)
    md = S.report_md(r)
    assert "7/10" in md and f"{lo}-{hi}%" in md


def test_not_gradable_excluded():
    r = rows("A", "no_collateral", [[True]] * 2)
    r.append({**r[0], "match": "not_gradable", "observed": None})
    assert S.by_criterion(r)["no_collateral"] == {"hard": False, "ok": 2, "bad": 0, "nd": 1}


def test_seed_reproducible():
    a = rows("A", "x", [[i % 2 == 0] for i in range(10)])
    b = rows("B", "x", [[i % 3 == 0] for i in range(10)])
    assert S.compare(a, b) == S.compare(a, b)
