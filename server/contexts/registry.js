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

// Module dev-owned — plugin nào tự nhận diện qua `sourceModule` trùng list này
// PHẢI khai `origin: 'dev-owned'` mới được mount. AI-generated proposal không
// bao giờ tự khai 'dev-owned' (cổng 4/ticket 12 chặn ở bước lint import), nên
// đây là lớp phòng vệ runtime thứ hai: registry từ chối mount thẳng, kể cả nếu
// lint bị bỏ qua. capabilities.js re-export list này làm CORE_MODULES.
export const CORE_MODULES = Object.freeze([
  'server/db.js',
  'server/app-proxy.js',
  'server/contexts/registry.js',
  'server/contexts/admin/index.js',
  'server/contexts/security/index.js',
  'server/contexts/payment/index.js',
  'server/integrations/scoreup.js',
  'server/integrations/codelab.js',
  'server/integrations/codelab-contests.js',
  'server/contexts/portal-apps/index.js',
]);

// Capability không đi qua mount (ticket 08): ScoreUp/Codelab là hàm gọi thẳng
// từ surface.quiz/core.integrations (xem capabilities.js), không phải
// registry.mount*Plugins — nên không bao giờ xuất hiện trong `mounted`/
// `catalogs` bên dưới. Khai tĩnh ở đây để listAvailableCapabilities() vẫn
// liệt kê được chúng. Cố ý KHÔNG có field path/module/file — AI board đọc
// catalog để biết "đã có gì rồi", không phải để suy ra đường tới file.
export const STATIC_CAPABILITIES = Object.freeze([
  {
    id: 'scoreup', kind: 'integration', tier: 'dev-owned',
    provides: ['quiz.listSubjects', 'quiz.listChapters', 'quiz.listQuestions', 'quiz.getRandomQuestions', 'quiz.getQuestion'],
    description: 'ScoreUp — nguồn câu hỏi quiz thật. Gọi qua surface.quiz.*, chỉ đọc.',
  },
  {
    id: 'codelab', kind: 'integration', tier: 'dev-owned',
    provides: ['codelab (submit/status chấm code)'],
    description: 'Codelab/NEU OJ — chấm bài code. Chỉ gọi được từ core.integrations, không có trong surface.',
  },
  {
    id: 'safety', kind: 'library', tier: 'core',
    provides: ['checkContentSafety', 'extractPromptText'],
    description: 'Guardrail nội dung (profanity/self_harm/violence_threat/pii tiếng Việt) — đã có sẵn, đừng tự viết bộ lọc riêng.',
  },
]);

// name → dispose. Gỡ một skill = gọi một hàm.
const mounted = new Map();
// name → catalog entry, chỉ cho plugin ĐANG mount VÀ có khai `catalog`
// (ticket 08). Sống/chết theo đúng vòng đời mounted — dispose() gỡ cả hai.
const catalogs = new Map();

// Plugin khai `sourceModule` trùng CORE_MODULES mà không tự nhận `origin:
// 'dev-owned'` bị từ chối NGAY LÚC MOUNT — không cần đợi request đầu tiên.
function assertOriginAllowed(p) {
  if (p.sourceModule && CORE_MODULES.includes(p.sourceModule) && p.origin !== 'dev-owned') {
    throw new Error(
      `[registry] plugin '${p.name}' khai sourceModule dev-owned (${p.sourceModule}) `
      + `nhưng origin không phải 'dev-owned' — từ chối mount`,
    );
  }
}

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
    assertOriginAllowed(p);
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
  // pluginCtx() làm 1 lượt deepFreeze — `ctx` giống hệt nhau cho cả lô, tính
  // 1 lần thay vì 1 lần/plugin (mountRouterPlugins gọi 1 lần với ~30 plugin).
  const frozenCtx = pluginCtx(ctx);
  for (const p of plugins) {
    let inner = express.Router();
    target.use((req, res, next) => (inner ? inner(req, res, next) : next()));
    const disposePlugin = p.mount(inner, frozenCtx);
    mounted.set(p.name, () => {
      inner = null;
      disposePlugin?.();
    });
    if (p.catalog) catalogs.set(p.name, { name: p.name, ...p.catalog });
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
  const frozenCtx = pluginCtx(ctx);
  for (const p of plugins) {
    if (p.wsPriority !== 'prepend' && p.wsPriority !== 'append') {
      throw new Error(`[registry] plugin WS ${p.name} phải khai báo wsPriority: 'prepend' | 'append'`);
    }
    const handle = p.mount(frozenCtx);
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
    if (p.catalog) catalogs.set(p.name, { name: p.name, ...p.catalog });
  }
  return plugins.map((p) => p.name);
}

export function disposePlugin(name) {
  const dispose = mounted.get(name);
  if (!dispose) return false;
  mounted.delete(name);
  catalogs.delete(name);
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

// Ticket 08 — danh mục năng lực: catalog của mọi plugin ĐANG mount có khai
// `catalog`, cộng STATIC_CAPABILITIES (ScoreUp/Codelab, không đi qua mount).
// AI board đọc trước khi đề xuất skill mới, để không phát minh lại cái đã có.
export function listAvailableCapabilities() {
  return [...STATIC_CAPABILITIES, ...catalogs.values()];
}

// Tương đương `dsh --dump-config` — resolved mount state + capability, cho cả
// người debug (scripts/dump-config.mjs) và AI board dùng làm input bắt buộc.
export function dumpConfig() {
  return { mounted: mountedPlugins(), capabilities: listAvailableCapabilities() };
}
