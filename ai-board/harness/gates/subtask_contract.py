"""Hợp đồng giữa các subtask: suy ra từ plan (không gọi model) + kiểm chéo ở cổng 4.

Cổng 3 chỉ đưa mỗi subtask đúng một file (gates/implement.py), nên hai bước dễ hứa hai
tên khác nhau cho cùng một interface. Phần lớn những tên đó plan đã nêu sẵn: route trong
`title`/`verify`, tên bảng của migration, identifier trong backtick. Module này đọc chúng
(`derive`), dựng khối nhỏ đưa vào prompt cổng 3 (`block`), rồi ở cổng 4 kiểm rằng file
được nhắc thật sự định nghĩa tên đó (`cross_check`).

Suy ra, không phát minh: không tên nào ở đây mà plan không nêu. Không chắc thì không chặn.
"""
from __future__ import annotations

import json
import posixpath
import re
from pathlib import Path, PurePosixPath, PureWindowsPath

MAX_BLOCK_CHARS = 600
MAX_EVIDENCE_CHARS = 1000
MAX_FINDINGS = 4
MAX_STEPS = 10
MAX_NAMES_PER_STEP = 6

_ROUTE = re.compile(r"/(?:api|admin)/[A-Za-z0-9_./:{}~-]+")
_BACKTICK = re.compile(r"`([^`\n]{2,60})`")
_TABLE_NAMED = re.compile(r"\b(?:bảng|table)\s+([a-z_][a-z0-9_]{1,40})", re.I)
_TABLE_FROM = re.compile(r"\bfrom\s+([a-z_][a-z0-9_]{1,40})\b", re.I)
_ROUTE_CALL = re.compile(r"\.\s*(?:get|post|put|delete|patch|use|all|route)\s*\(\s*['\"]([^'\"]+)['\"]")
_CREATE_TABLE = re.compile(r"\bcreate\s+table\s+(?:if\s+not\s+exists\s+)?[\"'`\[]?([a-z_][\w]*)", re.I)
_TABLE_REF = re.compile(r"\b(?:from|into|update|table)\s+([a-z_][a-z0-9_]*)", re.I)
_SQL = re.compile(r"\b(?:select|insert\s+into|update|delete\s+from|create\s+table|alter\s+table)\b", re.I)
_IMPORT = re.compile(r"""import\s+(?:([\w*\s{},]+?)\s+from\s+)?['"](\.[^'"]+)['"]""")
_NAMED = re.compile(r"\{([^}]*)\}")

HEADER = ("CONTRACT BETWEEN STEPS (derived from the plan, not a new request — use EXACTLY the names another step "
          "promised; do not name things differently):")


def _text(task: dict) -> str:
    return " ".join(str(task.get(key) or "") for key in ("title", "verify"))


def _layer(task: dict) -> str:
    """Layer plan khai, thiếu thì suy từ path — cùng thứ tự với gates/brainstorm.infer_layer."""
    if task.get("layer"):
        return str(task["layer"])
    file = str(task.get("file") or "")
    if file.endswith(".sql"):
        return "db"
    if file.startswith("public/"):
        return "frontend"
    return "backend" if file.startswith("server/") else "wiring"


def _routes(text: str) -> list[str]:
    """Route paths named in a plan line. Trailing punctuation of prose/curl does not belong to the path."""
    found = (hit.rstrip(".,;:'\")]}…") for hit in _ROUTE.findall(text))
    return sorted({path for path in found if len(path) > len("/api/")})


def _tables(task: dict) -> list[str]:
    """Table names a migration subtask promises: named in its text, else its file stem."""
    file = str(task.get("file") or "")
    if not file.endswith(".sql"):
        return []
    names = {name.lower() for name in _TABLE_NAMED.findall(_text(task))}
    names |= {name.lower() for name in _TABLE_FROM.findall(str(task.get("verify") or ""))}
    names |= {token.lower() for token in _backticks(task) if re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]{1,40}", token)}
    stem = re.sub(r"^\d+[-_]", "", file.rsplit("/", 1)[-1][:-4])
    if re.fullmatch(r"[a-z][a-z0-9_]*", stem):
        names.add(stem)
    return sorted(name for name in names if name not in ("table", "database", "select", "where"))


def _backticks(task: dict) -> list[str]:
    """Identifiers the plan put in backticks: the names a step promises to its neighbours."""
    found = []
    for token in _BACKTICK.findall(_text(task)):
        token = token.strip().strip("()[]")
        if token and "/" not in token and "." not in token and not token.startswith("-"):
            found.append(token)
    return list(dict.fromkeys(found))


def derive(plan: dict) -> list[dict]:
    """One record per subtask: file, layer, and the names the plan already gives it."""
    steps = []
    for index, task in enumerate((plan or {}).get("subtasks") or [], 1):
        if not isinstance(task, dict):
            continue
        steps.append({"n": index, "file": str(task.get("file") or ""), "layer": _layer(task),
                      "routes": _routes(_text(task)), "tables": _tables(task), "names": _backticks(task)})
    return steps


