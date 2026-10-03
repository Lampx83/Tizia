// The one-off SQLite -> PostgreSQL copy of AI board rows (synthetic data only; never run against real data in tests).
import test from 'node:test';
import assert from 'node:assert/strict';
import { copyAiBoardToPostgres } from '../server/scripts/copy-ai-board-to-postgres.mjs';
import { createAiBoardStore } from '../server/ai-board/store.js';
import { backends, PG_URL } from './support/ai-board-db.js';
import { seedBase, snapshot } from './support/ai-board-parity.js';
import { claimAndRun, newRequest, passing, planOf, submit, verdict } from './support/ai-board-scenarios.js';

test('copy: dry run counts, then a full copy keeps every row, ids and the sequences', { skip: !PG_URL }, async () => {
  const [sqlite, postgres] = backends;
  const src = await sqlite.open();
  const dst = await postgres.open(false); // empty schema: the copy creates the tables itself
  try {
    await seedBase(src);
    const store = createAiBoardStore(src.raw);
    await newRequest(store, { tag: 'a' });
    await newRequest(store, { tag: 'b', ownerUserId: 2, ownerDisplayName: 'Minh' });
    const c = await claimAndRun(store, 'w1');
    await submit(store, c, planOf(), 'plan-copy-1');
    await verdict(store, c, passing({ repairs: [{ gate: 5, reason: 'x' }] }), 'verdict-copy-1');
    await newRequest(store, { tag: 'f', type: 'feature', title: 'Thẻ ghi nhớ thuốc' });
    await store.approveFolder(1, 9);
    await src.run(`INSERT INTO request_messages(request_id, role, author_name, body, created_at) VALUES (1, 'student', 'Lan', 'xin chào', 1800000000000)`);
    await src.run(`INSERT INTO ai_board_profile(user_id, role, domain_expertise, tech_level, answered_at) VALUES (1, 'student', '["pharmacy"]', 'some', 1800000000000)`);
    await src.run(`UPDATE users SET password_hash = 'scrypt$secret' WHERE id = 1`);

    const dry = await copyAiBoardToPostgres({ sqlite: src.raw, pg: dst, dryRun: true });
    assert.equal(dry.dryRun, true);
    assert.equal(dry.counts.requests, 3);
    await assert.rejects(dst.get('SELECT 1 FROM requests'), /does not exist/); // dry run created nothing

    const done = await copyAiBoardToPostgres({ sqlite: src.raw, pg: dst });
    assert.deepEqual(done.counts, dry.counts);
    const from = await snapshot(src);
    const to = await snapshot(dst);
    for (const table of Object.keys(from)) assert.deepEqual(to[table], from[table], `table ${table}`);
    assert.equal((await dst.get('SELECT password_hash FROM users WHERE id = 1')).password_hash, '', 'password hashes are never copied');

    // new rows continue after the copied ids; the board's own users stay above the floor
    const next = await dst.insert(`INSERT INTO requests(domain, title, created_at, updated_at) VALUES ('x', 'sau khi chép', 1, 1)`);
    assert.equal(next, 4);
    const sysUser = await dst.insert(`INSERT INTO users(username, display_name) VALUES ('ai-board', 'Ban')`);
    assert.ok(sysUser >= 1_000_000_000);

    await assert.rejects(copyAiBoardToPostgres({ sqlite: src.raw, pg: dst }), /already has rows/);
  } finally { await src.dispose(); await dst.dispose(); }
});
