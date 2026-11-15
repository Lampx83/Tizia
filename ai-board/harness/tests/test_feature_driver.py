import pytest

from evaluation import feature, feature_driver
from evaluation.feature_cases import CASES

BY_ID = {c["id"]: c for c in CASES}
BASE = "abc123"


def diff_of(files):
    out = ""
    for path, text in files.items():
        lines = text.splitlines()
        out += f"--- a/{path}\n+++ b/{path}\n@@ -0,0 +1,{len(lines)} @@\n"
        out += "".join(f"+{ln}\n" for ln in lines)
    return out


def row_for(case, files, plan=True):
    subtasks = [{"file": s["glob"], "title": s["glob"], "verify": "node --test", "size": "small"} for s in case["steps"] if s.get("kind") != "data"]
    return {"capture": {"final_plan": {"subtasks": subtasks} if plan else None, "full_diff": diff_of(files)}, "retries": 2}


def test_diff_files_reads_difflib_rows_new_side_only():
    diff = ("--- a/a.js\n+++ b/a.js\n@@ -1,2 +1,2 @@\n keep\n-old\n+new\n"
            "@@ -9,1 +9,2 @@\n tail\n+more\n\\ No newline at end of file\n"
            "--- a/new.js\n+++ b/new.js\n@@ -0,0 +1 @@\n+fresh\n")
    assert feature_driver.diff_files(diff) == {"a.js": "keep\nnew\ntail\nmore\n", "new.js": "fresh\n"}


def test_diff_files_of_real_implement_unified_output():
    from gates import implement
    text = implement._unified("", "<html>\n</html>", "public/x.html")
    assert feature_driver.diff_files(text) == {"public/x.html": "<html>\n</html>\n"}


def test_run_builds_dev_task_on_base_and_returns_record_from_trial_row(monkeypatch):
    monkeypatch.setenv(feature_driver.BASE_ENV, BASE)
    case = BY_ID["ft-it-page-1"]
    seen = {}

    def runner(task):
        seen.update(task)
        return row_for(case, case["sample"])

    rec = feature_driver.run(case, 1, runner=runner)
    assert seen["base_sha"] == BASE and seen["split"] == "dev" and seen["detail"] == case["request"]
    assert seen["file"] == case["steps"][0]["glob"] and seen["gold"] == {} and seen["check"] == {"mode": "feature"}
    assert rec["resumes"] == 0 and set(rec["files"]) == set(case["sample"])
    assert feature.score(case, rec)["rubric"] == 3


def test_tier_is_derived_from_path_so_model_plan_without_tier_can_pass():
    case = BY_ID["ft-backend-1"]
    rec = feature_driver.record_of(row_for(case, case["sample"]))
    assert [s["tier"] for s in rec["plan"]["steps"]] == ["low", "high", "high"]
    assert feature.plan_ok(case, rec)


def test_data_step_is_handed_not_written(monkeypatch):
    case = BY_ID["ft-building-1"]
    row = row_for(case, case["sample"])
    row["capture"]["final_plan"]["subtasks"].append({"file": "campus_layouts", "kind": "data", "title": "t", "verify": "x", "size": "small"})
    assert feature_driver.record_of(row)["handed"] == ["data"]


@pytest.mark.slow
def test_feature_case_runs_end_to_end_through_real_run_trial(tmp_path, monkeypatch):
    import dataclasses
    import json
    import re
    import subprocess

    from evaluation.suite import trial
    from runtime.pipeline import ROOT, Deps
    from test_eval_suite import FILLER

    case = BY_ID["ft-backend-1"]  # all-new files: gate 3 may only write whole new files, not edit existing ones
    keys = {f"ftbk{i:02d}x": step["glob"] for i, step in enumerate(case["steps"])}
    plan = {"summary_vi": "Thêm trang.", "capabilities": [], "acceptance": ["node --test"],
            "subtasks": [{"title": f"[{key}] {path}", "file": path, "verify": "node --test", "size": "small"}
                         for key, path in keys.items()]}

    @dataclasses.dataclass
    class FeatureModels:
        gate1_model: str = "fake"
        gate3_model: str = "fake"
        gate3_model_light: str = "fake"

        def generate(self, model, prompt, **kw):
            if "summary_vi" in prompt and "capabilities" in prompt:
                return {"response": json.dumps(plan, ensure_ascii=False), "prompt_eval_count": 500, "eval_count": 100}
            key = re.search(r"\[(\w{6,})\]", prompt).group(1)
            body = {"code": case["sample"][keys[key]]}
            test = FILLER["test"] + f"// {keys[key]}\n"  # gate 3 requires the test to name the in-scope file
            return {"response": json.dumps({**body, **FILLER, "test": test}, ensure_ascii=False), "prompt_eval_count": 120, "eval_count": 80}

    monkeypatch.setattr(trial.plan_validate, "run", lambda *a, **k: {"gate": 2.5, "blocked": False, "reason": None})
    base_sha = subprocess.run(["git", "rev-parse", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    monkeypatch.setenv(feature_driver.BASE_ENV, base_sha)
    deps = Deps(models=FeatureModels(), notify=None, sleep=lambda _s: None)

    rows = []

    def runner(task):
        rows.append(trial.run_trial(task, "e2e", deps, tmp_path, ROOT, wall_s=600))
        return rows[-1]

    rec = feature_driver.run(case, 1, runner=runner)
    assert rows[0]["gate_passed"], rows[0]["reason"]
    assert set(case["sample"]) <= set(rec["files"])
    row = feature.score(case, rec)
    assert row["plan_ok"] and row["accepted"] and row["rubric"] == 3 and row["resumes"] == 0


def test_missing_base_sha_fails_before_any_trial(monkeypatch):
    monkeypatch.delenv(feature_driver.BASE_ENV, raising=False)
    with pytest.raises(RuntimeError, match="base"):
        feature_driver.run(BY_ID["ft-it-page-1"], 1, runner=lambda task: pytest.fail("trial must not start"))


def test_no_plan_scores_rubric_zero():
    case = BY_ID["ft-it-page-1"]
    rec = feature_driver.record_of(row_for(case, {}, plan=False))
    assert rec["plan"] is None and feature.rubric(case, rec) == 0


def test_clarify_flag_reaches_record():
    row = row_for(BY_ID["ft-bogus-1"], {})
    row["capture"]["final_plan"]["clarify"] = True
    assert feature_driver.record_of(row)["plan"]["clarify"] is True
