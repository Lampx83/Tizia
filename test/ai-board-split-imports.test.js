// LF/109: the web db layer no longer imports AI board, and the board entry never takes the web appDb.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');

test('db-core no longer imports the AI board database module', () => {
  const source = read('../server/db-core.js');
  assert.ok(!/ai-board\/db/.test(source), 'db-core must use the neutral pg core');
  assert.match(source, /db-pg-core\.js/);
});

test('aiboard-server entry never receives the web appDb or web db', () => {
  const source = read('../server/aiboard-server.js');
  assert.ok(!/appDb/.test(source), 'board entry must pass a board-only handle');
  assert.ok(!/from '\.\/db\.js'|db-core/.test(source), 'board entry must not import the web db');
  assert.match(source, /AI_BOARD_DATABASE_URL/);
});

test('the neutral pg core has no AI board imports', () => {
  const source = read('../server/db-pg-core.js');
  assert.ok(!/ai-board/.test(source), 'pg core stays neutral');
});
