// Replay a scenario on two isolated PostgreSQL schemas; returned values and persisted state must match.
// Clock is deterministic; tokens and random suffixes are normalised.
import assert from 'node:assert/strict';
import { createAsyncAiBoardStore } from '../../server/ai-board/store-async.js';
import { backends } from './ai-board-db.js';
import * as asyncAux from '../../server/ai-board/aux-async.js';
import { resetSeq } from './ai-board-scenarios.js';

const TABLES = [
  'users', 'requests', 'request_messages', 'ai_tickets', 'ai_ticket_tags', 'ai_runs', 'ai_events', 'ai_release_receipts',
  'ai_gate_traces', 'ai_alerts', 'ai_alert_receipts', 'ai_workers', 'ai_plans', 'ai_authorizations', 'ai_board_profile',
  'ai_feature_folders', 'ai_feature_folder_votes', 'ai_feature_releases', 'ai_transient_retry_state',
  'ai_eval_tasks', 'ai_pull_requests', 'ai_self_improve_state', 'ai_self_improve_nights', 'ai_frozen_benchmark_scores', 'ai_post_merge_watch',
];
const ORDER = { ai_ticket_tags: 'ticket_id, tag', ai_release_receipts: 'ticket_id, idempotency_key', ai_alert_receipts: 'alert_id, admin_user_id',
  ai_workers: 'worker_id', ai_authorizations: 'root_ticket_id, plan_revision', ai_board_profile: 'user_id',
  ai_feature_folder_votes: 'folder_id, user_id', ai_feature_releases: 'slug', ai_transient_retry_state: 'id',
  ai_pull_requests: 'number', ai_self_improve_state: 'id', ai_self_improve_nights: 'night', ai_frozen_benchmark_scores: 'pr_number',
  ai_post_merge_watch: 'pr_number' };

const normalise = (text) => text.replace(/[0-9a-f]{48}/g, 'TOKEN').replace(/:[0-9a-f]{8}(?=["\\])/g, ':RAND').replace(/-[0-9a-f]{12}\.png/g, '-RAND.png')
  .replace(/(\d)\.0(?=[,}])/g, '$1'); // SQLite json_set stores 40.0, JSON.stringify 40: same number

export async function snapshot(d, extra = []) {
  const out = {};
  for (const table of [...TABLES, ...extra]) {
    const cols = table === 'users' ? 'id, username, display_name, role' : '*';
    out[table] = await d.all(`SELECT ${cols} FROM ${table} ORDER BY ${ORDER[table] || 'id'}`);
  }
  return JSON.parse(normalise(JSON.stringify(out, (_k, v) => (typeof v === 'boolean' ? Number(v) : v))));
}

/** Records an expected failure as data so both sides compare codes and messages. */
export async function failure(fn) {
  try { await fn(); } catch (error) { return { error: error.code ?? error.constructor.name, message: error.message }; }
  return { error: null };
}

export async function seedBase(d) {
  await d.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (1, 'lan', 'Lan', 'student', 'pharmacy')`);
  await d.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (2, 'minh', 'Minh', 'student', 'pharmacy')`);
  await d.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (9, 'admin', 'Admin', 'admin', NULL)`);
  // PostgreSQL identity does not follow explicit ids; the real data copy must do the same resync.
  if (d.dialect === 'postgres') await d.get(`SELECT setval(pg_get_serial_sequence('users', 'id'), 9)`);
}

async function runOne(label, make, scenario, d) {
  const realNow = Date.now;
  let tick = 1_800_000_000_000;
  Date.now = () => (tick += 7);
  resetSeq();
  try {
    await seedBase(d);
    const { store, api } = make(d);
    const result = await scenario(store, d, api);
    return { result: JSON.parse(normalise(JSON.stringify(result ?? null))), state: await snapshot(d) };
  } finally { Date.now = realNow; }
}

/** Compare identical deterministic scenarios on two isolated PostgreSQL schemas. */
export async function assertParity(scenario, { hooks = {} } = {}) {
  let expected;
  for (let attempt = 0; attempt < 2; attempt++) {
    const d = await backends[0].open();
    try {
      const got = await runOne('postgres', (db) => ({ store: createAsyncAiBoardStore(db, hooks), api: { m: asyncAux, db } }), scenario, d);
      if (!expected) expected = got;
      else {
        assert.deepEqual(got.result, expected.result, 'PG replay returned values differ');
        for (const table of Object.getOwnPropertyNames(expected.state)) assert.deepEqual(got.state[table], expected.state[table], `PG replay table ${table} differs`);
      }
    } finally { await d.dispose(); }
  }
  return expected;
}
