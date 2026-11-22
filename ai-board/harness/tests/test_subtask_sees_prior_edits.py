"""Later subtask reads/searches the run draft (base + finished subtasks) under tool_defs_v2; base only when off."""
import subprocess

import pytest

from gates import implement
from runtime import tool_loop
from settings import reset_settings

CATALOG = "server/contexts/portal-apps/builtin-catalog.js"
INDEX = "server/index.js"
BASE_CATALOG = "export const BUILTIN = [];\n"
DRAFT_CATALOG = BASE_CATALOG + "export function filterBuiltin(q) {\n  return BUILTIN.filter((a) => a.id === q);\n}\n"
TITLE = "Thêm filterBuiltin"


@pytest.fixture
def repo(tmp_path):
    subprocess.run(["git", "init", "-q", str(tmp_path)], check=True)
    (tmp_path / "server/contexts/portal-apps").mkdir(parents=True)
    (tmp_path / CATALOG).write_text(BASE_CATALOG, encoding="utf8")
    (tmp_path / INDEX).write_text("import express from 'express';\n", encoding="utf8")
    subprocess.run(["git", "-C", str(tmp_path), "add", "."], check=True)
    subprocess.run(["git", "-C", str(tmp_path), "-c", "user.name=T", "-c", "user.email=t@t", "commit", "-qm", "b"], check=True)
    sha = subprocess.run(["git", "-C", str(tmp_path), "rev-parse", "HEAD"], capture_output=True, text=True, check=True).stdout.strip()
    return str(tmp_path), sha


@pytest.fixture
def v2(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_DEFS_V2", "1")
    reset_settings()
    yield
    monkeypatch.delenv("AI_BOARD_TOOL_DEFS_V2")
    reset_settings()


def _ws(repo):
    source, sha = repo
    return tool_loop.Workspace(source, sha, INDEX, "import express from 'express';\n",
                               prior={CATALOG: (DRAFT_CATALOG, TITLE)} if tool_loop.v2() else None)


def test_search_and_read_see_prior_subtask_function(repo, v2):
    ws = _ws(repo)
    hits = ws.run("grep", {"words": ["filterBuiltin"], "path": "server/contexts/portal-apps"})
    assert CATALOG in hits and TITLE in hits
    window = ws.run("grep", {"words": ["filterBuiltin"], "file": CATALOG})
    assert "filterBuiltin" in window and TITLE in window
    assert "filterBuiltin" in ws.run("outline", {"file": CATALOG})
    read = ws.run("read_file", {"file": CATALOG})
    assert "filterBuiltin" in read and TITLE in read


def test_flag_off_sees_base_only(repo):
    ws = _ws(repo)
    assert CATALOG not in ws.run("grep", {"words": ["filterBuiltin"], "path": "server/contexts/portal-apps"})
    with pytest.raises(tool_loop.ScopeMiss):
        ws.run("read_file", {"file": CATALOG})


def test_prior_file_stays_read_only(repo, v2):
    ws = _ws(repo)
    with pytest.raises(tool_loop.ScopeMiss):
        ws.run("edit_file", {"file": CATALOG, "edits": [{"after_line": 0, "insert": "x"}]})


def test_prior_drafts_from_produced_with_owner_titles():
    state = {"plan": {"subtasks": [{"title": TITLE, "file": CATALOG}, {"title": "route", "file": INDEX}]},
             "produced": {CATALOG: {"code": DRAFT_CATALOG, "extra_files": {"x/y.js": "y"}}}}
    assert implement._prior_drafts(state) == {CATALOG: (DRAFT_CATALOG, TITLE), "x/y.js": ("y", TITLE)}
