"""Harness-owned behavioral oracles. Candidate-authored tests are supplementary."""
import json
import re
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

from settings import get_settings
from verification import checks
from verification.guest_inputs import guest_input


NO_ORACLE = 'No trusted behavioral oracle for this request'
QUEUE_PROBE = 'queue-worker-availability-v1'
TEXT_PROBE = 'text-visible-v1'
COPY_PROBE = 'copy-response-v1'
SEARCH_PROBE = 'search-activity-v1'
ROUTE_PROBE = 'fallback-route-v1'
FALLBACK_TEXT_PROBE = 'fallback-rendered-text-v1'
STYLE_PROBE = 'computed-style-v1'
SEARCH_PAGE = '/school.html?domain=it'
READY_TEXT = re.compile('phút nữa', re.IGNORECASE)  # ETA line shown while a worker is ready or busy
OFFLINE_TEXT = re.compile('chưa thể ước tính', re.IGNORECASE)  # the requester's own words; a sentence-initial capital is the same text
# Oracle -> coverage flags it must report true. Keep in sync with ORACLE_COVERAGE in server/ai-board/repositories/store-contract.js.
ORACLES = {QUEUE_PROBE: ('requester_api', 'mounted_ui', 'recovery'), TEXT_PROBE: ('rendered_text',),
           COPY_PROBE: ('clipboard',), SEARCH_PROBE: ('filtering',), ROUTE_PROBE: ('route_contract',),
           FALLBACK_TEXT_PROBE: ('rendered_text',), STYLE_PROBE: ('computed_style',)}

_QUOTED = re.compile(r"""(?<!\w)(?:'([^'\n]{2,120})'|"([^"\n]{2,120})"|“([^”\n]{2,120})”|‘([^’\n]{2,120})’|«([^»\n]{2,120})»)""")
_PAGE_LINE = re.compile(r'^\[Trang: .*\] \S+[ \t]*$', re.M)
_ADD = re.compile(r'\b(thêm|chèn|hiển thị|hiện|add|insert|show|display)\b')
_REMOVE = re.compile(r'\b(bỏ|xóa|xoá|gỡ|remove|delete)\b')
_INSTEAD = re.compile(r'\b(thay vì|thay vào đó|instead of|rather than)\b')
_REPLACE = re.compile(r'\b(đổi|thay|rename|change|replace)\b[^\n]*?(thành|bằng|→|->|\bto\b)')


_IDENTIFIER = re.compile(r'^\S*[-_/.:]\S*$')
_FILE_CLAUSE = re.compile(r'(chuỗi|chứa|string|contains?|tệp|file|đăng ký|register)[^\n"“‘«\']{0,20}$')


def _quoted(raw):
    """[(text, is_label)]: a quote is a visible label unless it is one token shaped like a slug/path/code or sits in a clause about file content."""
    out = []
    for m in _QUOTED.finditer(raw):
        text = next(g for g in m.groups() if g)
        before = raw[max(0, m.start() - 40):m.start()].lower()
        out.append((text, not (_IDENTIFIER.match(text) or _FILE_CLAUSE.search(before))))
    return out


_CSS_SIMPLE = r'(?:[A-Za-z_*][\w-]*|[.#][A-Za-z_][\w-]*|\[[\w-]+(?:[~|^$*]?=[^\]]*)?\])(?:[.#][A-Za-z_][\w-]*|::?[a-z-]+|\[[^\]]*\])*'
_CSS_SELECTOR = re.compile(rf'^{_CSS_SIMPLE}(?:\s*[>+~]?\s*{_CSS_SIMPLE})*$')
_HEX_COLOR = re.compile(r'^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$')
_CSS_MARK = re.compile(r'[.#\[>+~:]')


def _skip_selectors():
    """Flag AI_BOARD_TEXT_ORACLE_SKIP_SELECTOR=1: CSS selectors in quotes are code, not visible text."""
    return get_settings().text_oracle_skip_selector


