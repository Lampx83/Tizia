import json
import shutil
import subprocess
from types import SimpleNamespace
import unicodedata

import pytest

from gates import brainstorm
from gates.brainstorm import RUNNABLE, compile_prose_verify

SH = shutil.which("sh")
needs_sh = pytest.mark.skipif(SH is None, reason="sh not on PATH")

REAL = [
    ("public/league.html", "public/league.html chứa 'Tra ôn học hàm nhớ.' và không còn '← Trang chủ'"),
    ("public/it-sql-playground.html", "public/it-sql-playground.html chứa 'Điểm ghi học lượng thẻ.'"),
    ("public/marketplace.html", "public/marketplace.html chứa chuỗi 'Nhớ ôn bài đơn hàm'"),
    ("public/teacher-live.html", "public/teacher-live.html chứa '<h3>Kiểm pha bài thành ôn.</h3>'"),
    ("public/dang-nhap.html", "public/dang-nhap.html chứa 'Pha liều bài hàm xu'"),
]


def _sh_run(cmd: str, cwd):
    return subprocess.run([SH, "-c", cmd], cwd=cwd, capture_output=True, text=True)


@pytest.mark.parametrize("path,text", REAL)
def test_real_prose_compiles_to_runnable(path, text):
    cmd = compile_prose_verify(text, {path})
    assert cmd is not None
    assert RUNNABLE.match(cmd.strip())


def test_real_negative_clause_compiles():
    cmd = compile_prose_verify(REAL[0][1], {REAL[0][0]})
    assert "grep -qF --" in cmd and "! grep -qF --" in cmd


@needs_sh
@pytest.mark.parametrize("path,text", REAL)
def test_compiled_real_strings_pass_and_fail_on_content(tmp_path, path, text):
    target = tmp_path / path
    target.parent.mkdir(parents=True, exist_ok=True)
    cmd = compile_prose_verify(text, {path})
    quoted = text.split("'")[1]
    target.write_text("<p>" + quoted + "</p>", encoding="utf-8")
    assert _sh_run(cmd, tmp_path).returncode == 0
    target.write_text("unrelated page", encoding="utf-8")
    assert _sh_run(cmd, tmp_path).returncode != 0


@needs_sh
def test_negative_clause_fails_when_forbidden_text_present(tmp_path):
    path, text = REAL[0]
    (tmp_path / "public").mkdir()
    (tmp_path / path).write_text("Tra ôn học hàm nhớ. ← Trang chủ", encoding="utf-8")
    assert _sh_run(compile_prose_verify(text, {path}), tmp_path).returncode != 0
    (tmp_path / path).write_text("Tra ôn học hàm nhớ.", encoding="utf-8")
    assert _sh_run(compile_prose_verify(text, {path}), tmp_path).returncode == 0


@needs_sh
@pytest.mark.parametrize("text", [
    "$(touch PWNED)",
    "`touch PWNED`",
    "x'; touch PWNED; echo '",
    'x" ; touch PWNED ; "',
    "a\\b; touch PWNED",
    "it's 'quoted' \"double\"",
])
def test_metacharacters_are_inert(tmp_path, text):
    path = "public/a.html"
    (tmp_path / "public").mkdir()
    (tmp_path / path).write_text("plain", encoding="utf-8")
    cmd = compile_prose_verify(f"{path} chứa '{text}'", {path})
    if cmd is not None:
        _sh_run(cmd, tmp_path)
    assert not (tmp_path / "PWNED").exists()


def test_nfd_text_normalised_to_nfc():
    text = unicodedata.normalize("NFD", "Điểm ghi học")
    cmd = compile_prose_verify(f"public/a.html chứa '{text}'", {"public/a.html"})
    assert unicodedata.normalize("NFC", "Điểm ghi học") in cmd


