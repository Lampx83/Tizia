"""File list of a subtask. Flag off: `file` only, `files` ignored. Flag on: plan-approved `file` + `files`."""
from __future__ import annotations

import posixpath
import re
import unicodedata
from pathlib import PurePosixPath, PureWindowsPath

from settings import get_settings


def enabled() -> bool:
    return get_settings().multi_file_subtask


def limit() -> int:
    return get_settings().multi_file_max


def _norm(path: str) -> str:
    return posixpath.normpath(unicodedata.normalize("NFC", path.strip()).replace("\\", "/").lstrip("./"))


def _extras(task: dict) -> list[str]:
    primary = _norm(str(task.get("file") or ""))
    found = [_norm(item) for item in task.get("files") or [] if isinstance(item, str)]
    return [path for path in dict.fromkeys(found) if path != primary]


def files_of(task: dict) -> list[str]:
    """Primary file first; extras only when the flag is on."""
    primary = _norm(str(task.get("file") or ""))
    return [primary, *_extras(task)] if enabled() else [primary]


def is_multi(task: dict) -> bool:
    return len(files_of(task)) > 1


def budget_factor(task: dict) -> int:
    return len(files_of(task))


def _check_shape(index: int, raw) -> None:
    if not isinstance(raw, list) or not raw:
        raise ValueError(f"subtask[{index}].files phải là mảng chuỗi không rỗng")
    for item in raw:
        if not isinstance(item, str) or not item.strip():
            raise ValueError(f"subtask[{index}].files phải là mảng chuỗi không rỗng")
        if (PurePosixPath(item).is_absolute() or PureWindowsPath(item).is_absolute()
                or ".." in re.split(r"[\/]", item) or "\x00" in item):
            raise ValueError(f"subtask[{index}].files path không hợp lệ: {item!r}")


def validate(plan: dict) -> None:
    """Flag off: drop `files`. Flag on: shape, total <= limit, normalize in place, no file shared by two subtasks. Raise ValueError."""
    tasks = [task for task in plan.get("subtasks") or [] if isinstance(task, dict)]
    if not enabled():
        for task in tasks:
            task.pop("files", None)
        return
    owner: dict[str, int] = {}
    for index, task in enumerate(tasks):
        if "files" in task:
            _check_shape(index, task["files"])
        extras = _extras(task)
        if extras:
            task["files"] = extras
        else:
            task.pop("files", None)
        if 1 + len(extras) > limit():
            raise ValueError(f"subtask[{index}] có {1 + len(extras)} file, tối đa {limit()}")
        for path in files_of(task):
            if path in owner and owner[path] != index:
                raise ValueError(f"file '{path}' thuộc 2 subtask ({owner[path]} và {index}) — gộp thành 1")
            owner[path] = index