def _is_css_selector(text):
    """Quote shaped like a CSS selector or a hex color (ASCII only, selector has a marker like '.', '#', '>', ':')."""
    text = text.strip()
    return bool(_HEX_COLOR.match(text) or (_CSS_MARK.search(text) and _CSS_SELECTOR.match(text)))


def _text_quotes(raw):
    """Quoted strings the oracle may treat as visible text (selectors dropped when the flag is on)."""
    found = [next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw)]
    return [q for q in found if not (_skip_selectors() and _is_css_selector(q))]


def quoted(raw: str) -> list[str]:
    """Quoted strings in text (the _QUOTED notion above): any quote style, 2-120 chars."""
    return [next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw or "")]


def request_text(state):
    text = str(guest_input(state, 'request_title') or '') + '\n' + str(guest_input(state, 'request_detail') or '')
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return text


_PAIR_GAP = re.compile(r'\s*(?:(?:đổi|thay|chuyển)\s+)?(?:thành|bằng|→|->|to)\s*', re.I)
_PAIR_CUE = re.compile(r'\b(?:thành|bằng|to)\b|→|->', re.I)
_ANCHOR_CUE = re.compile(r'\b(?:sau|dưới|after|below)\s+(?:the\s+)?(?:dòng|câu|chữ|line|text)\s*$', re.I)
# "Thêm dòng … : <text>": the text after the colon is the literal, to the end of the line, punctuation included
_COLON_LITERAL = re.compile(r'^[^\S\n]*(?:thêm|chèn|add|insert)\b[^:\n]*?\b(?:dòng|câu|chữ|đoạn|line|text|sentence)\b'
                            r'[^:\n]*:[^\S\n]*([^\n\'"“”‘’«»]{2,120}?)[^\S\n]*$', re.I | re.M)
# "Đổi … thành: <text>": the colon directly follows thành/bằng; "10:30" or "lưu ý:" later in the sentence is not a cue
_CUE = r'\b(?:đổi|thay|rename|change|replace)\b([^\n:]*?)\b(?:thành|bằng|to|into)\s*:[^\S\n]+'
_REPLACE_COLON = re.compile(_CUE + r'([^\n]+)', re.I)
_NEXT_CUE = re.compile(r'(?<=[.!?…])\s+(?:và\s+)?\b(?:đổi|thay|rename|change|replace)\b[^\n:]*?\b(?:thành|bằng|to|into)\s*:', re.I)
_ANY_CUE = re.compile(r'\b(?:thành|bằng|to|into)\s*:', re.I)
_STYLE_WORDS = re.compile(r'màu|colou?r|cỡ chữ|font|kích thước chữ|background|font-size', re.I)
_STYLE_VALUE = re.compile(r'#[0-9a-f]{3,8}\b|\b\d+(?:\.\d+)?\s?(?:px|rem|em|pt|%)|://|\bwww\.', re.I)
_PARTICLE = re.compile(r'(?:^|[\s,])(?:nha|nhé|nhe|nhá|ạ|cảm ơn|cám ơn|thanks|please)[\s.!…]*$', re.I)
_BOUNDARY = re.compile(r'[.!?…]+\s+(?=[A-ZÀ-Ỹ])')


def _line_literals(line):
    """[literal] after each 'thành:' of a line; None when a reading is uncertain (inner boundary, style/URL value, second cue)."""
    found, pos = [], 0
    while (m := _REPLACE_COLON.search(line, pos)):
        if _STYLE_WORDS.search(m.group(1)):
            return None
        rest = m.group(2)
        nxt = _NEXT_CUE.search(rest)
        piece = rest[:nxt.start()] if nxt else rest
        pos = m.start(2) + len(piece)
        lit = piece.strip()
        if not 2 <= len(lit) <= 120 or _ANY_CUE.search(lit) or _STYLE_VALUE.search(lit) or _PARTICLE.search(lit):
            return None
        found.append((lit, bool(_BOUNDARY.search(lit))))
    return found


