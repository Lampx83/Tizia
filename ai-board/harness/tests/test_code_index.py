"""code_index.py: lớp cấu trúc (parse/build/refresh/CLI) + lớp ghi chú (refresh_notes). Repo git tạm, model fake.
Fixture `repo`, `_commit`, `_SeqModels` dùng chung cho test_context_tools.py và test_gate_1_context.py."""
import json
import subprocess

import pytest

import code_index
from budget import Budget
from conftest import FakeModels, deps_with

SCHOOL = """<!DOCTYPE html>
<html lang="vi">
<head>
<link rel="stylesheet" href="./css/school.css?v=2">
<link rel="stylesheet" href="https://cdn.example.com/x.css">
</head>
<body>
<h1 id="title" class="big">Trường ảo</h1>
<div id="explore-host"></div>
<script type="module" src="./js/app.js"></script>
<footer>chân trang</footer>
</body>
</html>
"""
INLINE = """<!DOCTYPE html>
<html lang="vi"><head><style>
  .card { color: #fff; }
  @media (max-width: 600px) { .card h2, .card p { margin: 0; } }
</style></head>
<body><section class="card"><h2>Mẹo học</h2><a href="school.html#top">về trường</a></section>
<script type="module">import { start } from './js/app.js'; start();</script>
</body></html>
"""
CSS = "/* chủ đề */\n.big { color: #fff; font-size: 22px; }\nh1, .title { margin: 0; }\n@keyframes f { from { opacity: 0 } to { opacity: 1 } }\n"
APP = "import { x } from './engine/x.js';\nimport express from 'express';\nexport function start() {}\nexport const VERSION = 1;\nconst a = 1, b = 2;\nexport { a, b as bee };\n"


def _git(repo, *args):
    return subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, text=True,
                          stdin=subprocess.DEVNULL).stdout.strip()


def _commit(repo, files: dict, message="c"):
    for rel, content in files.items():
        path = repo / rel
        if content is None:
            path.unlink()
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8", newline="\n")
    _git(repo, "add", "-A")
    _git(repo, "commit", "-q", "-m", message)
    return _git(repo, "rev-parse", "HEAD")


@pytest.fixture
def repo(tmp_path):
    repo = tmp_path / "src"
    repo.mkdir()
    _git(repo, "init", "-q")
    _git(repo, "config", "user.email", "t@t")
    _git(repo, "config", "user.name", "t")
    _git(repo, "config", "core.autocrlf", "false")
    sha = _commit(repo, {"public/school.html": SCHOOL, "public/inline.html": INLINE, "public/css/school.css": CSS,
                         "public/js/app.js": APP, "server/contexts/_ai-generated/x/y/index.js": "export default 1;\n",
                         "README.txt": "không index\n"})
    return repo, sha


# ── code_index.parse: lớp cấu trúc tất định ─────────────────────────────────

def test_parse_html_links_ids_classes_and_inline_style():
    page = code_index.parse("public/school.html", SCHOOL)
    assert page["links"]["css"] == ["public/css/school.css"]          # query bỏ, CDN ngoài repo bỏ
    assert page["links"]["js"] == ["public/js/app.js"]
    assert page["ids"] == ["title", "explore-host"] and page["classes"] == ["big"]
    assert page["headings"] == ['h1#title "Trường ảo"']
    inline = code_index.parse("public/inline.html", INLINE)
    assert inline["selectors"] == [".card", ".card h2", ".card p"]     # @media bỏ, selector trong nó giữ
    assert inline["links"]["js"] == ["public/js/app.js"]              # import trong <script type=module>
    assert inline["links"]["pages"] == ["public/school.html"]
    assert "không có file .css" in code_index.outline_text("public/inline.html", inline)


def test_parse_css_and_js_symbols():
    assert code_index.parse("public/css/school.css", CSS)["selectors"] == [".big", "h1", ".title"]
    js = code_index.parse("public/js/app.js", APP)
    assert js["exports"] == ["start", "VERSION", "a", "bee"]
    assert js["imports"] == ["public/js/engine/x.js"]                  # package npm bỏ


# ── code_index: build / refresh / notes ─────────────────────────────────────

