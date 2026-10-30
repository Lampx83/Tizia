import test from 'node:test';
import assert from 'node:assert/strict';
import { setup, text, KEY } from './support/ai-board-skills-fixture.js';

const W = { 'x-ai-worker-key': KEY };
const base = '/api/admin/ai-board/skills';
const rewritten = (body = '1. Keep labels clear; name each label by its action.') => text('frontend-example', body);
const smoke = { method: 'toy_json_smoke', kinds: [{ kind: 'frontend', ok: true, tokens: 40 }], passed: 1, total: 1 };

async function uploaded(t) {
  const up = (await t.api(base, { name: 'frontend-example', task_types: ['frontend'], original_text: text() })).body;
  return { skill: up.skill, version: up.version };
}
const LEASE_SQL = 'UPDATE ai_tickets SET lease_owner=?,lease_token=?,lease_expires_at=? WHERE id=?';
async function idle(t) {
  const row = await t.db.d.get('SELECT lease_owner,lease_token,lease_expires_at FROM ai_tickets WHERE id=?', [t.ticket.id]);
  await t.db.d.run(LEASE_SQL, [null, null, null, t.ticket.id]);
  return () => t.db.d.run(LEASE_SQL, [row.lease_owner, row.lease_token, row.lease_expires_at, t.ticket.id]);
}
const claim = t => t.api('/api/ai-board/worker/skill-rewrite/claim', { worker_id: 'fixture-worker' }, W);
const report = (t, job, over = {}) => t.api('/api/ai-board/worker/skill-rewrite/report',
  { worker_id: 'fixture-worker', job_id: job.id, claim_token: job.claim_token, model: 'qwen-fixture',
    raw_response: JSON.stringify({ skill: rewritten() }), rewritten_text: rewritten(), evaluation: smoke,
    usage: { model_calls: 2, tokens: 900 }, ...over }, W);
const confirm = (t, { skill, version }) => t.api(`${base}/${skill.id}/versions/${version.id}/rewrite`, { confirmed: true });

test('upload never queues a rewrite; confirmation queues it; claim waits for idle worker and runs one job', async () => {
  const t = await setup();
  try {
    const item = await uploaded(t);
    assert.equal((await t.db.d.all('SELECT * FROM ai_skill_rewrites')).length, 0);
    assert.equal((await t.api(`${base}/${item.skill.id}/versions/${item.version.id}/rewrite`, {})).status, 400);
    assert.equal((await t.db.d.all('SELECT * FROM ai_skill_rewrites')).length, 0);
    assert.equal((await confirm(t, item)).status, 200);
    assert.equal((await confirm(t, item)).status, 409);
    assert.equal((await claim(t)).body.job, null);
    await idle(t);
    const job = (await claim(t)).body.job;
    assert.equal(job.original_text, text());
    assert.deepEqual(job.task_types, ['frontend']);
    assert.equal((await claim(t)).body.job, null);
    assert.equal((await claim(t)).status, 200);
    assert.equal((await t.api('/api/ai-board/worker/skill-rewrite/claim', {}, { 'x-ai-worker-key': 'wrong' })).status, 403);
  } finally { await t.close(); }
});

test('good rewrite becomes a new child version; source keeps its text; approval serves the child; no auto-activation', async () => {
  const t = await setup();
  try {
    const item = await uploaded(t);
    await confirm(t, item); const lease = await idle(t);
    const job = (await claim(t)).body.job;
    assert.equal((await report(t, job)).status, 200);
    await lease();
    const read = (await t.api(`${base}/${item.skill.id}`)).body;
    const source = read.versions.find(v => v.id === item.version.id);
    assert.equal(source.rewritten_text, null);
    assert.equal(source.text ?? source.original_text, text());
    assert.equal(source.rewrite.status, 'succeeded');
    assert.equal(source.rewrite.result_version_id !== null, true);
    const child = read.versions.find(v => v.id === source.rewrite.result_version_id);
    assert.equal(child.version, 2);
    assert.equal(child.parent_version_id, item.version.id);
    assert.equal(child.original_text, rewritten().replace(/^version: .*$/m, 'version: 2'));
    assert.equal(child.lint.ok, true);
    assert.deepEqual(child.evaluation.kinds[0].kind, 'frontend');
    assert.equal(read.skill.status, 'draft');
    assert.equal((await t.active()).body.skills.length, 0);
    assert.equal((await t.api(`${base}/${item.skill.id}/approve`, { version_id: child.id, confirmed: true })).status, 200);
    const served = (await t.active()).body.skills[0];
    assert.equal(served.text, child.original_text);
    assert.equal(served.hash, child.hash);
  } finally { await t.close(); }
});

test('rewrite that drops source essence fails the job with essence_lost and creates no version', async () => {
  const t = await setup();
  try {
    const item = await uploaded(t);
    await confirm(t, item); await idle(t);
    const job = (await claim(t)).body.job;
    assert.equal((await report(t, job, { rewritten_text: text('frontend-example', '1. Keep it simple.') })).status, 200);
    const row = await t.db.d.get('SELECT * FROM ai_skill_rewrites');
    assert.equal(row.status, 'failed');
    assert.match(row.error, /^essence_lost: .*labels/);
    assert.equal((await t.api(`${base}/${item.skill.id}`)).body.versions.length, 1);
  } finally { await t.close(); }
});

