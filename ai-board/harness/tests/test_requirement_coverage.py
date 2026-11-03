import pytest
from runtime import coverage

SPEC = """Mục tiêu: trang FAQ.

Kết quả mong đợi:
- Trang hiển thị danh sách câu hỏi về cơ sở dữ liệu
- Ô tìm kiếm lọc danh sách câu hỏi

Ghi chú khác
"""


def test_conditions_are_split_from_expected_results_section():
    assert coverage.conditions(SPEC) == [
        "Trang hiển thị danh sách câu hỏi về cơ sở dữ liệu",
        "Ô tìm kiếm lọc danh sách câu hỏi",
    ]


def test_spec_without_section_has_no_conditions():
    assert coverage.conditions("chỉ có mô tả") == []


def test_full_plan_covers_each_condition_with_runnable_verify():
    plan = {"subtasks": [
        {"title": "Danh sách câu hỏi cơ sở dữ liệu", "verify": "node --test test/faq-list.test.js"},
        {"title": "Ô tìm kiếm lọc câu hỏi", "verify": "node --test test/faq-search.test.js"},
    ]}
    assert coverage.uncovered(SPEC, plan) == []


def test_plan_with_descriptive_verify_leaves_condition_uncovered():
    plan = {"subtasks": [
        {"title": "Danh sách câu hỏi cơ sở dữ liệu", "verify": "trang hiển thị danh sách câu hỏi"},
        {"title": "Ô tìm kiếm lọc câu hỏi", "verify": "node --test test/faq-search.test.js"},
    ]}
    assert coverage.uncovered(SPEC, plan) == ["Trang hiển thị danh sách câu hỏi về cơ sở dữ liệu"]


def test_inline_expected_result_is_one_condition():
    spec = "Kết quả mong đợi (cách kiểm): Truy cập trang thấy ô tìm kiếm, bấm thẻ mở/đóng.\n\nNguyên văn người dùng:\n- Tiêu đề: x\n"
    assert coverage.conditions(spec) == ["Truy cập trang thấy ô tìm kiếm, bấm thẻ mở/đóng."]


def test_spec_without_section_uses_one_model_call_and_parses_its_json():
    calls = []

    def call_model(prompt):
        calls.append(prompt)
        return '{"conditions": ["Trang có ô tìm kiếm", "Bấm thẻ mở/đóng"]}'

    found, source = coverage.spec_conditions("Tiêu đề: FAQ\nMô tả: có tìm kiếm", call_model)
    assert found == ["Trang có ô tìm kiếm", "Bấm thẻ mở/đóng"] and source == "model" and len(calls) == 1


def test_spec_with_section_never_calls_the_model():
    calls = []
    found, source = coverage.spec_conditions(SPEC, lambda prompt: calls.append(prompt) or "{}")
    assert source == "section" and calls == [] and len(found) == 2


def test_bad_model_json_gives_no_conditions_not_a_crash():
    assert coverage.parse_model("không phải json") == []
    assert coverage.parse_model('{"conditions": "x"}') == []


def test_worker_check_flags_a_plan_without_the_module_and_passes_the_full_plan():
    import sys
    from pathlib import Path
    from types import SimpleNamespace

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from worker import _uncovered_conditions

    request = {"clarified_spec": SPEC}
    descriptive = {"subtasks": [{"title": "Danh sách câu hỏi cơ sở dữ liệu", "verify": "trang hiển thị danh sách câu hỏi"}]}
    full = {"subtasks": [
        {"title": "Danh sách câu hỏi cơ sở dữ liệu", "verify": "node --test test/faq-list.test.js"},
        {"title": "Ô tìm kiếm lọc câu hỏi", "verify": "node --test test/faq-search.test.js"}]}
    assert _uncovered_conditions(request, descriptive, SimpleNamespace(), None) != []
    assert _uncovered_conditions(request, full, SimpleNamespace(), None) == []


