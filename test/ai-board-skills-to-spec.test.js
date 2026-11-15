import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { openBoard } from './support/ai-board-db.js';
import { convertSkills, flatToSpec } from '../scripts/ai-board-skills-to-spec.mjs';
import { lintSkill, specErrors } from '../server/ai-board/services/skills.js';

const flat = (name, { description = 'Giữ nhãn nút rõ ràng. Use when a frontend step changes labels.', version = 1 } = {}) =>
  `---\nname: ${name}\n${description === null ? '' : `description: ${description}\n`}task_type: frontend\nsource: admin\nversion: ${version}\nmax_tokens: 1500\n---\n1. Keep labels clear.\n`;
const sha = text => createHash('sha256').update(text).digest('hex');

async function seed(db, name, text, { approved = false, rejected = false } = {}) {
  const { id: skillId } = await db.d.insert('INSERT INTO ai_skills(name,task_types_json,created_by,updated_by,created_at,updated_at) VALUES(?,?,?,?,?,?)',
    [name, '["frontend"]', 9, 9, 1, 1]).then(id => ({ id }));
  const versionId = await db.d.insert(`INSERT INTO ai_skill_versions(skill_id,version,task_types_json,original_text,hash,token_count,lint_json,created_by,created_at,approved_by,approved_at,rejected_by,rejected_at)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [skillId, 1, '["frontend"]', text, sha(text), 20, '{"ok":true}', 9, 1, approved ? 9 : null, approved ? 1 : null, rejected ? 9 : null, rejected ? 1 : null]);
  if (approved) await db.d.run("UPDATE ai_skills SET status='approved',active_version_id=? WHERE id=?", [versionId, skillId]);
  return { skillId, versionId };
}

test('flatToSpec: spec-valid output, keeps valid description, generates only when missing', () => {
  const kept = flatToSpec(flat('a-skill'), 3);
  assert.equal(kept.generated, false);
  assert.deepEqual(specErrors(kept.text, 'a-skill'), []);
  assert.match(kept.text, /version: "3"/);
  const made = flatToSpec(flat('b-skill', { description: null }), 2);
  assert.equal(made.generated, true);
  assert.deepEqual(specErrors(made.text, 'b-skill'), []);
  assert.match(made.text, /description: "Keep labels clear\. Use when a frontend step applies\."/);
  assert.equal(flatToSpec('no frontmatter', 1), null);
  assert.equal(lintSkill(kept.text, { name: 'a-skill' }).ok, true);
});

test('dry-run changes nothing; apply adds draft children once, never touches approved versions', async () => {
  const db = await openBoard({ users: [[9, 'admin', 'Admin', 'admin', null]] });
  const approved = await seed(db, 'legacy-ok', flat('legacy-ok'), { approved: true });
  await seed(db, 'legacy-nodesc', flat('legacy-nodesc', { description: null }));
  await seed(db, 'legacy-rejected', flat('legacy-rejected'), { rejected: true });
  await seed(db, 'already-spec', flatToSpec(flat('already-spec'), 1).text);
  const count = async () => Number((await db.d.get('SELECT COUNT(*) AS n FROM ai_skill_versions')).n);
  const before = await count();

  const dry = await convertSkills(db.d);
  assert.deepEqual(dry.map(r => [r.skill, r.action, r.description_generated]), [['legacy-nodesc', 'would_convert', true], ['legacy-ok', 'would_convert', false]]);
  assert.equal(await count(), before);

  const done = await convertSkills(db.d, { apply: true });
  assert.deepEqual(done.map(r => r.action), ['converted', 'converted']);
  assert.equal(await count(), before + 2);

  const parent = await db.d.get('SELECT * FROM ai_skill_versions WHERE id=?', [approved.versionId]);
  assert.equal(parent.original_text, flat('legacy-ok'));
  assert.ok(parent.approved_at);
  const child = await db.d.get('SELECT * FROM ai_skill_versions WHERE parent_version_id=?', [approved.versionId]);
  assert.equal(child.origin, 'spec-convert');
  assert.equal(child.approved_at, null);
  assert.deepEqual(specErrors(child.original_text, 'legacy-ok'), []);
  const review = await db.d.get("SELECT * FROM ai_skill_versions WHERE origin='spec-convert-review'");
  assert.equal(review.approved_at, null);
  assert.equal((await db.d.get('SELECT active_version_id FROM ai_skills WHERE id=?', [approved.skillId])).active_version_id, approved.versionId);

  assert.deepEqual(await convertSkills(db.d, { apply: true }), []);
  assert.equal(await count(), before + 2);
});