def _replace_colon_literal(raw):
    """New texts written after 'thành:'; the title's reading wins over the detail's. A multi-sentence reading
    (inner sentence boundary), a style/URL value or a second cue is unsure -> []."""
    for part in raw.partition(chr(10))[::2]:
        lines = [_line_literals(line) for line in part.split(chr(10))]
        if None in lines:
            return []
        found = [item for line in lines for item in line]
        if any(inner for _, inner in found):
            return []
        if found:
            return list(dict.fromkeys(lit for lit, _ in found))
    return []


def _colon_replace(raw):
    words = raw.lower()
    if not _REPLACE.search(words) or _QUOTED.search(raw) or _REMOVE.search(words):
        return []
    return _replace_colon_literal(raw)


def colon_replace(state):
    """Unquoted new texts of a 'đổi … thành: X' request; [] unless the reading is certain."""
    return _colon_replace(_request_raw(state))


def _request_raw(state):
    raw = str(guest_input(state, 'request_title') or '') + '\n' + str(guest_input(state, 'request_detail') or '')
    return unicodedata.normalize('NFC', _PAGE_LINE.sub('', raw))  # the requester's own page, not words they asked for


def _pairs(raw, loose=False):
    """[(old, new)] when every quote sits in a "'old' thành 'new'" pair, else []; loose = adjacent pairs, other quotes allowed."""
    found = list(_QUOTED.finditer(raw))
    text = lambda m: next(g for g in m.groups() if g)
    if loose:
        return list(dict.fromkeys((text(a), text(b)) for a, b in zip(found, found[1:]) if _PAIR_GAP.fullmatch(raw[a.end():b.start()])))
    if not found or len(found) % 2 or not all(_PAIR_GAP.fullmatch(raw[a.end():b.start()]) for a, b in zip(found[::2], found[1::2])):
        return []
    return list(dict.fromkeys((text(a), text(b)) for a, b in zip(found[::2], found[1::2])))


_ALL_PAGES = re.compile(r'\b(?:mọi|tất cả(?: các)?|toàn bộ(?: các)?)\s+(?:trang|site|website|nơi|chỗ|chữ)\b(?!\s+khác)'
                        r'|\btrên toàn (?:site|website)\b|\bkhắp nơi\b|\bcả (?:hai|ba|bốn) trang\b|\beverywhere\b'
                        r'|\b(?:every|all)(?: the)? pages\b(?!\s+else)', re.I)
def all_pages(state):
    """Request asks for the change in several places, in the user's own words: every page or everywhere (named pages are resolved against the repo by the plan gate)."""
    raw = _QUOTED.sub(' ', _request_raw(state))
    return bool(_ALL_PAGES.search(raw))


def replace_pairs(state):
    """[(old, new)] quoted in a replace request, keep-as-is quotes around them ignored; one absent + one present quote
    when words sit between the old quote and 'thành'; [] when no replace verb."""
    raw = _request_raw(state)
    if not _REPLACE.search(raw.lower()):
        return []
    found = _pairs(raw, loose=True)
    if found:
        return found
    text = lambda m: next(g for g in m.groups() if g)
    quotes = list(_QUOTED.finditer(raw))
    if len({text(m) for m in quotes}) != 2:
        return []
    a = quotes[0]
    b = next((m for m in quotes if text(m) != text(a)), None)
    if b is None or not _PAIR_CUE.search(raw[a.end():b.start()]) or _PAIR_CUE.search(raw[:a.start()]):
        return []
    return [(text(a), text(b))]


def anchor(state):
    """Quoted text the request says to insert after/below ('sau dòng X'); None unless exactly one."""
    raw = _request_raw(state)
    found = {next(g for g in m.groups() if g) for m in _QUOTED.finditer(raw) if _ANCHOR_CUE.search(raw[max(0, m.start() - 30):m.start()])}
    return found.pop() if len(found) == 1 else None


