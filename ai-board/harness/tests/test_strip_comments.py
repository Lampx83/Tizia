"""Model chỉ thấy code không comment; repo/file thật giữ nguyên, số dòng thật giữ nguyên."""
import code_index
import context
import file_context
import pytest
import tools
from file_context import apply_edits, excerpt, strip_comments
from test_code_index import _commit, repo  # noqa: F401 — repo là fixture


def _lines_equal(src: str, name: str):
    out = strip_comments(src, name)
    assert out.count("\n") == src.count("\n")  # cùng số dòng
    assert strip_comments(out, name) == out  # idempotent
    return out


# ── JS ──────────────────────────────────────────────────────────────────────

def test_js_line_and_trailing_comments_removed_comment_only_lines_empty():
    src = "// đầu file\nconst a = 1; // ghi chú\n  // thụt lề\nfoo(); //\n"
    assert _lines_equal(src, "a.js") == "\nconst a = 1;\n\nfoo();\n"


def test_js_block_comment_spans_lines_keeps_line_numbers():
    src = "a();\n/* dòng 1\n   dòng 2\n   dòng 3 */\nb(); /* inline */ c();\n/**\n * jsdoc\n */\nd();"
    out = _lines_equal(src, "a.mjs")
    assert out.split("\n") == ["a();", "", "", "", "b();  c();", "", "", "", "d();"]


@pytest.mark.parametrize("code", [
    "const u = 'https://x.vn/a';",
    'const u = "http://x.vn//a";',
    "const u = `http://x.vn/${p}//y`;",
    "const t = '/* not a comment */';",
    "const t = \"it's // fine\";",
    r"const r = /\/\//.test(s);",
    "const r = s.replace(/'/g, \"\");",
    "const r = s.split(/[/]/);",
    "const q = a / b; const w = c / d;",
    "x = `a ${ `b // c ${ d } e` } // f`;",
    "const s = 'dòng \\\n// vẫn là chuỗi';",
])
def test_js_keeps_comment_lookalikes_inside_strings_regex_division(code):
    assert strip_comments(code, "a.js") == code
    assert strip_comments(code + " // gc thật", "a.js") == code


def test_js_trailing_comment_after_string_with_slashes_is_removed_string_kept():
    assert strip_comments("const u = 'https://x.vn/a'; // gc\n", "a.js") == "const u = 'https://x.vn/a';\n"
    assert strip_comments("a = `x // y`; // z", "a.js") == "a = `x // y`;"
    assert strip_comments("a = s.replace(/'/g, '');  // z 'q'", "a.js") == "a = s.replace(/'/g, '');"


def test_js_template_interpolation_comment_and_unterminated_are_safe():
    assert strip_comments("x = `a ${ b /* c */ } d`;", "a.js") == "x = `a ${ b  } d`;"
    # không chắc (chuỗi không đóng) → giữ nguyên
    assert strip_comments("x = 'abc // def\ny();", "a.js") == "x = 'abc // def\ny();"
    assert strip_comments("a(); /* không đóng\nb();", "a.js") == "a(); /* không đóng\nb();"


def test_js_crlf_and_unicode_line_separator_keep_line_count():
    src = "a(); // x\r\n// y\r\nb(); /* p q */ c();\r\n"
    out = strip_comments(src, "a.js")
    assert out.splitlines() == ["a();", "", "b(); ", " c();"]  # U+2028 trong comment vẫn là 1 dòng của splitlines()
    assert len(src.splitlines()) == len(out.splitlines()) and out.count("\r\n") == 3


# ── CSS / HTML / khác ──────────────────────────────────────────────────────

def test_css_block_comments_only_and_urls_kept():
    src = "/* theme */\n.a { color: red; /* đỏ */ }\n.b { background: url(http://x/y.png); }\n/* a\n b */\n.c::after { content: '/* giữ */'; }"
    out = _lines_equal(src, "a.css")
    assert out.split("\n") == ["", ".a { color: red;  }", ".b { background: url(http://x/y.png); }", "", "",
                               ".c::after { content: '/* giữ */'; }"]


