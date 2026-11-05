"""Computed-style oracle: added CSS declarations checked on the rendered page. Flag AI_BOARD_ORACLE_CSS_SIZE."""
import re

from settings import get_settings
from verification import functional

_RULE_OPEN = re.compile(r'^\s*([^{}@:]+?)\s*\{\s*$')
_RULE_CLOSE = re.compile(r'^\s*\}\s*$')
_DECL = re.compile(r'^\s*([a-z-]+)\s*:\s*([^;{}]+?)\s*;?\s*$')
_COMMENT = re.compile(r'^\s*(/\*.*\*/|//.*)?\s*$')
_ABSOLUTE = re.compile(r'^(#[0-9a-fA-F]{3,8}|rgba?\([\d\s.,%]+\)|-?\d+(\.\d+)?px|none|block|inline|inline-block|flex|grid|hidden|visible|0)$')
_SELECTOR_TOKEN = re.compile(r'[.#][\w-]+')

_PROBE_JS = """(checks) => checks.map(c => {
  let els;
  try { els = [...document.querySelectorAll(c.selector)]; } catch (e) { return { matched: 0, bad: 0 }; }
  const probe = document.createElement('div');
  probe.style.setProperty(c.prop, c.value);
  document.body.appendChild(probe);
  const want = getComputedStyle(probe).getPropertyValue(c.prop);
  probe.remove();
  if (!want) return { matched: 0, bad: 0 };
  return { matched: els.length, bad: els.filter(e => getComputedStyle(e).getPropertyValue(c.prop) !== want).length };
})"""


def _checks(state):
    """[(selector, prop, value)] for every added declaration; None when any added line cannot be checked."""
    checks = []
    for item in state.get('full_diff') or []:
        selector = None
        for line in str(item.get('diff', '')).splitlines():
            if line.startswith(('+++', '---', '@@')):
                selector = None
                continue
            tag, body = line[:1], line[1:]
            if tag not in ('+', ' '):
                continue
            opened = _RULE_OPEN.match(body)
            if opened:
                selector = opened.group(1)
                continue
            if _RULE_CLOSE.match(body):
                selector = None
                continue
            if '{' in body or '@' in body:
                return None
            if tag == ' ':
                continue
            decl = _DECL.match(body)
            if decl and selector and _ABSOLUTE.match(decl.group(2)):
                checks.append((selector, decl.group(1), decl.group(2)))
            elif not _COMMENT.match(body):
                return None
    return checks


def _request_confirms(state, checks):
    """Every value and selector the diff sets must appear in the request text."""
    text = functional.request_text(state)
    tokens = set(_SELECTOR_TOKEN.findall(text))
    return all(re.search(rf'(?<![\w#.-]){re.escape(value.lower())}(?![\w-])', text) and any(token in selector.lower() for token in tokens)
               for selector, _, value in checks)


def select_style(state, pages=(), enabled=None):
    """STYLE_PROBE when the diff adds only checkable absolute CSS the request names; else None."""
    on = get_settings().oracle_css_size if enabled is None else enabled
    if not on or not pages:
        return None
    checks = _checks(state)
    if not checks or not _request_confirms(state, checks):
        return None
    return functional.STYLE_PROBE


def judge(checks, observed):
    """observed[i] = (matched elements, mismatched elements) for checks[i]; pass only when all match."""
    unavailable = {'probe_id': None, 'passed': False, 'reason': functional.NO_ORACLE}
    if not checks or any(matched == 0 for matched, _ in observed):
        return {**unavailable, 'note': 'a checked selector matched no element on the observed pages'}
    observations = {f'{selector} {prop}: {value}': f'matched {matched}, mismatched {bad}'
                    for (selector, prop, value), (matched, bad) in zip(checks, observed)}
    problems = [f'{selector} {prop} ≠ {value}' for (selector, prop, value), (_, bad) in zip(checks, observed) if bad]
    return {'probe_id': functional.STYLE_PROBE, 'passed': not problems,
            'reason': ('Style hiển thị không đúng: ' + '; '.join(problems))[:500] if problems else None,
            'coverage': {'computed_style': True}, 'observations': observations}


def run_style(base, state, fixture, pages):
    """Open changed pages as a logged-in user; compare computed style of selected elements to the diff's value."""
    from playwright.sync_api import sync_playwright
    from gates import visual
    from gates.verify import _launch
    checks = _checks(state) or []
    unavailable = lambda note: {'probe_id': None, 'passed': False, 'reason': functional.NO_ORACLE, 'note': note[:300]}
    if not checks or not pages:
        return unavailable('no checkable declaration or page')
    if fixture is None:
        return unavailable('Session fixture unavailable')
    observed = [[0, 0] for _ in checks]
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            context = browser.new_context()
            context.add_cookies([{'name': 'tizia_sid', 'value': fixture('seed')['token'], 'url': base, 'httpOnly': True}])
            for path in pages[:3]:
                page = context.new_page()
                page.goto(base + path, wait_until='domcontentloaded', timeout=20000)
                visual.settle(page)
                rows = page.evaluate(_PROBE_JS, [{'selector': s, 'prop': prop, 'value': v} for s, prop, v in checks])
                for slot, row in zip(observed, rows):
                    slot[0] += row['matched']
                    slot[1] += row['bad']
        except Exception as error:
            return unavailable(f'style probe unavailable: {error}')
        finally:
            browser.close()
    return judge(checks, [tuple(slot) for slot in observed])
