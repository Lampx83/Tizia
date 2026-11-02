// Fast harness suite: everything except the eval/Playwright/timeout tests marked slow.
// Full suite: run the same command without -m, then `npm test` for the Node suite.
import { spawnSync } from 'node:child_process';

const python = process.platform === 'win32'
  ? 'ai-board/harness/.venv/Scripts/python.exe'
  : 'ai-board/harness/.venv/bin/python';
const args = ['-m', 'pytest', 'ai-board/harness/tests', '-q'];
if (!process.argv.includes('--full')) args.push('-m', 'not slow');
const run = spawnSync(python, args, { stdio: 'inherit' });
process.exit(run.status ?? 1);
