import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createSkillService } from '../server/ai-board/services/skills.js';
import { createSkillRepository } from '../server/ai-board/repositories/skills.js';

const draft = (name) => ({ name, task_types: ['test'], original_text: `---\nname: ${name}\ndescription: Kiểm thử\ntask_type: test\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Chạy kiểm thử.\n` });

test('signed admin identity (no session token, board has no sessions table) can upload a draft', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  const skills = createSkillService(createSkillRepository(db.d));
  const out = await skills.upload({ id: 9, role: 'admin' }, draft('signed-admin-draft'));
  assert.equal(out.skill.name, 'signed-admin-draft');
  assert.equal(out.version.version, 1);
});

test('signed non-admin identity is refused with 403 and writes nothing', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  const skills = createSkillService(createSkillRepository(db.d));
  await assert.rejects(skills.upload({ id: 1, role: 'student' }, draft('student-draft')), (e) => e.status === 403);
  assert.equal(await db.d.get('SELECT COUNT(*) AS n FROM ai_skills WHERE name=?', ['student-draft']).then(r => Number(r.n)), 0);
});

test('signed identity with a role missing or pupil is refused', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  const skills = createSkillService(createSkillRepository(db.d));
  await assert.rejects(skills.upload({ id: 9 }, draft('no-role-draft')), (e) => e.status === 403);
  await assert.rejects(skills.upload({ id: 9, role: 'pupil' }, draft('pupil-draft')), (e) => e.status === 403);
});
