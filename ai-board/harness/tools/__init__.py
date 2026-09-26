"""Tool chỉ-đọc cho context của cổng 1/3. Harness chạy tool TRƯỚC khi dựng prompt — model
không tự gọi. Registry theo schema kiểu tool-calling (name, description, JSON params) để sau
này thêm được 1 vòng "model xin thêm 1 tool" có giới hạn; vòng đó CHƯA làm.

Mọi tool đọc repo ở 1 `sha` cố định qua git show / ls-tree / grep, không đọc working tree,
trả text ≤ `budget` ký tự, và không bao giờ raise (lỗi git → chuỗi rỗng).
"""
from __future__ import annotations

import posixpath
import re
from dataclasses import dataclass
from typing import Callable

import code_index
import codegraph
import file_context
import memory


@dataclass(frozen=True)
class Tool:
    name: str
    description: str
    parameters: dict  # JSON Schema của params
    fn: Callable[..., str]


def _cap(text: str, budget: int) -> str:
    return text if len(text) <= budget else text[:max(budget - 2, 0)] + " …"


def _show(source, sha: str, file: str) -> str | None:
    try:
        return code_index.git(source, "show", f"{sha}:{file}").decode("utf-8", "replace")
    except OSError:
        return None


def tree(source, sha: str, *, path: str = "public") -> str:
    try:
        raw = code_index.git(source, "ls-tree", sha, "--", path.rstrip("/") + "/").decode("utf-8", "replace")
    except OSError:
        return ""
    names = [posixpath.basename(line.split("\t", 1)[1]) + ("/" if " tree " in line else "")
             for line in raw.splitlines() if "\t" in line]
    return f"{path.rstrip('/')}/: " + ", ".join(names) if names else ""


def outline(source, sha: str, *, file: str, index_path=None) -> str:
    text = _show(source, sha, file)
    if text is None:
        return f"{file}: (chưa tồn tại ở base)"
    out = code_index.outline_text(file, code_index.parse(file, text))
    if index_path:
        note = _note(source, sha, file, index_path)
        if note:
            out += f"\nghi chú: {note['summary']}" + (f" (anchor: {', '.join(note['anchors'])})" if note["anchors"] else "")
    return out


def _note(source, sha, file, index_path) -> dict | None:
    try:
        blob = code_index.git(source, "rev-parse", f"{sha}:{file}").decode().strip()
        return code_index.usable_note(code_index.load(index_path), file, blob)
    except (OSError, ValueError):
        return None


def grep(source, sha: str, *, words: list[str], file: str | None = None, path: str = "public",
         budget: int = 2000) -> str:
    """file → cửa sổ dòng quanh từ khoá (file_context.excerpt). Không file → file khớp nhiều nhất trong path."""
    if not words:
        return ""
    if file:
        text = _show(source, sha, file)
        return f"{file} (trích):\n" + file_context.excerpt(text, words, budget=budget) if text else ""
    args = ["grep", "-c", "-i", "-F", "-I"] + [x for w in words for x in ("-e", w)] + [sha, "--", path]
    try:
        raw = code_index.git(source, *args).decode("utf-8", "replace")
    except OSError:
        return ""  # exit 1 = không khớp
    hits = sorted(((int(n), f.split(":", 1)[1]) for f, n in (line.rsplit(":", 1) for line in raw.splitlines())),
                  reverse=True)
    return "file khớp từ khoá: " + ", ".join(f"{f} ({n})" for n, f in hits[:8]) if hits else ""


# Chữ hiển thị có thể nằm trong JS (dữ liệu, component render) chứ không chỉ trong trang .html.
_UI_FILES = ("public/*.html", "public/*.js", "public/*.css")


def _grep_lines(source, sha: str, args: list[str]) -> list[tuple[str, str, str]]:
    """git grep -n → [(file, dòng, nội dung)]; không khớp/lỗi → []."""
    try:
        raw = code_index.git(source, "grep", "-n", "-i", "-I", *args).decode("utf-8", "replace")
    except OSError:
        return []  # exit 1 = không khớp
    return [(p[1], p[2], p[3].strip()[:160]) for p in (line.split(":", 3) for line in raw.splitlines()) if len(p) == 4]


def find_text(source, sha: str, phrases: list[str]) -> tuple[list, list]:
    """(hits, users): dòng chứa chữ người dùng nhắc trong html/js/css của public/; chữ nằm ở file dữ liệu
    public/js/domains/<d>/<kind>s.js → users = các dòng `import … from` nhắc tới <kind> (component render nó).
    ponytail: 1 bước lần theo tên file, đồ thị import thật nếu quy ước này hụt."""
    if not phrases:
        return [], []
    hits = _grep_lines(source, sha, ["-F", *[x for p in phrases for x in ("-e", p)], sha, "--", *_UI_FILES])
    kinds = {posixpath.splitext(posixpath.basename(f))[0].rstrip("s") for f, _, _ in hits if "/js/domains/" in f}
    users = [u for kind in sorted(kinds) if len(kind) >= 4
             for u in _grep_lines(source, sha, ["-e", "import ", "--and", "-e", " from ", "--and", "-e", kind, sha, "--", *_UI_FILES])
             if "/js/domains/" not in u[0]]
    return hits, users


