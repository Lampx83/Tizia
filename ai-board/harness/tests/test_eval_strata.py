import json

import eval_strata


def test_regressions_flags_only_drops_over_limit():
    base = {"type=ui": 100.0, "school=it": 50.0}
    assert eval_strata.regressions({"type=ui": 91.0, "school=it": 30.0, "style=new": 0.0}, base) == ["school=it: 50.0 → 30.0"]


def test_no_stratum_drops_below_baseline():
    """Quy tắc nhận thay đổi ticket 12: không nhóm nào tụt quá MAX_DROP điểm so với mốc đã commit."""
    baseline = json.loads(eval_strata.BASELINE.read_text(encoding="utf-8"))
    current = eval_strata.by_stratum([eval_strata.score(s) for s in eval_strata.SCENARIOS])
    assert eval_strata.regressions(current, baseline) == []
