import csv
import json

from evaluation import trial_matrix as tm


def write_trial(folder, name, **fields):
    (folder / name).write_text(json.dumps(fields, ensure_ascii=False), encoding="utf-8")


def test_read_trials_skips_non_dict_and_reads_utf8(tmp_path):
    write_trial(tmp_path, "a.json", outcome="blocked", verdict_reason="Chữ tiếng Việt")
    (tmp_path / "b.json").write_text("[1, 2]", encoding="utf-8")
    trials = tm.read_trials(tmp_path)
    assert [t["_path"].name for t in trials] == ["a.json"]
    assert trials[0]["verdict_reason"] == "Chữ tiếng Việt"


def test_first_failure_maps_gate_infra_and_none(tmp_path):
    assert tm.first_failure({"gate_reached": 2.5}) == "2.5"
    assert tm.first_failure({"gate_reached": 1.0}) == "1"
    assert tm.first_failure({"gate_reached": None}) == "no_gate"
    assert tm.first_failure({"gate_reached": 3, "failure_class": "transient"}) == "infra"
    assert tm.first_failure({"gate_reached": 3, "infra_tag": "driver_cancel"}) == "infra"


def test_matrix_counts_outcome_by_first_failure_and_keeps_infra_separate(tmp_path):
    trials = [
        {"outcome": "blocked", "gate_reached": 1.0},
        {"outcome": "blocked", "gate_reached": 1.0},
        {"outcome": "blocked", "gate_reached": 5, "failure_class": "transient"},
        {"outcome": "needs_review", "gate_reached": 5.5},
        {"outcome": "ready_for_pr", "gate_reached": None},
    ]
    table = tm.matrix(trials)
    assert table["blocked"]["1"] == 2
    assert table["blocked"]["infra"] == 1
    assert table["blocked"]["5"] == 0
    assert table["needs_review"]["5.5"] == 1
    assert table["ready_for_pr"]["no_gate"] == 1
    text = tm.render_matrix(table)
    assert text.splitlines()[0].split(" | ")[0] == "outcome"
    assert "blocked | 2 | 0 | 1 | 0 | 3" in text


def test_stop_reason_prefers_loop_stop_and_truncates():
    long = "x" * 300
    assert tm.stop_reason({"loop_stop": "stagnation", "verdict_reason": "v"}) == "stagnation"
    assert tm.stop_reason({"verdict_reason": "a\n  b"}) == "a b"
    assert len(tm.stop_reason({"verdict_reason": long})) == 120


def test_trial_row_has_blank_note_and_label_columns(tmp_path):
    write_trial(tmp_path, "t1.json", request_id="r1", case="css_color-l1", arm="B0",
                outcome="timeout", gate_reached=2.5, verdict_reason="slow")
    row = tm.trial_row(tm.read_trials(tmp_path)[0])
    assert row["file"] == "t1.json"
    assert row["outcome"] == "timeout"
    assert row["first_failure"] == "2.5"
    assert row["stop"] == "slow"
    assert row["trace"].endswith("t1.json")
    assert row["note"] == "" and row["label"] == ""


def test_main_prints_matrix_and_writes_csv(tmp_path, capsys):
    trial_dir = tmp_path / "trials"
    trial_dir.mkdir()
    write_trial(trial_dir, "t1.json", outcome="blocked", gate_reached=1.0)
    write_trial(trial_dir, "t2.json", outcome="blocked", gate_reached=4)
    out = tmp_path / "out.csv"
    assert tm.main([str(trial_dir), "--csv", str(out)]) == 0
    printed = capsys.readouterr().out
    assert "outcome" in printed and "blocked" in printed
    with out.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    assert [r["first_failure"] for r in rows] == ["1", "4"]
    assert all(r["note"] == "" and r["label"] == "" for r in rows)
