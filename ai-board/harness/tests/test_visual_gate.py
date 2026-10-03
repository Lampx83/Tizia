"""Cổng ảnh: selector bị đổi từ diff, so lỗi mới, và 3 diff thật chạy qua Chromium."""
import http.server
import subprocess
import threading
from pathlib import Path

import pytest

from gates import visual

REPO = Path(__file__).resolve().parents[3]


def test_changed_selectors_takes_rule_of_added_css_lines_and_html_attrs():
    diff = """diff --git a/public/a.html b/public/a.html
@@ -1,4 +1,4 @@
   .section-title h1 { margin: 0; }
-  .section-title .hint { opacity: 0.6; }
+  .section-title .hint { opacity: 0.6; background-color: #fff; }
   .toast {
-    bottom: 24px;
+    top: 24px;
   }
+<div id="new-box" class="card big">x</div>
"""
    assert visual.changed_selectors([{"diff": diff}]) == [".section-title .hint", ".toast", "#new-box", ".card", ".big"]


def test_regressions_ignore_existing_problems():
    before = {"overflow": True, "contrast": ['p "a" 2.10'], "covered": ["x"], "offscreen": [], "patch": []}
    after = {"overflow": True, "contrast": ['p "a" 1.50', 'span "b" 3.00'], "covered": ["x", "y"], "offscreen": [], "patch": []}
    assert visual.regressions(before, after) == ['chữ tương phản thấp (< 4.5): span "b" 3.00', "nút bấm bị phần tử khác đè: y"]
    assert visual.regressions(None, {"overflow": True}) == ["trang tràn ngang"]


def _browser():
    sync = pytest.importorskip("playwright.sync_api")
    manager = sync.sync_playwright().start()
    for channel in (None, "chrome", "msedge"):
        try:
            return manager, manager.chromium.launch(headless=True, **({"channel": channel} if channel else {}))
        except Exception:  # noqa: BLE001 — thử trình duyệt kế tiếp
            continue
    manager.stop()
    pytest.skip("không có Chromium/Chrome/Edge")


def test_synthetic_dark_page_white_patch_and_covering_toast():
    manager, browser = _browser()
    try:
        page = browser.new_page(viewport={"width": 375, "height": 812})
        shell = ("<style>body{margin:0;background:linear-gradient(#0f0c29,#1a1740);color:#fff}"
                 "header button{position:absolute;top:10px;right:10px;width:80px;height:36px}{extra}</style>"
                 "<header><button>Đăng nhập</button></header><p class='hint'>Gợi ý của trang</p>")
        page.set_content(shell.replace("{extra}", ".hint{opacity:.8}"))
        before = visual.audit(page, [".hint", ".toast"])
        page.set_content(shell.replace("{extra}", ".hint{opacity:.8;background:#fff;color:#111}"
                                       ".toast{position:fixed;top:8px;right:8px;width:200px;height:50px;background:#f97316}"))
        after = visual.audit(page, [".hint", ".toast"])
    finally:
        browser.close()
        manager.stop()
    issues = visual.regressions(before, after)
    assert any(i.startswith("khối nền trắng/đen lệch tông trang") for i in issues)
    assert any(i.startswith("nút bấm bị phần tử khác đè") and "Đăng nhập" in i for i in issues)


def _git(*args) -> bytes:
    return subprocess.run(["git", *args], cwd=REPO, capture_output=True, check=True).stdout


CASES = [("ai-board/2026-09-26-ticket-18-3ec392", True), ("ai-board/2026-09-26-ticket-19-526834", True),
         ("ai-board/2026-09-26-ticket-11-a56fc2", False)]


