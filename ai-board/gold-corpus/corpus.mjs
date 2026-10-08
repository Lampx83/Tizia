/** Offline development corpus; no models or private held-out readers. */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
export const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fail = message => { throw new Error(message); };
const text = value => typeof value === 'string' && value.trim().length > 0;
const names = value => Object.entries(value).map(([name]) => name);
const AXES = { permission: ['allowed', 'denied', 'unknown'], content: ['benign', 'harmful', 'unknown'] };
const ROLES = ['project-owner', 'coding-agent'];
export function caseDigest(row) {
  return digest({ id: row.id, group: row.group, request: row.request, authority: row.authority });
}
export function validate(corpus) {
  if (corpus.schema !== 1 || !text(corpus.version) || !Array.isArray(corpus.cases) || !corpus.cases.length) fail('Invalid corpus');
  const ids = new Set(), groups = new Map(), contents = new Map();
  for (const row of corpus.cases) {
    if (!text(row.id) || ids.has(row.id)) fail('Duplicate/missing case ID');
    ids.add(row.id);
    if (!text(row.group) || !['fit', 'tune'].includes(row.split)) fail('Only fit/tune cases may be opened by development tooling');
    if (groups.has(row.group) && groups.get(row.group) !== row.split) fail('Request family spans splits');
    groups.set(row.group, row.split);
    if (!text(row.request) || !text(row.authority?.source) || !text(row.authority?.actor) || !text(row.authority?.action) || !text(row.authority?.resource) || !text(row.authority?.grant)) fail('Missing authoritative scope context');
    const fingerprint = digest({ request: row.request.trim().normalize('NFC'), authority: row.authority });
    if (contents.has(fingerprint) && contents.get(fingerprint) !== row.group) fail('Identical case assigned to different family');
    contents.set(fingerprint, row.group);
    if (!text(row.proposal?.origin) || row.proposal.status !== 'pending-human' || !text(row.proposal.reason)) fail('Proposal provenance required; proposals are never gold');
    for (const axis of names(AXES)) if (!AXES[axis].includes(row.proposal[axis]) || !text(row.proposal.reasons?.[axis])) fail('Invalid proposed label or per-axis reason');
    if (!Array.isArray(row.reviews)) fail('Missing review history');
    row.reviews.forEach((review, index) => {
      if (review.revision !== index + 1 || review.case_digest !== caseDigest(row) || !text(review.actor) || !ROLES.includes(review.role) || !text(review.source) || !text(review.reason) || !Number.isFinite(Date.parse(review.at))) fail('Invalid review provenance/version/content pin');
      for (const axis of names(AXES)) if (!AXES[axis].includes(review.labels?.[axis]) || !text(review.reasons?.[axis])) fail('Each axis needs independent label/rationale');
      if (review.previous_digest !== (index ? digest(row.reviews[index - 1]) : null)) fail('Broken review chain');
    });
  }
  return { cases: ids.size, groups: groups.size, fit: corpus.cases.filter(r => r.split === 'fit').length, tune: corpus.cases.filter(r => r.split === 'tune').length };
}
export function approved(row) {
  const latest = ROLES.map(role => row.reviews.filter(r => r.role === role).at(-1));
  return latest.every(Boolean) && latest[0].actor !== latest[1].actor
    && latest.every(r => r.case_digest === caseDigest(row))
    && names(AXES).every(axis => latest[0].labels[axis] !== 'unknown' && latest[0].labels[axis] === latest[1].labels[axis]);
}
export function goldExport(corpus) {
  validate(corpus);
  if (!corpus.cases.every(approved)) fail('Pending/disputed labels: project owner and coding agent must adjudicate each case');
  return { schema: 1, corpus_version: corpus.version, corpus_digest: digest(corpus), ...(corpus.lineage ? { lineage: corpus.lineage } : {}), cases: corpus.cases.map(row => ({ ...row, gold: row.reviews.at(-1).labels })) };
}
export function addReview(corpus, caseId, event) {
  validate(corpus);
  const copy = structuredClone(corpus), row = copy.cases.find(r => r.id === caseId);
  if (!row) fail('Unknown development case');
  row.reviews.push({ ...event, revision: row.reviews.length + 1, case_digest: caseDigest(row), previous_digest: row.reviews.length ? digest(row.reviews.at(-1)) : null });
  validate(copy);
  return copy;
}
// Seal contains opaque family IDs/counts only, never private prompts or labels.
export function validateSeal(corpus, seal) {
  validate(corpus);
  const allowed = ['schema', 'version', 'private_digest', 'group_ids', 'case_count', 'operator'];
  if (names(seal).some(k => !allowed.includes(k)) || seal.schema !== 1 || !text(seal.version) || !/^[a-f0-9]{64}$/.test(seal.private_digest) || !text(seal.operator) || !Array.isArray(seal.group_ids) || !seal.group_ids.length || !Number.isInteger(seal.case_count) || seal.case_count < seal.group_ids.length) fail('Invalid opaque held-out seal');
  const devGroups = new Set(corpus.cases.map(r => r.group)), seen = new Set();
  for (const group of seal.group_ids) {
    if (!text(group) || seen.has(group) || devGroups.has(group)) fail('Held-out family overlaps development or duplicate group');
    seen.add(group);
  }
  return { version: seal.version, groups: seen.size, cases: seal.case_count, digest: seal.private_digest };
}
export function validateAggregate(report) {
  const fields = ['schema', 'seal_digest', 'candidate_digest', 'sample_count', 'permission', 'content', 'parser_failures'];
  if (names(report).some(k => !fields.includes(k)) || report.schema !== 1 || !/^[a-f0-9]{64}$/.test(report.seal_digest) || !/^[a-f0-9]{64}$/.test(report.candidate_digest) || !Number.isInteger(report.sample_count) || report.sample_count < 1 || !Number.isInteger(report.parser_failures) || report.parser_failures < 0 || report.parser_failures > report.sample_count) fail('Invalid aggregate envelope');
  for (const axis of ['permission', 'content']) {
    const counts = report[axis];
    if (!counts || names(counts).sort().join(',') !== 'fn,fp,tn,tp' || Object.values(counts).some(v => !Number.isInteger(v) || v < 0) || Object.values(counts).reduce((a, b) => a + b, 0) !== report.sample_count - report.parser_failures) fail('Invalid aggregate confusion counts');
  }
  return report;
}
const load = path => JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const [command, input, extra] = process.argv.slice(2);
    if (command === 'check') console.log(JSON.stringify(validate(load(input)), null, 2));
    else if (command === 'export-gold') {
      if (!extra || extra === input) fail('Separate output path required');
      writeFileSync(extra, JSON.stringify(goldExport(load(input)), null, 2) + '\n', { flag: 'wx' });
    } else if (command === 'record-review') {
      const [caseId, eventFile, output] = process.argv.slice(4);
      if (!caseId || !eventFile || !output || output === input || output === eventFile) fail('Case ID, reviewer event and separate new output required');
      writeFileSync(output, JSON.stringify(addReview(load(input), caseId, load(eventFile)), null, 2) + '\n', { flag: 'wx' });
    } else if (command === 'check-seal') console.log(JSON.stringify(validateSeal(load(input), load(extra)), null, 2));
    else if (command === 'check-aggregate') console.log(JSON.stringify(validateAggregate(load(input)), null, 2));
    else fail('Usage: check DEV | export-gold DEV NEW_OUTPUT | record-review DEV CASE EVENT NEW_OUTPUT | check-seal DEV OPAQUE_SEAL | check-aggregate AGGREGATE');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
