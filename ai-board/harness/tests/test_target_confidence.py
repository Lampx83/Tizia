"""services/target_confidence.py: ma trận tín hiệu tin cậy target của plan (thuần, không model)."""
from services import target_confidence
from test_code_index import _commit, _git

UNIQUE = "Chào mừng bạn đến với lớp học thử nghiệm"
SHARED = "Nút gửi bài trắc nghiệm"
NEW_FILE = "server/contexts/_ai-generated/pharmacy/dispense.js"


def _repo(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {
        "public/a.html": f"<h1>{UNIQUE}</h1><p>{SHARED}</p>",
        "public/b.html": f"<h1>Trang khác</h1><p>{SHARED}</p>",
        "public/js/a.js": "export const x = 1;\n",
    })
    return src


def _plan(file, *, quote=None, verify=None):
    task = {"title": "sửa", "file": file, "verify": verify or f"{file} hiển thị đúng", "size": "small"}
    if quote:
        task["quote"] = quote
    return {"summary_vi": "x", "capabilities": [], "subtasks": [task]}


def _related(*paths):
    return lambda *args, **kwargs: list(paths)


def test_unique_quote_in_the_plan_file_is_high(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related("public/a.html", "public/b.html"))
    out = target_confidence.assess(_plan("public/a.html", quote=f"<h1>{UNIQUE}</h1>"), {"question": "sửa tiêu đề"},
                                   src, "HEAD")
    assert out["level"] == "high" and out["signals"]["rule"] == "unique_quote_agrees"
    assert out["signals"]["quote"] == {"state": "unique", "checked": 1, "counts": [1], "home": "public/a.html"}
    assert out["signals"]["repomap"] == {"agree": True, "top": "public/a.html"}
    assert "\n" not in out["reason"] and out["reason"]


def test_unique_quote_in_another_file_is_low(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related("public/b.html"))
    out = target_confidence.assess(_plan("public/b.html", quote=f"<h1>{UNIQUE}</h1>"), {"question": "sửa tiêu đề"},
                                   src, "HEAD")
    assert out["level"] == "high"                      # best_match không có nhưng repomap đồng ý
    out = target_confidence.assess(_plan("public/js/a.js", quote=f"<h1>{UNIQUE}</h1>"), {"question": "sửa tiêu đề"},
                                   src, "HEAD")
    assert out["level"] == "low" and out["signals"]["rule"] == "unique_quote_elsewhere"
    assert "public/a.html" in out["reason"]


def test_zero_hit_quote_with_repomap_disagreement_is_low(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related("public/b.html"))
    out = target_confidence.assess(_plan("public/a.html", quote="Chuỗi này không có trong repo"), {"question": "q"},
                                   src, "HEAD")
    assert out["level"] == "low" and out["signals"]["rule"] == "zero_quote_disagree"
    assert out["signals"]["quote"]["state"] == "none" and "public/b.html" in out["reason"]


def test_many_hit_quote_is_low_unless_best_match_agrees(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related())
    plan = _plan("public/a.html", quote=f"<p>{SHARED}</p>")
    quiet = target_confidence.assess(plan, {"question": "q"}, src, "HEAD")
    assert quiet["signals"]["quote"]["state"] == "many" and quiet["signals"]["quote"]["counts"] == [2]
    assert quiet["level"] == "low" and quiet["signals"]["rule"] == "many_quote"
    agreed = target_confidence.assess(plan, {"question": "q", "best_match": "public/a.html"}, src, "HEAD")
    assert agreed["level"] == "high" and agreed["signals"]["rule"] == "many_quote_best_match"


def test_new_file_is_high_only_when_request_and_verify_name_it(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related())
    plan = _plan(NEW_FILE, verify=f"{NEW_FILE} có route gửi đơn")
    named = target_confidence.assess(plan, {"request": {"subject": f"thêm {NEW_FILE}", "body": "tạo route"}},
                                     src, "HEAD")
    assert named["signals"]["path"]["kind"] == "new" and named["signals"]["verify_names_request_path"] is True
    assert named["level"] == "high" and named["signals"]["rule"] == "new_file_named"
    unnamed = target_confidence.assess(plan, {"request": {"subject": "thêm route gửi đơn"}}, src, "HEAD")
    assert unnamed["level"] == "low" and unnamed["signals"]["rule"] == "new_file_unnamed"


def test_existing_file_without_quote_is_high_when_best_match_agrees(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related())
    out = target_confidence.assess(_plan("public/a.html"), {"question": "q", "best_match": "public/a.html"}, src, "HEAD")
    assert out["level"] == "high" and out["signals"]["rule"] == "no_quote_agrees"
    assert target_confidence.assess(_plan("public/b.html"), {"question": "q"}, src, "HEAD")["level"] == "low"


def test_typo_path_is_low_even_without_any_quote(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related("public/aa.html"))
    out = target_confidence.assess(_plan("public/aa.html"), {"question": "q"}, src, "HEAD")
    assert out["signals"]["path"] == {"kind": "typo", "closest": "public/a.html",
                                      "files": {"public/aa.html": {"kind": "typo", "closest": "public/a.html"}}}
    assert out["level"] == "low" and out["signals"]["rule"] == "path_typo" and "public/a.html" in out["reason"]


def test_payload_is_capped(monkeypatch, tmp_path):
    src = _repo(tmp_path)
    monkeypatch.setattr(target_confidence.repomap, "related", _related(*(f"public/p{i}.html" for i in range(9))))
    long_file = "server/contexts/_ai-generated/" + "x" * 220 + "/index.js"
    out = target_confidence.assess(_plan(long_file, quote=f"<p>{SHARED}</p>"), {"question": "q"}, src, "HEAD")
    assert set(out) == {"level", "signals", "candidates", "reason"}
    assert len(out["candidates"]) == 5 and len(out["reason"]) <= 200


def test_plan_without_subtasks_is_low(tmp_path):
    out = target_confidence.assess({"subtasks": []}, {"question": "q"}, tmp_path, "HEAD")
    assert out["level"] == "low" and out["candidates"] == [] and out["reason"]
