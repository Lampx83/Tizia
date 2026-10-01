import json

import eval_strata


def test_regressions_flags_only_drops_over_limit():
    base = {"type=ui": 100.0, "school=it": 50.0}
    assert eval_strata.regressions({"type=ui": 91.0, "school=it": 30.0, "style=new": 0.0}, base) == ["school=it: 50.0 → 30.0"]
    # tỉ lệ sai: tăng mới là tụt
    assert eval_strata.regressions({"clarity_fp": 30.0}, {"clarity_fp": 10.0, "_config": {}}) == ["clarity_fp: 10.0 → 30.0"]
    assert eval_strata.regressions({"clarity_fp": 0.0}, {"clarity_fp": 10.0}) == []


def test_no_stratum_drops_below_baseline():
    """Quy tắc nhận thay đổi: không nhóm nào tụt quá MAX_DROP điểm so với mốc đã commit."""
    baseline = json.loads(eval_strata.BASELINE.read_text(encoding="utf-8"))
    _, current = eval_strata.measure()
    assert eval_strata.regressions(current, baseline) == []