def test_html_comments_and_script_style_contents():
    src = ("<!-- đầu -->\n<div>a <!-- inline --> b</div>\n<!--\n nhiều dòng\n-->\n"
           "<style>\n/* css */\n.a{color:red}\n</style>\n<script>\n// js\nconst u = 'http://x'; // t\n</script>\n"
           "<script type=\"text/template\">\n<p>it's // keep</p>\n</script>\n<p>http://keep.me</p>")
    out = _lines_equal(src, "a.html")
    assert out.split("\n") == ["", "<div>a  b</div>", "", "", "", "<style>", "", ".a{color:red}", "</style>", "<script>", "",
                               "const u = 'http://x';", "</script>", '<script type="text/template">',
                               "<p>it's // keep</p>", "</script>", "<p>http://keep.me</p>"]


def test_other_extensions_unchanged_and_unknown_content_unchanged():
    for name in ("a.py", "a.json", "a.md", "a.txt"):
        assert strip_comments("x // y /* z */ <!-- w -->", name) == "x // y /* z */ <!-- w -->"
    assert strip_comments("Hello // world\n", None) == "Hello // world\n"  # đoán không ra loại → giữ


def test_sniff_when_no_filename():
    assert strip_comments("const a = 1; // x\n", None) == "const a = 1;\n"
    assert strip_comments("<!doctype html>\n<p>a</p><!-- x -->\n", None) == "<!doctype html>\n<p>a</p>\n"
    assert strip_comments(".a {\n  color: red; /* x */\n}\nurl(http://y)\n", None) == ".a {\n  color: red;\n}\nurl(http://y)\n"


# ── excerpt: không comment, số dòng thật ───────────────────────────────────

JS = """// Mô tả dài tiếng Việt về file này
/* khối
   nhiều dòng */
function boot() {
  // Bước 1: khởi tạo nút nổi
  const fab = make('nút gợi ý'); // gắn nút
  // Bước 2: lắng nghe
  fab.onclick = open;
}
// kết thúc
"""


def test_excerpt_shows_no_comment_text_keeps_real_numbers_and_skips_comment_only_lines():
    out = excerpt(JS, ["nút gợi ý"], budget=2000, filename="public/js/a.js")
    assert "Mô tả" not in out and "Bước" not in out and "gắn nút" not in out and "kết thúc" not in out
    assert "L6|   const fab = make('nút gợi ý');" in out
    assert "L5|" not in out and "L7|" not in out and "L2|" not in out  # dòng chỉ-comment bị bỏ
    assert "L8|" in out and "L4| function boot() {" in out
    assert "…" not in out  # dòng comment-only không tạo khoảng trống giả
    assert excerpt(JS, ["nút gợi ý"], budget=2000) == out  # đoán loại từ nội dung


def test_excerpt_keyword_only_in_comment_is_not_a_hit():
    src = "// chỉ có trong comment: zebra\n" + "".join(f"x{i}();\n" for i in range(60)) + "tail();\n"
    out = excerpt(src, ["zebra"], budget=600, filename="a.js")
    assert "zebra" not in out and "L1|" not in out


def test_excerpt_budget_not_spent_on_comment_lines():
    body = "".join(f"// ghi chú rất dài số {i} " + "x" * 80 + f"\nstep{i}();\n" for i in range(40))
    out = excerpt(body, ["step20"], budget=500, filename="a.js")
    assert "ghi chú" not in out and "L42| step20();" in out and "L40| step19();" in out


def test_excerpt_without_comments_is_unchanged_for_unknown_type():
    content = "".join(f"dòng {i}\n" for i in range(1, 30))
    assert "L5| dòng 5" in excerpt(content, ["dòng 5"], budget=400)


# ── apply_edits trên file thật ─────────────────────────────────────────────

def test_apply_edits_keeps_trailing_comment_when_model_searches_the_stripped_text():
    real = "a();\nfoo(); // note\nb();\n"
    assert "note" not in strip_comments(real, "a.js")
    assert apply_edits(real, [{"search": "foo();", "replace": "bar();"}]) == "a();\nbar(); // note\nb();\n"


def test_apply_edits_matches_lines_across_a_comment_only_gap():
    real = "function f() {\n  // lý do dài\n  /* nữa */\n  return 1;\n}\n"
    out = apply_edits(real, [{"search": "function f() {\n  return 1;", "replace": "function f() {\n  return 2;"}])
    assert out == "function f() {\n  return 2;\n}\n"


