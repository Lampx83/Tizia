"""Repair agent: one heavy-model proposal, checked against scope, levels and the tool manifest."""
import base64
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from runtime import progress, repair_agent as agent, tool_manifest  # noqa: E402

CODE = {"public/js/campus/building.js": "const a = 1;\nrender();\n",
        "test/building.test.js": "test('a', () => {});\n"}
SCOPE = set(CODE)
PROTECTED = {"server/contexts/campus/cards.js": "export const a = 1;\n"}


def proposal(**overrides):
    body = {"diagnosis": "test khong khop selector", "action": progress.REPAIR_CODE,
            "changes": [{"file": "public/js/campus/building.js", "search": "const a = 1;", "replace": "const a = 2;"}]}
    body.update(overrides)
    return body


def test_only_a_ladder_that_would_stop_reaches_the_agent():
    assert agent.applies(progress.STOP_ADMIN)
    assert not agent.applies(progress.REPAIR_CODE)
    assert not agent.applies(None)


def test_context_fences_each_section_as_data_and_caps_the_total():
    text = agent.context({"failure": "AssertionError: expected 1 got 2\n" * 500, "request": "them bo the"},
                         limit=6000)
    assert len(text) <= 6000
    assert "<failure>" in text and "<request>" in text
    assert agent.TRUNCATED in text


def test_a_reply_that_is_not_json_is_rejected():
    with pytest.raises(agent.ProposalError):
        agent.parse("xin loi, toi khong biet")


def test_an_action_outside_the_allowlist_is_rejected():
    with pytest.raises(agent.ProposalError):
        agent.parse(json.dumps(proposal(action="change_permissions")))
    assert agent.parse(json.dumps(proposal(action=progress.STOP_ADMIN, changes=[])))["action"] == progress.STOP_ADMIN


def test_changes_must_be_a_bounded_list_of_search_replace_blocks():
    with pytest.raises(agent.ProposalError):
        agent.parse(json.dumps(proposal(changes=[{"file": "public/a.js"}])))
    with pytest.raises(agent.ProposalError):
        agent.parse(json.dumps(proposal(changes=[{"file": "public/a.js", "search": "", "replace": "x"}])))
    with pytest.raises(agent.ProposalError):
        agent.parse(json.dumps(proposal(changes=[{"file": "public/a.js", "search": "s", "replace": "r"}] * 9)))


def test_a_repair_needs_at_least_one_change():
    with pytest.raises(agent.ProposalError):
        agent.parse(json.dumps(proposal(changes=[])))


def test_a_happy_proposal_passes_the_checks():
    out = agent.check(proposal(), scope=SCOPE, code=CODE)
    assert out["ok"] and out["files"] == ["public/js/campus/building.js"]


def test_a_file_outside_the_plan_scope_is_denied():
    body = proposal(changes=[{"file": "public/js/other.js", "search": "x", "replace": "y"}])
    out = agent.check(body, scope=SCOPE, code={**CODE, "public/js/other.js": "x"})
    assert not out["ok"] and "scope" in out["reason"]


def test_an_ai_board_file_stays_blocked_even_with_an_elevation():
    body = proposal(changes=[{"file": "ai-board/worker.py", "search": "a", "replace": "b"}])
    out = agent.check(body, scope={"ai-board/worker.py"}, code={"ai-board/worker.py": "a"},
                      elevation=[{"path": "ai-board/worker.py", "level": "self", "approved": True}])
    assert not out["ok"] and "AI Board" in out["reason"]


def test_a_protected_file_waits_for_a_matching_elevation():
    body = proposal(changes=[{"file": "server/contexts/campus/cards.js", "search": "a = 1", "replace": "a = 2"}])
    bare = agent.check(body, scope=set(PROTECTED), code=PROTECTED, plan_hash="h1")
    assert not bare["ok"] and bare["elevation_required"][0]["path"] == "server/contexts/campus/cards.js"
    granted = agent.check(body, scope=set(PROTECTED), code=PROTECTED, plan_hash="h1",
                          elevation=[{"path": "server/contexts/campus/cards.js", "level": "protected", "approved": True}])
    assert granted["ok"] and granted["elevation_required"] == []


def test_a_search_block_must_match_the_file_once():
    twice = {"public/js/campus/building.js": "const a = 1;\nconst a = 1;\n"}
    out = agent.check(proposal(), scope=SCOPE, code=twice)
    assert not out["ok"] and "khớp" in out["reason"]
    missing = agent.check(proposal(changes=[{"file": "public/js/campus/building.js", "search": "khong co", "replace": "x"}]),
                          scope=SCOPE, code=CODE)
    assert not missing["ok"]


