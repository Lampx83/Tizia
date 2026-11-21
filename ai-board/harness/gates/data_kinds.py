"""Data-change registry: admin data-write APIs a plan data step may target, from contract.json `data_kinds`."""
from __future__ import annotations

import json
import posixpath
import re
from pathlib import Path

from runtime import limits
from settings import get_settings

ENTRY_KEYS = ("summary", "route", "method", "context", "tier", "approver", "capability", "verify", "max_bytes", "schema")
PROMPT = (Path(__file__).resolve().parent.parent / "prompts" / "plan_data_kinds.md").read_text(encoding="utf-8")
_TYPES = {"object": dict, "array": list, "string": str, "boolean": bool, "null": type(None)}


def _json(value) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def enabled() -> bool:
    return bool(get_settings().data_registry)


def kinds() -> dict[str, dict]:
    """Registry entries by kind. Raise ValueError on a malformed entry."""
    found = dict(limits.contract().get("data_kinds", {}).get("kinds", {}))
    for name, entry in found.items():
        if missing := [key for key in ENTRY_KEYS if key not in entry]:
            raise ValueError(f"data_kinds.{name} thiếu {', '.join(missing)}")
    return found


def prompt_block() -> str:
    """Planner section listing every kind; empty when the flag is off."""
    if not enabled():
        return ""
    rows = "\n".join(f"- {name}: {e['summary']} {e['method']} {e['route']}, approver {e['approver']}. Payload schema: "
                     f"{_json(e['schema'])}" for name, e in kinds().items())
    return PROMPT.replace("KINDS_LIST", rows)


def _is(value, kind: str) -> bool:
    if kind in ("integer", "number"):
        return isinstance(value, (int, float)) and not isinstance(value, bool) and (kind == "number" or float(value).is_integer())
    return isinstance(value, _TYPES[kind]) and (kind == "boolean" or not isinstance(value, bool))


def validate(value, schema: dict, path: str = "payload") -> list[str]:
    """Problems of value against a JSON-schema subset; [] when valid."""
    out: list[str] = []
    if "const" in schema and value != schema["const"]:
        return [f"{path} phải bằng {_json(schema['const'])}"]
    if "enum" in schema and value not in schema["enum"]:
        return [f"{path}={_json(value)} không thuộc {_json(schema['enum'])}"]
    kind = schema.get("type")
    if kind and not _is(value, kind):
        return [f"{path} phải là {kind}"]
    if isinstance(value, dict):
        out += [f"{path}.{key} bắt buộc" for key in schema.get("required", []) if key not in value]
        if len(value) < schema.get("minProperties", 0):
            out.append(f"{path} cần ít nhất {schema['minProperties']} khoá")
        if len(value) > schema.get("maxProperties", len(value)):
            out.append(f"{path} tối đa {schema['maxProperties']} khoá")
        props = schema.get("properties", {})
        extra = schema.get("additionalProperties", True)
        for key, item in value.items():
            if key in props:
                out += validate(item, props[key], f"{path}.{key}")
            elif extra is False:
                out.append(f"{path}.{key} không được phép")
            elif isinstance(extra, dict):
                out += validate(item, extra, f"{path}.{key}")
    elif isinstance(value, list):
        if len(value) < schema.get("minItems", 0) or len(value) > schema.get("maxItems", len(value)):
            out.append(f"{path} sai số phần tử")
        for i, item in enumerate(value if "items" in schema else []):
            out += validate(item, schema["items"], f"{path}[{i}]")
    elif isinstance(value, str):
        if len(value) < schema.get("minLength", 0) or len(value) > schema.get("maxLength", len(value)):
            out.append(f"{path} sai độ dài")
        if "pattern" in schema and not re.search(schema["pattern"], value):
            out.append(f"{path} không khớp {schema['pattern']}")
    elif isinstance(value, (int, float)) and not isinstance(value, bool):
        if value < schema.get("minimum", value) or value > schema.get("maximum", value):
            out.append(f"{path} ngoài khoảng cho phép")
    return out


def check(change, index: int = 0) -> dict:
    """Validate one data change against its kind; return the normalized plan item. Raise ValueError with the reason."""
    where = f"data_changes[{index}]"
    if not isinstance(change, dict):
        raise ValueError(f"{where} không phải object")
    if not isinstance(change.get("title"), str) or not change["title"].strip():
        raise ValueError(f"{where} thiếu title")
    payload = change.get("payload")
    if not isinstance(payload, dict):
        raise ValueError(f"{where}.payload phải là object")
    registry = kinds()
    kind = payload.get("kind")
    if kind not in registry:
        raise ValueError(f"{where}: kind {kind!r} không có trong registry ({', '.join(registry) or 'rỗng'})")
    entry = registry[kind]
    if problems := validate(payload, entry["schema"], f"{where}.payload"):
        raise ValueError("; ".join(problems[:5]))
    if len(json.dumps(payload, ensure_ascii=False).encode("utf-8")) > entry["max_bytes"]:
        raise ValueError(f"{where}.payload vượt {entry['max_bytes']} byte")
    links = {}
    for field in ("depends_on", "required_by"):
        links[field] = change.get(field, [])
        if not isinstance(links[field], list) or any(not isinstance(n, int) or isinstance(n, bool) for n in links[field]):
            raise ValueError(f"{where}.{field} phải là mảng số thứ tự subtask")
    keep = entry["schema"].get("properties")
    payload = {key: payload[key] for key in payload if keep is None or key in keep}
    if entry.get("review") == "db_insert":
        from services import db_approval
        if problems := db_approval.insert_problems(payload["sql"]):
            raise ValueError(f"{where}: " + "; ".join(problems[:3]))
    return {"title": change["title"].strip(), **links, "payload": payload}


