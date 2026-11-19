"""Request names a page by its <title>/<h1> text, no path: that page scopes gate-1 retrieval."""
import pytest
import tools
from services import context
from test_code_index import _commit, repo  # noqa: F401 — repo là fixture
from test_repomap import _real_matching

BACK = '<a class="back" href="javascript:history.back()">← Quay lại</a>'
DECOY_JS = "const bar = `<nav>Em muốn đổi chữ ở nút quay lại góc trên của trang</nav>`;\n"


@pytest.fixture(autouse=True)
def baseline(monkeypatch):
    monkeypatch.delenv("AI_BOARD_RETRIEVAL", raising=False)
    monkeypatch.setattr(tools, "matching_files", _real_matching)


def _build(src, sha, tmp_path, subject, body="", thread=()):
    request = {"subject": subject, "body": body, "type": "other", "thread": [{"role": "user", "body": t} for t in thread]}
    return context.build_context(1, request, None, src, sha, memory_path=tmp_path / "lessons.jsonl")


def _pages(ctx):
    return next(e["params"]["pages"] for e in ctx["tool_log"] if e["tool"] == "find_text")


def _back_repo(src, title="🔤 Ghép Chữ Cái · Site", extra=None):
    others = {f"public/p{i}.html": f"<title>Trò số {i} · Site</title>\n{BACK}\n" for i in range(tools.LITERAL_MAX_FILES + 1)}
    return _commit(src, {"public/ghep.html": f"<title>{title}</title>\n{BACK}\n<h1>🔤 Ghép Chữ Cái</h1>\n",
                         "public/js/bar.js": DECOY_JS, **others, **(extra or {})})


ASK = ("Đổi chữ nút '← Quay lại' thành 'Về nhà'",
       "Em muốn đổi chữ ở nút quay lại góc trên của trang Ghép Chữ Cái, từ '← Quay lại' thành 'Về nhà'")


def test_common_literal_resolves_inside_the_page_named_by_its_title(repo, tmp_path):
    src, _ = repo
    ctx = _build(src, _back_repo(src), tmp_path, ASK[0], thread=[ASK[1]])
    assert ctx["targets"][0] == "public/ghep.html" and _pages(ctx) == ["public/ghep.html"]
    assert "chứa nhiều cụm" not in ctx["text"] and ctx["best_match"] is None
    assert "đã thu hẹp" in ctx["text"]


def test_named_page_with_the_phrases_is_not_overtaken_by_a_shared_file_hint(repo, tmp_path):
    src, _ = repo
    sha = _commit(src, {
        "public/market.html": "<title>Site · Chợ bài giảng GV</title>\n<h1>📚 Chợ bài giảng cộng đồng</h1>\n",
        "public/home.html": '<title>Site: Trang chủ | site</title>\n<a href="market.html">Chợ bài giảng</a>\n'
                            "<p>Đổi tiêu đề lớn đầu trang ở đây</p>\n<h1>Chào <span>bạn</span></h1>\n"})
    ctx = _build(src, sha, tmp_path, "Đổi tiêu đề lớn đầu trang chợ bài giảng thành: Bảng mới tinh.")
    assert ctx["targets"][0] == "public/market.html" and _pages(ctx) == ["public/market.html"]
    assert "chứa nhiều cụm" not in ctx["text"] and ctx["best_match"] is None


@pytest.mark.parametrize("name", ["'Ghép Chữ Cái'", "“Ghép Chữ Cái”"])
def test_quoted_page_name_still_resolves(repo, tmp_path, name):
    src, _ = repo
    ctx = _build(src, _back_repo(src), tmp_path, f"Sửa nút ở trang {name} cho đẹp")
    assert _pages(ctx) == ["public/ghep.html"]


def test_more_than_three_pages_with_the_same_name_resolve_nothing(repo, tmp_path):
    src, _ = repo
    same = {f"public/g{i}.html": "<title>Ghép Chữ Cái · Site</title>\n" for i in range(3)}
    ctx = _build(src, _back_repo(src, extra=same), tmp_path, ASK[0], thread=[ASK[1]])
    assert _pages(ctx) == [] and "public/ghep.html" not in ctx["targets"]


def test_white_colour_word_is_not_a_page_reference(repo, tmp_path):
    src, _ = repo
    ctx = _build(src, _back_repo(src), tmp_path, "Đổi nền màu trắng ghép chữ cái cho đẹp")
    assert _pages(ctx) == []


def test_one_shared_leading_token_is_not_a_match(repo, tmp_path):
    src, _ = repo
    ctx = _build(src, _back_repo(src), tmp_path, "Sửa trang ghép hình cho đẹp")
    assert _pages(ctx) == []


def test_page_line_or_path_keeps_its_own_scope(repo, tmp_path):
    src, _ = repo
    sha = _back_repo(src)
    with_path = _build(src, sha, tmp_path, ASK[0], body="[Trang: Trò số 1] /p1.html", thread=[ASK[1]])
    assert _pages(with_path) == ["public/p1.html"]
    line_only = _build(src, sha, tmp_path, ASK[0], body="[Trang: Trò số 1]", thread=[ASK[1]])
    assert _pages(line_only) == []


SIM = "<title>Site · Patient Simulation</title>\n<h1>Patient Simulation</h1>\n<div class=\"stats\">6 ca lâm sàng</div>\n"
SIM_ASK = ("Thêm dòng mới ngay dưới dòng thống kê số ca lâm sàng: Hàm xu nút tập bảng.",
           "Trang mô phỏng bệnh nhân có dòng nhỏ cho biết số ca lâm sàng ngay dưới tiêu đề lớn.")


def _named(ctx):
    return [e["result"] for e in ctx["tool_log"] if e["tool"] == "named_page"]


@pytest.mark.parametrize("link", ['<a href="sim.html">Mô phỏng bệnh nhân VN</a>',
                                  "const apps = [{ label: 'Mô phỏng bệnh nhân VN', href: './sim.html' }];"])
def test_english_titled_page_resolves_by_the_link_label_other_pages_give_it(repo, tmp_path, link):
    src, _ = repo
    sha = _commit(src, {"public/sim.html": SIM, "public/home.html": f"<title>Trang chủ · Site</title>\n{link}\n",
                        "public/other.html": "<title>Mô phỏng đàm phán · Site</title>\n<p>6 ca lâm sàng</p>\n"})
    ctx = _build(src, sha, tmp_path, SIM_ASK[0], thread=[SIM_ASK[1]])
    assert ctx["targets"][0] == "public/sim.html" and _named(ctx) == ["public/sim.html"]


def test_two_pages_with_the_described_label_resolve_nothing(repo, tmp_path):
    src, _ = repo
    links = '<a href="sim.html">Mô phỏng bệnh nhân A</a>\n<a href="sim2.html">Mô phỏng bệnh nhân B</a>\n'
    sha = _commit(src, {"public/sim.html": SIM, "public/sim2.html": SIM.replace("Patient", "Clinic"),
                        "public/home.html": f"<title>Trang chủ · Site</title>\n{links}"})
    ctx = _build(src, sha, tmp_path, SIM_ASK[0], thread=[SIM_ASK[1]])
    assert _named(ctx) == [] and "public/sim.html" not in ctx["targets"]
