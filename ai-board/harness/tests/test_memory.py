"""Long-term memory: bài học JSONL ghi sau verdict, truy xuất theo file và từ khoá."""
import memory


def test_recall_ranks_same_file_first_then_keyword_and_skips_unrelated(tmp_path):
    path = tmp_path / "lessons.jsonl"
    memory.record(path, [
        {"files": ["public/b.html"], "gate": 4, "failure_class": "ordinary", "reason": "pii: email", "outcome": "fixed"},
        {"files": ["public/c.html"], "gate": 5, "failure_class": "ordinary", "reason": "footer body mismatch",
         "outcome": "blocked"},
        {"files": ["public/a.html"], "gate": 3, "failure_class": "ordinary", "reason": "search không khớp",
         "outcome": "fixed"},
    ])
    path.open("a", encoding="utf-8").write("{hỏng\n")
    got = memory.recall(path, "public/a.html", ["footer"])
    assert got[0].startswith("- [cổng 3] public/a.html: search không khớp")
    assert "footer body mismatch (vẫn bị chặn)" in got[1]
    assert len(got) == 2


def test_recall_without_a_memory_file_is_empty(tmp_path):
    assert memory.recall(tmp_path / "none.jsonl", "x", ["y"]) == []
