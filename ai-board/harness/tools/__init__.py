"""Tool chỉ-đọc cho context của cổng 1/3. Harness chạy tool TRƯỚC khi dựng prompt — model
không tự gọi. Registry theo schema kiểu tool-calling (name, description, JSON params) để sau
này thêm được 1 vòng "model xin thêm 1 tool" có giới hạn; vòng đó CHƯA làm.

Mọi tool đọc repo ở 1 `sha` cố định qua git show / ls-tree / grep, không đọc working tree,
trả text ≤ `budget` ký tự, và không bao giờ raise (lỗi git → chuỗi rỗng).
"""
from __future__ import annotations

import functools
import math
import posixpath
import re
from dataclasses import dataclass
from typing import Callable

import code_index
import repomap
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
    return "file khớp từ khoá: " + ", ".join(f"{f} ({n})" for n, f in hits[:file_context.WEIGHTS["grep_top_files"]]) if hits else ""


def _files_with(index: dict, gram: str) -> list[str]:
    """File có cụm (đã fold) nằm trọn trong 1 mảnh chữ hiển thị."""
    words = gram.split()
    candidates = set.intersection(*(index["words"].get(w, set()) for w in words)) if words else set()
    return sorted(f for f in candidates if any(f" {gram} " in t for _, t in index["files"][f]["text"]))


def _reach(files: dict, pages: list[str]) -> dict[str, int]:
    """{file: số bước import từ trang} theo đồ thị import thật (script src, import, import('…') tĩnh, export … from)."""
    depth = {p: 0 for p in pages if p in files}
    queue = list(depth)
    for file in queue:
        for module in files[file]["imports"]:
            if module in files and module not in depth:
                depth[module] = depth[file] + 1
                queue.append(module)
    return depth


@functools.lru_cache(maxsize=8)
def _ranked(source: str, commit: str, grams: tuple, pages: tuple) -> tuple[dict, dict, list]:
    """(index, depth, [(cụm, file có cụm — gần trang trước)]). Thứ tự cụm: có trong file trang tải được (đồ thị
    import) trước, rồi hiếm nhất trên toàn chỉ mục (df nhỏ = IDF lớn), rồi dài hơn; bỏ cụm nằm trong cụm đã chọn
    mà không thêm file nào. Cache: find_text và renderers cùng hỏi 1 câu."""
    index = code_index.ui_index(source, commit)
    depth = _reach(index["files"], list(pages))
    found = {g: _files_with(index, g) for g in grams}
    chosen: list[tuple[str, list[str]]] = []
    for gram in sorted((g for g in grams if found[g]),
                       key=lambda g: (not any(f in depth for f in found[g]), len(found[g]), -g.count(" "))):
        if len(chosen) < file_context.MAX_PHRASES and not any(
                f" {gram} " in f" {c} " and set(found[gram]) <= set(files) for c, files in chosen):
            chosen.append((gram, sorted(found[gram], key=lambda f: (f not in depth, depth.get(f, 0), f))))
    return index, depth, chosen


def _rank(source, sha: str, phrases: list[str], pages) -> tuple[dict, dict, list]:
    """Resolve sha rồi _ranked. Raise OSError nếu git lỗi."""
    commit = code_index.git(source, "rev-parse", "--verify", f"{sha}^{{commit}}").decode().strip()
    grams = tuple(dict.fromkeys(g for g in map(file_context.fold, phrases) if g))
    return _ranked(str(source), commit, grams, tuple(pages))


def _stems(files) -> set[str]:
    """achievements.js → achievement; path-renderer.js → pathrenderer (so với tên hàm viết thường). Chỉ file JS."""
    stems = {re.sub(r"[^a-z0-9]", "", posixpath.splitext(posixpath.basename(f))[0].lower()).rstrip("s")
             for f in files if f.endswith((".js", ".mjs"))}
    return {s for s in stems if len(s) >= file_context.MIN_STEM}


def find_text(source, sha: str, phrases: list[str], pages: list[str] = ()) -> tuple[list, list]:
    """(hits, users): cụm người dùng nhắc (bỏ dấu, không cần hoa) khớp chỉ mục chữ hiển thị html/js của public/,
    theo thứ tự _ranked. users = dòng `import {…}` có tên chứa stem file JS chứa chữ (component render dữ liệu đó).
    Lỗi git → ([], [])."""
    try:
        index, _, chosen = _rank(source, sha, phrases, pages)
    except OSError:
        return [], []
    hits = list(dict.fromkeys((f, str(n), index["files"][f]["lines"][n - 1].strip()[:file_context.WEIGHTS["locate_line_max"]]) for g, files in chosen
                              for f in files for n, t in index["files"][f]["text"] if f" {g} " in t))
    texts = {f for f, _, _ in hits}
    stems = _stems(texts)
    users = [(f, str(n), raw) for f in sorted(index["files"]) if f not in texts
             for _, names, n, raw in index["files"][f]["uses"] if any(s in x.lower() for x in names for s in stems)]
    return hits, users


