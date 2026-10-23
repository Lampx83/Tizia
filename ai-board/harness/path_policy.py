"""Path policy dùng chung: deny_paths trong server/ai-board/guard-lexicon.json (đọc cùng policy/path-policy.js)."""
import json
import posixpath
import re
from pathlib import Path

LEXICON_FILE = Path(__file__).resolve().parents[2] / "server" / "ai-board" / "guard-lexicon.json"
_DENY = [re.compile(p, re.I) for p in json.loads(LEXICON_FILE.read_text(encoding="utf-8"))["deny_paths"]["patterns"]]
_CONTROL = re.compile(r"[\x00-\x1f]")


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


def names_scope(test_text: str, scope) -> bool:
    """Test under test/ hợp lệ chỉ khi nêu (đường dẫn hoặc tên file) một file trong phạm vi."""
    return any(p and (p in test_text or posixpath.basename(p) in test_text) for p in scope)
