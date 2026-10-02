import functional
from gates import verify


def test_queue_oracle_is_selected_from_request_not_candidate_tests():
    assert functional.select({'request_detail': 'Không hiện ETA khi worker tắt'}) == functional.QUEUE_PROBE
    assert functional.select({'request_detail': 'Đổi màu tiêu đề'}) is None
    assert functional.select({'request_title': 'Ẩn ETA', 'request_detail': 'Khi worker tắt'}) == functional.QUEUE_PROBE
    assert functional.select({'plan': {'goal':'worker ETA'}, 'request_goal':'worker ETA', 'request_detail':'Đổi màu nút'}) is None


def test_missing_oracle_never_claims_functional_success():
    assert functional.run('http://unused', None)['passed'] is False


def test_generated_tests_and_http_cannot_replace_independent_behavior(tmp_path, monkeypatch):
    from test_gate_5_verify import checkout, state, FakeRunner
    monkeypatch.setattr(verify, 'probe_http', lambda _: (200, b'// x\n'))
    out = verify.run(state(checkout(tmp_path)), runner=FakeRunner())
    assert out['blocked'] and out['failure_class'] == 'plan'
    assert out['evidence']['smoke_passed'] and out['evidence']['http_observed']
    assert not out['evidence']['functional']['passed']


# ---- text-visible-v1: expectation comes from the words the requester quoted, never from the candidate ----
import re
from pathlib import Path

import pytest

ASK = lambda text: {'request_title': 'x', 'request_detail': text}


def test_text_expectation_is_read_from_quoted_words_and_the_intent_verb():
    expect = functional.text_expectation
    assert expect(ASK("Thêm dòng 'Tizia cập nhật' vào chân trang")) == {'present': ['Tizia cập nhật'], 'absent': []}
    assert expect(ASK('Hiển thị "Chưa có dữ liệu" khi danh sách rỗng')) == {'present': ['Chưa có dữ liệu'], 'absent': []}
    assert expect(ASK("Đổi chữ 'Gửi' thành 'Nộp bài'")) == {'present': ['Nộp bài'], 'absent': ['Gửi']}
    assert expect(ASK("Bỏ dòng 'Quảng cáo' ở đầu trang")) == {'present': [], 'absent': ['Quảng cáo']}
    page_line = ASK("Tiêu đề\n[Trang: Trường 'A B'] /school.html\nThêm 'Xin chào' vào đầu")  # worker: title, page line, body
    assert expect(page_line) == {'present': ['Xin chào'], 'absent': []}


@pytest.mark.parametrize('text', [
    'Đổi màu tiêu đề thành xanh',          # nothing quoted
    "Sửa lỗi chính tả 'Gui'",              # quoted but no verb saying what should happen
    "Thêm 'A1' và xóa 'B2'",               # add and remove at once: ambiguous, no oracle
    "Thêm bộ đếm ký tự",                   # 'bộ' must not read as the removal verb 'bỏ'
])
def test_text_oracle_declines_when_the_request_does_not_pin_down_the_text(text):
    assert functional.select(ASK(text)) is None


def test_text_oracle_is_selected_and_the_queue_oracle_keeps_priority():
    assert functional.select(ASK("Thêm dòng 'Tizia cập nhật' vào chân trang")) == functional.TEXT_PROBE
    assert functional.select(ASK("Ẩn ETA khi worker tắt, hiện 'chưa thể ước tính'")) == functional.QUEUE_PROBE


def test_server_and_harness_trust_the_same_oracles():
    source = (Path(__file__).resolve().parents[3] / 'server/ai-board/store.js').read_text(encoding='utf-8')
    block = re.search(r'const ORACLE_COVERAGE = \{(.*?)\n\};', source, re.S).group(1)
    server = {m[0]: re.findall(r"'(\w+)'", m[1]) for m in re.findall(r"'([\w-]+)': \[(.*?)\]", block)}
    assert server == {probe: list(flags) for probe, flags in functional.ORACLES.items()}


@pytest.fixture
def site(tmp_path):
    """Candidate stand-in: static pages served over HTTP."""
    import functools, http.server, threading
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(tmp_path))
    handler.log_message = lambda *a: None
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    yield tmp_path, f'http://127.0.0.1:{server.server_port}'
    server.shutdown()