def test_condition_overlap_alone_never_blocks_a_plan_with_runnable_verify():
    from worker import _has_runnable_verify
    runnable = {"subtasks": [{"title": "Module", "verify": "node --test test/a.test.js"}]}
    descriptive = {"subtasks": [{"title": "Module", "verify": "mở trang thấy nút"}]}
    assert _has_runnable_verify(runnable) and not _has_runnable_verify(descriptive) and not _has_runnable_verify({})


def test_plan_block_shared_check():
    from runtime import coverage
    ok = {"subtasks": [{"file": "a.js", "verify": "node --test test/a.test.js"}]}
    desc = {"subtasks": [{"file": "a.js", "verify": "mở trang thấy 3 thẻ"}]}
    layered_desc = {"subtasks": [{"file": "a.js", "layer": "backend", "verify": "xem log"}]}
    layered_ok_other = {"subtasks": [{"file": "a.js", "layer": "frontend", "verify": "xem log"},
                                     {"file": "b.js", "verify": "node --test t.js"}]}
    never = lambda: pytest.fail("no model/overlap call when a runnable verify exists")
    assert coverage.plan_block(ok, never) is None
    assert "verify phải là lệnh chạy được" in coverage.plan_block(layered_desc, lambda: [])
    assert "verify phải là lệnh chạy được" in coverage.plan_block(layered_ok_other, never)
    assert coverage.plan_block(desc, lambda: ["Có nút tìm"]).startswith("điều kiện chưa có subtask")
    assert coverage.plan_block(desc, lambda: []) is None


def test_overlap_alone_never_blocks_plan_with_runnable_verify():
    from runtime import coverage
    plan = {"subtasks": [{"file": "a.js", "title": "x", "verify": "node --test t.js"}]}
    assert coverage.uncovered_items(["điều kiện không trùng từ nào"], plan) != []
    assert coverage.plan_block(plan, lambda: coverage.uncovered_items(["điều kiện không trùng từ nào"], plan)) is None


REQUEST_13 = {
    "subject": "Thêm sổ tay Git",
    "detail": ("Làm trang public/so-tay-git.html, đăng ký trong public/js/domains/it/experiences.js và "
               "public/js/domains/it/modules.js, thêm tòa nhà vào public/b-iso-canvas.html, "
               "kèm test/so-tay-git.test.js. Trang phải có chữ \"Sổ tay Git\"."),
    "thread": [{"role": "admin", "body": "Bạn muốn sửa public/khong-ai-hoi.html không?"}],
}


def _plan(*files, title="Sổ tay Git"):
    return {"subtasks": [{"file": f, "title": title, "verify": "node --test test/so-tay-git.test.js"} for f in files]}


def test_request_13_plan_with_two_of_four_files_and_no_test_is_incomplete():
    from runtime import coverage
    plan = _plan("public/so-tay-git.html", "public/js/domains/it/experiences.js")
    missing = coverage.requested_missing(plan, coverage.user_text(REQUEST_13))
    assert missing == ["public/js/domains/it/modules.js", "public/b-iso-canvas.html"]
    reason = coverage.plan_block(plan, lambda: [], lambda: missing)
    assert reason.startswith("yêu cầu nhắc tên") and "modules.js" in reason


def test_named_test_needs_acceptance_or_verify_not_a_subtask():
    from runtime import coverage
    text = coverage.user_text(REQUEST_13)
    full = ["public/so-tay-git.html", "public/js/domains/it/experiences.js", "public/js/domains/it/modules.js", "public/b-iso-canvas.html"]
    bare = {"subtasks": [{"file": f, "title": "Sổ tay Git", "verify": "node --check x.js"} for f in full]}
    assert coverage.requested_missing(bare, text) == ["test/so-tay-git.test.js"]
    assert coverage.requested_missing({**bare, "acceptance": ["node --test test/so-tay-git.test.js"]}, text) == []


