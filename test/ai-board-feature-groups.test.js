// LF/103: request feature groups are display labels (no admin approval), distinct from folders.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';

async function fixture() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary']] });
  const store = createAsyncAiBoardStore(db.d);
  const create = (key, title, type = 'feature') => store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'primary', ownerDisplayName: 'Lan', idempotencyKey: key,
    type, title, detail: 'chi tiết', clarifying: false,
  });
  return { db, store, create };
}

test('a feature group is created once and reused by name; list returns the display name', async () => {
  const { db, store, create } = await fixture();
  try {
    const a = await create('feat-group-a-001', 'Thư viện trò chơi');
    const b = await create('feat-group-a-002', 'Thư viện trò chơi');
    const first = await store.setRequestFeature(a.request_id, '  Thư viện   trò chơi ');
    const second = await store.setRequestFeature(b.request_id, 'Thư viện trò chơi');
    assert.equal(first.feature_id, second.feature_id, 'same name maps to one ai_features row');
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_features').get()).n, 1);
    const rows = await store.listRequestsForOwner(1, 'primary');
    assert.equal(rows.find((r) => r.id === a.request_id).feature_name, 'Thư viện trò chơi');
    assert.equal(rows.find((r) => r.id === b.request_id).feature_id, first.feature_id);
  } finally { db.close(); }
});

test('different names create different groups; requests without a group keep feature_name null', async () => {
  const { db, store, create } = await fixture();
  try {
    const plain = await create('feat-group-b-000', 'Sửa trang chủ', 'other');
    const a = await create('feat-group-b-001', 'Nhóm A');
    const b = await create('feat-group-b-002', 'Nhóm B');
    const ga = await store.setRequestFeature(a.request_id, 'Nhóm A');
    const gb = await store.setRequestFeature(b.request_id, 'Nhóm B');
    assert.notEqual(ga.feature_id, gb.feature_id);
    const rows = await store.listRequestsForOwner(1, 'primary');
    assert.equal(rows.find((r) => r.id === plain.request_id).feature_name, null);
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_features').get()).n, 2);
  } finally { db.close(); }
});

test('a feature name shorter than two characters is refused', async () => {
  const { db, store, create } = await fixture();
  try {
    const a = await create('feat-group-c-001', 'Nhóm C');
    await assert.rejects(() => store.setRequestFeature(a.request_id, ' '), /feature name is too short/);
  } finally { db.close(); }
});