def probe(site_, detail, *paths):
    pytest.importorskip('playwright.sync_api')
    _, base = site_
    state = ASK(detail)
    return functional.run(base, functional.select(state), lambda stage: {'token': 't', 'request_id': 1} if stage == 'seed' else None,
                          state=state, pages=list(paths))


def test_text_oracle_passes_only_when_the_page_really_shows_the_quoted_text(site):
    root, _ = site
    (root / 'ok.html').write_text('<meta charset=utf-8><body><p>Tizia   cập nhật</p><script>/* Nộp bài */</script></body>', encoding='utf-8')
    (root / 'late.html').write_text("<meta charset=utf-8><body><script>setTimeout(() => document.body.append('Xin chào'), 400)</script></body>", encoding='utf-8')
    (root / 'attr.html').write_text('<meta charset=utf-8><body><input placeholder="Tìm hoạt động"></body>', encoding='utf-8')
    assert probe(site, "Thêm 'tizia cập nhật'", '/ok.html')['passed']          # whitespace and case do not matter
    assert probe(site, "Thêm 'Xin chào'", '/late.html')['passed']               # waits for JS-rendered text
    assert probe(site, "Thêm 'Tìm hoạt động'", '/attr.html')['passed']          # placeholder is shown text
    missing = probe(site, "Thêm 'Nộp bài'", '/ok.html')                         # only inside <script>: not on screen
    assert not missing['passed'] and 'Nộp bài' in missing['reason']
    gone = probe(site, "Bỏ dòng 'Tizia cập nhật'", '/ok.html')
    assert not gone['passed'] and 'vẫn còn' in gone['reason']
    assert probe(site, "Đổi 'Gửi' thành 'Tizia cập nhật'", '/ok.html')['passed']  # old text never there, new one is
    result = probe(site, "Thêm 'Tizia cập nhật'", '/ok.html')
    assert result['probe_id'] == functional.TEXT_PROBE and result['coverage'] == {'rendered_text': True}


def test_text_oracle_without_a_page_to_look_at_does_not_pass(site):
    result = probe(site, "Thêm 'Tizia cập nhật'")
    assert not result['passed'] and 'trang' in result['reason']


def test_text_oracle_does_not_pin_the_plan_to_the_queue_files():
    assert functional.expected_targets(ASK("Thêm dòng 'Tizia cập nhật' vào chân trang")) == set()
    assert functional.expected_targets(ASK('Ẩn ETA khi worker tắt')) == {'public/js/suggestion-fab.js'}


def test_instead_of_marks_the_text_that_must_go_not_the_text_to_show():
    expect = functional.text_expectation
    assert expect(ASK("Hãy hiện 'Chưa có dữ liệu' thay vì 'Đang tải'")) == {'present': ['Chưa có dữ liệu'], 'absent': ['Đang tải']}
    assert expect(ASK("Show 'Empty list' instead of 'Loading'")) == {'present': ['Empty list'], 'absent': ['Loading']}


def test_removing_a_short_word_is_not_fooled_by_longer_text_that_contains_it(site):
    root, _ = site
    # the suggestion button's own label contains 'Gửi'; only a line that IS the word counts as still showing it
    (root / 'fab.html').write_text('<meta charset=utf-8><body><button aria-label="Gửi đề nghị tới Ban">Gửi đề nghị tới Ban</button><p>Nộp bài</p></body>', encoding='utf-8')
    (root / 'still.html').write_text('<meta charset=utf-8><body><button>Gửi</button><p>Nộp bài</p></body>', encoding='utf-8')
    assert probe(site, "Đổi 'Gửi' thành 'Nộp bài'", '/fab.html')['passed']
    still = probe(site, "Đổi 'Gửi' thành 'Nộp bài'", '/still.html')
    assert not still['passed'] and 'vẫn còn' in still['reason']
    (root / 'long.html').write_text('<meta charset=utf-8><body><p>Hết hạn dùng thử, mời nâng cấp</p></body>', encoding='utf-8')
    assert not probe(site, "Bỏ dòng 'Hết hạn dùng thử'", '/long.html')['passed']  # long phrases still match inside a line


