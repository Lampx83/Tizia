import test from 'node:test';
import assert from 'node:assert/strict';
import { createTraceReadModel } from '../server/ai-board/services/trace-read-model.js';

function fakeStore({ rootId = 7, withDb = true } = {}) {
  const state = { n: 1, m: 1 };
  const calls = { trace: 0, fingerprint: 0 };
  const db = {
    get: async (sql) => {
      if (sql.includes('source_request_id')) return { id: rootId };
      calls.fingerprint += 1;
      return { n: state.n, m: state.m };
    },
    all: async () => [],
  };
  const store = {
    db: withDb ? db : undefined,
    getRequestTrace: async () => { calls.trace += 1; return { root: { id: rootId }, runs: [{ id: 1 }], resume: null }; },
  };
  return { store, state, calls };
}

function fakeParts() {
  const counts = { allowance: 0, hsm: 0, gate: 0 };
  return {
    counts,
    parts: {
      allowance: { read: async () => { counts.allowance += 1; return { groups: [] }; } },
      hsm: { read: async () => { counts.hsm += 1; return { state: 'ok' }; } },
      spans: {
        forRuns: async (ids) => new Map(ids.map((id) => [Number(id), []])),
        gateHistory: async () => { counts.gate += 1; return { 1: { median_ms: 5, n: 1 } }; },
      },
    },
  };
}

test('build assembles allowance, hsm, spans and gate_history', async () => {
  const { store } = fakeStore();
  const { parts } = fakeParts();
  const model = createTraceReadModel(store, { ...parts });
  const out = await model.read('42', undefined);
  assert.equal(out.notModified, false);
  assert.deepEqual(out.trace.root_work, { groups: [] });
  assert.deepEqual(out.trace.hsm, { state: 'ok' });
  assert.deepEqual(out.trace.runs[0].spans, []);
  assert.deepEqual(out.trace.gate_history, { 1: { median_ms: 5, n: 1 } });
});

test('missing request returns null', async () => {
  const { store } = fakeStore();
  store.getRequestTrace = async () => null;
  const model = createTraceReadModel(store, { ...fakeParts().parts });
  assert.equal(await model.read('404', undefined), null);
});

test('no db: no assembled parts, no etag', async () => {
  const { store } = fakeStore({ withDb: false });
  const { parts, counts } = fakeParts();
  const model = createTraceReadModel(store, { ...parts });
  const out = await model.read('42', undefined);
  assert.equal(out.etag, null);
  assert.equal(out.trace.root_work, undefined);
  assert.equal(counts.gate, 0);
});

test('second identical poll with If-None-Match returns 304 and skips build and gateHistory', async () => {
  const { store, calls } = fakeStore();
  const { parts, counts } = fakeParts();
  const model = createTraceReadModel(store, { ...parts, now: () => 1000 });
  const first = await model.read('42', undefined);
  const second = await model.read('42', first.etag);
  assert.equal(second.notModified, true);
  assert.equal(second.etag, first.etag);
  assert.equal(calls.trace, 1);
  assert.equal(counts.gate, 1);
  assert.equal(counts.allowance, 1);
});

test('changed revision rebuilds with a new etag', async () => {
  const { store, state } = fakeStore();
  const { parts, counts } = fakeParts();
  const model = createTraceReadModel(store, { ...parts, now: () => 1000 });
  const first = await model.read('42', undefined);
  state.m = 2;
  const second = await model.read('42', first.etag);
  assert.equal(second.notModified, false);
  assert.notEqual(second.etag, first.etag);
  assert.equal(counts.allowance, 2);
});

test('304 expires after revalidate window so time-based fields refresh', async () => {
  const { store } = fakeStore();
  const { parts, counts } = fakeParts();
  let clock = 1000;
  const model = createTraceReadModel(store, { ...parts, now: () => clock, revalidateMs: 10_000 });
  const first = await model.read('42', undefined);
  clock += 10_000;
  const second = await model.read('42', first.etag);
  assert.equal(second.notModified, false);
  assert.equal(counts.allowance, 2);
});

test('gate medians cached within TTL, recomputed after', async () => {
  const { store } = fakeStore();
  const { parts, counts } = fakeParts();
  let clock = 0;
  const model = createTraceReadModel(store, { ...parts, now: () => clock, gateTtlMs: 30_000, revalidateMs: 0 });
  await model.read('42', undefined);
  clock = 29_000;
  await model.read('42', undefined);
  assert.equal(counts.gate, 1);
  clock = 30_000;
  await model.read('42', undefined);
  assert.equal(counts.gate, 2);
});

test('If-None-Match list containing current etag still matches', async () => {
  const { store } = fakeStore();
  const { parts, counts } = fakeParts();
  const model = createTraceReadModel(store, { ...parts, now: () => 1000 });
  const first = await model.read('42', undefined);
  const out = await model.read('42', `"zzz", ${first.etag}`);
  assert.equal(out.notModified, true);
  assert.equal(counts.allowance, 1);
});
