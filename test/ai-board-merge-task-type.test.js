import test from 'node:test';
import assert from 'node:assert/strict';
import { SKILL_TASK_TYPES, isSkillTaskType } from '../server/ai-board/skill-task-types.js';
import { TASK_TYPES } from '../server/ai-board/services/skills.js';

const ORIGINAL = ['backend', 'frontend', 'database', 'review', 'test', 'all'];

test('merge joins the skill task types; original six unchanged', () => {
  assert.deepEqual(SKILL_TASK_TYPES, ['backend', 'frontend', 'database', 'review', 'test', 'merge', 'all']);
  assert.deepEqual(ORIGINAL.filter(t => SKILL_TASK_TYPES.includes(t)), ORIGINAL);
  assert.deepEqual(TASK_TYPES, SKILL_TASK_TYPES);
});

test('isSkillTaskType accepts merge and rejects unknown or empty values', () => {
  assert.equal(isSkillTaskType('merge'), true);
  for (const t of ['', 'Merge', 'resolve', null, undefined]) assert.equal(isSkillTaskType(t), false, String(t));
});
