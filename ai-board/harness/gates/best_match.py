"""best_match policy shared by gates 1 and 2.5: reject by default, record-only when AI_BOARD_BEST_MATCH=advisory."""
from __future__ import annotations

import re

from services import context, file_context, target_confidence
from settings import get_settings
from verification import functional

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


def new_page_refusal(request: dict, added, source, sha: str | None) -> str:
    """Reason to send back a plan that adds public pages an edit request did not ask for, naming the files holding its quotes; '' = allowed."""
    pages = sorted(path for path in added if _PAGE.match(path))
    if not pages or feature(request):
        return ""
    homes = list(dict.fromkeys(path for paths in literal_homes(request, source, sha).values() for path in paths))[:5]
    return (f"yêu cầu sửa giao diện có sẵn: không tạo trang mới {', '.join(pages)}, sửa trang đang có"
            + (f"; chữ trong nháy có ở {', '.join(homes)}" if homes else ""))


_PAGE_LINE = re.compile(r"^\[Trang: .*\] (/\S+)[ \t]*$", re.M)
_WORD_AFTER_PAGE = re.compile(r"\b(?:trang|page) (\w+)")
_EVERYWHERE = re.compile(r"\b(?:moi|tat ca|toan bo|khap|cac trang|every|all)\b")


def _requested_page(request: dict, homes: list[str], source, sha: str) -> str | None:
    """The one home the request points at: its [Trang: ...] line, a page it names by title/link/path, or a page word matching one home's file name."""
    text = "\n".join(str(request.get(key) or "") for key in ("subject", "body"))
    line = _PAGE_LINE.search(str(request.get("body") or ""))
    by_line = ["public" + line.group(1)] if line and not line.group(1).startswith("//") else []
    word = [home for home in homes
            if any(m.group(1) in re.split(r"[^a-z0-9]+", home.rsplit("/", 1)[-1].lower()) for m in _WORD_AFTER_PAGE.finditer(file_context.fold(text)))]
    for found in (by_line, context._named_pages(text, source, sha), context._mentioned_files(text, source, sha), word):
        pages = [home for home in homes if home in found]
        if len(pages) == 1:
            return pages[0]
    return None


def old_literal_refusal(request: dict, targets, source, sha: str | None) -> str:
    """Reason to send back a replace plan that edits no home of an old text found verbatim at sha, or edits several homes
    when the request names one element; '' = allowed."""
    if not sha or feature(request):
        return ""
    everywhere = _EVERYWHERE.search(file_context.fold(functional._QUOTED.sub(" ", f"{request.get('subject') or ''} {request.get('body') or ''}")))
    for old, _ in functional.replace_pairs({"request_title": request.get("subject"), "request_detail": request.get("body")}):
        homes = target_confidence._grep_files(source, sha, old)
        if not homes:
            continue
        edited = set(homes) & set(targets)
        page = _requested_page(request, homes, source, sha) if len(homes) > 1 else None
        if edited and (len(homes) == 1 or everywhere or (len(edited) == 1 and page in (None, *edited))):
            continue
        where = f"yêu cầu đổi chữ '{old}': chữ cũ nằm ở {', '.join(homes[:5])}"
        if len(homes) == 1:
            return f"{where}, plan phải sửa file chứa chữ đó"
        if page:
            return f"{where}; yêu cầu chỉ tới {page}: chỉ sửa {page}, không đổi file khác"
        return f"{where}; yêu cầu chỉ tới một phần tử: chọn đúng một file trong số đó, nêu lý do chọn, không đổi file khác"
    return ""
