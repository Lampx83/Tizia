"""Sổ quyết định của planner: mỗi quyết định kèm bằng chứng từ bước đã đọc/chạy; harness kiểm tất định, không chấm ngữ nghĩa."""
from __future__ import annotations

import posixpath
import re
from pathlib import Path

from settings import get_settings

PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "plan_ledger.md").read_text(encoding="utf-8")
KINDS = ("choose_file", "new_file", "placement", "wiring", "skip_alternative")
AMBIGUITY = "ambiguity"
MAX_EVIDENCE, MAX_REJECTED, MAX_READING = 3, 2, 200
_NUMBERED = re.compile(r"^L(\d+)\| ?", re.M)
_RANGE = re.compile(r"^\s*(\d+)\s*(?:-\s*(\d+))?\s*$")


class LedgerInvalid(ValueError):
    """Sổ vẫn sai khi hết vòng: lỗi thường của gate, không critical."""


def enabled() -> bool:
    return get_settings().model_first


class StepLog:
    """Bước tool đã chạy: file nó đọc, khoảng dòng nó hiển thị, kết quả nguyên văn."""

    def __init__(self):
        self.steps: dict[int, dict] = {}

    def add(self, step_id: int, name: str, args: dict, observation: str) -> None:
        file = args.get("file") if name in ("read_file", "outline", "grep") else None
        rows = [int(n) for n in _NUMBERED.findall(observation)]
        self.steps[step_id] = {"file": posixpath.normpath(file) if isinstance(file, str) else None,
                               "lo": min(rows, default=None), "hi": max(rows, default=None), "text": observation}


def _plain(text: str) -> str:
    return _NUMBERED.sub("", text)


def _lines(value) -> tuple[int, int] | None:
    if isinstance(value, int) and not isinstance(value, bool):
        return value, value
    if isinstance(value, list) and len(value) == 2 and all(isinstance(v, int) for v in value):
        return value[0], value[1]
    match = _RANGE.match(value) if isinstance(value, str) else None
    return (int(match[1]), int(match[2] or match[1])) if match else None


def check_evidence(item, log: StepLog) -> str | None:
    """None khi bằng chứng đúng; ngược lại lý do một dòng."""
    if not isinstance(item, dict):
        return "evidence phải là object"
    sid = item.get("step_id")
    step = log.steps.get(sid) if isinstance(sid, int) and not isinstance(sid, bool) else None
    if step is None:
        return f"step_id {item.get('step_id')!r} không có bước nào đã chạy"
    if set(item) == {"step_id", "tool_output_excerpt"}:
        excerpt = item["tool_output_excerpt"]
        if not isinstance(excerpt, str) or not excerpt.strip():
            return f"step {item['step_id']}: tool_output_excerpt rỗng"
        if _plain(excerpt.strip()) not in _plain(step["text"]):
            return f"step {item['step_id']}: trích không có nguyên văn trong kết quả bước đó: {excerpt[:80]!r}"
        return None
    if set(item) != {"step_id", "file", "lines"}:
        return "evidence phải là {step_id,file,lines} hoặc {step_id,tool_output_excerpt}"
    file = posixpath.normpath(item["file"]) if isinstance(item["file"], str) else None
    if file is None or step["file"] != file:
        return f"step {item['step_id']} không đọc file {item['file']!r}"
    span = _lines(item["lines"])
    if span is None or span[0] > span[1]:
        return f"step {item['step_id']}: lines {item['lines']!r} sai dạng (a-b)"
    if step["lo"] is None or span[0] < step["lo"] or span[1] > step["hi"]:
        shown = f"{step['lo']}-{step['hi']}" if step["lo"] else "không có dòng đánh số"
        return f"step {item['step_id']}: lines {item['lines']!r} ngoài khoảng đã đọc ({shown})"
    return None


def _problems(decision, i: int, log: StepLog) -> list[str]:
    if not isinstance(decision, dict):
        return [f"decisions[{i}] không phải object"]
    out = []
    ambiguous = decision.get("decision") == AMBIGUITY
    if decision.get("decision") not in KINDS and not ambiguous:
        out.append(f"decisions[{i}].decision phải thuộc {', '.join((*KINDS, AMBIGUITY))}")
    readings = decision.get("readings")
    if ambiguous and not (isinstance(readings, list) and len(readings) == 2 and all(isinstance(r, str) and r.strip() for r in readings)):
        out.append(f"decisions[{i}].readings cần đúng 2 cách hiểu (chuỗi)")
    if not isinstance(decision.get("target"), str) or not decision["target"].strip():
        out.append(f"decisions[{i}].target rỗng")
    evidence, rejected = decision.get("evidence"), decision.get("rejected", [])
    if not isinstance(evidence, list) or not (0 if ambiguous else 1) <= len(evidence) <= MAX_EVIDENCE:
        out.append(f"decisions[{i}].evidence cần {0 if ambiguous else 1}-{MAX_EVIDENCE} mục")
    else:
        out += [f"decisions[{i}].evidence[{j}]: {why}" for j, item in enumerate(evidence) if (why := check_evidence(item, log))]
    if not isinstance(rejected, list) or len(rejected) > MAX_REJECTED or not all(
            isinstance(r, dict) and isinstance(r.get("target"), str) and isinstance(r.get("reason"), str) for r in rejected):
        out.append(f"decisions[{i}].rejected tối đa {MAX_REJECTED} mục {{target,reason}}")
    return out


