// Async twins of the helper modules (drafts, eval tasks, self-improve, frozen benchmark, post-merge watch, transient retry,
// intake guard, classifier trace, screenshot retention) == their sync originals, final board state compared.
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assertParity, failure } from './support/ai-board-parity.js';
import {
  blocked, candidate, claimAndRun, gates, newRequest, planOf, submit, verdict,
} from './support/ai-board-scenarios.js';

const DAY = 24 * 3600_000;
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32, 7)]).toString('base64');

test('parity: eval tasks, drafts (shots, retry streak, handoff), request retry', async () => {
  await assertParity(async (store, d, { m, db }) => {
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
      out.streak = await m.failedRunStreak(db, c.id);
      out.state1 = await m.retryState(db, c.id, 'pre_pr_blocked');
      out.after1 = await m.afterVerdict(db, c.id, bad);
      out.afterMissing = await m.afterVerdict(db, 4242, bad);
      // eval tasks from the miss
      await m.recordMiss(db, c.run.id, 'verdict_blocked');
      await m.recordMiss(db, c.run.id, 'verdict_blocked');
      await m.recordRequestMiss(db, a.request_id, 'retry');
      out.badLabel = await failure(() => m.labelEvalTask(db, 1, { expected_files: ['../etc/passwd'] }));
      out.label = await m.labelEvalTask(db, 1, { expected_files: ['package.json'], must_contain: ['x'], must_not_contain: ['y'] });
      out.noTask = await failure(() => m.labelEvalTask(db, 99, { expected_files: ['package.json'] }));
      out.tasks = await m.listEvalTasks(db);
      out.badStatus = await failure(() => m.listEvalTasks(db, 'weird'));
      out.split = await m.evalTaskSplit(db);
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
      out.state2 = await m.retryState(db, c2.id, 'pre_pr_blocked');
      out.after2 = await m.afterVerdict(db, c2.id, bad);
      out.passingNotice = await m.afterVerdict(db, c2.id, { outcome: 'ready_for_pr' });
      out.deleted = await m.deleteEvalTask(db, 1);
      out.deletedAgain = await failure(() => m.deleteEvalTask(db, 1));
      out.counts = (await m.listEvalTasks(db, 'retired')).counts;
      // screenshots older than the retention window are removed from the thread
      const backend = m.createLocalBackend(dir);
      out.purgeOff = await m.purgeExpiredScreenshots(db, backend, { days: 0 });
      out.purge = await m.purgeExpiredScreenshots(db, backend, { days: 1, now: Date.now() + 3 * DAY });
      out.purgeAgain = await m.purgeExpiredScreenshots(db, backend, { days: 1, now: Date.now() + 3 * DAY });
      out.files = fs.readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.png')).length;
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
    return out;
  });
});

