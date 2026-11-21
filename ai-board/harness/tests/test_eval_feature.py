"""Feature tier: acceptance scripts, rubric 0-3, metrics, offline CLI, old tiers' baseline untouched. No model, no network."""
import json
from pathlib import Path

from evaluation import eval_run
from evaluation import feature
from evaluation.feature_cases import CASES

BY_ID = {c["id"]: c for c in CASES}


def perfect(case):
    steps = [{"path": s["glob"], "tier": s["tier"], **({"kind": s["kind"]} if s.get("kind") else {})}
             for s in case["steps"]]
    plan = {"steps": steps, **({"clarify": True} if case.get("clarify") else {})}
    return {"plan": plan, "files": dict(case["sample"]), "handed": case.get("handed", []), "resumes": 0}


def test_corpus_shape_and_dev_only():
    assert 10 <= len(CASES) <= 15 and len({c["id"] for c in CASES}) == len(CASES)
    assert {c["size"] for c in CASES} >= {"small", "medium", "large", "xlarge"}
    assert any(c.get("clarify") for c in CASES) and any(c.get("handed") for c in CASES)
    assert "heldout" not in json.dumps(CASES)


def test_acceptance_passes_on_sample_and_fails_on_empty_or_partial():
    for case in CASES:
        assert feature.accepted(case, perfect(case)), case["id"]
        if case["checks"] and not case.get("clarify"):
            assert not feature.accepted(case, {"plan": None, "files": {}, "handed": []}), case["id"]
    building = BY_ID["ft-building-1"]
    missing_layout = perfect(building)
    del missing_layout["files"]["public/campus-proto/b-iso-canvas.html"]
    assert not feature.accepted(building, missing_layout)
    not_handed = {**perfect(building), "handed": []}
    assert not feature.accepted(building, not_handed)  # data step must go to admin


def test_cross_file_contract_and_rename():
    link = BY_ID["ft-xfile-1"]
    good = perfect(link)
    assert feature.accepted(link, good)
    module = "public/js/features/duration.js"
    no_export = {**good, "files": {**good["files"], module: "export function other(){}\n"}}
    assert not feature.accepted(link, no_export)
    page = "public/luyen-de.html"
    disconnected = {**good, "files": {**good["files"], page: "<html></html>"}}
    assert not feature.accepted(link, disconnected)

    rename = BY_ID["ft-xfile-2"]
    good = perfect(rename)
    assert feature.accepted(rename, good)
    old = {**good, "files": {**good["files"], "public/the-hoat-chat.html":
                             good["files"]["public/the-hoat-chat.html"].replace("shuffleCards", "mixCards")}}
    assert not feature.accepted(rename, old)


def test_hallucinated_target_must_be_questioned_not_written():
    case = BY_ID["ft-bogus-1"]
    assert feature.rubric(case, perfect(case)) == 3
    wrote = {"plan": {"steps": [{"path": case["forbid"][0], "tier": "low"}]}, "files": {case["forbid"][0]: "x"}, "handed": []}
    assert not feature.accepted(case, wrote) and not feature.plan_ok(case, wrote) and feature.rubric(case, wrote) == 0


def test_rubric_levels():
    case = BY_ID["ft-layout-1"]
    assert feature.rubric(case, {"plan": None, "files": {}}) == 0
    good = perfect(case)
    assert feature.rubric(case, {**good, "files": {}}) == 1
    wrong_tier = {**good, "plan": {"steps": [{**s, "tier": "critical"} for s in good["plan"]["steps"]]}, "files": {}}
    assert feature.rubric(case, wrong_tier) == 0
    one_file = {**good, "files": {"public/thu-vien-so.html": "<html>"}}
    assert feature.rubric(case, one_file) == 2
    assert feature.rubric(case, good) == 3


def test_metrics_acceptance_rate_and_resumes_per_rubric():
    cases = [BY_ID["ft-layout-1"], BY_ID["ft-layout-2"], BY_ID["ft-it-page-1"]]
    recs = {"ft-layout-1": {**perfect(cases[0]), "resumes": 2}, "ft-layout-2": {"plan": None, "files": {}, "resumes": 4},
            "ft-it-page-1": {**perfect(cases[2]), "files": {"public/lich-su-may-tinh.html": "x"}, "resumes": 1}}
    rows = feature.run(lambda c, r: recs[c["id"]], cases=cases)
    rep = feature.build_report({"source": "t", "model": "m", "pins": {}}, rows)
    assert rep["overall"]["accepted"] == 1 and rep["overall"]["rate"] == 33.3 and rep["overall"]["mean_resumes"] == 2.33
    assert rep["rubric_counts"] == {"3": 1, "0": 1, "2": 1}
    assert rep["by_rubric"]["3"]["mean_resumes"] == 2.0 and rep["by_rubric"]["0"]["mean_resumes"] == 4.0
    assert rep["by_rubric"]["1"]["trials"] == 0 and rep["by_rubric"]["1"]["mean_resumes"] is None
    assert "đạt acceptance 1/3" in feature.render({**rep, "overall": rep["overall"]})


