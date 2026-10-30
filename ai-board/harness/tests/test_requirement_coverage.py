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
