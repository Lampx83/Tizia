"""Điều kiện nghiệm thu của clarified_spec và kiểm tra mỗi điều kiện có subtask verify chạy được."""
import json
import re
import unicodedata
from pathlib import Path

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
    return uncovered_items(conditions(spec), plan)


def uncovered_items(items, plan):
    subtasks = [t for t in (plan or {}).get("subtasks") or [] if isinstance(t, dict)]
    runnable = [t for t in subtasks if _RUNNABLE.match(str(t.get("verify") or "").strip())]
    missing = []
    for item in items:
        words = set(_WORD.findall(_fold(item)))
        need = max(2, (len(words) + 1) // 2)
        covered = any(len(words & set(_WORD.findall(_fold(f"{t.get('title') or ''} {t.get('verify') or ''}")))) >= need
                      for t in runnable)
        if not covered:
            missing.append(item)
    return missing


PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "spec_conditions.md"
SCHEMA = {"type": "object", "additionalProperties": False, "properties": {
    "conditions": {"type": "array", "maxItems": 12, "items": {"type": "string", "maxLength": 300}}},
    "required": ["conditions"]}


def parse_model(text):
    """Điều kiện từ JSON của model; [] nếu sai schema (không chặn plan)."""
    try:
        items = json.loads(text).get("conditions")
    except (AttributeError, TypeError, ValueError):
        return []
    return [item.strip() for item in items if isinstance(item, str) and item.strip()][:12] if isinstance(items, list) else []


def spec_conditions(spec, call_model=None):
    """(điều kiện, nguồn): mục tất định trước; chỉ khi không có mục thì một lời gọi model (call_model(prompt) -> text)."""
    found = conditions(spec)
    if found or not (spec or "").strip():
        return found, "section" if found else "none"
    if call_model is None:
        return [], "none"
    prompt = PROMPT_PATH.read_text(encoding="utf-8").replace("{spec}", spec)
    return parse_model(call_model(prompt)), "model"


def has_runnable(plan):
    return any(isinstance(t, dict) and _RUNNABLE.match(str(t.get("verify") or "").strip()) for t in (plan or {}).get("subtasks") or [])


def non_runnable_layered(plan):
    """verify của subtask có `layer` phải là lệnh chạy được."""
    return [f"{t.get('file')}: {str(t.get('verify') or '').strip()[:80]}" for t in (plan or {}).get("subtasks") or []
            if isinstance(t, dict) and t.get("layer") and not _RUNNABLE.match(str(t.get("verify") or "").strip())]


def plan_block(plan, missing_conditions):
    """Lý do chặn plan hoặc None. Chỉ chặn bằng bằng chứng xác minh được: verify không chạy được (có layer), hoặc điều kiện chưa phủ mà plan không có verify chạy được nào; trùng từ chỉ là gợi ý."""
    bad = non_runnable_layered(plan)
    if bad:
        return f"verify phải là lệnh chạy được: {bad[0]}"
    if has_runnable(plan):
        return None
    missing = missing_conditions()
    return f"điều kiện chưa có subtask verify chạy được: {missing[0][:160]}" if missing else None
