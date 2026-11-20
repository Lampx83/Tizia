import test from 'node:test';
import assert from 'node:assert/strict';
import { setup, text } from './support/ai-board-skills-fixture.js';
import { createHash } from 'node:crypto';
import { BUNDLE_FORMAT, BUNDLE_FORMAT_VERSION } from '../server/ai-board/services/skills-bundle.js';

const FLAG = 'AI_BOARD_PROMPT_LABELS';
const flag = on => { if (on) process['env'][FLAG] = '1'; else delete process['env'][FLAG]; };
const base = '/api/admin/ai-board/skills';

async function twoVersions(t) {
  const first = (await t.api(base, { name: 'frontend-example', task_types: ['frontend'], original_text: text() })).body;
  const id = first.skill.id;
  const v1 = first.version.id;
  const v2 = (await t.api(`${base}/${id}/versions/${v1}/edit`, { text: text('frontend-example', '1. Keep labels short.') })).body.version.id;
  const hashes = Object.fromEntries((await t.db.d.all('SELECT id,hash FROM ai_skill_versions WHERE skill_id=?', [id])).map(r => [r.id, r.hash]));
  const split = over => ({ false_block: 0.02, wrong_pass: 1, baseline_wrong_pass: 1, ...over });
  const receipt = (to, from, over = {}) => t.api(`${base}/${id}/labels/eval-receipts`,
    { name: 'skills/frontend-example', version_hash: hashes[to], baseline_hash: from ? hashes[from] : 'f'.repeat(64), tune: split(), confirm: split(), ...over });
  // flag-on tests pass receipts first so approval is never refused
  const approve = async (v, from = null) => { if (process['env'][FLAG]) await receipt(v, from); return t.api(`${base}/${id}/approve`, { version_id: v, confirmed: true }); };
  return { id, v1, v2, hashes, receipt, split, approve,
    stage: body => t.api(`${base}/${id}/labels/staging/set`, { confirmed: true, ...body }),
    back: () => t.api(`${base}/${id}/labels/staging/rollback`, { confirmed: true }),
    labels: () => t.api(`${base}/${id}/labels`) };
}

test('flag off: label routes 404 and approve writes no receipt', async () => {
  flag(false);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    assert.equal((await s.labels()).status, 404);
    assert.equal((await s.stage({ from: null, version_id: s.v2 })).status, 404);
    assert.equal((await s.approve(s.v1)).status, 200);
    assert.equal((await t.db.d.all('SELECT id FROM ai_skill_label_receipts')).length, 0);
  } finally { await t.close(); }
});

test('production approve and rollback write receipts', async () => {
  flag(true);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    await s.approve(s.v1); await s.approve(s.v2, s.v1);
    assert.equal((await t.api(`${base}/${s.id}/rollback`, { confirmed: true, version_id: s.v1, reason: 'bad v2' })).status, 200);
    const { labels, receipts } = (await s.labels()).body;
    assert.equal(labels.production, s.v1);
    assert.deepEqual(receipts.map(r => [r.label, r.kind, r.from_version_id, r.to_version_id]).reverse(),
      [['production', 'set', null, s.v1], ['production', 'set', s.v1, s.v2], ['production', 'rollback', s.v2, s.v1]]);
    assert.equal(receipts[0].reason, 'bad v2');
  } finally { flag(false); await t.close(); }
});

test('staging set needs the seen diff base, never reaches workers, and rolls back with a receipt', async () => {
  flag(true);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    await s.approve(s.v1);
    assert.equal((await s.stage({ from: s.v1, version_id: s.v2 })).status, 409);
    assert.equal((await s.stage({ version_id: s.v2 })).status, 400);
    assert.equal((await s.stage({ from: null, version_id: 999999 })).status, 404);
    assert.equal((await s.back()).status, 409);
    assert.equal((await s.stage({ from: null, version_id: s.v2 })).status, 200);
    assert.equal((await s.stage({ from: null, version_id: s.v1 })).status, 409);
    assert.equal((await s.stage({ from: s.v2, version_id: s.v1 })).status, 200);
    assert.equal((await s.labels()).body.labels.staging, s.v1);
    assert.equal((await s.back()).status, 200);
    const { labels, receipts } = (await s.labels()).body;
    assert.deepEqual([labels.staging, labels.production], [s.v2, s.v1]);
    assert.deepEqual(receipts.filter(r => r.label === 'staging').map(r => r.kind), ['rollback', 'set', 'set']);
    assert.equal((await t.active()).body.skills[0].version, 1);
    assert.equal((await t.api(`${base}/${s.id}/labels/staging/set`, { confirmed: true, from: null, version_id: s.v2 }, { 'x-user': '1' })).status, 403);
    assert.equal((await s.stage({ from: s.v2, version_id: s.v1, confirmed: false })).status, 400);
  } finally { flag(false); await t.close(); }
});

