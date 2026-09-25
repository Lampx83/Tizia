"""Tool chỉ-đọc cho context của cổng 1/3. Harness chạy tool TRƯỚC khi dựng prompt — model
không tự gọi. Registry theo schema kiểu tool-calling (name, description, JSON params) để sau
này thêm được 1 vòng "model xin thêm 1 tool" có giới hạn; vòng đó CHƯA làm.

Mọi tool đọc repo ở 1 `sha` cố định qua git show / ls-tree / grep, không đọc working tree,
trả text ≤ `budget` ký tự, và không bao giờ raise (lỗi git → chuỗi rỗng).
"""
from __future__ import annotations

import posixpath
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
    Tool("graph", "Gợi ý file liên quan từ graphify graph.json nếu có (không phải nguồn sự thật).",
         {"type": "object", "properties": {"question": _STR}, "required": ["question"]}, graph),
    Tool("lessons", "Bài học từ verdict cũ liên quan tới file/từ khoá.",
         {"type": "object", "properties": {"file": _STR, "words": _WORDS}, "required": ["file", "words"]}, lessons),
)}


def run(name: str, source, sha: str, params: dict, budget: int) -> str:
    """Chạy 1 tool, cắt output ≤ budget ký tự. Không raise (tool lỗi → "")."""
    tool = TOOLS[name]
    if name == "grep":
        params = {**params, "budget": budget}
    try:
        return _cap(tool.fn(source, sha, **params), budget)
    except Exception:  # noqa: BLE001 — context thiếu 1 tool vẫn tốt hơn cổng sập
        return ""
