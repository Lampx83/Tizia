"""Feature acceptance as fixed structure: harness derives the browser check and the Vietnamese sentence the requester approves."""
from __future__ import annotations

import re
import unicodedata

from settings import get_settings
from verification import checks

SOURCE = "structured"
ACTIONS = ("see", "not_see", "style")
FIELDS = {"page", "text", "element", "action", "expect"}
APPROVAL_HEAD = "Sau khi làm xong, mình sẽ kiểm tra trên trang web đúng những điều sau:"
APPROVAL_TAIL = 'Nếu đúng như bạn muốn, hãy trả lời "Đồng ý". Nếu cần đổi, hãy nói rõ điều cần đổi.'
_YES = {"dong y", "duyet", "ok", "oke", "okay", "yes", "dung", "dung roi", "duoc", "chap nhan", "da dong y"}
_STYLE = re.compile(r"([a-z-]{1,40})\s*:\s*(.+)")
_HEX = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})")
_LINE = re.compile(r"\d+\.\s+(.+)")

PROMPT_BLOCK = """

ACCEPTANCE CRITERIA (feature request): add a top-level "criteria" array, 1-8 items, one per thing the requester can see.
Each item is exactly {"page", "text" OR "element", "action", "expect"}:
- page: URL path of the page, e.g. "/gallery.html".
- text: words that appear on the page; element: a CSS selector such as "#save-btn" or ".card" (give one of the two).
- action: "see" (text or element is on the page), "not_see" (text is gone; text only), "style" (element has a CSS property; element only).
- expect: only for "style", as "property: value" such as "color: #16a34a"; omit for the other actions.
The harness builds the checks and the sentence the requester approves from these fields; write no "checks" yourself."""


def enabled(request: dict | None) -> bool:
    """Flag on and a feature request."""
    return bool(get_settings().plan_checks and (request or {}).get("type") == "feature")


def prompt_block(request: dict) -> str:
    return PROMPT_BLOCK if enabled(request) else ""


def _rgb(value: str) -> str:
    from gates import derived_checks
    return derived_checks._rgb(value) if _HEX.fullmatch(value) else value


def _style(expect) -> tuple[str, str] | None:
    found = _STYLE.fullmatch(expect.strip()) if isinstance(expect, str) else None
    return (found.group(1), _rgb(found.group(2).strip())) if found else None


def item_problem(item) -> str | None:
    """Why one structure is unusable; None when it maps to one check."""
    if not isinstance(item, dict) or not item.keys() <= FIELDS:
        return f"mỗi mục chỉ gồm {sorted(FIELDS)}"
    action = item.get("action")
    if action not in ACTIONS:
        return f"action phải thuộc {list(ACTIONS)}"
    if ("text" in item) == ("element" in item):
        return "cần đúng một trong text hoặc element"
    if action == "not_see" and "text" not in item:
        return "not_see chỉ dùng với text"
    if action == "style" and ("element" not in item or _style(item.get("expect")) is None):
        return 'style cần element và expect dạng "property: value"'
    if action != "style" and "expect" in item:
        return "expect chỉ dùng với style"
    if "page" not in item:
        return "thiếu page"
    return checks.problem(check_of(item))


def check_of(item: dict) -> dict:
    """Structure -> closed-vocabulary check; same structure, same check."""
    page, action = item["page"], item["action"]
    if action == "style":
        prop, value = _style(item["expect"]) or ("", "")
        return {"primitive": "computed_style", "path": page, "selector": item["element"], "prop": prop, "value": value}
    if "element" in item:
        return {"primitive": "selector_exists", "path": page, "selector": item["element"]}
    return {"primitive": "text_present" if action == "see" else "text_absent", "path": page, "text": item["text"]}


def sentence_of(item: dict) -> str:
    """Structure -> Vietnamese sentence for the requester."""
    page, action = item["page"], item["action"]
    if action == "style":
        prop, value = _style(item["expect"]) or ("", "")
        return f'Trên trang {page}, phần tử "{item["element"]}" có {prop} là {value}.'
    if "element" in item:
        return f'Trang {page} có phần tử "{item["element"]}".'
    return f'Trang {page} {"hiển thị" if action == "see" else "không còn"} chữ "{item["text"]}".'


