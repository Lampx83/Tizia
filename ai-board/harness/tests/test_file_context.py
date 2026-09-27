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


def test_retrieval_weights_fall_back_to_defaults_with_warning(tmp_path, caplog):
    """File hỏng → toàn bộ mặc định; khoá thiếu/sai kiểu → mặc định cho khoá đó, khoá hợp lệ vẫn dùng. Luôn cảnh báo."""
    bad = tmp_path / "w.json"
    bad.write_text("{not json", encoding="utf-8")
    assert file_context.load_weights(bad) == file_context.DEFAULT_WEIGHTS
    assert "retrieval_weights" in caplog.text

    caplog.clear()
    bad.write_text('{"max_phrases": {"value": 9, "_why": "x"}, "radius": {"value": "ba"}, "ngram": {"value": [2]}}',
                   encoding="utf-8")
    weights = file_context.load_weights(bad)
    assert weights["max_phrases"] == 9
    assert weights["radius"] == file_context.DEFAULT_WEIGHTS["radius"]
    assert weights["ngram"] == file_context.DEFAULT_WEIGHTS["ngram"]
    assert weights["exemplars"] == file_context.DEFAULT_WEIGHTS["exemplars"]
    assert "radius" in caplog.text and "exemplars" in caplog.text


def test_committed_retrieval_weights_load_without_warning(caplog):
    file_context.load_weights(file_context.WEIGHTS_PATH)
    assert caplog.text == ""
