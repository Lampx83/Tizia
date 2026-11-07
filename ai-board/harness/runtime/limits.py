"""Limits từ server/ai-board/contract.json: đọc một lần, env chỉ override khi đo."""
from __future__ import annotations

import hashlib
import json
import os
from functools import lru_cache
from pathlib import Path

from settings import get_settings

CONTRACT_PATH = Path(__file__).resolve().parents[3] / "server" / "ai-board" / "contract.json"
_FLOAT_KEYS = {"wall_clock_s", "child_wall_clock_s", "node_wall_clock_s"}


def truthy(raw) -> bool:
    """Flag env value on: 1/true/on/yes (case-insensitive)."""
    return str(raw or "").strip().lower() in ("1", "true", "on", "yes")


@lru_cache(maxsize=1)
def _raw() -> bytes:
    return CONTRACT_PATH.read_bytes()


@lru_cache(maxsize=1)
def _parsed() -> dict:
    return json.loads(_raw())


def contract() -> dict:
    return _parsed()


def config_sha256() -> str:
    return hashlib.sha256(_raw()).hexdigest()


def _num(env, key, default, cast):
    raw = env.get(key)
    return default if raw in (None, "") else cast(raw)


def tri_state(value, spec):
    """Tri-state flag: None = contract default_enabled."""
    return spec["default_enabled"] if value is None else value


def loop(env=None) -> dict:
    """Trần vòng lặp tool theo subtask; AI_BOARD_LOOP_MODEL_CALLS / _TOOL_CALLS override.
    Bật progress loop thì trần mềm nâng theo limits.progress: bước còn tiến bộ không bị cắt, còn trần thật là
    budget/wall clock/quyền."""
    settings = get_settings(env)
    spec = _parsed()["limits"]["loop"]
    moving = progress(env)
    return {
        "model_calls": settings.loop_model_calls or (moving["loop_model_calls"] if moving["enabled"] else spec["model_calls"]),
        "tool_calls": settings.loop_tool_calls or (moving["loop_tool_calls"] if moving["enabled"] else spec["tool_calls"]),
        "repeats": spec["repeats"],
        "error_chars": spec["error_chars"],
        "observation_tokens": {k: v for k, v in spec["observation_tokens"].items() if not k.startswith("_")},
    }


def loop_adaptive(env=None) -> dict:
    """Soft budget + stuck rules for the tool loop; flag AI_BOARD_ADAPTIVE_BUDGET (contract default) gates their use.
    Progress loop implies it: that flag already replaces the fixed round caps this soft budget belonged to."""
    spec = _parsed()["limits"]["loop"]
    flag = get_settings(env).adaptive_budget
    return {
        "enabled": tri_state(flag, spec) or progress(env)["enabled"],
        "soft_start": spec["soft_start"],
        "soft_step": spec["soft_step"],
        "same_call_repeats": spec["stuck"]["same_call_repeats"],
        "no_progress_steps": spec["stuck"]["no_progress_steps"],
    }


def progress(env=None) -> dict:
    """Progress window + strategy caps; flag AI_BOARD_PROGRESS_LOOP (contract default) gates their use."""
    spec = _parsed()["limits"]["progress"]
    flag = get_settings(env).progress_loop
    return {**{k: v for k, v in spec.items() if not k.startswith("_")},
            "enabled": tri_state(flag, spec)}


def repair_agent(env=None) -> dict:
    """Repair agent role + caps; flag AI_BOARD_MODEL_REPAIR (contract default) gates their use."""
    spec = _parsed()["limits"]["repair_agent"]
    flag = get_settings(env).model_repair
    return {**{k: v for k, v in spec.items() if not k.startswith("_")}, "enabled": tri_state(flag, spec)}


def react_plan(env=None) -> dict:
    """Gate 2 ReAct loop caps + stuck rules; flag AI_BOARD_REACT_PLAN (contract default) gates use."""
    spec = _parsed()["limits"]["react_plan"]
    flag = get_settings(env).react_plan
    return {
        "enabled": tri_state(flag, spec),
        "model_calls": spec["model_calls"],
        "tool_calls": spec["tool_calls"],
        "max_tokens": spec["max_tokens"],
        "observation_tokens": spec["observation_tokens"],
        "soft_start": spec["soft_start"],
        "soft_step": spec["soft_step"],
        "same_call_repeats": spec["stuck"]["same_call_repeats"],
        "no_progress_steps": spec["stuck"]["no_progress_steps"],
    }


def brainstorm() -> dict:
    """Cap of one one-shot plan reply (gates/brainstorm.py), from limits.brainstorm."""
    return dict(_parsed()["limits"]["brainstorm"])


def gpu_wait() -> dict:
    """Backoff after a failed model preflight: {backoff_s, max_s} from limits.gpu_wait (LF/100)."""
    spec = _parsed()["limits"]["gpu_wait"]
    return {"backoff_s": float(spec["backoff_s"]), "max_s": float(spec["max_s"])}


def budget(env=None) -> dict:
    """Mặc định Budget + ChildBudget; BUDGET_MAX_<KEY> override từng khoá (trừ child_*)."""
    env = os.environ if env is None else env
    out = {}
    for key, default in _parsed()["limits"]["budget"].items():
        if key.startswith("_"):
            continue
        cast = float if key in _FLOAT_KEYS else int
        out[key] = cast(default if key.startswith("child_") else _num(env, f"BUDGET_MAX_{key.upper()}", default, cast))
    return out


def thread_chars() -> int:
    return _parsed()["limits"]["context"]["thread_chars"]


def sandbox_client() -> dict:
    spec = _parsed()["limits"]["sandbox_client"]
    return {**spec, "backoff_s": tuple(spec["backoff_s"])}


def sandbox_tool(env=None) -> dict:
    """run_in_sandbox limits; enabled only when flag env == "1" (contract default off)."""
    spec = _parsed()["limits"]["sandbox_tool"]
    return {**spec, "enabled": get_settings(env).sandbox_tool, "allowed_argv": [tuple(p) for p in spec["allowed_argv"]]}


def scaled_limit(kind: str, n: int) -> int:
    """Trần mỗi lượt theo số subtask n, cùng công thức với store-contract.js scaledLimit."""
    limits = _parsed()["limits"]
    spec = limits["per_run"][kind]
    count = min(max(int(n or 0), 0), limits["max_subtasks_per_run"])
    return min(spec["base"] + spec["per_subtask"] * count, spec["max"])


def run_wall_clock_s(n: int, *, local: bool) -> float:
    """Trần giây cả run theo số subtask n; vllm/ollama (local) = base + node_wall_clock_s·n, api = scaled_limit."""
    if not local:
        return float(scaled_limit("wall_clock_s", n))
    spec = _parsed()["limits"]["local_wall_clock_s"]
    count = min(max(int(n or 0), 0), _parsed()["limits"]["max_subtasks_per_run"])
    return float(min(spec["base"] + _parsed()["limits"]["budget"]["node_wall_clock_s"] * count, spec["max"]))


def loop_guard() -> dict:
    """Ngưỡng chống vòng lặp: lặp hash trạng thái, tương đồng sửa, cửa sổ topology, trần an toàn số vòng sửa."""
    return dict(_parsed()["limits"]["loop_guard"])
