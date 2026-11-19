"""best_match policy shared by gates 1 and 2.5: reject by default, record-only when AI_BOARD_BEST_MATCH=advisory."""
from __future__ import annotations

import re

from services import file_context, target_confidence
from settings import get_settings

ADVISORY = "advisory"
REASON_CODE = "best_match_advisory"
_PAGE = re.compile(r"^public/.+\.html?$")
# folded text; "lam trang"/"dung trang" stay out: they also mean "make the page ..." / "use the page"
_ASKS_PAGE = re.compile(r"\btrang (?:moi|rieng)\b|\b(?:tao|them|xay dung)(?: (?:mot|1))? trang\b"
                        r"|\bnew page\b|\b(?:create|add|build)(?: a| one)?(?: new)? page\b")


def mode() -> str:
    """Env AI_BOARD_BEST_MATCH; anything but `advisory` = enforce (empty string)."""
    return ADVISORY if get_settings().best_match == ADVISORY else ""


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


def new_page_refusal(request: dict, added, source, sha: str | None) -> str:
    """Reason to send back a plan that adds public pages an edit request did not ask for, naming the files holding its quotes; '' = allowed."""
    pages = sorted(path for path in added if _PAGE.match(path))
    if not pages or feature(request):
        return ""
    homes = list(dict.fromkeys(path for literal in file_context.literals(request.get("subject"), request.get("body"))
                               for path in target_confidence._grep_files(source, sha, literal)))[:5] if sha else []
    return (f"yêu cầu sửa giao diện có sẵn: không tạo trang mới {', '.join(pages)}, sửa trang đang có"
            + (f"; chữ trong nháy có ở {', '.join(homes)}" if homes else ""))
