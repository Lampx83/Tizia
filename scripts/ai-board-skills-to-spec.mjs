#!/usr/bin/env node
// One-shot: flat-frontmatter admin skill versions -> spec form, as NEW draft child versions via skills.edit().
// Usage: node scripts/ai-board-skills-to-spec.mjs [--apply]   (default dry-run; AI_BOARD_DATABASE_URL, never printed)
// Never mutates or approves an existing version; an admin approves each child. Re-run is a no-op (only leaves convert).
// Children whose description was generated carry origin 'spec-convert-review' and need admin review before approval.
import { pathToFileURL } from 'node:url';
import { createSkillService, specErrors, USE_WHEN } from '../server/ai-board/services/skills.js';
import { createSkillRepository } from '../server/ai-board/repositories/skills.js';

const KEY = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/;
const unquote = v => (v.length >= 2 && v[0] === '"' && v.at(-1) === '"' ? JSON.parse(v) : v);

/** Flat SKILL.md text -> { text, generated } in spec form; null when not flat or unparsable. */
export function flatToSpec(text, version) {
  if (typeof text !== 'string' || !text.startsWith('---\n') || text.includes('\r')) return null;
  const parts = text.split('---\n');
  if (parts.length < 3) return null;
  const flat = new Map();
  for (const line of parts[1].split('\n')) {
    if (!line.trim()) continue;
    const m = KEY.exec(line);
    if (!m || flat.has(m[1]) || m[1] === 'metadata') return null;
    try { flat.set(m[1], unquote(m[2].trim())); } catch { return null; }
  }
  if (!flat.has('name')) return null;
  const body = parts.slice(2).join('---\n');
  const types = String(flat.get('task_type') ?? '').replace(/^\[|\]$/g, '').split(',').map(t => t.trim()).filter(Boolean);
  let description = flat.get('description') ?? '';
  const generated = !(description.length <= 1024 && USE_WHEN.test(description));
  if (generated) {
    const what = (description || body.trim().split('\n')[0].replace(/^\s*\d+\.\s*/, '')).replace(/[.\s]+$/, '').slice(0, 100);
    description = `${what}. Use when a ${types.join(' or ') || 'matching'} step applies.`;
  }
  const name = flat.get('name');
  flat.delete('name'); flat.delete('description');
  if (version != null && flat.has('version')) flat.set('version', String(version));
  const meta = [...flat].map(([k, v]) => `  ${k}: ${JSON.stringify(String(v))}`).join('\n');
  return { generated, text: `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\nmetadata:\n${meta}\n---\n${body}` };
}

/** db: contract handle (.d). One report row per non-rejected leaf version that is not in spec form. */
export async function convertSkills(db, { apply = false, reviewText = async () => null } = {}) {
  const repo = createSkillRepository(db);
  const skills = createSkillService(repo, { reviewText });
  const rows = await db.all(`SELECT v.id, v.skill_id, v.version, v.original_text, v.rewritten_text, s.name, s.created_by FROM ai_skill_versions v
    JOIN ai_skills s ON s.id=v.skill_id WHERE v.rejected_at IS NULL
    AND NOT EXISTS (SELECT 1 FROM ai_skill_versions c WHERE c.parent_version_id=v.id) ORDER BY s.name, v.version`);
  const report = [];
  for (const row of rows) {
    const text = row.rewritten_text ?? row.original_text;
    if (!specErrors(text, row.name).length) continue;
    const next = Number((await repo.nextVersion(row.skill_id)).n);
    const out = flatToSpec(text, next);
    const entry = { skill: row.name, version_id: row.id, version: row.version };
    if (!out) { report.push({ ...entry, action: 'skipped', reason: 'not_flat' }); continue; }
    entry.description_generated = out.generated;
    if (!apply) { report.push({ ...entry, action: 'would_convert' }); continue; }
    try {
      const made = await skills.edit({ id: row.created_by, role: 'admin' }, row.skill_id, row.id, { text: out.text });
      await repo.markOrigin(made.version.id, out.generated ? 'spec-convert-review' : 'spec-convert');
      report.push({ ...entry, action: 'converted', child_version_id: made.version.id, child_version: made.version.version });
    } catch (error) {
      report.push({ ...entry, action: 'failed', reason: error.message });
    }
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const url = process.env.AI_BOARD_DATABASE_URL;
  if (!url) { console.error('AI_BOARD_DATABASE_URL is required'); process.exit(2); }
  const { createAppDb } = await import('../server/db-core.js');
  const handle = createAppDb({ url, existingSchema: true });
  const apply = process.argv.includes('--apply');
  try {
    const report = await convertSkills(handle.d, { apply });
    for (const r of report) console.log(JSON.stringify(r));
    const count = action => report.filter(r => r.action === action).length;
    console.log(`${apply ? 'APPLIED' : 'DRY-RUN'}: ${apply ? count('converted') : count('would_convert')} to convert, `
      + `${report.filter(r => r.description_generated).length} need description review, ${count('skipped')} skipped, ${count('failed')} failed`);
    process.exitCode = count('failed') ? 1 : 0;
  } finally {
    await handle.close();
  }
}
