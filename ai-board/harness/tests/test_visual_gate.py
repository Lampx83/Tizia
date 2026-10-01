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
                page.wait_for_timeout(800)
                audits[(phase, width)] = visual.audit(page, selectors)
                page.close()
        for width in (375, 1280):
            issues += visual.regressions(audits[("before", width)], audits[("after", width)])
    finally:
        browser.close()
        manager.stop()
        server.shutdown()
    assert bool(issues) is blocked, issues
