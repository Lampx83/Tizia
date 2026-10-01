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


def test_ambiguous_search_error_shows_where_each_match_is_so_the_model_can_extend_it():
    content = "x\nfoo();\ny\nbar\nfoo();\nz\n"
    with pytest.raises(ValueError) as exact:
        file_context.apply_edits(content, [{"search": "foo();", "replace": "baz();"}])
    for needle in ("L1| x", "L2| foo();", "L3| y", "L4| bar", "L5| foo();", "L6| z"):
        assert needle in str(exact.value)
    with pytest.raises(ValueError) as loose:  # same duplicate once indentation is ignored
        file_context.apply_edits("  foo();\ny\n\tfoo();\nz\n", [{"search": "foo();", "replace": "baz();"}, ])
    assert "L1|" in str(loose.value) and "L3|" in str(loose.value)


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


def test_ambiguous_search_hint_tells_the_model_to_extend_search_with_the_listed_neighbour_lines():
    from gates import implement
    error = "edit 1: search khớp 2 chỗ, cần đoạn dài hơn để chỉ khớp 1 chỗ. Các chỗ khớp:\nL1| x\nL2| foo();\nL3| y"
    for iteration in (0, 1):
        hint = implement.retry_hint(error, iteration)
        assert "liền kề" in hint and "after_line" in hint


def test_search_that_matches_nothing_points_at_the_closest_real_line():
    content = "a\nif (ok) return '<div>Xin chào</div>';\nz\n"
    with pytest.raises(ValueError) as error:  # the model dropped the closing quote
        file_context.apply_edits(content, [{"search": "if (ok) return '<div>Xin chào</div>;", "replace": "x"}])
    message = str(error.value)
    assert "không khớp" in message and "gần giống nhất" in message
    assert "L2| if (ok) return '<div>Xin chào</div>';" in message
    with pytest.raises(ValueError) as unrelated:  # nothing resembles it: no misleading suggestion
        file_context.apply_edits(content, [{"search": "completely different text here", "replace": "x"}])
    assert "gần giống nhất" not in str(unrelated.value)
