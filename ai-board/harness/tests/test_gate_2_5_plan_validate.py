"""Cổng 2.5 (plan_validate.py) — soát plan (Q1) + phân quyền độ
phức tạp (Q2) trước khi cổng 3 tiêu ngân sách."""
import time

import pytest

from budget import Budget
from conftest import FakeModels, connect, deps_with, plan_with
from gates import plan_validate
from main import load_inbox, run_once


def _seed_user(db_path, *, display_name, role="student", domain_grant=None):
    con = connect(db_path)
    try:
        con.execute(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        cur = con.execute(
            "INSERT INTO users (username, display_name, password_hash, role, created_at) VALUES (%s, %s, 'x', %s, %s) RETURNING id",
            (display_name.lower().replace(" ", "."), display_name, role, now),
        )
        user_id = cur.fetchone()[0]
        if domain_grant:
            con.execute(
                "INSERT INTO user_domain_grants (user_id, domain_id, granted_at) VALUES (%s, %s, %s)",
                (user_id, domain_grant, now),
            )
        con.commit()
        return user_id
    finally:
        con.close()


def _seed_request_row(db_path, *, req_id, domain, student):
    """requests.id thật (khác id string của inbox item) — cần cho
    write_clarification()/request_messages join đúng bảng."""
    con = connect(db_path)
    try:
        con.execute(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        con.execute(
            """INSERT INTO requests (id, domain, title, student, created_at, updated_at)
               VALUES (%s, %s, 'x', %s, %s, %s)""",
            (req_id, domain, student, now, now),
        )
        con.commit()
    finally:
        con.close()


# ── is_complex(): tín hiệu tính từ plan, không gọi model ────────────────────

def test_is_complex_true_for_2_distinct_capabilities():
    assert plan_validate.is_complex(plan_with(["features", "quiz"])) is True


def test_is_complex_false_for_simple_default_plan():
    # plan_with mặc định: 1 capability, 2 subtask, cả 2 trong vùng an toàn.
    assert plan_validate.is_complex(plan_with(["features"])) is False


def test_is_complex_true_for_4_or_more_subtasks():
    plan = plan_with(["features"])
    plan["subtasks"] = plan["subtasks"] * 2  # 4 subtask
    assert plan_validate.is_complex(plan) is True


def test_is_complex_true_for_file_outside_safe_zones():
    plan = plan_with(["features"])
    plan["subtasks"][0]["file"] = "server/index.js"  # NGOÀI _ai-generated/public
    assert plan_validate.is_complex(plan) is True


def test_is_complex_false_for_routine_new_ai_generated_plugin():
    """Tạo 1 plugin _ai-generated MỚI (trường hợp thường ngày) KHÔNG tự nó
    tính là 'route mới' đáng cảnh giác — xem docstring module lý do đổi từ
    thiết kế ban đầu (tránh mâu thuẫn với "đa số request đơn giản không bị
    ảnh hưởng")."""
    plan = plan_with(["features"])
    assert all(
        st["file"].startswith(("server/contexts/_ai-generated/", "public/"))
        for st in plan["subtasks"]
    )
    assert plan_validate.is_complex(plan) is False


# ── AC 1: plan không rõ -> needs_clarification, cổng 3 không chạy ──────────

def test_unclear_plan_blocks_before_gate_3_and_writes_clarification(db_file, request_item):
    _seed_request_row(db_file, req_id=request_item["db_id"], domain=request_item["domain"], student=request_item["from"])
    models = FakeModels(plan_with(["features"]), validation={"clear": False, "question": "File nào chứa danh sách hoạt chất?"})
    deps = deps_with(models)

    out = run_once(request_item, db_path=db_file, deps=deps)

    assert out["outcome"] == "needs_clarification"
    assert out["gate_reached"] == 2.5
    assert out["public_message"] == "File nào chứa danh sách hoạt chất?"
    # cổng 3 không được gọi: chỉ có lời gọi cổng 1 + cổng 2.5, không có subtask nào.
    assert len(models.calls) == 3  # intake + cổng 1 + cổng 2.5

    con = connect(db_file)
    try:
        rows = con.execute(
            "SELECT role, body FROM request_messages WHERE request_id = %s", (request_item["db_id"],)
        ).fetchall()
    finally:
        con.close()
    assert rows == [("admin", "File nào chứa danh sách hoạt chất?")]


# ── AC 2: plan phức tạp + user thường -> complexity_gated ───────────────────

def test_complex_plan_from_ordinary_user_is_gated(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student")
    models = FakeModels(plan_with(["features", "quiz"]))  # 2 capability -> complex
    deps = deps_with(models)

    out = run_once(request_item, db_path=db_file, deps=deps)

    assert out["outcome"] == "complexity_gated"
    assert out["gate_reached"] == 2.5
    assert len(models.calls) == 3  # intake + cổng 1 + cổng 2.5, cổng 3 không chạy


def test_complexity_gate_names_the_signals_that_fired():
    plan = plan_with(["features", "quiz"])
    plan["subtasks"] = [{**plan["subtasks"][0], "file": "server/index.js"}] * 4
    signals = plan_validate.complexity_signals(plan)
    assert [s.split(":")[0] for s in signals] == ["capabilities", "file ngoài vùng an toàn", "subtasks"]
    assert plan_validate.complexity_signals(plan_with(["features"])) == []


def test_complex_plan_from_unmapped_guest_is_gated_fail_closed(db_file, request_item):
    # KHÔNG seed user nào -> display_name không map được sang user thật.
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "complexity_gated"


# ── AC 3: cùng plan phức tạp, requester admin/có grant -> cổng 3 chạy bình thường ──

def test_complex_plan_from_admin_reaches_gate_7(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="admin")
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


def test_complex_plan_from_domain_expert_with_matching_grant_reaches_gate_7(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student", domain_grant=request_item["domain"])
    models = FakeModels(plan_with(["features", "quiz"]))
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


def test_complex_plan_from_grant_in_different_domain_is_still_gated(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student", domain_grant="economics")
    models = FakeModels(plan_with(["features", "quiz"]))  # request_item.domain == "pharmacy"
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "complexity_gated"


# ── AC 4: plan đơn giản, user thường -> luôn qua, không bị ảnh hưởng ────────

def test_simple_plan_from_ordinary_user_always_reaches_gate_3(db_file, request_item):
    _seed_user(db_file, display_name=request_item["from"], role="student")
    models = FakeModels(plan_with(["features"]))  # 1 capability, 2 subtask, vùng an toàn
    out = run_once(request_item, db_path=db_file, deps=deps_with(models))
    assert out["outcome"] == "ok"
    assert out["gate_reached"] == 7


# ── AC 5: message làm rõ đúng request_id, đọc lại được ──────────────────────

def test_clarification_message_targets_correct_request_id(db_file, request_item):
    other_id = request_item["db_id"] + 1
    _seed_request_row(db_file, req_id=request_item["db_id"], domain=request_item["domain"], student=request_item["from"])
    _seed_request_row(db_file, req_id=other_id, domain=request_item["domain"], student="Ai khac")

    plan_validate.write_clarification(db_file, request_item, "Câu hỏi làm rõ")

    con = connect(db_file)
    try:
        mine = con.execute("SELECT body FROM request_messages WHERE request_id = %s", (request_item["db_id"],)).fetchall()
        others = con.execute("SELECT body FROM request_messages WHERE request_id = %s", (other_id,)).fetchall()
    finally:
        con.close()
    assert mine == [("Câu hỏi làm rõ",)]
    assert others == []


# ── validator trả sai schema -> block với lý do rõ (không phải outcome đặc biệt) ──

def test_validator_bad_schema_blocks_generically():
    deps = deps_with(FakeModels(plan_with(["features"]), validation="khong phai JSON hop le"))
    out = plan_validate.run({"id": "x", "domain": "pharmacy"}, deps, Budget(max_wall_clock_s=999), {"plan": plan_with(["features"])})
    assert out["blocked"] is True
    assert "reason" in out
    assert out.get("outcome") is None


def test_run_blocks_without_plan_in_state():
    deps = deps_with(plan_with(["features"]))
    out = plan_validate.run({"id": "x"}, deps, Budget(max_wall_clock_s=999), {})
    assert out["blocked"] is True


def test_validator_uses_bounded_schema_and_never_accepts_truncated_output():
    class Truncated(FakeModels):
        def generate(self, *args, **kwargs):
            body = super().generate(*args, **kwargs)
            body['done_reason'] = 'length'
            return body
    plan = plan_with(['features'])
    models = Truncated(plan)
    result = plan_validate.run({'id': 'x'}, deps_with(models), Budget(), {'plan': plan})
    assert result['blocked'] and 'truncated' in result['reason']
    assert models.calls[0]['format']['properties']['grounding']['items']['properties']['quote']['maxLength'] == 320
    assert models.calls[0]['num_predict'] == 3072


def test_http_worker_leaves_complexity_to_the_server_tier():
    from conftest import FakeModels, deps_with
    from budget import Budget
    plan = plan_with(["features", "quiz"])  # 2 capabilities: complex
    state = {"plan": plan}
    out = plan_validate.run({"id": "req-1", "complexity_by_server": True}, deps_with(FakeModels(plan)), Budget(), state)
    assert out["blocked"] is False and out["signals"] and state["complexity_signals"] == out["signals"]


def test_complex_http_plan_is_submitted_as_high_risk():
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import HarnessPlanner
    old = {"summary_vi": "x", "capabilities": ["features"],
           "subtasks": [{"title": "t", "file": "public/a.html", "verify": "v", "size": "small"}]}
    assert HarnessPlanner._canonical({"domain": "it"}, old, ["subtasks: 4"])["risk"] == "high"
    assert HarnessPlanner._canonical({"domain": "it"}, old)["risk"] == "low"
