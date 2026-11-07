import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createSkillService, REWRITE_LIMITS } from '../server/ai-board/services/skills.js';
import { createSkillRepository } from '../server/ai-board/repositories/skills.js';

const ADMIN = { id: 9, role: 'admin' };
const ADMIN2 = { id: 10, role: 'admin' };
const draft = (name) => ({ name, task_types: ['test'], original_text: `---\nname: ${name}\ndescription: Kiểm thử\ntask_type: test\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Chạy kiểm thử.\n` });

async function fixture(names = ['rw-cycle']) {
  const db = await openBoard({ users: [[9, 'admin', 'Admin', 'admin', null], [10, 'admin2', 'Admin2', 'admin', null]] });
  const skills = createSkillService(createSkillRepository(db.d));
  const made = [];
  for (const name of names) made.push(await skills.upload(ADMIN, draft(name)));
  return { db, skills, made };
}
const finish = async (db, versionId, status) => {
  await db.d.run('UPDATE ai_skill_rewrites SET status=?,finished_at=? WHERE version_id=?', [status, Date.now(), versionId]);
  if (status === 'succeeded') await db.d.run("UPDATE ai_skill_versions SET rewritten_text=? WHERE id=?", ['rewritten body', versionId]);
};
const rewriteRow = (db, versionId) => db.d.get('SELECT * FROM ai_skill_rewrites WHERE version_id=?', [versionId]);

test('a job still queued or running refuses a new rewrite with 409 rewrite_in_progress', async () => {
  const { skills, made } = await fixture();
  const { skill, version } = made[0];
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
  await assert.rejects(skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true }),
    (e) => e.status === 409 && e.code === 'rewrite_in_progress');
});

test('after a succeeded job a new rewrite resets the same row and keeps the old outcome in history', async () => {
  const { db, skills, made } = await fixture();
  const { skill, version } = made[0];
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
  await finish(db, version.id, 'succeeded');
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true, instructions: 'Ghi chú mới.' });
  const row = await rewriteRow(db, version.id);
  assert.equal(row.status, 'queued');
  assert.equal(row.instructions, 'Ghi chú mới.');
  assert.equal(row.attempts, 1);
  assert.equal(row.finished_at, null);
  const history = JSON.parse(row.history_json);
  assert.equal(history.length, 1);
  assert.equal(history[0].status, 'succeeded');
});

test('after a failed job a new rewrite is accepted', async () => {
  const { db, skills, made } = await fixture();
  const { skill, version } = made[0];
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
  await finish(db, version.id, 'failed');
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
  assert.equal((await rewriteRow(db, version.id)).status, 'queued');
});

test('a version accepts at most 5 rewrite requests per rolling hour; the 6th returns 429 with retry_after_s', async () => {
  const { db, skills, made } = await fixture();
  const { skill, version } = made[0];
  for (let i = 0; i < REWRITE_LIMITS.per_version_hour; i += 1) {
    await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
    await finish(db, version.id, 'succeeded');
  }
  const err = await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true }).catch((e) => e);
  assert.equal(err.status, 429);
  assert.equal(err.code, 'rate_limited');
  assert.equal(err.scope, 'version');
  assert.ok(err.retry_after_s > 0 && err.retry_after_s <= 3600, String(err.retry_after_s));
});

test('an admin accepts at most 20 rewrite requests per rolling day; the 21st on a fresh version is refused by admin scope', async () => {
  const names = ['rw-a', 'rw-b', 'rw-c', 'rw-d', 'rw-e'];
  const { db, skills, made } = await fixture(names);
  for (const { skill, version } of made.slice(0, 4)) {
    for (let i = 0; i < REWRITE_LIMITS.per_version_hour; i += 1) {
      await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true });
      await finish(db, version.id, 'succeeded');
    }
  }
  const fifth = made[4];
  const err = await skills.requestRewrite(ADMIN, fifth.skill.id, fifth.version.id, { confirmed: true }).catch((e) => e);
  assert.equal(err.status, 429);
  assert.equal(err.code, 'rate_limited');
  assert.equal(err.scope, 'admin');
  const other = await skills.requestRewrite(ADMIN2, fifth.skill.id, fifth.version.id, { confirmed: true }).catch((e) => e);
  assert.notEqual(other.code, 'rate_limited');
});

test('version read payload carries rewrite instructions, finished_at and attempts', async () => {
  const { db, skills, made } = await fixture();
  const { skill, version } = made[0];
  await skills.requestRewrite(ADMIN, skill.id, version.id, { confirmed: true, instructions: 'Giữ nhãn nút.' });
  await finish(db, version.id, 'failed');
  const read = await skills.read(skill.id);
  const row = read.versions.find((v) => v.id === version.id);
  assert.equal(row.rewrite.instructions, 'Giữ nhãn nút.');
  assert.equal(row.rewrite.attempts, 0);
  assert.ok(row.rewrite.finished_at > 0);
});
