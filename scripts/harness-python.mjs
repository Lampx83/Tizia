// Resolve the harness Python: AI_BOARD_PYTHON > existing .venv > bootstrap .venv once (cross-process lock).
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCK_STALE_MS = 20 * 60_000;
const LOCK_WAIT_MS = 25 * 60_000;

const sleepSync = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

export function venvPython(root = ROOT, platform = process.platform) {
  return path.join(root, 'ai-board/harness/.venv', platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
}

function findBasePython(run, platform) {
  const candidates = platform === 'win32'
    ? [['python', []], ['py', ['-3']], ['python3', []]]
    : [['python3', []], ['python', []]];
  for (const [cmd, pre] of candidates) {
    const r = run(cmd, [...pre, '--version'], { stdio: 'ignore' });
    if (!r.error && r.status === 0) return [cmd, pre];
  }
  throw new Error('AI Board harness Python not found: install Python 3.11+ or set AI_BOARD_PYTHON to an interpreter that has ai-board/harness/requirements.txt installed.');
}

function acquire(fs, lock, now, sleep) {
  const started = now();
  for (;;) {
    try { fs.mkdirSync(lock); return; } catch (e) {
      if (e.code !== 'EEXIST') throw e;
    }
    let age = 0;
    try { age = now() - fs.statSync(lock).mtimeMs; } catch { continue; }
    if (age > LOCK_STALE_MS) { fs.rmSync(lock, { recursive: true, force: true }); continue; }
    if (now() - started > LOCK_WAIT_MS) throw new Error(`timed out waiting for harness venv bootstrap lock ${lock}`);
    sleep(500);
  }
}

export function resolveHarnessPython({
  env = process.env, fs = nodeFs, platform = process.platform, run = spawnSync,
  root = ROOT, now = Date.now, sleep = sleepSync,
} = {}) {
  if (env.AI_BOARD_PYTHON) return env.AI_BOARD_PYTHON;
  const python = venvPython(root, platform);
  const venv = path.join(root, 'ai-board/harness/.venv');
  const lock = `${venv}.lock`;
  if (fs.existsSync(python) && !fs.existsSync(lock)) return python;

  acquire(fs, lock, now, sleep);
  try {
    if (fs.existsSync(python)) return python;
    const [cmd, pre] = findBasePython(run, platform);
    const requirements = path.join(root, 'ai-board/harness/requirements.txt');
    const steps = [[cmd, [...pre, '-m', 'venv', venv]], [python, ['-m', 'pip', 'install', '-q', '-r', requirements]]];
    process.stderr.write(`[harness-python] bootstrapping ${venv} (one-time)\n`);
    for (const [c, args] of steps) {
      const r = run(c, args, { stdio: ['ignore', 2, 2] });
      if (r.error || r.status !== 0) {
        fs.rmSync(venv, { recursive: true, force: true });
        throw new Error(`harness venv bootstrap failed: ${c} ${args.join(' ')} (${r.error?.message ?? `exit ${r.status}`})`);
      }
    }
    return python;
  } finally {
    fs.rmSync(lock, { recursive: true, force: true });
  }
}
