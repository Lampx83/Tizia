"""Unified skill format: description with exclusion, Look, <=7 steps, Done means, one example."""
import re

MAX_STEPS = 7
_STEP = re.compile(r'^\d+\. ', re.M)
_SPECIFIC = re.compile(r'[\w./-]+\.(?:html|css|jsx?|mjs|tsx?|py|json|md|sql)\b|"[^"\n]+"|(?<![\w/])/[a-z][\w-]*(?:/[\w-]+)*', re.I)
_EXCLUSION = re.compile(r',\s*not when\b|;\s*not for\b', re.I)
_STOP = frozenset('a an the and or of to for in on it its is are be step only just when use that this with my i how after against new old'.split())
_MIN_SHARED = 2


def _split(body):
    """(facts, rules, example) text parts of a unified body."""
    head, sep, example = body.partition('\nExample:\n')
    facts = ''
    if head.startswith('Facts:\n'):
        facts, found, rest = head[len('Facts:\n'):].partition('\nLook:')
        facts, head = (facts, 'Look:' + rest) if found else ('', facts)
    return facts.strip(), head, example if sep else None


def check(text):
    """Unified-format violations for a SKILL.md text; [] when valid."""
    from services import default_skills
    try:
        skill = default_skills.parse(text)
    except ValueError as e:
        return [str(e)]
    errors = []
    if not _EXCLUSION.search(skill.description):
        errors.append('description needs an exclusion (", not when ..." or "; not for ...")')
    body = skill.body
    if body.count('\nExample:\n') + body.startswith('Example:\n') != 1:
        errors.append('exactly one Example section required')
    facts, rules, example = _split(body)
    if len(re.findall(r'^Look:', rules, re.M)) != 1:
        errors.append('exactly one Look line required')
    if len(re.findall(r'^Done means:', rules, re.M)) != 1:
        errors.append('exactly one Done means line required')
    if not 1 <= len(_STEP.findall(rules)) <= MAX_STEPS:
        errors.append(f'1 to {MAX_STEPS} numbered steps required')
    if example is not None and not example.strip():
        errors.append('Example is empty')
    if _SPECIFIC.search(facts + '\n' + rules):
        errors.append('rules name a specific file, string or page; move it to the Example')
    return errors


def render(body):
    """Facts first as a system-role block, then the task rules; non-unified body unchanged."""
    if not body.startswith('Facts:\n'):
        return body
    facts, rules, example = _split(body)
    return f'Facts (true for every task):\n{facts}\n\n{rules}' + (f'\nExample:\n{example}' if example is not None else '')


def _stems(text):
    return {w.rstrip('s')[:5] for w in re.findall(r'[a-z]+', text.lower()) if w not in _STOP and len(w) > 2}


def routes(sentence, text):
    """Offline keyword router: sentence matches the description trigger and not its exclusion."""
    desc = re.search(r'^description:\s*"(.*)"\s*$', text, re.M).group(1)
    trigger = desc.split('Use when', 1)[1]
    cut = _EXCLUSION.search(trigger)
    trigger, excluded = (trigger[:cut.start()], trigger[cut.end():]) if cut else (trigger, '')
    words = _stems(sentence)
    return len(words & _stems(trigger)) >= _MIN_SHARED and len(words & _stems(excluded)) < _MIN_SHARED


def grounded(cases):
    """New line/proposal evidence: >=2 distinct source requests and a paired compare on an unseen request."""
    source = {c['request_id'] for c in cases if c['role'] == 'source'}
    return len(source) >= 2 and any(c['role'] == 'compare' and c['request_id'] not in source
                                    and c.get('with') is not None and c.get('without') is not None for c in cases)
