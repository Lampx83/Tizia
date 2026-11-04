"""Feature-tier dev cases: request text, expected plan steps, acceptance checks, minimal passing sample files.

step: {"glob", "tier", "kind"?}; kind "data" = payload handed to admin (never written by the worker).
check: ("has", glob, regex) | ("file", glob) | ("json", glob, [keys]) | ("handed", kind) | ("absent", glob) | ("asked",)
"""
from __future__ import annotations

PAGE = "<!doctype html><html><head><title>{t}</title></head><body><h1>{t}</h1></body></html>"
EXP, MOD, LAYOUT = "public/js/domains/it/experiences.js", "public/js/domains/it/modules.js", "public/campus-proto/b-iso-canvas.html"
GEN = "server/contexts/_ai-generated"


def _page(slug, title, extra=""):
    path = f"public/{slug}.html"
    return path, PAGE.format(t=title) + extra


def _it_page(n, slug, title, request):
    page, html = _page(slug, title)
    return {
        "id": f"ft-it-page-{n}", "size": "small", "request": request,
        "steps": [{"glob": page, "tier": "low"}, {"glob": EXP, "tier": "low"}, {"glob": MOD, "tier": "low"}],
        "checks": [("file", page), ("has", EXP, slug + r"\.html"), ("has", MOD, slug)],
        "sample": {page: html, EXP: f"url: '{slug}.html'", MOD: f"id: '{slug}'"},
    }


def _layout(n, slug, title, request):
    page, html = _page(slug, title)
    return {
        "id": f"ft-layout-{n}", "size": "medium", "request": request,
        "steps": [{"glob": page, "tier": "low"}, {"glob": LAYOUT, "tier": "low"}],
        "checks": [("file", page), ("has", LAYOUT, slug)],
        "sample": {page: html, LAYOUT: f"{{ name:'{slug}', gx:3, gy:4 }}"},
    }


def _backend(n, slug, title, request):
    page, html = _page(slug, title)
    api, mig = f"{GEN}/{slug}/index.js", f"{GEN}/{slug}/migrations/001_{slug}.sql"
    return {
        "id": f"ft-backend-{n}", "size": "large", "request": request,
        "steps": [{"glob": page, "tier": "low"}, {"glob": api, "tier": "high"}, {"glob": mig, "tier": "high"}],
        "checks": [("file", page), ("has", api, r"attach|router"), ("has", api, r"/api/" + slug),
                   ("has", mig, r"CREATE TABLE IF NOT EXISTS"), ("has", page, r"/api/" + slug)],
        "sample": {page: html + f"<script>fetch('/api/{slug}')</script>", api: "export function attachX(app){ app.get('/api/" + slug + "') }",
                   mig: f"CREATE TABLE IF NOT EXISTS {slug.replace('-', '_')} (id serial)"},
    }


def _crossfile(n, slug, title, module, symbol, request, old=None):
    """Two-file contract: module exports `symbol`, page names the module and uses it, test imports it."""
    page, test = f"public/{slug}.html", f"test/{slug}.test.js"
    sample = {
        page: PAGE.format(t=title) + (
            f'<script type="module">\nimport {{ {symbol} }} from "/{module}";\n'
            f'document.querySelector("h1").textContent = {symbol}(30);\n</script>'),
        module: f"export function {symbol}(ms) {{\n  return ms + ' giây';\n}}\n",
        test: ("import test from 'node:test';\nimport assert from 'node:assert/strict';\n"
               f"import {{ {symbol} }} from '../{module}';\n\n"
               f"test('{symbol} trả về chuỗi', () => assert.equal(typeof {symbol}(1), 'string'));\n"),
    }
    checks = [("file", page), ("file", test), ("link", page, module, symbol), ("has", test, symbol)]
    if old:
        checks += [("lacks", page, rf"\b{old}\b"), ("lacks", module, rf"\b{old}\b")]
    return {
        "id": f"ft-xfile-{n}", "size": "small", "request": request,
        "steps": [{"glob": page, "tier": "low"}, {"glob": module, "tier": "low"}, {"glob": test, "tier": "low"}],
        "checks": checks, "sample": sample,
    }


