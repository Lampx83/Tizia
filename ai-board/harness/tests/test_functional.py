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