def _line(step: dict) -> str:
    parts = [f"route {route}" for route in step["routes"]]
    parts += [f"bảng {table}" for table in step["tables"]]
    parts += [f"tên {name}" for name in step["names"] if name not in step["tables"]]
    tail = f": {', '.join(parts)}" if parts else ""
    return f"- bước {step['n']} [{step['layer']}] {step['file']}{tail}"


def block(plan: dict) -> str:
    """`hợp đồng giữa các bước` block, capped at MAX_BLOCK_CHARS; '' for a single-subtask plan (prompt byte-identical)."""
    steps = derive(plan)
    if len(steps) < 2:
        return ""
    tail = _acceptance_tail(plan, steps)
    lines, used, dropped = [HEADER], len(HEADER), False
    for step in steps:
        line = "\n" + _line(step)
        if used + len(line) > MAX_BLOCK_CHARS - 40 - len(tail):
            dropped = True
            break
        lines.append(line)
        used += len(line)
    if dropped:
        lines.append(f"\n(bớt: {len(steps)} bước, chỉ nêu các bước đầu)")
    if tail:
        lines.append(tail)
    return "".join(lines)[:MAX_BLOCK_CHARS]


def _acceptance_tail(plan: dict, steps: list[dict]) -> str:
    """Routes of the plan's `acceptance` that no subtask promises yet: the whole feature must still answer them."""
    owned = {route for step in steps for route in step["routes"]}
    extra = [route for route in _acceptance_routes(plan) if route not in owned][:3]
    return f"\n- acceptance của cả plan (chưa bước nào nhận): {', '.join(extra)}" if extra else ""


def _acceptance_routes(plan: dict) -> list[str]:
    found = []
    for item in (plan or {}).get("acceptance") or []:
        if isinstance(item, str):
            found += _routes(item)
    return sorted(set(found))


def _segs(path: str) -> list[str]:
    return [seg for seg in path.strip().split("/") if seg]


def _same_route(defined: str, wanted: str) -> bool:
    """Compare routes segment by segment, `:id`/`{id}` are wildcards; one being a prefix of the other is enough."""
    left, right = _segs(defined), _segs(wanted)
    if not left or not right:
        return False
    pair = list(zip(left, right)) if len(left) <= len(right) else list(zip(right, left))
    return all(a == b or "*" in (a, b) or a.startswith((":", "{")) or b.startswith((":", "{"))
               for a, b in pair)


def _defines_route(code: str, route: str) -> bool:
    return any(_same_route(path, route) for path in _ROUTE_CALL.findall(code))


def _defines_table(code: str, table: str) -> bool:
    return any(name.lower().rsplit(".", 1)[-1] == table.lower() for name in _CREATE_TABLE.findall(code))


def _exports(code: str, name: str) -> bool:
    """`export function|const|let|var|class NAME` or `export { ... NAME ... }`."""
    if re.search(r"export\s*\*|\bmodule\.exports\b|\bexports\.", code):  # re-export/cjs: không đủ chắc để nói thiếu
        return True
    token = re.escape(name)
    pattern = (rf"export\s+(?:default\s+)?(?:async\s+)?(?:function\s*\*?|const|let|var|class)\s+{token}\b"
               rf"|\bexport\s*\{{[^}}]*\b{token}\b")
    return bool(re.search(pattern, code))


def _imports(code: str, file: str) -> list[tuple[str, list[str]]]:
    """(file đã resolve, tên import) cho mọi import tương đối trong `code`."""
    base = posixpath.dirname(file)
    found = []
    for names, spec in _IMPORT.findall(code or ""):
        resolved = posixpath.normpath(posixpath.join(base, spec))
        inside = _NAMED.search(names or "")
        wanted = [item.strip().split(" as ")[-1].strip()
                  for item in (inside.group(1).split(",") if inside else [])]
        found.append((resolved, [name for name in wanted if re.fullmatch(r"[A-Za-z_$][\w$]*", name or "")]))
    return found


def _owners(steps: list[dict]) -> dict[str, set[str]]:
    """Name → files that promise it. Two steps on one name make it ambiguous, not wrong."""
    owners: dict[str, set[str]] = {}
    for step in steps:
        if not step["file"]:
            continue
        for name in [*step["routes"], *(f"bảng:{table}" for table in step["tables"])]:
            owners.setdefault(name, set()).add(step["file"])
    return owners


def _content(state: dict, file: str) -> str | None:
    """Nội dung file trong scratch checkout (None khi không đọc được: không đủ chắc để chặn)."""
    repo = state.get("scratch_repo")
    if not repo or not file:
        return None
    path = _safe(repo, file)
    if path is None or not path.is_file():
        return None
    return path.read_text(encoding="utf-8", errors="replace")


def _safe(repo, file: str):
    """Path trong scratch checkout, None khi path tuyệt đối/thoát repo (plan không đáng tin)."""
    if PurePosixPath(file).is_absolute() or PureWindowsPath(file).is_absolute() or ".." in Path(file).parts:
        return None
    return Path(repo) / file


