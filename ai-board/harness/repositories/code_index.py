"""Chỉ mục code 2 lớp ở ai-board/memory/code_index.json (gitignored, máy worker).

Lớp cấu trúc (`files`): thẻ/id/class, selector CSS, export/import JS, link trang→asset.
Script stdlib tất định sinh ra — model KHÔNG BAO GIỜ sửa lớp này.
Lớp ghi chú (`notes`): {summary ≤300, anchors[], by, file_hash, at, stale} do GATE1_MODEL
viết qua prompts/note_refresh.md; anchor phải có thật trong lớp cấu trúc.

Mọi đọc repo đi qua git ở 1 sha cố định (show / ls-tree / diff), không đọc working tree.
CLI: python code_index.py build --source <repo> --sha <sha>
"""
from __future__ import annotations

import argparse
import bisect
import functools
import json
import posixpath
import re
import subprocess
import time
from html.parser import HTMLParser
from pathlib import Path

from services import file_context

DEFAULT_PATH = Path(__file__).resolve().parents[2] / "memory" / "code_index.json"
ROOTS = ("public", "server/contexts")
EXTS = (".html", ".css", ".js", ".mjs")
MAX_BYTES = 400_000   # ponytail: file lớn hơn là bundle/vendor, bỏ qua; nâng nếu thiếu file thật
MAX_ITEMS = 150       # mỗi danh sách trong 1 entry, giữ file index nhỏ
SUMMARY_MAX = 300
NOTE_PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "note_refresh.md").read_text(encoding="utf-8")

_STRUCT_TAGS = {"header", "main", "nav", "section", "article", "aside", "footer", "form", "table",
                "canvas", "iframe", "dialog", "template", "button", "h1", "h2", "h3"}
_CSS_COMMENT = re.compile(r"/\*.*?\*/", re.S)
_CSS_PRELUDE = re.compile(r"([^{}]+)\{")
_KEYFRAME_STEP = re.compile(r"^(from|to|[\d.]+%)$")
_EXPORT_DECL = re.compile(r"^\s*export\s+(?:default\s+)?(?:async\s+)?(?:function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)", re.M)
_EXPORT_LIST = re.compile(r"^\s*export\s*\{([^}]*)\}", re.M)
_EXPORT_DEFAULT = re.compile(r"^\s*export\s+default\b", re.M)
_IMPORT = re.compile(r"""(?:\bimport\s+(?:[^'"()]*?\bfrom\s*)?|\bimport\s*\(\s*"""
                     r"""|\bexport\s*(?:\*(?:\s*as\s+[\w$]+)?|\{[^}]*\})\s*from\s*)['"]([^'"]+)['"]""")


def git(source, *args: str, input: bytes | None = None) -> bytes:
    """git trong `source`, trả stdout bytes. Raise OSError kèm stderr nếu lỗi."""
    result = subprocess.run(["git", *args], cwd=source, capture_output=True, input=input,
                            stdin=None if input is not None else subprocess.DEVNULL)
    if result.returncode:
        raise OSError(f"git {args[0]}: {result.stderr.decode('utf-8', 'replace').strip()[:300]}")
    return result.stdout


def resolve(owner: str, href: str) -> str | None:
    """href/import trong `owner` → đường repo. None nếu ngoài repo (http, //, data:, bare module)."""
    href = href.split("#")[0].split("?")[0].strip()
    if not href or re.match(r"^[a-z][a-z0-9+.-]*:|^//", href, re.I):
        return None
    if href.startswith("/"):
        return posixpath.normpath("public" + href)   # site root = public/
    if not href.startswith(".") and owner.endswith((".js", ".mjs")):
        return None                                   # bare specifier (npm package)
    return posixpath.normpath(posixpath.join(posixpath.dirname(owner), href))


def _uniq(items) -> list[str]:
    return list(dict.fromkeys(i for i in items if i))[:MAX_ITEMS]


def css_selectors(css: str) -> list[str]:
    """Selector của mọi rule (tách dấu phẩy), bỏ @-rule và bước keyframes."""
    out = []
    for prelude in _CSS_PRELUDE.findall(_CSS_COMMENT.sub("", css)):
        prelude = " ".join(prelude.split())
        if not prelude or prelude.startswith("@"):
            continue
        out += [s.strip() for s in prelude.split(",") if s.strip() and not _KEYFRAME_STEP.match(s.strip())]
    return _uniq(out)


