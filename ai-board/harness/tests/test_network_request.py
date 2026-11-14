"""Network request queue: tool loop pauses, resumes with admin decision, eval auto-deny; missing-package detector."""
import pytest

import tools
from runtime import network_request, repair_class, tool_loop
from runtime.budget import Budget
from test_tool_checkpoint import MemSteps
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps

ASK = {"tool": "request_package", "arguments": {"name": "lodash", "version_range": "^4", "reason": "chunk helper"}}
FETCH = {"tool": "fetch_url", "arguments": {"url": "https://docs.example.com/api", "reason": "read api"}}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


def loop(script, queue, store=None, budget=None):
    deps = Deps(script)
    deps.network = queue
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget or Budget(), model="m", source=".", sha="abc",
                                check=lambda out: None, store=store)
    return out, deps


def test_manifest_declares_both_tools_and_they_are_not_write_tools():
    for name in network_request.TOOLS:
        assert tool_loop.MANIFEST.tools[name].effect == "control" and name not in tool_loop.WRITE_TOOLS


def test_undecided_request_pauses_the_run_and_queues_the_request():
    queue = network_request.Queue()
    out, deps = loop([ASK], queue, MemSteps())
    assert (out["status"], out["failure_class"]) == ("paused", "network_request")
    [request] = out["network"]["pending"]
    assert request["kind"] == "package" and request["name"] == "lodash" and request["version_range"] == "^4"
    assert len(deps.prompts) == 1


@pytest.mark.parametrize("decision, seen", [
    ({"decision": "approved"}, "broker unavailable"),
    ({"decision": "rejected", "reason": "too heavy"}, "denied: too heavy"),
])
def test_decision_resumes_from_checkpoint_and_the_model_sees_the_outcome(decision, seen):
    shared = {"pins": None, "ledger": None, "steps": {}}
    first, _ = loop([ASK], network_request.Queue(), MemSteps(shared=shared))
    call_id = first["network"]["pending"][0]["call_id"]
    queue = network_request.Queue({call_id: decision})
    out, deps = loop([EDIT, TEST, FINISH], queue, MemSteps(shared=shared))
    assert out["status"] == "proposed"
    assert "TOOL RESULT request_package" in deps.prompts[0] and seen in deps.prompts[0]
    assert queue.pending == []


def test_still_undecided_resume_pauses_again_without_a_model_call():
    shared = {"pins": None, "ledger": None, "steps": {}}
    loop([FETCH], network_request.Queue(), MemSteps(shared=shared))
    out, deps = loop([EDIT], network_request.Queue(), MemSteps(shared=shared))
    assert out["failure_class"] == "network_request" and out["network"]["pending"][0]["kind"] == "fetch_url"
    assert deps.prompts == []


def test_eval_mode_auto_denies_without_pausing_and_counts():
    queue = network_request.Queue(eval_mode=True)
    out, deps = loop([ASK, FETCH, EDIT, TEST, FINISH], queue)
    assert out["status"] == "proposed" and queue.auto_denied == 2 and queue.pending == []
    assert network_request.EVAL_REASON in deps.prompts[1]


def test_no_queue_means_denied_observation():
    deps = Deps([ASK, EDIT, TEST, FINISH])
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc", check=lambda o: None)
    assert out["status"] == "proposed" and network_request.NO_QUEUE_REASON in deps.prompts[1]


def test_invalid_request_arguments_are_a_tool_error_not_a_request():
    queue = network_request.Queue()
    bad = {"tool": "request_package", "arguments": {"name": "lodash"}}
    out, deps = loop([bad, EDIT, TEST, FINISH], queue)
    assert out["status"] == "proposed" and queue.pending == []


MISSING = "Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'lodash' imported from /app/public/js/a.js"


@pytest.mark.parametrize("text, name", [
    ("Error: Cannot find module 'lodash'", "lodash"),
    (MISSING, "lodash"),
    ("Cannot find module '@scope/pkg/sub'", "@scope/pkg"),
    ("Cannot find module '/app/server/x.js'", None),
    ("Cannot find module './util'", None),
    ("Cannot find module 'node:fs'", None),
    ("Cannot find module 'express'", None),
    ("Cannot find module 'fs'", None),
    ("Cannot find module 'public/js/x'", None),
])
def test_detector_names_only_real_packages(text, name):
    assert network_request.missing_package(text, {"public/js/a.js"}) == name


def test_missing_package_is_stop_admin_package_request_not_replan():
    result = {"gate": 4, "reason": "node --test failed", "failure_class": "ordinary", "evidence": {"text": MISSING}}
    out = repair_class.classify(result, {}, {"public/js/a.js"})
    assert (out["class"], out["action"], out["package"]) == ("package_request", "stop_admin", "lodash")


def test_missing_plan_path_still_replans_and_decided_package_goes_back_to_repair():
    path = {"reason": "x", "evidence": {"text": "Cannot find module '/app/server/new.js'"}}
    assert repair_class.classify(path, {}, set())["action"] == "replan"
    pkg = {"reason": "x", "evidence": {"text": MISSING}}
    assert repair_class.classify(pkg, {}, set(), settled={"lodash"})["action"] == "repair_code"


def _execution(queue):
    from test_gate_feedback_cap import _execution
    execution = _execution()
    execution.deps = type("Deps", (), {"network": queue})()
    return execution


