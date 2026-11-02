import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { LIMITS } from '../repositories/store-contract.js';

const round = (n, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

/** Distinct non-empty lines / non-empty lines; null when there is nothing to measure. */
export function distinctLineRatio(text) {
  const lines = String(text ?? '').split('\n').map(l => l.trim()).filter(Boolean);
  return lines.length ? round(new Set(lines).size / lines.length) : null;
}

/** zlib bytes / original bytes; null for empty text. */
export function compressionRatio(text) {
  const raw = Buffer.from(String(text ?? ''));
  return raw.length ? round(deflateSync(raw).length / raw.length) : null;
}

/** Shannon entropy (bits) of the last `window` node ids, normalised by log2(window); 1 = all different, 0 = one node repeated. */
export function topologyEntropy(nodes, window = LIMITS.behavior.topology_window) {
  const recent = nodes.slice(-window);
  if (recent.length < window) return null;
  const counts = new Map();
  for (const node of recent) counts.set(node, (counts.get(node) ?? 0) + 1);
  const bits = -[...counts.values()].reduce((sum, c) => sum + (c / recent.length) * Math.log2(c / recent.length), 0);
  return round(Math.abs(bits) / Math.log2(window));
}

/** Calls whose output length and hash equal the previous call's: the node ran and changed nothing. */
export function idleRuns(calls) {
  let idle = 0;
  let last = null;
  for (const c of calls) {
    const snapshot = `${c.output_len ?? ''}:${createHash('sha256').update(String(c.output ?? '')).digest('hex')}`;
    if (snapshot === last) idle += 1;
    last = snapshot;
  }
  return idle;
}

/** Behaviour metrics from model-call evidences (ordered by time): context growth, output repetition, node topology. */
export function behaviorMetrics(evidences, limits = LIMITS.behavior) {
  const calls = evidences.filter(Boolean);
  const tokens = calls.map(c => c.metrics?.tokens_in).filter(Number.isFinite);
  const last = tokens.at(-1) ?? null;
  const outputs = calls.filter(c => (c.output_len ?? 0) > 0 && c.output);
  const latest = outputs.at(-1)?.output ?? null;
  const lineRatio = latest == null ? null : distinctLineRatio(latest);
  const squeeze = latest != null && latest.length > limits.compression_min_chars ? compressionRatio(latest) : null;
  const entropy = topologyEntropy(calls.map(c => `${c.gate}:${c.child ?? ''}`), limits.topology_window);
  const idle = idleRuns(calls);
  return {
    context: { tokens_in: last, delta: tokens.length > 1 ? last - tokens.at(-2) : null, limit: limits.context_limit_tokens },
    output: { distinct_line_ratio: lineRatio, compression_ratio: squeeze,
      warn: (lineRatio != null && lineRatio < limits.distinct_line_warn) || (squeeze != null && squeeze < limits.compression_ratio_warn) },
    topology: { entropy, idle_runs: idle, warn: (entropy != null && entropy < limits.topology_entropy_warn) || idle > 0 },
  };
}
