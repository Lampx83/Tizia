// Pure contract for GET /api/admin/ai-board/driver/worker: public fields, redaction, caps.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicWorker, safeText } from '../server/contexts/ai-board-driver/index.js';

test('safeText redacts key/token-like values and caps length', () => {
  assert.equal(safeText('api_key=abc'), '[redacted]');
  assert.equal(safeText('Bearer xyz'), '[redacted]');
  assert.equal(safeText('x'.repeat(500)).length, 300);
  assert.equal(safeText(null), null);
});

test('publicWorker keeps only driver fields and drops secret-like error text', () => {
  const row = { worker_id: 'w1', version: 'v1', mode: 'active', status: 'waiting_gpu', current_ticket_id: null,
    last_seen_at: '123', gpu_busy_model: 'm', gpu_retry_at: '999', gpu_error: 'token leaked', extra: 'nope' };
  const out = publicWorker(row);
  assert.equal(out.gpu_error, '[redacted]');
  assert.equal(out.last_seen_at, 123);
  assert.equal(out.gpu_retry_at, 999);
  assert.equal(out.flags, null);
  assert.equal('extra' in out, false);
});

test('publicWorker(null) is null', () => {
  assert.equal(publicWorker(null), null);
});