def js_symbols(owner: str, js: str) -> dict:
    exports = _EXPORT_DECL.findall(js)
    for group in _EXPORT_LIST.findall(js):
        exports += [part.split(" as ")[-1].strip() for part in group.split(",")]
    if _EXPORT_DEFAULT.search(js):
        exports.append("default")
    return {"exports": _uniq(exports), "imports": _uniq(resolve(owner, m) for m in _IMPORT.findall(js))}


class _Page(HTMLParser):
    def __init__(self, owner: str):
        super().__init__(convert_charrefs=True)
        self.owner = owner
        self.tags, self.ids, self.classes, self.css, self.js, self.pages = [], [], [], [], [], []
        self.headings, self.styles, self.scripts = [], [], []
        self.chunks = []  # (dòng, "script"/"style"/None, data) — cho visible_text
        self.inline_handlers = 0
        self._in, self._heading = None, None

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        if tag in _STRUCT_TAGS:
            self.tags.append(tag)
        if a.get("id"):
            self.ids.append(a["id"])
        self.classes += a.get("class", "").split()
        self.inline_handlers += sum(1 for k in a if k.startswith("on"))
        if tag == "link" and "stylesheet" in a.get("rel", "").lower():
            self.css.append(resolve(self.owner, a.get("href", "")))
        elif tag == "script" and a.get("src"):
            self.js.append(resolve(self.owner, a["src"]))
        elif tag == "a" and (resolve(self.owner, a.get("href", "")) or "").endswith(".html"):
            self.pages.append(resolve(self.owner, a["href"]))
        if tag in ("style", "script") and not a.get("src"):
            self._in = tag
        if tag in ("h1", "h2", "h3"):
            self._heading = [tag + (f"#{a['id']}" if a.get("id") else ""), ""]

    def handle_endtag(self, tag):
        if tag == self._in:
            self._in = None
        if self._heading and tag == self._heading[0][:2]:
            self.headings.append(f'{self._heading[0]} "{" ".join(self._heading[1].split())[:60]}"')
            self._heading = None

    def handle_data(self, data):
        self.chunks.append((self.getpos()[0], self._in, data))
        if self._in == "style":
            self.styles.append(data)
        elif self._in == "script":
            self.scripts.append(data)
        elif self._heading:
            self._heading[1] += data


def parse(path: str, text: str) -> dict:
    """Lớp cấu trúc cho 1 file theo đuôi. Không raise với HTML/CSS/JS hỏng — trả phần đọc được."""
    entry: dict = {"kind": path.rsplit(".", 1)[-1].replace("mjs", "js"), "lines": text.count("\n") + 1}
    if entry["kind"] == "css":
        entry["selectors"] = css_selectors(text)
    elif entry["kind"] == "js":
        entry.update(js_symbols(path, text))
    elif entry["kind"] == "html":
        page = _Page(path)
        try:
            page.feed(text)
            page.close()
        except Exception:  # noqa: BLE001 — html.parser hiếm khi raise; giữ phần đã đọc
            pass
        inline_js = js_symbols(path, "\n".join(page.scripts))["imports"]
        entry.update(tags=_uniq(page.tags), ids=_uniq(page.ids), classes=_uniq(page.classes),
                     selectors=css_selectors("\n".join(page.styles)), headings=page.headings[:20],
                     links={"css": _uniq(page.css), "js": _uniq(page.js + inline_js), "pages": _uniq(page.pages)},
                     inline_handlers=page.inline_handlers)
    return entry


def anchors(entry: dict) -> set[str]:
    """Anchor hợp lệ cho ghi chú: #id, .class, selector, export (tên trần)."""
    return ({f"#{i}" for i in entry.get("ids", [])} | {f".{c}" for c in entry.get("classes", [])}
            | set(entry.get("selectors", [])) | set(entry.get("exports", [])))


