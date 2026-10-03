"""Harness-owned behavioral oracles. Candidate-authored tests are supplementary."""
import json
import re
import unicodedata


QUEUE_PROBE = 'queue-worker-availability-v1'
TEXT_PROBE = 'text-visible-v1'
COPY_PROBE = 'copy-response-v1'
SEARCH_PROBE = 'search-activity-v1'
SEARCH_PAGE = '/school.html?domain=it'
READY_TEXT = re.compile('phút nữa', re.IGNORECASE)  # ETA line shown while a worker is ready or busy
OFFLINE_TEXT = re.compile('chưa thể ước tính', re.IGNORECASE)  # the requester's own words; a sentence-initial capital is the same text
# Oracle -> coverage flags it must report true. Keep in sync with ORACLE_COVERAGE in server/ai-board/store.js.
ORACLES = {QUEUE_PROBE: ('requester_api', 'mounted_ui', 'recovery'), TEXT_PROBE: ('rendered_text',),
           COPY_PROBE: ('clipboard',), SEARCH_PROBE: ('filtering',)}

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


def behaviour_probe(text):
    """Oracle named by the request's own words (text = request_text); None when it names neither surface."""
    if re.search(r'copy|sao chep', text) and re.search(r'response|phan hoi', text):
        return COPY_PROBE
    if re.search(r'search|tim kiem', text) and re.search(r'activity|activities|hoat dong', text):
        return SEARCH_PROBE
    return None


def select(state):
    text = request_text(state)
    if 'worker' in text and re.search(r'\beta\b|uoc tinh|phut|estimate', text):
        return QUEUE_PROBE
    expected = text_expectation(state)
    if not expected['absent']:  # a rename or removal of a label is only text; otherwise the behaviour is what counts
        probe = behaviour_probe(text)
        if probe:
            return probe
    return TEXT_PROBE if expected['present'] or expected['absent'] else None


SURFACES = {QUEUE_PROBE: {'public/js/suggestion-fab.js'}, COPY_PROBE: {'public/js/request-thread.js'},
            SEARCH_PROBE: {'public/js/school-explore.js'}}


def expected_targets(state):
    """Verified existing surfaces for the three reported regressions, not model-selected files."""
    return SURFACES.get(select(state)) or SURFACES.get(behaviour_probe(request_text(state)), set())


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
    from gates import visual
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
                visual.settle(page)  # judge the page the user ends up with, not the static HTML a script is about to rewrite
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


_MOUNT = """async ([id, me]) => {
  const { renderRequestThread } = await import('/js/request-thread.js?oracle=' + Date.now());
  const host = document.createElement('div');
  host.id = 'oracle-thread';
  document.body.appendChild(host);
  await renderRequestThread({ host, requestId: id, me });
}"""
_TAG_COPY = r"""() => {
  const host = document.getElementById('oracle-thread');
  const label = (e) => [e.innerText, e.getAttribute('aria-label'), e.getAttribute('title')].filter(Boolean).join(' ');
  const hits = [...host.querySelectorAll('button, [role=button], a')].filter((e) => /copy|sao ch[eé]p|chép/i.test(label(e)));
  const target = hits.find((e) => e.closest('.rt-board')) || hits[0];
  if (target) target.setAttribute('data-oracle-copy', '1');
  return !!target;
}"""
_CARDS = r"""() => [...document.querySelectorAll('.tz-se-card')].map((c) => ({
  name: ((c.querySelector('.nm') || c).textContent || '').trim(),
  shown: c.checkVisibility ? c.checkVisibility({ checkVisibilityCSS: true }) : !!(c.offsetWidth || c.offsetHeight) }))"""
_TAG_SEARCH = r"""() => {
  const shown = (e) => (e.checkVisibility ? e.checkVisibility() : !!(e.offsetWidth || e.offsetHeight));
  const all = [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]), [role=searchbox], [contenteditable=true]')].filter(shown);
  const score = (e) => (e.closest('#school-explore-host') ? 2 : 0)
    + (/tìm|tim kiem|search/i.test([e.placeholder, e.getAttribute('aria-label'), e.name, e.id, e.type].join(' ')) ? 1 : 0);
  all.sort((a, b) => score(b) - score(a));
  if (all[0]) all[0].setAttribute('data-oracle-search', '1');
  return !!all[0];
}"""


# Gate 5 reaches the candidate by container IP over plain http, where navigator.clipboard does not exist (and a
# headless-shell Chromium ignores --unsafely-treat-insecure-origin-as-secure). Give such a page the API an https page
# has, backed by a variable, and also record text copied through execCommand('copy'). A secure origin keeps the real API.
_CLIPBOARD_SPY = r"""(() => {
  window.__oracleClip = null;
  const record = (text) => { window.__oracleClip = String(text); };
  if (!navigator.clipboard) {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: (text) => { record(text); return Promise.resolve(); },
      readText: () => Promise.resolve(window.__oracleClip == null ? '' : window.__oracleClip),
    } });
    document.addEventListener('copy', () => {
      const el = document.activeElement;
      const typed = el && typeof el.value === 'string' && el.selectionEnd > el.selectionStart ? el.value.slice(el.selectionStart, el.selectionEnd) : '';
      record(typed || String(getSelection()));
    }, true);
  }
})();"""


def _open(p, base, token, clipboard=False):
    from gates.verify import _launch
    browser = _launch(p)
    context = browser.new_context()
    if clipboard:
        context.grant_permissions(['clipboard-read', 'clipboard-write'], origin=base)
        context.add_init_script(_CLIPBOARD_SPY)
    context.add_cookies([{'name': 'tizia_sid', 'value': token, 'url': base, 'httpOnly': True}])
    return browser, context.new_page()


