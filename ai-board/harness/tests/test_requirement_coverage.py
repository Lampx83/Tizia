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
