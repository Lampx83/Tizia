// Scripted HTTP scenario on one real server (PostgreSQL): each step returns its expected status, no 5xx outside allow5xx steps.
import test from 'node:test';
import assert from 'node:assert/strict';
import { startApp, makeClient, runScenario } from './support/app-parity.js';
import { SCENARIO } from './support/app-parity-scenario.js';

const run = process.env.TEST_PG_URL ? test : test.skip;

run('app outcomes: scripted HTTP scenario on PostgreSQL answers each step with its expected status', { timeout: 300_000 }, async () => {
  const app = await startApp('postgres');
  try {
    const mk = (a) => ({ anon: makeClient(a.base), student: makeClient(a.base), teacher: makeClient(a.base), pupil: makeClient(a.base), admin: makeClient(a.base) });
    const results = await runScenario([app], SCENARIO([app]), mk);
    const problems = [];
    for (const { step, byBackend } of results) {
      const res = byBackend.postgres;
      const label = `${step.as || 'anon'} ${step.method || 'GET'} ${typeof step.path === 'function' ? '(fn)' : step.path}`;
      if (process.env.PARITY_VERBOSE === '1') console.log(`STEP ${res.status} ${label}`);
      if (res.status >= 500 && !step.allow5xx) problems.push(`5xx ${label}: ${JSON.stringify(res.json ?? res.text).slice(0, 300)}`);
      if (step.expect !== undefined && res.status !== step.expect) problems.push(`${label}: expected ${step.expect}, got ${res.status}`);
    }
    assert.deepEqual(problems, []);
  } finally {
    await app.stop();
  }
});
