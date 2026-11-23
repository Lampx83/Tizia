"""Limits từ server/ai-board/contract.json: đọc một lần, env chỉ override khi đo."""
from __future__ import annotations

import argparse
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


def oracle_validation() -> dict:
    """Contract evaluation.oracle_validation: label count and rate minimums a soft check needs before it may decide a verdict."""
    return dict(_parsed()["evaluation"]["oracle_validation"])


def quality_checks() -> dict:
    """Contract quality_checks: check -> {class hard|soft, metric, threshold}."""
    return {k: dict(v) for k, v in _parsed()["quality_checks"].items() if not k.startswith("_")}


def quality_class(check: str) -> str:
    """'hard' or 'soft'; unlisted check is hard."""
    return quality_checks().get(check, {}).get("class", "hard")


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
        "file_factor_max": spec["file_factor_max"],
        "repeats": spec["repeats"],
        "error_chars": spec["error_chars"],
        "compaction_tokens": spec["compaction_tokens"],
        "observation_tokens": observation_tokens(env),
    }


def api_limits(role=None, env=None) -> dict:
    """Hosted-API caps. Precedence: AI_BOARD_API_MAX_TOKENS_<ROLE> > AI_BOARD_API_MAX_TOKENS > contract; CLI flags set the env."""
    spec, settings = _parsed()["limits"]["api"], get_settings(env)
    per_role = getattr(settings, f"api_max_tokens_{role}", None) if role else None
    rpm = settings.api_rpm
    return {
        "max_tokens": per_role or settings.api_max_tokens or spec["max_tokens"].get(role),
        "context": settings.api_context_tokens or spec["context_window_tokens"],
        "compaction": spec["compaction_tokens"],
        "reasoning_extra": spec["reasoning_extra_tokens"],
        "run_tokens": settings.api_run_tokens or spec["run_tokens"],
        "rpm": spec["requests_per_minute"] if rpm is None else rpm,
    }


def _positive(text):
    try:
        value = int(text)
    except ValueError:
        value = 0
    if value <= 0:
        raise argparse.ArgumentTypeError("must be a positive integer")
    return value


def add_api_args(parser) -> None:
    parser.add_argument("--api-max-tokens", type=_positive, help="hosted API: max output tokens for every role (AI_BOARD_API_MAX_TOKENS)")
    parser.add_argument("--api-run-tokens", type=_positive, help="hosted API: per-run token ceiling (AI_BOARD_API_RUN_TOKENS)")


def apply_api_args(args) -> None:
    """CLI beats env: set the env the run reads."""
    for name, var in (("api_max_tokens", "AI_BOARD_API_MAX_TOKENS"), ("api_run_tokens", "AI_BOARD_API_RUN_TOKENS")):
        if getattr(args, name, None):
            os.environ[var] = str(getattr(args, name))


def repair_sampling() -> dict:
    """Contract repair_sampling: from_attempt, temperature."""
    spec = _parsed()["limits"]["repair_sampling"]
    return {"from_attempt": int(spec["from_attempt"]), "temperature": float(spec["temperature"])}


def observation_tokens(env=None) -> dict:
    """Trần token quan sát theo tool; flag AI_BOARD_OBSERVATION_RAISE nới read_file và grep (contract loop.observation_raise)."""
    spec = _parsed()["limits"]["loop"]
    caps = {k: v for k, v in spec["observation_tokens"].items() if not k.startswith("_")}
    raise_spec = spec["observation_raise"]
    if tri_state(get_settings(env).observation_raise, raise_spec):
        caps.update(raise_spec["observation_tokens"])
    return caps


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


def prompt_cap_chars(name: str) -> int:
    """Contract limits.prompt_caps `<name>_tokens` -> chars."""
    spec = _parsed()["limits"]["prompt_caps"]
    return spec[f"{name}_tokens"] * spec["chars_per_token"]


def thread_chars() -> int:
    return _parsed()["limits"]["context"]["thread_chars"]


def sandbox_client() -> dict:
    spec = _parsed()["limits"]["sandbox_client"]
    return {**spec, "backoff_s": tuple(spec["backoff_s"])}


def sandbox_tool(env=None, tier: str | None = None) -> dict:
    """run_in_sandbox limits; enabled only when flag env == "1" (contract default off).
    Repo-script argv armed globally (AI_BOARD_SANDBOX_REPO_SCRIPTS) or for `tier` listed in AI_BOARD_SANDBOX_REPO_SCRIPTS_TIERS."""
    spec = _parsed()["limits"]["sandbox_tool"]
    settings = get_settings(env)
    gated = {tuple(p) for p in spec.get("repo_script_argv", [])}
    tiers = {t.strip() for t in settings.sandbox_repo_scripts_tiers.split(",") if t.strip()}
    armed = settings.sandbox_repo_scripts or (tier is not None and tier in tiers)
    argv = [tuple(p) for p in spec["allowed_argv"] if armed or tuple(p) not in gated]
    return {**spec, "enabled": settings.sandbox_tool, "allowed_argv": argv}


def fetch_url() -> dict:
    """fetch_url broker limits: allow_hosts, max_bytes, timeout_s (contract limits.fetch_url)."""
    return dict(_parsed()["limits"]["fetch_url"])


def scaled_limit(kind: str, n: int) -> int:
    """Trần mỗi lượt theo số subtask n, cùng công thức với store-contract.js scaledLimit."""
    limits = _parsed()["limits"]
    spec = limits["per_run"][kind]
    count = max(int(n or 0), 0)
    return min(spec["base"] + spec["per_subtask"] * count, spec["max"])


def run_wall_clock_s(n: int, *, local: bool) -> float:
    """Trần giây cả run theo số subtask n; vllm/ollama (local) = base + node_wall_clock_s·n, api = scaled_limit."""
    if not local:
        return float(scaled_limit("wall_clock_s", n))
    spec = _parsed()["limits"]["local_wall_clock_s"]
    count = max(int(n or 0), 0)
    return float(min(spec["base"] + _parsed()["limits"]["budget"]["node_wall_clock_s"] * count, spec["max"]))


def loop_guard() -> dict:
    """Ngưỡng chống vòng lặp: lặp hash trạng thái, tương đồng sửa, cửa sổ topology, trần an toàn số vòng sửa."""
    return dict(_parsed()["limits"]["loop_guard"])