def run_copy(base, fixture):
    """The AI response's copy control must put that response, and only it, on the clipboard."""
    result = lambda reason, **extra: {'probe_id': COPY_PROBE, 'passed': reason is None, 'reason': reason,
                                      'coverage': {'clipboard': True}, **extra}
    if fixture is None:
        return {'probe_id': COPY_PROBE, 'passed': False, 'reason': 'Session fixture unavailable'}
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = None
        try:
            seeded = fixture('thread')
            browser, page = _open(p, base, seeded['token'], clipboard=True)
            page.goto(base + '/school.html', wait_until='domcontentloaded', timeout=20000)
            page.evaluate(_MOUNT, [seeded['request_id'], seeded['student']])
            page.wait_for_selector('#oracle-thread .rt-board', timeout=8000)
            if not page.evaluate(_TAG_COPY):
                return result('Không có nút sao chép phản hồi trong phiên trao đổi')
            sentinel = '__oracle_untouched__'
            page.evaluate('(s) => navigator.clipboard.writeText(s)', sentinel)
            page.click('[data-oracle-copy]', timeout=5000)
            copied = sentinel
            for _ in range(10):  # the copy may finish after an await
                copied = page.evaluate('() => navigator.clipboard.readText()')
                if copied != sentinel:
                    break
                page.wait_for_timeout(300)
            if copied == sentinel:
                return result('Bấm nút sao chép nhưng clipboard không đổi')
            got = _norm(copied)
            if _norm(seeded['ai_body']) not in got:
                return result('Clipboard không chứa trọn nội dung phản hồi: ' + copied[:200])
            if _norm(seeded['student_body']) in got:
                return result('Clipboard chứa cả tin nhắn của người dùng, chỉ cần phản hồi: ' + copied[:200])
            return result(None, observations={'clipboard': copied[:1000]})
        except Exception as error:
            return {'probe_id': COPY_PROBE, 'passed': False, 'reason': str(error)[:1000]}
        finally:
            if browser:
                browser.close()


def _query(names):
    """A word (or 4-letter prefix) that matches some cards but not all; the rarest, then the longest."""
    words = {w for name in names for w in re.findall(r'\w{4,}', _norm(name))} | {_norm(n)[:4] for n in names}
    hits = {w: sum(w in _norm(n) for n in names) for w in words if len(w) >= 3}
    fit = [w for w, n in hits.items() if 0 < n < len(names)]
    return min(fit, key=lambda w: (hits[w], -len(w), w)) if fit else None


def run_search(base, fixture):
    """Typing narrows the activity cards to those matching; clearing the box restores them all."""
    result = lambda reason, **extra: {'probe_id': SEARCH_PROBE, 'passed': reason is None, 'reason': reason,
                                      'coverage': {'filtering': True}, **extra}
    if fixture is None:
        return {'probe_id': SEARCH_PROBE, 'passed': False, 'reason': 'Session fixture unavailable'}
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = None
        try:
            browser, page = _open(p, base, fixture('seed')['token'])
            page.goto(base + SEARCH_PAGE, wait_until='domcontentloaded', timeout=20000)
            cards = []
            for _ in range(16):
                cards = page.evaluate(_CARDS)
                if len(cards) >= 2:
                    break
                page.wait_for_timeout(500)
            if len(cards) < 2:
                return result('Không thấy danh sách hoạt động trên trang')
            names = [c['name'] for c in cards]
            query = _query(names)
            if query is None:
                return result('Không chọn được từ khóa thử trong ' + ', '.join(names)[:200])
            found = False
            for _ in range(6):  # the box may be added after the cards
                if page.evaluate(_TAG_SEARCH):
                    found = True
                    break
                page.wait_for_timeout(500)
            if not found:
                return result('Không thấy ô tìm kiếm hoạt động trên trang')
            page.fill('[data-oracle-search]', query)
            problem = None
            for _ in range(8):  # debounce
                page.wait_for_timeout(300)
                now = page.evaluate(_CARDS)
                shown = [c['name'] for c in now if c['shown']]
                matching = [n for n in names if query in _norm(n)]
                if any(query not in _norm(n) for n in shown) or len(shown) == len(names):
                    problem = f'Gõ {query!r} nhưng danh sách không lọc: còn hiện ' + ', '.join(shown)[:300]
                elif any(n not in shown for n in matching):
                    problem = f'Hoạt động khớp {query!r} bị ẩn mất, đang hiện: ' + ', '.join(shown)[:300]
                else:
                    problem = None
                    break
            if problem:
                return result(problem)
            page.fill('[data-oracle-search]', '')
            for _ in range(8):
                page.wait_for_timeout(300)
                if all(c['shown'] for c in page.evaluate(_CARDS)):
                    return result(None, observations={'query': query, 'cards': ', '.join(names)[:500]})
            return result('Xóa ô tìm kiếm nhưng danh sách hoạt động không hiện lại đủ')
        except Exception as error:
            return {'probe_id': SEARCH_PROBE, 'passed': False, 'reason': str(error)[:1000]}
        finally:
            if browser:
                browser.close()


def run(base, probe_id, fixture=None, state=None, pages=()):
    if probe_id == TEXT_PROBE:
        return run_text(base, state or {}, fixture, list(pages))
    if probe_id == COPY_PROBE:
        return run_copy(base, fixture)
    if probe_id == SEARCH_PROBE:
        return run_search(base, fixture)
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
