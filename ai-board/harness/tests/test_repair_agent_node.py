"""Repair-agent node: routing, one model call, validation, elevation wait, cap and evidence."""
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from runtime import levels, progress  # noqa: E402
import worker  # noqa: E402

CODE = "const a = 1;\nrender();\n"
TEST = "test('a', () => {});\n"
PLAN = {"goal": "them bo the", "capabilities": ["public.ui"],
        "steps": [{"order": 1, "title": "bo the", "allowed_scope": ["public/js/campus/building.js"],
                   "tests": ["test/building.test.js"], "risk": "low"}]}


class Trace:
    def __init__(self):
        self.spans = []

    def add_span(self, name, attributes, **_):
        self.spans.append({"name": name, "attributes": attributes})


class Routing:
    def __init__(self):
        self.roles = []

    def first(self, role):
        self.roles.append(role)
        return {"model": "fake-heavy"}


class Models:
    def __init__(self):
        self.routing = Routing()


class Deps:
    def __init__(self, reply=None):
        self.models, self.trace, self.calls = Models(), Trace(), []
        self.reply = reply

    def call_model(self, model, prompt, **kwargs):
        self.calls.append({"model": model, "prompt": prompt, **kwargs})
        return {"response": self.reply}


class Budget:
    units = 0

    def tick(self):
        return True


def execution(deps, *, produced=None, state=None, gates=None):
    plan = json.loads(json.dumps(PLAN))
    run = worker._Execution(plan, ticket_id=1, checkout_source="unused", deps=deps, budget=Budget(), run_gate=None,
                            cleanup=None, catalog=None, request_detail={"subject": "them bo the"}, memory_path=None,
                            should_stop=None, candidate_opts=None, request_type=None, eval_tasks=None,
                            preview_capture=None, checkpoint=None, plan_hash=None)
    run.produced = produced if produced is not None else {
        "public/js/campus/building.js": {"code": CODE, "test_file": "test/building.test.js", "test": TEST, "model": "m"}}
    run.state = state or {}
    run.gates = gates or [{"gate": 5, "blocked": True, "reason": "node --check lỗi", "failure_class": "ordinary",
                           "repair_class": "unseen", "repair_action": progress.STOP_ADMIN}]
    run.kind = "ordinary"
    return run


def proposal(**overrides):
    body = {"diagnosis": "selector lệch", "action": progress.CHANGE_FILE,
            "changes": [{"file": "public/js/campus/building.js", "search": "const a = 1;", "replace": "const a = 2;"}]}
    body.update(overrides)
    return json.dumps(body)


@pytest.fixture(autouse=True)
def flags(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROGRESS_LOOP", "1")
    monkeypatch.setenv("AI_BOARD_MODEL_REPAIR", "1")
    monkeypatch.setattr(worker, "REPAIR_REPLAN", {"enabled": True, "max_repairs": 12})
    monkeypatch.setattr(worker, "MAX_REPAIRS", 12)


def test_a_valid_repair_is_one_heavy_call_applied_to_the_produced_files():
    deps = Deps(proposal())
    run = execution(deps)
    assert run.repair_agent() == "passed"
    assert len(deps.calls) == 1 and deps.calls[0]["role"] == "repair_planner"
    assert deps.calls[0]["model"] == "fake-heavy"
    assert deps.calls[0]["options"] == {"temperature": 0, "num_predict": 4096}
    assert "const a = 2;" in run.produced["public/js/campus/building.js"]["code"]
    assert run.repairs[0]["gate"] == 5 and "repair agent" in run.repairs[0]["reason"]
    assert run.reuse_next == run.produced, "next gate 3 rebuilds from produced without a model call"
    assert run.agent_evidence[-1]["outcome"] == "applied"
    assert deps.trace.spans[-1]["name"] == "repair_agent.proposal"


def test_an_invalid_reply_is_recorded_and_rejected_without_a_write():
    deps = Deps("xin lỗi, tôi không biết")
    run = execution(deps)
    assert run.repair_agent() == "blocked"
    assert run.repairs == [] and run.agent_evidence[-1]["outcome"] == "rejected"
    assert "repair agent" in run.stop_note


def test_an_out_of_scope_path_is_denied():
    deps = Deps(proposal(changes=[{"file": "public/js/other.js", "search": "x", "replace": "y"}]))
    run = execution(deps)
    assert run.repair_agent() == "blocked"
    assert run.agent_evidence[-1]["outcome"] == "denied" and "scope" in run.agent_evidence[-1]["reason"]


def test_an_ai_board_path_stays_blocked():
    deps = Deps(proposal(changes=[{"file": "ai-board/worker.py", "search": "a", "replace": "b"}]))
    run = execution(deps, produced={"ai-board/worker.py": {"code": "a", "model": "m"}})
    assert run.repair_agent() == "blocked"
    assert "AI Board" in run.agent_evidence[-1]["reason"]


def test_a_permission_change_is_not_an_allowed_action():
    deps = Deps(proposal(action="change_permissions"))
    run = execution(deps)
    assert run.repair_agent() == "blocked"
    assert run.agent_evidence[-1]["outcome"] == "rejected"


def test_a_tool_outside_read_and_draft_write_is_denied():
    deps = Deps(proposal(tool="run_check"))
    run = execution(deps)
    assert run.repair_agent() == "blocked"
    assert run.agent_evidence[-1]["outcome"] == "denied"


def test_a_protected_file_waits_for_an_approved_elevation():
    body = proposal(changes=[{"file": "server/contexts/campus/cards.js", "search": "a = 1", "replace": "a = 2"}])
    produced = {"server/contexts/campus/cards.js": {"code": "export const a = 1;\n", "model": "m"}}
    waiting = execution(Deps(body), produced=produced)
    assert waiting.repair_agent() == "blocked"
    assert "elevation" in waiting.agent_evidence[-1]["reason"]

    plan = json.loads(json.dumps(PLAN))
    granted = execution(Deps(body), produced=produced, state={"elevation": [
        {"path": "server/contexts/campus/cards.js", "level": "protected", "approved": True,
         "plan_hash": levels.fingerprint(plan)}]})
    assert granted.repair_agent() == "passed"
    assert "a = 2" in granted.produced["server/contexts/campus/cards.js"]["code"]


def test_a_proposal_that_stops_hands_the_failure_to_the_admin():
    deps = Deps(proposal(action=progress.STOP_ADMIN, changes=[]))
    run = execution(deps)
    assert run.repair_agent() == "blocked"
    assert run.repairs == [] and run.agent_evidence[-1]["outcome"] == "stopped"
    assert "repair agent" in run.stop_note


def test_three_attempts_are_the_hard_stop():
    run = execution(Deps(proposal()))
    run.agent_attempts = 3
    assert not run._agent_available()
    assert run.repair_agent() == "blocked"
    assert run.agent_evidence[-1]["outcome"] == "stopped" and "3" in run.stop_note


def test_the_agent_flag_off_keeps_the_ladder_routing(monkeypatch):
    monkeypatch.delenv("AI_BOARD_MODEL_REPAIR", raising=False)
    run = execution(Deps(proposal()))
    assert not run._agent_available()


def test_repair_check_routes_to_the_agent_only_for_a_ladder_that_would_stop(monkeypatch):
    run = execution(Deps(proposal()))
    monkeypatch.setattr(run, "_repair_allowed", lambda last: False)
    assert run.repair_check() == "agent"
    run.gates[-1]["repair_action"] = progress.REPAIR_CODE
    assert run.repair_check() == "done"
