"""Whole-trial fixture: real worker/model HTTP, no GPU or external endpoints."""
import json
import os
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

root = Path(__file__).resolve().parents[2]
sys.path[:0] = [str(root / 'ai-board'), str(root / 'ai-board/harness')]
from worker import WorkerClient
from runtime.root_allowance import root_scope
from runtime.budget import Budget, BudgetExhausted
from runtime.pipeline import Deps
from providers.client import OllamaClient
from api.client import RemotePlanner

origin, ticket, worker, lease = sys.argv[1:5]
if '--crash-after-reserve' in sys.argv:
    WorkerClient(origin, 'fixture-root-allowance-worker-key').post(
        f'/api/ai-board/worker/tickets/{ticket}/allowance/reserve',
        {'worker_id': worker, 'lease_token': lease, 'idempotency_key': 'attempt-before-crash',
         'kind': 'model', 'provider': 'vllm', 'token_bound': 32768})
    os._exit(73)
calls = []

class Model(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(json.dumps({'data': [{'id': 'fixture-model', 'max_model_len': 1024}]}).encode())

    def do_POST(self):
        self.rfile.read(int(self.headers['Content-Length']))
        calls.append(self.path)
        self.send_response(503 if len(calls) == 1 else 200)
        self.end_headers()
        success = {'response': '{}', 'prompt_eval_count': 11, 'eval_count': 7} if self.path == '/api/generate' else {
            'choices': [{'message': {'content': '{}'}, 'finish_reason': 'stop'}],
            'usage': {'prompt_tokens': 11, 'completion_tokens': 7},
        }
        self.wfile.write(json.dumps({} if len(calls) == 1 else success).encode())

    def log_message(self, *_):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), Model)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
try:
    models = OllamaClient(base_url=f'http://127.0.0.1:{server.server_port}', protocol='ollama' if '--ollama' in sys.argv else 'vllm', timeout_s=2)
    deps = Deps(models=models, notify=None, sleep=lambda _: None)
    client = WorkerClient(origin, 'fixture-root-allowance-worker-key')
    if '--expect-deadline-after-reserve' in sys.argv:
        models.deadline = time.monotonic() + 1
    with root_scope(client, int(ticket), {'worker_id': worker, 'lease_token': lease}):
        planner = Budget()
        class LocalPlanner:
            last_skill = None
            def __call__(self, snapshot, source=None):
                deps.call_model('fixture-model', 'plan', gate=1, budget=planner, options={'num_predict': 32})
                return {}, planner.units
        RemotePlanner('http://127.0.0.1:1', 'fixture-root-allowance-worker-key', fallback=LocalPlanner())({'request': {}})
        editing = Budget()  # A fresh phase-local budget cannot refill root work.
        deps.call_model('fixture-model', 'edit', gate=3, budget=editing, options={'num_predict': 32})
        editing.spend('tool_calls')
        editing.spend_repair()
        assert Budget().spend_repair()
        assert Budget().spend_repair()
        try:
            Budget().spend_repair()
        except BudgetExhausted:
            pass
        else:
            raise AssertionError('new phase replenished semantic repairs')
        assert editing.spend_quality_switch()
        assert not Budget().spend_quality_switch(), 'new phase cannot replenish a quality switch'
    print(json.dumps({'model_requests': len(calls), 'planner_calls': planner.model_calls, 'editing_calls': editing.model_calls}))
except BudgetExhausted as error:
    if '--expect-admission-denied' in sys.argv:
        print(json.dumps({'model_requests': len(calls), 'planner_calls': planner.model_calls, 'error': str(error)}))
    elif '--expect-reserve-ack-loss' in sys.argv:
        print(json.dumps({'model_requests': len(calls), 'error': str(error)}))
    else:
        raise
except TimeoutError:
    if '--expect-deadline-after-reserve' not in sys.argv:
        raise
    print(json.dumps({'model_requests': len(calls)}))
finally:
    server.shutdown()
    server.server_close()
    thread.join()
