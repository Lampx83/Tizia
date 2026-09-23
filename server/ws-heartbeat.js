// ws-heartbeat.js — sweep thụ động dùng chung cho 4 site cùng khuôn
// (attachSackyMetaWS, attachLabWS, attachRoom, attachOrchestration): mỗi
// HEARTBEAT_INTERVAL_MS, xoá khỏi Map các kết nối đã chết (readyState !== 1),
// gọi onStale cho từng cái để site tự broadcast 'leave' theo đúng shape tin
// nhắn của nó (khác nhau giữa các site — không ép chung 1 format broadcast).
//
// Không dùng cho: attachRaceWS/attachLiveQuizWs (không có heartbeat, ticket
// 19 không ép thêm), presence.js (idle-timeout chủ động + rate-limit — khác
// khuôn hẳn, xem ticket 19 Comments).

export const HEARTBEAT_INTERVAL_MS = 15000;

export function sweepStaleConnections(map, onStale) {
  for (const [id, conn] of map) {
    if (conn.ws.readyState !== 1) {
      map.delete(id);
      onStale(id, conn);
    }
  }
}
