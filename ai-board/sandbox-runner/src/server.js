import { createServer } from 'node:http';
import { bootProbe } from './boot.js';
import { checkKvm } from './kvm.js';
import { createReadiness } from './readiness.js';

const PORT = Number(process.env.PORT || 8090);
const RECHECK_MS = Number(process.env.SANDBOX_RECHECK_MS || 60_000);

const readiness = createReadiness({
  checkKvm, bootProbe,
  onFailure: (code, error) => log('readiness_failure', { code, cause: String(error?.stack || error).slice(0, 2000) }),
});
const log = (event, detail = {}) => console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...detail }));

async function recheck() {
  const { ready, code } = await readiness.check();
  log('readiness', { ready, code });
}

createServer((req, res) => {
  if (req.method !== 'GET' || req.url !== '/healthz') { res.writeHead(404).end(); return; }
  const status = readiness.status();
  res.writeHead(status.ready ? 200 : 503, { 'content-type': 'application/json' }).end(JSON.stringify(status));
}).listen(PORT, '0.0.0.0', () => log('listening', { port: PORT }));

recheck();
setInterval(recheck, RECHECK_MS).unref();
