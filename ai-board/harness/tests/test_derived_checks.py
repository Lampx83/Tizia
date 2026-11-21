import copy
import json
import shlex
import shutil
import subprocess
from types import SimpleNamespace

import pytest

from gates import brainstorm, derived_checks, plan_validate
from gate5 import checks

PAGE = "public/tro-giup.html"
HTML = "<html><body><h1>Chào bạn</h1><style>.nut-chinh { padding: 4px; color: #16a34a; }</style></body></html>"
needs_node = pytest.mark.skipif(shutil.which("node") is None, reason="node missing")


def _req(subject, body="", **extra):
    return {"subject": subject, "body": body, **extra}


def _sub(file, verify="mô tả", deps=None):
    return {"title": "t", "file": file, "verify": verify, "size": "small", "depends_on": deps or []}


def _plan(*subs):
    return {"summary_vi": "s", "capabilities": [], "subtasks": list(subs)}


def _derived(request, file=PAGE, with_checks=True):
    return derived_checks.apply(_plan(_sub(file)), request, with_checks=with_checks)["subtasks"][0]


def _status(verify, tmp_path, content, swap=None):
    """Exit code of the derived verify argv with the file slot pointed at a temp file; swap replaces trailing args."""
    path = tmp_path / "f.html"
    path.write_text(content, encoding="utf-8")
    argv = shlex.split(verify)
    argv[3] = str(path)
    argv = argv[:len(argv) - len(swap)] + swap if swap else argv
    return subprocess.run(argv, capture_output=True).returncode


def test_replace_text_checks_apostrophe_vietnamese():
    st = _derived(_req("Đổi 'Chào bạn' thành \"Xin chào, bạn ơi! It's me\""))
    assert st["checks_source"] == "derived"
    assert st["checks"] == [{"primitive": "text_present", "path": "/tro-giup.html", "text": "Xin chào, bạn ơi! It's me"},
                            {"primitive": "text_absent", "path": "/tro-giup.html", "text": "Chào bạn"}]
    assert checks.plan_problems({"subtasks": [st]}) == []
    assert shlex.split(st["verify"])[3:] == [PAGE, "+Xin chào, bạn ơi! It's me", "-Chào bạn"]


def test_insert_text_present_only():
    st = _derived(_req("Thêm dòng 'Liên hệ: 0123' vào trang"))
    assert [c["primitive"] for c in st["checks"]] == ["text_present"]


def test_remove_text_absent_only_and_size_hide_type():
    for extra in ({}, {"type": "size_hide"}):
        st = _derived(_req("Xóa chữ 'Quảng cáo' khỏi trang", **extra))
        assert [c["primitive"] for c in st["checks"]] == ["text_absent"]


def test_css_color_rule_and_rgb():
    st = _derived(_req("Đổi màu chữ của '.nut-chinh' thành #ff0000"))
    assert st["checks"] == [{"primitive": "computed_style", "path": "/tro-giup.html", "selector": ".nut-chinh",
                             "prop": "color", "value": "rgb(255, 0, 0)"}]
    short = _derived(_req("Màu nền '.nut-chinh' thành #0af"))["checks"][0]
    assert (short["value"], short["prop"]) == ("rgb(0, 170, 255)", "background-color")


@pytest.mark.parametrize("req", [
    _req("Làm trang đẹp hơn"),
    _req("Đổi 'a b' thành 'c d' và 'e f' thành 'g h'"),
    _req("Thêm 'Tin <b>mới</b>'"),
    _req("Đổi màu '.x' thành #fff #000"),
    _req("Thêm 'Liên hệ' vào", type="css_color"),
])
def test_unknown_or_ambiguous_untouched(req):
    plan = _plan(_sub(PAGE))
    assert derived_checks.apply(copy.deepcopy(plan), req, with_checks=True) == plan


def test_two_candidate_files_untouched():
    plan = _plan(_sub("public/a.html"), _sub("public/b.html"))
    assert derived_checks.apply(copy.deepcopy(plan), _req("Thêm 'Liên hệ' vào"), with_checks=True) == plan


def test_plan_with_server_layer_untouched():
    plan = _plan({**_sub("server/contexts/teacher/migrations/001-notes.sql"), "layer": "db"}, {**_sub(PAGE), "layer": "frontend"})
    assert derived_checks.apply(copy.deepcopy(plan), _req("Thêm trang ghi chú, bấm 'Lưu' thì hiện"), with_checks=True) == plan


def test_non_page_file_gets_verify_only():
    st = _derived(_req("Thêm 'Liên hệ' vào"), file="public/js/menu.js")
    assert "checks" not in st and st["checks_source"] == "derived"


@needs_node
def test_text_verify_really_runs(tmp_path):
    verify = _derived(_req("Đổi 'Chào bạn' thành 'Xin chào, it's me'"))["verify"]
    assert _status(verify, tmp_path, "<p>Xin chào, it's me</p>") == 0
    assert _status(verify, tmp_path, "<p>Chào bạn</p><p>Xin chào, it's me</p>") == 1
    assert _status(verify, tmp_path, "<p>Chào bạn</p>") == 1


@needs_node
def test_css_verify_really_runs(tmp_path):
    verify = _derived(_req("Đổi màu chữ của '.nut-chinh' thành #16a34a"))["verify"]
    assert _status(verify, tmp_path, HTML) == 0
    assert _status(verify, tmp_path, HTML, swap=["color", "#ff0000"]) == 1
    assert _status(verify, tmp_path, HTML, swap=["background-color", "#16a34a"]) == 1


def _settings(monkeypatch, derived, plan_checks=True):
    ns = SimpleNamespace(compile_prose_verify=False, gate1_unified_verify=False, derived_checks=derived, plan_checks=plan_checks)
    monkeypatch.setattr(brainstorm, "get_settings", lambda: ns)


def _parse(plan, request=None):
    return brainstorm.parse_plan(json.dumps(plan), request=request)


REQ = _req("Đổi 'Chào bạn' thành 'Xin chào'")


def _feature():
    plan = _plan(_sub(PAGE, "trang có chữ mới"), _sub("public/js/menu.css", "node --test test/menu.test.js", deps=[1]))
    plan["subtasks"][0]["layer"] = "frontend"
    return plan


def test_flag_off_identical_and_still_rejects(monkeypatch):
    _settings(monkeypatch, False)
    with pytest.raises(ValueError, match="lệnh chạy được"):
        _parse(_feature(), REQ)
    single = _plan(_sub(PAGE))
    assert _parse(single, REQ) == _parse(single)


def test_flag_on_gate1_accepts_derived_plan(monkeypatch):
    _settings(monkeypatch, True)
    parsed = _parse(_feature(), REQ)
    first = parsed["subtasks"][0]
    assert first["checks_source"] == "derived" and first["verify"].startswith("node -e")
    assert "checks_source" not in parsed["subtasks"][1]
    assert checks.plan_problems(parsed) == []
    assert not [i for i in plan_validate.unfit_issues(parsed) if "verify" in i or "check" in i]


def test_flag_on_without_plan_checks_adds_no_checks_field(monkeypatch):
    _settings(monkeypatch, True, plan_checks=False)
    st = _parse(_feature(), REQ)["subtasks"][0]
    assert "checks" not in st and st["checks_source"] == "derived"
