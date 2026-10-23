import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as server from '../server/ai-board/clock.js';
import * as browser from '../public/js/ai-board-clock.js';

const utc = (iso) => Date.parse(iso);

for (const [name, clock] of [['server', server], ['browser', browser]]) {
  test(`${name} clock: fixed UTC instant prints +07:00 wall time`, () => {
    assert.equal(clock.fmt(utc('2026-10-23T18:30:00Z')), '2026-10-24 01:30:00 +07:00');
    assert.equal(clock.fmt(utc('2026-10-23T00:00:00Z')), '2026-10-23 07:00:00 +07:00');
  });

  test(`${name} clock: injected source drives nowMs and restores`, () => {
    const old = clock.setClockSource(() => 42);
    try { assert.equal(clock.nowMs(), 42); } finally { clock.setClockSource(old); }
    assert.notEqual(clock.nowMs(), 42);
  });
}

test('browser twin TZ matches contract.json clock.tz', () => {
  const contract = JSON.parse(fs.readFileSync(new URL('../server/ai-board/contract.json', import.meta.url), 'utf8'));
  assert.equal(browser.TZ, contract.clock.tz);
});

test('server and browser fmt agree', () => {
  for (const t of [0, utc('2026-10-23T18:30:00Z'), utc('2026-03-31T17:00:00Z')]) {
    assert.equal(server.fmt(t), browser.fmt(t));
  }
});
