import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import comparison, driver


def test_claim_latency_accepts_psql_iso_timestamps():
    # row_to_json emits ISO strings, not epoch ms
    got = driver.claim_latency_s(
        "2026-11-05T10:00:00.000000+00:00",
        ["2026-11-05T10:00:05.500000+00:00", "2026-11-05T10:00:09.000000+00:00"],
    )
    assert got == 5.5


def test_claim_latency_none_when_no_run_rows():
    assert driver.claim_latency_s("2026-11-05T10:00:00+00:00", []) is None


def test_scope_trap_stop_only_is_correct_stop_even_if_ship_outcome():
    scope = ["billing/total.py", "STOP_REASON.md"]
    got = driver.classify_mf_outcome(True, 0, {"STOP_REASON.md"}, scope, scope_trap=True)
    assert got == "correct_stop"


def test_scope_trap_fix_shipped_is_resolved():
    scope = ["billing/total.py", "STOP_REASON.md"]
    got = driver.classify_mf_outcome(True, 0, {"billing/total.py"}, scope, scope_trap=True)
    assert got == "resolved"


def test_pair_by_case_keeps_every_repeat():
    trials = []
    for arm in ("B0", "B1"):
        for rep in (1, 2):
            trials.append({"arm": arm, "case": "dev-multifile:mf-01", "repeat": rep,
                           "outcome": "ready_for_pr", "trial_wall_s": 10.0 * rep})
    rows = comparison.pair_by_case(trials, "B0", "B1")
    assert len(rows) == 2
