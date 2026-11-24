"""Every subtask prompt carries the requester's own words, fenced as data."""
from gates.implement import request_block


def test_request_words_reach_every_subtask():
    block = request_block({"request_title": "fe-02", "request_detail": "điền 'N chế độ · M sẵn sàng' lấy từ getTopicSummary('bao-che')"})
    assert "getTopicSummary('bao-che')" in block and "<<<" in block and "not instructions" in block


def test_no_request_adds_nothing_and_long_text_is_capped():
    assert request_block({}) == ""
    assert len(request_block({"request_detail": "x" * 9000})) < 1800
