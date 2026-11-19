import json

from evaluation.pipeline import oracle_agreement as oa

THR = {"min_labels": 4, "min_catch_wrong": 0.9, "min_accept_right": 0.9}


def r(case, crit, observed):
    return {"trial": case, "case": case, "criterion": crit, "observed": observed,
            "match": "not_gradable" if observed is None else True}


def fixture(n_groups=10):
    """Per group: one owner-pass accepted, one owner-fail rejected (perfect check)."""
    labels, groups, rows = {}, {}, []
    for g in range(n_groups):
        for kind, owner, obs in (("p", "pass", True), ("f", "fail", False)):
            c = f"g{g}{kind}"
            labels[c], groups[c] = owner, g
            rows.append(r(c, "matches_intent", obs))
    return labels, groups, rows


def test_rates_and_bootstrap_by_group_perfect_check_validated():
    labels, groups, rows = fixture()
    s = oa.evaluate(rows, labels, groups, THR)["matches_intent"]
    assert (s["n_labels"], s["n_fail"], s["n_pass"]) == (20, 10, 10)
    assert s["catch_wrong"] == 1.0 and s["accept_right"] == 1.0
    assert s["catch_wrong_ci"] == (1.0, 1.0) and s["accept_right_ci"] == (1.0, 1.0)
    assert s["status"] == "validated"


def test_rates_known_values_and_interval_is_deterministic():
    labels, groups, rows = fixture()
    for c in ("g0f", "g1f"):  # check wrongly accepts 2 of 10 wrong diffs
        next(x for x in rows if x["case"] == c)["observed"] = True
    s = oa.evaluate(rows, labels, groups, THR)["matches_intent"]
    assert s["catch_wrong"] == 0.8 and s["accept_right"] == 1.0
    lo, hi = s["catch_wrong_ci"]
    assert lo < 0.8 < hi <= 1.0
    assert oa.evaluate(rows, labels, groups, THR)["matches_intent"]["catch_wrong_ci"] == (lo, hi)


def test_rows_of_one_group_resampled_as_a_unit():
    labels, groups = {"a": "fail", "b": "fail", "c": "pass"}, {"a": 0, "b": 0, "c": 1}
    rows = [r("a", "matches_intent", True), r("b", "matches_intent", True), r("c", "matches_intent", True)]
    s = oa.evaluate(rows, labels, groups, THR)["matches_intent"]
    assert s["catch_wrong"] == 0.0 and s["catch_wrong_ci"] == (0.0, 0.0)


def test_below_threshold_criterion_stays_advisory_even_if_point_estimate_passes():
    labels, groups, rows = fixture()
    next(x for x in rows if x["case"] == "g0f")["observed"] = True  # point 0.9, lower bound < 0.9
    s = oa.evaluate(rows, labels, groups, THR)["matches_intent"]
    assert s["catch_wrong"] == 0.9 and s["status"] == "advisory"


def test_too_few_labels_is_advisory():
    labels, groups, rows = fixture(1)
    assert oa.evaluate(rows, labels, groups, {**THR, "min_labels": 100})["matches_intent"]["status"] == "advisory"


def test_missing_class_gives_none_rate_and_advisory():
    labels, groups, rows = fixture()
    rows = [x for x in rows if labels[x["case"]] == "pass"]
    s = oa.evaluate(rows, labels, groups, THR)["matches_intent"]
    assert s["catch_wrong"] is None and s["status"] == "advisory"


def test_not_gradable_unlabelled_and_skip_rows_ignored():
    labels, groups, rows = fixture()
    rows += [r("g0p", "matches_intent", None), r("unlabelled", "matches_intent", False)]
    labels["skipped"] = "skip"
    rows.append(r("skipped", "matches_intent", True))
    assert oa.evaluate(rows, labels, groups, THR)["matches_intent"]["n_labels"] == 20


def test_draft_labels_never_used_as_truth(tmp_path):
    p = tmp_path / "labels.json"
    p.write_text(json.dumps([
        {"case_id": "a", "label": "pass", "label_source": "owner"},
        {"case_id": "b", "label": "fail", "label_source": "claude-draft"},
        {"case_id": "c", "label": "fail"},
        {"case_id": "d", "label": "maybe", "label_source": "owner"},
    ]), encoding="utf-8")
    assert oa.load_owner_labels(p) == {"a": "pass"}
    d = tmp_path / "draft.jsonl"
    d.write_text(json.dumps({"case_id": "z", "draft_label": "fail", "label_source": "claude-draft", "dup_group": 3}) + "\n",
                 encoding="utf-8")
    assert oa.load_owner_labels(d) == {}
    assert oa.load_groups(d) == {"z": 3}


def test_only_soft_criteria_reported():
    labels, groups, rows = fixture()
    rows += [r("g0p", "scope_ok", True), r("g0p", "vision_advisory", True)]
    assert set(oa.evaluate(rows, labels, groups, THR)) == {"matches_intent", "vision_advisory"}


def test_cli_without_owner_labels_reports_zero_and_exits_nonzero(tmp_path, capsys):
    rc = oa.main(["--labels", str(tmp_path / "nope.json"), "--grades", str(tmp_path / "g.jsonl")])
    assert rc == 2
    assert "0 owner labels" in capsys.readouterr().out


def test_report_lists_status_and_intervals():
    labels, groups, rows = fixture()
    md = oa.render(oa.evaluate(rows, labels, groups, THR), THR)
    assert "matches_intent" in md and "validated" in md and "[1.00, 1.00]" in md
