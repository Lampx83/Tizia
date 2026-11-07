import { createHash } from 'node:crypto';

export const BUNDLE_FORMAT = 'tizia-ai-board-skills';
export const BUNDLE_FORMAT_VERSION = 1;
const sha = text => createHash('sha256').update(text).digest('hex');

export const servedText = version => version.rewritten_text ?? version.original_text;

/** Read-only snapshot of admin skills; `all(sql)` returns rows. Excludes rewrites, proposals, alerts, spans, users. */
export async function exportSkillBundle(all, { now = Date.now() } = {}) {
  const skills = await all('SELECT id,name,task_types_json,status,active_version_id FROM ai_skills ORDER BY name');
  const versions = await all('SELECT id,skill_id,version,origin,original_text,rewritten_text,approved_at FROM ai_skill_versions WHERE rejected_at IS NULL ORDER BY skill_id,version');
  const bySkill = new Map();
  for (const v of versions) bySkill.set(v.skill_id, [...(bySkill.get(v.skill_id) ?? []), v]);
  const out = skills.map(s => {
    const rows = bySkill.get(s.id) ?? [];
    const head = rows.find(v => v.id === s.active_version_id) ?? rows.at(-1);
    const items = rows.map(v => {
      const text = servedText(v);
      return { version: v.version, origin: v.origin ?? null, approved: v.approved_at != null, text, hash: sha(text) };
    });
    return { name: s.name, task_types: JSON.parse(s.task_types_json), status: s.status,
      head_version: head?.version ?? null, versions: items };
  });
  const bundle = { format: BUNDLE_FORMAT, format_version: BUNDLE_FORMAT_VERSION, exported_at: new Date(now).toISOString(), skills: out };
  bundle.bundle_hash = sha(JSON.stringify(out));
  return bundle;
}

/** Checks shape and recomputes every hash. Returns { ok, error }. */
export function validateBundle(bundle) {
  if (!bundle || typeof bundle !== 'object' || bundle.format !== BUNDLE_FORMAT || bundle.format_version !== BUNDLE_FORMAT_VERSION) return { ok: false, error: 'Unknown bundle format' };
  if (!Array.isArray(bundle.skills) || bundle.skills.length > 200) return { ok: false, error: 'Bundle needs 1-200 skills' };
  if (bundle.bundle_hash !== sha(JSON.stringify(bundle.skills))) return { ok: false, error: 'Bundle hash mismatch' };
  for (const skill of bundle.skills) {
    if (!Array.isArray(skill?.versions) || !Array.isArray(skill.task_types)) return { ok: false, error: 'Malformed skill entry' };
    for (const v of skill.versions) {
      if (typeof v?.text !== 'string' || v.hash !== sha(v.text)) return { ok: false, error: `Hash mismatch in ${skill.name} v${v?.version}` };
    }
  }
  return { ok: true, error: null };
}

export const contentHash = sha;
