"""Cấu hình bật/tắt, mode, URL, đường dẫn, secret của harness: nơi duy nhất đọc biến môi trường AI_BOARD_*.
Giới hạn số (budget, loop, thời gian) ở server/ai-board/contract.json qua runtime/limits.py, không ở đây."""
from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Annotated, Literal, Mapping
from urllib.parse import urlparse

from pydantic import SecretStr, ValidationError, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

DEFAULT_GATE25_FIXES = frozenset({"quotes", "ellipsis"})


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
    model_repair: bool | None = None
    sandbox_tool: bool = False
    skill_select: bool | None = None
    multimodal: bool = False
    verified_loop: bool = False
    context_compaction: bool = False
    graph_persistence: bool = False
    plan_repair: bool = False
    prompt_role_split: bool = False
    procedure_in_split: bool = False  # tạm thời để đo LF/166; gỡ khi có kết quả
    gate25_answered: bool = False
    gate25_sim_user: bool = False
    private_preview_enabled: bool = False
    model_routing: bool = False
    oracle_css_size: bool = False

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

    # secret; worker.take_secret vẫn đọc-rồi-xoá key của chính nó khỏi môi trường
    internal_key: SecretStr = SecretStr("")

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


def get_settings(env: Mapping[str, str] | None = None) -> Settings:
    """Settings từ os.environ (hoặc mapping env); cache theo giá trị các biến liên quan nên đổi env là có hiệu lực ngay."""
    src = os.environ if env is None else env
    return _build(tuple((k, src[k]) for k in _env_names() if src.get(k) not in (None, "") or (k in KEEP_EMPTY and k in src)))


def reset_settings() -> None:
    """Xoá cache; dùng trong test."""
    _build.cache_clear()
