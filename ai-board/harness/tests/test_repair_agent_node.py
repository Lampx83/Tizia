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


def visual_result(tmp_path, monkeypatch, *, shots=1, max_images=None):
    """Full gate-5 result with captured shots in the run's own capture dir; limits narrow the image cap."""
    from runtime import repair_agent as agent
    (tmp_path / (agent.SHOT_DIR + "x")).mkdir()
    records = []
    for index in range(shots):
        path = tmp_path / (agent.SHOT_DIR + "x") / f"after-{index}-1280.png"
        path.write_bytes(b"png-" + bytes(str(index), "ascii"))
        records.append({"phase": "after", "page": f"/page{index}.html", "width": 1280, "path": str(path)})
    monkeypatch.setattr(agent.tempfile, "gettempdir", lambda: str(tmp_path))
    if max_images is not None:
        original = worker.repair_agent_limits
        monkeypatch.setattr(worker, "repair_agent_limits", lambda env=None: {**original(env), "max_images": max_images})
    return {"gate": 5, "blocked": True, "failure_class": "ordinary",
            "reason": "giao diện tệ hơn bản trước — /page0.html 1280px: tương phản 2.1 < 3.0",
            "evidence": {"text": "Cổng ảnh: tương phản kém", "screenshots": records}}


def test_a_visual_failure_sends_the_screenshots_as_image_parts_and_records_only_counts(tmp_path, monkeypatch):
    deps = Deps(proposal())
    run = execution(deps)
    run.last_result = visual_result(tmp_path, monkeypatch, shots=2)
    assert run.repair_agent() == "passed"
    images = deps.calls[0]["extra"]["images"]
    assert [image["mime"] for image in images] == ["image/png", "image/png"]
    assert all(image["b64"] for image in images)
    assert run.agent_evidence[-1]["images"] == [
        {"page": "/page0.html", "width": 1280, "phase": "after"},
        {"page": "/page1.html", "width": 1280, "phase": "after"}]
    assert "b64" not in json.dumps(run.agent_evidence)
    assert "Ảnh đính kèm: 2 ảnh chụp AFTER của trang /page0.html, /page1.html." in deps.calls[0]["prompt"]
    from runtime import repair_agent as agent
    assert len(deps.calls[0]["prompt"]) <= len(agent.PROMPT) + 6000 - 2 * agent.IMAGE_CHARS


def test_a_non_visual_failure_sends_no_images(tmp_path, monkeypatch):
    deps = Deps(proposal())
    run = execution(deps)
    run.last_result = visual_result(tmp_path, monkeypatch, shots=2)
    run.last_result["reason"] = "node --check lỗi"
    assert run.repair_agent() == "passed"
    assert "extra" not in deps.calls[0] and "images" not in json.dumps(run.agent_evidence)


def test_the_contract_image_cap_bounds_what_the_agent_sends(tmp_path, monkeypatch):
    deps = Deps(proposal())
    run = execution(deps)
    run.last_result = visual_result(tmp_path, monkeypatch, shots=2, max_images=1)
    assert run.repair_agent() == "passed"
    assert len(deps.calls[0]["extra"]["images"]) == 1 and len(run.agent_evidence[-1]["images"]) == 1


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


def transient_run(deps, monkeypatch):
    run = execution(deps)
    result = {"gate": 5, "blocked": True, "failure_class": "transient", "reason": "mạng lỗi tạm thời",
              "evidence": {"text": ""}}
    run.last_result = result
    run.gates[-1] = {**run.gates[-1], **result}
    return run


def test_diagnose_off_keeps_the_ladder_routing_an_infra_failure(monkeypatch):
    monkeypatch.delenv("AI_BOARD_REPAIR_DIAGNOSE", raising=False)
    deps = Deps(proposal())
    run = transient_run(deps, monkeypatch)
    assert "agent" in [run.repair_check() for _ in range(3)]


def test_diagnose_on_never_routes_an_infra_failure_to_the_agent(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_DIAGNOSE", "1")
    deps = Deps(proposal())
    run = transient_run(deps, monkeypatch)
    assert "agent" not in [run.repair_check() for _ in range(3)]
    assert deps.calls == []


def test_diagnose_on_routes_a_quality_failure_to_the_agent(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_DIAGNOSE", "1")
    run = execution(Deps(proposal()))
    monkeypatch.setattr(run, "_repair_allowed", lambda last: False)
    run.gates[-1]["repair_class"] = "test_assertion"
    run.gates[-1]["repair_action"] = progress.STOP_ADMIN
    assert run.repair_check() == "agent"


def test_diagnose_on_records_the_diagnosis_with_class_and_gate(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_DIAGNOSE", "1")
    run = execution(Deps(proposal()))
    run.gates[-1]["repair_class"] = "test_assertion"
    assert run.repair_agent() == "passed"
    record = run.agent_evidence[-1]
    assert record["outcome"] == "applied"
    assert record["diagnosis"] == "selector lệch"
    assert record["failure_class"] == "test_assertion" and record["gate"] == 5


def test_diagnose_on_records_the_diagnosis_of_a_denied_scope_edit(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_DIAGNOSE", "1")
    run = execution(Deps(proposal(changes=[{"file": "public/js/other.js", "search": "x", "replace": "y"}])))
    assert run.repair_agent() == "blocked"
    record = run.agent_evidence[-1]
    assert record["outcome"] == "denied" and record["diagnosis"] == "selector lệch"


def test_diagnose_off_adds_no_diagnosis_fields(monkeypatch):
    monkeypatch.delenv("AI_BOARD_REPAIR_DIAGNOSE", raising=False)
    run = execution(Deps(proposal()))
    assert run.repair_agent() == "passed"
    assert "diagnosis" not in run.agent_evidence[-1]
