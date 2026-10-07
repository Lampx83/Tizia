import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { corpus } from './development-proposals.mjs';
import { validate, addReview, goldExport, validateSeal, validateAggregate } from './corpus.mjs';
import { makeSeal } from './operator-seal.mjs';
import { evaluatePrivate } from './private-evaluator.mjs';
import { createServer } from 'node:http';
import { runTrustedEvaluation, candidateIdentity } from './trusted-runtime.mjs';
const fresh = () => structuredClone(corpus);
const event = (role, labels = { permission: 'allowed', content: 'benign' }) => ({
  actor: role === 'project-owner' ? 'TEST-owner' : 'TEST-agent', role,
  at: '2026-10-05T00:00:00Z', source: 'TEST ONLY synthetic reviewer input', labels,
  reasons: { permission: 'TEST: authorized fixture UI', content: 'TEST: no harmful effect' }, reason: 'TEST ONLY, never a real review'
});
test('synthetic review corpus is valid but never exportable as gold', () => {
  assert.deepEqual(validate(fresh()), { cases: 12, groups: 6, fit: 6, tune: 6 });
  assert.throws(() => goldExport(fresh()), /Pending/);
});
test('same family cannot span fit and tune', () => {
  const c = fresh(); c.cases[1].split = 'tune';
  assert.throws(() => validate(c), /family spans/);
});
test('duplicating request with a new family is rejected', () => {
  const c = fresh(); c.cases[1] = { ...structuredClone(c.cases[0]), id: 'copy', group: 'other-group' };
  assert.throws(() => validate(c), /Identical case/);
});
test('development tooling refuses case-level held-out', () => {
  const c = fresh(); c.cases[0].split = 'test';
  assert.throws(() => validate(c), /fit\/tune/);
});
test('missing authority cannot become inferred permission', () => {
  const c = fresh(); delete c.cases[0].authority.grant;
  assert.throws(() => validate(c), /authoritative/);
});
test('one role, same actor, disagreement, unknown each prevent gold', () => {
  const base = fresh(); base.cases = [base.cases[0]];
  const agent = addReview(base, base.cases[0].id, event('coding-agent'));
  assert.throws(() => goldExport(agent), /Pending/);
  const same = event('project-owner'); same.actor = 'TEST-agent';
  assert.throws(() => goldExport(addReview(agent, base.cases[0].id, same)), /Pending/);
  assert.throws(() => goldExport(addReview(agent, base.cases[0].id, event('project-owner', { permission: 'denied', content: 'benign' }))), /Pending/);
  const unknown = { permission: 'unknown', content: 'benign' };
  assert.throws(() => goldExport(addReview(addReview(base, base.cases[0].id, event('coding-agent', unknown)), base.cases[0].id, event('project-owner', unknown))), /Pending/);
});
test('two distinct agreeing reviewers export pinned labels; changed request invalidates', () => {
  let c = fresh(); c.cases = [c.cases[0]];
  c = addReview(addReview(c, c.cases[0].id, event('coding-agent')), c.cases[0].id, event('project-owner'));
  assert.equal(goldExport(c).cases[0].gold.permission, 'allowed');
  c.cases[0].request += ' and change permissions';
  assert.throws(() => goldExport(c), /content pin/);
});
test('review edit/tampered ordering is detected by chain and version', () => {
  let c = fresh(); c.cases = [c.cases[0]];
  c = addReview(addReview(c, c.cases[0].id, event('coding-agent')), c.cases[0].id, event('project-owner'));
  c.cases[0].reviews[0].reason = 'rewritten';
  assert.throws(() => validate(c), /Broken review chain/);
  c = fresh(); c.cases = [c.cases[0]];
  c = addReview(c, c.cases[0].id, event('coding-agent')); c.cases[0].reviews[0].revision = 2;
  assert.throws(() => validate(c), /version/);
});
const seal = () => ({ schema: 1, version: 'TEST-seal', private_digest: 'a'.repeat(64), group_ids: ['TEST-opaque-private-family'], case_count: 2, operator: 'TEST-operator' });
test('seal overlap/extra private fields are rejected', () => {
  assert.equal(validateSeal(fresh(), seal()).cases, 2);
  const overlap = seal(); overlap.group_ids = [corpus.cases[0].group];
  assert.throws(() => validateSeal(fresh(), overlap), /overlaps/);
  assert.throws(() => validateSeal(fresh(), { ...seal(), cases: ['private text'] }), /opaque/);
});
const report = () => ({ schema: 1, seal_digest: 'a'.repeat(64), candidate_digest: 'b'.repeat(64), sample_count: 10, parser_failures: 1, permission: { tp: 2, tn: 5, fp: 1, fn: 1 }, content: { tp: 2, tn: 5, fp: 1, fn: 1 } });
test('aggregate rejects per-case output and inconsistent supports', () => {
  assert.equal(validateAggregate(report()).sample_count, 10);
  assert.throws(() => validateAggregate({ ...report(), cases: [{ request: 'private' }] }), /envelope/);
  const bad = report(); bad.content.tp++;
  assert.throws(() => validateAggregate(bad), /confusion/);
});
test('CLI cannot produce a partial gold file from pending proposals', () => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-corpus-test-'));
  try {
    const source = join(dir, 'pending.json'), output = join(dir, 'gold.json');
    writeFileSync(source, JSON.stringify(fresh()));
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('./corpus.mjs', import.meta.url)), 'export-gold', source, output], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Pending/);
    assert.equal(existsSync(output), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test('CLI records a review into a new version without overwriting source', () => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-corpus-test-'));
  try {
    const source = join(dir, 'pending.json'), eventFile = join(dir, 'event.json'), output = join(dir, 'new.json');
    const sourceText = JSON.stringify(fresh());
    writeFileSync(source, sourceText); writeFileSync(eventFile, JSON.stringify(event('coding-agent')));
    const args = [fileURLToPath(new URL('./corpus.mjs', import.meta.url)), 'record-review', source, corpus.cases[0].id, eventFile, output];
    assert.equal(spawnSync(process.execPath, args).status, 0);
    assert.equal(readFileSync(source, 'utf8'), sourceText);
    assert.equal(JSON.parse(readFileSync(output, 'utf8')).cases[0].reviews[0].role, 'coding-agent');
    assert.equal(spawnSync(process.execPath, args).status, 1);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
function privateFixture() {
  let c = fresh(); c.version = 'TEST-private-v1'; c.cases = [c.cases[0]];
  c.cases[0].group = 'TEST-opaque-family'; c.cases[0].request = 'TEST private synthetic request, not real held-out';
  c = addReview(addReview(c, c.cases[0].id, event('coding-agent')), c.cases[0].id, event('project-owner'));
  c.cases[0].split = 'test'; return c;
}
test('operator seal exposes only digest/opaque identity/counts', () => {
  const seal = makeSeal(privateFixture(), fresh(), 'TEST-operator');
  assert.equal(seal.case_count, 1);
  assert.equal(JSON.stringify(seal).includes('private synthetic request'), false);
  assert.equal(validateSeal(fresh(), seal).groups, 1);
});
test('operator refuses unreviewed/non-test/cross-family duplicated cases', () => {
  const pending = privateFixture(); pending.cases[0].reviews = [];
  assert.throws(() => makeSeal(pending, fresh(), 'TEST-operator'), /adjudication/);
  const exposed = privateFixture(); exposed.cases[0].split = 'fit';
  assert.throws(() => makeSeal(exposed, fresh(), 'TEST-operator'), /test families/);
  let duplicate = fresh(); duplicate.cases = [duplicate.cases[0]]; duplicate.cases[0].group = 'other-family';
  duplicate = addReview(addReview(duplicate, duplicate.cases[0].id, event('coding-agent')), duplicate.cases[0].id, event('project-owner'));
  duplicate.cases[0].split = 'test';
  assert.throws(() => makeSeal(duplicate, fresh(), 'TEST-operator'), /duplicates/);
});

test('private evaluator is sequential, omits answers and releases aggregate only', async () => {
  let c = fresh(); c.version = 'TEST-evaluation'; c.cases = c.cases.slice(0, 4);
  for (const row of c.cases) {
    row.group = 'TEST-only-evaluation-family'; row.request = `TEST-only input ${row.id}`;
  }
  for (const row of [...c.cases]) {
    const labels = row.id.endsWith('1') ? { permission: 'denied', content: 'harmful' }
      : { permission: 'allowed', content: 'benign' };
    c = addReview(addReview(c, row.id, event('coding-agent', labels)), row.id, event('project-owner', labels));
  }
  for (const row of c.cases) row.split = 'test';
  const s = makeSeal(c, fresh(), 'TEST-operator'), pin = 'b'.repeat(64);
  const predictions = [
    { permission: 'denied', content: 'harmful' },
    { permission: 'denied', content: 'harmful' },
    { permission: 'allowed', content: 'benign' }, {},
  ];
  let running = false, calls = 0;
  const result = await evaluatePrivate(c, fresh(), s, pin, async input => {
    assert.equal(running, false); running = true;
    assert.deepEqual(Object.entries(input).map(([name]) => name).sort(), ['authority', 'request']);
    assert.equal(JSON.stringify(input).includes('TEST-owner'), false);
    await Promise.resolve(); running = false;
    return predictions[calls++];
  });
  assert.equal(calls, 4);
  assert.deepEqual(result.permission, { tp: 1, tn: 0, fp: 1, fn: 1 });
  assert.deepEqual(result.content, result.permission);
  assert.equal(result.parser_failures, 1);
  assert.equal(JSON.stringify(result).includes('TEST-only input'), false);
  assert.equal(result.seal_digest, (await import('./corpus.mjs')).digest(s));
  await assert.rejects(evaluatePrivate(c, fresh(), { ...s, private_digest: 'c'.repeat(64) }, pin, async () => {
    assert.fail('mismatched seal must fail before inference');
  }), /identity mismatch/);
  await assert.rejects(evaluatePrivate(c, fresh(), s, pin, async () => {
    throw new Error('PRIVATE INPUT must never be printed');
  }), error => error.message === 'Private evaluation interrupted; no aggregate released');
});

test('private evaluator pins caller data across inference awaits', async () => {
  const c = privateFixture(), development = fresh();
  const s = makeSeal(c, development, 'TEST-operator');
  const before = structuredClone(c);
  const result = await evaluatePrivate(c, development, s, 'b'.repeat(64), async input => {
    input.authority.grant = 'TEST adapter modifies its private input';
    c.cases[0].reviews.at(-1).labels = { permission: 'denied', content: 'harmful' };
    return { permission: 'allowed', content: 'benign' };
  });
  assert.deepEqual(result.permission, { tp: 0, tn: 1, fp: 0, fn: 0 });
  assert.equal(before.cases[0].authority.grant, c.cases[0].authority.grant);
});

test('private evaluator counts unreadable response objects without releasing their exception', async () => {
  const c = privateFixture(), development = fresh();
  const s = makeSeal(c, development, 'TEST-operator');
  const result = await evaluatePrivate(c, development, s, 'b'.repeat(64), async () => ({
    get permission() { throw new Error('TEST PRIVATE payload in adapter getter'); },
    content: 'benign',
  }));
  assert.equal(result.parser_failures, 1);
  assert.deepEqual(result.permission, { tp: 0, tn: 0, fp: 0, fn: 0 });
  assert.equal(JSON.stringify(result).includes('PRIVATE'), false);
});

test('private evaluator snapshots response labels once and scores the two axes independently', async () => {
  const c = privateFixture(), development = fresh();
  const s = makeSeal(c, development, 'TEST-operator');
  const before = JSON.stringify({ c, development, s });
  let reads = 0;
  const result = await evaluatePrivate(c, development, s, 'b'.repeat(64), async () => ({
    get permission() { return ++reads === 1 ? 'allowed' : 'denied'; },
    content: 'harmful',
  }));
  assert.equal(reads, 1);
  assert.deepEqual(result.permission, { tp: 0, tn: 1, fp: 0, fn: 0 });
  assert.deepEqual(result.content, { tp: 0, tn: 0, fp: 1, fn: 0 });
  assert.equal(JSON.stringify({ c, development, s }), before);
});

test('private evaluator rejects coercible candidate identities before inference', async () => {
  const c = privateFixture(), development = fresh();
  const s = makeSeal(c, development, 'TEST-operator');
  const pin = { secret: 'TEST private metadata', toString: () => 'b'.repeat(64) };
  let calls = 0;
  await assert.rejects(evaluatePrivate(c, development, s, pin, async () => {
    calls++; return { permission: 'allowed', content: 'benign' };
  }), /Evaluation identity mismatch/);
  assert.equal(calls, 0);
});

test('private evaluator sends only documented authority fields and sanitizes preflight exceptions', async () => {
  const c = privateFixture(), development = fresh();
  c.cases[0].authority.extraReview = { labels: 'TEST private answer', case_id: 'TEST private ID' };
  c.cases[0].reviews = [];
  let reviewed = addReview(addReview({ ...c, cases: c.cases.map(row => ({ ...row, split: 'fit' })) }, c.cases[0].id, event('coding-agent')), c.cases[0].id, event('project-owner'));
  reviewed.cases[0].split = 'test';
  const s = makeSeal(reviewed, development, 'TEST-operator');
  await evaluatePrivate(reviewed, development, s, 'b'.repeat(64), async input => {
    assert.deepEqual(Object.entries(input.authority).map(([name]) => name).sort(), ['action', 'actor', 'grant', 'resource', 'source']);
    return { permission: 'allowed', content: 'benign' };
  });
  const unreadable = { get cases() { throw new Error('TEST PRIVATE preflight payload'); } };
  await assert.rejects(evaluatePrivate(unreadable, development, s, 'b'.repeat(64), async () => {
    assert.fail('unreadable identity must fail before inference');
  }), error => error.message === 'Evaluation identity mismatch');
});

test('trusted runtime uses pinned HTTP transport, a durable one-release ledger and bounded failures (TEST only)', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-runtime-test-'));
  const model = 'TEST-model:fixed', modelDigest = 'e'.repeat(64);
  let mode = 'valid', chats = 0, requests = 0, lastPayload;
  const server = createServer((req, res) => {
    requests++;
    if (mode === 'redirect') { res.writeHead(302, { location: '/other' }); res.end(); return; }
    if (mode === 'hang') return;
    if (mode === 'oversize') { res.end('x'.repeat(262145)); return; }
    if (req.url === '/api/tags') {
      res.end(JSON.stringify({ models: [{ name: model, digest: mode === 'wrong-pin' || (mode === 'changed-pin' && chats) ? 'f'.repeat(64) : modelDigest }] })); return;
    }
    if (req.url !== '/api/chat') { res.writeHead(404); res.end(); return; }
    const chunks = []; req.on('data', chunk => chunks.push(chunk)); req.on('end', () => {
      chats++; lastPayload = JSON.parse(Buffer.concat(chunks));
      res.end(JSON.stringify({ model, done: true, message: { content: mode === 'malformed' ? 'TEST invalid JSON' : '{"permission":"allowed","content":"benign"}' } }));
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const endpoint = `http://127.0.0.1:${server.address().port}`;
  const run = (ledgerDirectory, overrides = {}) => {
    const c = privateFixture(), development = fresh(), s = makeSeal(c, development, 'TEST-operator');
    return runTrustedEvaluation({ corpus: c, development, seal: s, endpoint, model, modelDigest, ledgerDirectory, ...overrides });
  };
  try {
    await t.test('aggregate only, pinned candidate protocol, no labels or identity leakage; repeat refused before network', async () => {
      const report = await run(dir);
      assert.equal(report.candidate_digest, candidateIdentity(model, modelDigest));
      assert.equal(report.sample_count, 1); assert.equal(report.permission.tn, 1);
      assert.equal(chats, 1); assert.equal(lastPayload.stream, false); assert.equal(lastPayload.think, false);
      assert.equal(lastPayload.options.num_predict, 128);
      const input = JSON.parse(lastPayload.messages[1].content);
      assert.deepEqual(Object.entries(input).map(([name]) => name).sort(), ['authority', 'request']);
      assert.equal(JSON.stringify(input).includes('TEST-owner'), false);
      const ledger = readFileSync(join(dir, `${makeSeal(privateFixture(), fresh(), 'TEST-operator').private_digest}.jsonl`), 'utf8');
      assert.equal(ledger.includes('private synthetic request'), false);
      assert.deepEqual(ledger.trim().split('\n').map(line => JSON.parse(line).state), ['reserved', 'released']);
      const before = requests;
      await assert.rejects(run(dir), error => error.message === 'Trusted evaluation refused or interrupted; no aggregate released');
      await assert.rejects(run(dir, { seal: makeSeal(privateFixture(), fresh(), 'TEST-other-operator') }), /no aggregate released/);
      assert.equal(requests, before);
    });
    await t.test('concurrent final jobs have exactly one reserved winner', async () => {
      const ownDir = mkdtempSync(join(dir, 'concurrent-')), before = chats;
      const attempts = await Promise.allSettled([run(ownDir), run(ownDir)]);
      assert.equal(attempts.filter(result => result.status === 'fulfilled').length, 1);
      assert.equal(chats - before, 1);
    });
    for (const failure of ['wrong-pin', 'changed-pin', 'redirect', 'oversize', 'hang']) {
      await t.test(`${failure} aborts generically and consumes its final attempt`, async () => {
        mode = failure; chats = 0;
        const ownDir = mkdtempSync(join(dir, `${failure}-`));
        const initial = requests;
        await assert.rejects(run(ownDir, { deadlineMs: failure === 'hang' ? 100 : 5000 }), error => error.message === 'Trusted evaluation refused or interrupted; no aggregate released');
        assert.ok(requests > initial, 'must reach the actual local HTTP fixture');
        const before = requests;
        await assert.rejects(run(ownDir), /no aggregate released/);
        assert.equal(requests, before);
        if (failure === 'wrong-pin') assert.equal(chats, 0);
        if (failure === 'redirect') assert.equal(chats, 0);
      });
    }
    await t.test('malformed model JSON is counted, oversized input makes no chat call', async () => {
      mode = 'malformed'; chats = 0;
      const ownDir = mkdtempSync(join(dir, 'malformed-'));
      const report = await run(ownDir); assert.equal(report.parser_failures, 1);
      assert.deepEqual(report.permission, { tp: 0, tn: 0, fp: 0, fn: 0 });
      const c = privateFixture(); c.cases[0].request = 'TEST '.repeat(4000); c.cases[0].reviews = [];
      c.cases[0].split = 'fit';
      const reviewed = addReview(addReview(c, c.cases[0].id, event('coding-agent')), c.cases[0].id, event('project-owner'));
      reviewed.cases[0].split = 'test';
      const before = chats;
      await assert.rejects(run(mkdtempSync(join(dir, 'input-')), { corpus: reviewed, seal: makeSeal(reviewed, fresh(), 'TEST-operator') }), /no aggregate released/);
      assert.equal(chats, before);
    });
    await t.test('invalid identity, endpoint path and sample budget fail before network', async () => {
      const before = requests;
      for (const overrides of [{ modelDigest: 'wrong' }, { endpoint: `${endpoint}/arbitrary` }, { maxCases: 0 }]) {
        await assert.rejects(run(dir, overrides), /no aggregate released/);
      }
      assert.equal(requests, before);
    });
  } finally {
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); rmSync(dir, { recursive: true, force: true });
  }
});
