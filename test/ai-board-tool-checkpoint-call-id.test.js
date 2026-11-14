import test from 'node:test';
import assert from 'node:assert/strict';
import { createToolCheckpointService } from '../server/ai-board/services/tool-checkpoint.js';

const IDENTITY = 'a'.repeat(32);

function fixture() {
  const writes = [];
  const repo = {
    tx: (fn) => fn(),
    run: async () => ({ run_scope: 'ticket-7:r1' }),
    insertIntent: async (row) => writes.push(['intent', row]),
    upsertDone: async (row) => writes.push(['done', row]),
  };
  const store = { assertLease: async () => {} };
  return { service: createToolCheckpointService(store, repo), writes };
}
const base = { proposal_id: '12345', child: 0, step: 3, identity: IDENTITY, tool: 'write_file', args: { file: 'public/a.html' },
  worker_id: 'w1', lease_token: 't' };

test('intent and done persist the tool_call_id sent by the worker', async () => {
  const { service, writes } = fixture();
  await service.apply('7', 'intent', { ...base, call_id: 'tc:run7:g3:c0:a0:s3' });
  await service.apply('7', 'done', { ...base, observation: 'ok', kind: 'ok', call_id: 'tc:run7:g3:c0:a0:s3' });
  assert.equal(writes[0][1].callId, 'tc:run7:g3:c0:a0:s3');
  assert.equal(writes[1][1].callId, 'tc:run7:g3:c0:a0:s3');
});

test('missing or oversized call_id is stored as null or capped, never a non-string', async () => {
  const { service, writes } = fixture();
  await service.apply('7', 'intent', base);
  await service.apply('7', 'intent', { ...base, call_id: 42 });
  await service.apply('7', 'done', { ...base, observation: '', kind: 'ok', call_id: 'x'.repeat(300) });
  assert.equal(writes[0][1].callId, null);
  assert.equal(writes[1][1].callId, null);
  assert.equal(writes[2][1].callId.length, 120);
});
