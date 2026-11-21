"""expand tool: re-open a compacted observation by step; off unless compaction and its own flag are on."""
import hashlib
import re
import json
from types import SimpleNamespace

import pytest

import tools
from runtime import tool_loop, tool_manifest
from runtime.budgets.budget import Budget
from test_context_compaction import CompactingDeps, trial
from test_tool_loop import SUBTASK
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
    history = SimpleNamespace(archive={7: ('d', chr(10).join(ROWS * 4))})
    page = tool_loop._expand(history, {'step': 7})
    assert page.endswith(']') and 'expand step=7 start_line=' in page and 'read_file start_line' not in page
    nxt = int(page.rsplit('start_line=', 1)[1].rstrip(']'))
    assert tool_loop._expand(history, {'step': 7, 'start_line': nxt}).split(chr(10), 1)[1].startswith(f'L{nxt}| ')


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


def offered(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    token = tool_loop._EXPAND_OFFERED.set(True)
    return token


def shown(history, **args):
    return tool_loop._fit(tool_loop._expand(history, args), 'expand')


def archived(text, step=7):
    digest = hashlib.sha256(text.encode()).hexdigest()
    return SimpleNamespace(archive={step: (digest, text)})


def test_expand_page_survives_the_fit_with_its_hint(monkeypatch):
    token = offered(monkeypatch)
    try:
        page = shown(archived(chr(10).join(ROWS * 4)), step=7)
    finally:
        tool_loop._EXPAND_OFFERED.reset(token)
    assert page.endswith(']') and 'expand step=7 start_line=' in page
    assert tool_loop.token_count.measure(page) > 1000


def test_expanding_numbered_text_does_not_double_the_prefix(monkeypatch):
    token = offered(monkeypatch)
    try:
        read = tool_loop._read_window(chr(10).join(ROWS), 1, 20)
        page = shown(archived(read), step=7)
        again = shown(archived(page, step=8), step=8)
    finally:
        tool_loop._EXPAND_OFFERED.reset(token)
    for text in (page, again):
        assert 'L1| L1|' not in text and 'L2| L2|' not in text and 'L2| row 1' in text


def test_expand_reports_the_digest_the_summary_references(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    deps = scripted(expand(step=0, start_line=1, end_line=2))
    trial(deps)
    digest = deps.compactions[0]['required_references'][0]['digest']
    assert any(f'sha256:{digest}' in p for p in deps.prompts if 'Observation 3 expand' in p)


def test_unpaged_expand_is_not_compacted_before_the_model_sees_it(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    deps = scripted(expand(step=0))
    result, _ = trial(deps)
    assert result['status'] == 'proposed'
    assert any('Observation 3 expand' in p for p in deps.prompts)


def test_flag_change_blocks_resume_through_the_prompt_pin(monkeypatch):
    from test_tool_checkpoint import Crash, MemSteps
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    def crash():
        raise Crash()
    store = MemSteps()
    deps = scripted()
    deps.on_compact = crash
    with pytest.raises(Crash):
        trial(deps, store=store)
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '0')
    resumed = scripted()
    result, _ = trial(resumed, store=MemSteps(shared=store.db))
    assert result['status'] == 'blocked' and 'prompt' in result['reason'] and resumed.prompts == []


def test_prompt_right_after_expand_shows_its_result(monkeypatch):
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    deps = scripted(expand(step=0))
    trial(deps)
    assert 'Observation 3 expand' in deps.prompts[4]


def numbered_from(first, last):
    return chr(10).join(f'L{n}| row {n} ' + '界' * 40 for n in range(first, last + 1))


def test_window_arguments_use_the_embedded_line_numbers(monkeypatch):
    token = offered(monkeypatch)
    try:
        history = archived(numbered_from(100, 300))
        window = shown(history, step=7, start_line=101, end_line=102)
        paged = shown(history, step=7)
    finally:
        tool_loop._EXPAND_OFFERED.reset(token)
    assert [int(n) for n in re.findall(r'^L(\d+)\| ', window, re.M)] == [101, 102]
    shown_to = max(int(n) for n in re.findall(r'^L(\d+)\| ', paged, re.M))
    assert f'start_line={shown_to + 1}]' in paged


def test_partly_numbered_text_gets_row_labels_not_a_doubled_prefix():
    history = archived(chr(10).join(['L1| a', 'stderr', 'L2| b']))
    page = tool_loop._expand(history, {'step': 7})
    assert 'L1| L1|' not in page and 'R2| stderr' in page


def test_header_reserve_is_measured_not_fixed():
    assert not hasattr(tool_loop, 'EXPAND_HEADER_TOKENS')


def test_window_outside_embedded_numbers_names_the_available_range():
    with pytest.raises(tool_loop.ToolError, match='100-140'):
        tool_loop._expand(archived(numbered_from(100, 140)), {'step': 7, 'start_line': 2, 'end_line': 3})


def test_oversized_expand_comes_back_as_an_error_with_a_line_budget(monkeypatch):
    big = chr(10).join(f'const v{i} = "{"x" * 30}";' for i in range(400))
    monkeypatch.setenv('AI_BOARD_COMPACTION_EXPAND', '1')
    monkeypatch.setattr(tools, '_show', lambda *_a: big)
    deps = CompactingDeps()
    deps.models.context_window = lambda *_a, **_k: 14000
    deps.script[0:0] = [{'tool': 'read_file', 'arguments': {'file': 'public/a.html'}}]
    deps.script[4:4] = [expand(step=0)]
    result = tool_loop.run_subtask(SUBTASK, big, deps=deps, budget=Budget(), model='m', source='.', sha='abc', check=lambda _o: None, store=None)
    assert 'does not fit' not in str(result['reason'])
    assert any(re.search(r'too large for remaining context, use start_line/end_line \(≤\d+ lines\)', p) for p in deps.prompts)


def test_hint_range_and_gaps_use_visible_line_numbers(monkeypatch):
    token = offered(monkeypatch)
    try:
        paged = shown(archived(numbered_from(100, 400)), step=7)
        gap = archived(chr(10).join(f'L{n}| v' for n in (10, 11, 12, 50, 51)))
        with pytest.raises(tool_loop.ToolError, match='10-51'):
            tool_loop._expand(gap, {'step': 7, 'start_line': 13, 'end_line': 49})
        tail = shown(gap, step=7, start_line=12, end_line=50)
    finally:
        tool_loop._EXPAND_OFFERED.reset(token)
    last = max(int(n) for n in re.findall(r'^L(\d+)\| ', paged, re.M))
    assert re.search(rf'dòng 100-{last}/400; đọc tiếp: expand step=7 start_line={last + 1}\]', paged)
    assert [int(n) for n in re.findall(r'^L(\d+)\| ', tail, re.M)] == [12, 50]
