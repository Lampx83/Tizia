"""codegraph.py (ticket 21) + wiring vào gates/brainstorm.py, gates/implement.py.
Không phụ thuộc graphify binary/graph.json thật — subprocess.run bị fake ở
đúng biên I/O (giống Ollama/git/Telegram ở seam Python khác)."""
import subprocess
from pathlib import Path

import pytest

import codegraph
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import brainstorm, implement

# conftest.py's autouse `_no_real_codegraph` stubs codegraph.query cho MỌI
# test (đúng ý — tránh subprocess thật). Giữ tham chiếu hàm GỐC ở đây (chụp
# lúc import module test, TRƯỚC khi fixture chạy) để các test bên dưới thật
# sự kiểm được logic parse/fallback của chính query(), không phải bản đã bị
# autouse thay.
_real_query = codegraph.query


FAKE_QUERY_OUTPUT = """Traversal: BFS depth=2 | Start: ['flashcards'] | 3 nodes found

NODE index.js [src=server/contexts/_ai-generated/pharmacy/flashcards/index.js loc=L1 community=x]
NODE catalog.js [src=public/js/pharmacy/catalog.js loc=L1 community=y]
EDGE index.js --calls [EXTRACTED]--> catalog.js at=server/contexts/_ai-generated/pharmacy/flashcards/index.js:L3
"""


class _FakeCompleted:
    def __init__(self, stdout, returncode=0):
        self.stdout = stdout
        self.returncode = returncode


# ── codegraph.query()/available() : không bao giờ raise, không bao giờ chặn ─

def test_query_returns_empty_when_graph_json_missing(monkeypatch, tmp_path):
    monkeypatch.setattr(codegraph, "GRAPH_JSON", tmp_path / "khong-ton-tai.json")
    assert codegraph.available() is False
    assert _real_query("bat ky gi") == []


def test_query_parses_node_src_paths_in_bfs_order(monkeypatch, tmp_path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(codegraph, "GRAPH_JSON", graph)
    monkeypatch.setattr(subprocess, "run", lambda *a, **kw: _FakeCompleted(FAKE_QUERY_OUTPUT))

    result = _real_query("flashcards")

    assert result == [
        "server/contexts/_ai-generated/pharmacy/flashcards/index.js",
        "public/js/pharmacy/catalog.js",
    ]


def test_query_dedupes_repeated_src_paths(monkeypatch, tmp_path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(codegraph, "GRAPH_JSON", graph)
    dup = FAKE_QUERY_OUTPUT + "\nNODE index.js again [src=server/contexts/_ai-generated/pharmacy/flashcards/index.js loc=L9]\n"
    monkeypatch.setattr(subprocess, "run", lambda *a, **kw: _FakeCompleted(dup))

    assert _real_query("flashcards").count("server/contexts/_ai-generated/pharmacy/flashcards/index.js") == 1


def test_query_returns_empty_on_nonzero_returncode(monkeypatch, tmp_path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(codegraph, "GRAPH_JSON", graph)
    monkeypatch.setattr(subprocess, "run", lambda *a, **kw: _FakeCompleted("", returncode=1))
    assert _real_query("x") == []


def test_query_returns_empty_when_graphify_binary_missing(monkeypatch, tmp_path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(codegraph, "GRAPH_JSON", graph)

    def _raise(*a, **kw):
        raise FileNotFoundError("graphify not found")
    monkeypatch.setattr(subprocess, "run", _raise)

    assert _real_query("x") == []


def test_query_returns_empty_on_timeout(monkeypatch, tmp_path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")
    monkeypatch.setattr(codegraph, "GRAPH_JSON", graph)

    def _raise(*a, **kw):
        raise subprocess.TimeoutExpired(cmd="graphify", timeout=15)
    monkeypatch.setattr(subprocess, "run", _raise)

    assert _real_query("x") == []


# ── gates/brainstorm.py: gợi ý graph vào prompt khi có, fallback khi không ──

def test_brainstorm_prompt_includes_graph_hints_when_available(monkeypatch, request_item):
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: ["server/contexts/pharmacy/catalog.js"])
    deps = deps_with(plan_with(["features"]))

    brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    (call,) = deps.models.calls
    assert "server/contexts/pharmacy/catalog.js" in call["prompt"]


def test_brainstorm_prompt_falls_back_when_graphify_unavailable(monkeypatch, request_item):
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: [])  # graphify chưa cài / graph chưa build
    deps = deps_with(plan_with(["features"]))

    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    # Gate 1 KHÔNG BAO GIỜ bị chặn vì thiếu graph — vẫn ra plan hợp lệ như hôm nay.
    assert out["blocked"] is False
    (call,) = deps.models.calls
    assert "không có" in call["prompt"]


def test_brainstorm_still_lets_model_pick_final_file_not_graph(monkeypatch, request_item):
    """Graph chỉ là gợi ý — plan cuối cùng vẫn lấy file model chọn (FakeModels
    trả về plan cố định), không phải bị graph override."""
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: ["mot/file/khac/hoan/toan.js"])
    plan = plan_with(["features"])
    deps = deps_with(plan)

    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))

    files = [st["file"] for st in out["plan"]["subtasks"]]
    assert "mot/file/khac/hoan/toan.js" not in files
    assert files == [st["file"] for st in plan["subtasks"]]


