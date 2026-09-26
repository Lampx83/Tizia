"""tools/ + skills/ + context.build_context. Repo git tạm (fixture từ test_code_index)."""
import code_index
import codegraph
import context
import memory
import pytest
import tools
from test_code_index import SCHOOL, _commit, repo  # noqa: F401 — repo là fixture


# ── tools: đọc ở sha, không đọc working tree, cắt theo budget ───────────────

def test_tools_read_committed_sha_not_working_tree(repo):
    src, sha = repo
    (src / "public/school.html").write_text("<h1 id='dirty'>chưa commit</h1>", encoding="utf-8")
    out = tools.run("outline", src, sha, {"file": "public/school.html"}, 2000)
    assert "css liên kết: public/css/school.css" in out and "dirty" not in out
    assert tools.run("outline", src, sha, {"file": "public/nope.html"}, 2000) == "public/nope.html: (chưa tồn tại ở base)"


def test_tree_grep_graph_lessons(repo, tmp_path, monkeypatch):
    src, sha = repo
    assert tools.run("tree", src, sha, {"path": "public"}, 500) == "public/: css/, inline.html, js/, school.html"
    excerpt = tools.run("grep", src, sha, {"words": ["trường ảo"], "file": "public/school.html"}, 2000)
    assert 'L8| <h1 id="title" class="big">Trường ảo</h1>' in excerpt
    listing = tools.run("grep", src, sha, {"words": ["mẹo học"], "path": "public/*.html"}, 500)
    assert listing == "file khớp từ khoá: public/inline.html (1)"
    assert tools.run("graph", src, sha, {"question": "x"}, 500) == ""   # conftest: graphify không có
    monkeypatch.setattr(codegraph, "query", lambda *a, **kw: ["public/school.html"])
    assert "public/school.html" in tools.run("graph", src, sha, {"question": "x"}, 500)
    lessons = tmp_path / "lessons.jsonl"
    memory.record(lessons, [{"files": ["public/school.html"], "gate": 4, "failure_class": "ordinary",
                             "reason": "thiếu test", "outcome": "fixed", "ticket": 1}])
    out = tools.run("lessons", src, sha, {"file": "public/school.html", "words": [], "path": lessons}, 500)
    assert "thiếu test" in out


def test_tool_output_capped_and_never_raises(repo):
    src, sha = repo
    assert len(tools.run("outline", src, sha, {"file": "public/school.html"}, 40)) <= 40
    assert tools.run("tree", src, "deadbeef", {"path": "public"}, 500) == ""
    assert tools.run("grep", src.parent, sha, {"words": ["x"], "file": "a"}, 500) == ""   # không phải repo


def test_registry_has_tool_calling_schema():
    for tool in tools.TOOLS.values():
        assert tool.description and tool.parameters["type"] == "object"
        assert set(tool.parameters["required"]) <= set(tool.parameters["properties"])


# ── skills: match tất định, có/không dấu, tiếng Anh ─────────────────────────

@pytest.mark.parametrize("text, expected", [
    ("Đổi màu chữ trên trang school.html thành xanh dương", "edit-css-style"),
    ("doi mau chu tren trang school.html thanh xanh duong", "edit-css-style"),
    ("Make the title color blue on school.html", "edit-css-style"),
    ("Tăng cỡ chữ đoạn giới thiệu", "edit-css-style"),
    ("Sửa lỗi chính tả 'Truờng' trên trang chủ", "edit-html-text"),
    ("sua loi chinh ta tren trang chu", "edit-html-text"),
    ("Fix typo in the heading", "edit-html-text"),
    ("Thêm mục mẹo học vào cuối trang school.html", "add-html-section"),
    ("them muc meo hoc", "add-html-section"),
    ("Tạo trang mới giới thiệu CLB tin học", "new-static-page"),
    ("create page about study tips", "new-static-page"),
    ("Nút điểm danh không bấm được", "fix-js-behavior"),
    ("the start button is not working", "fix-js-behavior"),
    ("Mong có bộ thẻ ghi nhớ tên thuốc", "default"),
])
def test_skill_match(text, expected):
    assert context.pick_skill(text).name == expected