test('rejected version cannot take the staging label', async () => {
  flag(true);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    await s.approve(s.v1);
    assert.equal((await t.api(`${base}/${s.id}/versions/${s.v2}/reject`, { confirmed: true })).status, 200);
    assert.equal((await s.stage({ from: null, version_id: s.v2 })).status, 409);
  } finally { flag(false); await t.close(); }
});

test('production approve needs a passing eval receipt for the version and baseline; refusals are recorded', async () => {
  flag(true);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    const approve = v => t.api(`${base}/${s.id}/approve`, { version_id: v, confirmed: true });
    const none = await approve(s.v1);
    assert.deepEqual([none.status, none.body.error, none.body.message], [409, 'prompt_promotion_refused', 'no_eval_receipt']);
    assert.equal((await s.labels()).body.labels.production, null);
    assert.equal((await t.active()).body.skills.length, 0, 'refused skill never reaches workers');
    assert.equal((await s.receipt(s.v1, null, { name: 'skills/other' })).status, 400, 'name must match the skill');
    assert.equal((await s.receipt(s.v1, null, { tune: undefined })).status, 400);
    assert.equal((await s.receipt(s.v1, null, { version_hash: 'e'.repeat(64) })).status, 404);
    assert.equal((await s.receipt(s.v1, null, { confirm: s.split({ false_block: 0.06 }) })).body.passed, false);
    assert.match((await approve(s.v1)).body.message, /^confirm_false_block/);
    assert.equal((await s.receipt(s.v1)).body.passed, true);
    assert.equal((await approve(s.v1)).status, 200);
    const wrongBaseline = await approve(s.v2);
    assert.equal(wrongBaseline.body.message, 'no_eval_receipt', 'receipt must name the current production as baseline');
    assert.equal((await s.receipt(s.v2, s.v1, { tune: s.split({ wrong_pass: 2 }) })).body.passed, false);
    assert.equal((await approve(s.v2)).status, 409);
    assert.equal((await s.labels()).body.labels.production, s.v1, 'old label kept');
    assert.equal((await s.receipt(s.v2, s.v1)).body.passed, true);
    assert.equal((await approve(s.v2)).status, 200);
    const { eval_receipts, refusals } = (await s.labels()).body;
    assert.equal(eval_receipts.length >= 4, true);
    assert.equal(refusals.length, 4);
    assert.equal(refusals.every(r => r.name === 'skills/frontend-example' && r.reason), true);
    assert.equal((await t.api(`${base}/${s.id}/rollback`, { confirmed: true, version_id: s.v1 })).status, 200, 'restore needs no receipt');
    assert.equal((await t.api(`${base}/${s.id}/labels/eval-receipts`, {}, { 'x-user': '1' })).status, 403);
  } finally { flag(false); await t.close(); }
});

test('flag off: approve needs no receipt and eval-receipt route 404s', async () => {
  flag(false);
  const t = await setup();
  try {
    const s = await twoVersions(t);
    assert.equal((await s.receipt(s.v1)).status, 404);
    assert.equal((await t.api(`${base}/${s.id}/approve`, { version_id: s.v1, confirmed: true })).status, 200);
    assert.equal((await t.db.d.all('SELECT id FROM ai_prompt_label_refusals')).length, 0);
  } finally { await t.close(); }
});

test('bundle import under the flag leaves an unreceipted approved skill as draft', async () => {
  flag(true);
  const t = await setup();
  try {
    const body = text('imported-skill');
    const sha = x => createHash('sha256').update(x).digest('hex');
    const skills = [{ name: 'imported-skill', status: 'approved', task_types: ['frontend'], head_version: 1, versions: [{ version: 1, text: body, hash: sha(body) }] }];
    const bundle = { format: BUNDLE_FORMAT, format_version: BUNDLE_FORMAT_VERSION, skills, bundle_hash: sha(JSON.stringify(skills)) };
    const res = await t.api(`${base}/import`, { bundle });
    assert.equal(res.status, 200);
    assert.equal(res.body.results[0].outcome, 'imported');
    assert.equal(res.body.results[0].status, 'draft');
  } finally { flag(false); await t.close(); }
});
