import json

import pytest

from evaluation.pipeline import judge_agreement as ja
from evaluation.suite import grading

THR = {"min_tpr": 0.8, "min_tnr": 0.8, "min_n": 3}


def L(trial, label, split="test", source="owner", case=None):
    return {"trial": trial, "case": case or trial, "label": label, "split": split, "source": source}


def V(ev, key, verdict):
    return {"evaluator": ev, "trial": key, "verdict": verdict}


def balanced(n, ev="j", source="owner"):
    items, rows = [], []
    for i in range(n):
        items += [L(f"p{i}", "pass", source=source), L(f"f{i}", "fail", source=source)]
        rows += [V(ev, f"p{i}", "pass"), V(ev, f"f{i}", "fail")]
    return items, rows


def stat(res, ev="j", src="combined"):
    return res["evaluators"][ev]["by_source"][src]


def test_tpr_tnr_test_split_only():
    items = [L("a", "pass"), L("b", "pass"), L("c", "fail"), L("d", "fail"), L("e", "fail", "dev"), L("f", "pass", "train")]
    rows = [V("j", "a", "pass"), V("j", "b", "fail"), V("j", "c", "fail"), V("j", "d", "fail"), V("j", "e", "pass"), V("j", "f", "fail")]
    s = stat(ja.evaluate(items, rows))
    assert (s["n_pass"], s["n_fail"], s["tpr"], s["tnr"]) == (2, 2, 0.5, 1.0)


def test_sources_reported_separately_and_combined():
    items = [L("a", "pass"), L("b", "fail"), L("c", "pass", source="ai_owner_approved"), L("d", "fail", source="ai_owner_approved")]
    rows = [V("j", "a", "pass"), V("j", "b", "fail"), V("j", "c", "fail"), V("j", "d", "fail")]
    res = ja.evaluate(items, rows)
    assert stat(res, src="owner")["tpr"] == 1.0
    assert stat(res, src="ai_owner_approved")["tpr"] == 0.0
    assert stat(res, src="combined")["tpr"] == 0.5


def test_case_fallback_only_when_evaluator_has_no_trial_keys():
    items = [L("t1", "pass", case="c1"), L("t2", "fail", case="c2")]
    case_only = [{"evaluator": "j", "case": "c1", "verdict": "pass"}, {"evaluator": "j", "case": "c2", "verdict": "fail"}]
    s = stat(ja.evaluate(items, case_only))
    assert s["tpr"] == 1.0 and s["tnr"] == 1.0 and s["missing"] == 0
    mixed = [{"evaluator": "j", "case": "c1", "verdict": "pass"}, V("j", "t2", "fail")]
    assert stat(ja.evaluate(items, mixed))["missing"] == 1


def test_missing_verdicts_block_usable():
    items, rows = balanced(5)
    s = stat(ja.evaluate(items, rows[:2], THR))
    assert s["missing"] == 8 and s["status"] == "reference" and "missing" in s["reason"]


def test_min_n_and_bootstrap_lower_bound():
    items, rows = balanced(2)
    assert stat(ja.evaluate(items, rows, THR))["status"] == "reference"
    items, rows = balanced(10)
    assert stat(ja.evaluate(items, rows, THR))["status"] == "usable"
    for i in range(3):
        rows[2 * i] = V("j", f"p{i}", "fail")
    assert stat(ja.evaluate(items, rows, {**THR, "min_tpr": 0.7}))["status"] == "reference"


def test_one_class_says_why_and_no_threshold_is_reference():
    items = [L("a", "pass"), L("b", "pass")]
    s = stat(ja.evaluate(items, [V("j", "a", "pass"), V("j", "b", "pass")], THR))
    assert s["tnr"] is None and s["status"] == "reference" and "fail" in s["reason"]
    items, rows = balanced(10)
    assert stat(ja.evaluate(items, rows))["status"] == "reference"


