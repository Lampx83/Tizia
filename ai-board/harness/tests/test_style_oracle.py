import pytest

import functional
from verification import style

SIZE_TITLE = 'Đổi cỡ chữ của .feedback từ 22px thành 29px'
SIZE_DIFF = ('public/dem-ngon-tay.html', '@@ -3,5 +3,5 @@\n .feedback {\n-  font-size: 22px;\n+  font-size: 29px;\n   color: #111;\n }\n')
COLOR_TITLE = "Đổi màu chữ của '.prompt .label' sang xanh lá #16a34a"
COLOR_DIFF = ('public/ghep-chu-cai.html', '@@ -8,3 +8,3 @@\n .prompt .label {\n-  color: #111111;\n+  color: #16a34a;\n }\n')
NESTED_COLOR_DIFF = ('public/grapher.html', '@@ -8,3 +8,3 @@\n .types button {\n-  color: #111111;\n+  color: #16a34a;\n }\n')
HTML_TEXT = ('public/x.html', '+<p>Dữ liệu được đồng bộ hôm nay</p>\n')


def diff_state(*blocks, title, detail=''):
    return {'request_title': title, 'request_detail': detail,
            'full_diff': [{'file': file, 'diff': f'+++ b/{file}\n' + body} for file, body in blocks]}


def css_state(block, title=SIZE_TITLE):
    return diff_state(block, title=title)


PAGES = ['/dem-ngon-tay.html']


def test_flag_off_selects_nothing_and_leaves_probe_chain_unchanged():
    s = css_state(SIZE_DIFF)
    assert style.select_style(s, PAGES, enabled=False) is None
    assert functional.select(s) is None
    assert functional.select_fallback(s, PAGES) is None


def test_flag_on_selects_style_probe_for_size_and_color_edits():
    assert style.select_style(css_state(SIZE_DIFF), PAGES, enabled=True) == functional.STYLE_PROBE
    assert style.select_style(css_state(COLOR_DIFF, COLOR_TITLE), PAGES, enabled=True) == functional.STYLE_PROBE
    nested_title = "Đổi màu chữ của '.types button' sang xanh lá #16a34a"
    assert style.select_style(css_state(NESTED_COLOR_DIFF, nested_title), PAGES, enabled=True) == functional.STYLE_PROBE


def test_selector_mismatch_with_request_is_not_selected():
    assert style.select_style(css_state(NESTED_COLOR_DIFF, COLOR_TITLE), PAGES, enabled=True) is None


def test_style_probe_needs_pages():
    assert style.select_style(css_state(SIZE_DIFF), [], enabled=True) is None


def test_value_not_in_request_is_not_selected():
    s = css_state(('public/dem-ngon-tay.html', SIZE_DIFF[1].replace('29px', '24px')))
    assert style.select_style(s, PAGES, enabled=True) is None


def test_selector_not_in_request_is_not_selected():
    s = css_state(COLOR_DIFF, title="Đổi màu chữ của '.other' sang xanh lá #16a34a")
    assert style.select_style(s, PAGES, enabled=True) is None


@pytest.mark.parametrize('line', [
    '+  color: #16a34a !important;',
    '+  font-size: 2em;',
    '+  color: var(--brand);',
    '+  width: calc(100% - 4px);',
])
def test_unverifiable_values_are_not_selected(line):
    s = css_state(('public/x.html', f'@@ -1,3 +1,3 @@\n .feedback {{\n{line}\n }}\n'))
    assert style.select_style(s, PAGES, enabled=True) is None


@pytest.mark.parametrize('header', ['.feedback:hover {', '.feedback::before {', '@media (max-width: 600px) {'])
def test_pseudo_and_at_rules_are_not_selected(header):
    s = css_state(('public/x.html', f'@@ -1,3 +1,3 @@\n {header}\n+  font-size: 29px;\n }}\n'))
    assert style.select_style(s, PAGES, enabled=True) is None


def test_mixed_diff_with_added_html_text_is_not_selected():
    s = css_state(SIZE_DIFF, title=SIZE_TITLE)
    s['full_diff'].append({'file': 'public/dem-ngon-tay.html', 'diff': '+++ b/x\n+<p>Chữ mới</p>\n'})
    assert style.select_style(s, PAGES, enabled=True) is None


def test_declaration_outside_rule_is_not_selected():
    s = css_state(('public/x.html', '@@ -1,2 +1,2 @@\n+  font-size: 29px;\n'))
    assert style.select_style(s, PAGES, enabled=True) is None


def test_judge_no_matching_element_is_no_oracle_not_pass():
    checks = [('.feedback', 'font-size', '29px')]
    out = style.judge(checks, [(0, 0)])
    assert out['passed'] is False and out['probe_id'] is None and out['reason'] == functional.NO_ORACLE


def test_judge_mismatch_fails_with_observations():
    checks = [('.feedback', 'font-size', '29px')]
    out = style.judge(checks, [(2, 2)])
    assert out['passed'] is False and out['probe_id'] == functional.STYLE_PROBE
    assert '.feedback' in out['reason'] and out['observations']


def test_judge_all_matching_passes_with_only_its_coverage_flag():
    checks = [('.feedback', 'font-size', '29px')]
    out = style.judge(checks, [(3, 0)])
    assert out['passed'] is True and out['coverage'] == {'computed_style': True}


def test_judge_without_checks_is_no_oracle():
    assert style.judge([], [])['reason'] == functional.NO_ORACLE


def test_run_without_fixture_is_no_oracle_not_failure():
    out = style.run_style('http://app', css_state(SIZE_DIFF), None, PAGES)
    assert out['probe_id'] is None and out['reason'] == functional.NO_ORACLE


def test_functional_run_dispatches_style_probe(monkeypatch):
    seen = {}
    monkeypatch.setattr(style, 'run_style', lambda base, state, fixture, pages: seen.update(pages=pages) or {'passed': True})
    functional.run('http://app', functional.STYLE_PROBE, fixture=None, state=css_state(SIZE_DIFF), pages=PAGES)
    assert seen['pages'] == PAGES


def test_probe_is_registered_for_server_coverage():
    assert functional.ORACLES[functional.STYLE_PROBE] == ('computed_style',)
