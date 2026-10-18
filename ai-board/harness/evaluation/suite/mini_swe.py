"""Pinned upstream DefaultAgent with native chat and the existing no-network runner."""
from __future__ import annotations

import dataclasses
import hashlib
import importlib
import json
from os import environ
from pathlib import Path
import sys
import tempfile
import time
from types import SimpleNamespace

from runtime.budget import Budget
from verification.loop_checks import CheckSession, archive

VERSION = '2.4.6'
REVISION = 'a83fcae82d2a08f0ee0c688f9d137b3566c097f8'
WHEEL_SHA256 = 'a35463c553ac825c7773b03cfa69cd44958e3af20155dcc5711fdf9e4c67cd54'
OUTPUT_TOKENS = 3072
CORE_HASHES = {'agents/default.py': 'e8ef8aa365942d739c2ec5cb0879f60f377d2dc2de8ec670aaedf3bafb45a4c2',
               'config/mini.yaml': 'b539a8965f5bf41dd0f32daafa5d2db22581923d13812fa378fd09569b9d6b0c',
               'models/utils/actions_toolcall.py': '47b666412e4f838508b50009cf34c7f63fe15e9e40affc257a17c0829896526f'}


def upstream(runtime: Path | None = None):
    if runtime:
        sys.path.insert(0, str(runtime.resolve()))
    # Upstream loads global configuration on import; this trial gets an empty private directory.
    environ['MSWEA_GLOBAL_CONFIG_DIR'] = tempfile.mkdtemp(prefix='mini-swe-config-')
    environ['MSWEA_SILENT_STARTUP'] = '1'
    package = importlib.import_module('minisweagent')
    if package.__version__ != VERSION:
        raise ValueError('mini-swe-agent version differs from the pinned baseline')
    for name, expected in CORE_HASHES.items():
        if hashlib.sha256((Path(package.__file__).parent / name).read_bytes()).hexdigest() != expected:
            raise ValueError('upstream baseline implementation/config drift')
    from minisweagent.agents.default import DefaultAgent
    return package, DefaultAgent


class NativeModel:
    def __init__(self, client, model, budget, config):
        self.client, self.model, self.budget, self.config = client, model, budget, config
        self.tokens_in = self.tokens_out = 0
        self.unknown_usage = self.cleanup_pending = False
        self.responses = []

    def get_template_vars(self, **kwargs):
        return {'model_name': self.model, **kwargs}

    def format_message(self, **kwargs):
        return kwargs

    def serialize(self):
        return {'model': {'model_name': self.model, 'adapter': 'tizia-native-v1'}}

    def query(self, messages, **kwargs):
        from minisweagent.exceptions import LimitsExceeded
        from minisweagent.models.utils.actions_toolcall import BASH_TOOL, parse_toolcall_actions
        if not self.budget.can_request() or self.unknown_usage:
            raise LimitsExceeded({'role': 'exit', 'content': 'Budget exhausted or usage unknown',
                                  'extra': {'exit_status': 'LimitsExceeded', 'submission': ''}})
        self.budget.spend('model_calls')
        history = [{key: message[key] for key in ('role', 'content', 'tool_calls', 'tool_call_id', 'name') if key in message}
                   for message in messages if message.get('role') != 'exit']
        payload = {'model': self.model, 'messages': history, 'tools': [BASH_TOOL], 'stream': False,
                   'temperature': 0, 'max_tokens': OUTPUT_TOKENS, 'chat_template_kwargs': {'enable_thinking': False}}
        try:
            raw = self.client._post('/chat/completions' if self.client.base_url.endswith('/v1') else '/v1/chat/completions',
                                    payload, retry=False)
        except Exception:
            self.cleanup_pending = self.unknown_usage = True
            raise
        usage = raw.get('usage') or {}
        counts = [usage.get('prompt_tokens'), usage.get('completion_tokens')]
        if any(type(count) is not int or count < 0 for count in counts):
            self.unknown_usage = True
        else:
            self.tokens_in += counts[0]
            self.tokens_out += counts[1]
            self.budget.spend('tokens', sum(counts))
        choice = raw['choices'][0]
        self.responses.append({'model': raw.get('model'), 'usage': usage, 'finish_reason': choice.get('finish_reason')})
        if raw.get('model') != self.model:
            raise ValueError('served model differs from the pinned baseline')
        message = choice['message']
        calls = message.get('tool_calls') or []
        native = [SimpleNamespace(id=call['id'], function=SimpleNamespace(**call['function'])) for call in calls]
        actions = parse_toolcall_actions(native, format_error_template=self.config['format_error_template'],
                                        template_kwargs={'finish_reason': choice.get('finish_reason')})
        return {'role': 'assistant', 'content': message.get('content'), 'tool_calls': calls,
                'extra': {'actions': actions, 'cost': 0.0}}

    def format_observation_messages(self, message, outputs, template_vars=None):
        from minisweagent.models.utils.actions_toolcall import format_toolcall_observation_messages
        return format_toolcall_observation_messages(actions=message['extra']['actions'], outputs=outputs,
                    observation_template=self.config['observation_template'], template_vars=template_vars)


