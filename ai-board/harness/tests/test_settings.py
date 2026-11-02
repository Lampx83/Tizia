"""Settings: mặc định, ép kiểu, lỗi rõ, GATE25_FIXES, chặn đọc AI_BOARD_* rải rác ngoài settings.py."""
import ast
from pathlib import Path

import pytest

import settings
from settings import Settings, get_settings

AI_BOARD = Path(__file__).resolve().parents[2]
# Giới hạn số: contract.json qua limits.py/tool_loop.py, không thuộc Settings.
NUMERIC = {"AI_BOARD_LOOP_MODEL_CALLS", "AI_BOARD_LOOP_TOOL_CALLS", "AI_BOARD_FANOUT_MAX", "AI_BOARD_CHECKPOINT_TTL_DAYS",
           "AI_BOARD_SKILL_PAD_CHARS"}
# Script chạy trong image python trần, không có pydantic.
BARE_SCRIPTS = {"real-gate5.py"}


def test_defaults(monkeypatch):
    for name in settings._env_names():
        monkeypatch.delenv(name, raising=False)
    s = get_settings()
    assert s.tool_loop == "" and s.best_match == "enforce" and s.verify_network == "published" and s.worker_mode == "off"
    assert s.gate25_fixes == {"quotes", "ellipsis"} and not s.gate3_guards and s.skill_variant == ()
    assert s.react_plan is None and s.adaptive_budget is None
    assert not (s.multimodal or s.sandbox_tool or s.plan_repair or s.prompt_role_split)
    assert s.sandbox_url is None and s.project == "tizia"


@pytest.mark.parametrize("raw,expected", [("1", True), ("true", True), ("ON", True), ("0", False), ("no", False)])
def test_bool_coercion(raw, expected):
    assert get_settings({"AI_BOARD_MULTIMODAL": raw}).multimodal is expected


def test_empty_value_means_default():
    s = get_settings({"AI_BOARD_REACT_PLAN": "", "AI_BOARD_TOOL_LOOP": ""})
    assert s.react_plan is None and s.tool_loop == ""


def test_empty_gate25_fixes_disables_all():
    assert get_settings({"AI_BOARD_GATE25_FIXES": ""}).gate25_fixes == frozenset()
    assert get_settings({}).gate25_fixes == {"quotes", "ellipsis"}


def test_unknown_retrieval_is_off():
    assert get_settings({"AI_BOARD_RETRIEVAL": "off"}).retrieval == ""


def test_csv_sets():
    s = get_settings({"AI_BOARD_GATE25_FIXES": " a, b ,,a", "AI_BOARD_GATE3_GUARDS": "noop,refs", "AI_BOARD_SKILL_VARIANT": "x, y"})
    assert s.gate25_fixes == {"a", "b"} and s.gate3_guards == {"noop", "refs"} and s.skill_variant == ("x", "y")


def test_modes_normalised():
    s = get_settings({"AI_BOARD_BEST_MATCH": " Advisory ", "AI_BOARD_TOOL_LOOP": "AUTO"})
    assert s.best_match == "advisory" and s.tool_loop == "auto"
    assert get_settings({"AI_BOARD_BEST_MATCH": "whatever"}).best_match == "enforce"


@pytest.mark.parametrize("name,value", [("TOOL_LOOP", "2"), ("MULTIMODAL", "maybe"), ("VERIFY_NETWORK", "open"),
                                       ("WORKER_MODE", "on"), ("SANDBOX_URL", "ftp://x"), ("SERVER_URL", "not a url")])
def test_bad_value_names_variable(name, value):
    with pytest.raises(ValueError, match=f"AI_BOARD_{name}"):
        get_settings({f"AI_BOARD_{name}": value})


def test_paths_and_secret():
    s = get_settings({"AI_BOARD_REPO_DIR": "/r", "AI_BOARD_INTERNAL_KEY": "k" * 30})
    assert s.repo_dir == Path("/r") and s.internal_key.get_secret_value() == "k" * 30 and "kkk" not in repr(s)


def test_reads_process_env_live(monkeypatch):
    assert get_settings().plan_repair is False
    monkeypatch.setenv("AI_BOARD_PLAN_REPAIR", "1")
    assert get_settings().plan_repair is True
    monkeypatch.delenv("AI_BOARD_PLAN_REPAIR")
    assert get_settings().plan_repair is False


def test_contract_flags_have_fields():
    import json
    contract = json.loads((AI_BOARD.parent / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))
    for limit in contract["limits"].values():
        flag = isinstance(limit, dict) and limit.get("flag")
        if flag:
            assert flag.removeprefix("AI_BOARD_").lower() in Settings.model_fields, flag


def _env_reads(path: Path):
    """(line, name) cho mỗi lời đọc môi trường có tên AI_BOARD_* là literal: environ.get/getenv/environ[...]/env.get/pop."""
    tree = ast.parse(path.read_text(encoding="utf-8"))
    for node in ast.walk(tree):
        arg = None
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute) and node.func.attr in {"get", "getenv"} and node.args:
            arg = node.args[0]
        elif isinstance(node, ast.Subscript) and isinstance(node.ctx, ast.Load):
            arg = node.slice
        if isinstance(arg, ast.Constant) and isinstance(arg.value, str) and arg.value.startswith("AI_BOARD_"):
            yield node.lineno, arg.value


def test_no_scattered_env_reads():
    offenders = []
    for path in AI_BOARD.rglob("*.py"):
        parts = path.relative_to(AI_BOARD).parts
        if "tests" in parts or "node_modules" in parts or ".venv" in parts or path.name in {"settings.py", "conftest.py"} | BARE_SCRIPTS:
            continue
        for line, name in _env_reads(path):
            if name not in NUMERIC:
                offenders.append(f"{path.relative_to(AI_BOARD)}:{line} {name}")
    assert not offenders, "đọc AI_BOARD_* ngoài settings.py: " + ", ".join(offenders)
