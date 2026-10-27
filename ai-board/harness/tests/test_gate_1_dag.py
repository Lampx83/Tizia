# -*- coding: utf-8 -*-
"""LF/106: Gate 1 plan schema — layer, depends_on DAG, feature acceptance, vùng db/backend."""
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from gates import brainstorm


def feature_plan():
    return {
        "summary_vi": "Thêm gallery ảnh cho lớp.",
        "capabilities": ["generated.context", "public.ui"],
        "acceptance": ["node --test test/gallery.test.js"],
        "subtasks": [
            {"title": "Tạo bảng gallery", "file": "server/contexts/_ai-generated/gallery/migrations/001-gallery.sql",
             "verify": "migration chỉ có CREATE TABLE", "size": "small", "layer": "db", "depends_on": []},
            {"title": "API gallery", "file": "server/contexts/_ai-generated/gallery/index.js",
             "verify": "GET /api/gallery trả 200", "size": "small", "layer": "backend", "depends_on": [1]},
            {"title": "Trang gallery", "file": "public/gallery.html",
             "verify": "trang có #gallery", "size": "small", "layer": "frontend", "depends_on": [2]},
        ],
    }


def test_small_plan_keeps_old_shape_and_defaults_to_a_chain():
    plan = brainstorm.parse_plan(json.dumps({
        "summary_vi": "Sửa chữ nút.",
        "capabilities": [],
        "subtasks": [{"title": "Đổi chữ", "file": "public/a.html", "verify": "có chữ mới", "size": "small"}],
    }))
    assert plan["subtasks"][0]["depends_on"] == []
    brainstorm.check_files(plan, None, None)
    assert plan["subtasks"][0]["layer"] == "frontend"


def test_feature_plan_keeps_layers_and_dag():
    plan = brainstorm.parse_plan(json.dumps(feature_plan()))
    assert [st["depends_on"] for st in plan["subtasks"]] == [[], [1], [2]]
    assert [st["layer"] for st in plan["subtasks"]] == ["db", "backend", "frontend"]
    brainstorm.check_files(plan, None, None)


def test_depends_on_rejects_self_cycles_and_out_of_range():
    self_dep = feature_plan()
    self_dep["subtasks"][1]["depends_on"] = [2]
    with pytest.raises(ValueError, match="chính nó"):
        brainstorm.parse_plan(json.dumps(self_dep))
    cycle = feature_plan()
    cycle["subtasks"][0]["depends_on"] = [3]
    cycle["subtasks"][2]["depends_on"] = [1]
    with pytest.raises(ValueError, match="chu trình"):
        brainstorm.parse_plan(json.dumps(cycle))
    outside = feature_plan()
    outside["subtasks"][0]["depends_on"] = [7]
    with pytest.raises(ValueError, match="ngoài 1"):
        brainstorm.parse_plan(json.dumps(outside))
    wrong_type = feature_plan()
    wrong_type["subtasks"][0]["depends_on"] = ["1"]
    with pytest.raises(ValueError, match="mảng số thứ tự"):
        brainstorm.parse_plan(json.dumps(wrong_type))


def test_unknown_layer_and_bad_acceptance_are_rejected():
    bad_layer = feature_plan()
    bad_layer["subtasks"][1]["layer"] = "mobile"
    with pytest.raises(ValueError, match="layer='mobile'"):
        brainstorm.parse_plan(json.dumps(bad_layer))
    bad_acceptance = feature_plan()
    bad_acceptance["acceptance"] = [""]
    with pytest.raises(ValueError, match="acceptance"):
        brainstorm.parse_plan(json.dumps(bad_acceptance))


def test_db_must_be_a_new_generated_context_migration_and_backend_stays_generated():
    db_public = feature_plan()
    db_public["subtasks"][0]["file"] = "public/gallery.html"
    with pytest.raises(ValueError, match="migration mới"):
        brainstorm.check_files(brainstorm.parse_plan(json.dumps(db_public)), None, None)
    backend_core = feature_plan()
    backend_core["subtasks"][1]["file"] = "server/contexts/identity/auth.js"
    with pytest.raises(ValueError, match="server/contexts/_ai-generated"):
        brainstorm.check_files(brainstorm.parse_plan(json.dumps(backend_core)), None, None)
    ai_board = feature_plan()
    ai_board["subtasks"][2]["file"] = "ai-board/worker.py"
    with pytest.raises(ValueError, match="ngoài vùng được phép"):
        brainstorm.check_files(brainstorm.parse_plan(json.dumps(ai_board)), None, None)


def test_existing_migration_is_not_additive(monkeypatch):
    plan = brainstorm.parse_plan(json.dumps(feature_plan()))
    monkeypatch.setattr(brainstorm.code_index, "git",
                        lambda source, *args: b"server/contexts/_ai-generated/gallery/migrations/001-gallery.sql\n"
                        if any("migrations" in str(arg) for arg in args) else b"server/contexts/_ai-generated/gallery/index.js\n")
    with pytest.raises(ValueError, match="additive"):
        brainstorm.check_files(plan, "src", "a" * 40)


def test_canonical_maps_dag_and_feature_acceptance():
    worker_plan = brainstorm.parse_plan(json.dumps(feature_plan()))
    canonical = __import__("worker").HarnessPlanner._canonical(
        {"domain": "pharmacy", "type": "feature"}, worker_plan, None,
        {"generated.context": {"allow": ["server/contexts/_ai-generated/"], "deny": []},
         "public.ui": {"allow": ["public/"], "deny": []}})
    assert [step["depends_on"] for step in canonical["steps"]] == [[], [1], [2]]
    assert [step["layer"] for step in canonical["steps"]] == ["db", "backend", "frontend"]
    assert canonical["acceptance"] == ["node --test test/gallery.test.js"]
