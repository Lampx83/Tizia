import test from 'node:test';
import assert from 'node:assert/strict';
import { setup, text } from './support/ai-board-skills-fixture.js';

const FLAG = 'AI_BOARD_PROMPT_LABELS';
const flag = on => { if (on) process['env'][FLAG] = '1'; else delete process['env'][FLAG]; };
const base = '/api/admin/ai-board/skills';

async function twoVersions(t) {
  const first = (await t.api(base, { name: 'frontend-example', task_types: ['frontend'], original_text: text() })).body;
  const id = first.skill.id;
  const v1 = first.version.id;
  const v2 = (await t.api(`${base}/${id}/versions/${v1}/edit`, { text: text('frontend-example', '1. Keep labels short.') })).body.version.id;
  return { id, v1, v2, approve: v => t.api(`${base}/${id}/approve`, { version_id: v, confirmed: true }),
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
    await s.approve(s.v1); await s.approve(s.v2);
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
