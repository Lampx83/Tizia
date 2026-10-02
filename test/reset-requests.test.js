import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import Database from 'better-sqlite3';
import { applyAiBoardMigrations } from '../server/ai-board/store.js';

const script = fileURLToPath(new URL('../scripts/reset-requests.cjs', import.meta.url));
const snapshot = db => Object.fromEntries(db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
  .all().map(({ name }) => [name, db.prepare(`SELECT * FROM "${name}" ORDER BY rowid`).all()]));

test('reset CLI preserves accounts, supports old/new schemas, and rolls back broken links', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'tizia-reset-'));
  try {
    for (const modern of [false, true]) {
      const dbPath = path.join(dir, `${modern ? 'modern' : 'legacy'}.db`);
      const db = new Database(dbPath);
      try {
        db.pragma('foreign_keys = ON');
        db.exec(`
          CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT, display_name TEXT);
          CREATE TABLE user_wallets(user_id INTEGER REFERENCES users(id), coins INTEGER);
          CREATE TABLE curriculum(id INTEGER PRIMARY KEY, title TEXT);
          CREATE TABLE requests(
            id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT, type TEXT DEFAULT 'other', title TEXT,
            detail TEXT, student TEXT, status TEXT DEFAULT 'pending', votes INTEGER DEFAULT 1,
            admin_note TEXT, created_at INTEGER, updated_at INTEGER
          );
          CREATE TABLE notifications(id INTEGER PRIMARY KEY, request_id INTEGER, title TEXT);
          CREATE TABLE request_messages(id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER);
          CREATE TABLE ai_decisions(id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER);
          CREATE TABLE skill_proposals(id INTEGER PRIMARY KEY AUTOINCREMENT, ${modern ? 'request_ids TEXT' : 'request_id INTEGER'});
          CREATE TABLE gate_trace(id INTEGER PRIMARY KEY AUTOINCREMENT, skill_proposal_id INTEGER);
          INSERT INTO users VALUES(1,'lan','Lan');
          INSERT INTO user_wallets VALUES(1,100);
          INSERT INTO curriculum VALUES(1,'Keep');
        `);
        if (modern) applyAiBoardMigrations(db);
        db.exec(`
          INSERT INTO requests(id,domain,title,created_at,updated_at) VALUES(7,'it','Delete',1,1);
          INSERT INTO request_messages(request_id) VALUES(7);
          INSERT INTO ai_decisions(request_id) VALUES(7);
          INSERT INTO notifications VALUES(1,7,'Delete'),(2,NULL,'Keep');
          INSERT INTO skill_proposals VALUES(1,${modern ? "'[7]'" : '7'});
          INSERT INTO gate_trace(skill_proposal_id) VALUES(1);
        `);
        if (modern) db.exec(`
          INSERT INTO ai_board_profile VALUES(1,'student','[]','beginner',1);
          INSERT INTO ai_self_improve_state VALUES(1,1,1,1,1,1);
          INSERT INTO ai_transient_retry_state VALUES(1,0,1,1);
          INSERT INTO ai_feature_folders(id,slug,title,owner_user_id,domain,created_at,updated_at,last_activity_at)
            VALUES(1,'demo','Demo',1,'it',1,1,1);
          UPDATE requests SET folder_id=1, owner_user_id=1 WHERE id=7;
          INSERT INTO ai_feature_folder_votes VALUES(1,1,1);
          INSERT INTO ai_feature_releases VALUES('demo',1,1,'owner_only',1,1);
          INSERT INTO ai_tickets(id,parent_id,source_request_id,kind,title,status,phase,created_at,updated_at)
            VALUES(1,NULL,7,'root','Root','queued','intake',1,1),(2,1,7,'implementation','Child','queued','intake',1,1);
          INSERT INTO ai_ticket_tags VALUES(2,'test');
          INSERT INTO ai_runs(id,ticket_id,attempt,trigger,idempotency_key,created_at,updated_at)
            VALUES(1,2,1,'test','test',1,1);
          INSERT INTO ai_gate_traces(run_id,gate,status,created_at) VALUES(1,1,'passed',1);
          INSERT INTO ai_events(ticket_id,run_id,event_type,actor_type,idempotency_key,created_at)
            VALUES(2,1,'test','worker','test',1);
          INSERT INTO ai_release_receipts VALUES(2,'test','worker','done','test',1);
          INSERT INTO ai_alerts(id,ticket_id,severity,category,created_at,updated_at) VALUES(1,2,'info','test',1,1);
          INSERT INTO ai_alert_receipts VALUES(1,1,1,1);
          INSERT INTO ai_workers VALUES('worker','1','test','busy',2,1,1);
          INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,capability_policy_hash,plan_json,status,tier,created_at)
            VALUES(1,1,'hash','hash','{}','valid','small',1);
          INSERT INTO ai_authorizations VALUES(1,'hash',1,1,1);
          INSERT INTO ai_eval_tasks(source,trigger,request_id,run_id,request_text,created_at) VALUES('miss','retry',7,1,'Delete',1);
          INSERT INTO ai_pull_requests VALUES(1,'merged',1,'[]',1);
          INSERT INTO ai_frozen_benchmark_scores(pr_number,sha,measured_at) VALUES(1,'sha',1);
          INSERT INTO ai_post_merge_watch(pr_number,status,revert_request_id,checked_at) VALUES(1,'dropped',7,1);
          INSERT INTO ai_self_improve_nights(night,started_at,variants) VALUES('2026-10-02',1,'[{"request_id":7}]');
        `);
        const run = (...args) => spawnSync(process.execPath, [script, dbPath, ...args], { encoding: 'utf8' });
        const before = snapshot(db);
        const dryRun = run();
        assert.equal(dryRun.status, 0, dryRun.stderr);
        assert.match(dryRun.stdout, /Dry run/);
        assert.deepEqual(snapshot(db), before);
        const deleted = run('--yes');
        assert.equal(deleted.status, 0, deleted.stderr);
        const after = snapshot(db);
        for (const table of ['users', 'user_wallets', 'curriculum', 'schema_migrations', 'ai_board_profile', 'ai_transient_retry_state']) {
          assert.deepEqual(after[table], before[table], table);
        }
        const settings = new Set(['ai_board_profile', 'ai_self_improve_state', 'ai_transient_retry_state']);
        for (const [table, rows] of Object.entries(after)) {
          if ((table.startsWith('ai_') && !settings.has(table))
            || ['requests', 'request_messages', 'skill_proposals', 'gate_trace'].includes(table)) assert.deepEqual(rows, [], table);
        }
        assert.deepEqual(after.notifications, [{ id: 2, request_id: null, title: 'Keep' }]);
        if (modern) assert.deepEqual(after.ai_self_improve_state, before.ai_self_improve_state.map(row => ({ ...row, frozen_at: null })));
        assert.deepEqual(db.pragma('foreign_key_check'), []);
        assert.equal(db.prepare("INSERT INTO requests(domain,title) VALUES('it','New')").run().lastInsertRowid, 1);
        assert.equal(run('--yes').status, 0, 'repeated reset');
        db.exec(`INSERT INTO requests(id,domain,title) VALUES(7,'it','Keep on failure');
          CREATE TABLE protected_link(request_id INTEGER REFERENCES requests(id));
          INSERT INTO protected_link VALUES(7);`);
        const beforeFailure = snapshot(db);
        const failed = run('--yes');
        assert.notEqual(failed.status, 0);
        assert.match(failed.stderr, /reset rolled back/);
        assert.deepEqual(snapshot(db), beforeFailure);
      } finally { db.close(); }
    }
    const missingPath = path.join(dir, 'missing.db');
    assert.notEqual(spawnSync(process.execPath, [script, missingPath], { encoding: 'utf8' }).status, 0);
    assert.equal(existsSync(missingPath), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
