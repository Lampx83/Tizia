"""Offline gate replay of recorded traces (requests 7, 11, 13, 14, 15): every non-correct verdict must be listed."""
import gate_replay

OPEN = {
    ("1.coverage", 561), ("1.coverage", 589), ("1.coverage", 593), ("1.coverage", 649), ("1.coverage", 658),
    ("1.coverage", 665), ("1.coverage", 671), ("1.coverage", 678), ("1.coverage", 691),
    ("2.5.grounding", 650), ("4.guard_pii", "599"),
}


def test_replay_matches_labels_except_known_open():
    rows = gate_replay.run()
    assert {(r["gate"], r["trace"]) for r in rows if r["verdict"] != "correct"} == OPEN


def test_table_lists_every_gate():
    text = gate_replay.table(gate_replay.run())
    assert "1.coverage" in text and "wrong_pass" in text
