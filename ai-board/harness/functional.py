"""Harness-owned behavioral oracles. Candidate-authored tests are supplementary."""
import json
import re
import unicodedata


QUEUE_PROBE = 'queue-worker-availability-v1'
TEXT_PROBE = 'text-visible-v1'
READY_TEXT = re.compile('phút nữa', re.IGNORECASE)  # ETA line shown while a worker is ready or busy
OFFLINE_TEXT = re.compile('chưa thể ước tính', re.IGNORECASE)  # the requester's own words; a sentence-initial capital is the same text
# Oracle -> coverage flags it must report true. Keep in sync with ORACLE_COVERAGE in server/ai-board/store.js.
ORACLES = {QUEUE_PROBE: ('requester_api', 'mounted_ui', 'recovery'), TEXT_PROBE: ('rendered_text',)}

_QUOTED = re.compile(r"""(?<!\w)(?:'([^'\n]{2,120})'|"([^"\n]{2,120})"|“([^”\n]{2,120})”|‘([^’\n]{2,120})’|«([^»\n]{2,120})»)""")
_PAGE_LINE = re.compile(r'^\[Trang: .*\] \S+[ \t]*$', re.M)
_ADD = re.compile(r'\b(thêm|chèn|hiển thị|hiện|add|insert|show|display)\b')
_REMOVE = re.compile(r'\b(bỏ|xóa|xoá|gỡ|remove|delete)\b')
_INSTEAD = re.compile(r'\b(thay vì|thay vào đó|instead of|rather than)\b')
_REPLACE = re.compile(r'\b(đổi|thay|rename|change|replace)\b[^\n]*?(thành|bằng|→|->|\bto\b)')


def request_text(state):
    text = str(state.get('request_title') or '') + '\n' + str(state.get('request_detail') or '')
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return text


def text_expectation(state):
    """Words the requester quoted + what should happen to them: {'present': [...], 'absent': [...]}.
    Empty when the request does not pin the text down (no quotes, no intent verb, add and remove at once)."""
    raw = str(state.get('request_title') or '') + '\n' + str(state.get('request_detail') or '')
    raw = _PAGE_LINE.sub('', raw)  # the requester's own page, not words they asked for
    quotes = [next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw)]
    words = unicodedata.normalize('NFC', raw.lower())
    add, remove, replace = _ADD.search(words), _REMOVE.search(words), _REPLACE.search(words)
    none = {'present': [], 'absent': []}
    if not quotes or (remove and (add or replace)):
        return none
    cut = _INSTEAD.search(raw.lower())  # "show 'X' instead of 'Y'": Y must go, not show
    if cut and not remove:
        head = [next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw[:cut.start()])]
        tail = [next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw[cut.end():])]
        if head and tail:
            return {'present': head, 'absent': tail}
    if replace and len(quotes) >= 2:
        return {'present': [quotes[-1]], 'absent': [quotes[0]] if quotes[0] != quotes[-1] else []}
    if add:
        return {'present': quotes, 'absent': []}
    return {'present': [], 'absent': quotes} if remove else none


def select(state):
    text = request_text(state)
    if 'worker' in text and re.search(r'\beta\b|uoc tinh|phut|estimate', text):
        return QUEUE_PROBE
    expected = text_expectation(state)
    return TEXT_PROBE if expected['present'] or expected['absent'] else None


def expected_targets(state):
    """Verified existing surfaces for the three reported regressions, not model-selected files."""
    text = request_text(state)
    if select(state) == QUEUE_PROBE:
        return {'public/js/suggestion-fab.js'}
    if re.search(r'copy|sao chep', text) and re.search(r'response|phan hoi', text):
        return {'public/js/request-thread.js'}
    if re.search(r'search|tim kiem', text) and re.search(r'activity|activities|hoat dong', text):
        return {'public/js/school-explore.js'}
    return set()


def _norm(text):
    return ' '.join(unicodedata.normalize('NFC', text).split()).casefold()


_SHOWN = r"""() => [document.title, document.body.innerText, ...[...document.querySelectorAll('[placeholder],[aria-label],[title],[alt]')]
  .flatMap(e => ['placeholder', 'aria-label', 'title', 'alt'].map(a => e.getAttribute(a) || ''))].join('\n')"""


def _still_shown(text, lines):
    """A short word counts as shown only when a visible line IS that word (a button label holding it as a word does not);
    a long phrase also counts inside a line."""
    t = _norm(text)
    return any(line == t or (len(t) >= 12 and t in line) for line in lines)


