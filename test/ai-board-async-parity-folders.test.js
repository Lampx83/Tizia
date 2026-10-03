// Async store == sync store: feature folders (lifecycle, votes, brief, approval), release flags and self requests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { assertParity, failure } from './support/ai-board-parity.js';
import { backends } from './support/ai-board-db.js';
import { claimAndRun, newRequest, passing, planOf, step, submit, verdict } from './support/ai-board-scenarios.js';
import * as syncReleases from '../server/ai-board/releases.js';
import * as asyncReleases from '../server/ai-board/releases-async.js';

const DAY = 24 * 3600_000;

test('parity: folder creation, caps, votes, approval, cycle, archive/reopen, brief', async () => {
  const expected = await assertParity(async (store, d) => {
    const out = {};
    const a = await newRequest(store, { tag: 'a', type: 'feature', title: 'Thẻ ghi nhớ thuốc' });
    out.created = a;
    const b = await newRequest(store, { tag: 'b', folderId: a.folder_id, title: 'Thêm lật thẻ', detail: 'Chạm để lật' });
    out.joined = b.folder_id === a.folder_id;
    out.foreignFolder = await failure(() => newRequest(store, { tag: 'c', ownerUserId: 2, ownerDisplayName: 'Minh', folderId: a.folder_id }));
    out.missingFolder = await failure(() => newRequest(store, { tag: 'm', folderId: 999 }));
    out.mine = await store.listFolders(1, 'pharmacy');
    out.school = await store.listFolders(2, 'pharmacy');
    out.vote = await store.voteFolder(a.folder_id, 2);
    out.voteAgain = await store.voteFolder(a.folder_id, 2);
    out.ownVote = await failure(() => store.voteFolder(a.folder_id, 1));
    out.unvote = await store.unvoteFolder(a.folder_id, 2);
    out.unvoteMissing = await failure(() => store.unvoteFolder(404, 2));
    // plans in an unapproved folder wait for the admin; approving authorises them and registers the release flag
    const c1 = await claimAndRun(store, 'w1');
    out.waiting = await submit(store, c1, planOf(), 'plan-fold-1');
    out.approve = await store.approveFolder(a.folder_id, 9);
    out.approveAgain = await store.approveFolder(a.folder_id, 9);
    out.approveMissing = await failure(() => store.approveFolder(404, 9));
    out.rootAfter = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [c1.id]);
    out.release = await d.get('SELECT slug, status FROM ai_feature_releases WHERE folder_id = ?', [a.folder_id]);
    // the authorised plan executes on a later lease; a passing verdict advances the folder branch
    await d.run('UPDATE ai_tickets SET lease_expires_at = 1 WHERE id = ?', [c1.id]);
    const again = await claimAndRun(store, 'w1');
    out.resume = (await store.resumeAuthorizedPlan(again.id, { ...again.lease, runId: again.run.id })).status;
    out.verdict = (await verdict(store, again, passing(), 'verdict-fold-1')).outcome;
    out.snapshot = (await store.getLeasedSnapshot(again.id, 'w1', again.claim.lease_token)).folder;
    out.brief = await store.folderBrief(a.folder_id);
    out.adminFolders = await store.listAdminFolders();
    out.done = await store.markFolderDone(a.folder_id, 1);
    out.doneForeign = await failure(() => store.markFolderDone(a.folder_id, 2));
    out.releasedNoCycle = await failure(() => store.markFolderReleased(404));
    out.released = await store.markFolderReleased(a.folder_id);
    out.revoke = await store.revokeFolder(a.folder_id);
    out.revokeMissing = await failure(() => store.revokeFolder(404));
    out.reopenOpen = await store.reopenFolder(a.folder_id, 1);
    out.archive = await store.archiveFolder(a.folder_id, 1);
    out.archiveForeign = await failure(() => store.archiveFolder(a.folder_id, 2));
    out.reopen = await store.reopenFolder(a.folder_id, 1);
    // open-folder cap per user (3): the fourth feature request is refused
    for (const n of [1, 2]) out[`more${n}`] = (await newRequest(store, { tag: `f${n}`, type: 'feature', title: `Chức năng thứ ${n + 1}` })).folder_id;
    out.cap = await failure(() => newRequest(store, { tag: 'f9', type: 'feature', title: 'Chức năng vượt trần' }));
    out.stale = await store.archiveStaleFolders(Date.now() + 40 * DAY);
    out.afterStale = await store.listFolders(1, 'pharmacy');
    out.queue = await store.listAdminQueue();
    return out;
  });
  assert.equal(expected.result.joined, true);
  assert.equal(expected.result.approve.ok, true);
});

test('parity: self requests (board edits its own skills)', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    out.outside = await failure(() => store.createSelfRequest({ title: 'Sửa lõi', detail: 'x', targetFile: 'server/db.js', idempotencyKey: 'self-fold-0' }));
    const file = 'ai-board/harness/retrieval_weights.json';
    out.self = await store.createSelfRequest({ title: 'Chỉnh trọng số truy hồi', detail: 'Đêm nay', targetFile: file, idempotencyKey: 'self-fold-1' });
    out.selfAgain = await store.createSelfRequest({ title: 'Chỉnh trọng số truy hồi', detail: 'Đêm nay', targetFile: file, idempotencyKey: 'self-fold-1' });
    out.systemUser = await d.get(`SELECT username, role FROM users WHERE role = 'system'`);
    const c = await claimAndRun(store, 'w-self');
    const selfStep = step({ allowed_scope: [file], capability: 'self.config', risk: 'low' });
    out.planWrongFile = await failure(() => submit(store, c, planOf({ domain: 'ai-board', allowed_scope: ['ai-board/harness/other.json'], capabilities: ['self.config'], steps: [{ ...selfStep, allowed_scope: ['ai-board/harness/other.json'] }] }), 'plan-self-0'));
    out.plan = await submit(store, c, planOf({ domain: 'ai-board', allowed_scope: [file], capabilities: ['self.config'], steps: [selfStep] }), 'plan-self-1');
    out.queue = await store.listAdminQueue();
    return out;
  });
});

test('release flags: async module behaves like the sync module on every backend', async () => {
  const seed = async (db) => {
    const now = 1_800_000_000_000;
    await db.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (1, 'lan', 'Lan', 'student', 'pharmacy')`);
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
    await r.registerRelease(db, folders[0], 9, 1_800_000_000_999); // second approval must not reset the row
    out.push(await r.getRelease(db, 'the-ghi-nho'), await r.getRelease(db, 'zzz'));
    out.push(await r.setReleaseStatus(db, 'the-ghi-nho', 'school', 9, 1_800_000_001_000), await r.setReleaseStatus(db, 'nope', 'off', 9));
    out.push(await r.setReleaseStatus(db, 'bai-tap', 'off', 9, 1_800_000_002_000));
    for (const u of viewers) out.push((await r.listReleases(db, u, 'pharmacy')).map((x) => x.slug), (await r.listReleases(db, u, '')).map((x) => x.slug));
    out.push(await failure(() => r.setReleaseStatus(db, 'bai-tap', 'weird', 9)));
    return JSON.parse(JSON.stringify(out));
  };
  // The sync module takes a better-sqlite3 handle; the async one takes the contract.
  const ref = await backends[0].open();
  await seed(ref);
  const syncDb = new Proxy(ref.raw, {});
  const expected = await probe(syncReleases, syncDb);
  await ref.dispose();
  for (const backend of backends) {
    const d = await backend.open();
    try {
      await seed(d);
      assert.deepEqual(await probe(asyncReleases, d), expected, `${backend.name} release flags`);
    } finally { await d.dispose(); }
  }
});
