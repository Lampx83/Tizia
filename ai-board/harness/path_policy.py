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


ADMIN_ROLE = "admin"
MANIFESTS = ("package.json", "package-lock.json")
_ZONE_FORBIDDEN = ("billing", "payment", "economy", "security", "identity", "auth", "session")
# Vùng cấm mọi vai khi cờ admin_backend_zone hoặc requester_fullstack bật: tiền, đăng nhập, bộ máy AI Board, hạ tầng.
_REFUSED = tuple(re.compile(p, re.I) for p in (
    r"^server/index\.js$", r"^server/db(\.js|/)", r"^server/ai-board/", r"^ai-board/",
    rf"^server/contexts/({'|'.join(_ZONE_FORBIDDEN)})/",
    r"^Dockerfile", r"^docker-compose[^/]*$", r"^\.dockerignore$", r"^\.env", r"^\.github/",
))
# Tiền, bảo mật, danh tính, quản trị: không bao giờ mở, kể cả khi owner liệt kê nhầm.
FORBIDDEN_CONTEXTS = frozenset({"billing", "payment", "economy", "security", "identity", "auth", "session", "admin"})
_ZONE_ALLOWED = tuple(re.compile(p) for p in (r"^server/contexts/[^/]+/.+", r"^public/.+", r"^package(-lock)?\.json$"))


def zone_on(role: str = ADMIN_ROLE) -> bool:
    """Vùng sửa backend mở cho role: admin theo admin_backend_zone, mọi vai theo requester_fullstack."""
    from settings import get_settings
    settings = get_settings()
    return bool(settings.requester_fullstack or settings.admin_backend_zone and role == ADMIN_ROLE)


def fullstack_on() -> bool:
    from settings import get_settings
    return bool(get_settings().requester_fullstack)


def _context_name(normalized: str) -> str | None:
    match = re.match(r"^server/contexts/([^/]+)/", normalized)
    return match.group(1).lower() if match else None


def refused(path, role: str = "student") -> bool:
    """Vùng cấm (cờ admin_backend_zone hoặc requester_fullstack bật): không bao giờ elevation.
    Vai không phải admin khi requester_fullstack bật: thêm deny_paths, context cấm và context gạch dưới."""
    normalized = normalize(path)
    if normalized is None or not (zone_on() or fullstack_on()):
        return False
    if any(p.search(normalized) for p in _REFUSED):
        return True
    if role == ADMIN_ROLE or not fullstack_on() or normalized.startswith(GENERATED_ROOT):
        return False
    name = _context_name(normalized)
    return denied(normalized, "write") or bool(name) and (name in FORBIDDEN_CONTEXTS or name.startswith(("_", "ai-board")))


def may_edit(path, role: str = "student") -> bool:
    """Điểm quyết định duy nhất: backend ghi được ở path với vai role? Mọi vai: _ai-generated.
    Vùng mở (zone_on(role)): server/contexts và public/ và package manifest, trừ vùng cấm."""
    if str(path).startswith(GENERATED_ROOT):
        return True
    if not zone_on(role):
        return False
    normalized = normalize(path)
    return normalized is not None and not refused(normalized, role) and any(p.search(normalized) for p in _ZONE_ALLOWED)


_CONTEXT_MIGRATION = re.compile(r"^server/contexts/([a-z0-9][a-z0-9-]*)/migrations/[a-z0-9][a-z0-9._-]*\.sql$")


def context_migration(path, role: str = "student") -> bool:
    """Migration riêng của context (cờ requester_fullstack): server/contexts/<name>/migrations/<file>.sql, ngoài vùng cấm."""
    normalized = normalize(path)
    return (fullstack_on() and normalized is not None and bool(_CONTEXT_MIGRATION.match(normalized))
            and not refused(normalized, role))


OUT_OF_PLAN_CAP = 8


def outside_plan_ok(path, role: str = "student") -> bool:
    """File ngoài plan sửa được: cờ out_of_plan_files bật, vai admin, trong vùng sửa của vai, ngoài vùng cấm."""
    from settings import get_settings
    return bool(get_settings().out_of_plan_files and role == ADMIN_ROLE and not denied(path, "write")
                and not refused(path, role) and may_edit(path, role))


def manifest_changes(paths) -> list[str]:
    """Tên package manifest (package.json, package-lock.json) trong danh sách path, đã chuẩn hoá, sắp xếp."""
    found = {normalize(p) for p in paths}
    return sorted(p for p in found if p in MANIFESTS)


def names_scope(test_text: str, scope) -> bool:
    """Test under test/ hợp lệ chỉ khi nêu (đường dẫn hoặc tên file) một file trong phạm vi."""
    return any(p and (p in test_text or posixpath.basename(p) in test_text) for p in scope)


_CONTEXT_FILE = re.compile(r"^server/contexts/([^/]+)/.+")
_TEST_FILE = re.compile(r"^tests?/.+\.test\.[cm]?js$")


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
        if text and "node:test" in text and _names_context_path(text, name, normalized):
            return True
    return False


def _names_context_path(text: str, ctx: str, path: str) -> bool:
    """Test nêu <ctx>/<file> (có thể là đuôi của đường dẫn đầy đủ); tên file trần không tính."""
    rest = path.split("/", 3)[3]
    pattern = r"(?<![\w.-])" + re.escape(f"{ctx}/{rest}") + r"(?!\w)"
    return re.search(pattern, text, re.I) is not None