def test_skill_match_uses_request_type_and_gate3_file():
    assert context.pick_skill("trò chơi ghép chữ", "game").name == "new-static-page"
    assert context.pick_skill("sửa dòng này", None, "public/css/a.css").name == "edit-css-style"
    assert context.pick_skill("làm theo mô tả", None, "public/moi.html", exists=False).name == "new-static-page"
    assert context.pick_skill("làm theo mô tả", None, "public/moi.html", exists=True).name == "default"


def test_every_skill_parses_with_both_gate_sections():
    assert set(context.SKILLS) == {"edit-html-text", "edit-css-style", "add-html-section", "new-static-page",
                                   "fix-js-behavior", "default"}
    for skill in context.SKILLS.values():
        assert skill.sections.get(1) and skill.sections.get(3), skill.name
        assert skill.tools and skill.tools3


# ── context.build_context: skill + tool + budget ────────────────────────────

def _data(text):
    return text.split("<<<\n", 1)[1].rsplit("\n>>>", 1)[0]


def test_build_context_colour_request_includes_linked_css(repo, tmp_path):
    src, sha = repo
    # Empty lessons file: the real ai-board/memory/lessons.jsonl grows with every local worker run.
    ctx = context.build_context(1, {"subject": "Đổi màu chữ tiêu đề trang school.html thành xanh dương"}, None, src, sha,
                                memory_path=tmp_path / "lessons.jsonl")
    assert ctx["skill"] == "edit-css-style"
    assert ctx["used_tools"] == ["outline"]
    assert "css liên kết: public/css/school.css" in ctx["text"]
    assert "public/css/school.css [css" in ctx["text"] and "selector: .big, h1, .title" in ctx["text"]
    assert ctx["text"].startswith("SKILL: edit-css-style") and "AIBOARD.md" not in ctx["text"]  # manual do caller đặt đầu prompt
    assert ctx["chars"] == len(ctx["text"])


def test_build_context_tool_output_stays_under_budget(repo):
    src, _ = repo
    big = "\n".join(f'<p id="p{i}" class="c{i}">Trường ảo dòng {i}</p>' for i in range(2000))
    sha = _commit(src, {"public/school.html": SCHOOL.replace("<footer>", big + "\n<footer>")})
    for gate, subtask in ((1, None), (3, {"title": "Sửa chữ Trường ảo", "file": "public/school.html", "verify": "v"})):
        ctx = context.build_context(gate, {"subject": "Sửa chữ Trường ảo trên school.html"}, subtask, src, sha)
        skill = context.SKILLS[ctx["skill"]]
        assert len(_data(ctx["text"])) <= (skill.budget if gate == 1 else skill.budget3)
        assert "L" in _data(ctx["text"])   # vẫn có trích dòng dù file lớn


def test_build_context_without_git_still_returns_manual_and_skill(tmp_path):
    ctx = context.build_context(1, {"subject": "đổi màu nền"}, None, tmp_path, "HEAD")
    assert ctx["skill"] == "edit-css-style" and ctx["used_tools"] == []
    assert "(không có)" in ctx["text"]


def test_note_used_only_when_hash_matches(repo, tmp_path):
    src, sha = repo
    index_path = tmp_path / "idx.json"
    index = code_index.build(src, sha, index_path)
    blob = index["files"]["public/school.html"]["hash"]
    index["notes"]["public/school.html"] = {"summary": "Trang chọn trường.", "anchors": ["#title"], "by": "m",
                                            "file_hash": blob, "at": 1, "stale": False}
    code_index.save(index, index_path)
    ctx = context.build_context(1, {"subject": "đổi màu chữ school.html"}, None, src, sha, index_path=index_path)
    assert "ghi chú: Trang chọn trường. (anchor: #title)" in ctx["text"]
    sha2 = _commit(src, {"public/school.html": SCHOOL.replace("Trường ảo", "Trường")})
    ctx = context.build_context(1, {"subject": "đổi màu chữ school.html"}, None, src, sha2, index_path=index_path)
    assert "ghi chú" not in ctx["text"]

