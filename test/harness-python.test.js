import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { resolveHarnessPython, venvMarker, venvPython } from '../scripts/harness-python.mjs';

const root = path.resolve('/fake/repo');
const venv = path.join(root, 'ai-board/harness/.venv');
const reqPath = path.join(root, 'ai-board/harness/requirements.txt');
const REQ = 'pydantic==2.9.2\n';
const currentHash = createHash('sha256').update(REQ).digest('hex');

function fake({ files = [], marker, baseOk = true, pipOk = true } = {}) {
  const present = new Set([reqPath, ...files]);
  const content = new Map([[reqPath, REQ]]);
  if (marker !== undefined) { present.add(venvMarker(root)); content.set(venvMarker(root), marker); }
  const calls = [];
  const fs = {
    existsSync: (p) => present.has(p),
    mkdirSync: (p) => { if (present.has(p)) throw Object.assign(new Error('exists'), { code: 'EEXIST' }); present.add(p); },
    rmSync: (p) => {
      for (const f of [...present]) if (f === p || f.startsWith(p + path.sep)) present.delete(f);
      for (const f of [...content.keys()]) if (f === p || f.startsWith(p + path.sep)) content.delete(f);
    },
    statSync: () => ({ mtimeMs: Date.now() }),
    readFileSync: (p) => {
      if (!content.has(p)) throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
      return content.get(p);
    },
    writeFileSync: (p, data) => { present.add(p); content.set(p, String(data)); },
  };
  const run = (cmd, args) => {
    calls.push([cmd, ...args]);
    if (args.includes('--version')) return { status: baseOk ? 0 : 1 };
    if (args.includes('venv')) { present.add(venvPython(root)); return { status: 0 }; }
    return { status: pipOk ? 0 : 1 };
  };
  return { fs, run, calls, present, content };
}

test('AI_BOARD_PYTHON wins over everything', () => {
  const f = fake({ files: [venvPython(root)], marker: currentHash });
  assert.equal(resolveHarnessPython({ env: { AI_BOARD_PYTHON: '/opt/venv/bin/python' }, ...f, root }), '/opt/venv/bin/python');
  assert.deepEqual(f.calls, []);
});

test('existing venv with a current completion marker is used without spawning', () => {
  const f = fake({ files: [venvPython(root)], marker: currentHash });
  assert.equal(resolveHarnessPython({ env: {}, ...f, root }), venvPython(root));
  assert.deepEqual(f.calls, []);
});

test('venv without completion marker (interrupted install) is reinstalled, not reused', () => {
  const f = fake({ files: [venvPython(root)] });
  assert.equal(resolveHarnessPython({ env: {}, ...f, root }), venvPython(root));
  assert.ok(f.calls.some((c) => c.includes('pip') && c.includes(reqPath)));
  assert.ok(!f.calls.some((c) => c.includes('venv')), 'existing python must not be recreated');
  assert.equal(f.content.get(venvMarker(root)).trim(), currentHash);
});

test('venv with a stale requirements hash is reinstalled', () => {
  const f = fake({ files: [venvPython(root)], marker: '0'.repeat(64) });
  resolveHarnessPython({ env: {}, ...f, root });
  assert.ok(f.calls.some((c) => c.includes('pip')));
  assert.equal(f.content.get(venvMarker(root)).trim(), currentHash);
});

test('bootstrap creates venv, installs requirements, writes marker, releases lock', () => {
  const f = fake();
  const python = resolveHarnessPython({ env: {}, ...f, root, platform: 'linux' });
  assert.equal(python, venvPython(root, 'linux'));
  assert.ok(f.calls.some((c) => c.includes('venv') && c.includes(venv)));
  const pip = f.calls.find((c) => c.includes('pip'));
  assert.ok(pip.includes(reqPath));
  assert.equal(f.content.get(venvMarker(root)).trim(), currentHash);
  assert.ok(!f.present.has(`${venv}.lock`));
});

test('waits for another process holding the lock, then reuses its finished venv', () => {
  const f = fake({ files: [`${venv}.lock`] });
  const sleep = () => {
    f.present.delete(`${venv}.lock`);
    f.present.add(venvPython(root));
    f.content.set(venvMarker(root), currentHash);
    f.present.add(venvMarker(root));
  };
  assert.equal(resolveHarnessPython({ env: {}, ...f, root, sleep }), venvPython(root));
  assert.ok(!f.calls.some((c) => c.includes('venv')));
});

test('no base python: clear error, lock released', () => {
  const f = fake({ baseOk: false });
  assert.throws(() => resolveHarnessPython({ env: {}, ...f, root }), /Python not found.*AI_BOARD_PYTHON/);
  assert.ok(!f.present.has(`${venv}.lock`));
});

test('pip failure removes the half-built venv and writes no marker', () => {
  const f = fake({ pipOk: false });
  assert.throws(() => resolveHarnessPython({ env: {}, ...f, root }), /bootstrap failed/);
  assert.ok(!f.present.has(venvPython(root)));
  assert.ok(!f.present.has(venvMarker(root)));
});
