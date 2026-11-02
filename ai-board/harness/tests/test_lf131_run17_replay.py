"""Offline replay of run 108 (request 17) gate 2.5: the validator objected from FEATURE BRIEF, not from REPO DATA."""
import json
from pathlib import Path

from gates import evidence, plan_validate as pv

FIXTURE = json.loads((Path(__file__).parent / "fixtures" / "lf131_run17_feature_brief.json").read_text(encoding="utf-8"))
PLAN = FIXTURE["plan"]
FILES = {path: "" for path in FIXTURE["repo_data"]}
NEW_FILES = [task["file"] for task in PLAN["subtasks"] if task["file"] not in FILES]


def _validation():
    return pv.parse_validation(json.dumps(FIXTURE["validator_response"], ensure_ascii=False))


def test_brief_quote_is_not_repo_data_so_the_objection_is_unverifiable():
    validation = _validation()
    assert validation["grounded"] is False and validation["grounding"] == []
    assert validation["objection"]["evidence"][0]["file"] == "FEATURE BRIEF"
    assert evidence.verified(validation["objection"], FILES) == []


def test_unverifiable_objection_is_advisory_and_does_not_block_the_plan():
    note = pv.objection_advisory(_validation(), FILES)
    assert note and "cổng 2.5 không chặn" in note
    validation = _validation()
    asserted = bool(validation["grounded"]) or bool(validation["objection"]) and not evidence.verified(
        validation["objection"], FILES)
    assert asserted is True  # no verified record: the objection states no provable fault
    filled = pv.filled_grounding(validation, PLAN, FILES, asserted)
    checked = pv.checked_grounding({**validation, "grounded": True, "grounding": filled}, PLAN, FIXTURE["sha"], FILES)
    assert len(checked["evidence"]) == len(PLAN["subtasks"])
    existing = [task["file"] for task in PLAN["subtasks"] if task["file"] in FILES]
    assert {record["file"] for record in filled if record.get("unverified")} == set(existing)
    by_file = {item["file"]: item for item in checked["evidence"]}
    for path in existing:
        assert by_file[path]["quote"] == "" and by_file[path]["before"] == "chưa xác minh bằng trích dẫn"
    for path in NEW_FILES:
        assert by_file[path]["quote"] == "" and by_file[path]["before"] == "chưa có file"
        assert by_file[path]["verify"] == "node --test test/so-tay-git.test.js"
