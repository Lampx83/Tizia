"""One real HttpWorker claim with fake models. PROBE_BUSY_GATE=n: gate n answers busy once."""
import json
import os
import sys
import urllib.error
from pathlib import Path
from types import SimpleNamespace

root = Path(__file__).resolve().parents[2]
sys.path[:0] = [str(root / 'ai-board'), str(root / 'ai-board/harness')]
from worker import HttpWorker, WorkerClient, execute_pre_pr
from budget import Budget
from gates import static_check

calls = []
busy_gate = int(os.environ.get('PROBE_BUSY_GATE', '0'))
busy_once = {'left': 1}


def run_gate(gate, _request, _deps, _budget, state):
    if gate == busy_gate and busy_once['left']:
        busy_once['left'] -= 1
        return {'gate': gate, 'blocked': True, 'reason': 'sandbox runner busy', 'failure_class': 'busy'}
    if gate == 3:
        target = Path(state['scratch_repo']) / 'public/pharmacy/demo.js'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text('export const fixture = 1;\n', encoding='utf-8')
        state['diffs'] = [{'file': 'public/pharmacy/demo.js', 'diff': '+export const fixture = 1;'}]
        return {'gate': 3, 'blocked': False}
    if gate == 4:
        calls.append(gate)
        return static_check.run(state)
    return {'gate': gate, 'blocked': True, 'failure_class': 'plan', 'reason': 'Other gates are outside the probe fixture'}


def runner(plan, ticket_id, max_units, **kwargs):
    return execute_pre_pr(plan, ticket_id=ticket_id, checkout_source=root, deps=SimpleNamespace(), budget=Budget(),
        run_gate=run_gate, cleanup=lambda *args, **kw: None, policy=kwargs['policy'],
        accepted_policy_hash=kwargs['accepted_policy_hash'])


worker = HttpWorker(WorkerClient(sys.argv[1], sys.argv[2]), worker_id=sys.argv[3], mode='active',
    planner=lambda _: ({}, 0), change_runner=runner, candidates=SimpleNamespace(discard=lambda _: None))
try:
    if os.environ.get('PROBE_CLAIM_ONLY'):
        claim = WorkerClient(sys.argv[1], sys.argv[2]).post('/api/ai-board/worker/claim', {
            'worker_id': sys.argv[3], 'version': 'probe', 'mode': 'active', 'intent': 'plan'})
        print(json.dumps({'ticket': (claim.get('ticket') or {}).get('id'), 'gate4_calls': 0}))
        sys.exit(0)
    print(json.dumps({'result': worker.run_once(), 'gate4_calls': len(calls)}))
except urllib.error.HTTPError as error:
    raise RuntimeError(error.read().decode()) from error
