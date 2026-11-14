"""Skill frontmatter follows the Agent Skills spec: spec keys top-level, harness knobs in metadata (strings)."""
from __future__ import annotations

import re
from pathlib import Path

import pytest

from services import skill_frontmatter

SKILLS_DIR = Path(__file__).resolve().parent.parent / "skills"
FILES = sorted(SKILLS_DIR.glob("*/SKILL.md")) + sorted(SKILLS_DIR.glob("proposed/*/SKILL.md"))
SPEC_KEYS = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
USE_WHEN = re.compile(r"^.{3,}\. Use when .{3,}\.$", re.S)


def _front(path: Path) -> tuple[dict, dict]:
    text = path.read_text(encoding="utf-8")
    assert text.startswith("---\n")
    return skill_frontmatter.split(text.split("---\n", 2)[1])


def test_every_skill_folder_is_covered():
    assert len(FILES) >= 20


@pytest.mark.parametrize("path", FILES, ids=lambda p: p.parent.name)
def test_frontmatter_matches_spec(path):
    top, meta = _front(path)
    assert set(top) <= SPEC_KEYS, f"non-spec top-level keys: {set(top) - SPEC_KEYS}"
    assert {"name", "description"} <= set(top)
    assert re.fullmatch(r"[a-z0-9-]{1,64}", top["name"])
    assert top["name"] == path.parent.name
    assert 1 <= len(top["description"]) <= 1024
    assert USE_WHEN.match(top["description"]), top["description"]
    assert all(isinstance(k, str) and isinstance(v, str) for k, v in meta.items())


def test_flat_and_metadata_forms_read_the_same():
    assert skill_frontmatter.flat("name: a\nbudget: 5") == skill_frontmatter.flat('name: a\nmetadata:\n  budget: "5"')


def test_duplicate_or_stray_indent_rejected():
    for bad in ("name: a\nname: b", "name: a\n  budget: 5", "name: a\nmetadata:\n  x: 1\n  x: 2"):
        with pytest.raises(ValueError):
            skill_frontmatter.flat(bad)
