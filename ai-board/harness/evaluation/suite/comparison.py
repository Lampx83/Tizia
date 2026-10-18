"""One post-change paired DEV run, with no winner selection or default promotion."""
from __future__ import annotations

import argparse
import contextlib
import hashlib
import json
import subprocess
from os import environ
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from evaluation.suite import candidate_grade, interleaved, mini_swe, runner, trial

ARMS = ('ai-board', 'mini-swe')


def sha(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def cases(path):
    tasks = json.loads(Path(path).read_text(encoding='utf-8'))
    if len(tasks) != 42 or len({task['id'] for task in tasks}) != 42 or any(task.get('split') != 'dev' for task in tasks):
        raise ValueError('exactly 42 unique frozen DEV tasks are required')
    if len({task['base_sha'] for task in tasks}) != 1:
        raise ValueError('one common pinned base is required')
    return tasks


def configured_deps(model):
    from dotenv import load_dotenv
    from runtime.pipeline import Deps, ENV_FILE
    import runtime.pipeline as pipeline
    import dataclasses
    load_dotenv(ENV_FILE)
    pipeline.NUM_PREDICT = {gate: mini_swe.OUTPUT_TOKENS for gate in pipeline.NUM_PREDICT}
    pipeline.NUM_PREDICT_DEFAULT = mini_swe.OUTPUT_TOKENS
    # Overrides apply only inside the measured process.
    environ.update(AI_BOARD_TOOL_LOOP='1', AI_BOARD_VERIFIED_LOOP='1', AI_BOARD_LOOP_MODEL_CALLS='40',
                   AI_BOARD_LOOP_TOOL_CALLS='200', AI_BOARD_GATE25_SIM_USER='')
    deps = Deps.real()
    router = getattr(deps.models, 'routing', None)
    if router is None:
        raise ValueError('reviewed model routing is required')
    for role in ('gate1', 'gate25', 'gate3_light', 'gate3_heavy', 'gate4_review'):
        selected = router.first(role)
        if selected['provider'] != 'vllm' or selected['model'] != model:
            raise ValueError('all generation roles must use the common pinned vLLM model')
    router.catalog['reasoning'] = {role: False for role in router.catalog['roles']}
    return dataclasses.replace(deps, stop_on_model_error=True)


def code_pins(deps):
    from main import ROOT
    pins = runner.provenance(ROOT, deps.models.routing.first('gate3_heavy')['model'], deps.models.routing)
    pins['untracked'] = bool(subprocess.check_output(['git', '-C', str(ROOT), 'ls-files', '--others', '--exclude-standard']).strip())
    return pins


def engine_info(deps, model):
    import urllib.request
    from providers.client import _NoRedirect
    client = deps.models.routing.client(deps.models.routing.first('gate3_heavy'), deps.models)
    suffix = '/models' if client.base_url.endswith('/v1') else '/v1/models'
    request = urllib.request.Request(client.base_url + suffix)
    if client.seckey:
        request.add_header('Authorization', 'Bearer ' + client.seckey)
        if not client.bearer_only:
            request.add_header('x-ollama-seckey', client.seckey)
    with urllib.request.build_opener(_NoRedirect()).open(request, timeout=15) as response:
        body = json.loads(response.read(1_000_000))
    found = next((item for item in body.get('data', []) if item.get('id') == model), None)
    if found is None or found.get('max_model_len') != 32768:
        raise ValueError('current engine model/context does not match the common profile')
    return {key: found[key] for key in ('id', 'max_model_len')}


def prepare(config_path):
    config = json.loads(Path(config_path).read_text(encoding='utf-8'))
    tasks = cases(config['corpus'])
    deps = configured_deps(config['model'])
    current = code_pins(deps)
    if current['dirty'] or current['untracked']:
        raise ValueError('commit implementation before freezing a model run')
    if config.get('context_length') != 32768 or 'int4' not in config['model'].lower():
        raise ValueError('record the agreed INT4 model and actual 32768 context profile')
    package, _ = mini_swe.upstream(Path(config['mini_runtime']))
    mini_config = Path(package.__file__).parent / 'config' / 'mini.yaml'
    details = {'source': tasks[0]['base_sha'], 'model': config['model'], 'context_length': config['context_length'],
               'temperature': 0, 'thinking': False, 'output_tokens': mini_swe.OUTPUT_TOKENS, 'evaluator': candidate_grade.PROTOCOL,
               'engine': engine_info(deps, config['model']),
               'budget': {'model_calls': 40, 'tool_calls': 200, 'tokens': 200000, 'wall_s': 300},
               'corpus_sha256': hashlib.sha256(Path(config['corpus']).read_bytes()).hexdigest(),
               'requests_sha256': sha([{key: task[key] for key in ('id', 'title', 'detail')} for task in tasks]),
               'code': current,
               'arms': {'ai-board': {'verified_loop': True, 'tool_manifest': current['tool_manifest'], 'loop_caps': [40, 200]},
                        'mini-swe': {'version': mini_swe.VERSION, 'revision': mini_swe.REVISION,
                                     'wheel_sha256': mini_swe.WHEEL_SHA256,
                                     'config_sha256': hashlib.sha256(mini_config.read_bytes()).hexdigest()}}}
    pins = {'source': details['source'], 'model': sha({key: details[key] for key in ('model', 'context_length', 'temperature', 'thinking', 'output_tokens')}),
            'corpus': details['corpus_sha256'], 'catalog': current['routing_catalog'], 'prompt': details['requests_sha256'],
            'harness': sha(current), 'budget': sha(details['budget'])}
    root = Path(config['root'])
    root.mkdir(parents=True, exist_ok=True)
    protocol = {'config': config, 'details': details, 'pins': pins}
    path = root / 'comparison.json'
    if path.exists():
        if json.loads(path.read_text(encoding='utf-8')) != protocol:
            raise ValueError('comparison pins/config changed; do not resume')
    else:
        path.write_text(json.dumps(protocol, ensure_ascii=False, indent=2), encoding='utf-8')
    interleaved.prepare(root, [{'id': task['id'], 'mode': 'e2e', 'repeat': 1, 'split': 'dev'} for task in tasks], pins,
                        seed=config['seed'], warm_cold=config['warm_cold'], load_notes=config['load_notes'], arms=ARMS)
    return protocol


def one_trial(protocol, scheduled):
    config = protocol['config']
    deps = configured_deps(config['model'])
    if code_pins(deps) != protocol['details']['code']:
        raise ValueError('runtime/source pins changed before a trial')
    tasks = cases(config['corpus'])
    if hashlib.sha256(Path(config['corpus']).read_bytes()).hexdigest() != protocol['pins']['corpus']:
        raise ValueError('frozen DEV corpus changed')
    task = next(task for task in tasks if task['id'] == scheduled['id'])
    root = Path(config['root'])
    if scheduled['arm'] == 'ai-board':
        row = trial.run_trial(task, 'e2e', deps, root, config['source'], wall_s=300)
    elif scheduled['arm'] == 'mini-swe':
        row = mini_swe.run_trial(task, deps, root, config['source'], runtime=Path(config['mini_runtime']), wall_s=300)
    else:
        raise ValueError('unknown comparison arm')
    if set(row.get('served') or []) - {config['model']} or set(row.get('providers') or []) - {'vllm'}:
        row.update(resolved=False, infra_error=True, error='model_pin_mismatch', incomparable=True)
    return {**row, 'arm': scheduled['arm'], 'repeat': 1, 'split': 'dev', 'evaluator': candidate_grade.PROTOCOL}


def report(root):
    root = Path(root)
    protocol = json.loads((root / 'comparison.json').read_text(encoding='utf-8'))
    path = root / 'attempts.jsonl'
    events = [json.loads(line) for line in path.read_text(encoding='utf-8').splitlines()] if path.exists() else []
    intents = {event['attempt_id']: event['trial'] for event in events if event['event'] == 'intent'}
    rows = {arm: {} for arm in ARMS}
    for scheduled in intents.values():
        rows[scheduled['arm']][scheduled['id']] = {
            'id': scheduled['id'], 'mode': 'e2e', 'resolved': False, 'collateral': [], 'infra_error': True,
            'error': 'unresolved_intent', 'model_calls': None, 'tokens_in': None, 'tokens_out': None,
            'cost_status': 'unknown', 'cleanup_pending': True, 'attempt_status': 'unknown'}
    for event in events:
        if event['event'] != 'result':
            continue
        scheduled = intents[event['attempt_id']]
        result = event.get('result')
        if result is None:
            result = {'id': scheduled['id'], 'mode': 'e2e', 'resolved': False, 'collateral': [],
                      'infra_error': True, 'error': event['status'], 'model_calls': None, 'tokens_in': None,
                      'tokens_out': None, 'cost_status': 'unknown', 'cleanup_pending': True}
        rows[scheduled['arm']][scheduled['id']] = {**result, 'wall_s': event.get('wall_s', result.get('wall_s')), 'attempt_status': event['status']}
    arms = {}
    for arm, keyed in rows.items():
        values = list(keyed.values())
        resolved_clean = sum(bool(row.get('resolved')) and not row.get('collateral') for row in values)
        costs = {}
        for field in ('model_calls', 'tokens_in', 'tokens_out', 'wall_s'):
            known = [row[field] for row in values if type(row.get(field)) in (int, float)]
            costs[field] = {'total': sum(known) if len(known) == len(values) else None,
                            'known_subtotal': sum(known), 'unknown_trials': len(values) - len(known),
                            'per_resolved_clean': sum(known) / resolved_clean if resolved_clean and len(known) == len(values) else None}
        arms[arm] = {'expected': 42, 'attempted': len(values), 'pending': 42 - len(values),
                     'resolved': sum(bool(row.get('resolved')) for row in values),
                     'resolved_clean': resolved_clean,
                     'denominator': 42, 'collateral_trials': sum(bool(row.get('collateral')) for row in values),
                     'timeouts': sum(row.get('error') in ('timeout', 'trial_timeout') for row in values),
                     'infra_failures': sum(bool(row.get('infra_error')) for row in values), 'costs': costs}
    common = set(rows['ai-board']) & set(rows['mini-swe'])
    clean = lambda row: bool(row.get('resolved')) and not row.get('collateral')
    paired = {'attempted_pairs': len(common),
              'ai_board_only': sum(clean(rows['ai-board'][key]) and not clean(rows['mini-swe'][key]) for key in common),
              'mini_swe_only': sum(clean(rows['mini-swe'][key]) and not clean(rows['ai-board'][key]) for key in common)}
    cleanup_pending = any(row.get('cleanup_pending') for arm in rows.values() for row in arm.values())
    incomparable = any(row.get('incomparable') for arm in rows.values() for row in arm.values())
    summary = {'complete': all(arm['attempted'] == 42 for arm in arms.values()) and not cleanup_pending and not incomparable,
               'comparable': not incomparable, 'incomparable_reasons': ['model/provider pin mismatch'] if incomparable else [],
               'cleanup_pending': cleanup_pending, 'arms': arms, 'paired': paired,
               'false_block': 'unknown: independent review labels not collected', 'false_pass': 'unknown: independent review labels not collected',
               'winner': None, 'promote_defaults': False, 'protocol': protocol,
               'limitations': ['One run on previously used DEV tasks; descriptive only.',
                              'Frozen text/CSS corpus oracle; no production ship or visual-correctness claim.',
                              'Model checkpoint/INT4 identity follows the served model ID; a weight-file digest is unavailable.',
                              'mini-SWE has shell/multi-file access inside its VM; AI Board uses named checks and approved write scope.']}
    (root / 'report.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
    return summary


def main():
    for stream in (sys.stdin, sys.stdout, sys.stderr):
        stream.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=('prepare', 'run', 'trial', 'report'))
    parser.add_argument('config', help='config JSON, or comparison root for report/trial')
    args = parser.parse_args()
    if args.action == 'trial':
        scheduled = json.load(sys.stdin)
        protocol = json.loads((Path(args.config) / 'comparison.json').read_text(encoding='utf-8'))
        with contextlib.redirect_stdout(sys.stderr):
            row = one_trial(protocol, scheduled)
        print(json.dumps(row, ensure_ascii=False), flush=True)
        return
    if args.action == 'report':
        result = report(args.config)
    else:
        protocol = prepare(args.config)
        root = Path(protocol['config']['root'])
        if args.action == 'run':
            interleaved.execute(root, [sys.executable, str(Path(__file__).resolve()), 'trial', str(root)], timeout_s=300)
            result = report(root)
        else:
            result = {'prepared': True, 'trials': 84, 'root': str(root)}
    print(json.dumps({key: result[key] for key in ('prepared', 'trials', 'root', 'complete', 'arms', 'paired') if key in result}, ensure_ascii=False))


if __name__ == '__main__':
    main()
