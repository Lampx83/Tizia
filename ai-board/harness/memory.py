"""Long-term memory: bài học từ các verdict trước, 1 dòng JSONL mỗi bài học, ở máy worker
(ai-board/memory/, gitignored, không DB). Cổng 3 truy xuất lại bằng khớp path + từ khoá.
"""
from __future__ import annotations

import json
import time
from pathlib import Path

DEFAULT_PATH = Path(__file__).resolve().parents[1] / "memory" / "lessons.jsonl"
MAX_SCAN = 500  # ponytail: quét tuyến tính N dòng cuối; đổi sang index khi file lớn thật sự
_OUTCOME = {"fixed": "đã sửa được", "blocked": "vẫn bị chặn"}


def record(path: str | Path, lessons: list[dict]) -> None:
    """Append lessons {files, gate, failure_class, reason, outcome, ticket} kèm thời điểm."""
    if not lessons:
        return
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    now = int(time.time())
    with path.open("a", encoding="utf-8") as fh:
        for lesson in lessons:
            fh.write(json.dumps({**lesson, "reason": str(lesson["reason"])[:300], "at": now},
                                ensure_ascii=False) + "\n")


def recall(path: str | Path, file: str, words: list[str], *, limit: int = 3) -> list[str]:
    """Tối đa `limit` bài học liên quan, mới nhất trước: cùng file (điểm 2) hơn chỉ khớp từ khoá (điểm 1)."""
    path = Path(path)
    if not path.is_file():
        return []
    scored = []
    for line in path.read_text(encoding="utf-8").splitlines()[-MAX_SCAN:]:
        try:
            lesson = json.loads(line)
        except ValueError:
            continue  # dòng hỏng do ghi dở — bỏ qua, không làm cổng 3 sập
        reason = str(lesson.get("reason", ""))
        score = 2 if file in (lesson.get("files") or []) else int(any(w in reason.lower() for w in words))
        if score:
            scored.append((score, lesson.get("at", 0), lesson))
    scored.sort(key=lambda item: item[:2], reverse=True)
    return [f"- [cổng {s[2].get('gate')}] {', '.join(s[2].get('files') or [])}: {s[2].get('reason')} "
            f"({_OUTCOME.get(s[2].get('outcome'), s[2].get('outcome'))})" for s in scored[:limit]]
