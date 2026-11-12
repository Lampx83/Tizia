"""Cấu hình bật/tắt, mode, URL, đường dẫn, secret của harness: nơi duy nhất đọc biến môi trường AI_BOARD_*.
Giới hạn số (budget, loop, thời gian) ở server/ai-board/contract.json qua runtime/limits.py, không ở đây."""
from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Annotated, Literal, Mapping
from urllib.parse import urlparse

from pydantic import Field, SecretStr, ValidationError, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

DEFAULT_GATE25_FIXES = frozenset({"quotes", "ellipsis"})
DEFAULT_PR_BASE = "dev"  # AI Board PRs only ever target dev
DEFAULT_TTL_DAYS = 30.0


def _csv(value):
    if isinstance(value, str):
        return tuple(p.strip() for p in value.split(",") if p.strip())
    return value


def _http_url(value):
    if value is None:
        return value
    parsed = urlparse(value)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        raise ValueError("must be an http(s) URL")
    return value


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="AI_BOARD_", env_ignore_empty=True, extra="ignore", frozen=True,
                                      case_sensitive=False)

    # flag bật/tắt; None = theo mặc định trong contract.json
    adaptive_budget: bool | None = None
    react_plan: bool | None = None
    progress_loop: bool | None = None
    observation_raise: bool | None = None
    model_repair: bool | None = None
    repair_diagnose: bool = False
    sandbox_tool: bool = False
    skill_select: bool | None = None
    multimodal: bool = False
    verified_loop: bool = False
    context_compaction: bool = False
    tool_native: bool = False
    thinking_budget: bool = False
    multi_file_subtask: bool = False
    multi_file_max: int = Field(default=3, ge=2, le=6)
    graph_persistence: bool = False
    plan_repair: bool = False
    repair_same_session: bool = False
    repair_sampling_diversity: bool = False
    scope_first_warning: bool = False
    prompt_role_split: bool = False
    procedure_in_split: bool = False  # tạm thời để đo LF/166; gỡ khi có kết quả
    gate25_answered: bool = False
    gate25_sim_user: bool = False
    private_preview_enabled: bool = False
    model_routing: bool = False
    oracle_css_size: bool = False
    text_oracle_skip_selector: bool = False
    compile_prose_verify: bool = False
    gate1_unified_verify: bool = False  # gate 1: một định nghĩa verify chạy được (có grep/rg); layer chỉ ép verify ở feature plan
    stop_report_v2: bool = False
    call_executor: bool = False  # runtime/call_executor.py: one retry/failover owner; off = legacy loops
    explore_low_confidence: bool = False
    state_file: bool = False
    gate1_arbiter: bool = False
    gate1_arbiter_min: float = Field(default=0.97, ge=0.5, le=1.0)
    verify_preloaded_bases: bool = False  # gate 5 guest: FROM node:20-alpine@sha256 pin → tag (base preloaded without digest)
    no_oracle_review_any: bool = False  # gate 5: không oracle + smoke xanh + không có generated test → needs_review thay vì block
    admin_requester_trust: bool = False  # gate 1: người gửi role admin (server xác thực) không bị chặn privileged_area

    # trần vòng lặp tool theo subtask (đo có chủ đích); None/<=0 = theo contract.json
    loop_model_calls: int | None = None
    loop_tool_calls: int | None = None
    fanout_max: int = 2  # số model call song song mỗi lớp DAG, kẹp 1..4
    checkpoint_ttl_days: float = DEFAULT_TTL_DAYS
    skill_pad_chars: int = Field(default=0, ge=0)

    # mode
    tool_loop: Literal["", "1", "auto"] = ""
    best_match: Literal["enforce", "advisory"] = "enforce"
    retrieval: Literal["", "literal", "model"] = ""
    gate3_context: Literal["excerpt", "hybrid"] = "hybrid"  # hybrid: cả file khi vừa ngưỡng; excerpt: luôn trích (replay pin)
    verify_network: Literal["published", "internal"] = "published"
    worker_mode: Literal["off", "shadow", "active"] = "off"

    # tập cờ phân tách phẩy
    gate25_fixes: Annotated[frozenset[str], NoDecode] = DEFAULT_GATE25_FIXES
    gate3_guards: Annotated[frozenset[str], NoDecode] = frozenset()
    skill_variant: Annotated[tuple[str, ...], NoDecode] = ()

    # model, URL, đường dẫn
    classifier_model: str = ""
    vision_model: str = ""
    project: str = "tizia"
    worker_version: str = "d0"
    github_repo: str = "Lampx83/Tizia"
    local_forge: str | None = None
    server_url: str | None = None
    engine_url: str | None = None
    sandbox_url: str | None = None
    sandbox_token_file: Path = Path("/run/secrets/sandbox-runner-token")
    owned_run_file: Path | None = None
    repo_dir: Path | None = None
    workspace: Path | None = None
    uploads_dir: Path | None = None
    eval_dir: Path | None = None
    eval_node_modules: Path | None = None
    qwen_tokenizer: Path | None = None
    retrieval_weights: Path | None = None

    gate1_probe_timeout_s: float = 45.0
    reasoning_off: str = ""

    # secret; worker.take_secret vẫn đọc-rồi-xoá key của chính nó khỏi môi trường
    internal_key: SecretStr = SecretStr("")

    @field_validator("gate1_probe_timeout_s")
    @classmethod
    def _probe_timeout(cls, value):
        if not 1.0 <= value <= 300.0:
            raise ValueError("must be within 1..300 seconds")
        return value

    @field_validator("loop_model_calls", "loop_tool_calls", mode="after")
    @classmethod
    def _loop_cap(cls, value):
        return value if value is None or value > 0 else None

    @field_validator("checkpoint_ttl_days", mode="after")
    @classmethod
    def _ttl(cls, value):
        return value if value > 0 else DEFAULT_TTL_DAYS

    @field_validator("fanout_max", mode="after")
    @classmethod
    def _fanout(cls, value):
        return min(max(value, 1), 4)

    @field_validator("tool_loop", mode="before")
    @classmethod
    def _mode_text(cls, value):
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("retrieval", mode="before")
    @classmethod
    def _retrieval(cls, value):
        value = str(value).strip().lower()
        return value if value in ("literal", "model") else ""

    @field_validator("best_match", mode="before")
    @classmethod
    def _best_match(cls, value):
        return "advisory" if str(value).strip().lower() == "advisory" else "enforce"

    @field_validator("gate25_fixes", "gate3_guards", mode="before")
    @classmethod
    def _set_text(cls, value):
        parsed = _csv(value)
        return frozenset(parsed) if isinstance(parsed, tuple) else parsed

    @field_validator("skill_variant", mode="before")
    @classmethod
    def _tuple_text(cls, value):
        return _csv(value)

    @field_validator("server_url", "engine_url", "sandbox_url", mode="after")
    @classmethod
    def _urls(cls, value):
        return _http_url(value)

    @classmethod
    def settings_customise_sources(cls, settings_cls, init_settings, env_settings, dotenv_settings, file_secret_settings):
        return (init_settings,)  # env đọc ở get_settings


