"""SKILL.md frontmatter reader: spec keys top-level, harness knobs under `metadata:`."""
from __future__ import annotations

import json
import re

SPEC_KEYS = frozenset({"name", "description", "license", "compatibility", "metadata", "allowed-tools"})
_NAME = re.compile(r"[a-z0-9-]{1,64}")
_USE_WHEN = re.compile(r"^.{3,}\. Use when .{3,}\.$", re.S)


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


def _unquoted_meta(front: str) -> list[str]:
    """Metadata keys whose raw value is not a double-quoted string."""
    bad, in_meta = [], False
    for line in front.splitlines():
        if not line.strip():
            continue
        if line[0] not in " \t":
            in_meta = line.strip() == "metadata:"
            continue
        key, _, value = line.strip().partition(":")
        value = value.strip()
        if in_meta and not (len(value) >= 2 and value[0] == value[-1] == '"'):
            bad.append(key)
    return bad


def spec_errors(text: str, folder: str) -> list[str]:
    """SKILL.md text + folder name -> spec violations; [] when valid."""
    if not text.startswith("---\n") or "\r" in text:
        return ["frontmatter must start with --- and use LF"]
    parts = text.split("---\n", 2)
    if len(parts) < 3:
        return ["frontmatter not closed"]
    try:
        flat(parts[1])
        top, _ = split(parts[1])
    except ValueError as e:
        return [str(e)]
    errors = []
    if extra := sorted(set(top) - SPEC_KEYS):
        errors.append(f"non-spec top-level keys: {extra}")
    if "name" not in top or "description" not in top:
        errors.append("missing name or description")
    name = top.get("name", "")
    if not _NAME.fullmatch(name):
        errors.append(f"name {name!r} must match ^[a-z0-9-]{{1,64}}$")
    elif name != folder:
        errors.append(f"name {name!r} must equal folder {folder!r}")
    desc = top.get("description", "")
    if not 1 <= len(desc) <= 1024:
        errors.append(f"description length {len(desc)} outside 1-1024")
    elif not _USE_WHEN.match(desc):
        errors.append("description must contain a 'Use when' sentence")
    errors += [f"metadata value must be a quoted string: {key}" for key in _unquoted_meta(parts[1])]
    return errors
