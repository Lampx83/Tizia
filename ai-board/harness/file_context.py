"""Short-term memory cho cổng 3: model chỉ thấy phần file cần thiết (dòng khớp từ khoá,
dàn ý, cuối file) thay vì cả file, và trả khối tìm/thay thay vì viết lại cả file.
Output ngắn → không vượt timeout gateway; file lớn không còn là giới hạn.
"""
from __future__ import annotations

import difflib
import json
import logging
import re
import unicodedata
from pathlib import Path

# Mọi núm truy xuất context (trích file, locate, exemplar, repomap, chia budget tool) nằm ở retrieval_weights.json,
# mỗi khoá kèm _why. Dưới đây chỉ là giá trị dự phòng khi file hỏng/thiếu khoá.
WEIGHTS_PATH = Path(__file__).resolve().parent / "retrieval_weights.json"
DEFAULT_WEIGHTS = {
    "context_budget": 6000, "radius": 3, "tail_lines": 8, "max_keywords": 12, "max_line": 400, "ngram": [2, 5],
    "max_phrases": 6, "text_max": 200, "max_renderers": 2, "min_stem": 4, "users_share": 1 / 3,
    "locate_budget": 800, "locate_divisor": 3, "tool_min_budget": 300, "max_mentioned_files": 3,
    "grep_top_files": 8, "locate_line_max": 160, "exemplars": 2, "common_word_share": 0.25, "min_term_len": 3,
    "repomap_seeds": 3, "repomap_limit": 8,
}


def _valid(value, default) -> bool:
    """Cùng kiểu với mặc định (float nhận cả int, list cùng độ dài), dương và hữu hạn (json nhận cả Infinity/NaN)."""
    if isinstance(default, list):
        return isinstance(value, list) and len(value) == len(default) and all(map(_valid, value, default))
    return (type(value) is type(default) or (type(default) is float and type(value) is int)) and 0 < value < float("inf")