test('failed lint keeps raw response in a child version that blocks approval; reject is permanent; stale reports fail closed', async () => {
  const t = await setup();
  try {
    const item = await uploaded(t);
    await confirm(t, item); await idle(t);
    const job = (await claim(t)).body.job;
    assert.equal((await report(t, job, { claim_token: 'stale' })).status, 409);
    const bad = text('frontend-example', '1. Keep labels clear; name each label by its action.').replace('task_type: frontend', 'task_type: backend');
    assert.equal((await report(t, job, { rewritten_text: bad, raw_response: 'RAW-KEPT' })).status, 200);
    const row = await t.db.d.get('SELECT * FROM ai_skill_rewrites');
    assert.equal(row.raw_response, 'RAW-KEPT');
    const read = (await t.api(`${base}/${item.skill.id}`)).body;
    const child = read.versions.find(v => v.id === read.versions[0].id);
    assert.equal(child.lint.ok, false);
    assert.equal((await t.api(`${base}/${item.skill.id}/approve`, { version_id: child.id, confirmed: true })).status, 422);
    assert.equal((await report(t, job)).status, 409);
    assert.equal((await t.api(`${base}/${item.skill.id}/versions/${child.id}/reject`, { confirmed: true, reason: 'unsafe' })).status, 200);
    assert.equal((await t.api(`${base}/${item.skill.id}/approve`, { version_id: child.id, confirmed: true })).status, 409);
  } finally { await t.close(); }
  const u = await setup();
  try {
    const item = await uploaded(u);
    await confirm(u, item); await idle(u);
    const job = (await claim(u)).body.job;
    assert.equal((await report(u, job, { usage: { model_calls: 9, tokens: 10 } })).status, 200);
    const row = await u.db.d.get('SELECT * FROM ai_skill_rewrites');
    assert.equal(row.status, 'failed');
    assert.equal(row.error, 'usage_exceeds_bound');
    assert.equal((await u.api(`${base}/${item.skill.id}`)).body.versions[0].rewritten_text, null);
    assert.equal((await u.api(`${base}/${item.skill.id}`)).body.versions.length, 1);
  } finally { await u.close(); }
});

test('edit appends a linked version; rollback repoints only to a previously approved version', async () => {
  const t = await setup();
  try {
    const first = await uploaded(t);
    const approve = (id, vid) => t.api(`${base}/${id}/approve`, { version_id: vid, confirmed: true });
    assert.equal((await approve(first.skill.id, first.version.id)).status, 200);
    const edited = await t.api(`${base}/${first.skill.id}/versions/${first.version.id}/edit`, { text: text('frontend-example', '1. Keep labels short.') });
    assert.equal(edited.status, 200);
    assert.equal(edited.body.version.parent_version_id, first.version.id);
    assert.equal(edited.body.version.version, 2);
    const rb = body => t.api(`${base}/${first.skill.id}/rollback`, { confirmed: true, ...body });
    assert.equal((await rb({ version_id: edited.body.version.id })).status, 409);
    assert.equal((await approve(first.skill.id, edited.body.version.id)).status, 200);
    assert.equal((await t.active()).body.skills[0].version, 2);
    const back = await rb({ version_id: first.version.id });
    assert.equal(back.status, 200);
    assert.equal((await t.active()).body.skills[0].version, 1);
    assert.equal((await t.db.d.all('SELECT id FROM ai_skill_versions')).length, 2);
    assert.equal((await t.api(`${base}/${first.skill.id}/rollback`, { version_id: first.version.id })).status, 400);
  } finally { await t.close(); }
});

test('rewrite mutations recheck current admin and session', async () => {
  const t = await setup();
  try {
    const item = await uploaded(t);
    const calls = [
      [`${base}/${item.skill.id}/versions/${item.version.id}/rewrite`, { confirmed: true }],
      [`${base}/${item.skill.id}/versions/${item.version.id}/reject`, { confirmed: true }],
      [`${base}/${item.skill.id}/versions/${item.version.id}/edit`, { text: text() }],
      [`${base}/${item.skill.id}/rollback`, { confirmed: true, version_id: item.version.id }],
    ];
    await t.db.d.run("UPDATE users SET role='student' WHERE id=9");
    for (const [url, body] of calls) assert.equal((await t.api(url, body)).status, 403);
    await t.db.d.run("UPDATE users SET role='admin' WHERE id=9");
    await t.db.d.run('DELETE FROM sessions WHERE user_id=9');
    for (const [url, body] of calls) assert.equal((await t.api(url, body)).status, 401);
    assert.equal((await t.db.d.all('SELECT * FROM ai_skill_rewrites')).length, 0);
  } finally { await t.close(); }
});
