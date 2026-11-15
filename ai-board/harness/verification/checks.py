"""Check do plan khai: primitive đóng, soát tham số, phân loại đỏ→xanh giữa base và candidate."""
from __future__ import annotations

MAX_CHECKS = 8
MAX_TEXT = 200
MAX_PATH = 300
PRIMITIVES = {"text_present": ("path", "text"), "text_absent": ("path", "text")}
CODE_FAULT, PROOF, NONE = "broken", "proving", "none"


def problem(check) -> str | None:
    """Lỗi của một check (primitive lạ, tham số sai, path/chữ ngoài luật); None nếu hợp lệ."""
    if not isinstance(check, dict):
        return "check phải là object"
    params = PRIMITIVES.get(check.get("primitive"))
    if params is None:
        return f"primitive lạ: {str(check.get('primitive'))[:40]!r}"
    if set(check) != {"primitive", *params}:
        return f"{check['primitive']}: tham số phải đúng {sorted(params)}"
    path, text = check["path"], check["text"]
    if (not isinstance(path, str) or not path.startswith("/") or path.startswith("//") or len(path) > MAX_PATH
            or any(bad in path for bad in ("\\", "..", "://")) or any(ord(c) < 32 for c in path)):
        return f"path không hợp lệ: {str(path)[:40]!r}"
    if not isinstance(text, str) or not text or len(text) > MAX_TEXT:
        return f"text phải là chuỗi 1–{MAX_TEXT} ký tự"
    return None


def plan_problems(plan: dict) -> list[str]:
    """Mọi lỗi check trong plan, kèm số bước; rỗng nếu không có check sai."""
    out = []
    for index, task in enumerate(plan.get("subtasks") or [], 1):
        items = task.get("checks") if isinstance(task, dict) else None
        if items in (None, []):
            continue
        if not isinstance(items, list) or len(items) > MAX_CHECKS:
            out.append(f"bước {index}: checks phải là danh sách tối đa {MAX_CHECKS} phần tử")
            continue
        out += [f"bước {index}: {reason}" for item in items if (reason := problem(item))]
    return out


def collect(plan: dict | None) -> list[dict]:
    """Mọi check của plan theo thứ tự bước; gọi sau plan_problems."""
    return [item for task in (plan or {}).get("subtasks") or [] if isinstance(task, dict)
            for item in task.get("checks") or []]


def passed(check: dict, status: int, body: bytes) -> bool:
    """Đạt khi trang 2xx và chữ có mặt (text_present) hoặc vắng mặt (text_absent)."""
    if not 200 <= status < 300:
        return False
    present = check["text"] in body.decode("utf-8", "replace")
    return present if check["primitive"] == "text_present" else not present


def classify(rows: list[dict]) -> str:
    """rows: {'base': bool|None, 'candidate': bool}. Đỏ cả hai = lỗi code; đỏ→xanh = bằng chứng; còn lại = không phân biệt."""
    if any(row["base"] is False and not row["candidate"] for row in rows):
        return CODE_FAULT
    if any(row["base"] is False and row["candidate"] for row in rows):
        return PROOF
    return NONE
