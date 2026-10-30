"""Lọc plan theo bước server cho phép chạy (LF/132): bỏ bước bị chặn và bước phụ thuộc."""
from __future__ import annotations


def runnable_plan(plan: dict, runnable_orders: list[int] | None) -> dict:
    """Plan chỉ giữ step trong runnable_orders; depends_on bỏ bước đã xong ngoài tập. None = giữ nguyên."""
    if runnable_orders is None:
        return plan
    keep = {int(order) for order in runnable_orders}
    steps = [{**step, "depends_on": [dep for dep in step.get("depends_on") or [] if int(dep) in keep]}
             for step in plan.get("steps") or [] if int(step.get("order", 0)) in keep]
    held = sorted({int(step.get("order", 0)) for step in plan.get("steps") or []} - keep)
    return {**plan, "steps": steps, "held_back": held}