# ── gates/implement.py: cảnh báo lệch path, KHÔNG tự thay ───────────────────

def test_check_file_path_warns_on_typo_when_real_file_exists_nearby(monkeypatch, capsys, tmp_path):
    monkeypatch.setattr(implement, "ROOT", tmp_path)
    real = tmp_path / "server/contexts/_ai-generated/pharmacy/flashcards/index.js"
    real.parent.mkdir(parents=True)
    real.write_text("// real\n", encoding="utf-8")
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: [
        "server/contexts/_ai-generated/pharmacy/flashcards/index.js",
    ])

    implement.check_file_path("server/contexts/_ai-generated/pharmacy/flashcard/index.js")  # typo: thiếu 's'

    out = capsys.readouterr().out
    assert "[codegraph]" in out
    assert "flashcards/index.js" in out


def test_check_file_path_silent_when_file_genuinely_new_and_no_close_match(monkeypatch, capsys, tmp_path):
    monkeypatch.setattr(implement, "ROOT", tmp_path)
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: [])  # không có gì gần giống — file mới thật

    implement.check_file_path("server/contexts/_ai-generated/pharmacy/brand-new/index.js")

    assert capsys.readouterr().out == ""


def test_check_file_path_silent_when_real_file_exists_at_exact_path(monkeypatch, capsys, tmp_path):
    monkeypatch.setattr(implement, "ROOT", tmp_path)
    real = tmp_path / "server/contexts/_ai-generated/pharmacy/flashcards/index.js"
    real.parent.mkdir(parents=True)
    real.write_text("// real\n", encoding="utf-8")
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: pytest.fail("không nên gọi query khi file đã tồn tại đúng chỗ"))

    implement.check_file_path("server/contexts/_ai-generated/pharmacy/flashcards/index.js")

    assert capsys.readouterr().out == ""


def test_check_file_path_does_not_silently_substitute(monkeypatch, capsys, tmp_path):
    """AC ticket 21: cảnh báo, KHÔNG tự thay path — hàm không trả giá trị nào
    để gọi ở implement.run() có thể lỡ tay dùng thay vì subtask['file'] gốc."""
    monkeypatch.setattr(implement, "ROOT", tmp_path)
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: ["duong/dan/khac.js"])

    result = implement.check_file_path("duong/dan/goc.js")

    assert result is None


def test_run_calls_check_file_path_for_every_subtask_before_generating(monkeypatch, tmp_path):
    """gates/implement.py's run() gọi check_file_path TRƯỚC khi generate — vẫn
    luôn đọc/tạo code ở đúng subtask['file'] gốc (không silently substitute),
    matches ticket 18's constraint: graph không thay việc đọc file thật."""
    calls = []
    monkeypatch.setattr(implement, "check_file_path", lambda f: calls.append(f))
    codegen = {"code": "x", "test_file": "test/t.test.js", "test": "y"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    deps = deps_with(models)
    plan = plan_with(["features"])

    out = implement.run({"plan": plan}, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path)

    assert calls == [st["file"] for st in plan["subtasks"]]
    # Vẫn ghi code vào ĐÚNG subtask['file'] gốc — check_file_path không đổi gì.
    for d, subtask in zip(out["diffs"], plan["subtasks"]):
        assert d["file"] == subtask["file"]
