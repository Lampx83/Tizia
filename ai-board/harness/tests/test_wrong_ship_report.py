"""Seam: wrong_ship_report tiers, infra exclusion, upper bound, stored-candidate re-grade."""
import json

from evaluation.pipeline import wrong_ship_report as W

CASES = {"c1": {"id": "c1", "file": "public/p.html"}, "c2": {"id": "c2", "file": "public/p.html"}}


def trial(case="c1", outcome="ready_for_pr", **kw):
    return {"arm": "B0", "repeat": 9, "case": case, "outcome": outcome, **kw}


def grader(verdicts):
    return lambda stem, t, c: verdicts.get(stem)


def build(trials, verdicts, **kw):
    return W.build(trials, CASES, grader(verdicts), **kw)


def test_tiers_split_wrong_ship_solved_unproven_blocked():
    trials = {"a": trial(), "b": trial(), "c": trial(outcome="needs_review"), "d": trial(outcome="needs_review"),
              "e": trial(outcome="blocked")}
    v = {"a": (True, ""), "b": (False, "x"), "c": (True, ""), "d": (False, "y"), "e": (False, "z")}
    r = build(trials, v)
    assert r["tiers"] == {"wrong_ship": 2, "solved": 1, "needs_review_unproven": 1, "blocked": 1, "ungraded": 0}
    assert r["n"] == 5 and r["wrong_ship_trials"] == ["b", "d"]


def test_blocked_is_never_wrong_ship_even_if_candidate_fails():
    r = build({"e": trial(outcome="blocked")}, {"e": (False, "z")})
    assert r["tiers"]["blocked"] == 1 and r["tiers"]["wrong_ship"] == 0


def test_shipped_without_candidate_is_ungraded_not_solved():
    r = build({"a": trial()}, {})
    assert r["tiers"]["ungraded"] == 1 and r["tiers"]["solved"] == 0


def test_infra_trials_leave_the_denominator_and_are_marked_for_one_rerun():
    trials = {"a": trial(), "i1": trial(outcome="blocked", infra_tag="driver_cancel"),
              "i2": trial(outcome="blocked", timed_out=True),
              "i3": trial(outcome="blocked", failure_class="transient"),
              "i4": trial(outcome="blocked", verdict_reason="HTTP Error 502: Bad Gateway"),
              "i5": trial(outcome="blocked", verdict_reason="Remote end closed connection without response")}
    r = build(trials, {"a": (True, "")})
    assert r["n"] == 1 and r["infra"]["n"] == 5 and r["infra"]["rerun_once"] == ["i1", "i2", "i3", "i4", "i5"]


def test_model_side_block_is_not_infra():
    r = build({"a": trial(outcome="blocked", verdict_reason="loop stop state_repeat")}, {})
    assert r["n"] == 1 and r["infra"]["n"] == 0


def test_round_over_ten_percent_infra_is_discarded():
    trials = {f"t{i}": trial(outcome="blocked") for i in range(9)}
    trials["i"] = trial(outcome="blocked", timed_out=True)
    assert build(trials, {})["infra"]["round_discarded"] is False
    trials["j"] = trial(outcome="blocked", timed_out=True)
    r = build(trials, {})
    assert r["infra"]["round_discarded"] is True and r["infra"]["rate"] > 0.1


def test_trials_without_expectation_are_counted_apart():
    trials = {"a": trial(), "z": trial(case="c2")}
    r = build(trials, {"a": (True, ""), "z": W.NO_EXPECTATION})
    assert r["n"] == 1 and r["no_expectation"] == 1


def test_zero_wrong_ship_bound_is_3_over_n_and_wording_is_cautious():
    trials = {f"t{i}": trial() for i in range(30)}
    r = build(trials, {k: (True, "") for k in trials})
    assert r["wrong_ship_upper_bound"] == 0.1
    text = W.md(r, "r9")
    assert "3/30" in text and "không còn sai" not in text.lower() and "no longer" not in text.lower()


def test_nonzero_wrong_ship_bound_exceeds_observed_rate():
    trials = {f"t{i}": trial() for i in range(10)}
    v = {k: (True, "") for k in trials}
    v["t0"] = (False, "bad")
    r = build(trials, v)
    assert r["wrong_ship_upper_bound"] > 0.1


def test_partial_round_is_flagged_and_not_extrapolated():
    trials = {f"t{i}": trial() for i in range(15)}
    r = build(trials, {k: (True, "") for k in trials}, expected=42)
    assert r["partial"] is True and r["expected"] == 42 and r["n"] == 15
    assert "PARTIAL" in W.md(r, "r9") and "extrapolat" not in json.dumps(r)
    assert build(trials, {k: (True, "") for k in trials}, expected=15)["partial"] is False


def test_stored_grader_regrades_candidate_with_predicates(tmp_path):
    seed = "<p>old</p>\n"
    exps = {"new_file_prefixes": [], "cases": {"c1": {"kind": "replace_text", "zones": [
        {"find": "<p>old</p>", "span": "old", "new": "new"}]}}}
    (tmp_path / "a.candidate.html").write_text("<p>new</p>\n", encoding="utf-8")
    (tmp_path / "a.candidate.diff").write_text("diff --git a/public/p.html b/public/p.html\n", encoding="utf-8")
    (tmp_path / "b.candidate.html").write_text("<p>old</p><p>x</p>\n", encoding="utf-8")
    (tmp_path / "b.candidate.diff").write_text("diff --git a/public/p.html b/public/p.html\n", encoding="utf-8")
    g = W.stored_grader(tmp_path, seed=lambda ref, path: seed, expectations=exps)
    t = trial(candidate_base_sha="abc")
    assert g("a", t, CASES["c1"])[0] is True
    assert g("b", t, CASES["c1"])[0] is False
    assert g("missing", t, CASES["c1"]) is None
    assert g("a", t, CASES["c2"]) == W.NO_EXPECTATION


def test_cli_writes_json_and_markdown(tmp_path):
    trials = tmp_path / "trials"
    trials.mkdir()
    (trials / "B0-r9-c1.json").write_text(json.dumps(trial(outcome="blocked", repeat=9)), encoding="utf-8")
    cases = tmp_path / "cases.json"
    cases.write_text(json.dumps(list(CASES.values())), encoding="utf-8")
    exps = tmp_path / "exps.json"
    exps.write_text(json.dumps({"cases": {"c1": {"kind": "replace_text", "zones": []}}}), encoding="utf-8")
    out = tmp_path / "out"
    assert W.main(["--round", "r9", "--trials", str(trials), "--cases", str(cases), "--expectations", str(exps),
                   "--out", str(out)]) == 0
    data = json.loads((out / "b0-simple-report.json").read_text(encoding="utf-8"))
    assert data["tier"] == "simple" and data["rounds"]["r9"]["tiers"]["blocked"] == 1
    assert (out / "b0-simple-report.md").exists()