def text_expectation(state):
    """Words the requester quoted (or wrote after 'thêm dòng …:') + what should happen to them: {'present': [...], 'absent': [...]}.
    Empty when the request does not pin the text down (no literal, no intent verb, add and remove at once)."""
    raw = _request_raw(state)
    quotes = _text_quotes(raw)
    ignored = [t for t, label in _quoted(raw) if not label]
    words = raw.lower()
    add, remove, replace = _ADD.search(words), _REMOVE.search(words), _REPLACE.search(words)
    none = {'present': [], 'absent': []}
    if remove and (add or replace):
        return none
    if not quotes:
        colon = list(dict.fromkeys(m.group(1) for m in _COLON_LITERAL.finditer(raw)))
        if add and colon and not _QUOTED.search(raw):
            return {'present': colon, 'absent': []}
        unquoted = _colon_replace(raw)
        return {'present': unquoted, 'absent': []} if unquoted else none
    shown = lambda items: [t for t in items if t not in ignored]
    cut = _INSTEAD.search(raw.lower())  # "show 'X' instead of 'Y'": Y must go, not show
    if cut and not remove:
        head = _text_quotes(raw[:cut.start()])
        tail = _text_quotes(raw[cut.end():])
        if head and tail:
            return {'present': shown(head), 'absent': tail}
    pairs = _pairs(raw) if replace else []
    if len(pairs) > 1:
        return {'present': shown([new for _, new in pairs]), 'absent': [old for old, new in pairs if old != new]}
    if replace and len(quotes) >= 2:
        return {'present': shown([quotes[-1]]), 'absent': [quotes[0]] if quotes[0] != quotes[-1] else []}
    if add:
        return {'present': shown(quotes), 'absent': []}
    return {'present': [], 'absent': quotes} if remove else none


def quoted_checks(state, pages):
    """text_present/text_absent from the requester's quoted words on the observed page; [] unless the text oracle is the oracle."""
    # ponytail: one page only; a per-path check cannot say "on any of these pages", add a union check if multi-page text cases matter.
    if len(pages) != 1 or select(state) != TEXT_PROBE:
        return []
    want = text_expectation(state)
    # an old text inside the new one ("A" -> "A nhé") can never be absent on a correct candidate
    want['absent'] = [old for old in want['absent'] if not any(old in new for new in want['present'])]
    made = [{'primitive': kind, 'path': pages[0], 'text': text}
            for kind, key in (('text_present', 'present'), ('text_absent', 'absent'))
            for text in want[key] if not _is_css_selector(text)]
    return [check for check in made if checks.problem(check) is None]


def behaviour_probe(text):
    """Oracle named by the request's own words (text = request_text); None when it names neither surface."""
    if re.search(r'copy|sao chep', text) and re.search(r'response|phan hoi', text):
        return COPY_PROBE
    # "ô tìm kiếm hoạt động" = the search box works (not search activity) — chỉ nhận cụm nói về lịch sử/hoạt động tìm kiếm.
    if re.search(r'search\s+(activity|activities|history)|lich su tim kiem|hoat dong tim kiem|tim kiem (da|gan day)', text):
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


_IN_DOM = r"""() => {
  const out = [document.title], skip = 'SCRIPT,STYLE,TEMPLATE,NOSCRIPT';
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) if (!n.parentElement.closest(skip)) out.push(n.nodeValue);
  document.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(e => {
    if (!e.closest(skip)) for (const a of ['placeholder', 'aria-label', 'title', 'alt']) out.push(e.getAttribute(a) || '');
  });
  return out.join('\n');
}"""


def _still_shown(text, lines):
    """A short word counts as shown only when a visible line IS that word (a button label holding it as a word does not);
    a long phrase also counts inside a line."""
    t = _norm(text)
    return any(line == t or (len(t) >= 12 and t in line) for line in lines)