test('parity: transient retry switch, intake flags and rejections, classifier trace', async () => {
  await assertParity(async (store, d, { m, db }) => {
    const out = {};
    out.stateDefault = await m.transientRetryState(db);
    await newRequest(store, { tag: 't' });
    const c = await claimAndRun(store, 'w1');
    await submit(store, c, planOf(), 'plan-aux-t');
    await verdict(store, c, blocked(5, 'transient'), 'verdict-aux-t');
    out.blocked = await m.listTransientBlocked(db);
    out.notBlocked = await failure(() => m.retryTransientTicket(db, 999));
    out.retried = await m.retryTransientTicket(db, c.id);
    out.retriedAgain = await failure(() => m.retryTransientTicket(db, c.id));
    out.badSwitch = await failure(() => m.setTransientRetryEnabled(db, 'yes', 9));
    out.on = await m.setTransientRetryEnabled(db, true, 9);
    out.off = await m.setTransientRetryEnabled(db, false, null);
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
});

test('parity: self-improve night, frozen benchmark, PR state and post-merge watch for a merged self PR', async () => {
  const file = 'ai-board/harness/retrieval_weights.json';
  const sha = 'c'.repeat(40);
  await assertParity(async (store, d, { m, db }) => {
    const out = {};
    // 20 labelled tasks open the night; the switch is off until an admin turns it on
    for (let i = 1; i <= 20; i += 1) {
      await d.run(`INSERT INTO ai_eval_tasks(source, trigger, request_id, run_id, request_text, expected_files, status, created_at, labelled_at)
        VALUES ('miss', 'verdict_blocked', 1, ?, 'x', '["package.json"]', 'labelled', ?, ?)`, [i, Date.now() + i, Date.now() + 400 * DAY + i]); // labelled after the frozen window
    }
    out.listOff = await m.listNights(db);
    out.badNight = await failure(() => m.startNight(db, 'tonight'));
    out.disabled = await m.startNight(db, '2026-10-01');
    out.on = await m.setSelfImproveEnabled(db, true, 9);
    out.badSwitch = await failure(() => m.setSelfImproveEnabled(db, 'on', 9));
    out.start = await m.startNight(db, '2026-10-01');
    // the board's own request for one file wins its eval and is merged
    const self = await store.createSelfRequest({ title: 'Chỉnh trọng số truy hồi', detail: 'Đêm nay', targetFile: file, idempotencyKey: 'self-aux-1' });
    out.report = await m.reportNight(db, { night: '2026-10-01', variant: { request_id: self.request_id, status: 'waiting', cluster: { key: 'k1' } }, pr_sync: { open: 0 }, gpu_s_propose: 4.5 });
    out.noNight = await failure(() => m.reportNight(db, { night: '2020-01-01' }));
    const selfStep = { order: 1, title: 'Sửa trọng số', description: 'x', allowed_scope: [file], acceptance: ['y'], tests: ['t'], capability: 'self.config', risk: 'low', non_goals: ['z'] };
    const c = await claimAndRun(store, 'w-self');
    const planned = await submit(store, c, planOf({ domain: 'ai-board', allowed_scope: [file], capabilities: ['self.config'], steps: [selfStep] }), 'plan-aux-s');
    await store.authorizePlan(c.id, planned.plan_hash, 9);
    await d.run('UPDATE ai_tickets SET lease_expires_at = 1 WHERE id = ?', [c.id]);
    const again = await claimAndRun(store, 'w-self');
    await store.resumeAuthorizedPlan(again.id, { ...again.lease, runId: again.run.id });
    const evalGate = { gate: 5, blocked: false, reason: null, runner: 'eval',
      eval: { accepted: true, wins: 3, losses: 0, ties: 1, tasks: 4, gpu_s: 2.5, gold: true, dropped: [], base_sha: 'a'.repeat(40), variant_sha: sha } };
    const win = { outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 60, failure_class: null, repairs: [],
      candidate: { ...candidate(7), head_sha: sha, commits: [{ sha, title: 'self', files: [file] }] }, gates: [gates[3], gates[4], evalGate, gates[55]] };
    out.verdict = (await verdict(store, again, win, 'verdict-aux-s')).outcome;
    out.won = await m.recordSelfVerdict(db, again.id, win);
    out.wonAgain = await m.recordSelfVerdict(db, again.id, win);
    out.notSelf = await m.recordSelfVerdict(db, 4242, win);
    await store.recordPullRequest(again.id, { ...again.lease, runId: again.run.id, idempotencyKey: 'pr-aux-s',
      pullRequest: { number: 31, url: 'https://github.com/acme/tizia/pull/31', branch: win.candidate.branch, base: 'dev', head_sha: sha, base_sha: win.candidate.base_sha } });
    out.open = await m.openPullRequests(db);
    out.badReport = await failure(() => m.reportPullRequest(db, { number: 31, state: 'weird', closed_at: 1, files: [] }));
    out.noPr = await failure(() => m.reportPullRequest(db, { number: 99, state: 'merged', closed_at: 1, files: [] }));
    const mergedAt = Date.now();
    out.merged = await m.reportPullRequest(db, { number: 31, state: 'merged', closed_at: mergedAt, files: [file] });
    out.mergedAgain = await m.reportPullRequest(db, { number: 31, state: 'closed', closed_at: mergedAt + 5, files: [] });
    out.openAfter = await m.openPullRequests(db);
    // frozen benchmark: measure once per merged self PR
    out.pendingFrozen = await m.pendingFrozenMeasurements(db);
    out.badFrozen = await failure(() => m.recordFrozenMeasurement(db, { pr_number: 31, sha: 'nope' }));
    out.frozen = await m.recordFrozenMeasurement(db, { pr_number: 31, sha, config: { model: 'q' }, strata: { easy: 0.9, bad: 'x' }, gpu_s: 12 });
    out.frozenAgain = await m.recordFrozenMeasurement(db, { pr_number: 31, sha, strata: { easy: 0.1 } });
    out.scores = await m.listFrozenScores(db);
    out.pendingAfter = (await m.pendingFrozenMeasurements(db)).pending;
    // post-merge watch: window not over, then over but too few production runs -> waiting
    out.watchEarly = await m.pendingPostMergeWatch(db, mergedAt + DAY);
    out.watchDue = await m.pendingPostMergeWatch(db, mergedAt + 8 * DAY);
    out.watch = await m.checkPostMergeWatch(db, 31, store.createSelfRequest, mergedAt + 8 * DAY);
    out.watchMissing = await failure(() => m.checkPostMergeWatch(db, 77, store.createSelfRequest));
    out.watchList = await m.listPostMergeWatch(db);
    out.nights = await m.listNights(db);
    return out;
  });

});
