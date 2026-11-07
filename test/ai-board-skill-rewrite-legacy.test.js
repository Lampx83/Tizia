import test from 'node:test';
import assert from 'node:assert/strict';
import { setup, text } from './support/ai-board-skills-fixture.js';
import { createSkillService } from '../server/ai-board/services/skills.js';
import { createSkillRepository } from '../server/ai-board/repositories/skills.js';

const ADMIN = { id: 9, role: 'admin' };
const LEGACY = '---\nname: frontend-example\ndescription: UI guidance\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Keep labels clear; name each label by its action.';

async function draftWithLegacyRewrite(t) {
  const up = (await t.api('/api/admin/ai-board/skills', { name: 'frontend-example', task_types: ['frontend'], original_text: text() })).body;
  await t.db.d.run('UPDATE ai_skill_versions SET rewritten_text=?,rewritten_hash=?,rewrite_lint_json=? WHERE id=?',
    [LEGACY, 'h', JSON.stringify({ ok: true, errors: [] }), up.version.id]);
  return up;
}

test('legacy rewrite becomes a child version with the next version number; source loses its rewritten text', async () => {
  const t = await setup();
  try {
    const up = await draftWithLegacyRewrite(t);
    const skills = createSkillService(createSkillRepository(t.db.d));
    const out = await skills.promoteLegacyRewrite(ADMIN, up.version.id);
    assert.equal(out.promoted, true);
    const read = await skills.read(up.skill.id);
    const child = read.versions.find(v => v.id === out.child_version_id);
    assert.equal(child.version, 2);
    assert.equal(child.parent_version_id, up.version.id);
    assert.equal(child.origin, 'rewrite');
    assert.match(child.original_text, /^version: 2$/m);
    assert.equal(read.versions.find(v => v.id === up.version.id).rewritten_text, null);
    assert.equal(read.skill.status, 'draft');
  } finally { await t.close(); }
});

test('approved or rejected source is skipped and nothing is created', async () => {
  const t = await setup();
  try {
    const up = await draftWithLegacyRewrite(t);
    await t.db.d.run('UPDATE ai_skill_versions SET approved_at=? WHERE id=?', [Date.now(), up.version.id]);
    const skills = createSkillService(createSkillRepository(t.db.d));
    assert.deepEqual(await skills.promoteLegacyRewrite(ADMIN, up.version.id), { promoted: false, reason: 'source_approved_or_rejected' });
    assert.equal((await skills.read(up.skill.id)).versions.length, 1);
  } finally { await t.close(); }
});

test('non-admin cannot promote', async () => {
  const t = await setup();
  try {
    const up = await draftWithLegacyRewrite(t);
    const skills = createSkillService(createSkillRepository(t.db.d));
    await assert.rejects(skills.promoteLegacyRewrite({ id: 1, role: 'pupil' }, up.version.id), (e) => e.status === 403);
  } finally { await t.close(); }
});
