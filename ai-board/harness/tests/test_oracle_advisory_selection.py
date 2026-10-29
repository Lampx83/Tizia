import re

from verification import functional as f

FAQ = {"request_title": "Thêm trang FAQ cơ sở dữ liệu", "request_detail": "Trang mới có ô tìm kiếm câu hỏi, ô tìm kiếm hoạt động"}
SEARCH_HISTORY = {"request_title": "Lịch sử tìm kiếm", "request_detail": "Hiển thị lịch sử tìm kiếm gần đây"}
COPY = {"request_title": "Nút copy phản hồi", "request_detail": "Nút copy response của yêu cầu"}

# Pre-fix regex from 5bd6b08f^: matched any "tìm kiếm" + "hoạt động" pair, so "ô tìm kiếm hoạt động" selected search-activity.
OLD_SEARCH = re.compile(r"search|tim kiem")


def test_request_7_wording_does_not_select_search_activity_oracle():
    assert f.select(FAQ) != f.SEARCH_PROBE
    assert f.expected_targets(FAQ) == set()


def test_old_regex_reproduces_the_wrong_oracle_for_request_7_text():
    text = f.request_text(FAQ)
    assert OLD_SEARCH.search(text) and re.search(r"activity|activities|hoat dong", text)


def test_real_search_history_request_still_selects_search_oracle():
    assert f.select(SEARCH_HISTORY) == f.SEARCH_PROBE


def test_copy_request_still_selects_copy_oracle():
    assert f.select(COPY) == f.COPY_PROBE