class RunnerEnvironment:
    def __init__(self, session):
        self.session = session
        self.config = {'cwd': '/workspace/checkout', 'network': 'none', 'adapter': 'tizia-runner-v1'}
        self.base = {}

    def get_template_vars(self, **kwargs):
        return {'system': 'Linux', 'release': 'isolated-guest', 'version': 'pinned-image',
                'machine': 'x86_64', 'cwd': '/workspace/checkout', **kwargs}

    def serialize(self):
        return {'environment': dict(self.config)}

    def start(self):
        self.session.artifacts = [{'name': 'candidate', 'path': 'candidate.json'}]
        self.session._start()
        self.base = self.session.source_files()
        hashes = {path.removeprefix('checkout/'): hashlib.sha256(body).hexdigest() for path, body in self.base.items()}
        self.session.client.upload(self.session.run_id,
             archive({**self.base, 'base-hashes.json': json.dumps(hashes).encode()}), deadline=self.session.deadline)
        result = self.session.client.exec(self.session.run_id,
                  ['chown', '-R', '10001:10001', '/workspace/checkout'],
                  timeout=self.session._remaining(), deadline=self.session.deadline)
        if result.get('code') != 0 or result.get('timed_out') or result.get('truncated'):
            raise ValueError('baseline workspace could not be prepared')

    def execute(self, action, cwd=''):
        from minisweagent.exceptions import Submitted, LimitsExceeded, FormatError
        command = action.get('command')
        if not isinstance(command, str) or not command or len(command) > 3900:
            raise FormatError({'role': 'user', 'content': 'bash command must be a string of at most 3900 characters'})
        if not self.session.budget.tick():
            raise LimitsExceeded({'role': 'exit', 'content': 'Budget exhausted', 'extra': {'exit_status': 'LimitsExceeded', 'submission': ''}})
        self.session.budget.spend('tool_calls')
        result = self.session.client.exec(self.session.run_id,
                   ['runuser', '-u', 'gate', '--', 'sh', '-c', 'cd /workspace/checkout && ' + command],
                   timeout=self.session._remaining(), deadline=self.session.deadline)
        cleanup = self.session.client.exec(self.session.run_id,
                   ['python', '/opt/ai-board/ai-board/harness/verification/baseline_guest.py', 'cleanup'],
                   timeout=self.session._remaining(), deadline=self.session.deadline)
        if cleanup.get('code') != 0:
            raise ValueError('baseline action cleanup unconfirmed')
        output = (result.get('stdout', '') + result.get('stderr', ''))[:10000]
        if result.get('code') == 0 and output.startswith('COMPLETE_TASK_AND_SUBMIT_FINAL_OUTPUT'):
            raise Submitted({'role': 'exit', 'content': output, 'extra': {'exit_status': 'Submitted', 'submission': output}})
        return {'output': output, 'returncode': result.get('code'),
                'exception_info': 'timeout/output limit' if result.get('timed_out') or result.get('truncated') else ''}

    def candidate(self):
        result = self.session.client.exec(self.session.run_id,
                   ['python', '/opt/ai-board/ai-board/harness/verification/baseline_guest.py', 'export'],
                   timeout=self.session._remaining(), deadline=self.session.deadline)
        if result.get('code') != 0 or result.get('timed_out') or result.get('truncated'):
            raise ValueError('baseline candidate export failed')
        raw = self.session.client.download(self.session.run_id, 'candidate', deadline=self.session.deadline)
        if len(raw) > 20_000_000:
            raise ValueError('baseline candidate exceeds export bound')
        changed = json.loads(raw)
        from verification.loop_checks import readable
        if not isinstance(changed, dict) or any(not readable(path) or (text is not None and not isinstance(text, str))
                                                for path, text in changed.items()):
            raise ValueError('invalid baseline candidate')
        return changed


