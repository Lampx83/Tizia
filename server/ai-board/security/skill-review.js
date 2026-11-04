// Danger classifier for admin skill text. The deterministic lexicon (intake-guard.checkSkillText) stays the hard
// rule and runs first; the model can only add human_review to the draft, or refuse when a calibration sets
// reject_min. Fail-open: an unconfigured or failing model returns null, i.e. exactly the pre-classifier behaviour.
import { CLASSIFIER, classify, decideDanger, taskMode } from './classifier.js';
import { classifierConfigured, environment } from '../settings.js';

const STAGES = new Set(['upload', 'edit', 'instructions', 'rewrite_output']);
const REVIEW_TAG = 'guard:human_review';
const LABEL_MAX = 40;

const round = (value) => (Number.isFinite(value) ? Number(value.toFixed(4)) : null);

/** Danger verdict for one piece of admin skill text; null when off, unconfigured or on any model error. */
export async function reviewSkillText(text, { env = environment(), modes, fetchImpl, timeoutMs, configured = classifierConfigured } = {}) {
  const mode = taskMode('danger', modes);
  if (mode === 'off' || !configured(env)) return null;
  try {
    const result = await classify('danger', String(text ?? ''), { env, fetchImpl, timeoutMs });
    const decision = decideDanger(result.probs, CLASSIFIER.thresholds.danger, CLASSIFIER.tasks.danger.scoring);
    return {
      model: result.model ?? null,
      escalate: decision.escalate === true,
      reject: decision.reject === true,
      labels: (decision.labels || []).map((key) => String(key).slice(0, LABEL_MAX)),
      score: round(decision.score),
      coverage: result.coverage?.status ?? null,
      shadow: mode === 'shadow',
    };
  } catch (error) {
    console.warn('[ai-board] skill classifier unavailable:', error.message);
    return null;
  }
}

/** Compact evidence for eval_json: what the model said, what the skill path did with it, and the review tags. */
export function reviewEvidence(verdict, action = 'flagged') {
  if (!verdict) return null;
  return {
    model: verdict.model ?? null, escalate: verdict.escalate === true, reject: verdict.reject === true,
    labels: Array.isArray(verdict.labels) ? verdict.labels : [], score: verdict.score ?? null,
    shadow: verdict.shadow === true, action,
    tags: verdict.escalate && !verdict.shadow
      ? [REVIEW_TAG, ...(verdict.labels || []).map((key) => `guard:model_${key}`)] : [],
  };
}

/** Audit row for the admin alert list; never throws, so a broken audit cannot block or approve a skill write. */
export async function recordSkillFlag(db, { stage, verdict, action = 'flagged', skillId = null, versionId = null,
  skillName = null, adminId = null } = {}) {
  if (!db || !verdict) return;
  try {
    const now = Date.now();
    const detail = {
      gate: 'skill', stage: STAGES.has(stage) ? stage : 'upload', action,
      skill_id: skillId, version_id: versionId, skill_name: skillName, admin_id: adminId,
      labels: verdict.labels || [], score: verdict.score ?? null, model: verdict.model ?? null,
      shadow: verdict.shadow === true, tags: reviewEvidence(verdict, action)?.tags ?? [],
    };
    await db.run(`INSERT INTO ai_alerts(ticket_id, severity, category, status, public_message, internal_detail, created_at, updated_at)
      VALUES (NULL, ?, 'skill_flagged', 'open', ?, ?, ?, ?)`,
    [action === 'rejected' ? 'high' : 'medium', action === 'rejected'
      ? 'Nội dung skill bị từ chối trước khi lưu.'
      : 'Nội dung skill cần quản trị viên xem lại trước khi duyệt.',
    JSON.stringify(detail), now, now]);
  } catch (error) {
    console.warn('[ai-board] skill audit flag failed:', error.message);
  }
}
