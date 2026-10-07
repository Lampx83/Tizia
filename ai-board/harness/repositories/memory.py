"""Long-term memory: bài học từ các verdict trước, 1 dòng JSONL mỗi bài học, ở máy worker
(ai-board/memory/, gitignored, không DB). Cổng 3 truy xuất lại bằng khớp path + từ khoá.
prune() giữ thư mục này nhỏ theo limits.memory trong contract.json (worker gọi lúc khởi động).
"""
from __future__ import annotations

import json
import time
from pathlib import Path

DEFAULT_PATH = Path(__file__).resolve().parents[2] / "memory" / "lessons.jsonl"
LIMITS = json.loads((Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json")
                    .read_text(encoding="utf-8"))["limits"]["memory"]
STALE_DAYS = 30
MAX_SCAN = LIMITS["lessons_max"]  # ponytail: quét tuyến tính; prune() giữ file ≤ số dòng này
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


def prune(path: str | Path = DEFAULT_PATH, *, source=None) -> dict:
    """Dọn thư mục memory: lessons ≤ lessons_max dòng mới nhất, bỏ trùng (cùng files + reason, giữ bản mới),
    bỏ bài học quá STALE_DAYS ngày mà mọi file của nó không có ở HEAD của `source` (bài học về file mới chưa merge
    vẫn có ích khi lượt sau tạo lại đúng file đó, nên chỉ bỏ khi đã cũ; None = không kiểm); eval/ giữ eval_keep file
    mới nhất. traces.jsonl tự xoay vòng trong meter.Tracer. Trả số đã bỏ; lỗi I/O → bỏ qua, không raise."""
    path = Path(path)
    dropped = {"lessons": 0, "eval": 0}
    try:
        lines = path.read_text(encoding="utf-8").splitlines() if path.is_file() else []
        alive = None
        if source is not None:
            from repositories import code_index
            alive = set(code_index.git(source, "ls-tree", "-r", "--name-only", "HEAD").decode("utf-8", "replace").split("\n"))
        kept, seen = [], set()
        for line in reversed(lines):
            try:
                lesson = json.loads(line)
            except ValueError:
                continue
            files = lesson.get("files") or []
            key = (tuple(files), lesson.get("reason"))
            gone = alive is not None and files and not any(f in alive for f in files)
            if key in seen or (gone and time.time() - lesson.get("at", 0) > STALE_DAYS * 86400):
                continue
            seen.add(key)
            kept.append(line)
            if len(kept) >= LIMITS["lessons_max"]:
                break
        dropped["lessons"] = len(lines) - len(kept)
        if dropped["lessons"]:
            tmp = path.with_suffix(".tmp")
            tmp.write_text("".join(line + "\n" for line in reversed(kept)), encoding="utf-8")
            tmp.replace(path)
        runs = sorted((path.parent / "eval").glob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
        for old in runs[LIMITS["eval_keep"]:]:
            old.unlink()
            dropped["eval"] += 1
    except OSError as error:
        print(f"[memory] dọn lỗi, bỏ qua: {error}")
    return dropped
