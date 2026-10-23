"""Path policy: fixture chung với Node (test/ai-board-path-policy.test.js), và mỗi điểm thực thi từ chối path AI Board."""
import json
from pathlib import Path

import pytest

import path_policy
from gates import guard
from runtime import tool_loop
from tools import _drop_denied

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


def test_test_file_must_name_scope_file():
    assert path_policy.names_scope("import x from '../public/js/quiz.js';", ["public/js/quiz.js"])
    assert path_policy.names_scope("assert render_quiz_html()  # quiz.js", ["public/js/quiz.js"])
    assert not path_policy.names_scope("assert True", ["public/js/quiz.js"])
