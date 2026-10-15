"""Manifest tool của tool-loop: dữ liệu khai báo, băm canonical để ghim vào bằng chứng."""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

PATH = Path(__file__).resolve().parent / "tool_manifest.json"
EFFECTS = ("read", "draft_write", "control")
FIELDS = ("name", "description", "parameters", "effect", "max_arg_bytes", "max_output_chars", "max_seconds")


class ManifestError(ValueError):
    """Manifest sai hình dạng hoặc khai báo tool không có hiện thực."""


@dataclass(frozen=True)
class ToolSpec:
    name: str
    description: str
    parameters: dict
    effect: str
    max_arg_bytes: int
    max_output_chars: int
    max_seconds: float


@dataclass(frozen=True)
class Manifest:
    version: int
    tools: dict[str, ToolSpec]
    hash: str

    def names(self, effect: str) -> tuple[str, ...]:
        return tuple(name for name, spec in self.tools.items() if spec.effect == effect)


def canonical_hash(data: dict) -> str:
    return hashlib.sha256(json.dumps(data, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode("utf-8")).hexdigest()


def parse(data: dict, *, known: set[str]) -> Manifest:
    """Kiểm manifest: đủ trường, effect hợp lệ, trần dương, mọi tool có hiện thực trong `known`."""
    if not isinstance(data, dict) or not isinstance(data.get("version"), int) or not isinstance(data.get("tools"), list) or not data["tools"]:
        raise ManifestError("manifest cần version nguyên và danh sách tools")
    tools: dict[str, ToolSpec] = {}
    for raw in data["tools"]:
        if not isinstance(raw, dict) or set(raw) != set(FIELDS):
            raise ManifestError(f"tool phải có đúng các trường {FIELDS}")
        if raw["name"] in tools:
            raise ManifestError(f"tool trùng tên: {raw['name']}")
        if raw["name"] not in known:
            raise ManifestError(f"tool không có hiện thực: {raw['name']}")
        if raw["effect"] not in EFFECTS:
            raise ManifestError(f"{raw['name']}: effect lạ {raw['effect']!r}")
        if not isinstance(raw["parameters"], dict) or raw["parameters"].get("type") != "object":
            raise ManifestError(f"{raw['name']}: parameters phải là JSON Schema object")
        caps = {key: raw[key] for key in ("max_arg_bytes", "max_output_chars", "max_seconds")}
        if any(isinstance(v, bool) or not isinstance(v, (int, float)) or v <= 0 for v in caps.values()):
            raise ManifestError(f"{raw['name']}: trần phải là số dương")
        tools[raw["name"]] = ToolSpec(**raw)
    return Manifest(data["version"], tools, canonical_hash(data))


def load(path: Path = PATH, *, known: set[str]) -> Manifest:
    return parse(json.loads(path.read_text(encoding="utf-8")), known=known)