def pop(plan, log: StepLog) -> list[dict]:
    """Gỡ "decisions" khỏi plan (schema cổng 1 giữ nguyên). Raise ValueError liệt kê mọi lỗi."""
    decisions = plan.pop("decisions", None) if isinstance(plan, dict) else None
    if not isinstance(decisions, list) or not decisions:
        raise ValueError("plan thiếu decisions (sổ quyết định)")
    problems = [p for i, d in enumerate(decisions) for p in _problems(d, i, log)]
    if problems:
        raise ValueError("; ".join(problems))
    return [{**d, "rejected": d.get("rejected", [])} for d in decisions]


def confidence(*, evidence_valid: bool, repair_rounds: int, checks_passed: bool | None = None,
               reviewer_agrees: bool | None = None) -> dict:
    """Độ tin suy từ tín hiệu kiểm được; không có số model tự khai."""
    signals = {"evidence_valid": evidence_valid, "checks_passed": checks_passed, "reviewer_agrees": reviewer_agrees,
               "repair_rounds": repair_rounds}
    if not evidence_valid or checks_passed is False or reviewer_agrees is False:
        level = "low"
    else:
        level = "high" if repair_rounds == 0 and checks_passed and reviewer_agrees else "medium"
    return {**signals, "level": level}


def coverage(plan: dict, decisions: list[dict], log: StepLog, exists) -> list[str]:
    """Lỗi bao phủ của sổ so với plan: mỗi file của subtask có quyết định; file mới cần bằng chứng nối và một file có sẵn bị bỏ."""
    problems = []
    for task in plan.get("subtasks") or []:
        path = task.get("file") if isinstance(task, dict) else None
        if not isinstance(path, str):
            continue
        mine = [d for d in decisions if d["target"] == path and d["decision"] != AMBIGUITY]
        if not mine:
            problems.append(f"file {path} chưa có quyết định nào trong sổ")
        elif not exists(path):
            problems += _new_file_problems(path, mine, log, exists)
    return problems


def _new_file_problems(path: str, mine: list[dict], log: StepLog, exists) -> list[str]:
    made = [d for d in mine if d["decision"] == "new_file"]
    if not made:
        return [f"file mới {path} cần quyết định new_file"]
    wired = any((step := log.steps.get(e.get("step_id"))) and step["file"] and step["file"] != path and exists(step["file"])
                for d in made for e in d["evidence"])
    out = [] if wired else [f"new_file {path} cần bằng chứng nối: một bước đã đọc file có sẵn khác (router, index, link trang)"]
    if not any(exists(r["target"]) for d in made for r in d["rejected"]):
        out.append(f"new_file {path} cần ít nhất một file có sẵn trong rejected, kèm lý do")
    return out


def decided(decisions: list[dict] | None, kind: str) -> set[str]:
    """Target của mọi quyết định loại `kind` (đã qua kiểm bằng chứng)."""
    return {d["target"] for d in decisions or [] if d["decision"] == kind}


def review_block(state: dict) -> str:
    """Khối cho reviewer gate 4: lựa chọn của model đi ngược gợi ý harness, kèm bằng chứng; '' khi không có."""
    notes = state.get("ledger_overrides") or []
    if not notes:
        return ""
    return ("Planner đi ngược gợi ý của harness và sổ quyết định có bằng chứng; kiểm lại bằng chứng có đỡ lựa chọn không, "
            "lựa chọn sai là wrong_target hoặc outside_request:\n" + "\n".join(f"- {n}" for n in notes))


def ambiguity_question(decisions: list[dict] | None, request: dict, limit: int) -> str | None:
    """Câu hỏi làm rõ từ mục mơ hồ đầu tiên của sổ; None khi không có, đã hỏi rồi, spec đã làm rõ, hoặc hết trần câu hỏi."""
    asked = [str(m.get("body") or "") for m in request.get("thread") or [] if isinstance(m, dict) and m.get("role") == "admin"]
    if request.get("clarified_spec") or len(asked) >= limit:
        return None
    for d in decisions or []:
        if d["decision"] == AMBIGUITY:
            first, second = (r.strip()[:MAX_READING] for r in d["readings"])
            question = f"Về {d['target'].strip()[:MAX_READING]}, yêu cầu có thể hiểu theo hai cách: (1) {first}; (2) {second}. Bạn muốn cách nào?"
            if question not in asked:
                return question
    return None