def test_cli_offline_with_recorded_records_writes_report_with_pins(tmp_path, capsys):
    rec = tmp_path / "rec.jsonl"
    rec.write_text("".join(json.dumps({"case": c["id"], "record": perfect(c)}) + "\n" for c in CASES), encoding="utf-8")
    assert eval_run.main(["feature", "--records", str(rec), "--root", str(tmp_path), "--label", "t", "--repeats", "2"]) == 0
    rep = json.loads((tmp_path / "feature" / "t" / "report.json").read_text(encoding="utf-8"))
    assert rep["trials"] == 2 * len(CASES) and rep["overall"]["rate"] == 100.0 and rep["tier"] == "feature"
    assert {"prompt_lock", "skill_lock", "contract_hash", "tool_manifest", "corpus_sha", "model_digest"} <= set(rep["pins"])
    assert "[FEATURE TIER | recorded]" in capsys.readouterr().out


def test_cli_needs_exactly_one_source(tmp_path):
    assert eval_run.main(["feature", "--root", str(tmp_path)]) == 2


def test_old_tier_baseline_still_valid_and_loaded():
    base = json.loads((Path(__file__).resolve().parent.parent / "evaluation" / "strata-baseline.json").read_text(encoding="utf-8"))
    assert "_config" in base and not any(k.startswith("feature") for k in base)
    assert eval_run.group_stats([{"oracle": True}, {"oracle": False}])["rate"] == 50.0


def tuning_file(tmp_path, cases):
    path = tmp_path / "tuning.json"
    path.write_text(json.dumps({"set": "tuning", "cases": cases}), encoding="utf-8")
    return path


def test_cli_case_selects_one_default_case(tmp_path):
    rec = tmp_path / "rec.jsonl"
    rec.write_text("".join(json.dumps({"case": c["id"], "record": perfect(c)}) + "\n" for c in CASES), encoding="utf-8")
    assert eval_run.main(["feature", "--records", str(rec), "--root", str(tmp_path), "--label", "one", "--case", CASES[0]["id"]]) == 0
    assert json.loads((tmp_path / "feature" / "one" / "report.json").read_text(encoding="utf-8"))["trials"] == 1
    assert eval_run.main(["feature", "--records", str(rec), "--root", str(tmp_path), "--case", "nope"]) == 2


def test_cli_cases_file_selects_case_and_grades_by_expectation(tmp_path):
    a = {"id": "x-a", "request": "r", "files": [{"path": "public/new.html", "new": {"must": ["hi"], "forbid": []}}],
         "browser": [{"primitive": "text_present", "path": "/new.html", "text": "hi"}], "fix": [], "must_state": []}
    path = tuning_file(tmp_path, [a, {**a, "id": "x-b"}])
    diff = "--- a/public/new.html\n+++ b/public/new.html\n@@ -0,0 +1,1 @@\n+<p>hi</p>\n"
    rec = tmp_path / "rec.jsonl"
    rec.write_text(json.dumps({"case": "x-b", "record": {"diff": diff, "criteria": {"acceptance": ["/new.html hi"], "checks": a["browser"]}}}) + "\n", encoding="utf-8")
    args = ["feature", "--records", str(rec), "--root", str(tmp_path), "--cases-file", str(path)]
    assert eval_run.main([*args, "--label", "b", "--case", "x-b"]) == 0
    rep = json.loads((tmp_path / "feature" / "b" / "report.json").read_text(encoding="utf-8"))
    assert rep["trials"] == 1 and rep["overall"]["accepted"] == 1
    assert eval_run.main([*args, "--label", "all"]) == 0
    assert json.loads((tmp_path / "feature" / "all" / "report.json").read_text(encoding="utf-8"))["overall"]["accepted"] == 1
    assert eval_run.main([*args, "--case", "zzz"]) == 2


def test_cli_oracle_infra_error_exit_3(tmp_path, monkeypatch):
    case = {"id": "x-o", "request": "r", "files": [], "browser": [], "fix": [], "must_state": [], "oracle_files": [], "oracle_cmd": "node t.js"}
    path = tuning_file(tmp_path, [case])
    rec = tmp_path / "rec.jsonl"
    rec.write_text("", encoding="utf-8")
    empty = tmp_path / "empty"
    empty.mkdir()
    monkeypatch.setenv("AI_BOARD_EVAL_NODE_MODULES", str(empty))
    assert eval_run.main(["feature", "--records", str(rec), "--root", str(tmp_path), "--cases-file", str(path)]) == 3