def test_apply_edits_matches_text_after_inline_block_comment_removed():
    real = "call(a, /* tuỳ chọn */ b);\n"
    edits = [{"search": "call(a,  b);", "replace": "call(a, c);"}]
    assert apply_edits(real, edits, "a.js") == "call(a, c);\n"


def test_apply_edits_error_hints_show_comment_free_lines():
    real = "x();\ny(); // chú thích dài\nz();\n"
    with pytest.raises(ValueError) as e:
        apply_edits(real, [{"search": "yy();", "replace": "q();"}], "a.js")
    assert "L2| y();" in str(e.value) and "chú thích" not in str(e.value)


def test_grounding_substring_survives_trailing_comment():
    """plan_validate đối chiếu trích dẫn (đã bỏ khoảng trắng) với file thật: dòng không comment vẫn là chuỗi con."""
    real = "if (ok) {\n  go(); // đi\n}\n"
    shown = strip_comments(real, "a.js")
    squash = lambda t: "".join(t.split())  # noqa: E731
    assert squash("go();") in squash(real) and squash("if (ok) {\n  go();") in squash(real)
    assert shown == "if (ok) {\n  go();\n}\n"


# ── tools ──────────────────────────────────────────────────────────────────

APP_JS = ("// Nút gợi ý nổi — mô tả dài\nexport function boot() { // khởi động\n"
          "  /* bước */ const label = 'Gửi góp ý'; // nhãn\n  return label;\n}\n// export function ghost() {}\n")


def test_grep_outline_exemplar_and_locate_hide_comments(repo, tmp_path):
    src, _ = repo
    sha = _commit(src, {
        "public/js/fab.js": APP_JS,
        "public/page.html": "<!-- ghi chú trang -->\n<style>\n/* kiểu */\n.a{color:red}\n</style>\n<h1>Trang thử</h1>\n"
                            "<script type=\"module\">\nimport { boot } from './js/fab.js'; // dùng boot\n</script>\n",
    })
    out = tools.run("grep", src, sha, {"words": ["label"], "file": "public/js/fab.js"}, 2000)
    assert "L3|" in out and "const label = 'Gửi góp ý';" in out and "nhãn" not in out and "mô tả dài" not in out
    assert "ghost" not in tools.run("outline", src, sha, {"file": "public/js/fab.js"}, 2000)  # export trong comment
    ex = tools.run("exemplar", src, sha, {"words": ["Trang thử"]}, 2500)
    assert "ghi chú trang" not in ex and "kiểu" not in ex and ".a{color:red}" in ex
    loc = tools.run("locate", src, sha, {"phrases": ["Gửi góp ý"]}, 800)
    assert "public/js/fab.js:3| /* bước */" not in loc and "Gửi góp ý" in loc and "nhãn" not in loc
    users = tools.run("locate", src, sha, {"phrases": ["Gửi góp ý"], "prefer": ["public/page.html"]}, 800)
    assert "dùng boot" not in users


def test_phrase_only_in_a_comment_never_locates_a_file(repo):
    src, _ = repo
    sha = _commit(src, {
        "public/js/a.js": "// Gửi góp ý cho trường học nhé\nconst x = 1;\n/* Gửi góp ý cho trường học nhé */\n",
        "public/b.html": "<!-- Gửi góp ý cho trường học nhé -->\n<p>khác hẳn</p>\n",
        "public/js/c.js": "export const L = 'Gửi góp ý cho trường học nhé';\n",
    })
    hits, _ = tools.find_text(src, sha, file_context.phrases("Gửi góp ý cho trường học nhé"), [])
    assert {f for f, _, _ in hits} == {"public/js/c.js"}


def test_build_context_known_target_excerpt_has_no_comments(repo, tmp_path):
    src, _ = repo
    sha = _commit(src, {"public/js/fab.js": APP_JS})
    sub = {"title": "Đổi nhãn Gửi góp ý", "file": "public/js/fab.js", "verify": "label"}
    ctx = context.build_context(3, {"subject": "Đổi nhãn Gửi góp ý"}, sub, src, sha, memory_path=tmp_path / "l.jsonl")
    assert "Gửi góp ý" in ctx["text"] and "nhãn)" not in ctx["text"] and "mô tả dài" not in ctx["text"]
