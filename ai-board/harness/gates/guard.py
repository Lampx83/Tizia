"""Cổng 4 (AC2 ticket 05) — check bắt buộc trên diff thật base..HEAD của full checkout:
secret, PII, injection, nội dung, xoá/sửa test có sẵn, path được bảo vệ, cộng luật
theo path đổi (Python phải parse được; public/ → cờ UI để cổng 5 bắt buộc screenshot).
Thuần text + ast.parse — không chạy code candidate trên host.
"""
from __future__ import annotations

import ast
import re
from pathlib import Path

CHECKS = ("secret", "pii", "injection", "content", "test_removal", "protected_path", "python_syntax")

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
_INJECTION = [re.compile(p, re.I) for p in (
    r"<\s*script\b", r"javascript\s*:", r"\son[a-z]+\s*=", r"\beval\s*\(", r"new\s+Function\s*\(",
    r"child_process", r"document\.write\s*\(",
    r"ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions", r"system\s+prompt",
    r"bỏ\s+qua\s+(?:mọi|tất\s+cả|các)\s+(?:chỉ\s+dẫn|hướng\s+dẫn)",
)]
# ponytail: danh sách từ ngắn, đủ cho nội dung giáo dục D0; bộ lọc nội dung thật (ticket 14) thay sau.
_UNSAFE = re.compile(r"(?i)(?<!\w)(?:fuck|shit|bitch|đụ|địt|đĩ|lồn|cặc|đồ\s+ngu|óc\s+chó)(?!\w)")
_TEST_PATH = re.compile(r"(?:^|/)(?:tests?|__tests__)/|(?:\.|_)(?:test|spec)\.[^/]+$|(?:^|/)test_[^/]+\.py$")
_PROTECTED = re.compile(
    r"^(?:Dockerfile|docker-compose[^/]*\.ya?ml|package(?:-lock)?\.json|\.github/|ai-board/|server/ai-board/"
    r"|server/contexts/registry\.js|server/index\.js|server/db\.js|\.dockerignore|\.gitignore)"
)


def _sections(text: str):
    """(path, deleted_file, added lines, removed lines, existing) per `diff --git` section."""
    out = []
    for chunk in re.split(r"^(?=diff --git )", text, flags=re.M):
        if not chunk.startswith("diff --git "):
            continue
        path = chunk.splitlines()[0].split(" b/", 1)[-1].strip()
        lines = chunk.splitlines()
        added = [line[1:] for line in lines if line.startswith("+") and not line.startswith("+++")]
        removed = [line[1:] for line in lines if line.startswith("-") and not line.startswith("---")]
        new = "new file mode" in chunk or "\n--- /dev/null" in chunk
        out.append((path, "deleted file mode" in chunk, added, removed, not new))
    return out


def scan(diff_text: str, checkout: str | Path | None = None) -> dict:
    """Findings [{check, failure_class, detail}] + checks ran + ui_changed. Detail never echoes a secret."""
    findings = []

    def add(check, kind, detail):
        findings.append({"check": check, "failure_class": kind, "detail": detail[:300]})

    ui_changed = False
    for path, deleted, added, removed, existing in _sections(diff_text):
        is_test = bool(_TEST_PATH.search(path))
        ui_changed |= path.startswith("public/")
        if path == ".env" or (path.startswith(".env.") and not path.endswith(".example")):
            add("secret", "critical", f"{path}: không được chạm file env")
        if _PROTECTED.match(path):
            add("protected_path", "critical", f"{path}: path hạ tầng/registry cần con người")
        if is_test and existing and (removed or deleted):
            add("test_removal", "critical", f"{path}: xoá/sửa test có sẵn")
        for line in added:
            if any(p.search(line) for p in _SECRET):
                add("secret", "critical", f"{path}: dòng thêm trông như secret")
            if is_test:
                continue  # code test hợp lệ có eval/import; PII/nội dung chỉ xét file giao cho người dùng
            if any(p.search(line) for p in _PII):
                add("pii", "ordinary", f"{path}: dòng thêm có email/SĐT/CCCD")
            if path.startswith("public/") and any(p.search(line) for p in _INJECTION):
                add("injection", "critical", f"{path}: dòng thêm có script/handler/prompt injection")
            if _UNSAFE.search(line):
                add("content", "ordinary", f"{path}: ngôn từ không phù hợp")
        if path.endswith(".py") and not deleted and checkout:
            file = Path(checkout) / path
            try:
                ast.parse(file.read_text(encoding="utf-8"), filename=path)
            except (SyntaxError, OSError) as exc:
                add("python_syntax", "ordinary", f"{path}: {exc}")
    # 1 finding mỗi (check, path) là đủ cho người soát; bỏ trùng giữ thứ tự.
    unique = list({(f["check"], f["detail"]): f for f in findings}.values())
    return {"findings": unique, "checks": list(CHECKS), "ui_changed": ui_changed}
