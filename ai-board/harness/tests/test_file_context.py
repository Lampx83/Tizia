"""Short-term memory cho cổng 3: trích file theo từ khoá và áp khối tìm/thay."""
import pytest

import file_context


def test_keywords_prefer_quoted_phrases_and_drop_stopwords():
    words = file_context.keywords("Thêm dòng 'Tizia cập nhật' vào chân trang", "mở trang thấy chân trang")
    assert words[0] == "tizia cập nhật"
    assert "chân" in words and "thêm" not in words and "trang" not in words


def test_excerpt_numbers_lines_keeps_hits_tail_and_budget():
    content = "".join(f"dòng {i}\n" for i in range(1, 501)).replace("dòng 250\n", "<footer>chân</footer>\n")
    text = file_context.excerpt(content, ["chân"], budget=400)
    assert "L250| <footer>chân</footer>" in text and "L247| dòng 247" in text
    assert "L500| dòng 500" in text  # tail always considered
    assert "L100|" not in text and "…" in text
    assert len(text) < 600


def test_apply_edits_exact_and_line_number_prefixed_search():
    content = "a\nb\nc\n"
    assert file_context.apply_edits(content, [{"search": "b", "replace": "B"}]) == "a\nB\nc\n"
    assert file_context.apply_edits(content, [{"search": "L2| b\nL3| c", "replace": "L2| x\nL3| y"}]) == "a\nx\ny\n"


def test_apply_edits_keeps_crlf():
    assert file_context.apply_edits("a\r\nb\r\n", [{"search": "a\nb", "replace": "a\nz"}]) == "a\r\nz\r\n"


@pytest.mark.parametrize("edit, message", [
    ({"search": "zzz", "replace": "x"}, "không khớp"),
    ({"search": "a", "replace": "x"}, "2 chỗ"),
])
def test_apply_edits_rejects_missing_or_ambiguous_search(edit, message):
    with pytest.raises(ValueError, match=message):
        file_context.apply_edits("a\na\n", [edit])
