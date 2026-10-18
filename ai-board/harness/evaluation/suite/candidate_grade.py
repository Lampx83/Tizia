"""Independent frozen-corpus grading shared by both harnesses; never agent feedback."""
from pathlib import Path

import eval_fast

PROTOCOL = 'frozen-corpus-oracle-v1-no-ship'


def grade(task, record, files):
    targets = list(task.get('files') or [task['file']])
    repo = Path(record['checkout'])
    collateral = []
    for path, text in files.items():
        if path in targets or path.startswith(('test/', 'tests/')):
            continue
        before = eval_fast._base_bytes(repo, path)
        if (None if before is None else before.decode('utf-8', 'replace')) != text:
            collateral.append(path)
    selected = {}
    for path in targets:
        if path in files:
            selected[path] = files[path] or ''
        else:
            before = eval_fast._base_bytes(repo, path)
            selected[path] = '' if before is None else before.decode('utf-8', 'replace')
    passed = record['oracle'](selected) if 'subtasks' in record else record['oracle'](selected[targets[0]])
    return {'resolved': bool(passed), 'collateral': sorted(collateral), 'evaluator': PROTOCOL}