@pytest.mark.parametrize("bad", [
    "../etc/passwd.html chứa 'x'",
    "public/../../x.html chứa 'x'",
    "/etc/passwd.html chứa 'x'",
    "C:\\x.html chứa 'x'",
    "public/a.html chứa ''",
    "public/a.html chứa '   '",
    "public/a.html chứa 'x\ny'",
    "public/a.html; rm -rf / chứa 'x'",
    "public/other.html chứa 'x'",
    "public/a.html is wrong",
    "public/a.html chứa x",
    "public/a.html chứa 'x' ngay sau 'y'",
    "public/a.html chứa 'x' và 'y' ngay sau 'z'",
    "public/a.html chứa 'x' rồi 'y'",
    "public/a.html chứa 'x' và y",
    "public/a.html chứa 'x' và không còn 'y' và 'z'",
])
def test_out_of_form_or_out_of_scope_returns_none(bad):
    assert compile_prose_verify(bad, {"public/a.html"}) is None


def test_plain_command_untouched():
    assert compile_prose_verify("node --test test/a.test.js", {"public/a.html"}) is None


def _plan(verify):
    return json.dumps({
        "summary_vi": "x",
        "subtasks": [
            {"title": "t1", "file": "public/league.html", "verify": verify, "size": "small", "layer": "frontend"},
            {"title": "t2", "file": "public/other.html", "verify": "node --test a.js", "size": "small", "layer": "frontend"},
        ],
        "acceptance": ["curl -s http://localhost:8041/league.html"],
    })


def test_parse_plan_flag_off_rejects_prose(monkeypatch):
    monkeypatch.setattr(brainstorm, "get_settings", lambda: SimpleNamespace(compile_prose_verify=False))
    with pytest.raises(ValueError, match="verify phải là lệnh chạy được"):
        brainstorm.parse_plan(_plan(REAL[0][1]))


def test_parse_plan_flag_on_compiles_prose(monkeypatch):
    monkeypatch.setattr(brainstorm, "get_settings", lambda: SimpleNamespace(compile_prose_verify=True))
    plan = brainstorm.parse_plan(_plan(REAL[0][1]))
    assert plan["subtasks"][0]["verify"].startswith("sh -c ")


def test_parse_plan_flag_on_still_rejects_unknown_prose(monkeypatch):
    monkeypatch.setattr(brainstorm, "get_settings", lambda: SimpleNamespace(compile_prose_verify=True))
    with pytest.raises(ValueError, match="verify phải là lệnh chạy được"):
        brainstorm.parse_plan(_plan("làm cho trang đẹp hơn"))


MULTI = [
    ("public/marketplace.html chứa 'Nhớ ôn bài đơn hàm' và 'Đang tải'", ["Nhớ ôn bài đơn hàm", "Đang tải"], None),
    ("public/marketplace.html chứa 'a' and 'b' and 'c'.", ["a", "b", "c"], None),
    ("public/marketplace.html chứa 'a' và 'b' và không còn 'x'", ["a", "b"], "x"),
]


@pytest.mark.parametrize("text,wanted,gone", MULTI)
def test_multi_quoted_strings_compile_to_separate_checks(text, wanted, gone):
    cmd = compile_prose_verify(text, {"public/marketplace.html"})
    assert cmd is not None
    assert cmd.count("grep -qF --") == len(wanted) + (gone is not None)
    for w in wanted:
        assert w in cmd
    for connector in (" và ", " and ", " ngay sau "):
        assert connector not in cmd.replace("không còn", "")


@needs_sh
def test_multi_checks_each_must_pass(tmp_path):
    (tmp_path / "public").mkdir()
    f = tmp_path / "public/marketplace.html"
    cmd = compile_prose_verify("public/marketplace.html chứa 'AAA' và 'BBB'", {"public/marketplace.html"})
    f.write_text("AAA BBB", encoding="utf-8")
    assert _sh_run(cmd, tmp_path).returncode == 0
    f.write_text("AAA", encoding="utf-8")
    assert _sh_run(cmd, tmp_path).returncode != 0


@needs_sh
@pytest.mark.parametrize("text", [
    "public/marketplace.html chứa 'Nhớ ôn bài đơn hàm' và 'Đang tải'",
    "public/teacher-live.html chứa '<h3>Kiểm pha bài thành ôn.</h3>' ngay sau '<h3>📝 Mở quiz</h3>'",
])
def test_trial_sentences_never_emit_syntax_error(tmp_path, text):
    path = text.split()[0]
    cmd = compile_prose_verify(text, {path})
    if cmd is not None:
        r = _sh_run(cmd, tmp_path)
        assert "syntax error" not in r.stderr and "Unterminated" not in r.stderr
