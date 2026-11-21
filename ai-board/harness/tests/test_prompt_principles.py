"""Flag AI_BOARD_PROMPT_PRINCIPLES: off = prompts byte-identical, on = principles variant."""
import hashlib
import json

from runtime import prompt_roles
from runtime.budgets import meter
from services import context

OFF_SYSTEM_SHA = "46fbee4f4a3ba0dee07fedd6d9e2b1b2cdea841bd77018d16b1bd79e4f86c4aa"
OFF_MANUAL_SHA = "983b2e880718082cfeeb0d9e790bc4cc405155c74322179841be0c52acf2f544"
REFACTOR = "Refactor before stacking"


def _sha(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def test_flag_off_system_and_manual_are_byte_identical(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PROMPT_PRINCIPLES", raising=False)
    assert _sha(prompt_roles.system()) == OFF_SYSTEM_SHA
    assert _sha(prompt_roles.split("x")[0]) == OFF_SYSTEM_SHA
    assert _sha(context.manual()) == OFF_MANUAL_SHA


def test_flag_on_adds_principles_and_drops_refactor_line(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROMPT_PRINCIPLES", "1")
    on = prompt_roles.system()
    assert REFACTOR not in on and REFACTOR in prompt_roles.SYSTEM
    for word in ("assumptions", "minimum code", "Change only the lines", "success is checked"):
        assert word in on
    added = [ln for ln in on.splitlines() if ln not in prompt_roles.SYSTEM.splitlines()]
    assert len("\n".join(added).encode()) < 350
    assert prompt_roles.split("x")[0] == on


def test_variant_is_locked_and_resolves_to_its_hash():
    name = "system_roles_principles.md"
    raw = (prompt_roles._PROMPTS / name).read_bytes().replace(b"\r\n", b"\n")
    lock = json.loads((prompt_roles._PROMPTS / "prompts.lock.json").read_text(encoding="utf-8"))
    assert lock[name] == hashlib.sha256(raw).hexdigest() == meter.resolve_prompt_hash(name)


def test_manual_db_line_follows_placeholder_flag(monkeypatch):
    class S:
        requester_fullstack_db = True
    monkeypatch.setattr(context, "get_settings", lambda: S())
    on = context.manual()
    assert "admin sees the SQL" in on and context._DB_LINE not in on
    monkeypatch.setattr(context, "get_settings", lambda: object())
    assert _sha(context.manual()) == OFF_MANUAL_SHA
