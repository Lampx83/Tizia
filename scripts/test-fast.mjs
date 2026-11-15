// Fast harness suite: everything except the eval/Playwright/timeout tests marked slow.
// Full suite: run the same command without -m, then `npm test` for the Node suite.
import { spawnSync } from 'node:child_process';
import { resolveHarnessPython } from './harness-python.mjs';

const python = resolveHarnessPython();
const args = ['-m', 'pytest', 'ai-board/harness/tests', '-q'];
if (!process.argv.includes('--full')) args.push('-m', 'not slow');
const run = spawnSync(python, args, { stdio: 'inherit' });
process.exit(run.status ?? 1);
