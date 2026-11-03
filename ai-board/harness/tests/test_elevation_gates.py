"""Cổng 1/2.5 với elevation: plan chạm protected/core trả elevation_required (không phải
lỗi cứng), elevation admin đã duyệt thì plan đi tiếp, vùng AI Board luôn bị chặn."""
import pytest

from budget import Budget
from conftest import FakeModels, deps_with
from gates import brainstorm, plan_validate
from runtime import levels


def protected_plan():
    return {
        "summary_vi": "Sửa câu trả lời FAQ trong context nội dung.",
        "capabilities": ["features"],
        "subtasks": [{"title": "Sửa FAQ", "file": "server/contexts/content/index.js",
                      "verify": "curl -s localhost:3000/api/content", "size": "small"}],
    }


def core_plan():
    return {
        "summary_vi": "Thêm cột thời hạn vào bảng người dùng.",
        "capabilities": ["features"],
        "subtasks": [{"title": "Sửa db", "file": "server/db.js",
                      "verify": "curl -s localhost:3000/health", "size": "small"}],
    }


def request_for(plan, **extra):
    return {"id": "req-1", "db_id": 1, "domain": "pharmacy", "type": "feature",
            "subject": "Đổi nội dung trang", "body": "sửa câu trả lời FAQ trong context nội dung",
            "grounding_required": False, **extra}


def approved(path, level, plan=None):
    return {"status": "approved", "scope": [{"path": path, "level": level}],
            **({"plan_hash": levels.fingerprint(plan)} if plan else {})}


# ── cổng 1 ──────────────────────────────────────────────────────────────────

