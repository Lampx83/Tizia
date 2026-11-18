"""Bảng quality_checks trong contract: cứng chặn (0/1), mềm ghi soft_misses kèm ngưỡng và không chặn."""
from gates import guard
from runtime import limits
from settings import get_settings

HARD = {"secret", "protected_path", "test_removal", "injection", "network_call", "external_script", "external_link",
        "pii", "personal_form", "content", "sensitive_topic", "sovereignty_map", "image", "answer_key", "palette",
        "catalog", "env_check", "smoke", "syntax", "python_syntax", "scope"}
SOFT = {"contrast", "overflow", "covered", "offscreen", "patch", "theme", "inline_script", "acceptance",
        "text_oracle", "vision_advisory"}


def diff(path, added=(), removed=(), new=False):
    head = f"diff --git a/{path} b/{path}\n"
    head += "new file mode 100644\n--- /dev/null\n" if new else f"--- a/{path}\n"
    head += f"+++ b/{path}\n@@ -1 +1 @@\n"
    return head + "".join(f"-{line}\n" for line in removed) + "".join(f"+{line}\n" for line in added)


INLINE = diff("public/faq.html", added=['<script type="module">', "import { a } from './js/features/faq/index.js';",
                                        "</script>"], new=True)
ANSWER = diff("public/js/scenarios/lop5/toan.js", removed=["  answer: 1,"], added=["  answer: 2,"])


def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_SOFT_QUALITY_CHECKS", "1")


def test_every_check_has_one_class_and_soft_ones_a_threshold():
    table = limits.quality_checks()
    assert {c for c, s in table.items() if s["class"] == "hard"} == HARD
    assert {c for c, s in table.items() if s["class"] == "soft"} == SOFT
    assert table["contrast"]["threshold"] == 4.5
    assert all("threshold" in s for s in table.values() if s["class"] == "soft")


def test_unknown_check_counts_as_hard():
    assert limits.quality_class("made_up_check") == "hard"
    assert limits.quality_class("contrast") == "soft"


def test_flag_is_on_by_default(monkeypatch):
    monkeypatch.delenv("AI_BOARD_SOFT_QUALITY_CHECKS")
    assert get_settings().soft_quality_checks is True


def test_flag_off_keeps_inline_script_blocking_and_answer_key_a_flag():
    out = guard.scan(INLINE)
    assert any(f["check"] == "inline_script" for f in out["findings"]) and out["soft_misses"] == []
    assert not any(f["check"] == "answer_key" for f in guard.scan(ANSWER)["findings"])


def test_soft_inline_script_does_not_block_and_is_reported(monkeypatch):
    on(monkeypatch)
    out = guard.scan(INLINE)
    assert not any(f["check"] == "inline_script" for f in out["findings"])
    miss = next(m for m in out["soft_misses"] if m["check"] == "inline_script")
    assert miss["gate"] == 4 and miss["value"] == 1 and miss["threshold"] == 0 and "faq.html" in miss["detail"]


def test_answer_key_change_is_hard_and_blocks(monkeypatch):
    on(monkeypatch)
    hit = next(f for f in guard.scan(ANSWER)["findings"] if f["check"] == "answer_key")
    assert hit["failure_class"] == "critical"


def test_theme_rewrite_flag_is_also_a_soft_miss(monkeypatch):
    on(monkeypatch)
    page = diff("public/a.html", added=[":root { --a: #111111; --b: #222222; --c: #333333; }"])
    out = guard.scan(page)
    assert any(f["check"] == "theme" for f in out["flags"])
    assert any(m["check"] == "theme" for m in out["soft_misses"])


def test_hard_findings_still_block_with_flag_on(monkeypatch):
    on(monkeypatch)
    out = guard.scan(diff("test/x.test.js", added=['const k = "sk-abcdefghijklmnopqrstuvwxyz123456";'], new=True))
    assert any(f["check"] == "secret" for f in out["findings"])
