"""Offline gate replay of recorded traces (requests 7, 11, 13, 14, 15): every non-correct verdict must be listed."""
import re

import gate_replay

# Known open false-blocks at tip default, both owned by LF/141: the validator rewrote a quote (650) and the
# validator called a plan ungrounded for a file the plan never names (646).
OPEN = {("2.5.grounding", 650), ("2.5.grounding", 646)}
OLD_NEW_OK = re.compile(r"^(public/[a-z0-9][a-z0-9-]*\.html|public/js/[\w/-]+\.js"
                        r"|server/contexts/_ai-generated/[\w-]+/[\w-]+/index\.js"
                        r"|server/contexts/_ai-generated/[a-z0-9][a-z0-9-]*/migrations/[a-z0-9][a-z0-9._-]*\.sql)$")


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


def test_run114_replays_the_whole_gate_decision_not_only_the_allowlist():
    from gates import brainstorm
    saved = brainstorm._NEW_OK
    brainstorm._NEW_OK = OLD_NEW_OK
    try:
        rows = {row["trace"]: row for row in gate_replay.run()}
    finally:
        brainstorm._NEW_OK = saved
    assert rows["run114"]["got"] == "block" and rows["run114"]["verdict"] == "false_block"
    assert rows["run114-reject"]["verdict"] == "correct"


def test_three_grounding_traces_are_graded():
    got = {}
    for row in gate_replay.run():
        if row["gate"] == "2.5.grounding":
            got.setdefault(row["trace"], []).append(row["got"])
    assert got == {623: ["pass"], 646: ["block"], 650: ["block", "pass", "pass"]}
