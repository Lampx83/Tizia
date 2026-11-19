from evaluation.pipeline import criteria
from evaluation.pipeline import criterion_stats as S
from evaluation.pipeline import eval_gate as G


def mk(arm, crit, vals, hard=False, reps=(1,), prefix="c", **extra):
    """vals: per case, bool (all repeats) or list of bool per repeat."""
    out = []
    for ci, v in enumerate(vals):
        for k, rep in enumerate(reps):
            m = v[k] if isinstance(v, list) else v
            out.append({"trial": f"{arm}-{prefix}{ci}-{rep}", "case": f"{prefix}{ci}", "arm": arm, "repeat": rep,
                        "criterion": crit, "hard": hard, "expected": True, "observed": m, "match": m, "reason": "", **extra})
    return out


def test_pass_rate_and_pass_k():
    r = mk("A", "x", [True, [True, False], False], reps=(1, 2))
    assert sum(1 for x in S.add_pass_rate(r) if x["criterion"] == "pass_rate") == 6
    assert S.pass_k(r) == {"cases": 3, "pass_k": 1 / 3}


def test_regression_blocked_equal_passes():
    a, b = mk("A", "x", [True] * 12), mk("B", "x", [False] * 12)
    res = G.gate(a, b)
    assert res["soft"]["x"]["verdict"] == "regress" and res["exit"] == 1
    assert G.gate(a, mk("B", "x", [True] * 12))["exit"] == 0


def test_noise_floor_threshold():
    a, b = mk("A", "x", [True] * 12), mk("B", "x", [False] * 12)  # -100 points
    assert G.gate(a, b, noise={"x": 50.0})["soft"]["x"]["verdict"] == "regress"
    assert G.gate(a, b, noise={"x": 50.0})["threshold_points"]["x"] == -50.0
    assert G.gate(a, b, noise={"x": 150.0})["soft"]["x"]["verdict"] != "regress"


def test_new_hard_violation_blocked():
    a, b = mk("A", "scope_ok", [True] * 10, hard=True), mk("B", "scope_ok", [True] * 9 + [False], hard=True)
    res = G.gate(a, b)
    assert res["hard"]["scope_ok"]["verdict"] == "regress" and res["exit"] == 1


def test_mde_reported():
    assert G.gate(mk("A", "x", [True] * 12), mk("B", "x", [True] * 12))["soft"]["x"]["mde_points"] > 0


def test_paired_masks_same_mean():
    a = mk("A", "x", [False, True] + [True] * 10)
    b = mk("B", "x", [True, False] + [True] * 10)
    res = G.gate(a, b)
    p = res["paired"]["x"]
    assert p["pass_to_fail"] == [("c1", 1, None)] and p["fail_to_pass"] == [("c0", 1, None)]
    assert p["rate_pass_to_fail"] == round(1 / 12, 4)
    ha = mk("A", "no_danger_added", [False, True] + [True] * 10, hard=True)
    hb = mk("B", "no_danger_added", [True, False] + [True] * 10, hard=True)
    assert G.gate(ha, hb)["hard"]["no_danger_added"]["verdict"] == "regress"


def test_unpaired_inconclusive():
    res = G.gate(mk("A", "x", [True] * 12), mk("B", "x", [True] * 11))
    assert res["unpaired"] == {"base_only": [("c11", 1, None)], "cand_only": []}
    assert res["overall"] == "inconclusive" and res["exit"] == 2


def test_slice_regress_while_average_ok():
    def run(arm):
        rows = mk(arm, "x", [arm == "A"] * 8, prefix="a", types=["css_color"], level=1, tier="surface")
        return rows + mk(arm, "x", [arm == "B" or i % 2 == 0 for i in range(24)], prefix="b",
                         types=["replace_text"], level=2, tier="surface")
    res = G.gate(run("A"), run("B"))
    assert res["soft"]["pass_rate"]["verdict"] != "regress"
    s = res["slices"]["types:css_color"]
    assert s["verdict"] == "regress" and s["n"] == 8 and res["exit"] == 1
    assert res["slices"]["types:replace_text"]["verdict"] != "regress"


def test_flaky_case_lowers_pass_k():
    a = mk("A", "x", [True] * 10, reps=(1, 2))
    b = mk("B", "x", [[True, False]] * 10, reps=(1, 2))
    res = G.gate(a, b)
    assert res["pass_k"]["base"] == 1.0 and res["pass_k"]["cand"] == 0.0 and res["pass_k"]["verdict"] == "regress"


CASES = {f"c{i}": {"id": f"c{i}", "types": ["t"], "level": 1, "file": "f.html"} for i in range(12)}


def clean(arm):
    return [{"trial": f"{arm}-{i}", "case": f"c{i}", "arm": arm, "repeat": 1, "criterion": c.id, "hard": c.hard,
             "expected": exp, "observed": True, "match": True, "reason": ""}
            for i in range(12) for c, exp in criteria.table_for(CASES[f"c{i}"])]


def refuse(rows, m=None, cases=CASES, **kw):
    m = m or G.make_manifest(clean("A") + clean("B"), CASES)
    try:
        G.check_integrity(m, rows, cases, **kw)
    except G.IntegrityError as e:
        return str(e)
    raise AssertionError("not refused")


def test_clean_report_passes():
    a, b = clean("A"), clean("B")
    m = G.make_manifest(a + b, CASES)
    G.check_integrity(m, a + b, CASES)
    assert G.gate(a, b, manifest=m, cases=CASES)["exit"] == 0


def test_nan_refused():
    b = clean("B")
    b[0]["match"] = None
    assert "NaN" in refuse(clean("A") + b)
    b[0]["match"], b[0]["value"] = True, float("nan")
    assert "NaN" in refuse(clean("A") + b)


def test_dropped_row_refused():
    b = clean("B")
    assert "missing" in refuse(clean("A") + b[1:])
    assert "missing" in refuse(clean("A") + [r for r in b if r["case"] != "c3"])


def test_foreign_seed_refused():
    b = clean("B")
    for r in b:
        if r["case"] == "c2":
            r["seed"] = 99
    assert "seed" in refuse(clean("A") + b)


def test_slice_changed_refused():
    assert "slice" in refuse(clean("A") + clean("B"), cases={**CASES, "c1": {**CASES["c1"], "level": 5}})


def test_threshold_criteria_quality_gate_changed_refused():
    b = clean("B")
    b.append({**b[0], "criterion": "quality:contrast", "hard": False, "value": 5.0, "threshold": 1.0})
    assert "threshold" in refuse(clean("A") + b)
    base = clean("A") + clean("B")
    for key, word in [("criteria_hash", "criteria"), ("quality_hash", "quality")]:
        m = G.make_manifest(base, CASES)
        m[key] = "0" * 64
        assert word in refuse(base, m)
    assert "gate" in refuse(base, gate_params={"noise_floor": {"x": 99.0}})
