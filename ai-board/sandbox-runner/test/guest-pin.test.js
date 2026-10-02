import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { guestInputs, guestInputsHash, pin, pinnedHash } from '../scripts/guest-inputs.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

function fakeRepo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'guest-inputs-'));
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), body);
  }
  return root;
}

const BASE = {
  'ai-board/harness/gates/verify.py': 'a = 1\n',
  'ai-board/harness/functional.py': 'b = 2\n',
  'server/ai-board/guard-lexicon.json': '{}\n',
  'scripts/smoke-user-state.sh': 'echo hi\n',
  'ai-board/sandbox-runner/guest/guest-boot.sh': 'echo boot\n',
};

test('the hash covers what the guest image bakes in and ignores what it does not', () => {
  const root = fakeRepo({
    ...BASE,
    'ai-board/harness/tests/test_x.py': 'x\n',
    'ai-board/harness/__pycache__/m.pyc': 'x',
    'ai-board/harness/.venv/lib/y.py': 'x',
    'server/ai-board/store.js': 'admin only\n',
  });
  const h = guestInputsHash(root);
  assert.deepEqual(guestInputs(root).map((f) => f.rel), Object.keys(BASE).sort());
  fs.writeFileSync(path.join(root, 'ai-board/harness/tests/test_x.py'), 'changed\n');
  fs.writeFileSync(path.join(root, 'server/ai-board/store.js'), 'changed\n');
  assert.equal(guestInputsHash(root), h, 'tests and admin-only server code do not need a new guest');
  fs.writeFileSync(path.join(root, 'ai-board/harness/functional.py'), 'b = 3\n');
  assert.notEqual(guestInputsHash(root), h, 'a Gate 5 file change needs a new guest');
});

test('line endings do not change the hash', () => {
  const lf = fakeRepo(BASE);
  const crlf = fakeRepo(Object.fromEntries(Object.entries(BASE).map(([k, v]) => [k, v.replace(/\n/g, '\r\n')])));
  assert.equal(guestInputsHash(crlf), guestInputsHash(lf));
});

test('the dev policy pins a guest built from the current harness', () => {
  const policy = fs.readFileSync(path.join(REPO, 'ai-board/sandbox-runner/sandbox-policy.dev.yaml'), 'utf8');
  assert.equal(
    pinnedHash(policy),
    guestInputsHash(REPO),
    'Gate 5 files changed since the pinned guest was built: run `sh ai-board/sandbox-runner/scripts/rebuild-guest.sh`',
  );
});

test('pin() rewrites the digest and the hash marker in place, for LF and CRLF policies', () => {
  const D1 = `sha256:${'1'.repeat(64)}`;
  const D2 = `sha256:${'2'.repeat(64)}`;
  const H1 = 'a'.repeat(64);
  const H2 = 'b'.repeat(64);
  for (const eol of ['\n', '\r\n']) {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'policy-')), 'policy.yaml');
    fs.writeFileSync(file, ['version: 1', `guest_image: image-registry:5000/gate5@${D1}`, 'egress: []', ''].join(eol));
    pin(file, D2, H1);                                   // first pin adds the marker above guest_image
    let text = fs.readFileSync(file, 'utf8');
    assert.equal(pinnedHash(text), H1);
    assert.ok(text.includes(`guest_image: image-registry:5000/gate5@${D2}`) && !text.includes(D1));
    pin(file, D1, H2);                                   // a later pin replaces both, never duplicates the marker
    text = fs.readFileSync(file, 'utf8');
    assert.equal(pinnedHash(text), H2);
    assert.equal(text.match(/# guest-inputs:/g).length, 1);
    assert.ok(text.includes(`@${D1}`) && text.includes('egress: []'));
    assert.equal(text.includes('\r\n'), eol === '\r\n');
    assert.ok(!/(^|[^\r])\n/.test(text) || eol === '\n', 'line endings stay consistent');
  }
  assert.throws(() => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'policy-')), 'p.yaml');
    fs.writeFileSync(file, 'version: 1\n');
    pin(file, D1, H1);
  }, /no pinned guest_image/);
});
