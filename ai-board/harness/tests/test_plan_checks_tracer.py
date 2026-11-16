"""Check do plan (LF/213, LF/214): soát tham số ở gate 2.5; gate 5 đỏ→xanh base/candidate; cờ tắt thì không đổi gì."""
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
    """_restore_base flips the served page from candidate to base; base is known and has every page."""
    mode = {"base": False}

    def restore(state, checkout, pages, cp):
        mode["base"] = True
        return set()
    monkeypatch.setattr(verify, "_restore_base", restore)
    return mode


def serve(monkeypatch, mode, base, candidate, *, dom=None):
    """base/candidate: (status, body). dom: (base_dom, candidate_dom) answered by the DOM probe."""
    def probe(url, *, token=None):
        return base if mode["base"] else candidate
    monkeypatch.setattr(verify, "probe_http", probe)
    if dom is not None:
        monkeypatch.setattr(verify, "probe_dom", lambda url, selector, prop: dom[1] if not mode["base"] else dom[0])


def run_checks(tmp_path, items, acceptance=None, *, runner=None, files=None):
    root = make_checkout(tmp_path)
    for name, content in (files or {}).items():
        (root / name).write_text(content, encoding="utf-8")
    state = make_state(root, visual=True)
    state["plan"] = {"subtasks": [{"file": "public/x.html", "checks": items}]}
    if acceptance is not None:
        state["acceptance"] = acceptance
    state["base_sha"] = "abc"
    return verify.run(state, runner=runner or FakeRunner())


def test_problem_rejects_unknown_primitive_bad_params_and_unsafe_path():
    assert checks.problem({"primitive": "click_then_expect", "path": "/x", "text": "a"}).startswith("primitive lạ")
    assert "tham số" in checks.problem({"primitive": "text_present", "path": "/x", "text": "a", "extra": 1})
    assert "path không hợp lệ" in checks.problem({**TEXT, "path": "x.html"})
    assert "path không hợp lệ" in checks.problem({**TEXT, "path": "/../etc/passwd"})
    assert "path không hợp lệ" in checks.problem({**TEXT, "path": "//evil.example/x"})
    assert "text không hợp lệ" in checks.problem({**TEXT, "text": "x" * (checks.MAX_TEXT + 1)})
    assert checks.problem(TEXT) is None


def test_problem_checks_each_primitive_parameter_shape():
    ok = [{"primitive": "http_status", "path": "/x.html", "status": 404},
          {"primitive": "selector_exists", "path": "/x.html", "selector": "#buy"},
          {"primitive": "computed_style", "path": "/x.html", "selector": "h1", "prop": "color", "value": "red"},
          {"primitive": "api_json", "path": "/api/x", "key": "ok", "value": "yes"},
          {"primitive": "node_test", "file": "test/checked.test.js"},
          {"primitive": "text_absent", "path": "/x.html", "text": "Cũ"}]
    assert [checks.problem(item) for item in ok] == [None] * len(ok)
    bad = [{"primitive": "http_status", "path": "/x.html", "status": True},          # bool là int trong Python
           {"primitive": "http_status", "path": "/x.html", "status": 99},
           {"primitive": "computed_style", "path": "/x.html", "selector": "h1", "prop": "Color", "value": "red"},
           {"primitive": "node_test", "file": "/abs/test.js"},
           {"primitive": "node_test", "file": "test/x.ts"},
           {"primitive": "node_test", "file": "../x.test.js"},
           {"primitive": "api_json", "path": "/api/x", "key": "ok"}]
    assert all(checks.problem(item) for item in bad)


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
    serve(monkeypatch, base_mode, (200, BASE_PAGE), (200, CANDIDATE))
    out = run_checks(tmp_path, [TEXT])
    assert out["blocked"] is False
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF
    assert out["evidence"]["functional"].get("needs_review") is None


def test_green_on_base_is_ignored_so_nothing_distinguishes_needs_review(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, BASE_PAGE + b"Chu moi\n"), (200, CANDIDATE))
    out = run_checks(tmp_path, [TEXT])
    assert out["blocked"] is False
    assert out["evidence"]["checks"]["verdict"] == checks.NONE
    assert out["evidence"]["functional"]["needs_review"] is True


