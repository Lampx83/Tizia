/**
 * Seam JS cho ticket 19 — tái dùng đúng seam node:test của ws-safety.test.js,
 * không seam mới. Fake `ws` object (chỉ cần .readyState).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { sweepStaleConnections, HEARTBEAT_INTERVAL_MS } from '../server/ws-heartbeat.js';

test('sweepStaleConnections: xoá conn readyState !== 1, gọi onStale đúng id', () => {
  const map = new Map([
    [1, { ws: { readyState: 1 } }],
    [2, { ws: { readyState: 3 } }], // CLOSED
    [3, { ws: { readyState: 0 } }], // CONNECTING (chưa mở, không phải OPEN)
  ]);
  const stale = [];

  sweepStaleConnections(map, (id) => stale.push(id));

  assert.deepEqual([...map.keys()], [1]);
  assert.deepEqual(stale.sort(), [2, 3]);
});

test('sweepStaleConnections: không có conn nào chết → không gọi onStale, map nguyên vẹn', () => {
  const map = new Map([[1, { ws: { readyState: 1 } }], [2, { ws: { readyState: 1 } }]]);
  let calls = 0;

  sweepStaleConnections(map, () => { calls += 1; });

  assert.equal(calls, 0);
  assert.equal(map.size, 2);
});

test('HEARTBEAT_INTERVAL_MS khớp hành vi cũ (15000ms) của cả 4 site', () => {
  assert.equal(HEARTBEAT_INTERVAL_MS, 15000);
});
