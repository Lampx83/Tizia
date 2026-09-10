/**
 * registry.js — bảng mount/dispose cho plugin (context thường + AI sinh).
 *
 * Ba hàm mount ứng ba ràng buộc thứ tự CÓ THẬT trong server/index.js:
 *   - mountAppPlugins   : gắn thẳng lên `app`, PHẢI gọi TRƯỚC express.json()
 *                         (proxy/webhook cần raw body stream).
 *   - mountRouterPlugins: gắn lên Router chính, sau express.json()/csrf.
 *   - mountWsPlugins    : cần `http.Server` thô; thứ tự listener 'upgrade' đọc
 *                         từ field khai báo `wsPriority`, KHÔNG suy ra từ thứ
 *                         tự gọi (codify cái race .on() vs .prependListener()
 *                         đang tồn tại ngầm giữa các context WS).
 *
 * Ranh giới quyền: plugin chỉ nhận `{ surface }`. `core` không nằm trong object
 * truyền vào — không có đường với tới qua closure. Xem capabilities.js.
 *
 * Hình dạng plugin:
 *   HTTP: { name, mount(router, ctx) -> dispose? }
 *   WS  : { name, wsPriority: 'prepend'|'append', mount(ctx) -> { onUpgrade, dispose? } }
 */
import express from 'express';

// name → dispose. Gỡ một skill = gọi một hàm.
const mounted = new Map();

// Object.freeze chỉ khoá một tầng. Surface chứa object thật dùng chung với phần
// còn lại của server (vd FEATURES mà feature-gate đọc lại mỗi request), nên
// freeze nông là plugin vẫn ghi xuyên xuống được. Freeze sâu.
export function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return value;
  if (seen.has(value)) return value;
  seen.add(value);
  Object.freeze(value);
  for (const v of Object.values(value)) deepFreeze(v, seen);
  return value;
}

// Object duy nhất plugin nhìn thấy. Freeze để plugin không tự chèn thêm key rồi
// tưởng registry cấp cho mình, cũng không ghi ngược vào state dùng chung.
function pluginCtx(ctx) {
  return Object.freeze({ surface: deepFreeze(ctx?.surface ?? {}) });
}

// Kiểm tra tên TRƯỚC khi mount bất kỳ plugin nào trong lô: mount rồi mới phát
// hiện trùng tên thì route đã sống mà không có dispose nào gỡ được nữa.
function assertNamesFree(plugins) {
  const seen = new Set();
  for (const p of plugins) {
    if (!p?.name) throw new Error('[registry] plugin thiếu `name`');
    if (mounted.has(p.name) || seen.has(p.name)) {
      throw new Error(`[registry] plugin trùng tên: ${p.name}`);
    }
    seen.add(p.name);
  }
}

// Một plugin HTTP = một Router riêng + một middleware chuyển tiếp cố định.
// dispose() bỏ Router đi, middleware còn lại thành no-op → route trả 404.
// Không đụng app._router.stack (internal của Express, vỡ khi lên v5).
// ponytail: middleware no-op còn lại sau dispose là rác nhỏ (1 closure/plugin đã gỡ);
// nếu về sau mount/dispose chạy hàng nghìn lần thì mới cần gỡ hẳn khỏi stack.
function mountHttp(target, plugins, ctx) {
  assertNamesFree(plugins);
  for (const p of plugins) {
    let inner = express.Router();
    target.use((req, res, next) => (inner ? inner(req, res, next) : next()));
    const disposePlugin = p.mount(inner, pluginCtx(ctx));
    mounted.set(p.name, () => {
      inner = null;
      disposePlugin?.();
    });
  }
  return plugins.map((p) => p.name);
}

export function mountAppPlugins(app, plugins, ctx) {
  return mountHttp(app, plugins, ctx);
}

export function mountRouterPlugins(router, plugins, ctx) {
  return mountHttp(router, plugins, ctx);
}

export function mountWsPlugins(httpServer, plugins, ctx) {
  assertNamesFree(plugins);
  for (const p of plugins) {
    if (p.wsPriority !== 'prepend' && p.wsPriority !== 'append') {
      throw new Error(`[registry] plugin WS ${p.name} phải khai báo wsPriority: 'prepend' | 'append'`);
    }
    const handle = p.mount(pluginCtx(ctx));
    if (typeof handle?.onUpgrade !== 'function') {
      throw new Error(`[registry] plugin WS ${p.name} phải trả { onUpgrade }`);
    }
    const { onUpgrade, dispose } = handle;
    const attach = p.wsPriority === 'prepend' ? 'prependListener' : 'on';
    httpServer[attach]('upgrade', onUpgrade);
    mounted.set(p.name, () => {
      httpServer.removeListener('upgrade', onUpgrade);
      dispose?.();
    });
  }
  return plugins.map((p) => p.name);
}

export function disposePlugin(name) {
  const dispose = mounted.get(name);
  if (!dispose) return false;
  mounted.delete(name);
  dispose();
  return true;
}

export function disposeAll() {
  const names = [...mounted.keys()];
  for (const n of names) disposePlugin(n);
  return names;
}

export function mountedPlugins() {
  return [...mounted.keys()];
}