def generate(request, client, model_name, *, runtime=None, session_factory=CheckSession):
    import yaml
    from runtime.tool_manifest import load
    started = time.monotonic()
    budget = Budget.restore(request['budget']) if request.get('budget') else Budget(max_wall_clock_s=request.get('wall_s', 300))
    client = dataclasses.replace(client, deadline=started + max(0, budget.max_wall_clock_s - budget.elapsed_s))
    package, Agent = upstream(runtime)
    config_path = Path(package.__file__).parent / 'config' / 'mini.yaml'
    config = yaml.safe_load(config_path.read_text(encoding='utf-8'))
    manifest = load(known={'tree', 'outline', 'grep', 'read_file', 'edit_file', 'write_test', 'run_check', 'finish'})
    session = session_factory(request['source'], request['base_sha'], budget, manifest.hash)
    environment = RunnerEnvironment(session)
    model = NativeModel(client, model_name, budget, config['model'])
    outcome, changed, error = {}, {}, None
    agent = Agent(model, environment, **{**config['agent'], 'step_limit': budget.max_model_calls, 'cost_limit': 0,
                  'wall_time_limit_seconds': int(budget.max_wall_clock_s), 'output_path': request.get('trajectory')})
    try:
        if not budget.can_request():
            outcome = {'exit_status': 'LimitsExceeded'}
        else:
            environment.start()
            outcome = agent.run(task=request['title'] + '\n\n' + request['detail'])
            if budget.tick():
                changed = environment.candidate()
    except Exception as caught:
        error = type(caught).__name__
    finally:
        session.close()
    return {'candidate': changed, 'outcome': outcome.get('exit_status'), 'error': error,
            'budget': budget.snapshot(), 'model_calls': budget.model_calls,
            'tokens_in': None if model.unknown_usage else model.tokens_in,
            'tokens_out': None if model.unknown_usage else model.tokens_out,
            'cleanup_pending': session.cleanup_pending or model.cleanup_pending,
            'cost_status': 'unknown' if model.unknown_usage else 'complete',
            'wall_s': round(time.monotonic() - started, 3), 'trajectory': agent.serialize(),
            'served': sorted({reply['model'] for reply in model.responses if isinstance(reply['model'], str)}),
            'incomparable': any(reply['model'] != model_name for reply in model.responses),
            'truncated': any(reply.get('finish_reason') == 'length' for reply in model.responses),
            'upstream': {'version': VERSION, 'revision': REVISION, 'wheel_sha256': WHEEL_SHA256,
                         'config_sha256': hashlib.sha256(config_path.read_bytes()).hexdigest()}}


def run_trial(task, deps, root, source, *, runtime=None, wall_s=300, budget=None):
    """Original request -> upstream agent -> candidate -> the same private corpus oracle."""
    import difflib
    import eval_corpus
    from evaluation.suite import candidate_grade, taskpack
    started = time.monotonic()
    budget = budget if budget is not None else Budget(max_wall_clock_s=wall_s)
    repo = taskpack.prepare_checkout(Path(root), task['base_sha'], source)
    router = getattr(deps.models, 'routing', None)
    if router is None:
        raise ValueError('baseline requires the reviewed vLLM route')
    candidate = router.first('gate3_heavy')
    if candidate['provider'] != 'vllm':
        raise ValueError('baseline requires the pinned vLLM model')
    client = router.client(candidate, deps.models)
    trajectory = Path(root) / 'trajectories' / ('mini-swe-' + hashlib.sha256(task['id'].encode()).hexdigest()[:20] + '.json')
    trajectory.parent.mkdir(parents=True, exist_ok=True)
    if trajectory.exists():
        raise ValueError('baseline trajectory already exists; unresolved attempts cannot be replayed')
    result = generate({'title': task['title'], 'detail': task['detail'], 'source': str(repo),
                        'base_sha': task['base_sha'], 'budget': budget.snapshot(), 'trajectory': str(trajectory)},
                       client, candidate['model'], runtime=runtime)
    record = eval_corpus.case_record(task, Path(root), source)
    graded = candidate_grade.grade(task, record, result['candidate'])
    diff = []
    from eval_fast import _base_bytes
    for path, text in result['candidate'].items():
        before = _base_bytes(repo, path)
        old = '' if before is None else before.decode('utf-8', 'replace')
        diff.extend(difflib.unified_diff(old.splitlines(keepends=True), (text or '').splitlines(keepends=True),
                                         fromfile='a/' + path, tofile='b/' + path))
    passed = result['outcome'] == 'Submitted' and not result['error'] and not result['cleanup_pending']
    return {'id': task['id'], 'mode': 'e2e', 'resolved': graded['resolved'] and passed, 'collateral': graded['collateral'],
            'evaluator': graded['evaluator'], 'plan': None, 'gate_passed': passed, 'gate4': None, 'shipped': False,
            'prod': 'skipped', 'ended': result['outcome'], 'error': result['error'], 'reason': result['error'] or result['outcome'],
            'infra_error': bool(result['error']) or result['cleanup_pending'], 'cleanup_pending': result['cleanup_pending'],
            **{key: result[key] for key in ('budget', 'model_calls', 'tokens_in', 'tokens_out', 'cost_status', 'upstream')},
            'wall_s': round(time.monotonic() - started, 3), 'diff': ''.join(diff)[:6000] or None,
            'trajectory': str(trajectory), 'trajectory_sha256': hashlib.sha256(trajectory.read_bytes()).hexdigest() if trajectory.exists() else None,
            'served': result['served'], 'incomparable': result['incomparable'],
            'providers': ['vllm'], 'retries': 0, 'stuck': False, 'truncated': result['truncated'], 'loop_tools': [], 'loop_errors': []}
