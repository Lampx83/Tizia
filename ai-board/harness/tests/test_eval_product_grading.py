import json

import pytest

from evaluation import product_grading as pg

BASE = "<html><body><p>old</p></body></html>"
GOOD = "<html><body><p>new</p></body></html>"
CASE = {"id": "c1", "split": "dev", "file": "public/a.html", "base_sha": "b" * 40,
        "check": {"mode": "equal"}, "gold": {"edits": [{"search": "<p>old</p>", "replace": "<p>new</p>"}]}}


def trial(outcome="needs_review", gate=5.5, **extra):
    return {"case": "c1", "arm": "B0", "outcome": outcome, "gate_reached": gate, **extra}


def grade(t, files, case=CASE, base=BASE):
    return pg.grade_trial(t, case, base, files)


def test_shipped_candidate_passing_oracle_is_correct_ship():
    g = grade(trial(), {"public/a.html": GOOD})
    assert (g["matrix_cell"], g["resolved"], g["oracle_rc"]) == ("correct_ship", True, 0)
    assert g["mf_outcome"] == "resolved"


def test_shipped_candidate_failing_oracle_is_wrong_ship():
    g = grade(trial(), {"public/a.html": BASE})
    assert (g["matrix_cell"], g["resolved"], g["mf_outcome"]) == ("wrong_ship", False, "wrong_ship")


def test_blocked_candidate_passing_oracle_is_false_block():
    g = grade(trial("blocked", 5), {"public/a.html": GOOD})
    assert (g["matrix_cell"], g["resolved"]) == ("false_block", True)


def test_blocked_candidate_failing_oracle_is_correct_block():
    assert grade(trial("blocked", 4), {"public/a.html": BASE})["matrix_cell"] == "correct_block"


def test_edit_outside_target_fails_oracle_even_when_target_is_right():
    t = trial(candidate_files=["public/a.html", "public/b.html", "test/a.test.js"])
    g = grade(t, {"public/a.html": GOOD})
    assert g["out_of_scope_files"] == ["public/b.html"] and g["matrix_cell"] == "wrong_ship"


def test_blocked_before_gate3_is_not_gradable_and_not_a_failure():
    g = grade(trial("blocked", 1.0), None)
    assert g["matrix_cell"] == "not_gradable" and g["independent_verdict"] == "not_gradable:no_candidate"
    assert g["resolved"] is None and g["oracle_rc"] is None


def test_candidate_expected_but_artifact_missing_is_flagged_separately():
    assert grade(trial("blocked", 5), None)["independent_verdict"] == "not_gradable:no_artifact"
    assert grade(trial(), None)["independent_verdict"] == "not_gradable:no_artifact"


def test_heldout_or_unknown_case_is_never_graded():
    assert grade(trial(), {"public/a.html": GOOD}, case={**CASE, "split": "heldout"})["independent_verdict"] == "not_gradable:no_case"
    assert grade(trial(), {"public/a.html": GOOD}, case=None)["independent_verdict"] == "not_gradable:no_case"


def test_missing_base_for_edit_case_is_not_gradable():
    assert grade(trial(), {"public/a.html": GOOD}, base=None)["independent_verdict"] == "not_gradable:no_base"


def test_new_page_case_needs_no_base():
    page = {**CASE, "check": {"mode": "page", "title": "T", "body": "B", "href": "/x.html"}, "gold": {"code": ""}}
    html = '<html><head><title>T</title></head><body><h1>T</h1><p>B</p><a href="/x.html">x</a></body></html>'
    assert grade(trial(), {"public/a.html": html}, case=page, base=None)["matrix_cell"] == "correct_ship"


def write(folder, stem, rec, artifact=None):
    (folder / f"{stem}.json").write_text(json.dumps(rec), encoding="utf-8")
    if artifact is not None:
        (folder / f"{stem}.candidate.html").write_text(artifact, encoding="utf-8")


@pytest.fixture
def folder(tmp_path):
    write(tmp_path, "B0-r1-c1", trial(), GOOD)
    write(tmp_path, "B0-r2-c1", trial(), BASE)
    write(tmp_path, "B1-r1-c1", {**trial("blocked", 5), "arm": "B1"}, GOOD)
    write(tmp_path, "B1-r2-c1", {**trial("blocked", 1.0), "arm": "B1"})
    write(tmp_path, "mf", {"case": "mf:x", "arm": "B0", "mf_outcome": "resolved"})
    (tmp_path / "B1-r2-c1.candidate.diff").write_text("d", encoding="utf-8")
    return tmp_path


def rows_of(folder):
    return pg.regrade_dir(folder, {"c1": CASE}, lambda case: BASE)


def test_regrade_dir_runs_offline_over_saved_trials_and_skips_multifile(folder):
    rows = rows_of(folder)
    assert sorted(r["trial"] for r in rows) == ["B0-r1-c1", "B0-r2-c1", "B1-r1-c1", "B1-r2-c1"]


def test_report_counts_oracle_resolved_not_board_verdict_per_arm(folder):
    rep = pg.report(rows_of(folder))
    b0, b1 = rep["B0"], rep["B1"]
    assert (b0["oracle_resolved"], b0["correct_ship"], b0["wrong_ship"], b0["false_block"]) == (1, 1, 1, 0)
    assert (b1["oracle_resolved"], b1["false_block"], b1["not_gradable"], b1["gradable"]) == (1, 1, 1, 1)
    assert b1["not_gradable_no_candidate"] == 1 and b1["n"] == 2
    assert b0["wrong_ship_rate"]["k"] == 1 and b0["wrong_ship_rate"]["n"] == 2
    assert b1["false_block_rate"]["n"] == 1


def test_ab_conclusion_requires_a_matrix_with_graded_trials_in_every_arm(folder):
    rep = pg.report(rows_of(folder))
    pg.require_matrix(rep, ["B0", "B1"])
    with pytest.raises(ValueError, match="B2"):
        pg.require_matrix(rep, ["B0", "B2"])
    empty = pg.report([grade(trial("blocked", 1.0), None) | {"arm": "B0"}])
    with pytest.raises(ValueError, match="B0"):
        pg.require_matrix(empty, ["B0"])


def test_write_back_adds_fields_to_trial_and_is_idempotent(folder):
    pg.regrade_dir(folder, {"c1": CASE}, lambda case: BASE, write=True)
    saved = json.loads((folder / "B0-r2-c1.json").read_text(encoding="utf-8"))
    assert saved["mf_outcome"] == "wrong_ship" and saved["resolved"] is False and saved["outcome"] == "needs_review"
    again = pg.regrade_dir(folder, {"c1": CASE}, lambda case: BASE, write=True)
    assert len(again) == 4


def test_load_cases_keeps_dev_only(tmp_path):
    path = tmp_path / "cases.json"
    path.write_text(json.dumps([CASE, {**CASE, "id": "h1", "split": "heldout"}]), encoding="utf-8")
    assert set(pg.load_cases(path)) == {"c1"}
