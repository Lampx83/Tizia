"""Điều kiện nghiệm thu của clarified_spec và kiểm tra mỗi điều kiện có subtask verify chạy được."""
import re
import unicodedata

_HEADING = "ket qua mong doi"
_ITEM = re.compile(r"^\s*(?:[-*•]|\d+[.)])\s*(.+?)\s*$")
_WORD = re.compile(r"[a-z0-9]{3,}")
_RUNNABLE = re.compile(r"^(node --test\b|node\s|npx\s|npm\s+(test|run)\b|curl\s|python[0-9.]*\s|pytest\b|bash\s|sh\s|docker compose\s|psql\s)")


def _fold(text):
    return "".join(c for c in unicodedata.normalize("NFD", text.lower()) if unicodedata.category(c) != "Mn").replace("đ", "d")


def conditions(spec):
    """Điều kiện của mục 'Kết quả mong đợi': phần sau ':' trên dòng tiêu đề, cộng các gạch đầu dòng ngay sau nó. [] nếu không có mục."""
    lines = (spec or "").splitlines()
    head = next((i for i, line in enumerate(lines) if _HEADING in _fold(line)), None)
    if head is None:
        return []
    found = []
    inline = lines[head].split(":", 1)[1].strip() if ":" in lines[head] else ""
    if inline:
        found.append(inline)
    for line in lines[head + 1:]:
        match = _ITEM.match(line)
        if not match:
            break
        found.append(match.group(1))
    return found


def uncovered(spec, plan):
    """Điều kiện không khớp subtask nào có verify chạy được (đủ nửa số từ khoá của điều kiện có trong title+verify, tối thiểu 2)."""
    subtasks = [t for t in (plan or {}).get("subtasks") or [] if isinstance(t, dict)]
    runnable = [t for t in subtasks if _RUNNABLE.match(str(t.get("verify") or "").strip())]
    missing = []
    for item in conditions(spec):
        words = set(_WORD.findall(_fold(item)))
        need = max(2, (len(words) + 1) // 2)
        covered = any(len(words & set(_WORD.findall(_fold(f"{t.get('title') or ''} {t.get('verify') or ''}")))) >= need
                      for t in runnable)
        if not covered:
            missing.append(item)
    return missing