@pytest.mark.parametrize("branch,blocked", CASES)
def test_real_ticket_diffs(branch, blocked):
    """Chấp nhận: diff lỗi thị giác thật bị chặn, diff footer qua. Nhánh chỉ có ở máy dev."""
    try:
        mb = _git("merge-base", branch, "HEAD").decode().strip()
    except subprocess.CalledProcessError:
        pytest.skip(f"không có nhánh {branch}")
    files = [f for f in _git("diff", "--name-only", mb, branch).decode().split() if f.startswith("public/")]
    selectors = visual.changed_selectors([{"diff": _git("diff", mb, branch, "--", *files).decode("utf-8")}])
    override: dict[str, bytes] = {}

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **k):
            super().__init__(*a, directory=str(REPO / "public"), **k)

        def do_GET(self):  # noqa: N802
            body = override.get(self.path.split("?")[0])
            if body is None:
                return super().do_GET()
            self.send_response(200)
            self.send_header("Content-Type", "text/html" if self.path.split("?")[0].endswith(".html") else "text/javascript")
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_):
            pass

        def handle(self):
            try:
                super().handle()
            except ConnectionError:  # trình duyệt huỷ tải ảnh/iframe khi đóng trang
                pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    manager, browser = _browser()
    issues = []
    try:
        audits = {}
        for phase, ref in (("before", mb), ("after", branch)):
            override.clear()
            override.update({"/" + f.removeprefix("public/"): _git("show", f"{ref}:{f}") for f in files})
            for width in (375, 1280):
                page = browser.new_page(viewport={"width": width, "height": 812 if width < 768 else 800})
                page.goto(f"http://127.0.0.1:{server.server_port}/school.html?domain=it", wait_until="domcontentloaded")
                visual.settle(page)
                audits[(phase, width)] = visual.audit(page, selectors)
                page.close()
        for width in (375, 1280):
            issues += visual.regressions(audits[("before", width)], audits[("after", width)])
    finally:
        browser.close()
        manager.stop()
        server.shutdown()
    assert bool(issues) is blocked, issues


def test_settle_waits_for_the_load_event_before_the_audit_measures():
    """A slow image delays `load`; the page builds the covering element on load. Measuring at DOMContentLoaded misses it."""
    import time

    page_html = (
        "<style>body{margin:0;background:#0f0c29}button{position:absolute;top:10px;left:10px;width:80px;height:36px}"
        ".late{position:fixed;top:0;left:0;width:200px;height:80px;background:#f97316}</style>"
        "<button>Gửi</button><img src='/slow.png'>"
        "<script>addEventListener('load', () => { const d = document.createElement('div'); d.className = 'late'; document.body.append(d); })</script>"
    ).encode()

    class Slow(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            if self.path == "/slow.png":
                time.sleep(1.2)
            body, kind = (page_html, "text/html; charset=utf-8") if self.path == "/" else (b"", "image/png")
            self.send_response(200)
            self.send_header("Content-Type", kind)
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_):
            pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Slow)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    manager, browser = _browser()
    try:
        page = browser.new_page(viewport={"width": 800, "height": 600})
        page.goto(f"http://127.0.0.1:{server.server_port}/", wait_until="domcontentloaded")
        assert visual.audit(page, [])["covered"] == []            # measured while the image was still loading
        visual.settle(page)
        assert any("Gửi" in c for c in visual.audit(page, [])["covered"])
    finally:
        browser.close()
        manager.stop()
        server.shutdown()


def test_capture_screenshot_sends_the_student_session_cookie(tmp_path):
    pytest.importorskip("playwright.sync_api")
    from gates import verify

    seen = []

    class Echo(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            seen.append(self.headers.get("Cookie"))
            body = b"<h1>trang</h1>"
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_):
            pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Echo)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        url = f"http://127.0.0.1:{server.server_port}/"
        verify.capture_screenshot(url, tmp_path / "guest.png")
        verify.capture_screenshot(url, tmp_path / "student.png", token="abc123")
    finally:
        server.shutdown()
    assert seen[0] is None
    assert seen[-1] == "tizia_sid=abc123"


def _serve(handler):
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{server.server_port}/"


def _png_size(path):
    import struct
    data = path.read_bytes()
    return struct.unpack(">II", data[16:24])


def test_capture_screenshot_frames_the_changed_element_far_below_the_fold(tmp_path):
    pytest.importorskip("playwright.sync_api")
    from gates import verify

    html = ("<meta charset=utf-8><style>body{margin:0}</style><div style='height:2500px'></div>"
            "<h2 id=t style='margin:0;padding:10px;background:#fc0'>Tiến độ học tập</h2><div style='height:600px'></div>").encode()

    class Page(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html)))
            self.end_headers()
            self.wfile.write(html)

        def log_message(self, *_):
            pass

    server, url = _serve(Page)
    try:
        full, focus, none = tmp_path / "full.png", tmp_path / "focus.png", tmp_path / "none.png"
        verify.capture_screenshot(url, full, 1280, selectors=["#t"], focus=focus)
        verify.capture_screenshot(url, tmp_path / "x.png", 1280, selectors=["#absent"], focus=none)
    finally:
        server.shutdown()
    width, height = _png_size(focus)
    assert 300 <= width <= 1280 and 100 <= height <= 400   # a crop around the heading, not the 3000px page
    assert _png_size(full)[1] == 2000                      # the full shot still stops at the cap, below the heading
    assert not none.exists()                               # nothing matched: no focus shot


