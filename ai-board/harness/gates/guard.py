"""Cổng 4 (AC2) — check bắt buộc trên diff thật base..HEAD của full checkout:
secret, PII, injection, nội dung, xoá/sửa test có sẵn, path được bảo vệ, cộng luật
theo path đổi (Python phải parse được; public/ → cờ UI để cổng 5 bắt buộc screenshot).
Thuần text + ast.parse — không chạy code candidate trên host.

Guardrail phạm vi thay đổi (spec .scratch/ai-board-guardrails/spec.md §B): màu/bảng màu cờ,
tương phản WCAG, chủ đề nhạy cảm trong chữ hiển thị, link/script/network ra ngoài, ảnh mới,
form thu dữ liệu cá nhân, đáp án nội dung học. Mỗi finding có `severity`; `failure_class`
suy ra từ SEVERITY_CLASS. Tín hiệu không chặn nằm ở `flags` (low/medium/high, high → review_required).
"""
from __future__ import annotations

import ast
import html
import json
import re
import unicodedata
from pathlib import Path

CHECKS = ("secret", "pii", "injection", "content", "test_removal", "protected_path", "python_syntax",
          "palette", "theme", "contrast", "sensitive_topic", "external_link", "external_script", "network_call",
          "image", "personal_form", "answer_key", "sovereignty_map")

# ponytail: high → "critical" vì main.run_gate(4) chỉ phân biệt critical/ordinary; khi store có lớp
# "review" (hoặc main.py ưu tiên "plan") thì đổi đúng 1 dòng này để high = người soát, không bật alert.
SEVERITY_CLASS = {"medium": "ordinary", "high": "critical", "critical": "critical"}

LEXICON_FILE = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "guard-lexicon.json"
LEXICON = json.loads(LEXICON_FILE.read_text(encoding="utf-8"))
_NETWORK_HOSTS = ("tizia.vn", "localhost")  # fetch/XHR/beacon/WebSocket chỉ được về chính site


def fold(text: str) -> str:
    """Chữ thường, bỏ dấu tiếng Việt (đ→d)."""
    decomposed = unicodedata.normalize("NFD", text.lower())
    return "".join(c for c in decomposed if not unicodedata.combining(c)).replace("đ", "d")


def _term(term: str) -> re.Pattern:
    return re.compile(rf"(?<!\w)(?:{term.replace(' ', r'\s+')})(?!\w)")


# File tiền thật / ví xu: diff chạm là critical (cùng danh sách với policy.js money_scope).
MONEY_PATHS = frozenset(LEXICON["money_paths"]["paths"])
# Vùng yêu cầu self được sửa (cùng regex với policy.js isSelfEditable): chỉ nới luật path hạ tầng cho đúng các file này.
SELF_EDIT = [re.compile(p) for p in LEXICON["self_edit_paths"]["patterns"]]

# Term ASCII so trên bản bỏ dấu, term có dấu so trên bản NFC — xem _doc trong guard-lexicon.json.
_TOPICS ={label: [(_term(t), t.isascii()) for t in spec["terms"]] for label, spec in LEXICON["labels"].items()}


def topic_hits(text: str | None) -> list[str]:
    """Nhãn lexicon trúng trong text, theo thứ tự file JSON."""
    if not text:
        return []
    exact, folded = unicodedata.normalize("NFC", text).lower(), fold(text)
    return [label for label, pats in _TOPICS.items() if any(p.search(folded if a else exact) for p, a in pats)]


def host_allowed(host: str, allowed=None) -> bool:
    host = host.lower().rstrip(".")
    return any(host == h or host.endswith("." + h) for h in (allowed or LEXICON["allowed_hosts"]))


