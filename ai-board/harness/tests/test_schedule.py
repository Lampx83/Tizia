# -*- coding: utf-8 -*-
"""LF/107 slice A: DAG scheduler levels + conflict detection."""
import pytest

from runtime import schedule


def step(order, scope, deps=()):
    return {"order": order, "allowed_scope": [scope], "depends_on": list(deps)}


def test_independent_steps_share_a_level_and_dependents_wait():
    steps = [step(1, "a.js"), step(2, "b.js"), step(3, "c.js", [1, 2])]
    assert schedule.levels(steps) == [[1, 2], [3]]
    assert schedule.schedule(steps) == {"levels": [[1, 2], [3]], "parallel": True}


def test_chain_stays_sequential():
    steps = [step(1, "a.js"), step(2, "b.js", [1]), step(3, "c.js", [2])]
    assert schedule.levels(steps) == [[1], [2], [3]]
    assert schedule.schedule(steps)["parallel"] is False


def test_cycle_unknown_and_self_are_refused():
    with pytest.raises(ValueError, match="chu trình"):
        schedule.levels([step(1, "a.js", [2]), step(2, "b.js", [1])])
    with pytest.raises(ValueError, match="không tồn tại"):
        schedule.levels([step(1, "a.js", [9])])
    with pytest.raises(ValueError, match="chính nó"):
        schedule.levels([step(1, "a.js", [1])])


def test_two_steps_may_not_write_the_same_file():
    with pytest.raises(ValueError, match="cùng ghi"):
        schedule.check_conflicts([step(1, "a.js"), step(2, "a.js")])


def test_checkpoint_graph_carries_depends_on_and_level():
    graph = schedule.dependency_graph([step(1, "a.js"), step(2, "b.js"), step(3, "c.js", [1, 2])])
    assert [(item["child"], item["level"], item["depends_on"]) for item in graph] == [(0, 0, []), (1, 0, []), (2, 1, [1, 2])]


def test_prepare_defaults_to_the_old_chain_and_reads_the_subtask_file():
    prepared = schedule.prepare([{"file": "a.js"}, {"file": "b.js"}])
    assert [(item["order"], item["depends_on"]) for item in prepared] == [(1, []), (2, [1])]
    assert schedule.levels(prepared) == [[1], [2]]
    with pytest.raises(ValueError, match="cùng ghi b.js"):
        schedule.check_conflicts([{"order": 1, "file": "b.js"}, {"order": 2, "file": "b.js"}])
