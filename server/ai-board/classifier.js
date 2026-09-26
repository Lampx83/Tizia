// Logprob classifier (ticket 04): one token from AI_BOARD_CLASSIFIER_MODEL, softmax over the task's letters
// only. Same labels, prompt and thresholds as ai-board/harness/classifier.py (classifier-calibration.json).
// Clarity decides whether the FAB clarifies the request first; danger may only ADD human review, never block —
// the deterministic intake-guard stays the only thing that returns 422.
import fs from 'node:fs';

export const CLASSIFIER = JSON.parse(fs.readFileSync(new URL('./classifier-calibration.json', import.meta.url), 'utf8'));
const MAX_TEXT = 2000;
const TIMEOUT_MS = 10_000;

/** Prompt for one task; the student's text is fenced and cannot close the fence. */
export function buildPrompt(task, text) {
  const spec = CLASSIFIER.tasks[task];
  const fenced = String(text ?? '').replace(/<{3,}|>{3,}/g, '').slice(0, MAX_TEXT);
  return CLASSIFIER.prompt
    .replace('{question}', spec.question)
    .replace('{options}', spec.labels.map((l) => `${l.letter}. ${l.text}`).join('\n'))
    .replace('{text}', () => fenced);
}

/** {key: p} from an Ollama body with logprobs. Tokens outside the letters are ignored; throws when none match. */
export function labelProbs(body, task, temperature = CLASSIFIER.temperature) {
  const first = body?.logprobs?.[0];
  const top = first?.top_logprobs?.length ? first.top_logprobs : first ? [first] : [];
  const byLetter = new Map();
  for (const { token, logprob } of top) {
    const letter = String(token ?? '').trim().replace(/[.):]$/, '');
    if (/^[A-Z]$/.test(letter) && !byLetter.has(letter) && Number.isFinite(logprob)) byLetter.set(letter, logprob);
  }
  const labels = CLASSIFIER.tasks[task].labels;
  const seen = labels.filter((l) => byLetter.has(l.letter));
  if (!seen.length) throw new Error('classifier: no label logprobs in the response');
  const scaled = seen.map((l) => byLetter.get(l.letter) / temperature);
  const max = Math.max(...scaled);
  const total = scaled.reduce((sum, v) => sum + Math.exp(v - max), 0);
  const probs = Object.fromEntries(labels.map((l) => [l.key, 0]));
  seen.forEach((l, i) => { probs[l.key] = Math.exp(scaled[i] - max) / total; });
  return probs;
}

/** needed: clarify before the worker sees it; mode 'split' = too broad, clarify towards smaller requests. */
export function decideClarity(probs, t = CLASSIFIER.thresholds.clarity) {
  if ((probs.too_broad ?? 0) >= t.split_min) return { needed: true, mode: 'split' };
  if ((probs.clear ?? 0) < t.clear_min) return { needed: true, mode: 'ask' };
  return { needed: false, mode: null };
}

/** escalate → human review (never a block). logged = every unsafe label worth keeping for ticket 01. */
export function decideDanger(probs, t = CLASSIFIER.thresholds.danger) {
  const unsafe = Object.entries(probs).filter(([key]) => key !== 'safe');
  const labels = unsafe.filter(([, p]) => p >= t.escalate_min).map(([key]) => key);
  const logged = unsafe.filter(([, p]) => p >= t.log_min).map(([key, p]) => ({ key, p }));
  return { escalate: labels.length > 0, labels, logged };
}

/** One classification call. Throws on config/HTTP/logprob problems; callers fall back to the old behaviour. */
export async function classify(task, text, { env = process.env, fetchImpl = fetch, timeoutMs = TIMEOUT_MS } = {}) {
  const url = String(env.OLLAMA_URL || '').replace(/\/+$/, '');
  const model = String(env.AI_BOARD_CLASSIFIER_MODEL || '').trim();
  if (!url || !model) throw new Error('classifier: OLLAMA_URL or AI_BOARD_CLASSIFIER_MODEL not set');
  const headers = { 'Content-Type': 'application/json' };
  if (env.OLLAMA_SECKEY) headers['x-ollama-seckey'] = env.OLLAMA_SECKEY;
  const res = await fetchImpl(`${url}/api/generate`, {
    method: 'POST', headers, signal: AbortSignal.timeout(timeoutMs),
    body: JSON.stringify({
      model, prompt: buildPrompt(task, text), stream: false, think: false, logprobs: true, top_logprobs: 20,
      options: { num_predict: 1, temperature: 0, num_ctx: 4096 },
    }),
  });
  if (!res.ok) throw new Error(`classifier: Ollama HTTP ${res.status}`);
  return { model, probs: labelProbs(await res.json(), task) };
}

/** Per-task mode (ticket 08): active acts, shadow is logged only (shadow: true), off skips the call. */
export const taskMode = (task, modes) => modes?.[task] ?? CLASSIFIER.tasks[task].mode ?? 'active';

/** Both tasks for a new request. A side is null when off or its call failed (old behaviour for that side). */
export async function classifyRequest(title, detail, { modes, ...options } = {}) {
  const text = `${title ?? ''}\n${detail ?? ''}`;
  const run = (task) => (taskMode(task, modes) === 'off' ? Promise.resolve(null) : classify(task, text, options));
  const [clarity, danger] = await Promise.allSettled([run('clarity'), run('danger')]);
  const model = clarity.value?.model || danger.value?.model || null;
  if (!model) return null;
  const shadow = (task) => taskMode(task, modes) === 'shadow';
  return {
    model,
    clarity: clarity.value ? { probs: clarity.value.probs, ...decideClarity(clarity.value.probs), shadow: shadow('clarity') } : null,
    danger: danger.value ? { probs: danger.value.probs, ...decideDanger(danger.value.probs), shadow: shadow('danger') } : null,
  };
}

/** Trace for the admin view and ticket 01: model, probabilities, decisions. Never throws. */
export function recordClassification(db, rootTicketId, result) {
  if (!db || !rootTicketId || !result) return;
  try {
    db.prepare(`
      INSERT OR IGNORE INTO ai_events (
        ticket_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at
      ) VALUES (?, 'request_classified', 'system', 'classifier', NULL, NULL, ?, ?, ?)
    `).run(rootTicketId, JSON.stringify(result), `classifier:${rootTicketId}`, Date.now());
  } catch (error) {
    console.warn('[ai-board] classification trace failed:', error.message);
  }
}
