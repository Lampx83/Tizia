"""Path policy dùng chung: deny_paths trong server/ai-board/guard-lexicon.json (đọc cùng policy/path-policy.js)."""
import json
import posixpath
import re
from pathlib import Path

LEXICON_FILE = Path(__file__).resolve().parents[2] / "server" / "ai-board" / "guard-lexicon.json"
_LEXICON = json.loads(LEXICON_FILE.read_text(encoding="utf-8"))
_DENY = [re.compile(p, re.I) for p in _LEXICON["deny_paths"]["patterns"]]
_PARTS = frozenset(part.lower() for part in _LEXICON["deny_paths"]["parts"])
_ROOTS = tuple(_LEXICON["code_index"]["roots"])
_CONTROL = re.compile(r"[\x00-\x1f]")
GENERATED_DIR = "_ai-generated"
GENERATED_ROOT = f"server/contexts/{GENERATED_DIR}/"


def denied_parts() -> frozenset[str]:
    """Tên thư mục bị chặn ở mọi độ sâu, đọc từ deny_paths.parts."""
    return _PARTS


def code_roots() -> tuple[str, ...]:
    """Thư mục gốc code index đọc, đọc từ code_index.roots."""
    return _ROOTS


def normalize(value) -> str | None:
    """Đường dẫn repo chuẩn hoá; None nếu rỗng, tuyệt đối, thoát bằng .. hay có ký tự điều khiển."""
    raw = str(value or "")
    if not raw or _CONTROL.search(raw):
        return None
    path = posixpath.normpath(raw.replace("\\", "/"))
    if path.startswith("/") or re.match(r"^[A-Za-z]:", path) or path in ("..", ".") or path.startswith("../"):
        return None
    return path


def check(path, op: str = "read") -> dict:
    """{allow, reason} theo deny_paths; op chỉ vào lý do."""
    normalized = normalize(path)
    if normalized is None:
        return {"allow": False, "reason": f"{op}: path không hợp lệ"}
    if any(p.search(normalized) or p.search(normalized + "/") for p in _DENY):
        return {"allow": False, "reason": f"{op}: {normalized} thuộc vùng AI Board/hạ tầng (deny_paths)"}
    return {"allow": True, "reason": ""}


def denied(path, op: str = "read") -> bool:
    return not check(path, op)["allow"]


def may_edit(path, role: str = "student") -> bool:
    """Backend code ghi được ở path này với vai role? Hiện chỉ GENERATED_ROOT, mọi vai."""
    return str(path).startswith(GENERATED_ROOT)


def names_scope(test_text: str, scope) -> bool:
    """Test under test/ hợp lệ chỉ khi nêu (đường dẫn hoặc tên file) một file trong phạm vi."""
    return any(p and (p in test_text or posixpath.basename(p) in test_text) for p in scope)


_CONTEXT_FILE = re.compile(r"^server/contexts/([^/]+)/.+")
_TEST_FILE = re.compile(r"^tests?/.+\.test\.[cm]?js$")
# Tiền, bảo mật, danh tính, quản trị: không bao giờ mở, kể cả khi owner liệt kê nhầm.
FORBIDDEN_CONTEXTS = frozenset({"billing", "payment", "economy", "security", "identity", "auth", "session", "admin"})


def surface_context(path, tests, read, allowed) -> bool:
    """File trong context được owner mở + có test node:test hiện có nêu file này -> được coi surface."""
    normalized = normalize(path)
    match = _CONTEXT_FILE.match(normalized or "")
    if not match or read is None or not allowed:
        return False
    name = match.group(1).lower()
    if name.startswith(("_", "ai-board")) or name in FORBIDDEN_CONTEXTS or name not in allowed:
        return False
    if not check(normalized, "write")["allow"]:
        return False
    for test in tests:
        test = normalize(test)
        text = read(test) if test and _TEST_FILE.match(test) else None
        if text and "node:test" in text and names_scope(text, [normalized]):
            return True
    return False
