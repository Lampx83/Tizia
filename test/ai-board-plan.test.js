import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, PlanGuardrailError } from '../server/ai-board/store.js';
import {
  CAPABILITY_POLICY, CAPABILITY_POLICY_HASH, CAPABILITY_POLICY_VERSION, hashCapabilityPolicy, validatePlan,
} from '../server/ai-board/policy.js';

function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'Ẩn danh',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy');
    INSERT INTO users VALUES (9, 'admin', 'Admin', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'plan-request-001', title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
  });
  const ticket = store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run = store.createRun(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-001',
  });
  return { db, store, ticket, run };
}

function plan(overrides = {}) {
  return {
    domain: 'pharmacy',
    goal: 'Thêm trang thẻ ghi nhớ thuốc.',
    allowed_scope: ['public/pharmacy/flashcards.html'],
    acceptance: ['GET trang trả 200', 'hiển thị ba thẻ mẫu'],
    tests: ['node --test test/flashcards.test.js'],
    capabilities: ['public.ui'],
    risk: 'low',
    non_goals: ['không sửa auth', 'không sửa DB'],
    steps: [{
      order: 1,
      title: 'Tạo trang thẻ',
      description: 'Thêm trang HTML tĩnh.',
      allowed_scope: ['public/pharmacy/flashcards.html'],
      acceptance: ['hiển thị ba thẻ mẫu'],
      tests: ['node --test test/flashcards.test.js'],
      capability: 'public.ui',
      risk: 'low',
      non_goals: ['không sửa auth'],
    }],
    ...overrides,
  };
}

function submit(store, ticket, run, value, extra = {}) {
  return store.submitPlan(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
    plan: value, budgetUsed: 40, idempotencyKey: extra.idempotencyKey || 'submit-plan-001',
    ...extra,
  });
}

test('validated surface plan creates ordered children once', () => {
  const { db, store, ticket, run } = fixture();
  const first = submit(store, ticket, run, plan());
  assert.equal(first.tier, 'surface');
  assert.equal(first.status, 'planned');
  assert.equal(first.children.length, 1);
  assert.equal(first.capability_policy_hash, CAPABILITY_POLICY_HASH);
  assert.match(CAPABILITY_POLICY_HASH, /^[a-f0-9]{64}$/);
  for (const entry of Object.values(CAPABILITY_POLICY)) {
    assert.deepEqual(Object.keys(entry).sort(), [
      'allow', 'deny', 'dependencies', 'imports', 'mandatoryTests', 'owner', 'rationale', 'tier',
    ].sort());
  }
  assert.deepEqual(
    first.children.map((child) => [child.sequence, child.title, child.status, child.tier]),
    [[1, 'Tạo trang thẻ', 'queued', 'surface']],
  );
  const second = submit(store, ticket, run, plan(), { idempotencyKey: 'submit-plan-002' });
  assert.equal(second.plan_hash, first.plan_hash);
  assert.equal(second.children[0].id, first.children[0].id);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=?').get(ticket.id).n, 1);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_gate_traces WHERE run_id=?').get(run.id).n, 3);
  db.close();
});

test('policy identity includes enforced fields only and versions the persisted plan hash', () => {
  const metadataOnlyChanges = Object.fromEntries(Object.entries(CAPABILITY_POLICY).map(([name, entry]) => [name, {
    ...entry,
    imports: ['metadata-only'],
    dependencies: ['metadata-only'],
    owner: 'metadata-only',
    rationale: 'metadata-only',
  }]));
  assert.equal(hashCapabilityPolicy(metadataOnlyChanges), CAPABILITY_POLICY_HASH);
  assert.notEqual(hashCapabilityPolicy({
    ...CAPABILITY_POLICY,
    'public.ui': { ...CAPABILITY_POLICY['public.ui'], allow: ['server/'] },
  }), CAPABILITY_POLICY_HASH);
  assert.equal(CAPABILITY_POLICY_VERSION, 'd0-v2');
  const checked = validatePlan(plan(), 'pharmacy');
  assert.equal(checked.planHash, createHash('sha256')
    .update(`d0-v2\n${CAPABILITY_POLICY_HASH}\n${checked.planJson}`).digest('hex'));
  assert.notEqual(checked.planHash, createHash('sha256')
    .update(`d0-v1\n${CAPABILITY_POLICY_HASH}\n${checked.planJson}`).digest('hex'));
});

