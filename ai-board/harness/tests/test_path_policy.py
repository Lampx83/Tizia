"""Path policy: fixture chung với Node (test/ai-board-path-policy.test.js), và mỗi điểm thực thi từ chối path AI Board."""
import json
from pathlib import Path

import pytest

from repositories import code_index
import path_policy
from gates import guard
from runtime import tool_loop
from tools import _drop_denied
from verification import loop_checks

FIXTURE = Path(__file__).resolve().parents[3] / "test" / "fixtures" / "ai-board-path-policy.json"


def diff(path):
    return f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1 +1 @@\n-x\n+y\n"


def test_check_matches_shared_fixture():
    for case in json.loads(FIXTURE.read_text(encoding="utf-8")):
        assert path_policy.check(case["path"], "read")["allow"] is case["allow"], case["path"]


def test_gate4_flags_denied_path_as_protected_critical():
    findings = guard.scan(diff("ai-board/inbox.json"))["findings"]
    assert any(f["check"] == "protected_path" and f["severity"] == "critical" for f in findings)


def test_gate4_no_protected_finding_for_public_page():
    assert not [f for f in guard.scan(diff("public/index.html"))["findings"] if f["check"] == "protected_path"]


@pytest.mark.parametrize("path", ["ai-board/harness/gates/guard.py", "AI-BOARD/inbox.json", "public/../ai-board/x.py"])
def test_read_tool_path_refused_regardless_of_checks(path):
    with pytest.raises(tool_loop.Forbidden):
        tool_loop._clean_path(path)


def test_search_output_drops_denied_lines():
    out = _drop_denied("ai-board/inbox.json:1:secret\npublic/index.html:2:ok\nserver/ai-board/store.js:3:x")
    assert out == "public/index.html:2:ok"


def test_shared_denied_path_is_refused_by_read_tools_and_the_code_index():
    path = "public/js/ai-board-graph.js"
    assert path_policy.check(path, "read")["allow"] is False
    with pytest.raises(tool_loop.Forbidden):
        tool_loop._clean_path(path)
    assert not loop_checks.readable(path)
    assert not code_index._indexable(path, 1000)


def test_denied_parts_and_code_roots_come_from_the_shared_lexicon():
    lexicon = json.loads((Path(__file__).resolve().parents[3] / "server" / "ai-board" / "guard-lexicon.json").read_text(encoding="utf-8"))
    assert loop_checks.DENIED_PARTS == frozenset(lexicon["deny_paths"]["parts"]) == path_policy.denied_parts()
    assert code_index.ROOTS == tuple(lexicon["code_index"]["roots"]) == path_policy.code_roots()
    assert not loop_checks.readable("public/x/ai-board/y.py")  # part deny, not a path-prefix deny


def test_test_file_must_name_scope_file():
    assert path_policy.names_scope("import x from '../public/js/quiz.js';", ["public/js/quiz.js"])
    assert path_policy.names_scope("assert render_quiz_html()  # quiz.js", ["public/js/quiz.js"])
    assert not path_policy.names_scope("assert True", ["public/js/quiz.js"])


@pytest.mark.parametrize("role", ["admin", "student"])
@pytest.mark.parametrize("path,allowed", [
    ("server/contexts/_ai-generated/pharmacy/index.js", True),
    ("server/contexts/_ai-generated/pharmacy/migrations/001.sql", True),
    ("server/contexts/_ai-generated/", True),
    ("server/contexts/identity/index.js", False),
    ("server/contexts/_ai-generated", False),
    ("server/contexts/_ai-generated-x/a.js", False),
    ("server/index.js", False),
    ("public/js/app.js", False),
    ("ai-board/harness/main.py", False),
    ("", False),
])
def test_may_edit_table(path, allowed, role):
    assert path_policy.may_edit(path, role) is allowed


TEST_TEXT = "import test from 'node:test';\nimport { route } from '../server/contexts/content/routes.js';\n"
READ = {"test/content.test.js": TEST_TEXT, "test/plain.test.js": "assert(1)  // server/contexts/content/routes.js",
        "test/other.test.js": "import test from 'node:test'"}.get


@pytest.mark.parametrize("path,tests,allowed,expected", [
    ("server/contexts/content/routes.js", ["test/content.test.js"], {"content"}, True),
    ("server/contexts/content/routes.js", [], {"content"}, False),                          # thiếu test
    ("server/contexts/content/routes.js", ["test/plain.test.js"], {"content"}, False),      # không node:test
    ("server/contexts/content/routes.js", ["test/other.test.js"], {"content"}, False),      # test không nêu file
    ("server/contexts/content/routes.js", ["test/missing.test.js"], {"content"}, False),    # test không tồn tại
    ("server/contexts/content/routes.js", ["test/content.test.js"], set(), False),          # danh sách rỗng
    ("server/contexts/content/routes.js", ["test/content.test.js"], {"learning"}, False),   # chưa duyệt
    ("server/index.js", ["test/content.test.js"], {"content"}, False),
    ("server/db.js", ["test/content.test.js"], {"db.js"}, False),
    ("public/js/engine/wallet.js", ["test/content.test.js"], {"content"}, False),
])
def test_surface_context_needs_approved_context_and_node_test(path, tests, allowed, expected):
    assert path_policy.surface_context(path, tests, READ, allowed) is expected


@pytest.mark.parametrize("ctx,file", [("campus", "index.js"), ("content", "index.js"), ("content", "layout.js"), ("learning", "routes.js")])
def test_surface_context_bare_basename_does_not_count(ctx, file):
    path = f"server/contexts/{ctx}/{file}"
    read = {"test/x.test.js": f"import test from 'node:test'; // {file}", "test/y.test.js": f"import test from 'node:test'; // other{ctx}/{file}x",
            "test/ok.test.js": f"import test from 'node:test'; // {ctx}/{file}"}.get
    assert not path_policy.surface_context(path, ["test/x.test.js"], read, {ctx})
    assert not path_policy.surface_context(path, ["test/y.test.js"], read, {ctx})
    assert path_policy.surface_context(path, ["test/ok.test.js"], read, {ctx})


@pytest.mark.parametrize("name", sorted(path_policy.FORBIDDEN_CONTEXTS) + ["ai-board-intake", "_ai-generated"])
def test_surface_context_never_opens_forbidden_contexts(name):
    path = f"server/contexts/{name}/routes.js"
    text = f"import test from 'node:test'; // {path}"
    assert not path_policy.surface_context(path, ["test/x.test.js"], {"test/x.test.js": text}.get, {name})
