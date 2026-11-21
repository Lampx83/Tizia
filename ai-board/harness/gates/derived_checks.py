"""Derive verify/checks for simple request kinds (css_color, replace_text, insert_text, remove) from the request, not from model-written shell."""
from __future__ import annotations

import re
import shlex

from gate5 import functional

KINDS = ("css_color", "replace_text", "insert_text", "remove_element", "size_hide")
SOURCE = "derived"
_HEX = re.compile(r"(?<![\w#])#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w])")
_BACKGROUND = re.compile(r"màu nền|nền|background", re.IGNORECASE)
_HTML_UNSAFE = re.compile(r"[&<>]")
_PAGE = re.compile(r"public/([A-Za-z0-9][\w.-]*\.html)")
_TEXT_FILE = (".html", ".js")
_CSS_FILE = (".html", ".css")

# argv[1]=file, rest = "+text" (must appear) / "-text" (must be gone)
_TEXT_JS = ("const s=require('fs').readFileSync(process.argv[1],'utf8');"
            "process.exit(process.argv.slice(2).every(a=>s.includes(a.slice(1))===(a[0]==='+'))?0:1)")
# argv: file selector prop hex; the selector's rule block sets prop to hex
_CSS_JS = ("const s=require('fs').readFileSync(process.argv[1],'utf8');const e=x=>x.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&');"
           "const r=new RegExp(e(process.argv[2])+'\\\\s*\\\\{[^}]*[;\\\\s{]'+process.argv[3]+'\\\\s*:\\\\s*'+e(process.argv[4])+'(?![\\\\w])','i');"
           "process.exit(r.test(s)?0:1)")


def _text(request: dict) -> str:
    return f"{request.get('subject') or ''}\n{request.get('body') or ''}"


def _css(request: dict) -> dict | None:
    text = _text(request)
    hexes = {h.lower() for h in _HEX.findall(text)}
    selectors = {q.strip() for q in functional.quoted(text)
                 if functional._is_css_selector(q) and not _HEX.fullmatch(q.strip())}
    if len(hexes) != 1 or len(selectors) != 1:
        return None
    selector = selectors.pop()
    if ":" in selector or "@" in selector:
        return None
    return {"kind": "css_color", "selector": selector, "hex": hexes.pop(),
            "prop": "background-color" if _BACKGROUND.search(text) else "color"}


def _words(request: dict) -> dict | None:
    want = functional.text_expectation({"request_title": request.get("subject"), "request_detail": request.get("body")})
    present, absent = want["present"], want["absent"]
    if len(present) == 1 and len(absent) == 1:
        return {"kind": "replace_text", "present": present, "absent": absent}
    if len(present) == 1 and not absent:
        return {"kind": "insert_text", "present": present, "absent": []}
    if len(absent) == 1 and not present:
        return {"kind": "remove_element", "present": [], "absent": absent}
    return None


def classify(request: dict) -> dict | None:
    """Request -> {kind, literals}; None when kind or literals are not unambiguous. A declared type must agree."""
    declared = request.get("type")
    declared = declared if declared in KINDS else None
    found = _css(request) if declared in (None, "css_color") else None
    if found is None and declared != "css_color":
        found = _words(request)
    if not found:
        return None
    if declared and declared != found["kind"] and not (declared == "size_hide" and found["kind"] == "remove_element"):
        return None
    texts = found.get("present", []) + found.get("absent", [])
    if any(_HTML_UNSAFE.search(t) or not t.strip() for t in texts):
        return None
    if texts and len(functional.quoted(_text(request))) != len(texts):
        return None
    return found


def _rgb(hex_: str) -> str:
    h = hex_.lstrip("#")
    h = "".join(c * 2 for c in h) if len(h) == 3 else h
    return "rgb({}, {}, {})".format(*(int(h[i:i + 2], 16) for i in (0, 2, 4)))


def _page_path(file: str) -> str | None:
    m = _PAGE.fullmatch(file.strip())
    return f"/{m.group(1)}" if m else None


def derive(found: dict, file: str, *, with_checks: bool) -> dict | None:
    """Found literals + subtask file -> {verify, checks}; None when the file cannot hold this kind."""
    file = file.strip()
    path = _page_path(file) if with_checks else None
    if found["kind"] == "css_color":
        if not file.endswith(_CSS_FILE):
            return None
        verify = shlex.join(["node", "-e", _CSS_JS, file, found["selector"], found["prop"], found["hex"]])
        checks = [{"primitive": "computed_style", "path": path, "selector": found["selector"], "prop": found["prop"],
                   "value": _rgb(found["hex"])}] if path else []
        return {"verify": verify, "checks": checks}
    if not file.endswith(_TEXT_FILE):
        return None
    marks = [f"+{t}" for t in found["present"]] + [f"-{t}" for t in found["absent"]]
    checks = ([{"primitive": "text_present", "path": path, "text": t} for t in found["present"]]
              + [{"primitive": "text_absent", "path": path, "text": t} for t in found["absent"]]) if path else []
    return {"verify": shlex.join(["node", "-e", _TEXT_JS, file, *marks]), "checks": checks}


def apply(plan: dict, request: dict, *, with_checks: bool = False) -> dict:
    """Set verify/checks on the one subtask able to hold the request kind and mark checks_source. No-op on any doubt."""
    # A server layer means new behaviour: a quoted label there is not the whole request.
    if any(isinstance(st, dict) and st.get("layer") in ("db", "backend") for st in plan.get("subtasks") or []):
        return plan
    found = classify(request)
    if not found:
        return plan
    fits = [(st, d) for st in plan.get("subtasks") or [] if isinstance(st, dict) and isinstance(st.get("file"), str)
            and (d := derive(found, st["file"], with_checks=with_checks))]
    if len(fits) != 1:
        return plan
    st, d = fits[0]
    st["verify"] = d["verify"]
    if d["checks"]:
        st["checks"] = d["checks"]
    st["checks_source"] = SOURCE
    return plan
