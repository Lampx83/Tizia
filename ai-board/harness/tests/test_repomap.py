"""repomap.py (sơ đồ repo của AI Board) + wiring vào gates/brainstorm.py, gates/implement.py."""
import repomap
import tools
from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import brainstorm, implement, plan_validate
from test_code_index import _commit, _git

# conftest autouse tắt repomap.related cho mọi test; giữ hàm gốc (chụp lúc import) để test chính nó.
_real_related = repomap.related
_real_matching = tools.matching_files


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


def test_gate1_repo_hint_ranks_by_the_whole_request_not_only_its_subject(monkeypatch, tmp_path):
    import context
    monkeypatch.setattr(repomap, "related", _real_related)
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    filler = {f"public/page{i}.html": f"<h1>Trang số {i} về chủ đề riêng {i}</h1>" for i in range(8)}
    _commit(src, {
        **filler,
        "public/school.html": "<h1>Trường công nghệ</h1>",
        "public/dem-ngon-tay.html": "<h1>Đếm ngón tay</h1>",
        "public/js/widget.js": "const dialog = `<h3>Hộp thoại gửi đề nghị</h3><label>Tiêu đề</label><label>Mô tả chi tiết</label>`;",
    })
    request = {"subject": "Thêm bộ đếm ký tự", "body": "[Trang: Trường CNTT] /school.html\nÔ tiêu đề trong hộp thoại đề nghị chưa có bộ đếm; làm giống ô mô tả chi tiết."}
    hint = next(line for line in context.build_context(1, request, None, src, "HEAD")["text"].splitlines()
                if line.startswith("sơ đồ repo gợi ý"))
    assert hint.split(": ", 1)[1].split(", ")[0] == "public/js/widget.js"


def _crowded_repo(tmp_path):
    """Content-heavy repo: every common word is everywhere, so single-word IDF cannot tell the dialog module apart."""
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    pages = {f"public/lesson{i}.html": f"<h1>Tiêu đề bài {i}</h1><p>Mô tả bài học số {i}, chi tiết nội dung, gửi bài, đề thi {i}</p>"
             for i in range(12)}
    _commit(src, {
        **pages,
        "public/school.html": "<h1>Trường công nghệ</h1>",
        "public/js/pwa.js": "toast('Có phiên bản mới · cập nhật');",
        # lesson content talks about the same words as the UI request ("ô tiêu đề", "mô tả chi tiết") but is not app code
        "public/js/scenarios/lop7/lessons/tin-hoc.js": "export default `Trong hộp thoại gửi đề nghị, ô tiêu đề chưa có bộ đếm; ô tiêu đề mô tả chi tiết và gửi đề nghị hiển thị khi gõ`;",
        "public/js/widget.js": "const d = `<h3>Gửi đề nghị cho Ban điều hành</h3><label>Tiêu đề</label><label>Mô tả chi tiết</label>`;",
    })
    return src


def test_matching_files_prefers_the_file_holding_most_of_the_requests_multiword_phrases(monkeypatch, tmp_path):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    import file_context
    src = _crowded_repo(tmp_path)
    said = file_context.phrases("Thêm bộ đếm", "Trong hộp thoại gửi đề nghị, ô tiêu đề chưa có bộ đếm; hiển thị khi gõ và cập nhật như ô mô tả chi tiết.")
    (top, score, grams), *_ = tools.matching_files(src, "HEAD", said)
    assert top == "public/js/widget.js" and len(grams) >= 3
    assert all(file != "public/js/pwa.js" for file, *_ in tools.matching_files(src, "HEAD", said, limit=1))


def test_gate1_puts_the_best_matching_file_ahead_of_the_page_it_was_submitted_from(monkeypatch, tmp_path):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    import context
    src = _crowded_repo(tmp_path)
    request = {"subject": "Thêm bộ đếm ký tự", "body": "[Trang: Trường CNTT] /school.html\nTrong hộp thoại gửi đề nghị, ô tiêu đề chưa có bộ đếm; làm giống ô mô tả chi tiết."}
    out = context.build_context(1, request, None, src, "HEAD")
    assert out["targets"][0] == "public/js/widget.js"
    assert "public/js/widget.js" in out["text"]


COUNTER_REQUEST = {"id": "req-9", "domain": "it", "type": "other", "votes": 1, "thread": [], "subject": "Thêm bộ đếm ký tự",
                   "body": "[Trang: Trường CNTT] /school.html\nTrong hộp thoại gửi đề nghị, ô tiêu đề chưa có bộ đếm; làm giống ô mô tả chi tiết."}


def _plan_for(file):
    return {"summary_vi": "Thêm bộ đếm ký tự cho ô tiêu đề.", "capabilities": [],
            "subtasks": [{"title": "Thêm bộ đếm cạnh ô tiêu đề", "file": file, "verify": f"{file} có bộ đếm", "size": "small"}]}


def test_gate1_retries_once_when_the_plan_ignores_the_best_matching_file(monkeypatch, tmp_path):
    monkeypatch.setattr(tools, "matching_files", _real_matching)
    from test_code_index import _SeqModels
    src = _crowded_repo(tmp_path)
    models = _SeqModels([_plan_for("public/school.html"), _plan_for("public/js/widget.js")])
    out = brainstorm.run(COUNTER_REQUEST, deps_with(models), Budget(max_wall_clock_s=999), source=src, sha="HEAD")
    assert out["blocked"] is False and out["plan"]["subtasks"][0]["file"] == "public/js/widget.js"
    assert out["best_match"] == "public/js/widget.js" and len(models.calls) == 2
    assert "public/js/widget.js" in models.calls[1]["prompt"].rsplit("REJECTED", 1)[1]


def test_gate25_blocks_a_plan_that_still_misses_the_best_matching_file(tmp_path):
    state = {"plan": _plan_for("public/school.html"), "checkout_source": str(tmp_path), "best_match": "public/js/widget.js",
             "source_targets": ["public/js/widget.js", "public/school.html"]}
    out = plan_validate.run({"subject": COUNTER_REQUEST["subject"], "grounding_required": True},
                            deps_with(FakeModels(state["plan"], validation={"clear": True, "grounded": True})), Budget(), state)
    assert out["blocked"] and out["reason"] == "plan_ungrounded" and "public/js/widget.js" in out["signals"][0]


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
