"""Reviewed advisory skills; tool/context policy remains outside these files."""
import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / 'skills'
TASK_TYPES = {'backend', 'frontend', 'database', 'review', 'test', 'all'}
FIELDS = {'name', 'description', 'task_type', 'source', 'version', 'max_tokens'}
FORBIDDEN = re.compile(r'(?:ignore|override|bypass|grant|enable)\s+(?:all\s+)?(?:platform|permission|tools?|rules?|budget|sandbox)|(?:request|require|need)\w*\s+(?:permission|access|tools?)|tools?\s+required\s*:|(?:bỏ qua|ghi đè|cấp quyền|vô hiệu hóa|yêu cầu quyền|cần quyền)', re.I)


def _render(name, version, body):
    return f'DEFAULT SKILL {name} v{version} (advisory):\n{body}'


@dataclass(frozen=True)
class Skill:
    name: str
    description: str
    task_type: tuple
    source: str
    version: int
    max_tokens: int
    body: str
    digest: str
    token_bound: int

    def evidence(self):
        return {'name': self.name, 'version': self.version, 'source': self.source,
                'sha256': self.digest, 'token_bound': self.token_bound}


def parse(text):
    """Declared frontmatter subset: scalar fields and comma-separated task types."""
    if not isinstance(text, str) or not text.startswith('---\n') or '\r' in text:
        raise ValueError('skill requires LF frontmatter')
    parts = text.split('---\n', 2)
    if len(parts) != 3:
        raise ValueError('incomplete skill frontmatter')
    meta = {}
    for line in parts[1].splitlines():
        key, sep, value = line.partition(':')
        if not sep or key in meta or key not in FIELDS or not value.strip():
            raise ValueError('invalid or duplicate skill field')
        meta[key] = value.strip()
    if set(meta) != FIELDS or not re.fullmatch(r'[a-z][a-z0-9-]{0,63}', meta['name']):
        raise ValueError('missing skill fields or invalid name')
    types = tuple(meta['task_type'].strip('[]').replace(' ', '').split(','))
    if not types or len(set(types)) != len(types) or set(types) - TASK_TYPES:
        raise ValueError('invalid skill task types')
    if meta['source'] not in {'default', 'admin'}:
        raise ValueError('invalid skill source')
    if not meta['version'].isdigit() or not meta['max_tokens'].isdigit():
        raise ValueError('skill version and token cap must be integers')
    version, cap = int(meta['version']), int(meta['max_tokens'])
    body = parts[2].strip()
    # UTF-8 bytes conservatively bound byte-level tokenizer tokens, without a model call.
    bound = len(_render(meta['name'], version, body).encode('utf-8'))
    if version < 1 or not 1 <= cap <= 1500 or not body or bound > cap:
        raise ValueError('skill exceeds token budget or is empty')
    if len(re.findall(r'^\d+\. ', body, re.M)) > 7 or FORBIDDEN.search(body):
        raise ValueError('skill requests authority or exceeds seven rules')
    return Skill(meta['name'], meta['description'], types, meta['source'], version, cap,
                 body, hashlib.sha256(text.encode('utf-8')).hexdigest(), bound)


def catalog():
    locked = json.loads((ROOT / 'skills.lock.json').read_text(encoding='utf-8'))
    result = []
    for path in sorted(ROOT.glob('default-*/SKILL.md')):
        skill = parse(path.read_bytes().decode('utf-8'))
        if skill.name != path.parent.name or skill.source != 'default' or locked.get(skill.name) != skill.digest:
            raise ValueError('default skill identity/hash mismatch')
        result.append(skill)
    if {s.name for s in result} != {f'default-{t}' for t in TASK_TYPES} | {'default-skill-authoring'}:
        raise ValueError('incomplete default skill catalog')
    return result


def select(role, context=None):
    context = context or {}
    task = context.get('task_type')
    file = str(context.get('file') or '').replace('\\', '/')
    if role == 'gate4_review':
        task = 'review'
    elif context.get('purpose') == 'skill-authoring':
        task = 'skill-authoring'
    elif task not in TASK_TYPES - {'review'}:
        task = ('database' if re.search(r'(^|/)(migrations|database|db)(/|[.-])', file) else
                'test' if file.startswith(('test/', 'tests/')) or '.test.' in file else
                'frontend' if file.startswith('public/') else
                'backend' if file.startswith(('server/', 'ai-board/')) else 'all')
    names = [f'default-{task}']
    if task not in {'review', 'all'}:
        names.append('default-all')
    by_name = {s.name: s for s in catalog()}
    chosen = [by_name[name] for name in names]
    if sum(s.token_bound for s in chosen) + 2 * (len(chosen) - 1) > 1000:
        raise ValueError('default system skill budget exceeded')
    return chosen


def system_text(skills):
    return '\n\n'.join(_render(s.name, s.version, s.body) for s in skills)


def pin(role, context=None):
    selected = [s.evidence() for s in select(role, context)]
    payload = json.dumps(selected, sort_keys=True).encode() + Path(__file__).read_bytes()
    return hashlib.sha256(payload).hexdigest()
