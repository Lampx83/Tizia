// Two check profiles side by side: each owns a port, a temp dir and a PostgreSQL schema.
// Both serve at the same time, one teardown leaves the other untouched.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import { PG_URL, createBoardSchema } from './support/ai-board-db.js';
import { freePort, profileTempDir } from './support/isolation.js';

const run = PG_URL ? test : test.skip;

async function startProfile(name) {
  const dir = profileTempDir(name);
  const port = await freePort();
  const db = await createBoardSchema();
  const schema = (await db.d.get('SELECT current_schema() AS name')).name;
  await db.d.run('INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (?, ?, ?, ?, ?)',
    [1, `profile-${name}`, name, 'student', null]);
  const server = http.createServer(async (req, res) => {
    if (req.url !== '/state') { res.statusCode = 404; res.end('{}'); return; }
    const row = await db.d.get('SELECT COUNT(*) AS n FROM users');
    const body = { profile: name, port, dir, schema, users: Number(row.n) };
    fs.writeFileSync(`${dir}/served`, JSON.stringify(body));
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(body));
  });
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  let stopped = false;
  async function stop() {
    if (stopped) return;
    stopped = true;
    await new Promise((resolve) => server.close(resolve));
    await db.dispose();
    fs.rmSync(dir, { recursive: true, force: true });
  }
  return { name, port, dir, schema, db, stop, url: `http://127.0.0.1:${port}` };
}

const state = async (profile) => (await fetch(`${profile.url}/state`)).json();

run('two profiles run in parallel without sharing port, temp dir or schema', { timeout: 120_000 }, async () => {
  const profiles = await Promise.all([startProfile('alpha'), startProfile('beta')]);
  const [alpha, beta] = profiles;
  try {
    assert.notEqual(alpha.port, beta.port);
    assert.notEqual(alpha.dir, beta.dir);
    assert.notEqual(alpha.schema, beta.schema);

    const [a, b] = await Promise.all(profiles.map(state));
    assert.deepEqual([a.profile, b.profile], ['alpha', 'beta']);
    assert.deepEqual([a.users, b.users], [1, 1]);
    assert.deepEqual([a.port, b.port], [alpha.port, beta.port]);

    const foreign = await beta.db.d.get('SELECT COUNT(*) AS n FROM users WHERE username = ?', ['profile-alpha']);
    assert.equal(Number(foreign.n), 0);

    await alpha.stop();
    assert.equal(fs.existsSync(alpha.dir), false);

    const alive = await state(beta);
    assert.deepEqual(alive, b);
    assert.equal(fs.readFileSync(`${beta.dir}/served`, 'utf8'), JSON.stringify(b));
  } finally {
    await Promise.all(profiles.map((p) => p.stop()));
  }
});