def test_request_13_full_plan_passes_and_thread_paths_are_ignored():
    from runtime import coverage
    plan = _plan("public/so-tay-git.html", "public/js/domains/it/experiences.js", "public/js/domains/it/modules.js",
                 "public/b-iso-canvas.html", "test/so-tay-git.test.js")
    assert coverage.requested_missing(plan, coverage.user_text(REQUEST_13)) == []
    assert coverage.plan_block(plan, lambda: [], lambda: []) is None


def test_reference_only_path_and_missing_literal_text():
    from runtime import coverage
    text = "Làm trang a.html giống trang mẫu b.html. Có chữ \"Xin chào bạn\"."
    assert coverage.requested_paths(text) == ["a.html"]
    assert coverage.requested_missing(_plan("a.html"), text) == ['chữ "Xin chào bạn"']
    assert coverage.requested_missing({"subtasks": [{"file": "a.html", "title": "Hiện Xin chào bạn", "verify": "x"}]}, text) == []


def test_plan_without_subtasks_is_never_valid():
    from runtime import coverage
    assert coverage.plan_block({"subtasks": []}, lambda: []) == "plan không có subtask nào"


def test_canonical_plan_has_no_duplicate_acceptance_and_scope_matches_steps():
    from worker import HarnessPlanner
    old = {"summary_vi": "x", "subtasks": [
        {"title": "a", "file": "public/a.html", "verify": "node --test test/a.test.js"},
        {"title": "b", "file": "public/js/b.js", "verify": "node --test test/a.test.js"}]}
    plan = HarnessPlanner._canonical({"domain": "it"}, old)
    assert plan["acceptance"] == ["node --test test/a.test.js"] and plan["tests"] == plan["acceptance"]
    assert plan["allowed_scope"] == [s["allowed_scope"][0] for s in plan["steps"]] == ["public/a.html", "public/js/b.js"]


def test_repair_note_demands_a_subtask_for_every_named_item():
    from worker import _plan_repair_note
    assert "phải có subtask riêng" in _plan_repair_note("yêu cầu nhắc tên nhưng plan thiếu subtask/hạng mục: x.js")


REQUEST_16 = (
    "Tạo trang mới public/so-tay-git.html liệt kê 8 lệnh Git cơ bản. "
    "Đăng ký trang trong public/js/domains/it/experiences.js và public/js/domains/it/modules.js. "
    "Thêm một tòa nhà mặc định tên \"Sổ tay Git\" trong layout mặc định ở public/campus-proto/b-iso-canvas.html. "
    "Kiểm tra: node --test test/so-tay-git.test.js."
)


def test_item_name_must_appear_in_the_subtask_for_its_file():
    from runtime import coverage
    plan = {"subtasks": [
        {"file": "public/so-tay-git.html", "title": "Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/js/domains/it/experiences.js", "title": "Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/js/domains/it/modules.js", "title": "Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/campus-proto/b-iso-canvas.html", "title": "Cập nhật layout", "verify": "node --test test/so-tay-git.test.js"},
    ]}
    assert coverage.requested_missing(plan, REQUEST_16) == [
        'chữ "Sổ tay Git" trong public/campus-proto/b-iso-canvas.html']
    plan["subtasks"][3]["title"] = "Thêm tòa nhà Sổ tay Git vào layout"
    assert coverage.requested_missing(plan, REQUEST_16) == []


def test_the_campus_subtask_cannot_borrow_the_name_from_the_page_task():
    from runtime import coverage
    plan = {"subtasks": [
        {"file": "public/so-tay-git.html", "title": "Trang Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/js/domains/it/experiences.js", "title": "Đăng ký Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/js/domains/it/modules.js", "title": "Đăng ký Sổ tay Git", "verify": "node --test test/so-tay-git.test.js"},
        {"file": "public/campus-proto/b-iso-canvas.html", "title": "Thêm tòa nhà", "verify": "node --test test/so-tay-git.test.js"},
    ]}
    assert coverage.requested_missing(plan, coverage.user_text({"detail": REQUEST_16})) == [
        'chữ "Sổ tay Git" trong public/campus-proto/b-iso-canvas.html']
