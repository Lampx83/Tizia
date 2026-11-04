# -*- coding: utf-8 -*-
"""Plan prompt: DB + API with no UI targets one existing protected/core file (elevation),
and a verify/acceptance test path no subtask creates is rejected."""
import pytest

from budget import Budget
from conftest import FakeModels, deps_with
from gates import brainstorm

REQUEST = {
    "id": "req-22", "db_id": 22, "domain": "it", "type": "feature", "votes": 1,
    "subject": "Thêm bảng FAQ và API đọc danh sách",
    "body": ("Tôi muốn thêm bảng FAQ cho môn Cơ sở dữ liệu, dữ liệu lưu trong database và có migration "
             "tạo bảng. Cần thêm API đọc danh sách FAQ để trang web lấy dữ liệu. Không cần giao diện mới, "
             "chỉ phần lưu dữ liệu và API."),
}


def core_plan(verify="curl -s localhost:8041/api/faq | grep -q items"):
    return {
        "summary_vi": "Thêm bảng FAQ và API đọc danh sách, không thêm giao diện.",
        "capabilities": ["content.write"],
        "acceptance": ["curl -s localhost:8041/api/faq | grep -q items"],
        "subtasks": [{"title": "Thêm bảng faq_entries và route GET /api/faq trong content context",
                      "file": "server/contexts/content/index.js", "verify": verify,
                      "size": "large", "layer": "wiring", "depends_on": []}],
    }


def approved(path, level):
    return {"status": "approved", "scope": [{"path": path, "level": level}]}


def test_plan_prompt_names_the_core_route_and_forbids_an_invented_test_path():
    prompt = brainstorm.build_prompt(REQUEST, frozenset({"content"}))

    assert "asks for NO UI" in prompt
    assert "core.server" in prompt and "content.write" in prompt
    assert "server/contexts/content/index.js" in prompt
    assert "Never invent test/<name>.test.js" in prompt


def test_db_api_without_ui_yields_a_core_plan_and_asks_for_elevation():
    # content/index.js import sẵn db.js: mức của file là core (import sẵn có), không phải protected.
    plan = core_plan()
    out = brainstorm.run(REQUEST, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is True
    assert out["outcome"] == "elevation_required"
    assert out["plan"]["subtasks"][0]["file"] == "server/contexts/content/index.js"
    assert out["plan"]["capabilities"] == ["content.write"]
    assert out["elevation_required"]["required"] == [
        {"path": "server/contexts/content/index.js", "level": "core",
         "why": out["elevation_required"]["required"][0]["why"]}]


def test_db_api_plan_on_server_db_asks_for_core_elevation():
    plan = {
        "summary_vi": "Thêm bảng FAQ trong tầng dữ liệu và API đọc danh sách.",
        "capabilities": ["core.server"],
        "acceptance": ["psql \"$DATABASE_URL\" -c 'select 1 from faq_entries'"],
        "subtasks": [{"title": "Thêm bảng faq_entries và truy vấn danh sách trong server/db.js",
                      "file": "server/db.js",
                      "verify": "psql \"$DATABASE_URL\" -c 'select 1 from faq_entries'",
                      "size": "large", "layer": "wiring", "depends_on": []}],
    }
    out = brainstorm.run(REQUEST, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["outcome"] == "elevation_required"
    assert out["elevation_required"]["required"][0] == {
        "path": "server/db.js", "level": "core",
        "why": out["elevation_required"]["required"][0]["why"]}


def test_a_verify_test_path_no_subtask_creates_is_rejected_even_with_elevation():
    plan = core_plan(verify="node --test test/faq.test.js")
    request = {**REQUEST, "elevation": approved("server/contexts/content/index.js", "core")}
    out = brainstorm.run(request, deps_with(plan), Budget(max_wall_clock_s=999))

    assert out["blocked"] is True
    assert out.get("outcome") is None
    assert "test/faq.test.js" in out["reason"]