def test_every_evaluator_listed_with_invalid_counts():
    items, _ = balanced(1)
    rows = [V("bad", "p0", "maybe"), {"trial": "p0", "verdict": "pass"}, V("ok", "p0", "PASS ")]
    res = ja.evaluate(items, rows)["evaluators"]
    assert res["bad"]["n_invalid"] == 1 and res["bad"]["n_valid"] == 0
    assert res["(no evaluator)"]["n_invalid"] == 1
    assert res["ok"]["n_valid"] == 1


def test_conflicting_verdicts_reported_and_not_counted():
    items = [L("a", "pass"), L("b", "fail")]
    rows = [V("j", "a", "pass"), V("j", "a", "fail"), V("j", "b", "fail")]
    res = ja.evaluate(items, rows)
    assert res["evaluators"]["j"]["conflicts"] == 1
    assert stat(res)["missing"] == 1


def test_binary_normalises_and_maps_judge_vocab():
    b = grading.binary
    assert [b(x) for x in ("Pass", " PASS ", "equivalent", "different", "partial", True, False, "maybe", None)] == \
        ["pass", "pass", "pass", "fail", "fail", "pass", "fail", None, None]


def test_load_labels_owner_ai_split_by_case_and_conflicts(tmp_path):
    owner = tmp_path / "o.jsonl"
    owner.write_text("\n".join(json.dumps(r) for r in [
        {"trial": "t1", "case": "c1", "label": "fail", "labeller": "owner"},
        {"trial": "t2", "case": "c9", "label": "pass", "labeller": "owner"},
        {"trial": "t3", "case": "c3", "label": "pass", "labeller": "owner"},
        {"trial": "t3", "case": "c3", "label": "fail", "labeller": "owner"},
        {"trial": "t4", "case": "c4", "label": "pass", "labeller": "ai"}]), encoding="utf-8")
    ai = tmp_path / "a.json"
    ai.write_text(json.dumps([
        {"trial": "t5", "case": "c1", "label": "fail", "split": "dev", "labeller": "ai", "approved_by": "owner-bulk"},
        {"trial": "t1", "case": "c1", "label": "fail", "split": "dev", "labeller": "ai", "approved_by": "owner-bulk"}]), encoding="utf-8")
    items, report = ja.load_labels([owner, ai])
    by = {i["trial"]: i for i in items}
    assert by["t1"]["source"] == "owner" and by["t1"]["split"] == "dev"
    assert by["t5"]["source"] == "ai_owner_approved" and by["t5"]["split"] == "dev"
    assert by["t2"]["split"] == ja.split_for("c9")
    assert "t3" not in by and "t4" not in by
    assert report["label_conflicts"] == ["t3"] and report["skipped_unapproved"] == 1


def test_split_is_deterministic_per_case():
    assert ja.split_for("case-x") == ja.split_for("case-x") and ja.split_for("case-x") in ("train", "dev", "test")


def test_main_reads_multiple_files_and_writes_report(tmp_path):
    lp, vp, out = tmp_path / "l.jsonl", tmp_path / "v.jsonl", tmp_path / "r.md"
    lp.write_text("\n".join(json.dumps({"trial": t, "case": t, "label": lab, "split": "test", "labeller": "owner"})
                            for t, lab in (("a", "pass"), ("b", "fail"))), encoding="utf-8")
    vp.write_text("\n".join(json.dumps(x) for x in [V("oracle_pack", "a", "pass"), V("oracle_pack", "b", "fail")]), encoding="utf-8")
    assert ja.main(["--labels", str(lp), "--verdicts", str(vp), "--out", str(out)]) == 0
    assert "oracle_pack" in out.read_text(encoding="utf-8")


def test_main_no_labels_exit_2_and_single_threshold_rejected(tmp_path):
    assert ja.main(["--labels", str(tmp_path / "none"), "--verdicts", str(tmp_path / "v"), "--out", str(tmp_path / "o")]) == 2
    with pytest.raises(SystemExit):
        ja.main(["--min-tpr", "0.9"])


