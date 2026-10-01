import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createApi } from './api.js';
import { createMicrosandboxBackend } from './backend.js';
import { bootProbe } from './boot.js';
import { checkKvm } from './kvm.js';
import { loadPolicy } from './policy.js';
import { createReadiness } from './readiness.js';
import { createRuns } from './runs.js';
import { fileStore } from './store.js';

const PORT = Number(process.env.PORT || 8090);
const RECHECK_MS = Number(process.env.SANDBOX_RECHECK_MS || 60_000);
const SWEEP_MS = 10_000;
const RUNNER_ID = process.env.SANDBOX_RUNNER_ID || 'sandbox-runner';

const log = (event, detail = {}) => console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...detail }));

function fatal(event, error) {
  log(event, { cause: String(error?.message || error).slice(0, 500) });
  process.exit(1); // fail closed: no listener, no fallback
}

let policy;
let token;
try {
  policy = loadPolicy(readFileSync(process.env.SANDBOX_POLICY_FILE || '/etc/sandbox/sandbox-policy.yaml', 'utf8'));
  token = readFileSync(process.env.SANDBOX_TOKEN_FILE || '/run/secrets/sandbox-runner-token', 'utf8').trim();
  if (token.length < 32) throw new Error('token too short');
} catch (error) { fatal('startup_config_invalid', error); }

const alert = (event) => log('alert', event);
const runs = createRuns({
  policy, backend: createMicrosandboxBackend(), store: fileStore(process.env.SANDBOX_STATE_FILE || '/home/node/.microsandbox/runner-state.json'),
  alert, runnerId: RUNNER_ID,
  report: (event, run_id, error) => log('run_failure', { kind: event, run_id, cause: String(error?.stack || error).slice(0, 1500) }),
});
const readiness = createReadiness({
  checkKvm, bootProbe,
  onFailure: (code, error) => log('readiness_failure', { code, cause: String(error?.stack || error).slice(0, 2000) }),
});

async function recheck() {
  if (runs.active() > 0) return; // a probe VM would compete with the live run for memory
  const { ready, code } = await readiness.check();
  log('readiness', { ready, code });
}

const api = createApi({ runs, readiness, policy, token });
const server = createServer((req, res) => {
  const started = Date.now();
  res.on('finish', () => {
    const run_id = /^\/v1\/runs\/([\w-]+)/.exec(req.url || '')?.[1];
    log('request', { method: req.method, route: (req.url || '').replace(/\/[\w-]{8,}/g, '/:id').split('?')[0], status: res.statusCode, ms: Date.now() - started, run_id });
  });
  api(req, res);
});

await runs.reconcile();
await readiness.check();
log('policy', { hash: policy.hash, ready: readiness.status().ready, healthy: runs.health().healthy });
server.listen(PORT, '0.0.0.0', () => log('listening', { port: PORT }));
setInterval(recheck, RECHECK_MS).unref();
setInterval(() => runs.sweep().catch((error) => log('sweep_failed', { cause: String(error?.message || error) })), SWEEP_MS).unref();
