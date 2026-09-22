/**
 * Seam JS cho ticket 08 (capability catalog) — tái dùng đúng seam registry.js,
 * không seam mới. Fixture plugin, không import context thật (tránh kéo db.js).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {
  mountRouterPlugins, disposePlugin, disposeAll,
  listAvailableCapabilities, dumpConfig, STATIC_CAPABILITIES,
} from '../server/contexts/registry.js';

test.afterEach(() => { disposeAll(); });

test('listAvailableCapabilities() luôn gồm ScoreUp/Codelab, tagged dev-owned, không có path file', () => {
  const caps = listAvailableCapabilities();
  const scoreup = caps.find((c) => c.id === 'scoreup');
  const codelab = caps.find((c) => c.id === 'codelab');
  assert.ok(scoreup, 'thiếu entry scoreup');
  assert.ok(codelab, 'thiếu entry codelab');
  assert.equal(scoreup.tier, 'dev-owned');
  assert.equal(codelab.tier, 'dev-owned');
  for (const c of [scoreup, codelab]) {
    assert.equal(c.path, undefined);
    assert.equal(c.module, undefined);
    assert.equal(c.file, undefined);
  }
  assert.equal(STATIC_CAPABILITIES.length >= 2, true);
});

test('plugin có khai catalog → xuất hiện trong listAvailableCapabilities() sau khi mount, biến mất sau dispose', () => {
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-catalog',
    catalog: { kind: 'context', tier: 'surface', provides: ['fixture.read'], description: 'fixture cho test' },
    mount() { return () => {}; },
  }], { surface: {} });

  const entry = listAvailableCapabilities().find((c) => c.name === 'fixture-catalog');
  assert.ok(entry);
  assert.equal(entry.tier, 'surface');
  assert.deepEqual(entry.provides, ['fixture.read']);

  disposePlugin('fixture-catalog');
  assert.equal(listAvailableCapabilities().find((c) => c.name === 'fixture-catalog'), undefined);
});

test('plugin không khai catalog → không xuất hiện trong listAvailableCapabilities() (không crash)', () => {
  const app = express();
  mountRouterPlugins(app, [{ name: 'fixture-no-catalog', mount() { return () => {}; } }], { surface: {} });

  assert.equal(listAvailableCapabilities().find((c) => c.name === 'fixture-no-catalog'), undefined);
});

test('dump-config: in được mounted + capabilities của trạng thái hiện tại, không crash', () => {
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-dump',
    catalog: { kind: 'context', tier: 'core', provides: ['x'], description: 'y' },
    mount() { return () => {}; },
  }], { surface: {} });

  const out = dumpConfig();
  assert.deepEqual(out.mounted, ['fixture-dump']);
  assert.ok(out.capabilities.find((c) => c.name === 'fixture-dump'));
  assert.ok(out.capabilities.find((c) => c.id === 'scoreup'));
});

test('trùng tên: plugin dev-owned mount trước → sau đó bất kỳ ai (kể cả domain-synthesized) khai cùng tên đều bị từ chối, catalog dev-owned vẫn nguyên', () => {
  const app = express();
  mountRouterPlugins(app, [{
    name: 'shared-name',
    origin: 'dev-owned',
    catalog: { kind: 'context', tier: 'dev-owned', provides: ['real'], description: 'bản dev thật' },
    mount() { return () => {}; },
  }], { surface: {} });

  const synthesized = {
    name: 'shared-name', // domain-synthesized cố mạo danh cùng tên
    catalog: { kind: 'context', tier: 'surface', provides: ['fake'], description: 'bản AI sinh mạo danh' },
    mount() { return () => {}; },
  };
  assert.throws(() => mountRouterPlugins(app, [synthesized], { surface: {} }), /trùng tên/);

  // Bản dev-owned vẫn là bản duy nhất trong catalog — resolution = dev thắng.
  const entry = listAvailableCapabilities().find((c) => c.name === 'shared-name');
  assert.equal(entry.provides[0], 'real');
  assert.equal(entry.tier, 'dev-owned');
});
