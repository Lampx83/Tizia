"""Gate 5 classifies each check red on base and candidate before any repair: candidate_wrong, check_suspect or infra."""
import subprocess
import urllib.error

import pytest

from gates import verify
from runtime import repair_class
from verification import checks, functional, guest_inputs
from test_gate_5_verify import FakeRunner, checkout as make_checkout, state as make_state
from test_plan_checks_tracer import base_mode, pages, serve  # noqa: F401  (fixtures)

FLAG = "AI_BOARD_RED_CHECK_CLASSIFY"
PAGE = b"<h1>changed</h1>\n"
STYLE = {"primitive": "computed_style", "path": "/x.html", "selector": "h1", "prop": "color", "value": "#ff0000"}
REQUEST = "Đổi màu chữ h1 thành #FF0000"
STYLE_DIFF = "diff --git a/public/x.css b/public/x.css\n--- a/public/x.css\n+++ b/public/x.css\n-h1 { color: blue; }\n+h1 { color: #ff0000; }\n"


def diff(*added, removed=()):
    body = "".join(f"-{line}\n" for line in removed) + "".join(f"+{line}\n" for line in added)
    return f"diff --git a/public/x.js b/public/x.js\n--- a/public/x.js\n+++ b/public/x.js\n{body}"


@pytest.fixture
def both(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.setenv(FLAG, "1")


def run(tmp_path, items, *, request=REQUEST, full_diff=STYLE_DIFF, runner=None, files=None):
    root = make_checkout(tmp_path)
    for name, content in (files or {}).items():
        (root / name).write_text(content, encoding="utf-8")
    state = make_state(root, visual=True)
    state["plan"] = {"subtasks": [{"file": "public/x.html", "checks": items}]}
    state.update(base_sha="abc", request_detail=request, full_diff=[{"file": "public/x.css", "diff": full_diff}])
    return verify.run(state, runner=runner or FakeRunner())


# Pure rules.

def test_value_from_request_present_in_added_lines_is_suspect():
    assert checks.suspect(STYLE, REQUEST, STYLE_DIFF)
    assert checks.suspect({"primitive": "text_present", "path": "/x.html", "text": "Liên hệ"}, "Thêm 'Liên hệ'",
                          diff("el.textContent = 'Liên hệ'"))


def test_value_missing_from_diff_or_request_is_candidate_wrong():
    assert checks.suspect(STYLE, REQUEST, diff("h1 { color: blue; }")) is None
    # the model writes both the check and the code: a literal only in the diff proves nothing
    assert checks.suspect(STYLE, "Đổi màu chữ h1", STYLE_DIFF) is None
    assert checks.suspect(STYLE, "", STYLE_DIFF) is None and checks.suspect(STYLE, REQUEST, "") is None


def test_text_case_is_not_folded_but_css_value_is():
    text = {"primitive": "text_present", "path": "/x.html", "text": "Chu Moi"}
    assert checks.suspect(text, "Thêm 'Chu Moi'", diff("chu moi")) is None
    assert checks.suspect(STYLE, REQUEST.lower(), STYLE_DIFF.upper())


def test_text_absent_is_suspect_only_when_the_diff_removed_it_and_never_adds_it():
    absent = {"primitive": "text_absent", "path": "/x.html", "text": "Quang cao"}
    assert checks.suspect(absent, "Xóa 'Quang cao'", diff("x", removed=["<p>Quang cao</p>"]))
    assert checks.suspect(absent, "Xóa 'Quang cao'", diff("<b>Quang cao</b>", removed=["<p>Quang cao</p>"])) is None
    assert checks.suspect(absent, "Xóa 'Quang cao'", diff("x")) is None


def test_selector_matches_its_bare_name_and_status_or_node_checks_are_never_suspect():
    selector = {"primitive": "selector_exists", "path": "/x.html", "selector": ".promo"}
    assert checks.suspect(selector, "Thêm khối .promo", diff('<div class="promo">'))
    assert checks.suspect({"primitive": "http_status", "path": "/x.html", "status": 200}, "200", diff("200")) is None
    assert checks.suspect({"primitive": "node_test", "file": "test/a.test.js"}, "a", diff("a")) is None


def test_malformed_check_is_suspect():
    assert "sai dạng" in checks.suspect({**STYLE, "prop": "Color"}, REQUEST, "")


# Gate 5 branches.

def test_model_check_suspect_spends_no_repair_and_needs_review(tmp_path, monkeypatch, both, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE), dom=((True, "rgb(0, 0, 255)"), (True, "rgb(255, 0, 0)")))
    out = run(tmp_path, [STYLE])
    assert out["blocked"] is False and out["evidence"]["functional"]["needs_review"] is True
    row = out["evidence"]["checks"]["rows"][0]
    assert row["class"] == checks.CHECK_SUSPECT and row["origin"] == "plan" and row["suspect"]
    assert out["evidence"]["functional"]["check_suspect"] == [row["suspect"]]
    assert checks.CHECK_SUSPECT in out["evidence"]["text"]


