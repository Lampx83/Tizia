import copy
from types import SimpleNamespace

import pytest

from gates import brainstorm, plan_validate
from runtime import coverage

PAGE = "public/sap-xep-hub.html"


def _sub(file, verify, layer="frontend", deps=None):
    return {"title": "t", "file": file, "verify": verify, "size": "small", "layer": layer, "depends_on": deps or []}


def _plan(*subs, acceptance=None):
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": list(subs)}
    if acceptance is not None:
        plan["acceptance"] = acceptance
    return plan


PROSE_ONE_FILE = [
    _plan(_sub(PAGE, f"{PAGE} chứa '.yes {{ color: #16a34a; }}' hoặc 'color: #16a34a' trong khối style")),
    _plan(_sub("public/sac-ky-2d.html", "public/sac-ky-2d.html không còn thẻ <a> có href='./'"),
          acceptance=["curl -s localhost:8041/sac-ky-2d.html | grep -q 'href'"]),
    _plan(_sub("public/js/scenarios/bao-che-labs.js", "public/js/scenarios/bao-che-labs.js chứa chuỗi 'Đơn pha chế'")),
]
GREP_MULTI = [
    _plan(_sub("public/js/shared/validate.js", "grep -q 'function check_username' public/js/shared/validate.js"),
          _sub("public/signup.html", "grep -q 'check_username' public/signup.html", deps=[1])),
    _plan(*[_sub(f"public/js/engine/cache-{n}.js", f"grep -q 'version' public/js/engine/cache-{n}.js", deps=[i] if i else [])
            for i, n in enumerate(["helper", "writer", "reader", "service"])]),
]
STILL_BLOCKED = [
    _plan(_sub("public/a.html", "public/a.html chứa 'x'"), _sub("public/b.html", "public/b.html chứa 'y'", deps=[1])),
    _plan(_sub("server/contexts/_ai-generated/c/migrations/001-a.sql", "bảng a tồn tại", layer="db")),
]


def _flag(monkeypatch, on):
    ns = SimpleNamespace(compile_prose_verify=False, gate1_unified_verify=on)
    monkeypatch.setattr(brainstorm, "get_settings", lambda: ns)


def _blocked(plan):
    plan = copy.deepcopy(plan)
    try:
        parsed = brainstorm.parse_plan(__import__("json").dumps(plan))
    except ValueError as e:
        return str(e)
    return coverage.plan_block(parsed, lambda: [], None) or "; ".join(plan_validate.unfit_issues(parsed)) or None


@pytest.mark.parametrize("plan", PROSE_ONE_FILE + GREP_MULTI)
def test_flag_off_keeps_old_block(monkeypatch, plan):
    _flag(monkeypatch, False)
    assert _blocked(plan)


@pytest.mark.parametrize("plan", PROSE_ONE_FILE + GREP_MULTI)
def test_flag_on_passes_false_blocks(monkeypatch, plan):
    _flag(monkeypatch, True)
    assert _blocked(plan) is None


@pytest.mark.parametrize("plan", STILL_BLOCKED)
def test_flag_on_still_blocks_prose_in_feature_plans(monkeypatch, plan):
    _flag(monkeypatch, True)
    assert _blocked(plan)


RUNNABLE_TABLE = [
    ("node --test x.test.js", True, True), ("curl -s localhost:8041", True, True), ("pytest tests", True, True),
    ("grep -q 'a' public/x.html", True, False), ("rg 'a' public", True, False),
    ("public/x.html chứa 'a'", False, False), ("echo ok", False, False),
]


@pytest.mark.parametrize("text,on,off", RUNNABLE_TABLE)
def test_one_verify_classifier_for_every_consumer(monkeypatch, text, on, off):
    from gates import verify
    for flag, want in ((True, on), (False, off)):
        _flag(monkeypatch, flag)
        assert brainstorm.is_runnable(text) is want
        assert coverage._runnable(text) is want
        assert bool(verify.acceptance_commands({"acceptance": [text]})) is want


def test_gate5_keeps_grep_acceptance_gate1_accepted(monkeypatch):
    from gates import verify
    _flag(monkeypatch, True)
    item = "grep -q 'x' public/a.html"
    assert verify.acceptance_commands({"acceptance": [item, "mô tả"]}) == [item]


REJECTED_SHELL_VERIFY = [
    "grep -q 'Điểm ghi học lượng thẻ.' public/it-sql-playground.html",
    "grep -q 'version' public/js/engine/cache-helper.js",
    "grep -q 'Ghi đơn học thẻ tập' public/js/features/quan-ly-truong/trach-hoc.js",
    "grep -q 'word' public/js/engine/core/text.js",
    "grep -q 'export async requesterProgress' server/ai-board/services/requester-progress.js",
]


@pytest.mark.parametrize("verify", REJECTED_SHELL_VERIFY)
def test_default_settings_accept_shell_verify_rejected_in_trials(monkeypatch, verify):
    monkeypatch.delenv("AI_BOARD_GATE1_UNIFIED_VERIFY")
    assert brainstorm.is_runnable(verify)
    plan = _plan(_sub("public/x.html", verify))
    assert brainstorm.parse_plan(__import__("json").dumps(plan))
