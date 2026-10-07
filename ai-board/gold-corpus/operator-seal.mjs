/** OPERATOR ONLY: run locally with private test data unavailable to coding agent. */
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { digest, validate, approved, validateSeal } from './corpus.mjs';
export function makeSeal(privateCorpus, development, operator) {
  validate(development);
  if (typeof operator !== 'string' || !operator.trim()) throw new Error('Operator identity required');
  if (!Array.isArray(privateCorpus.cases) || !privateCorpus.cases.length || privateCorpus.cases.some(row => row.split !== 'test')) throw new Error('Private corpus must contain test families only');
  // Reuse provenance/label checks, but never expose transformed private rows.
  validate({ ...privateCorpus, cases: privateCorpus.cases.map(row => ({ ...row, split: 'fit' })) });
  if (!privateCorpus.cases.every(approved)) throw new Error('Private test labels require independent owner/agent adjudication');
  const fingerprint = row => digest({ request: row.request.trim().normalize('NFC'), authority: row.authority });
  const exposed = new Set(development.cases.map(fingerprint));
  if (privateCorpus.cases.some(row => exposed.has(fingerprint(row)))) throw new Error('Private case duplicates development content');
  const seal = { schema: 1, version: privateCorpus.version, private_digest: digest(privateCorpus), group_ids: [...new Set(privateCorpus.cases.map(row => row.group))], case_count: privateCorpus.cases.length, operator };
  validateSeal(development, seal);
  return seal;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const [privatePath, devPath, output, operator] = process.argv.slice(2);
    if (!privatePath || !devPath || !output || output === privatePath || output === devPath) throw new Error('Usage: operator-seal PRIVATE_TEST_JSON PUBLIC_DEV_JSON NEW_OPAQUE_SEAL_JSON OPERATOR');
    const load = path => JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
    const seal = makeSeal(load(privatePath), load(devPath), operator);
    writeFileSync(output, JSON.stringify(seal, null, 2) + '\n', { flag: 'wx' });
    console.log(JSON.stringify({ cases: seal.case_count, groups: seal.group_ids.length, digest: seal.private_digest }));
  } catch (error) {
    // Never print private paths/input contents or parser exception strings.
    const known = /^(Operator identity|Private corpus|Private test labels|Private case duplicates|Held-out family|Invalid |Duplicate\/missing|Request family|Identical case|Missing |Proposal provenance|Broken review|Each axis|Usage:)/;
    console.error(known.test(error.message) ? error.message : 'Private seal preparation failed; inspect inputs locally without sharing them');
    process.exitCode = 1;
  }
}
