import { createHash } from 'node:crypto';
import { WorkerContractError } from './store-contract.js';
import { parseEvalResult, judgeEval } from '../prompt-promotion.js';

const HASH = /^[0-9a-f]{64}$/;
const NAME = /^[A-Za-z0-9_.-]{1,80}$/;
const LABELS = ['production', 'staging'];
const MAX_CONTENT = 200_000;
const MAX_VERSIONS = 64;
const fail = (code, status = 409) => { throw new WorkerContractError(code, status, code); };
const sorted = (value) => value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, sorted(value[key])])) : value;
const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');

/** Same bytes as runtime.prompt_labels.fingerprint: sorted keys, compact separators, raw UTF-8. */
export const labelFingerprint = (table) => sha(JSON.stringify(sorted(table)));

export function createPromptLabelStore(db) {
  const table = async (q = db) => {
    const out = {};
    for (const row of await q.all('SELECT name,label,prompt_hash FROM ai_prompt_labels ORDER BY name,label')) {
      (out[row.name] ||= {})[row.label] = row.prompt_hash;
    }
    return out;
  };
  const checkTarget = (name, label) => {
    if (!NAME.test(String(name)) || !LABELS.includes(label)) fail('prompt_label_invalid', 400);
  };
  const change = async (name, label, to, adminId, kind, reason, expectedFrom) => {
    return db.tx(async (t) => {
      const current = (await t.get('SELECT prompt_hash FROM ai_prompt_labels WHERE name=? AND label=?' + t.lockRow, [name, label]))?.prompt_hash ?? null;
      if (expectedFrom !== undefined && expectedFrom !== current) fail('prompt_label_stale');
      if (!await t.get('SELECT 1 AS ok FROM ai_prompt_versions WHERE name=? AND prompt_hash=?', [name, to])) fail('prompt_version_unknown', 404);
      if (current === to) return { name, label, from: current, to, changed: false };
      const now = Date.now();
      if (current === null) {
        await t.run('INSERT INTO ai_prompt_labels(name,label,prompt_hash,updated_by,updated_at) VALUES (?,?,?,?,?)', [name, label, to, adminId, now]);
      } else {
        await t.run('UPDATE ai_prompt_labels SET prompt_hash=?, updated_by=?, updated_at=? WHERE name=? AND label=?', [to, adminId, now, name, label]);
      }
      await t.run('INSERT INTO ai_prompt_label_receipts(name,label,from_hash,to_hash,kind,actor,reason,created_at) VALUES (?,?,?,?,?,?,?,?)',
        [name, label, current, to, kind, adminId, String(reason ?? '').slice(0, 500), now]);
      return { name, label, from: current, to, changed: true };
    });
  };
  const requireReceipt = async (name, to, from, adminId) => {
    if (!await db.get('SELECT 1 AS ok FROM ai_prompt_versions WHERE name=? AND prompt_hash=?', [name, to])) fail('prompt_version_unknown', 404);
    const row = await db.get('SELECT passed,reasons FROM ai_prompt_eval_receipts WHERE name=? AND prompt_hash=?' + (from ? ' AND baseline_hash=?' : '') + ' ORDER BY id DESC LIMIT 1',
      from ? [name, to, from] : [name, to]);
    const reason = !row ? 'no_eval_receipt' : row.passed ? '' : row.reasons;
    if (!reason) return;
    await db.run('INSERT INTO ai_prompt_label_refusals(name,label,from_hash,to_hash,actor,reason,created_at) VALUES (?,?,?,?,?,?,?)',
      [name, 'production', from, to, Number(adminId), reason.slice(0, 500), Date.now()]);
    throw new WorkerContractError(reason, 409, 'prompt_promotion_refused');
  };
  return {
    table,
    /** Stores the eval verdict for (name, version, baseline); a failing result is kept as evidence. */
    async recordEval(result, adminId) {
      let r;
      try { r = parseEvalResult(result); } catch { fail('eval_receipt_invalid', 400); }
      if (!await db.get('SELECT 1 AS ok FROM ai_prompt_versions WHERE name=? AND prompt_hash=?', [r.name, r.version_hash])) fail('prompt_version_unknown', 404);
      const verdict = judgeEval(r);
      const id = await db.insert('INSERT INTO ai_prompt_eval_receipts(name,prompt_hash,baseline_hash,result_json,passed,reasons,recorded_by,created_at) VALUES (?,?,?,?,?,?,?,?)',
        [r.name, r.version_hash, r.baseline_hash, JSON.stringify(r), verdict.passed ? 1 : 0, verdict.reasons.join(','), Number(adminId), Date.now()]);
      return { id, ...verdict };
    },
    /** Worker with a live lease reports the versions on its disk; a (name,hash) pair is stored once and never rewritten. */
    async register(versions, reporter, now = Date.now()) {
      const entries = Object.entries(versions && typeof versions === 'object' ? versions : {});
      if (!entries.length || entries.length > MAX_VERSIONS) fail('prompt_versions_invalid', 400);
      for (const [name, v] of entries) {
        if (!NAME.test(name) || !HASH.test(String(v?.hash)) || typeof v.content !== 'string' || v.content.length > MAX_CONTENT
          || sha(v.content) !== v.hash) fail('prompt_versions_invalid', 400);
      }
      return db.tx(async (t) => {
        for (const [name, v] of entries) {
          if (!await t.get('SELECT 1 AS ok FROM ai_prompt_versions WHERE name=? AND prompt_hash=?', [name, v.hash])) {
            await t.run('INSERT INTO ai_prompt_versions(name,prompt_hash,content,reported_by,created_at) VALUES (?,?,?,?,?)',
              [name, v.hash, v.content, String(reporter).slice(0, 80), now]);
          }
        }
        return { labels: await table(t) };
      });
    },
    /** Inside the caller's transaction: the worker must hold the current label table. */
    async assertCurrent(t, fingerprint) {
      if (typeof fingerprint !== 'string' || !HASH.test(fingerprint)) fail('prompt_labels_required');
      if (fingerprint !== labelFingerprint(await table(t))) fail('prompt_labels_mismatch');
    },
    async list() {
      const versions = (await db.all('SELECT name,prompt_hash,reported_by,created_at FROM ai_prompt_versions ORDER BY name,created_at,prompt_hash'))
        .map((v) => ({ name: v.name, hash: v.prompt_hash, reported_by: v.reported_by, created_at: v.created_at }));
      const receipts = await db.all('SELECT name,label,from_hash,to_hash,kind,actor,reason,created_at FROM ai_prompt_label_receipts ORDER BY id DESC LIMIT 100');
      const evals = (await db.all('SELECT id,name,prompt_hash,baseline_hash,passed,reasons,created_at FROM ai_prompt_eval_receipts ORDER BY id DESC LIMIT 100'))
        .map((e) => ({ ...e, passed: e.passed === 1 }));
      const refusals = await db.all('SELECT name,label,from_hash,to_hash,reason,created_at FROM ai_prompt_label_refusals ORDER BY id DESC LIMIT 100');
      return { labels: await table(), versions, receipts, eval_receipts: evals, refusals };
    },
    async content(name, hash) {
      const row = await db.get('SELECT content FROM ai_prompt_versions WHERE name=? AND prompt_hash=?', [String(name), String(hash)]);
      if (!row) fail('prompt_version_unknown', 404);
      return { name, hash, content: row.content };
    },
    /** `from` is the hash the admin saw in the diff (null when unset); a moved label is refused, so approval is for that exact diff. */
    async setLabel(name, label, to, adminId, { from, reason } = {}) {
      checkTarget(name, label);
      if (!HASH.test(String(to)) || from === undefined || (from !== null && !HASH.test(String(from)))) fail('prompt_label_invalid', 400);
      if (label === 'production' && from !== to) await requireReceipt(name, to, from, adminId);
      return change(name, label, to, Number(adminId), 'set', reason, from);
    },
    /** Back to the hash the label held before its latest change; a second rollback undoes the first. */
    async rollback(name, label, adminId, { reason } = {}) {
      checkTarget(name, label);
      const last = await db.get('SELECT from_hash,to_hash FROM ai_prompt_label_receipts WHERE name=? AND label=? ORDER BY id DESC LIMIT 1', [name, label]);
      const current = (await db.get('SELECT prompt_hash FROM ai_prompt_labels WHERE name=? AND label=?', [name, label]))?.prompt_hash ?? null;
      if (!last || !last.from_hash || last.to_hash !== current) fail('prompt_label_no_previous');
      return change(name, label, last.from_hash, Number(adminId), 'rollback', reason, current);
    },
  };
}
