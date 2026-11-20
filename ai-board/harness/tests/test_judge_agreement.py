import json

from evaluation.pipeline import judge_agreement as ja


def labels(spec):
    return [{"case_id": c, "label": lab, "split": sp, "label_source": "owner"} for c, lab, sp in spec]


def v(ev, case, verdict):
    return {"evaluator": ev, "case_id": case, "verdict": verdict}


def test_tpr_tnr_use_test_split_only():
    lab = labels([("a", "pass", "test"), ("b", "pass", "test"), ("c", "fail", "test"), ("d", "fail", "test"),
                  ("e", "fail", "dev"), ("f", "pass", "train")])
    rows = [v("j", "a", "pass"), v("j", "b", "fail"), v("j", "c", "fail"), v("j", "d", "fail"),
            v("j", "e", "pass"), v("j", "f", "fail")]
    s = ja.evaluate(lab, rows)["j"]
    assert (s["n_pass"], s["n_fail"]) == (2, 2)
    assert s["tpr"] == 0.5 and s["tnr"] == 1.0


def test_non_owner_labels_ignored_and_missing_verdicts_counted():
    lab = labels([("a", "pass", "test")]) + [{"case_id": "x", "label": "fail", "split": "test", "label_source": "draft"}]
    s = ja.evaluate(lab, [v("j", "x", "fail")])["j"]
    assert s["n_pass"] == 0 and s["n_fail"] == 0 and s["missing"] == 1


def test_legacy_verdicts_binarised_partial_is_fail():
    lab = labels([("a", "pass", "test"), ("b", "fail", "test")])
    s = ja.evaluate(lab, [v("j", "a", "partial"), v("j", "b", "wrong")])["j"]
    assert s["tpr"] == 0.0 and s["tnr"] == 1.0


def test_status_reference_without_threshold_or_below_it():
    lab = labels([("a", "pass", "test"), ("b", "fail", "test")])
    rows = [v("j", "a", "pass"), v("j", "b", "fail")]
    assert ja.evaluate(lab, rows)["j"]["status"] == "reference"
    assert ja.evaluate(lab, rows, {"min_tpr": 0.9, "min_tnr": 0.9})["j"]["status"] == "usable"
    bad = [v("j", "a", "fail"), v("j", "b", "fail")]
    assert ja.evaluate(lab, bad, {"min_tpr": 0.9, "min_tnr": 0.9})["j"]["status"] == "reference"


def test_main_reads_files_and_reports(tmp_path, capsys):
    lp, vp, out = tmp_path / "l.json", tmp_path / "v.jsonl", tmp_path / "r.md"
    lp.write_text(json.dumps(labels([("a", "pass", "test"), ("b", "fail", "test")])), encoding="utf-8")
    vp.write_text("\n".join(json.dumps(x) for x in [v("oracle_pack", "a", "pass"), v("oracle_pack", "b", "fail")]), encoding="utf-8")
    assert ja.main(["--labels", str(lp), "--verdicts", str(vp), "--out", str(out)]) == 0
    assert "oracle_pack" in out.read_text(encoding="utf-8")


def test_main_no_labels_exits_2(tmp_path):
    assert ja.main(["--labels", str(tmp_path / "none.json"), "--verdicts", str(tmp_path / "v"), "--out", str(tmp_path / "o")]) == 2
