import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { setup, text } from './support/ai-board-skills-fixture.js';
import { BUNDLE_FORMAT, BUNDLE_FORMAT_VERSION, contentHash, exportSkillBundle, validateBundle } from '../server/ai-board/services/skills-bundle.js';

const IMPORT = '/api/admin/ai-board/skills/import';
const exportFrom = t => exportSkillBundle(sql => t.db.d.all(sql, []));
const signed = skills => ({ format: BUNDLE_FORMAT, format_version: BUNDLE_FORMAT_VERSION, skills, bundle_hash: contentHash(JSON.stringify(skills)) });
async function seedApproved(t, name = 'frontend-example', body) {
  const up = (await t.api('/api/admin/ai-board/skills', { name, task_types: ['frontend'], original_text: text(name, body) })).body;
  await t.api(`/api/admin/ai-board/skills/${up.skill.id}/approve`, { version_id: up.version.id, confirmed: true });
  return up;
}

test('export keeps skill versions with hashes and drops rejected versions and user/derived fields', async () => {
  const t = await setup();
  try {
    const first = await seedApproved(t);
    const bad = (await t.api('/api/admin/ai-board/skills', { name: 'frontend-example', task_types: ['frontend'], original_text: 'Missing frontmatter' })).body;
    assert.equal((await t.api(`/api/admin/ai-board/skills/${first.skill.id}/versions/${bad.version.id}/reject`, { confirmed: true })).status, 200);
    const bundle = await exportFrom(t);
    assert.equal(validateBundle(bundle).ok, true);
    const [skill] = bundle.skills;
    assert.equal(skill.name, 'frontend-example');
    assert.equal(skill.status, 'approved');
    assert.equal(skill.head_version, 1);
    assert.deepEqual(skill.versions.map(v => v.version), [1]);
    assert.equal(skill.versions[0].text, text());
    assert.doesNotMatch(JSON.stringify(bundle), /created_by|lint_json|eval_json|proposal|claim_token|user|admin_id/);
  } finally { await t.close(); }
});

test('import recreates an approved skill in an empty board; a repeat is skipped', async () => {
  const src = await setup(), dst = await setup();
  try {
    await seedApproved(src);
    const bundle = await exportFrom(src);
    const first = await dst.api(IMPORT, { bundle });
    assert.equal(first.status, 200);
    assert.deepEqual(first.body.summary, { imported: 1, skipped: 0, conflict: 0, rejected: 0 });
    assert.equal(first.body.results[0].status, 'approved');
    const id = first.body.results[0].skill_id;
    const stored = (await dst.api(`/api/admin/ai-board/skills/${id}`)).body;
    assert.equal(stored.skill.status, 'approved');
    assert.equal(stored.versions[0].original_text, text());
    const again = await dst.api(IMPORT, { bundle });
    assert.deepEqual(again.body.summary, { imported: 0, skipped: 1, conflict: 0, rejected: 0 });
    assert.equal((await dst.api(`/api/admin/ai-board/skills/${id}`)).body.versions.length, 1);
  } finally { await src.close(); await dst.close(); }
});

test('same name with different content is a conflict; overwrite appends a version and approves it', async () => {
  const src = await setup(), dst = await setup();
  try {
    const bundle = await exportFrom(await seedSrc(src));
    const local = await seedApproved(dst, 'frontend-example', '1. Use short labels.');
    const id = local.skill.id;
    const kept = await dst.api(IMPORT, { bundle });
    assert.deepEqual(kept.body.summary, { imported: 0, skipped: 0, conflict: 1, rejected: 0 });
    assert.equal(kept.body.results[0].reason, 'name_exists_different_content');
    assert.equal((await dst.api(`/api/admin/ai-board/skills/${id}`)).body.versions.length, 1);
    const over = await dst.api(IMPORT, { bundle, overwrite: true });
    assert.equal(over.body.summary.imported, 1);
    const stored = (await dst.api(`/api/admin/ai-board/skills/${id}`)).body;
    assert.equal(stored.versions.length, 2);
    assert.equal(stored.skill.active_version_id, stored.versions[0].id);
    assert.equal(stored.versions[0].original_text, text('frontend-example', '1. Keep labels clear.'));
  } finally { await src.close(); await dst.close(); }
});

async function seedSrc(t) { await seedApproved(t, 'frontend-example', '1. Keep labels clear.'); return t; }

test('tampered bundle is refused; invalid skills are rejected one by one while valid ones still import', async () => {
  const src = await setup(), dst = await setup();
  try {
    await seedApproved(src);
    const bundle = await exportFrom(src);
    const tampered = structuredClone(bundle);
    tampered.skills[0].versions[0].text += 'x';
    const refused = await dst.api(IMPORT, { bundle: tampered });
    assert.equal(refused.status, 400);
    assert.equal(refused.body.error, 'invalid_bundle');
    const v = (name, body) => ({ name, task_types: ['frontend'], status: 'approved', head_version: 1, versions: [{ version: 1, text: body, hash: contentHash(body) }] });
    const mixed = signed([
      v('bad-lint', 'Missing frontmatter'),
      v('default-reserved', text('default-reserved')),
      { ...bundle.skills[0] },
    ]);
    const res = await dst.api(IMPORT, { bundle: mixed });
    assert.equal(res.status, 200);
    assert.deepEqual(res.body.summary, { imported: 1, skipped: 0, conflict: 0, rejected: 2 });
    assert.equal(res.body.results.find(r => r.name === 'bad-lint').reason, 'lint_failed');
    assert.equal(res.body.results.find(r => r.name === 'default-reserved').reason, 'invalid_skill');
    assert.equal(res.body.results.find(r => r.name === 'frontend-example').outcome, 'imported');
    assert.equal((await dst.api('/api/admin/ai-board/skills')).body.skills.filter(s => s.name === 'bad-lint').length, 0);
  } finally { await src.close(); await dst.close(); }
});

test('import needs an admin session and CSRF header', async () => {
  const src = await setup(), dst = await setup();
  try {
    await seedApproved(src);
    const bundle = await exportFrom(src);
    assert.equal((await dst.api(IMPORT, { bundle }, { 'x-user': '1' })).status, 403);
    assert.equal((await dst.api(IMPORT, { bundle }, { 'x-csrf-fixture': '' })).status, 403);
  } finally { await src.close(); await dst.close(); }
});

test('export CLI refuses to run without --out or AI_BOARD_DATABASE_URL and prints no URL', () => {
  const noOut = spawnSync(process.execPath, ['scripts/ai-board-skills-export.mjs'], { encoding: 'utf8', env: { ...process.env, AI_BOARD_DATABASE_URL: 'postgres://u:secret@127.0.0.1:1/x' } });
  assert.equal(noOut.status, 2);
  assert.match(noOut.stderr, /Usage/);
  const noUrl = spawnSync(process.execPath, ['scripts/ai-board-skills-export.mjs', '--out', 'x.json'], { encoding: 'utf8', env: { ...process.env, AI_BOARD_DATABASE_URL: '' } });
  assert.equal(noUrl.status, 2);
  assert.doesNotMatch(noUrl.stderr + noUrl.stdout, /secret/);
});
