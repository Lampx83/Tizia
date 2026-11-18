export const MAX_FALSE_BLOCK = 0.05;
const HASH = /^[0-9a-f]{64}$/;
const NAME = /^[A-Za-z0-9_./-]{1,80}$/;
const SPLITS = ['tune', 'confirm'];

const bad = () => Object.assign(new Error('eval_receipt_invalid'), { code: 'eval_receipt_invalid' });

/** Validate an eval result file and return it normalised; throw eval_receipt_invalid. */
export function parseEvalResult(raw) {
  const r = raw && typeof raw === 'object' ? raw : bad();
  if (!NAME.test(String(r.name)) || !HASH.test(String(r.version_hash)) || !HASH.test(String(r.baseline_hash))) throw bad();
  const out = { name: r.name, version_hash: r.version_hash, baseline_hash: r.baseline_hash };
  for (const split of SPLITS) {
    const s = r[split];
    if (!s || typeof s !== 'object' || !(s.false_block >= 0 && s.false_block <= 1)
      || !Number.isInteger(s.wrong_pass) || s.wrong_pass < 0 || !Number.isInteger(s.baseline_wrong_pass) || s.baseline_wrong_pass < 0) throw bad();
    out[split] = { false_block: s.false_block, wrong_pass: s.wrong_pass, baseline_wrong_pass: s.baseline_wrong_pass };
  }
  return out;
}

/** Pass needs, on both splits, false-block under 5% and wrong-pass not above baseline. */
export function judgeEval(result) {
  const reasons = [];
  for (const split of SPLITS) {
    const s = result[split];
    if (s.false_block >= MAX_FALSE_BLOCK) reasons.push(`${split}_false_block_${s.false_block}_not_below_${MAX_FALSE_BLOCK}`);
    if (s.wrong_pass > s.baseline_wrong_pass) reasons.push(`${split}_wrong_pass_${s.wrong_pass}_above_baseline_${s.baseline_wrong_pass}`);
  }
  return { passed: reasons.length === 0, reasons };
}
