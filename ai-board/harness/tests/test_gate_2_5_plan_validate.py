"""Cổng 2.5 (plan_validate.py, ticket 22) — soát plan (Q1) + phân quyền độ
phức tạp (Q2) trước khi cổng 3 tiêu ngân sách."""
import sqlite3
import time

import pytest

from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import plan_validate
from main import load_inbox, run_once


def _seed_user(db_path, *, display_name, role="student", domain_grant=None):
    con = sqlite3.connect(str(db_path))
    try:
        con.executescript(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        cur = con.execute(
            "INSERT INTO users (username, display_name, password_hash, role, created_at) VALUES (?, ?, 'x', ?, ?)",
            (display_name.lower().replace(" ", "."), display_name, role, now),
        )
        user_id = cur.lastrowid
        if domain_grant:
            con.execute(
                "INSERT INTO user_domain_grants (user_id, domain_id, granted_at) VALUES (?, ?, ?)",
                (user_id, domain_grant, now),
            )
        con.commit()
        return user_id
    finally:
        con.close()


def _seed_request_row(db_path, *, req_id, domain, student):
    """requests.id thật (khác id string của inbox item) — cần cho
    write_clarification()/request_messages join đúng bảng."""
    con = sqlite3.connect(str(db_path))
    try:
        con.executescript(plan_validate._SCHEMA_DDL)
        now = int(time.time() * 1000)
        con.execute(
            """INSERT INTO requests (id, domain, title, student, created_at, updated_at)
               VALUES (?, ?, 'x', ?, ?, ?)""",
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
    # cổng 3 không được gọi: chỉ có lời gọi cổng 1 + cổng 2.5, không có subtask nào.
    assert len(models.calls) == 2

    con = sqlite3.connect(str(db_file))
    try:
        rows = con.execute(
            "SELECT role, body FROM request_messages WHERE request_id = ?", (request_item["db_id"],)
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
    assert len(models.calls) == 2  # cổng 1 + cổng 2.5, cổng 3 không chạy


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

    con = sqlite3.connect(str(db_file))
    try:
        mine = con.execute("SELECT body FROM request_messages WHERE request_id = ?", (request_item["db_id"],)).fetchall()
        others = con.execute("SELECT body FROM request_messages WHERE request_id = ?", (other_id,)).fetchall()
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
