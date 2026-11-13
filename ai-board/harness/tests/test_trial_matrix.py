import csv
import json

from evaluation import trial_matrix as tm

PLAN_OK = {"blocked": False, "validator_blocked": False, "final_hit": True}


def write_trial(folder, name, **fields):
    (folder / name).write_text(json.dumps(fields, ensure_ascii=False), encoding="utf-8")


def test_read_trials_skips_corrupt_and_non_dict_and_counts(tmp_path):
    write_trial(tmp_path, "a.json", id="r1", reason="Chữ tiếng Việt")
    (tmp_path / "b.json").write_text("[1, 2]", encoding="utf-8")
    (tmp_path / "c.json").write_text("{broken", encoding="utf-8")
    (tmp_path / "d.json").write_bytes(b"\xff\xfe\x00bad")
    trials, skipped = tm.read_trials(tmp_path)
    assert [t["_path"].name for t in trials] == ["a.json"]
    assert trials[0]["reason"] == "Chữ tiếng Việt"
    assert skipped == 3


def test_last_ok_follows_funnel_order():
    assert tm.last_ok({"mode": "e2e", "plan": {**PLAN_OK, "final_hit": False}}) == "start"
    assert tm.last_ok({"mode": "e2e", "plan": PLAN_OK}) == "planned"
    assert tm.last_ok({"mode": "e2e", "plan": PLAN_OK, "gate_passed": True}) == "gate3"
    assert tm.last_ok({"mode": "gold", "gate_passed": True, "gate4": "passed"}) == "gate4"
    assert tm.last_ok({"mode": "gold", "gate_passed": True, "gate4": "passed", "resolved": True}) == "resolved"
    assert tm.last_ok({"mode": "gold"}) == "planned"


def test_first_failure_uses_metrics_stage_and_infra():
    assert tm.first_failure({"mode": "e2e", "plan": {**PLAN_OK, "blocked": True}}) == "plan_blocked"
    assert tm.first_failure({"mode": "gold", "gate_passed": False, "reason": "lỗi cú pháp"}) == "syntax"
    assert tm.first_failure({"mode": "gold", "gate_passed": True, "gate4": "blocked"}) == "gate4_blocked"
    assert tm.first_failure({"mode": "gold", "gate_passed": True, "gate4": "passed"}) == "wrong_result"
    assert tm.first_failure({"mode": "gold", "infra_error": True}) == "infra"
    assert tm.first_failure({"mode": "gold", "resolved": True, "infra_error": True}) == "resolved"


def test_matrix_pairs_last_ok_with_first_failure_and_splits_infra():
    trials = [
        {"mode": "e2e", "plan": {**PLAN_OK, "final_hit": False}},
        {"mode": "e2e", "plan": {**PLAN_OK, "final_hit": False}},
        {"mode": "e2e", "plan": PLAN_OK, "gate_passed": True, "gate4": "blocked"},
        {"mode": "e2e", "plan": PLAN_OK, "infra_error": True},
        {"mode": "gold", "gate_passed": True, "gate4": "passed", "resolved": True},
    ]
    table = tm.matrix(trials)
    assert table["start"]["plan_miss"] == 2
    assert table["gate3"]["gate4_blocked"] == 1
    assert table["planned"]["infra"] == 1
    assert table["resolved"]["resolved"] == 1
    text = tm.render_matrix(table)
    assert text.splitlines()[0].split(" | ")[0] == "last_ok"
    assert text.splitlines()[0].endswith("total")


def test_stop_reason_prefers_reason_then_error_and_truncates():
    assert tm.stop_reason({"reason": "r", "error": "e"}) == "r"
    assert tm.stop_reason({"error": "a\n  b"}) == "a b"
    assert len(tm.stop_reason({"reason": "x" * 300})) == 120


def test_trial_row_has_blank_note_and_label_columns(tmp_path):
    write_trial(tmp_path, "t1.json", id="css_color-l1", mode="gold", gate_passed=False, reason="slow")
    row = tm.trial_row(tm.read_trials(tmp_path)[0][0])
    assert row["file"] == "t1.json"
    assert row["request_id"] == "css_color-l1"
    assert row["outcome"] == "failed"
    assert row["last_ok"] == "planned" and row["first_failure"] == "gate3_blocked"
    assert row["stop"] == "slow"
    assert row["trace"].endswith("t1.json")
    assert row["note"] == "" and row["label"] == ""


def test_render_rows_escapes_pipe_and_newline_in_cells(tmp_path):
    write_trial(tmp_path, "t.json", id="a|b", mode="gold", reason="x | y\nz")
    rows = [tm.trial_row(tm.read_trials(tmp_path)[0][0])]
    line = tm.render_rows(rows).splitlines()[1]
    assert len(tm.render_rows(rows).splitlines()) == 2
    assert line.replace("\\|", "").count(" | ") == len(tm.COLUMNS) - 1
    assert "a\\|b" in line and "x \\| y z" in line


def test_main_prints_matrix_skipped_and_writes_csv(tmp_path, capsys):
    trial_dir = tmp_path / "trials"
    trial_dir.mkdir()
    write_trial(trial_dir, "t1.json", id="r1", mode="gold", gate_passed=True, gate4="blocked")
    write_trial(trial_dir, "t2.json", id="r2", mode="gold", infra_error=True)
    (trial_dir / "t3.json").write_text("{", encoding="utf-8")
    out = tmp_path / "out.csv"
    assert tm.main([str(trial_dir), "--csv", str(out)]) == 0
    printed = capsys.readouterr().out
    assert "last_ok" in printed and "skipped unreadable files: 1" in printed
    with out.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    assert [r["first_failure"] for r in rows] == ["gate4_blocked", "infra"]
    assert all(r["note"] == "" and r["label"] == "" for r in rows)