_URL = re.compile(r"""(?:(?:https?|wss?):|(?<=["'(=]))//([a-z0-9.-]+\.[a-z]{2,}|localhost)""", re.I)
_NET_CALL = [re.compile(p, re.I) for p in (
    r"""\b(?:fetch|sendBeacon|EventSource|WebSocket|importScripts|axios(?:\.\w+)?)\s*\(\s*[`'"](?:(?:https?|wss?):)?//([^/'"`\s:?#]+)""",
    r"""\.open\s*\(\s*[`'"]\w+[`'"]\s*,\s*[`'"](?:https?:)?//([^/'"`\s:?#]+)""",
    r"""<form\b[^>]{0,400}\baction\s*=\s*["'](?:https?:)?//([^/"'\s:?#]+)""",
)]
_SCRIPT_SRC = [re.compile(p, re.I) for p in (
    r"""<script\b[^>]{0,400}\bsrc\s*=\s*["'](?:https?:)?//([^/"'\s:?#]+)""",
    r"""\bimport\b[^'"`;]*?[`'"](?:https?:)?//([^/'"`\s:?#]+)""",
    r"""\.src\s*=\s*[`'"](?:https?:)?//([^/'"`\s:?#]+)""",
)]
_IMAGE_FILE = re.compile(r"\.(?:png|jpe?g|gif|webp|avif|ico|bmp|tiff?|svg)$", re.I)
_PERSONAL_INPUT = re.compile(
    r"""<(?:input|textarea|select)\b[^>]{0,400}?(?:\btype\s*=\s*["']?(?:email|tel|password)\b"""
    r"""|\b(?:name|id|autocomplete|placeholder|aria-label)\s*=\s*["'][^"']{0,120}(?:e-?mail|phone|\btel\b|sđt|số điện thoại"""
    r"""|so dien thoai|passw|mật khẩu|mat khau|cccd|cmnd|căn cước|address|địa chỉ|dia chi|birth|ngày sinh|ngay sinh"""
    r"""|họ tên|họ và tên|ho ten|full.?name|credit.?card|card.?number|số thẻ|cvv|bank|ngân hàng))""", re.I)
_CONTENT_DATA = re.compile(r"^public/(?:js/(?:scenarios|domains)/.+\.(?:js|json)|.+\.json)$")
_ANSWER_KEY = re.compile(r"""(?:^|[\s{,"'])(?:answer|correct|ans|correctIndex|answerIndex)["']?\s*:""")
_SOVEREIGNTY_MAP = re.compile(r"(?:^|/)(?:ban-do-vn|ban-do-viet-nam|vietnam-map|vn-map)[^/]*$|(?:^|/)maps?/.*(?:vn|vietnam)", re.I)
_VISIBLE_FILE = re.compile(r"^(?:public/.+\.(?:html?|svg|m?js|json)|server/contexts/_ai-generated/.+\.m?js)$")
_BLOCK = re.compile(r"<(script|style)\b.*?</\1\s*>", re.I | re.S)
_TAG = re.compile(r"<[^>]*>")
_ATTR_TEXT = re.compile(r"""\b(?:alt|title|placeholder|aria-label|content|value)\s*=\s*["']([^"']*)["']""", re.I)
_STRING = re.compile(r""""((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`""")
# Nhãn yêu cầu làm bảng màu cờ/biểu tượng trở thành đáng ngờ.
SENSITIVE_REQUEST = {"politics_sovereignty", "discrimination_hate", "religion", "violence_weapons", "sexual",
                     "harassment_profanity"}

# ── Màu ──────────────────────────────────────────────────────────────────────
_HEX = re.compile(r"(?<=[:=,(\s\"'])#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])", re.I)
_RGB = re.compile(r"rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})\s*(?:[,/]\s*([\d.]+%?))?\s*\)", re.I)
_NAMED = {"red": (255, 0, 0), "yellow": (255, 255, 0), "gold": (255, 215, 0), "blue": (0, 0, 255),
          "navy": (0, 0, 128), "white": (255, 255, 255), "black": (0, 0, 0), "green": (0, 128, 0),
          "orange": (255, 165, 0), "purple": (128, 0, 128)}
