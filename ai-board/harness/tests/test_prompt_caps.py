"""Prompt caps live in contract limits.prompt_caps, in tokens; defaults equal the old char constants."""
import json

from gates import implement, intake_guard, static_check
from runtime import limits


def test_defaults_equal_old_char_caps():
    assert limits.prompt_cap_chars("intake_detail") == 2000
    assert limits.prompt_cap_chars("static_content") == 3500
    assert limits.prompt_cap_chars("snippet") == 1500
    assert (intake_guard.MAX_DETAIL, static_check.MAX_CONTENT_CHARS, implement.SNIPPET_CHARS) == (2000, 3500, 1500)


def test_caps_are_token_valued_in_contract():
    spec = limits.contract()["limits"]["prompt_caps"]
    assert spec["intake_detail_tokens"] * spec["chars_per_token"] == 2000
    assert isinstance(spec["snippet_tokens"], int)


def test_contract_change_moves_caps(monkeypatch):
    raw = json.loads(json.dumps(limits.contract()))
    raw["limits"]["prompt_caps"]["intake_detail_tokens"] = 2000
    monkeypatch.setattr(limits, "_parsed", lambda: raw)
    assert limits.prompt_cap_chars("intake_detail") == 8000
