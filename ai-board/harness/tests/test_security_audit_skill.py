"""Security-audit rubric cho duyệt elevation: file, frontmatter, khoá hash và nội dung tối thiểu.

Skill này là rubric của endpoint elevation-context (server/ai-board/services/elevation-risk.js), không thuộc
catalog chọn theo task_type — nhưng vẫn phải qua lint của harness, khoá trong skills.lock.json và không
được chứa câu tự cấp quyền.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import pytest

from services import context, default_skills

NAME = 'default-security-audit'
SKILL = Path(context.SKILLS_DIR) / NAME / 'SKILL.md'
LOCK = Path(context.SKILLS_DIR) / 'skills.lock.json'
TOPICS = ('tin cậy', 'chèn lệnh', 'đường dẫn', 'bí mật', 'leo thang', 'chuỗi cung ứng', 'migration')


def test_skill_is_locked_and_lf_only():
    assert SKILL.is_file()
    raw = SKILL.read_bytes()
    assert b'\r' not in raw
    lock = json.loads(LOCK.read_text(encoding='utf-8'))
    assert lock[NAME] == hashlib.sha256(raw).hexdigest()


def test_frontmatter_parses_with_the_harness_parser():
    skill = default_skills.parse(SKILL.read_bytes().decode('utf-8'))
    assert skill.name == NAME
    assert skill.source == 'default'
    assert skill.task_type == ('review',)
    assert skill.version >= 1
    assert skill.body


def test_it_stays_out_of_the_task_type_catalog():
    assert NAME not in {skill.name for skill in default_skills.catalog()}


@pytest.mark.parametrize('topic', TOPICS)
def test_rubric_keeps_the_security_axes(topic):
    assert topic in SKILL.read_text(encoding='utf-8').lower()


def test_rubric_stays_within_the_seven_rule_bound():
    body = default_skills.parse(SKILL.read_bytes().decode('utf-8')).body
    rules = [line for line in body.splitlines() if line[:1].isdigit() and line[1:3] == '. ']
    assert 1 <= len(rules) <= 7
