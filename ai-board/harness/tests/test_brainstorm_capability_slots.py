"""Capability example slots in brainstorm.md: flag off renders the original text, tool_defs_v2 the enum reference."""
import hashlib

import pytest

from gates import brainstorm
from settings import reset_settings

OFF_SHA = "2aceace92febf2c59dee18a8d8c25e16b13ef57617cdd39fd832546506078a01"
V2_SHA = "07e80aed93496ec08055a0cd0e3fc318f0046dd8ff9639c2445162326a853dc3"


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
