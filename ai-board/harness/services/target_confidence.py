"""Tín hiệu tin cậy target của plan — thuần, không gọi model, không ghi gì.

assess() chấm plan ở 1 sha bằng 4 tín hiệu tất định:
  1. trích dẫn của plan có duy nhất trong repo không (`git grep -F`: 0 / 1 / nhiều file);
  2. repomap.related() cho câu hỏi của request có chứa file đầu tiên của plan không;
  3. state['best_match'] của cổng 1 có trùng file đó không;
  4. path là file mới thật (repomap.closest → None) hay lỗi gõ (trỏ sang file khác).
Kết quả {'level', 'signals', 'candidates', 'reason'} để cổng 2.5 cảnh báo/chặn mềm SỚM, trước các vòng GPU
của cổng 3. Không thay luật grounding sẵn có: assess() chỉ nói plan có đáng tin về target hay không.
"""
from __future__ import annotations

import posixpath
import re
from pathlib import Path

from repositories import repo_at_commit
from services import repomap

MAX_CANDIDATES = 5
MAX_QUOTES = 3
REASON_MAX = 200
MIN_NEEDLE = 8  # trích dẫn ngắn hơn không chứng minh được gì (giống _too_short của cổng 2.5)
_LINE_MARKER = re.compile(r"^[ \t]*(?:[\w./-]+:)?L?\d+\|[ ]?", re.M)


def _grep_files(source, sha: str, needle: str) -> list[str]:
    """File ở `sha` chứa nguyên văn `needle` (git grep -F). Lỗi repo/sha → []: không có bằng chứng, không raise."""
    try:
        out = repo_at_commit.grep(source, sha, ["-F", "-l", "--no-color", "-e", needle])
    except OSError:
        return []
    return [record.split(":", 1)[-1] for record in out.splitlines() if record]


def _needle(quote: str) -> str | None:
    """Dòng dài nhất của trích dẫn, bỏ tiền tố `Lnn| ` — git grep -F làm việc theo dòng."""
    lines = [line.strip() for line in _LINE_MARKER.sub("", quote).split("\n")]
    longest = max(lines, key=len, default="")
    return longest if len(longest) >= MIN_NEEDLE else None


def _quote_hits(plan: dict, state: dict, source, sha: str | None) -> list[list[str]]:
    """[file chứa trích dẫn] cho từng trích dẫn của plan (plan.quote, subtask.quote, state['grounding'])."""
    quotes = [plan.get("quote")]
    quotes += [task.get("quote") for task in plan.get("subtasks") or [] if isinstance(task, dict)]
    quotes += [record.get("quote") for record in ((state.get("grounding") or {}).get("evidence") or [])
               if isinstance(record, dict)]
    found = []
    for quote in quotes:
        needle = _needle(quote) if isinstance(quote, str) else None
        if needle and source and sha:
            found.append(_grep_files(source, sha, needle))
        if len(found) >= MAX_QUOTES:
            break
    return found


def _path_kind(path: str, source) -> tuple[str, str | None]:
    """(new|existing|typo, đường gần nhất): repomap.closest trả None = file mới thật, trả path khác = lỗi gõ."""
    if not path or not source:
        return "existing", None
    try:
        near = repomap.closest(path, Path(source))
    except (OSError, ValueError):
        return "existing", None
    if near is None:
        return "new", None
    return ("existing", None) if near == path else ("typo", near)


def _same_path(left: str, right: str) -> bool:
    """Hai đường dẫn nói về cùng 1 file; người gửi có thể chỉ gõ tên file."""
    def norm(value):
        return posixpath.normpath(str(value or "").replace("\\", "/")).lstrip("./")
    left, right = norm(left), norm(right)
    if not left or not right:
        return False
    return (left == right or left.endswith("/" + right) or right.endswith("/" + left)
            or ("/" not in left and left == right.rsplit("/", 1)[-1])
            or ("/" not in right and right == left.rsplit("/", 1)[-1]))


def _request_text(state: dict) -> str:
    """Chữ của yêu cầu gốc: subject + body/detail (state có thể mang sẵn `request`, hoặc chỉ các chuỗi rời)."""
    request = state.get("request") if isinstance(state.get("request"), dict) else {}
    parts = (state.get("request_subject"), request.get("subject"), state.get("request_body"), request.get("body"),
             request.get("detail"), state.get("question"))
    return " ".join(str(part) for part in parts if part)


def _question(state: dict) -> str:
    """Câu hỏi đưa vào repomap: state['question'], không thì subject + body/detail của request."""
    return state["question"] if isinstance(state.get("question"), str) and state["question"].strip() \
        else _request_text(state)


def _named(path: str, text: str) -> bool:
    """`text` nêu đúng file `path` (nguyên văn, hoặc cả thư mục chứa nó từ 2 đoạn trở lên)."""
    if not path or not text:
        return False
    if path in text:
        return True
    parts = path.split("/")
    return any("/".join(parts[:index]) + "/" in text for index in range(2, len(parts)))


