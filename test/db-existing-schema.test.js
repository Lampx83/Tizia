import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveBootMode, findMissingSchema, loadRequiredSchema, aiBoardOwnedTables } from '../server/db-existing-schema.js';

test('resolveBootMode: unset is legacy, unknown throws', () => {
  assert.equal(resolveBootMode(undefined), 'legacy');
  assert.equal(resolveBootMode(''), 'legacy');
  assert.equal(resolveBootMode('legacy'), 'legacy');
  assert.equal(resolveBootMode(' existing-schema '), 'existing-schema');
  assert.throws(() => resolveBootMode('existing'), /not valid/);
  assert.throws(() => resolveBootMode('EXISTING-SCHEMA'), /not valid/);
});

test('required-schema manifest holds platform tables only', () => {
  const req = loadRequiredSchema();
  const owned = aiBoardOwnedTables();
  for (const t of Object.keys(req)) assert.ok(!owned.has(t), t);
  for (const t of ['users', 'requests', 'sessions', 'ai_decisions', 'ai_prompt_log', 'ai_token_usage', 'ai_lesson_content']) assert.ok(req[t], t);
  assert.ok(!req.requests.includes('owner_user_id') && req.requests.includes('attachments'));
});

test('findMissingSchema lists missing tables and columns', async () => {
  const d = { all: async () => [{ t: 'a', c: 'x' }, { t: 'b', c: 'y' }] };
  assert.deepEqual(await findMissingSchema(d, { a: ['x'], b: ['y'] }), []);
  assert.deepEqual(await findMissingSchema(d, { a: ['x', 'z'], c: ['q'] }), ['table a lacks column(s): z', 'missing table c']);
});
