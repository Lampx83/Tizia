"""Đối chiếu skill mặc định với skill gốc: thuật ngữ essence còn/mất + số từ. Chạy được offline, không gọi model."""
import json
import re
import sys
from pathlib import Path

HARNESS = Path(__file__).resolve().parents[1]
DEFAULT_ROOT = HARNESS / 'skills'
SOURCE_ROOT = Path.home() / '.claude' / 'plugins' / 'cache' / 'claude-plugins-official' / 'mattpocock-skills'

# Thuật ngữ essence theo từng skill gốc: nếu skill mặc định thiếu chúng thì liệt kê là essence bị mất.
ESSENCE = {
    'tdd': {'red-green-refactor': ['red', 'green', 'refactor'], 'vertical slice': ['vertical slice', 'tracer'],
            'public interface': ['public interface', 'behaviour'], 'mock': ['mock']},
    'diagnosing-bugs': {'feedback loop': ['feedback loop'], 'reproduce': ['reproduce'], 'hypothesis': ['hypothes'],
                        'instrument': ['instrument', 'log'], 'regression test': ['regression']},
    'code-review': {'standards': ['standard'], 'spec': ['spec'], 'two axes': ['two axes', 'axis']},
    'grilling': {'one question at a time': ['one question', 'one at a time'], 'recommended answer': ['recommend']},
}
DEFAULT_FOR = {'tdd': 'default-test', 'diagnosing-bugs': 'default-test', 'code-review': 'default-review',
               'grilling': 'default-all'}


def _words(text):
    return len(re.findall(r'\S+', text))


def _default_text(name):
    path = DEFAULT_ROOT / name / 'SKILL.md'
    return path.read_text(encoding='utf-8') if path.exists() else ''


def _source_text(skill):
    hits = sorted(SOURCE_ROOT.glob(f'*/skills/*/{skill}/SKILL.md'))
    return hits[-1].read_text(encoding='utf-8') if hits else ''


def compare(default_name, default_text, terms):
    """{covered, missing, default_words, source_words}; terms = {essence: [keyword...]} khớp không phân biệt hoa thường."""
    low = default_text.lower()
    covered = [name for name, words in terms.items() if any(w in low for w in words)]
    missing = [name for name in terms if name not in covered]
    return {'default': default_name, 'covered': covered, 'missing': missing,
            'default_words': _words(default_text), 'source_words': 0}


def audit():
    rows = []
    for skill, terms in ESSENCE.items():
        source = _source_text(skill)
        default_name = DEFAULT_FOR[skill]
        row = compare(default_name, _default_text(default_name), terms)
        row.update({'source': skill, 'source_words': _words(source), 'source_found': bool(source)})
        rows.append(row)
    return rows


if __name__ == '__main__':
    print(json.dumps(audit(), ensure_ascii=False, indent=2))
    sys.exit(0)
