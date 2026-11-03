"""Offline gate replay of recorded traces (requests 7, 11, 13, 14, 15): every non-correct verdict must be listed."""
import gate_replay

OPEN = {("2.5.grounding", 650)}  # tip default has no advquote


def test_replay_matches_labels_except_known_open():
    rows = gate_replay.run()
    assert {(r["gate"], r["trace"]) for r in rows if r["verdict"] != "correct"} == OPEN


def test_table_lists_every_gate():
    text = gate_replay.table(gate_replay.run())
    assert "1.coverage" in text and "wrong_pass" in text


def test_run114_plugin_file_is_no_longer_false_blocked():
    rows = {row["trace"]: row for row in gate_replay.run()}
    assert rows["run114"]["got"] == "pass" and rows["run114"]["verdict"] == "correct"
    assert rows["run114-reject"]["got"] == "block" and rows["run114-reject"]["verdict"] == "correct"
