"""LF/180: observation caps in tokens from contract, read_file pages by line range."""
import pytest

import tools
from runtime import limits, tool_loop, tool_manifest
from services import token_count

CAPS = limits.loop()["observation_tokens"]
BIG = "\n".join(f"const row{n} = {{ id: {n}, label: 'dòng số {n}' }};" for n in range(1, 801))


@pytest.fixture
def ws(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: BIG)
    return tool_loop.Workspace(".", "abc", "public/a.js", BIG)


def read(ws, **args):
    return ws.run("read_file", {"file": "public/a.js", **args})


def tokens(text):
    return token_count.measure(text)


def test_manifest_v5_declares_range_params():
    assert tool_loop.MANIFEST.version == 5
    props = tool_loop.SCHEMAS["read_file"]["properties"]
    assert props["start_line"] == props["end_line"] == {"type": "integer"}
    assert tool_loop.SCHEMAS["read_file"]["required"] == ["file"]


def test_every_manifest_tool_has_a_contract_cap():
    for name in tool_loop.MANIFEST.tools:
        assert tool_loop._cap(name) == CAPS.get(name, CAPS["default"]) > 0


def test_big_file_is_readable_in_full_through_pages_each_within_cap(ws):
    seen, start, pages = [], 1, 0
    while start <= 800:
        out = read(ws, start_line=start)
        assert tokens(out) <= CAPS["read_file"]
        rows = [r for r in out.splitlines() if r.startswith("L")]
        seen += [int(r.split("|", 1)[0][1:]) for r in rows]
        start = seen[-1] + 1
        pages += 1
    assert seen == list(range(1, 801)) and pages > 1


def test_no_range_gives_head_total_and_continue_hint(ws):
    out = read(ws)
    assert out.startswith("L1| ") and "800" in out and "start_line=" in out
    assert tokens(out) <= CAPS["read_file"]


def test_range_returns_exactly_that_window(ws):
    out = read(ws, start_line=10, end_line=12)
    assert [r.split("|")[0] for r in out.splitlines() if r.startswith("L")] == ["L10", "L11", "L12"]
    assert "start_line=" not in out


@pytest.mark.parametrize("args", [{"start_line": 0}, {"start_line": 900}, {"start_line": 5, "end_line": 4}])
def test_bad_range_is_a_fixable_error(ws, args):
    with pytest.raises(tool_loop.ToolError):
        read(ws, **args)


@pytest.mark.parametrize("args", [{"start_line": "3"}, {"end_line": 2.5}, {"start_line": True}])
def test_range_args_must_be_integers(args):
    with pytest.raises(tool_loop.ToolError):
        tool_loop.validate("read_file", {"file": "public/a.js", **args})


def test_scope_and_path_policy_unchanged(ws):
    with pytest.raises(tool_loop.Forbidden):
        ws.run("read_file", {"file": "public/other.js"})
    with pytest.raises(tool_loop.Forbidden):
        ws.run("read_file", {"file": "../x"})


def test_fit_cuts_to_token_cap():
    text = "xin chào thế giới " * 500
    out = token_count.fit(text, 50)
    assert tokens(out) <= 50 and text.startswith(out) and len(out) > 10
    assert token_count.fit("ngắn", 50) == "ngắn"


def test_history_observation_is_capped_by_tokens():
    assert tokens(tool_loop._fit("a b c d e f " * 2000, "tree")) <= CAPS["tree"]


def test_react_plan_cap_is_tokens():
    assert limits.react_plan()["observation_tokens"] == 500 and "observation_chars" not in limits.react_plan()
