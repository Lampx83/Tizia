"""Case-id list for a suite run: load file, check against corpus, return tasks in sorted-id order."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path


class SelectionError(ValueError):
    pass


def load(path: Path, key: str | None) -> tuple[list[str], str]:
    """Read id list from a JSON array or a dict key; return (ids, sha256 of file bytes)."""
    try:
        raw = Path(path).read_bytes()
    except OSError as error:
        raise SelectionError(f"{path}: không đọc được ({error.strerror})") from error
    try:
        data = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, ValueError) as error:
        raise SelectionError(f"{path}: không phải JSON ({error})") from error
    if isinstance(data, dict):
        if key is None:
            raise SelectionError(f"{path}: file là object, cần --case-key (có: {', '.join(sorted(data))})")
        if key not in data:
            raise SelectionError(f"{path}: không có khóa {key!r}")
        data = data[key]
    if not isinstance(data, list) or not all(isinstance(item, str) for item in data):
        raise SelectionError(f"{path}: cần mảng id (chuỗi)")
    return data, hashlib.sha256(raw).hexdigest()


def select(tasks: list[dict], ids: list[str], split: str) -> list[dict]:
    """Tasks for ids, sorted by id. Refuse duplicates, unknown ids, ids outside split."""
    if not ids:
        raise SelectionError("danh sách id rỗng")
    dupes = sorted({i for i in ids if ids.count(i) > 1})
    if dupes:
        raise SelectionError(f"id trùng lặp: {', '.join(dupes[:10])}")
    by_id = {t["id"]: t for t in tasks}
    unknown = sorted(i for i in ids if i not in by_id)
    if unknown:
        raise SelectionError(f"id không tồn tại trong corpus: {', '.join(unknown[:10])}")
    outside = sorted(i for i in ids if split != "all" and by_id[i]["split"] != split)
    if outside:
        side = by_id[outside[0]]["split"]
        raise SelectionError(f"{len(outside)} id thuộc {side}, không chạy được với --split {split}: {', '.join(outside[:10])}")
    return [by_id[i] for i in sorted(ids)]