def test_only_read_and_draft_write_tools_are_accepted():
    loaded = tool_manifest.load(known={"tree", "outline", "grep", "read_file", "edit_file", "write_test", "run_check", "finish"})
    allowed = agent.allowed_tools(loaded)
    assert "edit_file" in allowed and "read_file" in allowed
    assert "run_check" not in allowed and "finish" not in allowed
    out = agent.check(proposal(tool="run_check"), scope=SCOPE, code=CODE, manifest=loaded)
    assert not out["ok"]


def test_apply_replaces_the_matched_block_and_leaves_the_input_alone():
    new = agent.apply(proposal(), CODE)
    assert new["public/js/campus/building.js"] == "const a = 2;\nrender();\n"
    assert CODE["public/js/campus/building.js"] == "const a = 1;\nrender();\n"


def test_a_diagnosis_carries_no_more_than_its_cap():
    body = agent.parse(json.dumps(proposal(diagnosis="x" * 5000)))
    assert len(body["diagnosis"]) == agent.DIAGNOSIS_CHARS


def shot(root: Path, name: str, *, phase="after", page="/campus.html", width=1280, data=b"png-bytes", folder="ai-verify-shots-x"):
    """One gate-5 shot record in the run's own capture dir (`ai-verify-shots-*` under the temp root)."""
    (root / folder).mkdir(parents=True, exist_ok=True)
    path = root / folder / name
    path.write_bytes(data)
    return {"phase": phase, "page": page, "width": width, "path": str(path)}


def visual_failure(shots, primary=None):
    return {"gate": 5, "blocked": True, "failure_class": "ordinary",
            "reason": "giao diện tệ hơn bản trước — /campus.html 1280px: tương phản 2.1 < 3.0",
            "evidence": {"screenshots": shots, "screenshot": primary}}


def test_a_visual_regression_attaches_one_image_per_changed_page(tmp_path):
    first = shot(tmp_path, "after-0-1280.png")
    second = shot(tmp_path, "after-1-1280.png", page="/login.html")
    picked = agent.images(visual_failure([first, shot(tmp_path, "before-0-1280.png", phase="before"), second]),
                          temp_root=tmp_path)
    assert [(item["page"], item["width"], item["phase"]) for item in picked] == [
        ("/campus.html", 1280, "after"), ("/login.html", 1280, "after")]
    assert picked[0]["mime"] == "image/png" and base64.b64decode(picked[0]["b64"]) == b"png-bytes"


def test_a_failure_that_is_not_visual_attaches_nothing(tmp_path):
    shots = [shot(tmp_path, "after-0-1280.png")]
    for reason in ("node --check lỗi", "", None):
        assert agent.images({"gate": 5, "reason": reason, "evidence": {"screenshots": shots}}, temp_root=tmp_path) == []


def test_only_the_run_capture_dir_is_readable(tmp_path):
    outside = tmp_path / "elsewhere"
    outside.mkdir()
    (outside / "after-0-1280.png").write_bytes(b"png")
    nested = tmp_path / "ai-verify-shots-x" / "deep"
    nested.mkdir(parents=True)
    (nested / "after-1-1280.png").write_bytes(b"png")
    shots = [{"phase": "after", "page": "/a.html", "width": 1280, "path": str(outside / "after-0-1280.png")},
             {"phase": "after", "page": "/b.html", "width": 1280, "path": str(nested / "after-1-1280.png")},
             {"phase": "after", "page": "/c.html", "width": 1280, "path": str(tmp_path / "ai-verify-shots-x" / "gone.png")}]
    assert agent.images(visual_failure(shots), temp_root=tmp_path) == []


def test_the_image_cap_keeps_the_primary_page_and_an_oversized_file_is_dropped(tmp_path):
    big = shot(tmp_path, "after-1-1280.png", page="/login.html", data=b"x" * (agent.IMAGE_B64))
    primary = shot(tmp_path, "after-0-1280.png")
    result = visual_failure([shot(tmp_path, "after-2-1280.png", page="/third.html"), big, primary], primary=primary["path"])
    assert [item["page"] for item in agent.images(result, max_images=1, temp_root=tmp_path)] == ["/campus.html"]
    assert [item["page"] for item in agent.images(result, max_images=3, temp_root=tmp_path)] == [
        "/campus.html", "/third.html"]
    small = visual_failure([shot(tmp_path, "after-3-1280.png", page="/small.html", data=b"x" * 10)])
    assert len(agent.images(small, temp_root=tmp_path)) == 1
