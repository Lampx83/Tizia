"""Deterministic ready check: requester literal verbatim in added lines, only planned files changed, cross-references resolve."""
import posixpath
import re
from pathlib import Path

from gates import acceptance_structure, gate3_guards, static_check
from runtime import subtask_files
from gate5 import functional
from gate5.guest_inputs import GuestInputMissing

NO_ORACLE = "no deterministic check: the request pins no literal text"

_ID_USE = re.compile(r"""getElementById\(\s*["']([\w-]+)["']|querySelector(?:All)?\(\s*["']#([\w-]+)["']""")
_HANDLER = re.compile(r"""\bon[a-z]+\s*=\s*["']\s*([A-Za-z_$][\w$]*)\s*\(""")
_LINK_ASK = re.compile(r"liên kết|đường dẫn|lối vào|\bmenu\b|\blinks?\b|trỏ tới|từ trang", re.I)
_NEW_FILE = re.compile(r"^diff --git a/\S+ b/(\S+)\n(?:new file mode[^\n]*\n)?(?:index[^\n]*\n)?--- /dev/null", re.M)
_LOCAL_SCRIPT = re.compile(r"""<script[^>]*\ssrc\s*=\s*["']([^"'#?\s]+)["']""")


def _fail(reason: str) -> dict:
    return {"passed": False, "reason": reason[:400]}


def _changed(state: dict) -> set[str]:
    return {str(path).replace("\\", "/") for item in state.get("diffs") or []
            for path in (item.get("file"), *(item.get("extra_files") or [])) if path}


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return ""


def _pages(root: Path):
    return [p for p in root.rglob("*.html") if "node_modules" not in p.parts]


def _target(root: Path, file: str, ref: str) -> Path | None:
    """Candidate-tree file a reference resolves to; None when absent."""
    base = "public" if ref.startswith("/") else posixpath.dirname(file)
    rel = posixpath.normpath(posixpath.join(base, ref.lstrip("/")))
    return next((root / p for p in (rel, f"public/{rel}") if (root / p).is_file()), None)


def _corpus(root: Path, file: str) -> str | None:
    """Text of the pages a changed file belongs to plus their local scripts; None when no page loads the script."""
    if file.endswith((".html", ".htm")):
        pages = [(file, _read(root / file))]
    else:
        loads = re.compile(rf"""src\s*=\s*["'][^"']*{re.escape(posixpath.basename(file))}["'?#]""")
        pages = [(p.relative_to(root).as_posix(), text) for p in _pages(root) if loads.search(text := _read(p))]
        if not pages:
            return None
    out = []
    for page, text in pages:
        out.append(text)
        for src in _LOCAL_SCRIPT.findall(text):
            found = None if gate3_guards._EXTERNAL.match(src) else _target(root, page, src)
            out.append(_read(found) if found else "")
    return "\n".join(out)


def _defined(name: str, text: str) -> bool:
    n = re.escape(name)
    return bool(re.search(rf"(?:function\s+|(?:const|let|var)\s+|window\.){n}\b|\b{n}\s*=[^=]", text))


def crossref_issues(state: dict, text: str) -> list[str]:
    """Reasons the candidate tree's references break: dead links, undefined ids or handlers, unlinked new page."""
    root = state.get("full_checkout")
    if not root:
        return []
    root, issues = Path(root), []
    added: dict[str, list[str]] = {}
    for path, hunk in static_check._hunks(text):
        added.setdefault(path, []).extend(line for sign, line in hunk if sign == "+")
    for file, lines in added.items():
        corpus = None
        for line in lines:
            for ref in (m.group(1) for m in gate3_guards._REF.finditer(line)):
                if not gate3_guards._EXTERNAL.match(ref) and _target(root, file, ref) is None:
                    issues.append(f"{file}: link points to a page that does not exist: {ref}")
            names = [("id", next(g for g in m.groups() if g)) for m in _ID_USE.finditer(line)]
            names += [("function", m.group(1)) for m in _HANDLER.finditer(line)]
            for kind, name in names:
                corpus = _corpus(root, file) if corpus is None else corpus
                if corpus is None:
                    continue
                ok = re.search(rf"""\bid\s*[=:]\s*["']{re.escape(name)}["']""", corpus) if kind == "id" else _defined(name, corpus)
                if not ok:
                    issues.append(f"{file}: {kind} {name} is used but not defined")
    if _LINK_ASK.search(functional._request_raw(state)):
        for page in sorted(p for p in _NEW_FILE.findall(text) if p.endswith((".html", ".htm"))):
            link = re.compile(rf"""href\s*=\s*["'][^"'#?]*{re.escape(posixpath.basename(page))}["'?#]""")
            if not any(link.search(_read(p)) for p in _pages(root) if p != root / page):
                issues.append(f"new page {page} has no link from any other page")
    return list(dict.fromkeys(issues))


def check(state: dict | None) -> dict:
    """{'passed', 'reason'}: reason empty on pass; model-written tests are not consulted."""
    state = state or {}
    approved = bool(state.get("approved_checks"))
    try:
        want = functional.text_expectation(state)
        anchor = functional.anchor(state)
    except GuestInputMissing:
        if not approved:
            return _fail(NO_ORACLE)
        want, anchor = {"present": [], "absent": []}, None
    if reason := acceptance_structure.unmet(state):
        return _fail(reason)
    pairs = functional.replace_pairs(state)
    broken = crossref_issues(state, "".join(str(i.get("diff") or "") for i in state.get("full_diff") or state.get("diffs") or []))
    if broken:
        return _fail(broken[0])
    # A replace pins both sides even when keep-as-is quotes defeat the strict pair parse.
    present = [new for _, new in pairs] or [text for text in want["present"] if text != anchor and not functional._is_css_selector(text)]
    absent = [old for old, _ in pairs] or want["absent"]
    diffs = state.get("full_diff") or state.get("diffs") or []
    if not (present or absent) and not approved:
        return _fail(NO_ORACLE)
    if not diffs:
        return _fail("no deterministic check: no diff to inspect")
    text = "".join(str(item.get("diff") or "") for item in diffs)
    misses = static_check.literal_misses(state, text, state.get("full_checkout"))
    if misses:
        return _fail(misses[0])
    hunks = static_check._hunks(text)
    lines = lambda sign: [line for _, hunk in hunks for s, line in hunk if s == sign]
    added, removed = lines("+"), lines("-")
    for literal in map(static_check._ws, present):
        if not any(literal in line for line in added):
            return _fail(f'requester literal "{literal}" is not in the added lines')
    for literal in map(static_check._ws, absent):
        if any(literal in line for line in added) or not any(literal in line for line in removed):
            return _fail(f'requester text "{literal}" must be removed and not added back')
    planned = {path for task in (state.get("plan") or {}).get("subtasks") or [] for path in subtask_files.files_of(task)}
    stray = sorted(_changed(state) - planned)
    if stray:
        return _fail(f"files changed beyond the named files: {', '.join(stray)}")
    return {"passed": True, "reason": ""}