def test_candidate_wrong_repairs_as_today(tmp_path, monkeypatch, both, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE), dom=((True, "rgb(0, 0, 255)"), (True, "rgb(0, 0, 255)")))
    out = run(tmp_path, [STYLE], full_diff=diff("h1 { font-weight: bold; }"))
    assert out["blocked"] is True and out["reason"] == "check đỏ trên cả base lẫn candidate: computed_style /x.html"
    assert out["failure_class"] == verify.STAGE_CLASS["ordinary"]
    assert out["evidence"]["checks"]["rows"][0]["class"] == checks.CANDIDATE_WRONG
    assert repair_class.classify(out, {}, set())["action"] == repair_class.REPAIR_CODE


def test_mixed_suspect_and_wrong_repairs_naming_only_the_wrong_check(tmp_path, monkeypatch, both, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE), dom=((True, "blue"), (True, "blue")))
    wrong = {"primitive": "text_present", "path": "/x.html", "text": "Mua ngay"}
    out = run(tmp_path, [STYLE, wrong])
    assert out["blocked"] is True and out["reason"] == "check đỏ trên cả base lẫn candidate: text_present /x.html"
    assert [row["class"] for row in out["evidence"]["checks"]["rows"]] == [checks.CHECK_SUSPECT, checks.CANDIDATE_WRONG]


def test_harness_check_suspect_stops_for_admin_without_repair(tmp_path, monkeypatch, pages, base_mode):
    monkeypatch.setenv("AI_BOARD_QUOTED_CHECKS", "1")
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.TEXT_PROBE, "passed": False,
                                                              "reason": "x", "coverage": {"rendered_text": True}})
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE))
    out = run(tmp_path, [], request="Thêm dòng 'Liên hệ: 0123' vào trang", full_diff=diff("el.textContent = 'Liên hệ: 0123'"))
    assert out["blocked"] is True and out["reason"].startswith(checks.SUSPECT_STOP)
    assert out["evidence"]["checks"]["rows"][0]["origin"] == "harness"
    assert repair_class.classify(out, {}, set()) == {"class": checks.CHECK_SUSPECT, "action": repair_class.STOP_ADMIN, "files": []}


def test_text_oracle_report_keeps_the_suspect_reason(tmp_path, monkeypatch, both, pages, base_mode):
    monkeypatch.setenv("AI_BOARD_QUOTED_CHECKS", "1")
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": functional.TEXT_PROBE, "passed": True,
                                                              "reason": None, "coverage": {"rendered_text": True}})
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE + b"Chu moi\n"), dom=((True, "blue"), (True, "blue")))
    out = run(tmp_path, [{**STYLE, "value": "#00ff00"}], request="Thêm 'Chu moi' vào trang, màu #00ff00",
              full_diff=diff("color: #00ff00"))
    functional_result = out["evidence"]["functional"]
    assert functional_result.get("report_only") is True, functional_result
    assert out["blocked"] is False and functional_result["needs_review"] is True and functional_result["check_suspect"]


class Missing(FakeRunner):
    """node exits 127 for the check's test file."""

    def __call__(self, args, **kwargs):
        if "/app/test/checked.test.js" in args:
            self.calls.append((args, kwargs))
            return subprocess.CompletedProcess(args, 127, "", "sh: node: not found")
        return super().__call__(args, **kwargs)