test('malformed, cross-domain and unknown-capability plans fail closed with separate reasons', () => {
  for (const [badPlan, code] of [
    [{ goal: 'thiếu schema' }, 'malformed_plan'],
    [plan({ domain: 'it' }), 'domain_mismatch'],
    [plan({ capabilities: ['root.shell'], steps: [{ ...plan().steps[0], capability: 'root.shell' }] }), 'unknown_capability'],
  ]) {
    const { db, store, ticket, run } = fixture();
    assert.throws(
      () => submit(store, ticket, run, badPlan),
      (error) => error instanceof PlanGuardrailError && error.code === code,
    );
    const root = db.prepare('SELECT status, public_note, internal_reason FROM ai_tickets WHERE id=?').get(ticket.id);
    assert.equal(root.status, 'waiting');
    assert.ok(root.public_note);
    assert.ok(root.internal_reason);
    assert.notEqual(root.public_note, root.internal_reason);
    assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=?').get(ticket.id).n, 0);
    assert.throws(
      () => submit(store, ticket, run, badPlan),
      (error) => error instanceof PlanGuardrailError && error.code === code,
    );
    assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_gate_traces WHERE run_id=? AND status=?').get(run.id, 'blocked').n, 1);
    db.close();
  }
});

test('protected plan waits for explicit admin authorization; core plan is human-owned', () => {
  {
    const { db, store, ticket, run } = fixture();
    const protectedPlan = plan({
      allowed_scope: ['server/contexts/content/index.js'],
      capabilities: ['content.write'],
      risk: 'medium',
      steps: [{ ...plan().steps[0], allowed_scope: ['server/contexts/content/index.js'], capability: 'content.write', risk: 'medium' }],
    });
    const waiting = submit(store, ticket, run, protectedPlan);
    assert.equal(waiting.status, 'waiting_authorization');
    assert.equal(waiting.children[0].status, 'waiting_authorization');
    store.authorizePlan(ticket.id, waiting.plan_hash, 9);
    const root = db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id);
    const child = db.prepare('SELECT status FROM ai_tickets WHERE parent_id=?').get(ticket.id);
    assert.equal(root.status, 'planned');
    assert.equal(child.status, 'queued');
    db.close();
  }
  {
    const { db, store, ticket, run } = fixture();
    const corePlan = plan({
      allowed_scope: ['server/db.js'], capabilities: ['core.server'], risk: 'high',
      steps: [{ ...plan().steps[0], allowed_scope: ['server/db.js'], capability: 'core.server', risk: 'high' }],
    });
    const result = submit(store, ticket, run, corePlan);
    assert.equal(result.status, 'human_owned');
    assert.equal(result.children[0].status, 'human_owned');
    db.close();
  }
});

test('clarification invalidates the old plan and automatic planning stops after two rounds', () => {
  const { db, store, ticket, run } = fixture();
  const first = submit(store, ticket, run, plan());
  assert.equal(store.invalidatePlanForRequest(1, 'requester clarification'), true);
  assert.equal(db.prepare('SELECT status FROM ai_plans WHERE plan_hash=?').get(first.plan_hash).status, 'invalidated');
  assert.equal(db.prepare('SELECT status FROM ai_tickets WHERE parent_id=?').get(ticket.id).status, 'invalidated');

  const secondPlan = plan({ goal: 'Vòng hai', steps: [{ ...plan().steps[0], title: 'Vòng hai' }] });
  const ticket2 = store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run2 = store.createRun(ticket2.id, {
    workerId: 'planner', leaseToken: ticket2.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-002',
  });
  const second = submit(store, ticket2, run2, secondPlan, { idempotencyKey: 'submit-plan-round2' });
  assert.equal(second.status, 'planned');
  store.invalidatePlanForRequest(1, 'second clarification');

  const thirdPlan = plan({ goal: 'Vòng ba', steps: [{ ...plan().steps[0], title: 'Vòng ba' }] });
  const ticket3 = store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run3 = store.createRun(ticket3.id, {
    workerId: 'planner', leaseToken: ticket3.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-003',
  });
  const third = submit(store, ticket3, run3, thirdPlan, { idempotencyKey: 'submit-plan-round3' });
  assert.equal(third.status, 'waiting_admin');
  assert.equal(third.reason, 'automatic_round_limit');
  assert.equal(db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id).status, 'waiting_admin');
  db.close();
});
