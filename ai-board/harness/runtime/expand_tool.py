"""expand tool: re-open one observation that compaction summarised. Off unless compaction and AI_BOARD_COMPACTION_EXPAND are on."""
from __future__ import annotations

import hashlib
import json
from dataclasses import asdict

from runtime import tool_manifest
from settings import get_settings

NAME = "expand"
SCHEMA = {"type": "object", "properties": {"step": {"type": "integer"}, "start_line": {"type": "integer"}, "end_line": {"type": "integer"}},
          "required": ["step"]}
DESCRIPTION = ("Re-open the full text of an earlier step's observation that UNTRUSTED_SUMMARY compacted, by its step number. "
               "Optional start_line/end_line (1-based, inclusive) pick a window; without them you get the head and how to continue.")
_SPEC = tool_manifest.ToolSpec(NAME, DESCRIPTION, SCHEMA, "read", 500, 16000, 5)


def offered(env=None) -> bool:
    settings = get_settings(env)
    return settings.compaction_expand and settings.context_compaction


def specs(env=None) -> dict[str, tool_manifest.ToolSpec]:
    """Extra spec for the loop; empty when not offered. Not in tool_manifest.json, so the manifest hash is unchanged."""
    return {NAME: _SPEC} if offered(env) else {}


def spec_hash() -> str:
    return hashlib.sha256(json.dumps(asdict(_SPEC), sort_keys=True, default=str).encode()).hexdigest()


def record(history, step: int, text: str) -> None:
    # attribute on History, not a field: compaction.py's pin stays unchanged
    history.__dict__.setdefault("archive", {})[step] = text
