// Feature folders (lifecycle, votes, approval, cycle, archive/reopen, caps), self requests and release flags on the async store.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard, failure } from './support/ai-board-parity.js';
import { backends } from './support/ai-board-db.js';
import { claimAndRun, newRequest, passing, planOf, step, submit, verdict } from './support/ai-board-scenarios.js';
import * as asyncReleases from '../server/ai-board/releases-async.js';

const DAY = 24 * 3600_000;

test('folder creation, caps, votes, approval, cycle, archive/reopen, brief', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const r = {};
    const a = await newRequest(store, { tag: 'a', type: 'feature', title: 'Thẻ ghi nhớ thuốc' });
    r.created = a;
    const b = await newRequest(store, { tag: 'b', folderId: a.folder_id, title: 'Thêm lật thẻ', detail: 'Chạm để lật' });
    r.joined = b.folder_id === a.folder_id;
    r.foreignFolder = await failure(() => newRequest(store, { tag: 'c', ownerUserId: 2, ownerDisplayName: 'Minh', folderId: a.folder_id }));
    r.missingFolder = await failure(() => newRequest(store, { tag: 'm', folderId: 999 }));
    r.mine = await store.listFolders(1, 'pharmacy');
    r.school = await store.listFolders(2, 'pharmacy');
    r.vote = await store.voteFolder(a.folder_id, 2);
    r.voteAgain = await store.voteFolder(a.folder_id, 2);
    r.ownVote = await failure(() => store.voteFolder(a.folder_id, 1));
    r.unvote = await store.unvoteFolder(a.folder_id, 2);
    r.unvoteMissing = await failure(() => store.unvoteFolder(404, 2));
    const c1 = await claimAndRun(store, 'w1');
    r.waiting = await submit(store, c1, planOf(), 'plan-fold-1');
    r.approve = await store.approveFolder(a.folder_id, 9);
    r.approveAgain = await store.approveFolder(a.folder_id, 9);
    r.approveMissing = await failure(() => store.approveFolder(404, 9));
    r.rootAfter = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [c1.id]);
    r.release = await d.get('SELECT status FROM ai_feature_releases WHERE folder_id = ?', [a.folder_id]);
    await d.run('UPDATE ai_tickets SET lease_expires_at = 1 WHERE id = ?', [c1.id]);
    const again = await claimAndRun(store, 'w1');
    r.resume = (await store.resumeAuthorizedPlan(again.id, { ...again.lease, runId: again.run.id })).status;
    r.verdict = (await verdict(store, again, passing(), 'verdict-fold-1')).outcome;
    r.snapshot = (await store.getLeasedSnapshot(again.id, 'w1', again.claim.lease_token)).folder;
    r.brief = await store.folderBrief(a.folder_id);
    r.adminFolders = await store.listAdminFolders();
    r.done = await store.markFolderDone(a.folder_id, 1);
    r.doneForeign = await failure(() => store.markFolderDone(a.folder_id, 2));
    r.releasedNoCycle = await failure(() => store.markFolderReleased(404));
    r.released = await store.markFolderReleased(a.folder_id);
    r.revoke = await store.revokeFolder(a.folder_id);
    r.revokeMissing = await failure(() => store.revokeFolder(404));
    r.reopenOpen = await store.reopenFolder(a.folder_id, 1);
    r.archive = await store.archiveFolder(a.folder_id, 1);
    r.archiveForeign = await failure(() => store.archiveFolder(a.folder_id, 2));
    r.reopen = await store.reopenFolder(a.folder_id, 1);
    for (const n of [1, 2]) r[`more${n}`] = (await newRequest(store, { tag: `f${n}`, type: 'feature', title: `Chức năng thứ ${n + 1}` })).folder_id;
    r.cap = await failure(() => newRequest(store, { tag: 'f9', type: 'feature', title: 'Chức năng vượt trần' }));
    r.stale = await store.archiveStaleFolders(Date.now() + 40 * DAY);
    r.afterStale = await store.listFolders(1, 'pharmacy');
    r.queue = await store.listAdminQueue();
    return r;
  });
  assert.equal(out.joined, true);
  assert.equal(out.foreignFolder.error, 'RequestValidationError', 'folder of another owner is hidden as not found');
  assert.equal(out.missingFolder.error, 'RequestValidationError');
  assert.equal(out.mine.mine.length, 1);
  assert.equal(out.school.school.length, 1, 'draft folders show in the school listing');
  assert.deepEqual([out.vote.votes, out.voteAgain.votes], [1, 1], 'repeat vote is not counted twice');
  assert.equal(out.ownVote.error, 'own_folder');
  assert.deepEqual([out.unvote.voted, out.unvote.votes], [false, 0]);
  assert.equal(out.unvoteMissing.error, 'folder_not_found');
  assert.equal(out.waiting.status, 'waiting_authorization', 'plan in unapproved folder waits for admin');
  assert.deepEqual([out.approve.ok, out.approve.authorized], [true, 1]);
  assert.deepEqual([out.approveAgain.ok, out.approveAgain.authorized], [true, 0], 'second approval authorizes nothing new');
  assert.equal(out.approveMissing.error, 'folder_not_found');
  assert.deepEqual(out.rootAfter, { status: 'queued', phase: 'authorized' });
  assert.equal(out.release.status, 'owner_only', 'approval registers the release flag');
  assert.equal(out.resume, 'planned');
  assert.equal(out.verdict, 'ready_for_pr');
  assert.equal(out.done.state, 'awaiting_merge');
  assert.equal(out.doneForeign.error, 'folder_not_found', 'other owner cannot mark done');
  assert.equal(out.releasedNoCycle.error, 'nothing_to_release');
  assert.deepEqual(out.released, { ok: true, state: 'released' });
  assert.equal(out.revoke.ok, true);
  assert.equal(out.revokeMissing.error, 'folder_not_found');
  assert.equal(out.reopenOpen.state, 'draft');
  assert.equal(out.archive.state, 'archived');
  assert.equal(out.archiveForeign.error, 'folder_not_found');
  assert.equal(out.reopen.state, 'draft');
  assert.deepEqual([out.more1, out.more2], [2, 3]);
  assert.equal(out.cap.error, 'RequestValidationError', 'fourth open feature is refused by the cap');
  assert.equal(out.stale, 3, 'all three open folders are stale after 40 days');
  assert.ok(out.afterStale.mine.every((f) => f.state === 'archived'));
  assert.equal(out.queue[0].phase, 'requester_cancelled', 'archiving stale folders cancels its root');

});

