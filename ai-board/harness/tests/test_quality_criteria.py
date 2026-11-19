"""Seam: criteria/criterion_grade/criterion_stats/soft_misses read the board's contract quality_checks."""
import json

from evaluation.pipeline import criteria as C
from evaluation.pipeline import criterion_grade as cg
from evaluation.pipeline import criterion_stats as cs
from evaluation.pipeline import soft_misses as sm

CASE = {"id": "css_color-l2-x", "title": "Đổi màu", "types": ["css_color"], "file": "public/grapher.html"}
MISS = {"gate": 5, "check": "contrast", "value": 3.68, "threshold": 4.5, "page": "/grapher.html", "width": 375, "detail": "b"}


def trial(**kw):
    return {"_stem": "B0-r1-x", "arm": "B0", "repeat": 1, "case": CASE["id"], "outcome": "ready_for_pr", "gate_reached": 5.5, **kw}


def test_eval_hard_flags_come_from_the_contract_table():
    assert C.CRITERIA["scope_ok"].hard is True and C.CRITERIA["matches_intent"].hard is False
    for crit in C.CRITERIA.values():
        if crit.check:
            assert crit.hard == (C.QUALITY[crit.check]["class"] == "hard"), crit.id


def test_every_soft_board_check_is_a_soft_eval_criterion():
    soft = {k for k, v in C.QUALITY.items() if v["class"] == "soft"}
    ids = {crit.id for crit, _ in C.table_for(CASE)}
    assert {f"quality:{k}" for k in soft} <= ids
    assert all(not C.CRITERIA[f"quality:{k}"].hard for k in soft)


def test_soft_miss_fails_its_criterion_and_keeps_the_value():
    rows = {r["criterion"]: r for r in cg.grade_trial(trial(soft_misses=[MISS]), CASE, {})}
    assert rows["quality:contrast"]["match"] is False
    assert (rows["quality:contrast"]["value"], rows["quality:contrast"]["threshold"]) == (3.68, 4.5)
    assert rows["quality:overflow"]["match"] is True


def test_trial_without_a_soft_record_is_not_gradable_for_quality():
    rows = {r["criterion"]: r for r in cg.grade_trial(trial(), CASE, {})}
    assert rows["quality:contrast"]["match"] == cg.ND and rows["quality:contrast"]["reason"] == "no_soft_misses_record"


def test_shipped_with_soft_misses_still_counts_as_shipped():
    rows = {r["criterion"]: r for r in cg.grade_trial(trial(soft_misses=[MISS]), CASE, {})}
    assert rows["ship_after_gates"]["match"] is True


def test_report_gives_threshold_rate_and_value_spread():
    rows = cg.grade_trial(trial(soft_misses=[MISS]), CASE, {}) + cg.grade_trial(trial(_stem="B0-r2-x", soft_misses=[]), CASE, {})
    md = cs.report_md([r for r in rows if r["criterion"] != "*"])
    line = next(x for x in md.splitlines() if x.startswith("| quality:contrast "))
    assert "1/2" in line and "3.68" in line


def test_soft_misses_from_gate_traces_take_the_last_gate_4_and_gate_5_rows():
    traces = [{"gate": 4, "soft_misses": [{"gate": 4, "check": "theme"}]}, {"gate": 5, "soft_misses": [MISS]},
              {"gate": 5}]
    assert sm.from_traces(traces) == [{"gate": 4, "check": "theme"}]
    assert sm.from_traces(traces[:2]) == [{"gate": 4, "check": "theme"}, MISS]
    record = sm.for_record({"root_ticket_id": 7}, lambda sql: [json.dumps(t) for t in traces[:2]])
    assert record == {"soft_misses": [{"gate": 4, "check": "theme"}, MISS]}
    assert "soft_misses_error" in sm.for_record({}, lambda sql: [])
