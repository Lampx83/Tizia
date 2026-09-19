"""Cổng 4 — static-check + minimalism guard (ticket 12). Nửa CƠ HỌC của
ponytail/caveman minimalism (nửa kia là prompt cố định của cổng 3, ticket 11):
`node --check` trên JS sinh ra, lint import (code AI sinh chỉ được chạm
`ctx.surface.*`, không bao giờ import `db.js` hay context khác trực tiếp), và
so kích thước diff với ước lượng size khai trong plan (`small`/`large`, xem
gates/brainstorm.py). Import cấm / lỗi cú pháp → BLOCK thật (không có gì chạy
được thì không có gì để review). Vượt ~2x ước lượng hoặc chạm file ngoài plan
→ KHÔNG block, chỉ gắn cờ `needs_careful_review=True` (cổng 5.5/ticket 13 đọc
cờ này khi có) — "flagged, not silently passed", không phải "rejected".
"""
from __future__ import annotations

import posixpath
import re
import subprocess
from pathlib import Path

# ponytail: hằng số ước lượng dòng/size, không đo thật từ template — đủ cho
# ngưỡng "vượt xa" (2x). Cần chính xác hơn thì hiệu chuẩn qua ticket 16 (gold set).
SIZE_ESTIMATE_LINES = {"small": 30, "large": 80}
OVERSIZE_MULTIPLIER = 2

_IMPORT_PATH = re.compile(r"""(?:import\s[^;]*?from\s+|require\()\s*['"]([^'"]+)['"]""")
_CORE_ACCESS = re.compile(r"\bctx\.core\b")
# 1 context KHÁC _ai-generated, dạng path đã resolve (vd 'server/contexts/admin/index.js').
_OTHER_CONTEXT = re.compile(r"(^|/)contexts/(?!_ai-generated/)[^/]+/")


def _added_lines(diff_text: str) -> int:
    return sum(1 for line in diff_text.splitlines() if line.startswith('+') and not line.startswith('+++'))


def lint_imports(code: str, file_path: str) -> list[str]:
    """Trả list vi phạm (rỗng = sạch). Import tương đối ('./...'/'../...') được
    RESOLVE theo `file_path` trước khi so — chuỗi thô như '../../db.js' không
    tự chứa 'contexts/'/'db.js' theo nghĩa path thật nếu không resolve. Package
    import (express, ws…) không bắt đầu bằng '.' — bỏ qua, không phải path nội
    bộ cần chặn."""
    base = posixpath.dirname(file_path)
    violations = []
    for m in _IMPORT_PATH.finditer(code):
        spec = m.group(1)
        if not spec.startswith('.'):
            continue
        resolved = posixpath.normpath(posixpath.join(base, spec))
        if resolved.endswith('db.js') or _OTHER_CONTEXT.search(resolved):
            violations.append(f"import cấm: '{spec}' (chạm {resolved})")
    if _CORE_ACCESS.search(code):
        violations.append("truy cập ctx.core — plugin AI sinh chỉ nhận ctx.surface")
    return violations


def node_check(path: Path) -> str | None:
    """`node --check` 1 file .js dạng ES module (repo Tizia `"type": "module"`).
    Đọc qua stdin + `--input-type=module` thay vì truyền thẳng path — scratch
    repo (implement.py) không có package.json khai `"type"`, nên `node --check
    <path>` rơi vào suy đoán CommonJS/ESM không đáng tin (tự kiểm chứng: 1 file
    ESM cú pháp hỏng vẫn exit 0 khi thiếu ngữ cảnh "type":"module" xác nhận
    module-ness). None nếu sạch, string lỗi nếu không."""
    result = subprocess.run(
        ["node", "--input-type=module", "--check"],
        input=path.read_text(encoding="utf-8"), capture_output=True, text=True,
    )
    return None if result.returncode == 0 else (result.stderr.strip() or "node --check thất bại")


def run(state: dict) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] (cổng 1) + state['diffs']/
    state['scratch_repo'] (cổng 3). Không gọi model — cổng thuần code."""
    plan = state.get("plan")
    diffs = state.get("diffs")
    if not plan or not diffs:
        return {"gate": 4, "blocked": True, "reason": "không có plan/diffs từ cổng 1/3", "needs_careful_review": True}

    planned_files = {st["file"] for st in plan["subtasks"]}
    size_by_file = {st["file"]: st["size"] for st in plan["subtasks"]}
    scratch_repo = state.get("scratch_repo")

    issues: list[str] = []
    needs_careful_review = False
    for d in diffs:
        if d["file"] not in planned_files:
            issues.append(f"file '{d['file']}' không có trong plan")
            needs_careful_review = True
            continue

        limit = SIZE_ESTIMATE_LINES[size_by_file[d["file"]]] * OVERSIZE_MULTIPLIER
        added = _added_lines(d["diff"])
        if added > limit:
            issues.append(f"'{d['file']}': +{added} dòng, vượt {OVERSIZE_MULTIPLIER}x ước lượng ({limit})")
            needs_careful_review = True

        if not scratch_repo:
            continue
        path = Path(scratch_repo) / d["file"]
        if path.suffix != ".js" or not path.exists():
            continue
        code = path.read_text(encoding="utf-8")
        bad_imports = lint_imports(code, d["file"])
        if bad_imports:
            reason = f"'{d['file']}': {'; '.join(bad_imports)}"
            return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True, "issues": [*issues, reason]}
        err = node_check(path)
        if err:
            reason = f"'{d['file']}' node --check: {err}"
            return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True, "issues": [*issues, reason]}

    return {"gate": 4, "blocked": False, "reason": None, "needs_careful_review": needs_careful_review, "issues": issues}