def test_gate_1_returns_elevation_required_for_a_protected_plan():
    plan = protected_plan()
    out = brainstorm.run(request_for(plan), deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is True
    assert out["outcome"] == "elevation_required"
    body = out["elevation_required"]
    assert body["required"] == [{"path": "server/contexts/content/index.js", "level": "protected",
                                 "why": body["required"][0]["why"]}]
    assert out["plan"] is not None and out["plan"]["summary_vi"] == plan["summary_vi"]  # plan giữ để server lưu
    assert out["elevation"] == body and out["evidence"]["elevation"] == body               # worker chuyển tiếp
    # Worker POST /api/ai-board/worker/tickets/:id/elevation dùng thẳng paths/levels/reason này.
    assert body["paths"] == ["server/contexts/content/index.js"]
    assert body["levels"] == ["protected"]
    assert body["plan_hash"] == levels.fingerprint(out["plan"])
    assert body["reason"].startswith("elevation_required:")
    assert out["signals"] == ["elevation: protected server/contexts/content/index.js"]
    assert out["public_message"]


def test_gate_1_returns_elevation_required_for_a_core_plan():
    plan = core_plan()
    out = brainstorm.run(request_for(plan), deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["outcome"] == "elevation_required"
    assert out["elevation_required"]["required"][0]["path"] == "server/db.js"
    assert out["elevation_required"]["required"][0]["level"] == "core"


def test_gate_1_lets_the_plan_through_when_the_request_carries_an_approved_elevation():
    plan = protected_plan()
    request = request_for(plan, elevation=approved("server/contexts/content/index.js", "protected"))
    out = brainstorm.run(request, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is False, out
    assert out["plan"]["subtasks"][0]["file"] == "server/contexts/content/index.js"
    assert "elevation_required" not in out


def test_a_plan_context_elevation_is_read_too():
    plan = protected_plan()
    plan = {**plan, "elevation": approved("server/contexts/content/index.js", "protected")}
    out = brainstorm.run(request_for(plan), deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is False, out


def test_gate_1_still_hard_blocks_ai_board_paths_even_with_a_claimed_elevation():
    plan = protected_plan()
    plan["subtasks"][0]["file"] = "ai-board/harness/gates/brainstorm.py"
    request = request_for(plan, elevation=approved("ai-board/harness/gates/brainstorm.py", "core"))
    out = brainstorm.run(request, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is True
    assert out.get("outcome") is None          # lỗi cứng, không phải elevation_required
    assert "ngoài vùng được phép" in out["reason"]


def test_gate_1_elevation_covers_a_new_file_inside_the_approved_path():
    plan = protected_plan()
    plan["subtasks"][0]["file"] = "server/contexts/content/faq/new-faq.js"   # chưa có ở base
    request = request_for(plan, elevation=approved("server/contexts/content/faq/new-faq.js", "protected"))
    out = brainstorm.run(request, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is False, out


def test_a_verify_script_in_a_protected_area_makes_the_plan_need_elevation():
    plan = protected_plan()
    plan["subtasks"][0] = {**plan["subtasks"][0], "file": "public/index.html",
                           "verify": "python server/contexts/content/build.py"}
    out = brainstorm.run(request_for(plan), deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["outcome"] == "elevation_required"
    assert out["elevation_required"]["required"] == [
        {"path": "server/contexts/content/build.py", "level": "protected",
         "why": out["elevation_required"]["required"][0]["why"]}]


def test_a_verify_script_inside_ai_board_scope_is_a_hard_block():
    plan = protected_plan()
    plan["subtasks"][0] = {**plan["subtasks"][0], "file": "public/index.html",
                           "verify": "python ai-board/worker.py --check"}
    out = brainstorm.run(request_for(plan), deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is True
    assert out.get("outcome") is None
    assert "vùng AI Board" in out["reason"]


# ── cổng 2.5 ────────────────────────────────────────────────────────────────

def test_gate_2_5_returns_elevation_required_for_a_protected_plan():
    plan = protected_plan()
    deps = deps_with(plan)
    out = plan_validate.run(request_for(plan), deps, Budget(max_wall_clock_s=999), {"plan": plan})

    assert out["outcome"] == "elevation_required"
    assert out["blocked"] is True
    assert out["elevation_required"]["required"][0]["level"] == "protected"
    assert deps.models.calls == []   # quyết định bằng code: không đốt lời gọi validator


def test_gate_2_5_lets_an_approved_elevation_through():
    plan = core_plan()
    request = request_for(plan, elevation=approved("server/db.js", "core"))
    out = plan_validate.run(request, deps_with(plan), Budget(max_wall_clock_s=999), {"plan": plan})

    assert out["blocked"] is False, out
    assert out["reason"] is None


def test_gate_2_5_approved_elevation_replaces_only_the_outside_safe_zone_signal():
    plan = core_plan()
    plan["capabilities"] = ["features", "quiz"]           # vẫn còn 1 tín hiệu phức tạp khác
    request = request_for(plan, elevation=approved("server/db.js", "core"))
    out = plan_validate.run(request, deps_with(plan), Budget(max_wall_clock_s=999), {"plan": plan})

    assert out["outcome"] == "complexity_gated"
    assert out["signals"] == ["capabilities: features, quiz"]


def test_gate_2_5_blocks_ai_board_paths_hard_even_with_elevation():
    plan = {"summary_vi": "x", "capabilities": [], "subtasks": [
        {"title": "a", "file": "server/ai-board/store.js", "verify": "v", "size": "small"}]}
    request = request_for(plan, elevation=approved("server/ai-board/store.js", "core"))
    out = plan_validate.run(request, deps_with(plan), Budget(max_wall_clock_s=999), {"plan": plan})

    assert out["blocked"] is True
    assert out.get("outcome") is None
    assert "AI Board" in out["reason"]


@pytest.mark.parametrize("level", ["surface", "protected"])
def test_complexity_signals_unchanged_without_elevation(level):
    plan = protected_plan()
    assert plan_validate.complexity_signals(plan) == ["file ngoài vùng an toàn: server/contexts/content/index.js"]
    assert plan_validate.complexity_signals(plan, {"server/contexts/content/index.js"}) == []