def describe(finding: dict) -> str:
    """Một dòng cho admin: file nào dùng tên gì của file nào mà file đó không định nghĩa."""
    if finding["kind"] == "export":
        return (f"hợp đồng: '{finding['file']}' import '{finding['name']}' từ '{finding['owner']}' "
                f"nhưng '{finding['owner']}' không export tên đó")
    what = "route" if finding["kind"] == "route" else "bảng"
    return (f"hợp đồng: '{finding['file']}' dùng {what} '{finding['name']}' của '{finding['owner']}' "
            f"nhưng '{finding['owner']}' không định nghĩa {what} đó")


def cross_check(state: dict) -> list[dict]:
    """Findings khi file này dùng tên chỉ một file khác sở hữu mà file kia không định nghĩa.

    Không chắc thì bỏ qua: tên do 0 hoặc ≥2 bước sở hữu (mơ hồ), hoặc nội dung file kia không
    đọc được, đều không chặn — false negative chấp nhận được, false positive thì không."""
    steps = derive(state.get("plan") or {})
    if len(steps) < 2:
        return []
    owners = _owners(steps)
    by_file = {step["file"]: step for step in steps if step["file"]}
    findings: list[dict] = []
    for step in steps:
        code = _content(state, step["file"])
        if not code:
            continue
        for name in sorted(owners):
            if name.startswith("bảng:"):
                table = name.split(":", 1)[1]
                if step["file"] in owners[name] or not _mentions_table(code, table):
                    continue
                finding = _check_table(state, owners[name], step["file"], table)
            else:
                if step["file"] in owners[name] or name not in code:
                    continue
                finding = _check_route(state, owners[name], step["file"], name)
            if finding:
                findings.append(finding)
        findings += _check_imports(state, step["file"], code, by_file)
        if len(findings) >= MAX_FINDINGS:
            break
    unique, seen = [], set()
    for finding in findings:
        key = (finding["file"], finding["owner"], finding["name"], finding["kind"])
        if key not in seen:
            seen.add(key)
            unique.append(finding)
    return unique[:MAX_FINDINGS]


def _sole_owner(owners: set[str] | list[str], file: str) -> str | None:
    """File duy nhất sở hữu tên, khác file đang dùng tên đó; None khi mơ hồ."""
    owners = sorted(set(owners))
    if len(owners) != 1 or owners[0] == file:
        return None
    return owners[0]


def _check_route(state: dict, owners, file: str, route: str) -> dict | None:
    owner = _sole_owner(owners, file)
    if owner is None:
        return None
    code = _content(state, owner)
    if code is None or _defines_route(code, route):
        return None
    return {"file": file, "owner": owner, "name": route, "kind": "route"}


def _check_table(state: dict, owners, file: str, table: str) -> dict | None:
    owner = _sole_owner(owners, file)
    if owner is None:
        return None
    code = _content(state, owner)
    if code is None or _defines_table(code, table):
        return None
    return {"file": file, "owner": owner, "name": table, "kind": "table"}


def _mentions_table(code: str, table: str) -> bool:
    """The file reads/writes `table` in SQL — only scanned when the file actually holds SQL."""
    if not _SQL.search(code):
        return False
    return table.lower() in {name.lower() for name in _TABLE_REF.findall(code)}


def _check_imports(state: dict, file: str, code: str, by_file: dict) -> list[dict]:
    """Named imports from another plan file must be exported there."""
    findings = []
    for resolved, names in _imports(code, file):
        if resolved not in by_file or resolved == file or not names:
            continue
        other = _content(state, resolved)
        if other is None:
            continue
        for name in names:
            if not _exports(other, name):
                findings.append({"file": file, "owner": resolved, "name": name, "kind": "export"})
    return findings


def evidence(plan: dict) -> dict:
    """Bản ghi gọn cho cổng 4: các bước và ai sở hữu tên nào (không kèm diff)."""
    steps = derive(plan)
    owners: dict[str, list[int]] = {}
    for step in steps:
        for name in [*step["routes"], *(f"bảng {table}" for table in step["tables"]), *step["names"]]:
            owners.setdefault(name, []).append(step["n"])
    out = {"steps": [{"n": step["n"], "file": step["file"],
                      "names": [*step["routes"], *step["tables"], *step["names"]][:MAX_NAMES_PER_STEP]}
                     for step in steps[:MAX_STEPS]],
           "owners": {name: sorted(set(owner_steps)) for name, owner_steps in owners.items()}}
    while len(json.dumps(out, ensure_ascii=False)) > MAX_EVIDENCE_CHARS and out["owners"]:
        out["owners"].popitem()
    return out


def findings_evidence(findings: list[dict]) -> dict:
    """Kết quả kiểm chéo dạng đếm + danh sách ngắn (không diff)."""
    return {"count": len(findings),
            "findings": [f"{finding['kind']}:{finding['name']}"
                         f" ('{finding['file']}' -> '{finding['owner']}')" for finding in findings[:MAX_FINDINGS]]}
