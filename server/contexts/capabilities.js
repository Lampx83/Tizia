/**
 * capabilities.js — hai tầng quyền cho plugin.
 *
 *   surface : phần AN TOÀN. Feature-gate, đọc nội dung, biến thể UI, và các hàm
 *             integration CÓ SẴN (gọi được, không sửa được).
 *   core    : phần CẤM với plugin AI sinh. db thô, requireAdmin, CSRF,
 *             rate-limit, thanh toán, chính registry, file tích hợp dịch vụ
 *             ngoài, và raw http.Server/WebSocket/SSE.
 *
 * `core` KHÔNG bao giờ đi vào ctx của plugin: registry.js chỉ truyền
 * `{ surface }` (xem pluginCtx ở đó). Object `core` dưới đây tồn tại để liệt kê
 * tường minh cái gì thuộc vùng cấm — cổng 4 (lint import) dựa vào danh sách
 * này, và test khẳng định ctx.core là undefined trong closure plugin.
 *
 * Raw http.Server / WebSocket / SSE không nằm ở đây vì chúng là giá trị runtime,
 * không phải module: đường duy nhất chạm tới là registry.mountWsPlugins, và
 * plugin WS là dev-owned, không phải AI sinh.
 */
import { db } from '../db.js';
import { FEATURES } from './feature-gate/index.js';
import { getCollection, collectionCount } from './content/index.js';
import { checkFlag, getVariant } from './experiments/index.js';
import { requireAdmin } from './admin/index.js';
import { csrf, rateLimit, apiLimiter, sensitiveAuthLimiter } from './security/index.js';
import * as scoreup from '../integrations/scoreup.js';
import * as codelab from '../integrations/codelab.js';
import * as registry from './registry.js';

export const surface = Object.freeze({
  // Feature-gate: đọc catalog, không đổi tier/unlock.
  features: Object.freeze({ FEATURES }),
  // Nội dung: chỉ đọc. upsertItem/seedCollection nằm ngoài surface (ghi = core).
  content: Object.freeze({ getCollection, collectionCount }),
  // Biến thể UI / cờ tính năng theo user.
  experiments: Object.freeze({ checkFlag, getVariant }),
  // Quiz: gọi hàm ĐỌC có sẵn của ScoreUp. Không có create/update/delete ở đây.
  quiz: Object.freeze({
    listSubjects: scoreup.listSubjects,
    listChapters: scoreup.listChapters,
    listQuestions: scoreup.listQuestions,
    getRandomQuestions: scoreup.getRandomQuestions,
    getQuestion: scoreup.getQuestion,
  }),
});

export const core = Object.freeze({
  db,
  requireAdmin,
  csrf,
  rateLimit,
  apiLimiter,
  sensitiveAuthLimiter,
  registry,
  integrations: Object.freeze({ scoreup, codelab }),
});

// Tên module cấm import trực tiếp từ plugin AI sinh. Cổng 4 (ticket 12) đọc
// danh sách này thay vì tự chép lại một bản thứ hai.
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
]);