def test_logged_in_shots_do_not_open_the_welcome_popups(tmp_path):
    pytest.importorskip("playwright.sync_api")
    import datetime
    from gates import verify

    seen = []

    class Page(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            if self.path.startswith("/seen"):
                seen.append(self.path)
                body, kind = b"ok", "text/plain"
            else:
                body = (b"<body><script>fetch('/seen?daily=' + localStorage.getItem('tizia:daily:shown')"
                        b" + '&onboarding=' + localStorage.getItem('tizia:onboarding:v1:done'))</script>hi</body>")
                kind = "text/html"
            self.send_response(200)
            self.send_header("Content-Type", kind)
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_):
            pass

    server, url = _serve(Page)
    try:
        verify.capture_screenshot(url, tmp_path / "guest.png")
        verify.capture_screenshot(url, tmp_path / "student.png", token="abc")
    finally:
        server.shutdown()
    today = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=7)).date().isoformat()  # Vietnam day, as daily-login.js
    assert seen[0] == "/seen?daily=null&onboarding=null"
    assert seen[-1] == f"/seen?daily={today}&onboarding=1"


def test_renaming_a_dim_element_is_not_a_new_contrast_problem():
    """Request #11: the footer link was already 3.68; changing its words must not read as a new low-contrast element."""
    before = {"contrast": ['a "← Quay lại chọn trường" 3.68']}
    renamed = {"contrast": ['a "← Về trang chọn trường" 3.68']}
    assert visual.regressions(before, renamed) == []
    added = {"contrast": ['a "← Về trang chọn trường" 3.68', 'a "Liên kết mới" 2.10']}
    assert visual.regressions(before, added) == ['chữ tương phản thấp (< 4.5): a "Liên kết mới" 2.10']


def test_changed_texts_are_the_visible_words_of_the_html_lines_added_or_removed():
    diff = [{"file": "", "diff": (
        "--- a/public/school.html\n+++ b/public/school.html\n@@ -1,3 +1,3 @@\n"
        '-  <a href="index.html" style="color:var(--accent)">← Quay lại chọn trường</a>\n'
        '+  <a href="index.html" style="color:var(--accent)">← Về trang chọn trường</a>\n'
        "+  <div class=\"x\" id=\"y\"></div>\n"
        "+const a = () => { return 1; };\n")}, {"file": "public/js/a.js", "diff": "+  el.textContent = 'Không đọc JS';\n"}]
    assert visual.changed_texts(diff, "+") == ["← Về trang chọn trường"]
    assert visual.changed_texts(diff, "-") == ["← Quay lại chọn trường"]
    assert visual.changed_texts(None, "+") == []


def test_capture_screenshot_frames_a_text_edit_that_has_no_id_or_class(tmp_path):
    pytest.importorskip("playwright.sync_api")
    from gates import verify

    html = ("<meta charset=utf-8><style>body{margin:0}</style><div style='height:2500px'></div>"
            "<p>Vũ trụ giáo dục · <a href='#'>← Về trang chọn trường</a></p><div style='height:600px'></div>").encode()

    class Page(http.server.BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html)))
            self.end_headers()
            self.wfile.write(html)

        def log_message(self, *_):
            pass

    server, url = _serve(Page)
    try:
        focus, none = tmp_path / "focus.png", tmp_path / "none.png"
        verify.capture_screenshot(url, tmp_path / "full.png", 1280, focus=focus, focus_texts=["← Về trang chọn trường"])
        verify.capture_screenshot(url, tmp_path / "x.png", 1280, focus=none, focus_texts=["không có trên trang"])
    finally:
        server.shutdown()
    width, height = _png_size(focus)
    assert 300 <= width <= 1280 and height <= 400
    assert not none.exists()
