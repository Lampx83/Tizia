"""Unified skill format (admin-skill frontmatter): description with exclusion, Look, <=7 steps, Done means, one example."""
import re

from services import file_context

MAX_STEPS = 7
_STEP = re.compile(r'^\s*\d+[.)]\s', re.M)
_EXT = r'(?:html?|css|scss|sass|less|jsx?|mjs|cjs|tsx?|vue|py|json|ya?ml|toml|ini|md|sql|sh|txt)'
_GENERIC = r'(?:a|an|the|each|every|any|that|this|one|same|new|existing|changed|public|web|target|sibling|current|other|another|parent|linked|given|named)'
_SPECIFIC = re.compile(
    rf'[\w./-]+\.{_EXT}\b|\bDockerfile\b|(?<![\w/])/[a-z][\w-]*(?:/[\w-]+)*|(?<![\w&])#[a-z][\w-]+'
    rf'|\b(?!{_GENERIC}\b)[\w-]+ page\b', re.I)
_QUOTED = re.compile(r'"([^"\n]*)"|\u201c([^\u201d\n]*)\u201d|(?<!\w)\'([^\'\n]*)\'(?!\w)|`([^`\n]*)`')
_EXCLUSION = re.compile(r',\s*not when\b|;\s*not for\b', re.I)
_STOP = frozenset('a an the and or of to for in on it its is are be step only just when use that this with my i how after against new old'.split())
_MIN_SHARED = 2
_DESC = re.compile(r'^description:\s*(?:"(.*)"|(.*))\s*$', re.M)


def _specific(text):
    """True when text names a file, path, id, page or a non-generic quoted string."""
    if _SPECIFIC.search(text):
        return True
    for m in _QUOTED.finditer(text):
        quoted = next(g for g in m.groups() if g is not None)
        word = re.fullmatch(r'[a-z]+(?: [a-z]+)?', quoted)
        if not word or len(quoted) > 12 or (m.group(4) is not None and ' ' in quoted):
            return True
    return False


def is_unified(text):
    """True when the SKILL.md body starts with a Facts or Look section."""
    parts = text.split('---\n', 2)
    return len(parts) == 3 and parts[2].lstrip().startswith(('Facts:\n', 'Look:'))


def _split(body):
    """(facts, rules, example) of a unified body; facts/example None when absent."""
    head, sep, example = body.partition('\nExample:\n')
    facts = None
    if head.startswith('Facts:\n'):
        facts, found, rest = head[len('Facts:\n'):].partition('\nLook:')
        head = 'Look:' + rest if found else ''
    return facts, head, example if sep else None


def check(text):
    """Unified-format violations for an admin-format SKILL.md (default_skills.parse frontmatter); [] when valid."""
    from services import default_skills
    try:
        skill = default_skills.parse(text)
    except ValueError as e:
        return [f'not a valid admin-format skill: {e}']
    errors = []
    if not _EXCLUSION.search(skill.description):
        errors.append('description needs an exclusion (", not when ..." or "; not for ...")')
    body = skill.body
    if not body.startswith(('Facts:\n', 'Look:')):
        errors.append('body must start with Facts: or Look:')
    if body.count('\nExample:\n') + body.startswith('Example:\n') != 1:
        errors.append('exactly one Example section required')
    facts, rules, example = _split(body)
    if facts is not None and any(not line.startswith('- ') for line in facts.splitlines() if line.strip()):
        errors.append('Facts holds bullet lines only; Look, steps and Done means come after')
    look, done = list(re.finditer(r'^Look:', rules, re.M)), list(re.finditer(r'^Done means:', rules, re.M))
    if len(look) != 1:
        errors.append('exactly one Look line required')
    if len(done) != 1:
        errors.append('exactly one Done means line required')
    steps = list(_STEP.finditer(rules))
    if not 1 <= len(steps) <= MAX_STEPS:
        errors.append(f'1 to {MAX_STEPS} numbered steps required')
    if len(look) == len(done) == 1 and steps and not look[0].start() < steps[0].start() <= steps[-1].start() < done[0].start():
        errors.append('order must be Look, steps, Done means')
    if example is not None and not example.strip():
        errors.append('Example is empty')
    if _specific((facts or '') + '\n' + rules):
        errors.append('rules name a specific file, string or page; move it to the Example')
    return errors


def render(body):
    """Facts first as a system-role block, then the task rules; non-unified body unchanged."""
    if not body.startswith('Facts:\n'):
        return body
    facts, rules, example = _split(body)
    return f'Facts (true for every task):\n{facts.strip()}\n\n{rules}' + (f'\nExample:\n{example}' if example is not None else '')


def _stems(text):
    return {w.rstrip('s')[:5] for w in re.findall(r'[a-z]+', file_context.fold(text)) if w not in _STOP and len(w) > 2}


def routes(sentence, text):
    """Offline lint helper only (production routing is default_skills.select by task type/file): sentence shares >=2 stems with the description's Use-when clause and <2 with its exclusion."""
    match = _DESC.search(text)
    desc = (match.group(1) or match.group(2) or '') if match else ''
    if 'Use when' not in desc:
        return False
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
