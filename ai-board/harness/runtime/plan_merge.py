"""Gộp subtask cùng file trước khi validate plan (một file/subtask) và giữ DAG không chu trình."""
from __future__ import annotations


def acyclic_edges(edges: dict[int, list[int]]) -> dict[int, list[int]]:
    """Bỏ dần cạnh phụ thuộc tạo chu trình, ưu tiên cạnh theo thứ tự plan (dep < node)."""
    kept: dict[int, list[int]] = {node: [] for node in edges}

    def reaches(src: int, dst: int, seen: set[int]) -> bool:
        if src == dst:
            return True
        return any(reaches(nxt, dst, seen | {nxt}) for nxt in kept.get(src, []) if nxt not in seen)

    for node in sorted(edges, reverse=True):
        for dep in edges[node]:
            kept[node].append(dep)
            if reaches(dep, node, {dep}):
                kept[node].pop()
    return kept


def merge_same_file(subtasks: list[dict]) -> list[dict]:
    """Gộp các subtask cùng file; nối title/verify, giữ layer/size, remap depends_on."""
    order: list[int] = []
    merged: dict[int, dict] = {}
    for index, task in enumerate(subtasks, start=1):
        file = str(task.get("file") or "").strip()
        same = next((i for i in order if file and str(merged[i].get("file") or "").strip() == file), None)
        if same is None:
            order.append(index)
            merged[index] = {**task, "_deps": list(task.get("depends_on") or [])}
            continue
        target = merged[same]
        target["title"] = f"{target.get('title')} + {task.get('title')}"
        target["verify"] = "; ".join(x for x in (str(target.get("verify") or ""), str(task.get("verify") or "")) if x)
        if str(task.get("size") or "") == "large":
            target["size"] = "large"
        for field in ("layer", "task_type"):
            if not target.get(field) and task.get(field):
                target[field] = task[field]
        target["_deps"] = [*target["_deps"], *(task.get("depends_on") or [])]
    remap = {old: new for new, old in enumerate(order, start=1)}
    edges = {}
    for old in order:
        deps = sorted({remap[d] for d in merged[old]["_deps"] if d in remap and remap[d] != remap[old]})
        edges[remap[old]] = deps
    acyclic = acyclic_edges(edges)
    out = []
    for old in order:
        task = {k: v for k, v in merged[old].items() if k != "_deps"}
        task["depends_on"] = acyclic[remap[old]]
        out.append(task)
    return out
