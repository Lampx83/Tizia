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


def test_prune_caps_dedupes_drops_stale_missing_and_old_evals(tmp_path, monkeypatch):
    import json
    import os
    import subprocess
    import time
    src = tmp_path / "src"
    src.mkdir()
    for args in (["init", "-q"], ["config", "user.email", "t@t"], ["config", "user.name", "t"]):
        subprocess.run(["git", *args], cwd=src, check=True)
    (src / "a.js").write_text("x", encoding="utf-8")
    subprocess.run(["git", "add", "-A"], cwd=src, check=True)
    subprocess.run(["git", "commit", "-qm", "c"], cwd=src, check=True)
    old = int(time.time()) - 40 * 86400
    rows = [{"files": ["a.js"], "reason": "r1", "at": 1}, {"files": ["a.js"], "reason": "r1", "at": 2},  # trùng
            {"files": ["gone.js"], "reason": "cũ", "at": old},             # file không còn, đã cũ → bỏ
            {"files": ["new.js"], "reason": "mới", "at": int(time.time())},  # file chưa có nhưng còn mới → giữ
            *({"files": ["a.js"], "reason": f"k{i}", "at": 3} for i in range(5))]
    path = tmp_path / "memory" / "lessons.jsonl"
    path.parent.mkdir()
    path.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows) + "hỏng\n", encoding="utf-8")
    evals = path.parent / "eval"
    evals.mkdir()
    for i in range(4):
        (evals / f"run-{i}.json").write_text("{}", encoding="utf-8")
        os.utime(evals / f"run-{i}.json", (i, i))
    monkeypatch.setitem(memory.LIMITS, "lessons_max", 5)
    monkeypatch.setitem(memory.LIMITS, "eval_keep", 2)

    out = memory.prune(path, source=src)

    kept = [json.loads(line)["reason"] for line in path.read_text(encoding="utf-8").splitlines()]
    assert kept == ["mới", "k0", "k1", "k2", "k3", "k4"][-5:]  # 5 dòng mới nhất, giữ thứ tự cũ → mới
    assert sorted(p.name for p in evals.iterdir()) == ["run-2.json", "run-3.json"]
    assert out == {"lessons": 5, "eval": 2}
