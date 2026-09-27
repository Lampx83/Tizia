"""repomap.py (sơ đồ repo của AI Board) + wiring vào gates/brainstorm.py, gates/implement.py."""
import repomap
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import brainstorm, implement
from test_code_index import _commit, _git

# conftest autouse tắt repomap.related cho mọi test; giữ hàm gốc (chụp lúc import) để test chính nó.
_real_related = repomap.related


def _repo(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {
        "public/quiz.html": '<h1>Đố vui trắc nghiệm hoá dược</h1><script type="module" src="js/quiz.js"></script>',
        "public/js/quiz.js": "import { score } from './score.js';\nexport const start = () => score('Bắt đầu làm bài');",
        "public/js/score.js": "export const score = (s) => s;",
        "public/about.html": "<h1>Giới thiệu nhà trường</h1><p>Lịch sử thành lập</p>",
    })
    return src


def test_related_ranks_matching_page_then_its_import_neighbours(tmp_path):
    src = _repo(tmp_path)
    assert _real_related(src, "HEAD", "trò đố vui trắc nghiệm") == ["public/quiz.html", "public/js/quiz.js"]
    # tên file khớp → file đó + file nó import + file import nó
    assert _real_related(src, "HEAD", "score") == ["public/js/score.js", "public/js/quiz.js"]
    assert _real_related(src, "HEAD", "không khớp gì cả") == []


def test_closest_finds_typo_but_not_new_file(tmp_path):
    real = tmp_path / "server/contexts/_ai-generated/pharmacy/flashcards/index.js"
    real.parent.mkdir(parents=True)
    real.write_text("// real\n", encoding="utf-8")
    assert repomap.closest("server/contexts/_ai-generated/pharmacy/flashcard/index.js", tmp_path) == \
        "server/contexts/_ai-generated/pharmacy/flashcards/index.js"
    assert repomap.closest("public/brand-new-page.html", tmp_path) is None


# ── gates/brainstorm.py: gợi ý vào prompt khi có, fallback khi không ──

def test_brainstorm_prompt_includes_repomap_hints(monkeypatch, request_item):
    monkeypatch.setattr(repomap, "related", lambda *a, **kw: ["server/contexts/pharmacy/catalog.js"])
    deps = deps_with(plan_with(["features"]))
    brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))
    (call,) = deps.models.calls
    assert "server/contexts/pharmacy/catalog.js" in call["prompt"]


def test_brainstorm_not_blocked_and_model_picks_file_without_hints(request_item):
    plan = plan_with(["features"])
    deps = deps_with(plan)
    out = brainstorm.run(request_item, deps, Budget(max_wall_clock_s=999))
    assert out["blocked"] is False
    assert [st["file"] for st in out["plan"]["subtasks"]] == [st["file"] for st in plan["subtasks"]]


# ── gates/implement.py: cảnh báo lệch path, KHÔNG tự thay ──

def test_check_file_path_warns_on_typo_only(monkeypatch, capsys, tmp_path):
    monkeypatch.setattr(implement, "ROOT", tmp_path)
    real = tmp_path / "server/contexts/_ai-generated/pharmacy/flashcards/index.js"
    real.parent.mkdir(parents=True)
    real.write_text("// real\n", encoding="utf-8")

    assert implement.check_file_path("server/contexts/_ai-generated/pharmacy/flashcard/index.js") is None
    out = capsys.readouterr().out
    assert "[repomap]" in out and "flashcards/index.js" in out

    implement.check_file_path("server/contexts/_ai-generated/pharmacy/flashcards/index.js")  # đúng chỗ
    implement.check_file_path("server/contexts/_ai-generated/pharmacy/brand-new/feature.js")  # file mới thật
    assert capsys.readouterr().out == ""


def test_run_calls_check_file_path_for_every_subtask_before_generating(monkeypatch, tmp_path):
    calls = []
    monkeypatch.setattr(implement, "check_file_path", lambda f: calls.append(f))
    codegen = {"code": "x", "test_file": "test/t.test.js", "test": "import test from 'node:test';\ny"}
    models = FakeModels(plan_with(["features"]), codegen=codegen)
    plan = plan_with(["features"])
    out = implement.run({"plan": plan}, deps_with(models), Budget(max_wall_clock_s=999), repo_dir=tmp_path)
    assert calls == [st["file"] for st in plan["subtasks"]]
    for d, subtask in zip(out["diffs"], plan["subtasks"]):
        assert d["file"] == subtask["file"]
