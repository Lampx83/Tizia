"""Khoá byte-để-byte cho prompt — bảo vệ "kỷ luật cache" rule 1 (spec.md):
prefix cố định mọi lần gọi, không lệch dù 1 khoảng trắng. Sửa prompt thật sự
(cố ý) thì tính lại hash và ghi vào prompts.lock.json trong cùng commit —
test đỏ là tín hiệu "prefix vừa đổi, đã cố ý chưa?", không phải lỗi cần né
bằng cách xoá dòng assert.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"
LOCK_FILE = PROMPTS_DIR / "prompts.lock.json"


def test_prompt_files_match_lock():
    locked = json.loads(LOCK_FILE.read_text(encoding="utf-8"))
    for name, expected_hash in locked.items():
        actual = hashlib.sha256((PROMPTS_DIR / name).read_bytes()).hexdigest()
        assert actual == expected_hash, (
            f"{name} đã đổi nội dung nhưng prompts.lock.json chưa cập nhật — "
            f"nếu đổi có chủ đích, tính lại sha256 và ghi hash mới vào lock file."
        )


def test_lock_covers_every_prompt_file():
    locked_names = set(json.loads(LOCK_FILE.read_text(encoding="utf-8")))
    real_names = {p.name for p in PROMPTS_DIR.glob("*.md")}
    assert real_names == locked_names, (
        f"prompts.lock.json lệch so với file .md thật trong thư mục — "
        f"thiếu {real_names - locked_names!r}, thừa {locked_names - real_names!r}"
    )
