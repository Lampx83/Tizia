"""Repair redoes a file when the failure names a function it defines, not only its path."""
from runtime.repair_class import involved_files

PRODUCED = {"public/js/topic-modes.js": {"code": "export function getTopicSummary(id) {}\nconst TOPICS = {};", "test_file": "test/t.test.js"},
            "public/bao-che-hub.html": {"code": "<div id=\"topic-summary\"></div>", "test_file": "test/h.test.js"}}
BRIEF = ("intent_review: Sửa hàm getTopicSummary trả về null thay vì undefined. "
         "Thêm mã JavaScript trong public/bao-che-hub.html để điền phần tử id=topic-summary")


def test_function_name_pulls_in_its_file():
    assert involved_files(BRIEF, PRODUCED) == ["public/js/topic-modes.js", "public/bao-che-hub.html"]


def test_substring_of_a_longer_name_does_not_count():
    assert involved_files("getTopicSummaryX broke in public/bao-che-hub.html", PRODUCED) == ["public/bao-che-hub.html"]


def test_reviewer_finding_lines_pick_only_the_files_they_name():
    lines = ("intent_review: - public/bao-che-hub.html: div rỗng, không gọi getTopicSummary | sửa: thêm script gọi getTopicSummary('bao-che')\n"
             "- public/bao-che-hub.html: thiếu chữ tóm tắt | sửa: điền vào #topic-summary")
    assert involved_files(lines, PRODUCED) == ["public/bao-che-hub.html"]