def _fail(execution, text=MISSING):
    result = {"gate": 4, "blocked": True, "reason": "node --test failed", "failure_class": "ordinary", "risk_level": "low",
              "evidence": {"text": text}}
    execution.gates.append(result)
    execution.last_result = result
    execution.state = {"diffs": [{"diff": "+ x"}]}
    return execution.repair_check()


def test_missing_package_stops_the_run_for_admin_instead_of_replanning():
    queue = network_request.Queue()
    execution = _execution(queue)
    assert _fail(execution) == "done"
    assert execution.kind == "network_request" and execution.repairs == []
    assert queue.pending[0]["call_id"] == "pkg:lodash"


def test_paused_run_keeps_its_checkpoint_and_reports_the_requests():
    queue = network_request.Queue()
    execution = _execution(queue)
    purged = []
    execution.checkpoint = type("Checkpoint", (), {"purge": lambda self: purged.append(1)})()
    _fail(execution)
    execution.verdict()
    assert purged == []
    assert execution.result["failure_class"] == "network_request"
    assert execution.result["network_requests"]["pending"][0]["name"] == "lodash"


@pytest.mark.parametrize("decision, seen", [
    ({"decision": "rejected", "reason": "not needed"}, "denied: not needed"),
    ({"decision": "approved"}, "broker unavailable"),
])
def test_decided_package_goes_back_to_repair_with_the_outcome_in_the_reason(decision, seen):
    queue = network_request.Queue({"pkg:lodash": decision})
    execution = _execution(queue)
    assert _fail(execution) == "repair"
    assert seen in execution.repair_reason and execution.kind == "ordinary"
    assert _fail(execution) == "repair"


def test_eval_mode_never_pauses_and_counts_each_package_once():
    queue = network_request.Queue(eval_mode=True)
    execution = _execution(queue)
    assert _fail(execution) == "repair" and _fail(execution) == "repair"
    assert queue.auto_denied == 1 and queue.pending == []


@pytest.mark.parametrize("test_text, host", [
    ("await fetch('https://api.scoreup.vn/quiz')", "api.scoreup.vn"),
    ("axios.get(`https://codelab.example.com/run`)", "codelab.example.com"),
    ("await fetch('http://localhost:8041/api/x')", None),
    ("await fetch('http://127.0.0.1:3000/')", None),
    ("await fetch('http://stub.test/x')", None),
    ("const base = 'https://example.com'; // no call", None),
])
def test_tests_calling_real_external_apis_are_refused(test_text, host):
    assert network_request.real_api_call(test_text) == host


def test_snapshot_decisions_reach_the_execution_as_a_queue(monkeypatch):
    import worker
    import worker_execution
    from runtime.pipeline import Deps
    seen = {}

    class Capture:
        def __init__(self, plan, **kwargs):
            seen["deps"] = kwargs["deps"]

        def run(self):
            return {}
    monkeypatch.setattr(worker_execution, "_Execution", Capture)
    decisions = {"pkg:lodash": {"decision": "rejected", "reason": "no"}}
    worker.execute_pre_pr({}, ticket_id=1, checkout_source=".", deps=Deps(models=None, notify=None), budget=None, run_gate=None,
                          cleanup=None, checkpoint=object(), network_decisions=decisions)
    assert seen["deps"].network.decisions == decisions and not seen["deps"].network.eval_mode


def test_suite_deps_auto_deny_and_count():
    from evaluation.suite import trial
    from runtime.pipeline import Deps
    deps = trial.recording(Deps(models=None, notify=None))
    assert deps.network.eval_mode and deps.network.observe(network_request.package_request("x")).startswith("denied:")
    assert deps.network.auto_denied == 1


def test_resume_in_a_new_run_finds_the_decision_and_does_not_charge_the_wait(monkeypatch):
    import time
    from types import SimpleNamespace

    class DropsCallId(MemSteps):
        def load(self):
            saved = super().load()
            return {**saved, "steps": [{**row, "call_id": None} for row in saved["steps"]]}

    shared = {"pins": None, "ledger": None, "steps": {}}
    first_deps = Deps([ASK])
    first_deps.network, first_deps.trace = network_request.Queue(), SimpleNamespace(run_id=1, attempt=0)
    first = tool_loop.run_subtask(SUBTASK, PAGE, deps=first_deps, budget=Budget(), model="m", source=".", sha="abc",
                                  check=lambda out: None, store=DropsCallId(shared=shared))
    assert first["failure_class"] == "network_request"
    paused_elapsed = shared["ledger"]["elapsed_s"]
    real = time.monotonic
    monkeypatch.setattr(time, "monotonic", lambda: real() + 100_000)
    decided = network_request.Queue({first["network"]["pending"][0]["call_id"]: {"decision": "rejected", "reason": "no"}})
    deps = Deps([EDIT, TEST, FINISH])
    deps.network, deps.trace = decided, SimpleNamespace(run_id=2, attempt=0)
    budget = Budget(started_at=real() + 100_000)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model="m", source=".", sha="abc",
                                check=lambda out: None, store=DropsCallId(shared=shared))
    assert out["status"] == "proposed", out["reason"]
    assert "denied: no" in deps.prompts[0]
    assert budget.elapsed_s < paused_elapsed + 5


def test_identical_requests_share_one_key():
    one = network_request.tool_request("fetch_url", {"url": "https://a.test/x", "reason": "r"})
    two = network_request.tool_request("fetch_url", {"reason": "r", "url": "https://a.test/x"})
    assert one["call_id"] == two["call_id"] != network_request.tool_request("fetch_url", {"url": "https://a.test/y", "reason": "r"})["call_id"]