def test_queue_oracle_text_patterns_ignore_case_so_a_capitalised_sentence_counts():
    # the requester quoted 'chưa thể ước tính thời gian' mid-sentence; a sentence-initial capital is the same words
    assert functional.OFFLINE_TEXT.search('Chưa thể ước tính thời gian')
    assert functional.OFFLINE_TEXT.search('Đang chờ Ban điều hành — chưa thể ước tính thời gian.')
    assert functional.READY_TEXT.search('khoảng 3 Phút nữa tới lượt')
    assert not functional.OFFLINE_TEXT.search('Đang xếp hàng: thứ 1')


# ---- copy-response-v1 / search-activity-v1: behaviour oracles for the two other reported regressions ----
def test_behaviour_oracles_are_selected_from_the_request_and_server_trusts_them():
    assert functional.select(ASK('Thêm nút sao chép phản hồi của Ban điều hành')) == functional.COPY_PROBE
    assert functional.select(ASK('Add a copy button to every AI response')) == functional.COPY_PROBE
    assert functional.select(ASK('Thêm ô tìm kiếm hoạt động trong trang trường')) == functional.SEARCH_PROBE
    assert functional.select(ASK('Search activities by name')) == functional.SEARCH_PROBE
    assert functional.select(ASK("Thêm nút 'Sao chép' vào phản hồi")) == functional.COPY_PROBE  # behaviour beats the quoted label
    assert functional.select(ASK("Đổi chữ 'Sao chép phản hồi' thành 'Copy'")) == functional.TEXT_PROBE  # a rename is only text
    assert functional.select(ASK('Sao chép bài viết')) is None
    assert functional.ORACLES[functional.COPY_PROBE] == ('clipboard',)
    assert functional.ORACLES[functional.SEARCH_PROBE] == ('filtering',)


THREAD = {'request': {'id': 1, 'status': 'reviewing', 'student': 'Queue Verify'}, 'messages': [
    {'role': 'student', 'author_name': 'Queue Verify', 'body': 'Cho em hỏi', 'created_at': 1},
    {'role': 'ai', 'author_name': 'Ban điều hành AI', 'body': 'Chào bạn,\nĐã xem & sẽ <làm> sớm.', 'created_at': 2}]}


def thread_module(button):
    return """export async function renderRequestThread({host, requestId}) {
  const d = await (await fetch(`api/requests/${requestId}/thread`)).json();
  host.innerHTML = d.messages.map(m => `<div class="rt-msg ${m.role === 'ai' ? 'rt-board' : 'rt-student'}"><div class="rt-body"></div>${m.role === 'ai' ? '<button class="cp">Sao chép</button>' : ''}</div>`).join('');
  [...host.querySelectorAll('.rt-body')].forEach((el, i) => { el.textContent = d.messages[i].body; });
  host.querySelectorAll('.cp').forEach(b => { b.onclick = () => { %s }; });
}""" % button


COPY_BUTTONS = {
    'ok': "navigator.clipboard.writeText(b.parentElement.querySelector('.rt-body').textContent)",
    'noop': '',
    'whole_thread': "navigator.clipboard.writeText(host.innerText)",
    'exec': "const t = document.createElement('textarea'); t.value = b.parentElement.querySelector('.rt-body').textContent; document.body.append(t); t.select(); document.execCommand('copy'); t.remove();",
}


def copy_site(site_, button):
    import json
    root, _ = site_
    (root / 'js').mkdir(exist_ok=True)
    (root / 'js' / 'request-thread.js').write_text(thread_module(COPY_BUTTONS[button]), encoding='utf-8')
    (root / 'api' / 'requests' / '1').mkdir(parents=True, exist_ok=True)
    (root / 'api' / 'requests' / '1' / 'thread').write_text(json.dumps(THREAD), encoding='utf-8')
    (root / 'school.html').write_text('<meta charset=utf-8><body></body>', encoding='utf-8')


def copy_probe(site_):
    pytest.importorskip('playwright.sync_api')
    _, base = site_
    state = ASK('Thêm nút sao chép phản hồi')
    thread = lambda stage: {'token': 't', 'request_id': 1, 'student': 'Queue Verify', 'student_body': 'Cho em hỏi',
                            'ai_body': THREAD['messages'][1]['body']} if stage == 'thread' else None
    return functional.run(base, functional.select(state), thread, state=state, pages=['/school.html'])