def run_text(base, state, fixture, pages, expected=None, probe_id=TEXT_PROBE):
    """Open the changed page(s) as a logged-in user; every quoted 'present' text must show, every 'absent' one must not."""
    expected = text_expectation(state) if expected is None else expected
    fail = lambda reason, **extra: {'probe_id': probe_id, 'passed': False, 'reason': reason, **extra}
    if not pages:
        return fail('Không có trang nào để quan sát chữ hiển thị')
    if fixture is None:
        return {**fail('Session fixture unavailable'), 'infra': True}
    from playwright.sync_api import sync_playwright
    from gates import visual
    from gates.verify import _launch
    present, absent = [_norm(t) for t in expected['present']], [_norm(t) for t in expected['absent']]
    shown, in_dom, lines = {}, {}, []
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            context = browser.new_context()
            context.add_cookies([{'name': 'tizia_sid', 'value': fixture('seed')['token'], 'url': base, 'httpOnly': True}])
            for path in pages[:3]:
                page = context.new_page()
                page.goto(base + path, wait_until='domcontentloaded', timeout=20000)
                visual.settle(page)  # judge the page the user ends up with, not the static HTML a script is about to rewrite
                text = dom = ''
                for _ in range(16):  # JS-rendered text can arrive late
                    text = _norm(page.evaluate(_SHOWN))
                    dom = _norm(page.evaluate(_IN_DOM)) if not all(t in text for t in present) else ''
                    if all(t in text or t in dom for t in present):
                        break
                    page.wait_for_timeout(500)
                shown[path], in_dom[path] = text, dom
                lines += [_norm(line) for line in page.evaluate('() => document.body.innerText').splitlines() if line.strip()]
        except Exception as error:
            return {**fail(str(error)[:1000]), 'infra': True}
        finally:
            browser.close()
    seen = ' '.join(shown.values())
    unseen = [t for t in expected['present'] if _norm(t) not in seen]
    dom_seen = ' '.join(in_dom.values())
    hidden = [t for t in unseen if _norm(t) in dom_seen]
    missing = [t for t in unseen if t not in hidden]
    lingering = [t for t in expected['absent'] if _still_shown(t, lines)]
    reason = None
    if missing:
        reason = 'Chữ người dùng yêu cầu không hiển thị trên trang: ' + ', '.join(repr(t) for t in missing)
    elif lingering:
        reason = 'Chữ cần bỏ vẫn còn trên trang: ' + ', '.join(repr(t) for t in lingering)
    return {'probe_id': probe_id, 'passed': reason is None, 'reason': reason, 'coverage': {'rendered_text': True},
            'observations': {'expected': json.dumps(expected, ensure_ascii=False),
                             **({'missing': json.dumps(missing, ensure_ascii=False)} if missing else {}),
                             **({'hidden': json.dumps(hidden, ensure_ascii=False)} if hidden else {}),
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
        try:
            context.grant_permissions(['clipboard-read', 'clipboard-write'], origin=base)
        except Exception:
            pass  # full Chrome refuses grants for an insecure origin; the spy supplies the clipboard there
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


def _not_applicable(note):
    """Oracle needs an element the page lacks: not applied, not a failure (LF/127)."""
    return {'probe_id': SEARCH_PROBE, 'passed': True, 'applicable': False, 'reason': None, 'note': note,
            'coverage': {'filtering': False}}


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
                return _not_applicable('Trang không có danh sách hoạt động để kiểm')
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


def _added(state):
    """Lines the diff adds (no +++ headers)."""
    text = '\n'.join(str(item.get('diff', '')) for item in guest_input(state, 'full_diff') or [])
    return [line[1:] for line in text.splitlines() if line.startswith('+') and not line.startswith('+++')]


_ROUTE = re.compile(r"""\b(?:app|router|route)\.(get|post|put|patch|delete)\s*\(\s*['"`](/[\w\-/.]*)['"`]""")


def _added_routes(state):
    """[(METHOD, path)] the diff registers; parameterised paths (':id') are not probed."""
    return [(m.group(1).upper(), m.group(2)) for line in _added(state) for m in _ROUTE.finditer(line)][:5]


def _added_texts(state):
    """Visible text the diff adds to changed HTML; 12+ chars, at most 3 (short words appear everywhere)."""
    from gates import visual
    return [t for t in visual.changed_texts(guest_input(state, 'full_diff'), '+') if len(t) >= 12][:3]


def select_fallback(state, pages=()):
    """Oracle from the diff when select() names none (pages only): added page text, else an added route."""
    if pages and select(state):
        return None
    if pages and _added_texts(state):
        return FALLBACK_TEXT_PROBE
    return ROUTE_PROBE if _added_routes(state) else None


def _fetch(method, url):
    """(status, body head) for one route; 4xx/5xx answered as status, network errors raised."""
    request = urllib.request.Request(url, method=method, data=None if method == 'GET' else b'')
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            if urllib.parse.urlsplit(response.url).netloc != urllib.parse.urlsplit(url).netloc:
                raise RuntimeError('route redirected outside the disposable app origin')
            return response.status, response.read(500)
    except urllib.error.HTTPError as error:
        return error.code, error.read(500)


def run_route(base, state):
    """GET added route must answer 2xx; a write route must not answer 404 or 5xx (a CSRF refusal is a valid answer)."""
    unavailable = lambda note: {'probe_id': None, 'passed': False, 'reason': NO_ORACLE, 'note': note[:300]}
    routes = _added_routes(state)
    if not routes:
        return unavailable('no route in diff')
    observations, problems = {}, []
    for method, path in routes:
        try:
            status, body = _fetch(method, base + path)
        except OSError as error:
            return unavailable(f'route probe unavailable: {error}')
        except RuntimeError as error:
            return {'probe_id': ROUTE_PROBE, 'passed': False, 'reason': str(error)[:500], 'coverage': {'route_contract': True}}
        key = f'{method} {path}'
        observations[key] = f'HTTP {status}; body: {body.decode("utf-8", "replace")}'
        answered = 200 <= status < 300 if method == 'GET' else status != 404 and status < 500
        if not answered:
            problems.append(f'Route mới không trả lời: {key} → HTTP {status}')
    return {'probe_id': ROUTE_PROBE, 'passed': not problems, 'reason': '; '.join(problems)[:500] or None,
            'coverage': {'route_contract': True}, 'observations': observations}


def _fallback_text(base, state, fixture, pages):
    """Diff's added text on changed pages; a probe that cannot run is no oracle, never a failure."""
    texts = _added_texts(state)
    if not texts:
        return {'probe_id': None, 'passed': False, 'reason': NO_ORACLE, 'note': 'no added text in diff'}
    try:
        result = run_text(base, state, fixture, pages, expected={'present': texts, 'absent': []}, probe_id=FALLBACK_TEXT_PROBE)
    except Exception as error:
        result = {'infra': True, 'reason': str(error)}
    if result.get('infra'):
        return {'probe_id': None, 'passed': False, 'reason': NO_ORACLE, 'note': f"text probe unavailable: {result.get('reason')}"[:300]}
    return result


def run(base, probe_id, fixture=None, state=None, pages=()):
    if probe_id == TEXT_PROBE:
        return run_text(base, state or {}, fixture, list(pages))
    if probe_id == FALLBACK_TEXT_PROBE:
        return _fallback_text(base, state or {}, fixture, list(pages))
    if probe_id == ROUTE_PROBE:
        return run_route(base, state or {})
    if probe_id == STYLE_PROBE:
        from verification import style
        return style.run_style(base, state or {}, fixture, list(pages))
    if probe_id == COPY_PROBE:
        return run_copy(base, fixture)
    if probe_id == SEARCH_PROBE:
        return run_search(base, fixture)
    if probe_id != QUEUE_PROBE:
        return {'probe_id': None, 'passed': False, 'reason': NO_ORACLE}
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
