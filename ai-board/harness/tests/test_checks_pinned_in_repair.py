"""Check ghim theo plan (LF/217): lượt repair không nới check; đổi check phải lập plan lại qua gate 2.5."""
import copy
import json

import pytest

from gate5 import verify
from gate5.session import STAGE_CLASS
from runtime import repair_agent
from gate5 import checks, functional
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state

BODY = b"// x\nChu moi\n"
CHECK = {"primitive": "text_present", "path": "/x.html", "text": "Chu moi"}
PROPOSAL = {"diagnosis": "thiếu chữ", "action": "repair_code",
            "changes": [{"file": "public/x.js", "search": "// x", "replace": "// y"}]}


@pytest.fixture
def gate_env(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: (200, BODY))
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})


def plan_with(check):
    return {"subtasks": [{"file": "public/x.js", "checks": [check]}], "summary_vi": "x"}


def test_repair_reply_that_names_checks_is_refused_only_with_flag_on(monkeypatch):
    body = {**PROPOSAL, "checks": [CHECK]}
    raw = json.dumps(body, ensure_ascii=False)
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    with pytest.raises(repair_agent.ProposalError, match="bất biến"):
        repair_agent.parse(raw)
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    assert repair_agent.parse(raw)["changes"][0]["file"] == "public/x.js"


def test_pin_moves_only_with_check_content_not_other_plan_fields():
    plan = plan_with(CHECK)
    assert checks.pin(plan) == checks.pin(copy.deepcopy(plan))
    assert checks.pin(plan) == checks.pin({**plan, "summary_vi": "khác"})
    assert checks.pin(plan) != checks.pin(plan_with({**CHECK, "text": "Chu khac"}))
    assert checks.pin(plan) != checks.pin({"subtasks": []})


def test_gate5_refuses_when_checks_were_changed_after_planning(tmp_path, monkeypatch, gate_env):
    state = make_state(make_checkout(tmp_path))
    state["plan"] = plan_with(CHECK)
    state["checks_pin"] = checks.pin(state["plan"])
    state["plan"]["subtasks"][0]["checks"] = [{**CHECK, "text": "Chu de nha"}]  # lượt repair nới check
    runner = FakeRunner()
    out = verify.run(state, runner=runner)
    assert out["blocked"] is True and "lập lại plan" in out["reason"]
    assert out["failure_class"] == STAGE_CLASS["plan"]  # plan-class: quay về soát plan, không repair code
    assert runner.calls == []


def test_gate5_runs_normally_when_checks_match_their_pin(tmp_path, monkeypatch, gate_env):
    state = make_state(make_checkout(tmp_path))
    state["plan"] = plan_with(CHECK)
    state["checks_pin"] = checks.pin(state["plan"])
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False


def test_pin_absent_means_no_plan_pinning_yet(tmp_path, monkeypatch, gate_env):
    state = make_state(make_checkout(tmp_path))
    state["plan"] = plan_with(CHECK)
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False
