"""Run the actual pinned DefaultAgent with scripted model and runner boundaries."""
import dataclasses
import json
from pathlib import Path

import pytest

from evaluation.suite import mini_swe
from verification.loop_checks import CheckSession
from test_verified_loop import repo

RUNTIME = Path(__file__).resolve().parents[3] / '.scratch' / 'implement-mini-swe' / 'mini-runtime'


@dataclasses.dataclass
class ModelClient:
    replies: list
    payloads: list = dataclasses.field(default_factory=list)
    base_url: str = 'http://fake.invalid/v1'
    deadline: float | None = None

    def _post(self, path, payload, **kwargs):
        self.payloads.append(payload)
        reply = self.replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return reply


class Runner:
    def __init__(self):
        self.changed, self.commands, self.closed = {}, [], False

    def create(self, *args, **kwargs):
        return {'network': 'none', 'policy_hash': 'fake-policy', 'state': 'ready'}

    def upload(self, *args, **kwargs):
        return {}

    def exec(self, run_id, argv, **kwargs):
        output = ''
        if argv[0] == 'runuser':
            self.commands.append(argv[-1])
            if 'edit fixture' in argv[-1]:
                self.changed['public/a.js'] = 'export const a = 2;\n'
            if 'COMPLETE_TASK_AND_SUBMIT_FINAL_OUTPUT' in argv[-1]:
                output = 'COMPLETE_TASK_AND_SUBMIT_FINAL_OUTPUT\n'
        return {'code': 0, 'stdout': output, 'stderr': '', 'timed_out': False, 'truncated': False}

    def download(self, *args, **kwargs):
        return json.dumps(self.changed).encode()

    def destroy(self, *args, **kwargs):
        self.closed = True
        return {'state': 'destroyed'}


def reply(command=None):
    calls = [] if command is None else [{'id': 'call-1', 'type': 'function',
                 'function': {'name': 'bash', 'arguments': json.dumps({'command': command})}}]
    return {'model': 'pinned-qwen', 'choices': [{'message': {'role': 'assistant', 'content': 'Reasoning', 'tool_calls': calls},
                                               'finish_reason': 'tool_calls' if calls else 'stop'}],
            'usage': {'prompt_tokens': 10, 'completion_tokens': 5}}


def run(repo, client):
    if not (RUNTIME / 'minisweagent').exists():
        pytest.skip('Install the pinned eval-only mini-swe runtime before adapter integration tests')
    source, sha = repo
    runner = Runner()
    result = mini_swe.generate({'source': str(source), 'base_sha': sha, 'title': 'Change a to 2',
                 'detail': 'Change the visible a value.', 'wall_s': 300}, client, 'pinned-qwen', runtime=RUNTIME,
                 session_factory=lambda *args: CheckSession(*args, client=runner))
    return result, runner


def test_upstream_agent_generates_candidate_without_gold_or_credentials(repo):
    client = ModelClient([reply('edit fixture'), reply('echo COMPLETE_TASK_AND_SUBMIT_FINAL_OUTPUT')])
    result, runner = run(repo, client)
    assert result['outcome'] == 'Submitted' and result['error'] is None
    assert result['candidate'] == {'public/a.js': 'export const a = 2;\n'}
    assert result['model_calls'] == 2 and result['tokens_in'] == 20 and result['tokens_out'] == 10
    assert result['budget']['tool_calls'] == 2 and runner.closed and not result['cleanup_pending']
    assert result['upstream']['version'] == '2.4.6'
    assert result['trajectory']['info']['model_stats']['api_calls'] == 2
    assert [message['role'] for message in client.payloads[-1]['messages']] == ['system', 'user', 'assistant', 'tool']
    assert 'base_sha' not in json.dumps(client.payloads[0]) and 'gold' not in json.dumps(client.payloads[0])
    assert client.payloads[0]['max_tokens'] == mini_swe.OUTPUT_TOKENS == 3072


def test_upstream_format_error_recovery_is_preserved_and_all_attempts_count(repo):
    client = ModelClient([reply(), reply('edit fixture'), reply('echo COMPLETE_TASK_AND_SUBMIT_FINAL_OUTPUT')])
    result, runner = run(repo, client)
    assert result['outcome'] == 'Submitted' and result['model_calls'] == 3
    assert len(runner.commands) == 2 and result['tokens_in'] == 30


@pytest.mark.parametrize('served', ['foreign-model', None])
def test_mismatched_served_identity_is_preserved_without_losing_cleanup_receipt(repo, served):
    response = reply('edit fixture')
    response['model'] = served
    result, runner = run(repo, ModelClient([response]))
    assert result['incomparable'] and result['error'] == 'ValueError'
    assert result['served'] == ([served] if served is not None else [])
    assert result['model_calls'] == 1 and runner.closed and not result['cleanup_pending']


def test_model_timeout_keeps_unknown_usage_and_pending_remote_cleanup(repo):
    client = ModelClient([TimeoutError('interrupted response')])
    result, runner = run(repo, client)
    assert result['error'] == 'TimeoutError' and result['cleanup_pending']
    assert result['model_calls'] == 1 and result['tokens_in'] is None
    assert runner.closed and runner.commands == []


def test_missing_usage_remains_unknown_and_stops_additional_model_requests(repo):
    body = reply('edit fixture')
    body.pop('usage')
    result, runner = run(repo, ModelClient([body]))
    assert result['outcome'] == 'LimitsExceeded' and result['model_calls'] == 1
    assert result['tokens_in'] is None and result['cost_status'] == 'unknown'
    assert not result['cleanup_pending'] and runner.closed


def test_private_candidate_grader_counts_collateral_without_sending_expected_answer_to_agent(repo):
    from evaluation.suite.candidate_grade import grade
    source, _ = repo
    task = {'file': 'public/a.js'}
    record = {'checkout': str(source), 'oracle': lambda text: text == 'export const a = 2;\n'}
    result = grade(task, record, {'public/a.js': 'export const a = 2;\n', 'public/b.js': 'collateral',
                                 'test/a.test.js': 'agent test'})
    assert result['resolved'] and result['collateral'] == ['public/b.js']
