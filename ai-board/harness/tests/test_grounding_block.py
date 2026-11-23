"""Executor refuses an ungrounded plan only when gate 2.5 would have blocked it."""
import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker_execution import grounding_block  # noqa: E402
from settings import get_settings  # noqa: E402


def test_ungrounded_plan_runs_only_under_advisory_objections(monkeypatch):
    for key in ("AI_BOARD_CRITICAL_ONLY_CHECKS", "AI_BOARD_PLAN_OBJECTIONS_ADVISORY"):
        monkeypatch.delenv(key, raising=False)
    get_settings.cache_clear() if hasattr(get_settings, "cache_clear") else None
    assert "predates" in grounding_block({"steps": [{}]}, "feature")
    assert grounding_block({"steps": [{}], "grounding": {"sha": "a" * 40}}, "feature") is None
    assert grounding_block({"steps": [{}]}, "self") is None
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    get_settings.cache_clear() if hasattr(get_settings, "cache_clear") else None
    assert grounding_block({"steps": [{}]}, "feature") is None