_FROM = re.compile(r"""\bfrom\s+['"](\.{1,2}/[^'"]+\.m?js)['"]""")


_NAMES = re.compile(r"import\s*\{([^}]*)\}")


def renderers(hits: list, users: list, pages: list[str]) -> tuple[list[str], list[str]]:
    """(module, từ khoá) — module JS mà trang import để hiện chữ người dùng nhắc, khi chữ đó không nằm trong
    chính trang. Module có hàm show…/render…<kind> lên trước; từ khoá = <kind> + tên hàm đó (để trích đúng đoạn)."""
    if not hits or not pages or any(f in pages for f, _, _ in hits):
        return [], []
    kinds = {posixpath.splitext(posixpath.basename(f))[0].rstrip("s").lower() for f, _, _ in hits if "/js/domains/" in f}
    found = []
    for file, _, text in users:
        path, names = _FROM.search(text), _NAMES.search(text)
        if file not in pages or not path:
            continue
        symbols = [n.strip() for n in (names.group(1) if names else "").split(",")
                   if any(k in n.lower() for k in kinds)]
        shows = any(re.match(r"(show|render)", s) for s in symbols)
        found.append((not shows, posixpath.normpath(posixpath.join(posixpath.dirname(file), path.group(1))), symbols))
    found.sort(key=lambda row: row[0])
    if found and not found[0][0]:  # có module show…/render…: chỉ giữ loại đó
        found = [row for row in found if not row[0]]
    modules = list(dict.fromkeys(m for _, m, _ in found))[:2]
    words = list(dict.fromkeys([*sorted(kinds), *(s for _, m, syms in found if m in modules for s in syms)]))
    return modules, words


def locate(source, sha: str, *, phrases: list[str], prefer: list[str] = (), budget: int = 1200) -> str:
    """Chữ người dùng nhắc → `file:dòng| nội dung` (file trong `prefer` lên trước), rồi dòng import render nó."""
    return format_located(*find_text(source, sha, phrases), prefer=prefer, budget=budget)


def format_located(hits: list, users: list, *, prefer=(), budget: int = 1200) -> str:
    hits = sorted(hits, key=lambda row: row[0] not in prefer)
    users = sorted(users, key=lambda row: row[0] not in prefer)
    lines, used = [], 0
    for title, rows in (("chữ người dùng nhắc nằm ở:", hits), ("dữ liệu đó được dùng ở (import):", users)):
        block = [title] if rows else []
        for file, no, text in rows:
            item = f"{file}:{no}| {text}"
            if used + len(item) + len(title) + 2 > budget:
                break
            block.append(item)
            used += len(item) + 1
        if len(block) > 1:
            lines += block
            used += len(title) + 1
    return "\n".join(lines)


def graph(source, sha: str, *, question: str) -> str:
    """Gợi ý graphify (chỉ khi có graph.json); rỗng khi không có — không bao giờ bắt buộc."""
    found = codegraph.query(question)
    return "gợi ý graphify (chưa xác nhận): " + ", ".join(found[:8]) if found else ""


def lessons(source, sha: str, *, file: str, words: list[str], path=None) -> str:
    found = memory.recall(path or memory.DEFAULT_PATH, file, words)
    return "bài học cũ:\n" + "\n".join(found) if found else ""


_STR = {"type": "string"}
_WORDS = {"type": "array", "items": {"type": "string"}}
TOOLS: dict[str, Tool] = {t.name: t for t in (
    Tool("tree", "Liệt kê file/thư mục con trực tiếp của 1 thư mục ở base sha.",
         {"type": "object", "properties": {"path": _STR}, "required": ["path"]}, tree),
    Tool("outline", "Dàn ý 1 file: thẻ/id/class, selector CSS, export/import JS, css/js trang liên kết.",
         {"type": "object", "properties": {"file": _STR}, "required": ["file"]}, outline),
    Tool("grep", "Cửa sổ dòng quanh từ khoá trong 1 file; không có file thì liệt kê file khớp trong path.",
         {"type": "object", "properties": {"words": _WORDS, "file": _STR, "path": _STR}, "required": ["words"]}, grep),
    Tool("locate", "Tìm chữ hiển thị người dùng nhắc trong html/js/css của public/, trả file:dòng.",
         {"type": "object", "properties": {"phrases": _WORDS}, "required": ["phrases"]}, locate),
    Tool("graph", "Gợi ý file liên quan từ graphify graph.json nếu có (không phải nguồn sự thật).",
         {"type": "object", "properties": {"question": _STR}, "required": ["question"]}, graph),
    Tool("lessons", "Bài học từ verdict cũ liên quan tới file/từ khoá.",
         {"type": "object", "properties": {"file": _STR, "words": _WORDS}, "required": ["file", "words"]}, lessons),
)}


def run(name: str, source, sha: str, params: dict, budget: int) -> str:
    """Chạy 1 tool, cắt output ≤ budget ký tự. Không raise (tool lỗi → "")."""
    tool = TOOLS[name]
    if name in ("grep", "locate"):
        params = {**params, "budget": budget}
    try:
        return _cap(tool.fn(source, sha, **params), budget)
    except Exception:  # noqa: BLE001 — context thiếu 1 tool vẫn tốt hơn cổng sập
        return ""
