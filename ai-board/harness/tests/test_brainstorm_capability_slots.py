"""Capability example slots in brainstorm.md: flag off renders the original text, tool_defs_v2 the enum reference."""
import hashlib

import pytest

from gates import brainstorm
from settings import reset_settings

OFF_SHA = "2784330185f138084e5266abb0d9369ac134721e2b27e768097f078859f0e6b5"
V2_SHA = "ef79e05eee8e75ab64321d3210427715ecca50d0f04ad52593bb2aeffbcebbb5"


def _prompt(monkeypatch, v2):
    monkeypatch.setenv("AI_BOARD_TOOL_DEFS_V2", "1" if v2 else "0")
    reset_settings()
    return brainstorm.build_prompt({"id": "r", "subject": "s"}, frozenset({"public.ui", "features"}), "CTX")


@pytest.fixture(autouse=True)
def _reset():
    yield
    reset_settings()


def test_flag_off_prompt_is_byte_identical(monkeypatch):
    text = _prompt(monkeypatch, False)
    assert hashlib.sha256(text.encode()).hexdigest() == OFF_SHA
    assert '"capabilities": ["content.write"]' in text and "CAPABILITY NAMES" not in text


def test_v2_prompt_points_at_enum(monkeypatch):
    text = _prompt(monkeypatch, True)
    assert hashlib.sha256(text.encode()).hexdigest() == V2_SHA
    assert '["content.write"]' not in text and "core capability from CAPABILITY NAMES." in text
