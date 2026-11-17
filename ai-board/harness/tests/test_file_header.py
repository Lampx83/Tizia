"""file_header + gate 4 header check + tree/outline header lines."""
import pytest

import tools
from gates import static_check
from repositories import code_index
from settings import reset_settings
from test_code_index import _commit, repo  # noqa: F401 — repo là fixture
from test_gate_4_static_check import _base_repo, _plan, _scratch


@pytest.mark.parametrize("path,text,want", [
    ("a.js", "// Quiz timer.\nexport const x = 1;\n", "Quiz timer."),
    ("a.mjs", "/**\n * Quiz timer.\n */\nexport {};\n", "Quiz timer."),
    ("a.js", "'use strict';\n/* Quiz timer. */\n", "Quiz timer."),
    ("a.html", "<!doctype html>\n<!-- Trang quiz. -->\n<h1>x</h1>\n", "Trang quiz."),
    ("a.py", '"""Parse OLE.\n\nmore"""\nx = 1\n', "Parse OLE."),
    ("a.js", "export const x = 1;\n// late\n", None),
    ("a.html", "<!doctype html>\n<h1>x</h1>\n", None),
    ("a.py", "x = 1\n", None),
    ("a.css", "/* x */\n", None),
])
def test_file_header(path, text, want):
    assert code_index.file_header(path, text) == want


def _gate4(tmp_path, rel, base, new, monkeypatch, flag="1"):
    monkeypatch.setenv("AI_BOARD_FILE_HEADER_CHECK", flag)
    reset_settings()
    repo_dir, sha = _base_repo(tmp_path, rel if base is not None else "keep.txt", base if base is not None else "k")
    scratch = _scratch(tmp_path, rel, new)
    plan = _plan([{"title": "t", "file": rel, "verify": "v", "size": "small"}])
    state = {"plan": plan, "diffs": [{"title": "t", "file": rel, "diff": "+x\n"}], "scratch_repo": str(scratch),
             "checkout_source": str(repo_dir), "base_sha": sha}
    return static_check.run(state)


def test_new_file_without_header_blocks_repairable(tmp_path, monkeypatch):
    out = _gate4(tmp_path, "public/js/x.js", None, "export const a = 1;\n", monkeypatch)
    assert out["blocked"] and out["failure_class"] == "ordinary" and "public/js/x.js" in out["reason"]


def test_new_file_with_header_passes(tmp_path, monkeypatch):
    out = _gate4(tmp_path, "public/js/x.js", None, "// Đếm giờ quiz.\nexport const a = 1;\n", monkeypatch)
    assert out["blocked"] is False


def test_modified_file_without_header_passes(tmp_path, monkeypatch):
    out = _gate4(tmp_path, "public/js/x.js", "export const a = 1;\n", "export const a = 2;\n", monkeypatch)
    assert out["blocked"] is False


def test_flag_off_by_default(tmp_path, monkeypatch):
    out = _gate4(tmp_path, "public/js/x.js", None, "export const a = 1;\n", monkeypatch, flag="")
    assert out["blocked"] is False


def test_tree_and_outline_show_header_when_flag_on(repo, monkeypatch):  # noqa: F811
    src, _ = repo
    _commit(src, {"public/js/t.js": "// Đếm giờ.\nexport const t = 1;\n"})
    sha = code_index.git(src, "rev-parse", "HEAD").decode().strip()
    monkeypatch.setenv("AI_BOARD_FILE_HEADER_CONTEXT", "1")
    reset_settings()
    assert "t.js — Đếm giờ." in tools.run("tree", src, sha, {"path": "public/js"}, 500)
    assert "mục đích: Đếm giờ." in tools.run("outline", src, sha, {"file": "public/js/t.js"}, 2000)
    monkeypatch.delenv("AI_BOARD_FILE_HEADER_CONTEXT")
    reset_settings()
    assert "—" not in tools.run("tree", src, sha, {"path": "public/js"}, 500)