def run_text(base, state, fixture, pages):
    """Open the changed page(s) as a logged-in user; every quoted 'present' text must show, every 'absent' one must not."""
    expected = text_expectation(state)
    fail = lambda reason, **extra: {'probe_id': TEXT_PROBE, 'passed': False, 'reason': reason, **extra}
    if not pages:
        return fail('Không có trang nào để quan sát chữ hiển thị')
    if fixture is None:
        return fail('Session fixture unavailable')
    from playwright.sync_api import sync_playwright
    from gates.verify import _launch
    present, absent = [_norm(t) for t in expected['present']], [_norm(t) for t in expected['absent']]
    shown, lines = {}, []
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            context = browser.new_context()
            context.add_cookies([{'name': 'tizia_sid', 'value': fixture('seed')['token'], 'url': base, 'httpOnly': True}])
            for path in pages[:3]:
                page = context.new_page()
                page.goto(base + path, wait_until='domcontentloaded', timeout=20000)
                text = ''
                for _ in range(16):  # JS-rendered text can arrive late
                    text = _norm(page.evaluate(_SHOWN))
                    if all(t in text for t in present):
                        break
                    page.wait_for_timeout(500)
                shown[path] = text
                lines += [_norm(line) for line in page.evaluate('() => document.body.innerText').splitlines() if line.strip()]
        except Exception as error:
            return fail(str(error)[:1000])
        finally:
            browser.close()
    seen = ' '.join(shown.values())
    missing = [t for t in expected['present'] if _norm(t) not in seen]
    lingering = [t for t in expected['absent'] if _still_shown(t, lines)]
    reason = None
    if missing:
        reason = 'Chữ người dùng yêu cầu không hiển thị trên trang: ' + ', '.join(repr(t) for t in missing)
    elif lingering:
        reason = 'Chữ cần bỏ vẫn còn trên trang: ' + ', '.join(repr(t) for t in lingering)
    return {'probe_id': TEXT_PROBE, 'passed': reason is None, 'reason': reason, 'coverage': {'rendered_text': True},
            'observations': {'expected': json.dumps(expected, ensure_ascii=False),
                             **{f'page {path}': text[:1000] for path, text in shown.items()}}}


def run(base, probe_id, fixture=None, state=None, pages=()):
    if probe_id == TEXT_PROBE:
        return run_text(base, state or {}, fixture, list(pages))
    if probe_id != QUEUE_PROBE:
        return {'probe_id': None, 'passed': False, 'reason': 'No trusted behavioral oracle for this request'}
    if fixture is None:
        return {'probe_id': probe_id, 'passed': False, 'reason': 'Requester API and mounted UI fixture unavailable'}
    from playwright.sync_api import sync_playwright
    from gates.verify import _launch
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            seed = fixture('seed')
            context = browser.new_context()
            context.add_cookies([{'name':'tizia_sid','value':seed['token'],'url':base,'httpOnly':True}])
            page = context.new_page()
            page.goto(base + '/school.html?domain=it', wait_until='domcontentloaded', timeout=20000)
            page.evaluate("async () => { const {setPlayerName} = await import('/js/api.js'); setPlayerName('Queue Verify'); await import('/js/suggestion-fab.js'); }")
            page.locator('#sgf-fab').click()
            page.locator('#sgf-root [data-tab="mine"]').click()
            observations = {}
            item = page.locator(f'[data-item="{seed["request_id"]}"]')
            for stage in ('offline','busy','stale','ready'):
                fixture(stage)
                data = page.request.get(base + '/api/requests?domain=it').json()
                request = next(r for r in data['items'] if r['id'] == seed['request_id'])
                queue = request.get('queue') or {}
                ready = stage in ('busy','ready')
                if queue.get('worker_ready') is not ready or (queue.get('eta_s') is None) == ready:
                    raise RuntimeError('Requester API reports incorrect worker availability: ' + stage)
                # Wait on the already open inbox, without reload or calling the renderer ourselves.
                if ready:
                    item.get_by_text(READY_TEXT).wait_for(timeout=12000)
                else:
                    item.get_by_text(OFFLINE_TEXT).wait_for(timeout=12000)
                    if READY_TEXT.search(item.inner_text()):
                        raise RuntimeError('Offline worker still has a queue ETA')
                observations[stage] = item.inner_text()[:1000]
            return {'probe_id':probe_id,'passed':True,'observations':observations,
                    'coverage':{'requester_api':True,'mounted_ui':True,'recovery':True},'reason':None}
        except Exception as error:
            return {'probe_id':probe_id,'passed':False,'reason':str(error)[:1000]}
        finally:
            browser.close()
