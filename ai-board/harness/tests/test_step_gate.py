from runtime.step_gate import runnable_plan


def _plan():
    return {"steps": [{"order": 1, "depends_on": []}, {"order": 2, "depends_on": [1]},
                      {"order": 3, "depends_on": [2]}, {"order": 4, "depends_on": [1]}]}


def test_none_keeps_plan():
    plan = _plan()
    assert runnable_plan(plan, None) is plan


def test_blocked_step_and_dependents_dropped():
    out = runnable_plan(_plan(), [1, 4])
    assert [s["order"] for s in out["steps"]] == [1, 4]
    assert out["held_back"] == [2, 3]


def test_done_dependency_outside_set_is_stripped():
    out = runnable_plan(_plan(), [3, 4])
    assert [s["depends_on"] for s in out["steps"]] == [[], []]
    assert out["held_back"] == [1, 2]
