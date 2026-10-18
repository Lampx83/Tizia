"""Manifest tool của tool-loop: dữ liệu khai báo, băm canonical để ghim vào bằng chứng."""
from __future__ import annotations

import fnmatch
import hashlib
import json
import posixpath
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
class CommandPolicy:
    allow: tuple[tuple[str, ...], ...]
    deny_args: frozenset[str]
    deny_sql: tuple[str, ...]
    deny_write: tuple[str, ...]

    def command_reason(self, argv: list[str]) -> str | None:
        """Lý do chặn argv; None nếu được phép. Ngoài allowlist là chặn (deny by default)."""
        if not any(tuple(argv[:len(prefix)]) == prefix for prefix in self.allow):
            return f"lệnh ngoài allowlist: {argv[:2]!r}"
        for arg in argv:
            if arg.lower() in self.deny_args:
                return f"tham số bị cấm: {arg!r}"
            if any(word in arg.upper() for word in self.deny_sql):
                return f"câu lệnh SQL bị cấm trong tham số: {arg[:40]!r}"
        return None

    def write_reason(self, path: str) -> str | None:
        """Lý do cấm ghi vào path (lock, tệp sinh tự động); None nếu được phép."""
        for pattern in self.deny_write:
            if fnmatch.fnmatchcase(path, pattern) or fnmatch.fnmatchcase(posixpath.basename(path), pattern):
                return f"không được ghi {path!r} (khớp {pattern!r})"
        return None


@dataclass(frozen=True)
class Manifest:
    version: int
    tools: dict[str, ToolSpec]
    policy: CommandPolicy
    hash: str
    data: dict

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
    return Manifest(data["version"], tools, _policy(data.get("command_policy")), canonical_hash(data), data)


def _policy(raw) -> CommandPolicy:
    if not isinstance(raw, dict) or set(raw) != {"allow", "deny_args", "deny_sql", "deny_write"}:
        raise ManifestError("command_policy cần đúng allow, deny_args, deny_sql, deny_write")
    strings = lambda v: isinstance(v, list) and all(isinstance(s, str) and s for s in v)  # noqa: E731
    if not isinstance(raw["allow"], list) or not raw["allow"] or not all(strings(p) and p for p in raw["allow"]):
        raise ManifestError("command_policy.allow phải là danh sách tiền tố argv không rỗng")
    if not all(strings(raw[k]) for k in ("deny_args", "deny_sql", "deny_write")):
        raise ManifestError("command_policy.deny_* phải là danh sách chuỗi")
    return CommandPolicy(tuple(tuple(p) for p in raw["allow"]), frozenset(s.lower() for s in raw["deny_args"]),
                         tuple(s.upper() for s in raw["deny_sql"]), tuple(raw["deny_write"]))


def load(path: Path = PATH, *, known: set[str]) -> Manifest:
    return parse(json.loads(path.read_text(encoding="utf-8")), known=known)