NODE = {"primitive": "node_test", "file": "test/checked.test.js"}


def test_node_test_tool_missing_is_infra_not_repair(tmp_path, monkeypatch, both, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE))
    out = run(tmp_path, [NODE], runner=Missing(), files={"test/checked.test.js": "// c\n"})
    assert out["blocked"] is True and out["failure_class"] == verify.STAGE_CLASS["tooling"]
    assert "hạ tầng" in out["reason"] and checks.INFRA in out["evidence"]["text"]
    assert repair_class.classify(out, {}, set())["action"] == repair_class.RETRY


def test_check_probe_network_error_is_infra(tmp_path, monkeypatch, both, pages, base_mode):
    calls = []

    def probe(url, *, token=None):
        calls.append(url)
        if len(calls) > 1:
            raise OSError("connection refused")
        return 200, PAGE
    monkeypatch.setattr(verify, "probe_http", probe)
    out = run(tmp_path, [STYLE])
    assert out["blocked"] is True and out["failure_class"] == verify.STAGE_CLASS["tooling"]


@pytest.fixture
def flag_off(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.delenv(FLAG, raising=False)


def test_check_probe_http_error_stays_a_candidate_failure(tmp_path, monkeypatch, both, pages, base_mode):
    calls = []

    def probe(url, *, token=None):
        calls.append(url)
        if len(calls) > 1:
            raise urllib.error.HTTPError(url, 500, "x", {}, None)
        return 200, PAGE
    monkeypatch.setattr(verify, "probe_http", probe)
    out = run(tmp_path, [STYLE])
    assert out["blocked"] is True and out["failure_class"] == verify.STAGE_CLASS["ordinary"]


def test_suspect_stop_spends_no_repair_in_the_loop(monkeypatch):
    from test_repair_broken_check import _check
    import worker_execution
    monkeypatch.setattr(worker_execution, "REPAIR_REPLAN", {**worker_execution.REPAIR_REPLAN, "enabled": True})
    execution, step = _check(f"{checks.SUSPECT_STOP}: text_present /x.html: diff đã thêm")
    assert step == "done" and execution.repairs == []
    execution.verdict()
    assert execution.result["outcome"] == "blocked" and checks.CHECK_SUSPECT in execution.result["reason"]


def test_flag_off_keeps_suspect_red_on_both_blocking_as_today(tmp_path, monkeypatch, flag_off, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE), dom=((True, "blue"), (True, "blue")))
    out = run(tmp_path, [STYLE])
    assert out["blocked"] is True and out["reason"] == "check đỏ trên cả base lẫn candidate: computed_style /x.html"
    assert out["failure_class"] == verify.STAGE_CLASS["ordinary"]
    assert set(out["evidence"]["checks"]["rows"][0]) == {"check", "base", "candidate"}
    assert "check_suspect" not in out["evidence"]["functional"]


def test_flag_off_keeps_node_127_as_red_needs_review(tmp_path, monkeypatch, flag_off, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE))
    out = run(tmp_path, [NODE], runner=Missing(), files={"test/checked.test.js": "// c\n"})
    assert out["blocked"] is False and out["evidence"]["checks"]["verdict"] == checks.NONE


def test_guest_with_empty_env_still_classifies(tmp_path, monkeypatch, pages, base_mode):
    serve(monkeypatch, base_mode, (200, PAGE), (200, PAGE), dom=((True, "blue"), (True, "blue")))
    root = make_checkout(tmp_path)
    worker = make_state(root, visual=True)
    worker.update(plan={"subtasks": [{"file": "public/x.html", "checks": [STYLE]}]}, base_sha="abc",
                  request_detail=REQUEST, full_diff=[{"file": "public/x.css", "diff": STYLE_DIFF}])
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.setenv(FLAG, "1")
    guest = guest_inputs.build(worker)
    assert guest["red_check_classify"] is True
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS")
    monkeypatch.delenv(FLAG)
    out = verify.run(guest, runner=FakeRunner(), checkout_dir=root)
    assert out["blocked"] is False and out["evidence"]["checks"]["rows"][0]["class"] == checks.CHECK_SUSPECT


def test_flag_off_ships_no_guest_key(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    assert "red_check_classify" not in guest_inputs.build({})
