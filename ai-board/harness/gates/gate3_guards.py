"""Optional gate 3 checks, off unless AI_BOARD_GATE3_GUARDS lists them: noop, refs, schema."""
from __future__ import annotations

import difflib
import os
import posixpath
import re
import threading

FLAGS = ("noop", "refs", "schema")
local = threading.local()
_REF = re.compile(r"""(?:href|src|from|import\s*\()\s*=?\s*["']([^"'#?\s]+\.(?:html|js|mjs|css|json))["']""")
_EXTERNAL = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//)", re.I)


def enabled(flag: str) -> bool:
    return flag in {f.strip() for f in os.environ.get("AI_BOARD_GATE3_GUARDS", "").split(",")}


def note_fallback() -> None:
    local.schema_fallbacks = getattr(local, "schema_fallbacks", 0) + 1


def fallbacks(reset: bool = False) -> int:
    count = getattr(local, "schema_fallbacks", 0)
    if reset:
        local.schema_fallbacks = 0
    return count


def edit_schema(existing: bool) -> dict:
    text = {"type": "string"}
    props = {"test_file": text, "test": text}
    if not existing:
        return {"type": "object", "properties": {**props, "code": text}, "required": ["code", "test_file", "test"], "additionalProperties": False}
    edit = {"anyOf": [
        {"type": "object", "properties": {"search": text, "replace": text}, "required": ["search", "replace"], "additionalProperties": False},
        {"type": "object", "properties": {"after_line": {"type": "integer"}, "insert": text}, "required": ["after_line", "insert"], "additionalProperties": False},
    ]}
    return {"type": "object", "properties": {**props, "edits": {"type": "array", "minItems": 1, "items": edit}},
            "required": ["edits", "test_file", "test"], "additionalProperties": False}


def _added_refs(current: str, code: str) -> list[str]:
    before = set(current.splitlines())
    return [m.group(1) for line in code.splitlines() if line not in before for m in _REF.finditer(line)]


def missing_refs(file: str, current: str, code: str, known: set[str]) -> list[str]:
    """Targets the new lines point at that exist neither in the base tree nor in the plan."""
    out = []
    for target in _added_refs(current, code):
        if _EXTERNAL.match(target):
            continue
        base = "public" if target.startswith("/") else posixpath.dirname(file)
        path = posixpath.normpath(posixpath.join(base, target.lstrip("/")))
        if path not in known and f"public/{path}" not in known:
            out.append(target)
    return out


def check(out: dict, current: str | None, file: str, known: set[str]) -> None:
    """Raise ValueError (a repairable reason) when an enabled guard fails."""
    if current is None:
        return
    if enabled("noop") and out["code"] == current:
        raise ValueError("các edit không làm file thay đổi; hãy sửa đúng chỗ theo yêu cầu")
    if enabled("refs"):
        missing = missing_refs(file, current, out["code"], known)
        if missing:
            near = sorted({n for t in missing for n in difflib.get_close_matches(posixpath.basename(t), [posixpath.basename(k) for k in known], 3, 0.5)})
            raise ValueError(f"tham chiếu tới file không tồn tại: {', '.join(missing[:3])}"
                             + (f"; file thật gần nhất: {', '.join(near)}" if near else "") + "; chỉ dùng file có thật, hoặc bỏ tham chiếu")