def test_index_build_and_refresh_only_changed_files(repo, tmp_path):
    src, sha = repo
    path = tmp_path / "idx.json"
    index = code_index.build(src, sha, path)
    assert set(index["files"]) == {"public/school.html", "public/inline.html", "public/css/school.css",
                                   "public/js/app.js", "server/contexts/_ai-generated/x/y/index.js"}
    inline_before = index["files"]["public/inline.html"]
    sha2 = _commit(src, {"public/css/school.css": ".big { color: #2563eb; }\n.new {}\n", "public/js/app.js": None,
                         "public/new.html": "<h1 id='n'>Mới</h1>", "README.txt": "đổi\n"})
    changed = code_index.refresh(src, sha, sha2, path)
    assert sorted(changed) == ["public/css/school.css", "public/new.html"]
    after = code_index.load(path)
    assert after["sha"] == sha2
    assert after["files"]["public/css/school.css"]["selectors"] == [".big", ".new"]
    assert "public/js/app.js" not in after["files"]
    assert after["files"]["public/inline.html"] == inline_before


def test_cli_build(repo, tmp_path, capsys):
    src, sha = repo
    assert code_index.main(["build", "--source", str(src), "--sha", sha, "--out", str(tmp_path / "i.json")]) == 0
    assert json.loads((tmp_path / "i.json").read_text(encoding="utf-8"))["sha"] == sha


class _SeqModels(FakeModels):
    """generate() trả lần lượt từng response trong danh sách."""

    def __init__(self, responses):
        super().__init__(plan=None)
        self.responses = list(responses)

    def generate(self, model, prompt, **kw):
        self.calls.append({"model": model, "prompt": prompt, **kw})
        payload = self.responses.pop(0)
        return {"response": payload if isinstance(payload, str) else json.dumps(payload, ensure_ascii=False),
                "prompt_eval_count": 10, "eval_count": 5}


def _notes_setup(repo, tmp_path):
    src, sha = repo
    path = tmp_path / "idx.json"
    index = code_index.build(src, sha, path)
    index["notes"]["public/school.html"] = {"summary": "cũ", "anchors": ["#title"], "by": "m",
                                            "file_hash": index["files"]["public/school.html"]["hash"], "at": 1,
                                            "stale": False}
    code_index.save(index, path)
    sha2 = _commit(src, {"public/school.html": SCHOOL.replace("<footer>", '<div id="tip">Mẹo</div>\n<footer>')})
    return src, sha, sha2, path, code_index.refresh(src, sha, sha2, path)


def test_refresh_notes_valid_anchor_updates_note(repo, tmp_path):
    src, sha, sha2, path, changed = _notes_setup(repo, tmp_path)
    models = _SeqModels([{"summary": "Trang trường, có khối mẹo.", "anchors": ["#tip", ".big"]}])
    out = code_index.refresh_notes(changed, deps_with(models), budget=Budget(max_wall_clock_s=999), source=src,
                                   old_sha=sha, new_sha=sha2, path=path)
    assert out["updated"] == ["public/school.html"]
    note = code_index.load(path)["notes"]["public/school.html"]
    assert note["anchors"] == ["#tip", ".big"] and note["by"] == "fake-gate1" and not note["stale"]
    assert note["file_hash"] == code_index.load(path)["files"]["public/school.html"]["hash"]
    (call,) = models.calls
    assert '"summary": "cũ"' in call["prompt"] and '+<div id="tip">Mẹo</div>' in call["prompt"]


def test_refresh_notes_retries_once_then_marks_stale(repo, tmp_path):
    src, sha, sha2, path, changed = _notes_setup(repo, tmp_path)
    bad = {"summary": "x", "anchors": ["#khong-co"]}
    models = _SeqModels([bad, bad])
    budget = Budget(max_wall_clock_s=999)
    out = code_index.refresh_notes(changed, deps_with(models), budget=budget, source=src, old_sha=sha, new_sha=sha2,
                                   path=path)
    assert out["stale"] == ["public/school.html"] and len(models.calls) == 2 and budget.model_calls == 2
    assert "#khong-co" in models.calls[1]["prompt"]                      # lần 2 được nói lỗi gì
    note = code_index.load(path)["notes"]["public/school.html"]
    assert note["summary"] == "cũ" and note["stale"] is True
    assert code_index.usable_note(code_index.load(path), "public/school.html", note["file_hash"]) is None


def test_refresh_notes_second_try_can_fix_and_budget_files_limits(repo, tmp_path):
    src, sha, sha2, path, changed = _notes_setup(repo, tmp_path)
    models = _SeqModels(["không phải json", {"summary": "ok", "anchors": []}])
    out = code_index.refresh_notes([*changed, "public/inline.html"], deps_with(models), budget_files=1,
                                   budget=Budget(max_wall_clock_s=999), source=src, old_sha=sha, new_sha=sha2, path=path)
    assert out["updated"] == ["public/school.html"] and out["skipped"] == ["public/inline.html"]

