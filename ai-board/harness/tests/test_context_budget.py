import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import context_budget as cb
from evaluation.pipeline import driver


def _t(arm, case, resolved, files=1, wrong=False, stop=False):
    return {"arm": arm, "case": case, "repeat": 1, "resolved": resolved, "wrong_ship": wrong,
            "correct_stop": stop, "case_files": files}


def _trials(rows):
    return [_t("B1", c, b, f) | {"correct_stop": s0} for c, b, f, s0 in [(r[0], r[1], r[3], r[5]) for r in rows]] + \
           [_t("B1-ctx", r[0], r[2], r[3], r[4], r[6]) for r in rows]


def test_arm_env_is_baseline_plus_one_flag_each():
    base = driver.arm_env("B1")
    assert driver.arm_env("B1-ctx") == {**base, "AI_BOARD_CONTEXT_COMPACTION": "1"}
    assert driver.arm_env("B1-state") == {**base, "AI_BOARD_STATE_FILE": "1"}
    assert "AI_BOARD_STATE_FILE" not in driver.arm_env("B1-ctx")
    assert {"B1-ctx", "B1-state"} <= set(driver.arm_table())


def test_zones_are_20_60_20_of_real_window():
    assert cb.ZONES == {"core": 0.20, "working": 0.60, "headroom": 0.20}
    assert cb.zone_tokens(32768) == {"core": 6553, "working": 19660, "headroom": 6553}
    with pytest.raises(ValueError):
        cb.zone_tokens(0)


def test_rule_rejects_when_a_baseline_resolved_single_file_case_is_lost():
    rows = [("a", True, False, 1, False, False, False), ("b", True, True, 1, False, False, False)]
    out = cb.decide(_trials(rows), "B1", "B1-ctx")
    assert out["verdict"] == "reject" and out["lost_single_file"] == ["a r1"]


def test_lost_multifile_case_does_not_trigger_reject_rule():
    rows = [("m", True, False, 3, False, False, False)]
    assert cb.decide(_trials(rows), "B1", "B1-ctx")["lost_single_file"] == []


def test_promote_needs_enough_pairs_and_no_regression_else_hold():
    rows = [(f"c{i}", i % 2 == 0, i % 2 == 0, 1, False, False, False) for i in range(cb.MIN_PAIRS)]
    assert cb.decide(_trials(rows), "B1", "B1-ctx")["verdict"] == "promote"
    assert cb.decide(_trials(rows[:3]), "B1", "B1-ctx")["verdict"] == "hold"


def test_wrong_ship_increase_rejects_even_without_loss():
    rows = [(f"c{i}", False, False, 1, i == 0, False, False) for i in range(cb.MIN_PAIRS)]
    assert cb.decide(_trials(rows), "B1", "B1-ctx")["verdict"] == "reject"


def test_dry_run_prints_effective_env_per_arm(capsys):
    cb.dry_run()
    out = capsys.readouterr().out
    assert "B1-ctx" in out and "AI_BOARD_CONTEXT_COMPACTION=1" in out and "AI_BOARD_STATE_FILE=1" in out
    assert "core 20%" in out and "reject" in out
