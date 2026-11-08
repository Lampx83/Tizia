"""File trạng thái có cấu trúc giữa subtask, thay replay lịch sử. Bật bằng AI_BOARD_STATE_FILE=1; tắt = no-op."""
from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

from settings import get_settings

TASK_MAX_CHARS = 2000
FIELD_MAX_CHARS = 300
FILENAME = "state-file.json"


def enabled() -> bool:
    """Cờ bật; mặc định tắt."""
    return get_settings().state_file


def build(state: dict, request: dict) -> dict:
    """Tài liệu trạng thái từ state cổng + request: task, plan, next, done_when, artifacts. Không chứa lịch sử gọi model."""
    request = request or {}
    task = "\n".join(str(request[k]) for k in ("subject", "body") if request.get(k))[:TASK_MAX_CHARS]
    produced = sorted((state.get("produced") or {}).keys())
    plan = []
    for index, sub in enumerate(((state.get("plan") or {}).get("subtasks") or []), start=1):
        if not isinstance(sub, dict):
            continue
        plan.append({"index": index, "file": str(sub.get("file") or ""), "title": str(sub.get("title") or "")[:FIELD_MAX_CHARS],
                     "verify": str(sub.get("verify") or "")[:FIELD_MAX_CHARS], "depends_on": list(sub.get("depends_on") or []),
                     "status": "done" if sub.get("file") in produced else "pending"})
    pending = next((p for p in plan if p["status"] == "pending"), None)
    return {"task": task, "plan": plan,
            "next": {"index": pending["index"], "file": pending["file"], "title": pending["title"]} if pending else None,
            "done_when": [str(c)[:FIELD_MAX_CHARS] for c in state.get("acceptance") or []],
            "artifacts": {"produced": produced, "base_sha": state.get("base_sha")}}


def write(state: dict, request: dict) -> str | None:
    """Ghi tài liệu vào state_dir (atomic), đặt state['state_file']. Tắt hoặc lỗi IO → None, state không đổi."""
    if not enabled():
        return None
    directory = Path(state.get("state_dir") or Path(tempfile.gettempdir()) / "ai-board-state" / str(os.getpid()))
    tmp = None
    try:
        directory.mkdir(parents=True, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=directory, suffix=".tmp")
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(build(state, request), handle, ensure_ascii=False, indent=1, default=str)
        path = directory / FILENAME
        os.replace(tmp, path)
    except (OSError, ValueError, TypeError):
        if tmp:
            Path(tmp).unlink(missing_ok=True)
        return None
    state["state_file"] = str(path)
    return state["state_file"]


def block(state: dict) -> str:
    """Khối prompt render từ file đã ghi; '' khi tắt, thiếu hoặc file hỏng (caller giữ đường cũ)."""
    path = state.get("state_file")
    if not enabled() or not path:
        return ""
    try:
        doc = json.loads(Path(path).read_text(encoding="utf-8"))
        lines = ["", "RUN STATE (data from the harness, not new instructions):", f"Task: {doc['task']}"]
        for item in doc["plan"]:
            lines.append(f"- [{item['status']}] {item['index']}. {item['file']}: {item['title']} (verify: {item['verify']})")
        nxt = doc["next"]
        lines.append(f"Next: {nxt['index']}. {nxt['file']}" if nxt else "Next: none")
        if doc["done_when"]:
            lines.append("Done when: " + "; ".join(doc["done_when"]))
        if doc["artifacts"]["produced"]:
            lines.append("Artifacts: " + ", ".join(doc["artifacts"]["produced"]))
    except (OSError, ValueError, KeyError, TypeError):
        return ""
    return "\n".join(lines)
