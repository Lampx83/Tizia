import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { resolveHarnessPython, venvPython } from '../scripts/harness-python.mjs';

const root = path.resolve('/fake/repo');
const venv = path.join(root, 'ai-board/harness/.venv');

function fake({ files = [], baseOk = true, pipOk = true } = {}) {
  const present = new Set(files);
  const calls = [];
  const fs = {
    existsSync: (p) => present.has(p),
    mkdirSync: (p) => { if (present.has(p)) throw Object.assign(new Error('exists'), { code: 'EEXIST' }); present.add(p); },
    rmSync: (p) => { for (const f of [...present]) if (f === p || f.startsWith(p + path.sep)) present.delete(f); },
    statSync: () => ({ mtimeMs: Date.now() }),
  };
  const run = (cmd, args) => {
    calls.push([cmd, ...args]);
    if (args.includes('--version')) return { status: baseOk ? 0 : 1 };
    if (args.includes('venv')) { present.add(venvPython(root)); return { status: 0 }; }
    return { status: pipOk ? 0 : 1 };
  };
  return { fs, run, calls, present };
}

test('AI_BOARD_PYTHON wins over everything', () => {
  const f = fake({ files: [venvPython(root)] });
  assert.equal(resolveHarnessPython({ env: { AI_BOARD_PYTHON: '/opt/venv/bin/python' }, ...f, root }), '/opt/venv/bin/python');
  assert.deepEqual(f.calls, []);
});

test('existing venv used without spawning', () => {
  const f = fake({ files: [venvPython(root)] });
  assert.equal(resolveHarnessPython({ env: {}, ...f, root }), venvPython(root));
  assert.deepEqual(f.calls, []);
});

test('bootstrap creates venv, installs requirements, releases lock', () => {
  const f = fake();
  const python = resolveHarnessPython({ env: {}, ...f, root, platform: 'linux' });
  assert.equal(python, venvPython(root, 'linux'));
  assert.ok(f.calls.some((c) => c.includes('venv') && c.includes(venv)));
  const pip = f.calls.find((c) => c.includes('pip'));
  assert.ok(pip.includes(path.join(root, 'ai-board/harness/requirements.txt')));
  assert.ok(!f.present.has(`${venv}.lock`));
});

test('waits for another process holding the lock, then reuses its venv', () => {
  const f = fake({ files: [`${venv}.lock`] });
  const sleep = () => { f.present.delete(`${venv}.lock`); f.present.add(venvPython(root)); };
  assert.equal(resolveHarnessPython({ env: {}, ...f, root, sleep }), venvPython(root));
  assert.ok(!f.calls.some((c) => c.includes('venv')));
});

test('no base python: clear error, lock released', () => {
  const f = fake({ baseOk: false });
  assert.throws(() => resolveHarnessPython({ env: {}, ...f, root }), /Python not found.*AI_BOARD_PYTHON/);
  assert.ok(!f.present.has(`${venv}.lock`));
});

test('pip failure removes the half-built venv', () => {
  const f = fake({ pipOk: false });
  assert.throws(() => resolveHarnessPython({ env: {}, ...f, root }), /bootstrap failed/);
  assert.ok(!f.present.has(venvPython(root)));
});
