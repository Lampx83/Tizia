/**
 * Seam JS duy nhất cho execution plane (registry.js + ranh giới capability).
 * Dựng 1 Express app tạm (listen(0)), mount plugin giả, gọi bằng fetch() thật.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import http from 'node:http';
import {
  mountAppPlugins, mountRouterPlugins, mountWsPlugins,
  disposePlugin, disposeAll, mountedPlugins, deepFreeze,
} from '../server/contexts/registry.js';

// Bật server tạm ở cổng ngẫu nhiên, trả base URL + hàm đóng.
async function startApp(app) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return {
    base: `http://127.0.0.1:${port}`,
    server,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

test.afterEach(() => { disposeAll(); });

test('router plugin: mount trả response, dispose xong trả 404', async () => {
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-hello',
    mount(router) {
      router.get('/api/fixture/hello', (_req, res) => res.json({ ok: true, from: 'fixture' }));
      return () => {};
    },
  }], { surface: {} });

  const { base, close } = await startApp(app);
  try {
    const before = await fetch(`${base}/api/fixture/hello`);
    assert.equal(before.status, 200);
    assert.deepEqual(await before.json(), { ok: true, from: 'fixture' });

    assert.equal(disposePlugin('fixture-hello'), true);

    const after = await fetch(`${base}/api/fixture/hello`);
    assert.equal(after.status, 404);
  } finally {
    await close();
  }
});

test('app plugin: mount được trước express.json, giữ raw body', async () => {
  const app = express();
  mountAppPlugins(app, [{
    name: 'fixture-raw',
    mount(router) {
      router.post('/api/fixture/raw', express.raw({ type: '*/*' }), (req, res) => {
        res.json({ bytes: req.body.length });
      });
      return () => {};
    },
  }], { surface: {} });
  app.use(express.json());

  const { base, close } = await startApp(app);
  try {
    const res = await fetch(`${base}/api/fixture/raw`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"a":1}',
    });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { bytes: 7 });
  } finally {
    await close();
  }
});

test('plugin chỉ thấy ctx.surface — ctx.core là undefined trong closure', async () => {
  let seen = null;
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-ctx',
    mount(_router, ctx) {
      seen = ctx;
      return () => {};
    },
  }], { surface: { quiz: {} }, core: { db: 'SECRET' } });

  assert.equal(seen.core, undefined);
  assert.deepEqual(Object.keys(seen), ['surface']);
  assert.deepEqual(seen.surface, { quiz: {} });
  // Freeze: plugin không tự gắn thêm core vào ctx của chính nó.
  assert.throws(() => { 'use strict'; seen.core = { db: 1 }; }, TypeError);
});

test('dispose plugin gọi dispose() của chính plugin', () => {
  let disposed = 0;
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-dispose',
    mount() { return () => { disposed += 1; }; },
  }], { surface: {} });

  assert.deepEqual(mountedPlugins(), ['fixture-dispose']);
  disposePlugin('fixture-dispose');
  assert.equal(disposed, 1);
  assert.deepEqual(mountedPlugins(), []);
});

test('trùng name bị từ chối', () => {
  const app = express();
  const p = { name: 'dup', mount() { return () => {}; } };
  mountRouterPlugins(app, [p], { surface: {} });
  assert.throws(() => mountRouterPlugins(app, [p], { surface: {} }), /trùng tên/);
});

test('WS plugin: dispose gỡ đúng listener upgrade', () => {
  const server = http.createServer();
  let disposed = false;
  mountWsPlugins(server, [{
    name: 'fixture-ws',
    wsPriority: 'append',
    mount() {
      return { onUpgrade: () => {}, dispose: () => { disposed = true; } };
    },
  }], { surface: {} });

  assert.equal(server.listenerCount('upgrade'), 1);
  disposePlugin('fixture-ws');
  assert.equal(server.listenerCount('upgrade'), 0);
  assert.equal(disposed, true);
});

