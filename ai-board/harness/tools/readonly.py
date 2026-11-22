"""Tool chỉ-đọc dùng chung (tree, outline, grep, read_file) ở 1 sha cố định. Không phụ thuộc Workspace của Gate 3.
Mọi path đi qua path_policy.check(path, "read"); bị từ chối → chuỗi refusal, không raise."""
from __future__ import annotations

import json
import posixpath
import re

import path_policy
import tools
from runtime import tool_manifest
from services import token_count
from settings import get_settings

SPECS = {
    "tree": ({"path": {"type": "string"}}, ()),
    "outline": ({"file": {"type": "string"}}, ("file",)),
    "grep": ({"words": {"type": "array", "items": {"type": "string"}}, "file": {"type": "string"},
              "path": {"type": "string"}}, ("words",)),
    "read_file": ({"file": {"type": "string"}}, ("file",)),
}


class ReadOnlyTools:
    def __init__(self, source, sha: str, *, observation_tokens: int = 500):
        self.source, self.sha, self.cap = source, sha, observation_tokens

    def run(self, name: str, args: dict) -> str:
        """Chạy 1 tool đọc (tên mới/cũ khi tool_defs_v2). Raise ValueError nếu tên/tham số sai; path bị chặn → refusal."""
        if v2():
            from runtime import tool_loop
            name = tool_manifest.ALIASES.get(name, name)
            if name not in SPECS:
                raise ValueError(f"tool lạ: {name!r}; có: {', '.join(map(tool_loop.shown, SPECS))}")
            tool_loop.validate(name, args, "plan")
        else:
            _check(name, args)
        for key in ("file", "path"):
            if key in args:
                verdict = path_policy.check(args[key], "read")
                if not verdict["allow"]:
                    return f"từ chối đọc {args[key]!r}: {verdict['reason']}"
        return token_count.fit(self._dispatch(name, args), self.cap)

    def _dispatch(self, name: str, args: dict) -> str:
        if name == "tree":
            base = args.get("path", "public")
            head, sep, rest = (tools.tree(self.source, self.sha, path=base)).partition(": ")
            names = [n for n in rest.split(", ") if n and path_policy.check(posixpath.join(base, n), "read")["allow"]]
            return f"{head}{sep}{', '.join(names)}" if names else "(rỗng)"
        if name == "outline":
            return tools.outline(self.source, self.sha, file=args["file"]) or "(rỗng)"
        if name == "grep":
            out = tools.grep(self.source, self.sha, words=args["words"], file=args.get("file"),
                             path=args.get("path", "public"), budget=self.cap * token_count.CHARS_PER_TOKEN)
            if out.startswith("file khớp từ khoá: "):
                hits = [h for h in out.split(": ", 1)[1].split(", ") if path_policy.check(re.sub(r" \(\d+\)$", "", h), "read")["allow"]]
                out = "file khớp từ khoá: " + ", ".join(hits) if hits else ""
            return out or "(không khớp)"
        return self._read(args["file"], args.get("start_line", 1), args.get("end_line"))

    def _read(self, file: str, start: int = 1, end: int | None = None) -> str:
        text = tools._show(self.source, self.sha, file)
        if text is None:
            return f"{file}: (không tồn tại ở base)"
        lines = text.splitlines()
        return "\n".join(f"L{n}| {lines[n - 1]}" for n in range(max(start, 1), min(end or len(lines), len(lines)) + 1))


def _check(name: str, args: dict) -> None:
    if name not in SPECS:
        raise ValueError(f"tool lạ: {name!r}; có: {', '.join(SPECS)}")
    props, required = SPECS[name]
    if missing := [k for k in required if k not in args]:
        raise ValueError(f"{name}: thiếu {', '.join(missing)}")
    for key, value in args.items():
        if key not in props:
            raise ValueError(f"{name}: tham số lạ {key!r}")
        kind = props[key]["type"]
        if kind == "string" and not isinstance(value, str) or kind == "array" and not (
                isinstance(value, list) and all(isinstance(v, str) for v in value)):
            raise ValueError(f"{name}.{key} sai kiểu")


def v2() -> bool:
    return get_settings().tool_defs_v2


def schema_text() -> str:
    """Dòng mô tả tool cho prompt; tool_defs_v2: cùng định nghĩa với vòng implement."""
    if v2():
        from runtime import tool_loop
        return tool_loop.tool_list("plan")
    return "\n".join(f"- {name} {json.dumps(props, ensure_ascii=False)}" for name, (props, _) in SPECS.items())
