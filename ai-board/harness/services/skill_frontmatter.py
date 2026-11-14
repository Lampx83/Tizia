"""SKILL.md frontmatter reader: spec keys top-level, harness knobs under `metadata:`."""
from __future__ import annotations

import json


def _scalar(value: str) -> str:
    value = value.strip()
    return json.loads(value) if len(value) >= 2 and value[0] == value[-1] == '"' else value


def split(front: str) -> tuple[dict, dict]:
    """Frontmatter text -> (top-level keys, metadata keys); ValueError on bad line or duplicate key."""
    top: dict = {}
    meta: dict = {}
    in_meta = False
    for line in front.splitlines():
        if not line.strip():
            continue
        indented = line[0] in " \t"
        key, sep, value = line.strip().partition(":")
        if not sep or (indented and not in_meta):
            raise ValueError(f"invalid frontmatter line: {line!r}")
        target = meta if indented else top
        if key in target:
            raise ValueError(f"duplicate frontmatter key: {key}")
        if not indented:
            in_meta = key == "metadata" and not value.strip()
            if in_meta:
                continue
        target[key] = _scalar(value)
    return top, meta


def flat(front: str) -> dict:
    """Top-level and metadata keys merged; flat files (no metadata block) read the same."""
    top, meta = split(front)
    dup = top.keys() & meta.keys()
    if dup:
        raise ValueError(f"duplicate frontmatter key: {sorted(dup)[0]}")
    return {**top, **meta}
