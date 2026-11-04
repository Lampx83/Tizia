"""Strategy registry: ordered ladder per failure class, forbidden actions, retry on changed input."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from runtime import progress  # noqa: E402
import worker  # noqa: E402

ON = {"AI_BOARD_PROGRESS_LOOP": "1"}


def test_the_registry_maps_each_failure_class_to_an_ordered_ladder():
    assert progress.choose("syntax", env=ON)["action"] == progress.REPAIR_CODE
    assert progress.choose("scope", env=ON)["action"] == progress.CHANGE_FILE
    assert progress.choose("grounding", env=ON)["action"] == progress.REPLAN
    assert progress.choose("plan_inconsistent", env=ON)["action"] == progress.REPLAN
    assert progress.choose("infra_transient", env=ON)["action"] == progress.RETRY
    assert progress.choose("budget", env=ON)["action"] == progress.REQUEST_ELEVATION
    assert progress.choose("unknown", env=ON)["action"] == progress.REPAIR_CODE


def test_the_ladder_moves_on_after_the_action_was_tried():
    assert progress.choose("syntax", tried=["repair_code"], env=ON)["action"] == progress.CHANGE_FILE
    assert progress.choose("syntax", tried=["repair_code", "change_file"], env=ON)["action"] == progress.REPLAN
    assert progress.choose("syntax", tried=["repair_code", "change_file", "replan", "stop_admin"], env=ON) is None


def test_a_forbidden_action_never_runs(monkeypatch):
    monkeypatch.setitem(progress.ACTIONS, "syntax", ("edit_ai_board", "repair_code"))
    assert progress.choose("syntax", env=ON)["action"] == progress.REPAIR_CODE


def test_a_changed_input_clears_the_tried_strategies():
    window = progress.Window()
    window.allow_strategy("signature-a")
    window.tried.append("repair_code")
    window.allow_strategy("signature-a")
    assert window.tried == ["repair_code"]
    window.allow_strategy("signature-b")
    assert window.tried == []


def test_splitting_stops_at_the_contract_child_cap():
    assert progress.can_split(0, env={}) and progress.can_split(1, env={})
    assert not progress.can_split(2, env={})


class Ticks:
    units = 0
    retries = 0
    max_retries = 1

    def tick(self):
        return True

    def spend(self, _name):
        pass


def _verdict(monkeypatch):
    monkeypatch.setattr(worker, "REPAIR_REPLAN", {"enabled": True, "max_repairs": 4, "no_progress_rounds": 99})
    monkeypatch.setattr(worker, "MAX_REPAIRS", 4)
    plan = {"capabilities": ["public.ui"],
            "steps": [{"order": 1, "title": "a", "allowed_scope": ["public/js/campus/building.js"],
                       "tests": ["t"], "risk": "low"}]}

    def run_gate(gate, _request, _deps, _budget, state):
        base = {"gate": gate, "blocked": False, "reason": None}
        if gate == 3:
            state["diffs"] = [{"diff": "changed body"}]
            state["produced"] = {"public/js/campus/building.js": {"test_file": "test/b.js"}}
        if gate == 4:
            base.update(blocked=True, reason="ghi ngoài scope: public/x.js", failure_class="ordinary")
        if gate == 5.5:
            base.update(risk_level="low")
        return base

    return worker.execute_pre_pr(plan, ticket_id=7, checkout_source="unused", deps=object(), budget=Ticks(),
                                 run_gate=run_gate, cleanup=lambda *_a, **_k: None)


def test_a_scope_failure_tries_a_new_target_before_the_admin(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PROGRESS_LOOP", raising=False)
    assert _verdict(monkeypatch)["repairs"] == []


def test_with_the_flag_on_a_scope_failure_repairs_before_stopping(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROGRESS_LOOP", "1")
    result = _verdict(monkeypatch)
    assert result["repairs"], "the ladder changes target instead of stopping at once"
    assert result["strategy"] == progress.CHANGE_FILE
