import json

from evaluation.pipeline import aa_noise as N


def grid(arm, crit, per_case_reps, repeats):
    """per_case_reps: list (per case) of bool per repeat; repeats: repeat ids."""
    return [{"trial": f"{arm}-{ci}-{rep}", "case": f"c{ci}", "arm": arm, "repeat": rep, "criterion": crit, "hard": False,
             "expected": True, "observed": m, "match": m, "reason": ""}
            for ci, ms in enumerate(per_case_reps) for rep, m in zip(repeats, ms)]


def test_split_and_known_delta():
    rows = grid("A", "matches_intent", [[True, True, False, False]] * 10, [1, 2, 3, 4])
    s1, s2 = N.split_runs(rows, "A", [1, 2], [3, 4])
    assert {r["arm"] for r in s1} == {"set1"} and {r["arm"] for r in s2} == {"set2"} and len(s1) == len(s2) == 20
    out = N.noise_report(s1, s2)
    assert out["per_criterion"]["matches_intent"]["delta_points"] == -100.0
    assert out["noise_floor"]["matches_intent"] == 100.0
    assert "pass_rate" in out["noise_floor"]


def test_noise_floor_is_max_ci_margin():
    rows = grid("A", "x", [[i % 2 == 0, i % 3 == 0] for i in range(12)], [1, 2])
    out = N.noise_report(*N.split_runs(rows, "A", [1], [2]))
    lo, hi = out["per_criterion"]["x"]["ci95_points"]
    assert out["noise_floor"]["x"] == max(abs(lo), abs(hi))


def test_file_has_verifiable_hash(tmp_path):
    rows = grid("A", "x", [[True, False]] * 6, [1, 2])
    p = tmp_path / "noise.json"
    N.write_noise(p, N.noise_report(*N.split_runs(rows, "A", [1], [2])))
    assert N.load_noise(p)["x"] >= 0
    d = json.loads(p.read_text())
    d["payload"]["noise_floor"]["x"] = 0.0
    p.write_text(json.dumps(d))
    try:
        N.load_noise(p)
        assert False
    except ValueError as e:
        assert "hash" in str(e)


def test_plan_reuses_trials_with_same_pin(tmp_path):
    for name, rep, pin in [("A-r1-c0", 1, "p1"), ("A-r2-c0", 2, "OLD")]:
        (tmp_path / f"{name}.json").write_text(json.dumps({"arm": "A", "case": "c0", "repeat": rep, "pin": pin}))
    todo = N.plan_missing(tmp_path, "A", ["c0", "c1"], [1, 2], "p1")
    assert todo == {1: ["c1"], 2: ["c0", "c1"]}