def outline_text(path: str, entry: dict) -> str:
    """Dàn ý đọc được cho model từ 1 entry cấu trúc."""
    rows = [f"{path} [{entry['kind']}, {entry['lines']} dòng]"]
    if entry["kind"] == "html":
        links = entry.get("links", {})
        rows.append("css liên kết: " + (", ".join(links.get("css", []))
                                         or "(không có file .css — style nằm trong <style> của chính trang)"))
        if entry.get("selectors"):
            rows.append("selector trong <style>: " + ", ".join(entry["selectors"]))
        if entry.get("headings"):
            rows.append("tiêu đề: " + "; ".join(entry["headings"]))
        rows.append("id: " + (", ".join(entry.get("ids", [])) or "—"))
        rows.append("class: " + (", ".join(entry.get("classes", [])) or "—"))
        js = links.get("js", [])
        rows.append("js liên kết: " + (", ".join(js[:8]) + (f" (+{len(js) - 8})" if len(js) > 8 else "") or "(không có)"))
    elif entry["kind"] == "css":
        rows.append("selector: " + (", ".join(entry.get("selectors", [])) or "—"))
    else:
        rows.append("export: " + (", ".join(entry.get("exports", [])) or "—"))
        rows.append("import: " + (", ".join(entry.get("imports", [])) or "—"))
    return "\n".join(rows)


def _indexable(path: str, size: int) -> bool:
    return path.startswith(tuple(r + "/" for r in ROOTS)) and path.endswith(EXTS) and size <= MAX_BYTES


def _blobs(source, sha: str, paths: list[str] | None = None) -> dict[str, tuple[str, int]]:
    """{path: (blob sha, size)} ở `sha`, lọc file đáng index."""
    raw = git(source, "ls-tree", "-r", "-l", "-z", sha, "--", *(paths or ROOTS)).decode("utf-8", "replace")
    out = {}
    for rec in filter(None, raw.split("\0")):
        meta, path = rec.split("\t", 1)
        _mode, kind, blob, size = meta.split()
        if kind == "blob" and size.isdigit() and _indexable(path, int(size)):
            out[path] = (blob, int(size))
    return out


def _read_blobs(source, blobs: list[str]) -> list[str]:
    """Nội dung nhiều blob trong 1 tiến trình `git cat-file --batch`."""
    if not blobs:
        return []
    raw = git(source, "cat-file", "--batch", input=("\n".join(blobs) + "\n").encode())
    out, pos = [], 0
    for _ in blobs:
        header_end = raw.index(b"\n", pos)
        size = int(raw[pos:header_end].split()[2])
        out.append(raw[header_end + 1:header_end + 1 + size].decode("utf-8", "replace"))
        pos = header_end + 1 + size + 1
    return out


def _parse_many(source, blobs: dict[str, tuple[str, int]]) -> dict[str, dict]:
    paths = sorted(blobs)
    texts = _read_blobs(source, [blobs[p][0] for p in paths])
    return {p: {"hash": blobs[p][0], **parse(p, t)} for p, t in zip(paths, texts)}


# ── chữ hiển thị + đồ thị import (RAM, theo commit; không ghi vào code_index.json) ──
# ponytail: tách literal bằng regex, không parse JS thật — dấu ' trong regex literal / template lồng nhau làm lệch
# vài mảnh trong file đó; đổi sang tokenizer JS nếu locate trượt vì lý do này.
_JS_TOKEN = re.compile(r"""(?=[/'"`])(?://[^\n]*|/\*.*?\*/|'([^'\\\n]*(?:\\.[^'\\\n]*)*)'"""
                       r"""|"([^"\\\n]*(?:\\.[^"\\\n]*)*)"|`([^`\\]*(?:\\.[^`\\]*)*)`)""", re.S)
_PIECE = re.compile(r"<[^>]*>|\$\{[^}]*\}|([^<$]+)")
_NAMED = re.compile(r"""\bimport\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]""")


def _js_texts(js: str, first: int = 1) -> list[tuple[int, str]]:
    """(dòng, mảnh) — chữ trong string/template literal, bỏ thẻ HTML và ${…}; mảnh nhiều dòng tách từng dòng."""
    newlines = [m.start() for m in re.finditer("\n", js)]
    out = []
    for lit in _JS_TOKEN.finditer(js):
        group = lit.lastindex  # None = comment
        if group is None or (" " not in lit.group(group) and "\t" not in lit.group(group)):
            continue  # không khoảng trắng → không thể là cụm ≥ 2 từ
        for piece in _PIECE.finditer(lit.group(group)):
            if piece.group(1) is None:
                continue
            line = first + bisect.bisect_left(newlines, lit.start(group) + piece.start(1))
            out += [(line + k, part) for k, part in enumerate(piece.group(1).split("\n")) if len(part) <= file_context.TEXT_MAX]
    return out


