"""A quoted format with value slots is not text the coder must copy verbatim."""
from gates.static_check import is_template


def test_slots_mark_a_template_and_plain_words_stay_literal():
    for text in ("N chế độ · M sẵn sàng", "Còn <số> câu", "{count} bài", "X điểm"):
        assert is_template(text), text
    for text in ("Lớp A", "Nộp bài", "Xem thêm", "NaCl 0.9%", "Đơn 1"):
        assert not is_template(text), text
