// policy.js builds the capability catalog and path rules from server/ai-board/capability-catalog.json, shared with harness gate 2.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const { CAPABILITY_POLICY, SELF_CAPABILITY, pathCapability } = await import('../server/ai-board/security/policy.js');
const catalog = JSON.parse(fs.readFileSync(new URL('../server/ai-board/capability-catalog.json', import.meta.url), 'utf8'));
const cases = JSON.parse(fs.readFileSync(new URL('./fixtures/ai-board-path-capability.json', import.meta.url), 'utf8'));

test('every static catalog entry reaches CAPABILITY_POLICY unchanged', () => {
  for (const [name, c] of Object.entries(catalog.capabilities)) {
    const policy = CAPABILITY_POLICY[name];
    assert.equal(policy.tier, c.tier, name);
    assert.deepEqual(policy.allow, c.allow, name);
    assert.equal(policy.rationale, c.rationale, name);
  }
  assert.deepEqual(CAPABILITY_POLICY[SELF_CAPABILITY].deny, catalog.self.deny);
});

test('pathCapability follows the shared fixture', () => {
  for (const { file, editable, capability } of cases) assert.equal(pathCapability(file, editable), capability, file);
});
