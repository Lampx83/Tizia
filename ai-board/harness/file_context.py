"""Short-term memory cho cổng 3: model chỉ thấy phần file cần thiết (dòng khớp từ khoá,
dàn ý, cuối file) thay vì cả file, và trả khối tìm/thay thay vì viết lại cả file.
Output ngắn → không vượt timeout gateway; file lớn không còn là giới hạn.
"""
from __future__ import annotations

import re

CONTEXT_BUDGET = 6000  # ký tự trích đưa vào prompt cho 1 file
RADIUS = 3             # số dòng quanh mỗi dòng khớp từ khoá
TAIL_LINES = 8         # luôn kèm cuối file: nhiều yêu cầu là "thêm vào cuối trang"
MAX_KEYWORDS = 12
MAX_LINE = 400         # dòng dài hơn bị cắt, không dùng làm search được

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
        raise ValueError(f"khớp {len(found)} chỗ (bỏ qua thụt lề)")
    return (found[0], found[0] + len(want)) if found else None


def _search_edit(text: str, search: str, replace: str, index: int) -> str:
    for candidate, new in ((search, replace), (_LINE_NO.sub("", search), _LINE_NO.sub("", replace))):
        count = text.count(candidate) if candidate else 0
        if count == 1:
            return text.replace(candidate, new, 1)
        if count > 1:
            raise ValueError(f"edit {index}: search khớp {count} chỗ, cần đoạn dài hơn để chỉ khớp 1 chỗ")
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
