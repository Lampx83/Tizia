"""expand tool: re-open a compacted observation by step; off unless compaction and its own flag are on."""
import json
from types import SimpleNamespace

import pytest

import tools
from runtime import tool_loop, tool_manifest
from test_context_compaction import CompactingDeps, trial
from test_tool_loop import PAGE

ROWS = [f'row {i} ' + '界' * 40 for i in range(300)]
calls = iter(())


@pytest.fixture(autouse=True)
def distinct_observations(monkeypatch):
    global calls
    calls = iter(range(100))
    monkeypatch.setenv('AI_BOARD_CONTEXT_COMPACTION', '1')
    monkeypatch.setattr(tools, '_show', lambda *_args: PAGE)
    monkeypatch.setattr(tools, 'run', lambda *_a, **_k: f'first{next(calls)}\n' + '\n'.join(ROWS))


def scripted(*after_reads):
    deps = CompactingDeps()
    deps.script[3:3] = after_reads
    return deps


def expand(**args):
    return {'tool': 'expand', 'arguments': args}


def test_flag_off_tool_is_absent_and_manifest_hash_unchanged(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '0')
    assert 'expand' not in tool_loop._specs()
    raw = json.loads(tool_manifest.PATH.read_text(encoding='utf-8'))
    assert tool_loop.MANIFEST.hash == tool_manifest.canonical_hash(raw)
    assert 'expand' not in raw['tools'].__repr__()


def test_expand_returns_the_original_text_after_compaction(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    deps = scripted(expand(step=0, start_line=2, end_line=3))
    result, _ = trial(deps)
    assert len(deps.compactions) == 1 and result['status'] == 'proposed'
    last = [p for p in deps.prompts if 'Observation 3 expand' in p][0]
    assert 'L2| ' + ROWS[0] in last and 'L3| ' + ROWS[1] in last


def test_unknown_step_is_a_clear_tool_error_and_the_loop_continues(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    deps = scripted(expand(step=99))
    result, _ = trial(deps)
    assert result['status'] == 'proposed'
    assert any('expand: step 99' in p for p in deps.prompts)


def test_unpaged_expand_ends_with_a_continue_hint_for_expand():
    history = SimpleNamespace(archive={7: chr(10).join(ROWS * 4)})
    page = tool_loop._expand(history, {'step': 7})
    assert page.endswith(']') and 'expand step=7 start_line=' in page and 'read_file start_line' not in page
    nxt = int(page.rsplit('start_line=', 1)[1].rstrip(']'))
    assert tool_loop._expand(history, {'step': 7, 'start_line': nxt}).startswith(f'L{nxt}| ')


def test_expand_needs_compaction_on(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    monkeypatch.setenv('AI_BOARD_CONTEXT_COMPACTION', '0')
    seen = []
    real = tool_loop._specs
    monkeypatch.setattr(tool_loop, '_specs', lambda: seen.extend(real()) or real())
    trial(CompactingDeps())
    assert seen and 'expand' not in seen


def test_expand_offered_with_both_flags(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    seen = []
    real = tool_loop._specs
    monkeypatch.setattr(tool_loop, '_specs', lambda: seen.extend(real()) or real())
    trial(scripted())
    assert 'expand' in seen