test('self requests are refused: the board cannot edit its own skills', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const r = {};
    const file = 'ai-board/harness/retrieval_weights.json';
    r.self = await failure(() => store.createSelfRequest({ title: 'Chỉnh trọng số truy hồi', detail: 'Đêm nay', targetFile: file, idempotencyKey: 'self-fold-1' }));
    r.outside = await failure(() => store.createSelfRequest({ title: 'Sửa lõi', detail: 'x', targetFile: 'server/db.js', idempotencyKey: 'self-fold-0' }));
    r.systemUser = await d.get(`SELECT username FROM users WHERE role = 'system'`);
    return r;
  });
  assert.equal(out.self.error, 'self_request_disabled');
  assert.equal(out.outside.error, 'self_request_disabled');
  assert.equal(out.systemUser ?? null, null, 'no system user is created for self requests');
});

test('release flags: registration keeps first approval, listing respects visibility, status validation', async () => {
  const seed = async (db) => {
    const now = 1_800_000_000_000;
    await db.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (1, 'lan', 'Lan', 'student', 'pharmacy')`);
    await db.run(`INSERT INTO users(id, username, display_name, role) VALUES (9, 'admin', 'Admin', 'admin')`);
    for (const [id, slug, domain] of [[1, 'the-ghi-nho', 'pharmacy'], [2, 'bai-tap', 'it']]) {
      await db.run(`INSERT INTO ai_feature_folders(id, slug, title, owner_user_id, domain, state, created_at, updated_at, last_activity_at)
        VALUES (?, ?, ?, 1, ?, 'active', ?, ?, ?)`, [id, slug, slug, domain, now, now, now]);
    }
  };
  const folders = [{ id: 1, slug: 'the-ghi-nho', owner_user_id: 1 }, { id: 2, slug: 'bai-tap', owner_user_id: 1 }];
  const viewers = [{ id: 1, role: 'student', enrolled_domain: 'pharmacy' }, { id: 5, role: 'student', enrolled_domain: 'pharmacy' },
    { id: 5, role: 'student', enrolled_domain: 'it' }, { id: 9, role: 'admin' }, null];
  const probe = async (r, db) => {
    const out = [];
    for (const f of folders) await r.registerRelease(db, f, 9, 1_800_000_000_100);
    await r.registerRelease(db, folders[0], 9, 1_800_000_000_999);
    out.push(await r.getRelease(db, 'the-ghi-nho'), await r.getRelease(db, 'zzz'));
    out.push(await r.setReleaseStatus(db, 'the-ghi-nho', 'school', 9, 1_800_000_001_000), await r.setReleaseStatus(db, 'nope', 'off', 9));
    out.push(await r.setReleaseStatus(db, 'bai-tap', 'off', 9, 1_800_000_002_000));
    for (const u of viewers) out.push((await r.listReleases(db, u, 'pharmacy')).map((x) => x.slug), (await r.listReleases(db, u, '')).map((x) => x.slug));
    out.push(await failure(() => r.setReleaseStatus(db, 'bai-tap', 'weird', 9)));
    return JSON.parse(JSON.stringify(out));
  };
  const d = await backends[0].open();
  try {
    await seed(d);
    const out = await probe(asyncReleases, d);
    assert.deepEqual(out.slice(0, 2), [{ slug: 'the-ghi-nho', status: 'owner_only', owner_user_id: 1, title: 'the-ghi-nho', domain: 'pharmacy' }, null]);
    assert.deepEqual(out.slice(2, 5), [true, false, true], 'unknown slug is refused');
    assert.deepEqual(out.slice(5, 7), [['the-ghi-nho'], ['the-ghi-nho']], 'school release visible to its pharmacy student');
    assert.deepEqual(out.slice(9, 11), [[], []], 'other-domain student sees nothing');
    assert.deepEqual(out.slice(11, 13), [['the-ghi-nho'], ['bai-tap', 'the-ghi-nho']], 'admin sees off-status flags too');
    assert.deepEqual(out.slice(13, 15), [[], []], 'anonymous sees nothing');
    assert.equal(out.at(-1).error, 'TypeError', 'unknown status is rejected');

  } finally { await d.dispose(); }
});