def visible_text(path: str, text: str) -> list[tuple[int, str]]:
    """(dòng, chữ gốc) người dùng đọc thấy: text node HTML + mảnh chuỗi trong JS/<script>. Chỉ giữ mảnh có
    khoảng trắng (cụm tìm kiếm luôn ≥ 2 từ) — 1 từ trần như 'click', 'btn' gần như luôn là code."""
    if path.endswith(".html"):
        page = _Page(path)
        try:
            page.feed(text)
            page.close()
        except Exception:  # noqa: BLE001 — giữ phần đã đọc
            pass
        found = []
        for line, kind, data in page.chunks:
            if kind == "script":
                found += _js_texts(data, line)
            elif kind is None:
                found += [(line + k, part) for k, part in enumerate(data.split("\n"))]
    else:
        found = _js_texts(text)
    return [(n, t) for n, t in ((n, " ".join(t.split())) for n, t in found) if " " in t]


# ponytail: dựng lại cả chỉ mục mỗi process (~15–25 s cho ~30 MB html/js của public/, 1 lần/lượt chạy worker);
# lưu theo blob hash vào ai-board/memory/ + chỉ dựng lại file đổi nếu thời gian này thành vấn đề.
@functools.lru_cache(maxsize=2)
def ui_index(source: str, commit: str) -> dict:
    """Chỉ mục html/js dưới public/ ở `commit` (sha đã resolve — cache theo nó):
    files[path] = {text: [(dòng, " fold ")], lines: [dòng gốc], uses: [(module, [tên import], dòng, dòng gốc)],
                   imports: [path]}
    words[từ fold] = {path} để lọc nhanh file ứng viên trước khi so cụm."""
    blobs = {p: b for p, b in _blobs(source, commit, ["public"]).items() if not p.endswith(".css")}
    paths = sorted(blobs)
    files, words = {}, {}
    for path, text in zip(paths, _read_blobs(source, [blobs[p][0] for p in paths])):
        lines = text.split("\n")
        imports = (parse(path, text)["links"]["js"] if path.endswith(".html")
                   else _uniq(resolve(path, m) for m in _IMPORT.findall(text)))
        found =[(n, t) for n, t in visible_text(path, text) if n <= len(lines)]
        folded = file_context.fold_many([t for _, t in found])
        texts = [(n, f" {t} ") for (n, _), t in zip(found, folded) if " " in t]
        uses = []
        for m in _NAMED.finditer(text):
            module, line = resolve(path, m.group(2)), text.count("\n", 0, m.start()) + 1
            if module:
                uses.append((module, [n.split(" as ")[0].strip() for n in m.group(1).split(",") if n.strip()],
                             line, lines[line - 1].strip()[:160]))
        files[path] = {"text": texts, "lines": lines, "uses": uses, "imports": imports}
        for word in set(" ".join(t for _, t in texts).split()):
            words.setdefault(word, set()).add(path)
    return {"files": files, "words": words}


