"""LF/199: observation read_file/grep caps raised behind AI_BOARD_OBSERVATION_RAISE, contract default off."""
import pytest

import tools
from runtime import limits, tool_loop
from services import token_count
from settings import reset_settings

FLAG = "AI_BOARD_OBSERVATION_RAISE"
ON = {FLAG: "1"}
BIG = "\n".join(f"const row{n} = {{ id: {n}, label: 'dòng số {n}' }};" for n in range(1, 801))


@pytest.fixture(autouse=True)
def _fresh_settings(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    reset_settings()
    yield
    reset_settings()


def test_contract_default_is_off_and_raised_values_live_in_contract():
    spec = limits.contract()["limits"]["loop"]["observation_raise"]
    assert spec["flag"] == FLAG and spec["default_enabled"] is False
    assert spec["observation_tokens"] == {"read_file": 4000, "grep": 1600}


def test_default_caps_unchanged_when_flag_off():
    caps = limits.loop(env={})["observation_tokens"]
    assert caps["read_file"] == 2000 and caps["grep"] == 800


def test_flag_on_raises_only_read_file_and_grep():
    off = limits.loop(env={})["observation_tokens"]
    on = limits.loop(env=ON)["observation_tokens"]
    assert on["read_file"] == 4000 and on["grep"] == 1600
    assert {k: v for k, v in on.items() if k not in ("read_file", "grep")} == \
        {k: v for k, v in off.items() if k not in ("read_file", "grep")}


def test_flag_off_value_is_explicit_false():
    assert limits.loop(env={FLAG: "0"})["observation_tokens"]["read_file"] == 2000


def test_runtime_cap_follows_flag(monkeypatch):
    assert tool_loop._cap("read_file") == 2000
    monkeypatch.setenv(FLAG, "1")
    reset_settings()
    assert tool_loop._cap("read_file") == 4000 and tool_loop._cap("grep") == 1600


def test_flag_on_read_page_holds_more_lines_within_raised_cap(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: BIG)
    ws = tool_loop.Workspace(".", "abc", "public/a.js", BIG)
    off_page = ws.run("read_file", {"file": "public/a.js"})
    monkeypatch.setenv(FLAG, "1")
    reset_settings()
    on_page = ws.run("read_file", {"file": "public/a.js"})
    assert token_count.measure(on_page) <= 4000
    assert token_count.measure(off_page) <= 2000
    assert on_page.count("\nL") > off_page.count("\nL")