def test_copy_oracle_passes_only_when_the_button_puts_the_response_on_the_clipboard(site):
    copy_site(site, 'ok')
    result = copy_probe(site)
    assert result['passed'] and result['probe_id'] == functional.COPY_PROBE and result['coverage'] == {'clipboard': True}
    copy_site(site, 'exec')
    assert copy_probe(site)['passed']              # the old execCommand('copy') route counts too
    copy_site(site, 'noop')
    noop = copy_probe(site)
    assert not noop['passed'] and 'clipboard' in noop['reason']  # the button exists but copies nothing
    copy_site(site, 'whole_thread')
    assert not copy_probe(site)['passed']          # copied the student's message too: not "the response"


def test_copy_oracle_fails_when_there_is_no_copy_button(site):
    copy_site(site, 'ok')
    (site[0] / 'js' / 'request-thread.js').write_text(thread_module('').replace('Sao chép', 'Gửi'), encoding='utf-8')
    result = copy_probe(site)
    assert not result['passed'] and 'nút' in result['reason']


CARDS = ['Quiz nhanh', 'Lab dược lý', 'Bản đồ trường', 'Thử thách streak']


def search_site(site_, mode):
    root, _ = site_
    script = {
        'filter': "q.oninput = () => cards.forEach(c => { c.hidden = !c.textContent.toLowerCase().includes(q.value.toLowerCase()); });",
        'noop': '',
        'nobox': '',
        'hide_all': "q.oninput = () => cards.forEach(c => { c.hidden = !!q.value; });",
    }[mode]
    box = '' if mode == 'nobox' else '<input type="search" id="q" placeholder="Tìm hoạt động">'
    cards = ''.join(f'<a class="tz-se-card" href="#"><div class="nm">{name}</div></a>' for name in CARDS)
    (root / 'school.html').write_text(f"""<meta charset=utf-8><body><div id="school-explore-host">{box}<div>{cards}</div></div>
<script>const q = document.getElementById('q'), cards = [...document.querySelectorAll('.tz-se-card')]; if (q) {{ {script} }}</script></body>""",
                                      encoding='utf-8')


def search_probe(site_):
    pytest.importorskip('playwright.sync_api')
    _, base = site_
    state = ASK('Thêm ô tìm kiếm hoạt động')
    return functional.run(base, functional.select(state), lambda stage: {'token': 't', 'request_id': 1} if stage == 'seed' else None,
                          state=state, pages=['/school.html?domain=it'])


def test_search_oracle_passes_only_when_typing_narrows_the_activities_and_clearing_restores_them(site):
    search_site(site, 'filter')
    result = search_probe(site)
    assert result['passed'] and result['probe_id'] == functional.SEARCH_PROBE and result['coverage'] == {'filtering': True}
    for mode, word in [('nobox', 'ô tìm'), ('noop', 'lọc'), ('hide_all', 'khớp')]:
        search_site(site, mode)
        out = search_probe(site)
        assert not out['passed'] and word in out['reason'], (mode, out)


def _lan_ip():
    import socket
    probe = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        probe.connect(('10.255.255.255', 1))  # no packet is sent; picks the interface a LAN peer would use
        ip = probe.getsockname()[0]
    except OSError:
        return None
    finally:
        probe.close()
    return None if ip.startswith('127.') else ip


def test_copy_oracle_also_works_when_the_app_is_reached_by_a_container_ip(tmp_path):
    """Gate 5 opens the candidate by its container IP: plain http on a non-loopback host has no navigator.clipboard,
    so the browser must be started treating that origin as secure."""
    import functools, http.server, threading
    pytest.importorskip('playwright.sync_api')
    ip = _lan_ip()
    if ip is None:
        pytest.skip('no non-loopback address on this machine')
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(tmp_path))
    handler.log_message = lambda *a: None
    server = http.server.ThreadingHTTPServer(('0.0.0.0', 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        state = ASK('Thêm nút sao chép phản hồi')
        thread = lambda stage: {'token': 't', 'request_id': 1, 'student': 'Queue Verify', 'student_body': 'Cho em hỏi',
                                'ai_body': THREAD['messages'][1]['body']} if stage == 'thread' else None
        for button in ('ok', 'exec', 'noop', 'whole_thread'):
            copy_site((tmp_path, None), button)
            result = functional.run(f'http://{ip}:{server.server_port}', functional.select(state), thread, state=state, pages=['/school.html'])
            assert result['passed'] is (button in ('ok', 'exec')), (button, result)
    finally:
        server.shutdown()