def data_only(plan: dict) -> bool:
    """Flag on and the plan has data changes but no file subtask."""
    return enabled() and bool(plan.get("data_changes")) and not plan.get("subtasks")


def _cyclic(plan: dict) -> bool:
    """True when subtask depends_on, data depends_on and required_by together form a cycle."""
    size = len(plan.get("subtasks") or [])
    edges = {i: list(st.get("depends_on") or []) for i, st in enumerate(plan.get("subtasks") or [], 1)}
    for offset, item in enumerate(plan["data_changes"], size + 1):
        edges[offset] = list(item["depends_on"])
        for n in item["required_by"]:
            edges[n].append(offset)
    state: dict[int, int] = {}

    def visit(node: int) -> bool:
        if state.get(node) == 1:
            return True
        if state.get(node) == 2:
            return False
        state[node] = 1
        if any(visit(dep) for dep in edges.get(node, [])):
            return True
        state[node] = 2
        return False
    return any(visit(node) for node in edges)


def apply(plan: dict) -> None:
    """Flag on: validate plan['data_changes'] in place. Flag off: leave the plan untouched."""
    if not enabled() or "data_changes" not in plan:
        return
    items = plan["data_changes"]
    if not isinstance(items, list):
        raise ValueError("data_changes phải là mảng")
    plan["data_changes"] = [check(item, i) for i, item in enumerate(items)]
    size = len(plan.get("subtasks") or [])
    for item in plan["data_changes"]:
        for field in ("depends_on", "required_by"):
            if any(not 1 <= n <= size for n in item[field]):
                raise ValueError(f"data_changes.{field} ngoài 1..{size}")
    if _cyclic(plan):
        raise ValueError("data_changes tạo vòng phụ thuộc với subtask")


def steps(plan: dict, first_order: int, file_steps: list[dict] | None = None) -> list[dict]:
    """Server-schema data steps for a checked plan, ordered after the file steps.
    file_steps given: link required_by into their depends_on in place; plan subtask numbers map through the same-file merge."""
    if not enabled():
        return []
    registry, out = kinds(), []
    shifted = _merged_numbers(plan, file_steps) if file_steps is not None else {}

    def mapped(n: int) -> int:
        return shifted.get(n, n)

    for offset, item in enumerate(plan.get("data_changes") or []):
        entry = registry[item["payload"]["kind"]]
        order = first_order + offset
        for n in item.get("required_by") or []:
            target = file_steps[mapped(n) - 1]
            target["depends_on"] = sorted({*target["depends_on"], order})
        out.append({"order": order, "title": item["title"], "description": item["title"], "allowed_scope": [],
                    "acceptance": [entry["verify"]], "tests": [entry["verify"]], "capability": entry["capability"], "risk": "low",
                    "non_goals": ["Worker không ghi dữ liệu; admin áp dụng payload."], "layer": "data",
                    "depends_on": [mapped(n) for n in item["depends_on"]], "payload": item["payload"]})
    return out


def _merged_numbers(plan: dict, file_steps: list[dict]) -> dict[int, int]:
    """Raw subtask number -> file step order, after same-file subtasks were merged."""
    where = {step["allowed_scope"][0]: step["order"] for step in file_steps if step["allowed_scope"]}
    return {n: where[file] for n, st in enumerate(plan.get("subtasks") or [], 1)
            if (file := posixpath.normpath(str(st.get("file") or "").replace("\\", "/"))) in where}


def sandbox(data_steps: list[dict], should_stop=None) -> None:
    """Run every db_insert step on the sandbox PG with the base schema; stamp step['db_check']. Raise ValueError unless passed."""
    if not enabled():
        return
    from services import db_approval
    registry = kinds()
    for step in data_steps:
        if "payload" not in step or registry[step["payload"]["kind"]].get("review") != "db_insert":
            continue
        outcome = db_approval.evaluate_insert(step["payload"]["sql"], should_stop)
        if outcome["status"] != "passed":
            raise ValueError(f"data step {step['order']}: {outcome['reason']}")
        step["db_check"] = {"status": "passed", "profile": "db_check"}
