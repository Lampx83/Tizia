from runtime.objection_repeat import repeated, signature


def stopped(reason, gate=2.5):
    return {"gate": gate, "result": {"reason": reason}}


SAME = "plan_ungrounded: plan sửa public/trang.html không có dẫn chứng"


def test_two_identical_signatures_stop():
    assert repeated([stopped(SAME), stopped(SAME)], 2)


def test_different_reason_class_continues():
    assert not repeated([stopped(SAME), stopped("plan không hợp lệ: x")], 2)


def test_different_cited_paths_continue():
    assert not repeated([stopped(SAME), stopped("plan_ungrounded: plan sửa public/khac.html")], 2)


def test_wording_change_with_same_structure_still_stops():
    other = "plan_ungrounded: plan sửa public/trang.html, dẫn chứng yếu"
    assert signature(stopped(SAME)) == signature(stopped(other))
    assert repeated([stopped(SAME), stopped(other)], 2)


def test_single_round_never_stops():
    assert not repeated([stopped(SAME)], 2)


def test_worker_evidence_lists_both_rounds_and_flags_a_repeat():
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import _objection_evidence

    same = _objection_evidence([stopped(SAME), stopped(SAME)])
    assert same["repeat_objection"] is True and len(same["objection_history"]) == 2
    assert same["objection_history"][0]["gate"] == 2.5

    different = _objection_evidence([stopped(SAME), stopped("plan không hợp lệ: x", gate=1)])
    assert different["repeat_objection"] is False and len(different["objection_history"]) == 2


def test_two_identical_repair_rounds_stop_after_round_two_with_both_rounds_evidence():
    import sys
    from pathlib import Path
    from types import SimpleNamespace

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import _objection_evidence, _plan_with_repair

    calls = []

    def run_plan(req):
        calls.append(req)
        return stopped("plan_ungrounded")

    budget = SimpleNamespace(max_model_calls=10, model_calls=0)
    final, history = _plan_with_repair(run_plan, {"subject": "s"}, {"plan": {"subtasks": []}}, budget, stopped("plan_ungrounded"))

    assert len(calls) == 1 and final is not None  # one repair round, no third round
    assert len(history) == 2
    assert _objection_evidence(history)["repeat_objection"] is True


def test_different_objection_after_repair_is_not_a_repeat_and_stops_at_round_two_by_policy():
    import sys
    from pathlib import Path
    from types import SimpleNamespace

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import _objection_evidence, _plan_with_repair

    answers = iter([stopped("plan không hợp lệ: x", gate=1)])
    budget = SimpleNamespace(max_model_calls=10, model_calls=0)
    final, history = _plan_with_repair(lambda req: next(answers), {"subject": "s"}, {"plan": {"subtasks": []}}, budget, stopped("plan_ungrounded"))

    assert len(history) == 2 and _objection_evidence(history)["repeat_objection"] is False
