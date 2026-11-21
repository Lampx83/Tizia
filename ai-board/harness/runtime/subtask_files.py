"""File list of a subtask. Flag off: `file` only, `files` ignored. Flag on: plan-approved `file` + `files`."""
from __future__ import annotations

import posixpath
import re
import unicodedata
from pathlib import PurePosixPath, PureWindowsPath

from runtime import limits
from settings import get_settings


def enabled() -> bool:
    return get_settings().multi_file_subtask


def _norm(path: str) -> str:
    return posixpath.normpath(unicodedata.normalize("NFC", path.strip()).replace("\\", "/"))


def _extras(task: dict) -> list[str]:
    primary = _norm(str(task.get("file") or ""))
    found = [_norm(item) for item in task.get("files") or [] if isinstance(item, str)]
    return [path for path in dict.fromkeys(found) if path != primary]


def files_of(task: dict) -> list[str]:
    """Primary file first; extras only when the flag is on."""
    primary = _norm(str(task.get("file") or ""))
    return [primary, *_extras(task)] if enabled() else [primary]


def declared(task: dict) -> bool:
    """Flag on and the subtask lists its own allowed_scope."""
    return enabled() and "allowed_scope" in task


def is_multi(task: dict) -> bool:
    return len(files_of(task)) > 1


def _doubled(task: dict) -> bool:
    return len(files_of(task)) >= 3 and get_settings().budget_by_file_count


def budget_factor(task: dict) -> int:
    """Số file, chặn ở limits.loop.file_factor_max; plan từ 3 file nhân đôi khi budget_by_file_count bật."""
    n = min(len(files_of(task)), limits.loop()["file_factor_max"])
    return 2 * n if _doubled(task) else n


def wall_clock_factor(task: dict) -> int:
    return 2 if _doubled(task) else 1


def _check_shape(index: int, raw, key: str = "files") -> None:
    if not isinstance(raw, list) or not raw:
        raise ValueError(f"subtask[{index}].{key} phải là mảng chuỗi không rỗng")
    for item in raw:
        if not isinstance(item, str) or not item.strip():
            raise ValueError(f"subtask[{index}].{key} phải là mảng chuỗi không rỗng")
        if (PurePosixPath(item).is_absolute() or PureWindowsPath(item).is_absolute()
                or ".." in re.split(r"[\\/]", item) or "\x00" in item
                or _norm(item) == "." or _norm(item).startswith("../")):
            raise ValueError(f"subtask[{index}].{key} path không hợp lệ: {item!r}")


def _declared_extras(index: int, task: dict) -> list[str] | None:
    """Extras implied by `allowed_scope` (primary must be listed); None when undeclared."""
    if "allowed_scope" not in task:
        return None
    _check_shape(index, task["allowed_scope"], "allowed_scope")
    scope = list(dict.fromkeys(_norm(item) for item in task["allowed_scope"]))
    primary = _norm(str(task.get("file") or ""))
    if primary not in scope:
        raise ValueError(f"subtask[{index}].allowed_scope phải gồm file chính '{primary}'")
    extras = [path for path in scope if path != primary]
    if "files" in task:
        _check_shape(index, task["files"])
    if "files" in task and {_norm(item) for item in task["files"] if isinstance(item, str)} - {primary} != set(extras):
        raise ValueError(f"subtask[{index}].files không khớp allowed_scope")
    return extras


def validate(plan: dict) -> None:
    """Flag off: drop `files` and `allowed_scope`. Flag on: shape, normalize in place, no file shared by two subtasks. Raise ValueError."""
    tasks = [task for task in plan.get("subtasks") or [] if isinstance(task, dict)]
    if not enabled():
        for task in tasks:
            task.pop("files", None)
            task.pop("allowed_scope", None)
        return
    owner: dict[str, int] = {}
    for index, task in enumerate(tasks):
        declared = _declared_extras(index, task)
        if declared is not None:
            task["files"] = declared
        if "files" in task and declared is None:
            _check_shape(index, task["files"])
        extras = _extras(task)
        if extras:
            task["files"] = extras
        else:
            task.pop("files", None)
        if declared is not None:
            task["allowed_scope"] = files_of(task)
        for path in files_of(task):
            if path in owner and owner[path] != index:
                raise ValueError(f"file '{path}' thuộc 2 subtask ({owner[path]} và {index}) — gộp thành 1")
            owner[path] = index