def _building(n, slug, title, request):
    page, html = _page(slug, title)
    api, mig = f"{GEN}/{slug}/index.js", f"{GEN}/{slug}/migrations/001_{slug}.sql"
    return {
        "id": f"ft-building-{n}", "size": "xlarge", "request": request,
        "steps": [{"glob": page, "tier": "low"}, {"glob": EXP, "tier": "low"}, {"glob": MOD, "tier": "low"}, {"glob": LAYOUT, "tier": "low"},
                  {"glob": api, "tier": "high"}, {"glob": mig, "tier": "high"}, {"kind": "data", "glob": "campus_layouts", "tier": "critical"}],
        "checks": [("file", page), ("has", EXP, slug), ("has", MOD, slug), ("has", LAYOUT, slug), ("has", api, r"attach|router"),
                   ("has", mig, r"CREATE TABLE IF NOT EXISTS"), ("handed", "data")],
        "sample": {page: html, EXP: slug, MOD: slug, LAYOUT: slug, api: "attach", mig: "CREATE TABLE IF NOT EXISTS t (id int)"},
        "handed": ["data"],
    }


def _bogus(n, request, bogus):
    return {
        "id": f"ft-bogus-{n}", "size": "small", "request": request, "clarify": True, "forbid": [bogus],
        "steps": [], "checks": [("asked",), ("absent", bogus)],
        "sample": {}, "asked": True,
    }


CASES = [
    _it_page(1, "lich-su-may-tinh", "Lịch sử máy tính", "Thêm trang trưng bày lịch sử máy tính hiện đại vào trường IT, đăng ký vào danh sách trải nghiệm và module."),
    _it_page(2, "an-toan-thong-tin", "An toàn thông tin", "Thêm trang giới thiệu an toàn thông tin cho trường IT, đăng ký trải nghiệm và module."),
    _it_page(3, "mang-may-tinh", "Mạng máy tính", "Thêm trang mạng máy tính cho trường IT và đăng ký vào experiences và modules."),
    _layout(1, "thu-vien-so", "Thư viện số", "Thêm trang thư viện số và đặt một toà nhà mặc định cho nó trong bản đồ khuôn viên campus-proto."),
    _layout(2, "phong-lab-ai", "Phòng lab AI", "Thêm trang phòng lab AI kèm toà nhà mặc định trên bản đồ khuôn viên."),
    _layout(3, "san-hackathon", "Sân hackathon", "Thêm trang sân hackathon và toà nhà mặc định trên bản đồ khuôn viên."),
    _backend(1, "bang-vinh-danh", "Bảng vinh danh", "Làm trang bảng vinh danh sinh viên: giao diện, API lưu danh sách, và bảng DB mới."),
    _backend(2, "gop-y-ky-tuc-xa", "Góp ý", "Làm trang góp ý có API nhận góp ý và bảng lưu trữ mới."),
    _backend(3, "dang-ky-clb", "Đăng ký CLB", "Làm trang đăng ký câu lạc bộ, API đăng ký và bảng lưu đăng ký."),
    _building(1, "gallery-lich-su-may-tinh", "Gallery lịch sử máy tính",
              "Thêm toà nhà gallery trưng bày lịch sử máy tính hiện đại vào khuôn viên trường IT: trang, đăng ký, vị trí mặc định, API và DB."),
    _building(2, "trung-tam-du-lieu", "Trung tâm dữ liệu",
              "Thêm toà nhà trung tâm dữ liệu vào khuôn viên IT: trang, đăng ký, vị trí mặc định, API và bảng DB."),
    _crossfile(1, "luyen-de", "Luyện đề thi", "public/js/features/duration.js", "formatDuration",
               "Thêm đếm ngược ở trang luyện đề: hàm formatDuration trong module dùng chung, trang gọi nó và có test."),
    _crossfile(2, "the-hoat-chat", "Thẻ ghi nhớ hoạt chất", "public/js/features/cards.js", "shuffleCards",
               "Đổi tên hàm mixCards thành shuffleCards trong module thẻ, cập nhật trang và test; không còn chỗ nào gọi tên cũ.",
               old="mixCards"),
    _bogus(1, "Thêm nút xuất PDF vào public/trang-khong-ton-tai-xyz.html của trường IT.", "public/trang-khong-ton-tai-xyz.html"),
    _bogus(2, "Sửa hàm renderGalleryNoSuch trong server/contexts/campus/gallery-phantom.js để thêm bộ lọc.", "server/contexts/campus/gallery-phantom.js"),
]