_NAMED_DECL = re.compile(r"(?:color|background(?:-color)?|fill|stroke|border(?:-color)?)\s*[:=]\s*[\"']?(%s)\b"
                         % "|".join(_NAMED), re.I)
_VAR_COLOR = re.compile(r"--[\w-]+\s*:\s*(?:#[0-9a-f]{3,8}\b|rgba?\(|hsla?\()", re.I)
# ponytail: CIE76 ΔE (không phải CIEDE2000), ngưỡng 25 hiệu chỉnh tay: đỏ cờ #da251d ~ đỏ báo lỗi #dc3545
# (ΔE≈16, khớp — vì vậy bảng màu một mình chỉ là tín hiệu low). Cần chuẩn hơn thì đổi sang CIEDE2000.
DELTA_E = 25.0
# (tên, màu, leo thang khi đổi theme) — bảng màu dựng từ màu UI phổ biến (đỏ/trắng/đen/xanh) chỉ leo
# thang khi yêu cầu nhạy cảm, không leo thang chỉ vì đổi theme.
PALETTES = (
    ("vn_prc_rvn_red_yellow", ("#da251d", "#ffff00"), True),
    ("ukraine_blue_yellow", ("#0057b7", "#ffd700"), True),
    ("tricolor_red_white_blue", ("#b22234", "#ffffff", "#3c3b6e"), False),
    ("palestine_flag", ("#000000", "#ffffff", "#149954", "#e4312b"), False),
    ("nazi_red_white_black", ("#dd0000", "#ffffff", "#000000"), False),
)


def _hex_rgb(value: str) -> tuple[tuple[int, int, int], bool]:
    """(rgb, opaque) từ hex 3/4/6/8 ký tự."""
    v = value.lstrip("#")
    if len(v) in (3, 4):
        v = "".join(c * 2 for c in v)
    rgb = tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))
    return rgb, len(v) == 6 or v[6:] == "ff"


def parse_color(value: str) -> tuple[int, int, int] | None:
    """1 màu đục (hex/rgb()/tên cơ bản) từ giá trị CSS; None nếu không xác định/trong suốt/gradient."""
    value = value.strip().lower()
    if "gradient" in value or "var(" in value:
        return None
    if m := re.search(r"#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b", value):
        rgb, opaque = _hex_rgb(m.group(1))
        return rgb if opaque else None
    if m := _RGB.search(value):
        alpha = m.group(4)
        if alpha and alpha not in ("1", "100%", "1.0"):
            return None
        return tuple(min(int(m.group(i)), 255) for i in (1, 2, 3))
    word = re.match(r"[a-z]+", value)
    return _NAMED.get(word.group()) if word else None


def colors_in(text: str) -> list[tuple[int, int, int]]:
    """Màu đục trong text: hex ở vị trí giá trị, rgb(), tên màu sau thuộc tính màu."""
    out = [rgb for m in _HEX.finditer(text) for rgb, opaque in [_hex_rgb(m.group(1))] if opaque]
    out += [c for m in _RGB.finditer(text) if (c := parse_color(m.group()))]
    out += [_NAMED[m.group(1).lower()] for m in _NAMED_DECL.finditer(text)]
    return out


