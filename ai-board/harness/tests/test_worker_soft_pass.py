"""Worker: gate 5 chỉ trượt kiểm mềm được một lượt sửa, lần sau cho qua kèm soft_misses; trượt cứng vẫn chặn."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

MISS = {"gate": 5, "check": "contrast", "value": 3.68, "threshold": 4.5, "page": "/g.html", "width": 375, "detail": "b"}
GATE4_MISS = {"gate": 4, "check": "inline_script", "value": 1, "threshold": 0, "detail": "a"}


class Budget:
    units = retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend_repair(self):
        return True


def _execution(results):
    import worker
    execution = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=Budget(), run_gate=None, cleanup=None,
                                  catalog=None, request_detail=None, memory_path=None, should_stop=None, candidate_opts=None,
                                  request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    execution.plan = {"steps": []}
    execution.kind = "ordinary"
    execution.state = {"soft_misses": [GATE4_MISS]}
    queue = list(results)
    execution.run_gate = lambda *_: dict(queue.pop(0))
    return execution


def _result(soft_only=True, reason="kiểm mềm dưới ngưỡng: contrast 3.68"):
    evidence = {"http_observed": True, "runner": "fake", "functional": {"passed": True}, "soft_misses": [MISS]}
    return {"gate": 5, "blocked": True, "reason": reason, "failure_class": "ordinary", "soft_only": soft_only, "evidence": evidence}


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SOFT_QUALITY_CHECKS", "1")


def test_soft_only_miss_gets_one_repair_then_passes_with_its_misses(on):
    execution = _execution([_result(), _result()])
    assert execution.gate(5) == "blocked"
    assert execution.repair_check() == "repair" and execution.repairs[-1]["soft"] is True
    assert execution.gate(5) == "passed"
    assert execution.gates[-1]["blocked"] is False and execution.gates[-1]["soft_misses"] == [MISS]
    assert execution.state["soft_misses"] == [GATE4_MISS, MISS]


def test_a_hard_block_after_a_soft_repair_still_blocks(on):
    execution = _execution([_result(), _result(soft_only=False, reason="smoke failed")])
    execution.gate(5)
    execution.repair_check()
    assert execution.gate(5) == "blocked"


def test_flag_off_never_turns_a_soft_only_result_into_a_pass():
    execution = _execution([_result(), _result()])
    execution.gate(5)
    execution.repair_check()
    assert execution.gate(5) == "blocked"