def load_weights(path=WEIGHTS_PATH) -> dict:
    """{khoá: value} từ file `{khoá: {value, _why}}`. File hỏng → toàn bộ mặc định; khoá thiếu/sai → mặc định khoá
    đó. Cả 2 ghi cảnh báo, không raise (cổng không được sập vì file này)."""
    try:
        data = json.loads(Path(path).read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise ValueError("không phải object")
    except (OSError, ValueError) as e:
        logging.getLogger(__name__).warning("retrieval_weights %s hỏng (%s): dùng toàn bộ mặc định", path, e)
        return dict(DEFAULT_WEIGHTS)
    out, bad = {}, []
    for key, default in DEFAULT_WEIGHTS.items():
        entry = data.get(key)
        value = entry.get("value") if isinstance(entry, dict) else None
        ok = _valid(value, default)
        out[key] = value if ok else default
        if not ok:
            bad.append(key)
    if bad:
        logging.getLogger(__name__).warning("retrieval_weights %s thiếu/sai khoá %s: dùng mặc định", path, bad)
    return out


WEIGHTS = load_weights()
CONTEXT_BUDGET = WEIGHTS["context_budget"]
RADIUS = WEIGHTS["radius"]
TAIL_LINES = WEIGHTS["tail_lines"]
MAX_KEYWORDS = WEIGHTS["max_keywords"]
MAX_LINE = WEIGHTS["max_line"]
NGRAM = WEIGHTS["ngram"]
MAX_PHRASES = WEIGHTS["max_phrases"]
TEXT_MAX = WEIGHTS["text_max"]
MAX_RENDERERS = WEIGHTS["max_renderers"]
MIN_STEM = WEIGHTS["min_stem"]
USERS_SHARE = WEIGHTS["users_share"]

_WORD = re.compile(r"[0-9A-Za-zÀ-ỹ_-]{3,}")
_QUOTED = re.compile(r"['\"“‘]([^'\"”’\n]{3,80})['\"”’]")
# ponytail: stoplist ngắn cho câu yêu cầu tiếng Việt/HTML; thêm từ khi thấy grep khớp nhiễu.
_STOP = {
    "các", "của", "cho", "trong", "một", "những", "được", "với", "này", "thêm", "sửa", "đổi", "trang",
    "file", "public", "html", "chỉ", "vào", "cuối", "đầu", "the", "and", "for", "với", "khi", "không",
    "thành", "đoạn", "dòng", "ngắn", "tizia", "trường", "page", "test", "node",
}
_OUTLINE = re.compile(
    r"<(?:header|main|section|footer|nav|article|aside|h[1-3])\b|</(?:main|body|footer)>|\sid=\""
    r"|^\s*(?:export\s+)?(?:async\s+)?function\s|^\s*(?:export\s+)?class\s|^\s*export\s"
)
_LINE_NO = re.compile(r"^[ \t]*L?\d+\|[ ]?", re.M)


def keywords(*texts: str | None) -> list[str]:
    """Từ khoá grep từ tiêu đề/verify/mô tả yêu cầu: cụm trong ngoặc trước, rồi từ ≥ 3 ký tự."""
    found: list[str] = []
    for text in filter(None, texts):
        found += [q.strip().lower() for q in _QUOTED.findall(text)]
        found += [w.lower() for w in _WORD.findall(text)]
    return list(dict.fromkeys(w for w in found if w not in _STOP and not w.isdigit()))[:MAX_KEYWORDS]


_PAGE_LINE = re.compile(r"^\s*\[Trang:.*$", re.M)
_SENTENCE = re.compile(r"[.!?,;:\n()]+")


# Chữ Latin có dấu → chữ gốc, đ → d, dấu rời (text đã NFD) → bỏ. Bảng thay vì NFD: unicodedata.normalize trên
# chuỗi lớn chậm phi tuyến (20 MB mất vài phút), mà chỉ mục fold ~ 20 MB chữ.
_UNMARK = str.maketrans({**{c: unicodedata.normalize("NFD", chr(c))[0] for c in (*range(0xC0, 0x250), *range(0x1E00, 0x1F00))
                            if unicodedata.normalize("NFD", chr(c))[0] != chr(c)},
                         0x111: "d", **{c: None for c in range(0x300, 0x370)}})
_NON_ALNUM = re.compile(r"[^a-z0-9\n]+")


def _unmark(text: str) -> str:
    return text.lower().translate(_UNMARK)


def fold(text: str) -> str:
    """Bỏ dấu tiếng Việt, đ→d, chữ thường, mọi ký tự không chữ/số → 1 khoảng trắng."""
    return _NON_ALNUM.sub(" ", _unmark((text or "").replace("\n", " "))).strip()


def fold_many(texts: list[str]) -> list[str]:
    """[fold(t)] trong 1 lượt translate/sub (chỉ mục gọi cho ~ nửa triệu mảnh). Mảnh không được chứa xuống dòng."""
    return [part.strip() for part in _NON_ALNUM.sub(" ", _unmark("\n".join(texts))).split("\n")] if texts else []


_STOP_FOLDED = {fold(w) for w in _STOP}


def phrases(*texts: str | None) -> list[str]:
    """Cụm 2–5 từ liên tiếp (đã fold) trong từng câu người dùng viết, dài trước; bỏ cụm toàn stopword.
    Không dựa chữ hoa. Bỏ dòng [Trang: …] FAB tự thêm. Chọn cụm nào là việc của chỉ mục (tools.find_text)."""
    found: list[str] = []
    for text in filter(None, texts):
        for sentence in _SENTENCE.split(_PAGE_LINE.sub("", text)):
            words = fold(sentence).split()
            found += [" ".join(words[i:i + n]) for n in range(NGRAM[1], NGRAM[0] - 1, -1)
                      for i in range(len(words) - n + 1)
                      if not all(w in _STOP_FOLDED for w in words[i:i + n])]
    return list(dict.fromkeys(found))


# ── Bỏ comment trước khi đưa code cho model (repo không đổi; số dòng thật giữ nguyên) ──
# ponytail: quét ký tự, không parse JS thật. Regex literal nhận theo ký tự đứng trước; gặp chỗ không chắc (chuỗi không
# đóng trên dòng, /* không đóng) → GIỮ nguyên. Sót: `/` sau `)`/`}` coi là chia; template lồng sâu / JSX / HTML-trong-JS
# có `<!--` không xử lý. Đổi sang tokenizer thật nếu thấy cắt nhầm.
_BREAKS = "\n\r\x0b\x0c\x1c\x1d\x1e\x85  "  # ký tự str.splitlines() coi là xuống dòng
_EOL = "\n\r  "  # hết comment `//`
_PLAIN = re.compile(r"[^'\"`/{}]+")
_TPL_CHUNK = re.compile(r"[^`\\$]+")
_LAST_TOKEN = re.compile(r"([\w$]+|\S)\s*$")
_REGEX_AFTER = {"return", "typeof", "case", "in", "of", "delete", "void", "throw", "new", "else", "do", "instanceof",
                "yield", "await"}
_REGEX_PREV = set("(,=:[!&|?{};+-*%<>~^")
_CSS_TOKEN = re.compile(r"/\*.*?\*/|'(?:[^'\\\n]|\\.)*'|\"(?:[^\"\\\n]|\\.)*\"", re.S)
_HTML_TOKEN = re.compile(r"<!--.*?-->|<script(?=[\s>])([^>]*)>(.*?)</script\s*>|<style(?=[\s>])[^>]*>(.*?)</style\s*>",
                         re.S | re.I)
_SCRIPT_TYPE = re.compile(r"""\btype\s*=\s*["']?([^"'\s>]*)""", re.I)
_JS_HINT = re.compile(r"\b(?:const|let|var)\s+[\w$\[{]|\bfunction\b\s*[\w$(*]|=>|^[ \t]*(?:export|import)\b", re.M)
_CSS_HINT = re.compile(r"^[ \t]*[^{}\n;]+\{[ \t]*$", re.M)
_CSS_DECL = re.compile(r"^[ \t]*[\w-]+[ \t]*:[^;\n]+;", re.M)


def _breaks(span: str) -> str:
    """Chỉ phần xuống dòng của đoạn comment bị bỏ — số dòng không đổi."""
    return "".join(c for c in span if c in _BREAKS)


def _regex_end(text: str, i: int) -> int | None:
    """Vị trí sau regex literal mở ở text[i] == '/' (kèm flag); None nếu không đóng trên cùng dòng."""
    j, n, in_class = i + 1, len(text), False
    while j < n and text[j] not in _EOL:
        c = text[j]
        if c == "\\":
            j += 2
            continue
        if c == "[":
            in_class = True
        elif c == "]":
            in_class = False
        elif c == "/" and not in_class:
            j += 1
            while j < n and text[j].isalpha():
                j += 1
            return j
        j += 1
    return None


def _strip_js(text: str) -> str:
    out, i, n = [], 0, len(text)
    prev, depth, stack, in_tpl = "", 0, [], False  # prev = token code cuối; stack/depth = ngoặc trong `${ }`
    while i < n:
        if in_tpl:
            m = _TPL_CHUNK.match(text, i)
            if m:
                out.append(m.group())
                i = m.end()
                continue
            if text[i] == "\\":
                out.append(text[i:i + 2])
                i += 2
            elif text[i] == "`":
                in_tpl, prev = False, "x"
                out.append("`")
                i += 1
            elif text.startswith("${", i):
                in_tpl, prev = False, "{"
                stack.append(depth)
                depth = 0
                out.append("${")
                i += 2
            else:
                out.append(text[i])
                i += 1
            continue
        m = _PLAIN.match(text, i)
        if m:
            out.append(m.group())
            i = m.end()
            token = _LAST_TOKEN.search(m.group())
            prev = token.group(1) if token else prev
            continue
        c = text[i]
        if c in "'\"":
            j = i + 1
            while j < n and text[j] != c and text[j] not in _EOL:
                j += 2 if text[j] == "\\" else 1
            if j < n and text[j] == c:
                out.append(text[i:j + 1])
                i = j + 1
            else:  # không đóng trên dòng: không chắc → giữ cả dòng
                j = i
                while j < n and text[j] not in _EOL:
                    j += 1
                out.append(text[i:j])
                i = j
            prev = "x"
        elif c == "`":
            in_tpl = True
            out.append(c)
            i += 1
        elif c in "{}":
            if c == "}" and stack and depth == 0:
                depth = stack.pop()
                in_tpl = True
            else:
                depth = depth + 1 if c == "{" else max(depth - 1, 0)
            prev = c
            out.append(c)
            i += 1
        elif text.startswith("//", i):
            while i < n and text[i] not in _EOL:
                i += 1
        elif text.startswith("/*", i):
            end = text.find("*/", i + 2)
            if end < 0:  # không đóng → giữ
                out.append(text[i:])
                i = n
            else:
                out.append(_breaks(text[i:end + 2]))
                i = end + 2
        else:  # `/` đơn: regex literal hoặc chia
            end = _regex_end(text, i) if prev == "" or prev in _REGEX_PREV or prev in _REGEX_AFTER else None
            if end:
                out.append(text[i:end])
                i, prev = end, "x"
            else:
                out.append("/")
                i, prev = i + 1, "/"
    return "".join(out)


def _strip_css(text: str) -> str:
    return _CSS_TOKEN.sub(lambda m: _breaks(m.group()) if m.group().startswith("/*") else m.group(), text)


def _strip_html(text: str) -> str:
    def sub(m: re.Match) -> str:
        whole = m.group()
        if whole.startswith("<!--"):
            return _breaks(whole)
        style = m.group(3) is not None
        group = 3 if style else 2
        kind = _SCRIPT_TYPE.search(m.group(1) or "")
        if not style and kind and kind.group(1).lower() not in ("module", "") and "javascript" not in kind.group(1).lower():
            return whole  # template/json: không phải JS
        body, at = m.group(group), m.start(group) - m.start()
        return whole[:at] + (_strip_css if style else _strip_js)(body) + whole[at + len(body):]
    return _HTML_TOKEN.sub(sub, text)


def _kind(text: str, filename: str | None) -> str | None:
    """js | css | html theo đuôi; không có tên → đoán từ nội dung; không chắc → None (giữ nguyên)."""
    ext = Path(filename).suffix.lower() if filename else ""
    if ext:
        return {".js": "js", ".mjs": "js", ".cjs": "js", ".css": "css", ".html": "html", ".htm": "html"}.get(ext)
    if text.lstrip()[:15].lower().startswith(("<!doctype", "<html", "<!--", "<head", "<body")):
        return "html"
    if _JS_HINT.search(text):
        return "js"
    return "css" if _CSS_HINT.search(text) and _CSS_DECL.search(text) else None


def strip_comments(text: str, filename: str | None = None) -> str:
    """Text không comment, CÙNG số dòng: comment-only → dòng rỗng, comment cuối dòng bỏ cùng khoảng trắng thừa.
    JS/MJS `//` `/* */`, CSS `/* */`, HTML `<!-- -->` (+ nội dung <script>/<style>). Đuôi khác/đoán không ra → nguyên văn."""
    kind = _kind(text, filename)
    if kind is None or not text:
        return text
    new = {"js": _strip_js, "css": _strip_css, "html": _strip_html}[kind](text)
    if new == text:
        return text
    lines = new.split("\n")
    for k, (a, b) in enumerate(zip(text.split("\n"), lines)):
        if a != b:
            lines[k] = b.rstrip(" \t\r") + ("\r" if b.endswith("\r") else "")
    return "\n".join(lines)


def _view(text: str, filename: str | None = None) -> tuple[list[str], list[str]]:
    """(dòng thật, dòng đã bỏ comment) cùng độ dài theo splitlines; lệch (ký tự lạ) → không bỏ gì."""
    lines = text.splitlines()
    shown = strip_comments(text, filename).splitlines()
    return (lines, shown) if len(shown) == len(lines) else (lines, lines)


def visible_source(text: str, filename: str | None = None) -> str:
    """Như strip_comments nhưng bỏ hẳn dòng chỉ-comment (cho chỗ không đánh số dòng). Dòng trống gốc giữ."""
    lines, shown = _view(text, filename)
    return "\n".join(s for line, s in zip(lines, shown) if s.strip() or not line.strip())


def excerpt(content: str, words: list[str], *, budget: int = CONTEXT_BUDGET, filename: str | None = None) -> str:
    """Các dòng `Lnn| …` (đã bỏ comment, số dòng thật) theo ưu tiên: quanh dòng khớp từ khoá, cuối file, dàn ý; dừng
    khi hết budget. Dòng chỉ-comment không hiện và không tốn budget/bán kính/đuôi."""
    lines, shown = _view(content, filename)
    live = [i for i, line in enumerate(lines) if shown[i].strip() or not line.strip()]
    lowered = [shown[i].lower() for i in live]
    hits = [p for p, low in enumerate(lowered) if any(w in low for w in words)]
    ranked = [q for p in hits for q in range(max(p - RADIUS, 0), min(p + RADIUS + 1, len(live)))]
    ranked += range(max(len(live) - TAIL_LINES, 0), len(live))
    ranked += [p for p, i in enumerate(live) if _OUTLINE.search(shown[i])]
    chosen: set[int] = set()
    used = 0
    for p in dict.fromkeys(ranked):
        cost = min(len(shown[live[p]]), MAX_LINE) + 8
        if used + cost > budget:
            break
        chosen.add(p)
        used += cost
    out, previous = [], None
    for p in sorted(chosen):
        if previous is not None and p != previous + 1:
            out.append("…")
        text = shown[live[p]]
        line = text if len(text) <= MAX_LINE else text[:MAX_LINE] + " …(cắt, đừng dùng làm search)"
        out.append(f"L{live[p] + 1}| {line}")
        previous = p
    return "\n".join(out)


def _where(lines: list[str], starts: list[int], width: int) -> str:
    """Each ambiguous match as `Lnn| ` lines with one line of context either side, so the model can lengthen `search`."""
    shown = []
    for start in starts[:4]:
        low, high = max(start - 1, 0), min(start + width + 1, len(lines))
        shown.append("\n".join(f"L{i + 1}| {lines[i][:200]}" for i in range(low, high)))
    return "\n---\n".join(shown)


def _view_lines(text: str, filename: str | None = None) -> list[str]:
    """Dòng (tách theo \\n) đã bỏ comment để hiện cho model trong thông báo lỗi; lệch số dòng → dòng thật."""
    real, shown = text.split("\n"), strip_comments(text, filename).split("\n")
    return shown if len(shown) == len(real) else real


def _stripped_match(text: str, search: str, filename: str | None = None) -> tuple[int, int] | None:
    """Khớp theo dòng, bỏ khoảng trắng đầu/cuối mỗi dòng (model hay lệch thụt lề).
    (dòng đầu, dòng cuối+1) nếu đúng 1 chỗ; None nếu 0 chỗ. Raise ValueError nếu nhiều chỗ."""
    want = [line.strip() for line in search.split("\n")]
    while want and not want[0]:
        want.pop(0)
    while want and not want[-1]:
        want.pop()
    if not want:
        return None
    have = [line.strip() for line in text.split("\n")]
    found = [i for i in range(len(have) - len(want) + 1) if have[i:i + len(want)] == want]
    if len(found) > 1:
        raise ValueError(f"khớp {len(found)} chỗ (bỏ qua thụt lề). Các chỗ khớp:\n"
                         + _where(_view_lines(text, filename), found, len(want)))
    return (found[0], found[0] + len(want)) if found else None


_TAIL_PUNCT = " \t;,'\"`)}]\\"


def _tail_tolerant(text: str, search: str, replace: str) -> str | None:
    """Small models copy the start of a line right and garble its tail (`';` -> `;'`, a dropped quote, a stray
    backslash). Drop that trailing punctuation from search AND replace and apply to the head when it matches exactly
    once, so the file's real tail stays. None when nothing was trimmed, the head is not unique or the edit was only
    punctuation."""
    head, new = search.rstrip(_TAIL_PUNCT), replace.rstrip(_TAIL_PUNCT)
    if not head or len(head) == len(search) or head == new or text.count(head) != 1:
        return None
    return text.replace(head, new, 1)


def _comment_free_match(text: str, search: str, filename: str | None = None) -> tuple[int, int] | None:
    """Model thấy code không comment nên search có thể nối 2 dòng cách nhau bởi dòng chỉ-comment, hoặc thiếu comment
    giữa dòng. Khớp theo dòng trên bản đã bỏ comment, bỏ qua dòng chỉ-comment. (dòng đầu, dòng cuối+1) thật nếu đúng
    1 chỗ; không thì None. Dòng trong khoảng khớp bị thay hết (kể cả comment của chúng)."""
    want = [line.strip() for line in search.split("\n")]
    while want and not want[0]:
        want.pop(0)
    while want and not want[-1]:
        want.pop()
    real, shown = text.split("\n"), _view_lines(text, filename)
    if not want or shown == real:
        return None
    keep = [i for i, (a, b) in enumerate(zip(real, shown)) if b.strip() or not a.strip()]
    have = [shown[i].strip() for i in keep]
    found = [k for k in range(len(have) - len(want) + 1) if have[k:k + len(want)] == want]
    return (keep[found[0]], keep[found[0] + len(want) - 1] + 1) if len(found) == 1 else None


def _closest(text: str, search: str, filename: str | None = None) -> str:
    """File lines (comment-free view) most like the first line of a search that matched nothing (models drop a quote or a `;`)."""
    first = next((line.strip() for line in _LINE_NO.sub("", search).split("\n") if line.strip()), "")
    lines = _view_lines(text, filename)
    stripped = [line.strip() for line in lines]
    near = difflib.get_close_matches(first, [s for s in stripped if s], n=2, cutoff=0.75)
    shown = [f"L{stripped.index(s) + 1}| {lines[stripped.index(s)][:300]}" for s in near]
    return "\nDòng gần giống nhất trong file (chép nguyên văn từ đây):\n" + "\n".join(shown) if shown else ""


def _without_repeated_tail(text: str, search: str, replace: str) -> str:
    """Replace the unique `search`. When it stops short of the line end and the rest of the line is only closing
    punctuation (`';`, `);`) that `replace` already repeats, drop that rest: no doubled `';';`."""
    start = text.index(search)
    end = start + len(search)
    line_end = text.find("\n", end)
    tail = text[end:line_end if line_end >= 0 else len(text)]
    rest = tail.strip()
    if len(rest) >= 2 and not rest.strip(_TAIL_PUNCT) and replace.rstrip().endswith(rest):
        end += len(tail)
    return text[:start] + replace + text[end:]


def _search_edit(text: str, search: str, replace: str, index: int, filename: str | None = None) -> str:
    for candidate, new in ((search, replace), (_LINE_NO.sub("", search), _LINE_NO.sub("", replace))):
        count = text.count(candidate) if candidate else 0
        if count == 1:
            return _without_repeated_tail(text, candidate, new)
        if count > 1:
            starts, at = [], -1
            while len(starts) < count and (at := text.find(candidate, at + 1)) >= 0:
                starts.append(text.count("\n", 0, at))
            raise ValueError(f"edit {index}: search khớp {count} chỗ, cần đoạn dài hơn để chỉ khớp 1 chỗ. Các chỗ khớp:\n"
                             + _where(_view_lines(text, filename), starts, candidate.count("\n") + 1))
    try:
        span = _stripped_match(text, _LINE_NO.sub("", search), filename)
    except ValueError as e:
        raise ValueError(f"edit {index}: search {e}, cần đoạn dài hơn") from None
    if span is None:
        healed = _tail_tolerant(text, _LINE_NO.sub("", search), _LINE_NO.sub("", replace))
        if healed is not None:
            return healed
        span = _comment_free_match(text, _LINE_NO.sub("", search), filename)
    if span is None:
        raise ValueError(f"edit {index}: search không khớp đoạn nào trong file: {search[:200]!r}"
                         f"{_closest(text, search, filename)}")
    lines = text.split("\n")
    return "\n".join(lines[:span[0]] + _LINE_NO.sub("", replace).split("\n") + lines[span[1]:])


def apply_edits(content: str, edits: list[dict], filename: str | None = None) -> str:
    """Áp edits: `{after_line, insert}` (chèn sau dòng số N của file gốc, 0 = đầu file) trước, từ dưới lên;
    rồi lần lượt `{search, replace}` — search khớp đúng 1 chỗ: nguyên văn, bỏ tiền tố `Lnn| `, rồi bỏ
    thụt lề, rồi bỏ qua comment (model chỉ thấy code không comment). Luôn sửa file THẬT (còn comment). Raise
    ValueError (kèm đoạn lỗi không comment) nếu không. Giữ nguyên kiểu xuống dòng CRLF của file."""
    crlf = "\r\n" in content
    lines = content.replace("\r\n", "\n").split("\n")
    anchored = sorted(((i, e) for i, e in enumerate(edits, start=1) if "after_line" in e),
                      key=lambda pair: pair[1]["after_line"], reverse=True)
    count = len(lines) - (lines[-1] == "")  # số dòng thật; "a\n" là 1 dòng
    for index, edit in anchored:
        n = edit["after_line"]
        if not isinstance(n, int) or isinstance(n, bool) or not 0 <= n <= count:
            raise ValueError(f"edit {index}: after_line {n!r} ngoài file (0..{count})")
        lines[n:n] = _LINE_NO.sub("", edit["insert"].replace("\r\n", "\n")).split("\n")
    text = "\n".join(lines)
    for index, edit in enumerate(edits, start=1):
        if "after_line" not in edit:
            text = _search_edit(text, edit["search"].replace("\r\n", "\n"),
                                edit["replace"].replace("\r\n", "\n"), index, filename)
    return text.replace("\n", "\r\n") if crlf else text
