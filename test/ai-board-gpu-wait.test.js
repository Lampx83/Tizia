// GPU busy (LF/100): the worker reports the wait without claiming, queued work shows it and retries by itself.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard } from './support/ai-board-parity.js';
import { newRequest } from './support/ai-board-scenarios.js';
import { requesterProgress } from '../server/ai-board/services/requester-progress.js';

test('a GPU wait is board state: queued work shows it, budget and ticket state stay untouched', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const a = await newRequest(store, { tag: 'gpu' });
    await d.run("UPDATE ai_tickets SET status='queued', phase='authorized' WHERE id=?", [a.root_ticket_id]);
    const before = await d.get('SELECT cumulative_budget, status, phase FROM ai_tickets WHERE id=?', [a.root_ticket_id]);
    const retryAt = Date.now() + 60_000;
    const waits = await store.recordGpuState('w-gpu', { model: 'qwen', error: 'resource limitations',
      retryAt, version: 'test', mode: 'active' });
    const status = await store.gpuStatus();
    const mine = await requesterProgress(store, a.request_id, 1, false);
    const other = await requesterProgress(store, a.request_id, 2, false);
    const trace = (await store.getRequestTrace(a.request_id)).root;
    const after = await d.get('SELECT cumulative_budget, status, phase FROM ai_tickets WHERE id=?', [a.root_ticket_id]);
    const cleared = await store.recordGpuState('w-gpu', { retryAt: null });
    return { before, after, waits, status, mine, other, trace, cleared, clearedStatus: await store.gpuStatus() };
  });

  assert.equal(out.waits.waiting, true);
  assert.equal(out.status.model, 'qwen');
  assert.equal(out.mine.gpu_waiting.retry_at, out.status.retry_at);
  assert.equal(out.other, null, 'another owner never sees the request');
  assert.equal(out.trace.gpu_waiting.model, 'qwen');
  assert.deepEqual(out.after, out.before, 'no claim, no retry and no budget while the GPU is busy');
  assert.equal(out.cleared.waiting, false);
  assert.equal(out.clearedStatus, null);
});

test('a worker that stopped reporting does not keep the queue marked as waiting', async () => {
  const { result } = await runBoard(async (store) => {
    await store.recordGpuState('w-stale', { model: 'qwen', retryAt: Date.now() + 60_000 });
    const fresh = await store.gpuStatus();
    const later = await store.gpuStatus(Date.now() + 3 * 60_000);
    return { fresh: fresh?.model, later };
  });
  assert.equal(result.fresh, 'qwen');
  assert.equal(result.later, null);
});