def _w(path, rows):
    path.write_text(chr(10).join(json.dumps(r) for r in rows), encoding="utf-8")
    return path


def test_exporters_key_by_run_id_mode_repeat(tmp_path):
    res = _w(tmp_path / "results.jsonl", [{"id": "t1", "mode": "e2e", "repeat": 1, "resolved": True},
                                           {"id": "t1", "mode": "e2e", "repeat": 2, "resolved": False},
                                           {"id": "t2", "mode": "e2e", "repeat": 1}])
    out = ja.export_results("oracle_pack", res)
    assert [(r["trial"], r["verdict"]) for r in out] == [("t1/e2e/1", "pass"), ("t1/e2e/2", "fail"), ("t2/e2e/1", None)]
    grades = _w(tmp_path / "g.json", [{"blind_id": "g1", "verdict": "partial"}, {"blind_id": "g2", "verdict": "pass"}])
    bmap = tmp_path / "m.json"
    bmap.write_text(json.dumps({"g1": {"run": "A", "id": "t1", "mode": "e2e", "repeat": 1}, "g2": {"run": "B", "id": "t1", "mode": "e2e", "repeat": 1}}), encoding="utf-8")
    out = ja.export_grades("blind", grades, bmap)
    assert {(r["evaluator"], r["trial"]) for r in out} == {("blind:A", "t1/e2e/1"), ("blind:B", "t1/e2e/1")}
    judge = _w(tmp_path / "judge.jsonl", [{"case": "t1", "repeat": 1, "verdict": "equivalent"}, {"case": "t1", "repeat": 2}])
    out = ja.export_judge("gemma", judge)
    assert [(r["trial"], r["verdict"]) for r in out] == [("t1/1", "equivalent"), ("t1/2", None)]
    assert all(ja.evaluate([L("t1/1", "pass", case="t1")], out)["evaluators"]["gemma"]["conflicts"] == 0 for _ in [0])


def test_read_accepts_rows_object_and_rejects_other_objects(tmp_path):
    p = tmp_path / "x.json"
    p.write_text(json.dumps({"rows": [{"id": "t1", "resolved": True}], "meta": 1}), encoding="utf-8")
    assert ja.export_results("o", p)[0]["verdict"] == "pass"
    p.write_text(json.dumps({"summary": 1, "n": 2}, indent=1), encoding="utf-8")
    with pytest.raises(ValueError, match="unsupported"):
        ja.export_results("o", p)


def test_export_criteria_one_row_per_criterion_trial(tmp_path):
    p = _w(tmp_path / "c.jsonl", [{"trial": "t1", "case": "c1", "criterion": "ship_after_gates", "observed": True},
                                   {"trial": "t1", "case": "c1", "criterion": "scope_ok", "observed": None},
                                   {"case": "c1", "criterion": "scope_ok", "observed": True}])
    out = ja.export_criteria(p)
    assert out == [{"evaluator": "ship_after_gates", "trial": "t1", "case": "c1", "verdict": True},
                   {"evaluator": "scope_ok", "trial": "t1", "case": "c1", "verdict": None}]


def test_export_appends_never_overwrites(tmp_path):
    vp = tmp_path / "v.jsonl"
    vp.write_text(json.dumps(V("old", "a", "pass")), encoding="utf-8")
    res = _w(tmp_path / "r.jsonl", [{"id": "t1", "resolved": True}])
    assert ja.main(["--verdicts", str(vp), "--export-results", "new", str(res)]) == 0
    lines = vp.read_text(encoding="utf-8").splitlines()
    assert len(lines) == 2 and json.loads(lines[0])["evaluator"] == "old"


def test_report_states_missing_blocks_usable(tmp_path):
    items, rows = balanced(1)
    assert "Any missing" in ja.render(ja.evaluate(items, rows), ja.load_labels([])[1])