def renderers(source, sha: str, phrases: list[str], pages: list[str]) -> tuple[list[str], list[str]]:
    """(module, từ khoá) — khi cụm đứng đầu (_ranked) không nằm trong chính trang: module trong đồ thị import của
    trang được import kèm tên chứa stem file JS chứa cụm (vd showAchievementToast ← achievements.js). Chỉ xét file
    chứa cụm gần trang nhất (cụm phổ biến như "bắt đầu" có ở cả trăm file). show…/render… trước, rồi gần trang hơn.
    Từ khoá = stem + tên đó (để trích đúng đoạn)."""
    if not pages:
        return [], []
    try:
        index, depth, chosen = _rank(source, sha, phrases, pages)
    except OSError:
        return [], []
    if not chosen or any(f in pages for f in chosen[0][1]):
        return [], []
    near = [f for f in chosen[0][1] if f in depth]  # đồ thị hụt (import động theo biến) → dùng mọi file chứa cụm
    stems = _stems([f for f in near if depth[f] == depth[near[0]]] if near else chosen[0][1])
    rows = []
    for importer in sorted(depth, key=lambda f: (depth[f], f)):
        for module, names, _, _ in index["files"][importer]["uses"]:
            symbols = [n for n in names if any(s in n.lower() for s in stems)]
            if symbols:
                rows.append(((not any(re.match(r"(show|render)", s) for s in symbols), depth[importer]), module, symbols))
    best = [row for row in rows if row[0] == min(r[0] for r in rows)] if rows else []
    modules = list(dict.fromkeys(m for _, m, _ in best))[:file_context.MAX_RENDERERS]
    symbols = list(dict.fromkeys(s for _, m, syms in best if m in modules for s in syms))
    words = [s for s in sorted(stems) if any(s in x.lower() for x in symbols)] + symbols
    return modules, words


def locate(source, sha: str, *, phrases: list[str], prefer: list[str] = (), budget: int = 1200) -> str:
    """Chữ người dùng nhắc → `file:dòng| nội dung` (file trong `prefer` lên trước), rồi dòng import render nó."""
    pages = [p for p in prefer if p.endswith(".html")]
    return format_located(*find_text(source, sha, phrases, pages), prefer=prefer, budget=budget)


def format_located(hits: list, users: list, *, prefer=(), budget: int = 1200) -> str:
    hits = sorted(hits, key=lambda row: row[0] not in prefer)
    users = sorted(users, key=lambda row: row[0] not in prefer)
    lines, used = [], 0
    # Hit nhiều (cụm phổ biến) không được đẩy mất dòng import — đường tới component render.
    reserve = min(int(budget * file_context.USERS_SHARE), sum(len(f"{f}:{n}| {t}") + 1 for f, n, t in users) + 40)
    for title, rows, cap in (("chữ người dùng nhắc nằm ở:", hits, budget - reserve),
                             ("dữ liệu đó được dùng ở (import):", users, budget)):
        block = [title] if rows else []
        for file, no, text in rows:
            item = f"{file}:{no}| {text}"
            if used + len(item) + len(title) + 2 > cap:
                break
            block.append(item)
            used += len(item) + 1
        if len(block) > 1:
            lines += block
            used += len(title) + 1
    return "\n".join(lines)


def repomap_tool(source, sha: str, *, question: str) -> str:
    """Gợi ý file liên quan từ sơ đồ repo của AI Board (chữ hiển thị + import); rỗng khi không khớp."""
    found = repomap.related(source, sha, question)
    return "sơ đồ repo gợi ý (chưa xác nhận): " + ", ".join(found) if found else ""


def lessons(source, sha: str, *, file: str, words: list[str], path=None) -> str:
    found = memory.recall(path or memory.DEFAULT_PATH, file, words)
    return "bài học cũ:\n" + "\n".join(found) if found else ""


_STR = {"type": "string"}
_WORDS = {"type": "array", "items": {"type": "string"}}
_TOP_PAGE = re.compile(r"^public/[^/]+\.html$")
EXEMPLARS = file_context.WEIGHTS["exemplars"]