test('WS plugin: wsPriority quyết định thứ tự, không phải thứ tự gọi mount', () => {
  const server = http.createServer();
  const first = () => {};
  const second = () => {};
  mountWsPlugins(server, [
    { name: 'ws-append', wsPriority: 'append', mount: () => ({ onUpgrade: first }) },
    { name: 'ws-prepend', wsPriority: 'prepend', mount: () => ({ onUpgrade: second }) },
  ], { surface: {} });

  // Mount sau nhưng khai 'prepend' → đứng trước.
  assert.deepEqual(server.listeners('upgrade'), [second, first]);
});

test('WS plugin thiếu wsPriority bị từ chối', () => {
  const server = http.createServer();
  assert.throws(
    () => mountWsPlugins(server, [{ name: 'ws-no-prio', mount: () => ({ onUpgrade: () => {} }) }], { surface: {} }),
    /wsPriority/,
  );
});

test('surface đưa cho plugin bị freeze SÂU — không ghi ngược vào state dùng chung', () => {
  // FEATURES là object thật feature-gate đọc lại mỗi request. freeze nông chỉ
  // khoá cái vỏ, plugin vẫn hạ tier xuống 0 và mở khoá cho toàn bộ user được.
  const FEATURES = { 'lesson-builder': { tier: 5 } };
  let seen = null;
  const app = express();
  mountRouterPlugins(app, [{
    name: 'fixture-freeze',
    mount(_router, ctx) { seen = ctx; return () => {}; },
  }], { surface: { features: { FEATURES } } });

  assert.throws(() => { seen.surface.features.FEATURES['lesson-builder'].tier = 0; }, TypeError);
  assert.throws(() => { seen.surface.features.FEATURES['moi'] = { tier: 0 }; }, TypeError);
  assert.equal(FEATURES['lesson-builder'].tier, 5);
});

test('deepFreeze chịu được tham chiếu vòng', () => {
  const a = { name: 'a' };
  a.self = a;
  assert.doesNotThrow(() => deepFreeze(a));
  assert.equal(Object.isFrozen(a), true);
});

test('trùng tên bị chặn TRƯỚC khi mount — không để lại route mồ côi', async () => {
  const app = express();
  mountRouterPlugins(app, [{
    name: 'first',
    mount(router) {
      router.get('/api/fixture/first', (_req, res) => res.json({ ok: true }));
      return () => {};
    },
  }], { surface: {} });

  // Lô thứ hai có 1 plugin tên mới + 1 plugin trùng tên. Cả lô phải bị từ chối,
  // plugin tên mới KHÔNG được mount dở dang.
  assert.throws(() => mountRouterPlugins(app, [
    {
      name: 'second',
      mount(router) {
        router.get('/api/fixture/second', (_req, res) => res.json({ ok: true }));
        return () => {};
      },
    },
    { name: 'first', mount() { return () => {}; } },
  ], { surface: {} }), /trùng tên/);

  assert.deepEqual(mountedPlugins(), ['first']);

  const { base, close } = await startApp(app);
  try {
    assert.equal((await fetch(`${base}/api/fixture/first`)).status, 200);
    // Nếu 'second' lọt được vào app thì nó sống mà không ai dispose được.
    assert.equal((await fetch(`${base}/api/fixture/second`)).status, 404);
  } finally {
    await close();
  }
});

test('trùng tên ngay trong cùng một lô cũng bị chặn', () => {
  const app = express();
  assert.throws(() => mountRouterPlugins(app, [
    { name: 'same', mount() { return () => {}; } },
    { name: 'same', mount() { return () => {}; } },
  ], { surface: {} }), /trùng tên/);
  assert.deepEqual(mountedPlugins(), []);
});

test('WS plugin trả về undefined báo lỗi rõ ràng, không TypeError trần', () => {
  const server = http.createServer();
  assert.throws(
    () => mountWsPlugins(server, [{ name: 'ws-rong', wsPriority: 'append', mount: () => undefined }], { surface: {} }),
    /phải trả \{ onUpgrade \}/,
  );
  assert.equal(server.listenerCount('upgrade'), 0);
});