def test_red_on_both_blocks_as_ordinary_failure(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, BASE_PAGE), (200, b"<h1>changed</h1>\n"))
    out = run_checks(tmp_path, [TEXT])
    assert out["blocked"] is True and "check đỏ trên cả base lẫn candidate" in out["reason"]
    assert out["failure_class"] == verify.STAGE_CLASS["ordinary"]


def test_route_check_without_base_is_needs_review_not_proof(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, b"nope"), (200, CANDIDATE))
    out = run_checks(tmp_path, [{**TEXT, "path": "/api/x"}])
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE


def test_flag_off_leaves_gate5_evidence_and_probes_unchanged(tmp_path, monkeypatch, pages):
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    seen = []
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: seen.append(url) or (200, CANDIDATE))
    out = run_checks(tmp_path, [TEXT])
    assert out["blocked"] is False and "checks" not in out["evidence"]
    assert len(seen) == 1  # only the page loop probes; the check phase is off


def test_acceptance_commands_still_run_unchanged_with_flag_on(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, BASE_PAGE), (200, CANDIDATE))
    runner = FakeRunner()
    out = run_checks(tmp_path, [TEXT], acceptance=["bash scripts/acceptance.sh"], runner=runner)
    assert out["blocked"] is False
    sh = [args for args, _ in runner.calls if "sh" in args and "-lc" in args]
    assert sh and sh[0][-1] == "bash scripts/acceptance.sh"


# LF/214: mỗi primitive đỏ→xanh qua gate 5 với probe giả.

def test_http_status_red_on_base_green_on_candidate(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (404, b"gone\n"), (200, CANDIDATE))
    out = run_checks(tmp_path, [{"primitive": "http_status", "path": "/x.html", "status": 200}])
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_text_absent_red_on_base_green_on_candidate(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, b"<h1>cu</h1>\nChu cu\n"), (200, CANDIDATE))
    out = run_checks(tmp_path, [{"primitive": "text_absent", "path": "/x.html", "text": "Chu cu"}])
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_api_json_red_on_base_green_on_candidate(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, b'{"ok": "no"}\n'), (200, b'{"ok": "yes"}\n'))
    out = run_checks(tmp_path, [{"primitive": "api_json", "path": "/x.html", "key": "ok", "value": "yes"}],
                     files={"public/x.html": '{"ok": "yes"}\n'})
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_selector_exists_red_on_base_green_on_candidate(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, CANDIDATE), (200, CANDIDATE), dom=((False, None), (True, None)))
    out = run_checks(tmp_path, [{"primitive": "selector_exists", "path": "/x.html", "selector": "#buy"}])
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_computed_style_red_on_base_green_on_candidate(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, CANDIDATE), (200, CANDIDATE), dom=((True, "blue"), (True, "red")))
    out = run_checks(tmp_path, [{"primitive": "computed_style", "path": "/x.html", "selector": "h1", "prop": "color",
                                 "value": "red"}])
    assert out["evidence"]["checks"]["verdict"] == checks.PROOF and out["blocked"] is False


def test_node_test_passing_on_candidate_has_no_base_so_needs_review(tmp_path, monkeypatch, flag_on, pages, base_mode):
    serve(monkeypatch, base_mode, (200, CANDIDATE), (200, CANDIDATE))
    out = run_checks(tmp_path, [{"primitive": "node_test", "file": "test/checked.test.js"}],
                     files={"test/checked.test.js": "// checked\n"})
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE
    assert out["evidence"]["functional"]["needs_review"] is True


def test_node_test_red_on_candidate_without_base_is_needs_review_not_block(tmp_path, monkeypatch, flag_on, pages):
    class Red(FakeRunner):
        def __call__(self, args, **kwargs):
            if "/app/test/checked.test.js" in args:
                raise RuntimeError("node --test exit 1")
            return super().__call__(args, **kwargs)
    monkeypatch.setattr(verify, "_restore_base", lambda *_: set())
    monkeypatch.setattr(verify, "probe_http", lambda url, *, token=None: (200, CANDIDATE))
    out = run_checks(tmp_path, [{"primitive": "node_test", "file": "test/checked.test.js"}], runner=Red(),
                     files={"test/checked.test.js": "// checked\n"})
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE
    assert out["evidence"]["checks"]["rows"][0]["candidate"] is False
