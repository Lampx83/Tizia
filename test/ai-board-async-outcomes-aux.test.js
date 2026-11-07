import { createTransientRetryRepository } from '../server/ai-board/repositories/transient-retry.js';
// Helper modules on the async board store: drafts, eval tasks, transient retry,
// intake guard, classifier trace, screenshot retention. Asserts business outcomes and persisted rows.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runBoard, failure } from './support/ai-board-parity.js';
import { createDraftRepository } from '../server/ai-board/repositories/drafts.js';
import { createEvalTaskRepository } from '../server/ai-board/repositories/eval-tasks.js';
import {
  blocked, candidate, claimAndRun, gates, newRequest, planOf, submit, verdict,
} from './support/ai-board-scenarios.js';

const DAY = 24 * 3600_000;
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32, 7)]).toString('base64');

test('eval tasks, drafts (shots, retry streak, handoff), request retry', async () => {
  const { result: out } = await runBoard(async (store, d, { m, db }) => {
    const out = {};
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aib-shots-'));
    try {
      const a = await newRequest(store, { tag: 'a' });
      const c = await claimAndRun(store, 'w1');
      await submit(store, c, planOf(), 'plan-aux-1');
      const bad = blocked(4, 'ordinary');
      await verdict(store, c, bad, 'verdict-aux-1');
      out.shots = await m.saveDraftScreenshots(store, c.id, { ...c.lease, runId: c.run.id, uploadsDir: dir,
        images: [{ png_base64: PNG, phase: 'before', width: 375, page: '/gioi-thieu.html' }, { png_base64: PNG, phase: 'after', focus: true, page: '/gioi-thieu.html' }] });
      out.shotsDup = await m.saveDraftScreenshots(store, c.id, { ...c.lease, runId: c.run.id, uploadsDir: dir, images: [{ png_base64: PNG }] });
      out.shotsBad = await failure(() => m.saveDraftScreenshots(store, c.id, { ...c.lease, runId: c.run.id + 99, uploadsDir: dir, images: [{ png_base64: 'xx' }] }));
      out.streak = await m.failedRunStreak(createDraftRepository(db), c.id);
      out.state1 = await m.retryState(createDraftRepository(db), c.id, 'pre_pr_blocked');
      out.after1 = await m.afterVerdict(createDraftRepository(db), c.id, bad);
      out.afterMissing = await m.afterVerdict(createDraftRepository(db), 4242, bad);
      // eval tasks from the miss
      await m.recordMiss(createEvalTaskRepository(db), c.run.id, 'verdict_blocked');
      await m.recordMiss(createEvalTaskRepository(db), c.run.id, 'verdict_blocked');
      await m.recordRequestMiss(createEvalTaskRepository(db), a.request_id, 'retry');
      out.badLabel = await failure(() => m.labelEvalTask(createEvalTaskRepository(db), 1, { expected_files: ['../etc/passwd'] }));
      out.label = await m.labelEvalTask(createEvalTaskRepository(db), 1, { expected_files: ['package.json'], must_contain: ['x'], must_not_contain: ['y'] });
      out.noTask = await failure(() => m.labelEvalTask(createEvalTaskRepository(db), 99, { expected_files: ['package.json'] }));
      out.tasks = await m.listEvalTasks(createEvalTaskRepository(db));
      out.badStatus = await failure(() => m.listEvalTasks(createEvalTaskRepository(db), 'weird'));
      out.split = await m.evalTaskSplit(createEvalTaskRepository(db));
      // requester retry after the lease is released
      out.busy = await failure(() => m.retryRequest(store, a.request_id, 1));
      await store.releaseLease(c.id, { ...c.lease, outcome: 'planned', idempotencyKey: 'rel-aux-1' });
      out.retryForeign = await failure(() => m.retryRequest(store, a.request_id, 2));
      out.retry = await m.retryRequest(store, a.request_id, 1);
      out.retryAgain = await failure(() => m.retryRequest(store, a.request_id, 1));
      // second failed run -> hand-off to the admin
      const c2 = await claimAndRun(store, 'w1');
      await submit(store, c2, planOf(), 'plan-aux-2');
      await verdict(store, c2, bad, 'verdict-aux-2');
      out.state2 = await m.retryState(createDraftRepository(db), c2.id, 'pre_pr_blocked');
      out.after2 = await m.afterVerdict(createDraftRepository(db), c2.id, bad);
      out.passingNotice = await m.afterVerdict(createDraftRepository(db), c2.id, { outcome: 'ready_for_pr' });
      out.deleted = await m.deleteEvalTask(createEvalTaskRepository(db), 1);
      out.deletedAgain = await failure(() => m.deleteEvalTask(createEvalTaskRepository(db), 1));
      out.counts = (await m.listEvalTasks(createEvalTaskRepository(db), 'retired')).counts;
      // screenshots older than the retention window are removed from the thread
      const backend = m.createLocalBackend(dir);
      out.purgeOff = await m.purgeExpiredScreenshots(db, backend, { days: 0 });
      out.purge = await m.purgeExpiredScreenshots(db, backend, { days: 1, now: Date.now() + 3 * DAY });
      out.purgeAgain = await m.purgeExpiredScreenshots(db, backend, { days: 1, now: Date.now() + 3 * DAY });
      out.files = fs.readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.png')).length;
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
    return out;
  });
  assert.equal(out.shots.stored, 2);
  assert.equal(out.shotsDup.duplicate, true, 'same screenshots are not stored twice');
  assert.equal(out.shotsBad.error, 'invalid_worker_operation', 'screenshots need the current run lease');
  assert.equal(out.streak, 1);
  assert.equal(out.state1, 'retry', 'first blocked run offers a retry');
  assert.equal(out.after1.kind, 'retry');
  assert.equal(out.afterMissing, null);
  assert.equal(out.badLabel.error, 'invalid_label', 'path traversal is rejected');
  assert.equal(out.label.status, 'labelled');
  assert.deepEqual(out.label.expected_files, ['package.json']);
  assert.equal(out.noTask.error, 'eval_task_not_found');
  assert.equal(out.badStatus.error, 'invalid_worker_operation');
  assert.equal(out.split.ready, false, 'below the minimum of labelled tasks no split is ready');
  assert.equal(out.busy.error, 'ticket_busy', 'retry refused while the root holds a lease');
  assert.equal(out.retryForeign.error, 'request_not_found');
  assert.deepEqual(out.retry, { status: 'queued', ok: true });
  assert.equal(out.retryAgain.error, 'not_retryable');
  assert.equal(out.state2, 'admin', 'second blocked run hands off to admin');
  assert.equal(out.after2.kind, 'handoff');
  assert.equal(out.passingNotice.kind, 'draft', 'passing verdict leaves the draft notice');
  assert.deepEqual(out.deleted, { ok: true });
  assert.equal(out.deletedAgain.error, 'eval_task_not_found');
  assert.equal(out.purgeOff, null, 'retention 0 disables purge');
  assert.deepEqual(out.purge, { messages: 1, files: 2 });
  assert.deepEqual(out.purgeAgain, { messages: 0, files: 0 }, 'purge is idempotent');
  assert.equal(out.files, 0);
});

test('transient retry switch, intake flags and rejections, classifier trace', async () => {
  const { result: out } = await runBoard(async (store, d, { m, db }) => {
    const out = {};
    out.stateDefault = await m.transientRetryState(createTransientRetryRepository(db));
    await newRequest(store, { tag: 't' });
    const c = await claimAndRun(store, 'w1');
    await submit(store, c, planOf(), 'plan-aux-t');
    await verdict(store, c, blocked(5, 'transient'), 'verdict-aux-t');
    out.blocked = await m.listTransientBlocked(createTransientRetryRepository(db));
    out.notBlocked = await failure(() => m.retryTransientTicket(createTransientRetryRepository(db), 999));
    out.retried = await m.retryTransientTicket(createTransientRetryRepository(db), c.id);
    out.retriedAgain = await failure(() => m.retryTransientTicket(createTransientRetryRepository(db), c.id));
    out.badSwitch = await failure(() => m.setTransientRetryEnabled(createTransientRetryRepository(db), 'yes', 9));
    out.on = await m.setTransientRetryEnabled(createTransientRetryRepository(db), true, 9);
    out.off = await m.setTransientRetryEnabled(createTransientRetryRepository(db), false, null);
    // intake guard writes
    const req = await newRequest(store, { tag: 'i', title: 'Yêu cầu đáng ngờ' });
    await m.recordIntakeRejection(db, 1, { message: 'Yêu cầu bị từ chối', labels: ['prompt_injection'] });
    await m.recordIntakeFlags(db, req.root_ticket_id, ['credential', 'money']);
    await m.recordIntakeFlags(db, req.root_ticket_id, ['credential', 'money']);
    await m.recordIntakeFlags(db, null, ['x']);
    await m.recordClassification(db, req.root_ticket_id, { clarity: { label: 'vague', probs: { vague: 0.8 } } });
    await m.recordClassification(db, req.root_ticket_id, { clarity: { label: 'clear' } });
    out.alerts = await d.all('SELECT severity, category, status FROM ai_alerts ORDER BY id');
    return out;
  });
  assert.deepEqual(out.stateDefault, { enabled: false, retry_after_ms: 300000 }, 'transient retry is off by default');
  assert.deepEqual(out.blocked.map((t) => t.source_request_id), [1], 'transient-blocked root is listed');
  assert.equal(out.notBlocked.error, 'ticket_not_found');
  assert.deepEqual([out.retried.status, out.retried.phase], ['queued', 'authorized']);
  assert.equal(out.retriedAgain.error, 'not_transient_blocked');
  assert.equal(out.badSwitch.error, 'invalid_worker_operation');
  assert.equal(out.on.enabled, true);
  assert.equal(out.off.enabled, false);
  assert.deepEqual(out.alerts, [{ severity: 'high', category: 'intake_rejected', status: 'open' }], 'repeated intake flags do not add alerts');
});

