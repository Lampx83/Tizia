"""Check do plan khai: primitive đóng, soát tham số, phân loại đỏ→xanh giữa base và candidate."""
from __future__ import annotations

import json
import re

MAX_CHECKS = 8
MAX_TEXT = 200
MAX_PATH = 300
CODE_FAULT, PROOF, NONE = "broken", "proving", "none"
_PROP = re.compile(r"[a-z-]{1,40}")


def _path(value) -> bool:
    return (isinstance(value, str) and value.startswith("/") and not value.startswith("//") and len(value) <= MAX_PATH
            and not any(bad in value for bad in ("\\", "..", "://")) and all(ord(c) >= 32 for c in value))


def _text(value) -> bool:
    return isinstance(value, str) and 0 < len(value) <= MAX_TEXT


def _status(value) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and 100 <= value <= 599


def _file(value) -> bool:
    return (isinstance(value, str) and 0 < len(value) <= MAX_PATH and not value.startswith("/") and ".." not in value
            and "\\" not in value and value.endswith((".js", ".mjs")) and all(ord(c) >= 32 for c in value))


def _prop(value) -> bool:
    return isinstance(value, str) and _PROP.fullmatch(value) is not None


PRIMITIVES = {
    "text_present": {"path": _path, "text": _text},
    "text_absent": {"path": _path, "text": _text},
    "http_status": {"path": _path, "status": _status},
    "selector_exists": {"path": _path, "selector": _text},
    "computed_style": {"path": _path, "selector": _text, "prop": _prop, "value": _text},
    "api_json": {"path": _path, "key": _text, "value": _text},
    "node_test": {"file": _file},
}


def problem(check) -> str | None:
    """Lỗi của một check (primitive lạ, thiếu/thừa tham số, tham số sai luật); None nếu hợp lệ."""
    if not isinstance(check, dict):
        return "check phải là object"
    spec = PRIMITIVES.get(check.get("primitive"))
    if spec is None:
        return f"primitive lạ: {str(check.get('primitive'))[:40]!r}"
    if set(check) != {"primitive", *spec}:
        return f"{check['primitive']}: tham số phải đúng {sorted(spec)}"
    for key, valid in spec.items():
        if not valid(check[key]):
            return f"{check['primitive']}: {key} không hợp lệ: {str(check[key])[:40]!r}"
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


def target(check: dict) -> str:
    """Đường dẫn URL (có path) hoặc file test (node_test)."""
    return check.get("path") or check["file"]


def needs_dom(check: dict) -> bool:
    return check["primitive"] in ("selector_exists", "computed_style")


def passed(check: dict, status: int, body: bytes, dom=None) -> bool:
    """dom: (exists, value) cho selector/computed_style; bool exit-ok cho node_test. Trang không 2xx thì không đạt (trừ http_status)."""
    kind = check["primitive"]
    if kind == "node_test":
        return dom is True
    if kind == "http_status":
        return status == check["status"]
    if not 200 <= status < 300:
        return False
    if kind == "text_present":
        return check["text"] in body.decode("utf-8", "replace")
    if kind == "text_absent":
        return check["text"] not in body.decode("utf-8", "replace")
    if kind == "api_json":
        try:
            data = json.loads(body)
        except ValueError:
            return False
        return isinstance(data, dict) and str(data.get(check["key"])) == check["value"]
    if kind == "selector_exists":
        return bool(dom and dom[0])
    return bool(dom and dom[0] and dom[1] == check["value"])  # computed_style


def classify(rows: list[dict]) -> str:
    """rows: {'base': bool|None, 'candidate': bool}. Đỏ cả hai = lỗi code; đỏ→xanh = bằng chứng; còn lại = không phân biệt."""
    if any(row["base"] is False and not row["candidate"] for row in rows):
        return CODE_FAULT
    if any(row["base"] is False and row["candidate"] for row in rows):
        return PROOF
    return NONE