def problems(plan: dict, request: dict | None = None) -> list[str]:
    """Structure faults; a feature plan with no criteria is a fault. [] when flag off or all usable."""
    if not get_settings().plan_checks:
        return []
    items = plan.get("criteria")
    if items is None:
        return ["feature cần criteria: mỗi tiêu chí là page, text/element, action, expect"] if (request or {}).get("type") == "feature" else []
    if not isinstance(items, list) or not 1 <= len(items) <= checks.MAX_CHECKS:
        return [f"criteria phải là danh sách 1-{checks.MAX_CHECKS} mục"]
    return [f"criteria[{i}]: {why}" for i, item in enumerate(items, 1) if (why := item_problem(item))]


def _owner(subtasks: list[dict], page: str) -> dict:
    return next((t for t in subtasks if t.get("file") in (page.lstrip("/"), f"public{page}")), subtasks[-1])


def apply(plan: dict) -> dict:
    """Replace every subtask's checks with those derived from plan['criteria']; no-op without usable criteria. Idempotent."""
    items, subtasks = plan.get("criteria"), plan.get("subtasks") or []
    if not items or not subtasks or not get_settings().plan_checks or problems(plan):
        return plan
    for task in subtasks:
        task.pop("checks", None)
        task.pop("checks_source", None)
    for item in items:
        task = _owner(subtasks, item["page"])
        task.setdefault("checks", []).append(check_of(item))
        task["checks_source"] = SOURCE
    return plan


def sentences(plan: dict) -> list[str]:
    return [sentence_of(item) for item in plan.get("criteria") or []]


def approval_text(plan: dict) -> str:
    return "\n".join([APPROVAL_HEAD, *(f"{i}. {line}" for i, line in enumerate(sentences(plan), 1)), APPROVAL_TAIL])


def _plain(text: str) -> str:
    folded = unicodedata.normalize("NFD", text.lower().replace("đ", "d"))
    return re.sub(r"[^a-z ]", "", "".join(c for c in folded if not unicodedata.combining(c))).strip()


def approved(plan: dict, thread: list | None) -> bool:
    """Requester's affirmative reply follows an approval message that lists exactly this plan's sentences."""
    messages = [m for m in thread or [] if isinstance(m, dict)]
    asked = next((i for i in range(len(messages) - 1, -1, -1)
                  if messages[i].get("role") == "admin" and str(messages[i].get("body") or "").startswith(APPROVAL_HEAD)), None)
    if asked is None:
        return False
    listed = [m.group(1) for line in str(messages[asked]["body"]).splitlines() if (m := _LINE.fullmatch(line.strip()))]
    replies = [m for m in messages[asked + 1:] if m.get("role") != "admin"]
    return bool(replies) and sorted(listed) == sorted(sentences(plan)) and _plain(str(replies[-1].get("body") or "")) in _YES


def stop(request: dict, plan: dict, state: dict, *, write=None, limit: int = 3) -> dict | None:
    """Gate 2.5 result holding the run until the requester approves; None when approved or n/a. Approval records the frozen pin."""
    if not enabled(request) or not plan.get("criteria"):
        return None
    if approved(plan, request.get("thread")):
        state["approved_checks"] = checks.collect(plan)
        state["approved_pin"] = checks.pin(plan)
        return None
    if sum(1 for m in request.get("thread") or [] if isinstance(m, dict) and m.get("role") == "admin") >= limit:
        return {"gate": 2.5, "blocked": True, "reason": "acceptance_unapproved: người gửi chưa duyệt các kiểm tra",
                "outcome": "needs_review", "public_message": "Các kiểm tra chưa được duyệt; đang chờ quản trị viên xem lại."}
    text = approval_text(plan)
    if write is not None:
        write(request, text)
    return {"gate": 2.5, "blocked": True, "reason": "needs_clarification", "outcome": "needs_clarification", "public_message": text}


def unmet(state: dict) -> str | None:
    """Why approved checks do not all pass on the candidate; None when they do or none were approved."""
    approved_checks = state.get("approved_checks")
    if not approved_checks:
        return None
    if state.get("approved_pin") != checks.pin(state.get("plan")):
        return "approved checks changed after approval"
    rows = ((state.get("evidence") or {}).get("checks") or {}).get("rows") or []
    for check in approved_checks:
        if not any(row.get("check") == check and row.get("candidate") is True for row in rows):
            return f"approved check not passed: {check['primitive']} {checks.target(check)}"
    return None