def _linear(c: int) -> float:
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def _lab(rgb) -> tuple[float, float, float]:
    r, g, b = map(_linear, rgb)
    xyz = ((0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, 0.2126 * r + 0.7152 * g + 0.0722 * b,
           (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883)
    fx, fy, fz = (t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116 for t in xyz)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def delta_e(a, b) -> float:
    return sum((x - y) ** 2 for x, y in zip(_lab(a), _lab(b))) ** 0.5


def palette_matches(colors) -> list[tuple[str, bool]]:
    """(tên bảng màu, leo thang khi đổi theme) cho mọi bảng màu có ĐỦ màu gần (ΔE ≤ DELTA_E) trong colors."""
    labs = [_lab(c) for c in set(colors)]
    out = []
    for name, palette, theme_escalates in PALETTES:
        wanted = [_lab(_hex_rgb(h)[0]) for h in palette]
        if all(any(sum((x - y) ** 2 for x, y in zip(w, c)) ** 0.5 <= DELTA_E for c in labs) for w in wanted):
            out.append((name, theme_escalates))
    return out


def contrast_ratio(fg, bg) -> float:
    lum = [0.2126 * _linear(c[0]) + 0.7152 * _linear(c[1]) + 0.0722 * _linear(c[2]) for c in (fg, bg)]
    hi, lo = max(lum), min(lum)
    return (hi + 0.05) / (lo + 0.05)


_DECL_GROUP = re.compile(r"""\{([^{}]*)\}|\bstyle\s*=\s*["']([^"']*)["']""", re.I)
_FG = re.compile(r"(?<![-\w])color\s*:\s*([^;}]+)", re.I)
_BG = re.compile(r"(?<![-\w])background(?:-color)?\s*:\s*([^;}]+)", re.I)
_FONT_PX = re.compile(r"font-size\s*:\s*(\d+(?:\.\d+)?)px", re.I)


def low_contrast(text: str) -> list[tuple[float, float]]:
    """(tỉ lệ, ngưỡng) dưới WCAG AA — 4.5, chữ ≥24px: 3.0 — cho mỗi rule có ĐỦ color + background đục."""
    out = []
    for m in _DECL_GROUP.finditer(text):
        decls = m.group(1) or m.group(2) or ""
        fg_m, bg_m = _FG.search(decls), _BG.search(decls)
        fg, bg = (parse_color(fg_m.group(1)) if fg_m else None), (parse_color(bg_m.group(1)) if bg_m else None)
        if not fg or not bg:
            continue
        size = _FONT_PX.search(decls)
        need = 3.0 if size and float(size.group(1)) >= 24 else 4.5
        ratio = contrast_ratio(fg, bg)
        if ratio < need:
            out.append((round(ratio, 2), need))
    return out


def visible_text(path: str, added: list[str]) -> str:
    """Chữ người dùng thấy trong dòng thêm: HTML bỏ tag (giữ alt/title/placeholder…) + chuỗi trong script;
    JS/JSON → nội dung chuỗi. Rỗng nếu path không phải file giao diện/nội dung."""
    if not _VISIBLE_FILE.match(path):
        return ""
    body = "\n".join(added)

    def strings(src: str) -> str:
        return " ".join(next(g for g in m.groups() if g is not None) for m in _STRING.finditer(src))

    if re.search(r"\.(?:html?|svg)$", path):
        scripts = " ".join(strings(m.group()) for m in _BLOCK.finditer(body) if m.group(1).lower() == "script")
        markup = _BLOCK.sub(" ", body)
        text = f"{_TAG.sub(' ', markup)} {' '.join(_ATTR_TEXT.findall(markup))} {scripts}"
        return " ".join(html.unescape(text).split())
    return " ".join(strings(body).split())

_SECRET = [re.compile(p) for p in (
    r"-----BEGIN [A-Z ]*PRIVATE KEY-----",
    r"\bAKIA[0-9A-Z]{16}\b",
    r"\bsk-[A-Za-z0-9_-]{20,}",
    r"\bgh[pousr]_[A-Za-z0-9]{30,}",
    r"\bxox[abprs]-[A-Za-z0-9-]{10,}",
    r"(?i)(?:api[_-]?key|secret|seckey|token|password|passwd)\w*\s*[:=]\s*['\"][^'\"\s]{8,}['\"]",
)]
_PII = [re.compile(p) for p in (
    r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
    r"(?<!\d)(?:\+84|0)(?:3|5|7|8|9)\d{8}(?!\d)",   # di động VN
    r"(?<!\d)0\d{11}(?!\d)",                        # CCCD 12 số
)]
# `name@2x.png` là tên ảnh retina, không phải email.
_IMAGE_NAME = re.compile(r"\.(?:png|jpe?g|gif|webp|svg|avif|ico|bmp)$", re.I)
_OWN_DOMAIN = re.compile(r"@(?:[\w-]+\.)*tizia\.vn$", re.I)
_INJECTION = [re.compile(p, re.I) for p in (
    r"<\s*script\b", r"javascript\s*:", r"\son[a-z]+\s*=", r"\beval\s*\(", r"new\s+Function\s*\(",
    r"child_process", r"document\.write\s*\(",
    r"ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions", r"system\s+prompt",
    r"bỏ\s+qua\s+(?:mọi|tất\s+cả|các)\s+(?:chỉ\s+dẫn|hướng\s+dẫn)",
)]
# Ngoại lệ hẹp duy nhất cho "<script": trang chức năng mới nạp module của chính nó,
# đúng 1 dạng dòng, đường dẫn nội bộ public/js/features/<slug>/<tên>.js, không nội dung inline.
_FEATURE_MODULE = re.compile(
    r'^\s*<script\s+type="module"\s+src="(?:\./)?js/features/[a-z0-9]+(?:-[a-z0-9]+)*/[a-z0-9]+(?:-[a-z0-9]+)*\.js">'
    r'\s*</script>\s*$')
# ponytail: danh sách từ ngắn, đủ cho nội dung giáo dục D0; bộ lọc nội dung thật thay sau.
_UNSAFE = re.compile(r"(?i)(?<!\w)(?:fuck|shit|bitch|đụ|địt|đĩ|lồn|cặc|đồ\s+ngu|óc\s+chó)(?!\w)")
_TEST_PATH = re.compile(r"(?:^|/)(?:tests?|__tests__)/|(?:\.|_)(?:test|spec)\.[^/]+$|(?:^|/)test_[^/]+\.py$")
_PROTECTED = re.compile(
    r"^(?:Dockerfile|docker-compose[^/]*\.ya?ml|package(?:-lock)?\.json|\.github/|ai-board/|server/ai-board/"
    r"|server/contexts/registry\.js|server/index\.js|server/db\.js|\.dockerignore|\.gitignore)"
)


def _sections(text: str):
    """(path, deleted_file, added lines, removed lines, existing, binary) per `diff --git` section."""
    out = []
    for chunk in re.split(r"^(?=diff --git )", text, flags=re.M):
        if not chunk.startswith("diff --git "):
            continue
        path = chunk.splitlines()[0].split(" b/", 1)[-1].strip()
        lines = chunk.splitlines()
        added = [line[1:] for line in lines if line.startswith("+") and not line.startswith("+++")]
        removed = [line[1:] for line in lines if line.startswith("-") and not line.startswith("---")]
        new = "new file mode" in chunk or "\n--- /dev/null" in chunk
        binary = bool(re.search(r"^(?:Binary files .* differ|GIT binary patch)$", chunk, re.M))
        out.append((path, "deleted file mode" in chunk, added, removed, not new, binary))
    return out


def contacts_in(text: str) -> set[str]:
    """Emails/phones/ID numbers found in text (e.g. the base commit's public/ files) — PII allowlist."""
    return {m.group() for p in _PII for m in p.finditer(text)}


def _pii(line: str, allowed: set[str]) -> bool:
    return any(not _IMAGE_NAME.search(value) and not _OWN_DOMAIN.search(value) and value not in allowed
               for p in _PII for value in (m.group() for m in p.finditer(line)))


def scan(diff_text: str, checkout: str | Path | None = None, *, allowed_contacts: set[str] = frozenset(),
         request_text: str | None = None, request_type: str | None = None) -> dict:
    """Findings [{check, severity, failure_class, detail}] chặn + flags [{check, severity, detail}] không chặn
    + checks ran + ui_changed + visible_text_changed + review_required (có flag high). Detail never echoes
    a secret or the offending text. PII skips allowed_contacts (base public/, see contacts_in) and tizia.vn
    emails. request_text (yêu cầu gốc) chỉ để leo thang bảng màu cờ khi yêu cầu chạm chủ đề nhạy cảm.
    request_type 'self' (board tự sửa): sửa/thêm file trong SELF_EDIT không tính protected_path."""
    findings, flags = [], []

    def add(check, severity, detail):
        findings.append({"check": check, "severity": severity, "failure_class": SEVERITY_CLASS[severity],
                         "detail": detail[:300]})

    def flag(check, severity, detail):
        flags.append({"check": check, "severity": severity, "detail": detail[:300]})

    ui_changed = visible_changed = False
    colors, theme_colors = [], []
    for path, deleted, added, removed, existing, binary in _sections(diff_text):
        is_test = bool(_TEST_PATH.search(path))
        ui_changed |= path.startswith("public/")
        if path == ".env" or (path.startswith(".env.") and not path.endswith(".example")):
            add("secret", "critical", f"{path}: không được chạm file env")
        self_edit = request_type == "self" and not deleted and any(p.match(path) for p in SELF_EDIT)
        if _PROTECTED.match(path) and not self_edit:
            add("protected_path", "critical", f"{path}: path hạ tầng/registry cần con người")
        if path in MONEY_PATHS:
            add("protected_path", "critical", f"{path}: file tiền/thanh toán cần con người")
        if is_test and existing and (removed or deleted):
            add("test_removal", "critical", f"{path}: xoá/sửa test có sẵn")
        if not deleted and not existing and (binary or _IMAGE_FILE.search(path)):
            add("image", "high", f"{path}: ảnh/file nhị phân mới cần người duyệt")
        if not deleted and _SOVEREIGNTY_MAP.search(path):
            add("sovereignty_map", "high", f"{path}: bản đồ/lãnh thổ Việt Nam cần người duyệt")
        for line in added:
            if any(p.search(line) for p in _SECRET):
                add("secret", "critical", f"{path}: dòng thêm trông như secret")
            if is_test:
                continue  # code test hợp lệ có eval/import; PII/nội dung chỉ xét file giao cho người dùng
            if _pii(line, allowed_contacts):
                add("pii", "medium", f"{path}: dòng thêm có email/SĐT/CCCD")
            if path.startswith("public/") and not _FEATURE_MODULE.match(line) and any(p.search(line) for p in _INJECTION):
                add("injection", "critical", f"{path}: dòng thêm có script/handler/prompt injection")
            if _UNSAFE.search(line):
                add("content", "medium", f"{path}: ngôn từ không phù hợp")
            if not path.endswith((".html", ".htm", ".js", ".mjs", ".svg")):
                continue
            strong = set()
            # Bài học (scenarios/domains) chứa code mẫu dạng chuỗi: fetch('https://api.example.com'),
            # <input type="email"> — là chữ, không chạy. Chỉ miễn khi match BẮT ĐẦU trong chuỗi.
            spans = [m.span() for m in _STRING.finditer(line)] if _CONTENT_DATA.match(path) else []

            def live(matches):
                return [m for m in matches if not any(a < m.start() < b for a, b in spans)]

            for pattern in _NET_CALL:
                for host in (m.group(1) for m in live(pattern.finditer(line))):
                    strong.add(host.lower())
                    if not host_allowed(host, _NETWORK_HOSTS):
                        add("network_call", "critical", f"{path}: gọi mạng ra origin ngoài ({host.lower()})")
            for pattern in _SCRIPT_SRC:
                for host in (m.group(1) for m in live(pattern.finditer(line))):
                    strong.add(host.lower())
                    if not host_allowed(host):
                        add("external_script", "critical", f"{path}: nạp script/tài nguyên từ origin ngoài ({host.lower()})")
            if path.startswith(("public/", "server/contexts/_ai-generated/")):
                for host in {m.group(1).lower() for m in _URL.finditer(line)} - strong:
                    if not host_allowed(host):
                        add("external_link", "medium", f"{path}: link tới domain ngoài allowlist ({host})")
            if path.startswith("public/") and live(_PERSONAL_INPUT.finditer(line)):
                add("personal_form", "high", f"{path}: form thu dữ liệu cá nhân cần người duyệt")
        if path.endswith(".py") and not deleted and checkout:
            file = Path(checkout) / path
            try:
                ast.parse(file.read_text(encoding="utf-8"), filename=path)
            except (SyntaxError, OSError) as exc:
                add("python_syntax", "medium", f"{path}: {exc}")
        if is_test or deleted:
            continue
        if existing and _CONTENT_DATA.match(path) and any(_ANSWER_KEY.search(x) for x in removed) \
                and any(_ANSWER_KEY.search(x) for x in added):
            flag("answer_key", "high", f"{path}: đổi đáp án nội dung học — cần người kiểm chứng")
        if path.startswith("public/"):
            body = "\n".join(added)
            colors += colors_in(body)
            if existing and (":root" in body or len(_VAR_COLOR.findall(body)) >= 3):
                # Chỉ màu của chính biến theme mới leo thang — màu báo lỗi/cảnh báo rải rác thì không.
                theme_colors += colors_in("\n".join(x for x in added if _VAR_COLOR.search(x)))
                flag("theme", "medium", f"{path}: viết lại biến màu/theme của trang có sẵn")
            # Dưới 3:1 sai với mọi cỡ chữ → sửa 1 lần; 3–4.5 chỉ sai với chữ nhỏ (trắng trên #16a34a = 3.3,
            # mẫu phổ biến trong public/ hiện có) → cờ người soát, tránh vòng sửa vô ích.
            for ratio, need in low_contrast(body):
                (add if ratio < 3.0 else flag)("contrast", "medium",
                                               f"{path}: tương phản chữ/nền {ratio}:1 dưới WCAG AA {need}:1")
        text = visible_text(path, added)
        visible_changed |= bool(text.strip())
        for label in topic_hits(text):
            spec = LEXICON["labels"][label]
            severity = spec.get("diff")
            if not severity:
                continue
            if label == "harassment_profanity":
                add("content", severity, f"{path}: ngôn từ không phù hợp")  # trùng detail _UNSAFE → gộp
            elif label == "prompt_injection":
                add("injection", severity, f"{path}: dòng thêm có script/handler/prompt injection")
            elif spec.get("diff_flag"):
                flag("sensitive_topic", severity, f"{path}: chữ hiển thị chạm chủ đề cần soát ({label})")
            else:
                add("sensitive_topic", severity, f"{path}: chữ hiển thị chạm chủ đề nhạy cảm ({label})")
    sensitive_request = bool(set(topic_hits(request_text)) & SENSITIVE_REQUEST)
    theme_match = {name for name, escalates in palette_matches(theme_colors) if escalates}
    for name, _ in palette_matches(colors):
        theme_rewrite = name in theme_match
        if sensitive_request or theme_rewrite:
            why = "yêu cầu chạm chủ đề nhạy cảm" if sensitive_request else "đổi theme toàn trang"
            add("palette", "high", f"bảng màu giống {name} + {why}")
        else:
            flag("palette", "low", f"bảng màu giống {name} (tín hiệu, chưa đủ để chặn)")
    # 1 finding mỗi (check, path) là đủ cho người soát; bỏ trùng giữ thứ tự.
    unique = list({(f["check"], f["detail"]): f for f in findings}.values())
    flags = list({(f["check"], f["detail"]): f for f in flags}.values())
    return {"findings": unique, "checks": list(CHECKS), "ui_changed": ui_changed, "flags": flags,
            "review_required": any(f["severity"] == "high" for f in flags), "visible_text_changed": visible_changed}
