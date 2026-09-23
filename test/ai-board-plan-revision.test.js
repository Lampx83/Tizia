import test from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import { applyAiBoardMigrations, createAiBoardStore } from '../server/ai-board/store.js';

test('clarification permits a new revision even when the canonical plan hash is unchanged', () => {
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
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'revision-request-01', title: 'Thêm bộ thẻ thuốc',
  });
  const plan = {
    domain: 'pharmacy', goal: 'Thêm trang thẻ ghi nhớ thuốc.',
    allowed_scope: ['public/pharmacy/flashcards.html'], acceptance: ['GET trả 200'],
    tests: ['node --test'], capabilities: ['public.ui'], risk: 'low', non_goals: ['không sửa DB'],
    steps: [{
      order: 1, title: 'Tạo trang thẻ', description: 'Trang HTML tĩnh.',
      allowed_scope: ['public/pharmacy/flashcards.html'], acceptance: ['GET trả 200'],
      tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['không sửa DB'],
    }],
  };
  const submit = (ticket, runId, key) => store.submitPlan(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token, runId,
    plan, budgetUsed: 40, idempotencyKey: key,
  });

  const firstTicket = store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const firstRun = store.createRun(firstTicket.id, {
    workerId: 'planner', leaseToken: firstTicket.lease_token,
    trigger: 'plan', idempotencyKey: 'revision-run-001',
  });
  const first = submit(firstTicket, firstRun.id, 'revision-plan-001');
  store.invalidatePlanForRequest(1, 'requester clarification');

  const nextTicket = store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const nextRun = store.createRun(nextTicket.id, {
    workerId: 'planner', leaseToken: nextTicket.lease_token,
    trigger: 'plan', idempotencyKey: 'revision-run-002',
  });
  const second = submit(nextTicket, nextRun.id, 'revision-plan-002');

  assert.equal(second.plan_hash, first.plan_hash);
  assert.equal(second.duplicate, false);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_plans WHERE root_ticket_id=1').get().n, 2);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=1 AND status != ?').get('invalidated').n, 1);
  db.close();
});
