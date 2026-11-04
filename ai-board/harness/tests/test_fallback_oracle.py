import urllib.error

import functional
from gates import verify
from test_gate_5_verify import FakeRunner, checkout, state


def diff_state(*blocks, title='Thêm endpoint', detail='Thêm endpoint trả trạng thái'):
    return {'request_title': title, 'request_detail': detail,
            'full_diff': [{'file': file, 'diff': f'+++ b/{file}\n' + body} for file, body in blocks]}


ROUTE = ('server/routes/x.js', "+router.get('/api/x', handler);\n")
POST = ('server/routes/x.js', "+router.post('/api/x', handler);\n")
PARAM = ('server/routes/x.js', "+router.get('/api/x/:id', handler);\n")
PAGE = ('public/x.html', '+<p>Dữ liệu được đồng bộ hôm nay</p>\n')


def test_route_probe_is_selected_when_the_request_names_nothing():
    s = diff_state(ROUTE)
    assert functional.select(s) is None
    assert functional.select_fallback(s, []) == functional.ROUTE_PROBE


def test_fallback_never_overrides_a_request_specific_oracle():
    s = diff_state(ROUTE, title='', detail="Thêm 'Tizia cập nhật' vào chân trang")
    assert functional.select_fallback(s, ['/x.html']) is None


def test_parameterised_route_and_server_only_edit_have_no_fallback():
    assert functional.select_fallback(diff_state(PARAM), []) is None
    assert functional.select_fallback(diff_state(('server/x.js', '+const a = 1;\n')), []) is None


def test_added_page_text_needs_a_page_and_at_least_twelve_characters():
    assert functional.select_fallback(diff_state(PAGE), ['/x.html']) == functional.FALLBACK_TEXT_PROBE
    assert functional.select_fallback(diff_state(PAGE), []) is None
    assert functional.select_fallback(diff_state(('public/x.html', '+<p>Lưu</p>\n')), ['/x.html']) is None


def test_route_probe_passes_with_only_its_coverage_flag(monkeypatch):
    monkeypatch.setattr(functional, '_fetch', lambda method, url: (200, b'{}'))
    out = functional.run('http://app', functional.ROUTE_PROBE, state=diff_state(ROUTE))
    assert out['passed'] is True and out['coverage'] == {'route_contract': True}


def test_route_probe_failure_names_the_route_and_keeps_observations(monkeypatch):
    monkeypatch.setattr(functional, '_fetch', lambda method, url: (500, b'boom'))
    out = functional.run('http://app', functional.ROUTE_PROBE, state=diff_state(ROUTE))
    assert out['passed'] is False and 'HTTP 500' in out['reason'] and out['observations']


def test_write_route_accepts_csrf_refusal_but_not_missing(monkeypatch):
    monkeypatch.setattr(functional, '_fetch', lambda method, url: (403, b''))
    assert functional.run('http://app', functional.ROUTE_PROBE, state=diff_state(POST))['passed'] is True
    monkeypatch.setattr(functional, '_fetch', lambda method, url: (404, b''))
    assert functional.run('http://app', functional.ROUTE_PROBE, state=diff_state(POST))['passed'] is False


def test_unreachable_route_is_no_oracle_not_a_failure(monkeypatch):
    def down(method, url):
        raise urllib.error.URLError('connection refused')
    monkeypatch.setattr(functional, '_fetch', down)
    out = functional.run('http://app', functional.ROUTE_PROBE, state=diff_state(ROUTE))
    assert out['probe_id'] is None and out['reason'] == functional.NO_ORACLE


def test_fallback_pass_with_red_generated_test_goes_to_review(tmp_path, monkeypatch):
    passed = {'probe_id': functional.FALLBACK_TEXT_PROBE, 'passed': True, 'reason': None,
              'coverage': {'rendered_text': True}, 'observations': {'page /x.html': 'x'}}
    monkeypatch.setattr(verify, 'probe_http', lambda _: (200, b'// x\n'))
    monkeypatch.setattr(functional, 'select_fallback', lambda state, pages: functional.FALLBACK_TEXT_PROBE)
    monkeypatch.setattr(functional, 'run', lambda *args, **kwargs: passed)
    out = verify.run(state(checkout(tmp_path)), runner=FakeRunner(fail='generated_test'))
    result = out['evidence']['functional']
    assert out['blocked'] is False
    assert result['passed'] is True and result['needs_review'] is True and result['disagree'] is True
