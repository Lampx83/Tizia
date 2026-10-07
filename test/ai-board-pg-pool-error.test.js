// PG restart bắn 'error' trên pool; không có listener process chết (exit 1).
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPgDb } from '../server/ai-board/db/index.js';

test('pool error event is logged, not thrown', () => {
  const d = createPgDb({ url: 'postgres://u:p@127.0.0.1:1/x' });
  const logged = []; const orig = console.error; console.error = (m) => logged.push(m);
  try { assert.doesNotThrow(() => d.pool.emit('error', new Error('terminating connection due to administrator command'))); }
  finally { console.error = orig; }
  assert.match(logged[0], /terminating connection/);
});
