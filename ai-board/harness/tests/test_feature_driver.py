import pytest

from evaluation import feature, feature_driver
from evaluation.feature_cases import CASES

BY_ID = {c["id"]: c for c in CASES}
BASE = "abc123"


def diff_of(files):
    out = ""
    for path, text in files.items():
        lines = text.splitlines()
        out += f"diff --git a/{path} b/{path}\nnew file mode 100644\n--- /dev/null\n+++ b/{path}\n@@ -0,0 +1,{len(lines)} @@\n"
        out += "".join(f"+{ln}\n" for ln in lines)
    return out


def row_for(case, files, plan=True):
    subtasks = [{"file": s["glob"], "tier": s["tier"], **({"kind": s["kind"]} if s.get("kind") else {})} for s in case["steps"]]
    return {"capture": {"final_plan": {"subtasks": subtasks} if plan else None, "full_diff": diff_of(files)}, "retries": 2}


def test_diff_files_keeps_new_side_lines_and_drops_deleted_files():
    diff = ("diff --git a/a.js b/a.js\nindex 1..2 100644\n--- a/a.js\n+++ b/a.js\n@@ -1,2 +1,2 @@\n keep\n-old\n+new\n"
            "@@ -9,1 +9,2 @@\n tail\n+more\n\\ No newline at end of file\n"
            "diff --git a/gone.js b/gone.js\ndeleted file mode 100644\n--- a/gone.js\n+++ /dev/null\n@@ -1 +0,0 @@\n-x\n")
    assert feature_driver.diff_files(diff) == {"a.js": "keep\nnew\ntail\nmore\n"}


def test_run_builds_dev_task_on_base_and_returns_record_from_trial_row(monkeypatch):
    monkeypatch.setenv(feature_driver.BASE_ENV, BASE)
    case = BY_ID["ft-it-page-1"]
    seen = {}

    def runner(task):
        seen.update(task)
        return row_for(case, case["sample"])

    rec = feature_driver.run(case, 1, runner=runner)
    assert seen["base_sha"] == BASE and seen["split"] == "dev" and seen["detail"] == case["request"]
    assert rec["resumes"] == 2 and set(rec["files"]) == set(case["sample"])
    assert feature.score(case, rec)["rubric"] == 3


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
