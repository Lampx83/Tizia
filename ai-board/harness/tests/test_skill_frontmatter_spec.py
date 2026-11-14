"""Skill frontmatter follows the Agent Skills spec: spec keys top-level, harness knobs in metadata (quoted strings)."""
from __future__ import annotations

from pathlib import Path

import pytest

from services import skill_frontmatter

SKILLS_DIR = Path(__file__).resolve().parent.parent / "skills"
FILES = sorted(SKILLS_DIR.glob("*/SKILL.md")) + sorted(SKILLS_DIR.glob("proposed/*/SKILL.md"))
GOOD = 'name: a-b\ndescription: "Do X. Use when Y now."\nmetadata:\n  version: "1"\n'
GOOD_TEXT = f"---\n{GOOD}---\nbody\n"
CASES = {
    "ok": (GOOD_TEXT, "a-b", []),
    "uppercase_name": (GOOD_TEXT.replace("a-b", "A-b"), "A-b", ["name"]),
    "name_not_folder": (GOOD_TEXT, "other", ["folder"]),
    "name_too_long": (GOOD_TEXT.replace("a-b", "a" * 65), "a" * 65, ["name"]),
    "no_use_when": (GOOD_TEXT.replace("Use when", "Apply to"), "a-b", ["Use when"]),
    "description_too_long": (GOOD_TEXT.replace("Do X.", "X" * 1020 + "."), "a-b", ["description"]),
    "knob_at_top_level": (GOOD_TEXT.replace('metadata:\n  version: "1"\n', 'version: "1"\n'), "a-b", ["non-spec"]),
    "unquoted_metadata": (GOOD_TEXT.replace('"1"', "1"), "a-b", ["quoted"]),
    "missing_description": (GOOD_TEXT.replace('description: "Do X. Use when Y now."\n', ""), "a-b", ["description"]),
    "crlf": (GOOD_TEXT.replace("\n", "\r\n"), "a-b", ["LF"]),
    "duplicate_key": (GOOD_TEXT.replace("name: a-b\n", "name: a-b\nname: a-b\n"), "a-b", ["duplicate"]),
}


def test_every_skill_folder_is_covered():
    assert len(FILES) >= 20


@pytest.mark.parametrize("path", FILES, ids=lambda p: p.parent.name)
def test_frontmatter_matches_spec(path):
    assert skill_frontmatter.spec_errors(path.read_text(encoding="utf-8"), path.parent.name) == []


@pytest.mark.parametrize("case", list(CASES))
def test_spec_errors_table(case):
    text, folder, expect = CASES[case]
    errors = skill_frontmatter.spec_errors(text, folder)
    if not expect:
        assert errors == [], errors
    else:
        assert errors and all(any(word in e for e in errors) for word in expect), errors


def test_relock_refuses_spec_invalid_skill_before_writing_lock(tmp_path, monkeypatch):
    from services import candidate

    skills = tmp_path / "ai-board/harness/skills"
    (skills / "bad").mkdir(parents=True)
    (skills / "bad/SKILL.md").write_text("---\nname: bad\ndescription: x\ntask_type: test\n---\nbody\n", encoding="utf-8")
    lock = skills / "skills.lock.json"
    lock.write_text("{}", encoding="utf-8")

    def no_git(*args, **kwargs):
        raise AssertionError("git must not run before the spec check passes")
    monkeypatch.setattr(candidate, "_git_out", no_git)
    with pytest.raises(ValueError, match="bad"):
        candidate.relock({"full_checkout": str(tmp_path), "commits": [{"files": []}]})
    assert lock.read_text(encoding="utf-8") == "{}"


def test_flat_and_metadata_forms_read_the_same():
    assert skill_frontmatter.flat("name: a\nbudget: 5") == skill_frontmatter.flat('name: a\nmetadata:\n  budget: "5"')


def test_duplicate_or_stray_indent_rejected():
    for bad in ("name: a\nname: b", "name: a\n  budget: 5", "name: a\nmetadata:\n  x: 1\n  x: 2"):
        with pytest.raises(ValueError):
            skill_frontmatter.flat(bad)
