// Same HTTP scenario against the real server on SQLite and on PostgreSQL: statuses and normalised bodies must match.
// Needs TEST_PG_URL (throwaway PostgreSQL). PARITY_VERBOSE=1 prints every step.
import test from 'node:test';
import assert from 'node:assert/strict';
import { startApp, makeClient, normalize, runScenario } from './support/app-parity.js';
import { SCENARIO } from './support/app-parity-scenario.js';

const run = process.env.TEST_PG_URL ? test : test.skip;

/** Path and values of the first difference between two JSON-ish values. */
function firstDiff(a, b, at = '$') {
  if (JSON.stringify(a) === JSON.stringify(b)) return null;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const d = firstDiff(a[k], b[k], `${at}.${k}`);
      if (d) return d;
    }
  }
  return `${at}: sqlite ${JSON.stringify(a)} vs postgres ${JSON.stringify(b)}`;
}

run('app parity: SQLite and PostgreSQL answer the same scenario the same way', { timeout: 300_000 }, async () => {
  const apps = [await startApp('sqlite'), await startApp('postgres')];
  try {
    const mk = (app) => ({ anon: makeClient(app.base), student: makeClient(app.base), teacher: makeClient(app.base), pupil: makeClient(app.base), admin: makeClient(app.base) });
    const results = await runScenario(apps, SCENARIO(apps), mk);
    const problems = [];
    for (const { step, byBackend } of results) {
      const a = byBackend.sqlite; const b = byBackend.postgres;
      const label = `${step.as || 'anon'} ${step.method || 'GET'} ${typeof step.path === 'function' ? '(fn)' : step.path}`;
      if (process.env.PARITY_VERBOSE === '1') console.log(`${a.status}/${b.status} ${label}${b.status >= 400 ? ' ' + JSON.stringify(b.json ?? b.text).slice(0, 160) : ''}`);
      if (b.status >= 500 && !step.allow5xx) problems.push(`PG 5xx ${label}: ${JSON.stringify(b.json ?? b.text).slice(0, 300)}`);
      if (a.status !== b.status) { problems.push(`STATUS ${label}: sqlite ${a.status} vs postgres ${b.status} ${JSON.stringify(b.json ?? b.text).slice(0, 200)}`); continue; }
      if (step.skipBody) continue;
      const c = step.canon || ((x) => x);
      const na = JSON.stringify(normalize(c(a.json ?? a.text))); const nb = JSON.stringify(normalize(c(b.json ?? b.text)));
      if (na !== nb) problems.push(`BODY ${label}: ${firstDiff(JSON.parse(na), JSON.parse(nb))}`);
    }
    if (problems.length) {
      console.log(`--- ${problems.length} parity problems ---\n${problems.join('\n')}`);
      for (const a of apps) if (a.backend === 'postgres') console.log('--- postgres server log tail ---\n' + a.logs().split('\n').filter((l) => /error|ERR|failed|warn/i.test(l)).slice(-40).join('\n'));
    }
    assert.equal(problems.length, 0, `${problems.length} parity problems (listed above)`);
  } finally {
    await Promise.all(apps.map((a) => a.stop()));
  }
});