def _decide(quote: str, home_matches: bool, repo_agree: bool | None, best_agree: bool | None,
            kind: str, named: bool) -> tuple[str, str]:
    """(level, mã luật). Thứ tự luật là một phần hợp đồng — test_target_confidence khoá từng ô."""
    if kind == "typo":
        return "low", "path_typo"
    if quote == "many":
        return ("high", "many_quote_best_match") if best_agree else ("low", "many_quote")
    if quote == "none":
        if best_agree:
            return "high", "zero_quote_best_match"
        if repo_agree:
            return "high", "zero_quote_repomap"
        return "low", "zero_quote_disagree"
    if quote == "unique":
        if home_matches or best_agree or repo_agree:
            return "high", "unique_quote_agrees"
        return "low", "unique_quote_elsewhere"
    if kind == "new":  # plan không nêu trích dẫn và target chưa tồn tại
        return ("high", "new_file_named") if named else ("low", "new_file_unnamed")
    return ("high", "no_quote_agrees") if (best_agree or repo_agree) else ("low", "no_quote")


def _reason(rule: str, target: str, quote: dict, near: str | None, candidates: list[str]) -> str:
    """1 dòng tiếng Việt cho panel admin, ≤ REASON_MAX ký tự."""
    count = quote["counts"][0] if quote["counts"] else 0
    if rule == "path_typo":
        return f"path {target} có lẽ gõ sai: file thật gần nhất là {near}"
    if rule == "many_quote":
        return f"trích dẫn của plan có ở {count} file nên không chỉ ra target; plan chọn {target}"
    if rule == "many_quote_best_match":
        return f"trích dẫn có ở {count} file nhưng best_match của cổng 1 trùng {target}"
    if rule in ("zero_quote_disagree", "zero_quoted"):
        top = f"; repomap xếp {candidates[0]} trước" if candidates else ""
        return f"không file nào chứa trích dẫn của plan{top}; plan chọn {target}"
    if rule == "zero_quote_best_match":
        return f"trích dẫn không có trong code nhưng best_match của cổng 1 trùng {target}"
    if rule == "zero_quote_repomap":
        return f"trích dẫn không có trong code nhưng repomap cũng xếp {target} đầu"
    if rule == "unique_quote_elsewhere":
        return f"trích dẫn chỉ có trong {quote['home']}, không phải {target}"
    if rule == "unique_quote_agrees":
        return f"trích dẫn duy nhất khớp target {target}"
    if rule == "new_file_named":
        return f"{target} là file mới, request và verify cùng đặt tên"
    if rule == "new_file_unnamed":
        return f"{target} là file mới nhưng request/verify không đặt tên file này"
    if rule == "no_quote_agrees":
        return f"plan không nêu trích dẫn nhưng best_match/repomap đồng ý {target}"
    return f"plan không nêu trích dẫn và không tín hiệu nào đồng ý {target}"


def assess(plan, state, source, sha, *, repomap_limit: int = 5) -> dict:
    """Chấm plan ở `sha` (thuần, không model) → {'level', 'signals', 'candidates', 'reason'}.
    `state` cấp câu hỏi cho repomap (`question`/`request`), `best_match` và `grounding` của cổng trước.
    signals['path']['files'] chỉ xét 5 file đầu của plan (giữ chi phí git ls-files ở mức cố định)."""
    plan = plan if isinstance(plan, dict) else {}
    state = state if isinstance(state, dict) else {}
    tasks = [task for task in plan.get("subtasks") or [] if isinstance(task, dict)]
    files = [path for path in dict.fromkeys(str(task.get("file") or "") for task in tasks) if path]
    target = files[0] if files else ""
    question = _question(state)
    candidates: list[str] = []
    if question and target:
        try:
            found = repomap.related(source, sha, question, limit=max(1, repomap_limit))
        except (OSError, ValueError):
            found = []
        candidates = [path for path in found if path][:MAX_CANDIDATES]
    repo_agree = (target in candidates) if (candidates and target) else None
    best = str(state.get("best_match") or "")
    best_agree = _same_path(best, target) if (best and target) else None
    kinds = {path: _path_kind(path, source) for path in files[:MAX_CANDIDATES]}
    kind, near = kinds.get(target, ("existing", None))
    quoted = _quote_hits(plan, state, source, sha)
    counts = [len(hits) for hits in quoted]
    quote = {"state": "missing" if not quoted else "many" if any(n > 1 for n in counts)
             else "none" if any(n == 0 for n in counts) else "unique",
             "checked": len(quoted), "counts": counts,
             "home": quoted[0][0] if len(quoted) == 1 and counts[0] == 1 else None}
    verify = " ".join(str(task.get("verify") or "") for task in tasks if str(task.get("file") or "") == target)
    named = _named(target, verify) and _named(target, _request_text(state))
    if not target:
        return {"level": "low", "signals": {"plan": "không có subtask/file"}, "candidates": candidates,
                "reason": "plan không nêu file nào để sửa"[:REASON_MAX]}
    level, rule = _decide(quote["state"], bool(quote["home"] and _same_path(quote["home"], target)),
                          repo_agree, best_agree, kind, named)
    signals = {
        "quote": quote,
        "repomap": {"agree": repo_agree, "top": candidates[0] if candidates else None},
        "best_match": {"agree": best_agree, "path": best or None},
        "path": {"kind": kind, "closest": near,
                 "files": {path: {"kind": found, "closest": close} for path, (found, close) in kinds.items()}},
        "verify_names_request_path": named,
        "rule": rule,
    }
    return {"level": level, "signals": signals, "candidates": candidates[:MAX_CANDIDATES],
            "reason": _reason(rule, target, quote, near, candidates)[:REASON_MAX]}
