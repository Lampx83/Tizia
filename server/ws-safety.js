// ws-safety.js — 3 hành vi mọi điểm attach WebSocket đều cần, gom về 1 chỗ:
//   guardedSend        — kiểm readyState trước khi gửi, nuốt lỗi send.
//   onMessageJSON      — đăng ký 'message', tự parse JSON, JSON hỏng thì bỏ qua.
//   logSocketLifecycle — gắn 'error' + 'close' listener log qua observability.
//
// Interface bọc chặt (đăng ký listener hộ, không chỉ đưa util rời) để agent
// phát triển các file WS về sau khó viết sai hơn. Heartbeat / auth / routing
// upgrade KHÔNG nằm ở đây — mỗi site một kiểu, xem ticket 05/19.

import { log } from './observability.js';

/**
 * Gửi nếu socket đang OPEN (readyState 1). Object → JSON.stringify; string coi
 * như đã serialize (broadcast stringify 1 lần rồi gửi N socket). Trả true nếu
 * đã gọi send, false nếu bỏ qua hoặc send ném lỗi.
 */
export function guardedSend(ws, data) {
  if (!ws || ws.readyState !== 1) return false;
  try {
    ws.send(typeof data === 'string' ? data : JSON.stringify(data));
    return true;
  } catch (err) {
    log.warn('[ws] send failed', { err });
    return false;
  }
}

/**
 * ws.on('message') với JSON parse sẵn. Handler chỉ nhận object (không null,
 * không số/chuỗi) — client gửi rác thì bỏ qua, không bao giờ throw vì parse.
 */
export function onMessageJSON(ws, handler) {
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (!msg || typeof msg !== 'object') return;
    handler(msg);
  });
}

/**
 * Gắn cả 'error' (warn) và 'close' (info) trong 1 lời gọi. `meta` là object
 * hoặc hàm trả object — dùng hàm khi ngữ cảnh đổi sau khi connect (roomId,
 * classCode gán lúc join).
 */
export function logSocketLifecycle(ws, label, meta = {}) {
  const ctx = () => (typeof meta === 'function' ? meta() : meta);
  ws.on('error', (err) => log.warn(`[ws:${label}] connection error`, { err, ...ctx() }));
  ws.on('close', () => log.info(`[ws:${label}] connection closed`, { ...ctx() }));
}
