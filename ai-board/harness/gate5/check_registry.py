"""Registry primitive check: dữ liệu có version và hash, băm ghim vào evidence, admin duyệt như tool manifest."""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

PATH = Path(__file__).resolve().parent / "check_registry.json"


@dataclass(frozen=True)
class Registry:
    version: int
    primitives: dict[str, tuple[str, ...]]
    hash: str
    data: dict


def canonical_hash(data: dict) -> str:
    return hashlib.sha256(json.dumps(data, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode("utf-8")).hexdigest()


def parse(data) -> Registry:
    if not isinstance(data, dict) or not isinstance(data.get("version"), int) or not isinstance(data.get("primitives"), dict) or not data["primitives"]:
        raise ValueError("check_registry cần version nguyên và primitives")
    primitives = {}
    for name, params in data["primitives"].items():
        if not isinstance(params, list) or not all(isinstance(param, str) for param in params):
            raise ValueError(f"{name}: tham số phải là danh sách chuỗi")
        primitives[name] = tuple(params)
    return Registry(data["version"], primitives, canonical_hash(data), data)


def load(path: Path = PATH) -> Registry:
    return parse(json.loads(path.read_text(encoding="utf-8")))


REGISTRY = load()
