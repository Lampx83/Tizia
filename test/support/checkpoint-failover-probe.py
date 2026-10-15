"""Worker A crash giữa loop, worker B lease mới resume qua API checkpoint: không ghi trùng, ledger cộng dồn; lease cũ bị từ chối."""
import json
import sys
import urllib.error
from pathlib import Path

root = Path(__file__).resolve().parents[2]
sys.path[:0] = [str(root / 'ai-board'), str(root / 'ai-board/harness'), str(root / 'ai-board/harness/tests')]
import tools
from worker import WorkerClient
from repositories.server_checkpoint import HttpCheckpoint
from runtime import tool_loop
from runtime.budget import Budget
from test_tool_loop import Deps, EDIT, FINISH, PAGE, SUBTASK, TEST

base, worker_key, ticket_id, phase = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
tools._show = lambda *a: PAGE
client = WorkerClient(base, worker_key)


class Crash(Exception):
    pass


def checkpoint(worker, token):
    return HttpCheckpoint(client, ticket_id, {'worker_id': worker, 'lease_token': token}, f'ticket-{ticket_id}:planhash')


def loop(store, script, budget):
    deps = Deps(script)
    out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=budget, model='m', source='.', sha='abc', check=lambda o: None, store=store)
    return out, deps


if phase == 'a':
    store = checkpoint('worker-a', 'lease-a').store('abc', 0)
    real = store.intent

    def intent(step, tool, args):
        if step == 1:
            raise Crash()
        real(step, tool, args)

    store.intent = intent
    try:
        loop(store, [EDIT, TEST, FINISH], Budget())
        print(json.dumps({'crashed': False}))
    except Crash:
        print(json.dumps({'crashed': True}))
elif phase == 'b':
    budget = Budget()
    out, deps = loop(checkpoint('worker-b', 'lease-b').store('abc', 0), [TEST, FINISH], budget)
    print(json.dumps({'status': out['status'], 'steps': out.get('steps'), 'edits': out['out']['code'].count('<p>B</p>'),
                      'model_calls': budget.model_calls, 'prompts': len(deps.prompts)}))
else:
    try:
        checkpoint('worker-a', 'lease-a').store('abc', 0).intent(9, 'finish', {})
        print(json.dumps({'rejected': None}))
    except urllib.error.HTTPError as error:
        print(json.dumps({'rejected': error.code, 'error': json.loads(error.read()).get('error')}))
