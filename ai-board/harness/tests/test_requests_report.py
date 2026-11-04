import csv
import json

import pytest

from evaluation import requests_dataset as ds
from evaluation import requests_report as rr

FIELDS, ROWS = ds.read(ds.FIXTURE)


@pytest.fixture(autouse=True)
def _no_real_dataset(monkeypatch):
    """Default every test to the fixture, whatever the developer shell exports."""
    monkeypatch.delenv(ds.ENV, raising=False)


def write_results(path, rows):
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "passed", "outcome", "plan_steps", "resumes"])
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
    return path


def test_summary_groups_by_difficulty_and_joins_ids():
    results = [
        {"id": "req-sam-01", "outcome": "plan_pass", "plan_steps": "1", "resumes": "0"},
        {"id": "req-sam-02", "outcome": "plan_pass", "plan_steps": "3", "resumes": "2"},
        {"id": "req-sam-03", "passed": "0", "plan_steps": "", "resumes": ""},
        {"id": "req-sam-999", "outcome": "plan_pass"},
    ]
    summary = rr.summarize(ROWS, results)
    one = summary["by_difficulty"]["1"]
    assert (one["cases"], one["passed"], one["mean_steps"], one["resumes"]) == (1, 1, 1.0, 0)
    two = summary["by_difficulty"]["2"]
    assert (two["cases"], two["passed"], two["mean_steps"], two["resumes"]) == (1, 1, 3.0, 2)
    three = summary["by_difficulty"]["3"]
    assert (three["cases"], three["passed"], three["mean_steps"]) == (1, 0, None)
    assert summary["unknown_ids"] == ["req-sam-999"]
    assert "req-sam-04" in summary["missing_ids"]
    assert summary["totals"]["cases"] == 3


def test_outcome_mismatch_counts_as_failure():
    assert rr.passed({"outcome": "gate25_block"}, "plan_pass") is False
    assert rr.passed({"outcome": "clarify"}, "clarify") is True
    assert rr.passed({"passed": "no", "outcome": "plan_pass"}, "plan_pass") is False


def test_main_prints_table_and_dataset_hash(tmp_path, capsys):
    results = write_results(tmp_path / "results.csv",
                            [{"id": "req-sam-01", "passed": "1", "outcome": "", "plan_steps": "2", "resumes": "1"}])
    assert rr.main(["--results", str(results)]) == 0
    out = capsys.readouterr().out
    head, table = out.split("| difficulty |", 1)
    assert f"sha256 {ds.dataset_hash()}" in head
    assert str(ds.FIXTURE) in head
    assert f"rows {len(ROWS)}" in head
    assert table.startswith(" band |")
    assert "trivial one file" in table


def test_json_output_carries_dataset_identity(tmp_path, capsys):
    results = write_results(tmp_path / "results.csv",
                            [{"id": "req-sam-05", "passed": "0", "outcome": "plan_pass", "plan_steps": "", "resumes": ""}])
    assert rr.main(["--results", str(results), "--json"]) == 0
    summary = json.loads(capsys.readouterr().out)
    assert summary["dataset"] == {"path": str(ds.FIXTURE), "sha256": ds.dataset_hash(), "rows": len(ROWS)}
    assert summary["unknown_ids"] == [] and summary["missing_ids"]


def test_dataset_flag_and_env_override(tmp_path, monkeypatch, capsys):
    copy = tmp_path / ds.DATASET_NAME
    copy.write_bytes(ds.FIXTURE.read_bytes())
    results = write_results(tmp_path / "results.csv",
                            [{"id": "req-sam-01", "passed": "1", "outcome": "", "plan_steps": "1", "resumes": "0"}])
    assert rr.main(["--results", str(results), "--dataset", str(copy), "--json"]) == 0
    assert json.loads(capsys.readouterr().out)["dataset"]["path"] == str(copy)
    monkeypatch.setenv(ds.ENV, str(tmp_path))
    assert rr.main(["--results", str(results), "--json"]) == 0
    assert json.loads(capsys.readouterr().out)["dataset"]["path"] == str(copy)


def test_missing_dataset_path_is_an_error_not_a_fallback(tmp_path, monkeypatch, capsys):
    results = write_results(tmp_path / "results.csv",
                            [{"id": "req-sam-01", "passed": "1", "outcome": "", "plan_steps": "1", "resumes": "0"}])
    with pytest.raises(SystemExit) as exit_info:
        rr.main(["--results", str(results), "--dataset", str(tmp_path / "gone.csv")])
    assert exit_info.value.code == 2
    assert "requests dataset not found" in capsys.readouterr().err
    monkeypatch.setenv(ds.ENV, str(tmp_path / "gone"))
    with pytest.raises(SystemExit):
        rr.main(["--results", str(results)])