PREFIX = Settings.model_config["env_prefix"]
KEEP_EMPTY = {"AI_BOARD_GATE25_FIXES"}  # rỗng nghĩa là tắt hết, khác với không đặt


@lru_cache(maxsize=64)
def _build(snapshot: tuple) -> Settings:
    try:
        return Settings(**{k[len(PREFIX):].lower(): v for k, v in snapshot})
    except ValidationError as error:
        detail = "; ".join(f"{PREFIX}{'_'.join(map(str, e['loc'])).upper()}={e['input']!r}: {e['msg']}" for e in error.errors())
        raise ValueError(f"cấu hình sai: {detail}") from None


def _env_names() -> tuple[str, ...]:
    return tuple(f"{PREFIX}{name}".upper() for name in Settings.model_fields)


def retrieval_choice(env: Mapping[str, str] | None = None) -> str:
    """Raw AI_BOARD_RETRIEVAL: mode it names, "off" when it is set to anything else, "" when unset (request decides)."""
    src = os.environ if env is None else env
    if "AI_BOARD_RETRIEVAL" not in src:
        return ""
    value = str(src["AI_BOARD_RETRIEVAL"] or "").strip().lower()
    return value if value in ("literal", "model") else "off"


def pr_base(env: Mapping[str, str] | None = None) -> str:
    """PR_BASE_BRANCH (không prefix AI_BOARD_); rỗng = mặc định dev."""
    src = os.environ if env is None else env
    return src.get("PR_BASE_BRANCH") or DEFAULT_PR_BASE


def get_settings(env: Mapping[str, str] | None = None) -> Settings:
    """Settings từ os.environ (hoặc mapping env); cache theo giá trị các biến liên quan nên đổi env là có hiệu lực ngay."""
    src = os.environ if env is None else env
    return _build(tuple((k, src[k]) for k in _env_names() if src.get(k) not in (None, "") or (k in KEEP_EMPTY and k in src)))


def reset_settings() -> None:
    """Xoá cache; dùng trong test."""
    _build.cache_clear()