def load(path=DEFAULT_PATH) -> dict:
    path = Path(path)
    if not path.is_file():
        return {"version": 1, "sha": None, "files": {}, "notes": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def save(index: dict, path=DEFAULT_PATH) -> None:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    tmp.replace(path)


def build(source, sha: str, path=DEFAULT_PATH) -> dict:
    """Dựng lại lớp cấu trúc từ đầu ở `sha`. Giữ nguyên lớp notes (hash lệch thì tự bị bỏ qua)."""
    sha = git(source, "rev-parse", "--verify", f"{sha}^{{commit}}").decode().strip()
    index = load(path)
    index.update(version=1, sha=sha, files=_parse_many(source, _blobs(source, sha)))
    save(index, path)
    return index


def refresh(source, old_sha: str, new_sha: str, path=DEFAULT_PATH) -> list[str]:
    """Cập nhật lớp cấu trúc chỉ cho file trong `git diff --name-only old new`. Trả file đã đổi (đáng index)."""
    index = load(path)
    new_sha = git(source, "rev-parse", "--verify", f"{new_sha}^{{commit}}").decode().strip()
    names = git(source, "diff", "--name-only", "-z", old_sha, new_sha).decode("utf-8", "replace")
    changed = [n for n in filter(None, names.split("\0")) if n.startswith(tuple(r + "/" for r in ROOTS))
               and n.endswith(EXTS)]
    present = _blobs(source, new_sha, changed) if changed else {}
    for name in changed:
        if name not in present:
            index["files"].pop(name, None)
            index["notes"].pop(name, None)
    index["files"].update(_parse_many(source, present))
    index["sha"] = new_sha
    save(index, path)
    return [n for n in changed if n in present]


def usable_note(index: dict, file: str, current_hash: str | None) -> dict | None:
    """Ghi chú chỉ dùng được khi file_hash khớp blob hiện tại và không stale."""
    note = (index.get("notes") or {}).get(file)
    if not note or note.get("stale") or not current_hash or note.get("file_hash") != current_hash:
        return None
    return note


def parse_note(text: str, allowed: set[str]) -> dict:
    """Output model → {summary, anchors}. Raise ValueError nếu sai schema hoặc anchor không có thật."""
    try:
        out = json.loads(text)
    except (TypeError, ValueError) as e:
        raise ValueError(f"không phải JSON: {e}") from None
    if not isinstance(out, dict) or not isinstance(out.get("summary"), str) or not out["summary"].strip():
        raise ValueError("thiếu summary")
    found = out.get("anchors")
    if not isinstance(found, list) or not all(isinstance(a, str) for a in found):
        raise ValueError("anchors phải là mảng chuỗi")
    bad = [a for a in found if a not in allowed]
    if bad:
        raise ValueError(f"anchor không có trong dàn ý: {', '.join(bad[:5])}")
    return {"summary": out["summary"].strip()[:SUMMARY_MAX], "anchors": list(dict.fromkeys(found))[:8]}


def refresh_notes(changed_files: list[str], deps, budget_files: int = 5, *, budget, source, old_sha: str,
                  new_sha: str, path=DEFAULT_PATH, db_path=None, proposal_id=None) -> dict:
    """Viết lại ghi chú cho tối đa `budget_files` file đã đổi (gọi GATE1_MODEL, gate=1).
    Anchor sai → thử lại 1 lần; vẫn sai → giữ note cũ, đánh dấu stale. Chạy SAU refresh().
    Trả {updated, stale, skipped}."""
    index = load(path)
    result = {"updated": [], "stale": [], "skipped": []}
    todo = [f for f in changed_files if f in index["files"]]
    result["skipped"] = [f for f in changed_files if f not in todo[:budget_files]]
    for file in todo[:budget_files]:
        if not budget.tick():
            result["skipped"].append(file)
            continue
        entry = index["files"][file]
        old = index["notes"].get(file)
        diff = git(source, "diff", old_sha, new_sha, "--", file).decode("utf-8", "replace")
        prompt = NOTE_PROMPT.format(
            file=file,
            old_note=json.dumps({k: old[k] for k in ("summary", "anchors")}, ensure_ascii=False) if old else "(chưa có)",
            diff=diff[:3000] or "(file mới)", outline=outline_text(file, entry)[:2500])
        note, error = None, None
        for attempt in range(2):
            ask = prompt if attempt == 0 else prompt + f"\n\nLẦN TRƯỚC SAI: {error}. Chỉ dùng anchor có trong DÀN Ý."
            body = deps.call_model(deps.models.gate1_model, ask, gate=1, budget=budget,
                                   db_path=db_path, proposal_id=proposal_id, prompt_name="note_refresh.md")
            try:
                note = parse_note(body.get("response", ""), anchors(entry))
                break
            except ValueError as e:
                error = str(e)
        if note:
            index["notes"][file] = {**note, "by": deps.models.gate1_model, "file_hash": entry["hash"],
                                    "at": int(time.time()), "stale": False}
            result["updated"].append(file)
        else:
            if old:
                old["stale"] = True
            result["stale"].append(file)
    save(index, path)
    return result


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Chỉ mục code AI Board (lớp cấu trúc)")
    sub = parser.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build", help="dựng lớp cấu trúc ở 1 sha")
    b.add_argument("--source", required=True)
    b.add_argument("--sha", default="HEAD")
    b.add_argument("--out", default=str(DEFAULT_PATH))
    args = parser.parse_args(argv)
    index = build(args.source, args.sha, args.out)
    print(f"[code_index] {len(index['files'])} file @ {index['sha'][:10]} -> {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
