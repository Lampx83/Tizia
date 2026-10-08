"""Khoá byte-để-byte cho skills/*/SKILL.md — cùng lý do prompts.lock.json (test_prompt_lock.py):
thân skill là 1 phần prefix gửi model. Sửa có chủ đích → tính lại sha256, ghi vào
skills/skills.lock.json trong cùng commit."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

SKILLS_DIR = Path(__file__).resolve().parent.parent / "skills"
LOCK_FILE = SKILLS_DIR / "skills.lock.json"


def test_skill_files_match_lock():
    locked = json.loads(LOCK_FILE.read_text(encoding="utf-8"))
    for name, expected in locked.items():
        actual = hashlib.sha256((SKILLS_DIR / name / "SKILL.md").read_bytes()).hexdigest()
        assert actual == expected, f"skills/{name}/SKILL.md đổi nhưng skills.lock.json chưa cập nhật"


def test_lock_covers_every_skill():
    real = {p.parent.name for p in SKILLS_DIR.glob("*/SKILL.md")}
    assert real == set(json.loads(LOCK_FILE.read_text(encoding="utf-8")))


def test_aiboard_manual_is_compact():
    manual = Path(__file__).resolve().parent.parent / "prompts" / "AIBOARD.md"
    assert len(manual.read_bytes()) <= 2048
