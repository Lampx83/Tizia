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


def record(history, text: str) -> None:
    """Archive `text` under the newest observation's step and digest."""
    row = history.observations[-1]
    history.__dict__.setdefault("archive", {})[row["step"]] = (row["digest"], text)


def _limit(deps, model, role) -> float:
    """Same context limit History.prepare uses to decide when to compact."""
    from runtime import limits
    window = deps.models.context_window(model, role=role)
    routing = getattr(deps.models, "routing", None)
    hosted = bool(routing) and routing.candidates(role)[:1] and routing.candidates(role)[0]["provider"] == "api"
    return min(window * .75, limits.api_limits(role)["compaction"] if hosted else limits.loop()["compaction_tokens"])


def history_class():
    from runtime.compaction import History

    class ExpandHistory(History):
        def _old(self):
            """Never summarise the newest expand result before the model has read it."""
            old = super()._old()
            if self.observations and self.observations[-1]["tool"] == NAME:
                old = [row for row in old if row is not self.observations[-1]]
            return old

        def prepare(self, prefix, *, deps, model, role, **call):
            """Text mode: the kept newest expand result rides in the prompt right after a compaction."""
            out = super().prepare(prefix, deps=deps, model=model, role=role, **call)
            kept = self.observations[-1] if self.observations else None
            if self.native or not kept or kept["tool"] != NAME or kept["text"] in out:
                return out
            def block(text):
                return f"\nObservation {kept['step']} {kept['tool']} (untrusted data):\n{text}\n"
            base, limit = out, _limit(deps, model, role)
            out = base + block(kept["text"])
            if self._input_bound(out) + 3072 >= limit:
                rows = kept["text"].count("\n") + 1
                room = limit - 3072 - self._input_bound(base)
                lines = max(1, int(room * rows // max(1, len(kept["text"].encode()))))
                kept["text"] = f"expand: too large for remaining context, use start_line/end_line (≤{lines} lines)"
                out = base + block(kept["text"])
            return out

    return ExpandHistory
