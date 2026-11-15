"""Check do plan (LF/213): gate 2.5 soát tham số; gate 5 đỏ→xanh base/candidate; cờ tắt thì không đổi gì."""
import pytest

from gates import verify
from verification import checks
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state

BASE_PAGE = b"<h1>cu</h1>\n"
CANDIDATE = b"<h1>changed</h1>\nChu moi\n"
TEXT = {"primitive": "text_present", "path": "/x.html", "text": "Chu moi"}


@pytest.fixture
def flag_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")


@pytest.fixture
def pages(monkeypatch):
    from verification import functional
    monkeypatch.setattr(verify, "_shot_pages", lambda *_: [])
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.QUEUE_PROBE, "passed": True})


@pytest.fixture
def base_mode(monkeypatch):
    """_restore_base flips the served body from candidate to base; base is known and has every page."""
    mode = {"base": False}

    def restore(state, checkout, pages, cp):
        mode["base"] = True
        return set()
    monkeypatch.setattr(verify, "_restore_base", restore)
    return mode


def serve(monkeypatch, mode, base_body, candidate_body):
    def probe(url, *, token=None):
        return 200, (base_body if mode["base"] else candidate_body)
    monkeypatch.setattr(verify, "probe_http", probe)


def with_checks(state, items, acceptance=None):
    state["plan"] = {"subtasks": [{"file": "public/x.html", "checks": items}]}
    if acceptance is not None:
        state["acceptance"] = acceptance
    return state


def test_problem_rejects_unknown_primitive_bad_params_and_unsafe_path():
    assert checks.problem({"primitive": "click_then_expect", "path": "/x", "text": "a"}).startswith("primitive lạ")
    assert "tham số" in checks.problem({"primitive": "text_present", "path": "/x", "text": "a", "extra": 1})
    assert checks.problem({**TEXT, "path": "x.html"}).startswith("path không hợp lệ")
    assert checks.problem({**TEXT, "path": "/../etc/passwd"}).startswith("path không hợp lệ")
    assert checks.problem({**TEXT, "path": "//evil.example/x"}).startswith("path không hợp lệ")
    assert checks.problem({**TEXT, "text": "x" * (checks.MAX_TEXT + 1)}).startswith("text phải")
    assert checks.problem(TEXT) is None


def test_plan_problems_names_the_step_and_cap():
    plan = {"subtasks": [{"file": "a", "checks": [TEXT]}, {"file": "b", "checks": [{**TEXT, "path": "bad"}]},
                         {"file": "c", "checks": [TEXT] * (checks.MAX_CHECKS + 1)}]}
    issues = checks.plan_problems(plan)
    assert issues[0].startswith("bước 2:") and issues[1].startswith("bước 3: checks phải là danh sách")


def test_gate25_rejects_bad_check_only_with_flag_on(flag_on):
    from gates import plan_validate
    from runtime.budget import Budget
    from conftest import FakeModels, deps_with
    from test_gate_2_5_plan_validate import _plan_with_steps
    plan = _plan_with_steps(2)
    plan["subtasks"][0]["checks"] = [{"primitive": "shell", "path": "/x", "text": "a"}]
    models = FakeModels(plan)
    out = plan_validate.run({"subject": "x"}, deps_with(models), Budget(), {"plan": plan})
    assert out["blocked"] and out["outcome"] == "plan_unfit" and models.calls == []


def test_gate25_ignores_checks_with_flag_off(monkeypatch):
    from gates import plan_validate
    from runtime.budget import Budget
    from conftest import FakeModels, deps_with
    from test_gate_2_5_plan_validate import _plan_with_steps
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    plan = _plan_with_steps(2)
    plan["subtasks"][0]["checks"] = [{"primitive": "shell", "path": "/x", "text": "a"}]
    models = FakeModels(plan)
    out = plan_validate.run({"subject": "x"}, deps_with(models), Budget(), {"plan": plan})
    assert out.get("outcome") != "plan_unfit"


def test_red_on_base_green_on_candidate_is_proof_in_evidence(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, BASE_PAGE, CANDIDATE)
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [TEXT])
    state["base_sha"] = "abc"
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF
    assert out["evidence"]["functional"].get("needs_review") is None


def test_green_on_base_is_ignored_so_nothing_distinguishes_needs_review(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, BASE_PAGE + b"Chu moi\n", CANDIDATE)
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [TEXT])
    state["base_sha"] = "abc"
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False
    assert out["evidence"]["checks"]["verdict"] == checks.NONE
    assert out["evidence"]["functional"]["needs_review"] is True


def test_red_on_both_blocks_as_ordinary_failure(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, BASE_PAGE, b"<h1>changed</h1>\n")
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [TEXT])
    state["base_sha"] = "abc"
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is True and "check đỏ trên cả base lẫn candidate" in out["reason"]
    assert out["failure_class"] == verify.STAGE_CLASS["ordinary"]


def test_route_check_without_base_is_needs_review_not_proof(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, b"nope", CANDIDATE)
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [{**TEXT, "path": "/api/x"}])
    state["base_sha"] = "abc"
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE


def test_flag_off_leaves_gate5_evidence_and_probes_unchanged(tmp_path, monkeypatch, pages):
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    seen = []
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: seen.append(url) or (200, CANDIDATE))
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [TEXT])
    out = verify.run(state, runner=FakeRunner())
    assert out["blocked"] is False and "checks" not in out["evidence"]
    assert len(seen) == 1  # only the page loop probes; the check phase is off


def test_acceptance_commands_still_run_unchanged_with_flag_on(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, BASE_PAGE, CANDIDATE)
    runner = FakeRunner()
    state = with_checks(make_state(make_checkout(tmp_path), visual=True), [TEXT],
                        acceptance=["bash scripts/acceptance.sh"])
    state["base_sha"] = "abc"
    out = verify.run(state, runner=runner)
    assert out["blocked"] is False
    sh = [args for args, _ in runner.calls if "sh" in args and "-lc" in args]
    assert sh and sh[0][-1] == "bash scripts/acceptance.sh"
