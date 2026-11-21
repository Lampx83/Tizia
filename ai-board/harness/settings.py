"""Cấu hình bật/tắt, mode, URL, đường dẫn, secret của harness: nơi duy nhất đọc biến môi trường AI_BOARD_*.
Giới hạn số (budget, loop, thời gian) ở server/ai-board/contract.json qua runtime/limits.py, không ở đây."""
from __future__ import annotations

import logging
import os
from functools import lru_cache
from pathlib import Path
from typing import Annotated, Literal, Mapping
from urllib.parse import urlparse

from pydantic import Field, SecretStr, ValidationError, field_validator, model_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

DEFAULT_GATE25_FIXES = frozenset({"quotes", "ellipsis"})
DEFAULT_PR_BASE = "dev"  # AI Board PRs only ever target dev
DEFAULT_TTL_DAYS = 30.0
# Owner-approved 2026-11-15 (LF/189); cờ backend_contexts_surface vẫn tắt mặc định.
APPROVED_SURFACE_CONTEXTS = frozenset({"content", "curriculum", "learning", "engagement", "srs", "live-quiz",
                                       "multiplayer", "campus", "seo", "dashboard"})


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
    sandbox_repo_scripts: bool = False
    sandbox_subtask_vm: bool = False  # run_in_sandbox keeps one VM per subtask, destroyed at subtask end; needs sandbox_tool
    sandbox_vm_worktree: bool = False  # worktree in the subtask VM is the source of truth, final diff read from git there; needs sandbox_subtask_vm
    db_check: bool = False  # migration trial on PG16 inside the microVM before admin applies
    sandbox_repo_scripts_tiers: str = ""  # csv tier names ("multi", "single") that get repo-script argv; "" = none
    skill_select: bool | None = None
    multimodal: bool = False
    vision_advisory: bool = False
    verified_loop: bool = False
    context_compaction: bool = False
    compaction_expand: bool = False  # expand(step) tool; needs context_compaction
    tool_native: bool = False
    literal_by_reference: bool = False
    react_schema: bool = False
    thinking_budget: bool = False
    multi_file_subtask: bool = False
    backend_contexts_surface: bool = False  # context owner đã duyệt + test node:test = surface
    budget_by_file_count: bool = False  # plan từ 3 file: gấp đôi trần bước và giây của loop
    graph_persistence: bool = False
    plan_repair: bool = True
    repair_same_session: bool = False  # off until A/B measured
    repair_sampling_diversity: bool = False
    scope_first_warning: bool = False
    tool_doc_inject: bool = False
    gate_feedback_cap: bool = True
    repair_skip_broken_check: bool = True
    prompt_role_split: bool = False
    prompt_tail_restate: bool = False
    rewoo_gate2_reads: bool = False
    procedure_in_split: bool = False  # tạm thời để đo LF/166; gỡ khi có kết quả
    gate25_answered: bool = False
    plan_validate_clarify_rules: bool = False
    gate25_sim_user: bool = False
    private_preview_enabled: bool = False
    model_routing: bool = False
    api_max_tokens: int | None = Field(default=None, gt=0)
    api_max_tokens_gate1: int | None = Field(default=None, gt=0)
    api_max_tokens_brainstorm: int | None = Field(default=None, gt=0)
    api_max_tokens_gate25: int | None = Field(default=None, gt=0)
    api_max_tokens_gate3_light: int | None = Field(default=None, gt=0)
    api_max_tokens_gate3_heavy: int | None = Field(default=None, gt=0)
    api_max_tokens_gate4_review: int | None = Field(default=None, gt=0)
    api_max_tokens_repair_planner: int | None = Field(default=None, gt=0)
    api_max_tokens_repair_agent: int | None = Field(default=None, gt=0)
    api_max_tokens_compactor: int | None = Field(default=None, gt=0)
    api_max_tokens_react_plan: int | None = Field(default=None, gt=0)
    api_context_tokens: int | None = Field(default=None, gt=0)
    api_run_tokens: int | None = Field(default=None, gt=0)
    api_rpm: int | None = Field(default=None, ge=0)
    api_verdict: Literal["", "api", "vllm"] = ""  # suite pins the fallback choice so every trial of a run uses one provider
    api_fallback: bool = False  # vLLM busy/unreachable at run start: roles listing the hosted API use it
    oracle_css_size: bool = False
    text_oracle_skip_selector: bool = True
    soft_quality_checks: bool = True  # contract quality_checks: soft miss ships with a warning, hard miss blocks
    keep_blocked_candidate: bool = False  # eval: keep the branch of a gate 4+ block and report it as blocked_candidate
    provider_patience: bool = False  # hosted API: longer backoff, Retry-After, wait out the cooldown of an empty pool
    gate5_queue_wait_s: float = Field(default=0, ge=0)  # seconds to poll a busy sandbox runner at create before the busy verdict; 0 = off
    prompt_labels: bool = False  # worker registers prompt versions, serves them by server label; label/disk drift or a stale label table blocks (transient)
    api_stream: bool = False  # hosted API: stream and join deltas; the proxy joins non-stream chunks with newlines
    compile_prose_verify: bool = False
    gate1_unified_verify: bool = True  # gate 1: một định nghĩa verify chạy được (có grep/rg); layer chỉ ép verify ở feature plan
    stop_report_v2: bool = True
    call_executor: bool = False  # runtime/call_executor.py: one retry/failover owner; off = legacy loops
    explore_low_confidence: bool = False
    state_file: bool = False
    gate1_arbiter: bool = True
    gate1_arbiter_min: float = Field(default=0.97, ge=0.5, le=1.0)
    no_oracle_review_any: bool = True  # gate 5: không oracle + smoke xanh + không có generated test → needs_review thay vì block
    admin_requester_trust: bool = False  # gate 1: người gửi role admin (server xác thực) không bị chặn privileged_area
    intake_labels_by_role: bool = False  # cần thêm admin_requester_trust: admin chỉ được cảnh báo nhãn money/off_topic
    form_errors_as_warnings: bool = False  # plan sửa lần cuối: lỗi hình thức (verify, file nhắc tên, size) thành cảnh báo
    plan_objections_advisory: bool = False  # cổng 1/2.5: phản đối grounding (best_match, file chứa chữ cũ, trang mới, trích dẫn) thành góp ý cho bước code; path/scope/budget/intake vẫn chặn
    session_plan_execute: bool = False  # cổng 1: một phiên đọc repo, viết plan, nhận luật plan tất định như observation, rồi chuyển lịch sử đọc sang bước sửa
    two_level_plan: bool = False  # cổng 1 chỉ chia subtask + tiêu chí chốt; mỗi subtask context mới tự lập plan, thực thi, check + reviewer, sửa; cần plan_checks
    subtask_fresh_context: bool = False  # cổng 3: mỗi subtask là phiên con context mới, nhận plan + file đã tạo + tóm tắt subtask trước; chạy tuần tự
    admin_backend_zone: bool = False  # vai admin sửa server/contexts và public/ trừ vùng cấm; cấm mọi vai với vùng cấm
    deterministic_ready_oracle: bool = False  # ready_for_pr cần check tất định (literal nguyên văn + chỉ file được nêu); thiếu thì needs_review; loop dừng chưa qua = needs_review
    intent_review: bool = False  # cổng 4: reviewer AI (cùng model, context mới) chấm diff theo yêu cầu, gộp lỗi + miss tất định thành một bản sửa gửi worker; lỗi/sai schema thì đóng an toàn
    out_of_plan_files: bool = False  # admin sửa file ngoài plan trong vùng sửa, tối đa needs_review; file logic cần test phủ
    change_class_ddl: bool = False  # change_class: DDL (CREATE/ALTER/DROP TABLE|INDEX) trong dòng thêm của file không phải migration = one-way
    plan_checks: bool = False  # plan khai checks (text_present/text_absent); gate 2.5 soát, gate 5 đo đỏ→xanh base/candidate
    derived_checks: bool = False  # gate 1: verify/checks của css_color/replace/insert/remove suy từ request bằng code, thay lệnh model viết
    quoted_checks: bool = False  # gate 5: chữ người dùng trích thành text_present/text_absent theo luật đỏ→xanh; oracle chữ chỉ báo cáo
    legacy_probe_shadow: bool = False  # gate 5: probe cũ (text/style/route) chạy song song check mới, chỉ ghi verdict vào evidence, không quyết định
    red_check_classify: bool = False  # gate 5: check đỏ cả base lẫn candidate xếp candidate_wrong/check_suspect/infra trước repair
    file_header_check: bool = False  # gate 4: file mới .js/.mjs/.py/.html phải có header 1 dòng (chặn, sửa được)
    file_header_context: bool = False  # tree/outline hiện dòng header của từng file
    prompt_guard: Literal["off", "shadow"] = "off"  # Llama Prompt Guard 2 on requester/fetched text: record only, never decides
    spotlight: bool = False  # nonce in every untrusted-block fence; content cannot close its own block

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
    unified_skill_format: bool = False
    backend_contexts_surface_list: Annotated[frozenset[str], NoDecode] = APPROVED_SURFACE_CONTEXTS

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
    scratch: Path | None = None
    eval_node_modules: Path | None = None
    package_broker_dir: Path | None = None
    package_layer_cap: int = 5
    qwen_tokenizer: Path | None = None
    retrieval_weights: Path | None = None
    prompt_guard_path: Path | None = None  # local model dir (tokenizer.json, config.json, *.onnx)

    gate1_probe_timeout_s: float = 45.0
    reasoning_off: str = ""

    # secret; worker.take_secret vẫn đọc-rồi-xoá key của chính nó khỏi môi trường
    internal_key: SecretStr = SecretStr("")

    @model_validator(mode="after")
    def _two_level_needs_checks(self):
        if self.two_level_plan and not self.plan_checks:
            logging.getLogger(__name__).warning("AI_BOARD_TWO_LEVEL_PLAN is set without AI_BOARD_PLAN_CHECKS: two-level plan stays off")
        return self

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

    @field_validator("gate25_fixes", "gate3_guards", "backend_contexts_surface_list", mode="before")
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