def exemplar(source, sha: str, *, words: list[str], budget: int = 2500) -> str:
    """Trang mẫu cho chức năng mới (ticket 08): xếp trang public/*.html theo tổng IDF các từ (đã bỏ dấu) của yêu cầu
    có trong chữ hiển thị của trang — truy xuất trên chỉ mục tự sinh, không danh sách tay. Trả dàn ý + đầu trang
    (head/theme tới </style>) của trang gần nhất để làm khung."""
    commit = code_index.git(source, "rev-parse", "--verify", f"{sha}^{{commit}}").decode().strip()
    index = code_index.ui_index(source, commit)
    pages = [p for p in index["files"] if _TOP_PAGE.match(p)]
    total = max(len(index["files"]), 1)
    terms = {w for w in file_context.fold(" ".join(words)).split() if len(w) >= file_context.WEIGHTS["min_term_len"]}
    score = {p: 0.0 for p in pages}
    for term in terms:
        holders = index["words"].get(term, set())
        if not holders or len(holders) > total * file_context.WEIGHTS["common_word_share"]:  # từ quá phổ biến không phân biệt được trang
            continue
        idf = math.log(total / len(holders))
        for page in holders & set(pages):
            score[page] += idf
    # Chuẩn hoá theo độ dài: trang tổng hợp (index.html…) chứa đủ mọi từ, không được thắng chỉ vì dài.
    size = {p: len({w for _, t in index["files"][p]["text"] for w in t.split()}) or 1 for p in pages}
    score = {p: s / math.sqrt(size[p]) for p, s in score.items()}
    ranked = [p for p in sorted(pages, key=lambda p: -score[p]) if score[p] > 0][:EXEMPLARS]
    if not ranked:
        return ""
    best = ranked[0]
    text = _show(source, commit, best) or ""
    head = text.split("</style>", 1)[0] + "</style>" if "</style>" in text else "\n".join(text.splitlines()[:40])
    return (f"trang mẫu gần nhất (theo chữ hiển thị): {', '.join(ranked)}\n"
            f"{code_index.outline_text(best, code_index.parse(best, text))}\n"
            f"đầu trang mẫu {best} (theme dùng lại):\n{_cap(head, budget // 2)}")


TOOLS: dict[str, Tool] = {t.name: t for t in (
    Tool("tree", "Liệt kê file/thư mục con trực tiếp của 1 thư mục ở base sha.",
         {"type": "object", "properties": {"path": _STR}, "required": ["path"]}, tree),
    Tool("outline", "Dàn ý 1 file: thẻ/id/class, selector CSS, export/import JS, css/js trang liên kết.",
         {"type": "object", "properties": {"file": _STR}, "required": ["file"]}, outline),
    Tool("grep", "Cửa sổ dòng quanh từ khoá trong 1 file; không có file thì liệt kê file khớp trong path.",
         {"type": "object", "properties": {"words": _WORDS, "file": _STR, "path": _STR}, "required": ["words"]}, grep),
    Tool("locate", "Tìm chữ hiển thị người dùng nhắc (không cần dấu/hoa) trong html/js của public/, trả file:dòng.",
         {"type": "object", "properties": {"phrases": _WORDS}, "required": ["phrases"]}, locate),
    Tool("exemplar", "Trang có sẵn giống chức năng mới nhất (theo chữ hiển thị) + dàn ý và phần đầu trang để làm khung.",
         {"type": "object", "properties": {"words": _WORDS}, "required": ["words"]}, exemplar),
    Tool("repomap", "File liên quan theo chữ hiển thị + đồ thị import ở đúng commit (gợi ý, không phải nguồn sự thật).",
         {"type": "object", "properties": {"question": _STR}, "required": ["question"]}, repomap_tool),
    Tool("lessons", "Bài học từ verdict cũ liên quan tới file/từ khoá.",
         {"type": "object", "properties": {"file": _STR, "words": _WORDS}, "required": ["file", "words"]}, lessons),
)}


def run(name: str, source, sha: str, params: dict, budget: int) -> str:
    """Chạy 1 tool, cắt output ≤ budget ký tự. Không raise (tool lỗi → "")."""
    tool = TOOLS[name]
    if name in ("grep", "locate", "exemplar"):
        params = {**params, "budget": budget}
    try:
        return _cap(tool.fn(source, sha, **params), budget)
    except Exception:  # noqa: BLE001 — context thiếu 1 tool vẫn tốt hơn cổng sập
        return ""
