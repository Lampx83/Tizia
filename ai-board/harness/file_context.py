"""Short-term memory cho cổng 3: model chỉ thấy phần file cần thiết (dòng khớp từ khoá,
dàn ý, cuối file) thay vì cả file, và trả khối tìm/thay thay vì viết lại cả file.
Output ngắn → không vượt timeout gateway; file lớn không còn là giới hạn.
"""
from __future__ import annotations

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


def excerpt(content: str, words: list[str], *, budget: int = CONTEXT_BUDGET) -> str:
    """Các dòng `Lnn| …` theo ưu tiên: quanh dòng khớp từ khoá, cuối file, dàn ý; dừng khi hết budget."""
    lines = content.splitlines()
    lowered = [line.lower() for line in lines]
    hits = [i for i, low in enumerate(lowered) if any(w in low for w in words)]
    ranked = [j for i in hits for j in range(max(i - RADIUS, 0), min(i + RADIUS + 1, len(lines)))]
    ranked += range(max(len(lines) - TAIL_LINES, 0), len(lines))
    ranked += [i for i, line in enumerate(lines) if _OUTLINE.search(line)]
    chosen: set[int] = set()
    used = 0
    for i in dict.fromkeys(ranked):
        cost = min(len(lines[i]), MAX_LINE) + 8
        if used + cost > budget:
            break
        chosen.add(i)
        used += cost
    out, previous = [], None
    for i in sorted(chosen):
        if previous is not None and i != previous + 1:
            out.append("…")
        line = lines[i] if len(lines[i]) <= MAX_LINE else lines[i][:MAX_LINE] + " …(cắt, đừng dùng làm search)"
        out.append(f"L{i + 1}| {line}")
        previous = i
    return "\n".join(out)


def _where(lines: list[str], starts: list[int], width: int) -> str:
    """Each ambiguous match as `Lnn| ` lines with one line of context either side, so the model can lengthen `search`."""
    shown = []
    for start in starts[:4]:
        low, high = max(start - 1, 0), min(start + width + 1, len(lines))
        shown.append("\n".join(f"L{i + 1}| {lines[i][:200]}" for i in range(low, high)))
    return "\n---\n".join(shown)


def _stripped_match(text: str, search: str) -> tuple[int, int] | None:
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
                         + _where(text.split("\n"), found, len(want)))
    return (found[0], found[0] + len(want)) if found else None


def _search_edit(text: str, search: str, replace: str, index: int) -> str:
    for candidate, new in ((search, replace), (_LINE_NO.sub("", search), _LINE_NO.sub("", replace))):
        count = text.count(candidate) if candidate else 0
        if count == 1:
            return text.replace(candidate, new, 1)
        if count > 1:
            starts, at = [], -1
            while len(starts) < count and (at := text.find(candidate, at + 1)) >= 0:
                starts.append(text.count("\n", 0, at))
            raise ValueError(f"edit {index}: search khớp {count} chỗ, cần đoạn dài hơn để chỉ khớp 1 chỗ. Các chỗ khớp:\n"
                             + _where(text.split("\n"), starts, candidate.count("\n") + 1))
    try:
        span = _stripped_match(text, _LINE_NO.sub("", search))
    except ValueError as e:
        raise ValueError(f"edit {index}: search {e}, cần đoạn dài hơn") from None
    if span is None:
        raise ValueError(f"edit {index}: search không khớp đoạn nào trong file: {search[:200]!r}")
    lines = text.split("\n")
    return "\n".join(lines[:span[0]] + _LINE_NO.sub("", replace).split("\n") + lines[span[1]:])


def apply_edits(content: str, edits: list[dict]) -> str:
    """Áp edits: `{after_line, insert}` (chèn sau dòng số N của file gốc, 0 = đầu file) trước, từ dưới lên;
    rồi lần lượt `{search, replace}` — search khớp đúng 1 chỗ: nguyên văn, bỏ tiền tố `Lnn| `, rồi bỏ
    thụt lề. Raise ValueError (kèm đoạn lỗi) nếu không. Giữ nguyên kiểu xuống dòng CRLF của file."""
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
                                edit["replace"].replace("\r\n", "\n"), index)
    return text.replace("\n", "\r\n") if crlf else text
