"""So 2 cách chạy nhiều skill trên cùng bộ gold: gộp nhiều skill trong 1 lần gọi vs 1 skill/lần + bước gộp.

Offline: chỉ đọc file JSON đã có sẵn, không gọi model, không chạm mạng. Mặc định giữ cách cũ
(`per-skill`) khi không bên nào thắng rõ.

Input gold (`gold.json`) — `expect` là các chuỗi phải có trong output, khớp không phân biệt hoa thường:

    {"cases": [{"id": "c1", "skills": ["tdd", "code-review"], "expect": ["red", "green", "two axes"]}]}

Input kết quả, 1 file/chế độ (`multi.json`, `per-skill.json`) — `mode` phải khớp chế độ của ô truyền vào,
`calls`/`tokens` là số nguyên >= 0, mỗi case gold có đúng 1 run, không có run lạ:

    {"mode": "multi-skill", "runs": [{"case": "c1", "calls": 1, "tokens": 1850, "output": "..."}]}

Cách chọn: không được giảm chất lượng (tập case pass phải là superset), sau đó tổng token ít hơn thắng,
rồi tổng số lần gọi ít hơn; còn lại là hoà → giữ `per-skill`.

    python -m evaluation.skill_batch_compare gold.json multi.json per-skill.json [--out report.json]
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

CURRENT = 'per-skill'
MODES = ('multi-skill', CURRENT)
FIELDS = ('calls', 'tokens')


def check(expect, output):
    """True nếu mọi chuỗi trong `expect` có trong `output` (không phân biệt hoa thường)."""
    low = output.lower()
    return all(word.lower() in low for word in expect)


def load_gold(path):
    """Danh sách case gold; raise ValueError nếu thiếu id/expect hoặc trùng id."""
    data = json.loads(Path(path).read_text(encoding='utf-8-sig'))  # BOM từ PowerShell/Notepad vẫn đọc được
    cases = data.get('cases') if isinstance(data, dict) else None
    if not isinstance(cases, list) or not cases:
        raise ValueError(f'{path}: cần object {{"cases": [...]}} không rỗng')
    seen = set()
    for case in cases:
        if not isinstance(case, dict) or not isinstance(case.get('id'), str) or not case['id']:
            raise ValueError(f'{path}: mỗi case cần "id" là chuỗi không rỗng')
        if case['id'] in seen:
            raise ValueError(f'{path}: trùng case id {case["id"]!r}')
        seen.add(case['id'])
        expect = case.get('expect')
        if not isinstance(expect, list) or not expect or not all(isinstance(w, str) and w for w in expect):
            raise ValueError(f'{path}: case {case["id"]!r} cần "expect" là list chuỗi không rỗng')
    return cases


def load_results(path, mode):
    """{case_id: run} của 1 chế độ; raise ValueError nếu sai mode, thiếu field, trùng run."""
    if mode not in MODES:
        raise ValueError(f'chế độ không hợp lệ: {mode!r}')
    data = json.loads(Path(path).read_text(encoding='utf-8-sig'))
    if not isinstance(data, dict) or data.get('mode') != mode:
        raise ValueError(f'{path}: "mode" phải là {mode!r}')
    runs = data.get('runs')
    if not isinstance(runs, list) or not runs:
        raise ValueError(f'{path}: cần "runs" không rỗng')
    out = {}
    for run in runs:
        if not isinstance(run, dict) or not isinstance(run.get('case'), str) or not run['case']:
            raise ValueError(f'{path}: mỗi run cần "case" là chuỗi không rỗng')
        if run['case'] in out:
            raise ValueError(f'{path}: trùng run cho case {run["case"]!r}')
        for field in FIELDS:
            value = run.get(field)
            if type(value) is not int or value < 0:
                raise ValueError(f'{path}: case {run["case"]!r} cần "{field}" là số nguyên >= 0')
        if not isinstance(run.get('output'), str):
            raise ValueError(f'{path}: case {run["case"]!r} cần "output" là chuỗi')
        out[run['case']] = run
    return out


def aggregate(cases, runs):
    """Pass/token/call của 1 chế độ; runs: {case_id: run}. Raise ValueError nếu cohort lệch gold."""
    ids = [case['id'] for case in cases]
    missing, extra = [case for case in ids if case not in runs], sorted(set(runs) - set(ids))
    if missing:
        raise ValueError(f'thiếu run cho case: {missing}')
    if extra:
        raise ValueError(f'run không có trong gold: {extra}')
    passed = [case['id'] for case in cases if check(case['expect'], runs[case['id']]['output'])]
    return {'passed': passed, 'failed': [case for case in ids if case not in passed], 'cases': len(ids),
            'pass_rate': round(len(passed) / len(ids), 4),
            'calls': sum(run['calls'] for run in runs.values()), 'tokens': sum(run['tokens'] for run in runs.values())}


def _pick(mode, winner, loser, why):
    return {'winner': mode, 'selected': mode,
            'reason': f'{why}: {len(winner["passed"])}/{winner["cases"]} case pass, {winner["tokens"]} token, '
                      f'{winner["calls"]} lần gọi (bên kia {len(loser["passed"])}/{loser["cases"]}, '
                      f'{loser["tokens"]} token, {loser["calls"]} lần gọi)'}


def _tie(why):
    return {'winner': None, 'selected': CURRENT, 'reason': f'hoà ({why}); giữ {CURRENT}'}


def decide(multi, per_skill):
    """Chọn chế độ từ 2 bản tổng hợp; giảm chất lượng thì không thắng, hoà thì giữ `per-skill`."""
    mine, other = set(multi['passed']), set(per_skill['passed'])
    if mine > other:
        return _pick('multi-skill', multi, per_skill, 'pass nhiều case hơn, không mất case nào')
    if other > mine:
        return _pick(CURRENT, per_skill, multi, 'pass nhiều case hơn, không mất case nào')
    if mine != other:
        return _tie(f'mỗi bên pass case khác nhau — multi-skill {sorted(mine - other)}, '
                    f'{CURRENT} {sorted(other - mine)}')
    for field, label in (('tokens', 'token'), ('calls', 'lần gọi')):
        for mode, winner, loser in (('multi-skill', multi, per_skill), (CURRENT, per_skill, multi)):
            if winner[field] < loser[field]:
                return _pick(mode, winner, loser, f'cùng chất lượng, ít hơn {loser[field] - winner[field]} {label}')
    return _tie('cùng chất lượng, cùng token và số lần gọi')


def compare(gold_path, multi_path, per_skill_path):
    """Đọc 3 file, trả báo cáo đầy đủ: từng case, 2 bản tổng hợp, chế độ thắng + lý do."""
    cases = load_gold(gold_path)
    multi = aggregate(cases, load_results(multi_path, 'multi-skill'))
    per = aggregate(cases, load_results(per_skill_path, CURRENT))
    return {'gold': str(gold_path), 'cases': len(cases), 'modes': {'multi-skill': multi, CURRENT: per},
            **decide(multi, per)}


def main(argv=None):
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description='So multi-skill 1 lần gọi với 1 skill/lần + gộp (offline).')
    parser.add_argument('gold', help='file JSON bộ gold')
    parser.add_argument('multi', help='kết quả chế độ multi-skill')
    parser.add_argument('per_skill', help='kết quả chế độ per-skill')
    parser.add_argument('--out', help='ghi báo cáo ra file JSON thay vì chỉ in')
    args = parser.parse_args(argv)
    try:
        report = compare(args.gold, args.multi, args.per_skill)
    except ValueError as error:
        print(f'lỗi input: {error}', file=sys.stderr)
        return 2
    text = json.dumps(report, ensure_ascii=False, indent=2)
    if args.out:
        Path(args.out).write_text(text, encoding='utf-8')
    print(text)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
