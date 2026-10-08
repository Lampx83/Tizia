// Files the Gate 5 guest image bakes in (guest/Dockerfile COPY lines). The dev policy records their hash next to
// the pinned digest, so a Gate 5 change without a rebuilt guest fails guest-pin.test.js.
//   node scripts/guest-inputs.mjs stage <dir>              copy the inputs into <dir> (overlay build context)
//   node scripts/guest-inputs.mjs pin <policy.yaml> <digest>   write digest + current hash into the policy
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HARNESS = 'ai-board/harness';
const SKIP_DIRS = new Set(['tests', 'eval', '__pycache__', '.venv', '.pytest_cache']);
const FILES = ['server/ai-board/guard-lexicon.json', 'server/ai-board/contract.json', 'scripts/smoke-user-state.sh', 'ai-board/sandbox-runner/guest/guest-boot.sh'];
const MARKER = /^# guest-inputs: ([0-9a-f]{64})\r?$/m;

function walk(root, rel, out) {
  for (const e of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(root, `${rel}/${e.name}`, out);
    } else if (!e.name.endsWith('.pyc')) out.push(`${rel}/${e.name}`);
  }
}

export function guestInputs(root) {
  const rels = [];
  walk(root, HARNESS, rels);
  for (const f of FILES) if (fs.existsSync(path.join(root, f))) rels.push(f);
  return rels.sort().map((rel) => ({ rel, body: fs.readFileSync(path.join(root, rel)) }));
}

export function guestInputsHash(root) {
  const h = crypto.createHash('sha256');
  for (const { rel, body } of guestInputs(root)) {
    const lf = Buffer.from(body.toString('latin1').replace(/\r\n/g, '\n'), 'latin1');
    h.update(`${rel}\0${crypto.createHash('sha256').update(lf).digest('hex')}\n`);
  }
  return h.digest('hex');
}

export function pinnedHash(policyText) {
  return MARKER.exec(policyText)?.[1] ?? null;
}

export function pin(policyPath, digest, hash) {
  let text = fs.readFileSync(policyPath, 'utf8');
  if (!/^guest_image: .*@sha256:[0-9a-f]{64}\r?$/m.test(text)) throw new Error('policy has no pinned guest_image line');
  text = text.replace(/^guest_image: (.*)@sha256:[0-9a-f]{64}(\r?)$/m, `guest_image: $1@${digest}$2`);
  text = MARKER.test(text)
    ? text.replace(/^# guest-inputs: [0-9a-f]{64}(\r?)$/m, `# guest-inputs: ${hash}$1`)
    : text.replace(/^(guest_image: .*)$/m, (line) => `# guest-inputs: ${hash}${text.includes('\r\n') ? '\r\n' : '\n'}${line}`);
  fs.writeFileSync(policyPath, text);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const [cmd, a, b] = process.argv.slice(2);
  if (cmd === 'stage') {
    for (const { rel, body } of guestInputs(root)) {
      fs.mkdirSync(path.dirname(path.join(a, rel)), { recursive: true });
      fs.writeFileSync(path.join(a, rel), body);
    }
  } else if (cmd === 'pin') {
    pin(a, b, guestInputsHash(root));
  } else {
    console.log(guestInputsHash(root));
  }
}
