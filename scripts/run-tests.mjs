// Root test entry: unit tests only. Explicit runners (test/*-http.mjs, ai-board-online-*.mjs) need a live server/sandbox;
// ai-board/sandbox-runner has its own package.json and `npm test`. Node 20 has no --test globs, so list files here.
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const files = readdirSync('test').filter((f) => /\.test\.m?js$/.test(f)).sort().map((f) => `test/${f}`);
process.exit(spawnSync(process.execPath, ['--test', ...process.argv.slice(2), ...files], { stdio: 'inherit' }).status ?? 1);
