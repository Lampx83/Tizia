"""best_match policy shared by gates 1 and 2.5: reject by default, record-only when AI_BOARD_BEST_MATCH=advisory."""
from __future__ import annotations

import re

import tools
from repositories import code_index
from services import context, file_context, target_confidence
from settings import get_settings
from gate5 import functional

ADVISORY = "advisory"
REASON_CODE = "best_match_advisory"
_PAGE = re.compile(r"^public/.+\.html?$")
# folded text; "lam trang"/"dung trang" ("make the page ..."/"use the page") and compounds like "trang tri" are edits
_ASKS_PAGE = re.compile(r"\btrang (?:moi|rieng)\b|\b(?:tao|them|xay dung)(?: (?:mot|1))? trang\b(?! (?:tri|bi|phuc|diem|chu|nha)\b)"
                        r"|\bnew page\b|\b(?:create|add|build)(?: a| one)?(?: new)? page\b")


def mode() -> str:
    """Env AI_BOARD_BEST_MATCH; anything but `advisory` = enforce (empty string)."""
    return ADVISORY if get_settings().best_match == ADVISORY else ""


def objections_advisory() -> bool:
    """Flag: grounding objections go to the coder as advice instead of blocking."""
    return bool(get_settings().plan_objections_advisory)


def enforce(best_match, plan_files, message: str, judge, *, contradicted: bool = False) -> None:
    """Raise ValueError(message) if plan misses best_match; advisory mode records mismatch via judge instead unless contradicted."""
    if not best_match or best_match in plan_files:
        return
    if mode() != ADVISORY or contradicted:
        raise ValueError(message)
    judge("best_match", True, f"{REASON_CODE}: recommended {best_match}; plan edits {', '.join(sorted(plan_files)) or '(none)'}")


def feature(request: dict) -> bool:
    """Request may add files: type feature, or its text asks for a new page."""
    text = " ".join(str(request.get(key) or "") for key in ("subject", "body", "clarified_spec"))
    return request.get("type") == "feature" or bool(_ASKS_PAGE.search(file_context.fold(text)))


def literal_homes(request: dict, source, sha: str | None) -> dict[str, list[str]]:
    """Quoted request literal -> files at sha holding it verbatim."""
    if not sha:
        return {}
    return {literal: target_confidence._grep_files(source, sha, literal)
            for literal in file_context.literals(request.get("subject"), request.get("body"))}


def model_first() -> bool:
    return bool(get_settings().model_first)


def unanchored_feature(request: dict, added, source, sha: str | None) -> bool:
    """model_first: plan adds a page plus another new file and no quoted request text exists in the repo at sha."""
    added = set(added)
    pages = {path for path in added if _PAGE.match(path)}
    if not (model_first() and pages and added - pages):
        return False
    return not any(literal_homes(request, source, sha).values())


def new_page_refusal(request: dict, added, source, sha: str | None) -> str:
    """Reason to send back a plan that adds public pages an edit request did not ask for, naming the files holding its quotes; '' = allowed."""
    pages = sorted(path for path in added if _PAGE.match(path))
    if not pages or feature(request) or unanchored_feature(request, added, source, sha):
        return ""
    homes = list(dict.fromkeys(path for paths in literal_homes(request, source, sha).values() for path in paths))[:5]
    return (f"yêu cầu sửa giao diện có sẵn: không tạo trang mới {', '.join(pages)}, sửa trang đang có"
            + (f"; chữ trong nháy có ở {', '.join(homes)}" if homes else ""))


_PAGE_LINE = re.compile(r"^\[Trang: .*\] (/\S+)[ \t]*$", re.M)
_PAGE_STEM = re.compile(r"\btrang ([a-z0-9]+)\b")


_LINK_TARGET = re.compile(r"\b(?:tới|đến|href|to)\b[=:\s\"\']*\S+\.html?\S*", re.I)
_CLAUSE = re.compile(r"(?=\b(?:trang|page)\b)", re.I)


def requested_page(request: dict, homes: list[str], source, sha: str) -> tuple[str | None, bool]:
    """(the one home the request points at, request names several homes). The user's own words come first (paths, pages named
    by title or link label, 'trang <first word of a file name>'); the [Trang: ...] line the feedback button adds is the last
    resort. A signal matching several homes (or the all-pages phrases) means several; signals pointing at different homes resolve no page."""
    body = str(request.get("body") or "")
    line = _PAGE_LINE.search(body)
    text = "\n".join((str(request.get("subject") or ""), _PAGE_LINE.sub("", body)))
    stems = [m.group(1) for m in _PAGE_STEM.finditer(text.casefold())]
    by_stem = [home for home in homes if re.split(r"[^a-z0-9]+", home.rsplit("/", 1)[-1])[0] in stems]
    named = [home for clause in _CLAUSE.split(text) for home in context._named_pages(clause, source, sha)]
    by_line = ["public" + re.split(r"[?#]", line.group(1))[0]] if line and not line.group(1).startswith("//") else []
    hits = [[home for home in homes if home in found] for found in (context._mentioned_files(_LINK_TARGET.sub(" ", text), source, sha), named, by_stem)]
    if not any(hits):
        hits = [[home for home in homes if home in by_line]]
    several = functional.all_pages({"request_title": request.get("subject"), "request_detail": _PAGE_LINE.sub("", body)})
    if several or any(len(set(pages)) > 1 for pages in hits):
        return None, True
    resolved = {pages[0] for pages in hits if pages}
    return (resolved.pop() if len(resolved) == 1 else None), False


def _loads(source, sha: str, page: str, script: str) -> bool:
    """The page's own script links (code_index) include `script`."""
    text = tools._show(source, sha, page)
    links = code_index.parse(page, text)["links"]["js"] if text else []
    return script in links


def old_literal_refusal(request: dict, targets, source, sha: str | None, skipped=()) -> str:
    """Reason to send back a replace plan that edits no home of an old text found verbatim at sha, or edits several pages
    when the request names one element; '' = allowed. Homes the model skipped with evidence (`skipped`) are not refused. A page and a script it loads may both change; any other script is another home."""
    if not sha or feature(request):
        return ""
    for old, _ in functional.replace_pairs({"request_title": request.get("subject"), "request_detail": request.get("body")}):
        homes = target_confidence._grep_files(source, sha, old)
        if not homes or set(homes) <= set(skipped):
            continue
        edited = set(homes) & set(targets)
        page, several = requested_page(request, homes, source, sha) if len(homes) > 1 else (None, False)
        pages = {home for home in edited if _PAGE.match(home)}
        units = pages | {home for home in edited - pages if not any(_loads(source, sha, p, home) for p in pages)}
        if edited and (len(homes) == 1 or several or len(units) <= 1 and (page is None or pages == {page})):
            continue
        where = f"yêu cầu đổi chữ '{old}': chữ cũ nằm ở {', '.join(homes[:5])}"
        if len(homes) == 1:
            return f"{where}, plan phải sửa file chứa chữ đó"
        if page:
            return f"{where}; yêu cầu chỉ tới {page}: chỉ sửa {page}, không đổi file khác"
        return f"{where}; yêu cầu chỉ tới một phần tử: chọn đúng một file trong số đó, nêu lý do chọn, không đổi file khác"
    return ""
