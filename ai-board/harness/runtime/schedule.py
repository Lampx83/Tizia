"""DAG scheduler cho executor (LF/107): chia step thành từng lớp độc lập.

Mỗi lớp chỉ chứa step mà mọi depends_on đã xong ở lớp trước. Executor có thể chạy
song song trong một lớp; ngoài lớp thì phải chờ. Kiểm luôn xung đột file đích giữa
các step (hai step không được cùng ghi một file, kể cả ở hai lớp khác nhau).
"""
from __future__ import annotations

from runtime import subtask_files


def prepare(steps: list[dict]) -> list[dict]:
    """Gắn order 1-based + depends_on mặc định chuỗi cũ (bước trước) cho plan chưa khai DAG."""
    prepared = []
    for index, step in enumerate(steps, start=1):
        deps = step.get("depends_on")
        prepared.append({**step, "order": step.get("order", index),
                         "depends_on": list(deps) if deps is not None else ([index - 1] if index > 1 else [])})
    return prepared


def levels(steps: list[dict]) -> list[list[int]]:
    """[[order, ...], ...] theo lớp; raise ValueError nếu depends_on trỏ sai hoặc có chu trình."""
    orders = [int(step["order"]) for step in steps]
    if len(set(orders)) != len(orders):
        raise ValueError("trùng order trong plan")
    known = set(orders)
    deps = {int(step["order"]): {int(dep) for dep in (step.get("depends_on") or [])} for step in steps}
    for order, items in deps.items():
        unknown = items - known
        if unknown:
            raise ValueError(f"step {order} phụ thuộc step không tồn tại: {sorted(unknown)}")
        if order in items:
            raise ValueError(f"step {order} phụ thuộc chính nó")
    done: set[int] = set()
    out: list[list[int]] = []
    while len(done) < len(orders):
        ready = sorted(order for order in orders if order not in done and deps[order] <= done)
        if not ready:
            raise ValueError("depends_on tạo chu trình")
        out.append(ready)
        done.update(ready)
    return out


def target_files(step: dict) -> list[str]:
    """File đích của step: allowed_scope (plan server) hoặc file (subtask cổng 3)."""
    scope = step.get("allowed_scope") or (subtask_files.files_of(step) if step.get("file") else [])
    return [str(item) for item in scope]


def check_conflicts(steps: list[dict]) -> None:
    """Hai step không được cùng một file đích (kể cả khác lớp). Raise ValueError."""
    seen: dict[str, int] = {}
    for step in steps:
        for file in target_files(step):
            owner = seen.get(file)
            if owner is not None:
                raise ValueError(f"step {owner} và {step['order']} cùng ghi {file}")
            seen[file] = int(step["order"])


def schedule(steps: list[dict]) -> dict:
    """{levels, parallel} — parallel=True khi có lớp >1 step độc lập."""
    check_conflicts(steps)
    plan = levels(steps)
    return {"levels": plan, "parallel": any(len(group) > 1 for group in plan)}


def dependency_graph(steps: list[dict]) -> list[dict]:
    """Cho checkpoint: mỗi child (0-based) + file + depends_on (1-based) + level."""
    plan = levels(steps)
    level_of = {order: index for index, group in enumerate(plan) for order in group}
    return [{"child": index, "file": (step.get("allowed_scope") or [None])[0],
             "depends_on": list(step.get("depends_on") or []), "level": level_of[int(step["order"])]}
            for index, step in enumerate(steps)]
