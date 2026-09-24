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

# `from '...'` (static import) LẪN `import('...')` (dynamic import, ES2020) —
# thiếu nhánh dynamic là lỗ hổng thật: `await import('../../db.js')` lách qua
# lint mà cú pháp vẫn hợp lệ 100% (node --check không bắt được vì đây không
# phải lỗi cú pháp). `require('...')` (CommonJS) vẫn giữ.
_IMPORT_PATH = re.compile(r"""(?:from\s+|import\(\s*|require\(\s*)['"]([^'"]+)['"]""")
_CORE_ACCESS = re.compile(r"\bctx\.core\b")
# 1 context KHÁC _ai-generated, dạng path đã resolve (vd 'server/contexts/admin/index.js').
_OTHER_CONTEXT = re.compile(r"(^|/)contexts/(?!_ai-generated/)[^/]+/")


def _posix(path: str) -> str:
    """Model JSON trả path dạng chuỗi tự do — chuẩn hoá backslash (Windows-
    style, nếu model lỡ trả) về forward-slash TRƯỚC khi so/parse, vì mọi regex
    ở file này (_OTHER_CONTEXT, đuôi 'db.js') giả định posix-style. Không
    chuẩn hoá thì 1 path kiểu 'server\\contexts\\admin\\index.js' lách qua
    lint êm re."""
    return path.replace('\\', '/')


def _added_lines_for_file(diff_text: str, file_path: str) -> int:
    """`git diff --cached` của implement.py gộp CẢ file implementation lẫn
    file test vào 1 diff (cùng 1 lần `git add -A` + `git diff --cached`, xem
    _write_and_diff). Đếm dòng '+' CHỈ trong đúng section `diff --git a/<file>
    b/<file>` của file_path — không tính lẫn dòng '+' của file test, vì
    SIZE_ESTIMATE_LINES chỉ ước lượng cho 1 file implementation, không phải
    cả cặp impl+test gộp lại (đếm gộp thổi phồng tỉ lệ flag sai cho mọi
    subtask có test tử tế)."""
    target = _posix(file_path)
    lines = diff_text.splitlines()
    if not any(line.startswith('diff --git ') for line in lines):
        # Không có header đa-file (diff 1 file thô, hoặc fixture test) — cả
        # diff coi như của đúng file_path, không có gì để tách.
        return sum(1 for line in lines if line.startswith('+') and not line.startswith('+++'))
    in_target = False
    count = 0
    for line in lines:
        if line.startswith('diff --git '):
            in_target = line.rstrip().endswith(f'b/{target}')
            continue
        if in_target and line.startswith('+') and not line.startswith('+++'):
            count += 1
    return count


def lint_imports(code: str, file_path: str) -> list[str]:
    """Trả list vi phạm (rỗng = sạch). Import tương đối ('./...'/'../...') được
    RESOLVE theo `file_path` trước khi so — chuỗi thô như '../../db.js' không
    tự chứa 'contexts/'/'db.js' theo nghĩa path thật nếu không resolve. Package
    import (express, ws…) không bắt đầu bằng '.' — bỏ qua, không phải path nội
    bộ cần chặn."""
    base = posixpath.dirname(_posix(file_path))
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

    planned_files = {_posix(st["file"]) for st in plan["subtasks"]}
    size_by_file = {_posix(st["file"]): st["size"] for st in plan["subtasks"]}
    scratch_repo = state.get("scratch_repo")
    # Scratch repo không có base nên file sẵn có hiện như viết lại toàn bộ; diff thật base..HEAD thì không.
    full_diff = "".join(item.get("diff", "") for item in state.get("full_diff") or [])

    issues: list[str] = []
    needs_careful_review = False
    for d in diffs:
        file_path = _posix(d["file"])
        in_plan = file_path in planned_files
        if not in_plan:
            # File NGOÀI plan là chính xác trường hợp đáng ngờ nhất — flag để
            # người soát để ý, nhưng KHÔNG bỏ qua lint/node-check bên dưới:
            # đây là điểm cũ từng có `continue` ở đây, vô tình miễn luôn kiểm
            # tra import cấm/cú pháp cho đúng file dễ bị lợi dụng nhất.
            issues.append(f"file '{d['file']}' không có trong plan")
            needs_careful_review = True
        else:
            limit = SIZE_ESTIMATE_LINES[size_by_file[file_path]] * OVERSIZE_MULTIPLIER
            added = _added_lines_for_file(full_diff or d["diff"], file_path)
            if added > limit:
                issues.append(f"'{d['file']}': +{added} dòng, vượt {OVERSIZE_MULTIPLIER}x ước lượng ({limit})")
                needs_careful_review = True

        if not scratch_repo:
            continue
        for candidate in (file_path, _posix(d.get("test_file", ""))):
            if not candidate:
                continue
            path = Path(scratch_repo) / candidate
            if path.suffix != ".js" or not path.exists():
                continue
            code = path.read_text(encoding="utf-8")
            bad_imports = lint_imports(code, candidate)
            if bad_imports:
                reason = f"'{candidate}': {'; '.join(bad_imports)}"
                return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                        "issues": [*issues, reason], "failure_class": "critical"}
            err = node_check(path)
            if err:
                reason = f"'{candidate}' node --check: {err}"
                return {"gate": 4, "blocked": True, "reason": reason, "needs_careful_review": True,
                        "issues": [*issues, reason], "failure_class": "ordinary"}

    return {"gate": 4, "blocked": False, "reason": None, "needs_careful_review": needs_careful_review, "issues": issues}
